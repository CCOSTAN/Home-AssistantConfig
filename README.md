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

Live, personal Home Assistant configuration shared for **browsing and inspiration**. This is not a turnkey clone-and-run setup; borrow ideas, adapt entity IDs/secrets, and test in your own environment.

### Quick navigation
- You are here: `/` (root repo guide)
- [Blog](https://www.vcloudinfo.com) | [Issues](https://github.com/CCOSTAN/Home-AssistantConfig/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) | [Diagram](config/www/custom_ui/floorplan/images/branding/Bear-Stone-Docker-Diagram.jpg) | [YouTube](https://youtube.com/vCloudInfo)
- Config readmes: [Config index](config/README.md) | [Packages](config/packages/README.md) | [Automations](config/automation/README.md) | [Scripts](config/script/README.md) | [Scenes](config/scene/README.md) | [Sounds](config/sounds/README.md) | [Package triggers](config/packages/triggers/README.md)
- Codex skills (optional): [codex_skills](codex_skills)

![Home Assistant header](https://i.imgur.com/vjDH1LJ.png)

### What this repo is (and isn't)
- A live record of how my smart home runs, with real-world automations, scripts, and scenes.
- A place to reverse-engineer patterns, not a deployment guide. If you reuse snippets, adjust entities, secrets, and services to fit your setup.
- Issues double as a changelog and design history; browse them for rationale behind changes.

### Repo layout and files you won't see
- Reusable config lives under `config/` (see the quick navigation paths above).
- Runtime artifacts are hidden by `.gitignore` and won't show up on GitHub (e.g., `home-assistant_v2.db*`, logs, `deps/`, `.venv/`, backups). Look at the YAML and scripts for the actual logic and regenerate your own `secrets.yaml`.

### Platform
- Runs on Docker/compose today; this README is a browsing guide, not a how-to-install. Current HA version is tracked in `config/.HA_VERSION` (see the badge above).
- Camera ingest path (current): `wyze-bridge` runs on `docker_10` and Frigate runs on `docker_14`, consuming Wyze RTSP via `192.168.10.10:8554` for stability.

### Featured examples to start with
- Alarm and perimeter monitoring: [config/packages/alarm.yaml](config/packages/alarm.yaml)
- Garage routines and entry lighting: [config/packages/garadget.yaml](config/packages/garadget.yaml), [config/automation/garage_entry_light.yaml](config/automation/garage_entry_light.yaml)
- Holiday/front-of-house color scenes: [config/scene/monthly_colors.yaml](config/scene/monthly_colors.yaml), [config/script/monthly_color_scene.yaml](config/script/monthly_color_scene.yaml)
- Dash-button triggers for quick actions: [config/automation/dash_buttons.yaml](config/automation/dash_buttons.yaml)
- PC lock/unlock-driven lighting via HASS.Agent: [config/packages/hass_agent_homepc.yaml](config/packages/hass_agent_homepc.yaml)
- Seasonal cuckoo clock with October and Christmas sound packs: [config/automation/System/CucKoo_Clock.yaml](config/automation/System/CucKoo_Clock.yaml)
- Garage arrival and entry helpers: [config/packages/garadget.yaml](config/packages/garadget.yaml)
- Battery and solar awareness: [config/packages/powerwall.yaml](config/packages/powerwall.yaml)
- Presence-aware office comfort: [config/packages/office_motion.yaml](config/packages/office_motion.yaml)
- Weather-aware lighting: [config/automation/dark_rainy_day.yaml](config/automation/dark_rainy_day.yaml)

### Network diagram
![Smart Home Diagram](config/www/custom_ui/floorplan/images/branding/Bear-Stone-Docker-Diagram.jpg)

**Docker add-ons & utilities**
| Container | Repo/Docs | Purpose |
| --- | --- | --- |
| Home Assistant Time Machine | [saihgupr/HomeAssistantTimeMachine](https://github.com/saihgupr/HomeAssistantTimeMachine) | Browse/diff/restore HA YAML (Lovelace, automations, scripts, ESPHome, packages) against existing backups. Blog walkthrough: [Time Machine for dashboards](https://www.vcloudinfo.com/2025/12/home-assistant-time-machine-dashboards.html). |
| Duplicati | [duplicati/duplicati](https://github.com/duplicati/duplicati) | Off-box, versioned backups for HA config and media; docker config backups land in OneDrive. |
| Dozzle | [amir20/dozzle](https://github.com/amir20/dozzle) | Lightweight Docker log viewer (useful for quick tailing across the homelab stacks). |
| Cloudflared | [cloudflare/cloudflared](https://hub.docker.com/r/cloudflare/cloudflared) | Secure tunnel/edge access to Home Assistant without opening inbound ports. |
| WordPress | [wordpress](https://hub.docker.com/_/wordpress) | Hosts [vCloudInfo.com](https://www.vcloudinfo.com) for docs, how-tos, videos, and long-form writeups that accompany this config. |

### Gear tied to real automations (affiliate links)
Only listing hardware that appears in active packages/automations here.
https://amzn.to/48jVzZ3
| Device | What it drives (friendly name -> file) | Buy |
| --- | --- | --- |
| Garadget garage door controller | Garage doors: open/close, reflection alerts - [garadget package](config/packages/garadget.yaml) | [![Buy](https://img.shields.io/badge/Buy-Garadget-orange?logo=amazon)](https://amzn.to/2jQLpVQ) |
| August smart lock | Front-door lock control + status - [august package](config/packages/august.yaml) | [![Buy](https://img.shields.io/badge/Buy-August%20Lock-orange?logo=amazon)](https://amzn.to/48jVzZ3) |
| Phyn Plus water shutoff | Leak detection + auto shutoff - [phynplus package](config/packages/phynplus.yaml) | [![Buy](https://img.shields.io/badge/Buy-Phyn%20Plus-orange?logo=amazon)](https://amzn.to/2Zy3sbJ) |
| Rachio sprinkler controller | Rain-skips and seasonal watering - [rachio package](config/packages/rachio.yaml) | [![Buy](https://img.shields.io/badge/Buy-Rachio-orange?logo=amazon)](https://amzn.to/2eoPKBW) |
| Tesla Powerwall 2 | Grid-outage alerts + load-shed automations - [powerwall package](config/packages/powerwall.yaml) | [![Buy](https://img.shields.io/badge/Buy-Powerwall-orange?logo=tesla)](https://amzn.to/3UM4BZ5) |
| NodeMCU motion sensor | Office motion lighting - [office_motion package](config/packages/office_motion.yaml) | [![Buy](https://img.shields.io/badge/Buy-Motion%20Node-orange?logo=amazon)](https://amzn.to/2oUgj5i) |
| Raspberry Pi 3 + Aeon Z-Wave stick | Z-Wave backbone for door/hall sensors - [garage entry helper](config/automation/garage_entry_light.yaml) | [![Pi](https://img.shields.io/badge/Buy-Pi%203-orange?logo=raspberrypi)](https://amzn.to/2e3DOBY) [![Z-Wave](https://img.shields.io/badge/Buy-Z--Wave%20Stick-orange?logo=zwave)](https://amzn.to/2eAiAP0) |
| Roku streaming device | TV presence -> scenes/lighting - [roku package](config/packages/roku.yaml) | [![Buy](https://img.shields.io/badge/Buy-Roku-orange?logo=roku)](https://amzn.to/2Ctp8cr) |
| Amazon Dash Button | Quick actions (office lamp toggle) - [dash buttons automation](config/automation/dash_buttons.yaml) | [![Buy](https://img.shields.io/badge/Buy-Dash%20Button-orange?logo=amazon)](https://amzn.to/2dPKZhM) |
| Amazon Echo Show | Front door camera pop-up when the August lock unlocks - [august package](config/packages/august.yaml) | [![Buy](https://img.shields.io/badge/Buy-Echo%20Show-orange?logo=amazon)](https://amzn.to/4ptA3YO) |
| Dreame/Neato vacuum | Cleaning schedules + notifications - [vacuum package](config/packages/vacuum.yaml) | [![Buy](https://img.shields.io/badge/Buy-Vacuum-orange?logo=amazon)](https://amzn.to/4f7NpFP) |
| Flux/LED strip controller | Monthly color scenes for exterior - [monthly color scene](config/script/monthly_color_scene.yaml) | [![Buy](https://img.shields.io/badge/Buy-LED%20Controller-orange?logo=amazon)](https://amzn.to/2jUBSBE) |
| Etekcity/433MHz outlet | Accent lighting relays - [garage entry helper](config/automation/garage_entry_light.yaml) | [![Buy](https://img.shields.io/badge/Buy-433MHz%20Outlet-orange?logo=amazon)](https://amzn.to/2efNoBP) |

### Gear and affiliate links
- Browsing or purchasing through the affiliate links above helps support this project; thanks!
- Full gear list: https://www.vcloudinfo.com/gear-list

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
