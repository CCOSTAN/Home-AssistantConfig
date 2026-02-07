<h1 align="center">
  Home Assistant Dashboard Designer (Codex Skill)
</h1>

This directory contains the `homeassistant-dashboard-designer` Codex skill, stored in-repo so it can be shared with the community.

### Quick navigation
- You are here: `codex_skills/homeassistant-dashboard-designer/`
- [Repo overview](../../README.md) | [Codex skills](../README.md) | [Dashboards](../../config/dashboards/README.md) | [Issues](https://github.com/CCOSTAN/Home-AssistantConfig/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)

## What This Skill Does

- Enforces a constrained Lovelace design system (button-card first, minimal card-mod, grid/vertical-stack layout rules).
- Encourages centralized templates and deterministic YAML output.
- Treats Stitch MCP output as *inspiration only* and translates ideas into safe Lovelace YAML.

Skill source of truth inside this folder:
- `SKILL.md`
- `agents/openai.yaml`
- `references/dashboard_rules.md`
- `scripts/validate_lovelace_view.py`

## Install (Local Codex)

Codex loads skills from your local Codex skills directory.

1. Copy this folder into your Codex skills directory as:
   - `~/.codex/skills/homeassistant-dashboard-designer/` (Linux/macOS)
   - `%USERPROFILE%\\.codex\\skills\\homeassistant-dashboard-designer\\` (Windows)
2. Restart your Codex session/editor so it re-indexes skills.

## Stitch MCP Install (Design Inspiration)

Stitch is optional and used only for design inspiration. To enable it, add a Stitch MCP server entry to your Codex config.

1. Set an environment variable with your API key:
   - `STITCH_API_KEY=<your_key>`
2. Add this to your `~/.codex/config.toml`:

```toml
[mcp_servers.stitch]
url = "https://stitch.googleapis.com/mcp"
env_http_headers = { "X-Goog-Api-Key" = "STITCH_API_KEY" }
http_headers = { "Accept" = "application/json" }
```

## Usage

Invoke in chat:
- `$homeassistant-dashboard-designer`

Then provide the structured intent block described in `SKILL.md` (dashboard intent, view name, entity map, and layout constraints).

### Notes
- This skill intentionally contains no secrets. Configure MCP credentials via environment variables in your local Codex setup.

<a name="bottom" href="https://github.com/CCOSTAN/Home-AssistantConfig#logo"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="25" ></a>
