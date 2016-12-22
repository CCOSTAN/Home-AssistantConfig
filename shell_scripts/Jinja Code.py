You can use this code to quickly create files from the template editor in HA.

#########################################################3
Create fast Customize for groups.yaml:

{% for state in states.group -%}
  {% if loop.first %}
{% elif loop.last %}
{% else %} 
{% endif %}
{{ state.entity_id }}:
  friendly_name: '{{ state.attributes.friendly_name if state.attributes.friendly_name is defined else state.name  }}'
  emulated_hue: {{state.attributes.emulated_hue if state.attributes.emulated_hue is defined else 'False' }}
{%- endfor -%}

#########################################################
Create fast Customize for lights.yaml

{% for state in states.light -%}
  {% if loop.first %}
{% elif loop.last %}
{% else %} 
{% endif %}
{{ state.entity_id }}:
  friendly_name: '{{ state.attributes.friendly_name if state.attributes.friendly_name is defined else state.name  }}'
  emulated_hue: {{state.attributes.emulated_hue if state.attributes.emulated_hue is defined else 'False' }}
{%- endfor -%}