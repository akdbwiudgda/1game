# Museum of Almost — implementation status

## Current deliverable

A playable **standalone browser edition**, not a launch-approved Telegram Mini App. The owner's explicit request for 3D supersedes the specification's raster-only presentation: all scenes are actual Three.js geometry, with orbit interaction, lighting, shadows, object picking, and state-dependent models. No SVG artwork or icon library is used.

Implemented:

- All 24 authored models: eight Light, eight Air, eight Water. Every exhibit is freely selectable.
- Two finite source controls and four deterministic effects per exhibit; one intervention always applies to the immutable opening snapshot.
- Complete EN/RU catalogue text, rules, hints, targets, recaps and contextual state labels.
- Unlimited tests, mismatch reports, successful repair recap, proposal undo, opening reset, and the last 20 test results.
- Three cumulative hint tiers with confirmation; Study confirmation and every accepted alternative.
- Local visitor card, distinct repaired/explored counts, 1/5/15 mastery and the 24-explored closing note. Original eligible scores are never overwritten by replay; Study-first stays unscored.
- Browser-local session/progress/settings persistence, storage-failure notice, and explicit local reset.
- Six-object text interface, keyboard-operable controls, labeled native dialogs, responsive layout, reduced-motion/high-contrast preferences, sound toggle, and spoiler-free deep links.

## Architecture

`src/data/exhibits.json` is extracted from the supplied baseline, with authored expressions preserved. `src/lib/engine.js` is a restricted parser/evaluator: there is no `eval`, `Function`, randomness, clock or physical simulation in correctness. All accepted solutions are enumerated from the target, not selected by the renderer.

`src/lib/progress.js` implements pure record transitions and defensive localStorage access. The browser is deliberately **not** represented as authoritative, cheat-proof, ranked or cross-device storage. `src/components/Diorama.jsx` contains reusable procedural models. Semantic state labels and the full object list remain available if WebGL is unavailable.

The 3D renderer is lazy-loaded; static thumbnail canvases render on demand. Fonts are self-hosted through Fontsource. The app makes no gameplay API calls, uses no analytics, and does not transmit visitor progress.

## Confirmed verification

The executable Node tests exhaust all **112** source configurations, **56** legal single-source proposals, and **27** accepted repairs. They check all **317** node/domain mappings for bilingual state labels, 24 bilingual content records, invalid proposals, interpreter safety, and local-save/assistance regressions.

Browser verification exercised L01 mismatch and repair, immutable-opening recomputation after a failed test, all six text objects, hint confirmation, replay hint unlocking, original-score preservation after reload, A05's two accepted alternatives, and Study-first unscored completion. Phone checks cover a real mobile entry click, 390px layout, 320px horizontal reflow, and EN/RU switching.

These are development checks, not device-lab, screen-reader, editorial, legal or observed-player approval.

## Explicit production gaps

The full master specification is **not yet implementation-complete**. Before production:

1. Implement an authenticated service and database, immutable content/session versions, idempotent actions, conflict/reconnect handling, durable assistance, and account deletion. Current progress can be erased by clearing browser data and is intentionally not ranked.
2. Integrate and verify Telegram init data, host navigation, optional boards/sharing, and the actual 75-Star entitlement/refund lifecycle. No fake purchase button or grant is present.
3. Review and refine all 24 procedural dioramas against the authored art direction. Several mechanisms currently share a gauge or other reusable model; this is not a claim of 24 final bespoke asset sets or complete state-contact-sheet approval.
4. Complete the requested bespoke audio/haptic manifest, cosmetic frame preview, downloadable closing postcard, authoritative service-confirmed reveal and operational telemetry/runbooks.
5. Conduct physical-device performance testing, WCAG contrast/touch-target and screen-reader review, Russian editorial review, player observation, rights review, payment sandbox/live gates and owner acceptance.

No marketplace endpoint, legal policy, account identity, production payment or human acceptance evidence has been invented.
