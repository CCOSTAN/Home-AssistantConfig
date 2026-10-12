"""Exercise the authenticated receiver in HA's Python runtime without live services."""

from datetime import UTC, datetime
import json
from pathlib import Path
import sys
from tempfile import TemporaryDirectory
import time
import unittest
from unittest.mock import AsyncMock, patch

config_path = Path("/config") if Path("/config/custom_components/cloudflare_alerts").is_dir() else Path(__file__).resolve().parents[1] / "config"
sys.path.insert(0, str(config_path))

from homeassistant.core import HomeAssistant
from homeassistant.util.aiohttp import MockRequest
from custom_components.cloudflare_alerts import AlertReceiver, DOMAIN, EVENT, async_setup


class ReceiverTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.directory = TemporaryDirectory(prefix="cloudflare-receiver-test-")
        self.hass = HomeAssistant(self.directory.name)
        self.config = {"secret": "fixture-secret", "account_id": "fixture-account",
                       "ops_hostnames": ["example.com"], "ops_tunnel_ids": ["owned-tunnel"],
                       "recovery_entities": {"example.com": "binary_sensor.example_website"},
                       "website_dispatch_entity": "automation.website_owner"}
        self.receiver = AlertReceiver(self.hass, self.config)
        self.events = []
        self.hass.bus.async_listen(EVENT, lambda event: self.events.append(event.data))

    async def asyncTearDown(self):
        await self.hass.async_stop(force=True)
        self.directory.cleanup()

    def payload(self, **overrides):
        return {"account_id": "fixture-account", "alert_type": "real_origin_monitoring",
                "data": {"hostname": "example.com"}, "ts": time.time(), **overrides}

    async def send(self, payload, secret="fixture-secret"):
        request = MockRequest(json.dumps(payload).encode(), "cloud", method="POST",
                              headers={"cf-webhook-auth": secret, "Content-Type": "application/json"})
        result = await self.receiver.handle(self.hass, "fixture-hook", request)
        await self.hass.async_block_till_done()
        return result

    async def test_bad_auth_never_reads_body_and_wrong_account_has_no_effect(self):
        request = MockRequest(b"not json", "cloud", headers={"cf-webhook-auth": "wrong"})
        async def fail_if_read():
            self.fail("Unauthenticated request body was read")
        request.text = fail_if_read
        self.assertEqual((await self.receiver.handle(self.hass, "hook", request)).status, 403)
        self.assertEqual((await self.send(self.payload(account_id="wrong-account"))).status, 403)
        self.assertEqual(self.receiver.state["received"], 0)
        self.assertEqual(self.events, [])

    async def test_test_delivery_and_malformed_data_do_not_create_incidents(self):
        self.assertEqual((await self.send({"text": "Generic Cloudflare destination test"})).status, 200)
        self.assertEqual(self.receiver.state["tests"], 1)
        self.assertEqual(self.receiver.state["incidents"], {})
        self.assertEqual((await self.send(["not an object"])).status, 400)
        self.assertEqual((await self.send({"text": "x" * 65537})).status, 413)
        self.assertEqual(self.events, [])

    async def test_owned_dispatch_occurs_once_and_dedup_survives_storage_reload(self):
        payload = self.payload()
        self.assertEqual((await self.send(payload)).status, 200)
        self.assertTrue(self.events[0]["dispatch"])
        self.receiver.state = await self.receiver.store.async_load()
        await self.send(payload)
        self.assertEqual(len(self.events), 1)

    async def test_existing_website_job_suppresses_duplicate_origin_dispatch(self):
        self.hass.states.async_set("automation.website_owner", "on", {"last_triggered": datetime.now(UTC)})
        self.hass.states.async_set("binary_sensor.infra_website_degraded", "on")
        await self.send(self.payload())
        self.assertEqual(self.events[0]["action"], "open")
        self.assertFalse(self.events[0]["dispatch"])

    async def test_certificates_and_unknown_domains_are_notification_only(self):
        await self.send(self.payload(data={"hostname": "unowned.example.com"}))
        await self.send(self.payload(alert_type="universal_ssl_event_type",
                                     data={"hostname": "example.com", "status": "expired"}))
        self.assertEqual(len(self.events), 2)
        self.assertFalse(any(event["dispatch"] for event in self.events))

    async def test_tunnel_recovery_clears_only_its_incident_and_rejects_old_alert(self):
        now = time.time()
        down = self.payload(alert_type="tunnel_health_event", ts=now - 10,
                            data={"tunnel_id": "owned-tunnel", "new_status": "down"})
        await self.send(down)
        await self.send(self.payload(alert_type="tunnel_health_event", ts=now,
                                    data={"tunnel_id": "owned-tunnel", "new_status": "healthy"}))
        await self.send(down)
        self.assertEqual([event["action"] for event in self.events], ["open", "resolve"])
        self.assertEqual(self.events[0]["issue_id"], self.events[1]["issue_id"])

    async def test_origin_requires_fresh_healthy_probe_and_cannot_clear_newer_failure(self):
        await self.send(self.payload())
        record = next(iter(self.receiver.state["incidents"].values()))
        record["received_ts"] = time.time() - 400
        self.hass.states.async_set("binary_sensor.example_website", "off")
        await self.receiver.recover_origins(None)
        self.assertEqual(record["action"], "open")
        self.hass.states.async_set("binary_sensor.example_website", "on")
        await self.receiver.recover_origins(None)
        await self.hass.async_block_till_done()
        self.assertEqual(self.events[-1]["action"], "resolve")
        await self.send(self.payload())
        newer = self.receiver.state["incidents"][record["issue_id"]]
        await self.receiver.resolve(record["issue_id"], "Earlier probe snapshot", newer["received_ts"] - 1)
        self.assertEqual(self.receiver.state["incidents"][record["issue_id"]]["action"], "open")

    async def test_webhook_only_upgrade_preserves_incidents_and_recovers_from_probe_events(self):
        await self.send(self.payload())
        record = next(iter(self.receiver.state["incidents"].values()))
        record["received_ts"] = time.time() - 400
        self.receiver.state.update(history_seen=["old-delivery"], history_since=100,
                                   history_error="", last_history_success=200)
        await self.receiver.store.async_save(self.receiver.state)
        with patch("custom_components.cloudflare_alerts.webhook.async_register"):
            await async_setup(self.hass, {DOMAIN: {**self.config, "webhook_id": "fixture-hook"}})
        self.receiver = self.hass.data[DOMAIN]
        self.assertEqual(self.receiver.state["received"], 1)
        self.assertEqual(len(self.receiver.state["incidents"]), 1)
        saved = await self.receiver.store.async_load()
        self.assertEqual(set(saved), {"incidents", "received", "tests", "last_received",
                                     "last_alert_type", "last_data_fields"})
        self.assertFalse(self.hass.services.has_service(DOMAIN, "refresh"))

        # Changes from unrelated probes cannot close an owned incident.
        self.hass.states.async_set("binary_sensor.unrelated_website", "on")
        await self.hass.async_block_till_done()
        self.assertEqual(len(self.events), 1)
        self.hass.states.async_set("binary_sensor.example_website", "on")
        await self.hass.async_block_till_done()
        self.assertEqual(self.events[-1]["action"], "resolve")

        # An unchanged healthy report still observes the minimum recovery delay.
        await self.send(self.payload())
        self.hass.states.async_set("binary_sensor.example_website", "on")
        await self.hass.async_block_till_done()
        self.assertEqual(self.events[-1]["action"], "open")
        record = self.receiver.state["incidents"][record["issue_id"]]
        record["received_ts"] = time.time() - 400
        self.hass.states.async_set("binary_sensor.example_website", "on")
        await self.hass.async_block_till_done()
        self.assertEqual([event["action"] for event in self.events],
                         ["open", "resolve", "open", "resolve"])

    async def open_tunnel(self, resource="owned-tunnel"):
        await self.send(self.payload(alert_type="tunnel_health_event",
                                    data={"tunnel_id": resource, "new_status": "down"}))
        return next(record for record in self.receiver.state["incidents"].values()
                    if record["resource"] == resource)

    async def test_reconciliation_closes_only_verified_owned_tunnel(self):
        owned = await self.open_tunnel()
        await self.open_tunnel("unknown-tunnel")
        await self.send(self.payload(alert_type="universal_ssl_event_type",
                                     data={"hostname": "example.com", "status": "expired"}))
        with patch.object(self.receiver, "tunnel_health", new=AsyncMock(return_value="healthy")) as health:
            await self.receiver.reconcile()
            self.assertEqual(health.await_count, 1)
        await self.hass.async_block_till_done()
        self.assertEqual(self.receiver.state["incidents"][owned["issue_id"]]["action"], "resolve")
        remaining = [record for record in self.receiver.state["incidents"].values() if record["action"] == "open"]
        self.assertEqual(len(remaining), 2)
        self.assertFalse(any(event["dispatch"] for event in self.events if event["action"] == "resolve"))

    async def test_deferred_delivery_retries_after_appliance_recovery_and_receipt_survives_restart(self):
        record = await self.open_tunnel()
        with patch.object(self.receiver, "dispatch_ready", new=AsyncMock(return_value=False)):
            claim = await self.receiver.claim_dispatch(record["issue_id"], record["first_received_ts"])
        self.assertFalse(claim["allowed"])
        self.assertNotIn("delivery", record)
        with patch.object(self.receiver, "tunnel_health", new=AsyncMock(return_value="down")):
            await self.receiver.reconcile()
        await self.hass.async_block_till_done()
        self.assertTrue(self.events[-1]["dispatch"])
        with patch.object(self.receiver, "dispatch_ready", new=AsyncMock(return_value=True)):
            claim = await self.receiver.claim_dispatch(record["issue_id"], record["first_received_ts"])
            self.assertTrue(claim["allowed"])
            duplicate = await self.receiver.claim_dispatch(record["issue_id"], record["first_received_ts"])
            self.assertFalse(duplicate["allowed"])
        await self.receiver.delivery_result(record["issue_id"], claim["attempt_id"], 202, "fixture-job")
        self.receiver.state = await self.receiver.store.async_load()
        await self.send(self.payload(alert_type="tunnel_health_event",
                                    data={"tunnel_id": "owned-tunnel", "new_status": "degraded"}))
        record = self.receiver.state["incidents"][record["issue_id"]]
        self.assertEqual(record["delivery"]["state"], "accepted")
        with patch.object(self.receiver, "tunnel_health", new=AsyncMock(return_value="down")):
            await self.receiver.reconcile()
        await self.hass.async_block_till_done()
        self.assertFalse(self.events[-1]["dispatch"])
        self.assertEqual(record["action"], "open", "Acceptance must not imply recovery")

    async def test_unknown_delivery_outcome_and_lost_receipt_do_not_repeat_job(self):
        record = await self.open_tunnel()
        claim = await self.receiver.claim_dispatch(record["issue_id"], record["first_received_ts"])
        await self.receiver.delivery_result(record["issue_id"], "wrong-attempt", 202, "unrelated")
        self.assertEqual(record["delivery"]["state"], "inflight")
        record["delivery"]["next_attempt_at"] = time.time() - 1
        with patch.object(self.receiver, "tunnel_health", new=AsyncMock(return_value="down")):
            await self.receiver.reconcile()
        self.assertEqual(record["delivery"]["state"], "uncertain")
        self.assertFalse((await self.receiver.claim_dispatch(record["issue_id"], record["first_received_ts"]))["allowed"])
        # A late real receipt may confirm acceptance without resending anything.
        await self.receiver.delivery_result(record["issue_id"], claim["attempt_id"], 202, "fixture-job")
        self.assertEqual(record["delivery"]["state"], "accepted")

    async def test_explicit_rejection_has_bounded_retries_and_old_opening_cannot_claim(self):
        record = await self.open_tunnel()
        opening = record["first_received_ts"]
        for index in range(3):
            claim = await self.receiver.claim_dispatch(record["issue_id"], opening)
            self.assertTrue(claim["allowed"])
            await self.receiver.delivery_result(record["issue_id"], claim["attempt_id"], 429, "")
            record["delivery"]["next_attempt_at"] = time.time() - 1
        self.assertFalse((await self.receiver.claim_dispatch(record["issue_id"], opening))["allowed"])
        await self.receiver.resolve(record["issue_id"], "Fixture confirmed healthy")
        await self.open_tunnel()
        self.assertFalse((await self.receiver.claim_dispatch(record["issue_id"], opening))["allowed"])

    async def test_failed_health_read_or_new_failure_cannot_clear_incident(self):
        record = await self.open_tunnel()
        with patch.object(self.receiver, "tunnel_health", new=AsyncMock(return_value=None)):
            await self.receiver.reconcile()
        self.assertEqual(record["action"], "open")
        async def new_failure(snapshot):
            self.receiver.ingest([dict(snapshot, status="degraded", event_ts=time.time(), received_ts=time.time())])
            return "healthy"
        with patch.object(self.receiver, "tunnel_health", new=new_failure):
            await self.receiver.reconcile()
        self.assertEqual(self.receiver.state["incidents"][record["issue_id"]]["action"], "open")

    async def test_saved_recovery_reconciles_repair_when_original_event_was_missed(self):
        from homeassistant.helpers import issue_registry as ir
        record = await self.open_tunnel()
        await self.receiver.resolve(record["issue_id"], "Fixture current health verified")
        ir.async_create_issue(self.hass, "spook", "user_" + record["issue_id"],
                              is_fixable=True, severity=ir.IssueSeverity.ERROR,
                              translation_key="fixture")
        self.receiver.state = await self.receiver.store.async_load()
        await self.hass.async_block_till_done()
        self.events.clear()
        result = await self.receiver.reconcile()
        await self.hass.async_block_till_done()
        self.assertEqual(result["incidents"][0]["outcome"], "recovery_presentation_replayed")
        self.assertEqual(self.events[0]["action"], "resolve")
        self.assertFalse(self.events[0]["dispatch"])

    async def test_shared_dispatch_returns_real_intake_receipt_without_changing_legacy_callers(self):
        import yaml
        from homeassistant.core import Context, SupportsResponse
        from homeassistant.helpers import config_validation as cv
        from homeassistant.helpers.script import Script
        cfg = yaml.safe_load((config_path / "script/joanna_dispatch.yaml").read_text())
        async def intake(call):
            return {"status": 202, "content": {"ok": True, "detail": {"jobId": "fixture-job"}}, "headers": {}}
        self.hass.services.async_register("rest_command", "bearclaw_command", intake,
                                           supports_response=SupportsResponse.OPTIONAL)
        script = Script(self.hass, cv.SCRIPT_SCHEMA(cfg["joanna_dispatch"]["sequence"]),
                        "Fixture dispatch", "script")
        data = {"summary": "Fixture only", "request": "No live action",
                "entity_ids": [], "diagnostics": "Isolated fixture"}
        result = await script.async_run(data, Context())
        receipt = result.service_response
        self.assertEqual(receipt["content"]["detail"]["jobId"], "fixture-job")
        await script.async_run(data, Context())


if __name__ == "__main__":
    unittest.main()
