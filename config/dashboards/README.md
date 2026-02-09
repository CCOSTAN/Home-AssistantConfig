<h1 align="center">
  <a name="logo" href="https://www.vCloudInfo.com/tag/iot"><img src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/x_profile.png" alt="Bear Stone Smart Home" width="200"></a>
  <br>
  Bear Stone Smart Home Documentation
</h1>
<h4 align="center">Be sure to :star: my configuration repo so you can keep up to date on any daily progress!</h4>

<div align="center">

[![X Follow](https://img.shields.io/static/v1?label=talk&message=3k&color=blue&logo=twitter&style=for-the-badge)](https://x.com/ccostan)
[![YouTube Subscribe](https://img.shields.io/youtube/channel/subscribers/UC301G8JJFzY0BZ_0lshpKpQ?label=VIEW&logo=Youtube&logoColor=%23DF5D44&style=for-the-badge)](https://www.youtube.com/vCloudInfo?sub_confirmation=1)
[![GitHub Stars](https://img.shields.io/github/stars/CCOSTAN/Home-AssistantConfig?label=STARS&logo=Github&style=for-the-badge)](https://github.com/CCOSTAN) <br>
[![HA Version Badge](https://raw.githubusercontent.com/ccostan/home-assistantconfig/master/ha-version-badge.svg)](https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/.HA_VERSION)
[![Last Commit](https://img.shields.io/github/last-commit/CCOSTAN/Home-AssistantConfig.svg?style=plastic)](https://github.com/CCOSTAN/Home-AssistantConfig/commits/master)
[![Commit Activity](https://img.shields.io/github/commit-activity/y/CCOSTAN/Home-AssistantConfig.svg?style=plastic)](https://github.com/CCOSTAN/Home-AssistantConfig/commits/master)

</div>

<h1 align="center">
  Dashboards (Lovelace YAML)
</h1>

This folder holds YAML-managed Home Assistant Lovelace dashboards and UI resources.

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
  - `popups/` is reusable popup stacks (typically `bubble-card`) included into views.
  - `card_mod/` is CSS overrides (use only when card-native options are insufficient).
- `shared/`
  - Cross-dashboard reuse only. If something is only used by one dashboard, keep it in that dashboard folder.

### How it is wired into Home Assistant
This folder is referenced from `config/configuration.yaml` via:
- `lovelace.resource_mode: yaml`
- `lovelace.resources: !include dashboards/resources.yaml`
- `lovelace.dashboards: ...`
  - Default Overview YAML dashboard: `lovelace.dashboards.lovelace.filename: ui-lovelace.yaml`
  - Additional YAML dashboards: `filename: dashboards/<dashboard>/dashboard.yaml`

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
