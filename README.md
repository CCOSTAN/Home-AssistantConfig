# [![Build Status](https://travis-ci.org/CCOSTAN/Home-AssistantConfig.svg?branch=master)](https://travis-ci.org/CCOSTAN/Home-AssistantConfig) Home-Assistant Config by [@ccostan](http://www.twitter.com/ccostan)

Be sure to :star: my repo so you can keep up to date on the daily progress!</br>
You can also vist my [Blog](http://www.vmwareinfo.com/search/label/iot) for all of my [Home Automation Posts](http://www.vmwareinfo.com/search/label/iot).</br>
You can follow my home's breaking news and tweet statistics via twitter [@BearStoneHA](https://twitter.com/bearstoneha) or [Facebook/BearStoneHA](https://www.facebook.com/BearStoneHA)</br>

![Screenshot of Home Assistant Header](https://i.imgur.com/vjDH1LJ.png)

As of 2018, I have migrated everything to a Docker based platform.  You can read all about it here:
[Migration Blog Post](http://www.vmwareinfo.com/2018/02/journey-to-docker.html)
<hr>

### Notable Software on my Laptop Host:
* [Docker](https://Docker.com) - Docker runs on a Ubuntu Server Core base. [Docker-Compose.yaml](https://github.com/CCOSTAN/Docker_Support)
* [Home Assistant Container](https://home-assistant.io/) - It all starts here.
* The amazing [Floorplan](https://github.com/pkozul/ha-floorplan) project to help visualize my smarthome.
* SSL via [SSLS](https://SSLS.com) - 5 Bucks A Year! - Keeps me safe!
* [Dasher Container](https://github.com/maddox/dasher) to leverage those cheap [Amazon Dash Buttons](http://amzn.to/2dPKZhM)
* [HomeBridge Container](https://github.com/nfarina/homebridge) for full HA <-> Homekit compatibility.
* Unifi controller Container to manage [APs](http://amzn.to/2mBSfE9)

![Screenshot of SmartHome](https://lh3.googleusercontent.com/-vKGF5gdz_VY/WVpP7qjsmjI/AAAAAAADVZ4/sGyiS1PjouUQxrEbWVfot6raxcElv4r-wCHMYCw/s1600/clip_image001%255B4%255D)

### Devices I have in no particular order:
<p align="center">
<table align="center" border=0>
<tr><td colspan="3">

### Battery Backups - [UPS Blog write-up](http://www.vmwareinfo.com/2017/06/home-protection-from-power-outages-sort.html)
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

<tr><td colspan="4">

### Networking
</td></tr>
<tr><td align="center">

[Ubiquiti Networks Unifi 802.11ac Pro](http://amzn.to/2mBSfE9)
</td><td align="center">

[Ubiquiti Networks Unifi 802.11ac Lite](http://amzn.to/2mBSfE9)
</td><td align="center">

[NetGear 16 Port unmanaged Switch](http://amzn.to/2GJwyIb)
</td><td align="center">

[Circle by Disney](http://amzn.to/2eAgaA6)</td></tr>
<tr><td align="center"><a href="https://www.amazon.com/Ubiquiti-Networks-802-11ac-Dual-Radio-UAP-AC-PRO-US/dp/B015PRO512/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1519453280&sr=1-1&keywords=unifi+ac+pro&linkCode=li1&tag=vmw0a-20&linkId=a51eb66ad64455d857f9b50cd7ffb796" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B015PRO512&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B015PRO512" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Ubiquiti-Unifi-Ap-AC-Lite-UAPACLITEUS/dp/B015PR20GY/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1519453311&sr=1-1&keywords=unifi+ac+lite&linkCode=li1&tag=vmw0a-20&linkId=9e888012791a02c582fe8f42bb9b7246" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B015PR20GY&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B015PR20GY" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/NETGEAR-Ethernet-Unmanaged-Lifetime-Protection/dp/B01AX8XHRQ/ref=as_li_ss_il?ie=UTF8&qid=1519509807&sr=8-3&keywords=16+port+gigabit+switch&th=1&linkCode=li1&tag=vmw0a-20&linkId=63c057df0c463d473e2466490e93f5a8" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01AX8XHRQ&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01AX8XHRQ" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Circle-Disney-Parental-Controls-Connected/dp/B019RC1EI8/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1519453110&sr=1-1-spons&keywords=circle+disney&psc=1&linkCode=li2&tag=vmw0a-20&linkId=8bfecf20fdfee716f0e0c43a2f4becbd" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B019RC1EI8&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B019RC1EI8" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

Using the APs (3 of them), The house monitors all Connected devices for Online/Offline status and uses 'NMAP' for presence detection.  Any critical device down for more than 5 minutes and an alert is sent out. Circle is a Parental Control device.  When a new device is discovered on the network, HA notifies us and also plays a TTS reminder over the speakers to classify in Circle.  Most things are Wifi connected but a good gigabit switch is needed for a good foundation.</td></tr>

<tr><td colspan="4">

**Alexa Echo Devices** - [Alexa Device Blog Post](http://www.vmwareinfo.com/2017/09/new-alexa-goodies-announced.html)
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

The Alexa devices in my house are for automation overrides.  They are primarily an input device into Home Assistant.  Using HA `Cloud` component, I am able to turn on /off most HA devices even if they don't have native Alexa support.  The DOTs are littered around the house, the Tap is for Shower and Garage since it is super portable and the main echo fills the upstairs with Music.  Voice input and playing [Whole House Music](http://www.vmwareinfo.com/2017/08/multi-room-audio-for-echo-its-finally.html) are where Echoes excel!  The Wand is pool side for quick commands and controlling the music if need be.
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
<tr><td align="center"><a href="https://www.amazon.com/Apple-MH182LL-9-7-Inch-Retina-Display/dp/B00OTWPEBK/ref=as_li_ss_il?s=pc&rps=1&ie=UTF8&qid=1487044765&sr=1-3&keywords=ipad&refinements=p_89:Apple,p_85:2470955011,p_n_condition-type:2224371011&linkCode=li1&tag=vmw0a-20&linkId=d4e62510b64106355f3788ea04bff8a0" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00OTWPEBK&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00OTWPEBK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Apple-iPhone-Plus-Unlocked-16GB/dp/B00YD54J8W/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1519496432&sr=1-2&keywords=iphone+6s+plus&linkCode=li1&tag=vmw0a-20&linkId=a6a638b1381a5f06fbdfa68803b85bc0" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00YD54J8W&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00YD54J8W" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="http://www.vmwareinfo.com/2017/08/project-update-visualization-of-home.html" target="_blank"><img border="0" src="https://lh3.googleusercontent.com/-UdtxP-RNPxM/WZNRjcEJ6hI/AAAAAAADYfY/Vum9wiL5qYAO3frTAi2MdqK1vH6qBTb9gCHMYCw/image3_thumb%255B2%255D?imgmax=200" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01GEW27DA" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="3">

Mobile devices are a critical part of my Home Automation.  They establish presence in the house and are the basis for many automations.  Home? Turn on the lights.  Leave? Turn them all off kind of thing.  The Tablets are for the awesome FloorPlan that you see in the images.  We have 2 in the house mounted for quick consumption of all the HA data in a glance.
* IOS Notifications for Offline Devices, BadLogins, HA Startups, new HA versions and [External IP changes](https://community.home-assistant.io/t/detect-if-ip-changes/6830) for DNS.
* Turn on certain lights and switches when we get home.  Turn off most interior lights when we leave the house.
* Reminders to take my medicine sent as IOS notifications ONLY when I arrive back home for the night.

We also leverage the Fire Tablets as TTS endpoints.  During certain times of the day, TTS is only played on the tablets rather than over the whole house.  Other times, Notifications are sent only to the Mobile Devices rather than using speech.
</td></tr>

<tr><td colspan="4">

**Nest Products and SleepIQ** - [Thermostat Basics Blog post](http://www.vmwareinfo.com/2018/02/smart-home-basics-thermostats.html)
</td></tr>
<tr><td align="center">

[Nest Thermostats](http://amzn.to/2eAhB1k)
</td><td align="center">

[Nest Protects](http://amzn.to/2poqKhu)
</td><td align="center">

[SleepNumber Bed i8](http://amzn.to/2kxdXXI)
</td><td align="center">

[Withings](http://amzn.to/2kr78nW)</td></tr>
<tr><td align="center"><a href="https://www.amazon.com/gp/product/B0131RG6VK/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=cdcad716f0b691a5834b32f2a0cf6fa3" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0131RG6VK&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B0131RG6VK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Nest-Protect-smoke-carbon-monoxide/dp/B00XV1RD0K/ref=as_li_ss_il?s=hi&ie=UTF8&qid=1493663203&sr=1-1&keywords=nest+protect&linkCode=li1&tag=vmw0a-20&linkId=f0092afb267bf40d55e38596ea352e09" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00XV1RD0K&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00XV1RD0K" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Personal-Comfort-A8-Bed-Number/dp/B00CHSOZZO/ref=as_li_ss_il?ie=UTF8&qid=1486673583&sr=8-3&keywords=sleep+number+bed+i8&linkCode=li1&tag=vmw0a-20&linkId=f1f1d759913d1767734a12c7cddeaa32" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00CHSOZZO&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00CHSOZZO" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Withings-Body-Composition-Wi-Fi-Scale/dp/B01F3LJ2RW/ref=as_li_ss_il?ie=UTF8&qid=1486665271&sr=8-2&keywords=withings+scale&th=1&linkCode=li1&tag=vmw0a-20&linkId=6e239a882226db5a94b4194249d13d2f" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01F3LJ2RW&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01F3LJ2RW" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

This group of devices is basically for additional presence control.  The Nest thermostats and Protects basically run themselves.  The thermostat 'away' mode triggers my away scripts which turn items off.  The Protects are SOLID [smoke detectors](http://www.vmwareinfo.com/2017/06/psa-check-out-your-smoke-detectors-once.html).  They really came in handy during [Irma](http://www.vmwareinfo.com/2017/09/smart-home-lessons-from-hurricane-irma.html).  The SleepIQ bed adds to my presence detection.  It will notify HA if either side of the bed is occupied.  More controls are coming but I use this extensively. The WiThings scale also triggers morning and goodnight routines depending on when I step on it during the day.
* Turn off lights when Nest Thermostats detects we are away. (Upstairs and Downstairs)
* Turn on Upstairs lights if Nest Thermostats detects people and it's nighttime.
* (IFTTT) Trigger Good Night routine when I step on the Withings scale after 10pm.
* Turn on bathroom accent lights when either of us steps out of bed at night. Turns them back off when we are back in bed.
* Turn off all interior lights when the last person gets into bed.
* Silence all Voice notifications if anyone is in bed.  Redirect to Fire Tablets.

</td></tr>

<tr><td colspan="4">

**Voice Notifications** - [Giving Voice to the Smart Home Blog Post](http://www.vmwareinfo.com/2017/07/giving-voice-to-smart-home.html)
</td></tr>
<tr><td align="center">

[ChromeCast Audios](http://amzn.to/2EO8Gqt)
</td><td align="center">

[AMPs](http://amzn.to/2j18dlT)
</td><td align="center">

[Mixer](http://amzn.to/2v9Zp3x)
</td><td align="center">

[TP-Link Smart Plug](http://amzn.to/2EQS3e0)</td></tr>

<tr><td align="center"><a href="http://amzn.to/2EO8Gqt" target="_blank"><img border="0" src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/4532/4532100_sd.jpg;maxHeight=110;maxWidth=110" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B0131RG6VK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Kinter-MA-180-Computer-Amplifier-Charging/dp/B006AMF2R8/ref=as_li_ss_il?_encoding=UTF8&pd_rd_i=B006AMF2R8&pd_rd_r=7YM4TST4HMXQK46KH4F6&pd_rd_w=v8lnG&pd_rd_wg=QJNYk&psc=1&refRID=7YM4TST4HMXQK46KH4F6&linkCode=li1&tag=vmw0a-20&linkId=0620a70d225103fcbce65b56d3c60304" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B006AMF2R8&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B006AMF2R8" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/gp/product/B0002BG2S6/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li1&tag=vmw0a-20&linkId=661b1661a02cc502753e56f7062754c4" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0002BG2S6&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B0002BG2S6" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/TP-Link-Required-Assistant-Certified-Refurbished/dp/B076TVG9LN/ref=as_li_ss_il?s=hi&ie=UTF8&qid=1519508426&sr=1-9&keywords=tp+link+smart+plug&linkCode=li1&tag=vmw0a-20&linkId=434c37cfb04765acf0f73d4bc08b2acd" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B076TVG9LN&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B076TVG9LN" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

To me, Voice is the coolest part of the smart home.  It gives it personality.  It's something not just anyone has and helps your house stand apart from the pack.  I use the [Amazon Polly TTS](https://home-assistant.io/components/tts/) component since it sounds the closest to Alexa.  This gives a seemless transition from Alexa to Home Assistant responding.  Most think it is just one system.  The mixer allows TTS to mix right in over Music.  The TP-Link Outlet  is used to turn off the Mixer and AMP when we do not need it.  It's a great inexpensive solution.
* Turn off all the voice devices when we are not home or in bed.
* All voice notifications are pushed though a speech engine.  Random words and sentances are used to give the house some personality.
* Voice announcements whenever someone comes home.
* Voice notifications for all sorts of things related to the house.  (Temps, presence, doors open, windows open, garage door statuses, sunset.)
* Digital Cuckoo Clock that goes off each hour and on the half just like a real Cuckoo Clock.

Once you can teach your house to talk, you just keep expanding on it's vocabulary. It's addicting. :)
</td></tr>

<tr><td colspan="4">

**Various Hubs** - [Smart Home Parts/Sum Blog Post](http://www.vmwareinfo.com/2017/07/my-smart-home-look-at-parts-that-make.html)
</td></tr>
<tr><td align="center">

[Phillips Hue Hub Gen 2](http://amzn.to/2eoQTJy)
</td><td align="center">

[Wink Hub](http://amzn.to/2orGEWo)
</td><td align="center">

[RM Pro by Broadlink](http://amzn.to/2z6IZtH)
</td><td align="center">

[NodeMCU Development Boards](http://amzn.to/2ou0NON)</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/gp/product/B016H0QZ7I/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=234a9104238b7189c169a7623239653c" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B016H0QZ7I&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B016H0QZ7I" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Wink-PWHUB-WH18-Connected-Home-Hub/dp/B00PV6GAI4/ref=as_li_ss_il?s=hi&ie=UTF8&qid=1492110362&sr=1-2&keywords=wink+hub&linkCode=li1&tag=vmw0a-20&linkId=96b7546e6151c2005994454bd51d8c47" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00PV6GAI4&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00PV6GAI4" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/BroadLink-Automation-Universal-Compatible-Smartphones/dp/B0742CXGHY/ref=as_li_ss_il?ie=UTF8&qid=1513802853&sr=8-1-spons&keywords=rm+pro&psc=1&linkCode=li1&tag=vmw0a-20&linkId=ffaddc7ae224eefefc32e0c8f27dce72" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0742CXGHY&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B0742CXGHY" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/gp/product/B010O1G1ES/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li1&tag=vmw0a-20&linkId=8f30ebb6868e9060be331dd297b75119" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B010O1G1ES&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B010O1G1ES" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

The Hubs help the home communicate across all the various protocols running in the house.  The Hue hubs (I have 2 actually) talk to most of the lights.  Some lights and switches talk over Zwave to the Wink Hub.  The RM Pro talks 433Mhz to my EtekCity outlets.  The ESPs while technically not a Hub do bridge the connection to all the windows and door sensors that are hardwired in my house.  One set acts as my [DIY alarm system](http://www.vmwareinfo.com/2017/06/building-my-home-alarm-system-hardware.html) while the other act as [DIY Motion Sensors](http://www.vmwareinfo.com/2017/11/yet-another-inexpensive-motion-sensor.html).
* Using [Etekcity Outlets](http://amzn.to/2efNoBP) to control accent lighting above kitchen cabinets and room cutouts.
* Turn on Hallway light for no more than 20 minutes when Pantry door is opened.
* Detects when lights are turned on and adjusts them to correct brightness based on time of day.
* Shut down HVAC system if a Window or Door is left open for more than 5 minutes.
* Play chime on all window and door open/closes.

Think of the Hubs each as bridges for HA to talk to various hardware around the house.
</td></tr>

<tr><td colspan="4">

**Lights and Switches** - [Smart Home Parts/Sum Blog Post](http://www.vmwareinfo.com/2017/07/my-smart-home-look-at-parts-that-make.html)
</td></tr>
<tr><td align="center">

[Hue Colored lights](http://amzn.to/2l2viGK)
</td><td align="center">

[GE Link Lightbulbs](http://amzn.to/2GJ66i5)
</td><td align="center">

[Hue Go](http://amzn.to/2iB36Ii)
</td><td align="center">

[Etekcity Outlets](http://amzn.to/2efNoBP)</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/Philips-464503-Generation-Richer-Android/dp/B01KJYSOHM/ref=as_li_ss_il?s=hi&ie=UTF8&qid=1487045409&sr=1-3&keywords=hue+a19&linkCode=li1&tag=vmw0a-20&linkId=a4c6acf8f2672a5ba341f731d377b724" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01KJYSOHM&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01KJYSOHM" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/GE-Starter-PLINK-SKIT-Wireless-Lighting/dp/B01GWF4RE6/ref=as_li_ss_il?ie=UTF8&qid=1519537605&sr=8-2-fkmr1&keywords=ge+link+bulb+br30&linkCode=li1&tag=vmw0a-20&linkId=b4e6f6acdca3db68322d0679fcc388b7" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01GWF4RE6&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01GWF4RE6" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Philips-Lighting-Works-Amazon-Alexa/dp/B014H2P53I/ref=as_li_ss_il?ie=UTF8&qid=1482862179&sr=8-1-spons&keywords=hue+go&psc=1&linkCode=li1&tag=vmw0a-20&linkId=4f9fd0d242273d079f661fa389b2eec1" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B014H2P53I&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B014H2P53I" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/gp/product/B00DQELHBS/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=2d11a4b4ee3994189b3136c3b5726e37" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00DQELHBS&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00DQELHBS" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

Almost all my lights (40+) are white GE Link lights.  I bought them early on before Hue came out with inexpensive white A19s.  Even Ikea has great lights now.  Colored lights are in the front sconces and also used in the living room.  The Go lights are specifically for the kids since they are both wireless and also have a button on them making them very tactile for kids.  The EtekCity outlets are the most inexpensive ($6) yet reliable outlets out there.  I have them deployed all over the house as accent lighting with some rope lights in most of the home's cut outs.
* Turn on TV Time Lights (dim and color) at Sunset (if home and TV is on)
* Sets up the front lights in the house with preset colors depending on the ~~month~~ day!.
* Turns living room lights `red` when a Window or Door is opened past sunset.  Resets to `yellow/gold` when all dors/windows are closed.
</td></tr>

<tr><td colspan="4">

**Outdoor Landscaping**
</td></tr>
<tr><td align="center">

[Rachio Sprinkler system](http://amzn.to/2eoPKBW)
</td><td align="center">

[GE ZWave Outdoor Power Module](http://amzn.to/2q17R4S)
</td><td align="center">

[Phyn Smart Water Main ShutOff/Leak Detector](http://www.phyn.com/)
</td><td align="center">

[Outdoor LED Lighting](http://www.vmwareinfo.com/2017/08/diy-outdoor-smart-home-led-strips.html)
</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/gp/product/B01D1NMLJU/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=32eaaee1a47e3f0841694b2f65b33f20" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01D1NMLJU&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01D1NMLJU" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/GE-Wireless-Lighting-Control-12720/dp/B0013V8K3O/ref=as_li_ss_il?ie=UTF8&qid=1494360163&sr=8-1&keywords=ge+zwave+outdoor&linkCode=li1&tag=vmw0a-20&linkId=14fea62a5ea952ae7e575d3ec9f83d8f" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0013V8K3O&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B0013V8K3O" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="http://www.phyn.com/" target="_blank"><img border="0" src="http://www.phyn.com/wp-content/uploads/2017/12/1920_01_product_intro-1.png" width="100" height="75" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B01HDC236Q" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="http://www.vmwareinfo.com/2017/08/diy-outdoor-smart-home-led-strips.html" target="_blank"><img border="0" src="https://lh3.googleusercontent.com/-RfNOR7YThbY/WZnY6Gjw4zI/AAAAAAADYrw/IxBE2KmxW9YuLMtj9qgxAWyb5vHdgSrBACHMYCw/IMG_2660_thumb%255B9%255D" width="200" height="150" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B01HDC236Q" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

The great outdoors can be automated too!  Mainly lights but also the sprinkler system and water supply.  The Phyn leak detector was announced in CES.  It looks for abnormal flows and if senses them, alerts me and shuts water main.  The GE Outlets are hooked up to my 12v transformers allowing me to turn the landscaping lights on and off.  The LED strips are DIY and the recipe is in the next section.
* (IFTTT) Stop watering grass via Rachio Sprinkler system if winds are greater than 20 MPH.
* (IFTTT) Add a 1 day rain delay to Rachio Sprinkler system if it is going to rain tomorrow also logged to MQTT.
* (IFTTT) Blink ALL lights if Winds get to 70MPH - Hurricane warning.
* Turn on some outdoor Lights at Sunset, Turn off 4 hours before sunrise.  Turn off interior and backyardlights when we go to sleep.
* Colorize all Front Outdoor lights daily according to a Holiday schedule.

</td></tr>
</table>
</p>



**Devices I have:** LEGACY SECTION being migrated up.
* [Amazon Dash Buttons](http://amzn.to/2dPKZhM)
* [Amazon Fire TV](http://amzn.to/2iiuaNT)
* [SkyBell HD](http://amzn.to/2dcexIB)
* [Rokus](http://amzn.to/2dpn89c) for all streaming
* [Samsung Smart TV](http://amzn.to/2efNNnq)
* [Door Sensors (AEON Labs)](http://amzn.to/2e3xDxY)
* [Garadget](http://amzn.to/2jQLpVQ) - Garage Door opener/sensor - "[Siri, are my garage doors closed?](https://pbs.twimg.com/media/C3cyJZSWAAAalPm.jpg:large)"
* [iTeadStudio](https://www.itead.cc/) [goodies](https://twitter.com/ccostan/status/793119824008384512) - [SonOff](http://amzn.to/2l2sx8g) and a [Slampher](http://amzn.to/2l2gmIx)!
* [LED RGB Wifi Controller - flux_led compatible](http://amzn.to/2jUBSBE) with [LED Strip kits](http://amzn.to/2gJYfZ5) - ~100 Feet. These are great [Power supplies](http://amzn.to/2mnmbk8) - [Outdoor Housing](http://amzn.to/2m2dG0X) - Finished Product [#71](https://github.com/CCOSTAN/Home-AssistantConfig/issues/71) - [Blog Post](http://www.vmwareinfo.com/2017/08/diy-outdoor-smart-home-led-strips.html)
* [Aeon Labs AEDSB09104ZWUS Aeotec Z-Wave Smart Energy Monitor Meter](http://amzn.to/2l5wEDo) to measure energy usage in the home.
* [Pi Zero](http://amzn.to/2ougZQ3) with [Wireless Nub](http://amzn.to/2q38rg4) running Pi-Hole and smacking down internet ads left and right!
* [JuiceBox Pro 40 EVSE](http://amzn.to/2AIdSdx) - Used to Charge the Bolt EV.
* [Chevy Bolt Electric Car](http://amzn.to/2DRP83a) - Monitor Charging status of Electric Vehicle.
* [Epson ET-7700 Printer](http://amzn.to/2HaiBUK) - All Printing with HA monitored Ink levels.

Lots of my gear comes from [BetaBound](https://goo.gl/0vxT8A) for Beta Testing and reviews.

**Automations:** LEGACY SECTION being migrated up.
* Monitor the reflection rates of [Garadget](http://amzn.to/2jQLpVQ) and notify when they being to drop too low when closed (indicating a shift in the controller)
* Notifications when the garage door is left open at night or when we leave the house.
* Leverage Alexa and Elekcity outlet to control Printer On/Off via Voice. Turns off automatically after 20 minutes.
* Turn on lights during school days for a morning routine for the kids and wife. Has No School overide boolean in GUI.
* Rainy days trigger extra light inside the house.
* (IFTTT) Blink ALL lights at 9:30 to remind me to take medicine. (also Alexa Alert)
* (IFTTT) Blink Office lights 15 minutes before ANY meeting on my calendar (using IFTTT)
* On motion from [SkyBell HD Doorbell](http://amzn.to/2dcexIB) (IFTTT) Turn front lights to Bright White lights for 10 minutes and then back to original colors.  Fake Dog barking when there is motion by the house.
* When someone rings the Doorbell (IFTTT), the backyard and Bathroom lights Flash - Since we might not hear the doorbell. Fake Dog barks as well (which can be snoozed for 30 minutes via Alexa).
* Watch and alert on Home Assistant's Disk usage. Get alerts before Pi runs out of space on the [SD Card](http://amzn.to/2kNttio).

#Todo List
I've moved this entire section to the [issues section](https://github.com/CCOSTAN/Home-AssistantConfig/issues) on github.
Feel free to join the conversations there.
![Screenshot of Alarm Clock View](https://i.imgur.com/mLMrky1.jpg)
![Screenshot of Alarm View](https://i.imgur.com/nad2gq0.png)

**All files are now being edited with [Atom](https://atom.io/).**

**All of my configuration files are tested against the most stable version of home-assistant using [Travis](https://travis-ci.org/CCOSTAN/Home-AssistantConfig).**

#Still have questions on my Config?
Message me on twitter : [@CCostan](https://twitter.com/ccostan)
