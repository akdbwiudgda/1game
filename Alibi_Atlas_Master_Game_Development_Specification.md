# ALIBI ATLAS
# Master Game Development Specification

**English title:** Alibi Atlas\
**Russian title:** Атлас алиби\
**Product identifier:** SG-G05\
**Document version:** 1.0 — implementation baseline proposed for owner approval\
**Date:** 15 September 2026\
**Format:** Single-player Telegram Mini App; English and Russian\
**Source:** *Alibi Atlas — Software Requirements Specification*, SG-G05 v1.0, 8 September 2026, supplied by the owner\
**Deliverable of this assignment:** This specification only. No application, production assets, payment integration, or deployed game is claimed to have been built.

> **Creative promise:** A beautiful little mystery in which the most powerful move is not pointing at a person. It is pointing at two pieces of paper and saying: “These cannot both fit your story.”

> **Implementation-agent mandate:** Build the complete product described here, not a visual mock-up of the first screen. Preserve puzzle semantics, accessibility, free assistance, and server authority. Generate and finish the specified raster artwork and procedural sound. Implement, test, document, and package the whole experience. Never substitute a guessed answer, a client-side answer table, an unreviewed generated mystery, or a payment-gated clue for the requirements below. Report unmet external release gates honestly.

---

## Contents

1. Document authority, decisions, and boundaries
2. Product vision and player experience
3. World, narrative, and editorial direction
4. Launch scope, progression, and session structure
5. Formal puzzle rules and proof acceptance
6. Interaction design and complete screen specification
7. Visual design system and accessibility
8. Art production, asset manifest, and image-generation briefs
9. Audio, procedural recipes, and haptics
10. Application architecture and Telegram integration
11. Data model, APIs, persistence, and security
12. Economy, ranking, privacy, and sharing
13. Localization and player-facing interface copy
14. Content production and publication pipeline
15. Performance, testing, and acceptance criteria
16. Delivery plan, operations, and definition of done
17. Authored tutorial dossiers
18. Authored full-case dossiers
19. Source register, traceability, and final handoff

---

## 1. Document authority, decisions, and boundaries

### 1.1 Meaning of requirement language

- **MUST / MUST NOT** defines a release requirement.
- **SHOULD** is the default; deviation needs a recorded reason and equivalent quality.
- **MAY** is optional and cannot delay or replace a mandatory feature.
- A **target** is an intended measurable outcome, not an observation already established.
- An **authored candidate** is concrete implementation input that still needs the publication gates in §14. Mathematical checks do not establish literary fairness, localization quality, legal clearance, or user comprehension.

Sections containing answers, witnesses, proof sets, hints, and explanations are **production spoilers**. This document is a private development input. It MUST NOT be placed in the public web application's static directory or distributed to players before solving.

### 1.2 Source reconciliation

The supplied SRS is the originating product brief. This document makes its underspecified choices explicit; it does not silently claim access to missing documents.

| Decision | Baseline in this document | Reason / consequence |
|---|---|---|
| Platform SRS | `00_Stark_Games_Marketplace_SRS.md` was referenced but not supplied or found in this workspace. | §10–12 define a standalone implementation contract and narrow platform adapters. Shared-platform compliance remains unverified until that SRS is obtained. |
| Launch count | **12 dossiers total: 2 reduced tutorials + 10 full cases.** | Uses the source's explicit allowance for two reduced tutorials and makes the ten-full-case mastery milestone achievable. Do not quietly produce only ten dossiers or invent a thirteenth mandatory tutorial. |
| Full-case shape | 4 characters, 4 slots, 3 locations, 6 evidence cards. | Exactly as required. Tutorial exceptions are labelled and non-ranked. |
| Time model | Integer observation instants, not continuous occupancy intervals or wall-clock times. | Resolves ambiguity around two-slot journeys without adding an unmentioned fourth “in transit” location. |
| False evidence | Exactly one eligible testimony predicate is **false**, not merely removed from constraints. | Prevents a truth-telling suspect from passing a solver based on omission alone. |
| Crime opportunity | The false testimony's speaker is at the stated crime location at the stated crime slot. | This is a disclosed puzzle axiom, not a theory about real-world criminality. |
| Timeline completion | Useful working notes; not a compulsory 16-cell form before accusation. | A logically supported accusation can solve without filling irrelevant cells. |
| Full-case support standard | Two cards must establish both the falsehood and the crime opportunity, with each contributing to at least one conclusion. | Makes the fixed two-card proof meaningful and allows exhaustive alternative-proof acceptance. T01 has an explicit teaching exception. |
| Ranked attempt | First eligible full-case attempt per account and content version. | Replays cannot erase assistance or turn a reveal into a clean 100-point first solve. |
| Audio sourcing | Original procedural audio is the complete default; a verified CC0 source is an optional replacement route. | Avoids dependency on an unspecified stock-audio account or unverifiable download. |
| Art | Generated and finished raster illustration; no SVG assets or inline SVG. | Respects the owner's image-generation capability and preference. Semantic UI remains HTML/CSS. |
| Final visual review | This document specifies a coherent baseline. A later approved design reference may replace appearance, not logic or accessibility. | The owner plans a separate design exploration. Do not require that exploration to make the current specification actionable. |
| Stars | One cosmetic set, proposed 75 Stars; no gameplay purchases. | Actual sales require owner price approval and Telegram compliance testing. |
| Wallet | Optional platform-level TON association only if the platform already supplies a compliant integration. | No new wallet subsystem, token, or clue-payment flow is in game scope. |

Where the unavailable Platform SRS later conflicts with this document, produce a written reconciliation before integration. Do not guess platform XP amounts, account-merge rules, wallet-verification protocols, or global ranking APIs. The standalone game grants its own specified mastery and scores only; platform XP adapter defaults to no-op.

### 1.3 Explicit exclusions

No multiplayer synchronization, live competition, open-text accusations, public notes, user-submitted mysteries, procedural daily mysteries, AI-generated live dialogue, hidden-object pixel hunting, escape-room inventory puzzles, stamina, ads, loot boxes, subscriptions, speed rewards, paid hints, paid cases, purchased scores, gambling, voice acting, 3D scenes, gamepad certification, push-notification campaigns, or custom content-editor GUI.

An authoring CLI and reviewable structured case files ARE required. A developer preview is required during implementation, but it must never masquerade as authenticated production Telegram access.

---

## 2. Product vision and player experience

### 2.1 The game in one paragraph

The player is the evening reader at the Bellwether civic archive, where peculiar little thefts arrive as illustrated case folders. A missing festival stamp, a borrowed brass moon, a vanished piece of stage scenery: nothing graphic, but something meaningful to the people involved. Four people remember the same four moments differently. The player reads six short cards, arranges possible whereabouts, checks the journeys, and submits a precise contradiction. The reward is a lucid explanation, a quietly restored object, and one more completed page in the Atlas.

### 2.2 Experience pillars

1. **Prove, do not profile.** Names, expressions, occupations, clothing, and apparent nervousness never establish guilt. Timings and evidence do.
2. **A short story before a small machine.** Begin with an intriguing object and human stakes. Introduce the timeline only when it has a purpose.
3. **Tactile, not fussy.** Cards feel like paper, but every action works by tap and keyboard. No precision dragging, string-drawing, or tiny pins.
4. **One clean insight.** Each full case has an identifiable deductive idea. Difficulty comes from combining clear facts, not deciphering vague prose.
5. **Kind to interrupted attention.** Close Telegram, change language, return tomorrow: acknowledged work remains. No ticking countdown.
6. **A complete free experience.** All cases, all three hints, and full Study explanations are available without spending or connecting a wallet.
7. **Beauty with restraint.** Warm illustration, disciplined typography, small material sounds, and a satisfying explanation—not a wall of decorative detective clichés.

### 2.3 Target player and measurable hypotheses

- Primary audience: casual adult/teen mystery readers and logic-puzzle players using a phone during a short break. Content target: broadly family-friendly, approximately 12+ editorial sensibility; actual distribution rating is a platform/legal decision, not a certification made here.
- Full case target: 5–8 minutes for intended difficulty; the final cases may take 8–12 minutes. These are testing hypotheses, not timers or success conditions.
- Tutorial targets: T01 1–2 minutes; T02 2–3 minutes.
- Comprehension gate: at least 9 of 12 observed participants explain the decisive contradiction in their own words rather than merely name a suspect.
- Players must be able to solve in silence, in text-only mode, without color discrimination, and without dragging.
- A player who uses Study should feel taught, not punished. Study is an unranked reading mode, not a failed case.

### 2.4 A representative first session

The opening folder shows an empty recess where a small brass object should be. Beneath it: one sentence explaining why someone cares. The player taps **Open the dossier**, sees a reduced training example, and learns that card numbers are citations rather than collectibles. The first placement produces a soft paper contact. A contradictory route returns a calm sentence—“This journey needs two slots; only one is available”—with the relevant positions outlined. The player changes a hypothesis, presents a person, a statement, and two supporting cards. The recap animates no more than three restrained beats, explains why the statement cannot fit, and leaves a finished page that can be reread at any time.

The signature moment is the **Proof Spread**: the questioned quote at the top, two numbered cards beneath it, and a short route/time explanation between them. It is not an automatically revealing detective board. It appears with the actual accepted explanation only after solve or explicit Study reveal.

---

## 3. World, narrative, and editorial direction

### 3.1 Bellwether / Колоколье

Bellwether is a fictional waterside town with an archive, small performance venues, workshops, covered walkways, and a fondness for elaborate public occasions. Its visual period is intentionally gently timeless: paper records, electric lamps, contemporary accessibility, no identifiable real municipal insignia. The city is not a historical simulation; no knowledge of a particular decade is needed.

The player is never a coercive police officer. The archive reconstructs reported events and returns findings to a fictional civic custodian. Nobody is interrogated by the player, arrested on screen, threatened, or publicly shamed. The cases concern unauthorized taking, not murder or personal trauma. The rules deliberately identify one taker through one false testimony; the story must not pretend this is a universally valid real-world investigative method.

### 3.2 Emotional palette

Curiosity → manageable uncertainty → a precise incompatibility → understanding → humane closure.

Use wistfulness, civic absurdity, craftsmanship, mild embarrassment, and attachment to ordinary things. Humor lives in the object or situation, not in a suspect's accent, disability, age, income, nationality, or appearance. The culprit may have an understandable motive, but the ending does not endorse theft. A recovery/return line closes the material stakes.

### 3.3 Writing rules

- Evidence is literal. If a fact matters, state it in text and in the predicate. Do not hide a necessary time in an illustration, incidental audio, a tooltip, a caption shown only after purchase, or a character's expression.
- Use “at Slot 2,” not “around two,” “later,” “at dusk,” or actual device times. Flavor can name a bell, but the numbered slot remains explicit.
- Do not equate being at a location at two sampled moments with remaining there continuously between them.
- Records are authenticated in-world and publicly labelled **Record**. Only cards explicitly labelled **Testimony** are eligible to be the single false card. A testimony need not concern its speaker, but its speaker is always named.
- Default evidence length: 10–32 English words, up to 45 when a two-clause relationship needs it. Russian gets space, not smaller type. Maximum two atomic clauses per card in the launch set.
- No unreliable narrator outside the designated false testimony. The hook, crime rule, route table, UI, and recap are accurate.
- Motive and object-recovery prose never change which proof is accepted.
- Do not make every liar visually suspicious, every witness unusually smug, or every object a glowing “quest item.” Do not foreshadow the answer in art filenames or alternative text.
- Every character receives a name, role, portrait brief, and neutral introduction. Gender and appearance are not logic variables.
- Between cases, reuse the town's material language, not a repeated twist disguised with new nouns.

### 3.4 Narrative presentation limits

No branching dialogue tree is required. Character chips open a short identity panel and that character's testimony cards, not a simulated conversation. No voiceover. Optional flavor cannot exceed one extra sentence per character and one short closure paragraph. Evidence remains skimmable.

---

## 4. Launch scope, progression, and session structure

### 4.1 Dossier structure

| Group | IDs | Count | Rule shape | Ranked? |
|---|---|---:|---|---|
| First lesson | T01 | 1 | 2 characters, 3 slots, 3 locations, 3 cards | No |
| Route lesson | T02 | 1 | 3 characters, 4 slots, 3 locations, 4 cards | No |
| Full mysteries | C01–C10 | 10 | 4 characters, 4 slots, 3 locations, 6 cards | First eligible solve only |
| Total | T01–T02, C01–C10 | **12** | **67 evidence cards** | 10 eligible cases |

No daily rotation, expiration, or random card ordering. All full cases are free and visible from the archive. The recommended order is T01 → T02 → C01 … C10, but tutorials are skippable and full cases are not locked behind mastery. A returning experienced player can choose directly.

**The launch collection (production overview):** The deductive-emphasis column and the detailed teaching-purpose labels in §18 are editorial metadata, not spoiler-free catalog copy. The player sees the title and a generic Foundations / Applied / Advanced / Consolidation difficulty label, never a label that identifies the structure of the false testimony.

| ID | Dossier | The missing object | Deductive emphasis |
|---|---|---|---|
| T01 | The Brass Bookmark | Folded-fan brass bookmark | Same person, same moment, incompatible places |
| T02 | The Lantern Tag | Enamel lantern tag | A real middle site on a two-step route |
| C01 | Crossed Lanterns | Brass harmonic key | An arrival that is one interval too early |
| C02 | The Salt Ledger | Hand-cut silver seal | A shared position anchored by a record |
| C03 | Paper Moon | Hand-cut moon stencil | Two exclusions establish the remaining site |
| C04 | The Quiet Conductor | Mother-of-pearl baton cap | Two different complete proofs of one finding |
| C05 | Fern Glass | Fern-patterned glass tile | A later observation constrains an earlier alibi |
| C06 | Blue Thread | Rare blue-thread bobbin | Opportunity at the first sampled moment |
| C07 | Borrowed Weather | Pocket-barometer needle | Arriving on time is not arriving early |
| C08 | The Amber Dial | Brass shadow-caster for a sundial | One true clause does not rescue a false conjunction |
| C09 | The Last Caption | Engraved caption plate | Two companion records establish a route indirectly |
| C10 | River Without Ink | Sealed map-printing ink vial | A quiet consolidation case and narrative closure |

### 4.2 Progress representation

Each folder has exactly one primary badge: **New**, **In progress**, **Solved**, or **Studied**. Additional tags show difficulty, locale readiness, and “Practice” for a replay. A ranked solve badge is not overwritten by later Study reading. A studied first attempt stays ineligible for a ranked first solve, even after restarting.

Mastery is awarded for **1, 5, and 10 distinct full cases solved with accepted proof**, with or without hints. Tutorials, Study-only visits, and replay solves do not count. Badges: **First Finding / Первое доказательство**, **Steady Reader / Внимательный читатель**, **Keeper of the Atlas / Хранитель атласа**. No platform XP amount is invented.

The archive should show “4 of 10 mysteries solved” separately from “2 lessons completed.” No misleading 12-case mastery denominator.

### 4.3 State model

`NOT_STARTED → ACTIVE → SOLVED` or `NOT_STARTED/ACTIVE → STUDY`.

- `ACTIVE` can carry hint tier 0–3, a save revision, a selected hypothesis, and any partial timeline.
- `SOLVED` freezes the first eligible result and exposes the recap to that account.
- `STUDY` exposes the solution and has no ranked score.
- `PRACTICE` is a separate replay attempt kind, not a transition that rewrites the original result.
- `CONTENT_WITHDRAWN` is a publication state, not player failure. Preserve notes/results, explain the correction, and suppress unfair rankings.
- Paused, offline, saving, or error are connection/UI states; they never reset puzzle state or consume anything.

### 4.4 Difficulty ladder

T01 teaches a same-slot contradiction and the proof form. T02 teaches two-slot travel through an intermediate site. C01–C03 introduce travel, co-location, and exclusion. C04–C07 apply those skills with alternate proofs, backward constraints, and different crime moments. C08 adds a partly true compound statement; C09 links two people's recorded positions to a third person's route. C10 deliberately returns to a simple shared-position proof for narrative closure; it is not advertised as the hardest case. The appendix contains exact case rules; UI difficulty labels remain editorial hypotheses until observation.

Do not increase difficulty by reducing contrast, withholding route costs, adding a countdown, scrambling card order, or writing ambiguous translations.

---

## 5. Formal puzzle rules and proof acceptance

### 5.1 Entities and notation

For a full case:

- Characters `P = {p1,p2,p3,p4}`.
- Slots `T = {1,2,3,4}`.
- Locations `L = {A,B,C}`.
- World variable `x[p,t] ∈ L`: character p's location at observation instant t.
- Cards `E1 … E6`, each a Boolean predicate over x.
- Eligible testimony set `F`, size 2–4 for this authored launch set; source hard maximum is 4.
- `speaker(f)` is the single speaker of candidate card f.
- Crime declaration `crime = {location,slot}` is public and immutable.

A world assigns exactly one location to every `(p,t)`. Different characters MAY share a location. Location occupancy is not capacity-constrained. Nothing is implied about off-board moments, events outside the four slots, or unused cells in a player's notes.

### 5.2 Travel model

All launch dossiers use a three-site path with a real middle site B:

| From / to | A | B | C |
|---|---:|---:|---:|
| A | 0 | 1 | 2 |
| B | 1 | 0 | 1 |
| C | 2 | 1 | 0 |

A and C are two steps apart via B. One slot can move at most one edge; staying is allowed. For each character and adjacent pair of slots:

`distance(x[p,t], x[p,t+1]) ≤ 1`.

Equivalently, for any two sampled placements at slots a < b, the lower bound is `distance(location_a, location_b) ≤ b−a`. Use all pairs when checking a partial timeline, because an unfilled intermediate cell must not hide an impossible journey. For a full world, adjacent checks suffice because the distance matrix is a shortest-path metric.

Example: Pier A at Slot 1 and Archive C at Slot 2 is impossible. A at Slot 1 and C at Slot 3 is possible via B at Slot 2. A at Slot 1, A at Slot 2, and C at Slot 3 is impossible. There is no teleportation and no separate transit location.

The UI explains: **“Slots are snapshots. A two-slot route goes through the middle location.”** The illustrated route is schematic; drawn pixel length does not establish travel time. Direction is symmetric in all launch cases. No locale or device timezone may change any slot or distance.

### 5.3 Evidence DSL

Author evidence as structured predicates, never parse prose at runtime:

- `AT(p,t,L)` — equality.
- `NOT_AT(p,t,L)` — inequality.
- `SAME(p,q,t)` — both occupy the same site at slot t.
- `AND(a,b)` — both predicates hold.
- `OR(a,b)` — inclusive OR: one or both hold. English/Russian copy must explicitly avoid exclusive-OR implications.

The implementation may use internal `NOT` for negating a selected testimony. Authoring depth is at most two compound levels and at most two atomic clauses per published launch card. Unknown operators or references fail schema validation. A conjunction's falsity means **at least one clause is false**, not necessarily both. A disjunction's falsity means both clauses are false.

Card type and speaker are public. Actual truth, culprit, witness worlds, accepted proofs, all unreleased hints, and explanation are private. Public predicates describe what the cards claim; they do not carry private answer annotations.

### 5.4 Unique-pair solver contract

For each eligible candidate f, solve:

`W_f = movement ∧ occupancy ∧ NOT(E_f) ∧ (AND E_i for every i ≠ f) ∧ AT(speaker(f), crime.slot, crime.location)`.

A candidate is viable iff `W_f` has at least one model. A publishable case has **exactly one viable `(falseCardId, speakerId)` pair**. Zero viable candidates is broken. Two viable candidates is ambiguous even if an author prefers one narratively. If one person has more than one eligible testimony, pair uniqueness still applies; this launch set should use at most one candidate testimony per speaker.

Multiple world models for the unique pair are permitted. The recap MUST label any filled complete timeline **“One possible reconstruction”** unless the certificate establishes a unique world. Never call arbitrary witness placements proven facts.

Finite enumeration is small enough for a transparent reference solver: enumerate legal four-slot paths per character, filter unary constraints, then combine and apply relational predicates. Production may use a CSP/SAT implementation, but it MUST agree with the independent enumerator on fixtures. A naïve complete search has `3^16 = 43,046,721` assignments before travel pruning; do not run this search on every keystroke or on the main browser thread.

### 5.5 Two-card accusation contract

The submitted proof is `{characterId, falseEvidenceId, supportingEvidenceIds:[a,b]}`.

- a and b are two **distinct** card IDs, neither equal to the selected false card.
- The selected character must be that testimony's speaker. Selecting a testimony updates the character field with an explicit visible association; the user is never allowed to submit a mismatched pair silently.
- Support order is immaterial. Canonicalize with stable ID sorting.
- Server acceptance uses an explicit versioned, reviewed whitelist. No text similarity, model judgement, or “correct suspect” shortcut.
- Selecting a valid suspect with unrelated cards returns **Proof incomplete**, gives no result or mastery, and does not identify which part was correct.
- A full or consistent player timeline is NOT an acceptance prerequisite. The proof—not cosmetic notebook completeness—solves the case.

**Exact full-case proof standard:** Let K be public movement and occupancy rules; S be the conjunction of the two selected support predicates; F be the questioned testimony predicate; and O be its speaker's crime opportunity. Require all of the following:

1. `SAT(K ∧ S)` — support cards can coexist.
2. `UNSAT(K ∧ S ∧ F)` — they establish that the questioned statement cannot be true.
3. `UNSAT(K ∧ S ∧ NOT(O))` — they also establish presence at the crime site and slot, rather than merely assuming it to identify a thief.
4. For each selected support in turn, remove that card from S. At least one conclusion must stop following: either `K ∧ remainingSupport ∧ F` or `K ∧ remainingSupport ∧ NOT(O)` becomes satisfiable. Each card therefore contributes to the falsehood or the opportunity; neither is arbitrary filler.
5. Both support predicates are true in all valid worlds of the whole case's unique pair, and the pair has a reviewed explanation. If a supporting card is testimony, the explanation must justify its reliability through the full unique-false-card reasoning, not simply assume a convenient witness is truthful.

The crime declaration defines O but does not assert that the selected person satisfies it during these pair checks; otherwise opportunity would be a circular assumption. This standard does not require each card separately to be necessary for the contradiction: one may establish the impossible alibi and the other the crime opportunity. It does not claim the pair proves every cell in a reconstruction. T01 deliberately teaches the form with a corroborating second card and is the only minimal-contribution exception; T02 follows the full standard.

Enumerate all distinct two-card combinations for the correct pair (at most 10). Accept **all and only** combinations meeting this standard after editorial explanation, not just the author's first favorite. A support set can still be incomplete for this game even if it proves the testimony false, when it does not establish opportunity. Explain this goal in the proof sheet: **“Show why the statement is impossible and why its speaker could take the object.”** If a genuinely qualifying pair is omitted, correct the content version rather than falsely telling players it is illogical.

### 5.6 Timeline testing without an answer oracle

Testing evaluates **the player's explicit placements against public claims**, not against a secret canonical timeline.

Default lens: **All statements**. The lone false testimony can produce a conflict; the UI explains that one testimony is false. Optional lens: **Question E#** for an eligible testimony; this treats that selected predicate as negated and includes the public hypothesis that its speaker had crime opportunity. This is the player's hypothesis, not confirmation from the game.

Use three-valued predicate evaluation on partial placements: **supported by these placements**, **contradicted by these placements**, or **not yet testable**. For AND: any false clause is false, all true is true, otherwise unknown. For OR: any true clause is true, all false is false, otherwise unknown. Missing operands never imply truth or falsehood. NOT reverses known true/false and preserves unknown.

The test response may identify violated public evidence IDs, impossible movement pairs, duplicate cell occupancy in malformed input, and a violated explicitly selected hypothesis. It MUST NOT return surviving culprit candidates, solution model counts, an inferred correct cell, hidden truth labels, probability of guilt, the correct hypothesis, or server-search completion suggestions. **“No conflicts in the filled cells” is not “Correct timeline.”** The feature performs bounded local predicate checks, not hidden global satisfiability coaching.

Examples of response messages:

- `TRAVEL_TOO_FAST`: “Mira: Pier at Slot 1 → Archive at Slot 2 needs 2 slots, but only 1 is available.”
- `EVIDENCE_CONFLICT`, E3: “These placements do not fit Card 3.” Repeat the card's actual proposition and highlight only its operands.
- `HYPOTHESIS_CONFLICT`: “These placements do not fit your assumption that Card 2 is false.”
- `PARTIAL_NO_CONFLICT`: “No conflicts in the filled cells. Some statements cannot be checked yet.”
- `FULL_NO_CONFLICT`: “This reconstruction fits the selected assumptions. Present evidence when ready.”

Highlight by outline, stable number badge, and inline explanatory text; never flashing red. Closing a result restores focus and scroll to the initiating control.

### 5.7 Hints and reveal

Three hints are cumulative and free:

1. Relevant sites or characters, without revealing the false card.
2. The important slot/range and what relation to inspect.
3. One logically forced useful placement, not an arbitrary witness cell.

Hints are server-delivered one tier at a time. Reopening an already used tier is free and idempotent. Hint 3 implies tier 3, not “one hint used.” The server stores highest acknowledged tier 0–3; acknowledgements and response retries must not charge twice. On an eligible full-case attempt, the UI previews the scoring consequence before a new tier: **“Free hint 2 of 3. Your first-solve score will be 80.”** Tutorials and Practice show **“No ranked score in this mode”** instead; never promise a score they cannot receive.

**Study reveal** requires a separate confirmation: “Reveal the complete proof? This first attempt will become Study and will not receive a ranked score.” Cancel changes nothing. Acknowledge the server transition before exposing the explanation. A pending request after reconnect is reconciled rather than blindly re-issued as a new action.

---

## 6. Interaction design and complete screen specification

### 6.1 Navigation map

