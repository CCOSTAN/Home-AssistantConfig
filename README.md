 [![Build Status](https://travis-ci.org/CCOSTAN/Home-AssistantConfig.svg?branch=master)](https://travis-ci.org/CCOSTAN/Home-AssistantConfig) Home-Assistant Config by [@ccostan](http://www.twitter.com/ccostan)

Be sure to :star: my repo so you can keep up to date on the daily progress!</br>
You can also vist my [Blog](http://www.vmwareinfo.com/search/label/iot) for all of my [Home Automation Posts](http://www.vmwareinfo.com/search/label/iot).</br>
You can follow my home's breaking news and tweet statistics via twitter [@BearStoneHA](https://twitter.com/bearstoneha) or [Facebook/BearStoneHA](https://www.facebook.com/BearStoneHA)</br>

![Screenshot of Home Assistant Header](https://i.imgur.com/vjDH1LJ.png)

As of 2018, I have migrated everything to a Docker based platform.  You can read all about it here:
[Migration Blog Post](http://www.vmwareinfo.com/2018/02/journey-to-docker.html)
<hr>

**Notable Software on my Laptop Host:**
* [Docker](https://Docker.com) - Docker runs on a Ubuntu Server Core base. [Docker-Compose.yaml](https://github.com/CCOSTAN/Docker_Support)
* [Home Assistant Container](https://home-assistant.io/) - It all starts here.
* The amazing [Floorplan](https://github.com/pkozul/ha-floorplan) project to help visualize my smarthome.
* SSL via [SSLS](https://SSLS.com) - 5 Bucks A Year! - Keeps me safe!
* [Dasher Container](https://github.com/maddox/dasher) to leverage those cheap [Amazon Dash Buttons](http://amzn.to/2dPKZhM)
* [HomeBridge Container](https://github.com/nfarina/homebridge) for full HA <-> Homekit compatibility.
* Unifi controller Container to manage [APs](http://amzn.to/2mBSfE9)

![Screenshot of SmartHome](https://lh3.googleusercontent.com/-vKGF5gdz_VY/WVpP7qjsmjI/AAAAAAADVZ4/sGyiS1PjouUQxrEbWVfot6raxcElv4r-wCHMYCw/s1600/clip_image001%255B4%255D)

**Devices I have in no particular order:**
<p align="center">
<table align="center" border=0>
<tr><td colspan="3">

**Battery Backups** - [Blog write-up](http://www.vmwareinfo.com/2017/06/home-protection-from-power-outages-sort.html)
</td></tr>
<tr><td align="center">

[3 Prong UPS](http://amzn.to/2HJerU8)
</td><td align="center">

[2 Prong UPS](http://amzn.to/2CijVG3)
</td><td align="center">

[Tesla Powerwall 2](http://www.vmwareinfo.com/2018/01/going-green-to-save-some-green-in-2018.html)</td></tr>
<tr><td align="center"><a href="https://www.amazon.com/APC-Back-UPS-Battery-Protector-BE425M/dp/B01HDC236Q/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1519445552&sr=1-2&keywords=apc+450&linkCode=li2&tag=vmw0a-20&linkId=efbdf7bdfad7bd607e099d34bd1f2688" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01HDC236Q&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B01HDC236Q" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/gp/product/B00KH07WRC/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li2&tag=vmw0a-20&linkId=52a63711f582d1ff83f4687137a6154b" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00KH07WRC&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B00KH07WRC" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="http://www.vmwareinfo.com/2018/01/going-green-to-save-some-green-in-2018.html" target="_blank"><img border="0" src="https://lh3.googleusercontent.com/-V8NMHkiKFIY/Wkgpf7T-WDI/AAAAAAADihs/fp5yNzjrQ5sKgFkafXhllLYsD7yM3tGBgCHMYCw/image_thumb5?imgmax=200" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B01HDC236Q" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="3">
There aren't really automations for the Batteries yet.  Electricity is the life blood for the house and only really the Tesla Battery has smarts so maybe in the future, you'll see a Powerwall automation in this space.</td></tr>

<tr><td colspan="3">

**Networking**
</td></tr>
<tr><td align="center">

[Ubiquiti Networks Unifi 802.11ac Pro](http://amzn.to/2mBSfE9)
</td><td align="center">

[Ubiquiti Networks Unifi 802.11ac Lite](http://amzn.to/2mBSfE9)
</td><td align="center">

[Circle by Disney](http://amzn.to/2eAgaA6)</td></tr>
<tr><td align="center"><a href="https://www.amazon.com/Ubiquiti-Networks-802-11ac-Dual-Radio-UAP-AC-PRO-US/dp/B015PRO512/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1519453280&sr=1-1&keywords=unifi+ac+pro&linkCode=li1&tag=vmw0a-20&linkId=a51eb66ad64455d857f9b50cd7ffb796" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B015PRO512&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B015PRO512" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Ubiquiti-Unifi-Ap-AC-Lite-UAPACLITEUS/dp/B015PR20GY/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1519453311&sr=1-1&keywords=unifi+ac+lite&linkCode=li1&tag=vmw0a-20&linkId=9e888012791a02c582fe8f42bb9b7246" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B015PR20GY&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B015PR20GY" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Circle-Disney-Parental-Controls-Connected/dp/B019RC1EI8/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1519453110&sr=1-1-spons&keywords=circle+disney&psc=1&linkCode=li2&tag=vmw0a-20&linkId=8bfecf20fdfee716f0e0c43a2f4becbd" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B019RC1EI8&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B019RC1EI8" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="3">
Using the APs (3 of them), The house monitors all Connected devices for Online/Offline status and uses NMAP for presence detection.  Any critical device down for more than 5 minutes and an alert is sent out. Circle is a Parental Control device.  When a new device is discovered on the network, HA notifies us and also plays a TTS reminder over the speakers to classify in Circle.</td></tr>

<tr><td colspan="4">

**Alexa Echo Devices** - [Blog Post](http://www.vmwareinfo.com/2017/09/new-alexa-goodies-announced.html)
</td></tr>
<tr><td align="center">

[Amazon Echo](http://amzn.to/2dSVbK4)
</td><td align="center">

[Amazon Echo DOT](http://amzn.to/2e3vHFQ)
</td><td align="center">

[Amazon Echo Tap](http://amzn.to/2sz891k)
</td><td align="center">

[Amazon Dash Wand](https://www.amazon.com/Amazon-Dash-Wand-With-Alexa/dp/B01MQMJFDK/ref=sr_1_1_a_it?ie=UTF8&qid=1498928735&sr=8-1&keywords=dash+wand)
</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/dp/B06XCM9LJ4/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=75fd6d904f7f8f9fadc5df5f58885070" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B06XCM9LJ4&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B06XCM9LJ4" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/dp/B01DFKC2SO/ref=as_li_ss_il?pf_rd_m=ATVPDKIKX0DER&pf_rd_p=3513574162&pd_rd_wg=GV26W&pf_rd_r=BF6FZAN507DHV9T9NH7N&pf_rd_s=desktop-rhs-carousels&pf_rd_t=301&pd_rd_i=B01DFKC2SO&pd_rd_w=B5QwO&pf_rd_i=echo+wand&pd_rd_r=43a86d85-1a06-44dc-8687-19f8ecdcb3f0&ie=UTF8&qid=1519494311&sr=1&linkCode=li1&tag=vmw0a-20&linkId=63be4bb6452239422fb0434d837aebb0" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01DFKC2SO&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01DFKC2SO" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Amazon-Tap-Portable-Wireless-Bluetooth-Speaker-with-WiFi-Alexa/dp/B01BH83OOM/ref=as_li_ss_il?s=amazon-devices&ie=UTF8&qid=1519494386&sr=1-1&keywords=tap&linkCode=li1&tag=vmw0a-20&linkId=aa78f9e75ac6ba9569323d5ab0f890b0" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01BH83OOM&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01BH83OOM" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Amazon-Dash-Wand-With-Alexa/dp/B01MQMJFDK/ref=sr_1_1_a_it?ie=UTF8&qid=1498928735&sr=8-1&keywords=dash+wand" target="_blank"><img border="0" src="https://images-na.ssl-images-amazon.com/images/I/41YvRl%2B4zXL.jpg" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B019RC1EI8" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>

<tr><td colspan="4">

The Alexa devices in my house are for automation overrides.  They are primarily an input device into Home Assistant.  Using HA `Cloud` component, I am able to turn on /off most HA devices even if they don't have native Alexa support.  The DOTs are littered around the house, the Tap is for Shower and Garage since it is super portable and the main echo fills the upstairs with Music.  Voice input and playing [Whole House Music](http://www.vmwareinfo.com/2017/08/multi-room-audio-for-echo-its-finally.html) are where Echoes excel!  The Wand is pool side for quick commands and controlling the music if need be.</br>
Handy automations include:
* Ability to ask Alexa to repeat the last Voice notification - 'Alexa, Turn on Last message'.
* Guest mode to disable certain interior automations. Trigger via Alexa. 'Alexa, Turn on Guest Mode.'
* Track garbage days and chore days for the kids. Voice reminders and Alexa intergration/request for info.
* Context aware lighting control. - Read about it here: [Blog Post](http://www.vmwareinfo.com/2017/10/speak-naturally-to-your-alexa-context.html)
</td></tr>

<tr><td colspan="3">

**Mobile Devices and Tablets** - [FloorPlan Blog post](http://www.vmwareinfo.com/2017/07/visualizing-smart-home-using-home.html)
</td></tr>
<tr><td align="center">

[iPads](http://amzn.to/2l2qyRb)
</td><td align="center">

[iPhones](http://amzn.to/2l9Yoq9)
</td><td align="center">

[Amazon Fire Tablets Gen 7](http://amzn.to/2tqlMCW)</td></tr>
<tr><td align="center"><a href="https://www.amazon.com/Apple-MH182LL-9-7-Inch-Retina-Display/dp/B00OTWPEBK/ref=as_li_ss_il?s=pc&rps=1&ie=UTF8&qid=1487044765&sr=1-3&keywords=ipad&refinements=p_89:Apple,p_85:2470955011,p_n_condition-type:2224371011&linkCode=li1&tag=vmw0a-20&linkId=d4e62510b64106355f3788ea04bff8a0" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00OTWPEBK&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00OTWPEBK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Apple-iPhone-Plus-Unlocked-16GB/dp/B00YD54J8W/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1519496432&sr=1-2&keywords=iphone+6s+plus&linkCode=li1&tag=vmw0a-20&linkId=a6a638b1381a5f06fbdfa68803b85bc0" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00YD54J8W&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00YD54J8W" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/gp/product/B01GEW27DA/ref=as_li_ss_il?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-3&pf_rd_r=KD86VCJHSV0EMS5CE9X0&pf_rd_t=101&pf_rd_p=fd2d9d15-ec29-430a-9a27-8452e7595935&pf_rd_i=6669703011&linkCode=li1&tag=vmw0a-20&linkId=d8f65714966098710f7f53ac7d14e2d7" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01GEW27DA&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01GEW27DA" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="3">
Mobile devices are a critical part of my Home Automation.  They establish presence in the house and are the basis for many automations.  Home? Turn on the lights.  Leave? Turn them all off kind of thing.  The Tablets are for the awesome FloorPlan that you see in the images.  We have 2 in the house mounted for quick consumption of all the HA data in a glance.</br>
Handy Automations:
* IFTTT and IOS Notifications for Offline Devices, BadLogins, HA Startups, new HA versions and [External IP changes](https://community.home-assistant.io/t/detect-if-ip-changes/6830) for DNS.
* Turn on certain lights and switches when we get home.  Turn off most interior lights when we leave the house.
We also leverage the Fire Tablets as TTS endpoints.  During certain times of the day, TTS is only played on the tablets rather than over the whole house.  Other times, Notifications are sent only to the Mobile Devices rather than using speech.
</td></tr>

</table>
</p>



**Devices I have:**
* [Nest Thermostats](http://amzn.to/2eAhB1k) - Smart Thermostat - [Blog Post](http://www.vmwareinfo.com/2018/02/smart-home-basics-thermostats.html)
* [Nest Protects](http://amzn.to/2poqKhu) - Smart Smoke Detectors - [Blog Post](http://www.vmwareinfo.com/2017/06/psa-check-out-your-smoke-detectors-once.html)
* [Amazon Dash Buttons](http://amzn.to/2dPKZhM)
* [Amazon Fire TV](http://amzn.to/2iiuaNT)
* - Used for [Wall Mounted Controllers](http://www.vmwareinfo.com/2017/07/visualizing-smart-home-using-home.html)
* [Wink Hub](http://amzn.to/2orGEWo) - Used to connect certain Zwave outlets etc.
* [Phillips Hue Hub Gen 2](http://amzn.to/2eoQTJy)
* Mixture of [Hue Colored lights](http://amzn.to/2l2viGK), [White Lights](http://amzn.to/2lEf4Xq) and GE Link bulbs.
* [Hue Go](http://amzn.to/2iB36Ii) - Great lights for the kids since they have an actual button on them for control.
* [Rachio Sprinkler system](http://amzn.to/2eoPKBW) - Smart Sprinkler controller
* [GE ZWave Outdoor Power Module](http://amzn.to/2q17R4S) - These control my Landscape lighting and connect up to my Wink.
* [Withings](http://amzn.to/2kr78nW) - Smart Weight scale
* [SkyBell HD](http://amzn.to/2dcexIB)
* [Rokus](http://amzn.to/2dpn89c) for all streaming
* [Samsung Smart TV](http://amzn.to/2efNNnq)
* [ChromeCast Audios](http://amzn.to/2lE9gNu)
* [AMPs](http://amzn.to/2j18dlT) - These are cheap but effective for the Dots, Chromecasts or other speakers.
* [Mixer](http://amzn.to/2v9Zp3x) - This allows me to mix in DOT, music and HA. [Blog Post](http://www.vmwareinfo.com/2017/07/giving-voice-to-smart-home.html)
* [Etekcity Outlets](http://amzn.to/2efNoBP) - Cheap 6 Buck RF outlet control!
* [RM Pro by Broadlink](http://amzn.to/2z6IZtH) - Cheap control over the above Outlets - Plus Infared Controls.
* [Door Sensors (AEON Labs)](http://amzn.to/2e3xDxY)
* [Garadget](http://amzn.to/2jQLpVQ) - Garage Door opener/sensor - "[Siri, are my garage doors closed?](https://pbs.twimg.com/media/C3cyJZSWAAAalPm.jpg:large)"
* [Nintendo Wii](http://amzn.to/2l2qIYY)
* Home Assistant Cloud Component pushes all Switch, Group, input_boolean, script and scene information to Alexa for First Class Control!
* [iTeadStudio](https://www.itead.cc/) [goodies](https://twitter.com/ccostan/status/793119824008384512) - [SonOff](http://amzn.to/2l2sx8g) and a [Slampher](http://amzn.to/2l2gmIx)!
* [LED RGB Wifi Controller - flux_led compatible](http://amzn.to/2jUBSBE) with [LED Strip kits](http://amzn.to/2gJYfZ5) - ~100 Feet. These are great [Power supplies](http://amzn.to/2mnmbk8) - [Outdoor Housing](http://amzn.to/2m2dG0X) - Finished Product [#71](https://github.com/CCOSTAN/Home-AssistantConfig/issues/71) - [Blog Post](http://www.vmwareinfo.com/2017/08/diy-outdoor-smart-home-led-strips.html)
* [Phyn Smart Water Main ShutOff/Leak Detector] (http://www.phyn.com/) - Beta test to monitor Water usage and Leaks centrally.
* [Aeon Labs AEDSB09104ZWUS Aeotec Z-Wave Smart Energy Monitor Meter](http://amzn.to/2l5wEDo) to measure energy usage in the home.
* [SleepNumber Bed i8](http://amzn.to/2kxdXXI) - Has SleepIQ to track occupancy and sleep habits.  Tied into HA.
* [MX8 Zodiac Pool Robot](http://amzn.to/2nAGvPf) - Not YET hooked up HA, but working on it.
* [Pi Zero](http://amzn.to/2ougZQ3) with [Wireless Nub](http://amzn.to/2q38rg4) running Pi-Hole and smacking down internet ads left and right!
* [NodeMCU Development Boards](http://amzn.to/2ou0NON) hooked into the alarm system wires for [DIY alarm system](http://www.vmwareinfo.com/2017/06/building-my-home-alarm-system-hardware.html). - [DIY Motion Sensors](http://www.vmwareinfo.com/2017/11/yet-another-inexpensive-motion-sensor.html)
* [JuiceBox Pro 40 EVSE](http://amzn.to/2AIdSdx) - Used to Charge the Bolt EV.
* [Chevy Bolt Electric Car](http://amzn.to/2DRP83a) - Monitor Charging status of Electric Vehicle.
* [Epson ET-7700 Printer](http://amzn.to/2HaiBUK) - All Printing with HA monitored Ink levels.

Lots of my gear comes from [BetaBound](https://goo.gl/0vxT8A) for Beta Testing and reviews.

**Automations:**
* Voice Notifications via the [AMPs](http://amzn.to/2j18dlT) connected to ChromeCast Audios and [Mixer](http://amzn.to/2v9Zp3x).  Accomplished via the [~~Google~~ Amazon Polly TTS](https://home-assistant.io/components/tts/) component.

.
* Monitor the reflection rates of [Garadget](http://amzn.to/2jQLpVQ) and notify when they being to drop too low when closed (indicating a shift in the controller)
* Notifications when the garage door is left open at night or when we leave the house.
* (IFTTT) Logging entries in Logbooks for [Rachio Sprinkler system](http://amzn.to/2eoPKBW), and [SkyBell HD](http://amzn.to/2dcexIB).
* Auto Heal ZWave at 2:30am
* Using [Etekcity Outlets](http://amzn.to/2efNoBP) to control accent lighting above kitchen cabinets and room cutouts.
* Turn on Hallway light for no more than 20 minutes when Pantry door is opened.
* Turn on TV Time Lights (dim and color) at Sunset (if home and TV is on)
* Turn on Upstairs light if [Nest Thermostats](http://amzn.to/2eAhB1k) detects people and it's nighttime.
* Turn off lights when [Nest Thermostats](http://amzn.to/2eAhB1k) detects we are away. (Upstairs and Downstairs)

* Turn on some outdoor Lights at Sunset or if it gets darkish in the house, Turn off 4 hours before sunrise.  Turn off interior lights when we go to sleep.
* Turn on lights during school days for a morning routine for the kids and wife. Has No School overide boolean in GUI.
* Rainy days trigger extra light inside the house.
* Check the UV Rays for the day and let us know if we need sun tan lotion over the TTS system.
* Detects when lights are turned on and adjusts them to correct brightness based on time of day.
* Leverage Alexa, IFTTT and Elekcity outlet to control Printer On/Off via Voice. Turns off automatically after 20 minutes.
* Turn on [AMPs](http://amzn.to/2j18dlT) when Chromecast reports 'Playing'.  Turn them off when we are done streaming music.
* (IFTTT) Blink ALL lights at 9:30 to remind me to take medicine. (also Alexa Alert)
* (IFTTT) Blink Office lights 15 minutes before ANY meeting on my calendar (using IFTTT)
* (IFTTT) Stop watering grass via [Rachio Sprinkler system](http://amzn.to/2eoPKBW) if winds are greater than 20 MPH.
* (IFTTT) Add a 1 day rain delay to [Rachio Sprinkler system](http://amzn.to/2eoPKBW) if it is going to rain tomorrow.
* (IFTTT) Blink ALL lights if Winds get to 70MPH - Hurricane warning.
* (IFTTT) Trigger Good Night routine when I step on the [Withings](http://amzn.to/2kr78nW) scale after 10pm.
* Sets up the front lights in the house with preset colors depending on the ~~month~~ day!.
* On motion from [SkyBell HD Doorbell](http://amzn.to/2dcexIB) (IFTTT) Turn front lights to Bright White lights for 10 minutes and then back to original colors.  Fake Dog barking when there is motion by the house.
* When someone rings the Doorbell (IFTTT), the backyard and Bathroom lights Flash - Since we might not hear the doorbell. Fake Dog barks as well (which can be snoozed for 30 minutes via Alexa).
* Watch and alert on Home Assistant's Disk usage. Get alerts before Pi runs out of space on the [SD Card](http://amzn.to/2kNttio).
* Digital Cuckoo Clock that goes off each hour and on the half just like a real Cuckoo Clock.  Plays across the whole house on my [ChromeCast Audios](http://amzn.to/2lE9gNu)

#Todo List
I've moved this entire section to the [issues section](https://github.com/CCOSTAN/Home-AssistantConfig/issues) on github.
Feel free to join the conversations there.
![Screenshot of Alarm Clock View](https://i.imgur.com/mLMrky1.jpg)
![Screenshot of Alarm View](https://i.imgur.com/nad2gq0.png)

**All files are now being edited with [Atom](https://atom.io/).**

**All of my configuration files are tested against the most stable version of home-assistant using [Travis](https://travis-ci.org/CCOSTAN/Home-AssistantConfig).**

#Still have questions on my Config?
Message me on twitter : [@CCostan](https://twitter.com/ccostan)
