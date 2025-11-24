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

Legacy gear catalog and inspiration hub. This doc preserves older hardware references, affiliate links, and blog/video write-ups for anyone browsing the full history of the Bear Stone Smart Home. For the current configuration and actively maintained gear list, start at the main README and config index below.

### Quick navigation
- [Repo overview](../README.md) | [Config index](../config/README.md) | [Packages](../config/packages/README.md) | [YouTube](https://youtube.com/vCloudInfo) | [Blog](https://www.vcloudinfo.com)
- Looking for the latest gear tied to live automations? See the gear table in `README.md` and `config/README.md`.

![Home Assistant header](https://i.imgur.com/vjDH1LJ.png)

### How to use this legacy guide
- Treat this as a historical reference and inspiration board. Some items are retired; others are still running but have newer counterparts in the main READMEs.
- Blog posts and videos are linked where they were originally documented so you can see the build notes and why certain choices were made.
- If you pick up any hardware here, cross-check entity names and automations in `config/` before wiring it into your setup.

### Power & network backbone
| Gear | Why it mattered | Buy / Deep dive |
| --- | --- | --- |
| APC Back-UPS (450VA/600VA) | Keeps routers, hubs, and HA online during blips. | [Buy](https://amzn.to/2HJerU8) |
| Tesla Powerwall 2 | Whole-home backup + load shedding during outages. | [Blog](https://www.vcloudinfo.com/2018/01/going-green-to-save-some-green-in-2018.html) |
| Unifi AC Pro APs | Reliable Wi‑Fi + presence tracking across the house. | [Buy](https://amzn.to/2mBSfE9) |
| Netgear 16-port switch | Wired backbone feeding hubs, cameras, and HA host. | [Buy](https://amzn.to/2GJwyIb) |

### Voice, buttons, and presence
| Gear | What it drove | Buy / Deep dive |
| --- | --- | --- |
| Echo Dot / Echo / Tap | Voice input for modes, guest toggles, and whole-home music. | [Buy](https://amzn.to/2e3vHFQ) |
| Amazon Dash Button | Repurposed as quick-action triggers (office lamp, scenes). | [Buy](https://amzn.to/2dPKZhM) |
| Circle by Disney | Legacy parental controls + device discovery alerts. | [Buy](https://mbsy.co/circlemedia/41927098) |
| Last Message trigger | Alexa “repeat last notification” helper. | [Package](../config/packages/triggers/last_message.yaml) |
| August smart lock | Front-door lock control + presence-aware routines. | [Buy](https://amzn.to/48jVzZ3) · [Video](https://youtu.be/UdcCeAyo9Ak?si=O-f607NHbRLKZxao) |

### Lighting, LEDs, and ambience
| Gear | What it drove | Buy / Watch |
| --- | --- | --- |
| Flux/LED strip controller | Exterior monthly color scenes + holiday palettes. | [Buy](https://amzn.to/2jUBSBE) · [Scenes](../config/scene/monthly_colors.yaml) |
| Hue Lightstrip | TV backlights + media-aware accent lighting. | [Buy](https://amzn.to/2FGbPpL) |
| Etekcity 433MHz outlets | Accent lighting relays + printer power control. | [Buy](https://amzn.to/2efNoBP) |
| Holiday lighting routines | Color changes by holiday; motion/garage overrides. | [Blog](https://www.vcloudinfo.com/2019/02/breaking-down-the-flag-sensor-in-home-assistant.html) · [Video](https://youtu.be/nsWq4uVrQ0g) |

### Garage, vehicles, and power
| Gear | What it drove | Buy / Deep dive |
| --- | --- | --- |
| Garadget | MQTT garage control + reflection monitoring + safety alerts. | [Buy](https://amzn.to/2jQLpVQ) · [Blog](https://www.vcloudinfo.com/2019/03/how-to-add-garadget-to-home-assistant.html) |
| JuiceBox Pro 40 EVSE | Managed EV charging (amps watchdog + notifications). | [Buy](https://www.amazon.com/dp/B00UB9R4KO) |
| Tesla Model Y | Presence, charging stats, and outage/load automation. | [Blog](https://www.vcloudinfo.com/2018/01/going-green-to-save-some-green-in-2018.html) |
| Garage entry helper | Lights + safety cues when doors open/close. | [Automation](../config/automation/garage_entry_light.yaml) |

### Water, weather, and safety
| Gear | What it drove | Buy / Deep dive |
| --- | --- | --- |
| Phyn Plus smart shutoff | Leak detection + auto valve close with critical alerts. | [Buy](https://amzn.to/2Zy3sbJ) · [Blog](https://www.vcloudinfo.com/2020/05/phyn-plus-smart-water-shutoff-device.html) |
| Blitzortung lightning sensor | Strike alerts with snooze + presence-aware notifications. | [Blog](https://www.vcloudinfo.com/2020/08/adding-a-lightning-sensor-to-home-assistant.html) |
| Pi-hole on Pi Zero | Network-wide DNS/ad blocking with daily stats. | [Blog](https://www.vcloudinfo.com/2019/03/revisiting-the-pi-on-pi-day-with-home-assistant.html) |

### Media, cameras, and dashboards
| Gear | What it drove | Buy / Deep dive |
| --- | --- | --- |
| Roku | Media presence for lighting/scenes and announcements. | [Buy](https://amzn.to/2Ctp8cr) |
| Samsung/Fire TV | Theater scenes and backlight coordination. | [Buy](https://amzn.to/2efNNnq) |
| Synology NVR 1218 | Camera recording with HA-integrated views. | [Buy](https://amzn.to/2COe9aU) · [Video](https://youtu.be/GmpP52yG0S8) |
| Floorplan + Lovelace dashboards | Visual status of sensors, cameras, and rooms. | [Diagram](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/bearstoneflow.png) |

### Blog & video inspiration (archived)
- Docker migration journey: [Blog](https://www.vcloudinfo.com/2018/02/journey-to-docker.html) · [Ubuntu upgrade video](https://youtu.be/w-YNtU1qtlk)
- Template conditions in HA: [Blog + video](https://www.vcloudinfo.com/2019/06/how-to-use-template-conditions-in-home-assistant.html)
- Port forwarding Arris TG1682: [Blog + video](https://www.vcloudinfo.com/2018/11/port-forwarding-on-arris-tg1682-modem.html)
- Cameras + Synology + HA walkthrough: [Video](https://youtu.be/GmpP52yG0S8)
- Holiday/flag sensor breakdown: [Blog](https://www.vcloudinfo.com/2019/02/breaking-down-the-flag-sensor-in-home-assistant.html)
- Home Assistant Pi Day + Pi-hole stats: [Video](https://youtu.be/woA88DFlH5c)

### Historical diagram
![Smart Home Diagram](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/bearstoneflow.png)

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
