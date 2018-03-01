# [![Build Status](https://travis-ci.org/CCOSTAN/Home-AssistantConfig.svg?branch=master)](https://travis-ci.org/CCOSTAN/Home-AssistantConfig) Home-Assistant Config by [@ccostan](http://www.twitter.com/ccostan)
[Home Assistant](https://home-assistant.io/) configuration files (YAMLs)

Be sure to :star: my repo so you can keep up to date on the daily progress!

This directory is primarily used for automations that are triggered via time.  Daily, monthly, seasonally or on the hour.

**Time Based Automation TimeLine**

ALL DAY LONG:
Checks to see if we are away.
Cuckoo Clock goes off each hour and on the half.

SUNRISE minus 1 hour
     Turn off ALL SWITCHES
     Turn off ALL LIGHTS
05:00 AM ** Light Brightness helper 50 Brightness **
06:00 AM ( on school days) : Turn on Dining Room lights, Kitchen Accents and start Kid's bedroom [Hue Go](http://amzn.to/2iB36Ii) wake up lights.
06:51 AM Turn on Dinette lights, Turn off Dining Room Lights and Kitchen Accents
07:51 AM Turn on Kitchen Lights
08:00 AM ** Light Brightness helper FULL 255 Brightness **
08:31 AM (on school days) Turn off ALL interior lights.
09:00 AM Speech Notifications are enabled for the house.

SUNSET:
     Turn on Den Outlet, Living Room Outlet, Dining Room Outlet, Outdoor Bathroom light, TV lights
     Activate Monthly Front Lighting Scene
     Check if Garage Door is open (Every 60 minutes)
     ** Kitchen Light/Accent Helper Activated **

08:00 PM ** Late Night Helper is active **
08:00 PM ** Light Brightness helper 35 Brightness **
08:00 PM TV time Scene triggered if the TV is on.
09:00 PM Turn on [Hue Go](http://amzn.to/2iB36Ii) lights for the kid's rooms and start fading down.
10:00 PM Speech Notifications are disabled for the house. (except under ALERT mode) and AMP is shut.
02:00 AM ** Late Night Help Deactivated **
02:31 AM Heal ZWave Network

#Still have questions on my Config?
Follow me on twitter : [@CCostan](https://twitter.com/ccostan)
Follow the Smart Home on twitter : [@BearStoneHA](https://twitter.com/BearStoneHA)

You can also vist my [Blog](http://www.vmwareinfo.com/search/label/iot) for all of my [Home Automation Posts](http://www.vmwareinfo.com/search/label/iot).
