"""Safety policy contracts; no live services, credentials, or vehicle commands."""

import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location(
    "charge_policy", Path(__file__).resolve().parents[1]
    / "config/custom_components/tesla_charge_guard/policy.py")
policy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(policy)


class ChargePolicyTests(unittest.TestCase):
    def setUp(self):
        self.now = 10_000
        self.tesla = dict(current=16, charging="charging", sample_time=self.now,
                          location_time=self.now, at_home=True, dc=False, plugged=True)
        self.juicebox = dict(current=16, status="Charging", current_time=self.now,
                            status_time=self.now)

    def assess(self):
        return policy.classify(self.tesla, self.juicebox, self.now)

    def test_actual_current_guardrail_and_no_masking_by_lower_source(self):
        for source in (self.tesla, self.juicebox):
            with self.subTest(source=source):
                source["current"] = 18.1
                self.assertEqual(self.assess()["status"], "excessive")
                self.assertTrue(self.assess()["stop_allowed"])
                source["current"] = 18
                self.assertEqual(self.assess()["status"], "charging_safe")

    def test_cached_zero_and_missing_values_never_prove_stopped(self):
        self.tesla.update(current=0, charging="stopped", sample_time=self.now - 121)
        self.juicebox.update(current=0, status="Unplugged", current_time=self.now - 61)
        self.assertEqual(self.assess()["status"], "unverified")
        for invalid in (None, "unknown", "nan", "inf", -1, True):
            with self.subTest(invalid=invalid):
                self.tesla.update(current=invalid, sample_time=self.now)
                self.juicebox.update(current=invalid, current_time=self.now)
                self.assertEqual(self.assess()["status"], "unverified")

    def test_fresh_away_and_dc_reports_veto_all_vehicle_stops(self):
        self.juicebox["current"] = 24
        self.tesla["at_home"] = False
        self.assertFalse(self.assess()["stop_allowed"])
        self.tesla.update(at_home=True, dc=True)
        self.assertFalse(self.assess()["stop_allowed"])
        self.tesla["current"] = None
        result = policy.classify(self.tesla, self.juicebox, self.now, session_active=True)
        self.assertFalse(result["stop_allowed"])

    def test_home_charger_activity_without_vehicle_scope_requires_investigation(self):
        result = policy.classify({}, self.juicebox, self.now)
        self.assertEqual(result["status"], "unverified")
        self.assertTrue(result["home_session"])
        self.assertFalse(result["stop_allowed"])
        self.assertIsNone(result["session_observed"])

    def test_home_zero_clears_home_incident_without_stopping_vehicle_away(self):
        self.tesla["at_home"] = False
        self.juicebox.update(current=0, status="Unplugged")
        result = self.assess()
        self.assertEqual(result["status"], "stopped")
        self.assertFalse(result["stop_allowed"])
        self.assertFalse(result["home_session"])

    def test_unknown_home_session_keeps_the_protective_stop_scope(self):
        self.tesla["sample_time"] = self.now - 121
        self.juicebox["current_time"] = self.now - 61
        result = self.assess()
        self.assertEqual(result["status"], "unverified")
        self.assertTrue(result["home_session"])
        self.assertTrue(result["stop_allowed"])

    def test_newer_unplugged_report_does_not_resurrect_old_charging_session(self):
        self.tesla["sample_time"] = self.now - 300
        self.juicebox.update(current=0, status="Unplugged", current_time=self.now - 100,
                             status_time=self.now - 100)
        result = self.assess()
        self.assertEqual(result["status"], "unverified")
        self.assertFalse(result["home_session"])
        self.assertFalse(result["stop_allowed"])

    def test_restored_home_session_remains_unverified_until_new_source_data(self):
        result = policy.classify({}, {}, self.now, session_active=True)
        self.assertEqual(result["status"], "unverified")
        self.assertTrue(result["stop_allowed"])
        self.assertIsNone(result["session_observed"])
        self.tesla["at_home"] = False
        result = policy.classify(self.tesla, {}, self.now, session_active=True)
        self.assertFalse(result["stop_allowed"])
        self.assertFalse(result["session_observed"])

    def test_fresh_zero_requires_a_stopped_state_and_no_active_conflict(self):
        self.tesla.update(current=0, charging="stopped")
        self.juicebox.update(current=0, status="Unplugged")
        self.assertEqual(self.assess()["status"], "stopped")
        self.tesla.update(current=16, charging="charging")
        self.assertNotEqual(self.assess()["status"], "stopped")
        self.tesla.update(current=0, charging="unknown")
        self.juicebox["status"] = "unknown"
        self.assertEqual(self.assess()["status"], "unverified")

    def test_future_samples_and_old_status_cannot_prove_safe(self):
        self.tesla["sample_time"] = self.now + 6
        self.juicebox["status_time"] = self.now - 61
        self.assertEqual(self.assess()["status"], "unverified")


if __name__ == "__main__":
    unittest.main()