`Launch/authentication → Archive → Dossier hook → Workspace ↔ Evidence / Routes / Character details → Test results → Proof sheet → Reasoning recap → Archive / Next case / Share`.

Global destinations: Settings & accessibility, How to play, Progress, Cosmetics, Help/legal. Do not add a separate full-screen menu between every action.

### 6.2 Screen requirements

| Screen | Required content and controls | Completion / back behavior |
|---|---|---|
| S00 Launch | Wordmark, quiet loading state, accessible status, retry and supported fallback on failure | Never an indefinite spinner. Skeleton after 150 ms; useful failure message after timeout. |
| S01 Archive | Illustrated archive header; Continue folder if active; 2 lessons and 10 full folders; explicit progress; settings; free availability | Back returns to host or close confirmation only for unacknowledged work. |
| S02 Hook | Case title, object art, 1–3 short sentences, four neutral character chips on full cases, “What happened” crime declaration, Open dossier | Back preserves first-attempt status; merely viewing a hook need not create an active attempt. |
| S03 Workspace | Case identity, four slot labels, timeline/list, Evidence count, Routes, hypothesis lens, Test timeline, Present evidence, save state, Hint | One obvious next action; no results spoilers. |
| S04 Evidence | Ordered numbered cards; Record/Testimony labels; speaker; exact prose; inspect/pin/cite controls; optional text-only toggle | Drawer retains scroll; close returns focus to opener. |
| S05 Routes | All three labelled sites, explicit 0/1/2 table, sampled-time explanation, crime site/slot | No route cost depends on art interpretation. |
| S06 Test results | Summary, public violated IDs and rules, unknown count, links to exact cells/cards; “No conflicts” qualified | Does not autocorrect or show culprit. |
| S07 Proof sheet | Character, eligible false testimony, exactly two support slots, free route/crime reminder, explicit submit | Cancel preserves draft. A filled form is not a confirmed accusation until Submit. |
| S08 Hint panel | Current used tiers; next free tier and prospective score; separate Study entry | Confirmation only for new disclosure; reopening does not change tier. |
| S09 Recap | Finding, rejected quote, accepted citations, ordered deduction, forced vs illustrative placements, closure, result badge | Next, Archive, Replay, explicit spoiler-free share. |
| S10 Progress | 0–10 full solves, tutorial completion separately, mastery badges, score/assistance breakdown, optional ranking opt-in | Study not presented as an earned ranked score. |
| S11 Settings | EN/RU; sound; ambience; haptics; reduced motion; text-only evidence; text size 100/125/150/200%; privacy/help | Changes persist; no puzzle reset. |
| S12 Cosmetics | Free default; Evidence Desk Set preview; 75 Stars proposed SKU; Restore purchases/reconcile; help/refund route | Purchase entirely optional; dismiss goes back to unchanged puzzle. |
| S13 Failure states | Offline, authorization expired, version withdrawn, maintenance, missing asset, unavailable sharing, failed invoice | Specific recovery; preserve acknowledged work and never substitute a different mystery. |

### 6.3 Mobile workspace at 390 CSS px

Default to a chronological **list**, not a compressed spreadsheet:

1. Compact header: back, short case title, overflow/settings; status line beneath.
2. Collapsible crime reminder: “Taken at Archive · Slot 3.” This is always one tap away.
3. Tabs/segmented controls: **Timeline · Evidence · Routes**. Opening Evidence does not discard the timeline or current cell selection.
4. Four slot sections. Each section contains one named row per character and a clearly labelled location button (“Unknown” if unplaced).
5. Tap a row to open three large location options and Clear. Selection makes a single assignment `(character,slot) → location`.
6. Bottom action area: primary **Test timeline**, secondary **Present evidence**; Hint remains a labelled action in the workspace header/menu, never hidden in the shop.
7. Fixed controls respect safe areas and leave enough content padding. When the viewport becomes short or text reaches 200%, actions become in-flow rather than covering evidence.

At widths ≥768 CSS px, show a four-character by four-slot grid alongside the evidence panel if text fits. A persistent **List / Grid** preference lets any device use the list. At 320 CSS px or 200% text, list is mandatory. No essential horizontal scrolling.

### 6.4 Placement and annotation behavior

- Tap cell → choose location → optimistic visible update → debounced save. No long-press-only action.
- A different choice replaces that cell, not creates a second location. Clear removes placement but not unrelated annotations.
- An event token is a character-slot observation. It is not an object inventory item or proof of continuous residence.
- Pinning a card keeps it available in the workspace; it does not automatically assert that the card is true or place derived cells.
- Annotation mode allows per-cell possible/excluded location marks. For each location, states are unmarked / possible / excluded. Possible and excluded cannot coexist. Marks do not constrain server proof or test results.
- Use visible non-color marks: `?` for possible, crossed label for excluded, plain solid chip for an actual placement. Explain these once.
- Undo/redo covers the last 20 placement/annotation operations within the active workspace session. After reload the persisted state remains; undo history need not persist. Hint/reveal/purchase/solve actions are never undoable notebook edits.
- **Clear timeline** asks confirmation and clears placements only; a separate checkbox opts into clearing annotations. It never resets hints, case version, result, or ranking eligibility.
- Evidence reference links identify card IDs, not positional array indexes that could change after localization.

### 6.5 Keyboard and assistive technology

Every operation works with Tab, Shift+Tab, Enter/Space, and Escape. In grid mode arrow keys may move cell focus with documented roving tabindex; list mode uses ordinary controls. Enter opens a location chooser; Escape closes it without changing the previous assignment. Deletion has a visible Clear equivalent and never captures a browser shortcut globally.

Dialog focus is contained while open and restored on close. Selected supports announce “Card 4 selected, 1 of 2 supporting cards.” Updates use a polite live region; do not announce the entire timeline after every tap. A cell's accessible name is, for example, “Mira, Slot 2, location unknown.” Background art is decorative and has empty alt text; portraits are paired with real text names.

### 6.6 Proof-sheet detail

Order: choose a person → choose their eligible statement → select two supports → review → **Present the evidence**. State the two proof goals: establish the impossible statement and the speaker's crime opportunity; each supporting card must help establish at least one goal. A person without eligible testimony is visibly ineligible for the false-speaker role; their evidence can still support an accusation. All evidence can be reread inside the sheet.

Selected cards have large remove buttons and number badges. A third support tap prompts replacement rather than silently dropping one. Submit is disabled until structurally complete, with an explanatory text label. While pending, retain the complete form; repeat taps reuse the same idempotency key. Generic rejection: **“Proof incomplete. This selection does not establish the contradiction. Recheck the statement, the route, and both supporting cards.”** No “right suspect, wrong clue” feedback.

### 6.7 Error, empty, and interruption behavior

| Condition | Required response |
|---|---|
| Network disappears during editing | “Offline — changes on this device are not yet saved.” Keep local draft; authoritative tests/hints/accusations unavailable. |
| App closes before save acknowledgement | Persist local queued notebook edits when possible; on return show the server baseline and recovery state. Never promise unacknowledged durability. |
| Same case open on another device | Revision conflict; show “This dossier changed elsewhere.” Offer use server state or review/reapply local notebook changes. Never merge terminal state or assistance downward. |
| Authorization expires | Pause server actions, preserve draft, offer reopen/re-authentication. Never switch to another account from a typed ID. |
| Artwork fails | Stable neutral raster placeholder or plain paper background; all facts and controls remain. No broken-image icon over clues. |
| Audio fails or is blocked | Continue silently; no modal or blocked puzzle. |
| Hint request times out | Show retry/reconcile; determine whether tier already advanced before requesting again. |
| Content withdrawn | Explain correction, preserve old notes, remove unfair ranking, offer corrected version as a separate attempt. |
| Payment closed/pending/failed | Puzzle remains available. Show entitlement state from server, not a client success assumption. |
| No ranked results / privacy opt-out | Friendly empty ranking; never fabricate names or scores. |

---

## 7. Visual design system and accessibility

### 7.1 Art direction

**An illustrated civic archive after the visitors have left.** Cream paper, indigo ink, muted teal, a little old brass, warm desk light, and generous quiet space. Think authored editorial illustration and a carefully arranged reading desk—not police procedural photography, neon cyberpunk, escape-room grime, or an office spreadsheet.

The interface stays crisp while backgrounds show restrained grain. Paper edges should feel deliberately cut, not distressed beyond legibility. No red-string spiderwebs behind text. Dossiers gain individuality through their central object, environment illustration, and one accent—not entirely different UI themes.

### 7.2 Color tokens

These are baseline design tokens, not a substitute for measured contrast tests.

| Token | Value | Use |
|---|---|---|
| `paper.base` | `#F5F0E6` | Main reading surface |
| `paper.card` | `#FFFCF5` | Evidence and dialogs |
| `ink.primary` | `#20344C` | Main text and primary controls |
| `ink.secondary` | `#526174` | Secondary labels, after contrast verification |
| `accent.teal` | `#356B67` | Active navigation and calm positive state |
| `accent.brass` | `#9A742E` | Decorative borders and milestones; not small body text |
| `state.warning` | `#8A462F` | Contradiction text/icon with label |
| `line.subtle` | `#D4CCBD` | Decorative separators only |
| `focus.ring` | `#1859A8` | 3 px keyboard outline with spacing |
| `night.surface` | `#162231` | Optional supported dark reading surface |
| `night.text` | `#F5F0E6` | Dark-mode foreground |

If dark mode is shipped, every component, illustration framing, focus state, shop preview, and dialog must be reviewed in it. Otherwise use the accessible cream theme consistently and integrate Telegram chrome colors without claiming native dark-mode coverage. Dark mode is not required to invent a second art set.

### 7.3 Typography and spacing

- Headings: **Noto Serif**, 600; body/UI: **Noto Sans**, 400/600. Both must include Cyrillic and required Latin punctuation. Self-host licensed WOFF2 subsets; preserve OFL notices. Fallbacks: Georgia for headings and system sans-serif for UI.
- Body/evidence default 16–18 CSS px, line-height 1.45–1.6. Metadata minimum 14 px; no indispensable text smaller than 14 px. Title 28–34 px mobile; section heading 20–24 px.
- Numeric slots use tabular numerals if available. Typography must not make `1`/`I`, `0`/`O`, or Latin/Cyrillic names confusing.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48 px. Mobile horizontal inset 16 px; 12 px at 320 px if needed.
- Card radius 12 px; controls 10 px; pills only for compact states. Thin functional borders must meet non-text contrast or be reinforced by shape/spacing.
- Main reading width 60–72 characters desktop, narrower on phone. Long headings wrap; no essential ellipsis.

### 7.4 Component states

Every interactive component needs default, hover where applicable, focused, pressed, selected, disabled, pending, and error states. Disabled controls keep readable labels and state explanations; they are not faded into invisibility. A selected clue shows a numbered check marker and thicker outline, not just a color change.

Functional icons are simple original raster glyphs paired with labels. Avoid icon fonts, emoji as critical state, third-party SVG icon libraries, SVG loaders, and SVG charts. CSS rectangles, borders, underlines, text, and layout are permitted; “no SVG” does not mean rendering text into images.

### 7.5 Motion specification

- Panel opening/closing: 160–220 ms, opacity and ≤8 px translation.
- Cell placement: 100–140 ms settle; no bounce.
- Card selection: 100 ms border/background change.
- Accepted proof: 600–900 ms total sequence, immediately skippable; then persistent readable content.
- Route emphasis: static outline or one gentle fade; no moving clue that must be tracked.
- Archive milestone: one small 500 ms seal appearance, not confetti across the document.
- No animation delays input or announces “wrong” through shaking a whole page.
- Respect OS reduced motion and in-app override; reduced mode removes translation and staged reveal, showing results immediately. Never flash content more than three times per second; preferably never flash at all.

### 7.6 Accessibility release requirements

Target WCAG 2.2 AA for the app's reading and interaction surfaces [R5]. Text contrast ≥4.5:1 for normal text and ≥3:1 for qualifying large text; non-text controls/focus indicators ≥3:1 where required. Main touch targets ≥44×44 CSS px, preferably 48×48; this is a product target above WCAG's 24 px minimum and exceptions.

Support 200% in-app text size without clipping or loss of controls. Also test browser reflow at 320 CSS px / equivalent 400% desktop zoom; a narrow list view must not require two-dimensional scrolling. Do not disable pinch zoom with viewport settings. Test VoiceOver, TalkBack, and keyboard independently; automated checks alone cannot certify accessibility.

No essential information is color-only, audio-only, hover-only, portrait-only, timing-dependent, or physically drag-dependent. Contrast, readability, and control hit areas MUST remain identical in the paid desk theme.

### 7.7 Package for a later design model or designer

Give the designer this entire document, but ask for the following **specific visual outputs** before coding polish:

1. Archive at 390×844, default cream theme.
2. Illustrated hook and character row for C01.
3. Timeline list at 390×844 with one unknown cell and an open location chooser.
4. Evidence drawer with Record and Testimony examples.
5. Route conflict result highlighting two cells without revealing the answer.
6. Proof sheet with two selected cards, and Proof incomplete state.
7. Accepted Proof Spread and a Study recap with visibly different labels.
8. 320 px / 200% text adaptation, plus 1440 px desktop workspace.
9. Settings and cosmetic preview showing that the free and paid themes are equally legible.

The designer may refine composition, palette, textures, and decorative assets. They may not remove card numbers, explicit route times, free hints, large controls, text-only mode, source IDs, or error states. No screenshot alone constitutes an implemented flow.

---

## 8. Art production, asset manifest, and image-generation briefs

### 8.1 Production principles

The implementation agent has access to image generation through MCP. It must discover the actually available generation/editing tools and their parameters; this document does not invent an MCP method name, unlimited credit allocation, or guaranteed commercial rights. Use the supplied capability for original raster images, preserve a manifest, and finish outputs with cropping, color correction, alpha cleanup, and compression.

No SVG files or inline SVG. No traced web images, scraped film stills, recognizable public figures, logos, imitation of named living artists, or unlicensed mood-board material in the shipping build. A reference generated for one asset is reusable for style continuity only if its rights permit it.

All lettering, card numbers, timestamps, arrows that encode rules, and character names are live localized UI. **Never ask the image model to paint readable clues.** Painted envelopes and receipts must have blank or meaningless marks that are not interpreted as evidence. Artwork may support mood; it cannot add facts.

### 8.2 Exact asset families and count expansion

A **master asset** is an authored image; crops and resolution variants do not count as new creative assets. IDs below expand deterministically. Production paths are examples of required organization, not files claimed to exist today.

| Family / ID pattern | Masters | Master specification | Shipping derivatives and purpose |
|---|---:|---|---|
| `brand.app-icon` | 1 | 1024×1024 PNG, bold atlas/book-and-index-tab motif, no text | 512/192 PNG or WebP, browser PNG favicon; platform sizes verified at integration |
| `global.archive-cover` | 1 | 2048×1152, archive desk, clear central reading area | 1280 and 768 WebP; archive header crop |
| `global.desk-default` | 1 | 1600×1200, quiet cream desk edge, no clue objects | Responsive WebP background, ≤160 KB |
| `global.paper-grain` | 1 | Seamless 512×512 subtle monochrome raster | Tiled WebP ≤30 KB; optional off in text-only mode |
| `global.empty-folder` | 1 | 768×768 transparent/neutral paper folder | Loading/empty illustration, not fake content |
| `case.{id}.hook`, all 12 IDs | 12 | 1600×1000, case-specific scene and absent/stolen object context | 960/640 WebP hook; spoiler-free 480×300 catalog crop |
| `case.{id}.object`, all 12 IDs | 12 | 768×768 transparent PNG, one named object | 384 WebP-with-alpha or PNG; story and recap only |
| `case.{id}.location.{A,B,C}` | 36 | 1024×768 location vignette, landmarks consistent with hook | 480 WebP; optional decorative route cards |
| `case.{id}.portrait.{p}` | 45 | 1024×1024 bust, all full-case 40 + T01 2 + T02 3 | 256/128 WebP; identity aid, neutral expression |
| `global.evidence.record` / `.testimony` | 2 | 512×512 paper-material raster; no words | Reusable subtle background, no per-clue illustrations required |
| `global.seal.{first,steady,keeper}` | 3 | 768×768 original embossed symbol | 256/128 raster; labels remain live text |
| `global.state.{solved,study}` | 2 | 768×768 restrained seal/frame | 256 raster; non-color state text always present |
| `ui.glyph.{name}` | 18 | Original consistent 128×128 transparent glyph | 48/96 raster atlas or individual lossless files |
| `cosmetic.evidence-desk.{background,border,frame}` | 3 | 1600×1200 background; 512 border tile; 1024 frame | Paid desk set, no functional UI difference |
| **Total** | **138 master raster assets** | Includes all launch characters and locations | Variants generated from masters, not regenerated independently |

Glyph names: `back`, `close`, `settings`, `evidence`, `timeline`, `routes`, `hint`, `test`, `present`, `undo`, `redo`, `clear`, `sound`, `share`, `check`, `question`, `warning`, `lock`. The lock glyph is for privacy/ownership context only; do not imply cases or clues are purchasable locks.

Dossier location images may be visibly related crops of a coherent larger environment only if each location remains distinct and fulfils its brief. The count is a deliverable manifest, not a requirement to make 138 unrelated generation calls. Reuse backgrounds and glyphs sensibly, but do not reuse one character face for unrelated identities.

### 8.3 Per-case asset mapping

For every T01, T02, and C01–C10 dossier in §17–18:

- The **hook** uses that dossier's location B/environment and its described central object, with a composition-safe left or lower area for overlaid live UI; the overlay is optional and never over textured details.
- The **object** is exactly the named stolen prop, no visible text or hidden mechanism.
- The three **location vignettes** use the dossier's A/B/C names; A and C connect through B in the schematic, but physical image perspective is not a scale map.
- Each **portrait** follows that dossier's neutral character description; all four full-case suspects have equal resolution, lighting, framing, and visual dignity.
- Catalog/share uses the hook crop before any culprit revelation. Recap can reuse the object, never requiring a second spoiler-revealing illustration.

This rule expands every asset path without leaving the implementation agent to invent additional necessary gameplay art. No unique evidence-card image is needed for any of the 67 cards: live text plus the two neutral card materials is the authoritative presentation.

### 8.4 Shared generation prompt

Use this base, followed by the dossier-specific subject and the relevant asset instruction:

> Original editorial illustration for Alibi Atlas, a fictional waterside town's civic archive mystery game. Warm archival cream, deep indigo ink, muted teal, restrained antique brass. Painterly gouache-like shapes with delicate dry-paper grain, clear silhouettes, believable everyday materials, gentle late-evening light, precise but not photorealistic. Quietly curious, humane, sophisticated and readable at mobile size. Consistent town architecture and material palette. No text, letters, numbers, logos, watermark, UI, frame, recognizable real person, gore, weapon, police tape, red-string conspiracy wall, exaggerated guilty expression, or hidden visual clue. Every depicted factual element must agree with the supplied case brief.

Asset modifiers:

- **Hook:** landscape 8:5 composition; one focal object context; enough negative space for the product's crop; characters absent or incidental, never singling out the culprit.
- **Portrait:** square bust, softly separated plain cream background, face readable at 64 px, neutral attentive expression, ordinary practical clothing, consistent eye level; use the approved case identity reference.
- **Location:** landscape 4:3 vignette of exactly one site; no readable signage or clocks; consistent entrances and material cues, no secret fourth route.
- **Object:** isolated single prop on transparent background if supported; otherwise flat removable cream; clean silhouette; no extra accessories that could imply evidence.
- **Desk cosmetic:** understated dark-blue cloth edge and brass geometric border, empty light paper reading region; never put pattern behind evidence text.
- **Glyphs:** flat, original, minimal indigo mark, uniform visual weight, transparent background, no lettering; finish manually for small-size consistency.

### 8.5 Generation workflow and quality gates

1. Generate one archive mood image, one portrait, one hook, one card treatment. Approve style before bulk production.
2. Save approved references and use them for consistency; record model/provider/version, prompt, seed if available, reference IDs, generation date, and rights basis.
3. Generate case batches, review against the dossier, reject any accidental clocks, readable invented signs, incriminating expressions, extra routes, or inconsistent object design.
4. Perform image editing and alpha cleanup. Do not put a low-resolution generation behind a 2× UI and call it finished.
5. Export deterministic derivatives; strip unnecessary metadata; record hashes and dimensions.
6. Test on a phone-size contact sheet and on actual screens in EN/RU. Reject clipped faces, indistinguishable portraits, muddy thumbnails, visual spoilers, and any reliance on illustration for a logical fact.
7. Produce alt/decorative metadata separately. Portrait alt can be empty when adjacent name text already identifies the character; do not redundantly describe appearance as evidence.

### 8.6 Asset manifest fields and licenses

Every shipped file needs: `assetId`, `kind`, `sourceType` (generated/procedural/licensed), `sourceUrl` when applicable, `provider`, `modelVersion`, `promptRef`, `seed` if supported, `licenseIdentifier`, `licenseFile`, `rightsReviewStatus`, `authorOrCredit`, `modifications`, `sha256`, `width`, `height`, `bytes`, `localeNeutral`, `spoilerClass`, `caseIds`, `derivatives`, and `approvedBy/date`.

Generated does not automatically mean public domain or legally exclusive. Retain the provider's applicable commercial-use terms and do a resemblance review. No runtime generation calls are needed; ship reviewed static assets. If MCP credits or rights approval are unavailable, use neutral non-misleading development placeholders and mark art completion blocked—never certify final art readiness.

---

## 9. Audio, procedural recipes, and haptics

### 9.1 Sonic identity

Close, soft, material: paper, graphite, a small wooden desk, and a brief tuned-glass resolution. No sirens, ticking pressure clock, police radio, voice, jumpscare, mocking buzzer, or casino reward cascade. The sound should make the archive feel tangible without competing with reading.

First launch is silent. Offer a non-blocking **Enable sound** control after deliberate interaction. Save sound effects and ambience as separate settings. Haptics are separately opt-in. No clue depends on a sound, and muted play has complete equivalent feedback.

### 9.2 Complete required audio inventory

| ID | Duration | Trigger / role | Priority |
|---|---:|---|---|
| `sfx.ui-tap` | 35–60 ms | Ordinary button activation, throttled | Low |
| `sfx.card-open` | 140–220 ms | Open evidence or dossier | Low |
| `sfx.card-close` | 100–160 ms | Close paper surface | Low |
| `sfx.token-place` | 80–130 ms | Commit placement | Normal |
| `sfx.token-clear` | 70–110 ms | Remove placement | Low |
| `sfx.annotation` | 70–140 ms | Possible/excluded mark | Low |
| `sfx.test-run` | 180–280 ms | Start user-requested test, not automatic every edit | Low |
| `sfx.test-conflict` | 220–330 ms | Calm informational conflict | Normal |
| `sfx.test-clear` | 180–260 ms | No local conflicts; neutral, not a solve fanfare | Low |
| `sfx.proof-select` | 80–130 ms | Add/remove support card | Normal |
| `sfx.proof-incomplete` | 200–300 ms | Generic rejected proof | Normal |
| `sfx.hint-open` | 180–280 ms | Newly disclosed hint | Normal |
| `sfx.solve` | 1.0–1.4 s | First successful proof | High |
| `sfx.study-open` | 350–550 ms | Open explicit Study explanation | Normal |
| `sfx.mastery` | 1.1–1.6 s | New mastery badge, after solve sound finishes | High |
| `amb.archive` | 32 s seamless | Very quiet general reading room bed | Ambient |
| `amb.rain` | 32 s seamless | Optional exterior-rain layer for suitable scenes | Ambient |
| `amb.workshop` | 32 s seamless | Optional soft ventilation/paper-room air | Ambient |

**18 named audio assets:** 15 one-shots and 3 loops. Music and voice tracks are excluded; the two short tuned motifs provide identity without a looping melody. Hints/solve sounds play only after acknowledged server responses; retries must not repeat rewards.

### 9.3 Reproducible synthesis specification

Generate offline with a small deterministic audio-build utility during implementation. Deliver the utility, parameters, and rendered masters. Use 48 kHz, float intermediate processing, mono for UI, stereo only for ambience; export lossless 24-bit WAV masters. For noise, hash UTF-8 `alibi-atlas-v1:` followed by the asset ID using SHA-256; take its first four bytes as an unsigned big-endian 32-bit seed. Use xorshift32 with shifts 13, 17, 5 and unsigned 32-bit arithmetic; replace a zero seed with `0x9E3779B9`. Map each output u to `2 × (u / 2^32) − 1`. Do not use a runtime-randomized language hash. Normalize safely; no real microphone recordings or downloaded samples are needed for the default route.

Definitions: `noise` is zero-mean white noise in [-1,1]; low-pass/high-pass/band-pass filters use documented biquad coefficients; envelopes have ≥3 ms attack and ≥8 ms release to avoid clicks. Finish one-shots with silence trimming that preserves their release and 5 ms protective fades.

