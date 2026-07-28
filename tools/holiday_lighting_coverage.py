#!/usr/bin/env python3
"""Validate holiday calendars, lighting scenes, and scene-routing contracts."""

from __future__ import annotations

import argparse
import calendar
import json
import sys
from dataclasses import dataclass
from datetime import date, timedelta
from pathlib import Path
from typing import Callable, Iterable

from validate_dashboards import ValidationError as YamlValidationError
from validate_dashboards import parse_yaml


class CoverageError(RuntimeError):
    """Holiday lighting coverage is incomplete or internally inconsistent."""


LIGHTING_MODES = (
    "standard",
    "RWB",
    "new_years_day",
    "valentine",
    "mardi_gras",
    "pi",
    "st_patty",
    "easter",
    "starwars",
    "cinco_de_mayo",
    "mothers_day",
    "fathers_day",
    "halloween",
    "veterans",
    "thanksgiving",
    "hanukkah",
    "christmas",
)

STATIC_REQUIREMENTS = {
    "1/1": "New Years Day",
    "2/14": "Valentines Day",
    "3/14": "Pi Day",
    "3/17": "St. Patricks Day",
    "5/4": "Star Wars Day",
    "5/5": "Cinco de Mayo",
    "7/4": "Independence Day",
    "10/31": "Halloween",
    "11/11": "Veterans Day",
    "12/25": "Christmas Day",
    "12/31": "New Years Eve",
}


@dataclass(frozen=True)
class DynamicRule:
    name: str
    source: str
    expected_date: Callable[[int], date]


def gregorian_easter(year: int) -> date:
    """Meeus/Jones/Butcher Gregorian Easter algorithm."""
    a = year % 19
    b = year // 100
    c = year % 100
    d = b // 4
    e = b % 4
    f = (b + 8) // 25
    g = (b - f + 1) // 3
    h = (19 * a + b - d - g + 15) % 30
    i = c // 4
    k = c % 4
    ell = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * ell) // 451
    month = (h + ell - 7 * m + 114) // 31
    day = ((h + ell - 7 * m + 114) % 31) + 1
    return date(year, month, day)


def nth_weekday(year: int, month: int, weekday: int, occurrence: int) -> date:
    first = date(year, month, 1)
    offset = (weekday - first.weekday()) % 7
    return first + timedelta(days=offset + 7 * (occurrence - 1))


def last_weekday(year: int, month: int, weekday: int) -> date:
    last = date(year, month, calendar.monthrange(year, month)[1])
    return last - timedelta(days=(last.weekday() - weekday) % 7)


DYNAMIC_RULES = (
    DynamicRule("Easter Sunday", "holidays", gregorian_easter),
    DynamicRule("Mothers Day", "holidays", lambda year: nth_weekday(year, 5, 6, 2)),
    DynamicRule("Fathers Day", "holidays", lambda year: nth_weekday(year, 6, 6, 3)),
    DynamicRule("Thanksgiving Day", "holidays", lambda year: nth_weekday(year, 11, 3, 4)),
    DynamicRule("Memorial Day", "flag_days", lambda year: last_weekday(year, 5, 0)),
    DynamicRule("Labor Day", "flag_days", lambda year: nth_weekday(year, 9, 0, 1)),
)


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def add_months(start: date, months: int) -> date:
    if months < 1:
        raise CoverageError("months must be at least 1")
    month_index = start.month - 1 + months
    year = start.year + month_index // 12
    month = month_index % 12 + 1
    day = min(start.day, calendar.monthrange(year, month)[1])
    return date(year, month, day)


def _reject_duplicate_json_keys(pairs: list[tuple[str, object]]) -> dict[str, object]:
    result: dict[str, object] = {}
    for key, value in pairs:
        if key in result:
            raise CoverageError(f"duplicate JSON key {key!r}")
        result[key] = value
    return result


def read_json(path: Path) -> dict[str, object]:
    try:
        value = json.loads(
            path.read_text(encoding="utf-8"),
            object_pairs_hook=_reject_duplicate_json_keys,
        )
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        raise CoverageError(f"invalid JSON in {path}: {exc}") from exc
    if not isinstance(value, dict):
        raise CoverageError(f"JSON root must be a mapping: {path}")
    return value


def _require_mapping(value: object, label: str) -> dict[str, object]:
    if not isinstance(value, dict):
        raise CoverageError(f"{label} must be a mapping")
    return value


def parse_calendar_date(value: str, source: str) -> date:
    try:
        month_text, day_text, year_text = value.split("/")
        parsed = date(int(year_text), int(month_text), int(day_text))
    except (TypeError, ValueError) as exc:
        raise CoverageError(f"invalid date key {value!r} in {source}") from exc
    if value != parsed.strftime("%m/%d/%Y"):
        raise CoverageError(
            f"dynamic date key must use MM/DD/YYYY format in {source}: {value!r}"
        )
    return parsed


def validate_dynamic_map(dynamic_map: dict[str, object], source: str) -> None:
    for key, value in dynamic_map.items():
        parse_calendar_date(key, source)
        if not isinstance(value, str) or not value.strip():
            raise CoverageError(f"dynamic event {key!r} in {source} has no name")


