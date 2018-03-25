#!/bin/bash
cd /home/hass/docker_files
docker-compose exec home-assistant python -m homeassistant --config /config --script check_config

cd /home/hass/docker_files/homeassistant

git add .
git status
echo -n "Enter the Description for the Change: [Minor Edit] "
read CHANGE_MSG
CHANGE_MSG=${CHANGE_MSG:-Minor Edit}
git commit -m "${CHANGE_MSG}"
git push origin master

cd ~
exit
