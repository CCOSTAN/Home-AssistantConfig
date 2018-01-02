#!/bin/sh

# this script uses hard-coded paths 
# This deletes the readme file and begins rebuilding it.. 

cat /home/hass/.homeassistant/script/header.md > /home/hass/.homeassistant/script/README.md

grep -e '^[a-z]' /home/hass/.homeassistant/script/*.yaml | tr : '\n' > /tmp/scriptnames.txt

sed -i '/^$/d' /tmp/scriptnames.txt


for item in `cat /tmp/scriptnames.txt`
do

  res=`grep -R script.$item /home/hass/.homeassistant/. --include=*.yaml`
  echo "\n $item \n" | sed 's|/home/hass/\.homeassistant/| https://github\.com/CCOSTAN/Home-AssistantConfig/blob/master/|g'>> /home/hass/.homeassistant/script/README.md
  echo "\n $res \n" | sed 's|/home/hass/\.homeassistant/\.| https://github\.com/CCOSTAN/Home-AssistantConfig/blob/master|g' >> /home/hass/.homeassistant/script/README.md

sed -i '/^$/d' /home/hass/.homeassistant/script/README.md 
  
done
cat /home/hass/.homeassistant/script/README.md