def validate_dynamic_rule(
    rule: DynamicRule,
    dynamic_map: dict[str, object],
    start: date,
    end: date,
) -> tuple[date, ...]:
    expected = {
        expected_date
        for year in range(start.year, end.year + 1)
        if start <= (expected_date := rule.expected_date(year)) < end
    }
    actual = {
        parse_calendar_date(key, rule.source)
        for key, value in dynamic_map.items()
        if value == rule.name and start <= parse_calendar_date(key, rule.source) < end
    }
    if actual != expected:
        missing = sorted(expected - actual)
        unexpected = sorted(actual - expected)
        details: list[str] = []
        if missing:
            details.append("missing " + ", ".join(day.isoformat() for day in missing))
        if unexpected:
            details.append("unexpected " + ", ".join(day.isoformat() for day in unexpected))
        raise CoverageError(f"{rule.name} coverage mismatch: {'; '.join(details)}")
    return tuple(sorted(actual))


def validate_scenes(path: Path) -> tuple[str, ...]:
    try:
        document = parse_yaml(path)
    except YamlValidationError as exc:
        raise CoverageError(str(exc)) from exc
    if not isinstance(document, list):
        raise CoverageError(f"scene file must contain a list: {path}")

    scenes: dict[str, dict[str, object]] = {}
    for index, scene in enumerate(document):
        if not isinstance(scene, dict):
            raise CoverageError(f"scene {index} must be a mapping")
        name = scene.get("name")
        if not isinstance(name, str) or not name:
            raise CoverageError(f"scene {index} is missing name")
        if name in scenes:
            raise CoverageError(f"duplicate scene name {name!r}")
        scenes[name] = scene

    for mode in LIGHTING_MODES:
        scene_name = f"month_{mode}_colors"
        scene = scenes.get(scene_name)
        if scene is None:
            raise CoverageError(f"missing required scene {scene_name}")
        entities = scene.get("entities")
        if not isinstance(entities, dict) or not entities:
            raise CoverageError(f"scene {scene_name} must contain entities")
        for entity_id, state_config in entities.items():
            if not isinstance(state_config, dict):
                raise CoverageError(
                    f"scene {scene_name} entity {entity_id} must use a state mapping"
                )
            if state_config.get("state") != "on":
                raise CoverageError(
                    f"scene {scene_name} entity {entity_id} must have state: on"
                )
    return tuple(sorted(scenes))


def validate_routing_contract(package_path: Path, script_path: Path) -> None:
    try:
        package_text = package_path.read_text(encoding="utf-8")
        script_text = script_path.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        raise CoverageError(f"cannot read holiday routing configuration: {exc}") from exc

    required_package_fragments = (
        "resource: http://localhost:8123/local/json_data/holidays.json",
        "resource: http://localhost:8123/local/json_data/flag_days.json",
        "unique_id: holiday_lighting_mode",
        "unique_id: holiday_lighting_scene",
        "scene.month_{{ mode }}_colors",
        "scene.month_standard_colors",
    )
    for fragment in required_package_fragments:
        if fragment not in package_text:
            raise CoverageError(f"holiday package routing is missing {fragment!r}")

    for mode in LIGHTING_MODES:
        if mode == "standard":
            continue
        assignment = f"mode.value = '{mode}'"
        if assignment not in package_text:
            raise CoverageError(f"holiday lighting mode is never assigned: {mode}")

    required_script_fragments = (
        "service: scene.turn_on",
        "sensor.holiday_lighting_scene",
        "scene.month_standard_colors",
    )
    for fragment in required_script_fragments:
        if fragment not in script_text:
            raise CoverageError(f"monthly scene script is missing {fragment!r}")


def validate_coverage(root: Path, start: date, months: int) -> dict[str, tuple[date, ...]]:
    root = root.resolve()
    end = add_months(start, months)
    holiday_path = root / "config" / "www" / "json_data" / "holidays.json"
    flag_path = root / "config" / "www" / "json_data" / "flag_days.json"
    scene_path = root / "config" / "scene" / "monthly_colors.yaml"

    holidays = _require_mapping(read_json(holiday_path).get("MAJOR_US"), "MAJOR_US")
    flags = _require_mapping(read_json(flag_path).get("Flag_Days_US"), "Flag_Days_US")
    holiday_static = _require_mapping(holidays.get("static"), "MAJOR_US.static")
    holiday_dynamic = _require_mapping(holidays.get("dynamic"), "MAJOR_US.dynamic")
    flag_dynamic = _require_mapping(flags.get("dynamic"), "Flag_Days_US.dynamic")
    validate_dynamic_map(holiday_dynamic, "holidays")
    validate_dynamic_map(flag_dynamic, "flag_days")

    for key, expected_name in STATIC_REQUIREMENTS.items():
        actual_name = holiday_static.get(key)
        if actual_name != expected_name:
            raise CoverageError(
                f"static holiday {key} must be {expected_name!r}, got {actual_name!r}"
            )

    dates: dict[str, tuple[date, ...]] = {}
    for rule in DYNAMIC_RULES:
        source_map = holiday_dynamic if rule.source == "holidays" else flag_dynamic
        dates[rule.name] = validate_dynamic_rule(rule, source_map, start, end)

    validate_scenes(scene_path)
    validate_routing_contract(
        root / "config" / "packages" / "holiday.yaml",
        root / "config" / "script" / "monthly_color_scene.yaml",
    )
    return dates


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=repo_root())
    parser.add_argument("--months", type=int, default=24)
    parser.add_argument("--start-date", type=date.fromisoformat, default=date.today())
    return parser


def main(argv: Iterable[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        results = validate_coverage(args.root, args.start_date, args.months)
        end = add_months(args.start_date, args.months)
    except CoverageError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    print(f"Holiday lighting coverage window: {args.start_date} to {end}")
    for name, dates in results.items():
        print(f"{name}: {', '.join(day.isoformat() for day in dates)}")
    print(
        "Coverage OK: exact per-year calendar dates, scene behavior, and routing contracts validated."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
