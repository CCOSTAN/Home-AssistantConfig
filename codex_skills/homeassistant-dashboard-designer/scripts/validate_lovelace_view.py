#!/usr/bin/env python
"""
Lightweight validator for Lovelace view YAML files.

Goal: catch common violations of the homeassistant-dashboard-designer constraints
before Home Assistant reloads.

This is NOT a full Lovelace schema validator.
"""

from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import yaml


class _Tagged(str):
    pass


class _Loader(yaml.SafeLoader):
    pass


def _construct_undefined(loader: _Loader, node: yaml.Node) -> Any:
    # Preserve unknown tags (e.g., !include, !include_dir_list) as opaque strings.
    if isinstance(node, yaml.ScalarNode):
        return _Tagged(f"{node.tag} {node.value}")
    if isinstance(node, yaml.SequenceNode):
        seq = loader.construct_sequence(node)
        return _Tagged(f"{node.tag} {seq!r}")
    if isinstance(node, yaml.MappingNode):
        mapping = loader.construct_mapping(node)
        return _Tagged(f"{node.tag} {mapping!r}")
    return _Tagged(f"{node.tag}")


_Loader.add_constructor(None, _construct_undefined)  # type: ignore[arg-type]


@dataclass(frozen=True)
class Finding:
    level: str  # "ERROR" | "WARN"
    path: str
    message: str


ALLOWED_LAYOUT = {"grid", "vertical-stack"}
DISALLOWED_CARD_TYPES = {"horizontal-stack"}

# Cards allowed without justification (design-system tiering is enforced in SKILL.md; this is a lint).
ALLOWED_CARD_TYPES = {
    "grid",
    "vertical-stack",
    "custom:button-card",
    "custom:flex-horseshoe-card",
    "custom:mini-graph-card",
    # Tier-2 fallbacks (validator does not enforce justification comments).
    "entities",
    "markdown",
    "history-graph",
    "conditional",
    "iframe",
}


def _is_mapping(v: Any) -> bool:
    return isinstance(v, dict)


def _is_sequence(v: Any) -> bool:
    return isinstance(v, list)


def _card_type(card: dict[str, Any]) -> str | None:
    t = card.get("type")
    if isinstance(t, str):
        return t
    return None


def _validate_layout_depth(
    *,
    node: Any,
    cur_depth: int,
    max_depth: int,
    node_path: str,
    findings: list[Finding],
) -> None:
    if not _is_mapping(node):
        return

    ctype = _card_type(node)
    if ctype in ALLOWED_LAYOUT:
        cur_depth += 1
        if cur_depth > max_depth:
            findings.append(
                Finding(
                    level="ERROR",
                    path=node_path,
                    message=f"Layout nesting depth {cur_depth} exceeds max {max_depth}.",
                )
            )

    cards = node.get("cards")
    if _is_sequence(cards):
        for idx, child in enumerate(cards):
            _validate_layout_depth(
                node=child,
                cur_depth=cur_depth,
                max_depth=max_depth,
                node_path=f"{node_path}.cards[{idx}]",
                findings=findings,
            )


def _walk_cards(node: Any, node_path: str, findings: list[Finding]) -> None:
    if _is_mapping(node):
        ctype = _card_type(node)
        if ctype in DISALLOWED_CARD_TYPES:
            findings.append(
                Finding(
                    level="ERROR",
                    path=node_path,
                    message=f"Disallowed card type: {ctype}",
                )
            )
        if ctype and ctype not in ALLOWED_CARD_TYPES:
            findings.append(
                Finding(
                    level="WARN",
                    path=node_path,
                    message=f"Unknown/unlisted card type: {ctype}",
                )
            )

        if ctype == "custom:button-card":
            tmpl = node.get("template")
            if tmpl is None:
                findings.append(
                    Finding(
                        level="ERROR",
                        path=node_path,
                        message="custom:button-card must set template: (string or list).",
                    )
                )
            if "styles" in node:
                findings.append(
                    Finding(
                        level="ERROR",
                        path=node_path,
                        message="Per-card styles: are not allowed; move styling into centralized templates.",
                    )
                )
            if "card_mod" in node:
                findings.append(
                    Finding(
                        level="ERROR",
                        path=node_path,
                        message="Per-card card_mod: is not allowed on button-card instances; use shared snippets or templates.",
                    )
                )

        cards = node.get("cards")
        if _is_sequence(cards):
            for idx, child in enumerate(cards):
                _walk_cards(child, f"{node_path}.cards[{idx}]", findings)

    elif _is_sequence(node):
        for idx, child in enumerate(node):
            _walk_cards(child, f"{node_path}[{idx}]", findings)


def _load_yaml(path: Path) -> Any:
    txt = path.read_text(encoding="utf-8")
    return yaml.load(txt, Loader=_Loader)


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("view_yaml", type=Path, help="Path to a Lovelace view YAML file")
    ap.add_argument("--max-layout-depth", type=int, default=2)
    ap.add_argument("--strict", action="store_true", help="Treat WARN findings as errors (non-zero exit).")
    args = ap.parse_args(argv)

    if not args.view_yaml.exists():
        print(f"ERROR: file not found: {args.view_yaml}", file=sys.stderr)
        return 2

    try:
        doc = _load_yaml(args.view_yaml)
    except Exception as e:
        print(f"ERROR: failed to parse YAML: {e}", file=sys.stderr)
        return 2

    findings: list[Finding] = []

    # The repo uses "one YAML file per view (single view dict)".
    if not _is_mapping(doc):
        findings.append(Finding(level="ERROR", path="$", message="View file must be a single YAML mapping (one view dict)."))
    else:
        # Support both classic views (`cards:`) and sections views (`type: sections`, `sections:`).
        if "cards" in doc:
            _validate_layout_depth(
                node=doc,
                cur_depth=0,
                max_depth=args.max_layout_depth,
                node_path="$",
                findings=findings,
            )
            _walk_cards(doc.get("cards", []), "$.cards", findings)
        elif doc.get("type") == "sections" and "sections" in doc:
            sections = doc.get("sections")
            if isinstance(sections, _Tagged):
                findings.append(
                    Finding(
                        level="WARN",
                        path="$.sections",
                        message="sections is an !include/unknown tag; validator cannot inspect included sections content.",
                    )
                )
            elif _is_sequence(sections):
                for sidx, section in enumerate(sections):
                    spath = f"$.sections[{sidx}]"
                    if not _is_mapping(section):
                        findings.append(Finding(level="ERROR", path=spath, message="Section must be a mapping."))
                        continue

                    _validate_layout_depth(
                        node=section,
                        cur_depth=0,
                        max_depth=args.max_layout_depth,
                        node_path=spath,
                        findings=findings,
                    )
                    _walk_cards(section.get("cards", []), f"{spath}.cards", findings)
            else:
                findings.append(
                    Finding(
                        level="ERROR",
                        path="$.sections",
                        message="sections must be a list (or an !include tag).",
                    )
                )
        else:
            findings.append(
                Finding(
                    level="ERROR",
                    path="$",
                    message="View dict must contain cards: or be type: sections with sections:.",
                )
            )

    errors = [f for f in findings if f.level == "ERROR"]
    warns = [f for f in findings if f.level == "WARN"]

    for f in errors + warns:
        print(f"{f.level}: {f.path}: {f.message}")

    if errors:
        return 1
    if warns and args.strict:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
