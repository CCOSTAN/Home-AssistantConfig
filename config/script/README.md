<h1 align="center">
  <a name="logo" href="https://www.vCloudInfo.com/tag/iot"><img src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/x_profile.png" alt="Bear Stone Smart Home" width="200"></a>
  <br>
  Bear Stone Smart Home Documentation
</h1>
<h4 align="center">Be sure to :star: my configuration repo so you can keep up to date on any daily progress!</h4>

<div align="center">

[![X Follow](https://img.shields.io/static/v1?label=talk&message=3k&color=blue&logo=twitter&style=for-the-badge)](https://x.com/ccostan)
[![YouTube Subscribe](https://img.shields.io/youtube/channel/subscribers/UC301G8JJFzY0BZ_0lshpKpQ?label=VIEW&logo=Youtube&logoColor=%23DF5D44&style=for-the-badge)](https://www.youtube.com/vCloudInfo?sub_confirmation=1)
[![GitHub Stars](https://img.shields.io/github/stars/CCOSTAN/Home-AssistantConfig.svg?label=STARS&logo=github&style=for-the-badge)](https://github.com/CCOSTAN/Home-AssistantConfig/stargazers) <br>
[![HA Version Badge](https://raw.githubusercontent.com/ccostan/home-assistantconfig/master/ha-version-badge.svg)](https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/.HA_VERSION)
[![Last Commit](https://img.shields.io/github/last-commit/CCOSTAN/Home-AssistantConfig/master?style=plastic)](https://github.com/CCOSTAN/Home-AssistantConfig/commits/master)
[![Commit Activity](https://img.shields.io/github/commit-activity/y/CCOSTAN/Home-AssistantConfig.svg?style=plastic)](https://github.com/CCOSTAN/Home-AssistantConfig/commits/master)

</div>

Reusable scripts that other automations call for notifications, lighting, safety responses, and Joanna/BearClaw AGENT engineer handoffs. Pass variables in; let the script do the heavy lifting.

### Quick navigation
- You are here: `config/script/` (scripts library)
- [Repo overview](../../README.md) | [Config index](../README.md) | [Automations](../automation) | [Scenes](../scene) | [![vCloudInfo Blog Post](https://img.shields.io/static/v1?label=vCloudInfo&message=Blog%20Post&color=21759B&logo=wordpress&logoColor=white)](https://www.vcloudinfo.com/2018/12/breaking-down-my-home-assistant-volume.html)

![Home Assistant header](https://i.imgur.com/vjDH1LJ.png)

### Featured files to browse
| File | Why it matters |
| --- | --- |
| [![YAML source: notify_engine](https://img.shields.io/static/v1?label=YAML&message=notify_engine&color=CB171E&logo=yaml&logoColor=white)](notify_engine.yaml) | Single entrypoint for rich push notifications. |
| [![YAML source: notify_live_activity](https://img.shields.io/static/v1?label=YAML&message=notify_live_activity&color=CB171E&logo=yaml&logoColor=white)](notify_live_activity.yaml) | Shared helper for tagged live activity/live update pushes and clear commands. |
| [![YAML source: send_to_logbook](https://img.shields.io/static/v1?label=YAML&message=send_to_logbook&color=CB171E&logo=yaml&logoColor=white)](send_to_logbook.yaml) | Generic `logbook.log` helper for Activity feed entries (Issue #1550). |
| [![YAML source: joanna_dispatch](https://img.shields.io/static/v1?label=YAML&message=joanna_dispatch&color=CB171E&logo=yaml&logoColor=white)](joanna_dispatch.yaml) | Shared AGENT engineer dispatch contract that routes HA-detected issues into Joanna/BearClaw remediation. |
| [![YAML source: speech_engine](https://img.shields.io/static/v1?label=YAML&message=speech_engine&color=CB171E&logo=yaml&logoColor=white)](speech_engine.yaml) | TTS/announcement orchestration with templated speech; speech processing can bypass LLM rewriting for exact messages and also routes garage/office Echo announcements. |
| [![YAML source: monthly_color_scene](https://img.shields.io/static/v1?label=YAML&message=monthly_color_scene&color=CB171E&logo=yaml&logoColor=white)](monthly_color_scene.yaml) | Seasonal lighting dispatcher that follows `sensor.holiday_lighting_scene`. |
| [![YAML source: interior_off](https://img.shields.io/static/v1?label=YAML&message=interior_off&color=CB171E&logo=yaml&logoColor=white)](interior_off.yaml) | One-call "all interior lights off" helper. |

### Joanna + BearClaw AGENT engineer handoff
`script.joanna_dispatch` is the shared handoff contract from Home Assistant automations into Joanna/BearClaw when Home Assistant detects something worth investigating or fixing.

Why we use it:
- Keeps one message schema for remediation context (`trigger_context`, `source`, `summary`, `entity_ids`, `diagnostics`, `request`, plus optional routing hints).
- Avoids repeating direct `rest_command.bearclaw_command` payload formatting in multiple packages.
- Lets Home Assistant stay focused on detection, timing, and routing while Joanna acts as the AGENT engineer for infrastructure triage and recommended remediation.
- Makes resolution-trigger automations easier to review, update, and audit.

What the helper normalizes before the BearClaw intake call:
- `trigger_context`, `source`, and `summary` so every dispatch has traceable origin details.
- `entity_ids` from either a YAML list or a comma-delimited string.
- `diagnostics` from either free text or structured mappings/sequences.
- `request` guardrails so Joanna defaults to investigation/recommendation, not blind resets or power-cycles.
- `domain_hint`/`lane_hint` default to BearClaw ops routing so HA infrastructure text does not drift into another domain parser.

Current automations that kick off automated resolutions (via `script.joanna_dispatch`):
| Automation ID | Alias | File |
| --- | --- | --- |
| `mqtt_open_repair_on_failure` | MQTT - Open Repair On Failure | [![YAML source: mqtt_status](https://img.shields.io/static/v1?label=YAML&message=mqtt_status&color=CB171E&logo=yaml&logoColor=white)](../packages/mqtt_status.yaml) |
| `onenote_indexer_daily_delete_maintenance` | OneNote Indexer - Daily Delete Maintenance Request | [![YAML source: onenote_indexer](https://img.shields.io/static/v1?label=YAML&message=onenote_indexer&color=CB171E&logo=yaml&logoColor=white)](../packages/onenote_indexer.yaml) |
| `onenote_indexer_failure_open_repair` | OneNote Indexer - Open Repair On Failure | [![YAML source: onenote_indexer](https://img.shields.io/static/v1?label=YAML&message=onenote_indexer&color=CB171E&logo=yaml&logoColor=white)](../packages/onenote_indexer.yaml) |
| `infra_backup_nightly_verification` | Infrastructure - Backup Nightly Verification | [![YAML source: infrastructure](https://img.shields.io/static/v1?label=YAML&message=infrastructure&color=CB171E&logo=yaml&logoColor=white)](../packages/infrastructure.yaml) |
| `infra_monthly_log_hygiene_review` | Infrastructure - Monthly HA Log Hygiene Review | [![YAML source: infrastructure](https://img.shields.io/static/v1?label=YAML&message=infrastructure&color=CB171E&logo=yaml&logoColor=white)](../packages/infrastructure.yaml) |
| `infra_nebula_sync_health_dispatch` | Infrastructure - Nebula Sync Health Dispatch | [![YAML source: infrastructure](https://img.shields.io/static/v1?label=YAML&message=infrastructure&color=CB171E&logo=yaml&logoColor=white)](../packages/infrastructure.yaml) |
| `infra_pihole_iot_dns_drift_dispatch` | Infrastructure - Pi-hole IoT DNS Drift Dispatch | [![YAML source: infrastructure](https://img.shields.io/static/v1?label=YAML&message=infrastructure&color=CB171E&logo=yaml&logoColor=white)](../packages/infrastructure.yaml) |
| `docker_state_sync_repairs_dynamic` | Docker State Sync - Repairs (Dynamic) | [![YAML source: docker_infrastructure](https://img.shields.io/static/v1?label=YAML&message=docker_infrastructure&color=CB171E&logo=yaml&logoColor=white)](../packages/docker_infrastructure.yaml) |
| `docker_group_reconcile_weekly_joanna_review` | Docker Group Reconcile - Weekly Joanna Review | [![YAML source: docker_infrastructure](https://img.shields.io/static/v1?label=YAML&message=docker_infrastructure&color=CB171E&logo=yaml&logoColor=white)](../packages/docker_infrastructure.yaml) |
| `docker_host_disk_pressure_monitor` | Docker Host Disk Pressure Monitor | [![YAML source: infrastructure](https://img.shields.io/static/v1?label=YAML&message=infrastructure&color=CB171E&logo=yaml&logoColor=white)](../packages/infrastructure.yaml) |
| `proxmox_updates_joanna_dispatch` | Proxmox Updates Joanna Dispatch | [![YAML source: proxmox](https://img.shields.io/static/v1?label=YAML&message=proxmox&color=CB171E&logo=yaml&logoColor=white)](../packages/proxmox.yaml) |
| `tugtainer_dispatch_joanna_for_available_updates` | Tugtainer - Dispatch Joanna For Available Updates | [![YAML source: tugtainer_updates](https://img.shields.io/static/v1?label=YAML&message=tugtainer_updates&color=CB171E&logo=yaml&logoColor=white)](../packages/tugtainer_updates.yaml) |
| `tugtainer_dispatch_joanna_for_home_assistant_core_digest` | Tugtainer - Dispatch Joanna For Home Assistant Core Digest | [![YAML source: tugtainer_updates](https://img.shields.io/static/v1?label=YAML&message=tugtainer_updates&color=CB171E&logo=yaml&logoColor=white)](../packages/tugtainer_updates.yaml) |
| `unifi_ap_no_clients_repair_combined` | Unifi AP Create Repair Issue after 5m of 0 Clients | [![YAML source: wireless](https://img.shields.io/static/v1?label=YAML&message=wireless&color=CB171E&logo=yaml&logoColor=white)](../packages/wireless.yaml) |
| `proxmox_runtime_repairs` | Proxmox Runtime Repair Issues | [![YAML source: proxmox](https://img.shields.io/static/v1?label=YAML&message=proxmox&color=CB171E&logo=yaml&logoColor=white)](../packages/proxmox.yaml) |
| `proxmox_disk_pressure_repairs` | Proxmox Disk Pressure Repair Issues | [![YAML source: proxmox](https://img.shields.io/static/v1?label=YAML&message=proxmox&color=CB171E&logo=yaml&logoColor=white)](../packages/proxmox.yaml) |
| `synology_dsm_open_repair_and_dispatch` | Synology DSM - Open Repair And Dispatch | [![YAML source: synology_dsm](https://img.shields.io/static/v1?label=YAML&message=synology_dsm&color=CB171E&logo=yaml&logoColor=white)](../packages/synology_dsm.yaml) |
| `processmonitor_disk_use_joanna_review` | Self Heal Disk Use Joanna Review | [![YAML source: processmonitor](https://img.shields.io/static/v1?label=YAML&message=processmonitor&color=CB171E&logo=yaml&logoColor=white)](../packages/processmonitor.yaml) |
| `1ce3cb43-0e27-4c53-acdd-d672396f3559` | Disk Use Alarm | [![YAML source: processmonitor](https://img.shields.io/static/v1?label=YAML&message=processmonitor&color=CB171E&logo=yaml&logoColor=white)](../packages/processmonitor.yaml) |

### Tips
- Keep scripts generic, route data via `data:`/`variables:`, and reuse everywhere.
- If you copy a script, rename any `alias` and `id` fields to avoid duplicates.

**All of my configuration files are tested against the most stable version of home-assistant.**

<a name="bottom" href="https://github.com/CCOSTAN/Home-AssistantConfig#logo"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="25" ></a>

**Still have questions on my Config?** <br>
**Message me on X :** [![Follow CCostan](https://img.shields.io/twitter/follow/CCostan)](https://www.x.com/ccostan)

<p align="center">
<a target="_blank" href="https://www.buymeacoffee.com/vCloudInfo"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">You can buy me a coffee</span></a><a target="_blank" href="https://www.buymeacoffee.com/vCloudInfo"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"></a>
<br>
<a href="https://eepurl.com/dmXFYz"><img align="center" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/email_link.png" height="50" ></a><br>
<a href="https://www.vCloudInfo.com/p/affiliate-disclosure.html">
Affiliate Disclosure
</a></p>
