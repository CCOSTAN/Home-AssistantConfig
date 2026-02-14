---
name: homeassistant-dashboard-designer
description: "Design, update, and refactor Home Assistant Lovelace dashboards (YAML views/partials) with a constrained, machine-safe design system: button-card-first structure, minimal card-mod styling, optional flex-horseshoe + mini-graph telemetry, strict grid/vertical-stack layout rules, centralized templates, deterministic ordering, and config validation. Use for Home Assistant dashboard work (especially config/dashboards/**), when refactoring views, adding infra/home/energy/environment panels, or translating Stitch design inspiration into safe Lovelace YAML."
---

# Home Assistant Dashboard Designer

Design dashboards as systems: predictable structure, reusable templates, minimal drift. Treat Stitch as inspiration only; translate to safe Lovelace YAML.

## Primary Input: Natural Language (Default)

You can give natural-language guidance. The skill must infer the structured intent internally (dashboard intent, view name, entity mapping, constraints) while enforcing the design system and validating entities/services via the Home Assistant MCP when available.

Minimum helpful info to include in natural language:
- What to change (add/remove/refactor) and why (the goal).
- Where to change it: the exact view/partial path(s) under `config/dashboards/**`.
- Any constraints you care about: desktop/mobile columns, time window preferences for graphs, "do not touch" templates/sections.

If any of the above is missing, ask targeted clarifying questions (do not demand a full "intent block").

Example natural-language request:
- "Refactor `config/dashboards/infrastructure/views/06_mariadb.yaml` to match the button-card-first system used in other Infrastructure views. Keep the same entities, no new templates, 4 columns desktop / 2 columns mobile."

## Optional Input: Structured Intent (Allowed, Not Required)

If the user provides structured intent, accept it. Do not require it.

```yaml
dashboard_type: infra  # infra|home|energy|environment
view_name: "Infrastructure Overview"
target_paths:
  dashboard_yaml: "config/dashboards/infrastructure/dashboard.yaml"
  view_yaml: "config/dashboards/infrastructure/views/07_docker_containers.yaml"
entities:
  - name: "Proxmox01"
    cpu: "sensor.proxmox01_cpu"
    memory: "sensor.proxmox01_mem"
constraints:
  desktop_columns: 4
  mobile_columns: 2
notes:
  - "Preserve existing templates; minimize diff."
```

If updating an existing view and not obvious from context, ask:

- Which view file (single view dict) is the source of truth?
- Any "don't touch" areas/templates?
- Any fallback cards already in use that must remain?

## Output Contract (Always Produce)

- One valid Lovelace view (single view dict)
- Deterministic ordering (stable ordering of cards/sections)
- Section comments (short, consistent)
- Zero per-card styling variance (no one-off styles; use templates/snippets)
- Fallback usage explicitly justified (YAML comments adjacent to the fallback card)

## Card Priority Model

Attempt Tier 1 first. Use Tier 2 only if Tier 1 cannot express the requirement safely.

Tier 1 (primary):
- `custom:button-card` (structure + tiles + headers + containers)
- `card-mod` (shared/global polish only; shared snippets OK)
- `custom:flex-horseshoe-card` (single-metric radial telemetry)
- `custom:mini-graph-card` (single-metric trends)

Tier 2 (fallback, must justify in comments):
- `entities`, `markdown`, `history-graph`, `conditional`
- `iframe` (last resort)

## Layout Rules (Hard Constraints)

- Allowed layout containers: `grid`, `vertical-stack`
- Maximum nesting depth: 2 (example: `grid` -> `vertical-stack` -> cards)
- No `horizontal-stack` inside grid cells (prefer: more grid columns, or vertical-stack)
- No freeform positioning
- No layout logic embedded in `card-mod`
- For dense tile lists in `type: sections` views, keep the outer panel full-width (`column_span: 4`) and make the inner tile grid responsive using `custom:layout-card` (`4` desktop / `2` mobile unless the user asks otherwise).
- In `type: sections` views, the first section immediately below top chips/badges must be a full-width container (`column_span: 4`) with a single wrapper card that also sets `grid_options.columns: full` to prevent skinny-column whitespace.
- Consolidate upward after removals/moves: do not leave dead space, empty placeholders, or intentionally sparse rows unless the user explicitly asks for whitespace.

Note: If the repo/view uses Home Assistant `type: sections`, treat `sections` as the top-level structure and enforce the same container rules inside each section (sections should contain only `grid`/`vertical-stack` cards and their children).

## Design System Rules (Implementation Discipline)

### Button Card (Primary Renderer)

- Use `custom:button-card` as the structural primitive.
- Templates required. Do not inline per-card `styles:`; keep styling inside centralized templates/snippets.
- Logic via variables or template JS only (avoid duplicating logic per-card).

### card-mod (Styling Constraint Layer)

- Allowed only for shared/global polish:
  - padding normalization
  - border radius control
  - shadow suppression
  - typography consistency
