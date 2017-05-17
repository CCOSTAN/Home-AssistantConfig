You can use this code to quickly create files from the template editor in HA.  I use it mainly for `emulated_hue` and to quickly add in new Customize options to all things HA!

For the sandbox.
{% set trigger = {'entity_id':'sensor.downstairs_thermostat_hvac_state','to_state':'cooling'} %}

#########################################################
Create fast Customize for groups, sensors, covers etc...  Just change that first line below 'sensor' to 'group', 'covers' etc..

{% for state in states.sensor -%}
  {% if loop.first %}
{% elif loop.last %}
{% else %}
{% endif %}
{{- state.entity_id }}:
  friendly_name: '{{ state.attributes.friendly_name|replace("_"," ",)|title() if state.attributes.friendly_name is defined else state.name|replace("_"," ",)|title() }}'
  emulated_hue: {{state.attributes.emulated_hue if state.attributes.emulated_hue is defined else 'False' }}
  hidden: {{state.attributes.hidden if state.attributes.hidden is defined else "False"}}
  homebridge_hidden: {{state.attributes.homebridge_hidden if state.attributes.homebridge_hidden is defined else "true"}}
  {{'icon: '+ state.attributes.icon if state.attributes.icon is defined}}
  {{'homebridge_cover_type: '+ state.attributes.homebridge_cover_type if state.attributes.homebridge_cover_type is defined}}
  {{'assumed_state: '+ state.attributes.assumed_state if state.attributes.assumed_state is defined}}
{% endfor -%}

#########################################################
#This code lists out EVERY possible entity and attribute for that entity.
# source: https://github.com/skalavala/smarthome/blob/master/Entities.md
#########################################################

{{ "_".ljust(90, "_") }}
{%- set domains = [states.light, states.switch, states.automation, states.device_tracker, states.group, states.media_player, states.proximity, states.script, states.zone, states.zwave, states.sensor, states.calendar ] %}
{{ "Entity ID".ljust(50) }}{{ "Entity Name" }}
{%- for domain in domains -%}
{% for item in domain %}
{{ "_".ljust(90, "_") }}
{{ item.entity_id.ljust(50) }}{{ item.name }}
{% for attrib in item.attributes %}
{%- if attrib is defined %}
  {{attrib.ljust(50)}}: {{ item.attributes[attrib] }}
{%- endif %}
{%- endfor %}
{%- endfor %}
{%- endfor %}

#########################################################
