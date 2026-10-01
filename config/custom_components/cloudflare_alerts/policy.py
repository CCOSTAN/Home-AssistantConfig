"""Normalize Cloudflare notification facts without interpreting message instructions."""

from datetime import datetime
import hashlib
import hmac
import re

ALERT_TYPES = {
    "real_origin_monitoring": "Origin unreachable",
    "tunnel_health_event": "Tunnel health",
    "universal_ssl_event_type": "Certificate needs review",
}
HEALTHY = {"healthy", "active", "issued", "renewed", "validated", "success", "successful"}
IDENTIFIER = re.compile(r"[a-zA-Z0-9][a-zA-Z0-9._:-]{0,252}\Z")


def authentic(header: str, secret: str) -> bool:
    """Reject missing/incorrect secrets before reading the body, including Unicode."""
    return bool(header) and hmac.compare_digest(header.encode(), secret.encode())


def identifier(value, fallback="account") -> str:
    """Keep resource identifiers inert; never use notification text for routing."""
    value = str(value or "").strip().lower()
    return value if IDENTIFIER.fullmatch(value) else fallback


def event_timestamp(value, received: float) -> float:
    """Keep upstream order when an alert supplies its documented timestamp."""
    try:
        if isinstance(value, (int, float)) or str(value).isdigit():
            stamp = float(value)
        else:
            stamp = datetime.fromisoformat(str(value).replace("Z", "+00:00")).timestamp()
        return min(stamp, received) if stamp > 0 else received
    except (TypeError, ValueError, OverflowError):
        return received


def normalize(payload: dict, received: float) -> list[dict]:
    """Accept supported typed alerts; unexpected schemas stay notification-only."""
    alert_type = payload.get("alert_type")
    if alert_type not in ALERT_TYPES:
        return []
    data = payload.get("data")
    data = data if isinstance(data, dict) else payload
    metadata = payload.get("metadata") or data.get("metadata") or {}
    metadata = metadata if isinstance(metadata, dict) else {}
    # Certificate facts can be wrapped once inside the standard alert envelope.
    if isinstance(data.get("data"), dict) and "metadata" in data:
        data = data["data"]
    status = identifier(data.get("new_status") or data.get("status") or
                        data.get("certificate_status") or data.get("event_type"), "unknown")
    if alert_type == "tunnel_health_event":
        status = status.removeprefix("tunnel_status_type_")
        resource = identifier(data.get("tunnel_id") or data.get("tunnel_tag"))
        display = identifier(data.get("tunnel_name"), resource)
        recovered = status == "healthy"
    elif alert_type == "universal_ssl_event_type":
        event = metadata.get("event") or {}
        event_type = identifier(event.get("type"), "unknown") if isinstance(event, dict) else "unknown"
        if event_type.startswith("ssl.certificate."):
            # A successful lifecycle step is informational; a failed step is actionable.
            status = event_type.removeprefix("ssl.certificate.")
        zone = metadata.get("zone") or {}
        zone = zone if isinstance(zone, dict) else {}
        resource = identifier(data.get("id") or data.get("hostname") or
                              data.get("zone_name") or zone.get("name") or zone.get("id"))
        hosts = data.get("hosts") or data.get("hostnames") or []
        hosts = hosts if isinstance(hosts, list) else [hosts]
        display = ", ".join(dict.fromkeys(identifier(str(host).removeprefix("*."))
                                        for host in hosts[:4])) or identifier(data.get("hostname"), resource)
        recovered = status in HEALTHY or status in {
            "validation.succeeded", "issuance.succeeded", "deployment.succeeded", "renewal.succeeded"}
        return [_notification(alert_type, resource, display, status, recovered, payload, received)]
    else:
        unreachable = data.get("unreachable_zones")
        if isinstance(unreachable, list):
            resources = [zone.get("host") or zone.get("zone_name") for zone in unreachable
                         if isinstance(zone, dict)]
            return [_notification(alert_type, identifier(resource), identifier(resource),
                                  "unreachable", False, payload, received)
                    for resource in dict.fromkeys(map(str, resources))]
        resources = (data.get("hostnames") or data.get("hostname") or
                     data.get("host") or data.get("zone_name") or data.get("zone_tag"))
        if isinstance(resources, str):
            resources = resources.split(",")
        if not isinstance(resources, list):
            resources = ["account"]
        return [_notification(alert_type, identifier(resource), identifier(resource),
                              status, alert_type == "universal_ssl_event_type" and status in HEALTHY,
                              payload, received) for resource in dict.fromkeys(map(str, resources))]
    return [_notification(alert_type, resource, display, status, recovered, payload, received)]


def _notification(alert_type, resource, display, status, recovered, payload, received):
    issue_id = "cloudflare_" + hashlib.sha256(f"{alert_type}:{resource}".encode()).hexdigest()[:24]
    text = payload.get("text")
    text = text if isinstance(text, str) else f"Cloudflare reports {alert_type} for {display}; status: {status}."
    # Human-readable evidence only. Raw provider prose never enters the ops prompt.
    text = "".join(character for character in text[:4000] if character >= " " or character == "\n")
    return {
        "issue_id": issue_id, "alert_type": alert_type, "resource": resource,
        "status": status, "action": "resolve" if recovered else "open",
        "title": f"Cloudflare: {ALERT_TYPES[alert_type]} ({display})",
        "description": f"{text}\n\nReview: https://dash.cloudflare.com/?to=/:account/notifications",
        "severity": "warning" if alert_type == "universal_ssl_event_type" else "error",
        "event_ts": event_timestamp(payload.get("ts"), received),
        "received_ts": received,
    }


def transition(previous: dict | None, event: dict) -> tuple[dict, bool, bool]:
    """Deduplicate incidents, reject delayed events, and dispatch once per opening."""
    if previous and event["event_ts"] < previous["event_ts"]:
        return previous, False, False
    first_open = event["action"] == "open" and (not previous or previous["action"] == "resolve")
    changed = (not previous and event["action"] == "open") or bool(
        previous and (previous["action"], previous["status"]) != (event["action"], event["status"]))
    record = {**event, "first_received_ts": event["received_ts"] if first_open else
              (previous or event).get("first_received_ts", event["received_ts"])}
    return record, changed, first_open


def dispatch_allowed(event: dict, hostnames: list, tunnel_ids: list) -> bool:
    """Only explicitly owned origin/tunnel identifiers may reach the machine lane."""
    return event["action"] == "open" and (
        event["alert_type"] == "real_origin_monitoring" and event["resource"] in hostnames or
        event["alert_type"] == "tunnel_health_event" and event["status"] in {"down", "degraded"}
        and event["resource"] in tunnel_ids)
