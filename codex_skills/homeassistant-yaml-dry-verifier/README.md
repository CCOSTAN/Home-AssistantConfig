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

# HA YAML DRY Verifier (Codex Skill)

This directory contains the `homeassistant-yaml-dry-verifier` skill and the CLI used to detect repeated YAML structures in Home Assistant automations/scripts/packages.

### Quick navigation
- You are here: `codex_skills/homeassistant-yaml-dry-verifier/`
- [Repo overview](../../README.md) | [Codex skills](../README.md) | [Packages](../../config/packages/README.md) | [Scripts](../../config/script/README.md)

## What This Skill Does

- Detects repeated `trigger`, `condition`, `action`, and `sequence` blocks.
- Detects repeated entries inside those blocks.
- Detects duplicate entries within a single block (`INTRA`).
- Detects package-defined scripts called from multiple files (`CENTRAL_SCRIPT`).
- Collapses noisy ENTRY reports when they are already fully explained by an identical `FULL_BLOCK` finding.

## CLI Usage

Run on one file:

```bash
python codex_skills/homeassistant-yaml-dry-verifier/scripts/verify_ha_yaml_dry.py config/packages/bearclaw.yaml
```

Run on broader scope:

```bash
python codex_skills/homeassistant-yaml-dry-verifier/scripts/verify_ha_yaml_dry.py config/packages config/script
```

Strict mode (non-zero exit if findings exist):

```bash
python codex_skills/homeassistant-yaml-dry-verifier/scripts/verify_ha_yaml_dry.py config/packages config/script --strict
```

## Output Model

The CLI prints:
- Scan summary counts
- `FULL_BLOCK` findings
- `ENTRY` findings
- `INTRA` findings
- `CENTRAL_SCRIPT` findings

Exit codes:
- `0`: success (or findings in non-strict mode)
- `1`: findings present in strict mode
- `2`: parse/path errors

## Notes

- This verifier intentionally keeps text output and a small CLI surface.
- It does not implement suppression files, severity scoring, JSON output, or diff-only mode.
- Use it as a fast pre-refactor signal and pair with Home Assistant config validation before restart/reload.

**All of my configuration files are tested against the most stable version of home-assistant.**

<a name="bottom" href="https://github.com/CCOSTAN/Home-AssistantConfig#logo"><img align="right" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/up_arrow.png" width="25" ></a>

**Still have questions on my Config?** <br>
**Message me on X :** [![Follow CCostan](https://img.shields.io/twitter/follow/CCostan)](https://www.x.com/ccostan)

<p align="center">
<a target="_blank" href="https://www.buymeacoffee.com/vCloudInfo"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">You can buy me a coffee</span></a><a target="_blank" href="https://www.buymeacoffee.com/vCloudInfo"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"></a>
<br>
<a href="https://eepurl.com/dmXFYz"><img align="center" border="0" src="https://raw.githubusercontent.com/CCOSTAN/Home-AssistantConfig/master/config/www/custom_ui/floorplan/images/branding/email_link.png" height="50" ></a><br>
<a href="https://www.vcloudinfo.com/p/affiliate-disclosure.html">
Affiliate Disclosure
</a></p>