| Sound family | Concrete recipe |
|---|---|
| Tap / proof-select | Sine at 920 Hz with 3 ms attack and 42 ms exponential decay, mixed with 1.8 kHz band-passed noise at 0.12 amplitude; proof-select shifts sine to 760 Hz and lengthens decay to 70 ms. |
| Paper open / close | Band-pass noise 700–4500 Hz, two overlapping 80 ms raised-cosine bursts separated by 45 ms. Open adds a 120→80 Hz sine at −24 dB relative to noise for subtle contact; close uses one shorter burst. Never use a harsh broadband whoosh. |
| Token place / clear | Damped sine components 180/360/540 Hz at relative gains 1/0.22/0.08, decay 90/55/35 ms; 3 ms band-passed noise transient at low gain. Clear uses 220 Hz and 65 ms decay. |
| Annotation | 90 ms noise, band-pass 1.2–3.8 kHz, gentle 25 Hz amplitude modulation at depth 0.25 to suggest pencil grain; no squeal. |
| Test run / clear | Test run: two soft wood taps 110 ms apart. Clear: one 650 Hz lightly damped tone with 180 ms decay. It must not share the solve melody. |
| Conflict / incomplete | Two muted tones, 260 Hz then 220 Hz after 110 ms, smooth attack, low gain; no dissonant alarm. Proof incomplete uses a paper close tail rather than louder volume. |
| Hint / Study | Hint: filtered paper open plus 523.25 Hz soft sine, 220 ms decay. Study: two soft tones 392 and 523.25 Hz, 150 ms apart. |
| Solve | Three original tuned-glass notes D5 587.33 Hz, A5 880 Hz, E6 1318.51 Hz at 0/160/340 ms. Each mixes fundamental with a 2.71× partial at gain 0.08, exponential decay 450–650 ms; final tail within 1.4 s. Not an imitation of an existing melody. |
| Mastery | D5/F#5/A5/D6 at 0/140/280/460 ms, slightly warmer triangle/sine blend, total tail ≤1.6 s. No volume increase over solve. |
| Archive loop | 32 s low-pass noise below 700 Hz at very low level, high-pass at 70 Hz; non-periodic seeded level drift <1 dB, no identifiable people or speech. |
| Rain loop | Stereo decorrelated filtered noise 400–6500 Hz, occasional very soft seeded 8–18 ms droplet grains; no thunder; paired edge-crossfade for seamless 32 s playback. |
| Workshop loop | Low filtered air 90–1200 Hz plus very low, slowly varying 120/180 Hz components; avoid oppressive mains hum and remove if phone playback is unpleasant. |

These are starting production parameters, not a claim that inaudible or harsh mixes may ship because they match a formula. Listen on phone speaker, inexpensive earbuds, and headphones; adjust EQ/gain while preserving identity and record the final parameter version. Seamless loops need actual endpoint/crossfade verification, not just a file labelled “loop.”

### 9.4 Mix, loading, and runtime

- Peak each one-shot at no higher than −3 dBFS; keep the final mixed true peak ≤−1 dBTP with safe bus gain/headroom. Do not indiscriminately loudness-normalize tiny clicks.
- Ambience subjective level approximately 18–24 dB below major UI effects; no need to hear it over ordinary conversation. Use −28 to −24 LUFS integrated as a starting long-loop target, then mix down as necessary.
- Default enabled levels after consent: effects 60%, ambience 20%; user sliders 0–100%. Limit to 4 concurrent one-shots and one ambience bed. Coalesce UI taps within 60 ms; never interrupt reading with repeated error audio.
- Duck ambience by 4 dB during solve/mastery, restore over 500 ms. Do not chain solve + mastery into a multi-second unskippable celebration.
- Ship an AAC-LC/M4A or MP3 compatibility encoding and optionally Opus for browsers verified to support it; detect actual decode support and keep only the needed runtime decode. Ogg/Opus-only is not an iOS-safe assumption.
- One-shots total ≤500 KB compressed; active ambience ≤600 KB; audio is lazy-loaded after consent/need. Decoded audio budget ≤24 MB; unload unused loops.
- Resume AudioContext only after a user gesture and handle promise rejection [R4]. Suspend on hidden/inactive Telegram state and `visibilitychange`; require resumed activation where necessary. No background playback after app close.

### 9.5 Optional licensed substitution route

**Kenney Interface Sounds** is an approved source candidate: https://kenney.nl/assets/interface-sounds. Kenney's support page states that assets on its asset pages are CC0 and usable commercially, with no required attribution [R6]. This verifies the source policy, **not a specific downloaded archive or sample filename**.

If procedural paper/click sounds do not meet listening quality, the implementation agent MAY download that exact pack from the official asset page, inspect its included license, audition actual files, and map chosen source filenames to the above asset IDs in the manifest. Preserve the downloaded license and source checksum. Do not invent filenames, hotlink files at runtime, use an unrelated “free sound” mirror, or silently substitute a different license. Optional courteous credit: “Selected interface sounds: Kenney (CC0), modified.”

Do not download commercial music, YouTube audio, arbitrary Freesound results, attribution-uncertain collections, CC-BY-NC, or “royalty-free” material without verifiable terms. The complete procedural route means a failed stock download is not a blocker.

### 9.6 Haptics

Capability-check Telegram HapticFeedback. If enabled: light selection for placement, soft notification for accepted proof where supported. No haptic for every scroll, no long error vibration, no distinction that reveals the correctness of an unsubmitted guess. Unsupported haptics are a silent no-op. OS and in-app preferences win.

---

## 10. Application architecture and Telegram integration

### 10.1 Recommended implementation baseline

If the destination repository already has a supported platform stack, reuse it. In the currently empty game repository, the default architecture is:

- TypeScript throughout; React + Vite for semantic DOM-based UI.
- Lightweight typed state store or React reducer/query layer; avoid a canvas game engine for a reading-and-form interaction.
- Node.js on a currently supported LTS release, a small HTTP API framework such as Fastify, PostgreSQL for durable state.
- Schema validation shared between client/server for public structures, with private answer schemas isolated in server-only modules.
- Offline authoring/reference solver and certificate compiler; production lookup of validated proof sets plus bounded public timeline evaluation.
- Vitest or equivalent unit tests; Playwright browser tests; automated accessibility checks plus manual assistive-tech review.
- Static assets on a controlled origin/CDN; server APIs under the same site where possible.

At implementation start, select supported mutually compatible versions from official package documentation, record exact versions in a lockfile and architecture note, and avoid unrelated upgrades. This specification does not pretend to know future installed versions. An equivalent established stack is acceptable if all contracts and tests hold. No external LLM or image-generation call belongs in the runtime solving path.

### 10.2 Suggested module boundaries

`web/app-shell`, `web/archive`, `web/workspace`, `web/evidence`, `web/proof`, `web/accessibility`, `web/audio`, `web/telegram-adapter`; `shared/public-schema`, `shared/public-rules`; `server/auth`, `server/attempts`, `server/proof-validation`, `server/results`, `server/payments`, `server/content-private`; `content/source`, `content/locales`, `content/certificates`; `tools/content-validate`, `tools/audio-build`, `tools/assets-validate`; `tests/fixtures`, `tests/e2e`.

Build boundaries must prevent importing server/private content into client modules. CI inspects the actual emitted assets and source maps, not only source filenames. Do not put this master specification or the private appendix in the public bundle.

### 10.3 Telegram shell contract

Use the official Telegram Mini Apps JS bridge [R1], wrapped by a small adapter that can be mocked in local tests. On launch:

1. Render a minimal skeleton, read available launch context, and initialize the adapter.
2. Send raw `initData` to the backend over HTTPS for verification; never trust `initDataUnsafe` for identity or authorization.
3. After the app can render, call `ready()`; request expansion where supported. Fullscreen is optional, not mandatory to solve.
4. Read Telegram theme and viewport signals; respect `safeAreaInset`, `contentSafeAreaInset`, and related change events when supported. Calculate the union of occluded regions rather than blindly adding overlapping inset values twice. Provide CSS safe-area/viewport fallbacks for older clients.
5. Integrate BackButton with internal navigation. Use `MainButton` only if deliberately replacing the in-app primary action; never duplicate conflicting CTAs in both surfaces. Default is in-app controls for consistent keyboard accessibility.
6. Handle theme/viewport changes, keyboard, minimized/activated/deactivated state, and invoice close without resetting the case.

Capability detection and `isVersionAtLeast` where appropriate must guard optional methods. Do not assume every installed Telegram client supports fullscreen, secure storage, newer sharing APIs, or haptics. The required floor is validated launch context + core bridge + an accessible WebView. Record the actual minimum tested Telegram app versions at release; API documentation history is not a device test result.

### 10.4 Authentication and session policy

Validate `initData` on the server using Telegram's documented HMAC procedure [R1], with carefully parsed URL query values, prescribed sorting/newline construction, constant-time comparison, and the bot token kept only server-side. Use official test vectors or a maintained validator tested against the current official algorithm. Do not confuse the separate third-party Ed25519 verification procedure with bot-token HMAC verification.

Proposed game defaults: reject bootstrap data older than 5 minutes or over 30 seconds in the future; exchange valid data for a short-lived server session (30 minutes sliding inactivity, maximum 24 hours), then require a fresh Telegram launch. Repeated same-user bootstrap within the valid window may be idempotent; this is not a promise of preventing all replay of stolen valid launch data. Never log raw initData or tokens. Review durations against the future Platform SRS before integration.

Prefer a Secure, HttpOnly session cookie with a same-origin API and suitable SameSite policy for the actual Telegram WebView deployment; apply CSRF protection and origin checks to mutations. If the host platform already uses a secure session scheme, integrate it rather than creating parallel identities. Telegram user IDs must use a representation safe for their full supported range; do not truncate to 32-bit integers.

Development bypass exists only behind explicit non-production configuration and isolated seeded accounts. Production MUST fail closed without valid Telegram authentication for ranked attempts, progress, and purchases. An optional public browser demo may expose T01 as unranked practice and must be labelled Demo.

### 10.5 Bot and deep links

The deployment operator configures the bot, HTTPS Mini App URL, app short name/main app entry, commands, and webhooks using approved credentials. Define `/start`, `/help`, `/paysupport`, and a privacy link. The bot introduces the app without unsolicited reminders.

Case share links use the configured Telegram Mini App deep-link form and a compact validated `startapp` payload resolving to a public case ID/version, e.g. `c_C03_v1`. Use only supported payload characters/length and verify the actual registered app route. Never put user IDs, answers, proof IDs, authentication data, or private attempt IDs in links. Invalid or withdrawn case links open a helpful archive state. Sharing uses a native supported dialog where available or a documented link-sharing fallback; the user chooses destination and confirms send.

### 10.6 Platform adapters

- `IdentityAdapter`: verified platform/Telegram account mapping; no wallet-based restore.
- `ProgressAdapter`: idempotent accepted-result event, no assumed XP amount.
- `RankingAdapter`: version/assistance partition and opt-in alias; standalone implementation defined in §12.
- `StarsAdapter`: server invoice/webhook/refund/entitlement contract.
- `ProfileWalletAdapter`: link to existing platform settings only; omitted if unavailable.
- `SupportAdapter`: configured support and privacy contacts; values must be supplied before release, not fake addresses.

Unavailable optional adapters disable only their optional surface. Missing production identity or durable storage blocks ranked launch. Do not build the entire missing marketplace to finish this game.

---

## 11. Data model, APIs, persistence, and security

### 11.1 Public/private case split

**PublicCase:** `caseId`, `contentVersion`, `rulesVersion`, `localeContentVersion`, `kind`, `difficultyLabel`, `title`, `hook`, `characters[]`, `locations[]`, `slots[]`, `distanceMatrix`, `crime`, `evidence[]` with stable IDs/type/speaker/proposition/text, approved neutral asset references, and publication state.

**PrivateCase:** same version key, `falseEvidenceId`, `culpritId`, `validProofSets[]`, proof explanations, candidate model counts, witness model, forced facts, three hint payloads, solution recap, wrong-accusation examples, semantic review records, and uniqueness certificate.

**Attempt:** `attemptId`, owner ID, immutable case/version tuple, approved pinned locale revisions `{en,ru}`, `attemptKind`, lifecycle status, state revision, 16 or tutorial-shaped optional placements, annotations, pinned card IDs, hypothesis ID or all-statements lens, last tested public rule IDs, hint tier, seen-hint acknowledgements, accusation draft, timestamps for operational use, terminal result reference. Language switching reads the matching pinned locale revision; it does not silently replace the case with the latest catalog edition.

**Result:** owner, case/version, accepted accusation/proof IDs, score or null, hint tier, first-eligible flag, Study/replay flag, completion timestamp, mastery grant IDs, ranking eligibility/withdrawal state. Time is for operations, never speed ranking.

**Entitlement/payment:** SKU, owner, invoice order ID, XTR amount, Telegram charge ID, payment/refund state, idempotency keys, active cosmetic setting. Never store card-payment details.

Public/private content must have independent serializers and storage permissions. Sending a private object with fields “hidden by the UI” is a security failure.

After solve/Study, a separate disclosure DTO exposes only that account's authorized case answer, the selected accepted proof's explanation (a designated canonical proof for Study), forced facts, and optionally one labelled witness reconstruction. The complete proof whitelist, other cases' answers, wrong-accusation QA examples, editorial approvals, and solver certificates remain server/editor-only even after disclosure. For C04, select the recap variant matching the submitted pair; do not require the player to read an unselected third support to understand their own accepted proof.

### 11.2 Endpoint contract

Names are normative examples; adapt route prefixes to a host platform without changing behavior.

| Method / route | Input | Output / authority |
|---|---|---|
| `POST /api/session/telegram` | Raw initData | Verified session and minimal profile; no private case content |
| `GET /api/cases` | Locale | Public catalog, own progress summary, immutable version IDs |
| `GET /api/cases/:id/versions/:v` | Locale | Public dossier only |
| `POST /api/attempts` | Case/version, mode, idempotency key | Existing eligible attempt or new permitted attempt; revision |
| `GET /api/attempts/:id` | Owned attempt | Server state, disclosure entitlements, not unsolicited future hints |
| `PATCH /api/attempts/:id/notebook` | Base revision, bounded semantic operations, action ID | Acknowledged revision/state; 409 on conflict |
| `POST /api/attempts/:id/test` | Base revision / supplied validated snapshot, public lens | Local public rule evaluation only; no secret solution search output |
| `POST /api/attempts/:id/hints` | Requested next tier, action ID | Persisted tier + that and already disclosed hints, prospective score |
| `POST /api/attempts/:id/accusations` | Character, false card, 2 supports, action ID | Generic incomplete or atomic accepted result + recap |
| `POST /api/attempts/:id/reveal` | Explicit confirmation, action ID | Atomic Study transition + recap |
| `GET /api/attempts/:id/recap` | Owned solved/Study attempt | Authorized disclosed solution; 403 for active undisclosed attempt |
| `GET /api/progress` | Owner session | Own results/mastery |
| `GET /api/rankings` | Exact case/content/rules/assistance partition, cursor | Opted-in aliases, equal ranks, no proof details |
| `POST /api/purchases/evidence-desk/invoice` | SKU, action ID | Server-priced Telegram invoice link/order state |
| `POST /api/telegram/webhook` | Authenticated Telegram update | Verified idempotent payment/support handling |
| `GET /api/entitlements` | Owner session | Authoritative owned cosmetic state |
| `PATCH /api/preferences` | Bounded supported preference keys | Persisted locale/accessibility/cosmetic/ranking opt-in state |
| `POST /api/privacy/delete-request` | Authenticated confirmation | Deletion workflow acknowledgement and disclosed retention exceptions |

JSON errors include a stable code, localized safe message key, retryable flag, request ID, and optional current revision. No stack trace, SQL error, or hidden candidate ID. Suggested codes: `AUTH_REQUIRED`, `STALE_REVISION`, `INVALID_SELECTION`, `PROOF_INCOMPLETE`, `CONTENT_WITHDRAWN`, `ALREADY_DISCLOSED`, `RATE_LIMITED`, `TEMPORARILY_UNAVAILABLE`.

### 11.3 Saves, conflicts, and idempotency

Debounce notebook saves 300–500 ms; flush on panel exit/visibility transition where possible, but never rely on unload requests for correctness. Show **Saved** only after server acknowledgement. Use an IndexedDB/local-storage queue for small non-secret notebook changes where available; fallback to an explicit unsaved warning if storage is unavailable.

Server revision increases on every accepted mutation. A request carries `baseRevision` and a unique action ID. Duplicate same-key/same-payload mutations return the original result; same key with a different payload is rejected. Persist action results with the attempt for its lifetime or maintain an equivalent durable deduplication ledger. Payment charge deduplication has a permanent unique constraint for the retained financial record.

Serialize hint, solve, and reveal transitions with a row lock or equivalent transaction. If hint 2 commits before solve, score is 80. If solve commits before the later hint request, the solved result remains frozen and recap access does not retroactively change it. If reveal commits first, a racing accusation cannot become ranked. No client-provided score, hint count, owner ID, completion time, or entitlement is authoritative.

Mastery grants and completion events commit once with the result. Use an outbox/retry pattern for platform notifications so a transient adapter error does not duplicate rewards or lose the accepted result.

### 11.4 Input bounds and operational protection

- Case/card/character/location IDs must belong to the attempt's exact version; reject cross-case support IDs.
- Notebook payload ≤32 KB; fixed cell count; no arbitrary HTML/free-text annotation in MVP.
- Accusation exactly two support IDs; no duplicates, nulls, or non-eligible false cards.
- Limit body sizes, pagination, locale length, and action-ID length; validate all nested objects.
- Suggested initial per-account soft limits: notebook 120/minute, tests 30/minute, accusations 12/minute, hint/reveal 10/minute, invoice creation 5/minute. These are abuse controls, not lives; 429 includes retry time and never reduces score. Load-test and tune. Legitimate unlimited attempts remain available over time.
- Rate-limit auth/webhooks by appropriate authenticated identifiers and network safeguards; do not treat a shared mobile carrier IP as a single player identity.

### 11.5 Secrecy and honest anti-cheat scope

Before explicit reveal or solve, inspect network responses, HTML, hydration data, JS bundles, source maps, image names/metadata, analytics events, prefetches, local storage, error traces, and service-worker caches for private answers. No `culprit`, `isFalse`, proof whitelist, witness world, future hint, or solution text may be present.

Because the player receives all public puzzle rules and evidence, a determined person can independently solve or brute-force the finite puzzle. Server-side secrecy prevents trivial answer-table inspection; it does not promise impossible protection against deduction, screenshots, alternate accounts, or spoilers from another player. Rankings have no monetary prizes and make no claim of examination-grade integrity.

Use CSP appropriate to the bridge and payment integration, HTTPS, secure cookies, server-side authorization on every attempt, dependency/security scanning, safe text rendering, no arbitrary HTML from content, and audit-restricted access to private case packs. Never log the answer payload merely for debugging a failed proof.

### 11.6 Offline policy

Ranked solving requires server authority. Offline, users may read already loaded public evidence and edit a locally queued notebook with an unsaved warning; no hint, reveal, accepted solve, score, or purchase can be granted.

A separately labelled offline practice copy may contain answers only when they were already deliberately disclosed or the case is an explicitly public non-ranked demo. Do not precache private solutions for all cases “for offline convenience.” On reconnect, reconcile version and terminal state before sending queued notebook edits.

---

## 12. Economy, ranking, privacy, and sharing

### 12.1 Score and assistance

For the first eligible accepted full-case proof:

`score = max(70, 100 − 10 × highestHintTier)`.

Thus tiers 0/1/2/3 yield 100/90/80/70. Study and tutorials have **no ranked score**, not 0 points. Replays show Practice without creating a new first-solve ranking. Wrong accusations and timeline tests have no score penalty. No speed bonus, retry penalty, purchased multiplier, or wallet modifier.

Partition rankings by `caseId + contentVersion + rulesVersion + assistanceTier + eligibilityKind`. Locale is not a separate difficulty partition after semantic equivalence approval; locale-content revision must still be traceable. Within an exact assistance partition, the formula makes all eligible scores equal, so all those players share rank 1. That is intentional under the source's rules. Use an alphabetical/opaque stable pagination order for display, **not** a hidden tie-break based on completion speed. Explain “Shared rank”; never suggest this is a speed contest. Cross-tier comparison is a personal score summary, not a fabricated fair competitive ordering.

Participation is opt-in. Use a generated alias by default, not a real Telegram name or photo. Do not expose solving timestamps, selected evidence, or private notes in rankings. No aggregate public leaderboard needs to be invented beyond the specified per-case partitions.

### 12.2 Evidence Desk Set

One non-consumable cosmetic SKU: `evidence_desk_set_v1`, **proposed price 75 Telegram Stars**, currency `XTR` [R2]. Contents: alternate desk background, card-edge pattern, recap frame. The object illustrations, font size, contrast, route visibility, clue order, hint availability, and score calculation are identical to the free theme.

Shop copy: **“A different desk. The same evidence.” / “Другой стол. Те же доказательства.”** Show a reversible preview and an explicit price. No modal during a proof rejection, no preselected purchase, no urgency or countdown, no fake discount. All gameplay remains usable if the payment service is down.

### 12.3 Payment lifecycle and refunds

Digital goods sold inside Telegram must use Stars [R2]. The backend creates an order/invoice using the authoritative SKU and amount. Validate the pre-checkout query and answer within Telegram's required deadline (currently 10 seconds; recheck official Bot API at integration) [R3]. Grant the entitlement only after an authenticated `successful_payment` update whose order, owner, currency, amount, and charge ID are verified. `openInvoice`/invoice-close callbacks are UI signals, not sufficient proof of payment.

Handle cancelled, failed, pending, successful, duplicate, delayed, replayed, and refunded states. If the app is closed, server webhooks still grant once and the next session reconciles. Do not accept a forged client success event. Enforce unique charge IDs and prevent duplicate ownership charges where the invoice lifecycle permits. Refund through the documented `refundStarPayment` server method, retain appropriate minimal financial records, and revoke only the cosmetic entitlement. Immediately revert an active refunded theme to the equally readable default; keep all cases, notes, solves, hints, and mastery.

Provide `/paysupport`, a visible support contact, purchase terms, and refund handling before real sales. A shared one-time support purchase may appear only if the future platform already defines it; it buys no game benefit and its amount is not invented here. Sales stay disabled if price/terms/operator approval or production webhook validation is missing.

### 12.4 TON boundary

The game MUST NOT request a wallet to start, save, reveal, rank, restore progress, or buy clues. If the host platform already offers optional TON association in Profile, the game may link to it without implying game benefits. Telegram account ownership remains the progress identity. Do not implement wallet recovery, token rewards, cryptocurrency checkout for this digital cosmetic, or speculative financial messaging as part of Alibi Atlas. Reconfirm any platform wallet integration against Telegram's current applicable policies before enabling it.

### 12.5 Spoiler-safe sharing

Default share: title, neutral hook image, and an invite to try the case. Example: **“I closed a case in Alibi Atlas. Can you prove the impossible alibi?”** Do not include suspect, selected testimony, proof cards, timeline, hint text, score pressure, personal account data, or a background thumbnail that reveals the culprit. Never auto-send or request contact access.

Full-solution sharing is a separate secondary action on the recap with an explicit **Contains solution spoilers** confirmation. Use a validated deep link such as `s_C03_v1` to a warned Study-entry destination, not answer JSON or an access token in the payload. The recipient sees the case title and spoiler warning, then must independently confirm Study disclosure on their own account before `/reveal` exposes the proof; opening the link alone changes no ranking eligibility. An already solved recipient may open their authorized recap. Sharing cancellation changes no state and grants no progression reward. A simple spoiler-free link is the required fallback; advanced Telegram media-sharing support is optional and capability-gated.

### 12.6 Privacy, analytics, and retention

Collect only verified account identifier, minimal preferences, progress, security/session data, and necessary financial/support records. No contacts, phone number, location, microphone, chat history, wallet address unless an existing independently consented platform feature requires it, or advertising identifier for game operation.

Operational event allowlist: `session_started`, `case_opened`, `attempt_started`, `evidence_opened` with public card ID, `timeline_tested` with public violation count, `proof_submitted` with accepted/incomplete only, `hint_requested` with tier, `study_confirmed`, `case_completed` with score/tier, `locale_changed`, `share_dialog_opened`, `asset_failed`, and payment lifecycle counts. No raw initData, proof whitelist, full notebook, private names, or support-message contents in analytics. Restrict case-answer-level diagnostics to secure editorial tooling.

Proposed default retention: redacted operational logs 14 days; pseudonymous raw product events 30 days; aggregate non-identifying metrics 12 months; progress/preferences until deletion request or the operator's published inactivity policy. Delete ordinary account data within 30 days of a verified request; backups expire under a documented ≤90-day schedule. Financial/security records follow the operator's lawful requirements, disclosed before purchase; these durations require owner/legal approval and are not legal advice. Avoid nonessential tracking cookies; honor applicable consent/opt-out requirements and never send event exports to unapproved third parties.

---

## 13. Localization and player-facing interface copy

### 13.1 Localization contract

The specification language is English; the shipping product contains EN and RU text. All semantic entities use stable IDs; displayed names can have explicit paired spellings. Switching language changes only localized content and formatting, never puzzle variables, route costs, selected evidence, attempt IDs, hints used, or server revision semantics.

Machine-generated bilingual text in this document is an authored candidate. Publication requires **two fluent human reviewers for English and two for Russian**, with independent semantic sign-off. Two bilingual people may cover both locales if each performs the required independent reviews and the records clearly show that; do not claim four people are mandatory where the source requires two reviewers per locale.

Use ICU-style message formatting or equivalent for plural rules, including Russian case counts. Avoid string concatenation for sentences with names/locations. Store nominative and context forms when needed, or use label-style phrasing that avoids incorrect inflection. Never translate IDs. Numbered slots remain 1–4 in both locales. No puzzle depends on alphabet order, puns, homophones, gendered pronouns, or culture-specific travel assumptions.

### 13.2 Core interface strings

