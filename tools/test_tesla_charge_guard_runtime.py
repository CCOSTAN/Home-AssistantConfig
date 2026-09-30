"""Adapter contracts, run inside an HA environment with upstream I/O isolated."""

import asyncio
from pathlib import Path
import sys
from tempfile import TemporaryDirectory
from time import time
from types import SimpleNamespace
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "config"))
from custom_components.tesla_charge_guard import async_setup
from homeassistant.core import HomeAssistant


class AdapterContractTests(unittest.IsolatedAsyncioTestCase):
    async def test_retained_reports_and_successful_cached_refresh_do_not_prove_safety(self):
        with TemporaryDirectory() as directory:
            hass = HomeAssistant(directory)
            hass.states.async_set("zone.home", "0", {"latitude": 0, "longitude": 0, "radius": 100})
            old = (time() - 600) * 1000
            data = dict(charge_state_charger_actual_current=0,
                        charge_state_charging_state="Disconnected",
                        charge_state_timestamp=old, drive_state_timestamp=old,
                        drive_state_latitude=0, drive_state_longitude=0,
                        charge_state_fast_charger_present=False)

            async def refresh():
                # A successful refresh with a sleeping vehicle returns cached data.
                pass

            vehicle = SimpleNamespace(vin="fixture", coordinator=SimpleNamespace(data=data, async_refresh=refresh))
            registry_entry = SimpleNamespace(platform="tesla_fleet", config_entry_id="fixture", unique_id="fixture-current")
            registry = SimpleNamespace(async_get=lambda entity_id: registry_entry)
            hass.config_entries = SimpleNamespace(async_get_entry=lambda entry_id: SimpleNamespace(runtime_data=SimpleNamespace(vehicles=[vehicle])))
            callbacks = {}

            async def subscribe(_hass, topic, callback):
                callbacks[topic] = callback
                return lambda: None

            with patch("custom_components.tesla_charge_guard.er.async_get", return_value=registry), patch("custom_components.tesla_charge_guard.mqtt.async_subscribe", side_effect=subscribe):
                await async_setup(hass, {"tesla_charge_guard": dict(entity_id="sensor.fixture", mqtt_prefix="fixture", current_limit=18)})
                callbacks["fixture/Current/state"](SimpleNamespace(topic="fixture/Current/state", payload="24", retain=True))
                callbacks["fixture/Status/state"](SimpleNamespace(topic="fixture/Status/state", payload="Charging", retain=True))
                result = await hass.services.async_call("tesla_charge_guard", "snapshot", {"refresh": True}, blocking=True, return_response=True)
                self.assertEqual(result["status"], "unverified")
                self.assertFalse(result["tesla_fresh"])
                self.assertFalse(result["juicebox_fresh"])
                callbacks["fixture/Current/state"](SimpleNamespace(topic="fixture/Current/state", payload="24", retain=False))
                callbacks["fixture/Status/state"](SimpleNamespace(topic="fixture/Status/state", payload="Charging", retain=False))
                result = await hass.services.async_call("tesla_charge_guard", "snapshot", {}, blocking=True, return_response=True)
                self.assertEqual(result["status"], "excessive")
                self.assertEqual(result["actual_current"], 24)
                self.assertTrue(result["stop_allowed"])
                self.assertFalse({"vin", "latitude", "longitude", "access_token"} & result.keys())
                callbacks["fixture/Current/state"](SimpleNamespace(topic="fixture/Current/state", payload="nan", retain=False))
                result = await hass.services.async_call("tesla_charge_guard", "snapshot", {}, blocking=True, return_response=True)
                self.assertEqual(result["status"], "unverified")
                self.assertFalse(result["juicebox_fresh"])
                await hass.async_stop(force=True)


if __name__ == "__main__":
    unittest.main()
