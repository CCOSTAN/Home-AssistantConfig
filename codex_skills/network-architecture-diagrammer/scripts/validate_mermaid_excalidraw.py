from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


DISALLOWED_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (
        re.compile(
            r"^\s*(sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph|quadrantChart|zenuml|block-beta|packet-beta|sankey-beta)\b",
            re.MULTILINE,
        ),
        "Use Mermaid flowchart syntax only for Excalidraw import.",
    ),
    (
        re.compile(r"@\{"),
        "Avoid expanded Mermaid shape syntax (`@{ ... }`); simplify the node shape.",
    ),
    (
        re.compile(r"^\s*(classDef|class|style|linkStyle|click)\b", re.MULTILINE),
        "Avoid Mermaid styling/class directives; keep the diagram plain for Excalidraw.",
    ),
    (
        re.compile(r":::\w+"),
        "Avoid Mermaid class attachments (`:::`); keep the diagram plain for Excalidraw.",
    ),
    (
        re.compile(r"<[^>\n]+>"),
        "Avoid HTML inside Mermaid labels; use plain text labels instead.",
    ),
]


def validate_mermaid(text: str) -> list[str]:
    findings: list[str] = []

    if not re.search(r"^\s*(flowchart|graph)\s+(LR|RL|TB|TD|BT)\b", text, re.MULTILINE):
        findings.append("Expected a Mermaid flowchart header such as `flowchart LR` or `flowchart TD`.")

    for pattern, message in DISALLOWED_PATTERNS:
        if pattern.search(text):
            findings.append(message)

    return findings


def _read_text(path: str | None) -> str:
    if path:
        return Path(path).read_text(encoding="utf-8")

    return sys.stdin.read()


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Validate Mermaid syntax for clean Excalidraw import."
    )
    parser.add_argument("path", nargs="?", help="Optional Mermaid file to validate")
    args = parser.parse_args(argv)

    text = _read_text(args.path)
    findings = validate_mermaid(text)

    if findings:
        print("Mermaid is not Excalidraw-friendly:")
        for finding in findings:
            print(f"- {finding}")
        return 1

    print("Mermaid looks compatible with the Mermaid-to-Excalidraw workflow.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