| Key | English | Russian |
|---|---|---|
| `app.tagline` | A statement can travel only so far. | У каждого алиби есть предел. |
| `archive.title` | The Atlas | Атлас |
| `archive.continue` | Continue the dossier | Продолжить дело |
| `archive.lessons` | Two short lessons | Два коротких урока |
| `archive.mysteries` | Ten mysteries | Десять загадок |
| `case.open` | Open the dossier | Открыть дело |
| `case.crime` | Taken at {location} · Slot {slot} | Место кражи: {location} · Момент {slot} |
| `evidence.title` | Evidence | Улики |
| `evidence.record` | Record | Подтверждённая запись |
| `evidence.testimony` | Testimony | Показание |
| `evidence.card` | Card {number} | Карточка {number} |
| `evidence.pin` | Pin for reference | Закрепить для справки |
| `timeline.title` | Timeline | Хронология |
| `timeline.slot` | Slot {number} | Момент {number} |
| `timeline.unknown` | Unknown | Не указано |
| `timeline.place` | Choose location | Выбрать место |
| `timeline.test` | Test timeline | Проверить хронологию |
| `timeline.clear` | Clear timeline | Очистить хронологию |
| `timeline.noConflict` | No conflicts in the filled cells. | В заполненных ячейках нет противоречий. |
| `timeline.partial` | Some statements cannot be checked yet. | Некоторые утверждения пока нельзя проверить. |
| `timeline.allStatements` | All statements | Все утверждения |
| `timeline.question` | Question Card {number} | Считать карточку {number} ложной |
| `routes.title` | Routes and travel times | Маршруты и время в пути |
| `routes.tip` | Check how long the journey takes. | Проверьте время в пути. |
| `routes.snapshot` | Slots are snapshots, not continuous stays. | Моменты — это отдельные наблюдения, а не непрерывное пребывание. |
| `proof.open` | Present evidence | Предъявить доказательства |
| `proof.submit` | Present the evidence | Предъявить доказательства |
| `proof.statement` | Which testimony is false? | Какое показание ложно? |
| `proof.support` | Choose two supporting cards | Выберите две подтверждающие карточки |
| `proof.goals` | Show why the statement is impossible and why its speaker could take the object. | Докажите, почему показание невозможно и почему его автор мог забрать предмет. |
| `proof.incomplete` | Proof incomplete | Доказательств недостаточно |
| `proof.explainMissing` | The accusation needs supporting evidence. | Обвинение нужно подкрепить доказательствами. |
| `proof.genericFailure` | This selection does not establish the contradiction. | Этот набор не доказывает противоречие. |
| `hint.title` | Free hints | Бесплатные подсказки |
| `hint.next` | Free hint {tier} of 3 | Бесплатная подсказка {tier} из 3 |
| `hint.score` | Your first-solve score will be {score}. | Результат первого решения составит {score} баллов. |
| `study.action` | Reveal and study | Раскрыть и разобрать |
| `study.confirm` | Reveal the complete proof? This attempt will become Study and will have no ranked score. | Раскрыть полное доказательство? Эта попытка перейдёт в режим «Разбор» и не получит рейтинговых баллов. |
| `study.label` | Study — no ranked score | Разбор — без рейтинговых баллов |
| `result.solved` | The timeline tells the truth. | Хронология раскрыла правду. |
| `result.possibleWorld` | One possible reconstruction | Один из возможных вариантов событий |
| `result.forced` | Established by the evidence | Установлено по уликам |
| `result.next` | Next case | Следующее дело |
| `result.replay` | Replay as practice | Повторить для практики |
| `ranking.shared` | Shared rank | Общее место |
| `save.pending` | Saving… | Сохраняем… |
| `save.acknowledged` | Saved | Сохранено |
| `save.offline` | Offline — changes on this device are not yet saved. | Нет сети — изменения на этом устройстве ещё не сохранены. |
| `save.conflict` | This dossier changed on another device. | Это дело изменено на другом устройстве. |
| `settings.textOnly` | Text-only evidence | Улики только текстом |
| `settings.motion` | Reduce motion | Уменьшить анимацию |
| `settings.sound` | Sound effects | Звуковые эффекты |
| `settings.ambience` | Background ambience | Фоновая атмосфера |
| `share.safe` | Share a spoiler-free case link | Поделиться ссылкой без спойлеров |
| `share.spoiler` | Contains solution spoilers | Содержит разгадку |
| `shop.tagline` | A different desk. The same evidence. | Другой стол. Те же доказательства. |
| `shop.pending` | Checking purchase… | Проверяем покупку… |
| `common.retry` | Try again | Повторить |
| `common.cancel` | Cancel | Отмена |
| `common.close` | Close | Закрыть |

Generate remaining ordinary labels from the screen inventory, then run a missing-key check in both directions. The table is the authoritative tone and key sample set; it does not authorize shipping untranslated error/help/legal screens. Operator-specific legal/contact copy requires supplied facts and review, not invented names or addresses.

---

## 14. Content production and publication pipeline

### 14.1 Case package deliverables

Each full case package MUST contain six localized cards and exact predicates; four identities; three locations and route matrix; four slots; crime declaration; unique pair; per-candidate solver results; at least one witness; complete accepted two-card proof sets and rationales; three safe hints; forced-fact annotations; full EN/RU recap; two plausible wrong accusation examples; asset and license references; semantic review signatures; and a content hash. Tutorials contain their explicitly reduced structures and their own certificates.

The appendix supplies authored candidate content. The implementation agent must transcribe it to schema-validated files without changing its logic, then independently regenerate certificates. Changes to improve a puzzle require updating its text, predicates, hints, witnesses, proofs, and both locales together.

### 14.2 Certificate format

A reproducible certificate includes `caseId`, content/rules/localization hashes, solver/reference-solver versions, predicate schema version, candidate counts, unique viable pair, witness world, actual truth vector, opportunity verification, all accepted support sets and checked entailments, forced-fact intersection, hint checks, wrong-accusation rejection reasons, enumeration completion status, test timestamp, and reviewer approval references.

Use cryptographic hashes to bind the certificate to exact immutable source content. “The author says it is unique” is not a certificate. The private corpus may be in a restricted repository or server-only build input, but it must never enter public client artifacts. Model counts in a draft are useful evidence, not a substitute for matching hashes at publication.

### 14.3 Gates and owner responsibilities

1. **Schema gate:** exact counts, IDs, enums, connected metric routes, bounded text/operators, no missing locales.
2. **Logic gate:** unique false-card/speaker pair with explicit negation and opportunity; all clues match the intended DSL; no hidden continuous-stay assumption. Every individual card, including the false testimony, must be satisfiable under movement alone; a statement that is already impossible without evidence is not a fair full-case puzzle.
3. **Proof gate:** exhaustive review of two-card combinations; sound explanation for each accepted set; no unsupported claim that selected cards force an arbitrary witness cell.
4. **Hint gate:** tier 3 placement true in every valid world; tier 1/2 disclose only their intended amount; hints remain useful and free.
5. **Counterexample gate:** two wrong accusations sound plausible but fail with cited public facts; avoid straw-man impossible forms.
6. **EN/RU human semantic gate:** two fluent reviewers per locale, identical logical meaning, names mapped consistently.
7. **Art/audio/license gate:** complete manifest, no factual image spoilers, licensed/generated rights checked, real listening review.
8. **Observed-player gate:** recorded research consent and 12-person comprehension test; investigate excessive random guessing, confusion about slots, and frustration with valid-but-unaccepted proof.
9. **Technical gate:** acceptance/security/accessibility/platform suites pass on the exact packaged version.
10. **Publisher gate:** owner/operator approves content version, support/legal details, optional cosmetic price, and deployment.

An AI agent cannot provide the independent human signatures, legal approval, real payment credentials, or actual user-test participants by declaring itself satisfied. It should complete all automatable work and present the remaining gates as specific release blockers.

### 14.4 Versioning and corrections

A published semantic change creates a new content version. Freeze an active attempt to its original case/rules/locale-content version; no silent clue replacement, even if “just a typo” changes interpretation. Pure spelling/formatting corrections can have a new locale-content revision only after evidence shows no semantic effect and the policy allows it.

For unfair ambiguity, withdraw the affected version from new ranked play, preserve existing progress, display the correction, and invalidate affected ranking eligibility without blaming players or deleting achievements earned in good faith. A corrected case gets a fresh first-eligible attempt on its new version, with an explicit version label. Do not compare scores across materially different versions. Rollback can disable a release pointer but cannot mutate past certificate hashes.

No automatic daily mystery publishing. Weekly authored releases are a future operational choice dependent on the same review capacity and gates.

---

## 15. Performance, testing, and acceptance criteria

### 15.1 Performance budgets

Measure on a representative lower-midrange Android phone with approximately 4 GB RAM and current supported Telegram, plus an iPhone with a supported iOS/Telegram version. Record actual devices/versions/network profile; no fabricated benchmark claims.

| Surface | Target / budget |
|---|---|
| Initial app shell transfer | ≤450 KB compressed JavaScript; ≤100 KB CSS; combined initially needed fonts ≤220 KB |
| First useful archive | ≤1.5 MB transfer including first illustration; lazy-load the remaining catalog art |
| Interactive startup | ≤3 s on a defined 10 Mbps / 100 ms RTT cold network profile, excluding Telegram's own host startup |
| Placement UI response | <100 ms perceived response; no solver work blocking input |
| Server notebook/test endpoints | p95 <300 ms under the documented baseline load, excluding network |
| Proof/hint endpoint | p95 <500 ms under baseline load; accepted set lookup, not per-request exhaustive enumeration |
| Active case images | ≤2.5 MB compressed; decode only visible/nearby images |
| Active WebView memory | Target <150 MB working footprint; investigate sustained >200 MB on reference device |
| Motion | Smooth 60 fps where supported; no sustained >50 ms main-thread tasks during basic interaction |
| Largest hook | ≤250 KB WebP derivative used by phone; dimension-appropriate loading |
| Portrait | ≤35 KB at 256 px derivative |
| Audio | §9 budgets; none required for first paint |
| Public API dossier | ≤60 KB JSON per locale full case, excluding image binaries |

If a budget is exceeded, optimize assets, code split, defer noncritical screens, and reduce decoration before removing text or accessibility. Do not preload 138 masters or every solution. Test cache invalidation, low storage, and disabled audio support.

### 15.2 Acceptance test matrix

| ID | Test | Required outcome |
|---|---|---|
| AA-001 / G05-A01 | A at Slot 1 → C at Slot 2; then C at Slot 3 via B | First rejected with route ID; second allowed by travel. |
| AA-002 | Same character given two locations in one slot through malformed payload | Rejected; ordinary replacement UI creates only one assignment. |
| AA-003 | Different characters share a location | Allowed unless an explicit evidence predicate says otherwise. |
| AA-004 | False candidate merely omitted would pass, but its predicate remains true | Correct solver rejects because NOT(Ef) is required. |
| AA-005 / G05-A04 | Zero, one, and two viable-pair fixtures | Only exactly one passes publication. |
| AA-006 | Multiple complete worlds for one viable pair | Allowed; recap says one possible reconstruction. |
| AA-007 | False conjunction with exactly one false clause | Accepted according to Boolean negation, not all-clauses-false mistake. |
| AA-008 | Inclusive OR in both locales | One or both true satisfies; translations preserve this. |
| AA-009 | Partial notebook with distant filled endpoints | Two-slot travel bound checked even with middle unknown. |
| AA-010 | Missing operands in evidence test | Unknown, not automatically supported or contradicted. |
| AA-011 | Change hypothesis lens | Evaluates only public chosen assumptions; no secret candidate count/answer hint. |
| AA-012 / G05-A02 | Correct culprit with unrelated supports | Proof incomplete; no result/mastery/XP. |
| AA-013 | Exhaust all support pairs and reverse their order | All and only §5.5 qualifying pairs accepted; both proof goals and each card's contribution verified. |
| AA-014 | Duplicate/support-equals-false/cross-case IDs | Structurally rejected without private answer disclosure. |
| AA-015 | Correct proof with partial or empty notebook | Accepted; full reconstruction not required. |
| AA-016 / G05-A03 | Inspect all initial client/network/build surfaces | No private culprit, false markers, whitelist, witness, unreleased hints, or recap. |
| AA-017 | Enumerate public clues outside app | Recognized as inherent possible solving, not falsely called a preventable secrecy guarantee. |
| AA-018 / G05-A05 | Switch EN↔RU after placements/marks/hint | Same IDs, world set, selection, saved state, and assistance remain. |
| AA-019 | 2 human reviewers per locale | Signatures and semantic comparison attached before publication; AI draft not accepted as substitute. |
| AA-020 / G05-A06 | First solve at hint tiers 0/1/2/3 | Scores exactly 100/90/80/70. |
| AA-021 | Duplicate solve and outbox retry | One completion/mastery grant; identical result returned. |
| AA-022 | Reopen same hint / retry after lost response | No extra tier/penalty; disclosed hint returned. |
| AA-023 | Reveal cancelled, then confirmed | Cancel changes nothing; confirmed becomes Study and score is null. |
| AA-024 | Hint/solve/reveal race | Transaction order respected; no clean ranked solve after committed reveal. |
| AA-025 | Restart studied/solved version | Practice only; no laundering into a new unassisted first solve. |
| AA-026 | 1/5/10 distinct full solves and tutorial/Study counterexamples | Correct mastery; no tutorial/Study inflation. |
| AA-027 | Ties in exact assistance partition | Equal rank, no timestamp tie-break. |
| AA-028 | Save acknowledged, close app, reopen elsewhere | Exact server notebook and hint tier restored. |
| AA-029 | Unsaved edits and offline closure | Honest warning; local recovery where available; no claim of guaranteed unsent save. |
| AA-030 | Revision conflict | No silent overwrite; user sees server/local resolution. |
| AA-031 / G05-A07 | T01 via keyboard, list view, 200% text | Complete without drag, clipping, or hidden primary controls. |
| AA-032 | 320 px / 400% equivalent reflow | Reading/proof flow accessible without essential horizontal scroll. |
| AA-033 | VoiceOver/TalkBack | Names, card numbers, selections, dialogs, results understandable. |
| AA-034 | Grayscale/color-vision simulation and mute | All states and clues remain distinguishable. |
| AA-035 | Reduced motion and large text together | No off-screen CTA, timed clue, or required animated inference. |
| AA-036 | Telegram safe areas, resize, keyboard, back | No obscured evidence/actions; expected navigation/state preservation. |
| AA-037 | Older client missing optional bridge methods | Basic play works; optional fullscreen/share/haptics gracefully absent. |
| AA-038 | Audio autoplay blocked, background/resume | Silent continuation; no unauthorized background audio. |
| AA-039 | Forged/stale initData; another user's attempt ID | Rejected; no disclosure or mutation. |
| AA-040 | Production configured with development auth bypass | Build/deploy fails safety gate. |
| AA-041 | Forged client payment success | No entitlement. |
| AA-042 | Valid payment, duplicate/delayed webhook | Exactly one entitlement, restored on reopen. |
| AA-043 | Cancellation/refund during active cosmetic | No gameplay loss; refund returns free theme, preserving progress. |
| AA-044 | Cosmetic readability | Equal clue visibility, contrast, hit targets, and logic. |
| AA-045 | Spoiler-free share preview/payload | No solution, private account data, or automatic send. |
| AA-046 | Full solution share | Separate explicit warning and user action. |
| AA-047 | Missing image/audio/font | Legible complete logic; safe fallbacks; no broken layout. |
| AA-048 | Content correction and stale deep link | Version notice, old progress preserved, unfair ranking excluded. |
| AA-049 | Per-case hints and two wrong accusations | All present, correct, and consistent in both locales. |
| AA-050 | All twelve complete end-to-end routes | Tutorials plus ten full cases usable; no placeholder dossier or unfinished recap. |
| AA-051 | Actual 12-person observation | At least 9 explain contradiction; failures trigger proof/editorial redesign, not paid assistance. |
| AA-052 | Asset/audio manifest and license audit | All 138 raster masters/required derivatives and 18 sound IDs accounted for, or approved manifest consolidation with equivalent coverage; no SVG/unlicensed assets. |
| AA-053 | Real Telegram Stars sandbox/test integration | Official lifecycle exercised; mock-only tests not claimed as real payment validation. |
| AA-054 | Privacy deletion and logs | No secret logs; owned data removed under published policy, financial exceptions disclosed. |
| AA-055 | Supplied Platform SRS reconciliation | Shared suites mapped and run once available; absence remains a named integration gate. |
| AA-056 | Each individual testimony/record checked without other cards | Every card is satisfiable under movement; no full-case lie is exposed merely by reading an intrinsically impossible claim. |

### 15.3 Test strategy

Unit tests cover operators, travel metrics, negation, partial evaluation, schema boundaries, score rules, state transitions, content hashing, support canonicalization, and version pins. Property tests generate small worlds to compare direct predicates with the solver and test renaming/locale invariance. Mutation tests intentionally corrupt a clue, negate a clause, introduce a second viable pair, and insert a wrong hint placement; publication must fail.

Integration tests cover ownership, revision conflicts, idempotency, racing mutations, webhook authenticity, entitlement/refund reconciliation, public/private serialization, and transaction/outbox recovery. E2E runs both locales, keyboard/list mode, hint/Study/solve paths, interrupted saves, and every authored case. Use isolated synthetic test accounts and resettable fixtures; never reset production users or purchase real Stars without authorization.

Security tests scan built output for distinctive private fixture canaries, attempt direct recap access, spoof scores/user IDs, test XSS-like content strings, and verify private cache headers. Performance tests use reproducible profiles and a documented modest baseline load, initially 100 concurrent active sessions / 20 read requests per second / 5 mutation requests per second; adapt to actual deployment sizing rather than promise unbounded scale.

### 15.4 Playtest protocol

Recruit 12 consenting intended-audience participants, with EN and RU coverage (target 6 per locale) and varied familiarity; include accessibility users or a separate focused accessibility session rather than pretending simulations replace them. No researcher hints except the game's own assistance. Give T01 and two full cases representing early and later complexity; rotate cases to cover the corpus across sessions.

Record: whether the player distinguishes Record/Testimony, understands sampled slots and route costs, can submit supports, can explain the contradiction without naming-only guessing, uses available hints, recognizes Study, and returns after an interruption. Duration and abandonment are diagnostic, not score. Ask “What made that statement impossible?” before showing the recap when feasible. If fewer than 9 explain, revise and retest; do not cherry-pick participants or count a memorized recap as independent deduction.

---

## 16. Delivery plan, operations, and definition of done

### 16.1 Ordered implementation milestones

| Milestone | Complete output | Exit gate |
|---|---|---|
| M0 Contract freeze | Read this document and available Platform SRS; decision log; lock stack versions; operator facts list | No unresolved contradiction in rules/auth/payment boundary |
| M1 Logic first | Public DSL, independent enumerator, case schema, draft certificates, private content split | All 12 candidate dossiers validated; broken content stopped before UI polish |
| M2 Accessible vertical slice | Telegram shell, T01 → notebook → valid proof → recap → save/reopen in EN/RU | Actual device and keyboard/list flow works, no client answer leaks |
| M3 Full gameplay | T02 and full corpus, proof alternatives, hints/Study, progress, versioning, offline/conflicts | Core acceptance/security suites pass |
| M4 Art and audio finish | Complete raster manifest, finished UI, generated audio, accessibility polish | Phone-size visual review, listening review, no placeholders |
| M5 Optional economy and platform | Stars cosmetic lifecycle, opt-in ranking, safe sharing, supplied platform adapters | Authorized integration tests and owner approvals; gameplay independent of shop |
| M6 Editorial and release QA | Human locale reviews, observation, all target devices, corrections, licenses | All release gates signed; not merely a successful build |
| M7 Handoff | Production package/runbooks, test evidence, content certificates, owner-visible limitations | Reproducible clean install/build/deploy and honest completion report |

No speculative duration or cost is asserted. Editorial review and external approvals may take longer than coding. Maintain a checklist of completed vs blocked outputs; do not call the entire game complete after a polished hook screen.

### 16.2 Reproducible project deliverables

The implementation agent must leave source, lockfile, schema/migrations, server-only content, public locales, manifests/licenses, audio-generation utility and masters, certificate generation commands, tests, environment-variable template without secrets, local setup/run commands, build/deploy commands, and a concise operations guide. Package scripts should cover `dev`, `build`, `typecheck`, `lint`, `test`, `test:e2e`, `content:validate`, `assets:validate`, and `audio:build` or clearly documented equivalents.

Required secret/config names can include `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET`, `DATABASE_URL`, `SESSION_SECRET`, `PUBLIC_APP_URL`, `TELEGRAM_BOT_USERNAME`, `TELEGRAM_APP_SHORT_NAME`, support/privacy contacts, and an environment flag. Public frontend environment values MUST NOT contain the bot token, session key, private content, or payment secrets. Keep development fixture data isolated from production.

### 16.3 Deployment and operations

Use separate development/staging/production data and bot credentials. Apply reversible database migrations where practical; back up before destructive changes. Serve hashed public assets with immutable caching; private attempt/hint/recap responses use authenticated private/no-store policy. Deploy case versions atomically only after validation; cache keys include full content/locale revisions.

Health checks distinguish process liveness from database/API readiness. Alert on auth failure spikes, failed/slow mutations, webhook failures, entitlement mismatches, duplicate-result constraint violations, content-validator failures, and asset errors. Logs carry request IDs, not answers or credentials. A missing optional shop must not take down solving.

Operational runbooks: rollback frontend/API version; withdraw a broken case; restore database backup in staging; replay an outbox; reconcile payment/refund; process data deletion; rotate bot/session secrets; respond to leaked private content; rebuild assets/certificates. Set owner-approved backup cadence and restoration targets before launch; baseline proposal daily encrypted backups, RPO ≤24 hours and RTO ≤4 hours, verified with a restore drill rather than asserted.

### 16.4 Definition of done

**Documentation complete** means this single file contains an actionable coherent plan, exact candidate case material, asset/audio production instructions, data/API contracts, validation rules, acceptance tests, and explicitly identified external gates.

**Implementation complete** means the agent has built and verified every mandatory product surface, including all dossiers, persistence, free assistance, accepted proof alternatives, privacy boundaries, accessibility, final assets, and failure states—not just code that compiles.

**Release approved** additionally requires human bilingual semantic review, observed-player validation, final design/rights review, deployment credentials/operator facts, Telegram integration tests, applicable payment/legal approval if sales are enabled, and reconciliation with the missing Platform SRS when integrating into that platform.

The final implementation report must list commands and actual results, device/browser versions, evidence links, all shipped case versions/certificate hashes, asset/license status, payment environment used, and any remaining blocker. Never say “all finished” while concealing mock authentication, placeholder art, uncertified mysteries, untested refunds, missing Russian text, or unavailable human review.

---

## 17. Authored tutorial dossiers

**Spoiler-private authoring material.** These two reduced lessons are included in the twelve-dossier launch count, do not award ranked score or full-case mastery, and use the same proof form and persistence behavior as full cases. Their difficulty reduction is explicitly labelled before play.

### 17.1 T01 — The Brass Bookmark / Латунная закладка

**Lesson:** One person cannot occupy two sites at the same sampled moment. A proof cites cards rather than selecting a face.\
**Shape:** 2 characters, Slots 1–3, 3 sites, 3 cards; candidate testimonies E1 and E2.\
**Object:** A brass bookmark shaped like a small folded fan.\
**Crime:** C, Slot 2.\
**Route matrix:** A–B=1, B–C=1, A–C=2, stays=0.

**Hook EN:** “The archive's brass bookmark has vanished from the loan desk. It is a small loss, but it marks the page for tonight's public reading. Two people have described the moment it disappeared.”\
**Hook RU:** «Со стола выдачи исчезла латунная закладка архива. Пропажа невелика, но именно ею отмечена страница для сегодняшнего чтения. Два человека рассказали, где находились в момент исчезновения.»

| ID | Character / role | Portrait and neutral introduction |
|---|---|---|
| p1 | Lina / Лина; volunteer reader / волонтёр чтец | Short dark curls, rust cardigan, relaxed attentive expression. EN: “Lina prepares the reading.” RU: «Лина готовит чтение». |
| p2 | Tom / Том; bookbinder / переплётчик | Wavy greying hair, teal work apron, calm expression. EN: “Tom repairs the archive's books.” RU: «Том чинит книги архива». |

Locations: A = Reading Nook / Уголок чтения; B = Passage / Проход; C = Loan Desk / Стол выдачи.

| Card | Type / speaker | Exact predicate | English | Russian |
|---|---|---|---|---|
| E1 | Testimony / p1 | `AT(p1,2,A)` | Lina: “At Slot 2, I was in the Reading Nook.” | Лина: «В момент 2 я была в Уголке чтения». |
| E2 | Testimony / p2 | `AT(p2,2,A)` | Tom: “At Slot 2, I was in the Reading Nook.” | Том: «В момент 2 я был в Уголке чтения». |
| E3 | Record | `AND(AT(p1,2,C),AT(p2,2,A))` | The checked desk record places Lina at the Loan Desk and Tom in the Reading Nook at Slot 2. | Проверенная запись указывает: в момент 2 Лина была у Стола выдачи, а Том — в Уголке чтения. |

**Solution:** false E1, culprit p1. Accepted supports `{E2,E3}`. This introductory proof deliberately includes corroboration/exclusion that is not individually necessary to expose Lina's direct contradiction; minimal two-card cores are not a tutorial requirement. The UI teaches the fixed proof form, then explicitly says the record establishes the decisive conflict.

**Hints EN/RU:**

1. “Compare the Reading Nook and the Loan Desk.” / «Сравните Уголок чтения и Стол выдачи».
2. “All three cards describe Slot 2.” / «Все три карточки описывают момент 2».
3. “Place Lina at the Loan Desk at Slot 2, as the record states.” / «Поместите Лину у Стола выдачи в момент 2, как указано в записи».

**Recap EN:** (1) E3 places Lina at the Loan Desk at Slot 2. (2) E1 places that same person in the Reading Nook at the same moment; one person cannot be in both. (3) E3 agrees with Tom's E2, so Tom's account has no such conflict. (4) Lina's false statement and presence at the crime site identify her under this lesson's rule. The complete paths shown below are examples, not additional established facts.\
**Recap RU:** (1) E3 помещает Лину у Стола выдачи в момент 2. (2) E1 помещает того же человека в Уголок чтения в тот же момент; одновременно быть в двух местах нельзя. (3) E3 согласуется с показанием Тома E2, поэтому такого противоречия у него нет. (4) Ложное показание Лины и её присутствие в месте кражи указывают на неё по правилам урока. Полные маршруты ниже — примеры, а не дополнительные установленные факты.

