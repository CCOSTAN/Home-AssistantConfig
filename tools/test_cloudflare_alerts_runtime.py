"""Exercise the authenticated receiver in HA's Python runtime without live services."""

from datetime import UTC, datetime
import json
from pathlib import Path
import sys
from tempfile import TemporaryDirectory
import time
import unittest
from unittest.mock import patch

config_path = Path("/config") if Path("/config/custom_components/cloudflare_alerts").is_dir() else Path(__file__).resolve().parents[1] / "config"
sys.path.insert(0, str(config_path))

from homeassistant.core import HomeAssistant
from homeassistant.util.aiohttp import MockRequest
from custom_components.cloudflare_alerts import AlertReceiver, EVENT


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

    async def test_notification_history_is_read_only_notification_only_and_durable(self):
        self.receiver.config["api_token"] = "fixture-read-token"
        sent = datetime.now(UTC).isoformat()
        records = [{"id": "delivery-1", "alert_type": "real_origin_monitoring", "sent": sent,
                    "alert_body": json.dumps({"unreachable_zones": [{"host": "example.com", "zone_name": "example.com"}]})},
                   {"id": "delivery-2", "alert_type": "tunnel_health_event", "sent": sent,
                    "alert_body": json.dumps({"tunnel_id": "owned-tunnel", "tunnel_name": "example-tunnel",
                                              "new_status": "TUNNEL_STATUS_TYPE_DEGRADED"})},
                   {"id": "delivery-3", "alert_type": "universal_ssl_event_type", "sent": sent,
                    "alert_body": json.dumps({"data": {"id": "certificate-1", "hosts": ["example.com"], "status": ""},
                                              "metadata": {"event": {"type": "ssl.certificate.validation.failed"}}})},
                   {"id": "delivery-4", "alert_type": "tunnel_health_event", "sent": sent,
                    "alert_body": "A tunnel needs review"}]

        class Response:
            async def __aenter__(self): return self
            async def __aexit__(self, *args): pass
            def raise_for_status(self): pass
            async def json(self): return {"success": True, "result": records}

        calls = []
        class Session:
            def get(self, url, **kwargs):
                calls.append((url, kwargs))
                return Response()

        with patch("custom_components.cloudflare_alerts.async_get_clientsession", return_value=Session()):
            await self.receiver.poll_history()
            await self.hass.async_block_till_done()
            self.receiver.state = await self.receiver.store.async_load()
            await self.receiver.poll_history()
            await self.hass.async_block_till_done()
        self.assertEqual(len(self.events), 4)
        self.assertEqual([(event["resource"], event["status"]) for event in self.events[:3]],
                         [("example.com", "unreachable"), ("owned-tunnel", "degraded"),
                          ("certificate-1", "validation.failed")])
        self.assertFalse(any(event["dispatch"] for event in self.events))
        self.assertEqual(len(self.receiver.state["history_seen"]), 4)
        self.assertTrue(all(url.endswith("/alerting/v3/history") for url, _ in calls))
        self.assertIn("since", calls[0][1]["params"])

    async def test_history_delivery_failure_remains_visible_until_successful_read(self):
        self.receiver.config["api_token"] = "fixture-read-token"
        healthy = False
        class Response:
            async def __aenter__(self): return self
            async def __aexit__(self, *args): pass
            def raise_for_status(self):
                if not healthy: raise ValueError("Read failed")
            async def json(self): return {"success": True, "result": []}
        class Session:
            def get(self, *args, **kwargs): return Response()
        with patch("custom_components.cloudflare_alerts.async_get_clientsession", return_value=Session()):
            await self.receiver.poll_history()
            await self.receiver.poll_history()
            healthy = True
            await self.receiver.poll_history()
            await self.hass.async_block_till_done()
        self.assertEqual([event["action"] for event in self.events], ["open", "resolve"])
        self.assertTrue(all(event["issue_id"] == "cloudflare_alert_delivery" for event in self.events))


if __name__ == "__main__":
    unittest.main()
