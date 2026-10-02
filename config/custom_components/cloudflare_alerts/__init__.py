"""Authenticate Cloudflare alerts and relay incident facts to Home Assistant."""

import asyncio
import json
import logging
import time

from aiohttp import web
import voluptuous as vol

from homeassistant.components import cloud, webhook
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED
from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.event import async_track_state_change_event, async_track_state_report_event
from homeassistant.helpers.service import async_register_admin_service
from homeassistant.helpers.storage import Store

from .policy import authentic, dispatch_allowed, normalize, transition

DOMAIN = "cloudflare_alerts"
EVENT = "cloudflare_alert"
_LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = vol.Schema({vol.Required(DOMAIN): vol.Schema({
    vol.Required("webhook_id"): vol.All(cv.string, vol.Length(min=32)),
    vol.Required("secret"): vol.All(cv.string, vol.Length(min=32)),
    vol.Required("account_id"): cv.string,
    vol.Optional("ops_hostnames", default=[]): [cv.string],
    vol.Optional("ops_tunnel_ids", default=[]): [cv.string],
    vol.Optional("recovery_entities", default={}): {cv.string: cv.entity_id},
    vol.Optional("website_dispatch_entity", default="automation.infrastructure_website_down_repair_and_dispatch"): cv.entity_id,
})}, extra=vol.ALLOW_EXTRA)


