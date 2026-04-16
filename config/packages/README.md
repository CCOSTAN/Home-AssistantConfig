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

Live collection of plug-and-play Home Assistant packages. Each YAML file in this folder bundles sensors, helpers, automations, scripts, and Lovelace assets needed for a specific subsystem so you can drop it into `configuration.yaml` with a single `packages:` include.

### Quick navigation
- You are here: `config/packages/` (self-contained packages)
- [Repo overview](../../README.md) | [Config index](../README.md) | [Automations](../automation) | [Scripts](../script) | [Scenes](../scene) | [Templates](../templates) | [Package triggers](triggers) | [YouTube](https://youtube.com/vCloudInfo) | [Blog](https://www.vcloudinfo.com)
- Disabled/staging packages follow the `.disabled` or `.NOTWORKING` suffix; remove it after you update credentials or hardware.

![Home Assistant header](https://i.imgur.com/vjDH1LJ.png)

### Why packages exist
- Keep everything for a subsystem (alarm, garage, water shutoff, etc.) in one file, which makes versioning, troubleshooting, and sharing dramatically easier.
- Encapsulate helpers (input_booleans, sensors, scripts) so enabling/disabling a capability is as simple as moving one file in or out of the `packages/` include.
- Document hardware dependencies right next to the logic so you remember which gear keeps each automation alive.

### How to adapt a package quickly
- Enable `packages:` under `homeassistant:` in your `configuration.yaml`, then drop any of these YAML files into the folder with your own entity IDs/secrets.
- Scan the comments at the top of each package for credential requirements, MQTT topics, or REST endpoints that need to be swapped.
- Need reusable triggers or button automations? Check the companion [triggers](triggers) subfolder for examples before rolling your own.

### Featured packages (live today)
| Package | What it unlocks | Notable entities / services |
| --- | --- | --- |
| [alarm.yaml](alarm.yaml) | NodeMCU-powered perimeter monitoring with arm/disarm helpers and rich notifications. | `binary_sensor.mcu*_gpio*`, `group.family`, notify + siren scripts |
| [alexa_media_player.yaml](alexa_media_player.yaml) | Alexa Media helper sensors including stable bedroom wake-alarm wrappers for Carlo and Stacey plus a combined next-wake view. | `sensor.last_alexa`, `sensor.bedroom_next_wake_alarm`, `sensor.bedroom_next_wake_alarm_source`, `binary_sensor.bedroom_next_wake_alarm_active` |
| [garadget.yaml](garadget.yaml) | MQTT-based control + status for both garage doors, feeding entry/exit lighting routines. | `cover.large_garage_door`, `cover.small_garage_door`, `sensor.garadget_reflection` |
| [august.yaml](august.yaml) | Front-door August smart lock with Alexa Show camera pop-up when unlocked. | `lock.front_door`, media_player actions for front doorbell camera |
| [holiday.yaml](holiday.yaml) | REST-driven US holiday + flag sensors that color scenes and exterior lighting. | `sensor.holiday`, `sensor.flag`, JSON feed at `config/json_data/holidays.json` |
| [lightning.yaml](lightning.yaml) | Blitzortung lightning counter monitoring with snoozeable push actions. | `sensor.blitzortung_lightning_counter`, `input_boolean.snooze_lightning`, notify engine actions |
| [logbook_activity_feed.yaml](logbook_activity_feed.yaml) | Dummy `sensor.activity_feed` + helper to write clean Activity entries (Issue #1550). | `sensor.activity_feed`, `script.send_to_logbook` |
| [mariadb_monitoring.yaml](mariadb_monitoring.yaml) | MariaDB health sensors and Lovelace dashboard snippet for recorder stats. | `sensor.mariadb_status`, `sensor.database_size` |
| [docker_infrastructure.yaml](docker_infrastructure.yaml) | Docker host patching telemetry + container/stack Repairs automation, 20-minute Joanna escalation for persistent container outages using stable configured monitor membership, and weekly scheduled prune actions across docker_10/14/17/69. | `sensor.docker_*_apt_status`, `binary_sensor.*_stack_status`, `sensor.docker_stacks_down_count`, `repairs.create`, `script.joanna_dispatch` |
| [github_watched_repo_scout.yaml](github_watched_repo_scout.yaml) | Nightly Joanna dispatch that reviews unread notifications from watched GitHub repos, recommends HA-config ideas, refreshes strong-candidate issues, and marks processed watched-repo notifications read. | `automation.github_watched_repo_scout_nightly`, `script.joanna_dispatch`, `script.send_to_logbook` |
| [proxmox.yaml](proxmox.yaml) | Proxmox runtime and disk pressure monitoring with Repairs for node degradations plus nightly Frigate reboot. | `binary_sensor.proxmox*_runtime_healthy`, `sensor.proxmox*_disk_used_percentage`, `repairs.create`, `button.qemu_docker2_101_reboot` |
| [infrastructure_observability.yaml](infrastructure_observability.yaml) | Normalized WAN/DNS/backup/domain/cert health + website uptime/latency SLO signals for Infrastructure dashboards. | `binary_sensor.infra_website_uptime_slo_breach`, `binary_sensor.infra_website_latency_degraded`, `binary_sensor.infra_*` |
| [onenote_indexer.yaml](onenote_indexer.yaml) | OneNote indexer health/status monitoring for Joanna, failure-repair automation, and a daily duplicate-delete maintenance request. | `sensor.onenote_indexer_last_job_status`, `binary_sensor.onenote_indexer_last_job_successful` |
| [mqtt_status.yaml](mqtt_status.yaml) | Command-line MQTT broker reachability probe with Spook Repairs escalation and Joanna troubleshooting dispatch on outage. | `binary_sensor.mqtt_status_raw`, `binary_sensor.mqtt_broker_problem`, `repairs.create`, `rest_command.bearclaw_command` |
| [mariadb.yaml](mariadb.yaml) | MariaDB recorder health and capacity SQL sensors. | `sensor.mariadb_status`, `sensor.database_size` |
| [tugtainer_updates.yaml](tugtainer_updates.yaml) | Tugtainer container update notifications via webhook + persistent alerts, plus event-based Joanna dispatch when reports include `### Available:` (24h cooldown via `mode: single` + delay, no new helpers). | `persistent_notification.create`, `event: tugtainer_available_detected`, `script.joanna_dispatch`, `input_datetime.tugtainer_last_update` |
| [bearclaw.yaml](bearclaw.yaml) | Joanna/BearClaw bridge automations that forward Telegram commands to codex_appliance, include LLM-first routing context for freeform text, relay replies back, ingest `/api/bearclaw/status` telemetry, and expose dispatch plus QMD/memory-index sensors for Infrastructure dashboards. | `rest_command.bearclaw_*`, `sensor.bearclaw_status_telemetry`, `sensor.joanna_*`, `binary_sensor.joanna_*`, `automation.bearclaw_*`, `script.send_to_logbook` |
| [telegram_bot.yaml](telegram_bot.yaml) | Legacy Telegram transport marker for BearClaw; the shared `joanna_send_telegram` helper now forwards through the codex_appliance direct Telegram API. | `rest_command.bearclaw_telegram_send`, `script.joanna_send_telegram` |
| [phynplus.yaml](phynplus.yaml) | Phyn shutoff automations with push + Activity feed + Repairs issues for leak events. | `valve.phyn_shutoff_valve`, `binary_sensor.phyn_leak_test_running`, `repairs.create` |
| [water_delivery.yaml](water_delivery.yaml) | ReadyRefresh delivery date helper with night-before + garage door Alexa reminders, plus helper-change audit logging and Telegram confirmations. | `input_datetime.water_delivery_date`, `script.send_to_logbook`, `script.joanna_send_telegram`, `notify.alexa_media_garage` |
| [vacation_mode.yaml](vacation_mode.yaml) | Auto-enable vacation mode after 24 hours away or no bed use, track sitter analytics/secure-house checks, and deliver Chromecast-first vacation briefings with a garage Alexa welcome. | `input_boolean.vacation_mode`, `input_boolean.house_sitter_present`, `sensor.vacation_house_sitter_*`, `group.garage_doors`, `lock.front_door`, `script.notify_engine`, `script.joanna_send_telegram` |
| [maintenance_log.yaml](maintenance_log.yaml) | Joanna maintenance webhook ingest for water softener salt with idempotent event handling, Activity feed logging, and recorder-backed helper history for long-term graphing. | `automation.maintenance_log_joanna_webhook_ingest`, `input_number.water_softener_salt_total_added_lb`, `counter.water_softener_salt_event_count`, `sensor.water_softener_salt_days_since_last_add` |
| [powerwall.yaml](powerwall.yaml) | Track Tesla Powerwall grid status, push live outage tracking to mobile targets, and shed loads automatically when off-grid (alerts include Activity feed + Repairs). | `binary_sensor.powerwall_grid_status`, `sensor.powerwall_*`, `script.notify_live_activity`, `repairs.create` |
| [tesla_model_y.yaml](tesla_model_y.yaml) | Remind the garage and parents to plug in the Model Y after low-battery arrivals and after 8 PM when it is home but not charging. | `sensor.spaceship_battery_level`, `switch.spaceship_charge`, `notify.alexa_media_garage`, `script.notify_engine` |
| [vacuum.yaml](vacuum.yaml) | Dreame vacuum orchestration with room tracking, push alerts, Activity feed, Repairs issues on errors, and Alexa one-off room-clean switches. | `input_select.l10s_vacuum_phase`, `sensor.l10s_vacuum_error`, `repairs.create` |
| [hass_agent_homepc.yaml](hass_agent_homepc.yaml) | Mirrors PC lock/unlock state to the office lamp and wakes `CARLO-HOMEPC` on workday morning bed exits. | `sensor.carlo_homepc_carlo_homepc_sessionstate`, `button.carlo_home`, `switch.office_lamp_switch` |
| [sleepiq.yaml](sleepiq.yaml) | Sleep Number presence/snore automations; Overview Health consumes direct SleepIQ integration entities for scores, vitals, pressure, and bed controls. | `sensor.sleepnumber_carlo_carlo_sleep_score`, `sensor.sleepnumber_carlo_stacey_sleep_score`, `number.sleepnumber_carlo_carlo_firmness`, `select.sleepnumber_carlo_foundation_preset_right` |
| [finance.yaml](finance.yaml) | Yahoo Finance sensor bundle for portfolio glances and Lovelace cards. | `sensor.tsla`, `sensor.aapl`, `sensor.amzn`, `sensor.msft` |

### Garadget automations
- Logic lives in [garadget.yaml](garadget.yaml): auto-open on arrival, entry helper prompt (unlock front door or open garage), auto-unlock for Paige/Justin, wind checks, nightly open-door reminders, and camera pop-ups.
- MQTT-based covers for large/small doors; notifications and speech wired to the house notify/speech engines.
![Garadget Automation](../www/custom_ui/floorplan/images/branding/Garadget%20Automation.png)

### Nest climate control
- Logic lives in [climate.yaml](climate.yaml) and centralizes downstairs/upstairs Nest schedules, grid-aware guardrails, humidity pulses, and presence/weather-based targets.
- Shared script keeps daytime targets consistent: away → eco, home + >92°F → 78°F, home default → 80°F. Downstairs bedtime cooling now stays dynamic: outside >80°F → 77°F, 76-79°F → 79°F, below 76°F → leave the current target alone. Grid-down conditions pause non-essential cool-downs.
![Nest Climate Control](../www/custom_ui/floorplan/images/branding/Nest_Climate_Control.png)

### Dreame vacuum automations
- Logic lives in [vacuum.yaml](vacuum.yaml): continuous four-phase loop (sweep main, sweep baths, mop main, mop baths) driven by `input_select.l10s_vacuum_phase` and `input_text.l10s_vacuum_room_queue`, with per-room notifications and automatic reseeding between phases.
- Uses the Dreame HACS integration with segment IDs to enforce bathrooms last in each sweep/mop pass, dock on arrival, and auto-run if idle for 3+ days.
- Family-return docking now ignores away windows shorter than 20 minutes so brief walks do not interrupt an active run, but still docks if the family stays home for 10 minutes.
- Room queue advances on a 2-minute dwell in `sensor.l10s_vacuum_current_room` (queue = remaining rooms); phase changes happen when an empty queue is reseeded and the vacuum is not actively cleaning.
- One-off room cleaning for Alexa uses `input_boolean.l10s_vacuum_clean_*` (example: "Kitchen Clean") and runs a segment job without touching or checking the phased queue.
- Formal Dining (room 17/dock) is excluded from phased queues; clean it via the one-off toggle.
![Dreame Automations](../www/custom_ui/floorplan/images/branding/Dreame%20Automations.png)

### Blog & video deep dives
When a package has a dedicated blog post or video, I link it right inside the YAML comments. Here are the same references for quick browsing:

| Package | Why read/watch | Deep dive links |
| --- | --- | --- |
| [finance.yaml](finance.yaml) | Custom Yahoo Finance integration overview and setup notes. | [Blog](https://www.vcloudinfo.com/2020/10/how-to-track-stocks-in-home-assistant-using-a-custom-component.html) |
| [garadget.yaml](garadget.yaml) | MQTT garage door setup plus the follow-up on the access token change. | [Blog: Integration guide](https://www.vcloudinfo.com/2019/03/how-to-add-garadget-to-home-assistant.html) · [Blog: Token fix](https://www.vcloudinfo.com/2020/05/fixing-garadget-in-home-assistant.html) |
| [holiday.yaml](holiday.yaml) | How the holiday/flag sensor works and drives lighting playlists. | [Blog + video breakdown](https://www.vcloudinfo.com/2019/02/breaking-down-the-flag-sensor-in-home-assistant.html) |
| [lightning.yaml](lightning.yaml) | Blitzortung detector wiring, strike alerts, and snooze workflow. | [Blog](https://www.vcloudinfo.com/2020/08/adding-a-lightning-sensor-to-home-assistant.html) |
| [phynplus.yaml](phynplus.yaml) | Installing Phyn Plus and wiring its leak events into HA automations. | [Blog](https://www.vcloudinfo.com/2020/05/phyn-plus-smart-water-shutoff-device.html) |
| [powerwall.yaml](powerwall.yaml) | Monitoring Tesla Powerwall health + what to automate when the grid drops. | [Blog](https://www.vcloudinfo.com/2018/01/going-green-to-save-some-green-in-2018.html) |
| [vacuum.yaml](vacuum.yaml) | Keeping Neato/Dreame bots smart with HA scenes and maintenance timers. | [Blog](https://www.vcloudinfo.com/2020/05/home-assistant-neato-vacuum-automation.html) |
| [pihole_ha.yaml](pihole_ha.yaml) | Sync Pi-hole blocking state across HA DNS nodes. | |
| [grafana.yaml.disabled](grafana.yaml.disabled) | Rendering Grafana dashboards to images for Lovelace and social posts. | [Blog](https://www.vcloudinfo.com/2018/01/going-green-to-save-some-green-in-2018.html) · [Blog](https://www.vcloudinfo.com/2018/09/re-installing-tesla-solar-panels-again.html) · [Video](https://youtu.be/BartadUzGOA) |
| [august.yaml](august.yaml) | Smart lock control and status from HA. | [YouTube short](https://youtu.be/UdcCeAyo9Ak?si=O-f607NHbRLKZxao) |

### Hardware referenced in packages (affiliate links)
These are the devices that power the packages above. Affiliate links never change the price but they do help fund more tinkering—thanks!

| Device | Package(s) | Automation tie-in | Buy |
| --- | --- | --- | --- |
| Garadget garage door controller | [garadget.yaml](garadget.yaml) | MQTT covers feed entry lighting, notifications, and security checks. | [![Buy](https://img.shields.io/badge/Buy-Garadget-orange?logo=amazon)](https://amzn.to/2jQLpVQ) |
| August smart lock | [august.yaml](august.yaml) | Front-door lock/unlock + status for routines and alerts. | [![Buy](https://img.shields.io/badge/Buy-August%20Lock-orange?logo=amazon)](https://amzn.to/48jVzZ3) |
| Amazon Echo Show | Pops up the front doorbell camera when the August lock unlocks. | [august.yaml](august.yaml) | [![Buy](https://img.shields.io/badge/Buy-Echo%20Show-orange?logo=amazon)](https://amzn.to/4ptA3YO) |
| Phyn Plus water shutoff | [phynplus.yaml](phynplus.yaml) | Leak events trigger valve closes + critical push notifications. | [![Buy](https://img.shields.io/badge/Buy-Phyn%20Plus-orange?logo=amazon)](https://amzn.to/2Zy3sbJ) |
| Rachio sprinkler controller | [rachio.yaml](rachio.yaml) | Rain skips and seasonal watering adjustments happen automatically. | [![Buy](https://img.shields.io/badge/Buy-Rachio-orange?logo=amazon)](https://amzn.to/2eoPKBW) |
| Tesla Powerwall 2 | [powerwall.yaml](powerwall.yaml) | Grid outages kick off load-shed scripts and status pings. | [![Buy](https://img.shields.io/badge/Buy-Powerwall-orange?logo=tesla)](https://amzn.to/3UM4BZ5) |
| Google Nest thermostat | [climate.yaml](climate.yaml) | Presence/weather/grid-aware cooling targets, humidity pulses, and eco recovery. | [![Buy](https://img.shields.io/badge/Buy-Nest%20Thermostat-orange?logo=google)](https://amzn.to/4olpINw) |
| Dreame/Neato vacuum | [vacuum.yaml](vacuum.yaml) | Scheduled cleaning, maintenance reminders, and voice callouts. | [![Buy](https://img.shields.io/badge/Buy-Vacuum-orange?logo=amazon)](https://amzn.to/4f7NpFP) |
| NodeMCU motion/contact sensor | [alarm.yaml](alarm.yaml), [office_motion.yaml](office_motion.yaml) | ESP8266 nodes feed the alarm matrix and room-aware lighting. | [![Buy](https://img.shields.io/badge/Buy-Motion%20Node-orange?logo=amazon)](https://amzn.to/2oUgj5i) |
| Roku streaming device | [roku.yaml](roku.yaml) | Media presence drives lighting, announcements, and scenes. | [![Buy](https://img.shields.io/badge/Buy-Roku-orange?logo=roku)](https://amzn.to/2Ctp8cr) |

### Tips for extending these packages
- Most packages expose booleans or helpers that you can hook into with your own automations; keep using those entities instead of editing the package so upgrades stay clean.
- If you clone a package, rename the `id:` fields inside the automations to avoid duplicate UUIDs.
- Document your own blog or video resources at the top of each file—the README table above will make it easy to find them later.

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
