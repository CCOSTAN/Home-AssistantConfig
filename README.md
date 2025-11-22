<h1 align="center">
  <a name="logo" href="https://www.vCloudInfo.com/tag/iot"><img src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/x_profile.png" alt="Bear Stone Smart Home" width="200"></a>
  <br>
  Bear Stone Smart Home Documentation
</h1>
<h4 align="center">Be sure to :star: my configuration repo so you can keep up to date on any daily progress!</h4>

<div align="center">

[![X Follow](https://img.shields.io/static/v1?label=talk&message=3k&color=blue&logo=twitter&style=for-the-badge)](https://x.com/ccostan)
[![YouTube Subscribe](https://img.shields.io/youtube/channel/subscribers/UC301G8JJFzY0BZ_0lshpKpQ?label=VIEW&logo=Youtube&logoColor=%23DF5D44&style=for-the-badge)](https://www.youtube.com/vCloudInfo?sub_confirmation=1)
[![GitHub Stars](https://img.shields.io/github/stars/CCOSTAN/Home-AssistantConfig?label=STARS&logo=Github&style=for-the-badge)](https://github.com/CCOSTAN)
[![HA Version Badge](https://raw.githubusercontent.com/ccostan/home-assistantconfig/master/ha-version-badge.svg)](https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/.HA_VERSION)
[![Last Commit](https://img.shields.io/github/last-commit/CCOSTAN/Home-AssistantConfig.svg?style=plastic)](https://github.com/CCOSTAN/Home-AssistantConfig/commits/master)
[![Commit Activity](https://img.shields.io/github/commit-activity/y/CCOSTAN/Home-AssistantConfig.svg?style=plastic)](https://github.com/CCOSTAN/Home-AssistantConfig/commits/master)

</div>

Live, personal Home Assistant configuration shared for **browsing and inspiration**. This is not a turnkey clone-and-run setup; borrow ideas, adapt entity IDs/secrets, and test in your own environment.

### Quick navigation
- Blog | [Issues](https://github.com/CCOSTAN/Home-AssistantConfig/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) | [Diagram](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/bearstoneflow.png) | [YouTube](https://youtube.com/vCloudInfo)
- Config highlights: `config/packages`, `config/automation`, `config/script`, `config/scene`, `config/templates`, `config/www`
- Gear & affiliate catalog: see `docs/legacy-readme.md` (full device list with links)

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

### Featured examples to start with
- Alarm and perimeter monitoring: [config/packages/alarm.yaml](config/packages/alarm.yaml)
- Garage routines and entry lighting: [config/packages/garadget.yaml](config/packages/garadget.yaml), [config/automation/garage_entry_light.yaml](config/automation/garage_entry_light.yaml)
- Holiday/front-of-house color scenes: [config/scene/monthly_colors.yaml](config/scene/monthly_colors.yaml), [config/script/monthly_color_scene.yaml](config/script/monthly_color_scene.yaml)
- Dash-button triggers for quick actions: [config/automation/dash_buttons.yaml](config/automation/dash_buttons.yaml)
- Battery and solar awareness: [config/packages/powerwall.yaml](config/packages/powerwall.yaml)
- Presence-aware office comfort: [config/packages/office_motion.yaml](config/packages/office_motion.yaml)
- Weather-aware lighting: [config/automation/dark_rainy_day.yaml](config/automation/dark_rainy_day.yaml)

### Network diagram
![Smart Home Diagram](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/bearstoneflow.png)

### Gear tied to real automations (affiliate links)
Only listing hardware that appears in active packages/automations here. The full catalog (including older gear) remains in `docs/legacy-readme.md`.

| Device | What it drives (friendly name -> file) | Buy |
| --- | --- | --- |
| Garadget garage door controller | Garage doors: open/close, reflection alerts - [garadget package](config/packages/garadget.yaml) | [![Buy](https://img.shields.io/badge/Buy-Garadget-orange?logo=amazon)](https://amzn.to/2jQLpVQ) |
| Phyn Plus water shutoff | Leak detection + auto shutoff - [phynplus package](config/packages/phynplus.yaml) | [![Buy](https://img.shields.io/badge/Buy-Phyn%20Plus-orange?logo=amazon)](https://amzn.to/2Zy3sbJ) |
| Rachio sprinkler controller | Rain-skips and seasonal watering - [rachio package](config/packages/rachio.yaml) | [![Buy](https://img.shields.io/badge/Buy-Rachio-orange?logo=amazon)](https://amzn.to/2eoPKBW) |
| Tesla Powerwall 2 | Grid-outage alerts + load-shed automations - [powerwall package](config/packages/powerwall.yaml) | [![Buy](https://img.shields.io/badge/Buy-Powerwall-orange?logo=tesla)](https://amzn.to/3UM4BZ5) |
| NodeMCU motion sensor | Office motion lighting - [office_motion package](config/packages/office_motion.yaml) | [![Buy](https://img.shields.io/badge/Buy-Motion%20Node-orange?logo=amazon)](https://amzn.to/2oUgj5i) |
| Raspberry Pi 3 + Aeon Z-Wave stick | Z-Wave backbone for door/hall sensors - [garage entry helper](config/automation/garage_entry_light.yaml) | [![Pi](https://img.shields.io/badge/Buy-Pi%203-orange?logo=raspberrypi)](https://amzn.to/2e3DOBY) [![Z-Wave](https://img.shields.io/badge/Buy-Z--Wave%20Stick-orange?logo=zwave)](https://amzn.to/2eAiAP0) |
| Roku streaming device | TV presence -> scenes/lighting - [roku package](config/packages/roku.yaml) | [![Buy](https://img.shields.io/badge/Buy-Roku-orange?logo=roku)](https://amzn.to/2Ctp8cr) |
| Amazon Dash Button | Quick actions (office lamp toggle) - [dash buttons automation](config/automation/dash_buttons.yaml) | [![Buy](https://img.shields.io/badge/Buy-Dash%20Button-orange?logo=amazon)](https://amzn.to/2dPKZhM) |
| Dreame/Neato vacuum | Cleaning schedules + notifications - [vacuum package](config/packages/vacuum.yaml) | [![Buy](https://img.shields.io/badge/Buy-Vacuum-orange?logo=amazon)](https://amzn.to/4f7NpFP) |
| Flux/LED strip controller | Monthly color scenes for exterior - [monthly color scene](config/script/monthly_color_scene.yaml) | [![Buy](https://img.shields.io/badge/Buy-LED%20Controller-orange?logo=amazon)](https://amzn.to/2jUBSBE) |
| Etekcity/433MHz outlet | Accent lighting relays - [garage entry helper](config/automation/garage_entry_light.yaml) | [![Buy](https://img.shields.io/badge/Buy-433MHz%20Outlet-orange?logo=amazon)](https://amzn.to/2efNoBP) |

### Gear and affiliate links
- I keep a detailed, affiliate-supported gear list in `docs/legacy-readme.md`. Browsing or purchasing through those links helps support this project; thanks!

### Stay connected
- Blog: [vCloudInfo.com/tag/iot](https://www.VCloudInfo.com/tag/iot)
- YouTube: [youtube.com/vCloudInfo](https://youtube.com/vCloudInfo)
- X: [@ccostan](https://x.com/ccostan) | [@BearStoneHA](https://x.com/BearStoneHA)
- Mailing list: [Subscribe](https://eepurl.com/dmXFYz)
- Buy me a coffee: [link](https://www.buymeacoffee.com/vCloudInfo)
