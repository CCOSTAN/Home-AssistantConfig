<h1 align="center">
  <a name="logo" href="https://www.vCloudInfo.com/tag/iot"><img src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/x_profile.png" alt="Bear Stone Smart Home" width="200"></a>
  <br>
  Bear Stone Smart Home Documentation
</h1>
<h4 align="center">Be sure to :star: my configuration repo so you can keep up to date on any daily progress!</h4>

Home Assistant sound assets are served from `/local/sounds/`.

### Quick navigation
- You are here: `config/www/sounds/` (public local audio)
- [Repo overview](../../../README.md) | [Config index](../../README.md) | [Automations](../../automation) | [Scripts](../../script)

![Home Assistant header](https://i.imgur.com/vjDH1LJ.png)

### Tips
- Door chimes, dog barks, and speech effects use the same local audio directory as the clock packs.
- The `gf_clock/`, `custom/`, and `speechcons/` folders group other sound sets.
- The cuckoo clock follows `sensor.holiday_lighting_mode` for the four sets below. Each hourly recording counts from one to twelve. The half-hour uses the one o'clock recording.
  - [Hanukkah](hanukkah-clock/) (`hanukkah`) counts with wooden dreidel knocks, answered by klezmer clarinet and hammered dulcimer.
  - [New Year's](new-years-clock/) (`new_years_day`) uses one glass clink per hour over a piano arrangement of *Auld Lang Syne*.
  - [Easter](easter-clock/) (`easter`) uses a two-note bird call for each count, answered by bassoon, plucked strings, and marimba.
  - [Thanksgiving](thanksgiving-clock/) (`thanksgiving`) pairs turkey calls with dulcimer and quiet dinner-table sounds. The turkey call was recorded by JarredGibb. [Recording and license](https://orangefreesounds.com/turkey-gobble/)
- Outside these lighting modes, October uses `october-clock`, December uses `december-clock`, and other months use `cuckoo-clock`. The patriotic `july-clock` pack is disabled.

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
