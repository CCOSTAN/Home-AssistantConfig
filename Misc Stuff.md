
https://i.imgur.com/xy10yI1.png

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
 
 
- automation:
  alias: Random GLeft
  initial_state: False
  hide_entity: False
trigger:
  platform: time
  seconds: '/5'
action:
  service: homeassistant.turn_on
  entity_id:
    - light.gright
  data:
    effect: random
    transition: 1
    brightness: 255
    
   
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