- No entity-specific styling
- No per-card visual experimentation

### Flex Horseshoe Card

- One primary metric per card.
- Explicit color thresholds.
- No mixed units.

### Mini Graph Card

- One metric per graph.
- Consistent time windows per dashboard.
- Minimal legends (only when required).

## Template Architecture (Required)

- Views reference templates only (for `custom:button-card`: every instance must specify `template:`).
- Templates accept variables; views pass variables.
- Do not create new templates unless explicitly instructed.

Repo reality check (important):
- If the repo already has established templates (for example, Infrastructure uses `bearstone_*`), use what exists.
- If the spec's "required template categories" are not present, map to the closest existing template and call out the gap, or ask for explicit permission to add templates.

## Stitch MCP (Inspiration Only)

Use Stitch only to learn:
- visual hierarchy (headers, grouping, density)
- spacing rhythm (padding/gaps)
- grouping patterns (panels, sections)

Never treat Stitch output as implementation code.

When prompting Stitch, include these constraints verbatim:

```
Grid-only layout. No absolute positioning. No JS frameworks. No custom HTML/CSS outside card-mod.
Card types limited to: custom:button-card, card-mod, custom:flex-horseshoe-card, custom:mini-graph-card, and HA core fallback cards only if unavoidable.
Max layout nesting depth: 2. No horizontal-stack inside grid cells.
```

## Optional Stitch Handoff (Light Bridge)

Use this only when the user explicitly asks for visual ideation, layout exploration, or variants.

- Trigger Stitch path:
  - User asks for redesign inspiration, variants, or multiple visual directions.
- Skip Stitch path:
  - User asks for direct dashboard refactor/update and no ideation is needed.
- Preconditions:
  - Stitch is used for hierarchy/spacing/grouping ideation only.
  - Stitch output must never be copied as implementation code.
  - Final implementation must still obey all allowed card/layout rules in this skill.

Handoff artifact (summary only, no code export):

```yaml
stitch_intent:
  layout_pattern: "<grid and grouping pattern to translate>"
  section_hierarchy: "<header/panel/section ordering>"
  density_target: "<compact|balanced|spacious>"
  cards_to_translate:
    - "<visual card concept mapped to allowed Lovelace card types>"
```

Translation requirement:
- Convert `stitch_intent` into approved Lovelace structures only (`grid`, `vertical-stack`, Tier 1 cards first).
- Re-map any unsupported Stitch concepts to compliant cards/containers and explain fallback choices inline when Tier 2 is required.

Fallback behavior when Stitch is unavailable:
- Continue with manual ideation using this skill's design system and rules.
- State degraded mode clearly ("Stitch unavailable; proceeding with manual hierarchy/density planning").
- Do not block dashboard work on Stitch availability.

## Workflow (Do This In Order)

1. Read the target dashboard/view/partials/templates to understand existing patterns and avoid drift.
2. Determine intent from the user's request and existing dashboard context: `infra` (NOC), `home`, `energy`, or `environment`. Keep one intent per view.
3. Validate entities and services before editing:
   - Prefer the Home Assistant MCP for live entity/service validation (required when available).
   - Record the MCP validation step in the work notes before writing YAML.
   - If MCP is not available, ask the user to confirm entity IDs and services (do not guess).
4. Draft layout with constraints: a top-level `grid` and optional `vertical-stack` groups.
   - If using Stitch, first summarize `stitch_intent` and treat it as advisory input to this step.
   - After removals, reflow cards/sections upward to collapse gaps and reduce empty rows.
5. Implement using Tier 1 cards first; reuse existing templates; avoid one-off styles.
6. If fallback cards are necessary, add an inline comment explaining why Tier 1 cannot satisfy the requirement.
7. Validate:
   - Run Home Assistant config validation (`ha core check` or `homeassistant --script check_config`) when available.
   - Optionally run `scripts/validate_lovelace_view.py` from this skill against the changed view file to catch violations early.
8. Failure behavior:
   - If requirements can't be met: state the violated rule and propose a compliant alternative.
   - If validation fails: stop, surface the error output, and propose corrected YAML. Do not leave invalid config applied.

Example flow:
- User asks for redesign inspiration -> Stitch ideation with required constraints -> summarize `stitch_intent` -> translate to Lovelace-safe YAML -> run validation checks.

## References

- Read `references/dashboard_rules.md` when you need the full constraint set and repo-specific mapping notes.

## Home Assistant MCP Validation (Required When Available)

Before writing Lovelace YAML, confirm:
- Every `entity:` (and any entities referenced via variables) exists.
- Every service you plan to call exists and the payload shape is correct (especially `service_data`).

When Home Assistant MCP is enabled, use it to:
- List/confirm entities (avoid typos like `sensor.foo_bar` vs `sensor.foobar`).
- Confirm the dashboard card references match real entities.
- Validate service names and fields before committing YAML changes.

If MCP is not enabled or not reachable, stop and ask for the missing entity/service IDs rather than inventing them.
