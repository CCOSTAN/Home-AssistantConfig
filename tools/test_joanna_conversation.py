"""Exercise the actual voice HTTP client against an isolated loopback service."""

import asyncio
import importlib.util
from pathlib import Path
import unittest

import aiohttp
from aiohttp import web

MODULE = Path(__file__).resolve().parents[1] / "config/custom_components/joanna_conversation/client.py"
spec = importlib.util.spec_from_file_location("joanna_client", MODULE)
client_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(client_module)


class VoiceClientTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.calls = []
        self.credentials = []
        self.poll_count = 0
        self.ready = True
        self.lose_acceptance = False
        self.unreadable = False

        async def endpoint(request):
            self.calls.append((request.method, request.path, await request.json() if request.can_read_body else None))
            self.credentials.append(request.headers["Authorization"])
            self.assertIn(request.headers["Authorization"], {"Bearer fixture-token", "Bearer upstairs-token", "Bearer office-token"})
            if request.path.endswith("/status"):
                return web.json_response({"ok": True, "deviceId": "kitchen-device"})
            if request.path.endswith("/conversation"):
                if self.unreadable:
                    return web.Response(text="{broken", content_type="application/json")
                if self.lose_acceptance:
                    request.transport.close()
                    return web.Response()
                return web.json_response({"status": "queued"}, status=202)
            if request.path.endswith(("/ack", "/cancel")):
                return web.json_response({"ok": True})
            self.poll_count += 1
            return web.json_response({"status": "complete" if self.ready else "queued", "text": "The exact Joanna answer."})

        app = web.Application()
        app.router.add_route("*", "/{path:.*}", endpoint)
        self.runner = web.AppRunner(app)
        await self.runner.setup()
        site = web.TCPSite(self.runner, "127.0.0.1", 0)
        await site.start()
        self.session = aiohttp.ClientSession()
        port = site._server.sockets[0].getsockname()[1]
        self.client = client_module.JoannaClient(self.session, f"http://127.0.0.1:{port}", "fixture-token", "kitchen-device", wait_seconds=2, poll_seconds=0.01)

    async def asyncTearDown(self):
        await self.session.close()
        await self.runner.cleanup()

    async def test_exact_answer_reaches_speech_owner_and_receipt_follows_result(self):
        await self.client.validate()
        result = await self.client.converse("What is next?", "kitchen-device")
        self.assertEqual(result, {"text": "The exact Joanna answer.", "success": True})
        self.assertEqual(sum(path.endswith("/conversation") for _, path, _ in self.calls), 1)
        self.assertTrue(self.calls[-1][1].endswith("/ack"))

    async def test_unenrolled_device_cannot_submit(self):
        for device in [None, "office-device"]:
            with self.assertRaises(client_module.JoannaError):
                await self.client.converse("Read my personal data", device)
        self.assertEqual(self.calls, [])

    async def test_shared_pipeline_selects_each_devices_own_credential_and_denies_unknowns(self):
        bindings = [
            {"device_id": "kitchen-device", "token": "fixture-token"},
            {"device_id": "upstairs-device", "token": "upstairs-token"},
            {"device_id": "office-device", "token": "office-token"},
        ]
        router = client_module.JoannaDeviceRouter(self.session, self.client.base_url, bindings)
        for binding in bindings:
            router.clients[binding["device_id"]].poll_seconds = 0.01
            self.calls.clear()
            self.credentials.clear()
            result = await router.converse("Which profile is this?", binding["device_id"])
            self.assertTrue(result["success"])
            self.assertEqual(self.calls[0][2]["deviceId"], binding["device_id"])
            self.assertEqual(set(self.credentials), {"Bearer " + binding["token"]})
        self.calls.clear()
        for device in [None, "unenrolled-device"]:
            with self.assertRaises(client_module.JoannaError):
                await router.converse("Read personal data", device)
        self.assertEqual(self.calls, [])

    async def test_lost_acceptance_is_reconciled_without_repeating_action(self):
        self.lose_acceptance = True
        result = await self.client.converse("Do this once", "kitchen-device")
        self.assertTrue(result["success"])
        self.assertEqual(sum(path.endswith("/conversation") for _, path, _ in self.calls), 1)
        request_id = self.calls[0][2]["requestId"]
        self.assertIn(("GET", f"/api/assist/requests/{request_id}", None), self.calls)

    async def test_unreadable_acceptance_is_spoken_as_uncertain_without_resubmit(self):
        self.unreadable = True
        with self.assertRaisesRegex(client_module.JoannaError, "check the request's outcome"):
            await self.client.converse("Do this once", "kitchen-device")
        self.assertEqual(len(self.calls), 1)

    async def test_timeout_requests_cancel_and_never_claims_action_failed_to_execute(self):
        self.ready = False
        self.client.wait_seconds = 0.05
        with self.assertRaisesRegex(client_module.JoannaError, "check its status"):
            await self.client.converse("Make an action", "kitchen-device")
        self.assertTrue(self.calls[-1][1].endswith("/cancel"))
        self.assertEqual(sum(path.endswith("/conversation") for _, path, _ in self.calls), 1)

    async def test_pipeline_cancel_is_forwarded_to_existing_job(self):
        self.ready = False
        task = asyncio.create_task(self.client.converse("A long request", "kitchen-device"))
        while not self.poll_count:
            await asyncio.sleep(0.005)
        task.cancel()
        with self.assertRaises(asyncio.CancelledError):
            await task
        self.assertTrue(self.calls[-1][1].endswith("/cancel"))


if __name__ == "__main__":
    unittest.main()
