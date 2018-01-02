##  These scripts are run from /home/pi 

#!/bin/bash

echo "Setting up Environment"
cd /home/hass/.homeassistant
source /srv/hass/hass_venv/bin/activate

echo "Processing update"
pip3 install --upgrade git+git://github.com/balloob/home-assistant.git@dev

echo "Code Check"
hass --script check_config
exit
