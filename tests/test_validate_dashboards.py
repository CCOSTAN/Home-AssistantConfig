from __future__ import annotations

import sys
import tempfile
import textwrap
import unittest
from pathlib import Path


TOOLS = Path(__file__).resolve().parents[1] / "tools"
sys.path.insert(0, str(TOOLS))

from validate_dashboards import ValidationError, validate_repository  # noqa: E402


HEADER = """\
######################################################################
# @CCOSTAN - Follow Me on X
# For more info visit https://www.vcloudinfo.com/click-here
# Original Repo : https://github.com/CCOSTAN/Home-AssistantConfig
# -------------------------------------------------------------------
"""


class DashboardValidatorTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tempdir = tempfile.TemporaryDirectory(prefix="dashboard-validator-")
        self.root = Path(self.tempdir.name)
        (self.root / "tools").mkdir()
        (self.root / "config" / "packages").mkdir(parents=True)
        (self.root / "config" / "dashboards" / "overview" / "views").mkdir(
            parents=True
        )
        (self.root / "tools" / "dashboard_entity_allowlist.txt").write_text(
            "# fixture allowlist\n", encoding="utf-8"
        )
        self._write(
            "config/configuration.yaml",
            """
            lovelace:
              resource_mode: yaml
              resources: !include dashboards/resources.yaml
              dashboards:
                lovelace:
                  mode: yaml
                  filename: ui-lovelace.yaml
            """,
        )
        self._write(
            "config/ui-lovelace.yaml",
            "!include /config/dashboards/overview/dashboard.yaml\n",
            dedent=False,
        )
        self._write("config/dashboards/resources.yaml", HEADER + "[]\n", dedent=False)
        self._write(
            "config/dashboards/overview/dashboard.yaml",
            HEADER
            + "views: !include_dir_list /config/dashboards/overview/views\n",
            dedent=False,
        )
        self._write(
            "config/dashboards/overview/views/01_home.yaml",
            HEADER
            + """\
title: Home
path: home
type: sections
sections:
  - type: grid
    cards:
      - type: entity
        entity: sensor.real
""",
            dedent=False,
        )
        self._write(
            "config/packages/entities.yaml",
            "sensor.real\n",
            dedent=False,
        )

    def tearDown(self) -> None:
        self.tempdir.cleanup()

    def _write(self, relative: str, content: str, *, dedent: bool = True) -> Path:
        path = self.root / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        value = textwrap.dedent(content).lstrip() if dedent else content
        path.write_text(value, encoding="utf-8")
        return path

    def test_valid_fixture_builds_routes(self) -> None:
        result = validate_repository(self.root)
        self.assertEqual(result.routes, ("/lovelace", "/lovelace/home"))
        self.assertIn("sensor.real", result.entity_references)

    def test_malformed_dashboard_yaml_fails(self) -> None:
        path = self.root / "config/dashboards/overview/dashboard.yaml"
        path.write_text(path.read_text(encoding="utf-8") + "broken: [\n", encoding="utf-8")
        with self.assertRaisesRegex(ValidationError, "invalid YAML"):
            validate_repository(self.root)

    def test_missing_entrypoint_include_fails(self) -> None:
        self._write(
            "config/ui-lovelace.yaml",
            "!include /config/dashboards/overview/missing.yaml\n",
            dedent=False,
        )
        with self.assertRaisesRegex(ValidationError, "missing include file"):
            validate_repository(self.root)

    def test_nonexistent_static_entity_fails(self) -> None:
        path = self.root / "config/dashboards/overview/views/01_home.yaml"
        path.write_text(
            path.read_text(encoding="utf-8").replace("sensor.real", "sensor.missing"),
            encoding="utf-8",
        )
        with self.assertRaisesRegex(ValidationError, "sensor.missing"):
            validate_repository(self.root)

    def test_commented_include_is_ignored(self) -> None:
        path = self.root / "config/dashboards/overview/dashboard.yaml"
        path.write_text(
            path.read_text(encoding="utf-8")
            + "# ignored: !include /config/dashboards/overview/missing.yaml\n",
            encoding="utf-8",
        )
        validate_repository(self.root)

    def test_duplicate_view_path_fails(self) -> None:
        self._write(
            "config/dashboards/overview/views/02_duplicate.yaml",
            HEADER + "title: Duplicate\npath: home\ntype: sections\nsections: []\n",
            dedent=False,
        )
        with self.assertRaisesRegex(ValidationError, "duplicate view path"):
            validate_repository(self.root)

    def test_orphaned_dashboard_file_fails(self) -> None:
        self._write(
            "config/dashboards/overview/orphan.yaml",
            HEADER + "type: entity\nentity: sensor.real\n",
            dedent=False,
        )
        with self.assertRaisesRegex(ValidationError, "orphaned dashboard YAML"):
            validate_repository(self.root)

    def test_duplicate_yaml_key_fails(self) -> None:
        path = self.root / "config/dashboards/overview/views/01_home.yaml"
        path.write_text(
            path.read_text(encoding="utf-8") + "path: duplicate\n",
            encoding="utf-8",
        )
        with self.assertRaisesRegex(ValidationError, "duplicate key"):
            validate_repository(self.root)


if __name__ == "__main__":
    unittest.main()