class AlertReceiver:
    """Maintain durable incident identity without helpers or another polling service."""

    def __init__(self, hass: HomeAssistant, config: dict):
        self.hass = hass
        self.config = config
        self.store = Store(hass, 1, DOMAIN)
        self.lock = asyncio.Lock()
        self.state = {"incidents": {}, "received": 0, "tests": 0}

    async def handle(self, hass, webhook_id, request):
        """Only accept authenticated POSTs from the configured Cloudflare account."""
        if not authentic(request.headers.get("cf-webhook-auth", ""), self.config["secret"]):
            _LOGGER.warning("Rejected Cloudflare webhook: authentication failed")
            return web.Response(status=403)
        body = await request.text()
        if len(body.encode()) > 65536:
            return web.Response(status=413)
        try:
            payload = json.loads(body)
        except (ValueError, UnicodeError):
            return web.Response(status=400)
        if not isinstance(payload, dict):
            return web.Response(status=400)
        test = set(payload) == {"text"} and isinstance(payload["text"], str)
        if not test and payload.get("account_id") != self.config["account_id"]:
            _LOGGER.warning("Rejected Cloudflare webhook: account did not match (account present: %s; fields: %s)",
                            "account_id" in payload, sorted(payload))
            return web.Response(status=403)
        async with self.lock:
            received = time.time()
            self.state["received"] += 1
            self.state["last_received"] = received
            self.state["last_alert_type"] = payload.get("alert_type", "webhook_test")
            data = payload.get("data")
            self.state["last_data_fields"] = sorted(data) if isinstance(data, dict) else []
            if test:
                self.state["tests"] += 1
                await self.store.async_save(self.state)
                return web.json_response({"accepted": True, "test": True})
            events = self.ingest(normalize(payload, received))
            await self.store.async_save(self.state)
            for event in events:
                self.hass.bus.async_fire(EVENT, event)
        return web.json_response({"accepted": True, "incidents_changed": len(events)})

    def ingest(self, notifications: list[dict]) -> list[dict]:
        """Apply the durable incident lifecycle to authenticated webhook observations."""
        events = []
        for event in notifications:
            previous = self.state["incidents"].get(event["issue_id"])
            record, changed, first_open = transition(previous, event)
            self.state["incidents"][event["issue_id"]] = record
            if not changed:
                continue
            dispatch = first_open and dispatch_allowed(
                event, self.config["ops_hostnames"], self.config["ops_tunnel_ids"])
            # The existing HA website automation owns an already dispatched outage.
            local = self.hass.states.get(self.config["website_dispatch_entity"])
            last = local.attributes.get("last_triggered") if local else None
            if (event["alert_type"] == "real_origin_monitoring" and last and
                    event["received_ts"] - last.timestamp() < 1800 and
                    self.hass.states.is_state("binary_sensor.infra_website_degraded", "on")):
                dispatch = False
            events.append({**record, "dispatch": bool(dispatch), "first_open": first_open})
        return events

    async def resolve(self, issue_id: str, verification: str, observation_time: float | None = None):
        """Close only bridge-owned incidents after an authenticated verification."""
        async with self.lock:
            previous = self.state["incidents"].get(issue_id)
            if not previous or previous["action"] == "resolve":
                return
            if observation_time is not None and observation_time <= previous["received_ts"]:
                return
            record = {**previous, "action": "resolve", "status": "verified_healthy",
                      "event_ts": time.time(), "verification": verification}
            self.state["incidents"][issue_id] = record
            await self.store.async_save(self.state)
            self.hass.bus.async_fire(EVENT, {**record, "dispatch": False, "first_open": False})

    async def recover_origins(self, event):
        """Reuse fresh public-website observations; do not declare recovery from age."""
        reported_entity = event.data["entity_id"] if event else None
        for record in list(self.state["incidents"].values()):
            entity_id = self.config["recovery_entities"].get(record["resource"])
            if (record["action"] != "open" or record["alert_type"] != "real_origin_monitoring"
                    or not entity_id or reported_entity and entity_id != reported_entity):
                continue
            state = self.hass.states.get(entity_id)
            if (state and state.state == "on" and time.time() - record["received_ts"] >= 300
                    and state.last_reported.timestamp() > record["received_ts"]
                    and time.time() - state.last_reported.timestamp() < 600):
                await self.resolve(record["issue_id"], f"Fresh public website probe {entity_id} is healthy.",
                                   state.last_reported.timestamp())


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Register a narrow authenticated webhook and operator-only support actions."""
    receiver = AlertReceiver(hass, config[DOMAIN])
    stored_state = await receiver.store.async_load() or receiver.state
    # Retire fallback checkpoints while retaining durable incidents and delivery counts.
    receiver.state = {key: value for key, value in stored_state.items()
                      if not key.startswith("history_") and key != "last_history_success"}
    if receiver.state != stored_state:
        await receiver.store.async_save(receiver.state)
    hass.data[DOMAIN] = receiver
    webhook.async_register(hass, DOMAIN, "Cloudflare Alerts", config[DOMAIN]["webhook_id"],
                           receiver.handle, local_only=False, allowed_methods=["POST"])

    async def create_cloudhook(call: ServiceCall):
        return {"url": await cloud.async_get_or_create_cloudhook(hass, config[DOMAIN]["webhook_id"])}

    async def get_status(call: ServiceCall):
        return {key: value for key, value in receiver.state.items() if key != "incidents"} | {
            "open_incidents": [{"issue_id": record["issue_id"], "alert_type": record["alert_type"],
                                "resource": record["resource"], "status": record["status"]}
                               for record in receiver.state["incidents"].values() if record["action"] == "open"]}

    async def resolve(call: ServiceCall):
        await receiver.resolve(call.data["issue_id"], call.data["verification"])

    async_register_admin_service(hass, DOMAIN, "create_cloudhook", create_cloudhook,
                                 supports_response=SupportsResponse.ONLY)
    hass.services.async_register(DOMAIN, "get_status", get_status,
                                 supports_response=SupportsResponse.ONLY)
    async_register_admin_service(hass, DOMAIN, "resolve", resolve, schema=vol.Schema({
        vol.Required("issue_id"): cv.string,
        vol.Required("verification"): vol.All(cv.string, vol.Length(min=10)),
    }))

    async def restore(event):
        # Repairs may have outlived automation reloads. Restore presentation only.
        for record in receiver.state["incidents"].values():
            if record["action"] == "open":
                hass.bus.async_fire(EVENT, {**record, "dispatch": False, "first_open": False})
    hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, restore)
    recovery_entities = set(receiver.config["recovery_entities"].values())
    async_track_state_change_event(hass, recovery_entities, receiver.recover_origins)
    async_track_state_report_event(hass, recovery_entities, receiver.recover_origins)
    return True
