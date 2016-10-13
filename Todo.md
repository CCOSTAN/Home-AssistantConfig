#Todo List

* AUTOMATE LAMP UPSTAIRS using Nest thermostat.  
* (Using IFTTT for now - Need to switch over to native HA)
* Put Dash Buttons out there.
* Put door sensor on garage door
 
binary_sensor:
  - platform: template
    sensors:
      upstairs_away_mode:
        entity_id: climate.upstairs
        value_template: "{{ is_state_attr('climate.upstairs', 'away_mode', 'on') }}"

automation:
  - alias: Trigger When Away
    trigger:
      - platform: state
        entity_id: binary_sensor.upstairs_away_mode
        to: 'on'
    condition:
      ...
    action:
      ...
     
 
 
###  Future Ideas

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
    brightness: 255`