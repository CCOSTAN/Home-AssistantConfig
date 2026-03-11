---
name: homeassistant-yaml-dry-verifier
description: "Verify Home Assistant YAML for DRY and efficiency issues by detecting redundant trigger/condition/action/sequence structures and repeated blocks across automations, scripts, and packages. Use when creating, reviewing, or refactoring YAML in config/packages, config/automations, config/scripts, or dashboard-related YAML where duplication risk is high."
---

# Home Assistant YAML DRY Verifier

Use this skill to lint Home Assistant YAML for repeat logic before or after edits, then refactor repeated blocks into reusable helpers.

## Mandatory Resolution Policy

- If the verifier reports findings for files touched in the current task, do not stop at reporting.
- Resolve the findings in the same task by refactoring YAML to remove duplication.
- Re-run the verifier after refactoring and iterate until targeted findings are cleared.
- If a finding cannot be safely resolved, explicitly document the blocker and the smallest safe follow-up.

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
- `CENTRAL_SCRIPT`: script is defined in `config/packages` but called from 2+ YAML files.

4. Refactor with intent:
- Repeated actions/sequence: move to a reusable `script.*`, pass variables.
- Repeated conditions: extract to template binary sensors or helper entities.
- Repeated triggers: consolidate where behavior is equivalent, or split by intent if readability improves.
- For cooldown/throttle behavior, prefer automation-local `this.attributes.last_triggered` with custom event handoff before adding new helper entities, unless shared persistent state is required across automations.

5. Validate after edits:
- Re-run this verifier.
- Run Home Assistant config validation before reload/restart.

6. Enforce closure:
- Treat unresolved `FULL_BLOCK`/`ENTRY` findings in touched files as incomplete work unless a blocker is documented.
- Prefer consolidating duplicated automation triggers/conditions/actions into shared logic or a single branching automation.
- Treat unresolved `CENTRAL_SCRIPT` findings in touched scope as incomplete unless documented as deferred-with-blocker.
- Move shared package scripts to `config/script/<script_id>.yaml` when they are used cross-file.

## Dashboard Designer Integration

When dashboard or automation work includes YAML edits beyond card layout, use this verifier after generation to catch duplicated logic that may have been introduced during fast refactors.

## Output Contract

Always report:
- Total files scanned.
- Parse errors (if any).
- Duplicate groups by kind (`trigger`, `condition`, `action`, `sequence`).
- Central script placement findings (`CENTRAL_SCRIPT`) with definition + caller files.
- Concrete refactor recommendation per group.
- Resolution status for each finding (`resolved`, `deferred-with-blocker`).

Strict behavior:
- `--strict` returns non-zero for any reported finding (`FULL_BLOCK`, `ENTRY`, `INTRA`, `CENTRAL_SCRIPT`).
- Without `--strict`, findings are reported but exit remains zero unless parse errors occur.

## References

- Read `references/refactor_playbook.md` for concise DRY refactor patterns.
