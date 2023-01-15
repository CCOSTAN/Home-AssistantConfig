<h1 align="center">
  <a name="logo" href="https://www.vCloudInfo.com/tag/iot"><img src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/twitter_profile.png" alt="Bear Stone Smart Home" width="200"></a>
  <br>
  Bear Stone Smart Home Documentation
</h1>
<h4 align="center">Be sure to :star: my configuration repo so you can keep up to date on any daily progress!</h4>
<p align="center"><a align="center" target="_blank" href="https://vcloudinfo.us12.list-manage.com/subscribe?u=45cab4343ffdbeb9667c28a26&id=e01847e94f"><img src="https://feeds.feedburner.com/RecentCommitsToBearStoneHA.1.gif" alt="Recent Commits to Bear Stone Smart Home" style="border:0"></a></p>
<div align="center">

[![Twitter Follow](https://img.shields.io/twitter/follow/ccostan?color=blue&amp;label=talk&amp;logo=twitter&amp;style=for-the-badge)](https://twitter.com/ccostan)
[![YouTube Subscribe](https://img.shields.io/youtube/channel/subscribers/UC301G8JJFzY0BZ_0lshpKpQ?label=VIEW&logo=Youtube&logoColor=%23DF5D44&style=for-the-badge)](https://www.youtube.com/vCloudInfo?sub_confirmation=1)
[![GitHub Follow](https://img.shields.io/github/stars/CCOSTAN/Home-AssistantConfig?label=sTARS&amp;logo=Github&amp;style=for-the-badge)](https://github.com/CCOSTAN)

  <h4>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig/commits/master"><img src="https://img.shields.io/github/last-commit/CCOSTAN/Home-AssistantConfig.svg?style=plasticr"/></a>
        <a href="https://github.com/CCOSTAN/Home-AssistantConfig/commits/master"><img src="https://img.shields.io/github/commit-activity/y/CCOSTAN/Home-AssistantConfig.svg?style=plasticr"/></a>

  </h4>
</div>
<p><font size="3">
This Repo is designed for Smart Home inspiration.  The configuration, devices, layout, linked Blog posts and YouTube videos should help inspire you to jump head first into the IOT world.  This is the live working configuration of <strong>my Smart Home</strong>. Use the menu links to jump between sections.  All of the code is under the <em>config</em> directory and free to use and contribute to.  Be sure to subscribe to the <a href="https://eepurl.com/dmXFYz">Blog Mailing list</a> and YouTube Channel. (https://YouTube.com/vCloudInfo)</p>
<div align="center"><a name="menu"></a>
  <h4>
    <a href="https://www.vCloudInfo.com/tag/iot">
      Blog
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#devices">
      Devices
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc">
      Todo List
    </a>
    <span> | </span>
    <a href="https://twitter.com/BearStoneHA">
      Smart Home Stats
    </a>
    <span> | </span>
    <a href="https://www.vcloudinfo.com/click-here">
      Follow Me
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig/tree/master/config">
      Code
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#diagram">
      Diagram
    </a>
    <span> | </span>
    <a href="https://youtube.com/vCloudInfo">
      Youtube
    </a>
    <span> | </span>
    <a href="https://amzn.to/2HXSx2M">
      Merch
    </a>
  </h4>
</div>

![Screenshot of Home Assistant Header](https://i.imgur.com/vjDH1LJ.png)

As of 2018, I have migrated everything to a Docker based platform.  You can read all about it here:
[Migration Blog Post](https://www.vCloudInfo.com/2018/02/journey-to-docker.html)
<hr>

#### <a name="software"></a>Notable Software on my Laptop Host:
* [Docker](https://Docker.com) - Docker runs on a Ubuntu Server Core base. [Video on Ubuntu Upgrades](https://youtu.be/w-YNtU1qtlk)
* [Youtube Video on Upgrading Home Assistant in Docker](https://youtu.be/ipatCbsY-54) - Be sure to Subscribe to get all Home Assistant videos.
* [Home Assistant Container](https://home-assistant.io/) - It all starts here.
* The amazing [Floorplan](https://github.com/pkozul/ha-floorplan) project to help visualize my smarthome.
* SSL via [SSLS](https://SSLS.com) - 5 Bucks A Year! - Keeps me safe! - [Youtube Video on Port Forwarding](https://youtu.be/y5NOP1F-xGU) - On my Arris TG1682 Modem
* [Docker-Compose.yaml](https://github.com/CCOSTAN/Docker_Support) - Realtime list of all the Containers.
* [Dasher Container](https://github.com/maddox/dasher) to leverage those cheap [Amazon Dash Buttons](https://youtu.be/rwQVe6sIi9w)
* [HomeBridge Container](https://github.com/homebridge/homebridge) for full HA <-> Homekit compatibility.
* [Unifi controller Container to manage](https://github.com/jacobalberty/unifi-docker) [APs](https://amzn.to/2mBSfE9)

![Screenshot of SmartHome](https://lh3.googleusercontent.com/-vKGF5gdz_VY/WVpP7qjsmjI/AAAAAAADVZ4/sGyiS1PjouUQxrEbWVfot6raxcElv4r-wCHMYCw/s1600/clip_image001%255B4%255D)
Lots of my gear comes from [BetaBound](https://goo.gl/0vxT8A) for Beta Testing and reviews.
Be sure to use the referral code 'Reliable jaguar' so we both get priority for Beta Tests!

#### <a name="diagram"></a>Smart Home Diagram - Get your icons (<a href="https://www.vcloudinfo.com/2018/07/the-bear-stone-home-assistant-icon.html">here</a>).
Here is how all the parts talk to each other.  Keep reading to see code examples and explanations.
![Smart Home Diagram](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/bearstoneflow.png)

<p align="center"><strong>Smart Home diagram (<a href="https://pbs.twimg.com/media/Dg_CPwVU8AEyC2B.jpg:large"><code>PNG</code></a>). Made with <a href="https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=BearStoneFlow.xml#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FCCOSTAN%2FDocker_Support%2Fmaster%2FBearStoneFlow.xml">Draw.io</a> (<a href="https://raw.githubusercontent.com/CCOSTAN/Docker_Support/master/BearStoneFlow.xml"><code>XML</code></a> source file).</strong></p>

<a name="devices"></a>
<div align="center">
  <h4>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#battery">
      Batteries
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#networking">
      Networking
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#alexa">
      Alexa
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#mobiledevices">
      Mobile Devices
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#nest">
      Nest
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#voice">
      Voice
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#hubs">
      Hubs
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#lights">
      Lights
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#switches">
      Switches
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#landscaping">
      Landscaping
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#LED">
      DIY LED Lights
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#garage">
      Garage
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#TV">
      TV Streaming
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#security">
      Security
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#cameras">
      Cameras
    </a>
    <span> | </span>
    <a href="https://github.com/CCOSTAN/Home-AssistantConfig#sensors">
      Sensors
    </a>
  </h4>
</div>

<table align="center" border="0">
<tr><td colspan="4">

#### <a name="battery"></a>Battery Backups - [UPS Blog write-up](https://www.vCloudInfo.com/2017/06/home-protection-from-power-outages-sort.html)<a href="https://github.com/CCOSTAN/Home-AssistantConfig#logo"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[3 Prong UPS](https://amzn.to/2HJerU8)
</td><td align="center">

[2 Prong UPS](https://amzn.to/2CijVG3)
</td><td align="center" colspan="2">

[Tesla Powerwall 2](https://www.vCloudInfo.com/2018/01/going-green-to-save-some-green-in-2018.html)</td></tr>
<tr><td align="center"><a href="https://www.amazon.com/APC-Back-UPS-Battery-Protector-BE425M/dp/B01HDC236Q/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1519445552&sr=1-2&keywords=apc+450&linkCode=li2&tag=vmw0a-20&linkId=efbdf7bdfad7bd607e099d34bd1f2688" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01HDC236Q&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B01HDC236Q" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/gp/product/B00KH07WRC/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li2&tag=vmw0a-20&linkId=52a63711f582d1ff83f4687137a6154b" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00KH07WRC&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B00KH07WRC" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.vCloudInfo.com/2018/01/going-green-to-save-some-green-in-2018.html" target="_blank"><img border="0" src="https://lh3.googleusercontent.com/-V8NMHkiKFIY/Wkgpf7T-WDI/AAAAAAADihs/fp5yNzjrQ5sKgFkafXhllLYsD7yM3tGBgCHMYCw/image_thumb5?imgmax=200" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B01HDC236Q" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.youtube.com/watch?v=BartadUzGOA" target="_blank"><img src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/S01E01_PlayButton.png"  height="150" border="0" alt="" style="border:none !important; margin:0px !important;"></a></td></tr>

<tr><td colspan="4">
There aren't really automations for the Batteries yet.  Electricity is the life blood for the house and only really the Tesla Battery has smarts so maybe in the future, you'll see a Powerwall automation in this space.  But be sure to check out the  Videos below:
<details>
  <summary>How To Port Forward Home Assistant on Arris TG1682</summary><p align="center">
  <a href=https://www.vcloudinfo.com/2018/11/port-forwarding-on-arris-tg1682-modem.html>
  Write Up and YouTube Video</a><br>
</details>
<details>
  <summary>Adding Powerwall Sensors to Home Assistant</summary><p align="center">

[![Adding Powerwall Sensors to Home Assistant](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Adding%20Powerwall%20Sensors%20to%20Home%20Assistant.jpeg)](https://youtu.be/KHaLddx5wPg "Adding Powerwall Sensors to Home Assistant")

</details>
</td></tr>

<tr><td colspan="4">

#### Networking <a name="networking" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22"> </a>
</td></tr>
<tr><td align="center">

[Ubiquiti Networks Unifi 802.11ac Pro](https://amzn.to/2mBSfE9)
</td><td align="center">

[Unifi Controller in the Cloud](https://hostifi.net/?via=carlo)
</td><td align="center">

[NetGear 16 Port unmanaged Switch](https://amzn.to/2GJwyIb)
</td><td align="center">

[Circle by Disney](https://mbsy.co/circlemedia/41927098)</td></tr>
<tr><td align="center"><a href="https://www.amazon.com/Ubiquiti-Networks-802-11ac-Dual-Radio-UAP-AC-PRO-US/dp/B015PRO512/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1519453280&sr=1-1&keywords=unifi+ac+pro&linkCode=li1&tag=vmw0a-20&linkId=a51eb66ad64455d857f9b50cd7ffb796" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B015PRO512&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B015PRO512" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://hostifi.net/?via=carlo" target="_blank"><img src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/HostiFI_Ad_260x130.png"  height="150" border="0" alt="" style="border:none !important; margin:0px !important;"></a>
</td><td align="center"><a href="https://www.amazon.com/NETGEAR-Ethernet-Unmanaged-Lifetime-Protection/dp/B01AX8XHRQ/ref=as_li_ss_il?ie=UTF8&qid=1519509807&sr=8-3&keywords=16+port+gigabit+switch&th=1&linkCode=li1&tag=vmw0a-20&linkId=63c057df0c463d473e2466490e93f5a8" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01AX8XHRQ&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01AX8XHRQ" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Circle-Disney-Parental-Controls-Connected/dp/B019RC1EI8/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1519453110&sr=1-1-spons&keywords=circle+disney&psc=1&linkCode=li2&tag=vmw0a-20&linkId=8bfecf20fdfee716f0e0c43a2f4becbd" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B019RC1EI8&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B019RC1EI8" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

Using the APs (3 of them), The house monitors all Connected devices for Online/Offline status and uses '' for presence detection.  Any critical device down for more than 5 minutes and an alert is sent out. Circle is a Parental Control device.  When a new device is discovered on the network, HA notifies us and also plays a TTS reminder over the speakers to classify in Circle.  Most things are Wifi connected but a good gigabit switch is needed for a good foundation.

<details>
  <summary>Tips to avoid WiFi Interference with your APs</summary><p align="center">

[![Using WiFi Analyzer to Pick Channels](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Using%20WiFi%20Analyzer%20to%20Pick%20Channels.jpeg)](https://youtu.be/vIj77givKrU "How to Fix WiFi interference with WiFi Analyzer")

</details>
</td></tr>

<tr><td colspan="4">

#### Alexa Echo Devices - [Alexa Device Blog Post](https://www.vCloudInfo.com/2017/09/new-alexa-goodies-announced.html)<a name="alexa" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[Amazon Echo](https://amzn.to/2dSVbK4)
</td><td align="center">

[Amazon Echo DOT](https://amzn.to/2e3vHFQ)
</td><td align="center">

[Amazon Echo Tap](https://amzn.to/2sz891k)
</td><td align="center">

[Amazon Dash Wand](https://www.amazon.com/Amazon-Dash-Wand-With-Alexa/dp/B01MQMJFDK/ref=sr_1_1_a_it?ie=UTF8&qid=1498928735&sr=8-1&keywords=dash+wand)
</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/dp/B06XCM9LJ4/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=75fd6d904f7f8f9fadc5df5f58885070" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B06XCM9LJ4&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B06XCM9LJ4" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/dp/B01DFKC2SO/ref=as_li_ss_il?pf_rd_m=ATVPDKIKX0DER&pf_rd_p=3513574162&pd_rd_wg=GV26W&pf_rd_r=BF6FZAN507DHV9T9NH7N&pf_rd_s=desktop-rhs-carousels&pf_rd_t=301&pd_rd_i=B01DFKC2SO&pd_rd_w=B5QwO&pf_rd_i=echo+wand&pd_rd_r=43a86d85-1a06-44dc-8687-19f8ecdcb3f0&ie=UTF8&qid=1519494311&sr=1&linkCode=li1&tag=vmw0a-20&linkId=63be4bb6452239422fb0434d837aebb0" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01DFKC2SO&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01DFKC2SO" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Amazon-Tap-Portable-Wireless-Bluetooth-Speaker-with-WiFi-Alexa/dp/B01BH83OOM/ref=as_li_ss_il?s=amazon-devices&ie=UTF8&qid=1519494386&sr=1-1&keywords=tap&linkCode=li1&tag=vmw0a-20&linkId=aa78f9e75ac6ba9569323d5ab0f890b0" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01BH83OOM&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01BH83OOM" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Amazon-Dash-Wand-With-Alexa/dp/B01MQMJFDK/ref=sr_1_1_a_it?ie=UTF8&qid=1498928735&sr=8-1&keywords=dash+wand" target="_blank"><img border="0" src="https://images-na.ssl-images-amazon.com/images/I/41YvRl%2B4zXL.jpg" height="110" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B019RC1EI8" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>

<tr><td colspan="4">

The Alexa devices in my house are for automation overrides.  They are primarily an input device into Home Assistant.  Using HA `Cloud` component, I am able to turn on /off most HA devices even if they don't have native Alexa support.  The DOTs are littered around the house, the Tap is for Shower and Garage since it is super portable and the main echo fills the upstairs with Music.  Voice input and playing [Whole House Music](https://www.vCloudInfo.com/2017/08/multi-room-audio-for-echo-its-finally.html) are where Echoes excel!  The Wand is pool side for quick commands and controlling the music if need be.
<details>
  <summary>Ability to ask Alexa to repeat the last Voice notification - 'Alexa, Turn on Last message'.</summary><p align="center">
  <a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/packages/triggers/last_message.yaml>
  Last Message Package - /config/packages/triggers/last_message.yaml</a><br>
<p></details>
<details>
<summary>Guest mode to disable certain interior automations. Trigger via Alexa. 'Alexa, Turn on Guest Mode.'</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/input_boolean/home_modes.yaml#L1-L4>
Defining Guest Mode - /config/input_boolean/home_modes.yaml#L1-L4</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/speech_engine.yaml#L26-L28>
Using Guest mode as a condition - /config/script/speech_engine.yaml#L26-L28</a><br>
<p></details>
<details>
<summary>Track garbage days and chore days for the kids. Voice reminders and Alexa intergration/request for info.'</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/input_boolean/hidden_booleans.yaml#L5-L7>
Defining responsibilities trigger - /config/input_boolean/hidden_booleans.yaml#L5-L7</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/speech_engine.yaml#L56-L68>
Responsibility Speech Code - /config/script/speech_engine.yaml#L56-L68</a><br>
<p></details>
<details>
<summary>Context aware lighting control.</summary><p align="center">
<a href=https://www.vCloudInfo.com/2017/10/speak-naturally-to-your-alexa-context.html>
Read about it here on vCloudInfo.com</a><br>
<p></details>
<details>
<summary>View the Alexa related videos on the vCloudInfo Youtube Channel.</summary><p align="center">
<a href=https://www.youtube.com/playlist?list=PLlOJRJVOmoe7HhertwlAb-kTIvHtRaB-h>
Be sure to Like and Subscribe if you enjoy this type of content.</a><br>
<p></details>

</td></tr>

<tr><td colspan="4">

#### Mobile Devices and Tablets - [FloorPlan Blog post](https://www.vCloudInfo.com/2017/07/visualizing-smart-home-using-home.html)<a name="mobiledevices" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[iPads](https://amzn.to/2l2qyRb)
</td><td align="center">

[iPhones](https://amzn.to/2P5RCz8)
</td><td align="center">

[Dash Buttons](https://youtu.be/rwQVe6sIi9w)
</td><td align="center">

[Amazon Fire Tablets Gen 7](https://amzn.to/2tqlMCW)</td></tr>
<tr><td align="center"><a href="https://www.amazon.com/Apple-MH182LL-9-7-Inch-Retina-Display/dp/B00OTWPEBK/ref=as_li_ss_il?s=pc&rps=1&ie=UTF8&qid=1487044765&sr=1-3&keywords=ipad&refinements=p_89:Apple,p_85:2470955011,p_n_condition-type:2224371011&linkCode=li1&tag=vmw0a-20&linkId=d4e62510b64106355f3788ea04bff8a0" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00OTWPEBK&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00OTWPEBK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://amzn.to/2P5RCz8" target="_blank"><img border="0" src="https://www.amazon.com/images/I/81Maog-libL._AC_UY218_.jpg" height="150" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B00YD54J8W" width="1" height="1" border="0" alt="Dash Button Video" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://youtu.be/rwQVe6sIi9w" target="_blank"><img border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/episodes/S02E09.png" width="200" height="150"></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01LBT5R4C" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center" colspan="2"><a href="https://www.vCloudInfo.com/2017/08/project-update-visualization-of-home.html" target="_blank"><img border="0" src="https://lh3.googleusercontent.com/-UdtxP-RNPxM/WZNRjcEJ6hI/AAAAAAADYfY/Vum9wiL5qYAO3frTAi2MdqK1vH6qBTb9gCHMYCw/image3_thumb%255B2%255D?imgmax=200" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01GEW27DA" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

Mobile devices are a critical part of my Home Automation.  They establish presence in the house and are the basis for many automations.  Home? Turn on the lights.  Leave? Turn them all off kind of thing. We use [NMAP](https://github.com/CCOSTAN/Home-AssistantConfig/tree/master/config/device_tracker) for presence detection.
<details>
<summary>IOS Notifications for Offline Devices, BadLogins, HA Startups, new HA versions and IP Changes for DNS.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/System/ip_change.yaml>
External IP changes - /config/automation/System/ip_change.yaml</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/packages/network.yaml>
Network Monitor package - /config/packages/network.yaml</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/away.yaml>
Away triggers -/config/automation/away.yaml</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/interior_off.yaml>
Shut interior script -/config/script/interior_off.yaml</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/late_night_helper.yaml>
Late night Helper Automation -/config/automation/late_night_helper.yaml</a><br>
</details>
<details>
<summary>Reminders to take my medicine sent as IOS notifications ONLY when I arrive back home for the night.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/packages/ios.yaml>
IOS Package - /config/packages/ios.yaml</a><br>
</details>
<p><br>
The Tablets are for the awesome FloorPlan that you see in the images.  We have 2 in the house mounted for quick consumption of all the HA data in a glance.  We also leverage them as TTS endpoints.  During certain times of the day, TTS is only played on the tablets rather than over the whole house.  Other times, Notifications are sent only to the Mobile Devices rather than using speech.</p>
<details>
<summary>Custom Component Fire Tablet Media Player</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/tree/master/config/custom_components/media_player>
Kiosk TTS Custom component - /config/custom_components/media_player</a><br>
</details>
</td></tr>

<tr><td colspan="4">

#### Nest Products and SleepIQ - [Thermostat Basics Blog post](https://www.vCloudInfo.com/2018/02/smart-home-basics-thermostats.html)<a name="nest" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[Nest Thermostats](https://amzn.to/2eAhB1k)
</td><td align="center">

[Nest Protects](https://amzn.to/2poqKhu)
</td><td align="center">

[SleepNumber Bed i8](https://amzn.to/2kxdXXI)
</td><td align="center">

[Withings](https://amzn.to/2kr78nW)</td></tr>
<tr><td align="center"><a href="https://www.amazon.com/gp/product/B0131RG6VK/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=cdcad716f0b691a5834b32f2a0cf6fa3" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0131RG6VK&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B0131RG6VK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Nest-Protect-smoke-carbon-monoxide/dp/B00XV1RD0K/ref=as_li_ss_il?s=hi&ie=UTF8&qid=1493663203&sr=1-1&keywords=nest+protect&linkCode=li1&tag=vmw0a-20&linkId=f0092afb267bf40d55e38596ea352e09" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00XV1RD0K&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00XV1RD0K" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Personal-Comfort-A8-Bed-Number/dp/B00CHSOZZO/ref=as_li_ss_il?ie=UTF8&qid=1486673583&sr=8-3&keywords=sleep+number+bed+i8&linkCode=li1&tag=vmw0a-20&linkId=f1f1d759913d1767734a12c7cddeaa32" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00CHSOZZO&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00CHSOZZO" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Withings-Body-Composition-Wi-Fi-Scale/dp/B01F3LJ2RW/ref=as_li_ss_il?ie=UTF8&qid=1486665271&sr=8-2&keywords=withings+scale&th=1&linkCode=li1&tag=vmw0a-20&linkId=6e239a882226db5a94b4194249d13d2f" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01F3LJ2RW&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01F3LJ2RW" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

This group of devices is basically for additional presence control.  The Nest thermostats and Protects basically run themselves.  The thermostat 'away' mode triggers my away scripts which turn items off.  The Protects are SOLID [smoke detectors](https://www.vCloudInfo.com/2017/06/psa-check-out-your-smoke-detectors-once.html).  They really came in handy during [Irma](https://www.vCloudInfo.com/2017/09/smart-home-lessons-from-hurricane-irma.html).  The SleepIQ bed adds to my presence detection.  It will notify HA if either side of the bed is occupied.  More controls are coming but I use this extensively. The WiThings scale also triggers morning and goodnight routines depending on when I step on it during the day.
<details>
<summary>Turn off lights when Nest Thermostats detects we are away. (Upstairs and Downstairs)</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/away.yaml#L7-L9>
Away scripting - /config/automation/away.yaml#L7-L9</a><br>
</details>
<details>
<summary>Turn on Upstairs lights if Nest Thermostats detects people and it's nighttime.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/upstairs_motion_ifttt.yaml#L3-L20>
Upstairs Automation - /config/automation/upstairs_motion_ifttt.yaml</a><br>
</details>
<details>
<summary>(IFTTT) Trigger Good Night routine when I step on the Withings scale after 10pm.</summary><p align="center">
<a href=https://amzn.to/2CZNMyK>
WiThings Scale</a><br>
</details>
<details>
<summary>Turn on bathroom accent lights when either of us steps out of bed at night. Turns them back off when we are back in bed.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/master_bath_accents.yaml>
Master Bath Automation - /config/automation/master_bath_accents.yaml</a><br>
</details>
<details>
<summary>Turn off all interior lights when the last person gets into bed.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/good_night.yaml#L11-L15>
Good night Automation - /config/automation/good_night.yaml</a><br>
</details>
<details>
<summary>Silence all Voice notifications if anyone is in bed.  Redirect to Fire Tablets.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/Timed_Triggers/2200.yaml>
Timed AMP turnoff Automation - /config/automation/Timed_Triggers/2200.yaml</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/amp_settings.yaml>
AMP redirect script - /config/script/amp_settings.yam</a><br>
</details>

</td></tr>

<tr><td colspan="4">

#### Voice Notifications - [Giving Voice to the Smart Home Blog Post](https://www.vCloudInfo.com/2017/07/giving-voice-to-smart-home.html)<a name="voice" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[ChromeCast Audios](https://amzn.to/2EO8Gqt)
</td><td align="center">

[AMPs](https://amzn.to/2j18dlT)
</td><td align="center">

[Mixer](https://amzn.to/2v9Zp3x)
</td><td align="center">

[TP-Link Smart Plug](https://amzn.to/2zF5msP)</td></tr>

<tr><td align="center"><a href="https://amzn.to/2EO8Gqt" target="_blank"><img border="0" src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/4532/4532100_sd.jpg;maxHeight=110;maxWidth=110" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B0131RG6VK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Kinter-MA-180-Computer-Amplifier-Charging/dp/B006AMF2R8/ref=as_li_ss_il?_encoding=UTF8&pd_rd_i=B006AMF2R8&pd_rd_r=7YM4TST4HMXQK46KH4F6&pd_rd_w=v8lnG&pd_rd_wg=QJNYk&psc=1&refRID=7YM4TST4HMXQK46KH4F6&linkCode=li1&tag=vmw0a-20&linkId=0620a70d225103fcbce65b56d3c60304" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B006AMF2R8&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B006AMF2R8" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/gp/product/B0002BG2S6/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li1&tag=vmw0a-20&linkId=661b1661a02cc502753e56f7062754c4" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0002BG2S6&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B0002BG2S6" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/TP-Link-HS100-Required-Google-Assistant/dp/B0178IC734/ref=as_li_ss_il?ac_md=0-0-aHMxMDA=-ac_d_rm&keywords=HS100&pd_rd_i=B0178IC734&pd_rd_r=3e0cf386-7879-4383-bab1-a842746ee724&pd_rd_w=SR8qM&pd_rd_wg=2uLFe&pf_rd_p=404c4843-2c96-4d0d-a5fe-2b0598693e61&pf_rd_r=6WZ3KGN3EJ9B23GC84JS&qid=1567261967&s=gateway&linkCode=li2&tag=vmw0a-20&linkId=9a49bb07f7e1c0391b7a052fcdc52226&language=en_US" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0178IC734&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20&language=en_US" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&language=en_US&l=li2&o=1&a=B0178IC734" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

To me, Voice is the coolest part of the smart home.  It gives it personality.  It's something not just anyone has and helps your house stand apart from the pack.  I use the [Amazon Polly TTS](https://www.home-assistant.io/integrations/tts/) component since it sounds the closest to Alexa.  This gives a seemless transition from Alexa to Home Assistant responding.  Most think it is just one system.  The mixer allows TTS to mix right in over Music.  The TP-Link Outlet  is used to turn off the Mixer and AMP when we do not need it.  It's a great inexpensive solution.
<details>
<summary>Turn off all the voice devices when we are not home or in bed.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/away.yaml>
Away Automation - /config/automation/away.yaml</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/good_night.yaml>
Good Night Automation - /config/automation/good_night.yaml</a><br>
</details><details>
<summary>All voice notifications are pushed though a speech engine.  Random words and sentences are used to give the house some personality.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/speech_engine.yaml>
Speech Engine - /config/script/speech_engine.yaml</a><br>
</details><details>
<summary>Voice announcements whenever someone comes home.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/Speech/announcements.yaml>
People Greeter - /config/automation/Speech/announcements.yaml</a><br>
</details><details>
<summary>Voice notifications for all sorts of things related to the house. (Temps, presence, doors open, windows open, garage door statuses, sunset.)</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/speech_engine.yaml>
Speech Macros are called by automation scripts - /script/speech_engine.yaml</a><br>
</details><details>
<summary>Digital Cuckoo Clock that goes off each hour and on the half just like a real Cuckoo Clock.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/System/CucKoo_Clock.yaml>
Cuckoo Clock - /config/automation/System/CucKoo_Clock.yaml</a><br>
</details>
<details>
<summary>Click here for YouTube Videos related to Voice.</summary><p align="center">

[![Breaking down my Home Assistant Volume Control](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Breaking%20down%20my%20Home%20Assistant%20Volume%20Control.jpeg)](https://youtu.be/f65fanwU3Ig "Breaking down my Home Assistant Volume Control")

</details><br>

Once you can teach your house to talk, you just keep expanding on its vocabulary. It's addicting. :)
</td></tr>

<tr><td colspan="4">

#### Various Hubs - [Smart Home Parts/Sum Blog Post](https://www.vCloudInfo.com/2017/07/my-smart-home-look-at-parts-that-make.html)<a name="hubs" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[Philips Hue Hub Gen 2](https://amzn.to/2eoQTJy)
</td><td align="center">

[Wink Hub](https://amzn.to/2orGEWo)
</td><td align="center">

[RM Pro by Broadlink](https://amzn.to/2z6IZtH)
</td><td align="center">

[Philips Hue Hub Gen 1](https://amzn.to/2kTmUdd)</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/gp/product/B016H0QZ7I/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=234a9104238b7189c169a7623239653c" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B016H0QZ7I&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B016H0QZ7I" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Wink-PWHUB-WH18-Connected-Home-Hub/dp/B00PV6GAI4/ref=as_li_ss_il?s=hi&ie=UTF8&qid=1492110362&sr=1-2&keywords=wink+hub&linkCode=li1&tag=vmw0a-20&linkId=96b7546e6151c2005994454bd51d8c47" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00PV6GAI4&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00PV6GAI4" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/BroadLink-Automation-Universal-Compatible-Smartphones/dp/B0742CXGHY/ref=as_li_ss_il?ie=UTF8&qid=1513802853&sr=8-1-spons&keywords=rm+pro&psc=1&linkCode=li1&tag=vmw0a-20&linkId=ffaddc7ae224eefefc32e0c8f27dce72" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0742CXGHY&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B0742CXGHY" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Philips-Ambiance-Generation-Starter-Assistant/dp/B00HJY2RGU/ref=as_li_ss_il?ie=UTF8&qid=1528397528&sr=8-4-fkmr1&keywords=hue+hub+gen+1&linkCode=li2&tag=vmw0a-20&linkId=1b2a76c5666773f0eedd61c730ef727f" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00HJY2RGU&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B00HJY2RGU" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

The Hubs help the home communicate across all the various protocols running in the house.  The Hue hubs (I have 2 actually) talk to most of the lights. The Gen 1 handles upstairs and outside and the gen 2 handles everything else. Some lights and switches talk over Zwave to the Wink Hub.  The RM Pro talks 433Mhz to my EtekCity outlets.

<details>
<summary>Using <a href=https://amzn.to/2efNoBP>
Etekcity Outlets</a> to control accent lighting above kitchen cabinets and room cutouts.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/kitchen_lights_and_accents.yaml>
Kitchen Accents Automation - /config/automation/kitchen_lights_and_accents.yaml</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/master_bath_accents.yaml>
Master Bath Accents Automation - /config/automation/master_bath_accents.yaml</a><br>
</details><details>
<summary>Turn on Hallway light for no more than 20 minutes when Pantry door is opened.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/zwave_hallway_door_sensor.yaml>
Hallway Automation - /config/automation/zwave_hallway_door_sensor.yaml</a><br>
</details><details>
<summary>Detects when lights are turned on and adjusts them to correct brightness based on time of day.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/System/detect_and_adjust_lights.yaml>
Auto Light adjustment Automation - /config/automation/System/detect_and_adjust_lights.yaml</a><br>
</details>
<br>
Think of the Hubs each as bridges for HA to talk to various hardware around the house.
</td></tr>

<tr><td colspan="4">

#### Lights [Smart Home Parts/Sum Blog Post](https://www.vCloudInfo.com/2017/07/my-smart-home-look-at-parts-that-make.html)<a name="lights" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[Hue Colored lights](https://amzn.to/2l2viGK)
</td><td align="center">

[GE Link Lightbulbs](https://amzn.to/2GJ66i5)
</td><td align="center">

[Hue Go](https://amzn.to/2iB36Ii)
</td><td align="center">

[Hue Lightstrip](https://amzn.to/2JlIIgg)</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/Philips-464503-Generation-Richer-Android/dp/B01KJYSOHM/ref=as_li_ss_il?s=hi&ie=UTF8&qid=1487045409&sr=1-3&keywords=hue+a19&linkCode=li1&tag=vmw0a-20&linkId=a4c6acf8f2672a5ba341f731d377b724" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01KJYSOHM&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01KJYSOHM" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/GE-Starter-PLINK-SKIT-Wireless-Lighting/dp/B01GWF4RE6/ref=as_li_ss_il?ie=UTF8&qid=1519537605&sr=8-2-fkmr1&keywords=ge+link+bulb+br30&linkCode=li1&tag=vmw0a-20&linkId=b4e6f6acdca3db68322d0679fcc388b7" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01GWF4RE6&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01GWF4RE6" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Philips-Lighting-Works-Amazon-Alexa/dp/B014H2P53I/ref=as_li_ss_il?ie=UTF8&qid=1482862179&sr=8-1-spons&keywords=hue+go&psc=1&linkCode=li1&tag=vmw0a-20&linkId=4f9fd0d242273d079f661fa389b2eec1" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B014H2P53I&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B014H2P53I" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/dp/B0167H33DU/ref=as_li_ss_il?aaxitk=O-tBozX6m7QT-cGTToVINw&pd_rd_i=B0167H33DU&pf_rd_m=ATVPDKIKX0DER&pf_rd_p=5582544217303223519&pf_rd_s=desktop-sx-top-slot&pf_rd_t=301&pf_rd_i=hue+light+strips&hsa_cr_id=5773736320301&linkCode=li2&tag=vmw0a-20&linkId=89e75647efe2b339c16dc5524028b66c" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0167H33DU&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B0167H33DU" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

Almost all my lights (40+) are white GE Link lights.  I bought them early on before Hue came out with inexpensive white A19s.  Even Ikea has great lights now.  Colored lights are in the front sconces and also used in the living room.  The Go lights are specifically for the kids since they are both wireless and also have a button on them making them very tactile for kids.  I use the Lightstrips for TV backlighting and also couch accent lighting.
<details>
<summary>Turn on TV Time Lights (dim and color) at Sunset (if home and TV is on)</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/tv_time_on_and_off.yaml>
TV Time Automations - /config/automation/tv_time_on_and_off.yaml</a><br>
</details><details>
<summary>Sets up the front lights in the house with preset colors depending on the ~~month~~ day!.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/monthly_color_scene.yaml>
Holiday Lights Script - /config/script/monthly_color_scene.yaml</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/scene/monthly_colors.yaml>
Holiday Lights Scenes - /config/scene/monthly_colors.yam</a><br>
</details><details>
https://www.vmwareinfo.com/2017/08/diy-outdoor-smart-home-led-strips.html
<summary>Turns living room lights `red` when a Window or Door is opened past sunset.  Resets to `yellow/gold` when all doors/windows are closed.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/packages/alarm.yaml#L289-L299>
DIY Alarm package - /config/packages/alarm.yaml</a><br>
</details>
<details>
<summary>Two part series on replacing a fluorescent light with a Hue Smart Light - Step by Step</summary>

[![Part 1 - Adding to the Hue Bridges](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Part%201%20-%20Adding%20to%20the%20Hue%20Bridges.jpeg)](https://youtu.be/Q0KUu20w71s "Part 1 - Adding to the Hue Bridges")

[![Part 2 - Adding to Automations](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Part%202%20-%20Adding%20to%20Automations.jpeg)](https://youtu.be/lyjRHYKkG98 "Part 2 - Adding to Automations")

</details>
<details>
<summary>Click here for YouTube Demos of the Holiday lights</summary>

[![Valentine's Day Video](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Valentine's%20Day%20Video.jpeg)](https://youtu.be/nsWq4uVrQ0g "Valentine's Day Video")

[![Halloween Light Video](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Halloween%20Light%20Video.jpeg)](https://youtu.be/ylPzQ0s7zxc "Halloween Light Video")

</details>
</td></tr>

<tr><td colspan="4">

#### Switches <a name="switches" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[Noon Switches](https://amzn.to/2J9aGeu)
</td><td align="center">

[Nunet Smart Plug](https://amzn.to/2PDBNNK)
</td><td align="center">

[Switches Get Stitches](https://amzn.to/2HXSx2M)
</td><td align="center">

[Etekcity Outlets](https://amzn.to/2efNoBP)</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/Noon-N160US-Smart-Lighting-Starter/dp/B076FJLRNL/ref=as_li_ss_il?ie=UTF8&qid=1527451258&sr=8-1&keywords=noon&linkCode=li2&tag=vmw0a-20&linkId=07f55d3dde28ba1db77510257e4d13e8" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B076FJLRNL&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B076FJLRNL" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/NUNET-Monitor-Required-Appliances-Functiant/dp/B079H66QW6/ref=as_li_ss_il?ie=UTF8&qid=1544832863&sr=8-3&keywords=nunet+smart+wifi+plug&linkCode=li2&tag=vmw0a-20&linkId=64ae44a0cfc451fb7b64428935c3cbee&language=en_US" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B079H66QW6&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20&language=en_US" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&language=en_US&l=li2&o=1&a=B079H66QW6" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://amzn.to/2HXSx2M" target="_blank"><img src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/switchesTee_gray.png" height="150" border="0" alt="" style="border:none !important; margin:0px !important;"></a>
</td><td align="center"><a href="https://www.amazon.com/gp/product/B00DQELHBS/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=2d11a4b4ee3994189b3136c3b5726e37" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00DQELHBS&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00DQELHBS" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

In the Master Bedroom and Bathroom, I have deployed a starter set of 5 Noon Switches.  These switches control the toilet light, both vanities and bedroom overhead light.  They work on the wall and are also IFTTT compatible.  The EtekCity outlets are the most inexpensive ($6) yet reliable outlets out there.  I have them deployed all over the house as accent lighting with some rope lights in most of the home's cut outs.
<details>
<summary>When interior light script is triggered, IFTTT is notified to turn off the Bathroom Noon switches.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/interior_off.yaml#L17-L18>
Interior Turn off Script - /config/script/interior_off.yaml</a><br>
</details>
<details>
<summary>I've taken the Smart plugs and put them in a weatherproof case for holiday lights</summary><p align="center">
<a href=https://www.vcloudinfo.com/2018/12/how-to-waterproof-your-outdoor-smart.html>
Full write up and blog post</a><br>
</details>
</td></tr>

<tr><td colspan="4">

#### Security <a name="security" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[NodeMCU Development Boards](https://amzn.to/2ou0NON)
</td><td align="center">

[Aura Home Monitoring Motion Alarm](https://amzn.to/2sLX8v6)
</td><td align="center">

[Hue Go](https://amzn.to/2iB36Ii)
</td><td align="center">

[Fake Dog](https://amzn.to/2CMo1lr)</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/gp/product/B010O1G1ES/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li1&tag=vmw0a-20&linkId=8f30ebb6868e9060be331dd297b75119" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B010O1G1ES&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B010O1G1ES" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/dp/B0765HSPB6/ref=as_li_ss_il?_encoding=UTF8&th=1&linkCode=li2&tag=vmw0a-20&linkId=f12d53d66cfe46b18710d985a9f4d883" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0765HSPB6&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B0765HSPB6" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Philips-Lighting-Works-Amazon-Alexa/dp/B014H2P53I/ref=as_li_ss_il?ie=UTF8&qid=1482862179&sr=8-1-spons&keywords=hue+go&psc=1&linkCode=li1&tag=vmw0a-20&linkId=4f9fd0d242273d079f661fa389b2eec1" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B014H2P53I&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B014H2P53I" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Magnet-America-Bull-Mastiff/dp/B005MZVBYW/ref=as_li_ss_il?s=amazon-devices&ie=UTF8&qid=1519875291&sr=8-11&keywords=bull+mastiff&linkCode=li1&tag=vmw0a-20&linkId=ee6fdeb91ac2a4aa0e77ba673c1def4b" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B005MZVBYW&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B005MZVBYW" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

The ESPs while technically not a Hub do bridge the connection to all the windows and door sensors that are hardwired in my house.  One set acts as my [DIY alarm system](https://www.vCloudInfo.com/2017/06/building-my-home-alarm-system-hardware.html) while the other act as [DIY Motion Sensors](https://www.vCloudInfo.com/2017/11/yet-another-inexpensive-motion-sensor.html).  The Aura system uses Wifi waves to detect motion through walls.  It covers the entire house.  Scenes are activated via IFTTT/HA integration. When all else fails though, a good recording of a Bull Mastiff is sure to do the trick!
<details>
<summary>Shut down HVAC system if a Window or Door is left open for more than 5 minutes.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/packages/alarm.yaml#L209>
HVAC Watchdog Automation - /config/packages/alarm.yaml#L209</a><br>
</details><details>
<summary>Play chime on all window and door open/closes.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/System/door_chime.yaml>
Door Chime Automation - /config/automation/System/door_chime.yaml</a><br>
</details>
<details>
<summary>Change Aura scenes based on presence and sleep.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/packages/aurahome.yaml>
Aura Package - /config/packages/aurahome.yaml</a><br>
</details>
</td></tr>

<tr><td colspan="4">

#### Cameras <a name="cameras" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[SkyBell HD](https://amzn.to/2dcexIB)
</td><td align="center">

[Foscam 1080p Outdoor Camera](https://amzn.to/2ExKrMe)
</td><td align="center">

[Surveillance Drives](https://amzn.to/2G3iBEF)
</td><td align="center">

[Meraki MS220 8 port PoE switch](https://amzn.to/2LsdyAv)
</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/gp/product/B01IAB9ZME/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=15e34e628e5538b1ebc1babd1273e055" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01IAB9ZME&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01IAB9ZME" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Foscam-Security-Real-time-Optional-Available/dp/B074JKSWRG/ref=as_li_ss_il?_encoding=UTF8&pd_rd_i=B074JKSWRG&pd_rd_r=GRPPAA4VDE1Y7WX33ZZY&pd_rd_w=q3jUI&pd_rd_wg=yLL8z&psc=1&refRID=GRPPAA4VDE1Y7WX33ZZY&dpID=41fpF9wDdUL&preST=_SY300_QL70_&dpSrc=detail&linkCode=li1&tag=vmw0a-20&linkId=ab255f7f9dd51e7cebf9a35fb17aff37" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B074JKSWRG&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B074JKSWRG" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Purple-Surveillance-Hard-Disk-Drive/dp/B071KVB4F8/ref=as_li_ss_il?_encoding=UTF8&pd_rd_i=B071KVB4F8&pd_rd_r=DWVV1KCN076E00JJ0PAF&pd_rd_w=lJDs2&pd_rd_wg=kPV6t&refRID=DWVV1KCN076E00JJ0PAF&dpID=41Sx3aSPsFL&preST=_SY300_QL70_&dpSrc=detail&th=1&linkCode=li1&tag=vmw0a-20&linkId=604b42004480db7749802c9ed69f7564" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B071KVB4F8&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B071KVB4F8" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Meraki-Cloud-Managed-Gigabit-Switch/dp/B00FKV86U0/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1528398267&sr=1-3&keywords=meraki+poe+8+port&linkCode=li2&tag=vmw0a-20&linkId=2c2185cee1ba2dedd6a5f0c775374a26" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00FKV86U0&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B00FKV86U0" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td></tr>
<tr><td colspan="4">

Cameras are both for security and data sensors.  They can trigger motion events, lighting conditions or for doorbells, when someone presses it. Cameras and Access points are feed power via the Meraki PoE switch.

<details>
<summary>On motion from Doorbell turns front lights to Bright White lights for 10 minutes and then back to original colors.  Fake Dog barking when there is motion by the house.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/skybell_pressed.yaml>
Skybell HD script - /config/script/skybell_pressed.yaml</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/guard_dog.yaml>
Dog Bark script - /config/automation/guard_dog.yaml</a><br>
</details>
<details>
<summary>When someone rings the Doorbell, the backyard and Bathroom lights Flash - Since we might not hear the doorbell. Fake Dog barks as well (which can be snoozed for 30 minutes via Alexa).</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/skybell_pressed.yaml>
Skybell HD script - /config/script/skybell_pressed.yaml</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/guard_dog.yaml>
Dog Bark script - /config/automation/guard_dog.yaml</a><br>
</details>
</td></tr>

<tr><td colspan="4">

#### Outdoor Landscaping <a name="landscaping" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[Rachio Sprinkler system](https://amzn.to/2eoPKBW)
</td><td align="center">

[GE ZWave Outdoor Power Module](https://amzn.to/2q17R4S)
</td><td align="center">

[Teckin SS31 Outdoor Outlets](https://amzn.to/31oNhuK)
</td><td align="center">

<!-- [Phyn Smart Water Main ShutOff/Leak Detector](https://phyn.refr.cc/carlocostanzo)
</td><td align="center"> -->

[Outdoor LED Lighting](https://www.vCloudInfo.com/2017/08/diy-outdoor-smart-home-led-strips.html)
</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/gp/product/B01D1NMLJU/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=32eaaee1a47e3f0841694b2f65b33f20" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01D1NMLJU&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01D1NMLJU" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/GE-Wireless-Lighting-Control-12720/dp/B0013V8K3O/ref=as_li_ss_il?ie=UTF8&qid=1494360163&sr=8-1&keywords=ge+zwave+outdoor&linkCode=li1&tag=vmw0a-20&linkId=14fea62a5ea952ae7e575d3ec9f83d8f" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0013V8K3O&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B0013V8K3O" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td>

<td align="center"><a href="https://www.amazon.com/TECKIN-Compatible-Smartphone-Weatherproof-certified/dp/B07KB63CYN/ref=as_li_ss_il?keywords=ss31+teckin&qid=1565408841&s=gateway&sr=8-1&linkCode=li2&tag=vmw0a-20&linkId=ae630a57c97036a186e40660fb1022da&language=en_US" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07KB63CYN&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20&language=en_US" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&language=en_US&l=li2&o=1&a=B07KB63CYN" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td>

<!-- <td align="center"><a href="https://phyn.refr.cc/carlocostanzo" target="_blank"><img border="0" src="https://www.phyn.com/wp-content/uploads/2017/12/1920_01_product_intro-1.png" height="110" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B01HDC236Q" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td> -->

<td align="center"><a href="https://www.vCloudInfo.com/2017/08/diy-outdoor-smart-home-led-strips.html" target="_blank"><img border="0" src="https://lh3.googleusercontent.com/-RfNOR7YThbY/WZnY6Gjw4zI/AAAAAAADYrw/IxBE2KmxW9YuLMtj9qgxAWyb5vHdgSrBACHMYCw/IMG_2660_thumb%255B9%255D" height="110" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li2&o=1&a=B01HDC236Q" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr>
<tr><td colspan="4">

The great outdoors can be automated too!  Mainly lights but also the sprinkler system and water supply.  The Phyn leak detector was announced in CES.  It looks for abnormal flows and if senses them, alerts me and shuts water main.  The Teckin SS31 outlets are hooked up to my 12v transformers allowing me to turn the landscaping lights on and off.  The LED strips are DIY and the recipe is in the next section.

<details>
<summary>Click Here for YouTube Videos!</summary><p align="center">

[![Unboxing and setup of the Philips Hue Calla Landscape Lights](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Unboxing%20and%20setup%20of%20the%20Philips%20Hue%20Calla%20Landscape%20Lights.jpeg)](https://youtu.be/FcBVu_yk2iY "Unboxing and setup of the Philips Hue Calla Landscape Lights")

[![Adding Smart Landscaping lights to the Yard with Home Assistant](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Adding%20Smart%20Landscaping%20lights%20to%20the%20Yard%20with%20Home%20Assistant.jpeg)](https://youtu.be/Z673mYcKt70 "Adding Smart Landscaping lights to the Yard with Home Assistant")

</details>
<details>
<summary>(IFTTT) Add a 1 day rain delay to Rachio Sprinkler system if it is going to rain tomorrow also logged to MQTT.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/System/rachio_rain_delay.yaml>
Rain Delay Package - /config/automation/System/rachio_rain_delay.yaml</a><br>
</details>
<details>
<summary>(IFTTT) Blink ALL lights if Winds get to 70MPH - Hurricane warning.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/flash_all.yaml>
Flash Light automation - /config/automation/flash_all.yaml</a><br>
</details>
<details>
<summary>Turn on some outdoor Lights at Sunset, Turn off 4 hours before sunrise.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/Timed_Triggers/sunset_turn_on.yaml>
Sunset automation - /config/automation/Timed_Triggers/sunset_turn_on.yaml</a><br>
</details>
<details>
<summary>Turn off interior and backyardlights when we go to sleep.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/good_night.yaml>
Good Night automation - /config/automation/good_night.yaml</a><br>
</details>
</td></tr>
<tr><td colspan="4">

#### Outdoor LED Accents <a name="LED" href="https://github.com/CCOSTAN/Home-AssistantConfig#LED"> - [DIY Blog Post](https://www.vCloudInfo.com/2017/08/diy-outdoor-smart-home-led-strips.html) - [#71](https://github.com/CCOSTAN/Home-AssistantConfig/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc/71)<a name="LED" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[LED RGB Wifi Controller - flux_led compatible](https://amzn.to/2jUBSBE)
</td><td align="center">

[LED Strip kits](https://amzn.to/2gJYfZ5)
</td><td align="center">

[Aluminum light Diffusers](https://amzn.to/2CIId82)
</td><td align="center">

[Outdoor Housing](https://amzn.to/2m2dG0X)
</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/SUPERNIGHT-Wireless-Controller-Working-Android/dp/B01JZ2SI6Q/ref=as_li_ss_il?_encoding=UTF8&psc=1&refRID=FX6BGFGVPYK6254PKDX6&linkCode=li1&tag=vmw0a-20&linkId=ac3510bace93a5f1c88e3e8b3f1e2b70" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01JZ2SI6Q&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01JZ2SI6Q" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/gp/product/B01CUILC3I/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li1&tag=vmw0a-20&linkId=d57407e3dcacf7ce8c6df2b8ae652492" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01CUILC3I&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01CUILC3I" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/JIRVY-Aluminum-Installation-Diffuser-Mounting/dp/B01JZ5STLC/ref=as_li_ss_il?ie=UTF8&qid=1519665434&sr=8-5&keywords=led+strip+light+diffusers&linkCode=li1&tag=vmw0a-20&linkId=25ae2cc71aee64f53fbe03b53bbd0d06" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01JZ5STLC&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01JZ5STLC" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/E984f-Car-Conduit-Body-1-Rigid/dp/B000HEHGRY/ref=as_li_ss_il?s=car&ie=UTF8&qid=1487638168&sr=8-1&keywords=1%22+LL+BODY&linkCode=li1&tag=vmw0a-20&linkId=fcd347cbeb753ac641f5ded9dada08e9" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B000HEHGRY&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B000HEHGRY" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td></tr>
<tr><td colspan="4">

Mentioned above, this is one of my favorite projects for the house.  The ability to completely change the look of the house on the drop of a dime and on a dime budget is awesome.  Read the blog post linked above for all the parts details but here are some automations I love.  You can also watch the following Video (https://www.vcloudinfo.com/2018/10/easy-smart-home-gadgets-i-use-for-my.html)

<details>
<summary>Change the front colors of the LED lights based on holidays.  The best part is the LED controller works with HA right out of the box.  No fiddling around with it at all.  HUGE Plus in my book.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/monthly_color_scene.yaml>
Holiday Lights Script - /config/script/monthly_color_scene.yaml</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/scene/monthly_colors.yaml>
Holiday Lights Scenes - /config/scene/monthly_colors.yam</a><br>
</details>
<details>
<summary>When the garage doors open, change all lights in the front of the house to bright white.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/garadget.yaml>
Garadget automations - /master/config/automation/garadget.yaml</a><br>
</details>
<details>
<summary>On motion, turn all the lights to a bright white outside for a random amount of time before resuming the daily color choice.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/front_house_motion.yaml>
Motion automations - /config/script/front_house_motion.yaml</a><br>
</details>
<details>
<summary>Click Here for YouTube Demos of the Holiday lights</summary>

[![Valentine's Day Video](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Valentine's%20Day%20Video.jpeg)](https://youtu.be/nsWq4uVrQ0g "Valentine's Day Video")

[![Halloween Light Video](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Halloween%20Light%20Video.jpeg)](https://youtu.be/ylPzQ0s7zxc "Halloween Light Video")

</details>
</td></tr>

<tr><td colspan="4">

#### Garage Gadgets <a name="garage" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[Garadget](https://amzn.to/2jQLpVQ)
</td><td align="center">

[JuiceBox Pro 40 EVSE](https://amzn.to/2AIdSdx)
</td><td align="center">

[Chevy Bolt Electric Car](https://amzn.to/2DRP83a)
</td><td align="center">

[Siri, are my garage doors closed?](https://www.vCloudInfo.com/2017/07/my-smart-home-look-at-parts-that-make.html)
</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/Garadget-Smart-Garage-Door-Controller/dp/B01KUZ2JPS/ref=as_li_ss_il?ie=UTF8&qid=1484586045&sr=8-1&keywords=garadget&linkCode=li1&tag=vmw0a-20&linkId=101764295722498f3480d5bde92dd462" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01KUZ2JPS&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01KUZ2JPS" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/JuiceBox-Pro-40-JuiceNet-WiFi-equipped/dp/B00UB9R4KO/ref=as_li_ss_il?ie=UTF8&qid=1513288386&sr=8-1&keywords=juicenet+pro&linkCode=li1&tag=vmw0a-20&linkId=ed6b7856822f7ab226362fb0ee6d6b98" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00UB9R4KO&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00UB9R4KO" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.vcloudinfo.com/2018/01/going-green-to-save-some-green-in-2018.html" target="_blank"><img border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/bearstone_car.png" height="110" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B0749M3H4T" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.vCloudInfo.com/2017/07/my-smart-home-look-at-parts-that-make.html" target="_blank"><img border="0" src="https://pbs.twimg.com/media/C3cyJZSWAAAalPm.jpg:large" height="110" ></a>
</td></tr>
<tr><td colspan="4">

Garage doors, Cars, charging stations.  Going green.  All part of a complete home automation setup.  The garage door openers are probably the most important.  No one wants to forget that they left them open when they've left or gone to bed.  Closing forgotten garage doors makes it all worth it.

<details>
<summary>Notifications when the garage door is left open at night or when we leave the house.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/Speech/garage_closed.yaml>
Garage Speech Automations - /config/automation/Speech/garage_closed.yaml</a><br>
</details>
<details>
<summary>Videos and Write up on Garadget Garage Door Opener</summary><p align="center">
<a href=https://www.vcloudinfo.com/2019/03/how-to-add-garadget-to-home-assistant.html>
Garadget Garage Door Opener video and Write up</a><br>
</details>
<details>
<summary>Monitor the reflection rates of Garadget and notify when they being to drop too low when closed (indicating a shift in the controller)</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/garadget.yaml>
Garage reflection Automations - /config/automation/garadget.yaml</a><br>
</details>
<details>
<summary>Tweet out charging status of the car and how many KwH were charged in a session. #Stat</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/tweet.yaml>
Tweet Automations - /config/script/tweet.yaml</a><br>
</details>
<details>
<summary>Monitor AMPs and Voltage and alert if charge ever goes over 24A to prevent breaker tripping. (Juicebox is software derated to 24A on a 30A circuit.) Also restart Unit if unable to connect to eMotorWerks servers.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/packages/juicenet.yaml>
Juicebox package - /config/packages/juicenet.yaml</a><br>
</details>
</td></tr>

<tr><td colspan="4">

#### TVs and Streaming Devices <a name="TV" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[Samsung Smart TV](https://amzn.to/2efNNnq)
</td><td align="center">

[Rokus](https://amzn.to/2dpn89c)
</td><td align="center">

[Amazon Fire TV](https://amzn.to/2iiuaNT)
</td><td align="center">

[Synology NVR 1218](https://amzn.to/2COe9aU)
</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/gp/product/B01E69WHP6/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=79e660c2282e440c3c8b31d25b17a0e5" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01E69WHP6&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01E69WHP6" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/gp/product/B015YF5YIS/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=07825717389526f853834332ad3bb5db" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B015YF5YIS&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B015YF5YIS" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/gp/product/B00ZV9RDKK/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li1&tag=vmw0a-20&linkId=59fea2aad1b87b0227fc69a5617b620f" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00ZV9RDKK&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00ZV9RDKK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Synology-Network-Recorder-NVR1218-Diskless/dp/B075MVPNKF/ref=as_li_ss_il?ie=UTF8&qid=1519789547&sr=8-1&keywords=synology+nvr1218&linkCode=li1&tag=vmw0a-20&linkId=05131cd523a8ff0913446699a1e12ed9" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B075MVPNKF&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B075MVPNKF" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td></tr>
<tr><td colspan="4">

TV Automations are super cool.  Turn on a movie and the lights begin to dim automatically.  It's super cool.  Out TVs are back lit with [Hue Lightstrips](https://amzn.to/2FGbPpL) so we can do some pretty neat effects with automations.  We are #CordCutters as well so all out TV is streamed to the Rokus.  FireTV for party games and the Snyology, I'll talk about later in the Survellance section.

<details>
<summary>Click here for YouTube Video</summary><p align="center">

[![Cameras, Synology and Home Assistant](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Cameras,%20Synology%20and%20Home%20Assistant.jpeg)](https://youtu.be/GmpP52yG0S8 "Cameras, Synology and Home Assistant")

</details>
<details>
<summary>If any Doors or Windows are open, the TV backlights turn Red.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/packages/alarm.yaml>
Alarm package - /config/packages/alarm.yaml</a><br>
</details>
<details>
<summary>When the Roku reports we are watching Plex or TabloTV, TV Time scene is triggered dimming 2 of 4 living room lights.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/tv_time_on_and_off.yaml>
TV Time Automations - /config/automation/tv_time_on_and_off.yaml</a><br>
</details>
<details>
<summary>Rainy days trigger extra subtle light (TV back lights and other accent lighting) inside the house.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/dark_rainy_day.yaml>
Rainy Day Automations - /config/automation/dark_rainy_day.yaml</a><br>
</details>
</td></tr>

<tr><td colspan="4">

#### Sensors <a name="sensors" href="https://github.com/CCOSTAN/Home-AssistantConfig#devices"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>
</td></tr>
<tr><td align="center">

[Door Sensors (AEON Labs)](https://amzn.to/2e3xDxY)
</td><td align="center">

[Pi Zero](https://amzn.to/2ougZQ3)
</td><td align="center">

[Wireless Nub](https://amzn.to/2q38rg4)
</td><td align="center">

[Epson ET-7700 Printer](https://amzn.to/2HaiBUK)
</td></tr>

<tr><td align="center"><a href="https://www.amazon.com/gp/product/B01GK5D1PE/ref=as_li_ss_il?ie=UTF8&linkCode=li1&tag=vmw0a-20&linkId=0dd26a63d1c8b0c402febd3fb0e781b2" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01GK5D1PE&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01GK5D1PE" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Raspberry-Zero-v1-3-Development-Board/dp/B01L3IU6XS/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1493171499&sr=1-8&keywords=pi+zero&linkCode=li1&tag=vmw0a-20&linkId=c06f2374a5d545b83e94d1d6a585b941" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01L3IU6XS&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B01L3IU6XS" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/gp/product/B00GFAN498/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li1&tag=vmw0a-20&linkId=9e4d8bebb941539cdf3d7ccd9e47e54c" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00GFAN498&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B00GFAN498" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td><td align="center"><a href="https://www.amazon.com/Epson-Expression-Wireless-Supertank-Ethernet/dp/B074V4N9JM/ref=as_li_ss_il?s=office-products&ie=UTF8&qid=1518544601&sr=1-7&keywords=epson+ecotank+printer&linkCode=li1&tag=vmw0a-20&linkId=188ed765c4f960ee11a7c9155ecd039a" target="_blank"><img border="0" src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B074V4N9JM&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=vmw0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=vmw0a-20&l=li1&o=1&a=B074V4N9JM" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</td></tr>
<tr><td colspan="4">

Sensors add data to Home Assistant.  Most of my Doors and windows are hardwired but for some interior doors, I also have the wireless sensors.  They connect to my Wink Hub.  [PiHole](https://pi-hole.net/) is running on my PiZero.  It's super easy to install and runs DNS, DHCP and ad blocking for the whole house on a great little 5v form factor.

<details>
<summary>Tweet out daily Pi Hole stats. (Ads Blocked and % of bandwidth saved.)</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/packages/pihole.yaml>
Pi-Hole Package - /config/packages/pihole.yaml</a><br>
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/script/tweet.yaml>
Tweet script - /config/script/tweet.yaml</a><br>
<a href=https://www.vcloudinfo.com/2019/03/revisiting-the-pi-on-pi-day-with-home-assistant.html>
Blog Write Up - Pi Devices and Pi Hole</a><br>
</details>
<details>
<summary>Leverage Alexa and Elekcity outlet to control Printer On/Off via Voice. Turns off automatically after 20 minutes.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/System/watchdog_light.yaml>
Light watchdog Automations - /config/automation/System/watchdog_light.yaml</a><br>
</details>
<details>
<summary>Click here for YouTube Videos!</summary><p align="center">

[![Epson XP-7100 Small-in-One wireless Printer review and Unboxing](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Epson%20XP-7100%20Small-in-One%20wireless%20Printer%20review%20and%20Unboxing.jpeg)](https://youtu.be/y2xgCQRwTJg "Epson XP-7100 Small-in-One wireless Printer review and Unboxing")

[![Home Assistant Raspberry Pi Day!](https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/youtube/Home%20Assistant%20Raspberry%20Pi%20Day.jpeg)](https://youtu.be/woA88DFlH5c "Home Assistant Raspberry Pi Day!")

</details>
<details>
<summary>Sound door chimes whenever doors open or close.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/automation/System/door_chime.yaml>
Door Chimes Automations - /config/automation/System/door_chime.yaml</a><br>
</details>
<details>
<summary>Watch and alert on Home Assistant's Disk usage and Pi Zero.</summary><p align="center">
<a href=https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/packages/processmonitor.yaml>
Process Monitor Package - /config/packages/processmonitor.yaml</a><br>
</details>
</td></tr>

</table>
</p>

### Todo List <a name="TODO" href="https://github.com/CCOSTAN/Home-AssistantConfig#logo"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a>

The [issues section](https://github.com/CCOSTAN/Home-AssistantConfig/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) on github is where I store all my wishful ideas and future enhancements.
Feel free to join the conversations there.
[![Screenshot of Alarm Clock View](https://i.imgur.com/mLMrky1.jpg)](https://www.vcloudinfo.com/2017/11/building-worlds-greatest-smart-alarm.html)
[![Screenshot of Alarm View](https://i.imgur.com/zmb3Rtn.png)](https://www.vcloudinfo.com/2017/07/visualizing-smart-home-using-home.html)

**All files are now being edited with [VSCode](https://code.visualstudio.com/).**

**Still have questions on my Config?** <br>
**Message me on twitter :** [![Follow CCostan](https://img.shields.io/twitter/follow/CCostan)](https://www.twitter.com/ccostan) or [![Follow Bear Stone Home](https://img.shields.io/twitter/follow/BearStoneHA)](https://www.twitter.com/BearStoneHA)

<p align="center">
<a target="_blank" href="https://www.buymeacoffee.com/vCloudInfo"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">You can buy me a coffee</span></a><a target="_blank" href="https://www.buymeacoffee.com/vCloudInfo"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"></a>
<br>
<a name="bottom" href="https://github.com/CCOSTAN/Home-AssistantConfig#logo"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="22" ></a><br>
<a href="https://eepurl.com/dmXFYz"><img align="center" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/email_link.png" height="50" ></a><br>
<a href="https://www.vCloudInfo.com/p/affiliate-disclosure.html">
Affiliate Disclosure
</a></p>
