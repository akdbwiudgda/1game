#!/usr/bin/env python3
"""Convert the authored catalogue in the master specification to game data."""

import json
import re
import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src/data/exhibits.json"


def bilingual(value):
    english, russian = value.strip().strip('“”').split(" / ", 1)
    return {"en": english.strip('“”'), "ru": russian.strip('«»')}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("specification", type=Path, help="Path to the supplied Museum of Almost master specification")
    args = parser.parse_args()
    text = args.specification.read_text(encoding="utf-8")
    catalogue = text.split("<!-- CATALOGUE_START -->", 1)[1].split("<!-- CATALOGUE_END -->", 1)[0]
    sections = re.split(r"(?=^#### [LAW]\d{2} — )", catalogue, flags=re.M)
    exhibits = []

    for section in sections:
        heading = re.match(r"^#### ([LAW]\d{2}) — (.*?) / (.*?)$", section, re.M)
        if not heading:
            continue
        model = json.loads(re.search(r"```json\s*(\{.*?\})\s*```", section, re.S).group(1))
        model["title"] = heading.group(2)
        model["titleRu"] = heading.group(3)

        curator = re.search(r"Curator:\s*(.*?)\n", section).group(1)
        model["curator"] = bilingual(curator)

        objects = re.search(r"\*\*Six objects:\*\* (.*?)\n", section).group(1)
        model["objects"] = {
            key: {"en": en.strip().rstrip("."), "ru": ru.strip().rstrip(".")}
            for key, en, ru in re.findall(r"`([^`]+)`\s+([^;/]+?)\s*/\s*([^;]+)(?:;|$)", objects)
        }

        model["art"] = re.search(r"\*\*Art:\*\* (.*?)\n", section).group(1)
        cards = re.search(r"\*\*Four rule cards:\*\*(.*?)(?=\n\*\*Target:\*\*)", section, re.S).group(1)
        model["ruleCards"] = [bilingual(card) for card in re.findall(r"^\d+\.\s*(.*?)$", cards, re.M)]

        target = re.search(r"\*\*Target:\*\* (.*?)\n", section).group(1)
        model["targetText"] = bilingual(target)["en"]
        model["targetTextRu"] = bilingual(target)["ru"]

        hints = re.search(r"\*\*Hints:\*\* (.*?)\n", section).group(1)
        model["hints"] = [
            bilingual(en + " / " + ru)
            for en, ru in re.findall(r"H\d+\s+“(.*?)”\s*/\s*«(.*?)»", hints)
        ]
        recap = re.search(r"\*\*Recap:\*\* (.*?)\n", section).group(1)
        model["recap"] = bilingual(recap)["en"]
        model["recapRu"] = bilingual(recap)["ru"]
        exhibits.append(model)

    if len(exhibits) != 24:
        raise ValueError(f"Expected 24 exhibits, found {len(exhibits)}")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(exhibits, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
