<h1 align="center">
  <a name="logo" href="http://www.vCloudInfo.com/tag/iot"><img src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/twitter_profile.png" alt="Bear Stone Smart Home" width="200"></a>
  <br>
  Bear Stone Smart Home Configuration
</h1>
<h4 align="center">Be sure to :star: my repo so you can keep up to date on the daily progress!.</h4>
<div align="center">
  <h4>
    <a href="https://travis-ci.org/CCOSTAN/Home-AssistantConfig"><img src="https://travis-ci.org/CCOSTAN/Home-AssistantConfig.svg?branch=master"/></a>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig/stargazers"><img src="https://img.shields.io/github/stars/CCOSTAN/Home-AssistantConfig.svg?style=plasticr"/></a>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig/commits/master"><img src="https://img.shields.io/github/last-commit/CCOSTAN/Home-AssistantConfig.svg?style=plasticr"/></a>
  </h4>
</div>
<div align="center"><a name="menu"></a>
  <h4>
    <a href="http://www.vCloudInfo.com/tag/iot">
      Blog
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#devices">
      Devices
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig/issues">
      Todo List
    </a>
    <span> | </span>
    <a href="https://twitter.com/BearStoneHA">
      Smart Home Stats
    </a>
    <span> | </span>
    <a href="https://www.facebook.com/BearStoneHA">
      Facebook
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig/tree/master/config">
      Code
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#diagram">
      Diagram
    </a>    
    <span> | </span>
    <a href="https://youtube.com/CCOSTAN">
      Youtube
    </a>
    <span> | </span>
    <a href="https://www.vcloudinfo.com/p/shop-our-merch.html">
      Tee Shop
    </a>
  </h4>

This directory is primarily used for automations that are triggered via time.  Daily, monthly, seasonally or on the hour.

**Time Based Automation TimeLine**

ALL DAY LONG:
Checks to see if we are away.
Cuckoo Clock goes off each hour and on the half.

SUNRISE minus 1 hour
     Turn off ALL SWITCHES
     Turn off ALL LIGHTS
05:00 AM ** Light Brightness helper 50 Brightness **
06:00 AM ( on school days) : Turn on Dining Room lights, Kitchen Accents and start Kid's bedroom [Hue Go](http://amzn.to/2iB36Ii) wake up lights.
06:51 AM Turn on Dinette lights, Turn off Dining Room Lights and Kitchen Accents
07:51 AM Turn on Kitchen Lights
08:00 AM ** Light Brightness helper FULL 255 Brightness **
08:31 AM (on school days) Turn off ALL interior lights.
09:00 AM Speech Notifications are enabled for the house.

SUNSET:
     Turn on Den Outlet, Living Room Outlet, Dining Room Outlet, Outdoor Bathroom light, TV lights
     Activate Monthly Front Lighting Scene
     Check if Garage Door is open (Every 60 minutes)
     ** Kitchen Light/Accent Helper Activated **

08:00 PM ** Late Night Helper is active **
08:00 PM ** Light Brightness helper 35 Brightness **
08:00 PM TV time Scene triggered if the TV is on.
09:00 PM Turn on [Hue Go](http://amzn.to/2iB36Ii) lights for the kid's rooms and start fading down.
10:00 PM Speech Notifications are disabled for the house. (except under ALERT mode) and AMP is shut.
02:00 AM ** Late Night Help Deactivated **
02:31 AM Heal ZWave Network
<a name="bottom" href="https://github.com/CCOSTAN/Home-AssistantConfig#logo"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="25" ></a>

**Still have questions on my Config?**
**Message me on twitter :** [@CCostan](https://twitter.com/ccostan) or [@BearStoneHA](https://twitter.com/BearStoneHA)
<!-- Subscribe Section -->
<a href="http://eepurl.com/dmXFYz"><img align="center" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/email_link.png" height="50" ></a>.
<!-- Subscribe Section END-->
