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
- `lovelace.dashboards: ... filename: dashboards/<dashboard>/dashboard.yaml`

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
