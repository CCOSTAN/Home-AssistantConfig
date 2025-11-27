
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

Reusable lighting and ambiance presets. Automations and scripts call these scenes to avoid duplicating brightness/color targets everywhere.

### Quick navigation
- You are here: `config/scene/` (scenes library)
- [Repo overview](../../README.md) | [Config index](../README.md) | [Scripts](../script) | [Automations](../automation)

![Home Assistant header](https://i.imgur.com/vjDH1LJ.png)

### Featured files to browse
| File | Why it matters |
| --- | --- |
| [monthly_colors.yaml](monthly_colors.yaml) | Exterior lighting colors mapped to holidays and seasons. |
| [living_room.yaml](living_room.yaml) | Core living-room presets: TV Time, red alert, new daytime cool and evening amber defaults. |

### Scene color schemes
| Scene | Colors / temps | Driven by |
| --- | --- | --- |
| TV Time | Gold accents, low brightness, fronts off | Called by media/TV automations |
| Red_living_Room | All fixtures red, mid/high brightness | Alert/entry automations (garage/doors) |
| Living_Room_Daytime_Cool | 5500K cool white, full brightness | Living room default automation (day) |
| Living_Room_Evening_Amber | 2700K warm/amber, softer brightness | Living room default automation (night) |
| month_standard_colors | Baseline white/neutral monthly palette | `script.monthly_color_scene` after sunset |
| month_RWB_colors | Red/white/blue set (patriotic/July 4th) | `script.monthly_color_scene` (flag/holiday) |
| month_valentine_colors | Valentine pinks/reds | `script.monthly_color_scene` (Feb 10–14) |
| month_mardi_gras_colors | Purple/green/gold Mardi Gras | `script.monthly_color_scene` (Mar 5) |
| month_st_patty_colors | Green-centric St. Patrick's | `script.monthly_color_scene` (Mar 15–17) |
| month_pi_colors | Pi Day playful hues | `script.monthly_color_scene` (Mar 14) |
| month_easter_colors | Pastel Easter set | `script.monthly_color_scene` (Easter countdown) |
| month_starwars_colors | Star Wars themed mix | `script.monthly_color_scene` (May 4) |
| month_cinco_de_mayo_colors | Cinco de Mayo festive mix | `script.monthly_color_scene` (May 5) |
| month_mothers_day_colors | Mother's Day palette | `script.monthly_color_scene` (countdown) |
| month_fathers_day_colors | Father's Day palette | `script.monthly_color_scene` (countdown) |
| month_halloween_colors | Halloween oranges/purples | `script.monthly_color_scene` (Oct 1–31) |
| month_veterans_colors | Veterans Day palette | `script.monthly_color_scene` (Nov 11) |
| month_thanksgiving_colors | Autumn harvest tones | `script.monthly_color_scene` (countdown) |
| month_hanukkah_colors | Hanukkah blues/whites | `script.monthly_color_scene` (Hanukkah countdown) |
| month_christmas_colors | Christmas reds/greens | `script.monthly_color_scene` (Christmas countdown) |
| month_new_years_day_colors | New Year's bright/celebratory | `script.monthly_color_scene` (Jan 1 & Dec 31) |

### Tips
- Adjust scenes once and let all dependent automations inherit the change.
- Pair with `script/monthly_color_scene.yaml` for dynamic monthly palettes.


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
