import test from "node:test";
import assert from "node:assert/strict";
import { readSave, writeSave, updateRecord } from "../src/lib/progress.js";

function storage(initial = null) {
  let value = initial;
  return {
    getItem: () => value,
    setItem: (_key, next) => {
      value = next;
    },
  };
}

test("local saves preserve progress, settings, and sessions", () => {
  const local = storage();
  const save = {
    progress: { L01: { status: "repaired", hints: 1, score: 90 } },
    settings: { locale: "ru", sound: true },
    sessions: { L01: { mode: "list" } },
  };
  assert.equal(writeSave(save, local), true);
  assert.deepEqual(readSave(local), {
    ...save,
    settings: { ...save.settings, reducedMotion: false, highContrast: false },
  });
});

test("corrupt or unavailable local storage produces safe defaults", () => {
  assert.deepEqual(readSave({ getItem: () => "{bad json" }).progress, {});
  assert.equal(
    writeSave(
      {},
      {
        setItem: () => {
          throw new Error("full");
        },
      },
    ),
    false,
  );
});

test("save reads normalize malformed progress and settings values", () => {
  const local = storage(
    JSON.stringify({
      progress: {
        L01: { status: "repaired", hints: 3, score: 70 },
        L02: { status: "unknown", hints: 8, score: 99 },
        L03: "not a record",
      },
      settings: {
        locale: "de",
        sound: "yes",
        reducedMotion: true,
        highContrast: 1,
      },
      sessions: [],
    }),
  );
  assert.deepEqual(readSave(local), {
    progress: {
      L01: { status: "repaired", hints: 3, score: 70 },
      L02: { status: "in-progress", hints: 0, score: null },
    },
    settings: {
      locale: "en",
      sound: false,
      reducedMotion: true,
      highContrast: false,
    },
    sessions: {},
  });
});

test("global storage access is guarded and an undefined argument uses it", () => {
  const descriptor = Object.getOwnPropertyDescriptor(
    globalThis,
    "localStorage",
  );
  try {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get() {
        throw new Error("blocked");
      },
    });
    assert.deepEqual(readSave().progress, {});
    assert.equal(writeSave({}), false);

    const local = storage();
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: local,
    });
    assert.equal(
      writeSave({ progress: {}, settings: {}, sessions: {} }, undefined),
      true,
    );
    assert.deepEqual(JSON.parse(local.getItem()), {
      progress: {},
      settings: {},
      sessions: {},
    });
  } finally {
    if (descriptor)
      Object.defineProperty(globalThis, "localStorage", descriptor);
    else delete globalThis.localStorage;
  }
});

test("records retain assistance and the first eligible completion", () => {
  const hinted = updateRecord(null, { type: "hint", tier: 2 });
  assert.deepEqual(hinted, { status: "in-progress", hints: 2, score: null });
  const repaired = updateRecord(hinted, { type: "repair" });
  assert.deepEqual(repaired, { status: "repaired", hints: 2, score: 80 });
  assert.deepEqual(updateRecord(repaired, { type: "study" }), repaired);
  assert.deepEqual(
    updateRecord(repaired, { type: "repair", tier: 3 }),
    repaired,
  );
  assert.deepEqual(updateRecord(repaired, { type: "hint", tier: 3 }), {
    status: "repaired",
    hints: 3,
    score: 80,
  });
});

test("study-first records remain ineligible after a repair", () => {
  const studied = updateRecord(null, { type: "study" });
  assert.deepEqual(updateRecord(studied, { type: "repair" }), {
    status: "studied",
    hints: 0,
    score: null,
  });
});
