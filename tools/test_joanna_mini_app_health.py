"""Exercise real HTTP failures without touching the live Mini App or HA."""
import importlib.util
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
import unittest

spec = importlib.util.spec_from_file_location("mini_app_health", Path(__file__).resolve().parents[1] / "config/shell_scripts/joanna_mini_app_health.py")
health = importlib.util.module_from_spec(spec)
spec.loader.exec_module(health)


class ProbeTests(unittest.TestCase):
    def setUp(self):
        self.responses = {
            "/miniapp/": (200, "text/html", b'<script src="/miniapp/app.js"></script><link href="/miniapp/app.css">'),
            "/miniapp/app.js": (200, "text/javascript", b"console.log('app');"),
            "/miniapp/app.css": (200, "text/css", b"body { color: white; }"),
            "/miniapp/api/home": (401, "application/json", b'{"ok":false,"error":"open_from_telegram"}'),
        }
        responses = self.responses

        class Handler(BaseHTTPRequestHandler):
            def do_GET(self):
                status, content_type, body = responses[self.path]
                self.send_response(status)
                self.send_header("Content-Type", content_type)
                self.send_header("Location", "/miniapp/")
                self.end_headers()
                self.wfile.write(body)

            def log_message(self, *_):
                pass

        self.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base = f"http://127.0.0.1:{self.server.server_port}/miniapp/"
        self.settings = {"origin_url": self.base, "public_url": self.base}

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()

    def test_expected_auth_rejection_is_healthy(self):
        self.assertEqual(health.probe(self.settings)["status"], "ok")

    def test_edge_failure_does_not_mislabel_origin(self):
        self.settings["public_url"] = "http://127.0.0.1:1/miniapp/"
        result = health.probe(self.settings)
        self.assertEqual((result["status"], result["origin"], result["public"]), ("error", "ok", "error"))

    def test_auth_bypass_bad_assets_and_proxy_pages_fail(self):
        cases = (
            ("/miniapp/api/home", 200, "application/json", b'{"ok":true}'),
            ("/miniapp/api/home", 401, "application/json", b'{"error":"proxy_login"}'),
            ("/miniapp/app.js", 502, "text/html", b"Bad gateway"),
            ("/miniapp/app.css", 200, "text/html", b"Login"),
            ("/miniapp/", 200, "text/html", b"Login"),
            ("/miniapp/", 302, "text/html", b"Redirect"),
        )
        for path, status, content_type, body in cases:
            original = self.responses[path]
            with self.subTest(path=path, status=status):
                self.responses[path] = (status, content_type, body)
                self.assertEqual(health.probe(self.settings)["status"], "error")
            self.responses[path] = original


if __name__ == "__main__":
    unittest.main()
