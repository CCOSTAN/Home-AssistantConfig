# Cloudflare alert receiver

[![Watch Cloudflare walkthrough](https://img.shields.io/badge/Watch-Cloudflare%20Webhooks-FF0000?logo=youtube&logoColor=white)](https://youtu.be/-v1JkKwDrI8) [![Cloudflare blog guide](https://img.shields.io/static/v1?label=vCloudInfo&message=Cloudflare%20Guide&color=21759B&logo=wordpress&logoColor=white)](https://www.vcloudinfo.com/2026/10/cloudflare-free-webhooks-home-assistant-website-alerts.html)

Receives Cloudflare Notifications through a Nabu Casa cloud webhook and validates
the `cf-webhook-auth` header and account identity before producing a
`cloudflare_alert` event. A webhook URL alone cannot launch an investigation.
Delivery remains webhook-only; notification history is not polled. Recovery
reconciliation runs at startup and every five minutes while incidents are open.
An optional scoped read token checks current health of explicitly owned tunnels.
It is used only for tunnel GET requests, never account or configuration changes.

The infrastructure package presents each incident as a persistent Repair and HA
notification. Incidents are deduplicated by alert type and resource, survive
restarts, reject older events, and reopen on a later failure. Successful tunnel
and certificate events clear the corresponding incident. For mapped origins,
reports from existing public-website probes can confirm recovery after five
minutes. Recovery reacts to state changes and repeated healthy reports without
starting another website poll. Unmapped incidents remain open for operator review.

Reconciliation closes an owned tunnel only after a fresh successful API read
reports that exact tunnel healthy. Failed reads and newer failure observations
cannot clear incidents. Still-failing owned resources can retry undelivered work
once the local appliance health endpoint responds. Dispatch claims are saved
before intake; accepted job IDs survive restart and prevent duplicate dispatch.
Explicit client rejections have at most three attempts, five minutes apart.
Timeouts, missing receipts, and server errors have uncertain outcomes and require
operator review rather than risking a duplicate job. Job acceptance alone never
closes a Repair. Saved resolutions also reconcile lingering bridge-owned Repairs
when an automation missed the original recovery event during startup or reload. Certificate and unowned alerts remain notification-only.

Only explicitly configured `ops_hostnames` and `ops_tunnel_ids` can dispatch an
origin/tunnel investigation through the existing machine dispatch script.
Certificate alerts and unknown schemas/resources never gain remediation access.
Provider prose is shown as evidence in the Repair but never passed to the ops
prompt. The existing website automation remains authoritative for an outage it
has already dispatched, avoiding a second job from Cloudflare.

Configure the following keys in ignored `secrets.yaml`, then validate configuration
and restart Home Assistant:

`tunnel_api_token` is optional and needs only Tunnel read access for the configured
account. `dispatch_probe_url` is the existing local appliance health endpoint;
it is operator configuration, never taken from webhook content.

```yaml
cloudflare_alert_webhook_id: <random identifier of at least 32 characters>
cloudflare_alert_webhook_secret: <separate random secret of at least 32 characters>
cloudflare_alert_account_id: <Cloudflare account identifier>
cloudflare_alert_ops_hostnames: [www.example.com]
cloudflare_alert_ops_tunnel_ids: [<owned tunnel identifier>]
cloudflare_alert_recovery_entities:
  www.example.com: binary_sensor.example_website
cloudflare_alert_tunnel_api_token: <existing scoped read token>
cloudflare_alert_dispatch_probe_url: <local appliance health URL>
```

Call the administrator action `cloudflare_alerts.create_cloudhook` with a service
response to obtain the private delivery URL. Keep that URL and the shared secret
out of logs and documentation. Configure a generic Cloudflare webhook destination
with that URL and secret. Attach it to Passive Origin Monitoring, Tunnel Health,
and Universal SSL policies; omit zone/tunnel filters when future resources should
also receive notification-only coverage. Use only the authenticated webhook
destination for delivery; email is not needed by this integration.

Use `cloudflare_alerts.get_status` for delivery counts and open incident metadata.
The status action requires a service response. `cloudflare_alerts.reconcile` can
run the same checks on demand and optionally return its results. The internal
`claim_dispatch` and `delivery_result` actions maintain delivery receipts.
Cloudflare destination tests increment the test count without creating Repairs
or machine jobs. Policy tests use sample data and may carry a different account
identity; the receiver deliberately rejects a mismatching account ID. To verify
incident handling, use an authenticated synthetic certificate payload with the
configured account ID, confirm the Repair, then resolve only that test incident.
After independently verifying recovery or completing operator
review, call the administrator action `cloudflare_alerts.resolve` with `issue_id`
and `verification` evidence. It only clears incidents created by this receiver.
Existing incident records and delivery counts survive the webhook-only upgrade;
obsolete history checkpoints are removed through Home Assistant's storage API.

Alerts never authorize browser interaction, DNS/security/account changes, host
reboots, or new public exposure. No dynamic DNS update integration is installed.

Validation: `python tools/test_cloudflare_alerts.py`, the runtime receiver tests,
the YAML DRY verifier, and the repository's configuration checker.
