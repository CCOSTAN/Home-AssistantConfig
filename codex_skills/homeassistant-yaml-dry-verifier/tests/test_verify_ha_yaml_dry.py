import contextlib
import importlib.util
import io
import re
import sys
import tempfile
import unittest
from pathlib import Path


MODULE_PATH = (
    Path(__file__).resolve().parents[1] / "scripts" / "verify_ha_yaml_dry.py"
)
MODULE_NAME = "verify_ha_yaml_dry"
SPEC = importlib.util.spec_from_file_location(MODULE_NAME, MODULE_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError(f"Unable to load module spec from {MODULE_PATH}")
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[MODULE_NAME] = MODULE
SPEC.loader.exec_module(MODULE)


class VerifyHaYamlDryTests(unittest.TestCase):
    def _run_verifier(
        self,
        files: dict[str, str],
        *extra_args: str,
        scan_subpath: str = ".",
    ) -> tuple[int, str, str]:
        with tempfile.TemporaryDirectory() as tmpdir:
            root = Path(tmpdir)
            for rel_path, content in files.items():
                file_path = root / rel_path
                file_path.parent.mkdir(parents=True, exist_ok=True)
                file_path.write_text(content, encoding="utf-8")

            scan_path = root / scan_subpath
            stdout = io.StringIO()
            stderr = io.StringIO()
            with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
                rc = MODULE.main([str(scan_path), *extra_args])
            return rc, stdout.getvalue(), stderr.getvalue()

    @staticmethod
    def _full_block_group_order(output: str) -> list[str]:
        marker = "\nFULL_BLOCK findings:\n"
        if marker not in output:
            return []
        section = output.split(marker, 1)[1]
        for stop in ("\nENTRY findings:\n", "\nINTRA findings:\n", "\nCENTRAL_SCRIPT findings:\n"):
            if stop in section:
                section = section.split(stop, 1)[0]
                break

        groups: list[str] = []
        for line in section.splitlines():
            text = line.strip()
            match = re.match(r"^\d+\.\s+([a-z]+\.[a-z_]+)\s+repeated\s+\d+\s+times$", text)
            if match:
                groups.append(match.group(1))
        return groups

    def test_full_block_detection_with_fixture(self) -> None:
        files = {
            "automations.yaml": """
- alias: A1
  trigger:
    - platform: state
      entity_id: binary_sensor.one
      to: "on"
  action:
    - service: light.turn_on
      target:
        entity_id: light.kitchen
- alias: A2
  trigger:
    - platform: state
      entity_id: binary_sensor.two
      to: "on"
  action:
    - service: light.turn_on
      target:
        entity_id: light.kitchen
"""
        }
        rc, out, err = self._run_verifier(files)
        self.assertEqual(rc, 0, out + err)
        self.assertIn("Duplicate full-block groups: 1", out)
        self.assertIn("FULL_BLOCK findings:", out)
        self.assertIn("automation.action repeated 2 times", out)

    def test_entry_detection_with_fixture(self) -> None:
        files = {
            "automations.yaml": """
- alias: A1
  trigger:
    - platform: state
      entity_id: binary_sensor.one
      to: "on"
  action:
    - service: script.shared_handler
- alias: A2
  trigger:
    - platform: state
      entity_id: binary_sensor.two
      to: "on"
  action:
    - service: script.shared_handler
    - delay: "00:00:01"
"""
        }
        rc, out, err = self._run_verifier(files)
        self.assertEqual(rc, 0, out + err)
        self.assertIn("Duplicate entry groups: 1", out)
        self.assertIn("ENTRY findings:", out)
        self.assertIn("automation.action entry repeated 2 times", out)

    def test_intra_detection_with_fixture(self) -> None:
        files = {
            "automations.yaml": """
- alias: Repeat Inside Block
  trigger:
    - platform: state
      entity_id: binary_sensor.one
      to: "on"
  action:
    - service: light.turn_off
      target:
        entity_id: light.den
    - service: light.turn_off
      target:
        entity_id: light.den
"""
        }
        rc, out, err = self._run_verifier(files)
        self.assertEqual(rc, 0, out + err)
        self.assertIn("INTRA findings:", out)
        self.assertIn("INTRA automation.action: Repeat Inside Block has 2 duplicated entries", out)

    def test_central_script_detection_with_package_definition_and_multi_caller(self) -> None:
        files = {
            "config/packages/shared_scripts.yaml": """
script:
  my_shared_script:
    alias: Shared Script
    sequence:
      - service: logbook.log
        data:
          name: Shared
          message: Hello
""",
            "config/automations/caller_one.yaml": """
automation:
  - alias: Caller One
    trigger:
      - platform: state
        entity_id: binary_sensor.one
        to: "on"
    action:
      - service: script.my_shared_script
""",
            "config/automations/caller_two.yaml": """
automation:
  - alias: Caller Two
    trigger:
      - platform: state
        entity_id: binary_sensor.two
        to: "on"
    action:
      - service: script.turn_on
        target:
          entity_id: script.my_shared_script
""",
        }
        rc, out, err = self._run_verifier(files)
        self.assertEqual(rc, 0, out + err)
        self.assertIn("Central-script findings: 1", out)
        self.assertIn("script.my_shared_script is package-defined and called from 2 files", out)
        self.assertIn("suggestion: Move definition to config/script/my_shared_script.yaml", out)

    def test_subsumed_entry_groups_are_collapsed(self) -> None:
        files = {
            "automations.yaml": """
- alias: A1
  trigger:
    - platform: state
      entity_id: binary_sensor.one
      to: "on"
  action:
    - service: light.turn_on
      target:
        entity_id: light.kitchen
- alias: A2
  trigger:
    - platform: state
      entity_id: binary_sensor.two
      to: "on"
  action:
    - service: light.turn_on
      target:
        entity_id: light.kitchen
"""
        }
        rc, out, err = self._run_verifier(files)
        self.assertEqual(rc, 0, out + err)
        self.assertIn("Duplicate full-block groups: 1", out)
        self.assertIn("Duplicate entry groups: 0", out)

    def test_full_block_findings_order_is_deterministic(self) -> None:
        files = {
            "automations.yaml": """
- alias: A1
  trigger:
    - platform: state
      entity_id: binary_sensor.same
      to: "on"
  action:
    - service: light.turn_on
      target:
        entity_id: light.kitchen
- alias: A2
  trigger:
    - platform: state
      entity_id: binary_sensor.same
      to: "on"
  action:
    - service: light.turn_on
      target:
        entity_id: light.kitchen
""",
            "scripts.yaml": """
script:
  script_one:
    sequence:
      - service: light.turn_off
        target:
          entity_id: light.kitchen
  script_two:
    sequence:
      - service: light.turn_off
        target:
          entity_id: light.kitchen
""",
        }
        rc, out, err = self._run_verifier(files)
        self.assertEqual(rc, 0, out + err)
        order = self._full_block_group_order(out)
        self.assertGreaterEqual(len(order), 3, out)
        self.assertEqual(order[:3], ["automation.action", "automation.trigger", "script.sequence"])

    def test_exit_codes_for_strict_and_non_strict_modes(self) -> None:
        files = {
            "automations.yaml": """
- alias: A1
  trigger:
    - platform: state
      entity_id: binary_sensor.one
      to: "on"
  action:
    - service: light.turn_on
      target:
        entity_id: light.kitchen
- alias: A2
  trigger:
    - platform: state
      entity_id: binary_sensor.two
      to: "on"
  action:
    - service: light.turn_on
      target:
        entity_id: light.kitchen
"""
        }
        rc_non_strict, _, _ = self._run_verifier(files)
        rc_strict, _, _ = self._run_verifier(files, "--strict")
        self.assertEqual(rc_non_strict, 0)
        self.assertEqual(rc_strict, 1)

    def test_parse_error_path_returns_exit_code_two(self) -> None:
        files = {
            "good.yaml": """
automation:
  - alias: Good
    trigger:
      - platform: state
        entity_id: binary_sensor.one
        to: "on"
    action:
      - service: light.turn_on
        target:
          entity_id: light.kitchen
""",
            "bad.yaml": "automation: [\n",
        }
        rc, out, err = self._run_verifier(files)
        self.assertEqual(rc, 2, out + err)
        self.assertIn("Parse errors:", out)
        self.assertIn("bad.yaml", out)


if __name__ == "__main__":
    unittest.main()
