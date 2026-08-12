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

### Mobile Quick Access
- Mobile is the second visible Overview view, directly after Home and before Cameras.
- Two-column controls use large labels, states, icons, and touch targets for quick use without glasses.
- Primary actions cover garage doors, the front-door lock, thermostats, household alerts, and entry-point status.
- Packages opens the doorbell camera; Systems opens the desktop control center; destination views place a large Back to Home control at the top.

### Event-Driven Kiosk Dashboards
- Logic and recovery package: [![YAML source: kiosk_tablet](https://img.shields.io/static/v1?label=YAML&message=kiosk_tablet&color=lightgrey&logo=github&logoColor=181717)](../packages/kiosk_tablet.yaml)
- Bedroom dashboard: [![YAML source: dashboard](https://img.shields.io/static/v1?label=YAML&message=bedroom&color=lightgrey&logo=github&logoColor=181717)](bedroom/dashboard.yaml)
- Bedroom landscape view: [![YAML source: 01_home](https://img.shields.io/static/v1?label=YAML&message=01_home&color=lightgrey&logo=github&logoColor=181717)](bedroom/views/01_home.yaml)
- Android 5 renderer: [![HTML source: bedroom-kiosk](https://img.shields.io/static/v1?label=HTML&message=bedroom-kiosk&color=lightgrey&logo=html5&logoColor=E34F26)](../www/bedroom-kiosk.html)
- Kiosk Satellite preview: [![YAML source: dashboard](https://img.shields.io/static/v1?label=YAML&message=kiosk_satellite_staging&color=lightgrey&logo=github&logoColor=181717)](kiosk_satellite_staging/dashboard.yaml)
- Kitchen tablet view: [![YAML source: 01_home](https://img.shields.io/static/v1?label=YAML&message=01_home&color=lightgrey&logo=github&logoColor=181717)](kiosk_satellite_staging/views/01_home.yaml)
- Automatic day/night theme: [![YAML source: kiosk_satellite](https://img.shields.io/static/v1?label=YAML&message=kiosk_satellite_theme&color=lightgrey&logo=github&logoColor=181717)](../themes/kiosk_satellite.yaml)

The displays share only the reusable event and screen-policy state they need. Kitchen keeps its clock/current-weather/forecast banner and rotating household context, including the next confirmed cruise countdown, while the fixed-landscape Bedroom dashboard omits the redundant clock and uses that space for the next wake alarm, security/weather context, larger Front Lawn and Driveway feeds, and a readable household alert. Both use the same Garage-then-Front-Door event priority. The canonical Bedroom Lovelace view and its Android 5 lightweight renderer consume the same camera, header, and alert sensors; the renderer bypasses only the unsupported Home Assistant frontend on the frozen Fire WebView. Kitchen uses native Kiosk Satellite camera overlays and idle dimming; Home Assistant handles only household sleep/away enforcement, volume, and event-camera wake instead of periodically forcing the screen on. True idle panel-off remains disabled until the Crown LineageOS device has a reliable motion-wake input. Its device schedule changes the Home Assistant theme between light at 07:00 and dark at 19:00. Other clients follow their own system preference.

### How it is wired into Home Assistant
This folder is referenced from `config/configuration.yaml` via:
- `lovelace.resource_mode: yaml`
- `lovelace.resources: !include dashboards/resources.yaml`
- `lovelace.dashboards: ...`
- `frontend.themes: !include_dir_merge_named themes` loads the shared tablet's light and dark palette.
  - Default Overview YAML dashboard: `lovelace.dashboards.lovelace.filename: ui-lovelace.yaml`
  - Additional YAML dashboards: `filename: dashboards/<dashboard>/dashboard.yaml`
  - `dashboard-bedroom` is the canonical Bedroom desktop-review and future-hardware route; it is hidden from the sidebar and linked from the Bedroom Tablet snapshot on Systems' Kiosks tab. The current Android 5 Fire uses the equivalent lightweight renderer under `www/`.
  - `dashboard-kiosk-satellite-staging` is the hidden validation surface for the shared Kiosk Satellite camera view.
  - Systems' visible Kiosks tab sits immediately before Joanna and combines attention telemetry with the latest Bedroom Tablet and Kitchen Show screenshots; tapping either snapshot opens that display's live dashboard.
  - The Systems Joanna page links to BearClaw Admin from Dispatch Trend and to a hidden AI Diagnostics subview that shows the latest OpenAI instructions and response together; LLM Vision production diagnostics and retired QMD health telemetry are not shown.
  - Overview's second visible view is **Mobile**, a phone-first quick-control surface for garage doors, the front-door lock, thermostats, and compact household alerts.
  - Overview Home uses ordered production sections under `overview/sections/`; approved pilot edits now apply directly there.
  - Overview Home's **Windows** ribbon opens a dedicated GPIO entry-point subview with perimeter, MQTT, and individual contact status.
  - `dashboard-infrastructure` is presented as **Systems** while retaining its stable URL; it owns Home Water, Vacuum, network, compute, storage, and service drill-downs, including hidden WAN/Pi-hole/website detail views.

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
- Systems views are desktop-first and dense by default: use `type: sections`, `max_columns: 4`, and `dense_section_placement: true` on every standard view.
  - Use responsive `layout-card` grids with `min-content` rows inside full-width section wrappers so panels pack tightly without fixed-height gaps.
  - Keep related panels similar in height, avoid spacer cards, and verify both desktop and single-column mobile layouts.
  - Keep WAN telemetry, compact dual Pi-hole controls, and current website health together on the Network view; reserve hidden subviews for detailed Pi-hole analytics and domain/monitor telemetry.
  - Use primary KPI tiles as the canonical drill-down entry point instead of repeating navigation rows at the bottom of a view.
  - Treat NAS long-term statistics as the Docker capacity source of truth; keep host cleanup controls in full-width, single-column maintenance popups.
- Major Overview redesigns use a hidden `-staging` dashboard for review and keep production view paths unchanged until explicit promotion approval.
- Overview is the daily home page: preserve people, climate, lighting, cameras, weather, and frequently used controls while bubbling up a compact mix of actionable system state and key household context.
- Home Water and Vacuum live under Systems; personal Health remains under Overview. Detailed Salt Trends, Sprinklers, and Vacuum Map views are Systems subviews.
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