**Wrong examples:** accuse Tom/E2 with E1+E3: E2 agrees with the authenticated record; its negation is impossible. Choose Lina/E1 with E1+E3: invalid structure because the false card cannot support itself; show form guidance rather than a spoiler. Tutorials teach this structural error; full cases require two logically plausible wrong accusations instead.

**One witness:** p1=`C,C,C`; p2=`A,A,A`.\
**Documentation-stage exhaustive check:** 17 legal three-slot paths per character; candidate E1 has 16 valid worlds, E2 has 0. The tier-3 placement holds in every valid world. The witness above satisfies all constraints with E1 false. This is a mathematical draft check, not a human fairness certificate.\
**Closure EN:** “Lina returns the bookmark from a rehearsal script. The right page is found before the audience arrives.”\
**Closure RU:** «Лина возвращает закладку из репетиционного текста. Нужную страницу находят до прихода слушателей».

**Art:** warm loan desk, closed book with a clean empty bookmark recess, folded-fan brass object; no painted readable page text. First placement is user-controlled, not an animation that secretly finishes the lesson. Onboarding highlights E3 only after explicit instructional progression; any guided reveal remains tutorial-only.

### 17.2 T02 — The Lantern Tag / Бирка фонаря

**Lesson:** A two-step trip across two intervals fixes the middle observation.\
**Shape:** 3 characters, Slots 1–4, 3 sites, 4 cards; candidate testimonies E1 and E2.\
**Object:** A small enamel lantern tag.\
**Crime:** B, Slot 2.\
**Route matrix:** A–B=1, B–C=1, A–C=2, stays=0.

**Hook EN:** “A lantern's enamel tag is missing from the covered passage. Before the evening exhibition, the archive needs to know who took it. The entrance records leave only a narrow route through the four moments.”\
**Hook RU:** «Из крытого прохода исчезла эмалевая бирка фонаря. Перед вечерней выставкой архиву нужно выяснить, кто её забрал. Записи у входов оставляют лишь узкий маршрут между четырьмя моментами.»

| ID | Character / role | Portrait and neutral introduction |
|---|---|---|
| p1 | Noor / Нур; exhibition helper / помощница выставки | Dark tied-back hair, indigo overshirt, neutral expression. EN: “Noor helps arrange the exhibition.” RU: «Нур помогает готовить выставку». |
| p2 | Ivo / Иво; lamp repairer / мастер по ремонту ламп | Light cropped hair, rolled sleeves, calm expression. EN: “Ivo repairs the display lamps.” RU: «Иво чинит выставочные лампы». |
| p3 | Vera / Вера; catalog assistant / помощница каталогизатора | Silver braid, ochre scarf, relaxed expression. EN: “Vera checks the object labels.” RU: «Вера проверяет подписи к экспонатам». |

Locations: A = Gate Room / Комната у ворот; B = Covered Passage / Крытый проход; C = Lantern Room / Зал фонарей.

| Card | Type / speaker | Exact predicate | English | Russian |
|---|---|---|---|---|
| E1 | Testimony / p1 | `AT(p1,2,C)` | Noor: “At Slot 2, I was in the Lantern Room.” | Нур: «В момент 2 я была в Зале фонарей». |
| E2 | Testimony / p2 | `AND(AT(p2,3,C),AT(p3,3,C))` | Ivo: “At Slot 3, Vera and I were both in the Lantern Room.” | Иво: «В момент 3 мы с Верой были в Зале фонарей». |
| E3 | Record | `AT(p1,1,C)` | The entrance record places Noor in the Lantern Room at Slot 1. | Запись у входа помещает Нур в Зал фонарей в момент 1. |
| E4 | Record | `AT(p1,3,A)` | The gate record places Noor in the Gate Room at Slot 3. | Запись у ворот помещает Нур в Комнату у ворот в момент 3. |

**Solution:** false E1, culprit p1; accepted support set `{E3,E4}`. No other two-card set is approved for this lesson's complete route explanation. E4 alone already contradicts E1's final one-slot leap, but both E3/E4 establish the taught full route and force the crime-site middle placement.

**Hints EN/RU:**

1. “Find the route between the Lantern Room and the Gate Room.” / «Найдите маршрут между Залом фонарей и Комнатой у ворот».
2. “Compare Noor's positions at Slots 1 and 3. What must happen at Slot 2?” / «Сравните положения Нур в моменты 1 и 3. Где она должна быть в момент 2?»
3. “Place Noor in the Covered Passage at Slot 2.” / «Поместите Нур в Крытый проход в момент 2».

**Recap EN:** (1) E3 fixes Noor at C at Slot 1; E4 fixes Noor at A at Slot 3. (2) The route C–B–A needs both available intervals. (3) Noor must therefore be at B at Slot 2, where the tag was taken. (4) E1 instead places Noor at C at Slot 2; that would leave only one interval to reach A, which is impossible. (5) The remaining testimony can be true, so Noor/E1 is the sole viable pair.\
**Recap RU:** (1) E3 фиксирует Нур в C в момент 1, а E4 — в A в момент 3. (2) Маршрут C–B–A занимает оба доступных интервала. (3) Поэтому в момент 2 Нур должна быть в B, где забрали бирку. (4) E1 помещает Нур в C в момент 2; тогда до A остаётся один интервал, чего недостаточно. (5) Другое показание может быть правдивым, поэтому единственная допустимая пара — Нур/E1.

**Wrong examples:** Ivo/E2 with E3+E4 fails because retaining Noor's E1 conflicts with E4; Noor/E1 with E2+E3 is an incomplete route proof because it does not establish the later gate position.\
**One witness:** p1=`C,B,A,A`; p2=`C,C,C,C`; p3=`C,C,C,C`.\
**Documentation-stage exhaustive check:** 41 legal four-slot paths per character; candidate E1 has 200 valid worlds, E2 has 0. The tier-3 placement holds in every valid world. The witness above satisfies all constraints with E1 false. Production must independently regenerate the certificate for its exact content version.\
**Closure EN:** “Noor returns the tag, borrowed without asking to compare its enamel with a display sample. The lantern is labelled again.”\
**Closure RU:** «Нур возвращает бирку, которую взяла без спроса, чтобы сравнить эмаль с выставочным образцом. Подпись снова на фонаре».

**Art:** a covered passage joining two small exhibition rooms, cream enamel tag with a blank face and brass rim. Do not paint numbered clocks, a direct A–C doorway, or Noor holding the stolen tag in unrevealed art.

---

## 18. Authored full-case dossiers

The ten full dossiers follow below. All are **private authored candidates**, with concrete scripts and logical structures rather than empty content briefs. The final implementation must bind them to hashes, independently regenerate solver/proof certificates, and complete the human/localization/art/playtest gates. Any reported mathematical checks are scoped to the documented draft semantics; they are not a declaration that the game has been implemented or released.

### 18.1 C01 — Crossed Lanterns / Скрещённые фонари

**Difficulty / teaching purpose:** Foundations — travel gap.
**Shape:** 4 characters × 4 slots; 3 sites; 6 cards. Candidate testimonies: E4, E5, E6. Five cards are true; one candidate testimony is false.
**Stolen object:** brass harmonic key / латунный гармонический ключ.
**Public crime declaration:** location `B`, Slot `3`. EN: “The object was taken at Lantern Court at Slot 3.” RU: «Место кражи — Двор фонарей; момент 3».

**Hook EN:** Rain has delayed the lantern choir, but the empty tuning case is the real problem: its brass key is missing. Four people crossed the archive courtyards. Six short cards must decide whether their routes fit.\
**Hook RU:** Дождь задержал выступление хора фонарей, но настоящая проблема — пустой футляр: исчез латунный ключ для настройки. Четыре человека проходили через архивные дворы. Шесть карточек помогут проверить их маршруты.

#### Characters and portrait production

| ID | Name EN / RU | Neutral identity EN / RU | Raster portrait brief |
|---|---|---|---|
| p1 | Ivo Maren / Иво Марен | Lantern conservator; careful with old mechanisms, impatient with damp weather. / Хранитель фонарей; бережёт старые механизмы, не любит сырость. | Mid-40s, close dark curls, olive complexion, indigo canvas jacket, clean-shaven. |
| p2 | Nessa Quill / Несса Квилл | Botanical illustrator; labels every specimen in tiny ink. / Ботаническая иллюстраторка; подписывает каждый образец мельчайшими чернилами. | Early 30s, deep brown skin, coiled hair in a high bun, moss-green blouse, round glasses. |
| p3 | Orin Vale / Орин Вейл | Choir copyist; hears a wrong interval immediately. / Переписчик хоровых партий; сразу слышит неверный интервал. | Late 50s, pale skin, silver side-parted hair, soft blue waistcoat, fine moustache. |
| p4 | Talia Morn / Талия Морн | Ferry clerk; delivers paper bundles between desks. / Служащая переправы; разносит бумажные свёртки между столами. | Late 20s, warm brown skin, shoulder-length straight black hair, ochre work shirt. |

All portraits use the shared cream backdrop, equal framing, and neutral attentive expressions. Appearance and demeanor have no evidentiary meaning.

| Site | English | Russian |
|---|---|---|
| A | Bellwether Archive | Архив «Колоколье» |
| B | Lantern Court | Двор фонарей |
| C | Tide Room | Комната приливов |

**Routes:** A–B: 1 slot; B–C: 1 slot; A–C: 2 slots via B; staying: 0. Symmetric, no extra route or transit state. On-screen recaps and hints expand A/B/C to the localized site names (or show the name alongside the letter).

#### Six evidence cards

| ID | Type / speaker | Exact predicate | English card text | Russian card text |
|---|---|---|---|---|
| E1 | Record / Подтверждённая запись | `AT(p1,1,A)` | “At Slot 1, Ivo Maren was at Bellwether Archive.” | «Момент 1: Иво Марен; место — Архив «Колоколье».» |
| E2 | Record / Подтверждённая запись | `AT(p1,3,B)` | “At Slot 3, Ivo Maren was at Lantern Court.” | «Момент 3: Иво Марен; место — Двор фонарей.» |
| E3 | Record / Подтверждённая запись | `AND(SAME(p1,p3,3),AT(p4,2,B))` | “Both statements are true: At Slot 3, Ivo Maren and Orin Vale were in the same location; At Slot 2, Talia Morn was at Lantern Court.” | «Верны оба утверждения: В момент 3 Иво Марен и Орин Вейл находились в одном месте; Момент 2: Талия Морн; место — Двор фонарей.» |
| E4 | Testimony / Показание — Ivo Maren / Иво Марен | `AT(p1,2,C)` | “At Slot 2, I was at Tide Room.” | «В момент 2 моё местонахождение — Комната приливов.» |
| E5 | Testimony / Показание — Nessa Quill / Несса Квилл | `AT(p2,3,A)` | “At Slot 3, I was at Bellwether Archive.” | «В момент 3 моё местонахождение — Архив «Колоколье».» |
| E6 | Testimony / Показание — Orin Vale / Орин Вейл | `OR(AT(p3,1,C),AT(p3,2,C))` | “At least one statement is true: At Slot 1, I was at Tide Room; At Slot 2, I was at Tide Room.” | «Верно хотя бы одно утверждение: В момент 1 моё местонахождение — Комната приливов; В момент 2 моё местонахождение — Комната приливов.» |

Records are authenticated checkpoint observations; compound records combine two observations on one card. The literal text above is authoritative. Do not invent an image-only receipt detail, continuous stay, entrance/exit event, or exclusive meaning for “at least one.”

#### Private solution and checked proof certificate

- **False testimony / culprit:** `E4` / `p1` — Ivo Maren / Иво Марен.
- **Candidate model counts:** `E4: 11340`, `E5: 0`, `E6: 0`.
- **All exact accepted two-card sets:** `{E1,E2}`. Order is immaterial.
- Every listed pair is satisfiable, entails both falsehood and opportunity, and loses at least one conclusion when either support is removed. All ten possible support pairs were checked; there is no unpublished preferred combination.
- Every individual card is satisfiable under movement alone. The tier-3 placement below holds in every valid full world.
- **Forced placements:** p1/Slot 1=A; p1/Slot 3=B; p2/Slot 3=A; p3/Slot 3=B; p4/Slot 2=B. Only these cells may be labelled established by the complete dossier.

**One possible reconstruction, not a unique timeline:**

| Character | Slot 1 | Slot 2 | Slot 3 | Slot 4 |
|---|---|---|---|---|
| p1 | A | A | B | A |
| p2 | A | A | A | A |
| p3 | B | C | B | A |
| p4 | A | B | A | A |

#### Three free hints

| Tier | English | Russian |
|---|---|---|
| 1 | Compare the Archive and the Tide Room. | Сравните Архив и Комнату приливов. |
| 2 | Inspect the interval from Slot 1 to Slot 2; it allows only one route step. | Проверьте интервал между моментами 1 и 2: за него можно пройти лишь один участок маршрута. |
| 3 | Place Ivo at B at Slot 3, as the lamp-test record states. | Поместите Иво в B в момент 3, как указано в записи проверки фонаря. |

**Tier-3 assertion:** `AT(p1,3,B)`. Reopening it never advances the tier again.

#### Full reasoning EN / RU

1. **EN:** E1 places Ivo at A at Slot 1. E4 claims C at Slot 2.\
   **RU:** E1 помещает Иво в A в момент 1. E4 утверждает, что в момент 2 он был в C.
2. **EN:** A to C needs two intervals; Slots 1 to 2 provide only one. E4 cannot be true.\
   **RU:** Путь из A в C требует двух интервалов, а между моментами 1 и 2 только один. E4 не может быть правдой.
3. **EN:** E2 independently places Ivo at B at Slot 3, the crime site and moment.\
   **RU:** E2 независимо помещает Иво в B в момент 3 — в место и момент кражи.
4. **EN:** E1 establishes the impossible alibi; E2 establishes opportunity. Both supports contribute.\
   **RU:** E1 доказывает невозможность алиби, а E2 — возможность совершить кражу. Обе карточки необходимы для этих двух выводов.
5. **EN:** Making a different testimony false leaves E1, E2, and Ivo’s impossible E4 in place. Only Ivo/E4 fits the complete dossier.\
   **RU:** Если объявить ложным другое показание, E1, E2 и невозможное E4 Иво остаются в силе. Всему делу соответствует только пара Иво/E4.

#### Two plausible wrong accusations

- **Selection:** `p2 / E5 / E1+E2` — Nessa Quill / Несса Квилл. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E4 to be true, while records E1+E2 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E4, а записи E1+E2 делают это невозможным. Одной возможности совершить кражу недостаточно».
- **Selection:** `p3 / E6 / E1+E2` — Orin Vale / Орин Вейл. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E4 to be true, while records E1+E2 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E4, а записи E1+E2 делают это невозможным. Одной возможности совершить кражу недостаточно».

These examples are private QA/editorial metadata. A live rejected submission receives only the generic Proof incomplete response, never these answer-bearing explanations.

#### Closure and art

**Closure EN:** Ivo returns the key and admits hiding it to delay a rehearsal while a repair remained unfinished. The choir begins late, with an honest explanation and every lantern working.\
**Closure RU:** Иво возвращает ключ и признаётся, что спрятал его, чтобы задержать репетицию до окончания ремонта. Хор начинает поздно — с честным объяснением и исправными фонарями.

**Case art brief:** Rain-dark courtyard paving, hanging unlit brass lanterns, an empty small tuning case; object is a distinctive three-lobed brass key. No person holds it in unrevealed art.

**Asset expansion:** one hook, one object cutout, three site vignettes, four portraits under `case.C01.*`, plus existing shared evidence materials. Never paint the culprit holding the object before disclosure. Motive/recovery text appears only after solve or explicit Study.

---


### 18.2 C02 — The Salt Ledger / Соляная книга

**Difficulty / teaching purpose:** Foundations — co-location.
**Shape:** 4 characters × 4 slots; 3 sites; 6 cards. Candidate testimonies: E1, E4, E6. Five cards are true; one candidate testimony is false.
**Stolen object:** hand-cut silver ledger seal / резная серебряная печать для книги.
**Public crime declaration:** location `A`, Slot `2`. EN: “The object was taken at Salt Ledger Room at Slot 2.” RU: «Место кражи — Зал Соляной книги; момент 2».

**Hook EN:** A silver seal has vanished before the old salt ledger can be displayed. Without it, an ordinary book loses the mark that ties it to a century of town deliveries. The glass gallery is ready for visitors; the empty seal cushion is not.\
**Hook RU:** Перед выставкой старой Соляной книги исчезла серебряная печать. Без неё книга лишается знака, связывающего её с вековой историей городских поставок. Стеклянная галерея готова к посетителям; пустая подушечка для печати — нет.

#### Characters and portrait production

| ID | Name EN / RU | Neutral identity EN / RU | Raster portrait brief |
|---|---|---|---|
| p1 | Milo Seret / Мило Серет | Press conservator; keeps paper fibres in labelled envelopes. / Хранитель печатных листов; хранит волокна бумаги в подписанных конвертах. | Early 40s, medium brown skin, short wavy hair, cream collarless shirt, rectangular glasses. |
| p2 | Ada Venn / Ада Вен | Salt-book binder; practical, fond of neat margins. / Переплётчица соляных книг; практична, любит ровные поля. | Mid-50s, light skin, cropped grey curls, rust cardigan, no spectacles. |
| p3 | Ruan Leif / Руэн Лейф | Weather volunteer; makes rain readings for schoolchildren. / Волонтёр метеостанции; ведёт наблюдения за дождём для школьников. | Late 20s, deep brown skin, short twists, teal rain cape folded at the shoulders. |
| p4 | Celia Nore / Селия Нор | Archive porter; remembers which trolley went where. / Сотрудница перевозки архивных материалов; помнит маршруты тележек. | Early 60s, olive skin, dark-and-silver braid, navy practical vest. |

All portraits use the shared cream backdrop, equal framing, and neutral attentive expressions. Appearance and demeanor have no evidentiary meaning.

| Site | English | Russian |
|---|---|---|
| A | Salt Ledger Room | Зал Соляной книги |
| B | Courtyard Well | Колодец во дворе |
| C | Glass Gallery | Стеклянная галерея |

**Routes:** A–B: 1 slot; B–C: 1 slot; A–C: 2 slots via B; staying: 0. Symmetric, no extra route or transit state. On-screen recaps and hints expand A/B/C to the localized site names (or show the name alongside the letter).

#### Six evidence cards

| ID | Type / speaker | Exact predicate | English card text | Russian card text |
|---|---|---|---|---|
| E1 | Testimony / Показание — Ada Venn / Ада Вен | `AT(p2,2,C)` | “At Slot 2, I was at Glass Gallery.” | «В момент 2 моё местонахождение — Стеклянная галерея.» |
| E2 | Record / Подтверждённая запись | `SAME(p2,p4,2)` | “At Slot 2, Ada Venn and Celia Nore were in the same location.” | «В момент 2 Ада Вен и Селия Нор находились в одном месте.» |
| E3 | Record / Подтверждённая запись | `AT(p4,2,A)` | “At Slot 2, Celia Nore was at Salt Ledger Room.” | «Момент 2: Селия Нор; место — Зал Соляной книги.» |
| E4 | Testimony / Показание — Ruan Leif / Руэн Лейф | `AND(NOT_AT(p3,2,A),AT(p3,3,C))` | “Both statements are true: At Slot 2, I was not at Salt Ledger Room; At Slot 3, I was at Glass Gallery.” | «Верны оба утверждения: В момент 2 моё местонахождение — не Зал Соляной книги; В момент 3 моё местонахождение — Стеклянная галерея.» |
| E5 | Record / Подтверждённая запись | `AT(p1,1,B)` | “At Slot 1, Milo Seret was at Courtyard Well.” | «Момент 1: Мило Серет; место — Колодец во дворе.» |
| E6 | Testimony / Показание — Celia Nore / Селия Нор | `AT(p4,1,B)` | “At Slot 1, I was at Courtyard Well.” | «В момент 1 моё местонахождение — Колодец во дворе.» |

Records are authenticated checkpoint observations; compound records combine two observations on one card. The literal text above is authoritative. Do not invent an image-only receipt detail, continuous stay, entrance/exit event, or exclusive meaning for “at least one.”

#### Private solution and checked proof certificate

- **False testimony / culprit:** `E1` / `p2` — Ada Venn / Ада Вен.
- **Candidate model counts:** `E1: 8500`, `E4: 0`, `E6: 0`.
- **All exact accepted two-card sets:** `{E2,E3}`. Order is immaterial.
- Every listed pair is satisfiable, entails both falsehood and opportunity, and loses at least one conclusion when either support is removed. All ten possible support pairs were checked; there is no unpublished preferred combination.
- Every individual card is satisfiable under movement alone. The tier-3 placement below holds in every valid full world.
- **Forced placements:** p1/Slot 1=B; p2/Slot 2=A; p3/Slot 3=C; p4/Slot 1=B; p4/Slot 2=A. Only these cells may be labelled established by the complete dossier.

**One possible reconstruction, not a unique timeline:**

| Character | Slot 1 | Slot 2 | Slot 3 | Slot 4 |
|---|---|---|---|---|
| p1 | B | A | A | A |
| p2 | A | A | A | A |
| p3 | A | B | C | B |
| p4 | B | A | A | A |

#### Three free hints

| Tier | English | Russian |
|---|---|---|
| 1 | The Salt Ledger Room and Glass Gallery are different sites. | Зал Соляной книги и Стеклянная галерея — разные места. |
| 2 | Inspect the shared-location record at Slot 2. | Проверьте запись о совместном положении в момент 2. |
| 3 | Place Ada at A at Slot 2. | Поместите Аду в A в момент 2. |

**Tier-3 assertion:** `AT(p2,2,A)`. Reopening it never advances the tier again.

#### Full reasoning EN / RU

1. **EN:** E2 places Ada and Celia together at Slot 2.\
   **RU:** E2 указывает, что Ада и Селия были вместе в момент 2.
2. **EN:** E3 places Celia at A at that moment, so Ada must also be at A.\
   **RU:** E3 помещает Селию в A в тот же момент, поэтому Ада тоже должна быть в A.
3. **EN:** E1 puts Ada at C instead. One person cannot be at both sites in the same slot.\
   **RU:** E1 вместо этого помещает Аду в C. Один человек не может быть в двух местах в один момент.
4. **EN:** A at Slot 2 is the declared crime opportunity. Neither E2 nor E3 establishes Ada’s full position alone.\
   **RU:** A в момент 2 — объявленное место и время кражи. Ни E2, ни E3 по отдельности не устанавливает положение Ады.
5. **EN:** The remaining claims can coexist with Ada/E1 false. A different false-card hypothesis preserves the same contradiction.\
   **RU:** Остальные утверждения совместимы с тем, что E1 Ады ложно. Гипотеза о другом ложном показании сохраняет это противоречие.

#### Two plausible wrong accusations

- **Selection:** `p3 / E4 / E2+E3` — Ruan Leif / Руэн Лейф. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E1 to be true, while records E2+E3 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E1, а записи E2+E3 делают это невозможным. Одной возможности совершить кражу недостаточно».
- **Selection:** `p4 / E6 / E2+E3` — Celia Nore / Селия Нор. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E1 to be true, while records E2+E3 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E1, а записи E2+E3 делают это невозможным. Одной возможности совершить кражу недостаточно».

These examples are private QA/editorial metadata. A live rejected submission receives only the generic Proof incomplete response, never these answer-bearing explanations.

#### Closure and art

**Closure EN:** Ada returns the seal: the ledger was not ready, and hiding its finishing mark seemed easier than admitting the delay. The exhibition opens a page short, with the missing work acknowledged.\
**Closure RU:** Ада возвращает печать: книга ещё не была готова, и спрятать завершающий знак казалось проще, чем признаться в задержке. Выставка открывается без одной страницы, и посетителям честно объясняют почему.

**Case art brief:** Cream salt ledger, cloth-wrapped silver seal, soft courtyard-well light through a gallery. Seal face has an original geometric wave motif, never real heraldry or readable text.

**Asset expansion:** one hook, one object cutout, three site vignettes, four portraits under `case.C02.*`, plus existing shared evidence materials. Never paint the culprit holding the object before disclosure. Motive/recovery text appears only after solve or explicit Study.

---


### 18.3 C03 — Paper Moon / Бумажная луна

**Difficulty / teaching purpose:** Foundations — exclusion.
**Shape:** 4 characters × 4 slots; 3 sites; 6 cards. Candidate testimonies: E4, E5, E6. Five cards are true; one candidate testimony is false.
**Stolen object:** hand-cut moon stencil / вырезанный вручную трафарет луны.
**Public crime declaration:** location `C`, Slot `4`. EN: “The object was taken at Moon Table at Slot 4.” RU: «Место кражи — Лунный стол; момент 4».

**Hook EN:** Tonight the paper theatre needs a moon, and its hand-cut stencil is missing. The little stage is ready, the paper roofs are standing, and the audience will soon arrive. Someone has taken the one shape that turns this town into a night sky.\
**Hook RU:** Сегодня бумажному театру нужна луна, а вырезанный вручную трафарет исчез. Маленькая сцена готова, бумажные крыши стоят, скоро придут зрители. Кто-то забрал единственную форму, превращающую этот городок в ночной пейзаж.

#### Characters and portrait production

| ID | Name EN / RU | Neutral identity EN / RU | Raster portrait brief |
|---|---|---|---|
| p1 | Eren Moss / Эрен Мосс | Paper mender; repairs tears with almost invisible tissue. / Реставратор бумаги; чинит разрывы почти невидимой папиросной бумагой. | Mid-30s, light freckled skin, auburn curls, teal overshirt, no glasses. |
| p2 | Vika Sorel / Вика Сорель | Workshop host; prepares safe cutting mats. / Ведущая мастер-классов; готовит безопасные коврики для резки. | Early 40s, deep brown skin, short natural curls, pale ochre apron. |
| p3 | Lena Fable / Лена Фейбл | Shadow-puppet maker; carries a folder of spare silhouettes. / Мастер теневых кукол; носит папку запасных силуэтов. | Late 20s, warm olive skin, straight dark bob, blue collarless jacket. |
| p4 | Corin Ash / Корин Эш | Book-cart volunteer; enjoys shelving by colour. / Волонтёр с книжной тележкой; любит расставлять книги по цвету. | Mid-50s, medium brown skin, shaved head, soft grey moustache, rust knit vest. |

