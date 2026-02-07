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

# Home Assistant Dashboard Designer (Codex Skill)

This directory contains the `homeassistant-dashboard-designer` Codex skill, stored in-repo so it can be shared with the community.

### Quick navigation
- You are here: `codex_skills/homeassistant-dashboard-designer/`
- [Repo overview](../../README.md) | [Codex skills](../README.md) | [Dashboards](../../config/dashboards/README.md) | [Issues](https://github.com/CCOSTAN/Home-AssistantConfig/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)

## What This Skill Does

- Enforces a constrained Lovelace design system (button-card first, minimal card-mod, grid/vertical-stack layout rules).
- Encourages centralized templates and deterministic YAML output.
- Treats Stitch MCP output as inspiration only and translates ideas into safe Lovelace YAML.

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

## Home Assistant MCP (Built-In) Enablement

The Home Assistant MCP lets Codex validate entity IDs and service calls against your *real* HA instance before it edits YAML.

1. Create a Home Assistant Long-Lived Access Token (Profile page in HA).
2. Set an environment variable (do not commit tokens):
   - `HOMEASSISTANT_MCP_AUTH=Bearer <your_long_lived_access_token>`
3. Add this to your `~/.codex/config.toml`:

```toml
[mcp_servers.homeassistant]
url = "http://<your-ha-host>:8123/api/mcp"
env_http_headers = { "Authorization" = "HOMEASSISTANT_MCP_AUTH" }
```

Notes:
- Use `https://` if your HA is behind TLS.
- Keep tokens in environment variables, not in files under git.

### Notes
- This skill intentionally contains no secrets. Configure MCP credentials via environment variables in your local Codex setup.

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
