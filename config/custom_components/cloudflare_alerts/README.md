# Cloudflare alert receiver

Receives Cloudflare Notifications through a Nabu Casa cloud webhook and validates
the `cf-webhook-auth` header and account identity before producing a
`cloudflare_alert` event. A webhook URL alone cannot launch an investigation.
When webhook destinations are unavailable, an optional read-only `api_token`
polls notification delivery history every five minutes. The token needs
Notifications Read; history-derived notifications never dispatch machine jobs.
Removing this optional token disables polling when direct webhooks are configured.

The infrastructure package presents each incident as a persistent Repair and HA
notification. Incidents are deduplicated by alert type and resource, survive
restarts, reject older events, and reopen on a later failure. Successful tunnel
and certificate events clear the corresponding incident. For mapped origins,
fresh existing public-website observations can confirm recovery after five
minutes. Unmapped incidents remain open for operator review.

Only explicitly configured `ops_hostnames` and `ops_tunnel_ids` can dispatch an
origin/tunnel investigation through the existing machine dispatch script.
Certificate alerts and unknown schemas/resources never gain remediation access.
Provider prose is shown as evidence in the Repair but never passed to the ops
prompt. The existing website automation remains authoritative for an outage it
has already dispatched, avoiding a second job from Cloudflare.

Configure the following keys in ignored `secrets.yaml`, then validate configuration
and restart Home Assistant:

```yaml
cloudflare_alert_webhook_id: <random identifier of at least 32 characters>
cloudflare_alert_webhook_secret: <separate random secret of at least 32 characters>
cloudflare_alert_account_id: <Cloudflare account identifier>
cloudflare_alert_read_token: <read-only Cloudflare API token>
cloudflare_alert_ops_hostnames: [www.example.com]
cloudflare_alert_ops_tunnel_ids: [<owned tunnel identifier>]
cloudflare_alert_recovery_entities:
  www.example.com: binary_sensor.example_website
```

Call the administrator action `cloudflare_alerts.create_cloudhook` with a service
response to obtain the private delivery URL. Keep that URL and the shared secret
out of logs and documentation. Configure a generic Cloudflare webhook destination
with that URL and secret. Attach it to Passive Origin Monitoring, Tunnel Health,
and Universal SSL policies; omit zone/tunnel filters when future resources should
also receive notification-only coverage. Retain existing email destinations.

Use `cloudflare_alerts.get_status` for delivery counts and open incident metadata.
The administrator action `cloudflare_alerts.refresh` performs an immediate history
check and returns the same status. Both status actions require a service response.
Cloudflare destination tests increment the test count without creating Repairs
or machine jobs. After independently verifying recovery or completing operator
review, call the administrator action `cloudflare_alerts.resolve` with `issue_id`
and `verification` evidence. It only clears incidents created by this receiver.
History polling reports its last success and read failures in delivery status;
a persistent delivery Repair appears on failure and clears only after a
successful API read. The initial window covers the most recent ten minutes,
not historical outages. Successful checkpoints survive restarts; overlapping
reads are deduplicated by delivery identity.

Alerts never authorize browser interaction, DNS/security/account changes, host
reboots, or new public exposure. No dynamic DNS update integration is installed.

Validation: `python tools/test_cloudflare_alerts.py`, the runtime receiver tests,
the YAML DRY verifier, and the repository's configuration checker.
