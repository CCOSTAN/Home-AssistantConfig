"""Run the production monitor actions in isolated HA; no live service calls.

Execute with HA's Python runtime. Its mounted /config supplies the YAML.
"""
from datetime import datetime, timedelta, timezone
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

import yaml
from homeassistant.core import Context, HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.script import Script
from homeassistant.helpers.template import Template


class MonitorTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.directory = TemporaryDirectory(prefix="mini-app-monitor-test-")
        self.hass = HomeAssistant(self.directory.name)
        loader = type("Loader", (yaml.SafeLoader,), {})
        loader.add_constructor("!secret", lambda loader, node: loader.construct_scalar(node))
        package = yaml.load(Path("/config/packages/bearclaw.yaml").read_text(), Loader=loader)
        automation = next(item for item in package["automation"] if item["id"] == "joanna_mini_app_health_monitor")
        self.problem_config = next(item for block in package["template"] for item in block.get("binary_sensor", []) if item.get("unique_id") == "joanna_mini_app_problem")
        self.script = Script(self.hass, cv.SCRIPT_SCHEMA(automation["action"]), "Mini App test", "automation")
        self.calls = []

        async def record(call):
            self.calls.append((call.domain, call.service, dict(call.data)))
            if call.domain == "input_boolean":
                self.hass.states.async_set("input_boolean.joanna_mini_app_incident_active", "on" if call.service == "turn_on" else "off")

        for domain, services in {"repairs": ["create", "remove"], "input_boolean": ["turn_on", "turn_off"], "script": ["notify_engine", "send_to_logbook", "joanna_dispatch"]}.items():
            for service in services:
                self.hass.services.async_register(domain, service, record)
        self.hass.states.async_set("input_boolean.joanna_mini_app_incident_active", "off")
        self.hass.states.async_set("sensor.bearclaw_status_telemetry", "ok")

    async def asyncTearDown(self):
        await self.hass.async_stop(force=True)
        self.directory.cleanup()

    async def run_monitor(self, state):
        self.hass.states.async_set("binary_sensor.joanna_mini_app_problem", state, {"summary": "fixture failure"})
        await self.script.async_run(context=Context())

    async def test_outage_deduplicates_and_recovery_clears_owned_repair(self):
        await self.run_monitor("on")
        self.assertEqual(sum(domain == "repairs" and service == "create" for domain, service, _ in self.calls), 1)
        self.assertEqual(sum(service == "joanna_dispatch" for _, service, _ in self.calls), 1)
        self.assertEqual(sum(service == "notify_engine" for _, service, _ in self.calls), 1)
        count = len(self.calls)
        await self.run_monitor("on")
        self.assertEqual(len(self.calls), count)
        await self.run_monitor("off")
        removed = [data["issue_id"] for domain, service, data in self.calls if domain == "repairs" and service == "remove"]
        self.assertEqual(removed, ["joanna_mini_app_unavailable"])
        self.assertEqual(self.hass.states.get("input_boolean.joanna_mini_app_incident_active").state, "off")

    async def test_main_service_down_keeps_independent_alert_without_dispatch(self):
        self.hass.states.async_set("sensor.bearclaw_status_telemetry", "unavailable")
        await self.run_monitor("on")
        self.assertTrue(any(service == "create" for _, service, _ in self.calls))
        self.assertTrue(any(service == "notify_engine" for _, service, _ in self.calls))
        self.assertFalse(any(service == "joanna_dispatch" for _, service, _ in self.calls))

    async def test_healthy_and_unknown_startup_do_not_notify(self):
        for state in ("unknown", "unavailable", "off"):
            await self.run_monitor(state)
        self.assertEqual(self.calls, [])

    async def test_frozen_success_and_missing_probe_are_failures(self):
        template = Template(self.problem_config["state"], self.hass)
        now = datetime.now(timezone.utc)
        for state, age, expected in (("ok", 0, False), ("error", 0, True), ("unavailable", 0, True), ("ok", 240, True)):
            self.hass.states.async_set("sensor.joanna_mini_app_probe", state, {"checked_at": (now - timedelta(seconds=age)).isoformat()})
            self.assertEqual(template.async_render(), expected)


if __name__ == "__main__":
    unittest.main()
