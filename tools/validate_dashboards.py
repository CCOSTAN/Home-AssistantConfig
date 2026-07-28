#!/usr/bin/env python3
"""Strict validation for YAML-managed Home Assistant Lovelace dashboards."""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable

import yaml
from yaml.constructor import ConstructorError


HEADER_MARKER = "######################################################################"
HEADER_REQUIRED = (
    "# @CCOSTAN - Follow Me on X",
    "# For more info visit https://www.vcloudinfo.com/click-here",
    "# Original Repo : https://github.com/CCOSTAN/Home-AssistantConfig",
)
INCLUDE_TAGS = {
    "!include",
    "!include_dir_list",
    "!include_dir_merge_list",
    "!include_dir_named",
    "!include_dir_merge_named",
}
ENTITY_ID_RE = re.compile(r"^[a-z][a-z0-9_]*\.[a-z0-9_]+$")
ENTITY_ID_SEARCH_RE = re.compile(
    r"(?<![A-Za-z0-9_])([a-z][a-z0-9_]*\.[a-z0-9_]+)(?![A-Za-z0-9_])"
)
VIEW_PATH_RE = re.compile(r"^[A-Za-z0-9_-]+$")
ENTITY_KEYS = {"entity", "entity_id", "camera_image"}


class ValidationError(RuntimeError):
    """A repository validation failure with a user-actionable message."""


@dataclass(frozen=True)
class TaggedValue:
    tag: str
    value: Any


@dataclass(frozen=True)
class ValidationResult:
    dashboard_count: int
    parsed_files: tuple[Path, ...]
    routes: tuple[str, ...]
    entity_references: tuple[str, ...]


class HomeAssistantLoader(yaml.SafeLoader):
    """Safe YAML loader that preserves Home Assistant custom tags."""

    def construct_mapping(self, node: yaml.MappingNode, deep: bool = False) -> dict[Any, Any]:
        if not isinstance(node, yaml.MappingNode):
            raise ConstructorError(None, None, "expected a mapping node", node.start_mark)

        mapping: dict[Any, Any] = {}
        for key_node, value_node in node.value:
            key = self.construct_object(key_node, deep=deep)
            try:
                duplicate = key in mapping
            except TypeError as exc:
                raise ConstructorError(
                    "while constructing a mapping",
                    node.start_mark,
                    "found an unhashable key",
                    key_node.start_mark,
                ) from exc
            if duplicate:
                raise ConstructorError(
                    "while constructing a mapping",
                    node.start_mark,
                    f"found duplicate key {key!r}",
                    key_node.start_mark,
                )
            mapping[key] = self.construct_object(value_node, deep=deep)
        return mapping


# Home Assistant treats on/off/yes/no as strings rather than YAML 1.1 booleans.
HomeAssistantLoader.yaml_implicit_resolvers = {
    key: list(value) for key, value in yaml.SafeLoader.yaml_implicit_resolvers.items()
}
for resolver_key, resolvers in list(HomeAssistantLoader.yaml_implicit_resolvers.items()):
    HomeAssistantLoader.yaml_implicit_resolvers[resolver_key] = [
        resolver for resolver in resolvers if resolver[0] != "tag:yaml.org,2002:bool"
    ]


def _construct_tagged(
    loader: HomeAssistantLoader, tag_suffix: str, node: yaml.Node
) -> TaggedValue:
    if isinstance(node, yaml.ScalarNode):
        value = loader.construct_scalar(node)
    elif isinstance(node, yaml.SequenceNode):
        value = loader.construct_sequence(node, deep=True)
    elif isinstance(node, yaml.MappingNode):
        value = loader.construct_mapping(node, deep=True)
    else:  # pragma: no cover - PyYAML currently exposes only these node types.
        raise ConstructorError(None, None, "unsupported tagged YAML node", node.start_mark)
    return TaggedValue(f"!{tag_suffix}", value)


HomeAssistantLoader.add_multi_constructor("!", _construct_tagged)


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def parse_yaml(path: Path) -> Any:
    try:
        text = path.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        raise ValidationError(f"cannot read YAML file {path}: {exc}") from exc

    try:
        return yaml.load(text, Loader=HomeAssistantLoader)
    except yaml.YAMLError as exc:
        raise ValidationError(f"invalid YAML in {path}: {exc}") from exc


