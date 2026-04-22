<h1 align="center">
  <a name="logo" href="https://www.vCloudInfo.com/tag/iot"><img src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/x_profile.png" alt="Bear Stone Smart Home" width="200"></a>
  <br>
  Bear Stone Smart Home Documentation
</h1>
<h4 align="center">Be sure to :star: my configuration repo so you can keep up to date on any daily progress!</h4>

<div align="center">

[![X Follow](https://img.shields.io/static/v1?label=talk&message=3k&color=blue&logo=twitter&style=for-the-badge)](https://x.com/ccostan)
[![YouTube Subscribe](https://img.shields.io/youtube/channel/subscribers/UC301G8JJFzY0BZ_0lshpKpQ?label=VIEW&logo=Youtube&logoColor=%23DF5D44&style=for-the-badge)](https://www.youtube.com/vCloudInfo?sub_confirmation=1)
[![GitHub Stars](https://img.shields.io/github/stars/CCOSTAN/Home-AssistantConfig?label=STARS&logo=Github&style=for-the-badge)](https://github.com/CCOSTAN) <br>
[![HA Version Badge](https://raw.githubusercontent.com/ccostan/home-assistantconfig/master/ha-version-badge.svg)](https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/.HA_VERSION)
[![Last Commit](https://img.shields.io/github/last-commit/CCOSTAN/Home-AssistantConfig.svg?style=plastic)](https://github.com/CCOSTAN/Home-AssistantConfig/commits/master)
[![Commit Activity](https://img.shields.io/github/commit-activity/y/CCOSTAN/Home-AssistantConfig.svg?style=plastic)](https://github.com/CCOSTAN/Home-AssistantConfig/commits/master)

</div>

Reusable scripts that other automations call for notifications, lighting, safety responses, and Joanna/BearClaw AGENT engineer handoffs. Pass variables in; let the script do the heavy lifting.

### Quick navigation
- You are here: `config/script/` (scripts library)
- [Repo overview](../../README.md) | [Config index](../README.md) | [Automations](../automation) | [Scenes](../scene) | [Blog: Speech engine video](https://www.vcloudinfo.com/2018/12/breaking-down-my-home-assistant-volume.html)

![Home Assistant header](https://i.imgur.com/vjDH1LJ.png)

### Featured files to browse
| File | Why it matters |
| --- | --- |
| [notify_engine.yaml](notify_engine.yaml) | Single entrypoint for rich push notifications. |
| [notify_live_activity.yaml](notify_live_activity.yaml) | Shared helper for tagged live activity/live update pushes and clear commands. |
| [send_to_logbook.yaml](send_to_logbook.yaml) | Generic `logbook.log` helper for Activity feed entries (Issue #1550). |
| [joanna_dispatch.yaml](joanna_dispatch.yaml) | Shared AGENT engineer dispatch contract that routes HA-detected issues into Joanna/BearClaw remediation. |
| [speech_engine.yaml](speech_engine.yaml) | TTS/announcement orchestration with templated speech. |
| [monthly_color_scene.yaml](monthly_color_scene.yaml) | Seasonal lighting scenes used across automations. |
| [interior_off.yaml](interior_off.yaml) | One-call "all interior lights off" helper. |

### Joanna + BearClaw AGENT engineer handoff
`script.joanna_dispatch` is the shared handoff contract from Home Assistant automations into Joanna/BearClaw when Home Assistant detects something worth investigating or fixing.

Why we use it:
- Keeps one message schema for remediation context (`trigger_context`, `source`, `summary`, `entity_ids`, `diagnostics`, `request`).
- Avoids repeating direct `rest_command.bearclaw_command` payload formatting in multiple packages.
- Lets Home Assistant stay focused on detection, timing, and routing while Joanna acts as the AGENT engineer for infrastructure triage and recommended remediation.
- Makes resolution-trigger automations easier to review, update, and audit.

What the helper normalizes before the BearClaw intake call:
- `trigger_context`, `source`, and `summary` so every dispatch has traceable origin details.
- `entity_ids` from either a YAML list or a comma-delimited string.
- `diagnostics` from either free text or structured mappings/sequences.
- `request` guardrails so Joanna defaults to investigation/recommendation, not blind resets or power-cycles.

Current automations that kick off automated resolutions (via `script.joanna_dispatch`):
| Automation ID | Alias | File |
| --- | --- | --- |
| `github_watched_repo_scout_nightly` | GitHub Watched Repo Scout - Nightly Joanna Review | [../packages/github_watched_repo_scout.yaml](../packages/github_watched_repo_scout.yaml) |
| `mqtt_open_repair_on_failure` | MQTT - Open Repair On Failure | [../packages/mqtt_status.yaml](../packages/mqtt_status.yaml) |
| `onenote_indexer_daily_delete_maintenance` | OneNote Indexer - Daily Delete Maintenance Request | [../packages/onenote_indexer.yaml](../packages/onenote_indexer.yaml) |
| `onenote_indexer_failure_open_repair` | OneNote Indexer - Open Repair On Failure | [../packages/onenote_indexer.yaml](../packages/onenote_indexer.yaml) |
| `infra_backup_nightly_verification` | Infrastructure - Backup Nightly Verification | [../packages/infrastructure_observability.yaml](../packages/infrastructure_observability.yaml) |
| `docker_state_sync_repairs_dynamic` | Docker State Sync - Repairs (Dynamic) | [../packages/docker_infrastructure.yaml](../packages/docker_infrastructure.yaml) |
| `docker_group_reconcile_weekly_joanna_review` | Docker Group Reconcile - Weekly Joanna Review | [../packages/docker_infrastructure.yaml](../packages/docker_infrastructure.yaml) |
| `tugtainer_dispatch_joanna_for_available_updates` | Tugtainer - Dispatch Joanna For Available Updates | [../packages/tugtainer_updates.yaml](../packages/tugtainer_updates.yaml) |
| `tugtainer_dispatch_joanna_for_home_assistant_core_digest` | Tugtainer - Dispatch Joanna For Home Assistant Core Digest | [../packages/tugtainer_updates.yaml](../packages/tugtainer_updates.yaml) |
| `unifi_ap_no_clients_repair_combined` | Unifi AP Create Repair Issue after 5m of 0 Clients | [../packages/wireless.yaml](../packages/wireless.yaml) |
| `proxmox_runtime_repairs` | Proxmox Runtime Repair Issues | [../packages/proxmox.yaml](../packages/proxmox.yaml) |
| `proxmox_disk_pressure_repairs` | Proxmox Disk Pressure Repair Issues | [../packages/proxmox.yaml](../packages/proxmox.yaml) |
| `synology_dsm_open_repair_and_dispatch` | Synology DSM - Open Repair And Dispatch | [../packages/synology_dsm.yaml](../packages/synology_dsm.yaml) |
| `processmonitor_disk_use_joanna_review` | Self Heal Disk Use Joanna Review | [../packages/processmonitor.yaml](../packages/processmonitor.yaml) |
| `1ce3cb43-0e27-4c53-acdd-d672396f3559` | Disk Use Alarm | [../packages/processmonitor.yaml](../packages/processmonitor.yaml) |

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
