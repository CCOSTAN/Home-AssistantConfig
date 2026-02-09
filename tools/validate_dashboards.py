#!/usr/bin/env python3
"""
Fast local validation for YAML-managed Lovelace dashboards.

Goals:
- Catch missing include targets (most common cause of "Unknown error" in UI).
- Catch missing dashboard entrypoints referenced by configuration.yaml.
- Encourage a repeatable workflow before restarting Home Assistant.
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path


RE_INCLUDE = re.compile(r"!\s*(include(?:_dir_(?:list|merge_list|named|merge_named))?)\s+([^\s#]+)")
RE_TOP_LEVEL_KEY = re.compile(r"^[A-Za-z0-9_]+:\s*$")


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def to_local_path(root: Path, config_path: str) -> Path:
    # Lovelace includes in this repo should use /config/... paths.
    if config_path.startswith("/config/"):
        rel = config_path[len("/config/") :]
        return root / "config" / rel
    # Allow relative includes (rare). Resolve from repo root.
    return (root / config_path).resolve()


def iter_yaml_files(root: Path) -> list[Path]:
    return sorted((root / "config" / "dashboards").rglob("*.yaml"))

def extract_top_level_block(text: str, key: str) -> str | None:
    lines = text.splitlines()
    start = None
    for i, line in enumerate(lines):
        if re.match(rf"^{re.escape(key)}:\s*$", line):
            start = i
            break
    if start is None:
        return None

    end = len(lines)
    for j in range(start + 1, len(lines)):
        line = lines[j]
        if not line or line.lstrip().startswith("#"):
            continue
        if line.startswith(" "):
            continue
        if RE_TOP_LEVEL_KEY.match(line):
            end = j
            break

    # Return block content excluding the "<key>:" line itself.
    return "\n".join(lines[start + 1 : end]) + "\n"


def validate_headers(yaml_files: list[Path]) -> list[str]:
    errs: list[str] = []
    for p in yaml_files:
        try:
            head = p.read_text(encoding="utf-8", errors="replace").splitlines()[:3]
        except OSError as e:
            errs.append(f"ERROR: cannot read {p}: {e}")
            continue
        joined = "\n".join(head)
        if "######################################################################" not in joined:
            errs.append(f"ERROR: missing @CCOSTAN header block: {p}")
    return errs


def validate_includes(root: Path, yaml_files: list[Path]) -> list[str]:
    errs: list[str] = []
    for p in yaml_files:
        try:
            text = p.read_text(encoding="utf-8", errors="replace")
        except OSError as e:
            errs.append(f"ERROR: cannot read {p}: {e}")
            continue

        for m in RE_INCLUDE.finditer(text):
            tag = m.group(1)
            target = m.group(2).strip().strip("'\"")
            local = to_local_path(root, target)
            if tag.startswith("include_dir_"):
                if not local.exists():
                    errs.append(f"ERROR: include dir missing ({tag}): {p} -> {target}")
                elif not local.is_dir():
                    errs.append(f"ERROR: include dir is not a directory ({tag}): {p} -> {target}")
                else:
                    # For include_dir_list, ensure there is at least one yaml.
                    if tag == "include_dir_list":
                        found = list(Path(local).glob("*.yaml"))
                        if not found:
                            errs.append(f"ERROR: include_dir_list empty: {p} -> {target}")
            else:
                if not local.exists():
                    errs.append(f"ERROR: include file missing ({tag}): {p} -> {target}")
                elif not local.is_file():
                    errs.append(f"ERROR: include file is not a file ({tag}): {p} -> {target}")
    return errs


def validate_configuration_wiring(root: Path) -> list[str]:
    errs: list[str] = []
    cfg = root / "config" / "configuration.yaml"
    if not cfg.exists():
        return [f"ERROR: missing {cfg}"]

    text = cfg.read_text(encoding="utf-8", errors="replace")
    if "\nlovelace:" not in text:
        errs.append("ERROR: config/configuration.yaml missing `lovelace:` block (YAML dashboards wiring).")
    lovelace_block = extract_top_level_block(text, "lovelace")
    if lovelace_block is None:
        errs.append("ERROR: config/configuration.yaml missing `lovelace:` block (YAML dashboards wiring).")
        return errs

    # Legacy (pre-2026.8) style was `lovelace: { mode: yaml }`. This must not exist.
    if re.search(r"(?m)^\s{2}mode:\s*yaml\s*$", lovelace_block):
        errs.append(
            "ERROR: config/configuration.yaml uses legacy `lovelace.mode: yaml` (removed in HA 2026.8). "
            "Define the YAML Overview as a `lovelace.dashboards.lovelace` entry instead."
        )

    # New (2026.8+) style: YAML Overview is declared as a dashboard pointing at ui-lovelace.yaml.
    ll_lines = lovelace_block.splitlines()
    dash_i = next((i for i, l in enumerate(ll_lines) if re.match(r"^\s{2}dashboards:\s*$", l)), None)
    if dash_i is None:
        errs.append("ERROR: config/configuration.yaml missing `lovelace.dashboards:` block.")
    else:
        lov_i = next((i for i in range(dash_i + 1, len(ll_lines)) if re.match(r"^\s{4}lovelace:\s*$", ll_lines[i])), None)
        if lov_i is None:
            errs.append("ERROR: config/configuration.yaml missing `lovelace.dashboards.lovelace:` entry.")
        else:
            entry: list[str] = []
            for j in range(lov_i + 1, len(ll_lines)):
                line = ll_lines[j]
                if not line or line.lstrip().startswith("#"):
                    entry.append(line)
                    continue
                # Next dashboard entry (same indent) or end of dashboards block.
                if re.match(r"^\s{4}[A-Za-z0-9_-]+:\s*$", line):
                    break
                if re.match(r"^\s{2}[A-Za-z0-9_-]+:\s*$", line):
                    break
                entry.append(line)

            entry_text = "\n".join(entry) + "\n"
            if not re.search(r"(?m)^\s{6}mode:\s*yaml\s*$", entry_text):
                errs.append("ERROR: config/configuration.yaml missing `lovelace.dashboards.lovelace.mode: yaml`.")
            if not re.search(r"(?m)^\s{6}filename:\s*ui-lovelace\.yaml\s*$", entry_text):
                errs.append("ERROR: config/configuration.yaml missing `lovelace.dashboards.lovelace.filename: ui-lovelace.yaml`.")

    ui = root / "config" / "ui-lovelace.yaml"
    if not ui.exists():
        errs.append("ERROR: missing config/ui-lovelace.yaml (YAML Overview entrypoint).")

    required_paths = [
        root / "config" / "dashboards" / "resources.yaml",
        root / "config" / "dashboards" / "overview" / "dashboard.yaml",
        root / "config" / "dashboards" / "infrastructure" / "dashboard.yaml",
        root / "config" / "dashboards" / "kiosk" / "dashboard.yaml",
    ]
    for rp in required_paths:
        if not rp.exists():
            errs.append(f"ERROR: missing required dashboard file: {rp}")
    return errs


def main() -> int:
    root = repo_root()
    dashboards_dir = root / "config" / "dashboards"
    if not dashboards_dir.exists():
        print(f"ERROR: missing dashboards dir: {dashboards_dir}")
        return 2

    yaml_files = iter_yaml_files(root)
    errs: list[str] = []
    errs.extend(validate_configuration_wiring(root))
    errs.extend(validate_headers(yaml_files))
    errs.extend(validate_includes(root, yaml_files))

    if errs:
        for e in errs:
            print(e)
        print(f"FAIL ({len(errs)} issues)")
        return 2

    print(f"OK: validated {len(yaml_files)} dashboard YAML files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
