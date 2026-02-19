---
name: homeassistant-yaml-dry-verifier
description: "Verify Home Assistant YAML for DRY and efficiency issues by detecting redundant trigger/condition/action/sequence structures and repeated blocks across automations, scripts, and packages. Use when creating, reviewing, or refactoring YAML in config/packages, config/automations, config/scripts, or dashboard-related YAML where duplication risk is high."
---

# Home Assistant YAML DRY Verifier

Use this skill to lint Home Assistant YAML for repeat logic before or after edits, then refactor repeated blocks into reusable helpers.

## Quick Start

1. Run the verifier script on the file(s) you edited.
2. Review repeated block findings first (highest confidence).
3. Refactor into shared scripts/helpers/templates where appropriate.
4. Re-run the verifier and then run your normal Home Assistant config check.

```bash
python codex_skills/homeassistant-yaml-dry-verifier/scripts/verify_ha_yaml_dry.py config/packages/life360.yaml --strict
```

Scan a full directory when doing wider cleanup:

```bash
python codex_skills/homeassistant-yaml-dry-verifier/scripts/verify_ha_yaml_dry.py config/packages config/automations
```

## Workflow

1. Identify target YAML:
- Prefer changed files first.
- Include adjacent package/script files when the change might duplicate existing logic.

2. Run verifier:
- Use `--min-occurrences 2` (default) for normal checks.
- Use `--strict` when you want non-zero exit if duplication is found.

3. Prioritize findings in this order:
- `FULL_BLOCK`: repeated full trigger/condition/action/sequence blocks.
- `ENTRY`: repeated individual entries inside those blocks.
- `INTRA`: duplicate entries inside a single block.

4. Refactor with intent:
- Repeated actions/sequence: move to a reusable `script.*`, pass variables.
- Repeated conditions: extract to template binary sensors or helper entities.
- Repeated triggers: consolidate where behavior is equivalent, or split by intent if readability improves.

5. Validate after edits:
- Re-run this verifier.
- Run Home Assistant config validation before reload/restart.

## Dashboard Designer Integration

When dashboard or automation work includes YAML edits beyond card layout, use this verifier after generation to catch duplicated logic that may have been introduced during fast refactors.

## Output Contract

Always report:
- Total files scanned.
- Parse errors (if any).
- Duplicate groups by kind (`trigger`, `condition`, `action`, `sequence`).
- Concrete refactor recommendation per group.

## References

- Read `references/refactor_playbook.md` for concise DRY refactor patterns.
