"""Configure an operator-enrolled Joanna voice credential through HA."""

from urllib.parse import urlsplit

import aiohttp
import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers import selector

from . import DOMAIN
from .client import JoannaClient, JoannaError


class JoannaConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """One integration entry per enrolled satellite."""

    VERSION = 1

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        return JoannaOptionsFlow()

    async def async_step_user(self, user_input=None):
        errors = {}
        if user_input is not None:
            url = urlsplit(user_input["base_url"])
            if url.scheme not in {"http", "https"} or not url.hostname or url.username or url.password or url.query or url.fragment or url.path not in {"", "/"}:
                errors["base"] = "invalid_url"
            else:
                client = JoannaClient(async_get_clientsession(self.hass), user_input["base_url"], user_input["token"], user_input["device_id"])
                try:
                    status = await client.validate()
                except (aiohttp.ClientError, JoannaError, TimeoutError, ValueError):
                    errors["base"] = "cannot_connect"
                else:
                    await self.async_set_unique_id(status["deviceKey"])
                    self._abort_if_unique_id_configured()
                    return self.async_create_entry(title=user_input["name"], data=user_input)
        return self.async_show_form(step_id="user", errors=errors, data_schema=vol.Schema({
            vol.Required("name", default="Joanna Voice"): str,
            vol.Required("base_url"): str,
            vol.Required("device_id"): str,
            vol.Required("token"): selector.TextSelector(selector.TextSelectorConfig(type=selector.TextSelectorType.PASSWORD)),
        }))


class JoannaOptionsFlow(config_entries.OptionsFlow):
    """Enroll another device on a shared pipeline without sharing its credential."""

    async def async_step_init(self, user_input=None):
        errors = {}
        if user_input is not None:
            bindings = [self.config_entry.data, *self.config_entry.options.get("satellites", [])]
            if any(item["device_id"] == user_input["device_id"] for item in bindings):
                return self.async_abort(reason="already_configured")
            client = JoannaClient(async_get_clientsession(self.hass), self.config_entry.data["base_url"], user_input["token"], user_input["device_id"])
            try:
                await client.validate()
            except (aiohttp.ClientError, JoannaError, TimeoutError, ValueError):
                errors["base"] = "cannot_connect"
            else:
                return self.async_create_entry(title="", data={
                    **self.config_entry.options,
                    "satellites": [*self.config_entry.options.get("satellites", []), user_input],
                })
        return self.async_show_form(step_id="init", errors=errors, data_schema=vol.Schema({
            vol.Required("device_id"): str,
            vol.Required("token"): selector.TextSelector(selector.TextSelectorConfig(type=selector.TextSelectorType.PASSWORD)),
        }))
