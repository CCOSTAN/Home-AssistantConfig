"""Authenticate Cloudflare alerts and relay incident facts to Home Assistant."""

import asyncio
import json
import logging
import time
from datetime import timedelta
from uuid import uuid4

from aiohttp import ClientError, ClientTimeout, web
import voluptuous as vol

from homeassistant.components import cloud, webhook
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED
from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.event import async_track_state_change_event, async_track_state_report_event, async_track_time_interval
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
    vol.Optional("tunnel_api_token", default=""): cv.string,
    vol.Optional("dispatch_probe_url", default=""): vol.Any("", cv.url),
    vol.Optional("website_dispatch_entity", default="automation.infrastructure_website_down_repair_and_dispatch"): cv.entity_id,
})}, extra=vol.ALLOW_EXTRA)


class AlertReceiver:
    """Maintain durable incident identity without helpers or another polling service."""

    def __init__(self, hass: HomeAssistant, config: dict):
        self.hass = hass
        self.config = config
        self.store = Store(hass, 1, DOMAIN)
        self.lock = asyncio.Lock()
        self.reconcile_lock = asyncio.Lock()
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
                record["delivery"] = {"state": "website_owned", "attempts": 0}
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

    async def tunnel_health(self, record):
        """Read only the configured account and allowlisted tunnel, never alert URLs."""
        token = self.config.get("tunnel_api_token")
        if not token or record["resource"] not in self.config["ops_tunnel_ids"]:
            return None
        url = (f"https://api.cloudflare.com/client/v4/accounts/{self.config['account_id']}"
               f"/cfd_tunnel/{record['resource']}")
        try:
            async with async_get_clientsession(self.hass).get(
                    url, headers={"Authorization": f"Bearer {token}"},
                    timeout=ClientTimeout(total=15)) as response:
                if response.status != 200:
                    return None
                body = await response.json()
            result = body.get("result", {})
            if (body.get("success") is True and result.get("id") == record["resource"]
                    and not result.get("deleted_at")):
                return result.get("status")
        except (ClientError, TimeoutError, ValueError):
            pass
        return None

    async def dispatch_ready(self):
        """Defer dispatch while the local appliance is unreachable; consume no attempt."""
        url = self.config.get("dispatch_probe_url")
        if not url:
            return True
        try:
            async with async_get_clientsession(self.hass).get(
                    url, timeout=ClientTimeout(total=5)) as response:
                return response.status == 200
        except (ClientError, TimeoutError):
            return False

    async def claim_dispatch(self, issue_id, opening):
        """Persist a lease before intake; stale/duplicate events cannot launch a job."""
        if not await self.dispatch_ready():
            return {"allowed": False, "reason": "appliance_unavailable"}
        async with self.lock:
            record = self.state["incidents"].get(issue_id)
            if (not record or record["first_received_ts"] != opening or
                    not dispatch_allowed(record, self.config["ops_hostnames"], self.config["ops_tunnel_ids"])):
                return {"allowed": False, "reason": "closed_or_unowned"}
            delivery = record.get("delivery", {})
            if delivery.get("state") == "inflight":
                if time.time() >= delivery.get("next_attempt_at", 0):
                    delivery["state"] = "uncertain"
                    await self.store.async_save(self.state)
                return {"allowed": False, "reason": "awaiting_or_missing_receipt"}
            if (delivery.get("state") in {"accepted", "uncertain", "website_owned"} or
                    delivery.get("attempts", 0) >= 3 or
                    time.time() < delivery.get("next_attempt_at", 0)):
                return {"allowed": False, "reason": "already_owned_or_deferred"}
            attempt_id = uuid4().hex
            record["delivery"] = {"state": "inflight", "attempt_id": attempt_id,
                                  "attempts": delivery.get("attempts", 0) + 1,
                                  "next_attempt_at": time.time() + 300}
            await self.store.async_save(self.state)
            return {"allowed": True, "attempt_id": attempt_id}

    async def delivery_result(self, issue_id, attempt_id, status, job_id):
        """An intake receipt proves acceptance, never recovery; unknown outcomes stop retries."""
        async with self.lock:
            record = self.state["incidents"].get(issue_id)
            if not record or record.get("delivery", {}).get("attempt_id") != attempt_id:
                return
            delivery = record["delivery"]
            accepted = 200 <= status < 300 and bool(job_id)
            # Explicit client rejection is safe to retry; a timeout/5xx may have accepted work.
            delivery.update(state="accepted" if accepted else "pending" if 400 <= status < 500 else "uncertain",
                            http_status=status, job_id=job_id if accepted else "", reported_at=time.time())
            await self.store.async_save(self.state)
            self.hass.bus.async_fire(EVENT, {**record, "dispatch": False, "first_open": False})

    async def reconcile(self, event=None):
        """Verify open incidents after startup and outages before retrying undelivered work."""
        if self.reconcile_lock.locked():
            return {"skipped": "already_running"}
        async with self.reconcile_lock:
            await self.recover_origins(None)
            results = []
            for snapshot in list(self.state["incidents"].values()):
                if snapshot["action"] != "open":
                    # A resolve event can be missed during automation setup/reload.
                    # Replay only a saved resolution whose bridge-owned Repair still exists.
                    if (snapshot["action"] == "resolve" and
                            ir.async_get(self.hass).async_get_issue("spook", "user_" + snapshot["issue_id"])):
                        self.hass.bus.async_fire(EVENT, {**snapshot, "dispatch": False, "first_open": False})
                        results.append({"issue_id": snapshot["issue_id"], "outcome": "recovery_presentation_replayed"})
                    continue
                issue_id = snapshot["issue_id"]
                owned = dispatch_allowed(snapshot, self.config["ops_hostnames"], self.config["ops_tunnel_ids"])
                observed_at = time.time()
                status = None
                if owned and snapshot["alert_type"] == "tunnel_health_event":
                    status = await self.tunnel_health(snapshot)
                    if status == "healthy":
                        await self.resolve(issue_id, "Cloudflare Tunnel API reports healthy for the configured tunnel.", observed_at)
                elif owned and snapshot["alert_type"] == "real_origin_monitoring":
                    entity = self.config["recovery_entities"].get(snapshot["resource"])
                    state = self.hass.states.get(entity) if entity else None
                    if state and time.time() - state.last_reported.timestamp() < 600:
                        status = "down" if state.state == "off" else "healthy" if state.state == "on" else None
                async with self.lock:
                    record = self.state["incidents"][issue_id]
                    # A newer failure arrived during the API read: discard that observation.
                    if record["received_ts"] > observed_at:
                        continue
                    if record["action"] == "resolve":
                        results.append({"issue_id": issue_id, "outcome": "verified_recovered"})
                        continue
                    delivery = record.get("delivery", {})
                    previous_verification = record.get("last_verification")
                    previous_delivery_state = delivery.get("state")
                    if delivery.get("state") == "inflight" and time.time() >= delivery.get("next_attempt_at", 0):
                        delivery["state"] = "uncertain"
                    record["last_verification"] = status or "unverified"
                    record["verified_at"] = observed_at
                    retry = (owned and status in {"down", "degraded", "inactive"} and
                             delivery.get("state") not in {"accepted", "uncertain", "inflight", "website_owned"} and
                             delivery.get("attempts", 0) < 3 and time.time() >= delivery.get("next_attempt_at", 0))
                    await self.store.async_save(self.state)
                    if (retry or previous_verification != record["last_verification"] or
                            previous_delivery_state != delivery.get("state")):
                        self.hass.bus.async_fire(EVENT, {**record, "dispatch": retry, "first_open": False})
                    results.append({"issue_id": issue_id, "outcome": "retry_requested" if retry else
                                    "human_review" if not owned else delivery.get("state", "awaiting_verification")})
            self.state["last_reconciled"] = time.time()
            self.state["last_reconciliation"] = results
            await self.store.async_save(self.state)
            return {"incidents": results}


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
                                "resource": record["resource"], "status": record["status"],
                                "delivery": record.get("delivery", {}),
                                "last_verification": record.get("last_verification", "not_checked")}
                               for record in receiver.state["incidents"].values() if record["action"] == "open"]}

    async def resolve(call: ServiceCall):
        await receiver.resolve(call.data["issue_id"], call.data["verification"])

    async def reconcile(call: ServiceCall):
        return await receiver.reconcile()

    async def claim_dispatch(call: ServiceCall):
        return await receiver.claim_dispatch(call.data["issue_id"], call.data["opening"])

    async def delivery_result(call: ServiceCall):
        await receiver.delivery_result(call.data["issue_id"], call.data["attempt_id"],
                                       call.data["status"], call.data["job_id"])

    async_register_admin_service(hass, DOMAIN, "reconcile", reconcile, supports_response=SupportsResponse.OPTIONAL)
    async_register_admin_service(hass, DOMAIN, "claim_dispatch", claim_dispatch, schema=vol.Schema({
        vol.Required("issue_id"): cv.string, vol.Required("opening"): vol.Coerce(float),
    }), supports_response=SupportsResponse.ONLY)
    async_register_admin_service(hass, DOMAIN, "delivery_result", delivery_result, schema=vol.Schema({
        vol.Required("issue_id"): cv.string, vol.Required("attempt_id"): cv.string,
        vol.Required("status"): vol.Coerce(int), vol.Required("job_id"): cv.string,
    }))

    async_register_admin_service(hass, DOMAIN, "create_cloudhook", create_cloudhook,
                                 supports_response=SupportsResponse.ONLY)
    hass.services.async_register(DOMAIN, "get_status", get_status,
                                 supports_response=SupportsResponse.ONLY)
    async_register_admin_service(hass, DOMAIN, "resolve", resolve, schema=vol.Schema({
        vol.Required("issue_id"): cv.string,
        vol.Required("verification"): vol.All(cv.string, vol.Length(min=10)),
    }))

    async def restore(event):
        # Replay saved closures too: a recovery event may have preceded automation setup.
        for record in receiver.state["incidents"].values():
            hass.bus.async_fire(EVENT, {**record, "dispatch": False, "first_open": False})
        await receiver.reconcile()
    hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, restore)
    async_track_time_interval(hass, receiver.reconcile, timedelta(minutes=5))
    recovery_entities = set(receiver.config["recovery_entities"].values())
    async_track_state_change_event(hass, recovery_entities, receiver.recover_origins)
    async_track_state_report_event(hass, recovery_entities, receiver.recover_origins)
    return True