def _yaml_files(path: Path) -> list[Path]:
    return sorted(
        child.resolve()
        for child in path.iterdir()
        if child.is_file() and child.suffix.lower() in {".yaml", ".yml"}
    )


class DashboardRepositoryValidator:
    def __init__(self, root: Path) -> None:
        self.root = root.resolve()
        self.config_dir = (self.root / "config").resolve()
        self.dashboard_dir = (self.config_dir / "dashboards").resolve()
        self._cache: dict[Path, Any] = {}
        self._visiting: set[Path] = set()
        self.parsed_files: set[Path] = set()
        self.dashboard_documents: list[Any] = []

    def _ensure_config_path(self, path: Path) -> Path:
        resolved = path.resolve()
        try:
            resolved.relative_to(self.config_dir)
        except ValueError as exc:
            raise ValidationError(f"include escapes config directory: {resolved}") from exc
        return resolved

    def resolve_target(self, source: Path, target: str) -> Path:
        if not isinstance(target, str) or not target.strip():
            raise ValidationError(f"empty include target in {source}")
        target = target.strip()
        if target.startswith("/config/"):
            candidate = self.config_dir / target[len("/config/") :]
        elif target == "/config":
            candidate = self.config_dir
        else:
            candidate = source.parent / target
        return self._ensure_config_path(candidate)

    def load_file(self, path: Path) -> Any:
        path = self._ensure_config_path(path)
        if not path.exists():
            raise ValidationError(f"missing include file: {path}")
        if not path.is_file():
            raise ValidationError(f"include target is not a file: {path}")
        if path in self._cache:
            return self._cache[path]
        if path in self._visiting:
            raise ValidationError(f"cyclic YAML include detected at {path}")

        self._visiting.add(path)
        try:
            document = parse_yaml(path)
            self.parsed_files.add(path)
            resolved = self.resolve_value(document, path)
            self._cache[path] = resolved
            return resolved
        finally:
            self._visiting.remove(path)

    def _load_directory(self, source: Path, tagged: TaggedValue) -> Any:
        directory = self.resolve_target(source, str(tagged.value))
        if not directory.exists():
            raise ValidationError(f"missing include directory: {directory}")
        if not directory.is_dir():
            raise ValidationError(f"include target is not a directory: {directory}")
        files = _yaml_files(directory)
        if not files:
            raise ValidationError(f"include directory contains no YAML files: {directory}")

        documents = [self.load_file(path) for path in files]
        if tagged.tag == "!include_dir_list":
            return documents
        if tagged.tag == "!include_dir_merge_list":
            merged: list[Any] = []
            for path, document in zip(files, documents):
                if not isinstance(document, list):
                    raise ValidationError(
                        f"{tagged.tag} requires every file to contain a list: {path}"
                    )
                merged.extend(document)
            return merged
        if tagged.tag == "!include_dir_named":
            return {path.stem: document for path, document in zip(files, documents)}
        if tagged.tag == "!include_dir_merge_named":
            merged_mapping: dict[Any, Any] = {}
            for path, document in zip(files, documents):
                if not isinstance(document, dict):
                    raise ValidationError(
                        f"{tagged.tag} requires every file to contain a mapping: {path}"
                    )
                duplicates = set(merged_mapping).intersection(document)
                if duplicates:
                    duplicate_text = ", ".join(sorted(map(str, duplicates)))
                    raise ValidationError(
                        f"duplicate merged keys in {path}: {duplicate_text}"
                    )
                merged_mapping.update(document)
            return merged_mapping
        raise ValidationError(f"unsupported include directory tag {tagged.tag} in {source}")

    def resolve_value(self, value: Any, source: Path) -> Any:
        if isinstance(value, TaggedValue):
            if value.tag == "!include":
                return self.load_file(self.resolve_target(source, str(value.value)))
            if value.tag in INCLUDE_TAGS:
                return self._load_directory(source, value)
            return TaggedValue(value.tag, self.resolve_value(value.value, source))
        if isinstance(value, list):
            return [self.resolve_value(item, source) for item in value]
        if isinstance(value, dict):
            return {
                key: self.resolve_value(item, source) for key, item in value.items()
            }
        return value

    def validate_headers(self) -> None:
        if not self.dashboard_dir.exists():
            raise ValidationError(f"missing dashboards directory: {self.dashboard_dir}")
        for path in sorted(self.dashboard_dir.rglob("*.yaml")):
            try:
                head = path.read_text(encoding="utf-8").splitlines()[:8]
            except (OSError, UnicodeError) as exc:
                raise ValidationError(f"cannot read dashboard header {path}: {exc}") from exc
            if not head or head[0] != HEADER_MARKER:
                raise ValidationError(f"missing standard header delimiter: {path}")
            missing = [line for line in HEADER_REQUIRED if line not in head]
            if missing:
                raise ValidationError(
                    f"incomplete standard header in {path}; missing {missing[0]!r}"
                )

    def validate_dashboard(self, slug: str, document: Any) -> list[str]:
        if not isinstance(document, dict):
            raise ValidationError(f"dashboard {slug!r} must resolve to a mapping")
        views = document.get("views")
        if not isinstance(views, list) or not views:
            raise ValidationError(f"dashboard {slug!r} must contain a non-empty views list")

        paths: list[str] = []
        for index, view in enumerate(views):
            if not isinstance(view, dict):
                raise ValidationError(
                    f"dashboard {slug!r} view {index} must resolve to a mapping"
                )
            path = view.get("path")
            if path is None:
                # Home Assistant uses the zero-based view index when path is omitted.
                path = str(index)
            if not isinstance(path, str) or not VIEW_PATH_RE.fullmatch(path):
                raise ValidationError(
                    f"dashboard {slug!r} view {index} has invalid path {path!r}"
                )
            if path in paths:
                raise ValidationError(
                    f"dashboard {slug!r} contains duplicate view path {path!r}"
                )
            paths.append(path)
        self.dashboard_documents.append(document)
        return paths

    def validate_configuration(self) -> tuple[int, list[str]]:
        configuration_path = self.config_dir / "configuration.yaml"
        if not configuration_path.exists():
            raise ValidationError(f"missing configuration file: {configuration_path}")
        configuration = parse_yaml(configuration_path)
        if not isinstance(configuration, dict):
            raise ValidationError("config/configuration.yaml must contain a mapping")
        lovelace = configuration.get("lovelace")
        if not isinstance(lovelace, dict):
            raise ValidationError("config/configuration.yaml is missing lovelace mapping")
        if "mode" in lovelace:
            raise ValidationError(
                "legacy lovelace.mode is not allowed; declare YAML dashboards instead"
            )
        if lovelace.get("resource_mode") != "yaml":
            raise ValidationError("lovelace.resource_mode must be yaml")

        resources = lovelace.get("resources")
        if not isinstance(resources, TaggedValue) or resources.tag != "!include":
            raise ValidationError("lovelace.resources must use !include")
        resolved_resources = self.resolve_value(resources, configuration_path)
        if not isinstance(resolved_resources, list):
            raise ValidationError("lovelace resources include must resolve to a list")

        dashboards = lovelace.get("dashboards")
        if not isinstance(dashboards, dict) or not dashboards:
            raise ValidationError("lovelace.dashboards must be a non-empty mapping")

        routes: list[str] = []
        for slug, entry in dashboards.items():
            if not isinstance(slug, str) or (
                slug != "lovelace" and not slug.startswith("dashboard-")
            ):
                raise ValidationError(f"invalid dashboard slug {slug!r}")
            if not isinstance(entry, dict):
                raise ValidationError(f"dashboard declaration {slug!r} must be a mapping")
            if entry.get("mode") != "yaml":
                raise ValidationError(f"dashboard {slug!r} must use mode: yaml")
            filename = entry.get("filename")
            if not isinstance(filename, str) or not filename.strip():
                raise ValidationError(f"dashboard {slug!r} is missing filename")

            document = self.load_file(self.resolve_target(configuration_path, filename))
            view_paths = self.validate_dashboard(slug, document)
            base_route = "/lovelace" if slug == "lovelace" else f"/{slug}"
            routes.append(base_route)
            routes.extend(f"{base_route}/{path}" for path in view_paths)

        return len(dashboards), routes

    def validate_no_orphans(self) -> None:
        all_dashboard_files = {path.resolve() for path in self.dashboard_dir.rglob("*.yaml")}
        parsed_dashboard_files = {
            path for path in self.parsed_files if path.is_relative_to(self.dashboard_dir)
        }
        orphaned = sorted(all_dashboard_files - parsed_dashboard_files)
        if orphaned:
            display = ", ".join(str(path.relative_to(self.root)) for path in orphaned[:10])
            suffix = " ..." if len(orphaned) > 10 else ""
            raise ValidationError(f"orphaned dashboard YAML files: {display}{suffix}")

    def collect_entity_references(self) -> set[str]:
        found: set[str] = set()

        def add_candidate(value: Any) -> None:
            if isinstance(value, str) and ENTITY_ID_RE.fullmatch(value.strip()):
                found.add(value.strip())
            elif isinstance(value, list):
                for item in value:
                    add_candidate(item)

        def walk(value: Any) -> None:
            if isinstance(value, dict):
                for key, item in value.items():
                    if key in ENTITY_KEYS:
                        add_candidate(item)
                    if key == "entities" and isinstance(item, list):
                        for entity_item in item:
                            if isinstance(entity_item, str):
                                add_candidate(entity_item)
                            elif isinstance(entity_item, dict):
                                add_candidate(entity_item.get("entity"))
                    walk(item)
            elif isinstance(value, list):
                for item in value:
                    walk(item)
            elif isinstance(value, TaggedValue):
                walk(value.value)

        for document in self.dashboard_documents:
            walk(document)
        return found


