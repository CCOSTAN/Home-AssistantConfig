"""Connect an enrolled Assist satellite to the existing Joanna human agent."""

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .client import JoannaDeviceRouter

DOMAIN = "joanna_conversation"
PLATFORMS = [Platform.CONVERSATION]


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Load one device-bound connection; the credential stays in HA."""
    entry.runtime_data = JoannaDeviceRouter(
        async_get_clientsession(hass), entry.data["base_url"],
        [entry.data, *entry.options.get("satellites", [])],
    )
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(async_reload_entry))
    return True


async def async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Apply a validated additional satellite through the native options flow."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload the conversation entity."""
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