All portraits use the shared cream backdrop, equal framing, and neutral attentive expressions. Appearance and demeanor have no evidentiary meaning.

| Site | English | Russian |
|---|---|---|
| A | Papercut Hall | Зал бумажной резьбы |
| B | Press Room | Печатная мастерская |
| C | Moon Table | Лунный стол |

**Routes:** A–B: 1 slot; B–C: 1 slot; A–C: 2 slots via B; staying: 0. Symmetric, no extra route or transit state. On-screen recaps and hints expand A/B/C to the localized site names (or show the name alongside the letter).

#### Six evidence cards

| ID | Type / speaker | Exact predicate | English card text | Russian card text |
|---|---|---|---|---|
| E1 | Record / Подтверждённая запись | `NOT_AT(p3,4,A)` | “At Slot 4, Lena Fable was not at Papercut Hall.” | «Момент 4: Лена Фейбл; место — не Зал бумажной резьбы.» |
| E2 | Record / Подтверждённая запись | `NOT_AT(p3,4,B)` | “At Slot 4, Lena Fable was not at Press Room.” | «Момент 4: Лена Фейбл; место — не Печатная мастерская.» |
| E3 | Record / Подтверждённая запись | `AND(AT(p2,2,B),AT(p2,3,C))` | “Both statements are true: At Slot 2, Vika Sorel was at Press Room; At Slot 3, Vika Sorel was at Moon Table.” | «Верны оба утверждения: Момент 2: Вика Сорель; место — Печатная мастерская; Момент 3: Вика Сорель; место — Лунный стол.» |
| E4 | Testimony / Показание — Eren Moss / Эрен Мосс | `AT(p1,2,A)` | “At Slot 2, I was at Papercut Hall.” | «В момент 2 моё местонахождение — Зал бумажной резьбы.» |
| E5 | Testimony / Показание — Lena Fable / Лена Фейбл | `OR(AT(p3,4,A),AT(p3,4,B))` | “At least one statement is true: At Slot 4, I was at Papercut Hall; At Slot 4, I was at Press Room.” | «Верно хотя бы одно утверждение: В момент 4 моё местонахождение — Зал бумажной резьбы; В момент 4 моё местонахождение — Печатная мастерская.» |
| E6 | Testimony / Показание — Corin Ash / Корин Эш | `NOT_AT(p4,1,A)` | “At Slot 1, I was not at Papercut Hall.” | «В момент 1 моё местонахождение — не Зал бумажной резьбы.» |

Records are authenticated checkpoint observations; compound records combine two observations on one card. The literal text above is authoritative. Do not invent an image-only receipt detail, continuous stay, entrance/exit event, or exclusive meaning for “at least one.”

#### Private solution and checked proof certificate

- **False testimony / culprit:** `E5` / `p3` — Lena Fable / Лена Фейбл.
- **Candidate model counts:** `E4: 0`, `E5: 20880`, `E6: 0`.
- **All exact accepted two-card sets:** `{E1,E2}`. Order is immaterial.
- Every listed pair is satisfiable, entails both falsehood and opportunity, and loses at least one conclusion when either support is removed. All ten possible support pairs were checked; there is no unpublished preferred combination.
- Every individual card is satisfiable under movement alone. The tier-3 placement below holds in every valid full world.
- **Forced placements:** p1/Slot 2=A; p2/Slot 2=B; p2/Slot 3=C; p3/Slot 4=C. Only these cells may be labelled established by the complete dossier.

**One possible reconstruction, not a unique timeline:**

| Character | Slot 1 | Slot 2 | Slot 3 | Slot 4 |
|---|---|---|---|---|
| p1 | A | A | A | A |
| p2 | A | B | C | B |
| p3 | A | A | B | C |
| p4 | B | A | A | A |

#### Three free hints

| Tier | English | Russian |
|---|---|---|
| 1 | Only three sites exist in this dossier. | В этом деле есть только три места. |
| 2 | Compare both exclusions at Slot 4. | Сравните оба исключения для момента 4. |
| 3 | Place Lena at C at Slot 4. | Поместите Лену в C в момент 4. |

**Tier-3 assertion:** `AT(p3,4,C)`. Reopening it never advances the tier again.

#### Full reasoning EN / RU

1. **EN:** E1 excludes Lena from A at Slot 4.\
   **RU:** E1 исключает присутствие Лены в A в момент 4.
2. **EN:** E2 excludes Lena from B at Slot 4.\
   **RU:** E2 исключает присутствие Лены в B в момент 4.
3. **EN:** Only C remains in the three-location model. This is a deduction from the closed location set, not from a picture.\
   **RU:** В модели из трёх мест остаётся только C. Этот вывод следует из полного списка мест, а не из картинки.
4. **EN:** E5 claims A or B at that same moment; both alternatives are excluded. C at Slot 4 also supplies opportunity.\
   **RU:** E5 утверждает, что в тот же момент Лена была в A или B; исключены оба варианта. C в момент 4 также даёт возможность совершить кражу.
5. **EN:** Remove either exclusion and one alternative remains. Together the two records prove Lena/E5; other false-card choices cannot repair the conflict.\
   **RU:** Без одного из исключений остаётся допустимый вариант. Вместе записи доказывают пару Лена/E5; другое ложное показание не устраняет конфликт.

#### Two plausible wrong accusations

- **Selection:** `p1 / E4 / E1+E2` — Eren Moss / Эрен Мосс. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E5 to be true, while records E1+E2 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E5, а записи E1+E2 делают это невозможным. Одной возможности совершить кражу недостаточно».
- **Selection:** `p4 / E6 / E1+E2` — Corin Ash / Корин Эш. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E5 to be true, while records E1+E2 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E5, а записи E1+E2 делают это невозможным. Одной возможности совершить кражу недостаточно».

These examples are private QA/editorial metadata. A live rejected submission receives only the generic Proof incomplete response, never these answer-bearing explanations.

#### Closure and art

**Closure EN:** Lena returns the stencil after taking it for an unapproved extra shadow scene. The theatre keeps the new scene, but only after the workshop agrees to lend its moon.\
**Closure RU:** Лена возвращает трафарет, который взяла для несогласованной дополнительной сцены. Театр сохраняет сцену, но лишь после того, как мастерская разрешает одолжить свою луну.

**Case art brief:** Flat paper-theatre silhouettes, a moon-shaped gap on a cutting board, clean cream and indigo paper layers. Object is one crescent stencil, not a weapon-like blade.

**Asset expansion:** one hook, one object cutout, three site vignettes, four portraits under `case.C03.*`, plus existing shared evidence materials. Never paint the culprit holding the object before disclosure. Motive/recovery text appears only after solve or explicit Study.

---


### 18.4 C04 — The Quiet Conductor / Тихий дирижёр

**Difficulty / teaching purpose:** Applied — alternate proofs.
**Shape:** 4 characters × 4 slots; 3 sites; 6 cards. Candidate testimonies: E3, E4, E5. Five cards are true; one candidate testimony is false.
**Stolen object:** mother-of-pearl baton cap / перламутровый наконечник жезла.
**Public crime declaration:** location `B`, Slot `3`. EN: “The object was taken at Resonance Hall at Slot 3.” RU: «Место кражи — Зал резонанса; момент 3».

**Hook EN:** The rehearsal can begin without a conductor’s pearly baton cap, but the cap is a family keepsake lent for one evening. Four people helped prepare the hall. An empty velvet recess has made a small promise unexpectedly important.\
**Hook RU:** Репетиция может начаться без перламутрового наконечника жезла, но его одолжили лишь на вечер: это семейная реликвия. Четыре человека помогали готовить зал. Пустая бархатная выемка неожиданно придала вес небольшому обещанию.

#### Characters and portrait production

| ID | Name EN / RU | Neutral identity EN / RU | Raster portrait brief |
|---|---|---|---|
| p1 | Soren Pike / Сорен Пайк | Volunteer conductor; brings pencilled tempo notes. / Волонтёр-дирижёр; приносит пометки темпа карандашом. | Early 50s, warm brown skin, salt-and-pepper curls, plain indigo shirt. |
| p2 | Mara Teth / Мара Тет | Night dispatcher; makes calm, precise handovers. / Ночная диспетчерка; спокойно и точно передаёт смену. | Late 30s, pale skin, copper hair in a low knot, dark teal waistcoat. |
| p3 | Niko Arden / Нико Арден | Instrument tester; listens for loose reeds. / Проверяющий инструменты; прислушивается к незакреплённым язычкам. | Early 30s, olive skin, short black hair, cream work jacket, thin rectangular glasses. |
| p4 | Vela Orr / Вела Орр | Bell ringer; restores frayed pull-cords. / Звонарка; чинит изношенные шнуры. | Mid-60s, deep brown skin, silver natural hair, muted ochre scarf. |

All portraits use the shared cream backdrop, equal framing, and neutral attentive expressions. Appearance and demeanor have no evidentiary meaning.

| Site | English | Russian |
|---|---|---|
| A | Platform Archive | Архивная платформа |
| B | Resonance Hall | Зал резонанса |
| C | Signal Loft | Сигнальная мансарда |

**Routes:** A–B: 1 slot; B–C: 1 slot; A–C: 2 slots via B; staying: 0. Symmetric, no extra route or transit state. On-screen recaps and hints expand A/B/C to the localized site names (or show the name alongside the letter).

#### Six evidence cards

| ID | Type / speaker | Exact predicate | English card text | Russian card text |
|---|---|---|---|---|
| E1 | Record / Подтверждённая запись | `SAME(p1,p2,2)` | “At Slot 2, Soren Pike and Mara Teth were in the same location.” | «В момент 2 Сорен Пайк и Мара Тет находились в одном месте.» |
| E2 | Record / Подтверждённая запись | `AND(AT(p2,2,A),AT(p1,3,B))` | “Both statements are true: At Slot 2, Mara Teth was at Platform Archive; At Slot 3, Soren Pike was at Resonance Hall.” | «Верны оба утверждения: Момент 2: Мара Тет; место — Архивная платформа; Момент 3: Сорен Пайк; место — Зал резонанса.» |
| E3 | Testimony / Показание — Soren Pike / Сорен Пайк | `AT(p1,2,C)` | “At Slot 2, I was at Signal Loft.” | «В момент 2 моё местонахождение — Сигнальная мансарда.» |
| E4 | Testimony / Показание — Niko Arden / Нико Арден | `OR(AT(p3,1,B),AT(p3,2,B))` | “At least one statement is true: At Slot 1, I was at Resonance Hall; At Slot 2, I was at Resonance Hall.” | «Верно хотя бы одно утверждение: В момент 1 моё местонахождение — Зал резонанса; В момент 2 моё местонахождение — Зал резонанса.» |
| E5 | Testimony / Показание — Vela Orr / Вела Орр | `AT(p4,4,C)` | “At Slot 4, I was at Signal Loft.” | «В момент 4 моё местонахождение — Сигнальная мансарда.» |
| E6 | Record / Подтверждённая запись | `AND(AT(p1,2,A),NOT_AT(p2,4,A))` | “Both statements are true: At Slot 2, Soren Pike was at Platform Archive; At Slot 4, Mara Teth was not at Platform Archive.” | «Верны оба утверждения: Момент 2: Сорен Пайк; место — Архивная платформа; Момент 4: Мара Тет; место — не Архивная платформа.» |

Records are authenticated checkpoint observations; compound records combine two observations on one card. The literal text above is authoritative. Do not invent an image-only receipt detail, continuous stay, entrance/exit event, or exclusive meaning for “at least one.”

#### Private solution and checked proof certificate

- **False testimony / culprit:** `E3` / `p1` — Soren Pike / Сорен Пайк.
- **Candidate model counts:** `E3: 13392`, `E4: 0`, `E5: 0`.
- **All exact accepted two-card sets:** `{E1,E2}`, `{E2,E6}`. Order is immaterial.
- Every listed pair is satisfiable, entails both falsehood and opportunity, and loses at least one conclusion when either support is removed. All ten possible support pairs were checked; there is no unpublished preferred combination.
- Every individual card is satisfiable under movement alone. The tier-3 placement below holds in every valid full world.
- **Forced placements:** p1/Slot 2=A; p1/Slot 3=B; p2/Slot 2=A; p4/Slot 4=C. Only these cells may be labelled established by the complete dossier.

**One possible reconstruction, not a unique timeline:**

| Character | Slot 1 | Slot 2 | Slot 3 | Slot 4 |
|---|---|---|---|---|
| p1 | A | A | B | A |
| p2 | A | A | A | B |
| p3 | A | B | A | A |
| p4 | A | A | B | C |

#### Three free hints

| Tier | English | Russian |
|---|---|---|
| 1 | Compare the Platform Archive with the Signal Loft. | Сравните Архивную платформу и Сигнальную мансарду. |
| 2 | Inspect the shared position at Slot 2, then the crime record at Slot 3. | Проверьте совместное положение в момент 2, затем запись о моменте кражи 3. |
| 3 | Place Soren at A at Slot 2. | Поместите Сорена в A в момент 2. |

**Tier-3 assertion:** `AT(p1,2,A)`. Reopening it never advances the tier again.

#### Full reasoning EN / RU

1. **EN:** E1 places Soren with Mara at Slot 2. E2 places Mara at A then.\
   **RU:** E1 помещает Сорена рядом с Марой в момент 2. E2 помещает Мару в A в этот момент.
2. **EN:** Therefore Soren was at A, contradicting E3’s claim of C at Slot 2.\
   **RU:** Значит, Сорен был в A, что противоречит утверждению E3 о C в момент 2.
3. **EN:** The second clause of E2 puts Soren at B at Slot 3, establishing crime opportunity.\
   **RU:** Вторая часть E2 помещает Сорена в B в момент 3 и устанавливает возможность совершить кражу.
4. **EN:** E6 also directly places Soren at A at Slot 2. E2+E6 is a second complete proof, not an incorrect alternative.\
   **RU:** E6 также прямо помещает Сорена в A в момент 2. E2+E6 — второе полное доказательство, а не ошибочный вариант.
5. **EN:** The recap must use the submitted accepted pair: E1+E2 uses the shared position; E2+E6 uses the direct position. Both establish Soren/E3.\
   **RU:** Разбор должен опираться на выбранную допустимую пару: E1+E2 использует совместное положение, E2+E6 — прямую запись. Обе доказывают пару Сорен/E3.

**Accepted-pair-specific recap variants:**
- `E1+E2` EN: “E1 links Soren to Mara at Slot 2; E2 puts Mara at A and Soren at the crime site B at Slot 3. Soren’s C claim is impossible.” RU: «E1 связывает Сорена с Марой в момент 2; E2 помещает Мару в A, а Сорена — в место кражи B в момент 3. Утверждение Сорена о C невозможно».
- `E2+E6` EN: “E6 directly puts Soren at A at Slot 2, disproving the C claim; E2 establishes B at Slot 3 and opportunity.” RU: «E6 прямо помещает Сорена в A в момент 2 и опровергает утверждение о C; E2 устанавливает B в момент 3 и возможность совершить кражу».

#### Two plausible wrong accusations

- **Selection:** `p3 / E4 / E1+E2` — Niko Arden / Нико Арден. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E3 to be true, while records E1+E2 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E3, а записи E1+E2 делают это невозможным. Одной возможности совершить кражу недостаточно».
- **Selection:** `p4 / E5 / E1+E2` — Vela Orr / Вела Орр. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E3 to be true, while records E1+E2 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E3, а записи E1+E2 делают это невозможным. Одной возможности совершить кражу недостаточно».

These examples are private QA/editorial metadata. A live rejected submission receives only the generic Proof incomplete response, never these answer-bearing explanations.

#### Closure and art

**Closure EN:** Soren returns the cap from a padded pouch. Fear of damaging a family keepsake did not justify hiding it or denying the visit; a proper protective mount is arranged.\
**Closure RU:** Сорен возвращает наконечник из мягкого чехла. Страх повредить семейную реликвию не оправдывал ни тайник, ни ложь; для неё готовят надёжное крепление.

**Case art brief:** Quiet rehearsal hall, empty cushioned recess for a small mother-of-pearl baton cap, instrument cases closed. Equal, neutral portraits; no guilty conductor pose.

**Asset expansion:** one hook, one object cutout, three site vignettes, four portraits under `case.C04.*`, plus existing shared evidence materials. Never paint the culprit holding the object before disclosure. Motive/recovery text appears only after solve or explicit Study.

---


### 18.5 C05 — Fern Glass / Папоротниковое стекло

**Difficulty / teaching purpose:** Applied — backward travel.
**Shape:** 4 characters × 4 slots; 3 sites; 6 cards. Candidate testimonies: E3, E4, E6. Five cards are true; one candidate testimony is false.
**Stolen object:** handblown fern-glass itinerary tile / выдутая вручную папоротниковая стеклянная плитка-маршрут.
**Public crime declaration:** location `C`, Slot `2`. EN: “The object was taken at Glasshouse Annex at Slot 2.” RU: «Место кражи — Оранжерейное крыло; момент 2».

**Hook EN:** A fern-patterned glass tile has disappeared from the conservatory display. Its maker remembers every green vein. Evening light still falls through the glasswork, but one clear rectangle interrupts the leaves.\
**Hook RU:** С выставки в оранжерее исчезла стеклянная плитка с узором папоротника. Её создатель помнит каждую зелёную прожилку. Вечерний свет всё ещё проходит сквозь стекло, но один пустой прямоугольник разрывает узор листьев.

#### Characters and portrait production

| ID | Name EN / RU | Neutral identity EN / RU | Raster portrait brief |
|---|---|---|---|
| p1 | Jun Aster / Джун Астер | Horticulture archivist; presses fallen leaves into correspondence. / Архивистка ботаники; вкладывает опавшие листья в письма. | Late 40s, light skin, dark hair with one silver streak, olive cardigan. |
| p2 | Pell Hume / Пелл Хьюм | Ceramic repairer; carries a pocket brush. / Реставратор керамики; носит карманную кисточку. | Mid-30s, deep brown skin, short neat beard, closely cropped hair, indigo smock. |
| p3 | Sia Rowan / Сиа Роуэн | Seed librarian; knows each drawer by scent. / Библиотекарь семян; узнаёт каждый ящик по запаху. | Early 60s, medium brown skin, silver bun, cream high-collared blouse, oval glasses. |
| p4 | Dorin Wren / Дорин Рен | Greenhouse guide; speaks softly around seedlings. / Экскурсовод оранжереи; тихо говорит рядом с ростками. | Late 20s, freckled light skin, short auburn waves, teal overshirt. |

All portraits use the shared cream backdrop, equal framing, and neutral attentive expressions. Appearance and demeanor have no evidentiary meaning.

| Site | English | Russian |
|---|---|---|
| A | Seed Vault | Хранилище семян |
| B | Fern Walk | Папоротниковая дорожка |
| C | Glasshouse Annex | Оранжерейное крыло |

**Routes:** A–B: 1 slot; B–C: 1 slot; A–C: 2 slots via B; staying: 0. Symmetric, no extra route or transit state. On-screen recaps and hints expand A/B/C to the localized site names (or show the name alongside the letter).

#### Six evidence cards

| ID | Type / speaker | Exact predicate | English card text | Russian card text |
|---|---|---|---|---|
| E1 | Record / Подтверждённая запись | `AT(p1,2,C)` | “At Slot 2, Jun Aster was at Glasshouse Annex.” | «Момент 2: Джун Астер; место — Оранжерейное крыло.» |
| E2 | Record / Подтверждённая запись | `AT(p1,4,A)` | “At Slot 4, Jun Aster was at Seed Vault.” | «Момент 4: Джун Астер; место — Хранилище семян.» |
| E3 | Testimony / Показание — Dorin Wren / Дорин Рен | `NOT_AT(p4,2,C)` | “At Slot 2, I was not at Glasshouse Annex.” | «В момент 2 моё местонахождение — не Оранжерейное крыло.» |
| E4 | Testimony / Показание — Pell Hume / Пелл Хьюм | `OR(AT(p2,2,B),AT(p2,3,B))` | “At least one statement is true: At Slot 2, I was at Fern Walk; At Slot 3, I was at Fern Walk.” | «Верно хотя бы одно утверждение: В момент 2 моё местонахождение — Папоротниковая дорожка; В момент 3 моё местонахождение — Папоротниковая дорожка.» |
| E5 | Record / Подтверждённая запись | `SAME(p3,p4,1)` | “At Slot 1, Sia Rowan and Dorin Wren were in the same location.” | «В момент 1 Сиа Роуэн и Дорин Рен находились в одном месте.» |
| E6 | Testimony / Показание — Jun Aster / Джун Астер | `AT(p1,3,C)` | “At Slot 3, I was at Glasshouse Annex.” | «В момент 3 моё местонахождение — Оранжерейное крыло.» |

Records are authenticated checkpoint observations; compound records combine two observations on one card. The literal text above is authoritative. Do not invent an image-only receipt detail, continuous stay, entrance/exit event, or exclusive meaning for “at least one.”

#### Private solution and checked proof certificate

- **False testimony / culprit:** `E6` / `p1` — Jun Aster / Джун Астер.
- **Candidate model counts:** `E3: 0`, `E4: 0`, `E6: 28512`.
- **All exact accepted two-card sets:** `{E1,E2}`. Order is immaterial.
- Every listed pair is satisfiable, entails both falsehood and opportunity, and loses at least one conclusion when either support is removed. All ten possible support pairs were checked; there is no unpublished preferred combination.
- Every individual card is satisfiable under movement alone. The tier-3 placement below holds in every valid full world.
- **Forced placements:** p1/Slot 2=C; p1/Slot 3=B; p1/Slot 4=A. Only these cells may be labelled established by the complete dossier.

**One possible reconstruction, not a unique timeline:**

| Character | Slot 1 | Slot 2 | Slot 3 | Slot 4 |
|---|---|---|---|---|
| p1 | B | C | B | A |
| p2 | A | A | B | A |
| p3 | A | A | A | A |
| p4 | A | A | A | A |

#### Three free hints

| Tier | English | Russian |
|---|---|---|
| 1 | Compare the Glasshouse Annex with the Seed Vault. | Сравните Оранжерейное крыло и Хранилище семян. |
| 2 | Work backward from Slot 4 through Slot 3. | Идите назад от момента 4 через момент 3. |
| 3 | Place Jun at B at Slot 3. | Поместите Джун в B в момент 3. |

**Tier-3 assertion:** `AT(p1,3,B)`. Reopening it never advances the tier again.

#### Full reasoning EN / RU

1. **EN:** E1 places Jun at C at Slot 2. E2 places Jun at A at Slot 4.\
   **RU:** E1 помещает Джун в C в момент 2. E2 помещает Джун в A в момент 4.
2. **EN:** The two-interval C–B–A journey uses all the available time. Jun must be at B at Slot 3.\
   **RU:** Маршрут C–B–A занимает оба доступных интервала. В момент 3 Джун должна быть в B.
3. **EN:** E6 claims C at Slot 3, leaving only one interval to reach A at Slot 4. That final leap is impossible.\
   **RU:** E6 утверждает, что в момент 3 Джун была в C. Тогда до A в момент 4 остаётся лишь один интервал. Такой переход невозможен.
4. **EN:** E1 is also the crime-site record: C at Slot 2. E2 exposes the later travel conflict.\
   **RU:** E1 также фиксирует место и момент кражи: C в момент 2. E2 выявляет противоречие с последующим маршрутом.
5. **EN:** The records prove Jun/E6 without claiming Jun stayed at C continuously. Other false-card choices leave this contradiction intact.\
   **RU:** Записи доказывают пару Джун/E6, не утверждая, что Джун непрерывно оставалась в C. Другое ложное показание не устраняет противоречие.

#### Two plausible wrong accusations

- **Selection:** `p4 / E3 / E1+E2` — Dorin Wren / Дорин Рен. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E6 to be true, while records E1+E2 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E6, а записи E1+E2 делают это невозможным. Одной возможности совершить кражу недостаточно».
- **Selection:** `p2 / E4 / E1+E2` — Pell Hume / Пелл Хьюм. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E6 to be true, while records E1+E2 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E6, а записи E1+E2 делают это невозможным. Одной возможности совершить кражу недостаточно».

These examples are private QA/editorial metadata. A live rejected submission receives only the generic Proof incomplete response, never these answer-bearing explanations.

#### Closure and art

**Closure EN:** Jun returns the tile, taken without permission to compare it with a disputed pattern sample. The archive records the authorship question separately instead of letting a missing object decide it.\
**Closure RU:** Джун возвращает плитку, взятую без разрешения для сравнения со спорным образцом узора. Архив отдельно разбирает вопрос авторства, не позволяя пропаже предмета решить его за людей.

**Case art brief:** Condensation-soft greenhouse light, fern silhouettes, a translucent green tile with a single leaf-vein pattern. Tile has no encoded map or text despite its decorative itinerary role.

**Asset expansion:** one hook, one object cutout, three site vignettes, four portraits under `case.C05.*`, plus existing shared evidence materials. Never paint the culprit holding the object before disclosure. Motive/recovery text appears only after solve or explicit Study.

---


### 18.6 C06 — Blue Thread / Синяя нить

**Difficulty / teaching purpose:** Applied — opening-slot exclusion.
**Shape:** 4 characters × 4 slots; 3 sites; 6 cards. Candidate testimonies: E2, E4, E6. Five cards are true; one candidate testimony is false.
**Stolen object:** rare blue-thread bobbin / редкая катушка синей нити.
**Public crime declaration:** location `A`, Slot `1`. EN: “The object was taken at Thread Cabinet at Slot 1.” RU: «Место кражи — Шкаф нитей; момент 1».

