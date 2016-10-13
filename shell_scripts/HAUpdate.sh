#!/bin/bash

cd /home/hass/.homeassistant
source /srv/hass/hass_venv/bin/activate

echo "Processing update"
pip3 install --upgrade homeassistant

hass --script check_config
exit
