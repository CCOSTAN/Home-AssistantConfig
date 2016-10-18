# Home-Assistant Config by [@ccostan](http://www.twitter.com/ccostan)
[Home Assistant](https://home-assistant.io/) configuration files (YAMLs)

This is my Home Assistant Configuration created with the All In One installer.  I update it pretty regularly. 
Home Assistant runs on my [Raspberry Pi 3](http://amzn.to/2e3DOBY) with [Aeon Labs Z Wave Stick (GEN 5)](http://amzn.to/2eAiAP0). I've also added a [433Mhz Transmitter and receiver](http://amzn.to/2dceNY2)

Software on the Pi : [Home Assistant](https://home-assistant.io/) , [Dasher](https://github.com/maddox/dasher), [HomeBridge](https://github.com/nfarina/homebridge)

**Devices I have :**
* Lots of iOS Devices (iPads, iPods, iPhones)
* [Nest Thermostats](http://amzn.to/2eAhB1k)
* [Amazon Echo](http://amzn.to/2dSVbK4) and [DOT](http://amzn.to/2e3vHFQ)
* [Amazon Dash Buttons](http://amzn.to/2dPKZhM)
* [Phillips Hue Hub](http://amzn.to/2eoQTJy)
* [Circle by Disney](http://amzn.to/2eAgaA6)
* [Rachio Sprinkler system](http://amzn.to/2eoPKBW)
* [SkyBell HD](http://amzn.to/2dcexIB)
* [Rokus](http://amzn.to/2dpn89c) for all streaming
* [Samsung Smart TV](http://amzn.to/2efNNnq)
* ChromeCast Audios
* [Etekcity Outlets](http://amzn.to/2efNoBP)
* [Door Sensors (AEON Labs)](http://amzn.to/2e3xDxY)
* Nintendo Wii
* Emulated Hue to try and get Alexa to see my switches.Not working yet http://carlo-pi:8300/api/12345678901234567890/lights

**Automations:**
* SMS and IFTTT Notifications for Offline Devices, BadLogins, HA Startups, new HA versions.
* (IFTTT) Logging entries in Logbooks for Rachio, Doorbell
* Auto Heal ZWave at 2:30am
* Turn on TV Time Lights (dim and color) at Sunset (if home and TV is on)
* Turn on Upstaris light if Nest detects people and it's nighttime.
* Turn off lights when Nest detects we are away. (Upstairs and Downstairs)
* Turn on some lights when we get home
* (IFTTT) Blink ALL lights at 9:30 to remind me to take medicine. (also Alexa Alert)
* (IFTTT) Blink Office lights 15 minutes before ANY meeting on my calendar (using IFTTT)
* (IFTTT) Stop watering grass via Rachio if winds are greater than 20 MPH. 

![Screenshot of Dashboards](https://i.imgur.com/HgVkDGD.png)

#Todo List

* Put Dash Buttons out there.
* Put door sensor on garage door
* Put Door Sensor in Mailbox
* Put Door Sensor in Attic trap door to trigger light (GE LINK)