**Hook EN:** One bobbin of blue thread links a collection of unfinished town quilts. Now its compartment is empty. The archive keeps every pattern carefully; tonight it must also keep a promise to the people waiting for their work to be finished.\
**Hook RU:** Одна катушка синей нити связывает коллекцию незаконченных городских лоскутных одеял. Теперь её отделение пусто. Архив бережёт каждый узор; сегодня ему нужно сберечь и обещание людям, которые ждут завершения своих работ.

#### Characters and portrait production

| ID | Name EN / RU | Neutral identity EN / RU | Raster portrait brief |
|---|---|---|---|
| p1 | Yara Silt / Яра Силт | Loom curator; measures warp tension with a brass gauge. / Хранительница ткацких станков; измеряет натяжение основы латунным калибром. | Early 50s, deep brown skin, short greying curls, ochre woven vest. |
| p2 | Bren Ollo / Брен Олло | Parcel courier; folds delivery notes into crisp squares. / Курьер посылок; складывает накладные ровными квадратами. | Mid-30s, olive skin, dark wavy hair, clean-shaven, plain navy courier jacket. |
| p3 | Kei Morrow / Кей Морроу | Textile reader; translates old dye recipes. / Исследователь текстиля; разбирает старые рецепты красок. | Late 20s, light skin, straight shoulder-length dark hair, sea-green shirt. |
| p4 | Fenn Ire / Фенн Айр | Cabinet custodian; oils hinges without a squeak. / Хранитель шкафов; смазывает петли без единого скрипа. | Early 60s, medium brown skin, balding crown, short silver beard, cream cardigan. |

All portraits use the shared cream backdrop, equal framing, and neutral attentive expressions. Appearance and demeanor have no evidentiary meaning.

| Site | English | Russian |
|---|---|---|
| A | Thread Cabinet | Шкаф нитей |
| B | Dye Library | Библиотека красок |
| C | Skylight Alcove | Альков под фонарём |

**Routes:** A–B: 1 slot; B–C: 1 slot; A–C: 2 slots via B; staying: 0. Symmetric, no extra route or transit state. On-screen recaps and hints expand A/B/C to the localized site names (or show the name alongside the letter).

#### Six evidence cards

| ID | Type / speaker | Exact predicate | English card text | Russian card text |
|---|---|---|---|---|
| E1 | Record / Подтверждённая запись | `NOT_AT(p2,1,B)` | “At Slot 1, Bren Ollo was not at Dye Library.” | «Момент 1: Брен Олло; место — не Библиотека красок.» |
| E2 | Testimony / Показание — Bren Ollo / Брен Олло | `OR(AT(p2,1,B),AT(p2,1,C))` | “At least one statement is true: At Slot 1, I was at Dye Library; At Slot 1, I was at Skylight Alcove.” | «Верно хотя бы одно утверждение: В момент 1 моё местонахождение — Библиотека красок; В момент 1 моё местонахождение — Альков под фонарём.» |
| E3 | Record / Подтверждённая запись | `NOT_AT(p2,1,C)` | “At Slot 1, Bren Ollo was not at Skylight Alcove.” | «Момент 1: Брен Олло; место — не Альков под фонарём.» |
| E4 | Testimony / Показание — Kei Morrow / Кей Морроу | `AND(AT(p3,2,B),NOT_AT(p3,1,C))` | “Both statements are true: At Slot 2, I was at Dye Library; At Slot 1, I was not at Skylight Alcove.” | «Верны оба утверждения: В момент 2 моё местонахождение — Библиотека красок; В момент 1 моё местонахождение — не Альков под фонарём.» |
| E5 | Record / Подтверждённая запись | `AT(p1,3,A)` | “At Slot 3, Yara Silt was at Thread Cabinet.” | «Момент 3: Яра Силт; место — Шкаф нитей.» |
| E6 | Testimony / Показание — Fenn Ire / Фенн Айр | `AT(p4,4,B)` | “At Slot 4, I was at Dye Library.” | «В момент 4 моё местонахождение — Библиотека красок.» |

Records are authenticated checkpoint observations; compound records combine two observations on one card. The literal text above is authoritative. Do not invent an image-only receipt detail, continuous stay, entrance/exit event, or exclusive meaning for “at least one.”

#### Private solution and checked proof certificate

- **False testimony / culprit:** `E2` / `p2` — Bren Ollo / Брен Олло.
- **Candidate model counts:** `E2: 28560`, `E4: 0`, `E6: 0`.
- **All exact accepted two-card sets:** `{E1,E3}`. Order is immaterial.
- Every listed pair is satisfiable, entails both falsehood and opportunity, and loses at least one conclusion when either support is removed. All ten possible support pairs were checked; there is no unpublished preferred combination.
- Every individual card is satisfiable under movement alone. The tier-3 placement below holds in every valid full world.
- **Forced placements:** p1/Slot 3=A; p2/Slot 1=A; p3/Slot 2=B; p4/Slot 4=B. Only these cells may be labelled established by the complete dossier.

**One possible reconstruction, not a unique timeline:**

| Character | Slot 1 | Slot 2 | Slot 3 | Slot 4 |
|---|---|---|---|---|
| p1 | A | A | A | A |
| p2 | A | A | A | A |
| p3 | A | B | A | A |
| p4 | A | A | A | B |

#### Three free hints

| Tier | English | Russian |
|---|---|---|
| 1 | Check which two sites the records exclude. | Проверьте, какие два места исключают записи. |
| 2 | Both exclusions concern Slot 1, not later movements. | Оба исключения относятся к моменту 1, а не к последующим перемещениям. |
| 3 | Place Bren at A at Slot 1. | Поместите Брена в A в момент 1. |

**Tier-3 assertion:** `AT(p2,1,A)`. Reopening it never advances the tier again.

#### Full reasoning EN / RU

1. **EN:** E1 excludes Bren from B at Slot 1.\
   **RU:** E1 исключает присутствие Брена в B в момент 1.
2. **EN:** E3 excludes Bren from C at Slot 1.\
   **RU:** E3 исключает присутствие Брена в C в момент 1.
3. **EN:** A is the only remaining site. No assumption about earlier travel is needed.\
   **RU:** A — единственное оставшееся место. Предположения о более раннем маршруте не нужны.
4. **EN:** E2 claims B or C, so its entire alternative is false. A at Slot 1 is the crime opportunity.\
   **RU:** E2 утверждает B или C, поэтому весь предложенный вариант ложен. A в момент 1 — место и момент кражи.
5. **EN:** Each exclusion removes one possibility; neither alone completes both goals. The complete case has only Bren/E2 as a viable pair.\
   **RU:** Каждое исключение убирает одну возможность; по отдельности карточки не дают полного доказательства. Во всём деле допустима только пара Брен/E2.

#### Two plausible wrong accusations

- **Selection:** `p3 / E4 / E1+E3` — Kei Morrow / Кей Морроу. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E2 to be true, while records E1+E3 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E2, а записи E1+E3 делают это невозможным. Одной возможности совершить кражу недостаточно».
- **Selection:** `p4 / E6 / E1+E3` — Fenn Ire / Фенн Айр. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E2 to be true, while records E1+E3 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E2, а записи E1+E3 делают это невозможным. Одной возможности совершить кражу недостаточно».

These examples are private QA/editorial metadata. A live rejected submission receives only the generic Proof incomplete response, never these answer-bearing explanations.

#### Closure and art

**Closure EN:** Bren returns the bobbin, taken in a hurry to finish a friend’s repair. A small length is later lent properly; the rest returns to the shared collection.\
**Closure RU:** Брен возвращает катушку, которую торопливо взял для ремонта вещи друга. Нужный отрезок позже одалживают по правилам, а остальная нить возвращается в общую коллекцию.

**Case art brief:** Stacked textile folders, one empty bobbin compartment, muted blue thread against warm paper. No cloth pattern contains a required clue.

**Asset expansion:** one hook, one object cutout, three site vignettes, four portraits under `case.C06.*`, plus existing shared evidence materials. Never paint the culprit holding the object before disclosure. Motive/recovery text appears only after solve or explicit Study.

---


### 18.7 C07 — Borrowed Weather / Погода взаймы

**Difficulty / teaching purpose:** Applied — arrival versus early arrival.
**Shape:** 4 characters × 4 slots; 3 sites; 6 cards. Candidate testimonies: E1, E3, E5, E6. Five cards are true; one candidate testimony is false.
**Stolen object:** pocket barometer needle / игла карманного барометра.
**Public crime declaration:** location `C`, Slot `3`. EN: “The object was taken at Barometer Room at Slot 3.” RU: «Место кражи — Комната барометров; момент 3».

**Hook EN:** The pocket barometer has lost its needle just before a weather exhibition. Maps, rain charts, and a quiet tea tray are ready. In a room devoted to careful observation, one tiny instrument now has nothing to say.\
**Hook RU:** Перед выставкой погоды из карманного барометра исчезла стрелка. Карты, записи о дожде и чайный поднос готовы. В комнате, посвящённой точным наблюдениям, одному крошечному прибору теперь нечего сказать.

#### Characters and portrait production

| ID | Name EN / RU | Neutral identity EN / RU | Raster portrait brief |
|---|---|---|---|
| p1 | Alma Vireo / Альма Вирео | Weather scribe; records cloud names in violet pencil. / Летописец погоды; записывает названия облаков фиолетовым карандашом. | Early 40s, medium brown skin, dark curls tied back, muted violet scarf, navy jacket. |
| p2 | Tomas Rill / Томас Рилл | Glass cutter; wraps offcuts for mosaic classes. / Резчик стекла; заворачивает обрезки для мозаичных занятий. | Late 50s, pale skin, grey wavy hair, small round glasses, teal work apron. |
| p3 | Edda Lane / Эдда Лейн | Clock repairer; restores small household timepieces. / Часовая мастерица; восстанавливает небольшие домашние часы. | Early 30s, deep brown skin, close natural curls, ochre collarless shirt. |
| p4 | Caro Wisp / Каро Уисп | Tea steward; dries mint in labelled packets. / Распорядительница чая; сушит мяту в подписанных пакетах. | Mid-40s, olive skin, long dark braid, cream blouse and blue waistcoat. |

All portraits use the shared cream backdrop, equal framing, and neutral attentive expressions. Appearance and demeanor have no evidentiary meaning.

| Site | English | Russian |
|---|---|---|
| A | Map Cabinet | Шкаф карт |
| B | Rain Gallery | Галерея дождя |
| C | Barometer Room | Комната барометров |

**Routes:** A–B: 1 slot; B–C: 1 slot; A–C: 2 slots via B; staying: 0. Symmetric, no extra route or transit state. On-screen recaps and hints expand A/B/C to the localized site names (or show the name alongside the letter).

#### Six evidence cards

| ID | Type / speaker | Exact predicate | English card text | Russian card text |
|---|---|---|---|---|
| E1 | Testimony / Показание — Alma Vireo / Альма Вирео | `AT(p1,2,C)` | “At Slot 2, I was at Barometer Room.” | «В момент 2 моё местонахождение — Комната барометров.» |
| E2 | Record / Подтверждённая запись | `AT(p1,1,A)` | “At Slot 1, Alma Vireo was at Map Cabinet.” | «Момент 1: Альма Вирео; место — Шкаф карт.» |
| E3 | Testimony / Показание — Tomas Rill / Томас Рилл | `AT(p2,3,A)` | “At Slot 3, I was at Map Cabinet.” | «В момент 3 моё местонахождение — Шкаф карт.» |
| E4 | Record / Подтверждённая запись | `AT(p1,3,C)` | “At Slot 3, Alma Vireo was at Barometer Room.” | «Момент 3: Альма Вирео; место — Комната барометров.» |
| E5 | Testimony / Показание — Edda Lane / Эдда Лейн | `OR(AT(p3,2,A),AT(p3,2,B))` | “At least one statement is true: At Slot 2, I was at Map Cabinet; At Slot 2, I was at Rain Gallery.” | «Верно хотя бы одно утверждение: В момент 2 моё местонахождение — Шкаф карт; В момент 2 моё местонахождение — Галерея дождя.» |
| E6 | Testimony / Показание — Caro Wisp / Каро Уисп | `AT(p4,1,C)` | “At Slot 1, I was at Barometer Room.” | «В момент 1 моё местонахождение — Комната барометров.» |

Records are authenticated checkpoint observations; compound records combine two observations on one card. The literal text above is authoritative. Do not invent an image-only receipt detail, continuous stay, entrance/exit event, or exclusive meaning for “at least one.”

#### Private solution and checked proof certificate

- **False testimony / culprit:** `E1` / `p1` — Alma Vireo / Альма Вирео.
- **Candidate model counts:** `E1: 7440`, `E3: 0`, `E5: 0`, `E6: 0`.
- **All exact accepted two-card sets:** `{E2,E4}`. Order is immaterial.
- Every listed pair is satisfiable, entails both falsehood and opportunity, and loses at least one conclusion when either support is removed. All ten possible support pairs were checked; there is no unpublished preferred combination.
- Every individual card is satisfiable under movement alone. The tier-3 placement below holds in every valid full world.
- **Forced placements:** p1/Slot 1=A; p1/Slot 2=B; p1/Slot 3=C; p2/Slot 3=A; p4/Slot 1=C. Only these cells may be labelled established by the complete dossier.

**One possible reconstruction, not a unique timeline:**

| Character | Slot 1 | Slot 2 | Slot 3 | Slot 4 |
|---|---|---|---|---|
| p1 | A | B | C | B |
| p2 | A | A | A | A |
| p3 | A | A | A | A |
| p4 | C | B | A | A |

#### Three free hints

| Tier | English | Russian |
|---|---|---|
| 1 | The Map Cabinet and Barometer Room lie two steps apart. | Шкаф карт и Комната барометров находятся в двух участках маршрута друг от друга. |
| 2 | Distinguish arriving at Slot 3 from arriving already at Slot 2. | Различайте прибытие в момент 3 и прибытие уже в момент 2. |
| 3 | Place Alma at B at Slot 2. | Поместите Альму в B в момент 2. |

**Tier-3 assertion:** `AT(p1,2,B)`. Reopening it never advances the tier again.

#### Full reasoning EN / RU

1. **EN:** E2 places Alma at A at Slot 1; E4 places Alma at C at Slot 3.\
   **RU:** E2 помещает Альму в A в момент 1; E4 помещает Альму в C в момент 3.
2. **EN:** Alma can make A–B–C across two intervals. The middle observation must be B at Slot 2.\
   **RU:** Альма может пройти A–B–C за два интервала. В промежуточный момент 2 она должна быть в B.
3. **EN:** E1 claims C already at Slot 2. That would require completing a two-interval journey in one.\
   **RU:** E1 утверждает, что Альма была в C уже в момент 2. Для этого пришлось бы пройти двухинтервальный маршрут за один интервал.
4. **EN:** E4 establishes opportunity at C at Slot 3. The trip is possible on time, but not early.\
   **RU:** E4 устанавливает возможность совершить кражу в C в момент 3. Прийти вовремя возможно, прийти раньше — нет.
5. **EN:** E2+E4 establish both goals. Any alternative liar leaves Alma’s E1 and its impossible early arrival in force.\
   **RU:** E2+E4 устанавливают оба вывода. Любая другая версия о лжеце оставляет E1 Альмы и невозможное раннее прибытие в силе.

#### Two plausible wrong accusations

- **Selection:** `p2 / E3 / E2+E4` — Tomas Rill / Томас Рилл. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E1 to be true, while records E2+E4 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E1, а записи E2+E4 делают это невозможным. Одной возможности совершить кражу недостаточно».
- **Selection:** `p3 / E5 / E2+E4` — Edda Lane / Эдда Лейн. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E1 to be true, while records E2+E4 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E1, а записи E2+E4 делают это невозможным. Одной возможности совершить кражу недостаточно».

These examples are private QA/editorial metadata. A live rejected submission receives only the generic Proof incomplete response, never these answer-bearing explanations.

#### Closure and art

**Closure EN:** Alma returns the needle and reports the barometer’s calibration problem instead of hiding it. The exhibition gains a small card explaining how instruments can be wrong.\
**Closure RU:** Альма возвращает стрелку и сообщает об ошибке настройки барометра, вместо того чтобы скрывать её. На выставке появляется карточка о том, как приборы могут ошибаться.

**Case art brief:** Rain charts with unreadable decorative marks, a pocket barometer with an empty needle mounting, quiet tea objects far from evidence UI. No readable clocks.

**Asset expansion:** one hook, one object cutout, three site vignettes, four portraits under `case.C07.*`, plus existing shared evidence materials. Never paint the culprit holding the object before disclosure. Motive/recovery text appears only after solve or explicit Study.

---


### 18.8 C08 — The Amber Dial / Янтарный циферблат

**Difficulty / teaching purpose:** Advanced — a partly true conjunction.
**Shape:** 4 characters × 4 slots; 3 sites; 6 cards. Candidate testimonies: E2, E4, E5. Five cards are true; one candidate testimony is false.
**Stolen object:** tiny brass gnomon / маленький латунный гномон.
**Public crime declaration:** location `B`, Slot `2`. EN: “The object was taken at West Landing at Slot 2.” RU: «Место кражи — Западная площадка; момент 2».

**Hook EN:** The amber sundial is missing its little brass shadow-caster. Its polished face is intact, but it can no longer show the passage of light. Four people helped prepare the display; one small absence has unsettled the whole room.\
**Hook RU:** У янтарных солнечных часов исчез маленький латунный указатель тени. Полированная поверхность цела, но больше не показывает движение света. Четыре человека помогали готовить выставку; одна маленькая пропажа встревожила весь зал.

#### Characters and portrait production

| ID | Name EN / RU | Neutral identity EN / RU | Raster portrait brief |
|---|---|---|---|
| p1 | Ola Kemp / Ола Кемп | Mount maker; cuts archival foam with exact corners. / Изготовитель подставок; режет архивный поролон с точными углами. | Late 20s, medium brown skin, short black hair, rust work shirt, no spectacles. |
| p2 | Ren Sol / Рен Сол | Dial maker; restores worn numerals by hand. / Мастер циферблатов; вручную восстанавливает стёртые цифры. | Mid-50s, pale skin, silver hair brushed back, teal vest, fine rectangular glasses. |
| p3 | Pax Iven / Пакс Айвен | Tea cartographer; maps blends in coloured rings. / Чайный картограф; отмечает смеси цветными кругами. | Early 40s, deep brown skin, cropped curls, indigo overshirt, clean-shaven. |
| p4 | Miri Doss / Мири Досс | Light archivist; tests filters at dawn. / Архивистка света; проверяет фильтры на рассвете. | Late 30s, olive skin, dark bob tucked behind the ears, cream cardigan. |

All portraits use the shared cream backdrop, equal framing, and neutral attentive expressions. Appearance and demeanor have no evidentiary meaning.

| Site | English | Russian |
|---|---|---|
| A | East Dial Desk | Восточный стол циферблатов |
| B | West Landing | Западная площадка |
| C | Amber Niche | Янтарная ниша |

**Routes:** A–B: 1 slot; B–C: 1 slot; A–C: 2 slots via B; staying: 0. Symmetric, no extra route or transit state. On-screen recaps and hints expand A/B/C to the localized site names (or show the name alongside the letter).

#### Six evidence cards

| ID | Type / speaker | Exact predicate | English card text | Russian card text |
|---|---|---|---|---|
| E1 | Record / Подтверждённая запись | `AT(p2,1,A)` | “At Slot 1, Ren Sol was at East Dial Desk.” | «Момент 1: Рен Сол; место — Восточный стол циферблатов.» |
| E2 | Testimony / Показание — Pax Iven / Пакс Айвен | `AT(p3,4,B)` | “At Slot 4, I was at West Landing.” | «В момент 4 моё местонахождение — Западная площадка.» |
| E3 | Record / Подтверждённая запись | `AT(p2,3,C)` | “At Slot 3, Ren Sol was at Amber Niche.” | «Момент 3: Рен Сол; место — Янтарная ниша.» |
| E4 | Testimony / Показание — Ren Sol / Рен Сол | `AND(AT(p2,2,B),AT(p2,3,A))` | “Both statements are true: At Slot 2, I was at West Landing; At Slot 3, I was at East Dial Desk.” | «Верны оба утверждения: В момент 2 моё местонахождение — Западная площадка; В момент 3 моё местонахождение — Восточный стол циферблатов.» |
| E5 | Testimony / Показание — Ola Kemp / Ола Кемп | `SAME(p1,p4,1)` | “At Slot 1, Miri Doss and I were in the same location.” | «В момент 1 я и Мири Досс находились в одном месте.» |
| E6 | Record / Подтверждённая запись | `OR(AT(p4,2,A),AT(p4,2,B))` | “At least one statement is true: At Slot 2, Miri Doss was at East Dial Desk; At Slot 2, Miri Doss was at West Landing.” | «Верно хотя бы одно утверждение: Момент 2: Мири Досс; место — Восточный стол циферблатов; Момент 2: Мири Досс; место — Западная площадка.» |

Records are authenticated checkpoint observations; compound records combine two observations on one card. The literal text above is authoritative. Do not invent an image-only receipt detail, continuous stay, entrance/exit event, or exclusive meaning for “at least one.”

#### Private solution and checked proof certificate

- **False testimony / culprit:** `E4` / `p2` — Ren Sol / Рен Сол.
- **Candidate model counts:** `E2: 0`, `E4: 14688`, `E5: 0`.
- **All exact accepted two-card sets:** `{E1,E3}`. Order is immaterial.
- Every listed pair is satisfiable, entails both falsehood and opportunity, and loses at least one conclusion when either support is removed. All ten possible support pairs were checked; there is no unpublished preferred combination.
- Every individual card is satisfiable under movement alone. The tier-3 placement below holds in every valid full world.
- **Forced placements:** p2/Slot 1=A; p2/Slot 2=B; p2/Slot 3=C; p3/Slot 4=B. Only these cells may be labelled established by the complete dossier.

**One possible reconstruction, not a unique timeline:**

| Character | Slot 1 | Slot 2 | Slot 3 | Slot 4 |
|---|---|---|---|---|
| p1 | A | A | A | A |
| p2 | A | B | C | B |
| p3 | A | A | A | B |
| p4 | A | A | A | A |

#### Three free hints

| Tier | English | Russian |
|---|---|---|
| 1 | Follow the route from the East Dial Desk to the Amber Niche. | Проследите маршрут от Восточного стола циферблатов до Янтарной ниши. |
| 2 | Compare Slots 1 and 3, then check the two clauses separately. | Сравните моменты 1 и 3, затем проверьте две части показания по отдельности. |
| 3 | Place Ren at B at Slot 2. | Поместите Рена в B в момент 2. |

**Tier-3 assertion:** `AT(p2,2,B)`. Reopening it never advances the tier again.

#### Full reasoning EN / RU

1. **EN:** E1 fixes Ren at A at Slot 1; E3 fixes Ren at C at Slot 3.\
   **RU:** E1 фиксирует Рена в A в момент 1; E3 фиксирует Рена в C в момент 3.
2. **EN:** The required A–B–C route puts Ren at B at Slot 2, the crime opportunity.\
   **RU:** Обязательный маршрут A–B–C помещает Рена в B в момент 2 — в место и момент кражи.
3. **EN:** E4 says both B at Slot 2 and A at Slot 3. Its first clause is true; its second contradicts E3.\
   **RU:** E4 утверждает одновременно B в момент 2 и A в момент 3. Первая часть верна, а вторая противоречит E3.
4. **EN:** A conjunction is false when even one clause is false. Do not erase the true B placement simply because the whole testimony is false.\
   **RU:** Составное утверждение с «и» ложно, если ложна хотя бы одна часть. Не убирайте верное положение в B только потому, что показание в целом ложно.
5. **EN:** E3 exposes the false clause; E1 and E3 together establish the intermediate opportunity. Ren/E4 is the unique viable pair.\
   **RU:** E3 выявляет ложную часть; E1 и E3 вместе устанавливают положение в промежуточный момент кражи. Рен/E4 — единственная допустимая пара.

#### Two plausible wrong accusations

- **Selection:** `p3 / E2 / E1+E3` — Pax Iven / Пакс Айвен. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E4 to be true, while records E1+E3 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E4, а записи E1+E3 делают это невозможным. Одной возможности совершить кражу недостаточно».
- **Selection:** `p1 / E5 / E1+E3` — Ola Kemp / Ола Кемп. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E4 to be true, while records E1+E3 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E4, а записи E1+E3 делают это невозможным. Одной возможности совершить кражу недостаточно».

These examples are private QA/editorial metadata. A live rejected submission receives only the generic Proof incomplete response, never these answer-bearing explanations.

#### Closure and art

**Closure EN:** Ren returns the gnomon, removed without permission for a comparison photograph. The dial casts its shadow again; the photograph will wait for an agreed appointment.\
**Closure RU:** Рен возвращает указатель тени, снятый без разрешения для сравнительной фотографии. Часы снова отбрасывают тень; съёмка подождёт согласованного времени.

**Case art brief:** Amber resin sundial body and a small empty mounting. The gnomon is a triangular brass shadow-caster, described in the hook; its angle or shadow never encodes a puzzle time.

**Asset expansion:** one hook, one object cutout, three site vignettes, four portraits under `case.C08.*`, plus existing shared evidence materials. Never paint the culprit holding the object before disclosure. Motive/recovery text appears only after solve or explicit Study.

---


### 18.9 C09 — The Last Caption / Последняя подпись

**Difficulty / teaching purpose:** Advanced — linked endpoint records.
**Shape:** 4 characters × 4 slots; 3 sites; 6 cards. Candidate testimonies: E3, E4, E6. Five cards are true; one candidate testimony is false.
**Stolen object:** engraved caption plate / гравированная табличка-подпись.
**Public crime declaration:** location `B`, Slot `2`. EN: “The object was taken at Caption Hall at Slot 2.” RU: «Место кражи — Зал подписей; момент 2».

