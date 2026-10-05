"""Exercise shared health templates with independent alarm and recovery fixtures."""
from pathlib import Path
from datetime import datetime, timezone, timedelta
from types import SimpleNamespace
import unittest

from jinja2 import Environment, FileSystemLoader
import yaml

ROOT = Path(__file__).resolve().parents[1]


def as_function(macro):
    def invoke(*args, **kwargs):
        result = []
        macro(*args, returns=result.append, **kwargs)
        return result[0]
    return invoke


class InfrastructureHealthTest(unittest.TestCase):
    def setUp(self):
        self.states = {
            **{f"binary_sensor.{name}": "off" for name in [
                "infra_wan_quality_degraded", "infra_dns_pihole_degraded",
                "infra_nebula_sync_degraded", "infra_pihole_iot_dns_degraded",
                "infra_compute_degraded", "infra_storage_degraded",
                "node_proxmox1_updates_packages", "node_proxmox02_updates_packages",
                "infra_external_monitoring_degraded", "tesla_home_charge_attention",
                "infra_ups_problem", "docker_host_maintenance_attention",
                "hvac_maintenance_due", "home_water_problem", "kiosk_devices_need_attention",
                "joanna_memory_index_stale",
            ]},
            "sensor.l10s_vacuum_error": "no_error",
            "binary_sensor.powerwall_status": "on",
            "binary_sensor.powerwall_grid_status": "on",
            "input_text.infra_eaton_low_voltage_since": "",
            "sensor.mariadb_status": "running",
            "sensor.bearclaw_scheduled_job_health": "ok",
            "sensor.joanna_onenote_kb_health": "ok",
            "binary_sensor.joanna_mini_app_problem": "off",
            "sensor.active_issues": "0",
            "sensor.garage_ups_status_data": "OL",
            "sensor.garage_ups_status": "Online",
            "sensor.office_ups_eaton_550_status_data": "OL",
            "sensor.office_ups_eaton_550_status": "Online",
            "sensor.office_office_ups_eaton_3s_550_alarms": "",
            "sensor.office_ups_cyberpower_status_data": "OL",
            "sensor.office_ups_cyberpower_status": "Online",
        }
        self.env = Environment(loader=FileSystemLoader(ROOT / "config/custom_templates"),
                               extensions=["jinja2.ext.do"])
        self.env.filters["as_function"] = as_function
        self.env.globals["states"] = lambda entity_id: self.states.get(entity_id, "unknown")
        self.attributes = {}
        self.env.globals["state_attr"] = lambda entity_id, name: self.attributes.get(entity_id, {}).get(name)
        self.clock = datetime(2026, 10, 1, 21, tzinfo=timezone.utc)
        self.env.globals["now"] = lambda: self.clock
        self.env.globals["as_timestamp"] = self.timestamp
        self.env.globals["expand"] = lambda entity_id: [SimpleNamespace(state=self.states[entity_id])] if entity_id in self.states else []
        self.env.globals["states"].sensor = SimpleNamespace(
            office_ups_eaton_550_status_data=SimpleNamespace(last_changed=self.clock),
            office_office_ups_eaton_3s_550_alarms=SimpleNamespace(last_changed=self.clock))
        self.module = self.env.get_template("infrastructure_health.jinja").module
        loader = type("Loader", (yaml.SafeLoader,), {})
        loader.add_constructor("!secret", lambda loader, node: loader.construct_scalar(node))
        self.package = yaml.load((ROOT / "config/packages/infrastructure.yaml").read_text(), Loader=loader)
        self.counter = next(sensor for block in self.package["template"] for sensor in block.get("sensor", [])
                            if sensor.get("unique_id") == "infra_dashboard_active_issue_count")

    def issues(self):
        return as_function(self.module.ups_issues)()

    @staticmethod
    def timestamp(value, default=None):
        try:
            return (value if isinstance(value, datetime) else datetime.fromisoformat(value)).timestamp()
        except (TypeError, ValueError):
            return default

    def warning(self, age=86400):
        self.states.update({
            "sensor.office_ups_eaton_550_status_data": "ALARM OL",
            "sensor.office_ups_eaton_550_status": "Alarm, Online",
            "sensor.office_office_ups_eaton_3s_550_alarms": "Battery voltage too low!",
            "input_text.infra_eaton_low_voltage_since": (self.clock - timedelta(seconds=age)).isoformat(),
        })

    def policy(self):
        return as_function(self.module.eaton_low_voltage_policy)()

    def reconcile_grace(self):
        automation = next(item for item in self.package['automation']
                          if item['id'] == 'infra_eaton_low_voltage_grace_period')
        if self.env.from_string(automation['condition'][0]['value_template']).render().strip() != 'True':
            return
        variables = {'policy': self.policy(), 'started': self.states['input_text.infra_eaton_low_voltage_since']}
        variables['stable_recovery'] = self.env.from_string(automation['variables']['stable_recovery']).render(**variables).strip() == 'True'
        for branch in automation['action'][0]['choose']:
            if self.env.from_string(branch['conditions']).render(**variables).strip() == 'True':
                action = branch['sequence'][0]
                self.states[action['target']['entity_id']] = self.env.from_string(action['data']['value']).render(**variables).strip()
                break

    def test_grace_initializes_unknown_helper_and_restarts_after_new_outage(self):
        self.warning()
        self.states['input_text.infra_eaton_low_voltage_since'] = 'unknown'
        self.reconcile_grace()
        self.assertEqual(self.states['input_text.infra_eaton_low_voltage_since'], self.clock.isoformat())
        self.clock += timedelta(hours=25)
        self.assertTrue(self.policy()['ignored'])
        self.states['binary_sensor.powerwall_grid_status'] = 'off'
        self.reconcile_grace()
        self.assertEqual(self.states['input_text.infra_eaton_low_voltage_since'], '')
        self.states['binary_sensor.powerwall_grid_status'] = 'on'
        self.reconcile_grace()
        self.assertFalse(self.policy()['ignored'])
        self.assertEqual(self.states['input_text.infra_eaton_low_voltage_since'], self.clock.isoformat())

    def test_short_driver_reconnect_preserves_grace_but_stable_recovery_clears_it(self):
        self.warning()
        onset = self.states['input_text.infra_eaton_low_voltage_since']
        self.states['sensor.office_ups_eaton_550_status_data'] = 'unavailable'
        self.reconcile_grace()
        self.assertEqual(self.states['input_text.infra_eaton_low_voltage_since'], onset)
        self.states['sensor.office_ups_eaton_550_status_data'] = 'OL'
        self.states['sensor.office_office_ups_eaton_3s_550_alarms'] = ''
        self.reconcile_grace()
        self.assertEqual(self.states['input_text.infra_eaton_low_voltage_since'], onset)
        self.clock += timedelta(seconds=121)
        self.reconcile_grace()
        self.assertEqual(self.states['input_text.infra_eaton_low_voltage_since'], '')

    def test_exact_warning_expires_at_24_hours_and_preserves_raw_data(self):
        self.warning(86399)
        self.assertEqual(self.count(), 1)
        self.assertFalse(self.policy()["ignored"])
        self.clock += timedelta(seconds=1)
        self.assertEqual(self.count(), 0)
        self.assertTrue(self.policy()["ignored"])
        self.assertEqual(self.policy()["raw_alarm"], "Battery voltage too low!")
        self.assertEqual(self.policy()["raw_status"], "ALARM OL")

    def test_other_faults_and_missing_power_telemetry_never_expire(self):
        for entity_id, values in {
            "sensor.office_ups_eaton_550_status_data": ["OB", "ALARM OL RB", "ALARM OL LB", "ALARM OL DISCHRG", "ALARM OL OVER", "unavailable", "unknown"],
            "sensor.office_office_ups_eaton_3s_550_alarms": ["Battery voltage too low! Replace battery!", "Battery voltage too low! Internal UPS fault!", "Battery voltage too high!", "unknown", "unavailable", ""],
            "binary_sensor.powerwall_grid_status": ["off", "unknown", "unavailable"],
        }.items():
            for value in values:
                with self.subTest(entity=entity_id, value=value):
                    self.warning(172800)
                    self.states["binary_sensor.powerwall_grid_status"] = "on"
                    self.states[entity_id] = value
                    self.assertFalse(self.policy()["ignored"])
                    self.assertEqual(self.count(), 1)

    def test_missing_invalid_and_future_onset_do_not_acknowledge(self):
        for value in ["", "unknown", "unavailable", "bad timestamp", (self.clock + timedelta(days=1)).isoformat()]:
            self.warning()
            self.states["input_text.infra_eaton_low_voltage_since"] = value
            self.assertFalse(self.policy()["ignored"])
            self.assertEqual(self.count(), 1)

    def test_new_outage_or_fault_resets_grace_but_unknown_preserves_onset(self):
        self.warning()
        self.assertFalse(self.policy()["reset_required"])
        self.states["binary_sensor.powerwall_grid_status"] = "off"
        self.assertTrue(self.policy()["reset_required"])
        self.states["binary_sensor.powerwall_grid_status"] = "unknown"
        self.assertFalse(self.policy()["reset_required"])
        self.states["binary_sensor.powerwall_grid_status"] = "on"
        self.states["sensor.office_ups_eaton_550_status_data"] = "ALARM OL RB"
        self.assertTrue(self.policy()["reset_required"])

    def test_acknowledgment_is_scoped_to_eaton_and_restored_timestamp(self):
        self.warning(90000)
        self.states["sensor.garage_ups_status_data"] = "ALARM OL"
        self.assertEqual(self.count(), 1)
        self.assertEqual(self.issues()[0]["name"], "Garage UPS")
        restored_module = self.env.get_template("infrastructure_health.jinja").make_module()
        self.assertTrue(as_function(restored_module.eaton_low_voltage_policy)()["ignored"])

    def count(self):
        self.states["binary_sensor.infra_ups_problem"] = "on" if self.issues() else "off"
        return int(self.env.from_string(self.counter["state"]).render().strip())

    def test_online_alarm_reaches_overview_and_preserves_alarm(self):
        self.states.update({"sensor.office_ups_eaton_550_status_data": "ALARM OL",
                            "sensor.office_ups_eaton_550_status": "Alarm, Online",
                            "sensor.office_office_ups_eaton_3s_550_alarms": "Battery voltage too low!"})
        self.assertEqual(self.count(), 1)
        self.assertEqual(self.issues()[0]["alarm"], "Battery voltage too low!")
        self.assertIn("binary_sensor.infra_ups_problem", as_function(self.module.dashboard_active_entities)())

    def test_all_three_ups_devices_cover_abnormal_and_missing_states(self):
        for entity_id in ["sensor.garage_ups_status_data", "sensor.office_ups_eaton_550_status_data",
                          "sensor.office_ups_cyberpower_status_data"]:
            for status in ["OB", "OL RB", "OL LB", "OL OVER", "OFF", "FSD", "BYPASS", "ALARM OL", "unavailable", "unknown"]:
                with self.subTest(entity_id=entity_id, status=status):
                    self.states[entity_id] = status
                    self.assertEqual(self.count(), 1)
                    self.assertEqual(self.issues()[0]["entity_id"], entity_id)
                    self.states[entity_id] = "OL"

    def test_charging_and_recovery_are_healthy(self):
        self.states["sensor.office_ups_eaton_550_status_data"] = "OL CHRG"
        self.assertEqual(self.count(), 0)
        self.states["sensor.office_ups_eaton_550_status_data"] = "ALARM OL"
        self.assertEqual(self.count(), 1)
        self.states["sensor.office_ups_eaton_550_status_data"] = "OL"
        self.assertEqual(self.count(), 0)

    def test_submenu_faults_and_warnings_cannot_leave_all_clear(self):
        for entity_id, fault in [("sensor.l10s_vacuum_error", "brush_stuck"),
                                 ("binary_sensor.powerwall_status", "off"),
                                 ("sensor.mariadb_status", "stopped"),
                                 ("sensor.bearclaw_scheduled_job_health", "warning"),
                                 ("sensor.joanna_onenote_kb_health", "warning"),
                                 ("binary_sensor.joanna_mini_app_problem", "on"),
                                 ("binary_sensor.infra_nebula_sync_degraded", "on"),
                                 ("binary_sensor.node_proxmox1_updates_packages", "on")]:
            with self.subTest(entity_id=entity_id):
                previous = self.states[entity_id]
                self.states[entity_id] = fault
                self.assertGreater(self.count(), 0)
                self.assertIn(entity_id, as_function(self.module.dashboard_active_entities)())
                self.states[entity_id] = previous

    def test_repairs_gate_clear_without_double_adding_overlap(self):
        self.states["sensor.active_issues"] = "2"
        self.assertEqual(self.count(), 2)
        self.states["sensor.office_ups_eaton_550_status_data"] = "ALARM OL"
        self.assertEqual(self.count(), 2)

    def severity(self):
        return self.env.from_string(self.counter["attributes"]["severity"]).render().strip()

    def test_warning_only_rollup_stays_warning_and_counts_all_sources(self):
        self.assertEqual(self.severity(), "healthy")
        self.states.update({
            "sensor.bearclaw_scheduled_job_health": "warning",
            "sensor.joanna_onenote_kb_health": "warning",
            "binary_sensor.node_proxmox1_updates_packages": "on",
        })
        self.assertEqual(self.count(), 3)
        self.assertEqual(self.severity(), "warning")

    def test_critical_overrides_warning_then_recovers_through_warning_to_clear(self):
        self.states["sensor.bearclaw_scheduled_job_health"] = "warning"
        self.states["binary_sensor.infra_nebula_sync_degraded"] = "on"
        self.assertEqual(self.count(), 2)
        self.assertEqual(self.severity(), "critical")
        self.states["binary_sensor.infra_nebula_sync_degraded"] = "off"
        self.assertEqual(self.count(), 1)
        self.assertEqual(self.severity(), "warning")
        self.states["sensor.bearclaw_scheduled_job_health"] = "error"
        self.assertEqual(self.severity(), "critical")
        self.states["sensor.bearclaw_scheduled_job_health"] = "ok"
        self.assertEqual(self.count(), 0)
        self.assertEqual(self.severity(), "healthy")

    def test_category_escalation_changes_severity_without_changing_issue_count(self):
        for attention, critical in [
            ("binary_sensor.infra_wan_quality_degraded", "binary_sensor.infra_wan_critical"),
            ("binary_sensor.tesla_home_charge_attention", "binary_sensor.tesla_home_charge_critical"),
        ]:
            with self.subTest(attention=attention):
                self.states[attention] = "on"
                self.states[critical] = "off"
                self.assertEqual(self.count(), 1)
                self.assertEqual(self.severity(), "warning")
                self.states[critical] = "on"
                self.assertEqual(self.count(), 1)
                self.assertEqual(self.severity(), "critical")
                self.states[attention] = "off"
                self.states[critical] = "off"

    def test_water_telemetry_warning_cannot_mask_a_water_fault(self):
        self.states.update({
            "binary_sensor.home_water_problem": "on",
            "binary_sensor.rheem_wh_telemetry_stale": "on",
            "binary_sensor.rheem_wh_active_alert": "off",
        })
        self.attributes["binary_sensor.home_water_problem"] = {
            "active_entities": ["binary_sensor.rheem_wh_problem"]}
        self.assertEqual(self.severity(), "warning")
        self.attributes["binary_sensor.home_water_problem"]["active_entities"].append(
            "binary_sensor.garage_phyn_leak_alert")
        self.assertEqual(self.severity(), "critical")

    def test_open_repairs_and_missing_health_never_become_warning_only_or_clear(self):
        self.states["sensor.bearclaw_scheduled_job_health"] = "warning"
        self.states["sensor.active_issues"] = "2"
        self.assertEqual(self.count(), 2)
        self.assertEqual(self.severity(), "critical")
        self.states["sensor.active_issues"] = "0"
        self.states["sensor.bearclaw_scheduled_job_health"] = "unavailable"
        self.assertEqual(self.count(), 1)
        self.assertEqual(self.severity(), "critical")


if __name__ == "__main__":
    unittest.main()
