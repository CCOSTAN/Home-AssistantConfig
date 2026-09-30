"""Read-only source verification for the package's native HA charging actions."""

import asyncio
from time import time

import voluptuous as vol

from homeassistant.components import mqtt, zone
from homeassistant.const import EVENT_HOMEASSISTANT_STOP
from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv, entity_registry as er
from homeassistant.helpers.typing import ConfigType

from .policy import classify, number

DOMAIN = "tesla_charge_guard"
EVENT = "tesla_charge_guard_report"
CONFIG_SCHEMA = vol.Schema({DOMAIN: vol.Schema({
    vol.Required("entity_id"): cv.entity_id,
    vol.Required("mqtt_prefix"): mqtt.valid_subscribe_topic,
    vol.Optional("current_limit", default=18): vol.All(vol.Coerce(float), vol.Range(min=1, max=48)),
})}, extra=vol.ALLOW_EXTRA)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Expose coordinator sample times without adding credentials or controls."""
    settings = config[DOMAIN]
    juicebox = {}
    observation_started = time()
    refresh_lock = asyncio.Lock()

    def vehicle():
        registry_entry = er.async_get(hass).async_get(settings["entity_id"])
        if registry_entry is None or registry_entry.platform != "tesla_fleet":
            raise ServiceValidationError("Configured entity must belong to Tesla Fleet")
        entry = hass.config_entries.async_get_entry(registry_entry.config_entry_id)
        runtime = getattr(entry, "runtime_data", None)
        for item in getattr(runtime, "vehicles", []):
            if registry_entry.unique_id.startswith(f"{item.vin}-"):
                return item
        raise ServiceValidationError("Tesla Fleet vehicle is not loaded")

    def assessment():
        tesla = {}
        try:
            data = vehicle().coordinator.data or {}
            latitude = data.get("drive_state_latitude")
            longitude = data.get("drive_state_longitude")
            home = hass.states.get("zone.home")
            at_home = (zone.in_zone(home, latitude, longitude)
                       if home and latitude is not None and longitude is not None else None)
            charging = str(data.get("charge_state_charging_state", "")).lower()
            tesla = {
                "current": data.get("charge_state_charger_actual_current"),
                "charging": charging,
                "sample_time": (number(data.get("charge_state_timestamp")) or 0) / 1000,
                "location_time": (number(data.get("drive_state_timestamp")) or 0) / 1000,
                "at_home": at_home,
                "dc": data.get("charge_state_fast_charger_present"),
                "plugged": charging in {"charging", "starting", "stopped", "complete", "no_power", "nopower"},
            }
        except (ServiceValidationError, AttributeError, TypeError, ValueError):
            pass
        session = hass.states.is_state("input_boolean.tesla_home_charge_session_active", "on")
        now = time()
        result = classify(tesla, juicebox, now, settings["current_limit"], session)
        result["mqtt_observation_ready"] = now - observation_started >= 60
        return result

    @callback
    def publish():
        hass.bus.async_fire(EVENT, assessment())

    @callback
    def receive(message):
        # Retained startup/reconnect values cannot establish current draw now.
        if message.retain:
            return
        field = "current" if "/Current/" in message.topic else "status"
        value = number(message.payload) if field == "current" else str(message.payload)
        if value is None:
            # Invalid reports revoke the old field instead of extending its life.
            juicebox.pop(field, None)
            juicebox.pop(f"{field}_time", None)
        else:
            juicebox[field] = value
            juicebox[f"{field}_time"] = time()
        publish()

    removers = []
    for field in ("Current", "Status"):
        removers.append(await mqtt.async_subscribe(
            hass, f"{settings['mqtt_prefix']}/{field}/state", receive))

    async def snapshot(call: ServiceCall):
        error = None
        if call.data["refresh"]:
            try:
                async with asyncio.timeout(25), refresh_lock:
                    await vehicle().coordinator.async_refresh()
            except (ServiceValidationError, TimeoutError) as err:
                error = type(err).__name__
        result = assessment()
        if error:
            result["refresh_error"] = error
        hass.bus.async_fire(EVENT, result)
        return result

    hass.services.async_register(DOMAIN, "snapshot", snapshot,
        schema=vol.Schema({vol.Optional("refresh", default=False): cv.boolean}),
        supports_response=SupportsResponse.OPTIONAL)

    @callback
    def cleanup(_event):
        for remove in removers:
            remove()

    hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, cleanup)
    return True