**Hook EN:** The final caption is missing from a river photograph, leaving a beautifully framed image without its last sentence. Four people helped prepare the exhibition. The photograph is safe, but the story beneath it has quietly disappeared.\
**Hook RU:** Под речной фотографией исчезла последняя подпись: красиво оформленный снимок остался без заключительной строки. Четыре человека помогали готовить выставку. Фотография в сохранности, а история под ней тихо исчезла.

#### Characters and portrait production

| ID | Name EN / RU | Neutral identity EN / RU | Raster portrait brief |
|---|---|---|---|
| p1 | Bess Aro / Бесс Аро | Frame maker; keeps linen gloves in every drawer. / Изготовительница рам; хранит льняные перчатки в каждом ящике. | Early 60s, pale skin, loose silver curls, dark-blue linen blouse. |
| p2 | Cato Elm / Като Элм | Exhibition volunteer; aligns labels with a ruler. / Волонтёр выставки; выравнивает подписи линейкой. | Late 20s, deep brown skin, short twists, ochre shirt, no glasses. |
| p3 | Ilan Mere / Илан Мер | Caption writer; drafts three endings before choosing one. / Автор подписей; пишет три концовки, прежде чем выбрать одну. | Mid-40s, olive skin, black hair at ear length, small round glasses, teal cardigan. |
| p4 | Nara Kest / Нара Кест | Night guide; knows which windows catch the tide light. / Ночная экскурсоводка; знает, какие окна ловят приливный свет. | Early 30s, warm brown skin, thick dark braid, cream jacket. |

All portraits use the shared cream backdrop, equal framing, and neutral attentive expressions. Appearance and demeanor have no evidentiary meaning.

| Site | English | Russian |
|---|---|---|
| A | Margin Room | Комната полей |
| B | Caption Hall | Зал подписей |
| C | Print Balcony | Печатный балкон |

**Routes:** A–B: 1 slot; B–C: 1 slot; A–C: 2 slots via B; staying: 0. Symmetric, no extra route or transit state. On-screen recaps and hints expand A/B/C to the localized site names (or show the name alongside the letter).

#### Six evidence cards

| ID | Type / speaker | Exact predicate | English card text | Russian card text |
|---|---|---|---|---|
| E1 | Record / Подтверждённая запись | `AND(AT(p2,1,A),SAME(p3,p2,1))` | “Both statements are true: At Slot 1, Cato Elm was at Margin Room; At Slot 1, Ilan Mere and Cato Elm were in the same location.” | «Верны оба утверждения: Момент 1: Като Элм; место — Комната полей; В момент 1 Илан Мер и Като Элм находились в одном месте.» |
| E2 | Record / Подтверждённая запись | `AND(SAME(p3,p4,3),AT(p4,3,C))` | “Both statements are true: At Slot 3, Ilan Mere and Nara Kest were in the same location; At Slot 3, Nara Kest was at Print Balcony.” | «Верны оба утверждения: В момент 3 Илан Мер и Нара Кест находились в одном месте; Момент 3: Нара Кест; место — Печатный балкон.» |
| E3 | Testimony / Показание — Nara Kest / Нара Кест | `OR(AT(p4,1,A),AT(p4,1,B))` | “At least one statement is true: At Slot 1, I was at Margin Room; At Slot 1, I was at Caption Hall.” | «Верно хотя бы одно утверждение: В момент 1 моё местонахождение — Комната полей; В момент 1 моё местонахождение — Зал подписей.» |
| E4 | Testimony / Показание — Cato Elm / Като Элм | `SAME(p2,p4,4)` | “At Slot 4, Nara Kest and I were in the same location.” | «В момент 4 я и Нара Кест находились в одном месте.» |
| E5 | Record / Подтверждённая запись | `AND(NOT_AT(p1,2,B),AT(p1,4,C))` | “Both statements are true: At Slot 2, Bess Aro was not at Caption Hall; At Slot 4, Bess Aro was at Print Balcony.” | «Верны оба утверждения: Момент 2: Бесс Аро; место — не Зал подписей; Момент 4: Бесс Аро; место — Печатный балкон.» |
| E6 | Testimony / Показание — Ilan Mere / Илан Мер | `AT(p3,2,C)` | “At Slot 2, I was at Print Balcony.” | «В момент 2 моё местонахождение — Печатный балкон.» |

Records are authenticated checkpoint observations; compound records combine two observations on one card. The literal text above is authoritative. Do not invent an image-only receipt detail, continuous stay, entrance/exit event, or exclusive meaning for “at least one.”

#### Private solution and checked proof certificate

- **False testimony / culprit:** `E6` / `p3` — Ilan Mere / Илан Мер.
- **Candidate model counts:** `E3: 0`, `E4: 0`, `E6: 288`.
- **All exact accepted two-card sets:** `{E1,E2}`. Order is immaterial.
- Every listed pair is satisfiable, entails both falsehood and opportunity, and loses at least one conclusion when either support is removed. All ten possible support pairs were checked; there is no unpublished preferred combination.
- Every individual card is satisfiable under movement alone. The tier-3 placement below holds in every valid full world.
- **Forced placements:** p1/Slot 4=C; p2/Slot 1=A; p3/Slot 1=A; p3/Slot 2=B; p3/Slot 3=C; p4/Slot 3=C. Only these cells may be labelled established by the complete dossier.

**One possible reconstruction, not a unique timeline:**

| Character | Slot 1 | Slot 2 | Slot 3 | Slot 4 |
|---|---|---|---|---|
| p1 | A | A | B | C |
| p2 | A | A | A | B |
| p3 | A | B | C | B |
| p4 | A | B | C | B |

#### Three free hints

| Tier | English | Russian |
|---|---|---|
| 1 | The companions link the Margin Room to the Print Balcony. | Спутники связывают Комнату полей с Печатным балконом. |
| 2 | Use the paired records at Slots 1 and 3 to infer the middle moment. | Используйте парные записи о моментах 1 и 3, чтобы вывести промежуточное положение. |
| 3 | Place Ilan at B at Slot 2. | Поместите Илана в B в момент 2. |

**Tier-3 assertion:** `AT(p3,2,B)`. Reopening it never advances the tier again.

#### Full reasoning EN / RU

1. **EN:** E1 places Cato at A at Slot 1 and puts Ilan with Cato. Ilan was therefore at A at Slot 1.\
   **RU:** E1 помещает Като в A в момент 1 и указывает, что Илан был рядом с Като. Поэтому Илан был в A в момент 1.
2. **EN:** E2 places Nara at C at Slot 3 and puts Ilan with Nara. Ilan was therefore at C at Slot 3.\
   **RU:** E2 помещает Нару в C в момент 3 и указывает, что Илан был рядом с Нарой. Поэтому Илан был в C в момент 3.
3. **EN:** Those linked observations force Ilan’s route A–B–C and B at Slot 2.\
   **RU:** Эти связанные наблюдения вынуждают маршрут Илана A–B–C и положение в B в момент 2.
4. **EN:** E6 instead claims C at Slot 2, which is too early. B at Slot 2 is also the declared crime opportunity.\
   **RU:** E6 вместо этого утверждает C в момент 2, что слишком рано. B в момент 2 также соответствует месту и моменту кражи.
5. **EN:** The proof needs both compound records: one establishes the early endpoint, the other the late endpoint. The complete case permits only Ilan/E6.\
   **RU:** Для доказательства нужны обе составные записи: одна задаёт начальную точку, другая — конечную. Всему делу соответствует только пара Илан/E6.

#### Two plausible wrong accusations

- **Selection:** `p4 / E3 / E1+E2` — Nara Kest / Нара Кест. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E6 to be true, while records E1+E2 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E6, а записи E1+E2 делают это невозможным. Одной возможности совершить кражу недостаточно».
- **Selection:** `p2 / E4 / E1+E2` — Cato Elm / Като Элм. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E6 to be true, while records E1+E2 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E6, а записи E1+E2 делают это невозможным. Одной возможности совершить кражу недостаточно».

These examples are private QA/editorial metadata. A live rejected submission receives only the generic Proof incomplete response, never these answer-bearing explanations.

#### Closure and art

**Closure EN:** Ilan returns the plate and formally requests a correction to its attribution. The photograph gets both its caption and the review that should have been requested before the label was taken.\
**Closure RU:** Илан возвращает табличку и официально просит исправить указание авторства. Фотография получает и подпись, и проверку, о которой следовало попросить до исчезновения таблички.

**Case art brief:** Matte river photograph, blank caption recess, linen frame sleeves, soft balcony light. The object is a small engraved plate with no readable generation-model lettering.

**Asset expansion:** one hook, one object cutout, three site vignettes, four portraits under `case.C09.*`, plus existing shared evidence materials. Never paint the culprit holding the object before disclosure. Motive/recovery text appears only after solve or explicit Study.

---


### 18.10 C10 — River Without Ink / Река без чернил

**Difficulty / teaching purpose:** Consolidation — closing the Atlas.
**Shape:** 4 characters × 4 slots; 3 sites; 6 cards. Candidate testimonies: E4, E5, E6. Five cards are true; one candidate testimony is false.
**Stolen object:** first-edition river-map ink vial / флакон чернил для первого издания речной карты.
**Public crime declaration:** location `A`, Slot `1`. EN: “The object was taken at Quay Cabinet at Slot 1.” RU: «Место кражи — Шкаф на набережной; момент 1».

**Hook EN:** The first printing of a river map is waiting for a sealed vial of ink. The vial is gone, and the town’s evening reading is close. One last dossier lies on the desk before the archive can put its lamps out.\
**Hook RU:** Первый тираж карты реки ждёт запечатанный флакон чернил. Флакон исчез, а вечернее чтение уже близко. На столе осталось последнее дело, прежде чем архив сможет погасить лампы.

#### Characters and portrait production

| ID | Name EN / RU | Neutral identity EN / RU | Raster portrait brief |
|---|---|---|---|
| p1 | Rilo Fen / Рило Фен | River historian; keeps tide tables folded in his pocket. / Историк реки; носит в кармане сложенные таблицы приливов. | Mid-50s, medium brown skin, salt-and-pepper beard, blue collarless shirt. |
| p2 | Oren Pia / Орен Пиа | Coin archivist; taps date stamps dry before filing. / Архивист монет; просушивает штампы дат перед хранением. | Early 30s, pale freckled skin, short red hair, olive vest, clean-shaven. |
| p3 | Tess Quade / Тесс Куэйд | Letter cutter; saves offcuts for children’s bookmarks. / Резчица букв; бережёт обрезки для детских закладок. | Late 40s, deep brown skin, short natural hair, ochre work blouse, oval glasses. |
| p4 | Maven Lark / Мейвен Ларк | Ink conservator; tests colour with a single fine line. / Хранительница чернил; проверяет цвет одной тонкой линией. | Early 60s, olive skin, silver braid over one shoulder, muted indigo cardigan. |

All portraits use the shared cream backdrop, equal framing, and neutral attentive expressions. Appearance and demeanor have no evidentiary meaning.

| Site | English | Russian |
|---|---|---|
| A | Quay Cabinet | Шкаф на набережной |
| B | Bridge Gallery | Галерея моста |
| C | Drying Loft | Сушильная мансарда |

**Routes:** A–B: 1 slot; B–C: 1 slot; A–C: 2 slots via B; staying: 0. Symmetric, no extra route or transit state. On-screen recaps and hints expand A/B/C to the localized site names (or show the name alongside the letter).

#### Six evidence cards

| ID | Type / speaker | Exact predicate | English card text | Russian card text |
|---|---|---|---|---|
| E1 | Record / Подтверждённая запись | `SAME(p4,p1,1)` | “At Slot 1, Maven Lark and Rilo Fen were in the same location.” | «В момент 1 Мейвен Ларк и Рило Фен находились в одном месте.» |
| E2 | Record / Подтверждённая запись | `OR(AT(p3,3,A),AT(p3,3,B))` | “At least one statement is true: At Slot 3, Tess Quade was at Quay Cabinet; At Slot 3, Tess Quade was at Bridge Gallery.” | «Верно хотя бы одно утверждение: Момент 3: Тесс Куэйд; место — Шкаф на набережной; Момент 3: Тесс Куэйд; место — Галерея моста.» |
| E3 | Record / Подтверждённая запись | `AT(p1,1,A)` | “At Slot 1, Rilo Fen was at Quay Cabinet.” | «Момент 1: Рило Фен; место — Шкаф на набережной.» |
| E4 | Testimony / Показание — Oren Pia / Орен Пиа | `AND(NOT_AT(p2,1,A),AT(p2,2,C))` | “Both statements are true: At Slot 1, I was not at Quay Cabinet; At Slot 2, I was at Drying Loft.” | «Верны оба утверждения: В момент 1 моё местонахождение — не Шкаф на набережной; В момент 2 моё местонахождение — Сушильная мансарда.» |
| E5 | Testimony / Показание — Maven Lark / Мейвен Ларк | `AT(p4,1,C)` | “At Slot 1, I was at Drying Loft.” | «В момент 1 моё местонахождение — Сушильная мансарда.» |
| E6 | Testimony / Показание — Tess Quade / Тесс Куэйд | `AT(p3,4,C)` | “At Slot 4, I was at Drying Loft.” | «В момент 4 моё местонахождение — Сушильная мансарда.» |

Records are authenticated checkpoint observations; compound records combine two observations on one card. The literal text above is authoritative. Do not invent an image-only receipt detail, continuous stay, entrance/exit event, or exclusive meaning for “at least one.”

#### Private solution and checked proof certificate

- **False testimony / culprit:** `E5` / `p4` — Maven Lark / Мейвен Ларк.
- **Candidate model counts:** `E4: 0`, `E5: 10080`, `E6: 0`.
- **All exact accepted two-card sets:** `{E1,E3}`. Order is immaterial.
- Every listed pair is satisfiable, entails both falsehood and opportunity, and loses at least one conclusion when either support is removed. All ten possible support pairs were checked; there is no unpublished preferred combination.
- Every individual card is satisfiable under movement alone. The tier-3 placement below holds in every valid full world.
- **Forced placements:** p1/Slot 1=A; p2/Slot 2=C; p3/Slot 3=B; p3/Slot 4=C; p4/Slot 1=A. Only these cells may be labelled established by the complete dossier.

**One possible reconstruction, not a unique timeline:**

| Character | Slot 1 | Slot 2 | Slot 3 | Slot 4 |
|---|---|---|---|---|
| p1 | A | A | A | A |
| p2 | B | C | B | A |
| p3 | A | A | B | C |
| p4 | A | A | A | A |

#### Three free hints

| Tier | English | Russian |
|---|---|---|
| 1 | Compare the Quay Cabinet with the Drying Loft. | Сравните Шкаф на набережной и Сушильную мансарду. |
| 2 | The decisive shared position is at Slot 1. | Решающее совместное положение относится к моменту 1. |
| 3 | Place Maven at A at Slot 1. | Поместите Мейвен в A в момент 1. |

**Tier-3 assertion:** `AT(p4,1,A)`. Reopening it never advances the tier again.

#### Full reasoning EN / RU

1. **EN:** E1 places Maven and Rilo together at Slot 1.\
   **RU:** E1 указывает, что Мейвен и Рило были вместе в момент 1.
2. **EN:** E3 puts Rilo at A then, so Maven must also be at A.\
   **RU:** E3 помещает Рило в A в этот момент, поэтому Мейвен тоже должна быть в A.
3. **EN:** E5 claims C at the same moment. Shared location and the authenticated record make that claim impossible.\
   **RU:** E5 утверждает C в тот же момент. Совместное положение и подтверждённая запись делают это утверждение невозможным.
4. **EN:** A at Slot 1 establishes opportunity. The deduction requires no speculation about motives, ink stains, or a journey before Slot 1.\
   **RU:** A в момент 1 устанавливает возможность совершить кражу. Не нужны догадки о мотивах, пятнах чернил или маршруте до момента 1.
5. **EN:** E1+E3 establish Maven/E5. Other people’s statements can be true, but cannot remove this contradiction if one of them is labelled the liar.\
   **RU:** E1+E3 доказывают пару Мейвен/E5. Показания других людей могут быть правдивыми, но объявление одного из них лжецом не устраняет это противоречие.

#### Two plausible wrong accusations

- **Selection:** `p2 / E4 / E1+E3` — Oren Pia / Орен Пиа. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E5 to be true, while records E1+E3 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E5, а записи E1+E3 делают это невозможным. Одной возможности совершить кражу недостаточно».
- **Selection:** `p3 / E6 / E1+E3` — Tess Quade / Тесс Куэйд. **Why it can tempt:** a legal route can give this person crime opportunity after rejecting their own testimony. **Why it fails:** the sole-false-card hypothesis still requires E5 to be true, while records E1+E3 make it impossible. Opportunity alone is not proof. **RU:** «Если отвергнуть это показание, допустимый маршрут позволяет этому человеку оказаться в месте кражи. Но версия всё ещё требует истинности E5, а записи E1+E3 делают это невозможным. Одной возможности совершить кражу недостаточно».

These examples are private QA/editorial metadata. A live rejected submission receives only the generic Proof incomplete response, never these answer-bearing explanations.

#### Closure and art

**Closure EN:** Maven returns the sealed ink, set aside without permission for a promised private printing. The archive agrees a fair allocation. The river map is printed, and the Atlas closes on a restored trust rather than a spectacle.\
**Closure RU:** Мейвен возвращает запечатанные чернила, отложенные без разрешения для обещанного частного тиража. Архив согласует справедливое распределение. Карту реки печатают, и Атлас завершается восстановлением доверия, а не громкой сценой.

**Case art brief:** Sealed blue-black ink vial, unfinished river-map sheets with nonsemantic lines, cream drying racks and dusk-blue window light. No actual addresses or route clues in painted maps.

**Asset expansion:** one hook, one object cutout, three site vignettes, four portraits under `case.C10.*`, plus existing shared evidence materials. Never paint the culprit holding the object before disclosure. Motive/recovery text appears only after solve or explicit Study.

---

---

## 19. Source register, traceability, and final handoff

### 19.1 Sources and research boundaries

Research checked on **15 September 2026**. Official documentation can change; the implementation agent must verify the specific supported SDK/client/payment versions when building. These sources support platform, accessibility, audio, and licensing decisions; they do not establish puzzle fairness, market demand, or commercial success.

| Ref | Source | What it supports / limitation |
|---|---|---|
| R0 | Owner-supplied *Alibi Atlas — Software Requirements Specification*, SG-G05 v1.0, 8 September 2026 (`05_Alibi_Atlas_SRS.md`) | Product origin, four-character/six-card structure, proof selection, hints/Study, EN/RU, Stars cosmetic, source acceptance tests. This document expands and explicitly resolves its ambiguities. |
| R1 | [Telegram Mini Apps — official documentation](https://core.telegram.org/bots/webapps), especially [validating received data](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app) | JS bridge, `initData` server verification, viewport/safe areas, BackButton, haptics, lifecycle, invoices and capability checks. Official page was read directly; API availability is not proof of actual device compatibility. |
| R2 | [Telegram Bot Payments API for Digital Goods and Services](https://core.telegram.org/bots/payments-stars) | Digital purchases in Stars/XTR, authoritative successful-payment handling, test environment, support and refunds. Official page was read directly. |
| R3 | [Telegram Bot API — Payments](https://core.telegram.org/bots/api#payments), [answerPreCheckoutQuery](https://core.telegram.org/bots/api#answerprecheckoutquery), [refundStarPayment](https://core.telegram.org/bots/api#refundstarpayment) | Server methods and payment lifecycle. Recheck supported method contracts at integration; no real payment was executed during documentation work. |
| R4 | [MDN — Autoplay guide for media and Web Audio APIs](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay) | Gesture-gated audio and graceful autoplay failure. Codec and Telegram WebView compatibility still require device tests. |
| R5 | [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [Understanding Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Accessibility targets, 320 CSS px reflow, minimum target rules. Product's 44–48 px targets are deliberately more generous; no conformance audit has been completed today. |
| R6 | [Kenney Interface Sounds](https://kenney.nl/assets/interface-sounds), [Kenney Support / licensing](https://kenney.nl/support) | Optional exact source pack and publisher's CC0/commercial-use/attribution policy. Support page was read directly. No archive/file-level license audit or sample audition was performed; procedural audio is the complete default. |
| R7 | [Noto Sans — Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans), [Noto distribution index](https://notofonts.github.io/), [Noto font license reference](https://github.com/notofonts/noto-fonts/blob/main/LICENSE) | Latin/Cyrillic support, self-hostable font sourcing, SIL Open Font License 1.1. The historical repository is archived; use the current distribution index and retain the license shipped with the exact downloaded font binaries. |

The source SRS references an unavailable Platform SRS and reference identifiers “R07” and “R09.” Their contents were not supplied and are not fabricated here. The **R0–R7 register above is this document's own register**, not a claim to reproduce those missing original reference entries.

### 19.2 Requirements traceability

| Source requirement | Master specification coverage | Verification |
|---|---|---|
| G05-F01 readable hook and reduced three-card tutorial | §2, §4, §6, T01 in §17 | AA-031, AA-050, AA-051 |
| G05-F02 tap/keyboard placement, private notes, free clearing | §6.3–6.5, §11.1–11.3 | AA-028–035 |
| G05-F03 deterministic evidence/occupancy/travel validation | §5.1–5.6, §11.2 | AA-001–011 |
| G05-F04 server-only answer/proof until solve/reveal | §5.6–5.7, §10.2, §11.1/11.5/11.6 | AA-016, AA-039–040 |
| G05-F05 evidence-based accusation and valid alternatives | §5.5, §6.6, §14 | AA-012–015, AA-021 |
| G05-F06 saved state and semantic locale stability | §4.3, §11.3, §13 | AA-018, AA-022–030 |
| G05-F07 unique certificates, bilingual review, hints, licenses, wrong examples | §8–9, §14, §17–18 | AA-005–008, AA-019, AA-049–052, AA-056 |
| G05-F08 reasoning recap and voluntary safe sharing | §6.2, §12.5, §17–18 | AA-006, AA-045–046 |
| Twelve cases and mastery at 1/5/10 | §1.2, §4, §17–18 | AA-026, AA-050 |
| Hint score, Study, no speed penalty/reward | §4.3, §5.7, §12.1 | AA-020–027 |
| Cosmetic-only Stars and optional profile wallet | §10.6, §12.2–12.4 | AA-041–044, AA-053 |
| Content corrections/versioned fairness | §11, §14.4 | AA-048, AA-055 |
| 12-person comprehension hypothesis and bilingual humans | §2.3, §13.1, §14.3, §15.4 | AA-019, AA-051 |
| Owner request: one exhaustive English handoff, no implementation today | Whole document; deliverable boundary in §1 and §16.4 | One standalone Markdown specification; no game or generated media claimed |
| Owner request: image-generation assets, no SVG, specified sounds | §7–9 and dossier art briefs | Future manifest and actual visual/listening reviews |

### 19.3 Documentation verification versus future production evidence

**Performed during preparation:** source SRS review; current official Telegram and sound-source policy research; mathematical editorial checks using temporary finite-enumeration utilities; count/schema/reference consistency review; and review of the document for game-rule, proof, UI, security, and scope contradictions. The checked draft case counts and proof sets appear in §17–18. These utilities are documentation-analysis aids, not the implemented game engine.

**Not performed or claimed:** game implementation; a runnable Telegram preview; final image/audio generation; actual phone or assistive-technology tests; real/test-environment payment execution; independent fluent human reviews; observed-player sessions; legal/rights certification; production deployment; or reconciliation with a Platform SRS that was not supplied.

The future agent must repeat the logic checks from the **actual structured content it builds**, not trust a copied count. It must produce fresh UI, interaction, accessibility, performance, and payment evidence from the running product. An attractive design image is not proof that saving, hints, refunds, localization, or accusations work.

### 19.4 Owner input register

These are external decisions or access requirements, not blank game-design work left for the owner to invent:

| Needed input / approval | When it blocks | Safe default while unavailable |
|---|---|---|
| Missing shared Platform SRS and actual integration contracts | Marketplace integration / shared compliance | Build the specified standalone game with narrow adapters; do not claim marketplace compliance |
| Bot credentials, HTTPS domain, deployed database, support/privacy operator details | Authenticated staging/production and public launch | Isolated labelled development fixtures; no production auth bypass |
| Image-generation provider access/credits and applicable usage rights | Final art production/rights approval | Documented non-misleading development placeholders, never “final assets” |
| Optional later design reference | Final owner aesthetic sign-off if requested | Use §7–8's complete baseline without changing logic |
| Human EN/RU reviewers and observed-test participants | Content publication and release approval | Machine-checked authored candidates remain unpublished |
| 75-Star price, sales terms, refund contact, payment authorization | Enabling real cosmetic sales | Shop sales disabled; all free gameplay remains available |
| Retention/support/legal approval | Public operation | No real customer collection or sales until operator policy is set |

### 19.5 Final instruction to the implementation agent

Read this as one contract. Start with the mathematical model and the reduced accessible flow, then build the complete corpus and finished presentation. Use the exact asset families, source/rights records, and synthesis recipes rather than inventing an unspecified asset dependency. Accept genuine alternative proofs under the stated rule. Preserve acknowledged state and user consent through interruptions. Keep every puzzle solvable without sound, artwork, purchase, wallet, or precision input.

Finish with a verifiable delivery, not a promise: all twelve dossiers, both locales, all required screens and recovery paths, a server-authoritative proof system, honest Study/ranking semantics, final licensed assets and sound, reproducible setup, tests, certificates, and a clear statement of any external release gate still awaiting a human or operator.

> **The final feeling:** The player does not leave with the impression that a machine told them a name. They leave knowing exactly why one story could not have happened—and with the quiet pleasure of having proved it themselves.
