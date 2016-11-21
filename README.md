# Home-Assistant Config by [@ccostan](http://www.twitter.com/ccostan)
[Home Assistant](https://home-assistant.io/) configuration files (YAMLs)

This is my Home Assistant Configuration created with the All In One installer.  I update it pretty regularly. 
Home Assistant runs on my [Raspberry Pi 3](http://amzn.to/2e3DOBY) with [Aeon Labs Z Wave Stick (GEN 5)](http://amzn.to/2eAiAP0). I've also added a [433Mhz Transmitter and receiver](http://amzn.to/2dceNY2)

Software on the Pi : [Home Assistant](https://home-assistant.io/) , [Dasher](https://github.com/maddox/dasher), SSL via [SSLS](SSLS.com) - 5 Bucks A Year!

**Devices I have :**
* Lots of iOS Devices (iPads, iPods, iPhones)
* [Nest Thermostats](http://amzn.to/2eAhB1k)
* [Amazon Echo](http://amzn.to/2dSVbK4) and [DOT](http://amzn.to/2e3vHFQ)
* [Amazon Dash Buttons](http://amzn.to/2dPKZhM)
* [Phillips Hue Hub Gen 2](http://amzn.to/2eoQTJy)
* [Circle by Disney](http://amzn.to/2eAgaA6)
* [Rachio Sprinkler system](http://amzn.to/2eoPKBW)
* [SkyBell HD](http://amzn.to/2dcexIB)
* [Rokus](http://amzn.to/2dpn89c) for all streaming
* [Samsung Smart TV](http://amzn.to/2efNNnq)
* ChromeCast Audios
* [Etekcity Outlets](http://amzn.to/2efNoBP)
* [Door Sensors (AEON Labs)](http://amzn.to/2e3xDxY)
* [Garadget](garadget.com) - Garage Door opener/sensor
* Nintendo Wii
* Emulated Hue pushes all Switch, Group and scene information to Alexa for First Class Control! [Broked!  Worked for literally long enough for me to clear out all my devices in Alexa. :( ]

**Automations:**
* Guest mode to disable certain interior automations. Trigger via Alexa & IFTTT.
* IFTTT Notifications for Offline Devices, BadLogins, HA Startups, new HA versions.
* (IFTTT) Logging entries in Logbooks for Rachio, Doorbell
* Auto Heal ZWave at 2:30am
* Using [Etekcity Outlets](http://amzn.to/2efNoBP) to control accent lighting above kitchen cabinets and room cutouts.
* Turn on TV Time Lights (dim and color) at Sunset (if home and TV is on)
* Turn on Upstairs light if Nest detects people and it's nighttime.
* Turn off lights when Nest detects we are away. (Upstairs and Downstairs)
* Turn on some lights when we get home
* Turn on some outdoor Lights at Sunset, Turn off 4 hours before sunrise.  Turn off interior lights when we go to sleep.
* Turn on lights during school days for a morning routine for the kids and wife. Has No School overide boolean in GUI.
* Detects when lights are turned on and adjusts them to correct brightness based on time of day.
* Leverage Alexa, IFTTT and Elekcity outlet to control Printer On/Off via Voice. Turns off automatically after 20 minutes.
* (IFTTT) Blink ALL lights at 9:30 to remind me to take medicine. (also Alexa Alert)
* (IFTTT) Blink Office lights 15 minutes before ANY meeting on my calendar (using IFTTT)
* (IFTTT) Stop watering grass via Rachio if winds are greater than 20 MPH. 
* (IFTTT) Blink ALL lights if Winds get to 70MPH - Hurricance warning.
* Halloween Special - Flash all front lights when motion is detected via SkyBell (IFTTT - Maker)

![Screenshot of Home View](https://i.imgur.com/Exz32fr.png)
![Screenshot of Lights](https://i.imgur.com/rPm5wgJ.png)
![Screenshot of Info](https://i.imgur.com/jKGpJVo.png)

#Todo List

* Configure the Alexa Component.
* Turn on Accent lights when TV is sensed on.
* Put Dash Buttons out there.
* Put Door Sensor in Mailbox
* Add Pi-Hole (Ad blocking) to the network with the Pi Zero. (Add to Home Assistant)
* Flash backyard lights when doorbell rings. 
* Bedside dash button for morning, night and bathroom trips. 
* Create various scenes (early morning, breakfast, work, entertaining, )
* Doorbell motion after dusk turns on light and changes it color.  Dims foyer light up as well. Maybe a sconce light too. 
* Motion after midnight and the sprinklers go on. 
* Using Input Booleans, list trashday and kid's chore day on Main Screen.
* Bathroom lights flash when door bell is pressed. 
* Vacation mode and mocupancy scenes to simulate being here. 
* Figure out a way to change the color of outdoor lights based on various minor holidays automagically.
* Time based automations - blink light notifications (location),  dash button options (https://github.com/dale3h/homeassistant-config/blob/master/examples/%40CCOSTAN/detect_state_change.yaml)

* This : http://groundp.in/2016/10/18/step-by-step-guide-to-setting-up-esp-easy-with-home-assistant/
* http://www.pibakery.org/
* http://www.esp8266.nu/index.php/ESPEasy
* https://translate.google.com/translate?hl=en&sl=de&tl=en&u=https%3A%2F%2Falexbloggt.com%2Funiversal-infrarot-websteuerung-ueber-esp8266%2F

https://community.home-assistant.io/t/voice-controlled-cheap-non-smart-led-strip-with-ok-google-command/5756
