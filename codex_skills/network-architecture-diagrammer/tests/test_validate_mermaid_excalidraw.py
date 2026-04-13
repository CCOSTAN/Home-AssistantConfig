from __future__ import annotations

import sys
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

import validate_mermaid_excalidraw as validator


class ValidateMermaidExcalidrawTests(unittest.TestCase):
    def test_simple_flowchart_passes(self) -> None:
        text = """flowchart LR
User[User] --> Tunnel[Cloudflare Tunnel] --> App[Dashy]
"""
        self.assertEqual(validator.validate_mermaid(text), [])

    def test_non_flowchart_diagram_fails(self) -> None:
        findings = validator.validate_mermaid(
            """sequenceDiagram
Alice->>Bob: hello
"""
        )
        self.assertTrue(any("flowchart syntax only" in finding for finding in findings))

    def test_expanded_shape_fails(self) -> None:
        findings = validator.validate_mermaid(
            """flowchart TD
A@{ shape: rect, label: "App" }
"""
        )
        self.assertTrue(any("expanded Mermaid shape syntax" in finding for finding in findings))

    def test_html_label_fails(self) -> None:
        findings = validator.validate_mermaid(
            """flowchart TD
A["App<br/>UI"] --> B[API]
"""
        )
        self.assertTrue(any("Avoid HTML" in finding for finding in findings))


if __name__ == "__main__":
    unittest.main()
