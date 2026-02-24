---
name: infrastructure-doc-sync
description: "Use when infra/container placement changes require synchronized AGENTS, docs, and Infra Info updates while keeping AGENTS concise, scoped, and non-runbook."
---

# Infrastructure Doc Sync

Keep infrastructure documentation aligned after operational changes.
Keep `AGENTS.md` short and task-scoped; move long runbooks to dedicated docs.

## When to Use

- Docker service moved between hosts.
- Network mode/port mapping changed.
- Host role changed (core, camera, edge, backup, etc.).
- Any update to an `AGENTS.md` file that affects infra context.
- Any user-facing shortcut URL changed (Dashy).

## Required Update Targets (As Applicable)

1. Workspace infra truth:
   - `../AGENTS.md` (workspace-level host/topology source)
2. Repo-scoped `AGENTS.md` files touched by the change:
   - Keep only hard constraints and applicability gates.
   - Remove/move long runbooks into dedicated docs.
3. Relevant repo docs:
   - `README.md`
   - `codex_skills/README.md` (if adding/updating skills)
4. Ops/runbook doc (if AGENTS runbook content is reduced):
   - Example: `docs/agent_ops_baselines.md` (repo-local operational baseline)
5. Dashy shortcuts (if any service URL/host changed):
   - `h:\hass\docker_files\dashy/conf.yml`
   - Reload Dashy on docker_17 after edits: `ssh hass@192.168.10.17 "cd ~/docker_files && docker compose up -d dashy"`
6. Infra Info snapshot JSON:
   - `docker_69:/home/hass/docker_files/infra_info/data/overview.json`

## Workflow

1. Collect current runtime truth from hosts (containers, network mode, ports, and workload role).
2. Update workspace `AGENTS.md` first for host/topology truth.
3. Update repo-level `AGENTS.md` with concise, scoped constraints only.
4. Move long operational/runbook details out of `AGENTS.md` into a dedicated doc when needed.
5. If end-user entry points changed, update Dashy shortcuts (`dashy/conf.yml`) to match reality.
6. Update README/skill docs impacted by the change (short, factual, no drift).
7. Update `overview.json` to mirror the same outcome at a high level.
8. Validate:
   - JSON is valid (`python -m json.tool` equivalent).
   - Dashy `conf.yml` references the intended hostname(s)/ports (no stale LAN IPs unless intentionally required).
   - AGENTS and README statements do not conflict with runtime.
   - Repo-level AGENTS do not contain long runbooks duplicated from dedicated docs.

## AGENTS Quality Rules

- Prefer short checklists over narrative paragraphs.
- Keep only non-discoverable, high-impact constraints in AGENTS.
- Add explicit applicability gates where a file has mixed-scope guidance.
- Keep specialized/deeper-scoped AGENTS concise and task-specific.
- De-duplicate repeated policy lines across global/workspace/repo scopes.

## Infra Info Content Rules

- Keep `overview.json` high-level and planning-focused.
- Do not include secrets, tokens, passwords, or internal file paths.
- Avoid step-by-step runbooks.
- Prefer host IDs and roles over low-level implementation detail.

## Dashy Content Rules

- Prefer stable hostnames (ex: `docker17`) over raw IPs when available.
- Prefer Cloudflare/public URLs for internet-facing apps where appropriate.
- Keep "Vibe Apps" grouped under the existing Dashy section unless the user asks for taxonomy changes.
- After edits, reload only Dashy (avoid restarting other docker_17 services).

## Output Contract

Always report:

- What changed (files + purpose).
- Final intended topology/placement.
- Any Dashy shortcuts touched (or explicitly state "no Dashy updates needed").
- Whether runbook content was moved from AGENTS into a dedicated ops doc.
- Any unresolved follow-up items.

