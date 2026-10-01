"""Authenticate Cloudflare alerts and relay incident facts to Home Assistant."""

import asyncio
from datetime import UTC, datetime, timedelta
import html
import json
import re
import time

from aiohttp import ClientError, ClientTimeout, web
import voluptuous as vol

from homeassistant.components import cloud, webhook
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED
from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.service import async_register_admin_service
from homeassistant.helpers.storage import Store

from .policy import authentic, dispatch_allowed, identifier, normalize, transition

DOMAIN = "cloudflare_alerts"
EVENT = "cloudflare_alert"
CONFIG_SCHEMA = vol.Schema({vol.Required(DOMAIN): vol.Schema({
    vol.Required("webhook_id"): vol.All(cv.string, vol.Length(min=32)),
    vol.Required("secret"): vol.All(cv.string, vol.Length(min=32)),
    vol.Required("account_id"): cv.string,
    vol.Optional("api_token"): cv.string,
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
            events = self.ingest(normalize(payload, received), allow_dispatch=True)
            await self.store.async_save(self.state)
            for event in events:
                self.hass.bus.async_fire(EVENT, event)
        return web.json_response({"accepted": True, "incidents_changed": len(events)})

    def ingest(self, notifications: list[dict], *, allow_dispatch: bool) -> list[dict]:
        """Apply the same durable lifecycle to webhook and history observations."""
        events = []
        for event in notifications:
            previous = self.state["incidents"].get(event["issue_id"])
            record, changed, first_open = transition(previous, event)
            self.state["incidents"][event["issue_id"]] = record
            if not changed:
                continue
            dispatch = allow_dispatch and first_open and dispatch_allowed(
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

    async def poll_history(self, now=None):
        """Read existing Cloudflare deliveries when the account cannot attach webhooks."""
        if not self.config.get("api_token"):
            return
        checked = time.time()
        since = self.state.get("history_since", checked - 600)
        params = {"per_page": 50, "since": datetime.fromtimestamp(since, UTC).isoformat(),
                  "before": datetime.fromtimestamp(checked, UTC).isoformat()}
        url = f"https://api.cloudflare.com/client/v4/accounts/{self.config['account_id']}/alerting/v3/history"
        records = []
        error = ""
        try:
            session = async_get_clientsession(self.hass)
            for page in range(1, 21):
                async with session.get(url, headers={"Authorization": "Bearer " + self.config["api_token"]},
                                       params={**params, "page": page}, timeout=ClientTimeout(total=20)) as response:
                    response.raise_for_status()
                    result = await response.json()
                if not result.get("success"):
                    raise ValueError("Cloudflare rejected notification history")
                batch = result.get("result") or []
                records.extend(batch)
                if len(batch) < 50:
                    break
            else:
                raise ValueError("Notification history needs a smaller retrieval window")
        except (ClientError, TimeoutError, ValueError) as exc:
            error = f"HTTP {exc.status}" if getattr(exc, "status", None) else "History retrieval failed"
        async with self.lock:
            previous_error = self.state.get("history_error", "")
            self.state["history_error"] = error
            events = []
            if not error:
                seen = self.state.setdefault("history_seen", [])
                for record in sorted(records, key=lambda item: str(item.get("sent", ""))):
                    delivery_id = record.get("id")
                    if not delivery_id or delivery_id in seen:
                        continue
                    body = record.get("alert_body") or "Cloudflare sent an alert; review it in the dashboard."
                    try:
                        payload = json.loads(body)
                    except (TypeError, ValueError):
                        payload = None
                    if not isinstance(payload, dict):
                        resource = "notification-" + identifier(delivery_id)
                        text = html.unescape(re.sub(r"<[^>]+>", " ", str(body)))
                        payload = {"data": {"hostname": resource, "tunnel_id": resource}, "text": text}
                    payload = {**payload, "alert_type": record.get("alert_type"), "ts": record.get("sent")}
                    # Email history lacks a guaranteed structured resource/recovery contract.
                    # It provides review notifications, never machine authority.
                    events.extend(self.ingest(normalize(payload, checked), allow_dispatch=False))
                    seen.append(delivery_id)
                self.state["history_seen"] = seen[-1000:]
                self.state["history_since"] = checked - 60  # overlap for delayed history writes
                self.state["last_history_success"] = checked
            await self.store.async_save(self.state)
            for event in events:
                self.hass.bus.async_fire(EVENT, event)
            if bool(error) != bool(previous_error):
                self.hass.bus.async_fire(EVENT, {
                    "issue_id": "cloudflare_alert_delivery", "alert_type": "delivery_health",
                    "resource": "account", "action": "open" if error else "resolve", "dispatch": False,
                    "title": "Cloudflare alert delivery needs attention", "severity": "warning",
                    "description": f"Read-only notification history check: {error or 'verified healthy'}. Review the configured Notifications Read access and connectivity.",
                })

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

    async def recover_origins(self, now):
        """Reuse fresh public-website observations; do not declare recovery from age."""
        for record in list(self.state["incidents"].values()):
            entity_id = self.config["recovery_entities"].get(record["resource"])
            if record["action"] != "open" or record["alert_type"] != "real_origin_monitoring" or not entity_id:
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
    receiver.state = await receiver.store.async_load() or receiver.state
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

    async def refresh(call: ServiceCall):
        await receiver.poll_history()
        return await get_status(call)

    async_register_admin_service(hass, DOMAIN, "create_cloudhook", create_cloudhook,
                                 supports_response=SupportsResponse.ONLY)
    hass.services.async_register(DOMAIN, "get_status", get_status,
                                 supports_response=SupportsResponse.ONLY)
    async_register_admin_service(hass, DOMAIN, "refresh", refresh,
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
        await receiver.poll_history()

    hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, restore)
    async_track_time_interval(hass, receiver.recover_origins, timedelta(minutes=5))
    async_track_time_interval(hass, receiver.poll_history, timedelta(minutes=5))
    return True
