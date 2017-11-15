# [![Build Status](https://travis-ci.org/CCOSTAN/Home-AssistantConfig.svg?branch=master)](https://travis-ci.org/CCOSTAN/Home-AssistantConfig) Home-Assistant Config by [@ccostan](http://www.twitter.com/ccostan)
[Home Assistant](https://home-assistant.io/) configuration files (YAMLs)

Be sure to :star: my repo so you can keep up to date on the daily progress!

You can also vist my [Blog](http://www.vmwareinfo.com/search/label/iot) for all of my [Home Automation Posts](http://www.vmwareinfo.com/search/label/iot).

![Screenshot of SmartHome](https://lh3.googleusercontent.com/-vKGF5gdz_VY/WVpP7qjsmjI/AAAAAAADVZ4/sGyiS1PjouUQxrEbWVfot6raxcElv4r-wCHMYCw/s1600/clip_image001%255B4%255D)

This is my Home Assistant Configuration created with the All In One installer [expanded to 16GB.](https://community.home-assistant.io/t/expanding-partition-on-sd-card-for-raspberry-pi-with-noobs-pre-installed/2036)  I update it pretty regularly. :star:
Home Assistant runs on my [Raspberry Pi 3](http://amzn.to/2e3DOBY) with [Aeon Labs Z Wave Stick (GEN 5)](http://amzn.to/2eAiAP0). I've also added a [433Mhz Transmitter and receiver](http://amzn.to/2dceNY2).  The main [SD Card](http://amzn.to/2xeBlgf) was upgraded to 16GB. (Order 2! - 1 for backup)
I use an [SD Card reader](http://amzn.to/2l2w9as) to swap SD cards between Pi and Windows for backups.

**Software on the Pi :**
* [Home Assistant](https://home-assistant.io/) ,
* [Dasher](https://github.com/maddox/dasher) to leverage those cheap [Amazon Dash Buttons](http://amzn.to/2dPKZhM)
* SSL via [SSLS](https://SSLS.com) - 5 Bucks A Year! - Keeps me safe!
* [HomeBridge](https://github.com/nfarina/homebridge) for full HA <-> Homekit compatibility.
* The amazing [Floorplan](https://github.com/pkozul/ha-floorplan) project to help visualize my smarthome.

**Devices I have :**
* [Ubiquiti Networks Unifi 802.11ac Pro](http://amzn.to/2mBSfE9) This keeps me warm with it's Wifi rays blanketing the house. Also used as a presence Tracker for iPhones/People.
* Lots of iOS Devices ([iPads](http://amzn.to/2l2qyRb), iPods, [iPhones](http://amzn.to/2l9Yoq9))
* [Nest Thermostats](http://amzn.to/2eAhB1k) - Smart Thermostat
* [Nest Protects](http://amzn.to/2poqKhu) - Smart Smoke Detectors - [Blog Post](http://www.vmwareinfo.com/2017/06/psa-check-out-your-smoke-detectors-once.html)
* [Amazon Echo](http://amzn.to/2dSVbK4) and [DOT](http://amzn.to/2e3vHFQ)
* [Amazon Echo Tap](http://amzn.to/2sz891k)
* [Amazon Dash Buttons](http://amzn.to/2dPKZhM)
* [Amazon Dash Wand](https://www.amazon.com/Amazon-Dash-Wand-With-Alexa/dp/B01MQMJFDK/ref=sr_1_1_a_it?ie=UTF8&qid=1498928735&sr=8-1&keywords=dash+wand) - Alexa outside by the pool area.
* [Amazon Fire TV](http://amzn.to/2iiuaNT)
* [Amazon Fire Tablets Gen 7](http://amzn.to/2tqlMCW)- Used for [Wall Mounted Controllers](http://www.vmwareinfo.com/2017/07/visualizing-smart-home-using-home.html)
* [Wink Hub](http://amzn.to/2orGEWo) - Used to connect certain Zwave outlets etc.
* [Phillips Hue Hub Gen 2](http://amzn.to/2eoQTJy)
* Mixture of [Hue Colored lights](http://amzn.to/2l2viGK), [White Lights](http://amzn.to/2lEf4Xq) and GE Link bulbs.
* [Hue Go](http://amzn.to/2iB36Ii) - Great lights for the kids since they have an actual button on them for control.
* [Circle by Disney](http://amzn.to/2eAgaA6) - Parental Monitor for internet and screentime.
* [Rachio Sprinkler system](http://amzn.to/2eoPKBW) - Smart Sprinkler controller
* [GE ZWave Outdoor Power Module](http://amzn.to/2q17R4S) - These control my Landscape lighting and connect up to my Wink.
* [Withings](http://amzn.to/2kr78nW) - Smart Weight scale
* [SkyBell HD](http://amzn.to/2dcexIB)
* [Rokus](http://amzn.to/2dpn89c) for all streaming
* [Samsung Smart TV](http://amzn.to/2efNNnq)
* [ChromeCast Audios](http://amzn.to/2lE9gNu)
* [AMPs](http://amzn.to/2j18dlT) - These are cheap but effective for the Dots, Chromecasts or other speakers.
* [Mixer](http://amzn.to/2v9Zp3x) - This allows me to mix in DOT, music and HA. [Blog Post](http://www.vmwareinfo.com/2017/07/giving-voice-to-smart-home.html)
* [Etekcity Outlets](http://amzn.to/2efNoBP) - Cheap 6 Buck RF outlet control!
* [Door Sensors (AEON Labs)](http://amzn.to/2e3xDxY)
* [Garadget](http://amzn.to/2jQLpVQ) - Garage Door opener/sensor - "[Siri, are my garage doors closed?](https://pbs.twimg.com/media/C3cyJZSWAAAalPm.jpg:large)"
* [Nintendo Wii](http://amzn.to/2l2qIYY)
* Emulated Hue pushes all Switch, Group, input_boolean, script and scene information to Alexa for First Class Control!
* [iTeadStudio](https://www.itead.cc/) [goodies](https://twitter.com/ccostan/status/793119824008384512) - [SonOff](http://amzn.to/2l2sx8g) and a [Slampher](http://amzn.to/2l2gmIx)!
* [LED RGB Wifi Controller - flux_led compatible](http://amzn.to/2jUBSBE) with [LED Strip kits](http://amzn.to/2gJYfZ5) - ~100 Feet. These are great [Power supplies](http://amzn.to/2mnmbk8) - [Outdoor Housing](http://amzn.to/2m2dG0X) - Finished Product [#71](https://github.com/CCOSTAN/Home-AssistantConfig/issues/71) - [Blog Post](http://www.vmwareinfo.com/2017/08/diy-outdoor-smart-home-led-strips.html)
* [Digital Smart Water Main ShutOff/Leak Detector] (http://www.providencecpc.org/wp-content/uploads/2016/01/work_in_progress.png) - Beta test to monitor Water usage and Leaks centrally.
* [Aeon Labs AEDSB09104ZWUS Aeotec Z-Wave Smart Energy Monitor Meter](http://amzn.to/2l5wEDo) to measure energy usage in the home.
* [SleepNumber Bed i8](http://amzn.to/2kxdXXI) - Has SleepIQ to track occupancy and sleep habits.  Tied into HA.
* [MX8 Zodiac Pool Robot](http://amzn.to/2nAGvPf) - Not YET hooked up HA, but working on it.
* [Pi Zero](http://amzn.to/2ougZQ3) with [Wireless Nub](http://amzn.to/2q38rg4) running Pi-Hole and smacking down internet ads left and right!
* [NodeMCU Development Boards](http://amzn.to/2ou0NON) hooked into the alarm system wires for [DIY alarm system](http://www.vmwareinfo.com/2017/06/building-my-home-alarm-system-hardware.html). - [DIY Motion Sensors](http://www.vmwareinfo.com/2017/11/yet-another-inexpensive-motion-sensor.htmll)

Lots of my gear comes from [BetaBound](https://goo.gl/0vxT8A) for Beta Testing and reviews.

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/3MkgeKFUVKPNW45Vtwu9Abd4/CCOSTAN/Home-AssistantConfig'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/3MkgeKFUVKPNW45Vtwu9Abd4/CCOSTAN/Home-AssistantConfig.svg' />
</a>

**Automations:**
* Voice Notifications via the [AMPs](http://amzn.to/2j18dlT) connected to ChromeCast Audios and [Mixer](http://amzn.to/2v9Zp3x).  Accomplished via the [~~Google~~ Amazon Polly TTS](https://home-assistant.io/components/tts/) component.
* Ability to ask Alexa to repeat the last Voice notification - 'Alexa, Turn on Last message'.
* Track garbage days and chore days for the kids. Voice reminders and Alexa intergration/request for info.
* Guest mode to disable certain interior automations. Trigger via Alexa & IFTTT.
* IFTTT and Slack Notifications for Offline Devices, BadLogins, HA Startups, new HA versions and [External IP changes](https://community.home-assistant.io/t/detect-if-ip-changes/6830) for DSN.
* Monitor the reflection rates of [Garadget](http://amzn.to/2jQLpVQ) and notify when they being to drop too low when closed (indicating a shift in the controller)
* Notifications when the garage door is left open at night or when we leave the house.
* (IFTTT) Logging entries in Logbooks for [Rachio Sprinkler system](http://amzn.to/2eoPKBW), and [SkyBell HD](http://amzn.to/2dcexIB).
* Auto Heal ZWave at 2:30am
* Using [Etekcity Outlets](http://amzn.to/2efNoBP) to control accent lighting above kitchen cabinets and room cutouts.
* Turn on Hallway light for no more than 20 minutes when Pantry door is opened.
* Turn on TV Time Lights (dim and color) at Sunset (if home and TV is on)
* Turn on Upstairs light if [Nest Thermostats](http://amzn.to/2eAhB1k) detects people and it's nighttime.
* Turn off lights when [Nest Thermostats](http://amzn.to/2eAhB1k) detects we are away. (Upstairs and Downstairs)
* Turn on some lights and switches when we get home
* Turn on some outdoor Lights at Sunset or if it gets darkish in the house, Turn off 4 hours before sunrise.  Turn off interior lights when we go to sleep.
* Turn on lights during school days for a morning routine for the kids and wife. Has No School overide boolean in GUI.
* Rainy days trigger extra light inside the house.
* Check the UV Rays for the day and let us know if we need sun tan lotion over the TTS system.
* Detects when lights are turned on and adjusts them to correct brightness based on time of day.
* Leverage Alexa, IFTTT and Elekcity outlet to control Printer On/Off via Voice. Turns off automatically after 20 minutes.
* Turn on [AMPs](http://amzn.to/2j18dlT) when Chromecast reports 'Playing'.  Turn them off when we are done streaming music.
* (IFTTT) Blink ALL lights at 9:30 to remind me to take medicine. (also Alexa Alert)
* (IFTTT) Blink Office lights 15 minutes before ANY meeting on my calendar (using IFTTT)
* (IFTTT) Stop watering grass via [Rachio Sprinkler system](http://amzn.to/2eoPKBW) if winds are greater than 20 MPH.
* (IFTTT) Add a 1 day rain delay to [Rachio Sprinkler system](http://amzn.to/2eoPKBW) if it is going to rain tomorrow.
* (IFTTT) Blink ALL lights if Winds get to 70MPH - Hurricance warning.
* (IFTTT) Trigger Good Night routine when I step on the [Withings](http://amzn.to/2kr78nW) scale after 10pm.
* Sets up the front lights in the house with preset colors depending on the ~~month~~ day!.
* On motion from [SkyBell HD Doorbell](http://amzn.to/2dcexIB) (IFTTT) Turn front lights to Bright White lights for 10 minutes and then back to original colors.  Fake Dog barking when there is motion by the house.
* When someone rings the Doorbell (IFTTT), the backyard and Bathroom lights Flash - Since we might not hear the doorbell. Fake Dog barks as well (which can be snoozed for 30 minutes via Alexa).
* Watch and alert on Home Assistant's Disk usage. Get alerts before Pi runs out of space on the [SD Card](http://amzn.to/2kNttio).
* Digital Cuckoo Clock that goes off each hour and on the half just like a real Cuckoo Clock.  Plays across the whole house on my [ChromeCast Audios](http://amzn.to/2lE9gNu)

**Time Based Automation TimeLine**
```
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
02:35 AM Clear out daily TTS cache
```

#Todo List
I've moved this entire section to the [issues section](https://github.com/CCOSTAN/Home-AssistantConfig/issues) on github.
Feel free to join the conversations there.

![Screenshot of Home View](https://i.imgur.com/UlUiKTX.png)
![Screenshot of Garage Door View](https://i.imgur.com/zotvUKp.png)
![Screenshot of Lights](https://i.imgur.com/KKCPaLJ.png)
![Screenshot of More](https://i.imgur.com/rg6lhJz.png)
![Screenshot of Even More](https://i.imgur.com/SlglNh3.png)
![Screenshot of Last one](https://i.imgur.com/sTsYQi4.png)

**All files are now being edited with [Atom](https://atom.io/).**

**All of my configuration files are tested against the most stable version of home-assistant using [Travis](https://travis-ci.org/CCOSTAN/Home-AssistantConfig).**

#Still have questions on my Config?
Message me on twitter : [@CCostan](https://twitter.com/ccostan)
