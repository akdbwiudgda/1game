const SAVE_KEY = "museum-of-almost.save";
const statuses = new Set(["in-progress", "studied", "repaired"]);
const scores = new Set([70, 80, 90, 100]);

function defaultReducedMotion() {
  try {
    return Boolean(
      globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    );
  } catch {
    return false;
  }
}

function defaultSave() {
  return {
    progress: {},
    settings: {
      locale: "en",
      sound: false,
      reducedMotion: defaultReducedMotion(),
      highContrast: false,
    },
    sessions: {},
  };
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function storageOrGlobal(storage) {
  if (storage !== undefined) return storage;
  return globalThis.localStorage;
}

function savedHintTier(value) {
  return Number.isInteger(value) && value >= 0 && value <= 3 ? value : 0;
}

function normalizeRecord(record) {
  if (!isPlainObject(record)) return null;
  return {
    status: statuses.has(record.status) ? record.status : "in-progress",
    hints: savedHintTier(record.hints),
    score: scores.has(record.score) ? record.score : null,
  };
}

function normalizeProgress(progress) {
  if (!isPlainObject(progress)) return {};
  return Object.fromEntries(
    Object.entries(progress)
      .map(([id, record]) => [id, normalizeRecord(record)])
      .filter(([, record]) => record !== null),
  );
}

function normalizeSettings(settings, fallback) {
  if (!isPlainObject(settings)) return fallback;
  return {
    locale:
      settings.locale === "en" || settings.locale === "ru"
        ? settings.locale
        : fallback.locale,
    sound:
      typeof settings.sound === "boolean" ? settings.sound : fallback.sound,
    reducedMotion:
      typeof settings.reducedMotion === "boolean"
        ? settings.reducedMotion
        : fallback.reducedMotion,
    highContrast:
      typeof settings.highContrast === "boolean"
        ? settings.highContrast
        : fallback.highContrast,
  };
}

function readSave(storage) {
  const fallback = defaultSave();
  try {
    const raw = storageOrGlobal(storage)?.getItem(SAVE_KEY);
    if (!raw) return fallback;
    const save = JSON.parse(raw);
    if (!isPlainObject(save)) return fallback;
    return {
      progress: normalizeProgress(save.progress),
      settings: normalizeSettings(save.settings, fallback.settings),
      sessions: isPlainObject(save.sessions) ? save.sessions : {},
    };
  } catch {
    return fallback;
  }
}

function writeSave(save, storage) {
  try {
    const target = storageOrGlobal(storage);
    if (!target || typeof target.setItem !== "function") return false;
    target.setItem(SAVE_KEY, JSON.stringify(save));
    return true;
  } catch {
    return false;
  }
}

function hintTier(value) {
  return Number.isInteger(value) ? Math.max(0, Math.min(3, value)) : 0;
}

function updateRecord(record, action) {
  const current = isPlainObject(record) ? record : {};
  const status = statuses.has(current.status) ? current.status : "in-progress";
  const hints = hintTier(current.hints);
  const existingScore = scores.has(current.score) ? current.score : null;
  const next = { ...current, status, hints, score: existingScore };
  if (!isPlainObject(action)) return next;

  if (action.type === "hint") {
    next.hints = Math.max(hints, hintTier(action.tier));
  } else if (action.type === "study") {
    if (status !== "repaired") next.status = "studied";
  } else if (action.type === "repair") {
    if (status !== "studied") {
      next.status = "repaired";
      // A first eligible completion snapshot cannot be overwritten.
      if (existingScore === null) {
        next.hints = Math.max(hints, hintTier(action.tier));
        next.score = 100 - 10 * next.hints;
      }
    }
  }
  return next;
}

export { readSave, writeSave, updateRecord };
