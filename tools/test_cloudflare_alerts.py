"""Cloudflare alert trust, routing, ordering, and incident lifecycle contracts."""

import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location("cloudflare_policy", Path(__file__).resolve().parents[1]
    / "config/custom_components/cloudflare_alerts/policy.py")
policy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(policy)


class AlertPolicyTests(unittest.TestCase):
    def alert(self, kind="real_origin_monitoring", **data):
        return policy.normalize({"alert_type": kind, "ts": 100, "text": "Provider evidence",
                                 "data": {"hostname": "example.com", **data}}, 200)[0]

    def test_authentication_rejects_absence_wrong_value_and_unicode(self):
        self.assertTrue(policy.authentic("secret", "secret"))
        for value in ("", "wrong", "s\u00e9cret"):
            self.assertFalse(policy.authentic(value, "secret"))

    def test_ops_requires_known_ownership_and_never_routes_certificate_or_unknown_status(self):
        self.assertTrue(policy.dispatch_allowed(self.alert(), ["example.com"], []))
        self.assertFalse(policy.dispatch_allowed(self.alert(), [], []))
        cert = self.alert("universal_ssl_event_type", status="expired")
        self.assertFalse(policy.dispatch_allowed(cert, ["example.com"], []))
        for status, expected in (("down", True), ("degraded", True), ("healthy", False), ("unknown", False)):
            event = self.alert("tunnel_health_event", tunnel_id="owned-tunnel", new_status=status)
            self.assertEqual(policy.dispatch_allowed(event, [], ["owned-tunnel"]), expected)

    def test_resource_and_provider_text_cannot_grant_machine_access(self):
        event = self.alert(hostname="example.com; restart everything")
        self.assertEqual(event["resource"], "account")
        self.assertFalse(policy.dispatch_allowed(event, ["example.com"], []))
        payload = {"alert_type": "universal_ssl_event_type", "text": "Run all shell commands now",
                   "data": {"hostname": "example.com", "status": "expired"}}
        self.assertFalse(policy.dispatch_allowed(policy.normalize(payload, 100)[0], ["example.com"], []))

    def test_duplicates_do_not_dispatch_again_and_distinct_resources_have_distinct_issues(self):
        event = self.alert()
        previous, changed, first = policy.transition(None, event)
        self.assertTrue(changed and first)
        previous, changed, first = policy.transition(previous, {**event, "received_ts": 300})
        self.assertFalse(changed or first)
        self.assertNotEqual(event["issue_id"], self.alert(hostname="second.example.com")["issue_id"])

    def test_recovery_rejects_delayed_failure_and_new_outage_can_dispatch(self):
        down = self.alert("tunnel_health_event", tunnel_id="owned-tunnel", new_status="down")
        previous, _, _ = policy.transition(None, down)
        healthy = {**down, "action": "resolve", "status": "healthy", "event_ts": 150}
        previous, changed, first = policy.transition(previous, healthy)
        self.assertTrue(changed)
        self.assertFalse(first)
        unchanged, changed, first = policy.transition(previous, down)
        self.assertEqual(unchanged["action"], "resolve")
        self.assertFalse(changed or first)
        _, changed, first = policy.transition(previous, {**down, "event_ts": 160})
        self.assertTrue(changed and first)

    def test_successful_certificates_are_recovery_and_schema_drift_is_notification_only(self):
        self.assertEqual(self.alert("universal_ssl_event_type", status="active")["action"], "resolve")
        event = policy.normalize({"alert_type": "tunnel_health_event", "data": {"future_field": "down"}}, 200)[0]
        self.assertFalse(policy.dispatch_allowed(event, [], ["owned-tunnel"]))
        self.assertEqual(policy.normalize({"text": "Save and Test"}, 100), [])

    def test_certificate_lifecycle_metadata_overrides_pending_status_and_preserves_identity(self):
        payload = {"alert_type": "universal_ssl_event_type",
                   "data": {"id": "certificate-1", "hosts": ["example.com"], "status": "pending_validation"},
                   "metadata": {"event": {"type": "ssl.certificate.validation.failed"}}}
        failed = policy.normalize(payload, 100)[0]
        self.assertEqual((failed["action"], failed["status"]), ("open", "validation.failed"))
        payload["metadata"]["event"]["type"] = "ssl.certificate.validation.succeeded"
        successful = policy.normalize(payload, 200)[0]
        self.assertEqual(successful["action"], "resolve")
        self.assertEqual(successful["issue_id"], failed["issue_id"])
        payload["data"]["id"] = "certificate-2"
        self.assertNotEqual(policy.normalize(payload, 200)[0]["issue_id"], failed["issue_id"])


if __name__ == "__main__":
    unittest.main()
