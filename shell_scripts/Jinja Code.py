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
  {{'icon: '+ state.attributes.icon if state.attributes.icon is defined}}
  {{'homebridge_cover_type: '+ state.attributes.homebridge_cover_type if state.attributes.homebridge_cover_type is defined}}
  {{'assumed_state: '+ state.attributes.assumed_state if state.attributes.assumed_state is defined}}
{% endfor -%}

#########################################################
