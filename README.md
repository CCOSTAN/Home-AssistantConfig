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
* [iTeadStudio goodies](https://twitter.com/ccostan/status/793119824008384512) - SonOff and SonOn with a Slampher!

**Automations:**
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
* Turn on some outdoor Lights at Sunset, Turn off 4 hours before sunrise.  Turn off interior lights when we go to sleep.
* Turn on lights during school days for a morning routine for the kids and wife. Has No School overide boolean in GUI.
* Detects when lights are turned on and adjusts them to correct brightness based on time of day.
* Leverage Alexa, IFTTT and Elekcity outlet to control Printer On/Off via Voice. Turns off automatically after 20 minutes.
* (IFTTT) Blink ALL lights at 9:30 to remind me to take medicine. (also Alexa Alert)
* (IFTTT) Blink Office lights 15 minutes before ANY meeting on my calendar (using IFTTT)
* (IFTTT) Stop watering grass via Rachio if winds are greater than 20 MPH. 
* (IFTTT) Blink ALL lights if Winds get to 70MPH - Hurricance warning.
* Sets up the front lights in the house with preset colors depending on the month.
* On motion from Doorbell (IFTTT) Turn front lights to Bright White lights for 10 minutes and then back to original colors.

**Time Based Automation TimeLine**
```
ALL DAY LONG: 
Check to see if we are away.

SUNRISE minus 3.5 hours
     Turn off ALL SWITCHES
     Turn off ALL LIGHTS
05:00 AM ** Light Brightness helper 50 Brightness ** 
06:00 AM (Mon - Fri) : Turn on Dining Room lights, Kitchen Accents
06:51 AM Turn on Dinette lights, Turn off Dining Room Lights and Kitchen Accents
07:51 AM Turn on Kitchen Lights
08:00 AM ** Light Brightness helper FULL 255 Brightness ** 
08:31 AM Turn off ALL interior lights.

SUNSET: 
     Turn on Den Outlet, Living Room Outlet, Dining Room Outlet, Outdoor Bathroom light
     Activate Monthly Front Lighting Scene
     Check if Garage Door is open (Every 60 minutes)
     ** Kitchen Light/Accent Helper Activated **

08:00 PM ** Late Night Helper is active **
08:00 PM ** Light Brightness helper 35 Brightness ** 
08:00 PM TV time Scene triggered if the TV is on. 
02:00 AM ** Late Night Help Deactivated **
02:31 AM Heal ZWave Network
```

![Screenshot of Home View](https://i.imgur.com/2mFr9HP.png)
![Screenshot of Garage Door View](https://i.imgur.com/GhMf2Lo.png)
![Screenshot of Lights](https://i.imgur.com/joYkz0D.png)
![Screenshot of Info](https://i.imgur.com/vABefL9.png)

#Todo List

* Create IMAGE clone of the SD Card for Backup purposes. [This](https://community.home-assistant.io/t/no-more-reinstalling-your-ha-from-scratch-how-to/7630)
* AutoIt script to control lights via REST and also auto light office when I am working on Laptop.
* Configure the Alexa Component.
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

* https://github.com/thundergreen/home-assistant/wiki/Add-OZWCP-in-HASS

https://community.home-assistant.io/t/voice-controlled-cheap-non-smart-led-strip-with-ok-google-command/5756

https://community.home-assistant.io/t/snmp-bandwidth-monitor/7122

https://i.imgur.com/xy10yI1.png

resource for my RF switches. (MQTT) bit.ly/2gBiOqz 

https://www.reddit.com/r/amazonecho/comments/5he8o7/diy_ir_blaster_10_instructions_inside/?st=IWIDBGRT&sh=dd117f28


#Lab notes:

```yaml

For the led strips.

https://home-assistant.io/components/light.flux_led/
 - platform: flux_led
   devices:
     192.168.1.22:
       name: Cabinet Lights

- alias: 'Get Random Time'
     trigger:
     platform: time
     after: '21:00:00'
   action:
     - service: input_slider.select_value
       data_template:
         entity_id: input_slider.hour
         value: '{{ (range(22, 23) | random) }}'
     - service: input_slider.select_value
       data_template:
         entity_id: input_slider.random_minute
         value: '{{ (range(30, 45) | random) }}'

Then simply use that in your light turn off automation:

 - alias: 'Turn lights off'
   trigger:
     platform: template
     value_template: '{{ now.hour == (states.input_slider.random_hour.state | int) and now.minute == (states.input_slider.random_minute.state | int) }}'
   action:
     - service: light.turn_off
       data: 
         entity_id: light.hue_color_lamp_1
 
    
   
 - platform: template
    sensors:
      front_door_clean:
        value_template: '{% if is_state("binary_sensor.front_door", "on") %}Open{% else %}Closed{% endif %}'
        friendly_name: 'Front Door'
        entity_id: binary_sensor.front_door  
  
  # Template Binary Sensors
platform: template
sensors:
  flood_sensor:
    value_template: >-
      {% if states.sensor.everspring_st812_flood_detector_flood_2_5.state == '255' %}
        'on'
      {% elif states.sensor.everspring_st812_flood_detector_flood_2_5.state == '0' %}
        'off'
      {% else %}
        n/a
      {% endif %}

      
Using Slider_Booleans to store data and restore it after.

https://community.home-assistant.io/t/brighten-front-porch-lights-then-return-to-recorded-dim-level/6641

input_slider:
  porch_brightness:
    name: Front Porch Brightness
    initial: 25
    min: 0
    max: 255
    step: 1

script: 
  record_front_porch:
    alias: Record front porch status to slider
    sequence:
      - service: input_slider.select_value
        data_template:
          entity_id: input_slider.porch_brightness
          value: '{% if states.light.front_porch_light_level_32_0.state == "off" %}0{% else %}{{states.light.front_porch_light_level_32_0.attributes.brightness}}{% endif %}'

  return_front_porch:
    alias: Return front porch to recorded value
    sequence:
      - service: light.turn_on
        entity_id: light.front_porch_light_level_32_0
        data_template:
          brightness: '{{states.input_slider.porch_brightness.state | int}}'
      - service: input_boolean.turn_off
        entity_id: input_boolean.front_porch_motion_light_active

  return_front_porch_delayed:
    alias: Wait 5 min and then return front porch to recorded value
    sequence: 
      - delay: 
          minutes: 5
      - service: script.return_front_porch

automation:
    - alias: Motion ON front porch
      trigger:
        # if motion is ON - this is triggered via IFTTT and Arlo
        - platform: state
          entity_id: input_boolean.motion_front_porch
          to: 'on'
          from: 'off'
      action:
        # some notifications
        - service: notify.scott_notifier
          data: 
            message: "Motion front porch"
            title: "Front Porch"
            data:
              priority: 0
        - service: notify.kodi
          data: 
            message: "Motion front porch"
            title: "Front Porch"
        # only at night
        - condition: state
          entity_id: sun.sun
          state: 'below_horizon'
        #remember the state of front porch
        - service: script.record_front_porch
        # turn the light on
        - service: light.turn_on
          entity_id: light.front_porch_light_level_32_0
          data:
            brightness: 255
        # script with a delay that'll reset light in 5 min
        - service: script.return_front_porch_delayed

        
Easy Garbage Automation
  - alias: brown garbage
    trigger:
      platform: time
      hours: 20
      minutes: 00
      seconds: 0
    condition:
      condition: time
# At least one of the following is required.
      weekday:
        - mon
        - thu
    action:
      service: notify.thorsten
      data:
        message: 'Put the brown garbage out!'
  - alias: blue garbage
    trigger:
      platform: time
      hours: 20
      minutes: 00
      seconds: 0
    condition:
      condition: time
# At least one of the following is required.
      weekday:
        - tue
    action:
      service: notify.thorsten
      data:
        message: 'Put the blue garbage out!'
        
        
        
{%- if now().month in [01, 11, 12] -%} Yes {%- else -%} NO {%- endif %}


binary_sensor:
  platform: command_line
  name: Daughter Laptop
  command: ping -W 1 -c 1 192.168.0.101 > /dev/null 2>&1 && echo success || echo fail
  sensor_class: connectivity
  payload_on: "success"
  payload_off: "fail"

```