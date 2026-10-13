# Garage thermal protection

The hottest available CPU package controls the incident. An informational
average cannot identify a hot individual machine and does not describe ambient
temperature.

| Stage | CPU package condition | Behavior |
| --- | --- | --- |
| Warning | At least 80 C / 176 F for ten minutes | Send one quiet warning |
| Urgent | At least 90 C / 194 F for two minutes | Escalate the existing notification |
| Immediate urgent | At least 95 C / 203 F | Skip the urgent dwell |
| Recovery | Every package below 75 C / 167 F for fifteen minutes | Clear the incident and rearm |

Incident state and dwell timing survive template updates. Short sensor
fluctuations do not rearm the policy. Missing or stale readings cannot clear an
incident; prolonged missing telemetry becomes a separate problem. An
observation gap resets dwell timing while preserving an active incident.
Dashboard graph colors show instantaneous readings and do not represent the
dwell-based alert policy.

The temperature values are operating thresholds for this installation, not
manufacturer limits. Package/core temperatures and ambient temperatures are
different measurements.

## Optional workload guard

An independent host-level guard monitors configured package readings and
protects one site-configured optional camera workload. Its durable hold prevents
a recovery loop after a thermal stop. Site-specific host bindings and access
credentials belong in local configuration outside tracked source.

At urgent heat, the guard records the hold and requests a graceful stop of the
optional container. If heat persists, it can request a graceful stop of the
configured optional guest. Sustained severe heat can request a normal host
shutdown after fresh temperature readings and configured cluster-safety checks
confirm that shutdown is safe. The guard does not force-stop, start, migrate, or
reboot workloads. An uncertain safety check blocks host shutdown and reports
the reason.

The hold prevents automatic recovery of the optional workload. Release it only
after verified cooling and review of workload placement, capacity, storage, and
the cooling system. Releasing the hold does not start the workload. A physical
host that has shut down requires operator recovery.

Validate the Home Assistant configuration and affected dashboards before
rollout. Exercise dwell, stale-telemetry, hold, and graceful-stop cases with
controlled test fixtures. Do not heat equipment artificially to test the guard.
