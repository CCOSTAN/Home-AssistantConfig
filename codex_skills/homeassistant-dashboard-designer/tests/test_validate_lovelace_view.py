import contextlib
import importlib.util
import io
import sys
import tempfile
import unittest
from pathlib import Path


MODULE_PATH = (
    Path(__file__).resolve().parents[1] / "scripts" / "validate_lovelace_view.py"
)
MODULE_NAME = "validate_lovelace_view"
SPEC = importlib.util.spec_from_file_location(MODULE_NAME, MODULE_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError(f"Unable to load module spec from {MODULE_PATH}")
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[MODULE_NAME] = MODULE
SPEC.loader.exec_module(MODULE)


class ValidateLovelaceViewTests(unittest.TestCase):
    def _run_validator(self, yaml_text: str, *extra_args: str) -> tuple[int, str, str]:
        with tempfile.TemporaryDirectory() as tmpdir:
            view_path = Path(tmpdir) / "view.yaml"
            view_path.write_text(yaml_text, encoding="utf-8")

            stdout = io.StringIO()
            stderr = io.StringIO()
            with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
                rc = MODULE.main([str(view_path), *extra_args])
            return rc, stdout.getvalue(), stderr.getvalue()

    def test_valid_classic_view_passes(self) -> None:
        yaml_text = """
title: Main
path: main
cards:
  - type: custom:button-card
    template:
      - status_chip
"""
        rc, out, err = self._run_validator(yaml_text)
        self.assertEqual(rc, 0, out + err)
        self.assertEqual(out.strip(), "")
        self.assertEqual(err.strip(), "")

    def test_horizontal_stack_fails(self) -> None:
        yaml_text = """
title: Main
path: main
cards:
  - type: horizontal-stack
    cards:
      - type: custom:button-card
        template: status_chip
"""
        rc, out, _ = self._run_validator(yaml_text)
        self.assertEqual(rc, 1)
        self.assertIn("Disallowed card type: horizontal-stack", out)

    def test_button_card_missing_template_fails(self) -> None:
        yaml_text = """
title: Main
path: main
cards:
  - type: custom:button-card
    entity: light.kitchen
"""
        rc, out, _ = self._run_validator(yaml_text)
        self.assertEqual(rc, 1)
        self.assertIn("custom:button-card must set template", out)

    def test_sections_wrapper_rule_fails_when_full_width_missing(self) -> None:
        yaml_text = """
title: Sections
path: sections
type: sections
sections:
  - type: grid
    column_span: 4
    cards:
      - type: custom:vertical-stack-in-card
        cards:
          - type: custom:button-card
            template: status_chip
"""
        rc, out, _ = self._run_validator(yaml_text)
        self.assertEqual(rc, 1)
        self.assertIn('Wrapper card must set grid_options.columns: "full".', out)

    def test_sections_wrapper_rule_passes_when_full_width_wrapper_present(self) -> None:
        yaml_text = """
title: Sections
path: sections
type: sections
sections:
  - type: grid
    column_span: 4
    cards:
      - type: custom:vertical-stack-in-card
        grid_options:
          columns: "full"
        cards:
          - type: custom:button-card
            template: status_chip
"""
        rc, out, err = self._run_validator(yaml_text)
        self.assertEqual(rc, 0, out + err)
        self.assertEqual(out.strip(), "")
        self.assertEqual(err.strip(), "")

    def test_unknown_include_tag_is_parse_safe(self) -> None:
        yaml_text = """
title: Included Sections
path: included_sections
type: sections
sections: !include ../sections/core.yaml
"""
        rc, out, err = self._run_validator(yaml_text)
        self.assertEqual(rc, 0, out + err)
        self.assertIn("validator cannot inspect included sections content", out)
        self.assertEqual(err.strip(), "")


if __name__ == "__main__":
    unittest.main()
