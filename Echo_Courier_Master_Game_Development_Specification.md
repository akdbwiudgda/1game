# Echo Courier — Master Game Development Specification

**Document ID:** SG-G01-MGDS  
**Version:** 1.0 — implementation authoring baseline  
**Date:** 15 September 2026  
**Product:** Echo Courier / Эхо-курьер  
**Platform:** Telegram Mini App, with a browser development/practice mode  
**Product languages:** English and Russian  
**Document language:** English; Russian appears in localization data  
**Scope of this delivery:** Documentation only. No game application, production backend, generated artwork, generated audio, or live integration is delivered by this document.

> Build a small, exceptionally clear temporal puzzle game—not a generic mobile-game shell. The player plans a delivery, preserves useful routes as echoes, and succeeds by coordinating with their own earlier decisions. Every visible outcome must be explainable from the numbered commands and the tick timeline.

## Contents

- [0. Authority, status, and decision boundaries](#0-authority-status-and-decision-boundaries)
- [1. Product and experience brief](#1-product-and-experience-brief)
- [2. Complete gameplay rulebook](#2-complete-gameplay-rulebook)
- [3. Planning, preview, execution, and echo management](#3-planning-preview-execution-and-echo-management)
- [4. Scoring, assistance, and progression](#4-scoring-assistance-and-progression)
- [5. Interactive tutorial](#5-interactive-tutorial)
- [6. Screens, navigation, and interaction specifications](#6-screens-navigation-and-interaction-specifications)
- [7. Visual design system](#7-visual-design-system)
- [8. Complete visual asset production plan](#8-complete-visual-asset-production-plan)
- [9. Audio and haptic specification](#9-audio-and-haptic-specification)
- [10. Complete 24-level campaign](#10-complete-24-level-campaign)
- [11. Localization and copy inventory](#11-localization-and-copy-inventory)
- [12. Technical architecture and data contracts](#12-technical-architecture-and-data-contracts)
- [13. Persistence, concurrency, and recovery](#13-persistence-concurrency-and-recovery)
- [14. Telegram and Stark Games integration](#14-telegram-and-stark-games-integration)
- [15. Security, privacy, and asset provenance](#15-security-privacy-and-asset-provenance)
- [16. Performance, compatibility, and operations](#16-performance-compatibility-and-operations)
- [17. Verification and acceptance matrix](#17-verification-and-acceptance-matrix)
- [18. Implementation sequence and definition of done](#18-implementation-sequence-and-definition-of-done)
- [19. Research and source register](#19-research-and-source-register)
- [20. Design and implementation handoff briefs](#20-design-and-implementation-handoff-briefs)

## 0. Authority, status, and decision boundaries

### 0.1 Purpose

This is the single implementation brief for Echo Courier v1. It combines product requirements, formal rules, interaction design, art direction, production assets, audio recipes, authored level content, localization, architecture, persistence, platform boundaries, security, testing, and release criteria. An implementation agent must not need another game-design document to understand the intended game.

The supplied source is **Echo Courier — Software Requirements Specification**, ID SG-G01, v1.0, dated 8 September 2026, supplied as `01_Echo_Courier_SRS.md`. This master document preserves its mandatory MVP requirements and makes previously unspecified game-specific decisions explicit.

The source refers to `00_Stark_Games_Marketplace_SRS.md`, requirement `MKT-GAME-02`, and research references R03/R07/R09 in an Appendix A. Those materials were **not supplied**. This document does not claim to reproduce their contracts or research. Its source register contains separately inspected references instead.

### 0.2 Requirement language and precedence

- **MUST / MUST NOT:** implementation or release requirement.
- **SHOULD:** preferred implementation; a deviation requires a recorded reason and equivalent verification.
- **MAY:** permitted, not required.
- **Future:** explicitly excluded from v1.
- **Reference contract:** a fully specified game-owned default, not an assertion about an existing Stark Games service.
- **Operator input:** a real deployment, legal, account, or commercial value that an agent must obtain rather than invent.

Precedence: applicable platform/security/payment policy → supplied game SRS → explicit clarifications in this master → later approved visual design. If the missing platform SRS conflicts with a reference integration contract, change the adapter and contract tests, not the game rules silently. Record material changes in a new document/rules/content version.

A later design image may change presentation. It may not quietly change the 6×6 board, twelve-tick limit, actor count, hit targets, accessibility semantics, score formula, or payment boundaries.

### 0.3 What is established, and what is not

| Item | Status in this document |
|---|---|
| Core rules and interaction decisions | Specified as the v1 authoring baseline |
| 24 exact candidate layouts, command witnesses, and hint ladders | Supplied in §10 |
| Mathematical level checks | Reported in §10 and §17; limited to the stated documentation checks |
| Running client/server parity | Not verified; requires implementation |
| Visual identity | Detailed proposed direction, not an approved finished design |
| Artwork and audio | Production instructions and inventories; not assets already generated |
| Downloadable sound/font sources | Specified with inspected provenance; artistic audition remains a production task |
| Target-player research | Not conducted; the release study is mandatory |
| EN/RU human localization review | Not conducted; drafted copy is not a human-review certificate |
| Stark Games API compatibility | Unverified until its actual contracts are provided |
| Production Telegram deployment and payments | Not configured or tested by this document |

### 0.4 Locked decisions resolving SRS gaps

| ID | Decision |
|---|---|
| DEC-01 | Simulation ticks are integers 1–12; the starting frame is tick 0. Wall-clock time is never a puzzle input. |
| DEC-02 | Gates are whole-cell tiles. Each gate has exactly one controlling plate; one plate may control several gates. No AND, inverse, delayed, or latched gates in v1. |
| DEC-03 | Semantic board tiles do not overlap. Start, parcel, exit, each plate, and each gate occupy distinct non-wall cells. |
| DEC-04 | Both live and echo plans have implicit waits after their last authored command, up to tick 12. Empty drafts may be inspected but not kept or submitted as runs. |
| DEC-05 | All occupied echo slots participate in the final run and count toward scoring, even if a helper proves unnecessary. There is no hidden enable/disable flag. |
| DEC-06 | Preview is side-effect-free; Run requests authoritative evaluation; Keep stores commands. None silently performs another operation. |
| DEC-07 | Assistance is monotonic within an attempt. Undo, replacement, clearing, restart, reload, and device switching do not remove it. |
| DEC-08 | A verified Study success advances campaign completion and mastery, but has no ranked score. Platform reward amounts remain platform-owned. |
| DEC-09 | All 24 campaign levels are freely selectable. The order is recommended learning progression, not a paid or mandatory unlock chain. |
| DEC-10 | Tutorial scenes are separate from the 24 levels and never generate ranked results or campaign rewards. |
| DEC-11 | Acknowledged server state is durable progress. Local pending state is useful recovery data, never a false “Saved” indication. |
| DEC-12 | The baseline ships original generated raster art and procedural audio. No SVG assets, inline SVG, or SVG icon library is required or permitted in game-owned UI. |
| DEC-13 | Missing shared services are isolated behind adapters. Production readiness is blocked where real required integration is absent; a successful mock is not production completion. |
| DEC-14 | There is no real-time deadline, energy system, paid assistance, gameplay-affecting purchase, wallet requirement, or blockchain transaction in this game. |

### 0.5 External inputs the implementation agent cannot manufacture

The operator must supply the production bot identity/token, HTTPS origin, deployment/database access, applicable privacy/support/legal URLs, approved payment configuration, and actual Stark Games integration contract if embedding in that platform. Generation-provider commercial rights must also be established for the account/model used.

The agent should proceed with the complete game-owned implementation and explicit development adapters while awaiting those inputs. It must identify blocked release gates precisely, not fill them with fabricated credentials, pretend API endpoints, or fake successful payments. Secrets are not written into this document or source control.

## 1. Product and experience brief

### 1.1 One-sentence pitch

**Deliver one parcel by planning a final route that cooperates with up to two recorded versions of your earlier routes.**

### 1.2 Player fantasy and tone

The player is a courier in a quiet, slightly impossible postal depot where earlier movements can be replayed as helpful temporal colleagues. Time is a planning material, not a threat. The game rewards noticing that a route ending on a pressure plate can be more valuable than a route that almost reaches the exit.

The world is suggested through materials, chapter postcards, parcel stamps, soft mechanical audio, and concise copy. There are no cutscenes, voiced characters, branching narrative, or story dialog requirements in v1.

Tone: warm, precise, encouraging, and never sarcastic about mistakes. A failed route is useful information. Avoid “You lost,” countdown alarms, angry red overlays, streak pressure, or shame for using a hint.

### 1.3 Target experience

| Property | Target |
|---|---|
| Audience | Casual logic players and commuters; no assumed knowledge of time-loop games |
| Typical session | 3–5 minutes, without an enforced session timer |
| Core interaction | Tap a command, inspect the timeline, preserve a helper, deliver |
| Player count | One; no matchmaking dependency |
| Learning promise | The first helpful echo is demonstrated before a second echo is introduced |
| Strategic depth | Plate timing, spatial dependencies, helper hand-offs, and the consequences of replaying commands |
| Emotional payoff | “That route was not a failure; it was the help I needed.” |
| Replay motivation | Better timing, fewer active helpers where possible, and understanding alternative solutions |
| Monetization | Optional cosmetic parcel patterns/result borders and a clearly one-time support purchase |

### 1.4 Experience pillars and corresponding prohibitions

1. **Causality before spectacle.** The player can identify which plate opened which gate on which tick. No decorative effect obscures board information.
2. **Planning, not dexterity.** Every action is available through discrete controls. No reaction windows, swipe precision, or drag-only editing.
3. **Helpful past selves.** Echo identities remain stable, routes are inspectable, and replacing one is explicit. No hidden third actor.
4. **Mistakes are free.** Preview, undo, retry, restart, hints, and level selection never consume a currency or life.
5. **Small and polished.** A coherent raster asset family, restrained motion, tuned sound, and excellent narrow-screen layouts are more important than adding mechanics.
6. **Trustworthy persistence.** Saved means acknowledged. Predicted success is distinguished from verified success.

### 1.5 MVP boundaries

**Included:** 24 authored levels; interactive tutorial; two echo slots; twelve-slot command ribbon; editable plans; deterministic preview with pause, step, and scrub; explicit execution; free undo/redo and resets; three-step free hints and Study reveal; EN/RU; saved drafts and progress; verified results; cosmetic catalog/equipment; platform payment/result adapters; optional spoiler-free level links; accessibility and reduced-motion support; legal/provenance inventory; automated and manual QA.

**Excluded:** live PvP, live cooperation, matchmaking, action platforming, user-created levels, more than two echoes, procedural daily levels, friend ghost playback, procedural campaign generation at runtime, leaderboards across incomparable levels, paid hints, paid retries, ads, energy, loot boxes, subscriptions, NFT inventory, wallet-based login, blockchain calls, user chat, voiceover, full 3D, and an in-game level editor.

A development-only content validator/solver is required. It is not a player-facing level editor or a runtime procedural-level feature.

### 1.6 Product validation, not invented evidence

Recruit 12 people reasonably matching the intended audience. After the tutorial, at least 9 must correctly explain plate timing using the rubric in §17. At least 7 must voluntarily start another level when explicitly free to stop. These are small-sample design gates, not proof of retention, market demand, or worldwide originality.

If timing is perceived as unfair, improve preview and feedback before publishing more content. The 24 layouts in this document are an authoring baseline; they do not override observed usability findings.

## 2. Complete gameplay rulebook

### 2.1 Coordinates, cells, and command notation

- The board is exactly 6 columns × 6 rows.
- A coordinate is `(x,y)` with each integer in `0…5`.
- `(0,0)` is the top-left; north decreases `y`; east increases `x`.
- A **tick** is one discrete simulation step, not a measured duration.
- A **take** is a planned/executed command sequence in the current echo configuration.
- An **attempt** is a server-owned level session with pinned content/rules and sticky assistance. It may contain arbitrarily many previews, failed runs, keeps, replacements, and resets.
- A **route** means commands unless explicitly called a position trace.

| Document shorthand | Canonical API value | Displacement |
|---|---|---|
| `N` | `north` | `(0,-1)` |
| `E` | `east` | `(+1,0)` |
| `S` | `south` | `(0,+1)` |
| `W` | `west` | `(-1,0)` |
| `.` | `wait` | `(0,0)` |

`W` never means wait. A dot inside a **map** means ordinary floor; a dot inside a **command string** means wait. JSON/API commands use full lowercase values, so the two contexts cannot be confused in a request.

### 2.2 Board tile schema

| Map token | Meaning | Traversal and behavior |
|---|---|---|
| `#` | Wall | No actor can enter. |
| `.` | Floor | Traversable; no automatic effect. |
| `S` | Start | All actors begin here at tick 0; otherwise ordinary floor. |
| `P` | Parcel | Traversable. Only the live courier can collect it. |
| `X` | Exit | Traversable. Only a parcel-carrying live courier can deliver here. |
| `a`, `b`, `c` | Pressure plate | Traversable. Occupancy is sampled at the beginning of a tick. |
| `A`, `B`, `C` | Gate | Traversable on entry only if its linked plate was occupied at tick start. |

Every level has exactly one `S`, one `P`, and one `X`. All three are distinct. A tile has one semantic token; no plate-under-gate, parcel-on-exit, start-on-plate, hidden wall, or other layered-rule combination is legal in v1.

Each uppercase gate has exactly one lowercase controller declared by `gateLinks`; matching letters are the default, not an implicit substitute for explicit content data. Several gates may point to the same plate. A valid map cannot contain an unlinked gate, a reference to a missing plate, a duplicate plate/gate ID, or an unsupported token.

### 2.3 Actors and initial conditions

**RULE-01:** Exactly one live courier exists. Zero, one, or two stored echoes may accompany it. Echo slot IDs are permanently `1` and `2`; an empty slot is null, not another actor.

**RULE-02:** At the start of every preview or run, all participating actors are at `S`, the parcel is uncollected, and the timeline is at 0. No prior actor position, gate animation, or parcel ownership carries over from another take.

**RULE-03:** A stored echo contains only its command sequence plus identity/presentation metadata. It does not contain a nested replay of previous echoes, frozen gate states, or authoritative historical positions.

**RULE-04:** All actors have identical movement/plate weight. Actors may overlap in a cell, swap cells, or cross routes without collision, pushing, priority, or blocking one another.

**RULE-05:** Echoes do not collect, carry, reserve, hide, or deliver the parcel. They may pass through `P` and `X` without an object/result effect. Occupying `X` without the parcel also has no effect for the live courier.

### 2.4 Command length and implicit waits

An authored command sequence contains 1–12 commands when stored as an echo or submitted as a run. The editor may temporarily hold 0 commands. It stores a contiguous list—there are no holes or null commands inside it.

After an actor's last authored command, its command is implicitly `wait` through tick 12. The editor visually distinguishes these pale automatic waits from explicit authored wait commands. A single explicit `wait` is a valid, nonempty echo. Twelve explicit waits are valid but not inherently useful.

An empty live draft may be used to inspect existing echoes: the live courier stays at `S`, and no run/keep/completion is submitted. Empty and all-wait are not synonymous.

Command normalization means validating and copying the exact authored array. API input accepts only the full lowercase values in §2.1: no whitespace trimming, case folding, null-hole filling, direction aliases, or silent truncation. Character shorthand is an authoring-import format only. Preserve explicit trailing waits and authored length; do not pad stored arrays to twelve. Plans such as `E` and `E.` may have the same positions but intentionally different replay hashes because their authored inputs and implicit-wait flags differ.

Blocked movement becomes a wait and still consumes that tick. This includes a wall, a board boundary, and entry into a closed gate. A blocked command is never retried: the next tick reads the next command from the actor's actual current position. Unknown command values, a thirteenth command, fractional indices, or malformed data are validation errors—not movement that can be silently treated as wait.

### 2.5 Authoritative tick order

**RULE-06:** Every evaluator uses this exact sequence for `t = 1…12`:

1. **Sample occupancy:** read the positions of all actors from the end of tick `t−1`.
2. **Resolve gates:** each gate is open for this entire tick if and only if at least one actor occupies its controlling plate in that sampled state.
3. **Choose moves:** read each actor's command for `t`, using implicit wait if the sequence has ended. Evaluate all destination cells against the same gate snapshot and static board.
4. **Move simultaneously:** commit all accepted destinations together. A blocked actor stays in its previous cell.
5. **Collect:** if the live courier is now on `P` and the parcel has not yet been collected, mark it carried by the live courier.
6. **Deliver:** if the live courier is on `X` while carrying the parcel, record success at tick `t` and terminate that run immediately.
7. If there is no delivery, continue to the next tick; after tick 12, the run ends without success.

There is no actor update order that lets Echo 1 move, immediately open a plate, and help Echo 2 within the same tick. Object/visual callbacks cannot change this ordering.

### 2.6 Consequences that must be visible and tested

- Arriving on a plate at the end of tick 4 first opens its gate at tick 5.
- Leaving a plate during tick 5 does not cancel the gate snapshot already sampled for tick 5.
- If no actor remains on the plate, the gate closes at the beginning of tick 6.
- Two actors swapping ownership of one plate can keep it continuously active if the plate is occupied at both sampled boundaries.
- A closed gate blocks **entry**. An actor already inside that gate cell may wait there or leave toward any otherwise valid adjacent cell. The gate never crushes, traps, teleports, or resets the occupant.
- Moving from one closed gate cell into a different closed gate cell is blocked: leaving the first is allowed, but entry into the second is not.
- A parcel pickup happens after simultaneous movement; an echo arriving first has no ownership effect.
- A live courier and echo entering the exit together produce one live delivery, not two completions.
- Commands after the delivery tick are not executed and cannot generate extra events. They remain part of the frozen authored input for diagnostics, not the executed terminal trace.

### 2.7 Echo replay divergence

**RULE-07:** An echo replays commands against the **current** gate snapshots. It is not guaranteed to revisit its historical positions.

Example: an echo originally attempted to move east into a closed gate and therefore waited. After another helper is added, the gate may be open at that tick; the same east command now succeeds, changing all subsequent positions. This is expected deterministic behavior, not a recording defect.

The combined preview always renders the actual recomputed paths. When a plan edit, keep, removal, or replacement changes an existing echo's trace relative to the prior displayed configuration, show `Echo {n}'s route changed` and allow inspection of the first differing tick. Never modify stored commands automatically to preserve an old path.

Optional cached comparison traces are presentation metadata only. On reload, current commands and pinned rules are authoritative even if a comparison cache is absent.

### 2.8 Failure and reset semantics

A run has only two terminal gameplay outcomes: delivered, or not delivered by tick 12. “Blocked command,” “parcel not collected,” and “exit not reached” are explanatory diagnostics, not extra loss conditions.

At tick 12 without delivery, show the final board, identify the first useful cause to inspect, and offer Edit plan / Keep this echo / Restart level. Do not auto-delete the route, automatically save it as an echo, or play a punitive failure animation.

Purely resetting the preview cursor to 0 changes no saved plans. Clearing/restarting saved plans is a distinct operation described in §3.

## 3. Planning, preview, execution, and echo management

### 3.1 Top-level state machine

| State | Permitted behavior | Exit |
|---|---|---|
| `BOOTING` | Load minimal shell, bridge, language, cached/public content, and session | Ready, guest practice, or recoverable error |
| `PLANNING` | Edit live ribbon, inspect cells/echoes, undo/redo, hints, resets | Preview, keep/replace, run, navigation |
| `PREVIEW_PAUSED` | Inspect a deterministic frozen preview, step, scrub, select occupants | Play, return to planning, keep, run |
| `PREVIEW_PLAYING` | Animate the frozen preview; do not accept plan edits | Pause, end, hide/deactivate |
| `RUNNING` | Animate a frozen submitted plan; server evaluation is independent of animation speed | Failed-run review, verification pending, verified result |
| `VERIFYING` | Preserve the final predicted board and await/retry authoritative receipt | Verified result, mismatch recovery, or pending offline state |
| `RESULTS` | Show immutable verified result, replay, next, level select, share | New attempt, next level, navigation |
| `CONFLICT_REVIEW` | Preserve local intent and show canonical server state | Load saved or explicitly reapply |
| `RECOVERABLE_ERROR` | Explain failure without erasing acknowledged/local recoverable data | Retry, local practice, safe navigation |

Connectivity, audio state, assistance tier, and modal state are orthogonal flags. Do not create mutually inconsistent duplicate gameplay state machines inside individual components.

### 3.2 Command ribbon and editing

The ribbon always displays numbered slots 1–12 in two rows of six on a narrow portrait screen. It exposes the authored command count and automatic tail waits.

- Selecting an occupied slot opens or focuses its direction picker; replacement affects that index only.
- Selecting the first unfilled slot appends the next command. The next empty slot becomes selected after an append, allowing rapid repeated entry.
- Later unfilled slots are not editable holes. Selecting one directs focus to the first unfilled slot and explains `Add the next command first`.
- Replacing an existing slot keeps that slot selected; it does not silently advance to another authored command.
- Delete removes the selected authored command and shifts later authored commands left. Inserting before an existing command is available in the slot's edit menu and shifts later commands right; insertion is disabled at 12.
- A clear-plan action empties the live ribbon. It is undoable.
- Repeated pointer events from a held control must not accidentally append many commands. A deliberate second activation is a second command.
- Drag-to-reorder is not required and must not be the only editing route if later added.

The interactive direction row contains north/east/south/west/wait buttons with recognizable raster glyphs and localized accessible names. The board itself is an inspector, not an auto-pathfinding command input.

### 3.3 Keyboard behavior

All functionality works through Tab/Shift+Tab, Enter/Space activation, and Escape for dismissing a non-destructive overlay. The board and ribbon use roving focus rather than dozens of mandatory tab stops.

- Board arrows move focus between cells; Enter opens that cell's inspector. They do not add commands.
- Ribbon left/right arrows move slot focus; Home/End move to the first/last slot; Enter opens the direction picker; Delete removes the selected authored command.
- In the picker, use arrow navigation among the five choices and Enter to select. Tab navigation remains available.
- Ctrl/Cmd+Z and Ctrl/Cmd+Shift+Z operate plan undo/redo only while focus is within the planning controls and not a text field.
- No global single-letter shortcut is required. Do not break Russian keyboard layouts, browser shortcuts, screen-reader commands, or text input.
- Keep/replace, full solution reveal, purchases, and closing confirmations are never triggered by an unmodified movement key.

### 3.4 Undo and redo

Provide free undo/redo for up to 50 planning mutations on the current device: command edits, insertion/deletion, clear plan, keep, replace, remove echo, and full level restart. A history item contains the before/after command lists and echo slots, not reward or assistance state.

Undo/redo is itself a validated, revisioned plan mutation. It may restore prior echo slots within the same attempt, but cannot restore an old assistance tier, content version, reward balance, verified completion state, payment state, or result. It cannot overwrite another device without conflict reconciliation.

A new edit after undo clears redo. History need not survive app closure or transfer to another device; acknowledged commands and echoes must. State this boundary in help. A verified result ends the editable attempt, so its plan history is not an avenue to modify that result.

### 3.5 Preview presentation and controls

Preview is local, deterministic, free, and side-effect-free. It never awards completion, changes assistance, commits an echo, or advances campaign progression.

Required controls: play/pause, previous tick, next tick, a discrete scrubber from 0 to the terminal tick (12 or earlier delivery), and return to planning. An expanded tick inspector exposes the three visible phases: **Plate sample → Move → Parcel/exit**.

Default autoplay tick duration is **400 ms**:

| Phase | Duration | Visual behavior |
|---|---:|---|
| Plate sample | 90 ms | Outline sampled occupied plates; update linked gate status and link indicator. |
| Simultaneous move | 150 ms | Move all actor tokens together using the same easing. |
| Parcel/exit resolution | 60 ms | Apply pickup/delivery icons after all movement completes. |
| End-state hold | 100 ms | Keep the resolved board legible before the next sample. |

Timing is presentation only. Pausing, slow rendering, app suspension, frame loss, reduced motion, or scrubbing does not change a tick result or score.

Scrubbing to tick `k` shows the end of `k` and identifies the gate snapshot **used during k**. A separate `Next tick` indicator may explain an impending gate change caused by the new plate occupancy. Do not redraw the gate as if a plate arrival had already opened it during the just-finished movement.

The phase inspector may step sample/move/resolve individually. Tick-step controls move one whole tick boundary. Backward stepping and scrubbing are silent and never replay historical one-shot effects as a burst.

Plan edits are accepted in `PLANNING`, not halfway through an animated run. Selecting Edit plan from a preview returns to tick 0, preserves commands, invalidates the old preview, and permits editing any slot. There is no ambiguous suffix edit that silently changes an already-executed prefix.

### 3.6 Explicit run and authoritative result

Run is enabled for a nonempty valid live plan. It freezes the pinned level/rules, both echo slots, and live commands. Flush pending mutations before submitting a verified online run. While offline, the same action may produce a clearly marked local prediction queued for later verification.

The server evaluates the entire plan; it does not wait for animation callbacks or accept client-reported success, tick, score, or actor positions. The client may animate immediately from its frozen input. A verified result is presented only after both the terminal animation/frame and the matching server receipt are available.

If the local evaluator predicts success but the server disagrees, show an evaluation mismatch recovery state, retain the plan and correlation ID, and do not show a fabricated ranked success. This is a release-blocking defect until understood.

A failed run returns to the same editable plan. It costs nothing and does not increment a scoring counter. A successful run freezes a result; trying another solution creates a new attempt rather than editing historical evidence.

### 3.7 Keep, replace, remove, and reset

| Action | Preconditions | Atomic result |
|---|---|---|
| Keep into empty slot | Live list has 1–12 valid commands; selected/first empty slot exists | Copy exact authored live commands into that slot; clear live list; reset preview to 0; preserve the other slot and assistance. |
| Replace echo | Two slots may be full, or player explicitly chose an occupied slot | Show selected slot, old/new command lists, and reset consequences; on confirmation replace only that slot atomically; clear live list; reset to 0. |
| Remove echo | Selected occupied slot | Confirm its identity and reset effect; clear that slot and live plan; retain the other slot; reset to 0. |
| Clear live plan | Any planning state | Empty live list only; keep both echoes; reset preview to 0. |
| Restart level | Any editable attempt | Empty both slots and live list; reset board; keep this attempt's assistance, pinned content, and acknowledged progress elsewhere. |
| Start a new attempt | From results or explicit attempt menu | Create a new session with empty plans and fresh assistance state; keep past verified results/progress. |

A keep is a planning operation. It does not require a failed execution first. Even a route that would deliver as the live courier can be kept deliberately: explain that an echo cannot deliver and will replay its entire stored command list. Keeping it never grants the live completion. Subsequent combined preview shows that route in its actual echo role.

When both slots are full, Keep opens the replacement chooser. A raw request to add a third echo without a chosen replacement is rejected without deleting either existing echo. Cancel closes the chooser with no mutation.

Slot numbers and path patterns do not change when a slot is replaced. If slot 1 is removed while slot 2 remains, the remaining actor is still Echo 2; do not silently renumber it to 1.

After any echo configuration change, recompute all combined paths. Do not assume that only the changed echo's path has changed.

### 3.8 Confirmation policy

Confirm destructive echo replacement/removal and explicit full-solution reveal. Explain a restart if it discards nonempty plans, even though undo is available. Pure preview rewind, acknowledged navigation, failed runs, and ordinary command edits do not need confirmation.

Closing the Mini App or leaving the game asks about saving only when there are unacknowledged edits. Do not require an “Are you sure?” dialog on every Back action. Acknowledged stored echoes are not unsaved edits.

## 4. Scoring, assistance, and progression

### 4.1 Exact score definition

For a successfully delivered run:

```text
active_echoes = number of occupied echo slots in the frozen final run
takes_used    = 1 + active_echoes
score         = 100 + 5 × (12 − delivery_tick) + 10 × (3 − takes_used)
```

All quantities are integers; `active_echoes` is 0–2, `takes_used` is 1–3, and `delivery_tick` is 1–12.

Equivalent implementation expression: `100 + 5 * (12 - deliveryTick) + 10 * (2 - activeEchoes)`.

“Used” means present in the final run, not a causal test of whether a helper was necessary. Keep history, replacements, abandoned plans, time spent thinking, previews, failed runs, connection speed, and purchase history do not affect this score.

| Example | Calculation | Result |
|---|---|---:|
| Tick 8, one echo / two takes | `100 + 20 + 10` | 130 |
| Tick 8, two echoes / three takes | `100 + 20 + 0` | 120 |
| Tick 12, two echoes / three takes | `100 + 0 + 0` | 100 |
| No delivery | No successful completion score | Not ranked |

The source's acceptance example is tick 8 with **two takes**, not two echoes. Preserve that distinction in tests and UI copy.

### 4.2 Ranking and completion are different ledgers

Reference ranking scope is `(gameId, levelId, contentVersion, rulesVersion, rankBracket)`. Define `rankBracket = standard | assisted | none`: assistance tier `standard` maps to `standard`, all three `assisted-1/2/3` tiers share `assisted`, and `study` maps to `none` with no leaderboard entry. Compare only equivalent content/rules. Store the user's best verified score independently in Standard and Assisted brackets. Equal scores share rank; use competition ranking (`1,1,3`), without hidden timestamp or payment tiebreakers.

A slower/fewer-echo solution and a faster/more-echo solution are compared by the exact formula, not by a separate “fewest echoes always wins” rule. Accept every valid solution, not just the supplied reference witness.

Maintain a one-time distinct-level completion grant separately from score improvements. `levelId` is the immutable cross-version campaign identity: E01 remains E01 after content revisions and is never reused for an unrelated level. Reference uniqueness is `(userId, gameId, levelId, grantType)`, with `grantType = campaign-completion` for a verified Standard, Assisted, or Study delivery, so retries, class changes, or content re-publication cannot farm the same completion grant. The real platform may own this ledger; its adapter must preserve equivalent idempotency.

Never invent an XP amount. Echo Courier sends verified completion facts; the Stark Games reward service decides whether/how much platform XP to grant. Reference standalone mode can display solved-level count and mastery without creating a fictional XP currency.

### 4.3 Assistance model

| Tier | Trigger | Competitive treatment |
|---|---|---|
| `standard` | No hint disclosed in this attempt | Standard bracket eligible after verification |
| `assisted-1` | First hint disclosed | Assisted bracket only |
| `assisted-2` | Second hint disclosed | Assisted bracket only |
| `assisted-3` | Third hint disclosed | Assisted bracket only |
| `study` | Full solution explicitly revealed/applied | No ranked entry |

Opening the hint menu does not itself disclose a hint or change the tier. Every hint and the full reveal is free; no Stars balance is checked.

The tier can only increase within an attempt. Preserve it through undo/redo, keep/replace/remove, restart, preview rewind, reload, reconciliation, and multi-device play. Server acknowledgement of a new tier precedes disclosure for authenticated sessions. A previously acknowledged hint may be reopened offline; a new server-recorded disclosure waits for connectivity.

A new attempt clears the board and receives a new assistance state. The product does not claim to prove that a human has never seen a solution elsewhere or in an earlier attempt. Do not secretly impose a lifetime penalty for studying when the SRS specifies attempt-level treatment.

Verified Study delivery still marks the level completed and contributes to 1/5/15 distinct-level mastery. It shows tick and echo count, but no competitive point total or rank. Tutorial demonstrations are separate and do not count.

### 4.4 Hint and full-reveal interaction

The three hints for each level are ordered:

1. **Relationship:** identify a plate/gate relationship or dependency.
2. **Useful position:** identify a helpful waiting/holding cell, with timing when relevant.
3. **Partial plan:** show a useful prefix for one actor, not all final routes.

Fixed hints describe one approach from the initial layout. If the player's current echoes differ, say so rather than overwriting them. Highlight the named cells and actor slot. Reopening any already authorized hint does not advance the tier. Before Study, a request may reveal only `highestHint + 1`; skipping directly from 0 to 2/3 or from 1 to 3 is rejected as `INVALID_HINT_ORDER`. Persist that next tier before returning its text; retrying the same action returns the same disclosure receipt.

Full reveal is a separate fourth action labeled `Show full solution — Study`, available without requiring all three hints first. Before revealing, explain that this attempt will not be ranked. Entering Study authorizes all three hints and the full solution, setting `highestHint = 3` without reducing assistance later. In Study, show reference Echo 1, optional Echo 2, then live commands, with localized direction names and tick numbering. Provide `Apply this solution` only after entering Study; it writes the full valid reference configuration through the same revisioned state path.

Hints and full solutions must remain usable with sound disabled, without dragging, and in Russian at 200% text zoom. A hint never says merely “try again” or requires purchasing a cosmetic.

### 4.5 Campaign progression and mastery

All levels are visible and playable from level select. Show chapter grouping, order, solved state, best Standard/Assisted result, and Study completion badge where relevant. The default Continue destination is the most recently active resumable attempt; otherwise choose the first incomplete level in the suggested order. If none remains and no active attempt exists, Continue opens level select for optional replay/refinement.

Mastery thresholds are **1, 5, and 15 distinct verified campaign levels completed**. They award presentation badges only: First Delivery / Route Keeper / Echo Conductor. They do not grant a third echo, speed, score multipliers, or paid currency. Replays of the same level do not advance the count.

After E24, offer level select and optional score refinement. Show `All 24 routes delivered` only when all 24 distinct campaign levels have verified completion; solving freely selected E24 first does not complete earlier levels or trigger that message. Do not imply that a locked daily mode already exists. Future content may be mentioned in non-interactive release notes, not through a fake functional button.

## 5. Interactive tutorial

### 5.1 Tutorial principles

The tutorial is an unranked, resumable teaching flow outside the 24-level count. It has no purchase, wallet, sharing, notification permission, or marketing interruption. It can be skipped immediately and reopened from Settings.

Do not present all rules at once. Advance only after the relevant action/observation. Mistakes are allowed and explained in place; the tutorial must not trap the player behind a hidden exact gesture.

### 5.2 T00-A — one movement, one object, one delivery

Use a 6×6 board with `S=(1,3)`, `P=(2,3)`, `X=(3,3)`, those three cells traversable, all other cells walls. There are no gates or echoes. It is a tutorial fixture, not an additional campaign level.

| Step | Prompt and action | Required observation |
|---|---|---|
| A1 | `Add an east command.` Focus slot 1 and east control. | Slot 1 receives `east`; no actor moves merely because the command was authored. |
| A2 | `Preview one tick.` | Plate sample has no active plate; courier moves east; parcel is collected after movement. |
| A3 | `Add one more east command.` Return to planning and append slot 2. | The existing command remains; the planned sequence is `EE`. |
| A4 | `Run your delivery.` | Delivery occurs at tick 2; show a tutorial success without rank/XP. |

If another direction is entered, allow its preview and explain the boundary/wall result; offer a single corrective highlight. Skip exits to campaign selection, not to an error.

### 5.3 T00-B — the first helpful echo

Use E01's geometry in a separate tutorial session.

1. Introduce plate `a=(0,2)` and gate `A=(3,3)` with a visible link highlight.
2. Automatically demonstrate the helper plan `WN` without asking the player to discover the notation first.
3. Label the action `Keep this echo`; animate a small confirmation into slot 1. Explain `Your earlier route can hold a plate.`
4. Reset all actors to `S`. Show Echo 1's numbered identity and dashed path.
5. Guide the player to author live `E.EEE`, using an explicit wait at tick 2.
6. Pause at the end of tick 2: Echo 1 has arrived on the plate, but this tick's gate sample was closed.
7. Step to the sample of tick 3: highlight the occupied plate and now-open gate, then show the simultaneous movement.
8. Complete the tutorial delivery. Ask the player to choose which statement is correct: `A plate affects the next movement after it is sampled` versus `A plate opens its gate halfway through movement`. Correct with a replay, not a punitive quiz.
9. Offer `Try the first level` and `Choose a level`. The subsequent campaign attempt starts fresh without tutorial-written echoes or Study status.

The automated example is explicitly tutorial-only. It neither upgrades nor downgrades assistance on an existing campaign attempt.

### 5.4 Introducing Echo 2

On the player's first visit to E07 or another two-echo level, show one dismissible coach mark on the empty second slot: `You can keep one more echo. Both replay together.` Do not auto-fill the new campaign attempt or reveal its full solution.

If the player skipped the tutorial, a Help control can replay T00-B separately. Entering the help tutorial preserves acknowledged campaign commands and returns to them afterward.

### 5.5 Tutorial recovery

Persist tutorial scene and completed teaching step after acknowledgement. After a forced close during animation, resume the same scene at a stable tick boundary, paused, with the teaching prompt visible. Never replay audible effects or auto-submit a second completion during recovery.

The tutorial's localized strings and keyboard flow are acceptance-tested in both languages. It must be possible to skip, complete, replay, and leave using only keyboard controls.

## 6. Screens, navigation, and interaction specifications

### 6.1 Screen inventory

| ID | Screen/surface | Required content and actions |
|---|---|---|
| UI-01 | Launch/loading | Game identity, quiet progress indicator, recoverable error state; no fabricated percentage. |
| UI-02 | Game home/catalogue entry | Key art, one-sentence hook, Continue/Start, level select, Settings; platform back link when embedded. |
| UI-03 | Level select | Four chapter groups, all 24 cards, solved/assistance state, next suggested level; no paid locks. |
| UI-04 | Tutorial | Board, focused prompt, required controls, Skip, Back; no unrelated chrome. |
| UI-05 | Planning board | Level name, board, status, live ribbon, direction picker, two echo cards, Preview/Run, hints, reset/undo. |
| UI-06 | Preview/tick inspector | Same board, phase label, timeline, pause/step/scrub, actor/path controls, return to editing. |
| UI-07 | Cell/occupant inspector | Coordinate, tile type, controller/link, current/next tick state, complete occupant list. |
| UI-08 | Echo keep/replace/remove | Stable slot identity, old/new route summary, consequence text, explicit confirm/cancel. |
| UI-09 | Hint/Study sheet | Free label, disclosed ladder, highlighted cells, next hint, separately confirmed full reveal. |
| UI-10 | Failed-run review | Final board and actionable diagnostic; edit/keep/restart, no loss penalty. |
| UI-11 | Verification/recovery | Pending/offline/mismatch states, retained plan, retry/load/reapply controls as appropriate. |
| UI-12 | Results | Delivery tick, active echoes/takes explanation, score breakdown or Study label, verified status, replay/next/exit, optional share. |
| UI-13 | Cosmetics | Exact six pattern/border pairs, free default, preview, ownership/equipment, price, purchase and restore states. |
| UI-14 | Settings/help | EN/RU, SFX, music only if MUS-01 ships, haptics, reduced motion, contrast/path labels, tutorial, credits, privacy/support, platform Profile link. |
| UI-15 | Share/challenge resolution | Spoiler-free link/copy options; expired/unavailable link fallback to level selection. |
| UI-16 | Credits/legal/support | Original asset credits, third-party licenses, generator provenance summary, privacy/support links, version information. |

Modals/sheets remain part of the current route unless they represent a navigable screen. Do not erase the board or current plan when opening Settings, a hint, a store preview, or an occupant list.

### 6.2 Primary navigation

Reference browser paths are `/`, `/levels`, `/tutorial`, `/play/:levelId`, `/results/:resultId`, `/cosmetics`, `/settings`, and `/credits`. A Telegram `startapp` token resolves server-side to an allowed destination, not an arbitrary URL.

Back hierarchy: close the top non-destructive sheet → return from read-only preview to planning → leave game board to level select/home → return to platform catalogue or close the standalone Mini App. Telegram BackButton mirrors this hierarchy. The game does not hijack ordinary browser Back into an infinite loop.

Navigation waits for or visibly accounts for unacknowledged mutations. A modal open/close does not itself dirty the gameplay save. Scrolling and preview cursor changes are local presentation, not completion-affecting mutations.

### 6.3 Portrait planning layout

At 390 CSS px width, use a single-column layout:

1. Compact header: Back, localized level title/order, overflow/Settings.
2. One-line objective/status: `Collect the parcel, then reach the exit.`
3. Square board with visible coordinate access and echo identity legend.
4. Tick/preview status and selected-cell summary.
5. Twelve-command ribbon, two rows of six.
6. Five-button direction picker and compact undo/redo.
7. Primary actions: Preview and Run; Keep this echo remains distinct and reachable.
8. Echo cards and extra detail below the board/composer rather than shrinking it.
9. Safe-area-aware lower action region; its padding prevents content underneath from being obscured.

On shorter screens, the page scrolls vertically. Essential controls may be sticky, but the sticky region cannot cover command slots, focused elements, or the board. A long Russian title wraps or uses an accessible two-line header; it is not replaced by an unreadable 9 px font.

### 6.4 Board sizing contract

For normal portrait widths 320–430 CSS px:

- Page side gutters: 16 px.
- Board outer width: `min(420px, availableWidth − 32px)`.
- Border: 1 px on each side; inner padding: 6 px on each side; cell gaps: 2 px.
- Each of the 36 cells is a true square interactive target.
- At width 390: board outer width 358 px; cell size `(358 − 2 − 12 − 10) / 6 = 55.67 px`.
- At width 320: board outer width 288 px; cell size `(288 − 24) / 6 = 44 px`.

Use the width available **inside horizontal safe areas**, not the full physical screen width. Below this effective width, reduce decorative gutters first, then offer a bounded horizontally pannable board with an accessible cell-list alternative. Do not shrink targets below 44 px to claim everything fits. At high text zoom, the page reflows; the two-dimensional board may retain its minimum size in its own clearly labeled region.

At wide desktop/tablet widths, the board may occupy a 420 px column and the editor/inspector a separate adjacent column. Maintain the same game logic and reading order. Landscape is supported by scrolling/reflow, not by forcing rotation or reducing cell targets.

### 6.5 Echo cards, paths, and overlap

Each slot card shows `Echo 1` or `Echo 2`, pattern sample, authored command count, compact sequence, final/current cell when previewed, and an inspect menu. Empty slots say `No echo yet`; they do not look like paid inventory slots.

Identity coding:

- Live: solid cream outline, `LIVE` label, solid selected route.
- Echo 1: visible `1` badge and short-dash route pattern.
- Echo 2: visible `2` badge and dot–dash route pattern.

Color helps but never carries identity alone. At overlap, do not draw three opaque sprites on top of one another and hide two. Show a stacked identity marker with a count; selecting the cell opens an ordered list: LIVE, Echo 1, Echo 2. The list includes each actor's command and destination for the selected tick.

Display the selected actor's full route most prominently. Other routes remain thinner/more subdued, with on-demand tick markers to prevent an unreadable tangle. Repeated visits to a cell show a compact visit list in the inspector rather than twelve overlapping numerals.

### 6.6 Result composition

The result's hierarchy is:

1. `You delivered it together.` (or a neutral solo delivery variation).
2. Verified completion state; Study/Assisted badge where relevant.
3. `Delivered on tick {n}` and `Echoes in this solution: {n}`.
4. Base delivery points, remaining-tick bonus, take-efficiency bonus, total—except Study, which has no competitive total.
5. Personal best state for the applicable bracket; rank only when the relevant service has responded.
6. Next level (primary), Replay, Choose a level/Exit.
7. Optional Share, never required for Next.

If a reward/ranking service is delayed after authoritative delivery, keep the verified game result and say `Platform progress is syncing` or `Ranking unavailable`. Do not turn a valid delivery into failure or replay its reward grant.

The final level's primary action becomes `Choose a level`; do not link to E25. Replaying a result is read-only and cannot claim completion again.

### 6.7 Required empty, busy, disabled, and error states

| Situation | Behavior |
|---|---|
| Empty ribbon | Run/Keep disabled with an accessible reason; Preview may inspect existing echoes. |
| Twelve authored commands | Appending/inserting disabled; replacement/deletion available. |
| No echoes | Two distinct empty slot cards; no filler ghost on the board. |
| Two occupied slots | Keep opens selected replacement flow; never silently evicts the oldest. |
| Slow save | `Saving…`; continue optimistic editing within bounded queue; do not display Saved. |
| Offline | `Offline — changes on this device`; cached planning/preview available; verification pending. |
| Save conflict | Preserve both canonical state and local intent; explicit load/reapply choices. |
| Missing cached content | Explain that this level needs a connection; offer cached levels, not an empty board. |
| Retired incompatible content | Explain version change and offer a free new attempt; do not mutate the active take in place. |
| Expired inactive attempt | Explain the 30-day expiry, preserve verified history/readable old plan, and offer a free fresh attempt. |
| Unavailable ranking | Hide rank or show unavailable; retain verified tick/score. |
| Payment pending | Preserve pending transaction state; do not grant entitlement from UI callback. |
| Payment cancelled | Return to store without entitlement change or blame. |
| Refunded cosmetic | Explain reversion to the free appearance; scores/progress unchanged. |
| Asset load failure | Use readable procedural/CSS fallback and log asset ID; no broken-image icon over a cell. |
| Expired challenge | Open level select with a localized explanation. |
| Auth expired | Pause verification, retain local draft, request a fresh Telegram launch/session without clearing commands. |

### 6.8 Accessibility contract

Target WCAG 2.2 AA for the application shell and controls, with a stricter game-specific 44×44 px target requirement. Do not misstate 44 px as the WCAG AA minimum; WCAG distinguishes its minimum and enhanced target-size criteria [R06].

Required: visible keyboard focus; logical focus restoration; semantic buttons; labeled dialogs; reduced motion; adequate text/non-text contrast; no color-only meaning; non-drag paths; board-cell list; command list; occupant list; scalable text; no essential audio; no flashes; clear status announcements; no timed interaction requirement.

Use one concise polite live-region announcement per completed tick in step mode, such as `Tick 3. Plate A sampled occupied. Gate A open. LIVE moved to column 3, row 3.` Allow verbose cell inspection on demand. Do not announce every decorative frame during autoplay or flood a screen reader with three actors × twelve ticks automatically.

A complete nonvisual puzzle-solving experience is **not assumed** from these controls. Test it with appropriate users/assistive technologies, report actual support, and do not advertise full nonvisual accessibility before it is established.

## 7. Visual design system

### 7.1 Art direction: the indigo postal workshop

Create a calm, premium, top-down tabletop world: indigo sorting surfaces, warm cream paper, small enamel courier tokens, quiet cyan/amber temporal signals, and precise printed markings. It should feel intentionally art-directed at a small size, not like a collection of unrelated AI illustrations.

Use an **orthographic board with slight material depth**, not an isometric board. The squares, entrances, positions, and movement directions must remain exact. A fixed light from the upper left may produce small lower-right shadows contained within a tile. The visual depth must not imply an extra row, hidden passage, height rule, or diagonal movement.

The courier is an original compact delivery automaton: rounded enamel body, small cream satchel, a clear directional front, no human likeness, no real postal logo. It should remain recognizable as a 24–36 px token. Echoes reuse its silhouette; identity comes from a number, pattern, outline, and color—not a blurry transparent humanoid.

Avoid neon cyberpunk, glossy casino UI, realistic delivery-company branding, pixel-art mixed with smooth illustration, busy grain, photorealistic clutter, exaggerated 3D bevels, black fog, persistent ghost trails, particle storms, and generated lettering.

### 7.2 Material library

These are visual materials, not collectible gameplay resources. No PBR texture pipeline or 3D engine is required.

| Material ID | Use | Appearance and constraints |
|---|---|---|
| MAT-01 — Postal paper | Parcels, cards, small label surfaces | Warm ivory; fine fibers visible only in larger illustrations; clean silhouette at token size. |
| MAT-02 — Indigo enamel | Courier body and board furniture | Matte/satin, restrained edge highlight, no mirror reflections or animated specular effect. |
| MAT-03 — Printed blueprint | Floor tiles and chapter backgrounds | Indigo/blue-gray, sparse registration marks; no decorative marks resembling valid paths or plates. |
| MAT-04 — Satin gate metal | Gate collar/lattice | Neutral cool metal within the palette; open/closed geometry recognizable without color. |
| MAT-05 — Pressure pad | Plates | Slight recessed square with a visible raised/pressed change; letter badge remains readable in both states. |
| MAT-06 — Sorting partition | Walls | Solid, clearly impassable tile; low-detail top face and bounded shadow. |
| MAT-07 — Temporal ink | Echo routes and slot marks | Thin, crisp dash patterns; no blur, bloom, or permanent motion. |
| MAT-08 — Stamp ink | Result seals, mastery badges, cosmetics | Slight printed imperfection in decoration only; all functional text rendered separately. |

### 7.3 Color tokens

Use these as a coherent baseline, not as permission to skip actual contrast checks on the final art.

| Token | Value | Role |
|---|---|---|
| `color.bg` | `#101426` | Application background |
| `color.surface` | `#1B2140` | Panels and cards |
| `color.surfaceRaised` | `#252D51` | Sheets and raised controls |
| `color.boardFloor` | `#30395F` | Base tile surface |
| `color.borderStrong` | `#8194C4` | Meaningful boundaries and unfilled controls |
| `color.text` | `#F8F2DF` | Primary text and live outline |
| `color.textMuted` | `#BEC7E1` | Secondary text; never low-opacity body copy |
| `color.live` | `#F8F2DF` | Live identity |
| `color.echo1` | `#7DDCF0` | Echo 1 accent |
| `color.echo2` | `#F4C66A` | Echo 2 accent |
| `color.success` | `#8ED4B0` | Verified success and positive state |
| `color.warning` | `#FFD48A` | Pending/recovery, not ordinary waiting commands |
| `color.error` | `#FFAAA0` | Actual validation/recovery errors |
| `color.onAccent` | `#102035` | Text on bright accent buttons |

Normal text must meet 4.5:1 contrast; qualifying large text and essential non-text indicators must meet 3:1. Check the actual composites, including text on textures, disabled explanatory labels, focused controls, and occupied gate tiles. Decorative hairlines may be subtler only if they carry no necessary meaning.

Provide a high-contrast presentation that removes texture, strengthens boundaries, and preserves the same numbering/pattern system. Respect a supported system contrast preference, but allow an explicit persisted player setting.

### 7.4 Typography and spacing

Use self-hosted **Noto Sans Variable** with Latin and Cyrillic coverage; source and license instructions are in §8. Use weights 400, 600, and 700, `font-display: swap`, and tabular numerals for ticks and scores. Do not fetch fonts from a third-party CDN at runtime.

| Style | Size / line height | Weight | Use |
|---|---|---:|---|
| Display | 32 / 38 px | 700 | Home/result headline only |
| Section | 20 / 26 px | 700 | Screen sections and dialogs |
| Compact title | 18 / 24 px | 700 | Board header |
| Body | 16 / 24 px | 400 | Instructions, hint text, legal summaries |
| Button | 16 / 20 px | 600 | Primary and secondary actions |
| Supporting | 14 / 20 px | 400 or 600 | Status, route metadata |
| Board/tick label | 12 / 16 px minimum | 600 | Coordinates, badges, LIVE label |

Spacing scale: 4, 8, 12, 16, 24, 32 px. Standard control radius: 12 px; panel radius: 16 px; board tile radius: 6 px. Use 2 px visible focus outlines with a 2 px offset, adjusting inward where an outer outline would be clipped.

Do not bake titles, numbers, instructions, prices, LIVE/Echo labels, or gate letters into generated images. The product must switch languages without regenerating or replacing board art.

### 7.5 Board rendering and layers

Render layers in this order:

1. App/chapter background.
2. Board frame and tile surfaces.
3. Semantic tile artwork: start/exit, plates, gates, walls.
4. Route underlays, confined to the board and visually separated by actor pattern.
5. Ground parcel, when uncollected.
6. Actor tokens, aligned to exact cell centers.
7. LIVE/1/2 identity badges, overlap marker, and carried-parcel indicator.
8. Selected plate/gate links and tick highlights.
9. Keyboard focus ring and selected-cell boundary.
10. Inspectors/sheets, outside the board's semantic scene.

A gate is a square tile mechanism, not a thin line between two cells. Its open state retracts the obstruction; its closed state visibly fills the entry area. Draw the gate behind an occupant, so closing around an actor never hides the actor or suggests crushing.

The carried parcel becomes a small clear indicator on the live token after collection; the ground sprite disappears in that same resolution phase. Cosmetic patterns may decorate it, but the carrying indicator's silhouette/contrast is invariant.

Directional artwork is presentation only. Tokens start facing south; a directional command turns its token toward that direction during the move phase even when movement is blocked. Explicit/implicit wait retains the last facing. Reconstruct facing from commands when scrubbing; never add it as a new movement, gate, or replay-hash input.

### 7.6 Motion specification

| Event | Duration and treatment |
|---|---|
| Actor travel | 150 ms; all actors begin/end together; restrained ease-out such as `cubic-bezier(.2,.8,.2,1)` |
| Blocked move | Stay in place; destination/wall highlight, not a large shake |
| Plate/gate state | State changes at sample; optional ≤80 ms material transition within that phase |
| Parcel pickup | Ownership/icon changes immediately in resolution; optional ≤150 ms nonessential halo |
| Keep echo | ≤220 ms slot confirmation; no full-screen rewind effect |
| Sheet/menu | 120–180 ms opacity/small translation; focus moved at the correct lifecycle point |
| Verified result | ≤240 ms reveal; optional six or fewer decorative paper flecks lasting ≤700 ms |
| Idle state | No continuous token bobbing, pulsing gates, scrolling background, or unnecessary render loop |

Reduced motion replaces travel with destination highlights and immediate state changes, removes decorative flecks and sheet translation, and preserves all three phase labels. It does not speed the simulation into an unreadable flash or alter its logical tick count.

### 7.7 Design approval package

Before final art production, prepare five representative compositions: home/level select, E01 planning, a three-actor overlap/preview, a Russian hint/replacement sheet, and a result/store preview. Review them at 390×844 and 320×568, plus a wide layout and text zoom.

Approval means more than “looks attractive”: verify cell targets, command legibility, contrast, LIVE/1/2 separation, plate-to-gate linkage, overlay focus, and absence of misleading geometry. A later visual design must satisfy these invariants. The current document supplies direction and constraints; it does not pretend those compositions already exist.

## 8. Complete visual asset production plan

### 8.1 Formats, production tools, and rights

The implementation agent may use its actual image-generation MCP capability to produce original artwork. Discover the installed tool and supported parameters; this document does not invent a tool name, model, or method signature.

**Game-owned visual assets must be raster:** PNG masters with alpha where appropriate, optimized WebP delivery with PNG fallback where needed, and WOFF2 fonts. No `.svg`, inline `<svg>`, SVG sprite sheet, SVG icon component, or SVG-only dependency is part of the baseline. CSS borders, layouts, text, and Canvas-drawn runtime paths are allowed. Simple procedural raster glyphs may be drawn to Canvas and exported to PNG; they are not a reason to introduce an SVG pipeline.

Preserve original generation outputs and metadata outside the production download bundle. Record provider/model, generation date, prompt, seed if supported, output/job ID, reference inputs, account/license terms, and modifications. Access to image generation is not proof of commercial-use rights. If rights are unclear, the commercial art gate is blocked; do not label the image CC0 merely because it was generated.

Never prompt for a named artist's style, real courier-company/Telegram logos, copyrighted characters, celebrity likenesses, or recognizable third-party IP. No source image is scraped from image search and treated as licensed.

### 8.2 Export conventions

- Color space: sRGB; inspect alpha against both dark and light backgrounds.
- Master object/tile images: normally 512×512 PNG; final tiles/tokens: 128×128 raster frames for high-density display, scaled consistently at runtime.
- Generate large illustrations with crop-safe composition; if MCP supports only other sizes, produce the nearest larger supported size and crop, never stretch.
- Keep gameplay silhouettes inside a documented safe box with consistent transparent padding.
- Atlases: at most 1024×1024 unless measurement justifies a larger one; include 2 px edge extrusion/padding to prevent sampling bleed.
- Export decorative images lossy WebP where artifacts are acceptable; use lossless PNG/WebP for thin glyphs, small labels' supporting shapes, and hard-edged tiles.
- Runtime filenames are lowercase kebab-case and content-hashed by the build. Semantic asset IDs remain stable.
- Do not ship source-size 1536 px art as a 44 px token or retain unused generation variants in the web bundle.

### 8.3 Required visual inventory

Every row is a production deliverable. Variant families are explicit, not an invitation to add an unbounded asset set.

| ID | Asset family / exact variants | Production size → runtime use | Source / notes |
|---|---|---|---|
| ART-01 | One main key illustration, no text | 1536×1024 master → 1200×675 and 720×405 crops | MCP generation; original courier, parcel, abstract depot; no solvable board in marketing art. |
| ART-02 | Four chapter postcards: First Echoes, Two Routes, Crossed Signals, Mastery | 1536×1024 → 480×320 each | MCP; same world, distinct composition, not different gameplay styles. |
| ART-03 | Courier north/east/south/west | Four 512×512 transparent masters → four 128×128 frames | MCP with one approved character reference; identical proportions/anchor. No walk-cycle frames are needed. |
| ART-04 | Echo 1 and Echo 2 directional appearances | Eight derived 128×128 frames | Derive from ART-03 using controlled palette treatment; runtime numeric badges/patterns are mandatory. |
| ART-05 | Free parcel base | One 512×512 → 128×128 | MCP; cream parcel with unbranded blank stamp area. Ground/carried use the same object at different sizes. |
| ART-06 | Six premium parcel patterns | Six 512×512 pattern masters → six 128×128 composites | Exact names and pairings in §8.4; do not change parcel shape or size. |
| ART-07 | Four floor texture variations | Four 512×512 → four 128×128 frames | MCP or procedural raster; low-detail, deterministic cell variation. |
| ART-08 | Three wall top-face variations | Three 512×512 → three 128×128 frames | MCP; identical impassable silhouette, different subtle print wear only. |
| ART-09 | Start marker | One 512×512 → 128×128 | Raster marker with no lettering; accessible/type label supplied by UI. |
| ART-10 | Exit idle / delivery-ready | Two 512×512 → two 128×128 frames | Open mailbox/depot slot metaphor; both remain traversable; readiness is not another gate rule. |
| ART-11 | Plate raised / pressed | Two 512×512 → two 128×128 frames | One common shape; a/b/c identity and links supplied by runtime labels/patterns. |
| ART-12 | Gate closed / open | Two 512×512 → two 128×128 frames | Square collar/lattice; A/B/C labels supplied by runtime. No orientation-specific rule. |
| ART-13 | One verified-delivery seal/illustration | 1024×1024 → 320×320 | MCP; no baked success text. Failed runs use the board, not a separate defeat illustration. |
| ART-14 | Three mastery badge bases | Three 512×512 → 128×128 | First Delivery, Route Keeper, Echo Conductor; counts/names are live text. |
| ART-15 | One free result border + six matching premium borders | Seven 1024×1024 masters → reusable raster corner/edge pieces | Decorations stay outside text/content safe area; fixed pairings with ART-06. |
| ART-16 | One neutral empty/recovery vignette | 1024×1024 → 240×240 | Small parcel beside an inactive signal; reuse for offline/empty states with different text, not misleading error icons. |
| ART-17 | UI glyph family listed in §8.5 | 96×96 source per glyph → 24/32 px visual inside ≥44 px controls | Procedurally drawn original raster or consistently generated; no emoji/SVG icon library. |
| ART-18 | One paper-grain texture | 128×128 seamless PNG | Seeded procedural noise, very low contrast; removed in high-contrast mode. |
| ART-19 | One share-card background | Derive from ART-01 → 1200×630 | No board solution, player avatar, user ID, or command trace. Text composed at share time. |
| ART-20 | App/bot icon and browser favicon | One 1024×1024 master → 512/192/180/32 px PNG exports | Original courier/parcel mark; no text or Telegram logo; central safe area survives circular/maskable crops. |
| FONT-01 | Noto Sans Latin and Cyrillic variable subsets + license | WOFF2 self-hosted | Exact inspected source files in §8.7. |

Tutorial board scenes use real board assets and runtime highlights. Do not replace the interactive tutorial with four static screenshots or generated diagrams that disagree with the evaluator.

### 8.4 Cosmetic set contents

SKU: `ec.parcel-stamp-set.v1`. Product name: **Parcel Stamp Set**. Proposed price: **75 Telegram Stars**, subject to operator/platform approval. Exactly six selectable pairs are included; the player can inspect every pair before purchase.

| Cosmetic ID | English name | Russian name | Parcel pattern | Matching result border |
|---|---|---|---|---|
| `orbit-dots` | Orbit Dots | Орбитальные точки | Sparse concentric-dot motif | Small circular corner stamps |
| `midnight-stripes` | Midnight Stripes | Полуночные полосы | Thin indigo diagonal bands | Alternating corner bands |
| `constellation` | Constellation | Созвездие | Original small star-point arrangement | Sparse connected-point ornament, not a real logo |
| `checkered-paper` | Checkered Paper | Клетчатая бумага | Fine two-tone square print | Small checkered corner patches |
| `paper-waves` | Paper Waves | Бумажные волны | Gentle repeating wave print | Rounded wave corner ornaments |
| `tiny-comets` | Tiny Comets | Маленькие кометы | Small cream/indigo comet dots | Short printed comet accents |

The free default is `plain-post` / Plain Post / Простая почта. Applying a pair changes parcel surface and result-card border **only**. It never changes the live/echo body, gate contrast, route color, command count, collision, score, or any gameplay timing.

Pattern compositing uses the same alpha mask and bounding box as the free parcel. Store previews may show unowned patterns, but equipping an owned-only pattern requires server entitlement. Refunding the set reverts to the free default without changing any completion or score.

### 8.5 UI glyph inventory

Create one consistent raster glyph for each of these semantic names:

```text
arrow-n, arrow-e, arrow-s, arrow-w, wait,
play, pause, step-back, step-next, rewind,
undo, redo, trash, edit, info, hint,
check, close, back, settings,
sound-on, sound-off, music, haptics, language,
share, copy, refresh, cloud-ok, cloud-pending, offline,
lock, parcel, gate, plate, external-link
```

All 36 glyphs must have consistent stroke weight, optical size, and padding. The lock glyph is only for unavailable/equipment state where applicable, never to imply paid level access. Currency is written as localized `Stars`; a custom unofficial Telegram currency logo is unnecessary.

Every icon-only button receives a localized accessible name and a visible tooltip/help label on appropriate input devices. A glyph is decoration inside a button, not its sole semantic representation.

### 8.6 Reusable generation prompts and process

**Shared art prefix** — prepend to every MCP art request:

> Original visual assets for Echo Courier, a calm premium temporal postal puzzle. Orthographic top-down readability, warm cream paper and deep indigo enamel, restrained cyan/amber accents, clean silhouette, subtle printed texture, fixed upper-left light, coherent small-game art direction. No lettering, numbers, captions, watermark, logo, real postal brand, existing character, celebrity, named artist imitation, photorealism, neon bloom, SVG, vector-file output, or misleading game geometry.

**Character prompt**:

> One compact friendly delivery automaton, rounded matte indigo enamel shell, small cream mail satchel, clear [north/east/south/west] facing, orthographic top-down token, isolated transparent background. Match the approved character reference exactly in proportions, colors, satchel shape, and anchor point. Readable at 32 pixels. No scene, floor, extra objects, cast shadow outside the safe box, or printed text.

**Tile prompt**:

> One square [floor / wall / raised plate / pressed plate / closed gate / open gate] tile, viewed exactly from above. Fit the gameplay silhouette inside the tile boundary. For gates, use a square retractable collar/lattice rather than an edge barrier. Keep the center clear enough for an actor token. Consistent scale with approved tiles. Transparent outside the tile. No letters; identifiers will be UI text.

**Parcel/pattern prompt**:

> One small cream paper parcel, same shape and camera as the approved free parcel. Add only the original [pattern description] within the blank surface mask. Preserve outline and carrying readability. Transparent background, no text, address, shipping label, barcode, brand, or extra package.

**Key-art prompt**:

> A quiet impossible postal sorting workshop at blue hour, one original delivery automaton and a cream parcel, subtle visual suggestion of two earlier routes through repeated printed marks. Spacious indigo background with a clear central focal point and generous crop-safe negative space. Editorial game illustration, not a screenshot. Do not depict a specific playable puzzle or put text into the image.

**Result/badge prompt**:

> Original cream-and-indigo postal seal ornament celebrating cooperation with earlier routes. Restrained screen-print detail, centered silhouette, transparent background, empty center/text-safe area for localized UI. No lettering, number, official emblem, stars-as-currency symbol, or existing seal design.

Production order:

1. Generate a small mood exploration and choose one coherent direction.
2. Approve one courier, free parcel, floor, plate, and gate as the style references.
3. Generate directional/state variants against those references; do not independently reinvent each tile.
4. Remove unintended backgrounds, crop/align anchors, repair edges, and reject ambiguous silhouettes.
5. Produce echo variants and cosmetic composites with deterministic raster processing.
6. Export atlases and runtime images; generate the manifest and notices.
7. Inspect at actual 44/56 px cell sizes, in overlap, grayscale, high contrast, and Russian UI.
8. Rework failed assets; do not compensate for unreadable art by reducing text or hiding required state.

If MCP image generation is unavailable, functional development may use clearly marked raster/CSS geometric stand-ins. Final-art acceptance remains blocked until original/approved replacement art exists. Do not claim generated assets were produced when they were not.

### 8.7 Font acquisition and inspected files

Use `@fontsource-variable/noto-sans@5.3.0` as the fixed acquisition reference, copying only the needed files into the build's self-hosted asset pipeline:

| File | Verified size | SHA-256 |
|---|---:|---|
| `noto-sans-latin-wght-normal.woff2` | 35,820 bytes | `51ca196f49a33e79e7870ff88ebd2829a3f627a51e7d690986618f0e7ad2b52d` |
| `noto-sans-cyrillic-wght-normal.woff2` | 20,080 bytes | `6ab64433de6077ca5ad31b05420450ce986a616a4ea47b6ad16f3217055dafc3` |
| Package `LICENSE` | 4,518 bytes | `54ec7b5a35310ad66f9f3091426f7028484cbf9ae1ab5da30122ee412a3009e1` |

Exact acquisition URLs:

- <https://unpkg.com/@fontsource-variable/noto-sans@5.3.0/files/noto-sans-latin-wght-normal.woff2>
- <https://unpkg.com/@fontsource-variable/noto-sans@5.3.0/files/noto-sans-cyrillic-wght-normal.woff2>
- <https://unpkg.com/@fontsource-variable/noto-sans@5.3.0/LICENSE>

These URLs/files and license were inspected during specification authoring; do not use them as runtime CDN dependencies. Retain the OFL-1.1 copyright/license with redistributed fonts. Test all shipped English/Russian glyphs, punctuation, `Ё/ё`, and numerals. Preserve the package's correct unicode-range declarations when splitting subsets; do not declare the Cyrillic file as if it contained all Latin glyphs.

A package/source update requires new checksums and the same licensing/glyph review. The font is not sold separately, stripped of its notice, or represented as original Echo Courier artwork [R09].

### 8.8 Asset manifest and acceptance

The implementation creates a machine-readable `assets-manifest.json` and `THIRD_PARTY_NOTICES` with, at minimum:

```text
assetId, relativePath, mediaType, width, height, byteSize, sha256,
sourceType (generated/procedural/third-party), sourceUrl or generationRecordId,
licenseId, licenseEvidencePath, modifications, variants, intendedUsage,
approvedForCommercialRelease, reviewDate
```

Do not put a fake hash or a guessed license into the manifest. Commercial release requires every shipped file to resolve to an existing asset and rights record. Generated/procedural material is labeled according to actual ownership/terms, not automatically CC0.

Asset QA includes transparent edges, atlas bleed, no baked text, consistent camera/light, parcel readability after cosmetics, open/closed gate distinction, no active-cell ambiguity, no unlicensed or unused files in the runtime bundle, and file-size compliance. Required art is not complete merely because an image-generation job returned successfully.

## 9. Audio and haptic specification

### 9.1 Audio direction and baseline choice

The baseline uses **original procedural audio**, so the game can be built without purchasing or searching for recordings. The sound palette is warm paper/wood ticks, restrained mechanical signals, and soft temporal chimes. It supports feedback without becoming a timing dependency or an alarm.

No voiceover, speech synthesis, licensed commercial song, ambient crowd recording, or generated imitation of an artist is required. Audio is nonessential: every sound has an equivalent visible state.

Default settings: SFX off until the player explicitly enables sound; music off; haptics off. Sliders retain their preferred nonzero values while their channel is muted. Do not interrupt first launch with a mandatory audio-permission dialog.

### 9.2 Synthesis and playback architecture

Use one reusable Web Audio `AudioContext`, with master, SFX, and music gain buses. Create/resume it from a direct user activation, not from load timers. Synthesis uses sine/triangle oscillators and seeded filtered noise; avoid harsh unfiltered square waves.

Reference audio sample rate is 48 kHz for generated review masters. Runtime uses the actual context sample rate safely; identical acoustic sample bytes across devices are not a gameplay requirement. Procedural randomness has a separate seed/state from the game evaluator and never influences commands, content, scoring, or replay hashes.

For repeatable production review, provide an offline render/export of every cue as 48 kHz mono 16-bit PCM WAV (stereo only for music). The shipped game may synthesize/cached-buffer these same cues directly. If file playback is selected instead, these short WAV cues are the compatibility baseline; compressed formats require target-WebView testing. Do not make OGG-only playback a hard dependency.

Envelope defaults: 3–5 ms attack, a short shaped decay, final 3–8 ms fade to zero, no DC offset, and no click at truncation. Cap each cue below −3 dBFS sample peak; verify the actual summed mix stays below −1 dBTP without audible pumping. “Volume percentage” alone is not a loudness specification.

### 9.3 Complete SFX cue sheet

Durations are total cue lengths; pitch and envelope numbers are initial production recipes, to be auditioned and adjusted within the stated character/budgets. Gains are relative to the SFX bus, not promises about a device's physical loudness.

| ID / name | Trigger | Procedural recipe | Length / gain |
|---|---|---|---|
| SFX-01 `ui-confirm` | Ordinary accepted button/menu activation; confirmed purchase receipt may reuse it | Triangle 660→520 Hz exponential fall; 4 ms attack, soft decay | 55 ms / 0.12 |
| SFX-02 `ui-back` | Back, dismiss, cancel | Sine 420→320 Hz; short rounded envelope | 65 ms / 0.10 |
| SFX-03 `command-set` | Authored insert/replace | Triangle 780 Hz plus very quiet low-pass noise; pitch variant by direction is decorative only | 65 ms / 0.14 |
| SFX-04 `command-remove` | Delete, undo, redo, clear-plan confirmation | Sine 390→260 Hz, no harsh error buzz | 75 ms / 0.12 |
| SFX-05 `preview-start` | Start preview/run playback | Two triangle notes 392 and 523 Hz, 55 ms apart | 150 ms / 0.13 |
| SFX-06 `preview-pause` | Explicit pause | Soft sine 392 Hz with 35 ms decay | 50 ms / 0.08 |
| SFX-07 `courier-step` | Live courier completes a valid move during forward playback | 45 ms seeded noise through 900 Hz low-pass plus 190 Hz sine body | 65 ms / 0.09 |
| SFX-08 `blocked-move` | Live command blocked | Low-pass noise at 450 Hz plus muted 150 Hz triangle; not a failure alarm | 70 ms / 0.10 |
| SFX-09 `plate-on` | Sample changes plate group from unoccupied to occupied | 680→880 Hz triangle click with short filtered-noise transient | 90 ms / 0.11 |
| SFX-10 `plate-off` | Sample changes occupied to unoccupied | 660→470 Hz inverse click | 85 ms / 0.09 |
| SFX-11 `gate-open` | Sample opens one or more linked gates | Soft sine pair 440 then 660 Hz; light 1.2 kHz filtered-noise lift | 160 ms / 0.13 |
| SFX-12 `gate-close` | Sample closes one or more linked gates | Soft sine pair 660 then 440 Hz, shorter tail | 145 ms / 0.11 |
| SFX-13 `echo-keep` | A keep/replacement is acknowledged or visibly committed locally as pending | Three triangle pulses at 440/554/660 Hz; Echo 2 variant transposed up two semitones | 240 ms / 0.18 |
| SFX-14 `parcel-pickup` | Live parcel collection in forward playback | Sine/triangle notes 523/659/784 Hz, staggered by 45 ms | 260 ms / 0.20 |
| SFX-15 `hint-open` | A new hint is actually disclosed | Two soft sine notes 392→494 Hz with broad decay | 240 ms / 0.12 |
| SFX-16 `take-ended` | Tick 12 without delivery | Warm low triangle 220→196 Hz; neutral conclusion | 180 ms / 0.10 |
| SFX-17 `delivery-success` | Verified result becomes presentable | Original four-note motif D5–F♯5–A5–D6 (587.33/739.99/880/1174.66 Hz), 110 ms spacing, soft tail | 780 ms / 0.24 |
| SFX-18 `mastery` | First acknowledgement of 1/5/15-level badge | Lower, slower variant of the success motif; play after rather than on top of success | 650 ms / 0.18 |
| SFX-19 `cosmetic-apply` | Equipment change acknowledged | Brief paper-noise brush, 1.5 kHz low-pass, 520 Hz sine accent | 120 ms / 0.11 |
| SFX-20 `recoverable-error` | Actual validation/network failure requiring attention | Two low rounded pulses at 260 Hz, separated by 90 ms; no repeated alarm | 240 ms / 0.10 |

Do not play footstep sounds for all three actors by default. Echo movement is communicated visually; multiplying footsteps makes synchronization harder to understand. A hidden echoed actor cannot produce a confusing “parcel collected” sound.

The gate/plate cues refer to the **sample phase**, not the instant an actor arrives at the end of movement. A quiet arrival tick may accompany movement, but the opening signal must not teach the wrong rule.

### 9.4 Event arbitration and mixing

- Maximum eight oscillator/buffer voices at once and four cue events within one tick; merge repeated events of the same family.
- If a plate opens several gates, use one grouped gate cue, not one loud cue per tile.
- Priority: verified success → pickup → keep → gate state → plate state → live step → ordinary UI click.
- Suppress a lower-priority cue if needed; never delay it into a later tick where it would imply another event.
- Preview scrub, rewind, hover, focus movement, and automatic restoration are silent. A deliberate forward single-step may play that tick's limited cue set.
- A server retry/duplicate acknowledgement does not replay keep, purchase, completion, or mastery sounds.
- Local preview delivery may use a small pickup/arrival cue, but the full SFX-17 fanfare is reserved for verified results (or the clearly labeled tutorial success).
- Fade/suspend audio on hide; do not accumulate scheduled cues and play them on return.
- Volume changes apply immediately, and mute stops current nonessential voices with a short safe fade.

### 9.5 Optional procedural music: MUS-01 `sorting-room`

One restrained, nonessential loop is enough. Music is independently user-enabled, never used as a metronome for puzzle timing, and never required to solve a level.

Reference composition: 72 BPM, 4/4, 16 bars (53.333 seconds), four bars each of Dadd9 → Bm7 → G6 → Asus2. Use a soft sine/triangle pad and occasional high pluck, with no melody dense enough to compete with instructions.

Reference pitch sets:

- Dadd9: D3 146.83 Hz, A3 220 Hz, E4 329.63 Hz.
- Bm7: B2 123.47 Hz, F♯3 185.00 Hz, A3 220 Hz, D4 293.66 Hz.
- G6: G2 98.00 Hz, D3 146.83 Hz, E3 164.81 Hz, B3 246.94 Hz.
- Asus2: A2 110 Hz, E3 164.81 Hz, B3 246.94 Hz.

Use long 1.8 s attacks, 2.4 s releases, gentle low-pass filtering, minimal stereo spread, and a click-free overlap at the loop boundary. Start with music bus gain 0.12 relative to its normalized source and keep it clearly below SFX. Reference exported music target: approximately −26 LUFS integrated and ≤−3 dBTP before in-game mixing. These are audition targets, not a reason to add a heavyweight audio engine.

Do not restart the loop on every command, sheet opening, or preview scrub. Stop/suspend on deactivation and resume only under the audio lifecycle policy. No music download is needed for the procedural baseline.

### 9.6 Optional vetted recorded-sound source

If synthesized transients need more tactile character, the approved **optional** replacement source is Kenney **Interface Sounds 1.0**, not arbitrary “free sound” search results [R07]. The game can ship without it.

- Official page: <https://kenney.nl/assets/interface-sounds>
- Exact inspected ZIP: <https://kenney.nl/media/pages/assets/interface-sounds/fa43c1dd4d-1677589452/kenney_interface-sounds.zip>
- Inspected archive size: **834,536 bytes**.
- Inspected archive SHA-256: `f2193d072726d6758a5f7871b2dcc54dcce0d5c35c6f0a62f92549b327c81232`.
- Archive `License.txt` identifies CC0 and explicitly permits personal, educational, and commercial use; credit is appreciated but not mandatory.

The following archive paths were checked to exist:

| Archive path | Permitted audition/replacement role |
|---|---|
| `Audio/click_001.ogg` | UI activation / command set |
| `Audio/select_001.ogg` | Selection/confirmation |
| `Audio/switch_001.ogg` | Plate/gate mechanical accent |
| `Audio/drop_001.ogg` | Parcel/step transient |
| `Audio/pluck_001.ogg` | Small melodic accent |
| `Audio/confirmation_001.ogg` | Confirmation accent, not an unverified payment grant |
| `Audio/error_001.ogg` | Only after checking that it is suitably gentle |
| `Audio/question_001.ogg` | Hint cue candidate |
| `Audio/back_001.ogg` | Back/cancel |

Presence and licensing were verified; these sounds were **not artistically auditioned or tested in Telegram** during documentation authoring. Audition, trim, normalize, and transcode selected recordings as needed; preserve original filenames/license/hash in provenance. Do not ship the entire archive just to use two clicks.

If the archive changes, revalidate it from the official page and record the new checksum/license. CC0 does not itself clear trademark, privacy/publicity rights, or imply endorsement [R08]. Do not hotlink sounds from Kenney or silently replace a missing file with an unlicensed search result.

### 9.7 Mobile audio lifecycle

1. Boot silently. A direct click/tap on Enable sound may create the context and call `resume()`; catch failure and confirm the actual `running` state.
2. Use a single reusable context. Do not instantiate one per cue or force autoplay with silent-media workarounds.
3. On `document.visibilitychange` to hidden, or supported Telegram `deactivated`, pause presentation scheduling, cancel pending audio, and suspend the context.
4. On return, restore a stable paused gameplay frame. Do not replay elapsed ticks or missed sound. If audio is interrupted/suspended, wait for the next explicit interaction when necessary.
5. Observe context state changes; phone calls, app switching, device lock, and audio-focus interruption must not crash or lock controls.
6. Audio failure degrades to silence with a recoverable setting indicator, not to an unplayable game.

Browser autoplay rules and Telegram lifecycle capabilities must be feature-detected and tested on real target clients [R01, R04, R05]. A desktop browser test alone does not establish iOS Telegram audio support.

### 9.8 Haptics

Haptics are optional, default off, and routed through feature-detected Telegram `HapticFeedback` only. No vibration permission request or browser vibration fallback is required.

When enabled: a light selection feedback for deliberate command placement, a light impact for keep confirmation, and a success notification for a verified result. Do not vibrate every actor movement, every scrubbed tick, background event, network retry, or hint. Coalesce rapid inputs to avoid a buzzing keyboard effect. If unsupported, remain silent without error.

### 9.9 Audio completion gate

All 20 SFX cues and the optional music implementation must have an explicit event mapping, mixer test, clipping/click audit, lifecycle test, and mute behavior. Optional recorded replacements need license evidence. Any music toggle shown in production must control an implemented loop; otherwise omit that optional toggle rather than ship a dead control.

Listen on phone speaker and headphones, at low and moderate volumes, including Russian tutorial use. Test first unlock, repeated preview, overlap, scrub, rapid edits, app switch, phone lock, incoming-call interruption, return, mute persistence, and verified-result deduplication. No hearing-sensitive player should need to enable sound to understand the game.

## 10. Complete 24-level campaign

### 10.1 Campaign structure and authoring constraints

The categories are an **exclusive partition**, preserving the supplied SRS's exact counts:

| Chapter | IDs | Count | Operational definition |
|---|---|---:|---|
| First Echoes | E01–E06 | 6 | Single-plate puzzles introducing sampling, waiting, overlap, pickup, gate release, and return routes. |
| Two Routes | E07–E14 | 8 | Two-echo puzzles whose twelve-tick solution requires both stored helpers. |
| Crossed Signals | E15–E20 | 6 | At least two gates with shared/intersecting actor routes, changing occupancy, or temporal dependencies; not a new kind of tile. |
| Mastery | E21–E24 | 4 | Combinations of established mechanics; no surprise third echo, hidden rule, or longer take. |

The campaign is authored, not randomized at runtime. A fixed level has no changing gameplay seed. Cosmetic texture variation may use a stable decorative seed that is separate from the evaluator. Language changes preserve level/content/rules/commands, not a newly generated board.

Production level validation must reject malformed maps, missing controllers, inaccessible objectives under all valid schedules, references longer than 12 commands, and any unintended bypass of a claimed minimum-echo requirement. The final content must also pass human review for repetitive setup work, weak teaching, indistinguishable geometry, unclear paths, and unjustified difficulty spikes.

The reference witnesses below are **solutions, not restrictions on player solutions**. Extra valid solutions are welcome. Do not add hidden route equality checks just because the author's solution used a particular wait.

### 10.2 Reading and packaging the level data

Each `grid` is six strings in top-to-bottom row order. See §2 for tokens and zero-based coordinates. Command strings use `N/E/S/W/.`; convert them to canonical full command values when importing content. Null `echo2` means the slot is absent, not a twelve-wait third participant.

`reference` and `authoringCheck` are development/server-private content. The public level manifest contains geometry, links, IDs, version pins, chapter/title keys, and safe metadata, not a full solution button disguised as a public JSON property. Store the reference solution and hint records in the authoring/server bundle and serve full reveal only through the Study flow. This is a UX/assistance boundary, not a claim that puzzle answers can be kept secret from a determined reader of published source.

`earliestTicksByEchoCount` is ordered `[0 echoes, 1 echo, 2 echoes]`; null means no delivery exists within twelve ticks under that helper count in the stated authoring search. The corresponding `bestScore` is a mathematical target for that content, not a measured player result or a claim that every player should optimize immediately.

Derive display order from the numeric E01–E24 suffix and chapter from §10.1. Import each bilingual `title` as `level.<ID>.title`; hint keys are `level.<ID>.hint.1/2/3`, and chapter keys/copy are in §11.5. The English-only `teaches` field is an authoring note, not untranslated player-facing copy. Fixed geometry plus the global objective provides the playable brief; no additional per-level story text or hidden content file is required.

### 10.3 Exact level manifest

The manifest is normative candidate content for implementation. An array of commands is authored by converting each character of its reference string using §2.1. Do not rotate, shorten, extend, or substitute these maps without a content revision and fresh checks.

| Level | Title | Reference echoes | Delivery tick | Reference score | Best formula score found |
|---|---|---:|---:|---:|---:|
| E01 | First Echo | 1 | 5 | 145 | 145 |
| E02 | Hold the Line | 1 | 8 | 130 | 130 |
| E03 | Parcel First | 1 | 6 | 140 | 140 |
| E04 | Shared Pavement | 1 | 8 | 130 | 130 |
| E05 | A Passing Signal | 1 | 7 | 135 | 135 |
| E06 | Return Post | 1 | 11 | 115 | 115 |
| E07 | Two Corners | 2 | 9 | 115 | 115 |
| E08 | Split Shift | 2 | 10 | 110 | 110 |
| E09 | Open the Way | 2 | 9 | 115 | 115 |
| E10 | One Tick Later | 2 | 8 | 120 | 120 |
| E11 | The Long Helper | 2 | 11 | 105 | 105 |
| E12 | Cross Dock | 2 | 8 | 120 | 120 |
| E13 | The Full Round | 2 | 12 | 100 | 100 |
| E14 | Parallel Appointment | 2 | 9 | 115 | 115 |
| E15 | Relay Junction | 1 | 6 | 140 | 140 |
| E16 | Passing the Signal | 1 | 8 | 130 | 130 |
| E17 | Shared Approach | 1 | 8 | 130 | 130 |
| E18 | Replay Shift | 2 | 9 | 115 | 115 |
| E19 | Wait at the Crossing | 1 | 8 | 130 | 130 |
| E20 | Opposite Dispatches | 2 | 8 | 120 | 120 |
| E21 | Three-Gate Cascade | 2 | 11 | 105 | 105 |
| E22 | Closed-Gate Return | 1 | 10 | 120 | 125 |
| E23 | Linked Hourglass | 2 | 11 | 105 | 105 |
| E24 | Final Delivery | 2 | 11 | 105 | 105 |

```json
{
  "schemaVersion": 1,
  "gameId": "SG-G01",
  "contentVersion": "ec-campaign-1.0.0",
  "rulesVersion": "ec-rules-1.0.0",
  "levels": [
    {
      "levelId": "E01",
      "category": "single-plate",
      "title": {
        "en": "First Echo",
        "ru": "Первое эхо"
      },
      "grid": [
        "######",
        "######",
        "a#####",
        ".S.APX",
        "######",
        "######"
      ],
      "gateLinks": {
        "A": "a"
      },
      "reference": {
        "echo1": "WN",
        "echo2": null,
        "live": "E.EEE",
        "deliveryTick": 5,
        "activeEchoes": 1,
        "takesUsed": 2,
        "score": 145
      },
      "authoringCheck": {
        "minimumEchoes": 1,
        "earliestTicksByEchoCount": [
          null,
          5,
          5
        ],
        "bestScore": 145
      },
      "teaches": "A plate arrival affects the following tick; one short helper route can finish and keep holding."
    },
    {
      "levelId": "E02",
      "category": "single-plate",
      "title": {
        "en": "Hold the Line",
        "ru": "Держать позицию"
      },
      "grid": [
        "######",
        "a..###",
        "##.###",
        "##S.A#",
        "####.#",
        "####PX"
      ],
      "gateLinks": {
        "A": "a"
      },
      "reference": {
        "echo1": "NNWW",
        "echo2": null,
        "live": "E...ESSE",
        "deliveryTick": 8,
        "activeEchoes": 1,
        "takesUsed": 2,
        "score": 130
      },
      "authoringCheck": {
        "minimumEchoes": 1,
        "earliestTicksByEchoCount": [
          null,
          8,
          8
        ],
        "bestScore": 130
      },
      "teaches": "A finished echo stays on its final cell. Wait for its longer approach rather than adding echo wait commands."
    },
    {
      "levelId": "E03",
      "category": "single-plate",
      "title": {
        "en": "Parcel First",
        "ru": "Сначала посылка"
      },
      "grid": [
        "######",
        "#a####",
        "#.####",
        "#S.PA#",
        "####.#",
        "####.X"
      ],
      "gateLinks": {
        "A": "a"
      },
      "reference": {
        "echo1": "NN",
        "echo2": null,
        "live": "EEESSE",
        "deliveryTick": 6,
        "activeEchoes": 1,
        "takesUsed": 2,
        "score": 140
      },
      "authoringCheck": {
        "minimumEchoes": 1,
        "earliestTicksByEchoCount": [
          null,
          6,
          6
        ],
        "bestScore": 140
      },
      "teaches": "Collect the parcel before crossing the gate; the exit only matters when carrying it."
    },
    {
      "levelId": "E04",
      "category": "single-plate",
      "title": {
        "en": "Shared Pavement",
        "ru": "Общая дорожка"
      },
      "grid": [
        "#X####",
        "#.####",
        "#A####",
        "#.##a#",
        "#S.P.#",
        "######"
      ],
      "gateLinks": {
        "A": "a"
      },
      "reference": {
        "echo1": "EEEN",
        "echo2": null,
        "live": "EEWWNNNN",
        "deliveryTick": 8,
        "activeEchoes": 1,
        "takesUsed": 2,
        "score": 130
      },
      "authoringCheck": {
        "minimumEchoes": 1,
        "earliestTicksByEchoCount": [
          null,
          8,
          8
        ],
        "bestScore": 130
      },
      "teaches": "Echoes may cross the parcel and overlap the courier without collecting it or colliding."
    },
    {
      "levelId": "E05",
      "category": "single-plate",
      "title": {
        "en": "A Passing Signal",
        "ru": "Мимолётный сигнал"
      },
      "grid": [
        "######",
        "####PX",
        "###..#",
        "#S.A##",
        "#.####",
        "#a####"
      ],
      "gateLinks": {
        "A": "a"
      },
      "reference": {
        "echo1": "SSN",
        "echo2": null,
        "live": "E.ENENE",
        "deliveryTick": 7,
        "activeEchoes": 1,
        "takesUsed": 2,
        "score": 135
      },
      "authoringCheck": {
        "minimumEchoes": 1,
        "earliestTicksByEchoCount": [
          null,
          7,
          7
        ],
        "bestScore": 135
      },
      "teaches": "An echo may leave a plate on the entry tick. A gate that closes around the courier still permits exit."
    },
    {
      "levelId": "E06",
      "category": "single-plate",
      "title": {
        "en": "Return Post",
        "ru": "Обратная доставка"
      },
      "grid": [
        "######",
        "#P.###",
        "##A###",
        "#XS..#",
        "####.#",
        "####a#"
      ],
      "gateLinks": {
        "A": "a"
      },
      "reference": {
        "echo1": "EESS",
        "echo2": null,
        "live": "....NNWESSW",
        "deliveryTick": 11,
        "activeEchoes": 1,
        "takesUsed": 2,
        "score": 115
      },
      "authoringCheck": {
        "minimumEchoes": 1,
        "earliestTicksByEchoCount": [
          null,
          11,
          11
        ],
        "bestScore": 115
      },
      "teaches": "The same gate must stay available for an outward trip and the parcel-carrying return."
    },
    {
      "levelId": "E07",
      "category": "two-echo",
      "title": {
        "en": "Two Corners",
        "ru": "Два угла"
      },
      "grid": [
        "##BP.X",
        "##.###",
        "##A###",
        "##.###",
        "..S...",
        "a####b"
      ],
      "gateLinks": {
        "B": "b",
        "A": "a"
      },
      "reference": {
        "echo1": "WWS",
        "echo2": "EEES",
        "live": "N..NNNEEE",
        "deliveryTick": 9,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 115
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          9
        ],
        "bestScore": 115
      },
      "teaches": "Two distant plates are faster to staff separately than with one travelling helper."
    },
    {
      "levelId": "E08",
      "category": "two-echo",
      "title": {
        "en": "Split Shift",
        "ru": "Разделённая смена"
      },
      "grid": [
        "####PX",
        "##.B.#",
        "##A###",
        "..S..#",
        ".###.#",
        "a###b#"
      ],
      "gateLinks": {
        "B": "b",
        "A": "a"
      },
      "reference": {
        "echo1": "WWSS",
        "echo2": "EESS",
        "live": "....NNEENE",
        "deliveryTick": 10,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 110
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          10
        ],
        "bestScore": 110
      },
      "teaches": "Plan two equal-length helper approaches before the courier starts the gated route."
    },
    {
      "levelId": "E09",
      "category": "two-echo",
      "title": {
        "en": "Open the Way",
        "ru": "Открыть дорогу"
      },
      "grid": [
        "b#####",
        ".#####",
        "...BPX",
        "A#####",
        ".#####",
        "S.a###"
      ],
      "gateLinks": {
        "B": "b",
        "A": "a"
      },
      "reference": {
        "echo1": "EE",
        "echo2": "N.NNNN",
        "live": "N.NNEEEEE",
        "deliveryTick": 9,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 115
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          9
        ],
        "bestScore": 115
      },
      "teaches": "Echo 1 opens the first gate so Echo 2 can reach the second plate; echo routes are commands in the current board state."
    },
    {
      "levelId": "E10",
      "category": "two-echo",
      "title": {
        "en": "One Tick Later",
        "ru": "На такт позже"
      },
      "grid": [
        "###BPX",
        "###.##",
        "#b.A##",
        "###.##",
        "###S.a",
        "######"
      ],
      "gateLinks": {
        "B": "b",
        "A": "a"
      },
      "reference": {
        "echo1": "EE",
        "echo2": "N.NWW",
        "live": "N.NN.NEE",
        "deliveryTick": 8,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 120
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          8
        ],
        "bestScore": 120
      },
      "teaches": "A second plate reached at the end of tick 5 opens its gate at tick 6, not tick 5."
    },
    {
      "levelId": "E11",
      "category": "two-echo",
      "title": {
        "en": "The Long Helper",
        "ru": "Дальний помощник"
      },
      "grid": [
        "######",
        "#S..a#",
        "#.####",
        "#A...#",
        "#.##b#",
        "#BPX##"
      ],
      "gateLinks": {
        "A": "a",
        "B": "b"
      },
      "reference": {
        "echo1": "EEE",
        "echo2": "S..SEEES",
        "live": "S..SS...SEE",
        "deliveryTick": 11,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 105
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          11
        ],
        "bestScore": 105
      },
      "teaches": "Wait on a safe floor cell while the longer helper route reaches its plate."
    },
    {
      "levelId": "E12",
      "category": "two-echo",
      "title": {
        "en": "Cross Dock",
        "ru": "Перегрузочный узел"
      },
      "grid": [
        "##XB.#",
        "####P#",
        "a.SA..",
        "#####b",
        "######",
        "######"
      ],
      "gateLinks": {
        "B": "b",
        "A": "a"
      },
      "reference": {
        "echo1": "WW",
        "echo2": "..EEES",
        "live": "..EENNWW",
        "deliveryTick": 8,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 120
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          8
        ],
        "bestScore": 120
      },
      "teaches": "Shared first steps can split into a helper route and a parcel route without traffic conflicts."
    },
    {
      "levelId": "E13",
      "category": "two-echo",
      "title": {
        "en": "The Full Round",
        "ru": "Полный круг"
      },
      "grid": [
        "##BP##",
        "##.###",
        "##Ab##",
        "##.###",
        "aXS###",
        "######"
      ],
      "gateLinks": {
        "B": "b",
        "A": "a"
      },
      "reference": {
        "echo1": "WW",
        "echo2": "N.NE",
        "live": "N.NNNEWSSSSW",
        "deliveryTick": 12,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 100
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          12
        ],
        "bestScore": 100
      },
      "teaches": "Use both plates for an outward-and-return route that deliberately uses the full 12-tick budget."
    },
    {
      "levelId": "E14",
      "category": "two-echo",
      "title": {
        "en": "Parallel Appointment",
        "ru": "Параллельная встреча"
      },
      "grid": [
        "#####X",
        "##A.B.",
        "##P###",
        "..S...",
        ".####.",
        "a####b"
      ],
      "gateLinks": {
        "A": "a",
        "B": "b"
      },
      "reference": {
        "echo1": "WWSS",
        "echo2": "EEESS",
        "live": "N...NEEEN",
        "deliveryTick": 9,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 115
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          9
        ],
        "bestScore": 115
      },
      "teaches": "Collect early, then synchronize two differently timed helpers without adding a third echo."
    },
    {
      "levelId": "E15",
      "category": "intersecting-gates",
      "title": {
        "en": "Relay Junction",
        "ru": "Релейный перекрёсток"
      },
      "grid": [
        "######",
        "#ab..#",
        "#.##.#",
        "#S.ABP",
        "#####X",
        "######"
      ],
      "gateLinks": {
        "A": "a",
        "B": "b"
      },
      "reference": {
        "echo1": "NNE",
        "echo2": null,
        "live": ".EEEES",
        "deliveryTick": 6,
        "activeEchoes": 1,
        "takesUsed": 2,
        "score": 140
      },
      "authoringCheck": {
        "minimumEchoes": 1,
        "earliestTicksByEchoCount": [
          null,
          6,
          6
        ],
        "bestScore": 140
      },
      "teaches": "One echo moves from a to b while LIVE enters A: a timed relay opens two consecutive gates without two permanently stationed helpers."
    },
    {
      "levelId": "E16",
      "category": "intersecting-gates",
      "title": {
        "en": "Passing the Signal",
        "ru": "Передать сигнал"
      },
      "grid": [
        "######",
        "###.BP",
        "#a..#X",
        "#..Ab#",
        "#S.###",
        "######"
      ],
      "gateLinks": {
        "A": "a",
        "B": "b"
      },
      "reference": {
        "echo1": "ENEE",
        "echo2": null,
        "live": "NNEENEES",
        "deliveryTick": 8,
        "activeEchoes": 1,
        "takesUsed": 2,
        "score": 130
      },
      "authoringCheck": {
        "minimumEchoes": 1,
        "earliestTicksByEchoCount": [
          null,
          8,
          8
        ],
        "bestScore": 130
      },
      "teaches": "LIVE temporarily holds a for an echo to enter A. That echo escapes after A closes, occupies b, and returns the favor at B."
    },
    {
      "levelId": "E17",
      "category": "intersecting-gates",
      "title": {
        "en": "Shared Approach",
        "ru": "Общий подход"
      },
      "grid": [
        "######",
        "X#####",
        "PB####",
        "#.a#b#",
        "#..A.#",
        "#.S###"
      ],
      "gateLinks": {
        "A": "a",
        "B": "b"
      },
      "reference": {
        "echo1": "N.EEN",
        "echo2": null,
        "live": "NNW..NWN",
        "deliveryTick": 8,
        "activeEchoes": 1,
        "takesUsed": 2,
        "score": 130
      },
      "authoringCheck": {
        "minimumEchoes": 1,
        "earliestTicksByEchoCount": [
          null,
          8,
          8
        ],
        "bestScore": 130
      },
      "teaches": "LIVE and the echo share (2,4), then split into a temporary plate holder and a gate traveller; the traveller exits closed A and opens B for LIVE."
    },
    {
      "levelId": "E18",
      "category": "intersecting-gates",
      "title": {
        "en": "Replay Shift",
        "ru": "Сдвиг повтора"
      },
      "grid": [
        "######",
        "#####X",
        "#####.",
        "a#b#BP",
        "..A#.#",
        "S....."
      ],
      "gateLinks": {
        "A": "a",
        "B": "b"
      },
      "reference": {
        "echo1": "ENEN",
        "echo2": "NN",
        "live": "EEEENNENN",
        "deliveryTick": 9,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 115
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          9
        ],
        "bestScore": 115
      },
      "teaches": "Echo 1 is kept before Echo 2 exists. Adding Echo 2 changes Echo 1's blocked east command at tick 3 into a successful gate entry and allows it to hold b."
    },
    {
      "levelId": "E19",
      "category": "intersecting-gates",
      "title": {
        "en": "Wait at the Crossing",
        "ru": "Ожидание на перекрёстке"
      },
      "grid": [
        "######",
        "######",
        "####BP",
        "##a#bX",
        "##.A.#",
        "##S###"
      ],
      "gateLinks": {
        "A": "a",
        "B": "b"
      },
      "reference": {
        "echo1": "NN",
        "echo2": null,
        "live": "N.EENNES",
        "deliveryTick": 8,
        "activeEchoes": 1,
        "takesUsed": 2,
        "score": 130
      },
      "authoringCheck": {
        "minimumEchoes": 1,
        "earliestTicksByEchoCount": [
          null,
          8,
          8
        ],
        "bestScore": 130
      },
      "teaches": "The shared approach and a useful wait coordinate A; LIVE can operate adjacent plate b itself. A separate checked alternate demonstrates a legal same-edge actor crossing."
    },
    {
      "levelId": "E20",
      "category": "intersecting-gates",
      "title": {
        "en": "Opposite Dispatches",
        "ru": "Встречные отправления"
      },
      "grid": [
        "######",
        "######",
        "XBP..b",
        "###A##",
        "###.##",
        "#a.S##"
      ],
      "gateLinks": {
        "A": "a",
        "B": "b"
      },
      "reference": {
        "echo1": "WW",
        "echo2": "N.NNEE",
        "live": "N.NNW.WW",
        "deliveryTick": 8,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 120
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          8
        ],
        "bestScore": 120
      },
      "teaches": "LIVE and Echo 2 share the first gated corridor, then split in opposite directions: one collects the parcel while the other reaches b to open the exit route."
    },
    {
      "levelId": "E21",
      "category": "mastery",
      "title": {
        "en": "Three-Gate Cascade",
        "ru": "Каскад трёх ворот"
      },
      "grid": [
        "####XP",
        "####cC",
        "####.#",
        "a#b#B#",
        "..A#.#",
        "S....."
      ],
      "gateLinks": {
        "A": "a",
        "B": "b",
        "C": "c"
      },
      "reference": {
        "echo1": "ENEN",
        "echo2": "NN",
        "live": "EEEENNNNENW",
        "deliveryTick": 11,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 105
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          11
        ],
        "bestScore": 105
      },
      "teaches": "Echo 2 enables Echo 1, Echo 1 enables LIVE through B, and LIVE operates c/C itself. This reprises command divergence and closed-gate escape without a third echo."
    },
    {
      "levelId": "E22",
      "category": "mastery",
      "title": {
        "en": "Closed-Gate Return",
        "ru": "Обратный путь"
      },
      "grid": [
        "######",
        "######",
        "PX####",
        "B#a#b#",
        ".#..A#",
        "..S..."
      ],
      "gateLinks": {
        "A": "a",
        "B": "b"
      },
      "reference": {
        "echo1": "NEEN",
        "echo2": null,
        "live": "NNSSWWNNNE",
        "deliveryTick": 10,
        "activeEchoes": 1,
        "takesUsed": 2,
        "score": 120
      },
      "authoringCheck": {
        "minimumEchoes": 1,
        "earliestTicksByEchoCount": [
          null,
          10,
          7
        ],
        "bestScore": 125
      },
      "teaches": "LIVE opens A for a helper, then returns along a different route to B. The one-echo witness is elegant, but a faster two-echo solution earns a higher formula score."
    },
    {
      "levelId": "E23",
      "category": "mastery",
      "title": {
        "en": "Linked Hourglass",
        "ru": "Связанные песочные часы"
      },
      "grid": [
        "#####X",
        "####BP",
        "###C.#",
        "a#A.##",
        ".#.###",
        "..S..b"
      ],
      "gateLinks": {
        "A": "a",
        "B": "b",
        "C": "a"
      },
      "reference": {
        "echo1": "WWNN",
        "echo2": "EEE",
        "live": "N...NENENEN",
        "deliveryTick": 11,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 105
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          11
        ],
        "bestScore": 105
      },
      "teaches": "Plate a explicitly controls both distinct gates A and C; b controls B. One sustained helper therefore supports two gate cells without adding another actor or an AND rule."
    },
    {
      "levelId": "E24",
      "category": "mastery",
      "title": {
        "en": "Final Delivery",
        "ru": "Последняя доставка"
      },
      "grid": [
        "#####X",
        "####CP",
        "####c#",
        "a#A.B#",
        ".#.###",
        "..S..b"
      ],
      "gateLinks": {
        "A": "a",
        "B": "b",
        "C": "c"
      },
      "reference": {
        "echo1": "WWNN",
        "echo2": "EEE",
        "live": "N...NEENNEN",
        "deliveryTick": 11,
        "activeEchoes": 2,
        "takesUsed": 3,
        "score": 105
      },
      "authoringCheck": {
        "minimumEchoes": 2,
        "earliestTicksByEchoCount": [
          null,
          null,
          11
        ],
        "bestScore": 105
      },
      "teaches": "The finale combines two remote echo holds with a self-operated final gate. Read every sample in the full chain and deliver without a hidden third helper."
    }
  ]
}
```

### 10.4 All 72 hint steps

Keys follow `level.<ID>.hint.<tier>`. Each table is ordered H1 relationship, H2 useful position/timing, H3 partial plan. Display explicit command tokens as localized, accessible command chips; do not require a Russian player to infer English compass abbreviations without the direction legend. The hints describe the reference approach, not a forced route constraint.

#### E01 — First Echo / Первое эхо

| Tier | English | Russian |
|---|---|---|
| H1 | Plate a at (0,2) controls gate A at (3,3). Someone must occupy it before the entry tick. | Плита a в (0,2) управляет воротами A в (3,3). Кто-то должен занять её до такта входа. |
| H2 | A helper can finish on (0,2) at the end of tick 2 and stay there. The gate first opens at tick 3. | Помощник может закончить маршрут в (0,2) в конце такта 2 и остаться там. Ворота впервые откроются на такте 3. |
| H3 | For Echo 1, begin W, N and keep that helper. For LIVE, begin E, wait; inspect the sample of tick 3. | Начните маршрут Эхо 1 с W, N и сохраните помощника. Для LIVE начните с E, ожидания; проверьте начало такта 3. |

#### E02 — Hold the Line / Держать позицию

| Tier | English | Russian |
|---|---|---|
| H1 | The plate is at the end of the upper-left branch; its gate is on the route to the parcel. | Плита находится в конце верхней левой ветки, а её ворота — на пути к посылке. |
| H2 | Leave a helper on a=(0,1). Arrival at the end of tick 4 makes A available from tick 5. | Оставьте помощника на a=(0,1). Прибытие в конце такта 4 откроет A начиная с такта 5. |
| H3 | Echo 1 can begin N, N, W. LIVE can begin E followed by three waits while the helper finishes. | Эхо 1 может начать с N, N, W. LIVE может начать с E и трёх ожиданий, пока помощник заканчивает маршрут. |

#### E03 — Parcel First / Сначала посылка

| Tier | English | Russian |
|---|---|---|
| H1 | You can collect P before gate A opens. Echoes visiting P never remove the parcel. | Посылку P можно забрать до открытия ворот A. Эхо не забирают посылку, даже проходя через P. |
| H2 | Keep a helper on a=(1,1). If it arrives at tick 2, LIVE can enter A on tick 3. | Оставьте помощника на a=(1,1). Если он прибудет на такте 2, LIVE сможет войти в A на такте 3. |
| H3 | Echo 1 begins N, N. LIVE begins E, E to collect the parcel before entering the gate. | Эхо 1 начинает с N, N. LIVE начинает с E, E, чтобы забрать посылку перед входом в ворота. |

#### E04 — Shared Pavement / Общая дорожка

| Tier | English | Russian |
|---|---|---|
| H1 | The parcel and useful plate are on the right branch; the exit is above the start. Actors may share the branch. | Посылка и нужная плита находятся справа, а выход — над стартом. Актёры могут идти по одной ветке. |
| H2 | A helper can stay on a=(4,3). LIVE must collect P=(3,4), then return toward the upper gate. | Помощник может остаться на a=(4,3). LIVE нужно забрать P=(3,4), затем вернуться к верхним воротам. |
| H3 | Echo 1 begins E, E, E. LIVE begins E, E, W, W; overlap with the helper is harmless. | Эхо 1 начинает с E, E, E. LIVE начинает с E, E, W, W; пересечение с помощником безопасно. |

#### E05 — A Passing Signal / Мимолётный сигнал

| Tier | English | Russian |
|---|---|---|
| H1 | Gate A needs its plate at the entry tick, not forever. Closing around an occupant still permits leaving. | Плита нужна воротам A на такте входа, а не навсегда. Закрывшиеся вокруг актёра ворота не мешают выйти. |
| H2 | Occupy a=(1,5) at the end of tick 2. A is open during tick 3 even if the helper leaves during that tick. | Займите a=(1,5) в конце такта 2. A будут открыты на такте 3, даже если помощник в этот такт уйдёт. |
| H3 | Try Echo 1 starting S, S, N and LIVE starting E, wait, E. Inspect LIVE leaving A on tick 4. | Попробуйте начать Эхо 1 с S, S, N, а LIVE — с E, ожидания, E. Посмотрите, как LIVE выходит из A на такте 4. |

#### E06 — Return Post / Обратная доставка

| Tier | English | Russian |
|---|---|---|
| H1 | The parcel lies beyond A, but the exit is beside the start. The same gate is needed in both directions. | Посылка находится за A, а выход — рядом со стартом. Через одни ворота нужно пройти в обе стороны. |
| H2 | A helper finishing at a=(4,5) keeps A available for the return trip as well as the outward trip. | Помощник, завершивший маршрут на a=(4,5), удержит A открытыми и для пути туда, и для возвращения. |
| H3 | Echo 1 begins E, E, S. LIVE can wait four ticks, then begin N, N toward the parcel branch. | Эхо 1 начинает с E, E, S. LIVE может подождать четыре такта, затем начать с N, N к ветке с посылкой. |

#### E07 — Two Corners / Два угла

| Tier | English | Russian |
|---|---|---|
| H1 | Gate A uses the bottom-left plate; gate B uses the bottom-right plate. One travelling helper is too slow for both. | Ворота A связаны с нижней левой плитой, а B — с нижней правой. Один перемещающийся помощник не успеет обслужить обе. |
| H2 | Leave one echo on a=(0,5) and another on b=(5,5). LIVE can wait at (2,3) before A. | Оставьте одно эхо на a=(0,5), а другое на b=(5,5). LIVE может подождать в (2,3) перед A. |
| H3 | Begin Echo 1 with W, W and Echo 2 with E, E, E. LIVE begins N, wait, wait before entering A. | Начните Эхо 1 с W, W, а Эхо 2 — с E, E, E. LIVE начинает с N и двух ожиданий перед входом в A. |

#### E08 — Split Shift / Разделённая смена

| Tier | English | Russian |
|---|---|---|
| H1 | Both lower branches have a plate. The final route passes A first and B second. | На обеих нижних ветках есть плита. Финальный маршрут сначала проходит через A, затем через B. |
| H2 | The two helpers can reach a=(0,5) and b=(4,5) at the end of tick 4. Both gates then open on tick 5. | Оба помощника могут достичь a=(0,5) и b=(4,5) в конце такта 4. Обе пары ворот откроются на такте 5. |
| H3 | Echo 1 begins W, W, S; Echo 2 begins E, E, S. LIVE can wait four ticks, then move north. | Эхо 1 начинает с W, W, S; Эхо 2 — с E, E, S. LIVE может подождать четыре такта, затем пойти на север. |

#### E09 — Open the Way / Открыть дорогу

| Tier | English | Russian |
|---|---|---|
| H1 | Plate b lies beyond gate A. First make a helper that opens A so the second helper can reach b. | Плита b находится за воротами A. Сначала создайте помощника, открывающего A, чтобы второй дошёл до b. |
| H2 | Echo 1 can hold a=(2,5). Echo 2 can finish on b=(0,0), opening B from tick 7. | Эхо 1 может удерживать a=(2,5). Эхо 2 может закончить на b=(0,0), открыв B начиная с такта 7. |
| H3 | Keep Echo 1 from E, E. Echo 2 and LIVE both begin N, wait, N, N, then split upward and eastward. | Сохраните Эхо 1 из E, E. Эхо 2 и LIVE начинают одинаково: N, ожидание, N, N, а затем расходятся вверх и на восток. |

#### E10 — One Tick Later / На такт позже

| Tier | English | Russian |
|---|---|---|
| H1 | A opens the approach to plate b. Reaching b during a movement does not open B for that same movement. | A открывают путь к плите b. Прибытие на b во время движения не открывает B для этого же движения. |
| H2 | Hold a=(5,4) with Echo 1. Echo 2 reaches b=(1,2) at the end of tick 5; B first opens on tick 6. | Удерживайте a=(5,4) с помощью Эхо 1. Эхо 2 достигает b=(1,2) в конце такта 5; B впервые откроются на такте 6. |
| H3 | Echo 2 begins N, wait, N, W. LIVE begins N, wait, N, N and needs one more wait before B. | Эхо 2 начинает с N, ожидания, N, W. LIVE начинает с N, ожидания, N, N; перед B потребуется ещё одно ожидание. |

#### E11 — The Long Helper / Дальний помощник

| Tier | English | Russian |
|---|---|---|
| H1 | The second helper's path is longer than LIVE's approach to B. The safe answer is waiting, not an extra echo. | Путь второго помощника длиннее, чем подход LIVE к B. Нужное решение — ожидание, а не дополнительное эхо. |
| H2 | Echo 1 holds a=(4,1). Echo 2 can reach b=(4,4) at tick 8. Wait with LIVE at (1,4) for B to open on tick 9. | Эхо 1 удерживает a=(4,1). Эхо 2 может дойти до b=(4,4) на такте 8. Подождите с LIVE в (1,4), пока B откроются на такте 9. |
| H3 | Echo 2 begins S, wait, wait, S, E. LIVE begins S, wait, wait, S, S before waiting by B. | Эхо 2 начинает с S, ожидания, ожидания, S, E. LIVE начинает с S, ожидания, ожидания, S, S, затем ждёт возле B. |

#### E12 — Cross Dock / Перегрузочный узел

| Tier | English | Russian |
|---|---|---|
| H1 | Echo 2 and LIVE can share the gate approach, then split toward the second plate and the parcel. | Эхо 2 и LIVE могут вместе пройти к воротам, затем разойтись к второй плите и посылке. |
| H2 | Keep Echo 1 on a=(0,2), and end Echo 2 on b=(5,3). LIVE turns north from (4,2) toward P. | Оставьте Эхо 1 на a=(0,2), а Эхо 2 завершите на b=(5,3). LIVE поворачивает на север из (4,2) к P. |
| H3 | After Echo 1 begins W, W, both other routes can begin wait, wait, E, E. Their next directions should differ. | После начала Эхо 1 с W, W оба остальных маршрута могут начаться с ожидания, ожидания, E, E. Следующие направления должны различаться. |

#### E13 — The Full Round / Полный круг

| Tier | English | Russian |
|---|---|---|
| H1 | The parcel route must return through both gates. Keep the helpers in place; visiting X without P does not finish the level. | С посылкой нужно вернуться через обе пары ворот. Оставьте помощников на местах; посещение X без P не завершает уровень. |
| H2 | Hold a=(0,4) and b=(3,2). The complete live round can fit exactly into 12 ticks. | Удерживайте a=(0,4) и b=(3,2). Полный маршрут LIVE может уложиться ровно в 12 тактов. |
| H3 | Echo 2 begins N, wait, N, E. LIVE begins N, wait, N, N, N, E to reach the parcel before turning back. | Эхо 2 начинает с N, ожидания, N, E. LIVE начинает с N, ожидания, N, N, N, E, чтобы дойти до посылки перед возвращением. |

#### E14 — Parallel Appointment / Параллельная встреча

| Tier | English | Russian |
|---|---|---|
| H1 | The parcel can be collected immediately, but A and B still need separate distant helpers. | Посылку можно забрать сразу, но для A и B всё равно нужны отдельные помощники на удалённых плитах. |
| H2 | Echo 1 reaches a=(0,5) at tick 4; Echo 2 reaches b=(5,5) at tick 5. Wait with LIVE on P=(2,2). | Эхо 1 достигает a=(0,5) на такте 4, а Эхо 2 — b=(5,5) на такте 5. Подождите с LIVE на P=(2,2). |
| H3 | Echo 1 begins W, W, S; Echo 2 begins E, E, E, S. LIVE begins N followed by three waits. | Эхо 1 начинает с W, W, S; Эхо 2 — с E, E, E, S. LIVE начинает с N и трёх ожиданий. |

#### E15 — Relay Junction / Релейный перекрёсток

| Tier | English | Russian |
|---|---|---|
| H1 | A and B do not need to stay open together. One helper can relay from a=(1,1) to b=(2,1). | A и B не обязательно держать открытыми одновременно. Один помощник может перейти с a=(1,1) на b=(2,1). |
| H2 | Reach a at the end of tick 2, then move onto b during tick 3. A stays open during tick 3; B opens at the start of tick 4. | Достигните a в конце такта 2, затем перейдите на b во время такта 3. A останутся открыты на такте 3; B откроются в начале такта 4. |
| H3 | Try Echo 1 starting N, N, E. LIVE can begin with a wait, then move east toward A. | Попробуйте начать Эхо 1 с N, N, E. LIVE может начать с ожидания, затем двигаться на восток к A. |

#### E16 — Passing the Signal / Передать сигнал

| Tier | English | Russian |
|---|---|---|
| H1 | LIVE can help an echo first. Hold a briefly so the echo can enter A and reach the plate for B. | Сначала LIVE может помочь эхо. Ненадолго займите a, чтобы эхо вошло в A и достигло плиты для B. |
| H2 | LIVE can reach a=(1,2) at tick 2. The echo enters A=(3,3) on tick 3 and leaves it for b=(4,3) on tick 4, even though A closes. | LIVE может достичь a=(1,2) на такте 2. Эхо входит в A=(3,3) на такте 3 и выходит к b=(4,3) на такте 4, хотя A закрываются. |
| H3 | Echo 1 begins E, N, E. LIVE begins N, N, E, E before turning toward B. | Эхо 1 начинает с E, N, E. LIVE начинает с N, N, E, E, затем поворачивает к B. |

#### E17 — Shared Approach / Общий подход

| Tier | English | Russian |
|---|---|---|
| H1 | Share the approach at (2,4), then split roles: LIVE opens A for the helper; the helper opens B for LIVE. | Вместе пройдите через (2,4), затем разделите роли: LIVE открывает A для помощника, а помощник — B для LIVE. |
| H2 | LIVE can stand on a=(2,3) at the end of tick 2. The helper reaches b=(4,3) at tick 5, so LIVE can enter B at tick 6. | LIVE может стоять на a=(2,3) в конце такта 2. Помощник достигает b=(4,3) на такте 5, поэтому LIVE сможет войти в B на такте 6. |
| H3 | Echo 1 begins N, wait, E. LIVE begins N, N, W, then waits at (1,3) for the second signal. | Эхо 1 начинает с N, ожидания, E. LIVE начинает с N, N, W, затем ждёт в (1,3) второго сигнала. |

#### E18 — Replay Shift / Сдвиг повтора

| Tier | English | Russian |
|---|---|---|
| H1 | A stored route can become useful after another actor opens its gate. Echo 1's commands need not preserve its earlier blocked positions. | Сохранённый маршрут может стать полезным, когда другой актёр откроет ворота. Команды Эхо 1 не обязаны повторять прежние заблокированные позиции. |
| H2 | Keep Echo 2 on a=(0,3). Then Echo 1 can enter A=(2,4) on tick 3 and reach b=(2,3) on tick 4. | Оставьте Эхо 2 на a=(0,3). Тогда Эхо 1 сможет войти в A=(2,4) на такте 3 и достичь b=(2,3) на такте 4. |
| H3 | Echo 1 can begin E, N, E, N, even when its first preview is blocked. Echo 2 begins N, N; compare Echo 1 at tick 3 with and without that helper. | Эхо 1 может начать с E, N, E, N, даже если первый предпросмотр показывает блокировку. Эхо 2 начинает с N, N; сравните Эхо 1 на такте 3 с этим помощником и без него. |

#### E19 — Wait at the Crossing / Ожидание на перекрёстке

| Tier | English | Russian |
|---|---|---|
| H1 | An echo can hold a while LIVE later operates b itself. Sharing or crossing the approach does not cause a collision. | Эхо может удерживать a, а LIVE позже сам задействует b. Общая дорожка и пересечение маршрутов не вызывают столкновения. |
| H2 | Hold a=(2,3) from the end of tick 2. LIVE can stand on b=(4,3) at tick 5 and enter the adjacent B=(4,2) on tick 6. | Удерживайте a=(2,3) с конца такта 2. LIVE может встать на b=(4,3) на такте 5 и войти в соседние B=(4,2) на такте 6. |
| H3 | Echo 1 begins N, N. LIVE begins N, wait, E, E before turning north toward b. | Эхо 1 начинает с N, N. LIVE начинает с N, ожидания, E, E, затем поворачивает на север к b. |

#### E20 — Opposite Dispatches / Встречные отправления

| Tier | English | Russian |
|---|---|---|
| H1 | Echo 2 and LIVE share A's corridor, but their jobs lie on opposite sides of the upper junction. | Эхо 2 и LIVE вместе проходят коридор A, но их задачи находятся по разные стороны верхнего перекрёстка. |
| H2 | Echo 1 holds a=(1,5). Echo 2 reaches b=(5,2) at tick 6. LIVE can wait with the parcel at (2,2), then enter B on tick 7. | Эхо 1 удерживает a=(1,5). Эхо 2 достигает b=(5,2) на такте 6. LIVE может подождать с посылкой в (2,2), затем войти в B на такте 7. |
| H3 | Keep Echo 1 from W, W. Echo 2 and LIVE both begin N, wait, N, N, then choose opposite horizontal directions. | Сохраните Эхо 1 из W, W. Эхо 2 и LIVE начинают с N, ожидания, N, N, затем выбирают противоположные горизонтальные направления. |

#### E21 — Three-Gate Cascade / Каскад трёх ворот

| Tier | English | Russian |
|---|---|---|
| H1 | Read the chain a→A→b→B→c→C. Three plates do not mean three echoes: LIVE can operate the last one. | Проследите цепочку a→A→b→B→c→C. Три плиты не означают три эхо: последнюю может задействовать LIVE. |
| H2 | Echo 2 holds a=(0,3), Echo 1 holds b=(2,3), and LIVE reaches c=(4,1) at tick 8 to open adjacent C on tick 9. | Эхо 2 удерживает a=(0,3), Эхо 1 — b=(2,3), а LIVE достигает c=(4,1) на такте 8, чтобы открыть соседние C на такте 9. |
| H3 | Echo 1 begins E, N, E; Echo 2 begins N, N. LIVE can begin E, E, E, E, then follow the upward gate chain. | Эхо 1 начинает с E, N, E; Эхо 2 — с N, N. LIVE может начать с E, E, E, E, затем пройти цепочку ворот вверх. |

#### E22 — Closed-Gate Return / Обратный путь

| Tier | English | Russian |
|---|---|---|
| H1 | LIVE can open A for a helper and return to the other branch while that helper keeps B open. A second echo is optional, not forbidden. | LIVE может открыть A для помощника и вернуться на другую ветку, пока помощник удерживает B. Второе эхо необязательно, но не запрещено. |
| H2 | For a one-echo approach, LIVE stands on a=(2,3) at tick 2. The helper reaches b=(4,3) at tick 4; LIVE returns to the left branch toward P. | Для решения с одним эхо LIVE стоит на a=(2,3) на такте 2. Помощник достигает b=(4,3) на такте 4; LIVE возвращается на левую ветку к P. |
| H3 | Echo 1 begins N, E, E. LIVE begins N, N, S, S before moving west along the bottom corridor. | Эхо 1 начинает с N, E, E. LIVE начинает с N, N, S, S, затем идёт на запад по нижнему коридору. |

#### E23 — Linked Hourglass / Связанные песочные часы

| Tier | English | Russian |
|---|---|---|
| H1 | Read the explicit links: a controls both A and C, while b controls B. The gates have distinct IDs even when they share a plate. | Проверьте связи: a управляет и A, и C, а b — воротами B. У ворот разные обозначения, даже если плита общая. |
| H2 | Hold a=(0,3) and b=(5,5). The first helper reaches a at tick 4, opening both A and C from tick 5. | Удерживайте a=(0,3) и b=(5,5). Первый помощник достигает a на такте 4, открывая A и C начиная с такта 5. |
| H3 | Echo 1 begins W, W, N; Echo 2 begins E, E, E. LIVE begins N, wait, wait, wait, then alternates north and east through the staircase. | Эхо 1 начинает с W, W, N; Эхо 2 — с E, E, E. LIVE начинает с N и трёх ожиданий, затем чередует север и восток на ступенчатом пути. |

#### E24 — Final Delivery / Последняя доставка

| Tier | English | Russian |
|---|---|---|
| H1 | A and B need the remote helpers. The final c→C step can be handled by LIVE itself after those gates. | Для A и B нужны удалённые помощники. Финальный шаг c→C может выполнить сам LIVE, пройдя эти ворота. |
| H2 | Hold a=(0,3) and b=(5,5). LIVE can reach c=(4,2) at tick 8, then enter C=(4,1) on tick 9. | Удерживайте a=(0,3) и b=(5,5). LIVE может достичь c=(4,2) на такте 8, затем войти в C=(4,1) на такте 9. |
| H3 | Use helpers beginning W, W, N and E, E, E. LIVE begins N, wait, wait, wait, N, E, E before the final upward chain. | Используйте помощников с началами W, W, N и E, E, E. LIVE начинает с N, трёх ожиданий, N, E, E, затем проходит финальную цепочку вверх. |

### 10.5 Authoring verification and golden interactions

The final 24 candidate maps were checked during documentation authoring with a temporary, independent-of-the-future-app mathematical checker:

- All maps are 6×6 with one distinct start/parcel/exit, unique plate/gate IDs, valid links, and command lengths at most 12.
- Every reference witness delivered with the listed tick, echo count, and score.
- Every final reference was evaluated 100 times and compared for identical traces: **2,400 reference evaluations**.
- A second coordinate-based audit reconstructed all 24 final traces independently and matched positions, commands, gate snapshots, blocked moves, pickups, and outcomes against the original checker. The JSON embedded in this document was also checked against the final authored manifest.
- Bounded breadth-first search was run for each level with 0, 1, and 2 helpers: **72 bounded searches**. It established the listed minimum helper counts and earliest delivery ticks under the stated rules.
- All eight E07–E14 levels require two echoes within the twelve-tick limit.
- Twelve additional arithmetic/rule/content checks passed, covering next-tick sampling, release/closed-gate behavior, echo/parcel behavior, command divergence, a same-edge crossing, the E22 score tradeoff, duplicate IDs, unknown commands, and excessive command length.

Search state was `(live position, helper positions, parcel-carried)` with simultaneous legal moves, a twelve-tick bound, and plate snapshots before movement. Helper identities may be treated symmetrically for reachability because their physical abilities are identical. A state reached earlier dominates the same state reached later: all actors can wait. Unknown/blocked directions are not extra search powers; legal waits represent the same stationary outcome. Because any nonempty valid command plan can be kept, a discovered helper schedule is storable even if its historical solo preview would have been blocked.

These are **documentation-level mechanical checks**, not a production engine certificate, formal proof of the checker implementation, client/server parity result, human difficulty assessment, or playtest. The implementation must reproduce them with its actual rules package and an independently checked solver, record fixture/content/rules hashes, and investigate every mismatch before release.

**Golden interaction A — E05, release and closed-gate escape**

Echo 1=`SSN`; LIVE=`E.ENENE`. Unshown echo commands are implicit waits.

| End of tick | Sampled A state for this tick | LIVE position | Echo 1 position | Observation |
|---:|---|---|---|---|
| 0 | Not yet sampled | (1,3) | (1,3) | Initial state |
| 1 | Closed | (2,3) | (1,4) | Both actors move |
| 2 | Closed | (2,3) | (1,5) | Echo arrives on a; A did not open halfway through tick 2 |
| 3 | Open | (3,3) | (1,4) | Echo leaves a while LIVE enters A; sampled opening still applies |
| 4 | Closed | (3,2) | (1,4) | LIVE legally leaves the now-closed A cell |
| 5 | Closed | (4,2) | (1,4) | Continue toward parcel |
| 6 | Closed | (4,1) | (1,4) | LIVE collects P after movement |
| 7 | Closed | (5,1) | (1,4) | Delivery, one echo, 135 points |

Variant LIVE=`E.E.NENE` waits inside closed A on tick 4 and delivers on tick 8. Variant LIVE=`E.EENENE` attempts a wall-blocked east exit on tick 4, stays safely inside A, then delivers on tick 8. Neither case crushes or resets the courier.

**Golden interaction B — E18, commands versus historical positions**

Keep Echo 1=`ENEN` and compare the same final LIVE=`EEEENNENN` with and without Echo 2=`NN`:

| Tick | Echo 1 without Echo 2 | Echo 1 with Echo 2 | Reason |
|---:|---|---|---|
| 1 | (1,5) | (1,5) | Same east command |
| 2 | (1,4) | (1,4) | Same north command; Echo 2 reaches a at end of tick 2 when present |
| 3 | (1,4), east blocked | (2,4), enters A | Current sampled gate state differs |
| 4 | (1,4), north blocked by wall | (2,3), reaches b | Commands are consumed from actual positions, not retried or snapped to history |

With Echo 2 present, b first opens B on tick 5 and the listed live route delivers on tick 9. Without it, that final configuration does not deliver. The route can also begin changing while the future helper is being planned as LIVE, because LIVE activates plates too; the comparison above deliberately fixes the final live route to isolate the stored-echo difference.

**Golden interaction C — E19, same-edge crossing**

Alternative Echo 1=`N.N`, LIVE=`NNSEENNES`: at tick 3, LIVE moves `(2,3)→(2,4)` while Echo 1 moves `(2,4)→(2,3)`. The swap is legal, and plate a remains sampled occupied across the hand-off. Delivery is tick 9, one echo, **125 points**. The primary reference is faster at tick 8/130 points; this alternate is teaching/test evidence, not a new required solution.

**Golden interaction D — E22, score tradeoff**

Primary reference: Echo 1=`NEEN`, LIVE=`NNSSWWNNNE`, tick 10, one echo, **120 points**.

Faster alternate: Echo 1=`NN`, Echo 2=`NEEN`, LIVE=`.WWNNNE`, tick 7, two echoes, **125 points**. Three saved ticks add 15 points; the extra helper removes 10 efficiency points, producing a net improvement of 5. This is why the game must evaluate the exact formula rather than always prefer the minimum-echo solution.

**Golden interaction E — E23, one plate controlling two distinct gates**

`gateLinks` is exactly `{"A":"a","B":"b","C":"a"}`. There is no duplicate `A` tile and no separate c plate. Occupying a opens both A and C at the next sample; occupying b opens B. Gate IDs remain individually inspectable. This is a shared controller, not AND logic or a third helper.

**Canonical reference fingerprints**

These are documentation-check fingerprints under the exact §12.4/§12.6 formats, using each listed reference plan and `assistance={"tier":"standard","highestHint":0}`. They are not production certificates. Study use changes the assistance fields and therefore the replay hash, while geometry and physical outcomes remain unchanged. Alternative valid solutions are not required to match an author's hash.

| Level | `contentHash` | Standard-reference `terminalReplayHash` |
|---|---|---|
| E01 | `969b70f86174cc9f848db763d47a81345e5315d1711067c556a7d7b6999d1740` | `6bf86839aff4b5527cd5384c18d49be1f357f4348b007a5fabc4914db9d860f4` |
| E02 | `c612e5c98bed758b26faeb56e11c18f1485f437edbb2d78261e2d767f309dda3` | `69f37a097d78e8d5ebf8c396bc3bfc54c06c2dc13fa3f366b151fa9bf73cbc6a` |
| E03 | `b87c4eb9c010bad23e5a5b35bc4969e943939fa1369bcaad1e9a76ffa3b60b2e` | `15f3372c5ec8d13ef093a0ebb94a112c2b665159915eaaf42e815a67c8bb4f4a` |
| E04 | `b5a73511eac3c0b1197675c915e995dc7b48403f39df0d49077c27011c802a64` | `2ecb6e4cb0bb2fd14ebfcbe65108987241f6e67e5bbdb0f39050a4a46e8d79d0` |
| E05 | `4680ceb35412a8683894165ca55b16b803ffb96b6cc1ddea5c9431481fbde377` | `8c34806b799874111187d09f13d055b1e36603489cb25e9d82d3151f305e1460` |
| E06 | `a25c9dd109b6dc5df5747e9f1dabb891cca4a2c2671d6813b501baf09dd47dc8` | `35ccb70efab7bb1bfeddcf5475c45c3bf977c63a63d80943f41d3b4d232cc083` |
| E07 | `cc8d318b89f3cd8d1336d7b49d549146bf06251051bde59f6430d01bee1daf7f` | `b7d4645c4bf597d3580fe8cf11cfa9578b9f8bc35af6547c49335d89c73ec20e` |
| E08 | `934bab7c570df8229445a3f9036932f2b7aec8471eda00f3e37d875070f8d0bc` | `dcb95ddd9227427c3e67ee6081504eca62c4842bc851934d20f821fe694d37b3` |
| E09 | `66fa65f5373e4bf2d1d7e1a68b2019fe782d92f72d34f6f2f35c80bc968c4657` | `b42e75d3a0f8ca24f915b74f9d5898b05d168fbe0ea1ffde251aba1e6e32f703` |
| E10 | `877f9200e27385dcfd772924177afbbf336157777df610ec8eac9e6c04217942` | `a8d0010306bfb804fb1a8d3744324bd97b24362c001d47d879e3158ff6679329` |
| E11 | `b3a402a39e755f30f88a26b8ae92ac90dd3acc325061d7c9c2faf935f363a52a` | `5d69b709075497975a039a9beb2e09d3b5fb7f3e0f7d3477141a0292519ead93` |
| E12 | `078ef2123a8be05f0ca11fc9a8899f033738cd4dce7a5103ca17be528d36c424` | `a84a2697cfe6370d7d949367b2d75c90d96e1034a37043a46ad08fcf0c1ebd8a` |
| E13 | `1355d8e98723e066dc3efa43f3f654ed3d044604686821ad22d5ca407f8ec81d` | `4f6cca1d43a56e4ce0404f9ef4744a75652d699d7600650fcf691e2f3357d0c5` |
| E14 | `f413b296d758f135f4f14aec43eeb570e0dfe088a25d62df3cb98533f032c77a` | `50d7d677ddc0994524d1e92d2d5ad5907c6cc52b9961ed5edff8b6f78974ace2` |
| E15 | `ced222db07bafc388043ce13c09fcf026b20eb507b74124366771592c5d22fc7` | `debe1bea8d42722709c1c7b11912664c2af65fc6ae5555eb04226a195332ab1b` |
| E16 | `6c5849e34b062098f317c6f3f3554111b5e13acfbab1d1007b6118e692adea70` | `735e3fd7eaf1bc5fc5d1c9961b78c2d3056b1a702bec4b967bfdd2127c37fe07` |
| E17 | `e74b452feb757af12394919df1da2ecf7d7f90a412f40d3b93cfe87d8260926d` | `1e982d32ded05adf06330f82ac358a0b3cc38584432e441022394c773fdaa277` |
| E18 | `7594672143c25a608d7fa0fce4b40982a2e96c354664d96b25573e003c488c0a` | `ec04d83e3c9e6db271650c8e06a82edaac52243edcfa2976abd65df1b3898452` |
| E19 | `abfce0031efacc90a569cc36399cf51cd3cdda65ac26cb0e78231d99869d1167` | `43c9212fc592a49d4ad9fa5241805c62e3705dd0db3b898bb40c65e2f24a3ffa` |
| E20 | `aeb6eaff3fc462d999f66e527f91acbf74c18729fcffdb6db897668c5a8240d5` | `7800ed70942cbf8c69d118ec561880ffd9a2a11ab4a2262bd6b3004ad5bb9b7f` |
| E21 | `5a4fcf7d4b7c16aac9e96cdeca6a897260bbe6aa886e47dbe87a1911d3b75f8e` | `992b365c1e5a411601fbf95e1d0e96a58d7a34724efe516fd3f40bc3fb491eed` |
| E22 | `b051be176056a4ea1796dfd917393d6635e93a4c542c2cb8250ba84ff1fe9138` | `4f9b876bdbd44e6c9ed0b5473aa5cc20a9946dc4117a3daf5a0a3face77cebcd` |
| E23 | `92761b7a79cd8b56693082a343d42ff81fd08306e1c820eefb64e54d930f2443` | `a226fd4022d3ed839d5a2e6bac4ad857d135e0da0e79025bd1cd8a1b4b282ad7` |
| E24 | `8981842e874f47721c5d09a3163214ea3588c2bcf67c6e9c094c0aca46de84b3` | `6683f517288466f9132fda2df9d0b4f8e0eff88cbdb78973528a993a3581d36e` |

### 10.6 Full-solution presentation template

The Study screen is generated from each level's exact `reference` record; no further solution-writing task is left implicit.

1. Show `Start from an empty plan` / `Начните с пустого плана`.
2. Show Echo 1's numbered authored commands, converted to localized direction names; explain `Keep as Echo 1` / `Сохраните как Эхо 1`.
3. If present, show Echo 2's commands; explain `Keep as Echo 2. Echo 1 stays unchanged.` / `Сохраните как Эхо 2. Эхо 1 остаётся без изменений.`
4. Show the live command ribbon with explicit waits distinguished from automatic tail waits.
5. Show `Run. Delivery occurs on tick {tick}.` / `Запустите. Доставка произойдёт на такте {tick}.`
6. Allow per-actor path inspection and tick stepping using the real evaluator.
7. Keep the Study badge and `This attempt is not ranked` visible. An Apply action writes the whole reference configuration atomically and remains Study.

The reference solutions may deliberately leave a helper after a brief useful plate activation or traverse a cell more than once. Do not “simplify” their command arrays, erase explicit waits, or auto-trim a route without revalidating its behavior.

## 11. Localization and copy inventory

### 11.1 Localization policy

Ship English and Russian completely. The following text is production draft copy, not proof of human translation review. A fluent human review of both interfaces and all 72 hints is a release gate.

Priority: saved explicit language choice → validated Telegram language code (`ru*` selects Russian, otherwise English) → English. In browser development/practice mode, browser language may supply the initial default. Changing language updates text in place without resetting commands, echoes, preview frame, assistance, version pins, selected cosmetic, or progress.

Use message IDs and parameterized complete sentences. Do not concatenate English/Russian fragments to build messages. Use `Intl.NumberFormat` and proper plural rules/ICU-compatible formatting; do not infer Russian plural endings from a single `count === 1` condition.

Coordinates are always zero-based when displayed. Gate/plate identifiers remain Latin `A/B/C` and `a/b/c` in both languages. The on-token `LIVE` badge stays literal for identity consistency; the legend and accessible description explain it in the chosen language.

### 11.2 Terminology

| Concept | English | Russian | Usage rule |
|---|---|---|---|
| Product | Echo Courier | Эхо-курьер | Proper name |
| Live actor | Live courier | Текущий курьер | `LIVE` badge on the board |
| Stored actor | Echo | Эхо | Indeclinable noun in Russian |
| Pressure plate | Plate | Плита | Do not alternate with button/platform for the same mechanic |
| Gate | Gate | Ворота | Whole-cell gate, not a board edge |
| Parcel | Parcel | Посылка | Not a collectible currency |
| Exit | Exit | Выход | Needs carried parcel for delivery |
| Tick | Tick | Такт | Never a real-time second |
| Take | Take | Прогон | One planned route/execution; distinguish from attempt |
| Attempt | Attempt | Попытка | Sticky assistance/session scope |
| Preview | Preview | Предпросмотр | No completion/echo commit |
| Keep echo | Keep this echo | Сохранить эхо | Stores commands and resets current plan |
| Assisted | Assisted | С подсказкой | Separate competitive bracket |
| Study | Study | Изучение | Full solution, no rank for this attempt |
| Points | Points | Очки | Not Telegram Stars |
| Stars | Telegram Stars | Telegram Stars | Platform payment unit, no conversion claim |

### 11.3 Core UI strings

| Key | English | Russian |
|---|---|---|
| `game.hook` | Deliver a parcel with help from your earlier routes. | Доставьте посылку с помощью своих прошлых маршрутов. |
| `nav.start` | Start | Начать |
| `nav.continue` | Continue | Продолжить |
| `nav.levels` | Choose a level | Выбрать уровень |
| `nav.next` | Next level | Следующий уровень |
| `nav.back` | Back | Назад |
| `nav.exit` | Exit game | Выйти из игры |
| `nav.settings` | Settings | Настройки |
| `nav.credits` | Credits and licenses | Авторы и лицензии |
| `nav.profile` | Profile | Профиль |
| `nav.support` | Support | Поддержка |
| `nav.privacy` | Privacy | Конфиденциальность |
| `common.cancel` | Cancel | Отмена |
| `common.confirm` | Confirm | Подтвердить |
| `common.close` | Close | Закрыть |
| `common.retry` | Retry | Повторить |
| `common.copy` | Copy | Скопировать |
| `common.copied` | Copied | Скопировано |
| `common.free` | Free | Бесплатно |
| `common.unavailable` | Unavailable | Недоступно |
| `board.objective` | Collect the parcel, then reach the exit. | Заберите посылку, затем дойдите до выхода. |
| `board.start` | Start | Старт |
| `board.parcel` | Parcel | Посылка |
| `board.exit` | Exit | Выход |
| `board.wall` | Wall | Стена |
| `board.floor` | Floor | Пол |
| `board.plate` | Plate {id} | Плита {id} |
| `board.gate` | Gate {id} | Ворота {id} |
| `board.coordinate` | Column {x}, row {y} | Столбец {x}, строка {y} |
| `board.open` | Open this tick | Открыты на этом такте |
| `board.closed` | Closed this tick | Закрыты на этом такте |
| `board.nextOpen` | Opens next tick | Откроются на следующем такте |
| `board.nextClosed` | Closes next tick | Закроются на следующем такте |
| `board.controlledBy` | Controlled by plate {id} | Управляются плитой {id} |
| `board.occupants` | Occupants | Актёры в клетке |
| `board.noOccupants` | No actors in this cell | В этой клетке нет актёров |
| `board.cellList` | Board cell list | Список клеток поля |
| `actor.live` | Live courier (LIVE) | Текущий курьер (LIVE) |
| `actor.echo` | Echo {n} | Эхо {n} |
| `actor.changed` | Echo {n}'s route changed. | Маршрут Эхо {n} изменился. |
| `actor.firstDifference` | First change at tick {tick} | Первое изменение на такте {tick} |
| `actor.carrying` | Carrying the parcel | Несёт посылку |
| `command.north` | North | На север |
| `command.east` | East | На восток |
| `command.south` | South | На юг |
| `command.west` | West | На запад |
| `command.wait` | Wait | Ожидание |
| `command.slot` | Command {n} | Команда {n} |
| `command.automaticWait` | Automatic wait | Автоматическое ожидание |
| `command.authoredCount` | Commands: {count}/12 | Команды: {count}/12 |
| `command.addNext` | Add the next command first. | Сначала добавьте следующую команду. |
| `command.insertBefore` | Insert before | Вставить перед |
| `command.replace` | Replace command | Заменить команду |
| `command.delete` | Delete command | Удалить команду |
| `command.clear` | Clear live plan | Очистить текущий план |
| `command.undo` | Undo | Отменить действие |
| `command.redo` | Redo | Повторить действие |
| `command.emptyReason` | Add at least one command. | Добавьте хотя бы одну команду. |
| `command.fullReason` | All 12 commands are filled. Replace or remove one. | Все 12 команд заполнены. Замените или удалите одну. |
| `preview.title` | Preview | Предпросмотр |
| `preview.play` | Play preview | Воспроизвести предпросмотр |
| `preview.pause` | Pause | Пауза |
| `preview.previous` | Previous tick | Предыдущий такт |
| `preview.next` | Next tick | Следующий такт |
| `preview.rewind` | Back to tick 0 | Вернуться к такту 0 |
| `preview.edit` | Edit plan | Изменить план |
| `preview.tick` | Tick {n} of {limit} | Такт {n} из {limit} |
| `preview.endTick` | End of tick {n} | Конец такта {n} |
| `preview.sample` | Plate sample | Проверка плит |
| `preview.move` | Simultaneous move | Одновременное движение |
| `preview.resolve` | Parcel and exit | Посылка и выход |
| `preview.noGrant` | Preview only — no completion recorded | Только предпросмотр — прохождение не записано |
| `preview.notExecuted` | Not executed after delivery | Не выполняется после доставки |
| `run.action` | Run delivery | Запустить доставку |
| `run.notDelivered` | Not delivered yet. Your plan is still here. | Пока не доставлено. Ваш план сохранён в редакторе. |
| `run.blocked` | Command {n} was blocked. Inspect this tick. | Команда {n} была заблокирована. Проверьте этот такт. |
| `run.noParcel` | The live courier has not collected the parcel. | Текущий курьер ещё не забрал посылку. |
| `run.noExit` | The parcel has not reached the exit. | Посылка ещё не достигла выхода. |
| `run.restart` | Restart level | Начать уровень заново |
| `run.restartConfirm` | Clear both echoes and the live plan? Assistance stays on this attempt. | Удалить оба эхо и текущий план? Подсказки останутся учтены в этой попытке. |
| `run.newAttempt` | Start a new attempt | Начать новую попытку |
| `echo.keep` | Keep this echo | Сохранить эхо |
| `echo.empty` | No echo yet | Эхо пока нет |
| `echo.inspect` | Inspect route | Просмотреть маршрут |
| `echo.replaceChoice` | Choose an echo to replace. | Выберите эхо для замены. |
| `echo.replaceConfirm` | Replace Echo {n}? The other echo stays. The live plan resets. | Заменить Эхо {n}? Другое эхо останется. Текущий план будет очищен. |
| `echo.remove` | Remove Echo {n} | Удалить Эхо {n} |
| `echo.removeConfirm` | Remove Echo {n} and clear the live plan? | Удалить Эхо {n} и очистить текущий план? |
| `echo.full` | Two echoes maximum. Choose a replacement. | Максимум два эхо. Выберите, какое заменить. |
| `echo.kept` | Echo {n} kept | Эхо {n} сохранено |
| `echo.keptPending` | Echo {n} kept on this device — not synced yet | Эхо {n} сохранено на этом устройстве — ещё не синхронизировано |
| `echo.cannotDeliver` | As an echo, this route cannot deliver and will replay all its commands. | В роли эхо этот маршрут не сможет доставить посылку и выполнит все свои команды. |
| `hint.open` | Free hints | Бесплатные подсказки |
| `hint.next` | Show hint {n} | Показать подсказку {n} |
| `hint.referenceApproach` | One approach from the starting layout; your routes may differ. | Один из способов для начального поля; ваши маршруты могут отличаться. |
| `hint.assistedNotice` | This attempt will use the Assisted ranking. | Эта попытка будет участвовать в рейтинге с подсказками. |
| `hint.reveal` | Show full solution — Study | Показать полное решение — изучение |
| `hint.studyConfirm` | The full solution makes this attempt unranked. Completion still counts. Continue? | Полное решение исключит эту попытку из рейтинга. Прохождение всё равно засчитается. Продолжить? |
| `hint.apply` | Apply this solution | Применить это решение |
| `hint.connection` | Connect to reveal a new hint. Planning remains available. | Подключитесь, чтобы открыть новую подсказку. Планирование остаётся доступным. |

### 11.4 Results, sync, commerce, and settings strings

| Key | English | Russian |
|---|---|---|
| `result.success` | You delivered it together. | Вы справились вместе. |
| `result.solo` | Your parcel arrived. | Посылка доставлена. |
| `result.verified` | Delivery verified | Доставка подтверждена |
| `result.tick` | Delivered on tick {tick} | Доставлено на такте {tick} |
| `result.echoes` | Echoes in this solution: {count} | Эхо в решении: {count} |
| `result.takesHelp` | The live route plus {count} stored echoes count as {takes} takes. | Текущий маршрут и {count} сохранённых эхо считаются как {takes} прогона. |
| `result.base` | Delivery | Доставка |
| `result.timeBonus` | Unused-tick bonus | Бонус за оставшиеся такты |
| `result.echoBonus` | Take-efficiency bonus | Бонус за число прогонов |
| `result.total` | Total points | Всего очков |
| `result.best` | New personal best | Новый личный рекорд |
| `result.standard` | Standard | Без подсказок |
| `result.assisted` | Assisted | С подсказкой |
| `result.study` | Study — not ranked | Изучение — без рейтинга |
| `result.replay` | Replay delivery | Повторить просмотр доставки |
| `result.rank` | Rank {rank} | Место {rank} |
| `result.rankUnavailable` | Ranking unavailable | Рейтинг недоступен |
| `result.platformPending` | Platform progress is syncing | Прогресс платформы синхронизируется |
| `result.allComplete` | All 24 routes delivered. Revisit any level. | Все 24 доставки выполнены. Можно вернуться к любому уровню. |
| `mastery.first` | First Delivery | Первая доставка |
| `mastery.five` | Route Keeper | Хранитель маршрутов |
| `mastery.fifteen` | Echo Conductor | Дирижёр эхо |
| `sync.saved` | Saved | Сохранено |
| `sync.saving` | Saving… | Сохранение… |
| `sync.offline` | Offline — changes on this device | Нет связи — изменения на этом устройстве |
| `sync.pendingResult` | Delivery previewed — verification pending | Доставка показана — ожидается подтверждение |
| `sync.retry` | Retry sync | Повторить синхронизацию |
| `sync.conflict` | This route changed on another device. | Этот маршрут изменился на другом устройстве. |
| `sync.loadSaved` | Load saved route | Загрузить сохранённый маршрут |
| `sync.reapply` | Review and reapply local edits | Проверить и применить локальные изменения |
| `sync.closeConfirm` | Some edits are not saved to the server. Leave anyway? | Некоторые изменения ещё не сохранены на сервере. Всё равно выйти? |
| `sync.waitToSave` | Stay and save | Остаться и сохранить |
| `sync.leave` | Leave anyway | Всё равно выйти |
| `sync.versionRetired` | This saved version is no longer supported. Start the updated level for free. | Эта сохранённая версия больше не поддерживается. Начните обновлённый уровень бесплатно. |
| `sync.sessionExpired` | This attempt expired after 30 days without activity. Your verified results are safe. Start a new attempt for free. | Срок этой попытки истёк после 30 дней бездействия. Подтверждённые результаты сохранены. Начните новую попытку бесплатно. |
| `sync.authExpired` | Reopen from Telegram to reconnect. Your local draft is retained. | Откройте игру заново из Telegram для подключения. Локальный черновик сохранён. |
| `sync.mismatch` | We could not verify this replay. Your plan is retained; please retry or contact support. | Не удалось подтвердить этот повтор. План сохранён; повторите попытку или обратитесь в поддержку. |
| `sync.storageUnavailable` | Local recovery storage is unavailable. Server-saved edits are safe. | Локальное хранилище восстановления недоступно. Изменения, сохранённые на сервере, не потеряны. |
| `sync.contentUnavailable` | Connect to load this level. | Подключитесь, чтобы загрузить этот уровень. |
| `sync.draftUnreadable` | This local draft could not be read. Your server-saved route is still available. | Не удалось прочитать локальный черновик. Сохранённый на сервере маршрут по-прежнему доступен. |
| `guest.label` | Practice — not connected to an account | Практика — без подключения к аккаунту |
| `guest.noRank` | Practice results are not ranked or rewarded. | Результаты практики не участвуют в рейтинге и не дают наград. |
| `shop.title` | Parcel Stamp Set | Набор почтовых узоров |
| `shop.description` | Six parcel patterns and matching result borders. Appearance only. | Шесть узоров для посылки и соответствующие рамки результата. Только внешний вид. |
| `shop.price` | {price} Stars | {price} Stars |
| `shop.buy` | Buy for {price} Stars | Купить за {price} Stars |
| `shop.preview` | Preview exact items | Посмотреть все предметы |
| `shop.owned` | Owned | Приобретено |
| `shop.equip` | Apply appearance | Применить оформление |
| `shop.equipped` | Applied | Применено |
| `shop.restore` | Restore purchases | Восстановить покупки |
| `shop.pending` | Payment pending. Items appear after confirmation. | Платёж обрабатывается. Предметы появятся после подтверждения. |
| `shop.cancelled` | Purchase cancelled. Nothing changed. | Покупка отменена. Ничего не изменилось. |
| `shop.failed` | Payment could not be confirmed. Check support before trying another payment. | Не удалось подтвердить платёж. Проверьте его статус через поддержку перед повторной оплатой. |
| `shop.unavailable` | Purchases are unavailable right now. All levels remain free. | Покупки сейчас недоступны. Все уровни остаются бесплатными. |
| `shop.refunded` | This purchase was refunded. The free appearance is active; your scores are unchanged. | Покупка возвращена. Включено бесплатное оформление; ваши результаты не изменились. |
| `shop.supportOnce` | One-time support | Разовая поддержка |
| `shop.supportExplanation` | One payment, no subscription and no gameplay benefit. | Один платёж, без подписки и преимуществ в игре. |
| `shop.paymentSupport` | Payment support | Поддержка по платежам |
| `settings.language` | Language | Язык |
| `settings.sfx` | Sound effects | Звуковые эффекты |
| `settings.enableSound` | Enable sound | Включить звук |
| `settings.music` | Music | Музыка |
| `settings.haptics` | Haptics | Виброотклик |
| `settings.reducedMotion` | Reduced motion | Уменьшенное движение |
| `settings.highContrast` | High contrast | Высокий контраст |
| `settings.pathLabels` | Show route tick labels | Показывать такты на маршруте |
| `settings.tutorial` | Replay tutorial | Повторить обучение |
| `settings.undoHelp` | Undo history is local to this device and may reset when you close or reload the app. Saved commands and echoes remain. | История отмены хранится только на этом устройстве и может сброситься при закрытии или перезагрузке приложения. Сохранённые команды и эхо остаются. |
| `settings.audioUnavailable` | Sound could not start. Tap to try again. | Не удалось включить звук. Нажмите, чтобы повторить. |
| `settings.version` | Game version {version} | Версия игры {version} |
| `share.action` | Share this level | Поделиться уровнем |
| `share.copy` | Copy challenge link | Скопировать ссылку на уровень |
| `share.invitation` | Echo Courier · {level}. Can you deliver it? | Эхо-курьер · {level}. Сможете доставить посылку? |
| `share.expired` | This challenge link has expired. Choose a level to play. | Срок действия ссылки истёк. Выберите уровень для игры. |
| `share.unavailable` | This challenge is unavailable. No progress was changed. | Этот вызов недоступен. Прогресс не изменился. |

The `result.takesHelp` string must use plural-safe variants rather than literally using the displayed Russian `прогона` form for every value. Reference forms: `1 прогон`, `2 прогона`, `3 прогона`; points use `очко/очка/очков`. Similarly, use `route/ routes` and appropriate Russian forms in any additional count-bearing copy. The table gives sentence intent; the localization implementation supplies grammatical parameterization.

### 11.5 Tutorial and chapter strings

| Key | English | Russian |
|---|---|---|
| `chapter.first` | First Echoes | Первые эхо |
| `chapter.two` | Two Routes | Два маршрута |
| `chapter.crossed` | Crossed Signals | Пересекающиеся сигналы |
| `chapter.mastery` | Mastery | Мастерство |
| `tutorial.skip` | Skip tutorial | Пропустить обучение |
| `tutorial.addEast` | Add an east command. | Добавьте команду на восток. |
| `tutorial.previewTick` | Preview one tick. | Посмотрите один такт в предпросмотре. |
| `tutorial.addAnotherEast` | Add one more east command. | Добавьте ещё одну команду на восток. |
| `tutorial.run` | Run your delivery. | Запустите доставку. |
| `tutorial.helpfulEcho` | Your earlier route can hold a plate. | Ваш прошлый маршрут может удерживать плиту. |
| `tutorial.arrival` | The echo has arrived. The gate changes at the next sample. | Эхо прибыло. Ворота изменятся при следующей проверке. |
| `tutorial.sampleNow` | The plate is sampled now. This gate is open for this whole tick. | Сейчас проверяется плита. Ворота открыты на весь этот такт. |
| `tutorial.wait` | Wait is a useful command, not a mistake. | Ожидание — полезная команда, а не ошибка. |
| `tutorial.earlierDecisions` | Keep a useful route, then plan the live delivery. | Сохраните полезный маршрут, затем спланируйте текущую доставку. |
| `tutorial.secondEcho` | You can keep one more echo. Both replay together. | Можно сохранить ещё одно эхо. Оба повторяют маршруты одновременно. |
| `tutorial.correctRule` | A plate affects the next movement after it is sampled. | Плита влияет на следующее движение после её проверки. |
| `tutorial.wrongRule` | A plate opens its gate halfway through movement. | Плита открывает ворота посреди движения. |
| `tutorial.tryFirst` | Try the first level | Попробовать первый уровень |
| `tutorial.practiceOnly` | Tutorial — no ranking or rewards | Обучение — без рейтинга и наград |

Do not expose the deliberately incorrect teaching answer as an ordinary help statement outside the clearly labeled question. Human review must check that the distinction remains understandable in both languages.

### 11.6 Localization acceptance

All static UI keys, 24 titles, chapter labels, 72 hint steps, Study templates, cosmetic names, support/legal navigation, server-error mappings, accessible descriptions, and plural variants must exist in both locale files. Missing keys fail the build rather than displaying raw IDs.

Test the longest Russian strings at 320 px, 390 px, large system text, and 200% browser text zoom. No clipping, text-on-text overlap, inaccessible ellipsis-only actions, currency confusion, or image-baked English. A long optional description may wrap; critical action labels must remain identifiable.

## 12. Technical architecture and data contracts

### 12.1 Implementation architecture

Use a small TypeScript application with a pure deterministic rules package, an accessible DOM-based board/UI, and a server authority. A 36-cell board does not justify a heavyweight game engine, WebGL dependency, physics library, or separate simulation written in a different language.

Reference technology choices for a new repository:

| Layer | Baseline choice | Constraint |
|---|---|---|
| Runtime/tooling | Node.js 24 LTS, pnpm | Pin exact patch/tool versions when implementing; use frozen lockfile installs. |
| Client | React 19.2-compatible stable release, TypeScript strict mode, Vite | Resolve supported/security-patched versions together; record them, not floating `latest` in CI. |
| Rendering | DOM/CSS grid, raster textures/tokens, optional Canvas route overlay | Semantic DOM remains authoritative for accessibility; no SVG. |
| Rules | Framework-independent TypeScript module | Same package used by local preview, server evaluator, content validator, and fixtures. |
| Server | Node.js + Fastify, validated JSON schemas | A platform-owned server may host the same module through an adapter. |
| Persistence | PostgreSQL with migrations and transactional writes | Use the actual platform store when supplied; never use an in-memory process as durable production state. |
| Client recovery | IndexedDB for bounded pending drafts/outbox; local preferences cache | Not an entitlement, authentication, or ranked-score authority. |
| Tests | Unit/property tests plus Playwright integration/browser tests | Add real Telegram device verification; automation is not its substitute. |
| Audio | Web Audio | One context, bounded voices, separate from rules state. |
| Assets | Raster pipeline + manifest + self-hosted fonts | No runtime asset download from arbitrary external hosts. |

Node/React/Vite sources are listed in §19. This is a reference stack, not a reason to upgrade an existing supplied platform repository unnecessarily. If integrating into an existing stack, retain its conventions and adapter boundaries while preserving all behavior and tests.

Do not introduce Redux, a game engine, an ORM, a job broker, or a third-party telemetry service merely to fill an architecture checklist. Use the smallest maintained tools that meet the contracts. A PostgreSQL outbox worker is sufficient for the reference integration workload.

### 12.2 Module boundaries

```text
apps/web
  app-shell, screens, components, board-renderer, input, localization,
  preview-controller, audio, client-outbox, telegram-bridge
apps/server
  auth, sessions, actions, evaluator-service, progress, rankings,
  entitlement/payment adapters, challenge links, outbox-worker
packages/rules
  command/content validation, initial state, step, evaluate, trace encoding
packages/contracts
  validated request/response schemas, typed error codes, capability schema
content/echo-courier
  public level definitions, private reference solutions/hints, tutorial fixtures
assets
  runtime raster/fonts/audio outputs, manifest, license evidence
tools
  content import, independent solver/checker, asset/audio production, validation
tests
  rule fixtures, property tests, API/concurrency, browser, platform contracts
```

This is the implementation deliverable structure, not a statement that these files already exist. Keep tools/private solutions out of the public bundle. Domain code must not import React, browser time, Telegram globals, audio, network clients, database modules, or locale text.

### 12.3 Pure evaluator contract

The core exposes equivalent operations to:

```text
validateLevel(level) -> validated immutable level or typed errors
validateCommands(commands, allowEmpty) -> normalized authored commands or errors
createInitialState(level, echoSlots, liveCommands) -> tick-0 state
step(level, previousState, commandsAtTick) -> nextState + phase facts
evaluate(level, echoSlots, liveCommands) -> terminal outcome + ordered trace
encodeReplay(envelope) -> canonical UTF-8 bytes
```

Inputs are copied/frozen at an evaluation boundary. All positions, ticks, and counts are integers. There is no random choice, delta-time integration, physics collision, floating-point path accumulation, locale-dependent comparison, asynchronous gate callback, or reliance on iteration order of an unordered collection.

Renderers interpolate between already-computed frames. They never decide whether a gate was open or a parcel was collected. Keyboard repeat rate, animation cancellation, and low frame rate cannot influence evaluation.

### 12.4 Public level definition and content hash

The canonical mechanical content object contains exactly these fields:

```json
{
  "schemaVersion": 1,
  "gameId": "SG-G01",
  "levelId": "E01",
  "contentVersion": "ec-campaign-1.0.0",
  "rulesVersion": "ec-rules-1.0.0",
  "width": 6,
  "height": 6,
  "tickLimit": 12,
  "grid": ["######", "######", "a#####", ".S.APX", "######", "######"],
  "gateLinks": {"A": "a"}
}
```

`contentHash` is lowercase hexadecimal SHA-256 of that object's RFC 8785/JCS canonical UTF-8 serialization [R14], without the `contentHash` field itself. For the exact example above:

```text
969b70f86174cc9f848db763d47a81345e5315d1711067c556a7d7b6999d1740
```

Display names, translated hints, decorative seeds, cosmetics, asset paths, timestamps, reference solutions, and authoring search results are not mechanical fields in this hash. A mechanical change requires a new content version/hash. A localization-only correction does not alter the simulation or invalidate active commands.

`levelId` is also the stable cross-version completion identity defined in §4.2; there is no separate `stableLevelId` field to invent or derive from a translated title.

The server resolves the level from its own pinned registry, never from a board supplied by the client at completion time. Missing or retired versions are handled explicitly. Do not silently evaluate old commands on the newest map.

### 12.5 Authoritative saved session

Reference session shape:

```json
{
  "schemaVersion": 1,
  "sessionId": "11111111-1111-4111-8111-111111111111",
  "gameId": "SG-G01",
  "levelId": "E01",
  "contentVersion": "ec-campaign-1.0.0",
  "rulesVersion": "ec-rules-1.0.0",
  "contentHash": "969b70f86174cc9f848db763d47a81345e5315d1711067c556a7d7b6999d1740",
  "stateRevision": 7,
  "echoSlots": [["west", "north"], null],
  "liveCommands": ["east", "wait", "east", "east", "east"],
  "assistance": {"tier": "standard", "highestHint": 0},
  "status": "active"
}
```

The UUID is illustrative, not a real account/session. `echoSlots` always has exactly two entries: index 0 is Echo 1 and index 1 is Echo 2. An entry is null or a nonempty 1–12-command array. Removing slot 1 does not shift slot 2.

Session lifecycle is `active | completed | abandoned | expired`. Only `active` sessions accept new plan/run actions; an already accepted action can still return its original receipt after the session becomes terminal. Assistance invariants are `standard` with `highestHint=0`, `assisted-N` with `highestHint=N`, and `study` with `highestHint=3`; the server derives these together, never accepts inconsistent client combinations.

The server also stores owner identity, accepted action receipts/sequences, creation/last-activity/expiry timestamps, terminal result references, and suitable plan history for validated undo/redo. These are server metadata, not client-authoritative request fields.

Derived runtime state—actor positions, gate openness, carrying flag, tick, takes used—is recreated from the pinned level and command input. It may be cached but is never accepted from the client as truth. Preview cursor, selected command/cell/actor, expanded sheet, scroll position, and audio context state are presentation fields; they cannot change a verified result.

The current take means the saved live command array plus both echo slots and assistance/version context. Resuming a saved attempt restores those exactly; playback resumes paused at a stable boundary, not partway through a CSS transition.

### 12.6 Replay trace and hash protocol

Define `replayFormatVersion = 1`. The canonical replay envelope contains:

- `replayFormatVersion`, `gameId`, `levelId`, `contentVersion`, `rulesVersion`, `contentHash`;
- the exact authored `echoSlots` and `liveCommands` from the frozen input;
- authoritative assistance tier/highest hint at evaluation;
- frames in ascending tick order, starting with tick 0 and ending at delivery or tick 12;
- terminal mechanical outcome: success, delivery tick or null, active echo count, takes used, and raw formula score or null on failure.

Each frame contains `tick`, `positions`, `commands`, `implicitWait`, `blocked`, `sampledOccupiedPlates`, `openGates`, `parcelCarried`, `parcelPickedUp`, and `delivered`.

The following closed shape fixes the serialized field names and nesting. Every property is present; optional/undefined properties, extra diagnostics, and extension fields are excluded. Integer/range and nullability constraints in the surrounding rules remain mandatory; the type sketch is not itself a runtime validator.

```ts
type Command = "north" | "east" | "south" | "west" | "wait";
type Cell = [number, number];
type ActorTriple<T> = [T | null, T | null, T | null];
type Assistance = {
  tier: "standard" | "assisted-1" | "assisted-2" | "assisted-3" | "study";
  highestHint: 0 | 1 | 2 | 3;
};
type ReplayFrame = {
  tick: number;
  positions: ActorTriple<Cell>;
  commands: ActorTriple<Command>;
  implicitWait: ActorTriple<boolean>;
  blocked: ActorTriple<boolean>;
  sampledOccupiedPlates: string[];
  openGates: string[];
  parcelCarried: boolean;
  parcelPickedUp: boolean;
  delivered: boolean;
};
type ReplayEnvelope = {
  replayFormatVersion: 1;
  gameId: "SG-G01";
  levelId: string;
  contentVersion: string;
  rulesVersion: string;
  contentHash: string;
  echoSlots: [Command[] | null, Command[] | null];
  liveCommands: Command[];
  assistance: Assistance;
  frames: ReplayFrame[];
  terminal: {
    success: boolean;
    deliveryTick: number | null;
    activeEchoes: 0 | 1 | 2;
    takesUsed: 1 | 2 | 3;
    rawScore: number | null;
  };
};
```

Fixed actor order for array fields is **[LIVE, Echo 1, Echo 2]**. Absent echoes have null entries; they are not omitted or renumbered. Positions are `[x,y]`. Plate/gate ID lists are sorted by code-point order. At tick 0, commands/implicitWait/blocked are three nulls, sampled/open ID lists are empty, and parcel/delivery flags are false. At later ticks, an absent actor remains null, an explicit wait has `implicitWait=false`, and a padded tail wait has `implicitWait=true`.

`blocked=true` only when an authored directional move is denied. A legal explicit/implicit wait, including inside a closed gate, is not blocked. `sampledOccupiedPlates` comes from the previous frame's positions; `openGates` is the snapshot used for the current tick. `parcelPickedUp` is true only on the first collection frame.

`positions` and parcel/delivery flags are the end-of-tick values. To expose exact phases for tick `k`, use frame `k−1` positions/parcel state with frame `k` sampled/open lists for Plate sample; use frame `k` positions but the previous parcel state for Move; then apply frame `k` parcel/delivery flags for Parcel/exit. Thus the inspector can reconstruct every required boundary without storing contradictory copies of the same simulation state.

`terminalReplayHash = SHA256(JCS(replayEnvelope))`, lowercase hex. Do not include animation durations, audio variants, locale, cosmetics, browser/device identity, user ID, network timing, wall-clock timestamps, database revision numbers, or randomly generated result IDs in the hash.

Raw formula score is internal mechanical evidence. The public result exposes a ranked score only for an eligible verified Standard/Assisted run; Study exposes null competitive score while retaining delivery/echo metrics.

A replay hash is a comparison/integrity identifier, not an authorization token or anti-cheat proof by itself. The server must still replay, authorize the owner, apply assistance policy, and perform idempotent ledger writes. Two users may legitimately produce the same hash.

### 12.7 Reference HTTP surface

These routes belong to the proposed Echo Courier reference service, **not to an observed Stark Games API**. An actual shared platform may map them behind an adapter.

| Method/path | Purpose / authority |
|---|---|
| `POST /api/v1/ec/auth/telegram` | Exchange raw Telegram init data for an authenticated app session; never trusts `initDataUnsafe`. |
| `GET /api/v1/ec/bootstrap` | Account-safe capabilities, preferences, progress summary, active attempt references, entitlement state. |
| `GET /api/v1/ec/levels` | Public level metadata and current supported versions. |
| `GET /api/v1/ec/levels/:levelId/:contentVersion` | Pinned public geometry/links; no private solution data. |
| `POST /api/v1/ec/sessions` | Atomically create/resume an owned attempt; server chooses/validates version pins. Requires an idempotency key and the lifecycle rules below. |
| `GET /api/v1/ec/sessions/:sessionId` | Owned canonical saved state and accepted-sequence summary. |
| `POST /api/v1/ec/sessions/:sessionId/actions` | Revisioned plan, assistance, and run actions described below. |
| `GET /api/v1/ec/results/:resultId` | Authorized immutable verified result/replay projection. |
| `GET /api/v1/ec/rankings/:levelId` | Require `contentVersion`, `rulesVersion`, and `rankBracket` (`standard` or `assisted`) query fields; response repeats the full scope and competition ranks. Reject missing/unknown scope or `none`; no cross-version fallback or private account data. |
| `POST /api/v1/ec/challenges` | Optional creation of a spoiler-free, expiring level/version token. |
| `GET /api/v1/ec/challenges/:token` | Safe resolution only; no reward or ownership mutation. |
| `GET /api/v1/ec/cosmetics` | Exact catalog/prices/capabilities/entitlements supplied by server. |
| `POST /api/v1/ec/cosmetics/equip` | Validate/equip an entitled pair or free default; revisioned equipment state. |
| `POST /api/v1/ec/purchases` | Idempotent order/invoice creation through the real payment adapter. |
| `GET /api/v1/ec/purchases/:orderId` | Owned authoritative status; never trusts native invoice UI state as payment evidence. |
| `POST /api/v1/ec/purchases/restore` | Reconcile ownership from the payment/entitlement ledger. |
| `PATCH /api/v1/ec/preferences` | Validated locale/audio/accessibility preferences; separate revision from game commands. |
| `GET /healthz`, `GET /readyz` | Process liveness and required dependency readiness, without secrets. |

GET requests must not keep echoes, reveal a new assisted hint, create invoices, or grant completion. A new hint is a mutating action because disclosure changes assistance.

Session creation accepts `levelId`, optional explicitly requested supported `contentVersion`/`rulesVersion`, and `mode=resume|new` (default `resume`). The `Idempotency-Key` identifies one logical request for this authenticated owner; store its canonical fingerprint and immutable receipt/session reference transactionally. Retrying it must not create another session even if the default published version has since changed.

For `resume`, resolve version pins and return the existing active attempt in that exact context, or create one under the partial-unique invariant in §12.10. For `new`, replacing an editable attempt requires its explicit `replaceSessionId` and `baseRevision`; atomically validate, mark it abandoned, and create the fresh attempt. A stale concurrent replacement is a conflict, not permission to abandon the newly created session. Starting again from a completed/expired attempt keeps that terminal record and uses a new creation key. Distinct creation keys from two tabs cannot evade the one-active-attempt invariant.

### 12.8 Action envelope and allowed actions

Example for an acknowledged full live-ribbon edit:

```json
{
  "actionId": "33333333-3333-4333-8333-333333333333",
  "clientId": "22222222-2222-4222-8222-222222222222",
  "clientSeq": 8,
  "baseRevision": 7,
  "type": "setLivePlan",
  "payload": {"commands": ["east", "wait", "east", "east", "east"]}
}
```

`actionId` is a unique logical-request ID; `clientId` identifies one logical client instance's sequence stream, not authentication. Separate tabs/devices use distinct client IDs. Persist the original client ID with an uncertain in-flight envelope so reload/recovery retries that same stream instead of rewriting its identity. Coordinate local outbox ownership to prevent two tabs from dispatching different next actions under a recovered shared stream. `clientSeq` is a positive integer ordered per `(sessionId, clientId)`. UI command slots are 1–12; any API index field is explicitly 0–11. Do not confuse a tick number with a zero-based array index.

| Action type | Payload | Server behavior |
|---|---|---|
| `setLivePlan` | `commands` array, length 0–12 | Validate/replace live authored list; keep echoes and assistance. |
| `keepEcho` | `targetSlot` 1 or 2 | Require target empty and live list nonempty; copy current live list; reset live/preview. |
| `replaceEcho` | `targetSlot` 1 or 2 | Require explicit occupied target and nonempty live list; replace only selected slot; reset live. |
| `removeEcho` | `targetSlot` 1 or 2 | Remove selected echo and clear live; preserve other slot. |
| `restartLevel` | Empty object | Clear live/both echoes; assistance and version pins unchanged. |
| `restorePlan` | `targetRevision`, `reason`=`undo` or `redo` | Restore a valid historical plan of this owned active attempt; never restore assistance/rewards/payment state. |
| `requestHint` | `tier` 1–3 | Reopen `tier <= highestHint` unchanged, or authorize exactly `highestHint + 1`; reject larger jumps with `INVALID_HINT_ORDER`. Persist assistance before returning new text. No payment condition. |
| `revealSolution` | Explicit `confirmStudy=true` | Set Study and `highestHint=3` before returning reference solution; all three hints are then authorized. |
| `applyStudySolution` | Empty object | Require Study; copy the server's reference solution into slots/live, atomically. |
| `submitRun` | Empty object or optional diagnostic client trace hash | Freeze canonical saved plan, evaluate, store outcome; on success finalize this attempt and apply ledgers/outbox. Never accept a score from the client. |

The user confirmation belongs in UI, while the server enforces explicit targeted mutation and stale-state checks. A boolean claiming “confirmed” does not replace ownership/revision validation.

### 12.9 Receipts, errors, and transactional effects

An accepted action returns an immutable receipt containing action ID, accepted client sequence, accepted revision, resulting plan/state hash, and any result/effect references. The response may also include current canonical state. On retry, the original receipt is returned; a separately labeled current-state projection may be newer and must not be mistaken for a second action execution.

For a successful run, one transaction must:

1. Authenticate the owner and lock the owned session.
2. Reuse an existing accepted receipt if this exact action/fingerprint was already processed, before rejecting a now-stale revision or terminal session.
3. For a new action, validate active lifecycle, sequence, expected revision, and pinned content/rules, then evaluate the canonical commands.
4. Write the run/terminal replay hash and immutable result facts.
5. Mark the attempt complete.
6. Insert the distinct-level completion grant if absent.
7. Update eligible bracket best score only if improved.
8. Evaluate/insert newly reached mastery grants without racing another level's completion.
9. Insert idempotent platform-outbox events.
10. Commit, then return the receipt.

No remote payment/XP/ranking API call is made while holding this database transaction open. Lock a per-user/game progress row or use an equivalent safe transaction strategy for concurrent distinct-level completion/mastery updates.

| Code / typical HTTP status | Required meaning |
|---|---|
| `AUTH_REQUIRED`, `AUTH_EXPIRED` / 401 | No valid app identity; preserve local recoverable draft. |
| `NOT_FOUND` / 404 | Missing or non-owned opaque session/result/order, without leaking another user's data. |
| `STATE_CONFLICT` / 409 | Base revision is stale; nothing applied. |
| `SEQUENCE_CONFLICT` / 409 | Accepted sequence order does not match; nothing applied. |
| `IDEMPOTENCY_MISMATCH` / 409 | Reused action/order ID with different canonical request content. |
| `SESSION_CLOSED` / 409 | Attempt is complete/abandoned; create a new attempt to edit. |
| `SESSION_EXPIRED` / 410 | Attempt passed the 30-day inactivity limit; retain verified history/readable old plan and offer a free fresh attempt. |
| `VERSION_RETIRED` / 410 | Pinned rules/content cannot be evaluated; offer free new attempt. |
| `INVALID_COMMAND`, `COMMAND_LIMIT`, `EMPTY_PLAN` / 422 | Reject malformed/too-long/empty prohibited input; no partial truncation. |
| `ECHO_LIMIT`, `SLOT_REQUIRED`, `INVALID_SLOT` / 422 | Reject third echo or missing/invalid target without deleting anything. |
| `ASSISTANCE_DOWNGRADE` / 422 | Client cannot lower the current tier. |
| `INVALID_HINT_ORDER` / 422 | New hint skipped the next undisclosed tier; disclose nothing and preserve current assistance. |
| `PAYLOAD_TOO_LARGE` / 413 | Reject before expensive processing. |
| `RATE_LIMITED` / 429 | Include Retry-After; preserve and retry bounded local intent. |
| `SERVICE_UNAVAILABLE` / 503 | Retryable dependency failure; no false grant or data wipe. |

Do not expose stack traces, raw init data, SQL, private board-solver internals, or secrets in player-facing errors.

### 12.10 Persistence entities and uniqueness

| Entity | Essential key/invariant |
|---|---|
| Account mapping | Unique platform/Telegram subject; provider identifier stored without numeric precision loss |
| Game session | Opaque ID, owner, pinned versions/hash, revision, command lists, assistance, lifecycle; partial unique `(userId, gameId, levelId, contentVersion, rulesVersion)` where status is `active` |
| Session creation receipt | Unique `(userId, idempotencyKey)` for the creation endpoint; canonical request fingerprint and original session reference |
| Action receipt | Unique `(sessionId, actionId)`; request fingerprint; accepted client sequence |
| Client sequence | Unique `(sessionId, clientId)`; last accepted sequence |
| Plan history | Owned session revision snapshots sufficient for exposed undo/redo; bounded retention |
| Run/result | Unique submitted action/run identity; frozen input, authoritative trace/hash, outcome |
| Distinct-level completion | Unique `(userId, gameId, levelId, grantType)`; campaign completion uses the stable level ID, not a version or assistance tier |
| Bracket best score | Unique `(userId, gameId, levelId, contentVersion, rulesVersion, rankBracket)`; only `standard` or `assisted` |
| Mastery grant | Unique `(userId, gameId, masteryBadgeId)` |
| Platform outbox | Unique logical event ID; retries/ack state; no repeated grant on redelivery |
| Cosmetic equipment | One current selection per user/game, consistent with current entitlements |
| Payment/order ledger | Owned opaque order; unique `(userId, idempotencyKey)` plus request fingerprint/receipt; unique provider charge/event IDs; partial unique `(userId, sku)` for unresolved non-consumable orders; actual platform may own these tables |
| Challenge token | Random opaque token, pinned target, expiry, optional owned result reference |
| Preferences/tutorial progress | Separate versioned user settings and completed tutorial steps |

Use migrations, indexes for owner/session and scoped rankings, and database uniqueness—not only “check then insert” application code—for once-only effects.

## 13. Persistence, concurrency, and recovery

### 13.1 Save guarantees

**SAVE-01:** After a command/echo mutation is acknowledged, reopening the game restores the same command arrays, slot identities, assistance, level/content/rules, and active attempt. A cosmetic or language change does not erase this state.

**SAVE-02:** Before acknowledgement, display Saving or Offline. Persist pending intent locally where available, but do not promise survival of an unacknowledged edit across OS termination, storage eviction, corruption, or device loss.

**SAVE-03:** The UI never labels data “Saved” merely because it was put in React state or IndexedDB. “Saved” means the server accepted the corresponding canonical mutation.

Maintain one active resumable attempt per `(userId, gameId, levelId, contentVersion, rulesVersion)` and a separate last-active pointer for Continue. Enforce this during creation/replacement with a transaction and the database constraint in §12.10, not a client-only check. Switching levels preserves acknowledged attempts rather than flattening every level into one global draft. Starting a new attempt explicitly closes/replaces the selected editable attempt, while historical verified results remain immutable.

### 13.2 Client outbox and edit coalescing

Persist the last acknowledged state/revision, unsent local intents, and the exact envelope of any in-flight request. Serialize mutations for a session; there is at most one in-flight mutating request per client/session.

Live ribbon edits may be coalesced into a full `setLivePlan` after a short 200–250 ms debounce. Flush before keep/replace/remove, hint disclosure, run submission, or navigation that requires saved state. Never coalesce across a keep or assistance boundary and accidentally apply an edit to the wrong take.

Assign the next `clientSeq` when dispatching an intent, not blindly to hundreds of future unsent edits. Pending local intent has a stable local ID even before it receives a dispatch envelope. Bound the queue to 500 intents/256 KiB per account/game; coalesce superseded unsent live-plan edits. If the bound is reached, preserve the latest recoverable plan and explain the need to reconnect rather than silently dropping acknowledged data.

On network timeout, retry the **same envelope/action ID** because the server may have applied it. Do not immediately invent a new action ID for an uncertain keep, completion, or purchase.

### 13.3 Server sequence and revision algorithm

Within a transaction:

1. Authenticate/authorize the session owner.
2. Check an existing accepted receipt for this action ID before stale-revision rejection. If its canonical request fingerprint matches, return that receipt without another effect. If it differs, reject idempotency mismatch.
3. Require `clientSeq = lastAcceptedSeq + 1` for this client stream.
4. Require `baseRevision = current stateRevision`.
5. Validate and apply the action atomically; accepted mutations advance the revision and client sequence once, even if their resulting plan equals the previous plan.
6. Store the accepted receipt/fingerprint/effects in the same transaction.

Rejected validation, sequence, or stale-revision requests do not consume the sequence or mutate plans. After a definite stale rejection, reconcile and create a new action envelope for the reapproved intent, with a new action ID and the still-next accepted sequence. Future unsent intents receive sequence numbers only as they are dispatched.

An accepted receipt must never disappear while the corresponding resumable session may still retry it. Receipt/session retention policies must be designed together; expiring a receipt alone can duplicate effects.

### 13.4 Conflict reconciliation

When another device has changed the attempt, pause dispatch and obtain canonical state plus the accepted-sequence summary. Determine whether the uncertain in-flight request was already acknowledged before offering to reapply anything.

Show two clear choices:

- **Load saved route:** adopt canonical state; retain a recoverable local draft until the player explicitly discards it or reconciliation succeeds.
- **Review and reapply local edits:** show the local plan/echo intent against the new saved context; require confirmation for echo replacement/removal/restart; revalidate and resimulate before dispatch.

Do not automatically merge two conflicting echo replacements, attach a live suffix to another device's take, downgrade assistance, or last-write-win a whole account blob. Simple unapplied ribbon intent may be reapplied only after the player agrees and the target attempt is still active/compatible.

Two tabs/devices with the same Telegram user remain separate `clientId` streams but share one session revision. Client IDs are not access credentials. Copied local recovery data from another account is not automatically imported after login.

### 13.5 Offline behavior

| Capability | Offline behavior |
|---|---|
| Previously cached level geometry | Planning and preview available under its pinned version |
| Uncached level | Explain connection requirement; do not invent placeholder geometry |
| Command/echo edits | May be kept locally as pending intent, visibly unsynced |
| Local run | Predict locally; queue verification after plan reconciliation; no authoritative reward/rank yet |
| Previously acknowledged hint | May reopen from cache |
| New hint/Study disclosure for authenticated attempt | Requires server assistance acknowledgement before new text is disclosed |
| Cosmetic preview | Cached appearance may be previewed; ownership cannot be granted locally |
| Purchase or wallet/platform navigation requiring network | Disabled/explained, not simulated as successful |
| Settings | Local preferences remain usable and sync later; do not reset gameplay |

Pending verified submissions must flush/reconcile preceding plan mutations in order. If the canonical attempt changed, a local predicted result is not applied to the new plan automatically; retain the old local input and ask the player how to continue.

The MVP does not require a service worker or a guarantee of cold offline launch from Telegram. If a service worker is added, cache only versioned public assets/content, never auth responses, private results, invoices, or new hint disclosures. Test update/eviction behavior explicitly.

### 13.6 Backgrounding, closing, and interrupted runs

On hidden/deactivated: pause presentation, persist recoverable local intent synchronously/as promptly as platform storage allows, attempt ordinary safe network flushing if possible, and suspend audio. Do not depend on unload, a background timer, or `sendBeacon` to deliver an authoritative completion or payment.

On return/reopen: authenticate as necessary, reconcile any uncertain request, load acknowledged state, recover pending intent, and display a stable paused board. If the server already completed a run while the UI was closed, show that stored result once; do not submit a second run to discover it.

Enable Telegram/browser closing confirmation only while unacknowledged game edits exist. OS termination cannot be prevented; explain the guarantee honestly. A native closing prompt is a safety aid, not a durability mechanism.

### 13.7 Content/rules updates and retirement

Every attempt pins content and rules at creation. New deployments retain compatible evaluators/content for active attempts. Reference operational policy: retain old supported content for at least 90 days after replacement and do not expire an otherwise active attempt merely because a new client was deployed.

Reference inactive-session expiry is 30 days without player activity. Check expiry when resuming and before accepting a new action; an expired active record transitions atomically to `expired` and returns `SESSION_EXPIRED` with `sync.sessionExpired`. A successful authenticated resume or accepted player action updates last activity; unattended polling does not keep an attempt alive. Preserve a readable old-plan summary and historical verified results, and offer a free fresh attempt. Duplicate accepted actions still resolve to their original receipts rather than re-executing on a new session. Keep idempotency receipts at least as long as the session's retry/recovery lifetime, and retain completion/payment uniqueness beyond session expiry.

If a security or correctness issue makes an old version incompatible, mark it retired server-side. On resume, preserve a readable summary of the old plan, explain the version change, and offer a free fresh attempt on current content. Do not translate commands onto a different map and call that a resumed take.

Separate ranking scopes for changed mechanical versions. Archived best results remain attributed to their original version; do not compare their scores to a new board. A stable level's completion reward is not regranted just because the content version changed.

### 13.8 Storage/recovery tests

Required cases include: close immediately before send; close after send/before response; lost response after server commit; close after acknowledgement; delayed duplicate response; device A/B conflicting edits; replacement in an offline queue; hinted offline resume; Study rollback attempt; storage quota denial/corruption; stale content cache; logout/account switch; and server restart during a completion transaction.

For each, state which data was acknowledged, what survives locally, whether any grant occurred, and the exact recovery UI. Never use a vague “autosave works” screenshot as the only evidence.

## 14. Telegram and Stark Games integration

### 14.1 Integration modes and scope boundaries

| Mode | Identity / services | Honest product status |
|---|---|---|
| Browser practice | No Telegram authority; optional isolated development account | Local practice or test results only; no production ranking/reward/payment claim |
| Standalone Telegram reference | Verified Telegram identity + real game-owned server/store | Verified core game; commerce/result adapters must still be real/configured before full MVP release |
| Stark Games embedded | Actual platform identity, catalogue/navigation, result/payment/entitlement adapters | Full integrated release only after supplied platform contract suites pass |

Do not build the entire Stark Games marketplace, a TON wallet, or a second payment platform as part of this game. Implement typed adapters, explicit capabilities, and the game-owned reference service. The missing platform SRS is an integration dependency, not permission to invent its endpoints.

### 14.2 Telegram bridge and capability handling

Use Telegram's official Mini App JavaScript bridge as documented in [R01]. Keep all access behind a small adapter. Browser mode uses a deliberate no-Telegram adapter; it does not fabricate `initData` in production.

- Call `ready()` once essential UI is ready, rather than after every decorative asset is downloaded.
- Use `expand()` where supported/appropriate. Fullscreen is optional and user-initiated; normal-height play must work without it.
- Handle `viewportChanged`, supported safe-area/content-safe-area changes, theme changes, and activation/deactivation.
- Use stable viewport measurements for layout, not a permanently captured first `innerHeight`.
- Respect both device safe areas and Telegram UI overlap. Implement one tested inset adapter; do not blindly add overlapping inset sources twice or let full-screen controls cover the board.
- Render ordinary HTML action controls as the cross-client baseline. Do not depend on Telegram MainButton/SecondaryButton being available or duplicate the same primary action in both places.
- Mirror navigation through BackButton when supported and hide it at the correct root.
- Use closing confirmation only for unsynced edits.
- Do not disable Telegram vertical gestures globally just because the board exists; it has no drag-only gameplay requirement. Test scrolling/minimization compatibility.
- Feature-detect haptics, fullscreen, storage, native share, and lifecycle APIs. Version strings alone are insufficient when a client lacks a capability.
- No contacts, location, camera, microphone, biometrics, sensors, chat membership, notification permission, or wallet permission is required to play.

The app's own palette remains consistent; Telegram theme parameters may inform surrounding chrome. Do not let a host theme change erase contrast or alter gate/echo identities mid-preview.

### 14.3 Authentication and Telegram trust boundary

Send raw `Telegram.WebApp.initData` to the backend over HTTPS. `initDataUnsafe`, query-string user IDs, usernames, URL flags, and a client-provided `isVerified` field are not trusted identity.

For the reference bot-token HMAC validation path:

1. Parse the query string without losing the original decoded field values or reserializing its `user` JSON.
2. Reject malformed encoding, duplicate security-sensitive keys, missing/invalid `hash`, invalid `auth_date`, and invalid user identity shape.
3. Form newline-separated `key=value` pairs sorted by key, excluding `hash`. For this bot-token HMAC path, other received fields—including `signature` when present—remain in the checked data; do not confuse it with the separate Ed25519 third-party-validation exclusion rules.
4. `secretKey = HMAC_SHA256(key="WebAppData", message=botToken)`.
5. `expectedHash = HMAC_SHA256(key=secretKey, message=dataCheckString)`.
6. Compare decoded, equal-length 32-byte hashes in constant time.
7. Enforce a fresh authentication exchange: reference maximum init-data age 10 minutes, with at most 60 seconds future clock skew. Use server time; configure/test this against actual launch behavior rather than disabling expiry when a test fails.
8. Resolve the authenticated Telegram subject to an internal account. Store identifiers without precision loss; do not authenticate by mutable display name.

The official protocol is the authority [R01]. A separately inspected modern validator implementation corroborates the HMAC field treatment [R15], but copying its code blindly is not a substitute for expiry/duplicate-key/constant-time tests. Never confuse the HMAC key and message order.

Exchange validated init data for a revocable app session, rather than sending bot credentials or treating raw init data as an indefinitely reusable credential. Reference transport: an opaque random 256-bit token in browser memory and an Authorization header, with server-side hashed-token storage and an eight-hour absolute expiry. Do not store it in URLs, localStorage, IndexedDB recovery records, analytics, or logs. The game draft outlives the auth token and can be resumed after reauthentication.

A supplied platform may use its own secure session mechanism. If cookies are used, apply Secure/HttpOnly/appropriate SameSite and CSRF protection, and test Telegram Web's iframe/third-party-cookie behavior; do not assume a SameSite=Lax cookie works in every embedded client. Reauthentication failure retains drafts and offers a fresh Telegram launch, not a fake guest-to-ranked promotion.

### 14.4 Platform adapter contracts

Expose capabilities such as `verifiedResults`, `rankings`, `cosmetics`, `payments`, `challengeLinks`, `profileLink`, and `walletProfileLink`, along with genuine unavailable reasons. Capability false does not excuse claiming a required release gate passed.

| Adapter port | Required semantics, not invented remote path |
|---|---|
| `IdentityPort` | Verify/resolve account and session; expose safe locale/display preferences. |
| `NavigationPort` | Return to actual catalogue, open Profile/support/privacy, resolve allowed game destinations. |
| `ResultPort` | Receive server-verified facts with stable completion/event ID; deduplicate delivery; return acknowledgement/pending status. |
| `RankingPort` | Submit/query version-and-bracket-scoped best results; shared exact ties; no client score authority. |
| `EntitlementPort` | Read/restore cosmetic ownership; process trusted purchase/refund changes; validate equipment. |
| `PaymentPort` | Create/check a Stars order; expose cancel/pending/paid/refunded state with trusted server authority. |
| `ChallengePort` | Create/resolve a spoiler-free expiring same-content target, without ghost playback. |
| `TelemetryPort` | Optional approved analytics; no raw credentials, routes, or private identifiers in third-party telemetry. |

Reference verified-result event facts: schema version, stable event/completion ID, internal user reference, `gameId`, level/content/rules/hash, result/replay hash, delivery tick, active echo count, takes used, assistance tier, `rankBracket` as defined in §4.2, eligible score or null, and first-distinct-completion flag. No client-supplied XP amount or wallet address is needed.

Publish through a durable at-least-once outbox and require receiver deduplication. A platform outage leaves the game result verified with integration pending; it does not invite repeated completion grants. Contract tests use explicit mocks in development and actual staging adapters before release.

### 14.5 Stars commerce rules

Digital cosmetics and the support product use **Telegram Stars (`XTR`)** inside Telegram, through the shared payment service or a correctly implemented reference adapter [R02, R03]. Do not offer TON, a card web checkout, or an external cheaper digital-goods payment link as a workaround.

Products:

- `ec.parcel-stamp-set.v1`: six exact pattern/border pairs, proposed 75 Stars, non-consumable cosmetic ownership.
- `ec.support-once.v1`: explicitly one-time support, proposed reference amount 25 Stars. No subscription, automatic renewal, echo, hint, score, level, badge, or other gameplay benefit. A later voluntary purchase is a new explicit one-time order, never a hidden recurring charge.

Both amounts require operator/platform approval before enabling production checkout. The server/catalog is the price authority; never trust a client amount. If configuration is unavailable, show an honest unavailable state while the entire free campaign remains playable. Do not silently substitute a different price.

### 14.6 Complete purchase lifecycle

1. The player previews every item and sees exact product, price, one-time/non-consumable nature, and cosmetic-only effect.
2. An authenticated idempotent request creates an owned opaque order and server invoice link. At most one unresolved purchase for the same non-consumable SKU is opened for that user.
3. For Stars invoices use currency `XTR`, an integer Stars amount, and the required single price component. No shipping address, phone, real-world delivery, tips, or physical-goods provider is requested. `provider_token` is empty/not required for the digital Stars flow as documented.
4. Open the invoice using the supported Telegram invoice API. UI callback state is presentation only.
5. On the server's `pre_checkout_query`, validate order ownership/payer, SKU, currency, amount, current availability, expiry, and not-already-owned/settled state. Respond within Telegram's ten-second requirement, preferably much faster.
6. Grant only after a verified `successful_payment` update, storing/deduplicating its `telegram_payment_charge_id` and validating its association to the order/user/amount/currency.
7. Persist the financial receipt and entitlement change transactionally or through a reliable reconciled service boundary. Only then show Owned and allow equipment.
8. A callback labeled `paid`, a closed invoice, a screenshot, a client receipt field, or a successful frontend promise never grants ownership by itself.
9. Poll the owned order only with bounded backoff while the UI is pending; after a reasonable foreground wait, retain Pending and offer Check status/Support. Do not create another charge because a webhook is late.
10. Restore/reopen reads the same authoritative ledger. Duplicate, delayed, and out-of-order events cannot duplicate grants or erase newer valid ownership.

Reference purchase creation uses an `Idempotency-Key` and body `{sku, offerVersion}` from the displayed server catalog. Bind the key to the authenticated owner and canonical request fingerprint; return the original order/invoice receipt on identical retries and `IDEMPOTENCY_MISMATCH` on a changed request. The server snapshots the approved price/currency, rejecting a stale offer rather than charging a newly changed amount without consent. Preserve creation receipts throughout the order's settlement/recovery lifetime.

Enforce a partial unique `(userId, sku)` constraint for `ec.parcel-stamp-set.v1` orders in `created` or `pending`, with atomic creation/status transitions. Another key while such an order exists returns that owned unresolved order, not a second invoice; already-owned users receive ownership/status rather than checkout. Serialize pre-checkout eligibility for the same non-consumable entitlement. A pre-checkout-approved order with uncertain settlement remains pending until trusted reconciliation; local cancellation or an elapsed UI timer cannot expire it and permit an overlapping charge. The repeatable one-time support SKU has no `(userId, sku)` lifetime uniqueness, but still deduplicates each logical creation key and payment charge.

Distinguish **invoice interaction state** (open/closed/cancelled) from **financial order state** (created/pending/paid/refunded/failed/expired). A local cancel cannot override a later verified payment. A trusted refund may arrive before a delayed purchase event; record it so processing order does not briefly re-grant refunded ownership.

Do not call a purchase permanently failed based only on network timeout. If a status is uncertain, help the user check it before retrying payment.

### 14.7 Refund, restore, and support

The payment owner must support Telegram payment disputes and `/paysupport`, with real support contact/instructions. A refund uses the trusted platform flow or Telegram `refundStarPayment` [R02, R03]; no client-supplied refund flag is accepted.

Entitlement derives from valid unrefunded purchases of the SKU. When the set is no longer owned, revert equipment to `plain-post`, invalidate relevant caches, and notify the player. Preserve all command plans, results, ranks, and mastery. A delayed refund for an old purchase must not erase a distinct newer valid purchase.

The refund process requires access to the stored charge ID. Do not expose full charge IDs in public result/share cards or logs. Restoring purchases is free and never forces a second payment or wallet connection.

Development payment fixtures must be unmistakably test-only. Production builds must not grant a cosmetic from a simulated success callback, development admin button, or a URL parameter.

### 14.8 Wallet boundary

Wallet access, if supplied by Stark Games, is a **secondary Profile link** to its optional verified TON association. Echo Courier does not require that association, implement TON signing, request a wallet address, ask for a seed phrase, initiate a blockchain transaction, or sell gameplay through crypto.

An unavailable wallet/profile feature does not block play, hints, verified delivery, or Stars entitlement restoration. Do not add a TON SDK to the game simply because the source mentions a platform Profile link.

### 14.9 Spoiler-free challenge links

MVP links identify the same authored level and pinned content/rules; they do not contain a friend ghost, commands, hints, solver path, private account ID, or paid entitlement. Asynchronous ghost comparison/daily variants remain future scope.

Sharing is optional for the player, not an excuse to omit the Telegram MVP's spoiler-free link creation, resolution, copy fallback, and expiry handling. An unavailable host integration remains an explicitly named release gate rather than a required button that silently does nothing.

Reference token: a random opaque base64url value with an `ec1_` prefix, resolved server-side, with a seven-day expiry. Keep it comfortably below Telegram's allowed launch-parameter limit; reference parser maximum is 128 characters from `[A-Za-z0-9_-]`. Do not accept arbitrary URLs/redirect destinations inside it.

For a configured main Mini App, use the operator's real bot launch URL with `startapp=<token>`; for a named app use its real configured short name. Do not ship a guessed bot username. Resolve both signed launch data and routing hints safely; routing input is not authentication.

Share through a supported Telegram/native share path when available, with Copy link as a fallback. User cancellation is normal. A share card, if generated, uses ART-19 and localized non-spoiler text only. Sharing is never required to unlock Next.

Expired, malformed, removed, unauthorized, or incompatible challenge targets open level selection with a clear localized explanation. They must not clear existing progress or silently claim an equivalent score on different content.

## 15. Security, privacy, and asset provenance

### 15.1 Threat model

Treat the browser, its cached state, and every incoming request as modifiable. Threats include forged identity, arbitrary score submission, malformed command arrays, tampered level versions, assistance downgrades, duplicate completion rewards, cross-user access, stale overwrites, fake paid callbacks, repeated webhooks, leaked init data, malicious deep links, unlicensed assets, and unsafe generated content.

The objective is trustworthy server evaluation and safe persistence/commerce, not a claim that a small puzzle game can stop all automation or external solution sharing. Do not add invasive device fingerprinting or wallet verification as a supposed anti-cheat shortcut.

### 15.2 Security controls

| Area | Mandatory control |
|---|---|
| Identity | Server validation of raw Telegram init data; expiry/skew checks; no reliance on `initDataUnsafe` |
| Authorization | Owner check on every session/result/order/equipment action; opaque IDs are not permissions |
| Input | Strict schemas, exact direction enum, lengths 0/1–12 as appropriate, exactly two echo slots, safe integers, known level/rules versions |
| Evaluation | Server resolves content and replays commands; ignores supplied positions/ticks/scores/entitlements |
| Concurrency | Revision check, sequence stream, idempotent receipts, transactions and unique keys |
| Assistance | Monotonic server state; disclosure acknowledged before new content is returned |
| Payments | Trusted provider/platform events; amount/payer/order binding; duplicate/out-of-order handling; no client grant |
| Transport | HTTPS production, same-origin or tightly allowlisted API access; no credentials in query strings |
| Frontend | Escape text, no unsafe HTML from hints/user names/links; restrictive tested CSP; no arbitrary third-party scripts |
| Backend | Parameterized database access; safe error projection; request-size/time limits; least-privilege service credentials |
| Webhooks | Verify configured webhook secret/platform signature; reject untrusted callbacks; deduplicate updates |
| Secrets | Environment/secret manager only; exclude from client bundles, source maps, logs, screenshots, and commits |
| Dependencies/assets | Frozen dependency lockfile, security review, source/license manifest, no runtime arbitrary downloads |
| Development seams | Test auth/payment/result adapters unavailable in production; production startup fails if a bypass flag is enabled |

Reference request body cap is 32 KiB for game actions, far above a valid 36-command combined plan but small enough to reject abuse early. Use a separate bounded policy for legitimate non-game endpoints; never accept uploaded level files in MVP.

Reference rate limits should tolerate real rapid editing: start with 300 mutation requests/minute/user and a 60-request burst, 30 run submissions/minute/user, and stricter bounded authentication/order limits. Measure and tune; retries return Retry-After and preserve intent. Do not globally block a shared mobile-network IP because one player used many free hints.

### 15.3 Privacy and data minimization

Store only the identity mapping, progress/plans needed for the game, settings, verified replay evidence, and required payment/support records. No phone number, contacts, location, chat history, wallet address, biometric data, or profile photo is required.

Reference telemetry events contain game/version/level IDs, coarse duration/count metrics, assistance class, error category, and a scoped pseudonymous identifier only when approved. Do not send command strings, raw init data, access tokens, Telegram names/IDs, payment charge IDs, challenge tokens, or customer screenshots to third-party analytics.

Optional product analytics is disabled until the operator approves its collection/consent policy. Essential reliability logs must still be minimized. The game works without an analytics provider or advertising identifier.

Public rankings use an approved display-name policy or a neutral generated courier label. Never expose an internal/Telegram user ID as a public label. Share links contain only intentionally shareable target information.

### 15.4 Proposed retention and deletion policy

These are reference engineering defaults, not a substitute for the operator's legal policy:

- Active/inactive attempt recovery follows §13; inactive attempts expire after 30 days, with explicit recovery messaging.
- Accepted action receipts outlive all possible retries of their associated active sessions; do not independently prune them first.
- Retain current best-result replay evidence while its ranking is active; other diagnostic run traces may expire after 30 days.
- Completion/mastery uniqueness persists while the account's game progress exists, even if detailed traces expire.
- Minimal operational logs: 14 days; approved aggregate product metrics: 90 days unless a justified policy differs.
- Progress/preferences: until account deletion or the platform's disclosed retention policy.
- Payment/support records: follow the real platform's legally required retention; do not invent a jurisdiction-specific financial deletion period.

Provide an actual support/deletion route through the host platform or operator. Account deletion removes or appropriately anonymizes game/profile/ranking data while preserving only legally necessary financial/audit records. Do not promise that a device-only cache clearing action deletes server data.

### 15.5 Content and media safety

Never use private customer screenshots, personal avatars, user messages, unreleased private references, or payment receipts as image-generation inputs without explicit authorization and an appropriate privacy basis. Prompts and production references must be original or licensed.

Record license evidence for every third-party font/audio/image. CC0, OFL, and generation-provider terms are different categories. A public URL, a search result, or “free download” wording alone is not a commercial-use license.

Review generated art for accidental words/logos, inappropriate details, cultural stereotypes, and silhouettes that could mislead gameplay. Do not claim worldwide originality; temporal planning puzzle genres already exist.

### 15.6 Security acceptance boundary

Production release requires negative tests for all principal trust boundaries, secret scanning, dependency review, safe CSP/headers in the actual Telegram embedding mode, ownership checks, assistance downgrade rejection, reward/payment idempotency, and tested support/refund routes. A successful UI demo is not security verification [R13].

## 16. Performance, compatibility, and operations

### 16.1 Performance budgets

These are acceptance targets to measure on the implemented game, not benchmarks already achieved by this document.

| Metric | Reference acceptance target | Measurement notes |
|---|---|---|
| First usable board | p75 ≤3 s under a defined 10 Mbps / 100 ms RTT cold-load lab profile | Record device/browser, cache state, bundle version, and at least 20 runs; include auth/content delay in the user-visible measurement. |
| Initial compressed transfer | ≤1.2 MiB | Include critical client, styles, public content, fonts, required art, and bridge transfer; defer store/chapter decoration. |
| Initial client JS + CSS | ≤300 KiB compressed total | Server code, solvers, tests, private hints/solutions, and source-size artwork excluded. |
| First-board raster/font transfer | ≤650 KiB | Both inspected font subsets together are about 55 KiB; do not load all decorative chapter art. |
| Public 24-level geometry/metadata | ≤100 KiB uncompressed JSON | No canonical full solution/hint leakage through public manifest. |
| Full runtime visual/font pack | ≤5 MiB compressed | Optional assets loaded on demand; raw masters never shipped. |
| Full 12-tick recomputation | p95 ≤10 ms on the reference midrange device | Pure evaluator only; measure representative three-actor maps and repeated edits. |
| Local edit feedback | Visible within 50 ms | Network save acknowledgement may follow; label it honestly. |
| Forward playback | Aim 60 fps; no sustained drop below 30 fps on supported midrange hardware | Logic remains exact even if rendering falls behind. |
| Idle board | No continuous render loop | Render only changes; no permanent particle or audio synthesis activity while disabled. |
| Decoded raster memory | ≤32 MiB for currently retained assets | Release unused large images/atlases; do not count compressed download size as decoded memory. |
| Steady JS heap | Target ≤64 MiB in a measurable representative Chromium run | Record actual instrumentation; do not pretend this is the entire Telegram/WebView process memory. |
| Save/run server processing | p95 ≤100 ms under the agreed staging load | Excludes external network/platform calls; separately measure end-to-end acknowledgement. |
| End-to-end normal save/verification | p95 ≤500 ms on the defined healthy network profile | Slower responses show pending state, not false failure or duplicate requests. |

Do not meet budgets by dropping accessibility controls, reducing cell targets, omitting Russian text, accepting client scores, or deleting essential state. First reduce unnecessary libraries, oversized art, eager loading, repeated recomputation, and DOM churn.

### 16.2 Compatibility matrix

Support current stable Telegram iOS, Android, Desktop, and Web clients at release, plus the previous still-supported client versions where practical. Record exact versions actually tested; this document does not assert which device/client combination has already passed.

Reference browser build floor: ES2020-capable code targeting at least Safari 16.4 and Chromium 115, with feature detection for newer WebView/Telegram APIs. Reconfirm that floor against the operator's actual audience and build tools. Optional API absence must degrade gracefully; an obsolete insecure client may be asked to update without losing the saved plan.

| Test environment | Required emphasis |
|---|---|
| Small iPhone/SE-size portrait | 320–375 px effective layout, safe areas, audio unlock, background/return, long RU sheets |
| Modern notched iPhone | Content-safe-area changes, fullscreen optionality, keyboard/focus, lock/unlock |
| Midrange Android phone | Input latency, 12-tick replay, WebView audio, system Back, low-memory recovery |
| Larger Android phone/tablet | Responsive layout, three-actor overlap, landscape/reflow |
| Telegram Desktop on Windows/macOS | Keyboard-only tutorial/editing, focus, wheel/scroll, settings persistence |
| Telegram Web in supported browsers | Embedding/CSP, storage/cookie restrictions, auth transport, share fallback |
| Standalone desktop browser | Clearly labeled practice/development behavior; no fake Telegram identity |
| VoiceOver/TalkBack and keyboard | Shell/control semantics and real support boundary; dedicated nonvisual play testing before broader claims |

Also test 390×844, 320×568, 360×800, 430×932, and a 1280×800 desktop layout; 200% text zoom; reduced motion; high contrast; sound muted; slow/offline transitions. Viewport emulation supplements but does not replace real Telegram devices.

### 16.3 Loading, caching, and update behavior

Load the shell, both language resources, required font subsets, current level, and essential board/token assets first. Lazy-load other chapter art, store previews, optional music, and share-card exports. Show a readable board fallback if decoration fails.

Static hashed assets use immutable caching. The app shell, public manifest pointers, capabilities, auth, owned state, and payment status use appropriate non-stale policies. Private API responses must not be stored in a shared CDN cache.

A new client build must honor existing rules/content pins and protocol compatibility. Do not serve a new map under an unchanged content URL/hash. If an asset is missing after deployment, roll back/fix the manifest rather than force every player to lose progress.

### 16.4 Development and production configuration

The implementation must supply an `.env.example` with names, descriptions, and harmless placeholders—not secrets. Separate public client settings from server secrets. In particular, no bot token, database credential, or platform service secret may receive a public client prefix or appear in a source map.

| Setting | Scope / required input |
|---|---|
| `APP_ENV` | Server/build mode: development, test, staging, production |
| `PUBLIC_APP_ORIGIN` | Operator's actual HTTPS game origin in production |
| `TELEGRAM_BOT_USERNAME` | Public configured bot identity for real launch/share links |
| `TELEGRAM_APP_SHORT_NAME` | Optional only when using a named Mini App rather than the main app |
| `TELEGRAM_BOT_TOKEN` | Server secret; never a frontend value |
| `TELEGRAM_WEBHOOK_SECRET` | Server secret for trusted webhook delivery verification |
| `DATABASE_URL` | Server secret for the real durable store |
| `PLATFORM_MODE` | Explicit standalone/reference or Stark-integrated mode |
| `PLATFORM_API_URL` / `PLATFORM_SERVICE_TOKEN` | Actual operator-supplied integration endpoint/secret when required; not guessed URLs |
| `PAYMENTS_ENABLED` | False until commercial configuration and real adapter tests are approved |
| `COSMETIC_SET_PRICE_XTR` | Approved integer price; proposed baseline 75 |
| `SUPPORT_PRICE_XTR` | Approved integer one-time support price; proposed baseline 25 |
| `SUPPORT_URL` / `PRIVACY_URL` | Actual operator/platform destinations with working content |
| `ALLOWED_EMBED_ORIGINS` | Tested, explicit host/Telegram embedding origin allowlist |
| `OPTIONAL_ANALYTICS_ENABLED` | False until collection/consent policy is approved |
| `BUILD_VERSION` | Immutable build identifier exposed safely in support/version UI |

Production startup fails on missing required secrets/configuration or enabled development auth/payment bypasses. Optional unavailable features have explicit capability states; a disabled required integration remains an unresolved release gate.

### 16.5 Reproducible developer workflow

The future implementation must expose documented equivalent commands to:

```text
pnpm install --frozen-lockfile
pnpm setup
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm test:content
pnpm test:integration
pnpm test:e2e
pnpm assets:validate
pnpm build
```

These are required workflow outcomes, not commands claimed to exist in the documentation-only repository today. Setup prepares the declared database/dependencies and isolated test data safely and idempotently. It does not seed a production customer database, silently require undisclosed paid accounts, or install unrelated global tooling.

Reference development ports are web 5173 and API 3001, with same-origin `/api` proxying; PostgreSQL is a backing service, not a public preview. Production uses a real HTTPS reverse proxy/origin serving the app and API. Document whichever effective setup/run commands the actual repository uses and keep them reproducible for another agent.

A local practice/test identity must be clearly labeled and isolated from production users/ledger. Unit/content tests must run without real bot/payment secrets. Staging platform tests use approved test identities and Telegram's supported test payment environment; never charge an unsuspecting real user to test a success state.

### 16.6 Deployment and rollback

1. Validate schemas, locales, assets/licenses, content certificates, unit/integration/browser suites, and production build.
2. Apply backward-compatible migrations before the new app relies on them. Prefer expand/contract changes; do not drop columns required by active older sessions in the same release.
3. Publish immutable content/art/build assets and verify their hashes/availability.
4. Deploy a compatible server/rules registry, then client shell pointers.
5. Verify HTTPS, safe CSP/headers, auth, saves, a real pinned-level delivery, result outbox, and approved test purchase/restore flows in staging and a controlled production smoke path.
6. Observe errors/mismatches before broad rollout.
7. Keep the previous working build/evaluator/content available for rollback without reversing valid completion/payment ledger entries.

Set a restrictive CSP tested against the real embedding mode: game-owned scripts/assets, the required official Telegram bridge origin, same-origin API connectivity, no plugins, no unsafe injected HTML, and explicit allowed ancestors. Do not block Telegram Web accidentally with a blanket `X-Frame-Options: DENY`, or “fix” it by allowing arbitrary embedding/script origins.

Use durable PostgreSQL settings and tested backups. Proposed disaster-recovery target: backup/PITR design with ≤15-minute RPO and ≤4-hour restore objective, subject to operator infrastructure approval. Those disaster targets are distinct from the normal guarantee that acknowledged state survives app closure and ordinary server restarts. Test restoration with isolated synthetic data.

### 16.7 Observability and operational runbooks

Collect minimal structured reliability events: build/rules/content identifiers, correlation ID, operation category, outcome/error code, duration, queue/retry count, and safe aggregate counts. Redact auth headers, init data, private action bodies, payment identifiers, and personal data.

Release-blocking signals: any unexplained client/server evaluator mismatch, duplicated completion/entitlement grant, cross-user state access, or silently lost acknowledged plan. Operational alerts should also cover sustained database errors, outbox backlog, payment-webhook failures, asset 404 spikes, and significant save latency.

Required runbooks:

- **“My route disappeared”:** identify account/session and acknowledged revision through authorized support; reconcile receipt versus local queue; do not overwrite server state from an unverified screenshot.
- **“Paid, not owned”:** inspect the owned order/provider receipt and outbox; reconcile idempotently; never advise a second payment before checking the first.
- **“Refunded appearance still active”:** reconcile entitlement/equipment caches against unrefunded grants; preserve score/progress.
- **“Gate behaves differently”:** collect safe version/hash/correlation evidence; reproduce exact commands in the evaluator; do not patch movement based only on an animation video.
- **“Old session will not load”:** distinguish auth expiry, missing cache, protocol mismatch, and retired rules; offer the correct free recovery path.
- **“Blank/missing art after deploy”:** verify content-hashed manifest/CDN assets and rollback compatibility; do not reset user data.

### 16.8 Product analytics plan

If approved, instrument: launch ready, tutorial step/skip/finish, level opened, preview played/stepped/scrubbed, echo kept/replaced, hint tier disclosed, run predicted/verified/failed, next level started, save conflict/recovery, cosmetic preview, purchase pending/confirmed/refunded, and voluntary share invocation.

Use counts/durations/level IDs and assistance classes rather than full command routes or personal content. Separate predicted and verified success; deduplicate result/payment events. Do not interpret self-reported satisfaction or a simulated persona as observed retention.

Initial questions: where the plate-sampling explanation fails, whether players use step/scrub to resolve confusion, whether setup routes feel repetitive, and whether another level is started voluntarily. Monetization analytics must not become a reason to add paid hints or coercive prompts.

## 17. Verification and acceptance matrix

### 17.1 Verification layers and evidence honesty

1. **Document/content arithmetic:** the checks actually performed for this specification are reported in §10.5.
2. **Rules implementation:** unit/property tests and client/server parity on the actual future rules package.
3. **Persistence/API:** database-backed concurrency, idempotency, ownership, and recovery tests.
4. **Product UI:** automated interactions plus fresh visual inspection at required sizes/languages.
5. **Telegram/platform:** real client lifecycle/auth/share/audio and actual staging integration contracts.
6. **Human review:** EN/RU review, visual/audio review, accessibility support assessment, and the 12-player study.

Passing one layer does not imply the next. A generated screenshot is not a running UI, a mock payment is not a verified charge, 100 identical buggy evaluations are not an independent correctness proof, and a recording without inspected assertions is not an acceptance result.

### 17.2 Source SRS acceptance tests, preserved

| Source test | Implementation fixture/action | Required result |
|---|---|---|
| G01-A01 — F02/F05 | E05: Echo 1=`SSN`, LIVE=`E.ENENE`; inspect ticks 2–4 | A opens from the pre-move sample; echo leaving and live entering at tick 3 succeeds; subsequent new entry without occupancy fails. |
| G01-A02 — F03/F05 | E04: echo crosses P before/without a collecting live route; inspect overlap | Parcel remains until LIVE collects; overlap/crossing has no collision. |
| G01-A03 — F04 | Two slots full; request keep without valid replacement target | Reject, preserve both original echoes, no transient third echo. |
| G01-A04 — F05 | E02 reference: tick 8, one echo/two takes; retry the same completed request | Exactly 130 points; one completion grant/XP event at most. |
| G01-A05 — F06 | Acknowledge edit to command 7; close/reopen | Same live commands, echo identities/selection context, assistance and pinned versions; no invented acknowledgement. |
| G01-A06 — F07 | Request first hint with zero Stars | Free disclosure after assistance acknowledgement; Assisted only, no payment requirement. |
| G01-A07 — F01/F08 | Complete tutorial and leave using keyboard with Russian UI | No clipped critical controls, inaccessible step, mandatory share, or unnecessary clean-exit confirmation. |

### 17.3 Rules and scoring suite

| ID | Case | Pass condition |
|---|---|---|
| QA-R01 | Parse every campaign/tutorial map | Correct dimensions/IDs/links; no unsupported or overlapping semantic tiles. |
| QA-R02 | Invalid direction, null command, fractional index, 13 commands | Typed rejection, no truncation or silent conversion to wait. |
| QA-R03 | Boundary/wall-blocked movement | Remains in current cell; consumes command/tick; next command executes normally. |
| QA-R04 | Arrival on a plate | Linked gate first opens at the next tick sample, not during arrival movement. |
| QA-R05 | Leaving a sampled plate | Gate remains open for that entire tick, closes at next unoccupied sample. |
| QA-R06 | Actor inside a closed gate | Can wait, attempt a blocked exit without being crushed, or leave to a valid cell. |
| QA-R07 | Closed gate to another closed gate | Target entry still blocked. |
| QA-R08 | Simultaneous overlap/same-edge crossing | No collisions/pushing; actor enumeration order cannot change mechanics. |
| QA-R09 | Short live/echo sequences | Implicit waits through 12; explicit waits distinguished in trace; final-cell plate hold persists. |
| QA-R10 | Echo crosses parcel/exit | No pickup, carry, delivery, or double completion. |
| QA-R11 | LIVE visits exit before parcel | No success; may pass through and deliver later after pickup. |
| QA-R12 | Immediate delivery termination | No commands/events after terminal tick; trace stops there while frozen authored input remains available. |
| QA-R13 | E18 current-context divergence | Exact differing tick/positions in §10.5; no snap to recorded historical path. |
| QA-R14 | E23 shared controller | a opens both A and C; IDs unique; B remains independently controlled by b. |
| QA-R15 | Empty draft versus explicit wait | Empty preview inspection allowed; empty keep/run rejected; one explicit wait is valid. |
| QA-R16 | Score examples and all 24 references | Exact listed integer results; replacements/failures/thinking time never inflate takes used. |
| QA-R17 | Redundant active echo | Still counts; no causal-necessity inference or hidden enabled flag. |
| QA-R18 | Standard/Assisted/Study outcomes | Correct bracket eligibility; Study no ranked total; verified completion/mastery behavior matches §4. |
| QA-R19 | Equal scores and versions | Shared competition rank with no timing/payment tie break; incompatible versions never compared. |
| QA-R20 | E22 primary/alternate solutions | Both accepted; 120 versus 125 as specified; do not compare commands to one answer key. |

Property tests should also assert: every actor remains on a valid cell; no actor moves more than one orthogonal cell per tick; parcel ownership changes at most once and only to LIVE; gate openness depends only on sampled plate occupancy; deterministic input gives identical trace/hash; score lies on the formula's five-point increments; and absence/presentation of an echo does not get confused with slot renumbering.

### 17.4 Preview, editing, and accessibility suite

| ID | Case | Pass condition |
|---|---|---|
| QA-U01 | Tap and keyboard compose/edit/insert/delete | All 12 slots operable without dragging; no hidden holes or accidental repeats. |
| QA-U02 | Edit from paused/playing preview | Return to planning, reset/invalidate preview correctly, preserve intended authored commands. |
| QA-U03 | Step/scrub/rewind | Exact phase facts, no plan/echo/assistance/reward mutation and no burst of historical audio. |
| QA-U04 | Keep/replace/remove/cancel | Correct identity/reset warning; atomic chosen-slot change; cancel leaves state unchanged. |
| QA-U05 | Undo/redo across keep/restart | Restores plan only; cannot lower assistance or undo a verified reward/payment. |
| QA-U06 | Three actors overlap | All identities discoverable by number/pattern and occupant list; no color/opacity-only distinction. |
| QA-U07 | 390 px and 320 px layouts | Actual cell hit boxes ≥44 px; no obscured sticky controls or clipped board. |
| QA-U08 | Russian, large text, keyboard focus | Readable wrap, correct focus/order/restoration, no unavailable essential action. |
| QA-U09 | Reduced motion/high contrast/sound off | Full rule comprehension and functionality preserved without travel animation/color/audio dependence. |
| QA-U10 | Result breakdown and E24 | Correct tick/echo/assistance/score; Replay/Next/Exit; E24 returns to selection, not E25. |
| QA-U11 | Clean versus dirty Back/close | Confirmation only for unacknowledged game edits; no forced share or repetitive clean-exit dialog. |
| QA-U12 | Board-cell/command/occupant lists | Correct semantics, roving focus, bounded announcements; actual assistive-tech support documented. |
| QA-U13 | Generated raster art and cosmetics | Final assets match direction/identity/contrast; no SVG/emoji placeholder controls or baked functional text. |
| QA-U14 | Audio/haptic lifecycle | Explicit opt-in, bounded mix, mute persistence, no background/catch-up noise, no gameplay dependency. |

### 17.5 Saving, assistance, and reliability suite

| ID | Case | Pass condition |
|---|---|---|
| QA-S01 | Acknowledged edit/echo then forced close | Exact canonical attempt restored. |
| QA-S02 | Local edit before acknowledgement | Clearly pending; recover if possible, never promise server save. |
| QA-S03 | Request applied but response lost | Same action retry returns original receipt; no duplicate echo/revision/grant. |
| QA-S04 | Same action ID with changed body | Idempotency mismatch, no new mutation. |
| QA-S05 | Two devices/tabs, including simultaneous attempt creation | One active attempt per exact context; stale base/new-attempt replacement rejected; no silent last-write-wins or crossed echo replacement. |
| QA-S06 | Rebase pending local intent | New approved envelope with correct still-next sequence; no lost or duplicated intent. |
| QA-S07 | Hint retry/direct tier skip | Same hint returned on retry; no accidental two-tier jump; disclosure order enforced. |
| QA-S08 | Hint/Study then restart/undo/reload | Tier remains monotonic in the same attempt; full reveal cannot be “undone” into Standard. |
| QA-S09 | Offline predicted success | Pending verification only; no ranked result/grant until canonical replay accepted. |
| QA-S10 | Server completed while UI closed | Stored result recovered once without resubmitting/granting again. |
| QA-S11 | Compatible content update | Old attempt continues on pinned content/rules. |
| QA-S12 | Incompatible retirement | Clear explanation and free new attempt; old commands not remapped silently. |
| QA-S13 | Storage denial/corruption/account switch | Safe warning and account isolation; acknowledged server data retained. |
| QA-S14 | Platform outage/outbox redelivery | Game result remains verified; integration pending/retries idempotent. |
| QA-S15 | Concurrent distinct-level completions | Exactly one grant for each level and each newly reached mastery threshold. |
| QA-S16 | Inactive-session expiry | Explicit expired state/copy and free new attempt; prior results/receipt identity remain safe; no silent reset or renewed reward. |

### 17.6 Security and payment suite

| ID | Case | Pass condition |
|---|---|---|
| QA-P01 | Forged/tampered/expired/future init data | Authentication rejected; official fresh valid examples accepted. |
| QA-P02 | Reordered init fields, encoded Unicode, signature field, duplicates | Correct HMAC canonical handling; no unsafe JSON reserialization/duplicate-key ambiguity. |
| QA-P03 | Other user's session/result/order | No unauthorized read/write or existence disclosure. |
| QA-P04 | Forged score/position/content/assistance | Server derives canonical result; no client authority. |
| QA-P05 | Exact-price Stars invoice | Correct SKU/payer/currency/integer amount; no physical delivery/fiat/TON/recurring flow. |
| QA-P06 | Native paid callback without trusted receipt | No entitlement grant. |
| QA-P07 | Duplicate/late/out-of-order payment events | One logical grant; correct pending/paid/refunded state independent of event order. |
| QA-P08 | Cancel, timeout, interrupted checkout | No false purchase/failure; safe status recovery before another charge. |
| QA-P09 | Refund/restore/repurchase | Correct net entitlement/equipment; no score loss or required wallet. |
| QA-P10 | Pre-checkout ownership/amount/expiry failure | Fast explicit rejection within provider deadline; no unintended charge. |
| QA-P11 | Payment support and charge retention | Real `/paysupport`/support route and authorized refund reconciliation work. |
| QA-P12 | Deep-link injection/expiry/version mismatch | Safe target resolution or explained level-select fallback; no arbitrary redirect/mutation. |
| QA-P13 | Secrets/CSP/production bypass scan | No secrets or test auth/payment grants in public build; embedding still works. |
| QA-P14 | Free features with no balance/wallet | Tutorial, all levels, hints, resets, undo, completion remain available. |
| QA-P15 | Purchase creation retry/race/stale offer | Same key returns one order; changed request rejected; concurrent keys cannot create overlapping non-consumable invoices; no unapproved price change. |

### 17.7 Content certification and regression policy

For each level/rules/content revision, the implementation must produce a certificate containing immutable IDs/hashes, reference input, terminal tick/score, ordered trace/hash, solver/checker version, searched helper counts/horizon, minimum-echo evidence where claimed, 100-repeat determinism outcome, and test execution environment.

Check browser and server evaluators against the same frozen fixtures. Also use a separately reviewed checker/solver or independently encoded golden cases, so one shared bug is not validated by calling the same function twice. Record raw search/trace artifacts privately; keep a concise review summary with the release.

Changes to mechanics require a rules version and updated parity tests. Changes to maps/links require a content version and fresh certificates. Translation/art-only edits must demonstrate unchanged mechanical hashes. Never weaken a fixture to make a surprising mismatch disappear without explaining the intended rule change.

### 17.8 Human study protocol

Recruit 12 target-audience participants with informed consent and minimal retained personal data. Do not replace participants with fictional personas or AI-generated quotes. Record device/language, prior puzzle familiarity, task observations, and anonymized findings.

Procedure:

1. Let each participant launch and complete/skip the tutorial without coaching beyond the actual product.
2. Show a fresh plate/gate example and ask them to explain what happens when an actor arrives on a plate, and when it leaves during another actor's gate-entry tick.
3. Count timing understanding only if they correctly explain **arrival affects the next sample/movement, and leaving after a sample does not cancel that tick's opening**. A guessed correct outcome without an explainable model is not automatically a pass.
4. State neutrally that they may stop or play another level. Do not reward continuation, require Next, or count an automatic navigation as voluntary choice.
5. Observe one more level if chosen; note confusion, unnecessary setup chores, ability to use preview/step/scrub, and perceived fairness.
6. Document failures and improvements with anonymized evidence. Predefine handling of technical failures/rescheduled sessions; do not discard inconvenient participants to meet the threshold.

Gate: at least **9/12** demonstrate the timing model and at least **7/12** voluntarily begin another level. If not, revise teaching/preview/feedback before expanding/publishing the campaign and retest the changed experience. This study does not establish long-term retention, monetization conversion, or originality.

### 17.9 Requirements traceability

| Source requirement/area | Master specification coverage | Principal acceptance evidence |
|---|---|---|
| G01-F01 command ribbon/editing | §2.4, §3.2–3.4, §6.3 | G01-A07, QA-U01/U02/U05/U08 |
| G01-F02 deterministic ordered preview | §2.5–2.7, §3.5, §12.3/12.6 | G01-A01, QA-R04/R05/R13, QA-U03 |
| G01-F03 echo identities/overlap | §2.3, §6.5, §7 | G01-A02, QA-R08, QA-U06/U12/U13 |
| G01-F04 explicit replacement/no empty echo | §3.7–3.8, §12.8 | G01-A03, QA-R15, QA-U04, QA-S03/S05 |
| G01-F05 authoritative replay/once-only grant | §2, §4.1–4.2, §12–15 | G01-A01–A04, QA-R16–R20, QA-P03/P04, QA-S15 |
| G01-F06 acknowledged save/recovery | §3.1, §6.7, §13 | G01-A05, QA-S01–S06/S09–S14 |
| G01-F07 free hints/Study | §4.3–4.4, §10.4/10.6, §11 | G01-A06, QA-R18, QA-S07/S08, QA-P14 |
| G01-F08 results/next/replay/exit/share | §6.6, §11.4, §14.9 | G01-A07, QA-U10/U11, QA-P12 |
| SRS §2/§7 content/progression | §1.5, §4.5, §5, §10 | 24 content certificates, exact category counts, human study |
| SRS §5 art/accessibility | §6–9 | Layout/contrast/keyboard/assistive-tech/audio review |
| SRS §8 commerce/wallet | §8.4, §14.5–14.8 | QA-P05–P11/P14, real platform payment suites |
| SRS §9 localization | §10.4, §11 | Complete EN/RU resources and human review |
| SRS §10 version/idempotency/expired links | §12–14 | QA-S03–S06/S11/S12, QA-P12 |
| SRS §11 release/research gate | §17–18 | Actual recorded results, no simulated evidence |
| Missing shared GAME/PAY/WAL/L10N/SEC/NFR/MKT-GAME-02 | §0.1/0.5, §14.4, §18.4 | Supplied platform contracts and their real staging suites; currently not established |

## 18. Implementation sequence and definition of done

### 18.1 Execution plan for the future implementation agent

Work in these dependency-ordered stages. Do not spend the whole budget generating decorative images before the gate timing is correct, and do not call a gray-box prototype the finished game.

| Stage | Deliverable | Exit criterion |
|---|---|---|
| 1 — Contract extraction | Read this master, source requirements, available platform contracts; record operator inputs and exact dependency choices | No hidden assumptions about rules, IDs, score, auth, or payments; missing real services identified. |
| 2 — Rules/content foundation | Typed pure evaluator, schemas, imported 24 levels/tutorials, independent checker and golden fixtures | All reference solutions and edge cases pass; client/server trace format agreed; no unexplained divergence. |
| 3 — Functional board/editor | Responsive accessible board, ribbon/picker, preview controls, echo slots/replace/reset/undo | Complete E01/E05/E18 interaction flows without drag or cosmetic dependency. |
| 4 — Persistence/authority | Real database, auth/reference adapter, revisions/outbox, verified runs/progression/mastery | Forced-close, conflict, duplicate, assistance and version-recovery suites pass. |
| 5 — Complete campaign UX | Tutorial, all hints/Study, level select, results, Settings, EN/RU, optional-use sharing | All 24 levels playable; full flows/copy/edge states present. |
| 6 — Final art/audio | Coherent raster generation/export, manifest/licenses, 20 SFX and optional music/haptics | Actual-size visual/audio review, no placeholders or unverified rights in release assets. |
| 7 — Commerce/platform | Exact cosmetic set, equipment, real Stars order/restore/refund/support and platform result adapters | Staging contract/payment suites pass; no fake paid callback authority or wallet dependency. |
| 8 — Hardening | Browser/device/accessibility/performance/security tests, deployment and rollback tools | Required technical gates pass with fresh artifacts and measured results. |
| 9 — Human release review | EN/RU/art/audio review and target-player study | Findings recorded; failed timing/continuation gates resolved and retested. |
| 10 — Handoff | Reproducible commands, deployment config, operator/runbook notes, evidence and remaining blockers | Completion status uses the precise definitions below; no hidden unfinished feature. |

Stages may overlap where independent, but their exit criteria cannot be skipped. Keep changes reviewable, follow actual repository conventions, and do not introduce unrelated marketplace/infrastructure scope.

### 18.2 Required implementation deliverables

The final implementation handoff includes:

- Complete runnable client and authoritative service/adapters—not static screens only.
- Exactly 24 imported, validated campaign levels plus the separate tutorial fixtures.
- Every required interaction/empty/error/pending/recovery state specified here.
- Complete EN/RU resources, 72 hint steps, reference Study data, and human-review findings.
- All required raster/font assets, generated/procedural source records, optimized exports, manifest, and legal notices; no undisclosed borrowed art.
- Complete SFX mapping/generation/review exports; optional music only if genuinely implemented and reviewed.
- Database schema/migrations, validated API contracts, auth, session/revision/outbox behavior, verified result/progression/mastery logic.
- Cosmetic catalog/equipment and real approved payment/result integrations or clearly named blocked gates.
- Automated rules/content/integration/browser suites and independent content certificates.
- Fresh visual evidence for representative finished screens and recorded interaction/test assertions; video only when requested/appropriate and safely shareable.
- Measured performance and actual device/client compatibility report, not a guessed “works on mobile” statement.
- Reproducible setup/run/build/test/deploy/rollback instructions, `.env.example`, support/refund/recovery runbooks, and an operator checklist.
- A concise final completion report listing what was implemented, what actually passed, what was not tested, and any external blockers.

Generated private prompts/media, participant notes, secrets, test receipts, and customer information are not automatically public handoff artifacts. Publish only suitable redacted/synthetic evidence with authorization.

### 18.3 Definition-of-done checklist

- [ ] Rules exactly match §2, including implicit waits, simultaneous sampling, closed-gate behavior, and command replay divergence.
- [ ] All 24 levels have valid reference witnesses/certificates; category counts are 6/8/6/4; no forced answer-key matching.
- [ ] The tutorial demonstrates a useful first echo and teaches next-tick timing without requiring sharing/payment.
- [ ] Plan editing, undo/redo, preview/step/scrub, keep/replace/remove/reset and all results flows work by tap and keyboard.
- [ ] Echo identity/overlap is clear without color/opacity alone; the board fits at 390 px and respects ≥44 px targets.
- [ ] Acknowledged edits recover after close; unacknowledged edits are visibly pending; conflicts never silently overwrite.
- [ ] The server verifies results, enforces assistance, and grants completion/mastery once; retries/version changes cannot farm grants.
- [ ] Standard/Assisted brackets and Study treatment are correct; hints/restarts remain free with no Stars/wallet.
- [ ] All core screens, 24 titles, 72 hints, errors, settings and commerce are fully localized and human-reviewed in EN/RU.
- [ ] Final raster assets/audio exist and pass actual-size/lifecycle review; licenses/provenance are complete; no SVG or placeholder UI assets remain.
- [ ] Exact cosmetics are previewable/equippable and refund safely; real Stars purchase/support/restore flows pass approved tests.
- [ ] Real platform integration suites pass where required; optional Profile/TON association remains outside game logic.
- [ ] Safe-area/background/auth/audio/share behavior is verified on actual supported Telegram clients.
- [ ] Security, performance, accessibility support, deployment/rollback, and backup/recovery gates pass with recorded evidence.
- [ ] The 12-player study and its 9/12 and 7/12 gates are evaluated honestly, with redesign/retest if needed.
- [ ] No required button is dead, no required service is secretly mocked, no unpublished operator dependency is presented as complete.

These boxes are intentionally unchecked in this documentation-only delivery. They are the future implementation/release checklist, not claimed completed work.

### 18.4 External readiness gates and owner inputs

| Gate | Needed input/evidence | If unavailable |
|---|---|---|
| DEP-01 | Actual Stark Games platform SRS/API contracts and integration environment, if embedded | Implement/reference-test adapters, but mark platform compatibility incomplete; do not invent passed shared suites. |
| DEP-02 | Real Telegram bot/app identity, secret, domain and launch configuration | Develop/test safely in isolated mode; no production auth/share/payment claim. |
| DEP-03 | Hosting, durable database, secret storage, backups, allowed origins | Local runnable delivery possible; production deployment/recovery unverified. |
| DEP-04 | Approved 75-Star cosmetic price and one-time support configuration | Disable actual checkout honestly; full commerce release gate remains open. |
| DEP-05 | Privacy/support/legal destinations and payment support ownership | Do not claim commercially ready operation without a real support/refund route. |
| DEP-06 | Commercial rights for selected generated/third-party art/audio/fonts | Replace or obtain evidence; no unlicensed final bundle. |
| DEP-07 | Real target-player participants and documented observations | Technical implementation may be complete; product-validation gate remains unpassed. |
| DEP-08 | Fluent EN/RU human review | Draft localization may ship only in an explicitly labeled non-final test build. |
| DEP-09 | Any later approved visual design the owner elects to provide | Use this coherent baseline while developing; identify design approval status rather than pretending another AI's mockup was reviewed. |

### 18.5 Honest completion labels

Use one of these precise reports:

- **Implemented and locally verified:** code/content/assets exist; named local tests pass; external/device/human gates listed separately.
- **Staging verified, release gates pending:** actual integrations and device paths tested in staging; remaining operator/legal/human gates explicitly named.
- **Production-ready:** all applicable required checklist items and real external gates have evidence; nothing essential is hidden behind a mock or unapproved assumption.

Do not say simply “finished” if a required service is a stub, half the levels are placeholders, assets are unlicensed, or the only verification was compilation. Conversely, do not fabricate user studies or production credentials to make a checklist appear complete.

### 18.6 Scope-change policy

Future daily variants require solver-proven families and human review. Friend ghost challenges require a separate validated replay/sharing/privacy contract. Neither is smuggled into v1 through a placeholder screen or a “small extra” feature.

Any change to board size, tick limit, echo count, gate semantics, assistance policy, formula, paid benefits, or completion authority is a product/rules revision, not an aesthetic adjustment. Update this master, content certificates, migrations/adapters, localization, and acceptance cases together.

## 19. Research and source register

Sources were consulted during authoring on 14–15 September 2026. Primary documentation is preferred for platform behavior; specific downloaded font/sound files were checked as stated. These sources support implementation choices, not claims of uniqueness, retention, artistic quality, or a passed release.

| ID | Source and URL | Relevance / qualification |
|---|---|---|
| R00 | Supplied `01_Echo_Courier_SRS.md`, SG-G01 v1.0, 8 September 2026 | Product/rule/MVP source. Its missing platform dependency/Appendix A were not available and are not silently reconstructed. |
| R01 | Telegram Mini Apps: <https://core.telegram.org/bots/webapps> | Official bridge, init-data validation, lifecycle, safe areas, invoice/share/navigation capabilities. Recheck relevant capabilities at implementation/release. |
| R02 | Telegram payments for digital goods/services: <https://core.telegram.org/bots/payments-stars> | Official Stars/XTR requirement, payment authority, support/refund obligations and test environment guidance. |
| R03 | Telegram Bot API: <https://core.telegram.org/bots/api#payments> and <https://core.telegram.org/bots/api#refundstarpayment> | Invoice, pre-checkout, successful-payment, charge ID, and refund method contracts. |
| R04 | MDN Web Audio best practices: <https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices> | Oscillator/buffer synthesis, reusable contexts, audio-loading/browser considerations. |
| R05 | MDN autoplay: <https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay>; visibility: <https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event> | Audible autoplay/user activation and background lifecycle behavior; real client testing still required. |
| R06 | WCAG 2.2: <https://www.w3.org/TR/WCAG22/>; minimum targets: <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html>; enhanced targets: <https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html> | Accessibility guidance, contrast, keyboard/focus, 24 px minimum versus enhanced 44 px distinction. This game deliberately requires 44 px targets. |
| R07 | Kenney Interface Sounds: <https://kenney.nl/assets/interface-sounds>; exact inspected ZIP in §9.6 | Official optional CC0 recording source; archive license/filenames/hash inspected, not acoustically auditioned in this task. |
| R08 | CC0 deed: <https://creativecommons.org/publicdomain/zero/1.0/deed.en> | Commercial copying/modification permission and retained-rights/endorsement caveats. |
| R09 | Noto Sans: <https://fonts.google.com/noto/specimen/Noto+Sans>; Fontsource 5.3.0 exact files/license in §8.7; SIL OFL: <https://software.sil.org/oflt/> | Latin/Cyrillic font selection, redistribution/notice obligations; inspected WOFF2/license hashes provided. |
| R10 | Node.js releases: <https://nodejs.org/en/about/previous-releases> | LTS runtime selection; exact implementation patch must be recorded. |
| R11 | React versions: <https://react.dev/versions> | React 19.2-compatible baseline; use an appropriate maintained security patch, not a guessed floating version. |
| R12 | Vite getting started: <https://vite.dev/guide/> | Tool/runtime compatibility and explicit browser-target considerations; lock the chosen compatible release. |
| R13 | OWASP Session Management Cheat Sheet: <https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html> | Session/token sensitivity, storage/transport and access-control review context; not a certification. |
| R14 | RFC 8785 JCS: <https://www.rfc-editor.org/rfc/rfc8785.html> | Deterministic JSON serialization for content/replay hashes; not ad hoc `JSON.stringify` object-order assumptions. |
| R15 | Community validator docs: <https://docs.telegram-mini-apps.com/packages/tma-js-init-data-node/validating>; inspected published implementation: <https://cdn.jsdelivr.net/npm/@tma.js/init-data-node@2.0.7/dist/entries/parsing-Cn-1lfce.js> | Secondary corroboration that bot-token HMAC excludes `hash` and retains other received fields. Community source, not Telegram authority; security wrappers/tests remain required. |

No runtime hotlinking is required for these references. Vendor selected legal assets into a controlled build pipeline and retain their evidence. If a URL/version/license changes, recheck the original publisher rather than substituting an unknown mirror or inventing availability.

## 20. Design and implementation handoff briefs

### 20.1 Brief for a separate design AI/designer

Copy this brief together with the full document when requesting a visual proposal:

> Design Echo Courier, a premium but approachable Telegram Mini App temporal planning puzzle. The supplied Master Game Development Specification is the functional source of truth. Create a coherent indigo postal-workshop identity with warm cream parcels, original compact courier automata, clear temporal ink patterns, and restrained material detail. Use original raster artwork (PNG/WebP); no SVG deliverables or generated text baked into gameplay assets.
>
> Produce home/level-select, a 390×844 planning screen, a three-actor overlap/tick-preview screen, a Russian hint/replacement sheet, and a result/cosmetics screen. Include a 320×568 narrow-screen and a wide-screen adaptation, high-contrast/reduced-motion notes, component states, spacing/type/color tokens, and crop/asset export guidance. Mockups may contain properly composed UI text, but reusable artwork must remain text-free and localizable.
>
> Preserve an exact 6×6 orthogonal board, a twelve-command ribbon, two numbered echo slots, 44 px minimum targets, readable LIVE/1/2 identities, solid/short-dash/dot–dash route patterns, separate Preview/Run/Keep actions, free hints, and a visible save/verification status. Use the document's actual E01/E18 geometry if showing a playable board; do not draw an attractive but invalid board or invent gates/commands.
>
> Gameplay state must be clearer than decoration. No persistent ghost blur, noisy particles, casino monetization, paid hint/echo controls, wallet CTA in the play flow, or forced sharing. Provide the visual system and implementation-ready raster asset references—not a redesign of the rules. Clearly label proposals versus approved assets.

### 20.2 Brief for the future coding/game-development agent

Copy this brief together with the full document when beginning implementation:

> Implement Echo Courier from this Master Game Development Specification. Read the full document before choosing architecture or creating assets. Deliver a complete playable Telegram Mini App and authoritative game service/adapters, not only a visual prototype. Preserve the specified rules, 24 exact levels, tutorial, scoring, assistance, persistence, free features, EN/RU, accessibility, cosmetics, and platform boundaries.
>
> Begin with the deterministic rules/content tests, then build the editor/preview/echo UX, server verification/save recovery, and the full campaign. Use your actual image-generation MCP tool to produce the required original raster assets; use the procedural sound recipes as the complete audio baseline, with only the vetted optional licensed recordings if useful. Maintain provenance and inspect final art/audio at actual use size. Do not use SVG artwork/icon dependencies.
>
> Reuse the actual repository/platform conventions and pin compatible dependencies. Treat this document's reference HTTP/adapter contracts as game-owned defaults, not evidence that Stark Games already exposes those endpoints. Obtain real bot/domain/payment/platform/legal inputs when needed; never fabricate secrets, integrations, entitlement grants, playtests, or verification evidence. Development mocks must stay explicitly isolated and must not count as production readiness.
>
> Reproduce the documented reference results and independent content checks; verify real client/server parity, forced-close/conflict/idempotency behavior, all EN/RU UI paths, real Telegram lifecycle/audio/safe areas, and approved payment/restore/refund flows. Keep a clear acceptance record. If a required external or human gate is unavailable, finish the unblocked implementation and report the exact blocker rather than pretending it passed.
>
> Finish with the reproducible setup/build/test/deploy workflow, generated assets/license manifest, content certificates, fresh inspected UI/interaction evidence, and a concise truthful completion report using §18.5. Do not add excluded future mechanics or monetization to compensate for unfinished required work.

### 20.3 Final authoring note

This document is deliberately comprehensive about the game and explicit about the boundaries of evidence. The intended next steps are optional visual design review and then a separate implementation task. The current delivery remains documentation only; the candidate content checks and source inspections do not imply that the game has already been built or released.

