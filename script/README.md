# [![Build Status](https://travis-ci.org/CCOSTAN/Home-AssistantConfig.svg?branch=master)](https://travis-ci.org/CCOSTAN/Home-AssistantConfig) Home-Assistant Config by [@ccostan](http://www.twitter.com/ccostan)
[Home Assistant](https://home-assistant.io/) configuration files (YAMLs)

Be sure to :star: my repo so you can keep up to date on the daily progress!

All of my Scripts are in this directory.  These scripts can be used over and over by different automations.  I try to modulize most of my scripts so that they can be passed variables from different automations and still keep all the settings normailized and centralized.

#Still have questions on my Config?
Follow me on twitter : [@CCostan](https://twitter.com/ccostan)

You can also vist my [Blog](http://www.vmwareinfo.com/search/label/iot) for all of my [Home Automation Posts](http://www.vmwareinfo.com/search/label/iot).

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/3MkgeKFUVKPNW45Vtwu9Abd4/CCOSTAN/Home-AssistantConfig'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/3MkgeKFUVKPNW45Vtwu9Abd4/CCOSTAN/Home-AssistantConfig.svg' />
</a>

Original mapping work by @beed2112
Modified by [@CCOSTAN](https://twitter.com/ccostan)
Repo : https://github.com/beed2112/condo
This is a map of the script references from my repo.
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/amp_settings.yaml 
  
 amp_settings 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/System/door_chime.yaml:    - service: script.amp_settings 
  
  
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/dog_bark.yaml 
  
 dog_bark 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/customize/scripts.yaml:script.dog_bark:
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/dog_bark.yaml:    # service: script.dog_bark
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/front_house_motion.yaml:    - service: script.dog_bark
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/guard_dog.yaml:    - service: script.dog_bark 
  
  
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/emergency.yaml 
  
 emergency 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/emergency.yaml:#   - service: script.emergency
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/nest_protects.yaml:      - service: script.emergency
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/High_Wind_Speed_Check.yaml:    - service: script.emergency 
  
  
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/flash_notify.yaml 
  
 flash_notify 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/customize/scripts.yaml:script.flash_notify:
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/skybell_pressed.yaml:    - service: script.flash_notify
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/flash_notify.yaml:#   - service: script.flash_notify
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/ifttt_calendar.yaml:    - service: script.flash_notify 
  
  
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/front_house_motion.yaml 
  
 front_house_motion 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/customize/scripts.yaml:script.front_house_motion:
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/front_house_motion.yaml:#   - service: script.front_house_motion
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/skybellhd.yaml:      - service: script.front_house_motion 
  
  
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/interior_off.yaml 
  
 interior_off 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/customize/scripts.yaml:script.interior_off:
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/interior_off.yaml:#   - service: script.interior_off
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/away.yaml:    - service: script.interior_off
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/good_night.yaml:    - service: script.interior_off
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Timed_Triggers/sunrise_turn_off.yaml:    - service: script.interior_off 
  
  
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/monthly_color_scene.yaml 
  
 monthly_color_scene 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/customize/scripts.yaml:script.monthly_color_scene:
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/front_house_motion.yaml:    - service: script.monthly_color_scene
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/monthly_color_scene.yaml:#   - service: script.monthly_color_scene
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/late_night_outside_helper.yaml:    - service: script.monthly_color_scene
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Timed_Triggers/sunset_turn_on.yaml:    - service: script.monthly_color_scene 
  
  
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/notify_engine.yaml 
  
 notify_engine 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/customize/scripts.yaml:script.notify_engine:
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/notify_engine.yaml:    # service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/hasspodcast.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/epson_printer.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/network.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/nest_protects.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/nest_protects.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/battery_levels.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/processmonitor.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/processmonitor.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/processmonitor.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/space.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/space.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/fitbit.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/alarm.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/juicenet.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/juicenet.yaml:      - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/garadget.yaml:    - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/garadget.yaml:    - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/garadget_Wind_Speed_Check.yaml:    - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/door_opened.yaml:    - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/High_Wind_Speed_Check.yaml:    - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/medicine_logger.yaml:    - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/System/update_notification.yaml:    - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/System/bad_logins.yaml:    - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/System/ip_change.yaml:    - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/System/Wink_update_notification.yaml:    - service: script.notify_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Timed_Triggers/startup_notification.yaml:    - service: script.notify_engine 
  
  
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/skybell_pressed.yaml 
  
 skybell_pressed 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/customize/scripts.yaml:script.skybell_pressed:
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/skybell_pressed.yaml:#   - service: script.skybell_pressed
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/skybellhd.yaml:      - service: script.skybell_pressed 
  
  
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/speech_engine.yaml 
  
 speech_engine 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/customize/scripts.yaml:script.speech_engine:
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/speech_engine.yaml:    # service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/speech_processing.yaml:    # service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/skybell_pressed.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/front_house_motion.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/triggers/sleepy_dog.yaml:      - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/network.yaml:      - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/nest_protects.yaml:      - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/alarm.yaml:      - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/juicenet.yaml:      - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/garadget.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/new_device.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/garadget_Wind_Speed_Check.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/garage_closed.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/responsibilities.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/announcements.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/garage_opened.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/door_opened.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/High_Wind_Speed_Check.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/nest.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/home_stats.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/good_night.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/dark_rainy_day.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Timed_Triggers/sunset_turn_on.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Timed_Triggers/sunset_turn_on.yaml:    - service: script.speech_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Timed_Triggers/2200.yaml:    - service: script.speech_engine 
  
  
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/speech_processing.yaml 
  
 speech_processing 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/customize/scripts.yaml:script.speech_processing:
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/speech_engine.yaml:    - service: script.speech_processing 
  
  
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/switch_turn_off_all.yaml 
  
 switch_turn_off_all 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/customize/scripts.yaml:script.switch_turn_off_all:
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/interior_off.yaml:    - service: script.switch_turn_off_all
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/switch_turn_off_all.yaml:#   - service: script.switch_turn_off_all 
  
  
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/script/tweet.yaml 
  
 tweet_engine 
  https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/logger.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/hasspodcast.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/epson_printer.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/skybellhd.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/neato.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/pihole.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/pihole.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/nest_protects.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/nest_protects.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/processmonitor.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/space.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/space.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/space.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/fitbit.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/twitter.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/twitter.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/twitter.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/holiday.yaml:      - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/new_device.yaml:    - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/garadget_Wind_Speed_Check.yaml:    - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Speech/High_Wind_Speed_Check.yaml:    - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/ifttt_logger.yaml:    - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/System/update_notification.yaml:    - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/System/Self_heal.yaml:    - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/System/bad_logins.yaml:    - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/System/ip_change.yaml:    - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/System/rachio_rain_delay.yaml:    - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/System/Wink_update_notification.yaml:    - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Timed_Triggers/sunrise_turn_off.yaml:    - service: script.tweet_engine
 https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/automation/Timed_Triggers/sunset_turn_on.yaml:    - service: script.tweet_engine 
  
  
