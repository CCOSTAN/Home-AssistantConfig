from __future__ import annotations

import unittest
from pathlib import Path
from typing import Any

import yaml


REPO = Path(__file__).resolve().parents[1]
PACKAGE = REPO / "config" / "packages" / "xquik.yaml.disabled"


class HomeAssistantLoader(yaml.SafeLoader):
    pass


def _secret(loader: HomeAssistantLoader, node: yaml.ScalarNode) -> dict[str, str]:
    return {"secret": loader.construct_scalar(node)}


HomeAssistantLoader.add_constructor("!secret", _secret)


def load_package() -> dict[str, Any]:
    return yaml.load(PACKAGE.read_text(encoding="utf-8"), Loader=HomeAssistantLoader)


class XquikPackageTests(unittest.TestCase):
    def test_create_post_matches_the_published_contract(self) -> None:
        commands = load_package()["rest_command"]
        command = commands["xquik_create_post"]
        self.assertEqual(command["url"], "https://xquik.com/api/v1/x/tweets")
        self.assertEqual(command["method"], "post")
        self.assertEqual(command["headers"]["x-api-key"], {"secret": "xquik_api_key"})
        self.assertEqual(command["headers"]["Idempotency-Key"], "{{ idempotency_key }}")
        self.assertIn('"account": {{ account | tojson }}', command["payload"])
        self.assertIn('"text": {{ message | tojson }}', command["payload"])
        self.assertEqual(
            commands["xquik_get_write_action"]["url"],
            "https://xquik.com{{ status_url }}",
        )

    def test_posting_requires_an_explicit_call(self) -> None:
        package = load_package()
        script = package["script"]["xquik_post"]
        self.assertNotIn("automation", package)
        self.assertTrue(script["fields"]["account"]["required"])
        self.assertTrue(script["fields"]["message"]["required"])
        self.assertEqual(script["mode"], "parallel")

    def test_each_run_has_a_stable_idempotency_key(self) -> None:
        sequence = load_package()["script"]["xquik_post"]["sequence"]
        write_key = sequence[0]["variables"]["write_key"]
        self.assertIn("'home-assistant-' ~ context.id", write_key)
        self.assertIn("default", write_key)
        self.assertEqual(sequence[1]["data"]["idempotency_key"], "{{ write_key }}")

    def test_nonterminal_writes_are_polled_without_automatic_retry(self) -> None:
        sequence = load_package()["script"]["xquik_post"]["sequence"]
        rendered = str(sequence)
        self.assertIn("rest_command.xquik_get_write_action", rendered)
        self.assertIn("repeat.index >= 15", rendered)
        self.assertIn("Do not retry this message.", rendered)
        self.assertEqual(rendered.count("rest_command.xquik_create_post"), 1)


if __name__ == "__main__":
    unittest.main()
