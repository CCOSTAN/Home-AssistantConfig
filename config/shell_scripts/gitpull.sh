#!/bin/bash
cd /home/hass/docker_files
docker-compose exec home-assistant python -m homeassistant --config /config --script check_config

cd /home/hass/docker_files/homeassistant
git pull origin master

cd /home/hass/docker_files
docker-compose exec home-assistant python -m homeassistant --config /config --script check_config

cd ~
exit