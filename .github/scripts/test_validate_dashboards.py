"""Protect dashboard reference parity between runtime and clean checkouts."""

from pathlib import Path
import tempfile
import unittest

from validate_dashboards import ValidationError, validate_entity_references


class EntityReferenceParityTests(unittest.TestCase):
    def test_runtime_registry_cannot_hide_missing_public_reference(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            storage = root / "config" / ".storage"
            storage.mkdir(parents=True)
            (storage / "core.entity_registry").write_text(
                '{"entities": [{"entity_id": "sensor.runtime_only"}]}',
                encoding="utf-8",
            )
            with self.assertRaisesRegex(ValidationError, "unknown static dashboard entity"):
                validate_entity_references(root, {"sensor.runtime_only"})

    def test_public_allowlist_supports_clean_and_runtime_checkouts(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "config").mkdir()
            scripts = root / ".github" / "scripts"
            scripts.mkdir(parents=True)
            (scripts / "dashboard_entity_allowlist.txt").write_text(
                "sensor.runtime_only\n", encoding="utf-8"
            )
            validate_entity_references(root, {"sensor.runtime_only"})
            storage = root / "config" / ".storage"
            storage.mkdir()
            (storage / "core.entity_registry").write_text(
                '{"entities": [{"entity_id": "sensor.runtime_only"}]}',
                encoding="utf-8",
            )
            validate_entity_references(root, {"sensor.runtime_only"})


if __name__ == "__main__":
    unittest.main()
