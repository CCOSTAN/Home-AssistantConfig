#!/usr/bin/env python
"""
Detect DRY violations in Home Assistant YAML by finding repeated structures.

Focus areas:
- Repeated trigger/condition/action blocks across automations
- Repeated sequence blocks across scripts
- Repeated entries inside those blocks
- Duplicate entries within a single block
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable

import yaml


class _Tagged(str):
    """Opaque holder for unknown YAML tags such as !include or !secret."""


class _Loader(yaml.SafeLoader):
    pass


def _construct_undefined(loader: _Loader, node: yaml.Node) -> Any:
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


AUTOMATION_KEYS: dict[str, tuple[str, ...]] = {
    "trigger": ("trigger", "triggers"),
    "condition": ("condition", "conditions"),
    "action": ("action", "actions"),
}

SCRIPT_KEYS: dict[str, tuple[str, ...]] = {
    "sequence": ("sequence",),
}

SKIP_DIRS = {".git", ".venv", ".codex_tmp", "__pycache__", ".mypy_cache"}


@dataclass(frozen=True)
class Candidate:
    kind: str  # "automation" | "script"
    name: str
    file_path: str
    path: str
    data: dict[str, Any]


@dataclass(frozen=True)
class Occurrence:
    file_path: str
    candidate_name: str
    candidate_path: str
    block_path: str


@dataclass(frozen=True)
class ParseError:
    file_path: str
    error: str


def _discover_yaml_files(paths: Iterable[str]) -> list[Path]:
    found: set[Path] = set()
    for raw in paths:
        p = Path(raw)
        if not p.exists():
            continue
        if p.is_file() and p.suffix.lower() in {".yaml", ".yml"}:
            found.add(p.resolve())
            continue
        if p.is_dir():
            for root, dirs, files in os.walk(p):
                dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
                root_path = Path(root)
                for name in files:
                    if Path(name).suffix.lower() in {".yaml", ".yml"}:
                        found.add((root_path / name).resolve())
    return sorted(found)


def _load_yaml_docs(path: Path) -> list[Any]:
    text = path.read_text(encoding="utf-8")
    return list(yaml.load_all(text, Loader=_Loader))


def _looks_like_automation(v: Any) -> bool:
    if not isinstance(v, dict):
        return False
    has_trigger = "trigger" in v or "triggers" in v
    has_action = "action" in v or "actions" in v
    return has_trigger and has_action


def _looks_like_script(v: Any) -> bool:
    return isinstance(v, dict) and "sequence" in v


def _candidate_name(kind: str, v: dict[str, Any], fallback: str) -> str:
    alias = v.get("alias")
    if isinstance(alias, str) and alias.strip():
        return alias.strip()
    cid = v.get("id")
    if isinstance(cid, str) and cid.strip():
        return cid.strip()
    return f"{kind}:{fallback}"


def _iter_container_items(container: Any) -> Iterable[tuple[str, dict[str, Any]]]:
    if isinstance(container, list):
        for idx, item in enumerate(container):
            if isinstance(item, dict):
                yield f"[{idx}]", item
        return
    if isinstance(container, dict):
        for key, item in container.items():
            if isinstance(item, dict):
                yield f".{key}", item


def _extract_candidates_from_doc(doc: Any, file_path: str, doc_idx: int) -> list[Candidate]:
    out: list[Candidate] = []
    root_path = "$" if doc_idx == 0 else f"$doc[{doc_idx}]"

    if isinstance(doc, list):
        for suffix, item in _iter_container_items(doc):
            if _looks_like_automation(item):
                name = _candidate_name("automation", item, f"{root_path}{suffix}")
                out.append(
                    Candidate(
                        kind="automation",
                        name=name,
                        file_path=file_path,
                        path=f"{root_path}{suffix}",
                        data=item,
                    )
                )
        return out

    if not isinstance(doc, dict):
        return out

    if _looks_like_automation(doc):
        name = _candidate_name("automation", doc, root_path)
        out.append(Candidate("automation", name, file_path, root_path, doc))

    if _looks_like_script(doc):
        name = _candidate_name("script", doc, root_path)
        out.append(Candidate("script", name, file_path, root_path, doc))

    if "automation" in doc:
        for suffix, item in _iter_container_items(doc["automation"]):
            if _looks_like_automation(item):
                name = _candidate_name("automation", item, f"{root_path}.automation{suffix}")
                out.append(
                    Candidate(
                        kind="automation",
                        name=name,
                        file_path=file_path,
                        path=f"{root_path}.automation{suffix}",
                        data=item,
                    )
                )

    if "script" in doc:
        for suffix, item in _iter_container_items(doc["script"]):
            if _looks_like_script(item):
                name = _candidate_name("script", item, f"{root_path}.script{suffix}")
                out.append(
                    Candidate(
                        kind="script",
                        name=name,
                        file_path=file_path,
                        path=f"{root_path}.script{suffix}",
                        data=item,
                    )
                )

    if out:
        return out

    for key, item in doc.items():
        if isinstance(item, dict) and _looks_like_automation(item):
            name = _candidate_name("automation", item, f"{root_path}.{key}")
            out.append(Candidate("automation", name, file_path, f"{root_path}.{key}", item))
        if isinstance(item, dict) and _looks_like_script(item):
            name = _candidate_name("script", item, f"{root_path}.{key}")
            out.append(Candidate("script", name, file_path, f"{root_path}.{key}", item))

    return out


def _normalize(value: Any) -> Any:
    if isinstance(value, _Tagged):
        return str(value)
    if isinstance(value, dict):
        normalized_items: list[tuple[str, Any]] = []
        for k, v in value.items():
            normalized_items.append((str(k), _normalize(v)))
        normalized_items.sort(key=lambda i: i[0])
        return {k: v for k, v in normalized_items}
    if isinstance(value, list):
        return [_normalize(v) for v in value]
    return value


def _fingerprint(value: Any) -> str:
    return json.dumps(_normalize(value), sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def _first_present_key(mapping: dict[str, Any], aliases: tuple[str, ...]) -> str | None:
    for key in aliases:
        if key in mapping:
            return key
    return None


def _iter_entries(value: Any) -> Iterable[tuple[str, Any]]:
    if isinstance(value, list):
        for idx, entry in enumerate(value):
            yield f"[{idx}]", entry
        return
    yield "", value


def _block_keys_for_candidate(candidate: Candidate) -> dict[str, tuple[str, ...]]:
    if candidate.kind == "automation":
        return AUTOMATION_KEYS
    return SCRIPT_KEYS


def _recommendation(block_label: str) -> str:
    if block_label in {"action", "sequence"}:
        return "Move repeated logic to a shared script and call it with variables."
    if block_label == "condition":
        return "Extract shared condition logic into helpers/template sensors or merge condition blocks."
    return "Consolidate repeated trigger patterns where behavior is equivalent."


def _render_occurrences(occurrences: list[Occurrence], max_rows: int = 6) -> str:
    lines: list[str] = []
    for occ in occurrences[:max_rows]:
        lines.append(
            f"    - {occ.file_path} :: {occ.block_path} ({occ.candidate_name})"
        )
    if len(occurrences) > max_rows:
        lines.append(f"    - ... {len(occurrences) - max_rows} more")
    return "\n".join(lines)


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser(description="Detect duplicated Home Assistant YAML structures.")
    ap.add_argument("paths", nargs="+", help="YAML file(s) or directory path(s) to scan")
    ap.add_argument("--min-occurrences", type=int, default=2, help="Minimum duplicate count to report (default: 2)")
    ap.add_argument("--max-groups", type=int, default=50, help="Maximum duplicate groups to print (default: 50)")
    ap.add_argument("--strict", action="store_true", help="Return non-zero when duplicates are found")
    args = ap.parse_args(argv)

    if args.min_occurrences < 2:
        print("ERROR: --min-occurrences must be >= 2", file=sys.stderr)
        return 2

    files = _discover_yaml_files(args.paths)
    if not files:
        print("ERROR: no YAML files found for the provided paths", file=sys.stderr)
        return 2

    parse_errors: list[ParseError] = []
    candidates: list[Candidate] = []

    for path in files:
        try:
            docs = _load_yaml_docs(path)
        except Exception as exc:
            parse_errors.append(ParseError(file_path=str(path), error=str(exc)))
            continue

        for doc_idx, doc in enumerate(docs):
            candidates.extend(_extract_candidates_from_doc(doc, str(path), doc_idx))

    full_index: dict[tuple[str, str, str], list[Occurrence]] = defaultdict(list)
    entry_index: dict[tuple[str, str, str], list[Occurrence]] = defaultdict(list)
    intra_duplicate_notes: list[str] = []

    for candidate in candidates:
        block_key_map = _block_keys_for_candidate(candidate)
        for block_label, aliases in block_key_map.items():
            source_key = _first_present_key(candidate.data, aliases)
            if not source_key:
                continue

            block_value = candidate.data[source_key]
            if block_value in (None, [], {}):
                continue

            block_fp = _fingerprint(block_value)
            full_index[(candidate.kind, block_label, block_fp)].append(
                Occurrence(
                    file_path=candidate.file_path,
                    candidate_name=candidate.name,
                    candidate_path=candidate.path,
                    block_path=f"{candidate.path}.{source_key}",
                )
            )

            seen_in_candidate: dict[str, list[str]] = defaultdict(list)
            for suffix, entry in _iter_entries(block_value):
                entry_fp = _fingerprint(entry)
                entry_occ = Occurrence(
                    file_path=candidate.file_path,
                    candidate_name=candidate.name,
                    candidate_path=candidate.path,
                    block_path=f"{candidate.path}.{source_key}{suffix}",
                )
                entry_index[(candidate.kind, block_label, entry_fp)].append(entry_occ)
                seen_in_candidate[entry_fp].append(entry_occ.block_path)

            for entry_fp, block_paths in seen_in_candidate.items():
                if len(block_paths) >= args.min_occurrences:
                    intra_duplicate_notes.append(
                        (
                            f"INTRA {candidate.kind}.{block_label}: {candidate.name} has "
                            f"{len(block_paths)} duplicated entries in {candidate.path}.{source_key}"
                        )
                    )

    def _filter_groups(index: dict[tuple[str, str, str], list[Occurrence]]) -> list[tuple[tuple[str, str, str], list[Occurrence]]]:
        groups = [(k, v) for k, v in index.items() if len(v) >= args.min_occurrences]
        groups.sort(key=lambda item: (-len(item[1]), item[0][0], item[0][1]))
        return groups

    full_groups = _filter_groups(full_index)
    entry_groups = _filter_groups(entry_index)
    intra_duplicate_notes = sorted(set(intra_duplicate_notes))

    print(f"Scanned files: {len(files)}")
    print(f"Parsed candidates: {len(candidates)}")
    print(f"Parse errors: {len(parse_errors)}")
    print(f"Duplicate full-block groups: {len(full_groups)}")
    print(f"Duplicate entry groups: {len(entry_groups)}")
    print(f"Intra-block duplicates: {len(intra_duplicate_notes)}")

    if parse_errors:
        print("\nParse errors:")
        for err in parse_errors:
            print(f"  - {err.file_path}: {err.error}")

    if full_groups:
        print("\nFULL_BLOCK findings:")
        for idx, ((kind, block_label, _), occurrences) in enumerate(full_groups[: args.max_groups], start=1):
            print(f"{idx}. {kind}.{block_label} repeated {len(occurrences)} times")
            print(_render_occurrences(occurrences))
            print(f"    suggestion: {_recommendation(block_label)}")

    if entry_groups:
        print("\nENTRY findings:")
        for idx, ((kind, block_label, _), occurrences) in enumerate(entry_groups[: args.max_groups], start=1):
            print(f"{idx}. {kind}.{block_label} entry repeated {len(occurrences)} times")
            print(_render_occurrences(occurrences))
            print(f"    suggestion: {_recommendation(block_label)}")

    if intra_duplicate_notes:
        print("\nINTRA findings:")
        for idx, note in enumerate(intra_duplicate_notes[: args.max_groups], start=1):
            print(f"{idx}. {note}")

    duplicate_count = len(full_groups) + len(entry_groups) + len(intra_duplicate_notes)
    if args.strict and duplicate_count > 0:
        return 1
    if parse_errors:
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
