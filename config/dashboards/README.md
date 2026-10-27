<h1 align="center">
  <a name="logo" href="https://www.vCloudInfo.com/tag/iot"><img src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/x_profile.png" alt="Bear Stone Smart Home" width="200"></a>
  <br>
  Bear Stone Smart Home Documentation
</h1>
<h4 align="center">Be sure to :star: my configuration repo so you can keep up to date on any daily progress!</h4>

<div align="center">

[![X Follow](https://img.shields.io/static/v1?label=talk&message=3k&color=blue&logo=twitter&style=for-the-badge)](https://x.com/ccostan)
[![YouTube Subscribe](https://img.shields.io/badge/VIEW-6.8K-FF0000?logo=Youtube&logoColor=%23DF5D44&style=for-the-badge)](https://www.youtube.com/vCloudInfo?sub_confirmation=1)
[![GitHub Stars](https://img.shields.io/github/stars/CCOSTAN/Home-AssistantConfig.svg?label=STARS&logo=github&style=for-the-badge)](https://github.com/CCOSTAN/Home-AssistantConfig/stargazers) <br>
[![HA Version Badge](https://raw.githubusercontent.com/ccostan/home-assistantconfig/master/ha-version-badge.svg)](https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/.HA_VERSION)
[![Last Commit](https://img.shields.io/github/last-commit/CCOSTAN/Home-AssistantConfig/master?style=plastic)](https://github.com/CCOSTAN/Home-AssistantConfig/commits/master)
[![Commit Activity](https://img.shields.io/github/commit-activity/y/CCOSTAN/Home-AssistantConfig.svg?style=plastic)](https://github.com/CCOSTAN/Home-AssistantConfig/commits/master)

</div>

<h1 align="center">
  Dashboards (Lovelace YAML)
</h1>

This folder holds YAML-managed Home Assistant Lovelace dashboards and UI resources.

Home, Mobile, and Systems show optional, unexpired appliance notices in a blue banner above their controls. Informational notices stay outside actionable issue counts and health warnings. The banner reuses existing live telemetry without additional sensors or history.

### Walkthrough
- Mobile quick-access video: [![Watch on YouTube](https://img.shields.io/badge/Watch-YouTube-FF0000?logo=youtube&logoColor=white)](https://youtu.be/ujP-zYLEso8)
- Mobile quick-access companion post: [![vCloudInfo Blog Post](https://img.shields.io/static/v1?label=vCloudInfo&message=Blog%20Post&color=21759B&logo=wordpress&logoColor=white)](https://www.vcloudinfo.com/2026/07/home-assistant-mobile-dashboard-big-buttons.html)
- Video: [![Watch on YouTube](https://img.shields.io/badge/Watch-YouTube-FF0000?logo=youtube&logoColor=white)](https://youtu.be/aFis2YPeSuY)
- Companion post: [![vCloudInfo Blog Post](https://img.shields.io/static/v1?label=vCloudInfo&message=Blog%20Post&color=21759B&logo=wordpress&logoColor=white)](https://www.vcloudinfo.com/2026/02/home-assistant-dashboard-design-system-button-card.html)
- Kiosk camera tablet video: [![Watch on YouTube](https://img.shields.io/badge/Watch-YouTube-FF0000?logo=youtube&logoColor=white)](https://youtu.be/ChgEu0IDWzc)

### Why this exists
- Home Assistant stores dashboards and resources in `config/.storage/` by default (runtime state).
- YAML dashboards make the UI version-controllable and editable by automation tools (including Codex).

### What is in here
- `resources.yaml`
  - Lovelace JS resources used by custom cards (HACS and local resources).
  - This is used when `lovelace.resource_mode: yaml` is enabled.
  - Card-mod is also preloaded through `frontend.extra_module_url` so nested kiosk cards receive their styles on cold loads. Keep both card-mod URLs identical and refresh their cache version together when the installed module changes.
- `SCRATCHPAD.md`
  - Parking lot for multi-step dashboard work and patterns.
- `<dashboard>/`
  - One folder per dashboard (example: `overview/`, `infrastructure/`, `kiosk/`).
  - `dashboard.yaml` is the dashboard entrypoint.
  - `views/` contains one YAML file per view.
  - `partials/` is reusable card lists included into views.
  - `popups/` is reusable standalone popup cards (typically `bubble-card`) included into views.
  - `card_mod/` is CSS overrides (use only when card-native options are insufficient).
- `shared/`
  - Cross-dashboard reuse only. If something is only used by one dashboard, keep it in that dashboard folder.

### Camera Timeline Playback

The Frigate Events Card keeps its event gallery and continuous-recording timeline. Its resource loads through `www/frigate-events-navigation.js`, which reuses `www/frigate-events-auth.js` to import the HACS card and sign the timeline manifest and MP4 fallback through Home Assistant. Frigate passes the manifest signature to the recording segments; native video playback also needs a signed URL. The adapters are scoped to this card and preserve the installed HACS bundle and direct Frigate URL behavior.

This bridges the unsigned timeline URLs in Frigate Events Card v2.5.23. Recheck playback after card upgrades and remove the adapter when upstream signs both timeline paths. The adapter discards pending authorization when the camera, time window, or modal changes.

The HACS bundle import carries its installed version, and adapter imports are versioned together. Bump the bundle URL and dependent adapter URLs when updating this chain; otherwise a browser can combine the new review controls with a cached older card that has no timeline API.

The Live Cameras view at `live-cameras` keeps its existing camera layout. Tap a camera tile to open its live camera dialog; its compact recorded thumbnails play individual clips. Home's Birdseye tile opens Live Cameras. The full timeline is enabled only on the dedicated Clips view at `clips`. There, clicking a clip opens the timeline at its event time. Now uses a shared clock about 30 seconds behind current time so completed recording segments can be played. Camera switches preserve Now or the current historical playhead, including a clip's event time. Cameras without footage at the selected time show a gap message and keep that time selected.

Camera changes freeze the selected recording time and hide outgoing and initial frames until the incoming stream has sought to that time. Recording timestamps provide the common reference; camera-generated clock overlays can differ.

When saved footage ends, playback holds its last frame unless later recordings are available. It does not open an empty stream just because the current time advanced while the video was playing.

The Clips view shows 60 recorded clips per page with readable camera, object and date/time labels, a camera filter, and Older/Newer navigation. Live Cameras shows only eight thumbnails in two desktop rows, without a heading, filters, paging controls or visible captions. Accessible thumbnail labels still identify each event. Both browsers request saved video clips, including clips without snapshots, rather than snapshot-only detections. Integer API pagination overlaps boundary seconds and excludes seen IDs to avoid dropping fractional-second events. The Clips archive's Recent footage button opens the selected camera near Now; if that time has no recording, it opens the latest saved segment from the past 24 hours and reports its time. With All cameras selected, it uses the newest displayed clip's camera. Camera switches then preserve that selected recording time. Old `camera` and `cameras` bookmarks redirect to `live-cameras` and `clips`, respectively.

All three event cards share the ordered recording-camera list in `overview/partials/frigate_camera_names.yaml`. Add or remove a Frigate camera there to change the available timeline tabs, even when a camera has no recent detections. All nine recording cameras are included; Birdseye is a composite feed and Blink has no Frigate recording history. Camera tabs and transport controls wrap on narrow screens. Availability and recording gaps remain properties of each camera's saved footage.

### Mobile Quick Access
- Mobile is the second visible Overview view, directly after Home and before Live Cameras.
- Two-column controls use large labels, states, icons, and touch targets for quick use without glasses.
- Primary actions cover garage doors, the front-door lock, thermostats, household alerts, and entry-point status.
- Living Room TV lives on Systems > Kiosks, with a branded Raven launch/status card and separate large-button Roku Remote and TV Remote subviews. The main Overview tabs and Mobile page keep TV controls out of the way.
- Packages opens the doorbell camera; Systems opens the desktop control center; destination views place a large Back to Home control at the top.

### Lighting Controls
- **Home** places lighting beneath Sleep Score in the middle column, keeping family presence and cameras directly below the priority ribbon. On Now, Indoor, Exterior, All Lights Off, and the shared everyday controls use two equal columns.
- **Mobile** keeps Lights & Switches and All Lights Off together in its first quick-control row. The lighting submenu has the same shutdown action; native Back returns to the view used to enter it.
- **All Lights Off** calls `script.lighting_all_off`. It targets available household lights and an explicit allowlist of lamp, accent, landscape, and seasonal outlets. Media power, thermostat power, screens, network indicators, and voice routines are outside its scope.
- **On Now** and the shutdown script share `custom_templates/lighting.jinja`, so their lighting membership stays aligned. The switch allowlist rejects equipment switches even if a broad group later includes one.
- The shared everyday buttons combine Living Room main lights and accents using the native **Living Room Lighting** Light Group helper (`light.living_room_lighting`, members `light.living_room_lights` and `light.living_room_accents`, any-on state, members visible). The existing Kitchen group already includes Sink. Detailed Indoor controls retain individual light groups.
- Tap a named light or group to toggle it; hold for native brightness, color, and entity details. **OFFLINE** stays visible on unavailable room controls. Bedtime, guest-mode, motion, sunset, and other lighting automations keep their existing behavior.

### Camera Overview

The Camera tab keeps the doorbell and pool on the left, three exterior cameras across the upper right, and Kids Gate, Bedroom Gate, Filter Gate, and Conico Wireless across the second right-hand row. A full-width grid prevents the camera group from wrapping below the doorbell on desktop; narrow screens reflow into two columns. Recent Frigate events remain below the camera rows.

### Event-Driven Kiosk Dashboards
- Upcycled Nest display: [project guide](../../docs/NEST_DISPLAY.md), [round kiosk preview](infrastructure/partials/kiosk_sections.yaml), [Nest Album submenu](infrastructure/views/05za_nest_album.yaml), [![Watch Nest upcycling](https://img.shields.io/badge/Watch-Nest%20Upcycling-FF0000?logo=youtube&logoColor=white)](https://youtu.be/fuS1voqRznY) [![Nest display blog](https://img.shields.io/static/v1?label=vCloudInfo&message=Nest%20Display&color=21759B&logo=wordpress&logoColor=white)](https://www.vcloudinfo.com/2026/10/repurpose-nest-thermostat-home-assistant-display.html)
- Logic and recovery package: [![YAML source: kiosk_tablet](https://img.shields.io/static/v1?label=YAML&message=kiosk_tablet&color=lightgrey&logo=github&logoColor=181717)](../packages/kiosk_tablet.yaml)
- Bedroom dashboard: [![YAML source: dashboard](https://img.shields.io/static/v1?label=YAML&message=bedroom&color=lightgrey&logo=github&logoColor=181717)](bedroom/dashboard.yaml)
- Bedroom landscape view: [![YAML source: 01_home](https://img.shields.io/static/v1?label=YAML&message=01_home&color=lightgrey&logo=github&logoColor=181717)](bedroom/views/01_home.yaml)
- Android 5 fixed-dark renderer: [![HTML source: bedroom-kiosk](https://img.shields.io/static/v1?label=HTML&message=bedroom-kiosk&color=lightgrey&logo=html5&logoColor=E34F26)](../www/bedroom-kiosk.html)
- Kiosk Satellite preview: [![YAML source: dashboard](https://img.shields.io/static/v1?label=YAML&message=kiosk_satellite_staging&color=lightgrey&logo=github&logoColor=181717)](kiosk_satellite_staging/dashboard.yaml)
- Kitchen tablet view: [![YAML source: 01_home](https://img.shields.io/static/v1?label=YAML&message=01_home&color=lightgrey&logo=github&logoColor=181717)](kiosk_satellite_staging/views/01_home.yaml). Verified personal bests rotate for seven days alongside household reminders; the Health view retains step trends without persistent record cards. While the sink light is unavailable, a rotating reminder asks occupants to check its physical switch and clears when the light reconnects.
- Echo Show 5 compact view: [![YAML source: 02_echo_show5](https://img.shields.io/static/v1?label=YAML&message=Echo%20Show%205&color=lightgrey&logo=github&logoColor=181717)](kiosk_satellite_staging/views/02_echo_show5.yaml). A full-screen landscape clock/date and small current-weather icon sit beside the shared rotating household alerts, above Front Lawn and Driveway. The forecast is omitted; actionable alerts open the same transient details as Kitchen, scaled for the smaller display. Kiosk Satellite hides the Home Assistant header/sidebar.
- Automatic day/night theme: [![YAML source: kiosk_satellite](https://img.shields.io/static/v1?label=YAML&message=kiosk_satellite_theme&color=lightgrey&logo=github&logoColor=181717)](../themes/kiosk_satellite.yaml)

The displays share only the reusable event and screen-policy state they need. Kitchen keeps its clock/current-weather/forecast banner and rotating household context, including the next confirmed cruise countdown and 48-hour Carlo/Stacey bowling-result highlights, while the fixed-landscape Bedroom dashboard omits the redundant clock and uses that space for the next wake alarm, security/weather context, larger Front Lawn and Driveway feeds, and a readable household alert. Fresh personal bests rotate on Kitchen and alternate with lower-priority Bedroom context for seven days; safety alerts and reminders retain priority. Both use the same Garage-then-Front-Door event priority, with Garage held for three minutes after both doors close before the default dashboard returns. A lower-priority Frigate Driveway alert replaces both displays with the live Driveway feed until occupancy clears or ten minutes elapse, whichever happens first. The canonical Bedroom Lovelace view and its Android 5 lightweight renderer consume the same camera, header, and alert sensors; the renderer bypasses only the unsupported Home Assistant frontend on the frozen Fire WebView and stays dark at all times for bedroom readability. Kitchen uses native Kiosk Satellite overlays for Garage and Front Door, a full-view Lovelace Driveway alert, and idle dimming; Home Assistant handles household sleep/away enforcement, volume, and event-camera wake instead of periodically forcing the screen on. Nearby rain or lightning starts one five-minute NOAA radar takeover during daylight; afterward, the rotating Storms Approaching banner can replay the latest 20-minute loop while the weather event remains active. Actionable NWS, package, family-location, entry-point, Phyn, and low-hot-water slides open a shared short-lived detail surface; the family map centers only the person named by the tapped slide and shows that person's prior 24-hour trail, while a closed Phyn main valve can be restored only from its detail view after explicit confirmation. The ambient wall remains in place after sunset. True idle panel-off remains disabled until the Crown LineageOS device has a reliable motion-wake input. Its device schedule changes the Home Assistant theme between light at 07:00 and dark at 19:00. Other clients follow their own system preference.

Kitchen, Upstairs and Office use the same native Kiosk Satellite Garage and Front Door overlays with imported Home Assistant camera entities; HLS is preferred over WebRTC on the Fire/WebView-class Kitchen Show display. Driveway alerts use the same live Home Assistant camera through the dashboard because Driveway is not configured as a native Kiosk Satellite shortcut.

### How it is wired into Home Assistant
This folder is referenced from `config/configuration.yaml` via:
- `lovelace.resource_mode: yaml`
- `lovelace.resources: !include dashboards/resources.yaml`
- `lovelace.dashboards: ...`
- `frontend.themes: !include_dir_merge_named themes` loads the tablet palettes; the Kitchen Show uses the fixed-dark theme while the Bedroom Lovelace view can still follow client light/dark mode.
  - Default Overview YAML dashboard: `lovelace.dashboards.lovelace.filename: ui-lovelace.yaml`
  - Additional YAML dashboards: `filename: dashboards/<dashboard>/dashboard.yaml`
  - `dashboard-bedroom` is the canonical Bedroom desktop-review and future-hardware route; it is hidden from the sidebar and linked from the Bedroom Tablet snapshot on Systems' Kiosks tab. The current Android 5 Fire uses the equivalent lightweight renderer under `www/`.
  - `dashboard-kiosk-satellite-staging` is the hidden validation surface for the shared Kiosk Satellite camera view.
  - Systems' visible Kiosks tab sits immediately before Joanna and combines attention telemetry with the latest Bedroom Tablet, Kitchen Show, Upstairs Show, and Office Show screenshots; tapping a snapshot opens that display's live dashboard. Upstairs and Office use the compact Echo Show 5 view and native ESPHome telemetry; offline, page/app drift, power, and stale-screenshot faults join the shared Systems rollup. App updates remain advisory. Native voice status, assistant pipeline, and wake word are visible for all enrolled Shows.
  - Mini App local/public health leads Joanna's top status row; total 24-hour dispatches sit in Latest Activity, with AI Diagnostics at the bottom. Runtime & Memory retains failure details. Sustained failures appear in Systems Active Issues and the shared issue count, with persistent Repairs and independent mobile alerts.
  - Scheduled-job warnings and errors have separate entries in both Systems Active Issues and Joanna Runtime & Memory, including each job's detail and next check. The Systems badge counts those jobs individually; other health categories still count once. Warning rows remain amber even when a different job is in error. A bounded-summary remainder or unavailable telemetry stays visible.
  - The Systems Joanna page links to BearClaw Admin from Dispatch Trend and to a hidden AI Diagnostics subview that shows the latest OpenAI instructions and response together; package-classification diagnostics and retired QMD health telemetry are not shown.
  - Overview's second visible view is **Mobile**, a phone-first quick-control surface for garage doors, the front-door lock, thermostats, and compact household alerts.
  - Overview Home uses ordered production sections under `overview/sections/`; approved pilot edits now apply directly there.
  - Overview Home's **Windows** ribbon opens a dedicated GPIO entry-point subview with perimeter, MQTT, and individual contact status.
  - `dashboard-infrastructure` is presented as **Systems** while retaining its stable URL; it owns Home Water, Vacuum, Car telemetry and JuicePassProxy safety status, network, compute, storage, UPS power, and service drill-downs, including hidden WAN/Pi-hole/website detail views. Both Car Odometer tiles open a daily snapshot of the five-year TeslaMate visited map inside Home Assistant; hold either tile for odometer details. The local-file camera serves the private cached image. The first hourly check after 06:00 refreshes it, retaining the previous image if Grafana is unavailable. Eaton status and alarm rows use the same guarded 24-hour acknowledgment policy as the overview; raw NUT readings remain in diagnostic attributes.

Note:
- Do not use legacy `lovelace.mode: yaml` (removed in Home Assistant 2026.8).

Lovelace resources are loaded from:
- `config/dashboards/resources.yaml` (referenced by `lovelace.resources`)

### Migration / Cutover Notes
- During migration you may have both storage dashboards (from the UI) and YAML dashboards (from this folder) at the same time.
- Do not try to create YAML dashboards with the same dashboard ID/key as an existing storage dashboard; remove/disable the storage version first in the UI.
- Once you confirm the YAML dashboards render correctly:
  - Hide or delete the old storage dashboards in **Settings -> Dashboards**.
  - Keep strategies/dynamic dashboards in storage (Map, Areas, etc.) unless you intentionally export them.

### Conventions
- Include paths in Lovelace YAML should use absolute container paths starting with `/config/`.
  - Example: `!include /config/dashboards/overview/partials/some_cards.yaml`
- Views are loaded using `!include_dir_list` and ordered by filename (prefix with `01_`, `02_`, etc.).
- Systems views are desktop-first and dense by default: use `type: sections`, `max_columns: 4`, and `dense_section_placement: true` on every standard view. The landing strip starts with Back to Overview and twelve category tiles; it omits the redundant Systems aggregate tile.
  - Use responsive `layout-card` grids with `min-content` rows inside full-width section wrappers so panels pack tightly without fixed-height gaps.
  - Keep related panels similar in height, avoid spacer cards, and verify both desktop and single-column mobile layouts.
  - Keep WAN telemetry, compact dual Pi-hole controls, and current website health together on the Network view; reserve hidden subviews for detailed Pi-hole analytics and domain/monitor telemetry.
  - Use primary KPI tiles as the canonical drill-down entry point instead of repeating navigation rows at the bottom of a view.
  - Treat NAS long-term statistics as the Docker capacity source of truth; keep host cleanup controls in full-width, single-column maintenance popups.
- Major Overview redesigns use a hidden `-staging` dashboard for review and keep production view paths unchanged until explicit promotion approval.
- Overview is the daily home page: preserve people, climate, lighting, cameras, weather, and frequently used controls while bubbling up a compact mix of actionable system state and key household context.
- Home Water and Vacuum live under Systems; personal Health remains under Overview. Detailed Salt Trends, Sprinklers, and Vacuum Map views are Systems subviews.
- Vacuum keeps the cleaning plan, everyday controls, and consumables together. Its **Robot** tile opens native vacuum controls; **Current Room** and the **Live Map & Room Cleaning** row open the interactive current map. For manual cleans, press Stop before Return home. To cancel an automated cycle, switch On-Demand Cycle off, which stops the task and docks the robot. Camera calibration follows the current map instead of fixed coordinates.
- Vacuum uses the free Xiaomi Vacuum Map Card with the Dreame integration for zone, point, and room cleaning. Native controls provide start, pause, stop, and dock actions, cleaning mode, suction, mop moisture, auto-empty settings, and consumable maintenance.
- The free map opens in room mode with named selectors; choose rooms and press Run to start. Room IDs and display bounds are maintained in `infrastructure/partials/vacuum_map_rooms.yaml` from the current camera's `rooms` attribute. Regenerate that partial after remapping or splitting/merging rooms; camera calibration remains dynamic.
- Prefer card-native styling; treat `card_mod` as a last resort.
- Prefer CSS variables (`var(--*)`) over hardcoded hex colors.
- When using the Stitch MCP for inspiration, generation may exceed the tool timeout; wait and then fetch results via `stitch/list_screens` and `stitch/get_screen`.

### Notes
- Do not edit `config/.storage` by hand. Export once, then maintain the YAML files here.
- It is safe to restart Home Assistant after dashboard changes as long as a configuration check passes first.

**All of my configuration files are tested against the most stable version of home-assistant.**

<a name="bottom" href="https://github.com/CCOSTAN/Home-AssistantConfig#logo"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="25" ></a>

**Still have questions on my Config?** <br>
**Message me on X :** [![Follow CCostan](https://img.shields.io/twitter/follow/CCostan)](https://www.x.com/ccostan)

<p align="center">
<a target="_blank" href="https://www.buymeacoffee.com/vCloudInfo"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">You can buy me a coffee</span></a><a target="_blank" href="https://www.buymeacoffee.com/vCloudInfo"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"></a>
<br>
<a href="https://eepurl.com/dmXFYz"><img align="center" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/email_link.png" height="50" ></a><br>
<a href="https://www.vCloudInfo.com/p/affiliate-disclosure.html">
Affiliate Disclosure
</a></p>

Kitchen, Upstairs and Office share the event overlays, screen policy, and 15-minute snapshot refresh. Kitchen leads the Kiosk Satellite fleet; its Echo Show 5 profile synchronizes voice, camera shortcuts, and kiosk behavior while preserving the compact dashboard, device identity, local brightness, and volume. Upstairs and Office volume remain under the physical buttons.

Upstairs and Office use their available front cameras for motion wake. Each dims after 90 idle seconds, then uses a plain black screen at zero backlight after two more minutes. True panel-off on this build enters Android doze and blocks camera access, so it remains disabled. The Echo Show 5 fleet profile preserves these local sleep settings, and shared policy reconciliation does not restart its idle timer. Kitchen retains idle dimming; its current Android build does not expose the built-in camera.

Systems Network includes managed switch health, PoE capacity, and named physical uplink/server/AP/camera port rows. Switch faults join the shared Systems issue count and Active Issues. The Datacenter summary shows the average CPU package temperature, hottest host, and reporting-host count. These are hardware temperatures, not ambient air readings; SSD readings are not mixed into them. Proxmox has separate 24-hour CPU temperature and host utilization graphs for all three hosts. Utilization uses a fixed 0-100 percent scale with 5-minute averages; hover values describe that historical interval, while the header shows the current reading. Recorder explicitly retains these final dashboard metrics. VM utilization and SSD diagnostic cards are omitted. All monitoring cards are read-only.

The Kiosks view links to the Nest Album subview. Refresh photo list requests the
latest cached thumbnails; there is no periodic album poll or framebuffer capture.
Tap a photo to toggle Keep (up to 10 within 45 personal photos). FIFO replaces only
unprotected photos, while the avatar stays separate. The Nest shows all photos in
shuffled rounds. An eleventh Keep is rejected visibly without releasing another.

### Joanna Security & Updates

The Joanna view includes a private security summary from the appliance's native read-only scheduler. The `sensor.joanna_security_updates` entity exposes aggregate counts and scan freshness. Review tiles open the internal Admin report directly (no token required); the vendor tile is informational. Vendor-only waits leave the main dashboards clear and remain amber inside the report. Actionable work, failed maintenance and missing coverage still warn. Configure the private destination in the local `bearclaw_security_admin_url` secret. Security summaries and raw poll snapshots are excluded from recorder; existing dispatch trends remain recorded. Detailed inventory, CVEs, and findings remain in appliance private state and are never committed to this repository. The Joanna security tile can copy a Codex review prompt directly, with a selection fallback when clipboard access is blocked. The prompt contains aggregate context and instructions to retrieve fresh private findings; it copies text only. Successful automatic maintenance, limited source-rebuild coverage and ordinary package retries remain quiet. The dashboard does not trigger updates or public issues.

### Shared household kiosk content

Kitchen, Upstairs, Office, Bedroom and Raven use the notification model in `config/www/kiosk/ambient.js`. Add notification types and their entity dependencies there so all enrolled displays receive the same household information. Shared phone-notification entries retain the source feed's expiry and replacement rules. Kiosk renderers keep their own dimensions and interaction policies.

Seasonal presentation ([#2029](https://github.com/CCOSTAN/Home-AssistantConfig/issues/2029)) follows `sensor.holiday_lighting_mode`, the same automatic selection used by exterior lights and Joanna's avatar. `config/www/kiosk/ambient.js` owns the shared labels, lighting-derived palettes and local artwork paths. Home, Mobile and Systems reuse their existing section headers: a light seasonal background wash and a holiday image in the existing header-icon slot. No banner, row, spacing, card dimension or view layout is added or changed. Shows display seasonal artwork in the ambient panel, Bedroom places it beside the alarm text, and Raven reserves space beside the notice; the Nest already follows the same sensor through Joanna's portrait. Text and semantic status colors retain their meaning, while cameras, controls, and event/detail takeovers retain priority. Ordinary, unsupported and unavailable modes return to the normal presentation. No renderer contains holiday date rules. The decoration is static, with no extra polling, fonts or external asset requests. Locally served Twemoji artwork and attribution are in `config/www/kiosk/seasonal/`. Aurora Glass remains inspiration only; no Aurora code or dependency is installed. Full-screen clip review and map views keep their dedicated layouts.

Systems > Kiosks groups five device captures and a branded Raven app card near the top, with six device-detail panels below. The Raven card shows TV-off or Roku app state, the current Roku app, Open Raven, and a Roku Remote link. It replaces the retired Samsung Haven browser iframe; it is a launch/status card rather than a screenshot. The Raven device panel has TV power, the manual-exit pause, automatic-launch state, last automatic launch, and links to both remotes. Its Automatic Raven launch row toggles `input_boolean.haven`, retaining the existing entity ID for compatibility. Turning it off pauses automatic Roku Home idle launches, for example during gaming; it does not close an app already on screen. The helper preserves its state across restarts and turns back on at 03:00 Home Assistant local time without waking the TV or launching Raven. Manual Open Raven launches the native Roku app through the existing action name. TV-off is normal and remains outside fleet health alerts. Raven portraits are dimmed and grayscale while away, with each person's configured home locations retaining full color.

Raven is the active TV dashboard; Samsung Haven is retired from the Home Assistant dashboard interface. The native Roku Raven dashboard ([#2030](https://github.com/CCOSTAN/Home-AssistantConfig/issues/2030)) shows Front Door, Front Lawn, Driveway and Garage in one live four-camera mosaic, with thin dividers and no camera labels. The low-resolution stream runs at ten frames per second; five-second snapshots load offscreen before replacing the previous image when live video is unavailable. A house-status ribbon and family presence remain visible while current/three-day weather with away locations rotates with daily energy/water totals and the approved family agenda. Water keeps its gallon unit; energy uses kWh. Garage-open, windows-open and unlocked-door tiles turn red; cooling stays blue. The Front Door tile follows the lock independently of its door contact. Existing Garage, Front Door and Driveway priority decisions from `sensor.kiosk_active_camera_view` replace the wall with one muted live camera, with snapshot fallback. Birdseye is not selected automatically. Household notices and year-round seasonal artwork reuse the canonical kiosk model and shared holiday mode. Guest/vacation mode and stale or disconnected data hide private agenda/location details. The app tile and splash use vCloud Info branding. Open Raven remains available in the interface; there is no separate Alexa demo helper.

Automatic launch requires two minutes on Roku Home, the TV on for two minutes, Raven enabled, and no manual-exit pause. Back/Home exit natively and start a restoring 15-minute pause. The display bridge checks the current Roku app again before launching, so paused streaming apps are not treated as idle Home. Samsung input-switch and Exit handoffs are retired. The Roku Remote subview sends native Roku Home, Back, directional, Select, Options and Play commands; the separate TV Remote keeps Samsung menu navigation available. Stable internal IDs and the shared display-client code are retained for Raven compatibility. The bridge renews its read-only HA session and camera authentication; the Roku stores only its scoped display connection. After a detected Roku reboot/network recovery, HA reloads only the living-room Roku integration. App/bridge source belongs to its own service, outside this HA repository. Private endpoints, keys and entity mappings stay outside Git.

OneNote account indexes show blue Indexing or Recovering while automatic work is pending. These states do not increase the Systems issue count. Amber warnings indicate operator attention after the appliance recovery workflow; the row includes the reason.