def _entity_ids_in_text(path: Path) -> set[str]:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return set()
    return {match.group(1) for match in ENTITY_ID_SEARCH_RE.finditer(text)}


def repository_entity_catalog(root: Path) -> set[str]:
    config_dir = root / "config"
    catalog: set[str] = set()
    for path in config_dir.rglob("*.yaml"):
        if "dashboards" not in path.parts and ".storage" not in path.parts:
            catalog.update(_entity_ids_in_text(path))
    return catalog


def live_entity_catalog(root: Path) -> set[str]:
    storage = root / "config" / ".storage"
    catalog: set[str] = set()
    for name in ("core.entity_registry", "core.restore_state"):
        path = storage / name
        if path.exists():
            catalog.update(_entity_ids_in_text(path))
    return catalog


def read_entity_allowlist(root: Path) -> set[str]:
    path = root / "tools" / "dashboard_entity_allowlist.txt"
    if not path.exists():
        return set()
    values: set[str] = set()
    for number, raw_line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        if not ENTITY_ID_RE.fullmatch(line):
            raise ValidationError(f"invalid entity ID in {path}:{number}: {line!r}")
        values.add(line)
    return values


def validate_entity_references(root: Path, references: set[str]) -> None:
    repository_catalog = repository_entity_catalog(root)
    live_catalog = live_entity_catalog(root)
    allowlist = read_entity_allowlist(root)
    known = repository_catalog | live_catalog | allowlist
    unknown = sorted(references - known)
    if unknown:
        raise ValidationError(
            "unknown static dashboard entity references: " + ", ".join(unknown[:20])
        )

    stale_allowlist = sorted(allowlist - references)
    if stale_allowlist:
        raise ValidationError(
            "stale dashboard entity allowlist entries: " + ", ".join(stale_allowlist[:20])
        )

    if live_catalog:
        unverifiable = sorted(allowlist - repository_catalog - live_catalog)
        if unverifiable:
            raise ValidationError(
                "allowlisted dashboard entities are absent from live storage: "
                + ", ".join(unverifiable[:20])
            )


def validate_repository(root: Path | None = None) -> ValidationResult:
    root = (root or repo_root()).resolve()
    validator = DashboardRepositoryValidator(root)
    validator.validate_headers()
    dashboard_count, routes = validator.validate_configuration()
    validator.validate_no_orphans()
    references = validator.collect_entity_references()
    validate_entity_references(root, references)
    return ValidationResult(
        dashboard_count=dashboard_count,
        parsed_files=tuple(sorted(validator.parsed_files)),
        routes=tuple(routes),
        entity_references=tuple(sorted(references)),
    )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=repo_root())
    parser.add_argument(
        "--routes-json",
        action="store_true",
        help="print the validated dashboard route list as JSON",
    )
    return parser


def main(argv: Iterable[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        result = validate_repository(args.root)
    except ValidationError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    if args.routes_json:
        print(json.dumps(result.routes))
    else:
        print(
            "OK: validated "
            f"{result.dashboard_count} dashboards, "
            f"{len(result.routes)} routes, "
            f"{len(result.parsed_files)} YAML files, and "
            f"{len(result.entity_references)} static entity references"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
