<h1 align="center">
  <a name="logo" href="https://www.vCloudInfo.com/tag/iot"><img src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/x_profile.png" alt="Bear Stone Smart Home" width="200"></a>
  <br>
  Bear Stone Smart Home Documentation
</h1>
<h4 align="center">Be sure to :star: my configuration repo so you can keep up to date on any daily progress!</h4>

<div align="center">

[![X Follow](https://img.shields.io/static/v1?label=talk&message=3k&color=blue&logo=twitter&style=for-the-badge)](https://x.com/ccostan)
[![YouTube Subscribe](https://img.shields.io/badge/VIEW-6.8K-FF0000?logo=Youtube&logoColor=%23DF5D44&style=for-the-badge)](https://www.youtube.com/vCloudInfo?sub_confirmation=1)
[![GitHub Stars](https://img.shields.io/github/stars/CCOSTAN/Home-AssistantConfig.svg?label=STARS&logo=github&style=for-the-badge)](https://github.com/CCOSTAN/Home-AssistantConfig/stargazers) <br>
[![HA Version Badge](https://raw.githubusercontent.com/ccostan/home-assistantconfig/master/ha-version-badge.svg)](https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/.HA_VERSION)
[![Last Commit](https://img.shields.io/github/last-commit/CCOSTAN/Home-AssistantConfig/master?style=plastic)](https://github.com/CCOSTAN/Home-AssistantConfig/commits/master)
[![Commit Activity](https://img.shields.io/github/commit-activity/y/CCOSTAN/Home-AssistantConfig.svg?style=plastic)](https://github.com/CCOSTAN/Home-AssistantConfig/commits/master)

</div>

Longer-running shell helpers referenced by automations, packages, or cron. Anything from git updates to basketball stat scrapes lives here.

### Quick navigation
- [Repo overview](../../README.md) | [Config index](../README.md) | [Shell commands](../shell_command)

![Home Assistant header](https://i.imgur.com/vjDH1LJ.png)

### Featured files to browse
| File | Why it matters |
| --- | --- |
| [HAUpdate.sh](HAUpdate.sh) | One-command Home Assistant update helper. |
| [apt_pending_check.sh](apt_pending_check.sh) | On-demand, read-only APT pending-count reporter for the Docker host maintenance dashboard. |
| [apt_weekly.sh](apt_weekly.sh) | Daily APT check-then-update workflow that posts webhook status and can schedule reboot when needed. |
| [apt_reboot_report.sh](apt_reboot_report.sh) | Boot-time status reporter that reuses the registered APT webhook, retries while HA starts, and confirms docker_10 again after a startup-settle delay so its co-hosted HA reboot state clears reliably. |
| [gitupdate.sh](gitupdate.sh) | Pull the latest config changes on demand. |
| [joanna_mini_app_health.py](joanna_mini_app_health.py) | Probe the local and public Mini App page, assets, and unsigned API rejection without personal data or Telegram credentials. |
| [teslamate_visited_snapshot.py](teslamate_visited_snapshot.py) | Cache a daily Grafana visited-map PNG for Home Assistant's Local file camera, retaining the last good image on failure. |
| [![YAML source: basketball](https://img.shields.io/static/v1?label=YAML&message=basketball&color=lightgrey&logo=github&logoColor=181717)](basketball.yaml) | ESPN stat scraping helper used by sensors. |
| [Jinja Code.py](Jinja Code.py) | Reference Jinja snippets for templating. |

### Tips

- The TeslaMate snapshot helper reads its private Grafana render URL and authentication data from local secrets. Grafana must have an image renderer configured. The `Tesla Visited Map` Local file camera points to `image/teslamate_visited.png` under the Home Assistant configuration directory. The hourly sensor checks the cache and refreshes after 06:00 America/New_York; its timestamp and `stale`/`last_error` attributes expose refresh health. Cached images and credentials remain outside source control.
- Make scripts executable and test them manually before wiring into HA.
- Document expected env vars or secrets at the top of each script.

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
