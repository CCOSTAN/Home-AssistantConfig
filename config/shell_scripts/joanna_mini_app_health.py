#!/usr/bin/env python3
"""Read-only Mini App origin/edge probe; no Telegram token or personal data.

Private settings: local secrets provide separate origin_url and public_url values
(both ending in /miniapp/). Uses only Python's standard library.
"""

import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import json
from pathlib import Path
import urllib.error
import urllib.parse
import urllib.request


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def check(url, kind, timeout=5):
    """Require the actual app response; a proxy/login page is not healthy."""
    request = urllib.request.Request(url, headers={
        "Cache-Control": "no-cache",
        "User-Agent": "HomeAssistant-MiniAppHealth/1.0",
    })
    try:
        try:
            response = urllib.request.build_opener(NoRedirect).open(request, timeout=timeout)
        except urllib.error.HTTPError as error:
            response = error
        with response:
            status = response.code
            content_type = response.headers.get_content_type()
            body = response.read(2_000_001)
        if len(body) > 2_000_000:
            return "response_too_large"
        expected = 401 if kind == "auth" else 200
        if status != expected:
            return f"http_{status}_expected_{expected}"
        if kind == "auth":
            payload = json.loads(body) if content_type == "application/json" else None
            return "ok" if isinstance(payload, dict) and payload.get("ok") is False and payload.get("error") == "open_from_telegram" else "unexpected_auth_response"
        types = {"html": {"text/html"}, "js": {"text/javascript", "application/javascript"}, "css": {"text/css"}}
        if content_type not in types[kind] or not body.strip():
            return "unexpected_content"
        if kind == "html" and not all(part in body for part in (b"/miniapp/app.js", b"/miniapp/app.css")):
            return "unexpected_app_page"
        return "ok"
    except (OSError, ValueError, urllib.error.URLError):
        # Do not expose URLs, proxy credentials, or response bodies in HA state.
        return "connection_or_response_error"


def probe(settings):
    checks = []
    for lane in ("origin", "public"):
        base = settings[f"{lane}_url"]
        parsed = urllib.parse.urlsplit(base)
        if parsed.scheme not in ("http", "https") or not parsed.netloc or parsed.username or parsed.password or parsed.query or parsed.fragment:
            raise ValueError("Invalid probe URL")
        base = base.rstrip("/") + "/"
        for kind, path in (("html", ""), ("js", "app.js"), ("css", "app.css"), ("auth", "api/home")):
            checks.append((f"{lane}_{kind}", base + path, kind))
    with ThreadPoolExecutor(max_workers=len(checks)) as pool:
        values = list(pool.map(lambda item: check(item[1], item[2]), checks))
    results = dict(zip((item[0] for item in checks), values))
    failures = [f"{name}: {result}" for name, result in results.items() if result != "ok"]
    return {
        "status": "error" if failures else "ok",
        **{lane: "ok" if all(results[f"{lane}_{kind}"] == "ok" for kind in ("html", "js", "css", "auth")) else "error" for lane in ("origin", "public")},
        "summary": "; ".join(failures) if failures else "Local server and public route healthy",
        "checks": results,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", type=Path, default=Path(__file__).resolve().parents[1] / "secrets" / "joanna_mini_app_monitor.json")
    args = parser.parse_args()
    try:
        result = probe(json.loads(args.config.read_text(encoding="utf-8-sig")))
    except (OSError, ValueError, KeyError, TypeError, AttributeError):
        result = {"status": "error", "origin": "unknown", "public": "unknown", "summary": "Probe configuration error", "checks": {}}
    result["checked_at"] = datetime.now(timezone.utc).isoformat()
    print(json.dumps(result))


if __name__ == "__main__":
    main()
