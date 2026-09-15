import test from "node:test";
import assert from "node:assert/strict";
import exhibits from "../src/data/exhibits.json" with { type: "json" };
import { stateLabel } from "../src/lib/states.js";
import {
  evaluate,
  matchesTarget,
  testProposal,
  getSolutions,
} from "../src/lib/engine.js";

test("all 24 exhibits contain complete bilingual objects, rules, hints and state labels", () => {
  assert.equal(exhibits.length, 24);
  assert.equal(new Set(exhibits.map((exhibit) => exhibit.id)).size, 24);
  let stateMappings = 0;
  for (const exhibit of exhibits) {
    assert.equal(Object.keys(exhibit.sources).length, 2);
    assert.equal(Object.keys(exhibit.derived).length, 4);
    assert.equal(exhibit.ruleCards.length, 4);
    assert.equal(exhibit.hints.length, 3);
    for (const field of [
      "title",
      "titleRu",
      "targetText",
      "targetTextRu",
      "recap",
      "recapRu",
    ]) {
      assert.equal(typeof exhibit[field], "string");
      assert.ok(exhibit[field].trim(), `${exhibit.id}: ${field}`);
    }
    for (const locale of ["en", "ru"]) {
      for (const text of [
        exhibit.curator,
        ...exhibit.ruleCards,
        ...exhibit.hints,
        ...Object.values(exhibit.objects),
      ]) {
        assert.equal(typeof text[locale], "string");
        assert.ok(text[locale].trim());
      }
    }
    for (const [id, domain] of Object.entries({
      ...exhibit.sources,
      ...exhibit.derived,
    })) {
      assert.ok(exhibit.objects[id]);
      stateMappings += domain.length;
      for (const value of domain)
        for (const locale of ["en", "ru"]) {
          assert.equal(
            typeof stateLabel(value, locale, exhibit.id, id),
            "string",
          );
          assert.ok(stateLabel(value, locale, exhibit.id, id).trim());
        }
    }
  }
  assert.equal(stateMappings, 317);
});

test("the restricted rule interpreter rejects executable code and dependency cycles", () => {
  const exhibit = exhibits[0];
  assert.throws(() =>
    evaluate(
      {
        ...exhibit,
        rules: { ...exhibit.rules, shadow: "globalThis.process.exit()" },
      },
      exhibit.initial,
    ),
  );
  assert.throws(
    () =>
      evaluate(
        { ...exhibit, rules: { ...exhibit.rules, shadow: "shadow" } },
        exhibit.initial,
      ),
    /Cyclic/,
  );
});

test("every authored source state evaluates within its declared domains", () => {
  let states = 0;
  for (const exhibit of exhibits) {
    const [[first, firstDomain], [second, secondDomain]] = Object.entries(
      exhibit.sources,
    );
    for (const firstValue of firstDomain)
      for (const secondValue of secondDomain) {
        const state = evaluate(exhibit, {
          [first]: firstValue,
          [second]: secondValue,
        });
        states++;
        for (const [node, domain] of Object.entries({
          ...exhibit.sources,
          ...exhibit.derived,
        }))
          assert.ok(domain.includes(state[node]), `${exhibit.id} ${node}`);
      }
  }
  assert.equal(states, 112);
});

test("catalogue solutions exactly match enumerated legal one-source repairs", () => {
  let proposals = 0;
  let accepted = 0;
  for (const exhibit of exhibits) {
    const expected = exhibit.solutions.map(JSON.stringify).sort();
    const actual = getSolutions(exhibit).map(JSON.stringify).sort();
    proposals += Object.values(exhibit.sources).reduce(
      (count, domain) => count + domain.length - 1,
      0,
    );
    accepted += actual.length;
    assert.deepEqual(actual, expected, exhibit.id);
    assert.equal(
      matchesTarget(exhibit, evaluate(exhibit, exhibit.initial)),
      false,
      `${exhibit.id} opening`,
    );
    assert.equal(
      matchesTarget(exhibit, evaluate(exhibit, exhibit.canonical)),
      true,
      `${exhibit.id} canonical`,
    );
  }
  assert.equal(proposals, 56);
  assert.equal(accepted, 27);
});

test("invalid or noop proposals are rejected against the immutable opening state", () => {
  const exhibit = exhibits[0];
  const opening = evaluate(exhibit, exhibit.initial);
  for (const proposal of [
    null,
    {},
    { source: "lamp", value: "right" },
    { source: "lamp", value: "bad" },
    { source: "shadow", value: "left" },
    { source: "lamp", value: "left", other: true },
  ]) {
    assert.deepEqual(testProposal(exhibit, proposal), {
      state: opening,
      success: false,
    });
  }
  assert.equal(
    testProposal(exhibit, { source: "lamp", value: "left" }).success,
    true,
  );
});
