# Dashboard Rules (Full)

This file is reference material for $homeassistant-dashboard-designer. Prefer following the workflow in `../SKILL.md`, and read this only when you need details.

## Card Priority Model

Tier 1 (primary, attempt first):
- `custom:button-card`
- `card-mod` (shared/global styling only)
- `custom:flex-horseshoe-card`
- `custom:mini-graph-card`

Tier 2 (fallback, only when Tier 1 cannot satisfy the requirement; justify inline):
- `entities`
- `markdown`
- `history-graph`
- `conditional`
- `iframe` (last resort)

## Layout Rules (Hard Constraints)

- Allowed layout containers: `grid`, `vertical-stack`
- Maximum nesting depth: 2
- No `horizontal-stack` inside grid cells
- No freeform positioning
- No layout logic embedded in `card-mod`
- For dense status/container lists in `type: sections` views, keep the panel full-width (`column_span: 4`) and use a responsive inner grid (`4` desktop / `2` mobile by default).
- In `type: sections` views, always place a full-width wrapper section directly below top chips/badges and set the wrapper card to `grid_options.columns: full`.
- Consolidate layout vertically after any move/remove; dead space is disallowed unless explicitly requested.

Sections-mode note:
- If a view uses `type: sections`, treat `sections` as the top-level structure and enforce the same container rules inside each section.
- Prefer reducing section count and regrouping cards into earlier rows rather than leaving sparse trailing space.

## Template Architecture (Required)

Intent: centralize visuals and logic into templates; views pass only variables and remain uniform.

Rules:
- `custom:button-card` must use templates (no one-off per-card styles).
- Templates accept variables.
- Do not hardcode entity IDs inside templates.
- Do not create new templates without explicit instruction.

Reality note for CCOSTAN/Home-AssistantConfig:
- Infrastructure templates already exist in:
  - `config/dashboards/infrastructure/templates/button_card_templates.yaml`
- Existing template naming uses `bearstone_*` and includes styling inside templates (this is OK).
- When asked to implement new conceptual categories (e.g., "status_pill"), first map to existing templates (e.g., `bearstone_infra_chip*`). If no suitable match exists, ask before adding templates.

## Design System (Discipline)

### Button Card

Use it for:
- Infrastructure tiles
- Status pills
- Section headers
- Control footers
- Card containers

Rules:
- Templates required.
- Avoid per-card `styles:` keys.
- Avoid per-card `card_mod:` blocks.

### card-mod

Allowed only for shared/global polish:
- padding normalization
- border radius control
- shadow suppression
- typography consistency

Not allowed:
- entity-specific styling
- per-card visual experimentation

### Flex Horseshoe Card

Use it for:
- Temperature
- Battery
- Load
- Utilization
- Percentage-based metrics

Rules:
- One primary metric per card.
- Explicit color thresholds.
- No mixed units.

### Mini Graph Card

Rules:
- One metric per graph.
- Consistent time windows per dashboard (keep uniform unless user asks otherwise).
- Minimal legends (only if required for interpretation).

## Stitch MCP Integration (Inspiration Only)

Stitch is advisory, never authoritative.

When using Stitch:
- Provide feasibility constraints (cards + layout)
- Use outputs only to inform hierarchy/grouping/density/spacing
- Translate into approved Lovelace YAML

Required constraints to include in Stitch prompt:

```
Grid-only layout. No absolute positioning. No JS frameworks. No custom HTML/CSS outside card-mod.
Card types limited to: custom:button-card, card-mod, custom:flex-horseshoe-card, custom:mini-graph-card, and HA core fallback cards only if unavoidable.
Max layout nesting depth: 2. No horizontal-stack inside grid cells.
```

## Optional Stitch Handoff (Light Bridge)

Decision rule:
- Use Stitch only when the user requests visual ideation, variants, or exploration.
- For normal refactor/update requests, skip Stitch and implement directly with this skill's rules.

Handoff artifact (advisory summary, not implementation code):

```yaml
stitch_intent:
  layout_pattern: "<grid and grouping pattern to translate>"
  section_hierarchy: "<header/panel/section ordering>"
  density_target: "<compact|balanced|spacious>"
  cards_to_translate:
    - "<visual card concept mapped to allowed Lovelace card types>"
```

Required translation back to Lovelace:
- Treat `stitch_intent` as input to layout planning only.
- Implement using approved containers/cards and template architecture from this document.
- For any unsupported concept, re-map to compliant cards and justify Tier 2 fallback inline.

Degraded mode:
- If Stitch or Stitch skills are unavailable, continue with manual hierarchy/spacing ideation.
- Do not block dashboard work on Stitch availability.

Anti-drift checklist:
- No HTML/CSS export artifacts from Stitch output.
- No nesting-depth violations (max 2).
- No card-type drift outside approved Tier 1/Tier 2 lists.

## Repo-Specific Dashboard YAML Rules (config/dashboards/**)

If working in this repo's `config/dashboards/` tree:
- Do not edit `config/.storage` (runtime state).
- Includes must use absolute container paths starting with `/config/`.
- Views are one file per view, and the dashboard file uses `!include_dir_list`.
- Files under `config/dashboards/**/*.yaml` must include the standard `@CCOSTAN` header block.

## Validation (Home Assistant MCP)

When available, use the Home Assistant MCP to validate:
- Entity IDs referenced by Lovelace cards/templates.
- Service names and payload fields used by actions (for example, `button.press`, `script.*`, etc.).

If MCP is not available, do not guess entity IDs. Ask the user to confirm them.
