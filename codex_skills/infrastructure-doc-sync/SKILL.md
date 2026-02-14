---
name: infrastructure-doc-sync
description: "Use when infra or container placement changes were made in a session and documentation must be synchronized across AGENTS.md, README(s), and Infra Info snapshot (`overview.json`). Covers host maps, role notes, and safe high-level summary updates."
---

# Infrastructure Doc Sync

Keep infrastructure documentation aligned after operational changes.

## When to Use

- Docker service moved between hosts.
- Network mode/port mapping changed.
- Host role changed (core, camera, edge, backup, etc.).
- Any update to an `AGENTS.md` file that affects infra context.

## Required Update Targets

1. `../AGENTS.md` (workspace-level infra truth in `h:\hass\docker_files\AGENTS.md`)
2. Relevant repo README(s), usually:
   - `README.md`
   - `codex_skills/README.md` (if adding/updating skills)
3. Infra Info snapshot JSON:
   - `docker_69:/home/hass/docker_files/infra_info/data/overview.json`

## Workflow

1. Collect current runtime truth from hosts (containers, network mode, ports, and workload role).
2. Update AGENTS host maps and operational notes first.
3. Update README sections impacted by the change (short, factual, no drift).
4. Update `overview.json` to mirror the same outcome at a high level.
5. Validate:
   - JSON is valid (`python -m json.tool` equivalent).
   - AGENTS and README statements do not conflict with runtime.

## Infra Info Content Rules

- Keep `overview.json` high-level and planning-focused.
- Do not include secrets, tokens, passwords, or internal file paths.
- Avoid step-by-step runbooks.
- Prefer host IDs and roles over low-level implementation detail.

## Output Contract

Always report:

- What changed (files + purpose).
- Final intended topology/placement.
- Any unresolved follow-up items.

