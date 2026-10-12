"""Bounded, idempotent request transport with no model or intent routing."""

import asyncio
from uuid import uuid4

import aiohttp


class JoannaError(Exception):
    """A safe spoken transport failure."""


class JoannaDeviceRouter:
    """Select only the credential explicitly enrolled for the originating device."""

    def __init__(self, session, base_url, bindings):
        self.clients = {
            binding["device_id"]: JoannaClient(session, base_url, binding["token"], binding["device_id"])
            for binding in bindings
        }

    async def converse(self, text, device_id):
        client = self.clients.get(device_id)
        if client is None:
            raise JoannaError("This satellite is not enrolled with Joanna.")
        return await client.converse(text, device_id)


class JoannaClient:
    """One enrolled satellite and one persistent Joanna conversation."""

    def __init__(self, session, base_url, token, device_id, *, wait_seconds=180, poll_seconds=1):
        self.session = session
        self.base_url = base_url.rstrip("/")
        self.headers = {"Authorization": f"Bearer {token}"}
        self.device_id = device_id
        self.wait_seconds = wait_seconds
        self.poll_seconds = poll_seconds

    async def request(self, method, path, body=None):
        """Never log credentials or raw upstream errors."""
        async with self.session.request(
            method, self.base_url + path, headers=self.headers, json=body,
            timeout=aiohttp.ClientTimeout(total=12), allow_redirects=False,
        ) as response:
            if response.status >= 400:
                raise JoannaError("Joanna is unavailable or this satellite is not authorized.")
            try:
                data = await response.json()
            except (ValueError, aiohttp.ContentTypeError):
                raise JoannaError("Joanna returned an unreadable response. Please check the request's outcome before repeating an action.") from None
            if not isinstance(data, dict):
                raise JoannaError("Joanna returned an unreadable response.")
            return data

    async def validate(self):
        """Check the credential's exact device binding."""
        status = await self.request("GET", "/api/assist/status")
        if status.get("deviceId") != self.device_id:
            raise JoannaError("This credential belongs to a different satellite.")
        return status

    async def converse(self, text, device_id):
        """Submit once; recover a lost acceptance response by polling its ID."""
        if not device_id or device_id != self.device_id:
            raise JoannaError("This Joanna pilot is available only on the enrolled satellite.")
        request_id = uuid4().hex
        result_path = f"/api/assist/requests/{request_id}"
        try:
            async with asyncio.timeout(self.wait_seconds):
                try:
                    result = await self.request("POST", "/api/assist/conversation", {
                        "requestId": request_id, "deviceId": device_id, "text": text,
                    })
                except (aiohttp.ClientError, TimeoutError):
                    # The request may have been accepted. Do not submit it again.
                    result = await self.request("GET", result_path)
                while result.get("status") not in {"complete", "failed", "canceled"}:
                    await asyncio.sleep(self.poll_seconds)
                    try:
                        result = await self.request("GET", result_path)
                    except (aiohttp.ClientError, TimeoutError):
                        continue
                answer = result.get("text")
                if not isinstance(answer, str) or not answer.strip():
                    raise JoannaError("Joanna could not return that answer. Please ask me to check the request's outcome.")
                try:
                    await self.request("POST", result_path + "/ack", {})
                except (aiohttp.ClientError, JoannaError, TimeoutError):
                    pass  # A lost receipt must not discard a completed answer.
                return {"text": answer, "success": result["status"] == "complete"}
        except (TimeoutError, asyncio.CancelledError) as error:
            try:
                await asyncio.shield(self.request("POST", result_path + "/cancel", {}))
            except (aiohttp.ClientError, JoannaError, TimeoutError):
                pass
            if isinstance(error, asyncio.CancelledError):
                raise
            raise JoannaError("That request took too long, so I asked Joanna to stop. If it involved an action, ask me to check its status before repeating it.") from None
        except aiohttp.ClientError:
            raise JoannaError("I lost my connection to Joanna. I cannot confirm that request's outcome. Please ask me to check before repeating an action.") from None
