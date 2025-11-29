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

Live view of the `config/` directory my production Home Assistant instance loads every night. Use this README as a map when you want to jump directly into the most interesting packages, automations, and supporting assets.

### Quick navigation
- You are here: `config/` (configuration root)
- [Repo overview](../README.md) | [Blog](https://www.vcloudinfo.com) | [Issues](https://github.com/CCOSTAN/Home-AssistantConfig/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) | [Diagram](config/www/custom_ui/floorplan/images/branding/Bear-Stone-Docker-Diagram.jpg) | [YouTube](https://youtube.com/vCloudInfo)
- Directory highlights: [packages](packages), [automation](automation), [script](script), [scene](scene), [templates](templates), [www](www), [custom_components](custom_components)

![Home Assistant header](https://i.imgur.com/vjDH1LJ.png)

### What this folder is (and isn't)
- Every YAML file here is live and version-controlled; anything missing is intentionally ignored via `.gitignore` (databases, logs, caches, etc.).
- This is a split-configuration layout: `configuration.yaml` simply includes the files and directories documented here so changes are easy to isolate.
- Nothing in this folder is a drop-in template—borrow ideas, but adjust entity IDs, helpers, and secrets to match your home before reloading HA.

### How the config is organized
- **Packages (`packages/`)** – complete subsystems that bundle sensors, switches, automations, scripts, and lovelace assets for a single feature (alarm, garage, water shutoff, etc.).
- **Automations (`automation/`)** – event-driven YAML broken out by area or device; the legacy `automations.yaml` remains for UI-created flows.
- **Scripts & scenes (`script/`, `scene/`)** – curated lighting and ambiance logic used by presence, holiday, and seasonal routines.
- **Templates (`templates/`)** – Jinja helpers and speech templates reused by the notify/speech engines.
- **www/ + custom components** – branding assets, floorplans, and any custom components the core install depends on.

### Featured automations by section
| Section | Why start here | Featured automation(s) |
| --- | --- | --- |
| Packages | Self-contained subsystems that highlight patterns like combined alerts + actions. | [packages/alarm.yaml](packages/alarm.yaml), [packages/garadget.yaml](packages/garadget.yaml), [packages/powerwall.yaml](packages/powerwall.yaml) |
| Automations | Real-world triggers that tie Zwave, MQTT, and REST sensors into the rest of the house. | [automation/garage_entry_light.yaml](automation/garage_entry_light.yaml), [automation/dark_rainy_day.yaml](automation/dark_rainy_day.yaml), [automation/dash_buttons.yaml](automation/dash_buttons.yaml) |
| Scripts | Reusable building blocks for lighting, notifications, and safety responses. | [script/monthly_color_scene.yaml](script/monthly_color_scene.yaml), [script/notify_engine.yaml](script/notify_engine.yaml), [script/speech_engine.yaml](script/speech_engine.yaml) |
| Scenes | Seasonal and ambiance presets that the scripts and automations call into. | [scene/monthly_colors.yaml](scene/monthly_colors.yaml), [scene/living_room.yaml](scene/living_room.yaml) |
| Templates & Speech | Human-friendly voice briefings and templated responses. | [templates/speech/briefing.yaml](templates/speech/briefing.yaml) |
| Dashboards & Media | UI chrome, floorplans, sound bites, and automation assets. | [www/custom_ui/floorplan/images/branding/Bear-Stone-Docker-Diagram.jpg](www/custom_ui/floorplan/images/branding/Bear-Stone-Docker-Diagram.jpg), [media/](media) |
| Seasonal Audio | Cuckoo clock with Halloween and Christmas sound packs. | [automation/System/CucKoo_Clock.yaml](automation/System/CucKoo_Clock.yaml) |

### Gear tied to these automations (affiliate links)
Only including devices that have active references in the files above.

| Device | What it drives (friendly name -> file) | Buy |
| --- | --- | --- |
| Garadget garage door controller | Garage doors: open/close, reflection alerts – [garadget package](packages/garadget.yaml) + [garage entry helper](automation/garage_entry_light.yaml) | [![Buy](https://img.shields.io/badge/Buy-Garadget-orange?logo=amazon)](https://amzn.to/2jQLpVQ) |
| August smart lock | Front-door lock status + remote control – [august package](packages/august.yaml) | [![Buy](https://img.shields.io/badge/Buy-August%20Lock-orange?logo=amazon)](https://amzn.to/48jVzZ3) |
| Amazon Echo Show | Pops up the front doorbell camera when the August lock unlocks – [august package](packages/august.yaml) | [![Buy](https://img.shields.io/badge/Buy-Echo%20Show-orange?logo=amazon)](https://amzn.to/4ptA3YO) |
| Phyn Plus water shutoff | Leak detection + auto shutoff – [phynplus package](packages/phynplus.yaml) | [![Buy](https://img.shields.io/badge/Buy-Phyn%20Plus-orange?logo=amazon)](https://amzn.to/2Zy3sbJ) |
| Rachio sprinkler controller | Rain-skips and seasonal watering – [rachio package](packages/rachio.yaml) | [![Buy](https://img.shields.io/badge/Buy-Rachio-orange?logo=amazon)](https://amzn.to/2eoPKBW) |
| Tesla Powerwall 2 | Grid-outage alerts + load-shed automations – [powerwall package](packages/powerwall.yaml) | [![Buy](https://img.shields.io/badge/Buy-Powerwall-orange?logo=tesla)](https://amzn.to/3UM4BZ5) |
| NodeMCU motion sensor | Office motion lighting + comfort scenes – [office_motion package](packages/office_motion.yaml) | [![Buy](https://img.shields.io/badge/Buy-Motion%20Node-orange?logo=amazon)](https://amzn.to/2oUgj5i) |
| Raspberry Pi 3 + Aeon Z-Wave stick | Z-Wave backbone for door/hall sensors – [garage entry helper](automation/garage_entry_light.yaml) | [![Pi](https://img.shields.io/badge/Buy-Pi%203-orange?logo=raspberrypi)](https://amzn.to/2e3DOBY) [![Z-Wave](https://img.shields.io/badge/Buy-Z--Wave%20Stick-orange?logo=zwave)](https://amzn.to/2eAiAP0) |
| Roku streaming device | TV presence -> scenes/lighting – [roku package](packages/roku.yaml) | [![Buy](https://img.shields.io/badge/Buy-Roku-orange?logo=roku)](https://amzn.to/2Ctp8cr) |
| Amazon Dash Button | Quick actions (office lamp toggle) – [dash buttons automation](automation/dash_buttons.yaml) | [![Buy](https://img.shields.io/badge/Buy-Dash%20Button-orange?logo=amazon)](https://amzn.to/2dPKZhM) |
| Dreame/Neato vacuum | Cleaning schedules + notifications – [vacuum package](packages/vacuum.yaml) | [![Buy](https://img.shields.io/badge/Buy-Vacuum-orange?logo=amazon)](https://amzn.to/4f7NpFP) |
| Flux/LED strip controller | Monthly color scenes for exterior – [monthly color scene script](script/monthly_color_scene.yaml) | [![Buy](https://img.shields.io/badge/Buy-LED%20Controller-orange?logo=amazon)](https://amzn.to/2jUBSBE) |
| Etekcity/433MHz outlet | Accent lighting relays – [garage entry helper](automation/garage_entry_light.yaml) | [![Buy](https://img.shields.io/badge/Buy-433MHz%20Outlet-orange?logo=amazon)](https://amzn.to/2efNoBP) |

### Tips for re-use
- Copy a package folder and adjust entity IDs in one place instead of hunting through automations.
- Use the scripts and scenes as examples of how to break complicated flows into composable blocks.
- The `www/` assets are ideal references when building your own Lovelace floorplans or dashboards.

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
