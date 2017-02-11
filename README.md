# Home-Assistant Config by [@ccostan](http://www.twitter.com/ccostan)
[Home Assistant](https://home-assistant.io/) configuration files (YAMLs)

This is my Home Assistant Configuration created with the All In One installer [expanded to 16GB.](https://community.home-assistant.io/t/expanding-partition-on-sd-card-for-raspberry-pi-with-noobs-pre-installed/2036)  I update it pretty regularly. 
Home Assistant runs on my [Raspberry Pi 3](http://amzn.to/2e3DOBY) with [Aeon Labs Z Wave Stick (GEN 5)](http://amzn.to/2eAiAP0). I've also added a [433Mhz Transmitter and receiver](http://amzn.to/2dceNY2)

Lots of my gear comes from [BetaBound](https://goo.gl/0vxT8A) for Beta Testing and reviews.

Software on the Pi : [Home Assistant](https://home-assistant.io/) , [Dasher](https://github.com/maddox/dasher), SSL via [SSLS](SSLS.com) - 5 Bucks A Year! , [HomeBridge](https://github.com/nfarina/homebridge) for full HA <-> Homekit compatibility. 

**Devices I have :**
* Lots of iOS Devices (iPads, iPods, iPhones)
* [Nest Thermostats](http://amzn.to/2eAhB1k) - Smart Thermostat
* [Amazon Echo](http://amzn.to/2dSVbK4) and [DOT](http://amzn.to/2e3vHFQ)
* [Amazon Dash Buttons](http://amzn.to/2dPKZhM)
* [Amazon Fire TV](http://amzn.to/2iiuaNT)
* [Phillips Hue Hub Gen 2](http://amzn.to/2eoQTJy)
* [Circle by Disney](http://amzn.to/2eAgaA6) - Parental Monitor for internet and screentime.
* [Rachio Sprinkler system](http://amzn.to/2eoPKBW) - Smart Sprinkler controller
* [Withings](http://amzn.to/2kr78nW) - Smart Weight scale
* [SkyBell HD](http://amzn.to/2dcexIB)
* [Rokus](http://amzn.to/2dpn89c) for all streaming
* [Samsung Smart TV](http://amzn.to/2efNNnq)
* ChromeCast Audios
* [AMPs](http://amzn.to/2j18dlT) - These are cheap but effective for the Dots, Chromecasts or other speakers.
* [Etekcity Outlets](http://amzn.to/2efNoBP) - Cheap 6 Buck RF outlet control!
* [Door Sensors (AEON Labs)](http://amzn.to/2e3xDxY)
* [Garadget](http://amzn.to/2jQLpVQ) - Garage Door opener/sensor - "[Siri, are my garage doors closed?](https://pbs.twimg.com/media/C3cyJZSWAAAalPm.jpg:large)"
* Nintendo Wii
* Emulated Hue pushes all Switch, Group, input_boolean, script and scene information to Alexa for First Class Control! 
* [iTeadStudio](https://www.itead.cc/) [goodies](https://twitter.com/ccostan/status/793119824008384512) - SonOff and SonOn with a Slampher!
* [LED RGB Wifi Controller - flux_led compatible](http://amzn.to/2jUBSBE) with [LED Strip kits](http://amzn.to/2gJYfZ5) - ~100 Feet. These are great [Power supplies](http://amzn.to/2j5Vu0D)
* [Digital Smart Water Main ShutOff/Leak Detector] (http://www.providencecpc.org/wp-content/uploads/2016/01/work_in_progress.png) - Beta test to monitor Water usage and Leaks centrally.
* [Aeon Labs AEDSB09104ZWUS Aeotec Z-Wave Smart Energy Monitor Meter](http://amzn.to/2l5wEDo) to measure energy usage in the home.
* [SleepNumber Bed i8](http://amzn.to/2kxdXXI) - Has SleepIQ to track occupancy and sleep habits.  Tied into HA.

**Automations:**
* Voice Notifications via the [AMPs](http://amzn.to/2j18dlT) connected to ChromeCast Audios.  Accomplished via the [~~Google~~ Amazon Polly TTS](https://home-assistant.io/components/tts/) component.
* Ability to ask Alexa to repeat the last Voice notification - 'Alexa, Turn on Last message'.
* Guest mode to disable certain interior automations. Trigger via Alexa & IFTTT.
* IFTTT Notifications for Offline Devices, BadLogins, HA Startups, new HA versions and [External IP changes](https://community.home-assistant.io/t/detect-if-ip-changes/6830) for DSN.
* Monitor the reflection rates of Garadget and notify when they being to drop too low when closed (indicating a shift in the controller)
* Notifications when the garage door is left open at night or when we leave the house.
* (IFTTT) Logging entries in Logbooks for Rachio, Doorbell
* Auto Heal ZWave at 2:30am
* Using [Etekcity Outlets](http://amzn.to/2efNoBP) to control accent lighting above kitchen cabinets and room cutouts.
* Turn on Hallway light for no more than 20 minutes when Pantry door is opened.
* Turn on TV Time Lights (dim and color) at Sunset (if home and TV is on)
* Turn on Upstairs light if Nest detects people and it's nighttime.
* Turn off lights when Nest detects we are away. (Upstairs and Downstairs)
* Turn on some lights abd switches when we get home
* Turn on some outdoor Lights at Sunset or if it gets darkish in the house, Turn off 4 hours before sunrise.  Turn off interior lights when we go to sleep.
* Turn on lights during school days for a morning routine for the kids and wife. Has No School overide boolean in GUI.
* Rainy days trigger extra light inside the house. 
* Detects when lights are turned on and adjusts them to correct brightness based on time of day.
* Leverage Alexa, IFTTT and Elekcity outlet to control Printer On/Off via Voice. Turns off automatically after 20 minutes.
* Turn on AMPs when Chromecast reports 'Playing'.  Turn them off when we are done streaming music. 
* (IFTTT) Blink ALL lights at 9:30 to remind me to take medicine. (also Alexa Alert)
* (IFTTT) Blink Office lights 15 minutes before ANY meeting on my calendar (using IFTTT)
* (IFTTT) Stop watering grass via Rachio if winds are greater than 20 MPH. 
* (IFTTT) Blink ALL lights if Winds get to 70MPH - Hurricance warning.
* (IFTTT) Trigger Good Night routine when I step on the [Withings](http://amzn.to/2kr78nW) scale after 10pm.
* Sets up the front lights in the house with preset colors depending on the ~~month~~ day!.
* On motion from Doorbell (IFTTT) Turn front lights to Bright White lights for 10 minutes and then back to original colors.
* When someone rings the Doorbell (IFTTT), the backyard and Bathroom lights Flash - Since we might not hear the doorbell.
* Watch and alert on Home Assistant's Disk usage. Get alerts before Pi runs out of space. 

**Time Based Automation TimeLine**
```
ALL DAY LONG: 
Check to see if we are away.

SUNRISE minus 1 hour
     Turn off ALL SWITCHES
     Turn off ALL LIGHTS
05:00 AM ** Light Brightness helper 50 Brightness ** 
06:00 AM ( on school days) : Turn on Dining Room lights, Kitchen Accents and start Kid's bedroom [Hue Go](http://amzn.to/2iB36Ii) wake up lights.
06:51 AM Turn on Dinette lights, Turn off Dining Room Lights and Kitchen Accents
07:51 AM Turn on Kitchen Lights
08:00 AM ** Light Brightness helper FULL 255 Brightness ** 
08:31 AM (on school days) Turn off ALL interior lights.

SUNSET: 
     Turn on Den Outlet, Living Room Outlet, Dining Room Outlet, Outdoor Bathroom light, TV lights
     Activate Monthly Front Lighting Scene
     Check if Garage Door is open (Every 60 minutes)
     ** Kitchen Light/Accent Helper Activated **

08:00 PM ** Late Night Helper is active **
08:00 PM ** Light Brightness helper 35 Brightness ** 
08:00 PM TV time Scene triggered if the TV is on. 
09:00 PM Turn on [Hue Go](http://amzn.to/2iB36Ii) lights for the kid's rooms and start fading down.
02:00 AM ** Late Night Help Deactivated **
02:31 AM Heal ZWave Network
```

![Screenshot of Home View](https://i.imgur.com/6NYAhZA.png)
![Screenshot of Garage Door View](https://i.imgur.com/rtRZJNP.png)
![Screenshot of Lights](https://i.imgur.com/oDeQrm2.png)

#Todo List
I've moved this entire section to the [issues section](https://github.com/CCOSTAN/Home-AssistantConfig/issues) on github. 




