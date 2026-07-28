from __future__ import annotations

import shutil
import sys
import tempfile
import unittest
from datetime import date
from pathlib import Path


REPO = Path(__file__).resolve().parents[1]
TOOLS = REPO / "tools"
sys.path.insert(0, str(TOOLS))

from holiday_lighting_coverage import CoverageError, validate_coverage  # noqa: E402


class HolidayLightingCoverageTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tempdir = tempfile.TemporaryDirectory(prefix="holiday-coverage-")
        self.root = Path(self.tempdir.name)
        files = (
            "config/www/json_data/holidays.json",
            "config/www/json_data/flag_days.json",
            "config/scene/monthly_colors.yaml",
            "config/packages/holiday.yaml",
            "config/script/monthly_color_scene.yaml",
        )
        for relative in files:
            source = REPO / relative
            target = self.root / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)

    def tearDown(self) -> None:
        self.tempdir.cleanup()

    def _replace(self, relative: str, old: str, new: str, count: int = -1) -> None:
        path = self.root / relative
        original = path.read_text(encoding="utf-8")
        changed = original.replace(old, new, count)
        self.assertNotEqual(original, changed, f"mutation target not found: {old}")
        path.write_text(changed, encoding="utf-8")

    def test_current_contract_passes(self) -> None:
        results = validate_coverage(self.root, date(2026, 7, 22), 24)
        self.assertEqual(
            results["Easter Sunday"],
            (date(2027, 3, 28), date(2028, 4, 16)),
        )

    def test_inverted_scene_state_fails(self) -> None:
        self._replace(
            "config/scene/monthly_colors.yaml",
            "state: 'on'",
            "state: 'off'",
            1,
        )
        with self.assertRaisesRegex(CoverageError, "must have state: on"):
            validate_coverage(self.root, date(2026, 7, 22), 24)

    def test_missing_required_year_fails(self) -> None:
        self._replace(
            "config/www/json_data/holidays.json",
            '            "03/28/2027": "Easter Sunday",\n',
            "",
            1,
        )
        with self.assertRaisesRegex(CoverageError, "missing 2027-03-28"):
            validate_coverage(self.root, date(2026, 7, 22), 24)

    def test_wrong_static_holiday_name_fails(self) -> None:
        self._replace(
            "config/www/json_data/holidays.json",
            '"1/1": "New Years Day"',
            '"1/1": "Wrong Holiday"',
            1,
        )
        with self.assertRaisesRegex(CoverageError, "New Years Day"):
            validate_coverage(self.root, date(2026, 7, 22), 24)

    def test_invalid_unrelated_dynamic_date_fails(self) -> None:
        self._replace(
            "config/www/json_data/holidays.json",
            '"01/19/2026": "MLK Day"',
            '"2026-01-19": "MLK Day"',
            1,
        )
        with self.assertRaisesRegex(CoverageError, "invalid date key"):
            validate_coverage(self.root, date(2026, 7, 22), 24)

    def test_scene_routing_typo_fails(self) -> None:
        self._replace(
            "config/packages/holiday.yaml",
            "scene.month_{{ mode }}_colors",
            "scene.month_{{ mode }}_colour",
            1,
        )
        with self.assertRaisesRegex(CoverageError, "package routing"):
            validate_coverage(self.root, date(2026, 7, 22), 24)


if __name__ == "__main__":
    unittest.main()
