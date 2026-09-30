# Tesla home charge verification

This small read-only adapter exposes Tesla Fleet's **source sample timestamps**
and observes live JuiceBox MQTT current/status reports. It reuses the existing
Tesla Fleet connection and credentials. It sends no vehicle or charger commands.
Native Home Assistant scripts in the vehicle package own protective stops,
notifications, investigation dispatch, and restart review.

Before a protective command, the package requests fresh Tesla data to check
vehicle scope. A new home charger session with missing Tesla data gets an
incident refresh within a minute. A missing vehicle identity still prompts
investigation/critical home-charger checks, but does not authorize stopping a
vehicle elsewhere. A fresh away or DC report vetoes commands even when the
current field is missing. A fresh zero-current home-charger report can clear
the home incident while the vehicle is charging elsewhere.

`tesla_charge_guard.snapshot` returns an assessment and fires
`tesla_charge_guard_report`. `refresh: true` requests one refresh with a 25-second
timeout; it does not wake the car. A sleeping/rate-limited vehicle can return
cached data, which remains unverified. Tesla samples expire after 120 seconds,
JuiceBox current/status reports after 60 seconds. Retained MQTT messages are
ignored. Fresh away/DC reports veto home stop commands. Source data with missing
current, invalid current, unknown charging state, or a future timestamp is not
accepted as evidence of stopped charging.

The operational guardrail is 18 A around the intended 16 A home rate. This is
not a replacement for electrical protection. A successful stop command is not
proof of a stopped vehicle; the package requires a fresh zero-current report.

The adapter uses the installed Tesla Fleet runtime coordinator, so its contract
must be checked after Home Assistant upgrades. If the vehicle cannot be found,
the result becomes unverified. It retains no credentials, VIN, or coordinates
in the returned snapshot. MQTT acquisition timestamps are intentionally kept
in memory; after a restart, a new non-retained report is required.

The package's restoring session helper remembers a verified home connection
across power loss or HA restarts. It conveys last-known scope, never freshness;
only a fresh unplugged/away report ends that scope. This allows a five-minute
protective stop even while the Tesla integration is still reconnecting.

The Car view exposes the restart-review helper. Clearing it acknowledges review
and permits subsequent home charging; it does not start charging. Confirm the
home current limit is 16 A and review the incident before clearing it. The monitoring
warning and restart-review warning remain separate from an unresolved critical
stop. Source snapshot sensors/events are excluded from recorder noise; aggregate
incident sensors and curated JUICEBOX log entries remain recorded.

Validation: `python tools/test_tesla_charge_guard.py`; run the adapter contract
test in an environment with Home Assistant installed. Check the full HA config
before loading the adapter. Loading a new custom integration requires an HA
restart; subsequent package-only edits can use normal scripts/templates reloads.
