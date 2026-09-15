# QUIET HARBOR
# Master Game Development Specification

**A small harbor. A private promise. One signal that changes everything.**

| Document field | Value |
|---|---|
| Product | Quiet Harbor / Тихая гавань |
| Product ID | SG-G04 |
| Document ID | QH-MGDS-1.0 |
| Version / date | 1.0 / 15 September 2026 |
| Document language | English; player-facing copy specified in English and Russian |
| Target | Telegram Mini App; mobile-first, private cooperative sessions |
| Intended recipient | An implementation agent and the humans reviewing its game, art, security, and release evidence |
| Source baseline | User-supplied `04_Quiet_Harbor_SRS.md`, v1.0, 8 September 2026 |
| Status | Implementation specification and creative direction; not a claim of an implemented or released game |
| This delivery | Documentation only. No application, generated art, purchased assets, or production deployment is included. |

## How to use this document

This is the single master handoff. It specifies the experience, rules, authored content, screens, art production, audio production, localization, architecture, operations, tests, and the evidence required before an agent may report completion. Read the whole document before building the first playable slice. A beautiful prototype that omits private-state protection or validated content is not a completed Quiet Harbor.

**MUST** is mandatory. **SHOULD** permits a documented equivalent that satisfies the same acceptance criteria. **MAY** is optional. A numerical value is a product decision unless explicitly attributed to an external standard. Performance numbers are targets, not measurements of an existing product.

### Authority and missing inputs

1. Preserve the attached SRS's core game rules and exclusions. This document supplies explicit decisions where that SRS is incomplete; the decision register identifies consequential additions.
2. The source refers to `00_Stark_Games_Marketplace_SRS.md`, but that document was not supplied. No marketplace API, security suite, analytics policy, wallet interface, deployment environment, or original R03/R07/R08/R10 bibliography has been inspected. Those references are not evidence for this document.
3. Implement the adapter contracts in this document against an existing platform if one is supplied. Otherwise implement the specified standalone Telegram game services. Do not fabricate a marketplace or rebuild an unrelated platform.
4. If the missing shared SRS later conflicts with this document, produce a short conflict report. Do not silently weaken privacy, change scoring, add financial mechanics, or expand scope.
5. A later visual-design reference may replace composition, illustration style, and decorative tokens. It may not change rules, information visibility, accessibility, controls, asset licensing, or readable hit targets without an explicit specification revision.
6. Production needs real bot configuration, hosting, operator-owned support/privacy details, and observed human tests. These are release dependencies, not reasons to leave the playable implementation unfinished or to invent successful verification.

### Navigation

1. [Product promise and creative identity](#1-product-promise-and-creative-identity)
2. [Scope and completion contract](#2-scope-and-completion-contract)
3. [Canonical game rules](#3-canonical-game-rules)
4. [Time, room lifecycle, recovery, and control ownership](#4-time-room-lifecycle-recovery-and-control-ownership)
5. [Authored maps, jobs, and solvability](#5-authored-maps-jobs-and-solvability)
6. [Practice, tutorial, and bot behavior](#6-practice-tutorial-and-bot-behavior)
7. [Progression, scoring, and social design](#7-progression-scoring-and-social-design)
8. [Complete screen and interaction specification](#8-complete-screen-and-interaction-specification)
9. [Visual design system and motion](#9-visual-design-system-and-motion)
10. [Asset inventory and image-generation production brief](#10-asset-inventory-and-image-generation-production-brief)
11. [Audio and haptic specification](#11-audio-and-haptic-specification)
12. [Localization and player-facing language](#12-localization-and-player-facing-language)
13. [Accessibility and device behavior](#13-accessibility-and-device-behavior)
14. [Technical architecture and data contracts](#14-technical-architecture-and-data-contracts)
15. [Telegram, security, and privacy](#15-telegram-security-and-privacy)
16. [Optional commerce and platform adapters](#16-optional-commerce-and-platform-adapters)
17. [Performance, persistence, deployment, and operations](#17-performance-persistence-deployment-and-operations)
18. [Analytics and playtest plan](#18-analytics-and-playtest-plan)
19. [Verification matrix and release gates](#19-verification-matrix-and-release-gates)
20. [Implementation sequence and agent handoff](#20-implementation-sequence-and-agent-handoff)
21. [Decision register and honest evidence ledger](#21-decision-register-and-honest-evidence-ledger)
22. [Sources and design-only handoff brief](#22-sources-and-design-only-handoff-brief)

---

## 1. Product promise and creative identity

### 1.1 The game in one paragraph

Quiet Harbor is a cooperative, simultaneous-turn traffic puzzle for two to four friends. Each person captains one small delivery boat on a nine-node harbor chart. Everyone sees the waterways and ships; only you see the two berths that can receive your current parcel and which one would be especially appreciated. You cannot publish your route. You can leave one small public signal. Every twenty seconds, the harbor moves at once. Deliver six parcels before the eighth round ends, without accumulating five congestion points. The best moment is not an individual winning move: it is seeing three separate decisions suddenly fit together.

**Player promise:** “I can understand my next move immediately, yet helping the group well takes attention.”

**Emotional promise:** calm surroundings, meaningful uncertainty, shared relief. The timer gives decisions shape; it does not turn the harbor into an alarm clock.

**Tagline:** “One signal can clear the harbor.” / “Один сигнал может освободить путь.”

### 1.2 The place

The harbor is a miniature working waterfront at the blue hour. Kitchens are setting tables, a small workshop is closing its shutters, and a lighthouse keeper is preparing the evening lamp. Boats carry ordinary, welcome things: tea, fabric, books, fresh bread, repair supplies. Nobody is starving, drowning, or losing their livelihood if a team misses its target. A failed shift means trying a different arrangement tomorrow, not a catastrophe.

There are always three receiving berths:

| ID | English / Russian | Character | Readable silhouette |
|---|---|---|---|
| B1 | Lantern / Фонарь | A warm lamp and the evening reading room | Low building with one square lantern |
| B2 | Market / Рынок | A canvas-roofed market and shared table | Broad striped awning |
| B3 | Workshop / Мастерская | A friendly repair shed with painted shutters | Stepped roof and small square chimney |

Berths keep the same IDs, names, and silhouettes on every map. Background architecture changes; game meaning does not. Cargo names provide flavor only and never encode a private destination or bonus.

No voiced characters, lore cutscenes, faction system, survival simulation, or collectible storyline is required. The world is expressed through materials, short copy, ambient sound, and the little moment when a delivery light warms up.

### 1.3 Five non-negotiable experience pillars

| Pillar | Required expression | Failure to avoid |
|---|---|---|
| Read the harbor at a glance | Exactly nine nodes, clear arrows, stable ship letters, legal moves visible to the owner | Beautiful water hiding the routes |
| Limited speech, meaningful coordination | One current signal per ship; hidden sealed routes; no chat composer | A signal UI that silently becomes a route reveal |
| Together, not against each other | Shared objective, team score, node-based conflict explanation | “Worst player,” blame statistics, or kicking someone for a bad turn |
| Calm is compatible with consequence | Soft feedback, readable deadline, forgiving practice, honest failure rule | Sirens, shaking screen, punitive streaks |
| Small game, complete craft | Ten maps, twenty authored decks, real reconnection, polished EN/RU | A one-map demo with attractive placeholder cards |

### 1.4 An illustrative moment, not a scripted rule

You are boat A. Your private card says Lantern or Market; Market earns the small preference bonus. The short route goes through J1, where another boat is already waiting. You place NEED on J1. A YIELD signal appears nearby. You choose J1 and commit. Nothing in the interface claims that the other boat has promised to leave. At the deadline, the ships move together: one clears the junction, yours slips into the space, and a third reaches a berth. A small light turns on along the quay. The moment feels like understanding someone without a conversation.

If it goes wrong, the chart says “J1 was contested. Boats stayed in place.” It does not say “B blocked you.” The next round is a new chance to coordinate.

### 1.5 Intended audience and session truth

- Primary: two to four friends already connected through Telegram, willing to spend one short session coordinating.
- Secondary: one person learning with clearly labeled practice bots.
- Not the launch promise: a solo stranger finding a room full of real people on demand.
- The source's 4–6-minute session includes entry, lobby/readiness, optional teaching, up to eight rounds, and recap. Eight 20-second planning windows plus eight 1.5-second resolution presentations equal **172 seconds of scheduled planning and presentation**, plus normal server transition latency and any exceptional recovery. This is not a guaranteed wall-clock maximum. Do not stretch the planning timer to manufacture a four-minute match.
- A familiar group may finish more quickly. There is no artificial delay before success or rematch.
- Commercial viability is unproven. The proposed wave-C/high-complexity assessment remains: do not treat this as a substitute for establishing an active social audience.

## 2. Scope and completion contract

### 2.1 Required playable release

| Surface | Required scope |
|---|---|
| Play | 2–4 human participants in invite-only rooms; one human with 1–3 labeled bots; mixed rooms only with explicit bot consent |
| Rules | Nine-node directed chart; eight rounds; 20-second standard planning; one move and one replaceable signal; canonical resolution |
| Content | Ten map identities, two authored deck families each, supported 2/3/4-seat variants, validated content artifacts |
| Teaching | Short interactive tutorial, rules sheet, optional untimed learning mode |
| Room management | Expiring/revocable invites, readiness, start, host transfer, reconnect, bot replacement, round-boundary reclaim |
| Results | Both success and failure recap, same authoritative score for all, team-only successful-result boards separated by mode |
| Progression | Distinct-scenario mastery at 1/5/10, with human participation eligibility |
| Presentation | Complete raster art set, responsive chart and text-list view, original/properly licensed audio, reduced motion |
| Language | Complete EN/RU UI and accessible labels, no English-only error paths |
| Safety | Report/block/exit, non-financial free play, private-state filtering, abuse controls |
| Technical | Server authority, durable resolution, idempotence, authentication, operational health, automated tests |
| Handoff | Reproducible build/setup, content proof reports, licenses/provenance, test evidence, documented deployment needs |

### 2.2 Conditional modules

The Harbor Flag Set is the only specified paid product. Implement its catalog/entitlement adapter and disabled state; activate actual purchase only if the platform supports Stars and operator configuration exists. Wallet association is strictly a host-platform optional capability. Neither integration blocks the free game, tutorial, reporting, accessibility, or rematch.

Production must never show a working-looking purchase or wallet button backed only by a mock. A development adapter MUST be unmistakably marked and impossible to enable accidentally in production.

### 2.3 Explicitly excluded

Public matchmaking, text/voice chat, arbitrary drawing, free-text signals, spectators, user-made maps, asynchronous 24-hour rooms, persistent transport economy, fuel, energy, lives, paid retries, loot boxes, ads, referral rewards, subscriptions, NFTs, token payouts, cash stakes, betting, hidden human impersonation, individual blame rankings, a full marketplace shell, and a second game mode with different competitive rules.

No generative model is required during live play. MCP image generation is a production-time tool, never a dependency of a player's turn.

### 2.4 What “finished” means

All required playable surfaces work without manual database edits. No placeholder art, untranslated string, fake bot identity, fabricated proof, or client-authoritative scoring remains. Every content variant has a machine-replayable solution, and privacy tests inspect actual serialized traffic. The implementation handoff distinguishes **implemented**, **automatically verified**, **manually verified**, and **production-blocked**. Human playtests and real-device Telegram tests cannot be replaced by an agent claiming that simulated users enjoyed the game.

## 3. Canonical game rules

### 3.1 Constants and terms

| Constant / term | Definition |
|---|---|
| `seatCount` | Fixed at scenario start; 2, 3, or 4. Bot takeover does not change it. |
| Seats | A, B, C, D in join order at scenario creation; not selectable for priority |
| `roundLimit` | 8 |
| `planningMs` | 20,000 in standard play |
| `resolutionPresentationMs` | 1,500; reduced motion changes only local animation, never the next server deadline |
| `deliveryTarget` | 6 |
| `congestionLimit` | 5; reaching or exceeding it fails |
| Berth | B1, B2, or B3; arrival with a permitted job completes a delivery |
| Entry | A dedicated node for one seat; no other seat may target it |
| Junction | A traversable non-entry, non-berth node |
| Move | One outgoing graph edge from the ship's current node to its chosen destination |
| Wait | No departure; not a move targeting the current node |
| Intent | An owner-private selected/committed move or wait for one round |
| Signal | One public semantic request, with a node and sender seat; not an intent |
| Scenario | One run of one map/count/deck instance with eight-round maximum rules |
| Revision | Monotonically increasing authoritative room-state version |

There is exactly one ship per seat. Occupancy is exclusive at round boundaries. Entries cannot be occupied by another ship; authored graphs contain no inbound entry edges. Each seat begins round 1 on its own entry.

### 3.2 Private jobs

Each current job has exactly two distinct valid berths and exactly one preferred berth from those two. Both valid choices deliver the same one parcel. The preferred arrival adds five recap-score points; it never advances the delivery target faster.

The owner sees both valid destinations, the preferred marker, and a small private flavor illustration. Other clients receive none of the job object. The service holds the full authored queue; the owner receives only the current job, not future jobs, the hidden deck selector, or its randomization seed.

A berth outside the current valid pair is not a legal destination. The client disables it for the owner and explains why; the service independently rejects a forged move. It is not a selectable “wrong delivery” with a punishment mechanic. Any reached permitted berth delivers immediately, so a player cannot choose to park there or transit through it.

### 3.3 Planning interaction

1. The round begins with the same public chart and deadline for every participant, plus their own current job and control state.
2. A player may select a legal adjacent node or explicit Wait. Selection is private. It does not reserve space and does not lock the choice.
3. A player may place, replace, or clear their one public signal until commitment. Signal changes replace the current signal; no previous-signal feed is shown.
4. Commit locks the chosen intent and current signal. No change, withdrawal, or second commitment is allowed for that round. Wait is a valid commitment.
5. At the server deadline, an uncommitted seat receives automatic Wait, even if it previously selected a route. A selected-but-uncommitted move is never submitted on the player's behalf.
6. No early resolution when everyone commits. All standard rounds keep the shared 20-second window; this avoids changing available time or making network delay a hidden readiness race.

The default local selection is Wait, labeled “Wait is selected.” The button says “Commit wait” until a destination is selected, then “Commit route.” A committed acknowledgement is shown only after the service has accepted the action. “Sending…” is not “Committed.”

### 3.4 Signal dictionary

| ID | Visual shape | Exact intended meaning | What it does not mean |
|---|---|---|---|
| `NEED` | Solid triangular pennant, small open center | “Please leave this node available for my route.” | Reservation, priority, guaranteed destination, or disclosed berth preference |
| `YIELD` | Open ring with a visible gap | “I am willing to leave this node available.” | A binding promise to vacate it or a forced wait |
| `READY` | Diamond with a centered dot | “I am ready to coordinate around this node.” | A revealed route or the Commit action |

All three are advisory. “READY signal” and “route committed” use different labels, icons, and UI locations. Signals may target any active junction or berth, or the sender's own entry; never another seat's entry. They may refer to a later route segment, not only an adjacent legal move. Posting on a berth does not disclose the job object or establish whether that berth is valid.

Multiple players' signals may share a node. Display up to four compact, letter-labeled badges in stable seat order, with the full list accessible on tap/focus. Signals never cause congestion, change legal moves, alter tie-breaking, or validate a move. Signals are cleared at the next round start. The last accepted signal remains visible during resolution for explanation.

### 3.5 Deterministic resolver: normative algorithm

The resolver operates on one immutable round-start occupancy snapshot and the accepted sealed intents. It is a pure rules operation. No socket timing, host status, payment, signal, seat letter, or iteration order confers movement priority.

**Step 0 — Normalize and validate.** Substitute Wait for missing commitments. Already-accepted valid intentions are immutable. Invalid forged actions were rejected at admission; an impossible persisted intent is an integrity fault, not silently corrected into a competitive advantage. Waiting ships remain occupants but are excluded from the set of moving proposals.

**Step 1 — Same-destination conflicts.** Group moving proposals by destination. For each group with two or more ships, fail every move in that group and add exactly one congestion point for that node. This applies to junctions and berths, even if their starting occupant would have departed. It is not one point per ship. A waiting occupant does not count as a second targeting proposal.

**Step 2 — Two-ship swaps.** Among proposals not already failed in step 1, identify pairs whose destinations are each other's round-start nodes. Fail both moves and add one congestion point per pair, counted once. A route already eliminated in step 1 cannot also form a chargeable swap.

**Step 3 — Departure dependencies.** For each remaining proposal:

- If its target was empty at round start, it may succeed.
- If its target's occupant has a successful remaining departure, it may succeed.
- If its target's occupant waits or has a failed departure, it fails without an additional congestion point.
- A closed dependency cycle of three or more remaining ships succeeds as a simultaneous rotation. Any blocking chain leading to a non-departing occupant fails. Resolve the whole dependency graph, not a single order-dependent sweep.

The output is the unique fixed result of these dependency rules. A traversal with cycle detection, or strongly connected components plus dependency propagation, is appropriate. Removing delivered ships before conflict evaluation is not appropriate.

**Step 4 — Apply movement simultaneously.** Successful ships leave their starting positions and occupy their destinations as one atomic state transition. Failed and waiting ships remain where they started.

**Step 5 — Deliver and remove.** For every successful arrival at a permitted berth, increment deliveries, increment preferred deliveries if appropriate, consume exactly one job, and remove that ship from chart occupancy. Mark it `awaitingRespawn`. Deliveries sharing a round all count; there is no arbitrary seat-ordered stop at the sixth delivery.

**Step 6 — Evaluate terminal outcome.** First add all congestion increments from this round. Then evaluate, in this exact order:

1. `congestion >= 5` → failure, reason `CONGESTION_LIMIT`.
2. Otherwise `deliveries >= 6` → success, reason `DELIVERY_TARGET`.
3. Otherwise if the resolved round is 8 → failure, reason `ROUND_LIMIT`.
4. Otherwise continue.

**Step 7 — Persist once, then broadcast.** Commit the resolved revision, round event, counters, terminal result if any, and publication-outbox record in one durable transaction. Duplicate resolution attempts return the already-persisted result and do not apply it again.

If continuing, the next round-start transition respawns each removed ship at its dedicated entry with its next job before new planning begins. If the scenario ended, there is no respawn, job reveal, or extra turn.

### 3.6 Worked edge cases

| Situation | Result |
|---|---|
| A and B target empty J1 | Both stay; +1 congestion |
| A, B, and C target B2 | All stay; +1 congestion, not +3; no delivery |
| A targets J1 occupied by B, who waits | A stays; B stays; +0 congestion |
| A and C both target J1 occupied by waiting B | A and C fail in step 1; +1 congestion; B stays |
| A targets B's node; B targets A's node | Both stay; +1 congestion |
| A→B's node, B→A's node, C→B's node | A/C same-target conflict: +1; B subsequently blocked; no second swap charge |
| A→B's node, B→C's node, C→empty J | All three move; +0 congestion |
| A→B's node, B→C's node, C→A's node | Three-cycle rotates if all three edges are legal; +0 congestion |
| A targets the node B leaves for a successful delivery | Both moves succeed in the same resolution; B is removed after movement |
| Delivery total becomes 6 and congestion becomes 5 | Failure, with both facts explicitly explained |
| Total is 5 and three ships deliver without reaching congestion limit | Success with 8 deliveries; all three deliveries count |
| Owner selected B1 but never committed | Automatic Wait; B1 selection is not revealed |
| Conflicting intent comes from the host | Exactly the same result as any other participant |

Authored layouts need not expose every resolver topology at every seat count. In particular, the nine-node/four-entry/three-berth budget leaves only two junctions in a four-seat map; a three-ship traversable junction cycle is therefore a synthetic resolver fixture or a smaller-seat topology, not a promised feature of every four-seat map.

### 3.7 Score and visibility

`score = max(0, 20 × deliveries + 5 × preferredDeliveries − 4 × congestion)`

- Compute using final integer counters; never round, multiply by purchases, or cap deliveries to six.
- Example: six deliveries, four preferred, two congestion → `120 + 20 − 8 = 132`.
- Display score for every ended success or rules failure. An abandonment/server-abort summary is explicitly “Not completed” and is not a scored result.
- The live HUD shows deliveries and congestion. Preferred-delivery count and total score are disclosed only as team aggregates at recap. Do not attach preference-bonus events to a ship or publish its past job card.
- Preferred and non-preferred deliveries use identical public sounds, particles, lights, and event shapes. A special star burst on one ship would disclose the preference just as surely as a JSON field.
- Public routes after resolution and aggregate results can support human deduction. The guarantee is no direct disclosure of another player's private fields or sealed pending intent, not information-theoretic secrecy or protection from friends talking externally.

## 4. Time, room lifecycle, recovery, and control ownership

### 4.1 Room lifecycle

`LOBBY → STARTING → PLANNING → RESOLVING → INTERMISSION → PLANNING … → ENDED`

`CLOSED` is a separate administrative/abandonment terminal state. Server integrity failures may produce `ABORTED`, never a fake rules failure.

| Phase | Allowed activity | Exit rule |
|---|---|---|
| LOBBY | Join, leave, invite, readiness, map selection, bot consent, accessibility/practice choice | Host starts with 2–4 seats and all connected humans ready |
| STARTING | Freeze seats/content/rules, prepare private jobs, publish synchronized start | Start acknowledgement barrier or start timeout |
| PLANNING | Authorized controller selects, signals, commits; eligible owners may queue control requests | Server deadline; no host pause |
| RESOLVING | Reject new gameplay intents; resolve/persist once; eligible owner control requests may queue | Durable round result available |
| INTERMISSION | Show 1.5-second resolution; continue accepting next-boundary control requests | Published next-round start timestamp |
| ENDED | Recap, rematch readiness, report/block, exit | Rematch creates a new scenario or room expires |
| CLOSED / ABORTED | Explain why no completion was awarded; offer fresh room/practice | No further gameplay |

`STARTING` waits up to 10 seconds for all participating human clients to acknowledge the initial snapshot. If any fail to acknowledge, return to lobby and clear readiness; do not begin an invisible timed round or silently add bots. After all acknowledge, publish a start timestamp 3 seconds in the future. Tutorial completion never occurs inside this countdown.

The map, count, rules version, and deck instance are immutable within a scenario. A late invite can join the lobby only, never take a new seat or spectate a running match. A returning authenticated participant may reconnect to their existing seat.

### 4.2 Timer mechanics

- The service owns `roundStartedAt`, `deadlineAt`, `nextRoundStartsAt`, and `serverNow`, expressed in UTC epoch milliseconds. Durable timestamps are not derived from client clocks.
- The client estimates server offset using request midpoint and recent low-latency samples, then uses a local monotonic clock to render the countdown. Resample on reconnect/resume; do not continually jump displayed seconds.
- The displayed seconds are `ceil(max(0, deadlineAt − estimatedServerNow) / 1000)`. The server's admission decision wins at the boundary.
- An action is on time only if the authoritative room command processor admits it before `deadlineAt`. Client timestamps and time spent in a network proxy do not extend the deadline.
- A serialized room command gate makes sealing and admission atomic. Workers cannot read a partial intent set while another transaction commits a late move.
- A timely-looking local action may be rejected after network delay; show the final/current permitted snapshot and “This round has already closed.” Do not replay it into the next round.
- At zero, lock controls and show “Resolving…”. Never animate an assumed outcome.
- The 1.5-second presentation starts from a server-published schedule after result persistence. Every client receives the same next planning deadline, even if it skips animation.

### 4.3 Disconnection is not immediate bot consent

Connection state and control ownership are separate. A human can disconnect after a valid commit; that move remains valid. A transport outage does not cancel it or expose it to another participant.

**Missed round:** the service reaches a standard deadline with no accepted human commitment for that seat. Manually committing Wait is participation, not a missed round. Selecting or signaling without committing still misses the commitment.

After one missed round, offer a labeled replacement for the next round boundary. The timeout round itself is always automatic Wait. The service never retrospectively substitutes a bot's move.

Consent rules:

- In the lobby, every human may enable “Allow a practice bot to help after I miss a round.” Default off; explain that any bot-controlled round makes the scenario Mixed.
- The player may explicitly accept their own replacement offer when connected. The host cannot accept for another participant, whether that participant is connected or offline.
- If the disconnected player previously opted in, queue the bot at the first boundary after the missed round. If they did not opt in, keep their seat waiting until they return or the scenario ends. Explain this to remaining players without exposing the person's settings history.
- Intentional Leave offers “Leave and allow a bot” versus “Leave without a bot.” Both require confirmation; neither charges currency.
- A replacement accepted after a boundary takes effect at the following boundary. No mid-round controller switch.
- If all humans intentionally leave, close immediately with no completion rewards. If all human transports are absent, allow a 30-second reconnect grace; continue existing deadlines, but hold result publication/rewards if everyone is still absent at a terminal resolution. If nobody reconnects before the grace expires, close without completion. Bots cannot finish an unattended rewarded run.

During that grace, a connected verified owner observing their replacement bot still counts as a human present. A terminal outcome reached with no humans connected is persisted provisionally: do not start another round, award mastery, or publish a score. Finalize that same result if a verified participant reconnects before grace expiry; otherwise close as abandoned. A deliberate departure after a result was already finalized does not revoke an earned result.

### 4.4 Bot label and reclaim

Every bot-controlled seat has persistent text “Bot” next to its ship letter, in the roster, node list, and recap. The first bot activation latches `everBotControlled = true` for the scenario. It never becomes Human-only again, even after recovery.

A verified original participant may request reclaim. Apply it at a round boundary after the current controller's last round resolves. A bot's already-sealed move remains authoritative for its round. The returning human receives only their current owner-private job. Announce “A is controlled by a player again.” Never imply that the preceding bot was human.

An authenticated return during planning restores a **read-only current view** immediately and queues control for the next boundary, even if no bot was activated. The returning player cannot replace a commitment or submit a new move into the interrupted round. Their earlier accepted intent remains; otherwise that round becomes automatic Wait. If the scenario is already terminal, restore only the recap. This is the source's round-boundary reclaim rule, not a timer reset. A transient retry on the still-authorized original connection is not a controller transfer; it can recover an existing acknowledgement by command ID.

Each seat has a `controlEpoch`. Gameplay mutations (`move.choose`, `signal.set`, `move.commit`) must match its current authorized controller and epoch. Stale sockets, replaced tabs, and a bot worker with an old epoch cannot submit gameplay after transfer. Owner requests (`control.reclaim`, `control.acceptBot`), permitted resync, and Leave use verified seat-owner/membership authorization instead; a human must be able to reclaim or leave while a bot controls their ship. If reclaim and takeover are both queued for the same boundary, verified eligible human reclaim takes precedence; a bot that never actually controlled a planning round does not latch Mixed.

Accept owner control requests throughout an active nonterminal scenario, including planning, resolution, and intermission. Target the next round-start boundary not yet applied when the request is admitted; a request admitted after a boundary targets the following one. At that boundary, revalidate ownership, membership, safety restrictions, and current consent. Human reclaim additionally requires a connected authorized owner; cancel it if the requester has left, lost eligibility, or disconnected again. Bot activation requires retained valid owner consent, not that the absent owner be online. “Leave without a bot” cancels a queued takeover; “Leave and allow a bot” preserves explicit consent. Discard pending transfers when a terminal result, including a provisional result, is reached. These checks occur atomically with the boundary; no queued request bypasses a new block or creates a human controller for an absent requester.

Bind write authority to one authenticated connection/controller lease as well as the epoch. Additional tabs are read-only and may request a boundary handoff; they cannot both write merely because they belong to the same Telegram user. Presence uses a 5-second heartbeat and declares a transport disconnected after 15 seconds without liveness, or immediately on a confirmed close. Start the 30-second all-human grace when the last human is declared disconnected; a browser's local offline event alone cannot evict another controller.

### 4.5 Host and room administration

- The host administers the lobby only: capacity, invite rotation/revocation, map choice, starting, and removing lobby participants.
- Host powers do not reveal jobs, edit the graph mid-scenario, view pending routes, alter scores, pause deadlines, reorder resolution, kick active participants, or force bot takeover.
- On host departure/disconnection, transfer immediately to the connected human with the earliest immutable `joinedAt`; break exact ties by a stable internal participant ID. Bots never host. If none are connected, host is temporarily empty and the all-humans-absent rule applies.
- A returning former host does not automatically reclaim host permissions.
- Room invite lifetime: 30 minutes, or until revoked/room closed. Lobby inactivity timeout: 15 minutes. Ended-room rematch window: 10 minutes. Display expiry feedback rather than dropping the user on a generic error page.
- Invite rotation creates a new token and invalidates the old one atomically. It does not eject current members. Removing a lobby member also invalidates existing invites; issue a fresh invite before new joins.

### 4.6 Recovery and aborts

On reconnect, request a current role-filtered snapshot before enabling controls. Do not trust local cached jobs, reconstruct other seats, or replay a queue of old actions. Accepted actions may be retried using their original idempotency key to discover their result.

If a server restarts after a deadline, resolve the persisted commitments once. If it restarts after resolution persistence but before broadcast, republish the same result. An interruption that leaves clients without an authoritative update for over 30 seconds is an operational recovery event: if the service cannot prove a valid resumable state, abort with no rank/reward changes and offer rematch. Do not invent deliveries or convert infrastructure failure into a team's congestion failure.

## 5. Authored maps, jobs, and solvability

The complete content tables, deterministic expansion rules, and documented feasibility evidence appear in section 5's content appendix below. The following invariants apply to every entry:

- Exactly nine active nodes per supported count variant, exactly three berths, one exclusive entry per seat, and no inbound entry edges.
- Two authored deck families per map: twenty total. Count variants and private randomization do not count as additional authored decks.
- A job contains two distinct valid berths and one preferred member; flavor is statistically independent of those fields.
- The server chooses and instantiates a deck privately. No public asset, source map, client bundle, API response, room invite, analytics event, or browser storage contains future queues, the hidden selector, or its randomization seed.
- A publicly distributed specification cannot be treated as a secret. Hidden preference sampling at runtime is mandatory; knowing this document must not reveal a live player's exact preference.
- A map/deck/count variant is eligible for the standard catalog only after a legal six-delivery witness within eight rounds and congestion below five has been replayed against the production resolver.
- Existential solvability is necessary, not proof of fairness, fun, nontrivial signaling, balanced contribution, or achievable human win rate. Those need separate tests.

### 5.1 Count variants and node notation

The ten maps are **map families**, each with three fixed count variants. This explicitly closes the source's ambiguity about fitting entries and usable junctions into nine nodes.

| Ships | Dedicated entries | Junctions | Berths | Total |
|---:|---|---|---|---:|
| 2 | `EA, EB` | `J1, J2, J3, J4` | `B1, B2, B3` | 9 |
| 3 | `EA, EB, EC` | `J1, J2, J3` | `B1, B2, B3` | 9 |
| 4 | `EA, EB, EC, ED` | `J1, J2` | `B1, B2, B3` | 9 |

For compact authoring tables only, use aliases `a/b/c/d = EA/EB/EC/ED`, `X/Y/Z/W = J1/J2/J3/J4`, and `1/2/3 = B1/B2/B3`. The UI and runtime DTOs use the full stable IDs. A token `12YZ` means exactly four outgoing directed edges, to B1, B2, J2, J3. Spaces separate source-node adjacency lists. There are **no implied reverse edges**. Berths have no outgoing edges. No edge targets any entry. Wait is a separate action, not a self-edge.

There are no inactive placeholder nodes. Freeze the selected count variant when the scenario starts; a bot replacing a human never adds/removes nodes or selects another graph. The map families are mechanically distinct, not ten reskins of one graph.

### 5.2 Map identities, atmosphere, and public hints

These descriptions are authored intentions; difficulty must be confirmed in playtests. Map IDs are `M01…M10`; the default first map is M01. All are free and unlocked.

| Map | EN / RU title | Mechanical lesson | Illustration motif and public hint |
|---|---|---|---|
| M01 | Open Water / Открытая вода | Generous berth exits; learn shared destination timing | Pale open inlet, low white docks, small warm lamps. “Different berths can keep the harbor moving.” |
| M02 | Twin Channels / Два канала | Overlapping lanes; a small detour may help | Two reflected ribbons of light and reed-lined banks, without painting nonexistent barriers. “Look beyond the closest berth.” |
| M03 | The Gatehouse / У ворот | A narrow exit makes departure chains important | Old painted gatehouse on the edge, sheltered timber pier. “A node can clear as another boat leaves.” |
| M04 | Clockwise Basin / Круговой бассейн | Directed circulation; the three-seat version has a real three-ship rotation | Circular shoreline promenade and quiet clock-face-like paving without numerals. “Follow the arrows; a larger loop can move together.” |
| M05 | The Spillway / Водосброс | Unequal entry access and one-way redistribution | Low stone spillway outside the decision area, calm water, no current mechanic. “Some routes are easier to leave than to return to.” |
| M06 | Single File / По одному | Shared entry bottleneck and disciplined pipelining | Narrow-looking entrance at the scenery edge, rope posts, orderly stacked crates. “Leaving space can be a productive move.” |
| M07 | Beacon Fork / Развилка у маяка | Narrow-berth lane versus crossover traffic | Small striped beacon on the bank, paired pools of warm light. “A flexible boat can make room for a constrained one.” |
| M08 | Ferry Crossing / У переправы | Flexible approaches create uncertainty at dispatch | Empty ferry landing and a painted shelter at the edge; no autonomous ferry obstacle. “More choices call for a clearer signal.” |
| M09 | One-Way Cut / Односторонний проход | Forward-only branching; limited recovery | Clean-cut stone quay, reeds and long evening reflections. “Check the next exit before you enter.” |
| M10 | Harbor Knot / Узел гавани | Shared approaches and overlapping berth access | Braided ropes, tightly grouped but readable buildings, confident warm finale palette. “Coordinate the junction and the berth.” |

Translate public hints naturally into Russian during catalog implementation, preserving their informational content. Never tell a player the selected deck or exact solution. Cargo flavor is sampled independently from the six cargo images and has no berth affinity: “tea always goes to Lantern” would reveal information and create an undocumented rule.

### 5.3 Exact directed graph data: two seats

Entry columns are in A/B order; junction columns are X/Y/Z/W order.

| Map | Entry outputs | Junction outputs |
|---|---|---|
| M01 | `XZ YW` | `123Y 123X 123X 123Y` |
| M02 | `X Y` | `12YZ 23XW 3Y 1X` |
| M03 | `X Y` | `1YZ 23XW 2Y 1X` |
| M04 | `X Y` | `1Y 2Z 3W 13X` |
| M05 | `X Y` | `123Z 23XW 12Y 13X` |
| M06 | `X X` | `123Y 23Z 13W 12X` |
| M07 | `X Y` | `12YZ 3XW 3Y 12X` |
| M08 | `XY XY` | `12YZ 23XW 13XY 2XY` |
| M09 | `X XY` | `1YZ 23 13YW 12Y` |
| M10 | `XY XY` | `12YZ 13XW 2YW 3XZ` |

### 5.4 Exact directed graph data: three seats

Entry columns are A/B/C; junction columns are X/Y/Z.

| Map | Entry outputs | Junction outputs |
|---|---|---|
| M01 | `X Y Z` | `123Y 123Z 123X` |
| M02 | `X Y Z` | `12Y 23X 13XY` |
| M03 | `X XZ Y` | `1Y 23X 12Y` |
| M04 | `X Y Z` | `1Y 2Z 3X` |
| M05 | `X Y Z` | `123 23X 12Y` |
| M06 | `X X X` | `123Y 23Z 13X` |
| M07 | `X Y Z` | `12Y 3X 23X` |
| M08 | `XY XY Z` | `12Y 23X 13XY` |
| M09 | `X XY Z` | `1Y 23 12XY` |
| M10 | `XY XZ YZ` | `12Y 13X 23XY` |

### 5.5 Exact directed graph data: four seats

Entry columns are A/B/C/D; junction columns are X/Y.

| Map | Entry outputs | Junction outputs |
|---|---|---|
| M01 | `X Y X Y` | `123Y 123X` |
| M02 | `X Y X Y` | `12Y 23X` |
| M03 | `X Y X Y` | `1Y 23X` |
| M04 | `X Y X X` | `13Y 2X` |
| M05 | `X Y Y Y` | `123 23X` |
| M06 | `X X X X` | `123Y 123X` |
| M07 | `X Y Y Y` | `12Y 3X` |
| M08 | `XY XY X Y` | `12Y 23X` |
| M09 | `X XY X XY` | `1Y 23` |
| M10 | `XY XY XY XY` | `12Y 13X` |

All three berths are reachable from every entry without passing through another berth in all 30 graphs. Every junction is reachable from some entry. For each seat count, the ten directed graphs are pairwise non-isomorphic even when relabeling nodes within entry/junction/berth types; this is documented analysis evidence, not an assertion that every layout feels equally distinct to a player.

### 5.6 Layout seed coordinates

Use normalized coordinates inside the chart's padded content rectangle, with `(0,0)` at top left. These are concrete initial layouts, not a claim that every edge-label combination has already passed visual QA.

| Count | Berths B1/B2/B3 | Junctions J1/J2/J3/J4 | Entries EA/EB/EC/ED |
|---:|---|---|---|
| 2 | `(0.14,0.12) (0.50,0.12) (0.86,0.12)` | `(0.28,0.43) (0.72,0.43) (0.28,0.68) (0.72,0.68)` | `(0.12,0.89) (0.88,0.89)` |
| 3 | `(0.12,0.12) (0.50,0.12) (0.88,0.12)` | `(0.26,0.43) (0.74,0.43) (0.50,0.66)` | `(0.14,0.89) (0.50,0.89) (0.86,0.89)` |
| 4 | `(0.12,0.14) (0.50,0.14) (0.88,0.14)` | `(0.32,0.49) (0.68,0.49)` | `(0.08,0.86) (0.36,0.86) (0.64,0.86) (0.92,0.86)` |

For M04/three seats, retain a visible X→Y→Z→X triangle; the alias mapping stays fixed. Route curves may use per-edge control points to avoid overlaps. A visual pass may adjust coordinates and routing curves, but not silently add/delete graph edges, move nodes mid-scenario, or paint an unconnected crossing as a junction. Freeze approved layout data per map/count/content version after testing at 390 px.

### 5.7 Twenty exact deck families

Internal IDs `01a…10b` bind to their corresponding map. For each seat, read the four letters left to right as four consecutive jobs. `P = {B1,B2}`, `Q = {B2,B3}`, `R = {B1,B3}`. Use A/B for two seats, A/B/C for three, and A/B/C/D for four. Seat identity, entry, and queue remain bound throughout the scenario; do not shuffle queues or job order.

| Deck | A | B | C | D |
|---|---|---|---|---|
| 01a | PQRP | QRPQ | RPQR | PRQP |
| 01b | RPQR | PQRP | QRPQ | RQPR |
| 02a | PQQR | QRRP | RPPQ | PQRQ |
| 02b | RQPP | PQQR | QRRP | RPRQ |
| 03a | QPRQ | RPQP | PQRQ | QRPR |
| 03b | RQRP | PQRQ | QRPR | PRPQ |
| 04a | QRPP | RQPQ | PRQR | QPRP |
| 04b | RQPR | PRQP | QRPQ | RPQR |
| 05a | PRPQ | QPRQ | RQRP | QRPQ |
| 05b | QRQP | RPQR | PQRQ | RPRP |
| 06a | PQPR | QRPQ | RPQR | QRPR |
| 06b | RQRQ | PRQP | QPQR | RPQP |
| 07a | QRQP | PRQR | RPQP | PQRP |
| 07b | RPQR | PQRQ | QRPR | QPRP |
| 08a | PQRQ | RPRQ | QRPP | RQPR |
| 08b | QPRP | RQRP | PRQR | PQQR |
| 09a | QRPR | PQRQ | RQPR | QPRP |
| 09b | RQRP | QPRQ | PRQP | RPQR |
| 10a | RQPR | QRPQ | PQRQ | PRQP |
| 10b | QPRQ | PRQR | RQRP | QRPQ |

On the first scenario for a room/map, choose a/b with a cryptographically random unbiased bit. Rematch on the same map alternates that family's a/b as described in section 7. Independently, for **every instantiated job**, choose one of its two valid berths as preferred with a private unbiased server-side bit. Persist all selections before play; reconnects, retries, bot takeover, refunds, and rematch readiness do not reroll a running scenario.

Only preferences and cosmetic flavor vary inside a template. Preference bits change score only, so the certificate's legal routes remain valid for every preference realization. A new preference sample is not a new authored deck or new mastery scenario.

Four jobs per seat are sufficient for this exact catalog: no entry connects directly to a berth, each delivery needs at least two moves, eight rounds permit at most four deliveries per ship, and no ninth-round respawn occurs. Assert this structural assumption in content validation. If a future map adds a direct entry→berth edge or extra rounds, increase queue length and revalidate; never silently wrap a queue or fabricate a fifth job.

These tables are **internal authoring data**. Include them in the implementation repository's protected server/content area, not the application's downloadable help, client assets, source maps, or browser storage. Since a reader may possess this master document, do not promise that valid-pair templates are impossible to infer from public history plus a player's own card. Independent live preference bits protect the undisclosed preference from simple template lookup; application security still must prevent direct disclosure of either field. The game does not promise secrecy against shared screens, external chat, or determined deduction.

### 5.8 Complete two-seat feasibility certificates

Each certificate starts at own entries on job 1 with zero counters. A comma-separated tuple lists target aliases in seat order. `/` starts the next round. `.` means Wait at the current node. A berth target delivers and removes the ship; it starts the next tuple at its entry with its next job. These are legal **existence witnesses**, not runtime bot scripts or optimal-play recommendations.

| Deck | Rounds | Round targets |
|---|---:|---|
| 01a | 6 | `X,W / 1,2 / X,W / 2,1 / X,W / 1,2` |
| 01b | 6 | `X,W / 1,2 / X,W / 1,2 / X,W / 2,1` |
| 02a | 6 | `X,Y / 1,2 / X,Y / 2,3 / X,Y / 2,3` |
| 02b | 6 | `X,Y / 1,2 / X,Y / 2,3 / X,Y / 1,2` |
| 03a | 7 | `X,Y / Y,3 / 2,Y / X,2 / 1,Y / X,2 / 1,.` |
| 03b | 7 | `X,Y / 1,2 / X,Y / Y,2 / 2,Y / X,3 / 1,.` |
| 04a | 7 | `X,Y / Y,Z / 2,3 / X,Y / 1,2 / X,Y / 1,2` |
| 04b | 7 | `X,Y / 1,2 / X,Y / Y,Z / 2,3 / X,Y / 1,2` |
| 05a | 6 | `X,Y / 1,2 / X,Y / 1,2 / X,Y / 1,3` |
| 05b | 6 | `X,Y / 2,3 / X,Y / 1,2 / X,Y / 2,3` |
| 06a | 7 | `.,X / X,2 / 1,X / X,1 / 2,X / X,1 / 1,.` |
| 06b | 7 | `.,X / X,1 / 1,X / X,1 / 2,X / X,2 / 1,.` |
| 07a | 7 | `X,Y / 2,W / X,1 / 1,Y / X,3 / 2,Y / .,3` |
| 07b | 7 | `X,Y / 1,W / X,1 / 1,Y / X,3 / 2,Y / .,3` |
| 08a | 6 | `X,Y / 1,3 / Y,X / 2,1 / X,Y / 1,3` |
| 08b | 6 | `X,Y / 2,3 / X,Y / 1,2 / X,Y / 1,3` |
| 09a | 7 | `X,Y / Y,2 / 2,Y / X,2 / 1,X / X,1 / 1,.` |
| 09b | 7 | `X,Y / 1,2 / X,Y / Y,2 / 2,X / X,1 / 1,.` |
| 10a | 6 | `X,Y / 1,3 / X,Y / 2,1 / X,Y / 2,1` |
| 10b | 6 | `X,Y / 2,1 / X,Y / 1,3 / X,Y / 1,3` |

### 5.9 Complete three-seat feasibility certificates

| Deck | Rounds | Round targets |
|---|---:|---|
| 01a | 4 | `X,Y,Z / 1,2,3 / X,Y,Z / 2,3,1` |
| 01b | 4 | `X,Y,Z / 1,2,3 / X,Y,Z / 1,2,3` |
| 02a | 4 | `X,Y,Z / 1,2,3 / X,Y,Z / 2,3,1` |
| 02b | 4 | `X,Y,Z / 1,2,3 / X,Y,Z / 2,3,1` |
| 03a | 5 | `X,Z,Y / Y,1,2 / 2,X,Y / X,1,2 / 1,.,.` |
| 03b | 5 | `X,Z,Y / 1,2,3 / X,Z,Y / Y,2,3 / 2,.,.` |
| 04a | 5 | `X,Y,Z / Y,Z,X / 2,3,1 / X,Y,Z / 1,2,3` |
| 04b | 5 | `X,Y,Z / 1,2,3 / X,Y,Z / Y,Z,3 / 2,3,.` |
| 05a | 5 | `X,Y,Z / 2,3,1 / X,Y,Z / 1,X,2 / .,1,.` |
| 05b | 5 | `X,Y,Z / 2,3,1 / X,Y,Z / 1,X,2 / .,1,.` |
| 06a | 7 | `.,.,X / .,X,1 / X,2,. / 1,.,X / .,X,1 / X,1,. / 2,.,.` |
| 06b | 7 | `.,.,X / .,X,2 / X,1,. / 1,.,X / .,X,1 / X,1,. / 2,.,.` |
| 07a | 5 | `X,Y,Z / 2,X,3 / X,1,Z / 1,Y,2 / .,3,.` |
| 07b | 5 | `X,Y,Z / 1,X,2 / X,1,Z / 1,Y,3 / .,3,.` |
| 08a | 4 | `Y,X,Z / 2,1,3 / Y,X,Z / 2,1,3` |
| 08b | 4 | `X,Y,Z / 2,3,1 / X,Y,Z / 1,2,3` |
| 09a | 5 | `X,Y,Z / Y,2,1 / 2,Y,Z / X,3,2 / 1,.,.` |
| 09b | 5 | `X,Y,Z / 1,3,2 / X,Y,Z / Y,2,1 / 2,.,.` |
| 10a | 5 | `X,Z,Y / .,2,1 / 1,X,Y / X,1,3 / 2,.,.` |
| 10b | 5 | `X,Z,Y / .,2,1 / 2,X,Y / X,1,3 / 1,.,.` |

### 5.10 Complete four-seat feasibility certificates

| Deck | Rounds | Round targets |
|---|---:|---|
| 01a | 4 | `X,Y,.,. / 1,2,X,Y / X,Y,1,2 / 2,1,.,.` |
| 01b | 4 | `X,Y,.,. / 1,2,X,Y / X,Y,2,1 / 1,2,.,.` |
| 02a | 4 | `X,Y,.,. / 1,2,X,Y / X,Y,1,2 / 2,3,.,.` |
| 02b | 4 | `X,Y,.,. / 1,2,X,Y / X,Y,2,3 / 2,3,.,.` |
| 03a | 5 | `X,Y,.,. / Y,3,X,. / 2,.,1,Y / X,Y,.,2 / 1,2,.,.` |
| 03b | 6 | `X,.,.,Y / 1,Y,X,2 / X,2,Y,. / .,Y,2,. / Y,2,.,. / 2,.,.,.` |
| 04a | 6 | `X,Y,.,. / 3,X,.,. / .,1,.,X / .,Y,X,3 / X,2,1,. / 1,.,.,.` |
| 04b | 6 | `.,Y,.,X / X,2,.,1 / 1,Y,X,. / .,X,3,. / X,1,.,. / 3,.,.,.` |
| 05a | 5 | `X,Y,.,. / 1,2,.,Y / X,.,Y,2 / 1,Y,3,. / .,2,.,.` |
| 05b | 5 | `X,Y,.,. / 2,3,.,Y / X,.,Y,3 / 1,Y,2,. / .,2,.,.` |
| 06a | 7 | `.,X,.,. / X,2,.,. / 1,.,.,X / .,.,X,2 / .,X,1,. / X,1,.,. / 2,.,.,.` |
| 06b | 7 | `.,X,.,. / X,1,.,. / 1,.,.,X / .,.,X,1 / .,X,2,. / X,1,.,. / 2,.,.,.` |
| 07a | 5 | `X,Y,.,. / 2,X,.,Y / .,1,Y,X / X,Y,3,1 / 1,3,.,.` |
| 07b | 5 | `X,Y,.,. / 1,X,.,Y / X,1,Y,3 / 1,Y,3,. / .,3,.,.` |
| 08a | 4 | `X,Y,.,. / 1,3,X,Y / Y,X,2,3 / 2,1,.,.` |
| 08b | 4 | `X,Y,.,. / 2,3,X,Y / X,Y,1,2 / 1,2,.,.` |
| 09a | 5 | `X,Y,.,. / Y,2,X,. / 2,X,1,Y / X,Y,.,2 / 1,2,.,.` |
| 09b | 5 | `X,Y,.,. / 1,2,X,Y / X,Y,1,3 / Y,2,.,. / 2,.,.,.` |
| 10a | 4 | `X,Y,.,. / 1,3,X,Y / X,Y,2,1 / 2,1,.,.` |
| 10b | 4 | `X,Y,.,. / 2,1,X,Y / X,Y,1,3 / 1,3,.,.` |

### 5.11 Validation protocol and evidence limits

The documentation analysis generated and independently replayed all 60 certificates. Every one reaches exactly six deliveries and zero congestion in 4–7 rounds. Finish-round distribution: 14 cases in round 4, 19 in round 5, 13 in round 6, and 14 in round 7. Every seat contributes: two-seat witnesses deliver `(3,3)`, three-seat `(2,2,2)`, four-seat `(2,2,1,1)`. These are witness properties, not quotas or a guarantee of balanced human participation.

The analysis also enumerated 64 possible preference outcomes for the six delivered jobs in each certificate: **3840 delivered-preference profiles**. The full future preference space was not exhaustively simulated. Since preference changes no edge, legal pair, or success predicate, validity of each route certificate is independent of all those bits; this is a structural argument, not a claim that every profile yields the same score.

M04/deck 04a/three seats explicitly rotates X→Y→Z→X in round 2. M06/four seats demonstrates entry pipelining into a junction whose occupant delivers in the same round. The analysis included basic contention/swap/wait/chain/cycle fixtures, but it is **not** a deployed service, browser test, comprehensive game test suite, or production-resolver validation.

At implementation time, convert the tables to server/public content artifacts and replay these exact certificates through the actual production resolver. Emit a report per map/deck/count with content hashes, rules version, nine-node/entry/reachability checks, every move, start/end occupancy, job progression, congestion reasons, final counters, and assertion result. Fail the build if one case is absent or invalid. Do not merely run the original search script and assume the new implementation agrees.

Any edit to adjacency, allowed pairs, queue order, delivery timing, conflict precedence, or turn limit invalidates the corresponding certificates until rechecked. Layout/color edits still need visual QA but do not require new mechanical certificates if graph semantics are unchanged. The validator may inspect all jobs; runtime bots must never import or use it.

## 6. Practice, tutorial, and bot behavior

### 6.1 Mode definitions

| Mode | Seats and timing | Result classification |
|---|---|---|
| Friends / Standard | 2–4 humans; 20 seconds per round | Human-only unless a bot actually takes control |
| Practice / Standard | One human plus 1–3 labeled bots, or an explicitly consenting mixed lobby; 20 seconds | Mixed; separate results, never Human-only |
| Learn without a timer | One human plus one teaching bot; advances when the human commits | Tutorial/practice only; no standard board, mastery, or completion rewards |

Do not let an untimed setting change a running standard room. In standard bot practice, the normal delivery target and all failure rules remain intact. The tutorial is the only relaxed two-delivery exercise and is labeled before entry.

### 6.2 Interactive tutorial, approximately 45–75 seconds

Teaching happens before joining the live readiness barrier. Returning players may skip it; first-time players may choose “Read rules instead.” Never trap an invited friend in a long mandatory sequence while others' timers run.

| Step | Exact interaction | Success / feedback |
|---|---|---|
| 1. Your boat | Show boat A, its entry, and the owner's card | “Only you see this card. Both berths work; the star is a small team bonus.” |
| 2. One move | Highlight an adjacent junction; ask for tap then Commit | The teaching bot is visibly waiting. Animate exactly one successful edge. |
| 3. One signal | Ask for NEED on a junction; allow replacement with YIELD | Explain one current signal and that requests are not reservations. |
| 4. Shared movement | Show an explicitly labeled demonstration of two proposals for one empty junction | Both stay; +1 congestion on that node, not on a player. This is a scripted demonstration, not a hidden adaptive rule. |
| 5. Clear a route | Offer a safe move or Wait while the bot follows its displayed teaching script | Demonstrate a successful departure chain and a delivery. |
| 6. Finish briefing | Show the three loss/success checks and the 6-delivery/5-congestion precedence | One concise comprehension choice: “Six deliveries and five congestion: success or not?” Wrong answer teaches rather than blocks. |
| 7. Leave lesson | Offer “Practice with a bot” and “Return to room” | Restore invite context; do not automatically start a match. |

Tutorial fixtures are distinct, deterministic, unranked content. They may expose their scripted example routes because the entire screen says “Demonstration”; the production board never reveals other players' pending choices. Tutorial completion is a local/account preference, not a payment or an achievement.

### 6.3 Conservative bot contract

Bots receive a strictly typed view consisting of their own current job, public graph/occupancy/signals, current round/deadline, public counters, and their own control state. They MUST NOT receive the room aggregate, another current/future job, sealed human moves, hidden deck selector, solver witness, or preferred-delivery attribution.

The standard bot uses this deterministic policy, with a persisted per-scenario private tie-break seed:

1. Enumerate its legal adjacent destinations and Wait.
2. Calculate static shortest distance from each candidate to either of its permitted berths, treating a berth as terminal. Prefer delivery and progress, not the preference bonus at any cost.
3. Exclude another seat's entry and any route requiring a wrong berth transit.
4. Heavily penalize a node with another ship's NEED signal. Treat YIELD/READY as advisory evidence only, not guaranteed departure.
5. Prefer a currently empty progress node over an occupied one. An occupant's possible departure is estimated from public outgoing edges only: other players' berth validity is unknown, so any outgoing berth is merely a possible exit, not a confirmed legal one. Never request another seat's legal-move list, current job, or sealed choice to evaluate a chain. A public-topology dead end is avoidable; an uncertain departure is a risk, not secret knowledge.
6. If no candidate has a credible safe improvement, commit Wait. Otherwise choose minimum estimated risk, then shortest valid route, then preferred-berth distance, then stable seeded tie-break.
7. With two or more bot seats, add a **publicly computable** alternating junction priority derived from `(round + seatIndex) mod seatCount`; non-priority bots prefer a different equally short node or Wait. This reduces bots repeatedly choosing the same obvious route without a shared secret planner. The priority does not alter server resolution.
8. Place at most one ordinary public NEED/YIELD/READY signal describing its chosen coordination request. Use exactly the same action validation as a human.

Bot reasoning is computed once 6 seconds after standard planning starts, using only the then-current permitted view; its signal/commit occurs between 7 and 9 seconds using deterministic seeded offset. It does not wait until the final milliseconds to exploit every human signal. In the untimed tutorial, the script advances only after the human action.

The policy's quality is a release test, not a promise that it will always solve the scenario. It may make understandable mistakes. Test repeated symmetric starts, waiting deadlocks, preference temptation, and signal responsiveness. No bot gets collision immunity or makes the difficulty secretly adapt to spending.

## 7. Progression, scoring, and social design

### 7.1 Results and boards

Only successful standard scenarios enter scoreboards. Maintain physically/logically separate Human-only and Mixed result partitions. Partition further by seat count, map ID, and rules/content version; do not rank a two-seat team against four seats or compare scores across incompatible revisions. Private deck family IDs stay server-side. Their balance is a content gate; no claim that separate random instances are perfectly equivalent.

A board row is a **team result**, not individual scores: map, score, deliveries, preferred aggregate, congestion, round finished, Human-only/Mixed badge, and optional consented team member display labels. Default public display is “Harbor crew,” with no Telegram handles, avatars, or deep links. Equal scores share a rank; order equal rows by completion time for stable pagination, not a hidden competitive tiebreak.

Public listing is optional and opt-in for every human represented. An opt-out does not prevent teammates from seeing their own private result. A standard success can be stored privately without public publication. No weekly resets, prizes, streak bonuses, or notifications are required.

### 7.2 Mastery

Track completion of 1, 5, and 10 distinct map/deck scenarios. A distinct key is `(mapId, deckFamilyId)` within the current compatible mastery version; seat count and a new random preference sample do not create another distinct completion. The user sees a count, not the hidden deck code.

Eligibility: a successful standard scenario, with at least two accepted moves/Wait commitments actually made under that human's control. Bot actions, auto-Waits, tutorial steps, and mere room attendance do not count. Allow successful Mixed standard practice toward **separately labeled Practice mastery**; Human-only mastery remains a separate track. Awards are idempotent per user/distinct key/track. A failed scenario has a recap but no completion increment.

| Threshold | EN / RU title | Visual reward |
|---|---|---|
| 1 | First Light / Первый огонёк | Small paper-stamp badge |
| 5 | Familiar Waters / Знакомые воды | Paired-lantern badge |
| 10 | Harbor Keeper / Хранитель гавани | Wreath around a lighthouse stamp |

These are recognition, not spendable currency or shipping upgrades. All ten maps are freely selectable; learning-order recommendations never lock friends out of a map.

### 7.3 Rematch and sharing

Rematch returns the same connected participants to a lobby with readiness reset. Default map is unchanged and the server alternates the previous hidden deck family, resampling private preferences. “Next harbor” moves to the next map in the authored order. Every new scenario gets fresh identities, control epochs, and idempotency scope; previous Mixed status does not taint a new all-human scenario.

Share is an explicit action. The share card contains map art, team score, delivery/congestion totals, and mode label only. No private card, future queue, invite token, unresolved route, report information, Telegram ID, or unconsented player name is embedded. Copying an invite and sharing a result are distinct buttons and data paths.

### 7.4 Avoiding social pressure

Do not record “who caused the most congestion.” The round history can show the public resolved positions and affected nodes needed to understand the game, but narration and recap aggregation stay node-based. Do not award “best captain.” No taunting emotes, compulsory reactions, read receipts about private cards, or prompts to buy something after a failure.

## 8. Complete screen and interaction specification

### 8.1 Navigation model

Routes are implementation paths, not Telegram deep-link security tokens:

| Route / state | Purpose | Primary action | Required secondary paths |
|---|---|---|---|
| `/` | Harbor home | Play with friends | Practice, Learn, Settings, Mastery, Help |
| `/join` | Resolve invite after authentication | Join room | Expired/revoked/full/in-progress states; create room/practice |
| `/rooms/:id` — lobby | Establish people, mode, map, readiness | Ready / Start for host | Invite, map details, remove in lobby, leave, accessibility |
| `/rooms/:id` — playing | Public chart and private control panel | Commit route / Commit wait | Signal, node list, rules, sound, report/leave |
| `/rooms/:id` — ended | Team recap | Rematch | Next harbor, Practice, share, report/block, exit |
| `/learn` | Interactive introduction | Continue / Commit | Skip, return to previous invite |
| `/practice` | Choose bot count and timing | Start practice | Standard vs untimed explanation |
| `/mastery` | Separate human/practice progress | Play | Threshold explanation |
| `/results` | Opt-in team boards and private history | Select map/count/mode | Empty state and privacy explanation |
| `/settings` | Sound, motion, language, list/large-text view | Back | Privacy, licenses, support |
| `/appearance` | Free flag and owned cosmetics | Equip | Optional Stars product only when enabled |
| `/help` | Rules, support, licenses, safety | Return | Report flow, privacy and deletion request |

Only authenticated room members can load a room snapshot. Guessing a route does not grant access. Browser refresh must restore an authorized current view, not restart a scenario.

### 8.2 Home and loading

Home has a quiet illustrated harbor crop, real text logo, one-sentence premise, and two visible choices: “Play with friends” and “Practice with bots.” Practice is not hidden behind a full lobby. Show no player population number unless a real, necessary metric exists; none is required here.

Initial loading displays the logo, “Preparing the harbor…”, and meaningful connection/error recovery. Do not show fake percentage progress. Load the interactive shell and rules before decorative art or optional audio. A failed background image has a neutral painted-color fallback; a failed critical graph/content load blocks Start with Retry.

Unsupported outside-Telegram launch: explain “Open Quiet Harbor in Telegram” with the configured official launch URL. A clearly labeled local demo may exist in development only. Never mint a production user from a query-string ID.

### 8.3 Lobby

Display room mode and 2–4 seat capacity above the roster. Each row shows a ship letter, sanitized display name, Human/Bot label, connection status, readiness, and host badge where applicable. Hide Telegram usernames and profile photos by default.

Map card shows name, nine-node preview, seat count, difficulty description, and one public coordination hint. It never names the selected deck or lists upcoming jobs. Changing map, capacity, bot composition, or timing clears every human's readiness and produces a visible change notice.

Host Start is disabled with a precise reason: “Waiting for 1 more player,” “Everyone needs to be ready,” or “A player is reconnecting.” Adding practice bots requires an explicit mode-change confirmation from all present humans; reset readiness. Empty seats are never filled invisibly.

### 8.4 Standard portrait play layout

Reference width: **390 CSS px**; usable height varies with Telegram chrome and safe areas. All measurements are CSS layout targets, not baked image text.

Top-to-bottom priority:

1. **Compact header, approximately 48 px:** back/menu action, map short name, sound button.
2. **Status rail, approximately 48 px:** “Round 3/8,” deliveries `2/6`, congestion `1/5`, clear numeric countdown. Counters include labels, not icons alone.
3. **Chart, approximately 300–330 px high:** all nine nodes and readable directed edges, ship letters, current public signals. It must not require panning or pinch zoom.
4. **Private job card, approximately 88–116 px:** “Only you,” two berth names with valid markers, one preferred star and “+5 team points.” Cargo art stays small and secondary.
5. **Choice summary and signal controls, approximately 64–88 px:** “Selected: J2” or “Wait is selected,” NEED/YIELD/READY buttons, clear signal action.
6. **Sticky action area, minimum 60 px plus safe-area padding:** Commit button and concise connection/locked state.

Do not promise this whole stack fits every small viewport. At short heights the page scrolls vertically, the commit area remains visible without covering content, and the full private card remains below the chart. Below 360 px or in large-text mode, prefer the node-list layout. A 390 px private card MUST NOT float over nodes.

At wide desktop widths, cap game content at 1040 px, place the chart left and private/control panel right, and retain the same reading/focus order. Decorative side scenery may fill surplus space; never spread controls across a desktop-sized sea.

### 8.5 Node interaction

Tap/click/focus a node to inspect its name, occupancy, outgoing routes, and current signals. A legal destination can be selected in one tap. Tapping an occupied legal node is allowed: departure chains are a core mechanic. Say “Occupied now; movement depends on its departure,” not “Blocked” unless that is only a post-resolution fact.

Your selected destination uses a firm cream outline with an owner-only label. An optional solid owner-only route segment is permitted; never draw other players' pending routes, ghost ships, or inferred translucent reservations. Do not expose your local selection through screen-wide shared state or analytics.

Wrong berth: remain inspectable but not selectable as a move, with “Not a destination for your current parcel.” Non-adjacent junction: “No outgoing route from your current node.” An entry belonging to someone else is informational only.

Signal mode is explicit: tap a signal type, then a node, with “Choose a node for NEED” feedback. Canceling signal mode leaves move selection unchanged. Keyboard and node-list users can choose type and node from labeled controls without drag gestures.

### 8.6 Committed, timeout, and round resolution

After acceptance, replace the button with “Committed — waiting for the harbor.” Show the owner their sealed selection, without editing affordances. Public roster commitment status may say “Committed,” but never reveal route or whether it was a Wait. A READY signal remains visually distinct.

If no commitment reached the server, show “No route was committed. Your boat waited.” Do not claim that merely tapping Commit on a disconnected client succeeded. Offer replacement per section 4, without a modal covering the next live chart.

At resolution:

- 0–150 ms: controls already locked; routes remain the prior public state.
- 150–950 ms: successful ships move with synchronized smooth interpolation; failed ships remain still.
- 500–1100 ms: contested nodes receive one muted amber ripple and a `+1` marker per contested node; swap pairs use a bracket between their two nodes. No hit, crash, sinking, or screen shake.
- 900–1400 ms: delivered ships fade toward the berth light; counters update to the authoritative totals, not incremental client simulation.
- By 1500 ms: next planning snapshot becomes active or the result sheet appears.

Network-late clients skip obsolete animation and apply the latest snapshot. Do not queue an eight-round cinematic. Reduced motion applies final positions immediately and displays a static result banner for the same shared phase interval.

### 8.7 Text chart / node list

List nodes in stable groups: own entry, other entries, junction IDs, then B1/B2/B3. Each row exposes node name, occupant seat/type, directed outgoing IDs, public signals with sender letters, and a legal-destination button when applicable. “Select J1” and “Place NEED on J1” are distinct actions.

Show own current node and current job above the list. A round-change live-region summary says, for example, “Round 4. A at J2. Two deliveries. Congestion one. Twenty seconds.” Do not announce every countdown second. There must be complete functional parity with the chart: selection, signal replacement, Wait, Commit, result explanation, reconnect, and rules.

### 8.8 Recap

Hierarchy: outcome → plain-language reason → score breakdown → harbor timeline → next action. Use warm paper and a small harbor illustration, not a casino burst.

Examples:

- Success: “The harbor is clear. Six parcels found their way.”
- Round limit: “The shift is over. Four of six parcels arrived. Try a different route together.”
- Congestion limit: “The harbor needs a pause. Five congestion points ended this shift.”
- Simultaneous target/failure: “Six parcels arrived, but congestion reached five in the same round. Congestion is checked first.”

Breakdown uses four labeled lines: delivery points, preferred-delivery points, congestion deduction, total. Show final actual deliveries, including any overshoot. Human-only/Mixed/Tutorial/Not completed is prominent, not a footnote.

The timeline has at most eight rows: round number, delivery count, affected congestion nodes/pairs, and the public signal snapshot. A details expansion may show public resolved routes; never private job histories. “Signals used” is descriptive, not a claim that a signal caused a success. Do not invent causality from concurrent events.

Report, block, and exit are accessible on success and failure without opening commerce. If a user blocks someone, explain that future shared rooms are prevented; allow immediate exit from the current one.

### 8.9 Error and empty-state inventory

The implementation MUST include designed states for: authentication expired; outside Telegram; invite expired/revoked/full/in-progress; room closed; removed from lobby; blocked join; waiting for players; no results yet; no owned cosmetics; offline; reconnecting; stale control/tab; late action; invalid destination; duplicate already-accepted action; service recovery; server abort; payment pending/cancelled/failed/refunded; audio unavailable; art unavailable; unsupported optional Telegram feature; report submitted/rate-limited; and deletion request submitted.

An error never replaces the entire app with raw JSON, stack traces, a bot token, or an English-only technical exception. Preserve a safe navigation path and explain whether the user's action took effect.

## 9. Visual design system and motion

### 9.1 Art direction: painted harbor, precise chart

Use a tactile, contemporary illustrated tabletop aesthetic: gouache-like water, painted wood, soft paper, slightly imperfect architectural edges, and precise interface geometry. The game is not a photorealistic port, a military navigation console, a glossy crypto dashboard, or a collection of unrelated AI pictures.

The **world layer** has warmth and texture. The **decision layer** is sharp and stable. Nodes, arrows, labels, selection, timer, ship identity, and signals are real programmatic UI above the art, not details baked into generated scenery. At thumbnail scale the chart should remain understandable after all scenery is removed.

Use an almost top-down illustrated camera, approximately 70–80 degrees above the water, with shallow, consistent building depth. Avoid tall roofs occluding nodes. Light comes from upper left; shadows are soft and short. Water is still enough that moving boats read clearly.

Visual priorities, highest first: timer/phase and legal controls; node labels and ship letters; direction arrows; signals; private destination distinction; delivery feedback; scenery. Artwork must yield to this hierarchy.

### 9.2 Color tokens

| Token | Initial value | Use |
|---|---|---|
| `harbor.deep` | `#102D3A` | App background, dark surfaces, text on cream |
| `harbor.water` | `#214D60` | Main chart water |
| `harbor.surface` | `#173B4B` | Dark cards/panels |
| `paper.base` | `#F4E8CF` | Private card, routes, primary text on dark |
| `paper.raised` | `#FFF7E8` | Dialog/recap surfaces |
| `ink.primary` | `#152F3A` | Text on light panels |
| `ink.secondary` | `#45616B` | Secondary text on paper, subject to measured contrast |
| `signal.need` | `#F0BD70` | NEED / neutral caution, never color alone |
| `signal.yield` | `#97D6CA` | YIELD |
| `signal.ready` | `#BCCAF5` | READY |
| `state.conflict` | `#E9A276` | Post-resolution congestion |
| `state.success` | `#A6D3A5` | Delivery/positive outcome |
| `state.focus` | `#FFF7E8` | Outer focus ring on dark; paired dark ring on paper |
| `ship.A` | `#E9B75F` | Ochre identity accent plus A |
| `ship.B` | `#78BEB8` | Sea-glass identity accent plus B |
| `ship.C` | `#C49BBB` | Heather identity accent plus C |
| `ship.D` | `#8FADE0` | Cornflower identity accent plus D |

These are initial production tokens, not blanket contrast certification. Verify actual foreground/background combinations including alpha, overlays, disabled states, mobile brightness, and textured backgrounds. Use dark text on pastel buttons. Never place cream text directly on a pale signal fill. Color differences do not replace shape/letter/name distinctions.

### 9.3 Typography and spacing

Primary family: **Golos Text**, self-hosted, with Latin and Cyrillic glyphs, weights 400/500/600/700. It has an OFL license and a source repository [R06]. Use a compressed WOFF2 subset retaining all product punctuation, numerals, Latin, Cyrillic, and `ё/Ё`; include the license. System sans-serif fallback must remain playable if font loading fails.

| Role | Default size / line-height / weight |
|---|---|
| Page title | 28 / 34 / 700 |
| Dialog/recap title | 24 / 30 / 700 |
| Section title | 18 / 24 / 600 |
| Body and control label | 16 / 22 / 400–600 |
| Supporting text | 14 / 20 / 400 |
| Chart node/ship label | 14–16 / 18 / 700; stable on-board IDs |
| Countdown and counters | 20 / 24 / 700; tabular numerals |

Critical text never drops below 14 px. Do not put an entire Russian sentence into a 12 px caption to preserve a mockup. The eight-point spacing family is 4/8/12/16/24/32. Cards use 16 px radius, buttons 12 px, compact badges 8 px. Standard touch controls are at least 44×44 px, main actions 48–52 px high. Shadows are subtle and decorative, not the only boundary cue.

### 9.4 Chart rendering contract

- Draw water/scenery from raster assets. Draw routes using Canvas 2D strokes and directional arrowheads. Render nodes, ship IDs, control buttons, and accessible text with DOM/CSS or a synchronized DOM overlay. **No SVG assets or inline-SVG UI dependency is required or permitted by this brief.**
- Game topology comes from signed/versioned public graph data, not image recognition or art coordinates.
- Use a normalized coordinate system with map-defined node positions, expanded to the chart's inner rectangle with a minimum 20 px boundary gutter.
- Route body target: 3–4 CSS px; arrowheads at least 8×7 px. Add a dark under-stroke when route cream approaches light scenery. Arrow direction is visible without animation.
- Bidirectional routes use separated parallel curves or clearly separated paired arrows. Do not draw an undirected line and assume players will know it goes both ways.
- Crossing routes do not create a node. Use a small line gap/bridge treatment at an unconnected crossing and explain it once in Help. No crossing may obscure an arrowhead or ship letter.
- Node center hit targets must not overlap; minimum center spacing 48 px at 390 px width. If a count variant cannot meet this, revise its layout without changing topology or switch to list mode at the affected width.
- Entry nodes have a small home-notch shape and the owner's letter. Berths have a square dock-shaped backing; junctions have circular backing. Shape differentiates node type, independent of scenery.
- Ship body has a standardized dark outline and a cream letter plate. Flags and cosmetic trims cannot change ship letter position, readable body silhouette size, hitbox, or public signal shape.
- Show a ship's current occupancy at the node center, not along a route before resolution. A selected move is an owner-only outline; another participant's commitment may change its roster badge only.
- No node moves within a scenario because of incoming text, badges, a reconnect banner, or artwork loading.

### 9.5 Motion vocabulary

| Motion | Duration | Constraint |
|---|---|---|
| Button press | 80–120 ms | Color/1 px depression; no bouncy scaling requirement |
| Panel entrance | 160–220 ms | Small fade/8 px translation; immediate with reduced motion |
| Signal placement | 140 ms | One restrained stamp response, then still |
| Selected node | Static | No endless glowing pulse |
| Ship movement | 650–800 ms | Synchronized per resolved round; no spring overshoot into another node |
| Water shimmer | 10–16 second low-amplitude loop | Optional, off in reduced-motion/low-power mode |
| Delivery light | 250 ms rise, 500 ms settle | Small local warmth, not a full-screen flash |
| Congestion mark | 300–500 ms once | Node-based amber ring, no camera shake |
| Result | 220 ms | Skip on fast navigation; never block Rematch for a celebration |

No fireworks, confetti storm, spinning reward chest, flashing last-second red vignette, or random seagull flying across a button. Decorative activity stops when the app is not active.

## 10. Asset inventory and image-generation production brief

### 10.1 Production principles

The implementation agent has access to image generation through MCP. It MUST use that capability for the illustration package rather than substituting generic emoji, wireframes, SVG clip art, or inconsistent stock pictures. It may generate clean primitives procedurally where precision matters, such as signal masks, arrowheads, borders, and texture noise. All required delivered illustration assets are raster.

Generate at high resolution, curate, remove/repair backgrounds when necessary, crop, optimize, and test at actual in-game size. An MCP call succeeding is not asset acceptance. Do not ask the model to draw readable text, route arrows, exact graph connectivity, seat letters, counters, payment labels, or an entire functional screen. Render those in code.

### 10.2 Required image manifest

Paths below are the implementation's asset contract, not files delivered with this specification. Source masters stay outside the public runtime bundle. Size caps are compressed per-file ceilings; total budgets in section 17 also apply.

| Asset ID / runtime path pattern | Quantity | Production source and export | Acceptance / budget |
|---|---:|---|---|
| `ART-01 brand/harbor-mark` | 1 | Original lamp-over-water emblem, 1024 px master; transparent 256 px PNG/WebP | No text; legible at 32 px; ≤35 KB |
| `ART-02 scenes/harbor-key-art` | 1 master, 2 crops | 3072×2048 landscape master; 1440×960 and portrait-friendly 1080×1440 crops | Shared scene for home/help/share; no chart baked in; ≤300 KB per runtime crop |
| `ART-03 maps/M01…M10/backplate` | 10 | 1536×1536 or larger master; 768×768 WebP runtime | Clear water decision area, matching map mood; ≤180 KB each |
| `ART-04 maps/M01…M10/thumbnail` | 10 derived | Crop backplate and overlay public graph programmatically at build time; 360×240 WebP | No private data; ≤35 KB; no separate AI interpretation of topology |
| `ART-05 berths/B1…B3` | 3 | 1024 px isolated master; transparent 256 px WebP/PNG | Fixed silhouettes, light direction, no lettering; ≤45 KB |
| `ART-06 ships/A…D` | 4 | Consistent small delivery-boat body variants; 1024 px isolated master, 256 px transparent runtime | Readable at 34–44 CSS px; same footprint/outline; ≤35 KB |
| `ART-07 ships/shadow` | 1 | Procedural soft ellipse, 128 px transparent PNG | Optional; ≤3 KB; not used for occupancy |
| `ART-08 flags/default` | 1 | Plain cream pennant, transparent 128 px | Free baseline; no identity replacement; ≤8 KB |
| `ART-09 flags/harbor-set-01…06` | 6 | Raster patterns: sunrise, wave, stitch, window, sprig, checker | Same mast slot; no text or readable hidden code; ≤10 KB each |
| `ART-10 cargo/tea,bread,books,cloth,tools,flowers` | 6 | Small isolated still-life illustrations, 512 px master; 128 px transparent runtime | Private-card decoration only; no rule encoding; ≤18 KB each |
| `ART-11 signals/need,yield,ready` | 3 | Precisely authored masks exported as raster at 128 and 256 px | Distinct silhouette at 20 px; no AI ambiguity; ≤5 KB per size |
| `ART-12 ui/*` | 20 | Coherent raster icon set, exact IDs listed below; 96 px source/runtime atlas | ≤65 KB atlas; text labels/accessible names still required |
| `ART-13 results/success,congestion,round-limit,interrupted` | 4 | 1536×1024 master; 768×512 WebP | Same waterfront, different light/composition, no harmed boats; ≤120 KB each |
| `ART-14 mastery/first-light,familiar-waters,harbor-keeper` | 3 | Stamp-style illustrations, 512 px master; 192 px transparent runtime | Label is external text; ≤20 KB each |
| `ART-15 textures/water,paper` | 2 | Seamless 512 px tiles; 256–512 px optimized WebP/PNG | Low contrast, no visible seam or repeated object; ≤30 KB each |
| `ART-16 props/*` | 8 | Bollard, rope coil, crate, bench, reed clump, lamp, mooring post, closed parasol; 512 px isolated masters | Decorative edges only; atlas ≤160 KB |
| `ART-17 share/harbor-card` | 1 derived template | Key-art crop plus runtime-safe text composition; 1200×630 PNG/WebP | No private state, user IDs, or invite token; generate only on explicit Share |
| `ART-18 app/icon,favicon` | 2 derived | Brand mark with safe padding, 512×512 PNG and 32×32 PNG/ICO | Validate at 16/32/48 px; no SVG favicon |
| `FONT-01 fonts/golos-text` | Latin/Cyrillic subset(s) | Official Golos Text source; WOFF2 with license retained | Target ≤160 KB combined; verify Russian and numeral glyphs |

`ART-12` exact icon IDs: `back`, `close`, `help`, `sound-on`, `sound-off`, `haptics`, `chart`, `list`, `person`, `bot`, `invite`, `copy`, `check`, `lock`, `more`, `settings`, `report`, `block`, `share`, `star`. Direction arrowheads and simple focus rings are code-rendered geometry, not an additional art pack. No other icon library is needed.

Result borders for the paid set are CSS/raster-pattern treatments using the six flag patterns, not six new illustrations. Optional production variants may exist in masters, but runtime manifest entries must not multiply without a budget review.

### 10.3 Shared generation prompt

Use this as the invariant prefix, with a per-asset suffix. If the MCP tool supports reference images, use the approved key art/style sheet as a reference on every related generation.

> Create an original premium cozy harbor game illustration for “Quiet Harbor.” Contemporary hand-painted gouache and cut-paper sensibility, calm dusk-blue water, warm cream painted wood, restrained sea-glass and ochre accents. Nearly top-down view with shallow depth, consistent soft light from upper left, simplified chunky readable silhouettes, believable small-scale working waterfront, gentle material texture, polished and welcoming rather than childish. Broad quiet areas, controlled detail, no dramatic perspective. The illustration must support a highly legible mobile strategy board rather than compete with it. No text, letters, numerals, logos, watermarks, interface controls, graph lines, directional arrows, currency, recognizable brands, or existing copyrighted characters. No photorealism, 3D plastic gloss, military hardware, tropical resort cliché, neon cyberpunk, shipwrecks, smoke emergency, or visual clutter.

Do not prompt “in the style of” a living artist or an identifiable game studio. Describe materials, palette, perspective, and composition instead. Record the tool/model version and applicable commercial-use terms; generation is not automatic legal clearance.

### 10.4 Per-asset prompt suffixes

| Family | Suffix / composition instruction |
|---|---|
| Key art | “A sheltered neighborhood inlet at blue hour, three modest welcoming waterfront destinations, four small delivery boats, warm windows and a wide calm center. Leave the upper-left title-safe area low-detail. Nobody in danger; no written signs.” |
| Map backplate | “Square top-down game-board backplate. Keep the central 74% as clean low-contrast water. Place the map's characteristic scenery along the outside edges. Do not place boats, nodes, arrows, labels, or exact dock targets; those are separate runtime layers.” |
| Berth B1 | “Isolated tiny reading-room dock with one square glowing lantern, low stepped landing, short soft shadow. Transparent background if supported; otherwise flat chroma background for removal. No text.” |
| Berth B2 | “Isolated compact market dock with broad cream-and-muted-ochre canvas awning, a suggestion of stacked baskets, no people or readable signage. Same scale/camera as the reference berth.” |
| Berth B3 | “Isolated cozy repair workshop dock with stepped roof, small square chimney, pale timber and teal shutters. No industrial smoke. Same scale/camera as reference.” |
| Boat bodies | “Isolated stubby harbor delivery boat, rounded bow, visible cream deck plate left blank, short mast socket for a separate flag, dark painted hull outline, minimal deck detail. Same proportions and camera for all four variants. Neutral orientation pointing upward, no wake baked in.” |
| Cargo | “One small tidy parcel still life of [tea/bread/books/cloth/tools/flowers], no letters, no destination imagery, generous transparent margin, recognizable at 32 pixels, same gouache texture.” |
| Success result | “The same harbor after a well-coordinated shift: six small warm dock lights, calm water, welcoming windows, modest sense of completion. No trophy, confetti, or text.” |
| Congestion result | “The same peaceful harbor taking a pause: resting boats tied safely at the edge, an unlit portion of the quay, gentle amber evening. Reflective, never damaged or accusatory.” |
| Round-limit result | “The same harbor at a slightly later blue hour, a few parcels still neatly waiting under an awning, warm windows and a clear invitation to try again. No alarm clock or distressed character.” |
| Interrupted result | “A quiet empty mooring with a folded cream chart on a bench, neutral daylight-blue palette, welcoming restart feeling, no broken equipment or error symbols.” |
| Mastery stamps | “A single original paper-stamp emblem using [one lantern / two lanterns over water / lighthouse with simple wreath], muted ink and cream, bold silhouette, no lettering.” |

Map-specific atmosphere is defined in the content appendix. Do not encode extra rules such as tides, fog visibility, moving bridges, weather penalties, or blocked paths in a map illustration unless those rules exist; they do not in this release.

### 10.5 Asset creation workflow and rejection criteria

1. Generate 3–4 key-art directions and a compact style sheet of water, one boat, one berth, and one cargo object. Choose one internally coherent direction, not a mixture of the prettiest isolated outputs.
2. Produce the reference vertical slice: one map backplate, all three berth silhouettes, boats A/B, three signals, and one private card with real UI text. Test at 390 px before generating the remaining content.
3. Generate the remaining approved families using the same reference/camera/palette. Prefer independent clean assets over an AI-generated sprite sheet with inconsistent tile alignment.
4. Clean alpha edges, remove stray objects/watermarks, normalize boat footprint, crop transparent padding, export runtime formats, and produce 1×/2× where useful. Do not ship 4K masters to the browser.
5. Create a texture atlas only for related small assets; retain a generated manifest mapping stable IDs to frames and pivots. Do not repack in a way that changes ship anchors between builds.
6. Validate each asset at its actual smallest display size, grayscale, color-vision simulations, and over both light/dark surfaces where relevant.
7. Record origin, generation/edit history, license evidence, checksum, dimensions, encoded bytes, alpha mode, and approval status. Reject unresolved rights, watermark-like artifacts, unreadable silhouettes, excessive detail, inconsistent shadows, or functional geometry baked into art.
8. The default fallback during generation is an explicit development placeholder, never a claimed final asset. If the generation service is unavailable, finish non-art work and report the art gate as blocked; do not quietly replace the requested art direction with SVG.

### 10.6 Asset provenance schema

Every runtime asset has a manifest record with `assetId`, `runtimePath`, `sourceKind` (`generated`, `procedural`, `licensed`, `derived`), source URL or source-master ID, author/provider, tool/model/version if generated, prompt record ID, generation date, license identifier, saved license-evidence path, modifications, content SHA-256, width/height or duration, compressed byte size, and reviewer status.

License notices belong in the distributed build and in an in-app Licenses screen. Preserve original notices even when attribution is optional. Do not hotlink runtime assets from an external source website. Download approved source files once during production, verify them, and serve versioned local/CDN copies.

## 11. Audio and haptic specification

### 11.1 Sound identity and acquisition decision

The sound of Quiet Harbor is a small tactile instrument resting near water: soft wood, muted bell partials, brushed paper, filtered waves, and sparse warm musical notes. It must sound complete with sound off; “silent cooperation” describes the communication design, not mandatory audio muting.

**Default production path:** procedurally synthesize every required cue and both ambient/music loops from the recipes below. This avoids unknown field-recording rights and provides an entirely specified fallback. Render original WAV masters offline during development, then encode runtime files. Do not generate audio on every turn or call a remote audio-generation service during play.

**Approved optional substitution:** Kenney's *Interface Sounds* pack may replace dry click/paper/confirmation layers after audition and license verification. The official pack and support page identify the game assets as CC0 [R04–R05]. The upstream OpenGameArt listing identifies 100 OGG files [R05b]. This specification does not invent exact internal filenames or claim to have auditioned the pack. Select the actual file, record its filename/checksum/license, and trim/filter it to the cue contract. If the download changes or is unavailable, use the complete procedural baseline; no account or purchase is required for baseline completion.

Do not use arbitrary YouTube rips, Spotify music, “royalty-free” search snippets, or a whole Freesound catalog under one assumed license. Freesound licenses differ by item [R09]; using it is not necessary here. Any optional CC-BY substitution needs exact attribution, modification notice, source/license URL, and a preserved evidence copy. Exclude NC, ND, Sampling+, unclear-license, and unlicensed assets from this commercial-capable build.

### 11.2 Synthesis primitives

Use deterministic offline rendering at 48 kHz, 24-bit PCM WAV masters. Seed all noise with a fixed per-cue seed recorded in the asset manifest, so rebuilding reproduces the sound. Master mono for UI cues, stereo only for ambience/music; mono downmix must remain balanced.

Primitive definitions:

- **Wood:** sine at 190 Hz plus 0.22-amplitude second partial and a 12 ms low-passed noise tick; 3 ms attack, exponential 90–160 ms decay; low-pass 2.5 kHz.
- **Paper:** white/pink noise band-passed approximately 700–3200 Hz; 10 ms attack, 70–140 ms decay; no abrasive high-frequency crackle.
- **Bell:** sine fundamental plus partials at 2.01× and 3.98×, amplitudes 1/0.18/0.06; 5 ms attack, 350–650 ms exponential decay; low-pass 4.5 kHz. No piercing high octave.
- **Water:** seeded pink noise through 180–1600 Hz band shaping, amplitude modulated by overlapping 2–5 second smooth envelopes; optional low-level 400–650 Hz resonant droplet with no obvious loop beat.
- **Pad:** triangle/sine mixture with gentle 0.2 Hz amplitude variation, 400 ms attack/release, low-pass 1.8 kHz, very light stereo spread; no unstable pitch wobble.

Use short sample-accurate fade-ins/outs to prevent clicks. Do not normalize every cue to the same aggressive loudness. Synthesis recipes are starting timbres; final mixing must pass listening tests at low phone volume and through mono speakers.

### 11.3 Required audio cue manifest

All paths begin `audio/`. A cue is played on the relevant confirmed event, not repeatedly on render or reconnect. Variations are deterministic cosmetic choices only.

| Cue ID / file stem | Duration | Recipe / emotional purpose | Trigger / limits |
|---|---:|---|---|
| `SFX-01 ui-tap` | 70–100 ms | Very quiet Wood at 220 Hz | Local valid button press; maximum 5/sec |
| `SFX-02 select-node` | 110 ms | Wood 260 Hz with 15 ms Paper | Owner selects a different legal destination |
| `SFX-03 select-wait` | 110 ms | Wood 180 Hz, softer than route selection | Explicit Wait selection |
| `SFX-04 signal-need` | 220 ms | Muted Bell D5 (587.33 Hz), single tone | Accepted signal placement; one cue per replacement, throttled |
| `SFX-05 signal-yield` | 240 ms | Muted Bell A4 (440 Hz), soft downward amplitude tail | Accepted YIELD |
| `SFX-06 signal-ready` | 260 ms | Bell D5 then A5 quietly at +70 ms | Accepted READY; distinct from route commitment |
| `SFX-07 signal-clear` | 120 ms | Paper fade with Wood 150 Hz | Owner clears its signal |
| `SFX-08 commit` | 280 ms | Wood 190 Hz + Bell D4 (293.66 Hz) at +50 ms | Server accepted own commitment, once per action ID |
| `SFX-09 round-open` | 350 ms | Bell A4 then D5 at +110 ms | New round becomes interactive; never replay old rounds |
| `SFX-10 time-five` | 160 ms | One soft Wood/Bell at 440 Hz | One optional cue at 5 seconds if not committed; no final-second ticking |
| `SFX-11 boats-move` | 600–800 ms | Low Water swish, low-pass 1.2 kHz | One shared movement cue per round, not one loud engine per ship |
| `SFX-12 delivery` | 600 ms | Bell D5/F♯5/A5 staggered by 70 ms, low gain | Once per delivery round; layer intensity capped for multiple arrivals |
| `SFX-13 congestion` | 420 ms | Two soft Wood taps at 160/140 Hz, 100 ms apart | Once per round with congestion; never crash/siren |
| `SFX-14 shift-success` | 1.8 s | D4–F♯4–A4–D5 warm Bell/Pad phrase | Success recap only, once |
| `SFX-15 shift-incomplete` | 1.4 s | A4–E4–D4, quiet unresolved-to-rest phrase | Rules failure; reflective, not humiliating |
| `SFX-16 reconnect` | 350 ms | Paper + Bell A4 | Successful connection restoration, not every heartbeat |
| `SFX-17 ui-unavailable` | 130 ms | Soft Paper/low Wood | Optional local invalid control feedback; no buzzer |
| `SFX-18 mastery` | 1.1 s | D5–A5–F♯5–D5, restrained | Newly awarded threshold in non-live screen |
| `AMB-01 harbor-water` | 48 s seamless | Water primitive; one low rope creak at 13/31 s from filtered Wood | Loop during lobby/play at very low level; no intelligible speech, gull shrieks, engines, or horns |
| `MUS-01 lantern-loop` | 64 s seamless | Original 16-bar, 60 BPM, 4/4 composition below | Optional music in home/lobby/play; never speeds up with timer |

Round-priority mixing: if delivery and congestion coexist, play the soft congestion cue first and a quieter delivery cue after 160 ms; do not suppress either fact visually. If the same round ends the scenario, play only the result sting after a short transition, not all three stingers at full level. If failure precedence applies, the failure sting wins.

### 11.4 Original music recipe

At 60 BPM, each 4/4 bar lasts four seconds. The 16 bars are four repetitions of the following harmonic cycle, with sparse variations rather than a repeated busy melody:

| Bars modulo 4 | Harmony / Pad notes | Sparse Bell melody, beats 1 and 3 only |
|---|---|---|
| 1 | Dmaj6: D3, A3, B3, F♯4 | A4, F♯4 |
| 2 | Gmaj7: G2, D3, F♯3, B3 | B4, A4 |
| 3 | Bm7: B2, F♯3, A3, D4 | F♯4, D4 |
| 0 | Asus2: A2, E3, B3, E4 | E4, silence |

In bars 5–8, omit melody beat 3. In bars 9–12, add a very quiet D5 only on bar 9 beat 1 and bar 11 beat 3. In bars 13–16, return to the first phrase, with bar 16 melody silent so the loop boundary is restful. Add a low Wood tone on beat 1 of every other bar at barely audible level; no drum groove. Melody envelope is 450 ms; pad notes hold 3.6 seconds with overlap. Render reverb tails across the loop boundary by preroll/wrap, not a fade to silence every 64 seconds.

This is original compositional direction, not a claim about an existing licensed track. Do not imitate a known melody or request a soundalike of a named artist. If the implementation agent changes the tune, retain the same sparse, non-urgent function and provenance.

### 11.5 Encoding, loudness, and playback

- Deliver WAV masters outside the runtime bundle; runtime MP3 for universal fallback and Opus/WebM where actual `canPlayType`/decode tests confirm support. Do not assume OGG works in every Telegram iOS WebView.
- One-shot UI cue peak target: typically −12 to −6 dBFS before bus mixing. Master output true peak no higher than −1 dBTP. Ambient/music approximate integrated loudness targets: −28/−24 LUFS respectively. Short-cue LUFS is not a meaningful sole acceptance metric; inspect peak and listen.
- Music defaults off. Master sound defaults off on first launch, with a discoverable “Sound off” button. After explicit enable, default SFX gain 0.65, ambience 0.25, music 0.18 if separately enabled. Persist per-user/device preference without changing another participant's audio.
- Respect autoplay policy: create/resume `AudioContext` from user interaction; catch suspension and decode failures, keep the game functional, and show a non-blocking enable prompt [R07–R08]. Do not start sound just because Telegram calls the app active.
- Fade music/ambience over 250 ms on app deactivation; suspend audio after the fade. Resume only if user preferences allow it. Do not play a backlog of missed cues.
- Cap concurrent sources at 8, and at most 2 semantic cues in a 100 ms window. Coalesce multi-ship movement/delivery. UI cue retriggers must never create a volume spike.
- Preload essential short cues after interaction or idle; stream/defer loops. Required audio payload target ≤2.5 MB for one chosen codec, with ≤500 KB eagerly loaded. Encoded alternate formats do not all download on one device.
- Never request microphone permissions. No positional stereo cue may be the only indication of a game event.

### 11.6 Haptics

Haptics are optional, default off, and feature-detected through Telegram's API. Use one light impact for server-confirmed Commit and one gentle notification on terminal result if enabled; no repeated countdown vibration, no collision punishment pulse, no vibration for every remote signal. Absence of the API is a silent no-op with a disabled explanatory setting. Sound and haptics are independent.

## 12. Localization and player-facing language

### 12.1 Localization contract

All visible and assistive strings live in locale catalogs, with semantic keys and parameterized messages. No sentence concatenation; use ICU-compatible plural/select handling, including Russian one/few/many forms. Persist the chosen language; initial default is Telegram's language when supported, otherwise English. Language switches immediately without changing server state, signal IDs, current job, or deadline.

Stable graph IDs `J1`, `B1`, `A` remain Latin and identical across languages. Display localized names alongside them: `B1 · Фонарь`. Do not translate node IDs into visually confusable Cyrillic characters. No directions depend on “port/starboard,” nautical literacy, or a culturally specific gesture.

Russian must use clean UTF-8. The attached source contains a damaged bot word; the correct approved form here is **бот**. Validate `ё`, nonbreaking text behavior, punctuation, and screen-reader pronunciation. Plan for 30–40% expansion, with actual RU layouts as the gate rather than an assumed ratio.

### 12.2 Core copy catalog

This catalog is the approved source for major flows. Additional necessary errors/accessible labels must follow these terms and be translated before release.

| Key | English | Russian |
|---|---|---|
| `brand.title` | Quiet Harbor | Тихая гавань |
| `brand.tagline` | One signal can clear the harbor. | Один сигнал может освободить путь. |
| `home.premise` | Deliver together. Plan quietly. Move at once. | Доставляйте вместе. Планируйте без слов. Двигайтесь одновременно. |
| `home.friends` | Play with friends | Играть с друзьями |
| `home.practice` | Practice with bots | Тренировка с ботами |
| `home.learn` | Learn to play | Как играть |
| `loading.harbor` | Preparing the harbor… | Готовим гавань… |
| `launch.telegram` | Open Quiet Harbor in Telegram | Открыть «Тихую гавань» в Telegram |
| `room.title` | Your crew | Ваша команда |
| `room.invite` | Invite friends | Пригласить друзей |
| `room.copy` | Copy invite link | Скопировать приглашение |
| `room.copied` | Invite link copied | Приглашение скопировано |
| `room.revoke` | Revoke this link | Отозвать ссылку |
| `room.rotate` | Create a new invite link | Создать новую ссылку |
| `room.expired` | This invitation has expired. | Срок действия приглашения истёк. |
| `room.revoked` | This invitation is no longer valid. | Это приглашение больше не действует. |
| `room.full` | This room is full. | В комнате нет свободных мест. |
| `room.inProgress` | This shift has already started. | Эта смена уже началась. |
| `room.unavailable` | You cannot join this room. | Вы не можете войти в эту комнату. |
| `room.closed` | This room is closed. | Эта комната закрыта. |
| `room.ready` | Ready to start | Готовы начать |
| `room.notReady` | Not ready | Не готовы |
| `room.start` | Start shift | Начать смену |
| `room.host` | Host | Организатор |
| `room.waitingReady` | Everyone needs to be ready. | Все участники должны подтвердить готовность. |
| `room.settingsChanged` | Room settings changed. Confirm readiness again. | Настройки комнаты изменились. Подтвердите готовность ещё раз. |
| `mode.humanOnly` | Human-only | Только игроки |
| `mode.mixed` | Mixed · includes bots | Смешанная · есть боты |
| `mode.practice` | Practice | Тренировка |
| `mode.untimed` | Learn without a timer | Обучение без таймера |
| `mode.unranked` | Not on the standard leaderboard | Не участвует в основном рейтинге |
| `bot.label` | Bot | Бот |
| `bot.partner` | Practice partner: bot | Тренировочный напарник: бот |
| `bot.consent` | Allow a practice bot after I miss a round | Разрешить боту помочь, если я пропущу раунд |
| `bot.offer` | A bot can help from the next round. This result will be Mixed. | Бот может помочь со следующего раунда. Результат будет смешанным. |
| `bot.accept` | Let a bot help | Разрешить помощь бота |
| `bot.decline` | Keep my boat waiting | Оставить судно на месте |
| `bot.reclaim` | Take back control next round | Вернуть управление со следующего раунда |
| `hud.round` | Round {round}/{limit} | Раунд {round}/{limit} |
| `hud.deliveries` | Deliveries {count}/{target} | Доставки {count}/{target} |
| `hud.congestion` | Congestion {count}/{limit} | Заторы {count}/{limit} |
| `hud.seconds` | {count} seconds left | Осталось {count} сек. |
| `job.private` | Only you see this card | Эту карточку видите только вы |
| `job.valid` | Deliver to either berth | Доставьте на любой из двух причалов |
| `job.preferred` | Preferred · +5 team points | Предпочтительный · +5 очков команде |
| `job.optionalBonus` | Both work. The star is an optional bonus. | Подойдут оба. Звезда даёт необязательный бонус. |
| `berth.B1` | Lantern | Фонарь |
| `berth.B2` | Market | Рынок |
| `berth.B3` | Workshop | Мастерская |
| `signal.NEED` | Need this node | Нужен этот узел |
| `signal.YIELD` | Willing to yield | Готовы уступить |
| `signal.READY` | Ready to coordinate | Готовы к совместному ходу |
| `signal.disclaimer` | A signal is a request, not a reservation. | Сигнал — это просьба, а не бронь. |
| `signal.chooseNode` | Choose a node for {signal} | Выберите узел для сигнала «{signal}» |
| `signal.clear` | Clear signal | Убрать сигнал |
| `move.wait` | Wait | Подождать |
| `move.waitSelected` | Wait is selected | Выбрано ожидание |
| `move.selected` | Selected: {node} | Выбрано: {node} |
| `move.commit` | Commit route | Подтвердить маршрут |
| `move.commitWait` | Commit wait | Подтвердить ожидание |
| `move.sending` | Sending… | Отправляем… |
| `move.committed` | Committed — waiting for the harbor | Подтверждено — ждём общий ход |
| `move.closed` | This round has already closed. | Этот раунд уже завершён. |
| `move.notCommitted` | No route was committed. Your boat waited. | Маршрут не был подтверждён. Ваше судно осталось на месте. |
| `move.wrongBerth` | Not a destination for your current parcel. | Этот причал не принимает вашу текущую посылку. |
| `move.notAdjacent` | No outgoing route from your current node. | Из вашего узла сюда нет маршрута. |
| `move.occupied` | Occupied now; movement depends on its departure. | Сейчас узел занят; движение зависит от ухода судна. |
| `round.resolving` | Resolving… | Выполняем общий ход… |
| `round.contested` | {node} was contested. Boats stayed in place. | На узле {node} возник затор. Суда остались на месте. |
| `round.swap` | The exchange between {nodeA} and {nodeB} was blocked. | Встречный обмен между {nodeA} и {nodeB} не состоялся. |
| `result.success` | The harbor is clear. | Путь свободен. |
| `result.roundLimit` | The shift is over. Try a different route together. | Смена закончилась. Попробуйте другой маршрут вместе. |
| `result.congestion` | The harbor needs a pause. | Гавани нужна передышка. |
| `result.precedence` | The delivery target was reached, but congestion reached five. Congestion is checked first. | Цель по доставкам достигнута, но заторы дошли до пяти. Сначала проверяется предел заторов. |
| `result.score` | Team score | Очки команды |
| `result.deliveryPoints` | Delivery points | Очки за доставки |
| `result.preferencePoints` | Preferred-delivery points | Очки за предпочтительные доставки |
| `result.congestionDeduction` | Congestion deduction | Вычет за заторы |
| `result.notCompleted` | Not completed — no result was awarded | Не завершено — результат не засчитан |
| `result.rematch` | Rematch | Ещё раз |
| `result.nextMap` | Next harbor | Следующая гавань |
| `result.share` | Share team result | Поделиться результатом команды |
| `result.noResults` | No shared results here yet. | Здесь пока нет опубликованных результатов. |
| `network.offline` | Offline. Your action has not been confirmed. | Нет связи. Ваше действие не подтверждено. |
| `network.reconnecting` | Reconnecting to the harbor… | Восстанавливаем связь с гаванью… |
| `network.restored` | Connection restored | Связь восстановлена |
| `network.otherTab` | Control is active in another window. | Управление открыто в другом окне. |
| `network.recovery` | The harbor service is recovering. Please wait. | Сервис гавани восстанавливается. Подождите. |
| `network.aborted` | This shift could not be recovered. Your progress was not penalized. | Не удалось восстановить смену. Ваш прогресс не пострадал. |
| `auth.expired` | Please reopen the game from Telegram. | Откройте игру из Telegram ещё раз. |
| `settings.title` | Settings | Настройки |
| `settings.soundOff` | Sound off | Звук выключен |
| `settings.soundOn` | Sound on | Звук включён |
| `settings.music` | Music | Музыка |
| `settings.ambience` | Harbor ambience | Звуки гавани |
| `settings.haptics` | Haptics | Вибрация |
| `settings.reducedMotion` | Reduced motion | Меньше анимации |
| `settings.largeText` | Larger text and node list | Крупный текст и список узлов |
| `settings.language` | Language | Язык |
| `settings.chart` | Show chart | Показать карту |
| `settings.nodeList` | Show node list | Показать список узлов |
| `settings.audioUnavailable` | Sound is unavailable. You can keep playing. | Звук недоступен. Можно продолжить игру. |
| `safety.report` | Report a problem | Сообщить о проблеме |
| `safety.block` | Block future shared rooms | Запретить совместные комнаты |
| `safety.reportSent` | Report sent. Thank you. | Сообщение отправлено. Спасибо. |
| `safety.leave` | Leave room | Выйти из комнаты |
| `safety.leaveBot` | Leave and allow a bot | Выйти и разрешить бота |
| `safety.leaveNoBot` | Leave without a bot | Выйти без бота |
| `safety.leaveExplain` | The room will continue without you while another human remains. | Комната продолжит игру без вас, пока в ней остаётся другой игрок. |
| `shop.flagSet` | Harbor Flag Set | Набор флагов гавани |
| `shop.cosmeticOnly` | Flags and result borders only. No gameplay advantage. | Только флаги и рамки результата. Без игровых преимуществ. |
| `shop.price` | 75 Stars | 75 звёзд |
| `shop.buy` | Buy for 75 Stars | Купить за 75 звёзд |
| `shop.pending` | Waiting for payment confirmation… | Ждём подтверждения оплаты… |
| `shop.cancelled` | Purchase cancelled. Nothing was equipped. | Покупка отменена. Оформление не изменилось. |
| `shop.failed` | Payment could not be confirmed. Contact support if you were charged. | Не удалось подтвердить оплату. Если звёзды списались, обратитесь в поддержку. |
| `shop.refunded` | This purchase was refunded. Default flags are active. | Покупка возвращена. Используются стандартные флаги. |
| `shop.unavailable` | Purchases are unavailable. The game is free to play. | Покупки недоступны. Играть можно бесплатно. |
| `common.retry` | Retry | Повторить |
| `common.cancel` | Cancel | Отмена |
| `common.back` | Back | Назад |
| `common.continue` | Continue | Продолжить |
| `common.licenses` | Asset licenses | Лицензии материалов |
| `common.privacy` | Privacy | Конфиденциальность |
| `common.support` | Support | Поддержка |

For dynamic sentences such as players missing/readiness or delivery counts, use proper plural messages instead of substituting `{count}` into an English singular. Avoid gendered second-person congratulations; the Russian copy addresses the team or uses neutral constructions. Player-supplied display names are not translation strings.

### 12.3 Copy style

Plain, warm, short, specific. Say what happened and what the player can do next. Do not promise that a signal “made someone move,” that an invite is confidential after forwarding, or that a payment succeeded before server confirmation. Do not use “crash,” “guilty,” “you ruined,” “fail captain,” aggressive FOMO, fake scarcity, or nautical jargon for a basic node choice.

## 13. Accessibility and device behavior

### 13.1 Required accessible play

- Every color-coded fact also has a shape, ID, label, or position-stable text equivalent.
- Full keyboard operation: Tab/Shift+Tab through controls; Enter/Space activates; Escape closes only nonessential overlays and preserves selection. Never make Space globally commit while a dialog or input has focus.
- Use real buttons, headings, dialogs, and live regions. Manage focus on modal open/close and at recap; do not steal focus every second or on remote signal replacement.
- Provide visible high-contrast focus rings that remain outside the element and are not clipped by cards or Telegram insets.
- Respect `prefers-reduced-motion` as the initial motion default and expose an in-app override. No essential information depends on animation.
- Body text scales to 200%; node-list mode prevents clipping and horizontal scrolling. Test 320 px width, 390 px reference width, and 200% browser zoom on desktop.
- Target WCAG 2.2 AA contrast for text (normally 4.5:1; large text 3:1) and at least 3:1 for meaningful non-text controls. The game's 44 px control target exceeds the general WCAG 2.2 AA minimum of 24 px; do not misstate the standard [R10–R12].
- No flicker above three flashes per second, no screen shake, no forced device motion, no drag-only gesture, no forced audio/haptic, and no automatic orientation change.
- Use polite, summarized announcements for public updates. One optional “Five seconds left” announcement is enough; do not flood a screen reader with the countdown.

### 13.2 Timing accommodation and conformance honesty

The standard shared timer is an essential product constraint, but this document does not automatically assert that every accessibility timing exception applies. Provide untimed learning with the same selection/signal controls and an explicit unranked label. Lobby, rules, settings, reporting, consent, and commerce must not have arbitrary short content timers. Invite expiry is explained and a fresh link is available without losing settings.

An accessibility review must assess the real-time/essential exception for standard multiplayer against the implemented experience, including whether a reasonable accessible equivalent is needed [R10]. Do not advertise full WCAG conformance merely because the chart has ARIA labels or an untimed tutorial exists. Document any remaining standard-timer limitation clearly.

### 13.3 Telegram/mobile behavior

Respect both Telegram safe-area and content-safe-area values and the current viewport. Use a safe top/bottom inset strategy that avoids double-counting overlapping system/Telegram margins; test against actual client behavior rather than adding every available inset blindly. Subscribe to viewport/safe-area changes. Do not size the entire screen with a fixed `100vh` assumption.

The core app works in normal expanded Mini App mode. Fullscreen is an optional user-triggered enhancement, capability-detected with graceful failure. Telegram's BackButton maps to app navigation; leaving a live room requires the defined confirmation. A sheet must not consume Back as a room exit when it can close the sheet instead.

On app deactivation, stop decorative rendering/audio; do not pause authoritative deadlines. On return, resynchronize before accepting input and explain any missed round. Rotation reflows or selects the node list; it never changes the map or ship positions. Native gestures must not be disabled indiscriminately: avoid vertical-swipe conflicts without removing ordinary page scrolling.

No clipboard read permission, contacts, location, microphone, camera, or phone number is needed. Invite copy uses a user-initiated clipboard write with a selectable-text fallback. Haptic, fullscreen, and sharing features remain optional.

## 14. Technical architecture and data contracts

### 14.1 Smallest complete architecture

Use a mobile web application, not a Unity/WebGL export. The board contains at most four boats and nine nodes; a heavyweight 3D runtime is unnecessary.

Recommended standalone baseline, unless an existing platform dictates compatible equivalents:

| Layer | Choice / responsibility |
|---|---|
| Client | TypeScript, React 19, Vite; DOM/CSS UI plus Canvas 2D chart routes/scenery |
| Server | Node.js 24 LTS, TypeScript, Fastify 5, WebSocket transport |
| Validation | Runtime schemas at every API/content boundary; shared **public** types only |
| Persistence | PostgreSQL 17 or newer supported compatible release; transactions, unique constraints, migration tool |
| Rules | Pure TypeScript rules package independent of React, sockets, time APIs, bot logic, and storage |
| Content | Public graph/visual catalog; separate server-only jobs, instantiation, witnesses, and validation tooling |
| Testing | Unit/property tests, real database integration tests, Playwright multi-context browser tests, load tests |
| Assets | Local build pipeline for generated/derived raster art, font subsets, audio conversion, and provenance |

These choices are a starting implementation baseline, not dependencies installed by this documentation task. At implementation time select maintained compatible patch versions, verify security advisories and Node support, lock exact versions, and include the lockfile. Do not install unpinned `latest` in deployment or upgrade an existing host platform merely to match this table.

Logical boundaries:

- `client`: rendering, accessibility, input, localization, audio preferences, Telegram bridge.
- `public-contracts`: graph DTOs, public events, owner-private response type definitions without server data instances.
- `rules`: legal-move checks, simultaneous resolver, score/terminal predicates, pure snapshots.
- `content-server`: deck templates, randomized private instantiation, certificates, no client import path.
- `service`: authentication, membership, command admission, seat ownership, deadlines, persistence/outbox, per-recipient projection.
- `bots`: restricted-view policy invoking ordinary authorized commands.
- `verification`: fixtures, witness replay, privacy probes, browser scenarios, content linting.

Avoid Redis, queues, Kubernetes, an ECS, a microservice per game, and a live generative-AI dependency unless actual host-platform needs justify them. A single service with PostgreSQL row/advisory locking and an outbox is sufficient initially. An in-memory timer may wake the service, but the database is the authority for whether a round is due or resolved.

### 14.2 Authoritative state inventory

| Entity | Required fields / invariants |
|---|---|
| User | Internal ID, verified Telegram subject stored server-side, preferred locale/settings, consent records; no wallet needed |
| Room | ID, lifecycle, host ID, capacity, map selection, membership version, invite version/expiry, created/activity timestamps |
| Participant | Room/user/seat binding, joinedAt, readiness, connection presence, bot-consent setting, controller type/epoch; one owner per human seat |
| Scenario | ID, room ID, map/count/rules/content versions, private deck selector/instance, round/phase/timestamps, mode latch, final/provisional status |
| Public board | Graph reference, seat positions or awaiting-respawn state, signals, public commitment flags, deliveries, congestion, public revision |
| Private seat state | Current job index/object, full queue server-only, current draft, sealed intent, command sequence, private revision, pending control transfer |
| Round record | Scenario/round unique key, immutable start snapshot reference, accepted intents, normalized result, congestion reasons, delivery aggregate, hash |
| Result | Scenario unique key, outcome/reason, score/counters, mode/count/map/version, finalization status, publication consents |
| Mastery award | User/distinct-scenario/track/version unique key; qualifying human commit count |
| Outbox | Unique event ID, public revision, event kind, publication status; owner data is projected separately |
| Invite | Hashed random token, room/version, expiry, revokedAt; never stored in plaintext logs |
| Safety | Directed blocks; reports with category, minimal evidence reference, status, retention clock |
| Commerce, if enabled | Product/version, order, verified charge ID, user, entitlement state, refund state; no card information |

Persist `everBotControlled` as a monotonic boolean within a scenario. A client changing a mode label cannot change result classification. Freeze public names/ship identities for the scenario except safe moderation masking; avoid a roster jumping when a Telegram name changes mid-round.

### 14.3 Visibility matrix

| Field / fact | Other room humans | Seat owner | Bot for that seat | Authorized game service |
|---|---|---|---|---|
| Graph, node occupancy, public signals | Yes | Yes | Yes | Yes |
| Round/deadline, deliveries/congestion, mode | Yes | Yes | Yes | Yes |
| Public committed/not-committed flag | Yes | Yes | Yes | Yes |
| Own selected/sealed destination or Wait | No | Yes | Only when bot controls that seat | Yes |
| Current valid pair and preferred berth | No | Yes, including read-only while its bot acts | Yes for its own seat | Yes |
| Future job queues, hidden selector, seed | No | No | No | Yes, narrowly scoped |
| Other seat's current job or sealed intent | No | No | No | Yes, narrowly scoped |
| Resolved public routes and conflict nodes | Yes, after resolution | Yes | Yes | Yes |
| Preferred-delivery count | Team aggregate at finalized recap only | Same | No need during play | Yes |
| Preferred bonus tied to a ship/job | No | Own card already known; no extra history endpoint | No | Internal calculation only |
| Solver witnesses and reference plans | No | No | No | Content validation access only |
| Block lists, reports, invite token hashes | No | Only own allowed safety state | No | Dedicated access scope |

Never serialize the room aggregate and delete a few fields afterward. Construct each DTO from an allowlist. Test all success/error/snapshot/event/debug paths. Public caching and private response caching have different rules: owner snapshots are `Cache-Control: no-store` and never shared between sessions.

### 14.4 Client commands

Every command carries `protocolVersion`, `commandId` (UUID), and an authorized room context. The server derives sender identity and seat from the verified session; it does not trust a supplied user or seat ID. Client timestamps are diagnostic only and are not accepted as timing evidence.

Command-specific envelopes are distinct:

- `move.choose`, `signal.set`, and `move.commit` additionally require `scenarioId`, `round`, `controlEpoch`, and monotonically increasing `seatCommandSeq`; enforce the active controller/connection lease.
- `control.reclaim` and `control.acceptBot` require scenario and verified seat-owner authorization, not current gameplay-controller authority or its command sequence. An optional observed epoch detects stale UI but never substitutes for ownership. Requests are idempotent by command ID and revalidated at application.
- `state.resync` and `room.leave` require eligible membership/owner authorization and remain available while the seat is bot-controlled. They do not need the bot's current gameplay sequence.
- Lobby `room.ready` and `room.start` use room/configuration/membership versions. They do not require a scenario, round, or control epoch that does not yet exist.

| Command | Payload | Admission / result |
|---|---|---|
| `room.ready` | Desired readiness and current lobby configuration version | Only that human; reject if lobby settings changed |
| `room.start` | Expected lobby/membership version | Host, all-ready, connected humans, block check, count validity; atomic freeze |
| `move.choose` | `destinationNodeId` or `WAIT` | Owner-private draft only; legal at current position, planning/uncommitted |
| `signal.set` | Semantic ID + node, or null | Replace one public signal; planning/uncommitted; no private side effect |
| `move.commit` | Final destination or `WAIT`, plus complete final signal or null | Atomically validate/seal both final values; does not rely on a previous packet arriving |
| `control.acceptBot` | Owner consent for takeover | Authenticated seat owner; queue next boundary |
| `control.reclaim` | Owner request | Identity/membership/block/epoch validation; queue next boundary |
| `room.leave` | Explicit bot-consent choice | Idempotent departure and host/all-human handling |
| `state.resync` | Last public revision and owner revision | Return permitted snapshot/delta or current full snapshot |

`move.commit` includes the final signal to make packet races unambiguous. It may perform the last allowed signal replacement as part of locking. Once committed, all subsequent choose/signal/commit mutations reject with `ALREADY_COMMITTED`, except a retry of the original accepted command ID, which returns its original acknowledgement.

Gameplay command sequence is scoped to seat/controller/round. A lower or equal sequence with a different command ID is stale and cannot overwrite newer values. Gaps are acceptable because each mutation supplies a complete replacement value; a higher sequence does not require waiting forever for a lost packet. After a commit, sequence ordering never unlocks it. On reconnect, the owner snapshot includes the appropriate sequence floor and read-only/pending-reclaim status; receiving a floor does not grant write authority before the boundary.

Do not require a client's global public revision to match exactly for a move: another player's signal must not cause a legal commit to fail spuriously. Validate immutable scenario/round/position/control plus the deadline instead. Lobby configuration changes use their own expected version.

### 14.5 Events and acknowledgements

Server events have `eventId`, `scenarioId`, event kind, `publicRevision`, `serverNow`, and a public payload. Recipient-specific snapshots carry a separate `owner` envelope with that owner's `privateRevision`; no other owner envelope is present. The authoritative revision of a round result is identical for every participant; private job contents differ by recipient.

Required events: `room.snapshot`, `roster.changed`, `signal.changed`, `commitment.changed`, `round.started`, `round.resolved`, `control.changed`, `scenario.ended`, `scenario.closed`, `service.recovering`, and `command.ack`/`command.rejected`. Public commitment events contain a boolean, never intent kind or destination.

Private draft changes do not broadcast to others. Keep private revision counters out of shared channels, rather than exposing a stream of every hidden edit through public revision changes. Server internal transaction IDs are not the public protocol.

Acknowledgements report `accepted`, stable `commandId`, authoritative round, own committed state if relevant, and permitted revision. Errors use typed codes: `AUTH_REQUIRED`, `NOT_MEMBER`, `ROOM_UNAVAILABLE`, `PHASE_CLOSED`, `ROUND_CLOSED`, `STALE_ROUND`, `STALE_CONTROL`, `STALE_COMMAND`, `ALREADY_COMMITTED`, `INVALID_DESTINATION`, `INVALID_SIGNAL`, `RATE_LIMITED`, `SERVICE_RECOVERING`. Include only the caller-permitted current state; an error is not a debug dump.

If public revision is missing/out-of-order, buffer only a short bounded window and resync. Replayed event IDs are ignored. Never apply an old snapshot over a newer one, replay an old delivery animation into the next round, or trust a cached terminal result from a different scenario.

### 14.6 Transaction boundaries and exact-once effects

One authoritative command processor/lease per room, with database-enforced exclusivity, prevents concurrent host/start/action/resolve races. Use a scenario/round row lock or equivalent serializable operation to seal the accepted intent set at the deadline. A second worker sees the already-resolved round and exits successfully without modifying counters.

In the resolution transaction: lock eligible round, verify phase/time, read accepted intents and immutable start state, run the pure resolver, write final round state/hash, update scenario counters/phase, enqueue next boundary or provisional/final result, and insert outbox event. Commit before publishing. If the transaction rolls back, no client receives a successful result.

Completion, mastery, result publication, and purchase/refund effects use their own unique keys and retriable transactions. External delivery is **at least once**, with idempotent consumers; do not claim a distributed system has literally exactly-once network delivery. The requirement is exactly-once **game effects**.

Connection/host/control changes that race with result settlement are serialized against the same membership/scenario boundary. An administrator cannot edit a sealed result to “fix” a friend's score; use an auditable invalidation if corruption is proven, without rewriting gameplay history invisibly.

## 15. Telegram, security, and privacy

### 15.1 Telegram launch and authentication

Use the official Mini App bridge and direct-link launch supported by Telegram [R01]. Example shape: `https://t.me/<configured_bot>?startapp=qh_<opaqueInvite>`. The exact bot name is deployment configuration, not an invented account. Keep the payload within current Telegram limits; the proposed base64url token is short. Neither `start_param`, `tgWebAppStartParam`, `chat_instance`, nor a room ID authenticates a person.

Send raw `Telegram.WebApp.initData` to the backend over HTTPS and validate it using the current official Telegram algorithm or a maintained, tested equivalent. Never trust `initDataUnsafe` for identity. Validate the correct bot/environment, signature/hash, duplicate fields and parse errors, constant-time verification where applicable, and `auth_date`. Do not mix the bot-token HMAC and third-party Ed25519 procedures; their canonical strings differ. The implementation must include fixtures for its chosen official verification path [R01].

Application policy: accept fresh launch data at session bootstrap within five minutes, with at most 30 seconds tolerated future clock skew; this freshness window is a product security setting, not a Telegram-mandated number. After bootstrap, issue a one-hour bounded application session with revocation and idle cleanup. Do not require fresh Telegram launch data on every round.

Prefer secure HttpOnly cookies on the app's origin. Where embedded-client cookie restrictions prevent this, use a short-lived in-memory application bearer token with no localStorage persistence, and a single-use 30-second WebSocket ticket acquired over authenticated HTTPS. Authenticate the socket in its first message within five seconds; do not put reusable session credentials, raw initData, or invite tokens in logged socket URLs. Reopening from Telegram is the fallback when both session recovery and valid launch data are unavailable.

For cookie sessions, configure the SameSite behavior appropriate to the actual embedded deployment, Secure/HttpOnly flags, strict Origin/CORS allowlists, and anti-CSRF validation on mutations. Test Telegram Web as well as native WebViews; do not assume third-party cookies always work. For WebSockets, verify Origin where provided and authenticate every subscription/command independently of mere connection establishment.

Use `ready()` after the interactive shell is ready; request normal expansion where supported. Feature-detect fullscreen, haptics, safe areas, sharing, and theme features. Telegram feature failure cannot prevent joining/playing the basic game.

### 15.2 Invitations and membership

- Generate invite secrets with at least 128 bits of cryptographic randomness, encoded safely. Store only a hash and version/expiry; compare securely.
- A token authorizes an eligible authenticated join attempt, not ownership of a seat, access to hidden state, or a permanent bypass of blocking.
- Join/start/rematch atomically check capacity, room phase, expiry/revocation, membership, removal status, and pairwise blocks. Concurrent joins cannot exceed capacity.
- A revoked invite does not invalidate a legitimate existing participant's reconnect session by itself. A removed member or conflicting safety block has a separate membership restriction.
- No invite is indexed publicly. Do not embed it in screenshots, telemetry, analytics query strings, Open Graph previews, or external image-generation prompts.
- Link forwarding cannot be prevented. Make revocation easy and state its limits clearly.

### 15.3 Block/report rules

Before joining, starting, or rematching, reject any pair of humans where either has blocked the other, checking all members rather than only the host. Invite possession cannot override a block. Return generic “You cannot join this room” feedback without revealing who blocked whom or another user's block list.

During an active scenario, offer **Block and leave** as an explicit atomic safety action. Record the directed block and remove the requester under ordinary departure/bot-consent rules; do not silently eject the other person, reveal either job, or rewrite the team's current round. An existing reconnect that would recreate a prohibited pairing is rejected with generic room-unavailable feedback. Reporting alone neither leaves the room nor creates a block.

Report categories: harassment outside the game's signals, inappropriate display name, suspected technical manipulation, payment issue, and other product problem. Use curated categories in-game; an optional support detail form is separate from gameplay chat, maximum 1000 characters, with a warning not to include payment secrets or private unrelated messages. No user-generated room message feed is created.

Reports attach scenario ID, reporter ID, category, time, relevant public round references, and client diagnostic version. They do not automatically upload private cards, Telegram conversations, microphone data, or full device logs. The operator needs a real review queue, access control, acknowledgment, and escalation process before public launch. Never invent a staffed support address or claim a human will respond within an unresourced SLA.

### 15.4 Attack and abuse controls

| Threat | Required defense |
|---|---|
| Forged identity / replayed launch data | Verified initData, bounded sessions, freshness policy, environment binding, rate limits |
| Guessing rooms / IDOR | Membership check on every read, mutation, socket subscription, resync, and report reference |
| Private-data leak | Allowlist DTOs, no client deck bundles, per-recipient projection, redacted logs, malicious-client tests |
| Late/duplicate actions | Authoritative admission clock, phase/round/epoch checks, command IDs and sequence monotonicity |
| Double resolution/rewards | Unique constraints, transactional state/outbox, idempotent consumers |
| Malicious host | Lobby-only powers; no hidden-state or resolver privileges |
| Invite brute force / floods | Random secrets, generic errors, per-user/IP limits, token rotation |
| XSS through names/reports | Treat user text as text; length limits, no raw HTML, output escaping and CSP |
| Cross-site command injection | Origin/CORS/CSRF/socket authentication, no wildcard credentialed CORS |
| Bot omniscience | Runtime restricted view and tests; no full aggregate passed by reference |
| Payment forgery | Verified Bot API updates, immutable order amount/currency, unique charge IDs |
| Supply-chain/art leakage | Pinned dependencies, license/provenance record, no secrets or customer data in MCP prompts |

Initial adjustable service limits: create room 5/minute/user; join attempts 20/minute/user with bounded IP fallback; signals 4/second with burst 8; choose drafts 10/second; commits 4/second to permit safe retries; reports 5/hour/user; WebSocket payload 8 KB maximum; at most two active sockets per user with only one active seat controller. These are anti-abuse limits, not a maximum number of signal replacements in a round. At least a third ordinary replacement is accepted when below the rate window, as the SRS requires.

Use a conservative CSP allowing the configured application assets/API and required official Telegram bridge only; no arbitrary eval or remote art scripts. Do not log full request bodies on authentication, invite, private-seat, or payment endpoints. Security diagnostics use redacted structured codes.

### 15.5 Privacy, retention, and consent defaults

Collect only data needed for play, safety, opted-in boards, support, and optional purchases. Use internal pseudonymous IDs in telemetry. Names are trimmed to 32 grapheme clusters, normalized safely, rendered as text, and replaceable with a neutral “Captain A” display. Never require a profile photo.

Proposed operational retention defaults, subject to the operator's actual legal/privacy policy before production:

| Data class | Default |
|---|---|
| Raw initData/session secrets | Never application-logged; session material expires/revokes within its defined lifetime |
| Live private jobs and intents | Keep only for active/recoverable scenario; delete within 24 hours after terminal closure, including derived private event payloads |
| Public round diagnostic records | 7 days; reports may retain specifically necessary public evidence longer |
| Aggregated pseudonymous product metrics | 90 days rolling, then aggregate without user linkage or delete |
| User's result/mastery/settings | Until account deletion or the operator's disclosed inactivity policy |
| Reports | 90 days after closure unless documented legal/safety need requires otherwise |
| Payment/refund records | Operator/legal policy, not an arbitrary game timer; minimize stored fields |
| Backups | 30-day rolling maximum by default; deletion request is honored in live systems and ages out of backups |

No blanket claim of legal compliance is made by this table. Public launch requires a real privacy notice, data-controller/support contact, deletion workflow, applicable age/consent decision, and a documented lawful retention policy. The game is non-gambling and has no adult content, but Telegram account access alone is not proof that every user is an adult. Do not add a date-of-birth collection field without a justified requirement.

Support/admin access to private operational state is exceptional, role-scoped, audited, and never exposed to the host or a public dashboard. Do not send production user data to image/audio generators. Test and evidence captures use synthetic accounts and synthetic jobs.

## 16. Optional commerce and platform adapters

### 16.1 Single cosmetic product

Product ID `qh.harbor_flag_set.v1`, proposed one-time price **75 Telegram Stars**, six flag patterns plus corresponding result-border patterns. Default flag is always free. All recipients retain stable ship letter/outline/shape visibility. The product supplies no route priority, job advantage, extra signal, extra round, conflict shield, bot skill, delivery multiplier, mastery acceleration, or leaderboard benefit.

The price remains a proposal inherited from the source. The implementation uses a server-owned product catalog so an authorized price decision does not require editing client constants. The display and invoice must agree exactly. Do not A/B test individualized prices or create false sale countdowns.

No store interstitial during planning or after failure. Appearance is reachable from home/lobby/recap. Owned flags can be equipped outside a live round; freeze appearance for the current scenario to avoid identity flicker. A refund-triggered fallback may apply at the next round boundary for safety while revoking ownership immediately server-side.

### 16.2 Stars flow

Digital goods sold inside Telegram use Stars (`XTR`), not a card checkout or TON transfer [R02]. The service creates an order bound to verified user/product/amount/currency, creates the official invoice, validates pre-checkout promptly within Telegram's documented 10-second response window, and grants entitlement only on verified server-side `successful_payment`. The Mini App invoice-close callback is UI feedback, not proof of payment [R02–R03].

Store the Telegram payment charge ID uniquely for idempotence/refunds. Duplicate webhooks do not grant multiple entitlements. Validate user, product payload, amount, currency, and environment against the immutable order. A purchase already owned should be rejected before invoicing or handled by an explicit duplicate-purchase refund policy; do not accept money for an unusable duplicate.

Implement `pending → paid → refunded` with failed/cancelled states as appropriate. Pending entitlement is not equipable. On verified refund, revoke only the buyer's product entitlement and fall back to their free flag/border; keep team scores, delivery history, and other players' cosmetics intact. Refund requests use the authorized Bot API flow, not a client-supplied “refunded” flag. Support `/paysupport` and a real in-app payment-support route before enabling purchases [R02–R03].

Use Telegram's separate test environment for payment testing, with isolated orders/users/secrets and prominent test labels. No verification step in this specification authorizes charging a real user.

### 16.3 Wallet boundaries

If the host platform already offers optional TON association, expose a link to its approved association flow outside gameplay and clarify that playing/Stars purchases do not require it. No game-owned wallet, on-chain ship, signing request, transaction, token distribution, seed phrase handling, or TON payment flow is in scope. In standalone mode omit wallet UI entirely.

### 16.4 Platform adapter contract

| Adapter | Minimum responsibilities | Standalone behavior |
|---|---|---|
| Identity | Verified subject, application session, locale | Telegram validation service in section 15 |
| Profile/settings | Safe display label and accessibility/audio preferences | Local service records, no social graph |
| Rooms | Membership, invites, host/admin policy, presence | Implement the documented private-room service |
| Results/mastery | Idempotent team result and eligible individual progress | Store in game database with privacy/mode partitions |
| Entitlements/Stars | Catalog, verified purchase/refund, ownership lookup | Disabled by default; enable only with production configuration |
| Moderation/support | Blocks, reports, operator review, deletion/support links | Minimal auditable service/queue plus actual operator process |
| Wallet | Optional association capability only | No UI and no implementation |
| Analytics | Consent-aware pseudonymous events | Minimal configured collector or disabled adapter |

Adapter absence must have explicit behavior and tests. A disabled optional adapter returns a typed unavailable capability, not a successful fake response. Missing mandatory identity/room/persistence/safety services are implementation work, not optional production polish.

## 17. Performance, persistence, deployment, and operations

### 17.1 Measurable budgets

| Metric | Target / measurement context |
|---|---|
| Authoritative resolution latency | p95 ≤500 ms from the server deadline to committed result under the declared load; includes lock/compute/write, excludes client network and the 1.5-second animation |
| Standard action acknowledgement | p95 ≤300 ms server-side at declared load; record end-to-end separately |
| Load baseline | 500 simultaneous four-seat rooms / 2000 connected clients; realistic signal/commit bursts, synchronized deadlines, and reconnect spikes |
| Client cold interactive shell | Target ≤3 s on representative mid-tier Android over 10 Mbps/100 ms RTT; measure, do not invent a Lighthouse score |
| Initial compressed JS/CSS | ≤450 KB combined target, excluding deferred optional assets |
| Initial route-critical transfer | ≤1.5 MB including shell/font/current map/boats; defer audio and other maps |
| Per-session visual preload | Current map only; all ten maps are not decoded simultaneously |
| Visual catalog | Target ≤6 MB compressed on disk for runtime art, excluding dynamically generated share cards and source masters |
| Audio | ≤2.5 MB downloaded for one codec set; eager short cues ≤500 KB |
| Live socket traffic | Typical room ≤25 KB/s total; owner-private data sent only on change/resync |
| Animation | 60 fps target on a reference mid-tier device; consistent ≥30 fps fallback under load, no timer input starvation |
| Mobile memory | Target ≤150 MB measured application working/heap allocation where tooling can distinguish it; decoded textures/audio explicitly bounded |
| Reconnect | p95 ≤2 s to usable current snapshot on a healthy regional network after session authentication |

Declare exact device models, Telegram versions, browser engine, hardware/server size, region, dataset, codec, warm/cold cache, and test command with reported results. The load baseline is a proposed release test, not demonstrated capacity or a guarantee at arbitrary scale. If infrastructure supports less, publish the measured safe cap and admission policy rather than ignoring the p95 requirement.

Idle rooms use no render loop beyond necessary countdown updates; draw Canvas only on state/motion frames. Dispose images/audio when leaving; cap decoded atlas sizes and device-pixel ratio at 2 for the chart unless measured quality warrants more. Avoid per-frame React updates for every boat; time interpolation stays in the rendering layer.

### 17.2 Persistence and deployment essentials

Provide versioned migrations, reproducible installation/build scripts, a documented environment template with **names only**, and health/readiness endpoints. Expected secret/config names include `DATABASE_URL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_BOT_USERNAME`, application/session secret, official allowed origins, webhook secret, public app URL, optional Stars-enabled flag, and operator support/privacy URLs. Never commit actual values.

Production uses HTTPS/WSS, a stable configured origin, encrypted database transport where supported, backups, dependency/art manifests, and separate development/staging/production identities. HTTP health checks expose no private room state or configuration secrets. Readiness verifies required database/migration availability; it does not declare visual/UI correctness.

Deploy with graceful drain: stop accepting new rooms, keep active scenarios on their pinned rules/content version, let short sessions settle, then rotate the service. If hot restarts are needed, resume from persisted phase/deadline/intent data. Do not deploy incompatible resolver/content code into an active scenario without keeping its previous version available.

The client and server negotiate protocol/content versions. On incompatible client version, provide a safe refresh/reopen instruction; do not let it submit partially understood moves. Static assets have content hashes and immutable cache headers; private game snapshots do not.

### 17.3 Operations and alerting

Monitor due-but-unresolved rounds, resolution p95/p99, duplicate-effect violations, failed outbox publication, command rejection rates by typed code, reconnect failures, all-humans-abandoned rooms, private-projection errors, database pressure, and payment/refund mismatches if enabled.

Initial alerts: any duplicate score/delivery effect; any unauthorized private field in a production schema check; unresolved round older than 2 seconds sustained for 1 minute; resolution p95 above 500 ms for 5 minutes at or below declared load; database write failure; and payment paid-without-entitlement beyond 60 seconds. Page only an actually configured operator; do not create decorative “alerts” that nobody receives.

Support should be able to identify a scenario from a short opaque support code, inspect public round outcomes, verify a user's own entitlement, invalidate a corrupt result with an audit trail, and issue authorized refunds. It should not need unrestricted production database exports or another player's private queue.

### 17.4 Failure policy

| Failure | Player behavior / operational response |
|---|---|
| Optional image/audio unavailable | Continue with neutral background/silent play; retry in background; critical identities/controls remain readable |
| Map graph/content hash invalid | Block starting that scenario, quarantine content version, offer another validated map |
| WebSocket lost | Show reconnecting, bounded exponential retry with jitter (0.5/1/2/4/8 seconds max), resync on success; deadlines continue |
| Duplicate event | Ignore by event/revision; no duplicate animation, score, job consumption, or reward |
| Database unavailable before commit | Do not acknowledge action as accepted; show sending/recovery; preserve honest deadline behavior |
| Database unavailable during resolution | Retry safe transaction; no speculative result broadcast; abort if not recoverable per section 4 |
| Corrupt persisted round state | Quarantine/abort, alert; no guessed resolution or score |
| Optional commerce down | Disable buying, retain verified owned cosmetics from authoritative entitlement cache policy; free play unaffected |
| Bot worker unavailable | Bot automatically waits through normal deadline; clearly retains Bot/Mixed identity; no privileged rescue |

## 18. Analytics and playtest plan

### 18.1 Minimal event taxonomy

Analytics are for understanding comprehension and group retention, not surveilling private strategy. Default payload fields: schema version, pseudonymous session/scenario identifiers where necessary, event time, client build, locale, device class, map ID, seat count, mode, and event-specific **non-private** fields.

| Event | Allowed detail | Purpose |
|---|---|---|
| `launch_viewed` | Entry type: home/invite/practice | Distinguish solo arrivals from group invitations |
| `lobby_joined` / `lobby_left` | Room wait-time bucket, roster count | Empty-lobby friction |
| `tutorial_step_completed` | Step ID and duration bucket | Identify misunderstood teaching |
| `scenario_started` | Map/count/mode/version | Play funnel denominator |
| `round_summary` | Round, delivery delta, congestion delta, count of committed human seats | Round pressure without route/preferences |
| `signal_used` | Semantic ID and replacement count bucket, not target node/sequence trace | Check whether the mechanic is discovered |
| `control_changed` | Human↔bot and reason category | Recovery quality and honest mode split |
| `reconnect_outcome` | Duration bucket, success/error code | Network resilience |
| `scenario_ended` | Outcome/reason, final aggregate counters, round, eligibility mode | Balance and completion |
| `rematch_started` | Same/next map, group-size bucket | Voluntary replay signal |
| `settings_accessibility_changed` | Setting name only, no disability inference | Check discoverability; optional consent-aware collection |
| `report_submitted` | Category and support code reference, not free-text body in analytics | Safety monitoring |

Never send raw initData, usernames, invite tokens, wallet address, private job/draft/intent, private deck selector, exact preference attribution, or report text to an analytics vendor. Public route histories needed for support live in a separate restricted diagnostic store, not marketing analytics. Do not treat a device accessibility setting as a medical attribute.

### 18.2 Observed group gate from the source

Test **six independent groups of three real people**. At least **four groups must voluntarily rematch** and be able to name **one signal that changed a route decision**. Do not prompt “Would you like to help us by playing again?” and count polite compliance as voluntary rematch. Ask the signal question after play without teaching the expected answer.

Before expansion, also observe at least two two-person groups, two four-person groups, two solo-practice newcomers, one cross-language group, and users testing the node-list/reduced-motion paths. These additional sessions are quality coverage, not a claim of statistically representative research.

### 18.3 Questions and tuning triggers

| Observe / ask | Problem indicator | Allowed response |
|---|---|---|
| Can a newcomer distinguish route selection, signal, and Commit? | More than one participant per test group repeatedly assumes a signal commits a route | Change labels/teaching, not hidden rules |
| Does the private bonus create a useful choice? | Players ignore the second valid berth or think preference is mandatory | Improve card wording; review reachable alternatives |
| Why did you Wait? | Most waits are confusion or a permanent choke, not coordination | Improve legal-move feedback/map deck; revalidate content |
| What caused congestion? | Players blame a named person rather than understand contested nodes | Improve node-based recap and examples |
| Who contributed? | Same two players perform almost all meaningful moves in 4-seat sessions | Revise entry/deck pressure; preserve validated goal |
| Did a bot seem human or omniscient? | Any uncertainty about Bot label; behavior tracks hidden moves | Fix labels or restricted-view policy; security blocker if leakage |
| Was 20 seconds usable? | Frequent missed commits after comprehension | Simplify controls/legibility; timing changes require explicit rules revision |
| Did anyone need to leave Telegram and coordinate externally? | Most groups bypass signals immediately | Investigate communication design; do not claim financial/silent-play integrity |

Report per-map/count wins, congestion causes, human commit rate, intentional Wait rate, timeout rate, and per-seat delivery distribution as **internal design research**, not player blame scores. A solver-perfect route does not imply good human balance. If the core qualitative gate fails, improve communication and legibility before commissioning more maps, an economy, or public matchmaking.

## 19. Verification matrix and release gates

### 19.1 Verification rules

The tests below specify work for the future implementation. They are **not** claimed as passing application tests in this documentation delivery. Use synthetic users and isolated databases/seeds. Never charge real Stars, publish real player identities, or call a production room “test data.”

Tests must exercise the public service interfaces and actual per-recipient payloads in addition to pure functions. A unit test of a DTO helper is insufficient proof that a reconnect route never returns the full room. A screenshot is insufficient proof of hidden-state security. A generated certificate is insufficient proof of accessible controls.

Required automated layers:

1. Pure resolver/score/terminal unit and property tests.
2. Content schema, graph reachability, all 60 certificate replays, preference invariance, queue bounds.
3. Database-backed command/admission/membership/idempotence tests with controlled clocks.
4. Multi-user transport and recovery tests, including malicious reads and out-of-order messages.
5. Browser tests with separate authenticated contexts; EN and RU together; keyboard/list mode; bot labels.
6. Build/asset/license/privacy scans and conditional Stars test-environment flows.
7. Declared-load tests and real-device Telegram smoke tests.

### 19.2 Direct source traceability

| Source requirement | Master sections | Required evidence |
|---|---|---|
| G04-F01 private rooms / practice | 2, 4, 6, 8, 15 | Join/expiry/revoke/capacity/readiness tests; real labeled solo-practice flow |
| G04-F02 owner-private jobs / sealed intents | 3, 5, 14, 15 | Serialized REST/WS/reconnect/error inspection; bundle scan; adversarial clients |
| G04-F03 one replaceable signal / commit | 3, 8, 14 | Replacement, packet order, lock, third replacement, timeout tests |
| G04-F04 deterministic resolution | 3, 14, 17 | Fixtures, permutation properties, unique round result, multi-client same revision |
| G04-F05 deadline / missing Wait / bot offer | 4, 6, 14 | Boundary-time tests, missed-vs-committed-Wait, consented next-round activation |
| G04-F06 boundary reclaim / Mixed / abandonment | 4, 7, 14 | Ownership-epoch race, Mixed latch, grace/provisional result/close tests |
| G04-F07 host transfer without priority | 4, 15 | Oldest-connected-human transfer and privilege-negative tests |
| G04-F08 explanatory recap / rematch / safety | 7, 8, 12, 15 | Both outcomes, non-blaming RU copy, free report/block/exit, rematch state reset |
| Source content / mastery / NFRs | 5, 7, 17–18 | 60 certificates, eligibility/idempotence tests, measured p95, observed group gate |
| Source optional flags / wallet | 10, 16 | Cosmetic invariance, verified Stars/refund, absent-wallet playable path |

### 19.3 Original acceptance tests, preserved

| ID | Given / expected result |
|---|---|
| G04-A01 | A/B both target empty J: both stay; congestion increases by exactly one. |
| G04-A02 | A/B exchange starting nodes: both stay and +1. An uncontested three-cycle rotates with +0. |
| G04-A03 | Inspect a different room member's permitted response before resolution: no private pair/preference, pending route, or sealed move appears. |
| G04-A04 | Six deliveries, four preferred, two congestion → 132 points for every participant, persisted once. |
| G04-A05 | One missed round is Wait; an accepted replacement activates only next boundary with Bot/Mixed labels. Reclaim never restores Human-only for that scenario. |
| G04-A06 | Revoke leaked invite and depart the host: old link fails, oldest connected human hosts, private jobs remain private. |
| G04-A07 | A third ordinary pre-commit signal replacement is allowed; at most one signal remains. Late commit is rejected with permitted current state. |
| G04-A08 | Russian recap names affected nodes without shaming individuals; exit, reporting, blocking, and practice remain usable with zero Stars. |

### 19.4 Additional rules and content cases

| ID | Test | Expected result |
|---|---|---|
| QH-R01 | Single mover targets waiting occupant | No move, no congestion |
| QH-R02 | Two movers target waiting occupant | One contested-node point, all relevant ships stay |
| QH-R03 | Three ships target same empty berth | One point, no delivery, no job consumed |
| QH-R04 | Same-destination conflict overlaps a potential swap | Conflict eliminated first; no duplicate swap charge |
| QH-R05 | A chain ends at empty node | All chain ships advance simultaneously |
| QH-R06 | A chain ends at failed/waiting occupant | Entire dependent chain stays; no extra congestion |
| QH-R07 | Three/four-cycle with no contention | Simultaneous rotation, no congestion |
| QH-R08 | Extra mover contests one node in a cycle | Contention breaks cycle; dependent ships remain; correct one-node charge |
| QH-R09 | Occupant delivers while another ship enters its old node | Both valid movements succeed; delivery counted once |
| QH-R10 | Delivery and respawn phase inspection | Removed after resolution, next job at own entry next planning, no terminal respawn |
| QH-R11 | Wrong berth or another ship's entry forged in API | Rejected without exposing anyone else's job or changing own commit |
| QH-R12 | Selected route, no commit | Automatic Wait; draft destination stays private |
| QH-R13 | Congestion reaches 5 while delivery target is reached | Failure; score recap shown; no board/mastery |
| QH-R14 | Eight-round boundary below/at six deliveries | Below six fails; at/above six succeeds unless congestion limit reached |
| QH-R15 | Multiple deliveries overshoot six | All arrivals and preference bonuses counted; no cap at six/150 |
| QH-R16 | Score clamps on extreme valid integer fixture | `max(0, formula)`; no negative displayed score |
| QH-R17 | Permute participant array and accepted-action insertion order | Identical result/counters after mapping stable seat IDs |
| QH-R18 | Change signals, host, flag ownership, network order with same accepted intents | Resolver result unchanged |
| QH-R19 | All 30 public graph variants | Exactly nine nodes, proper types, no entry inbound edges, no self-edge, reachable berths/junctions |
| QH-R20 | All 20 deck rows × three counts | Four legal jobs per active seat; both alternatives reachable |
| QH-R21 | Replay all 60 embedded certificates using production resolver | Six deliveries, zero congestion, 4–7 rounds, correct job progression |
| QH-R22 | Change only private preferred bits | Movement/outcome unchanged; score changes exactly by five per changed delivered preference |
| QH-R23 | Longest legal per-seat delivery cadence | No required fifth job/queue wrap within eight rounds |
| QH-R24 | Reconnect/rematch/change cosmetic | Running preference assignment stable; new scenario has fresh private bits and separate identity |

Add property-based random legal states and graphs to test occupancy uniqueness, conservation of ships except delivery/removal, no double consumption, nonnegative monotonic counters, and no mutation of input snapshots. Synthetic graph fixtures may cover resolver cases absent from a particular authored map; label them as such.

### 19.5 Time, room, control, and persistence cases

| ID | Test | Expected result |
|---|---|---|
| QH-S01 | Admit commit just before / exactly at deadline | Before accepted; at/after rejected; client clock does not override |
| QH-S02 | Everyone commits early | Published 20-second deadline remains unchanged |
| QH-S03 | Reduced-motion and animated clients | Same next-round start/deadline and revision |
| QH-S04 | Delayed old signal follows new signal | Old sequence cannot overwrite; at most one current signal |
| QH-S05 | Choose and signal packets reorder around atomic Commit | Final commit payload wins if admitted; no later packet changes it |
| QH-S06 | Retry accepted command / submit different second commit | Original acknowledgement returned / second mutation rejected |
| QH-S07 | Old scenario/round/epoch command after rematch/reclaim | No effect on current scenario |
| QH-S08 | Two concurrent joins for one slot | Exactly one eligible join; never capacity overflow |
| QH-S09 | Start races readiness/map/roster change | Only a coherent current all-ready configuration starts |
| QH-S10 | STARTING acknowledgement missing | Return to lobby after 10 seconds; no hidden timed round or silent bot |
| QH-S11 | Host disconnects | Oldest connected human transfers; no bot host or gameplay priority |
| QH-S12 | Commit Wait then disconnect | Not a missed round; accepted Wait preserved |
| QH-S13 | Signal/draft but no commitment | Missed round; auto-Wait; replacement offer follows consent rules |
| QH-S14 | Disconnected player without pre-consent; host tries accepting for them | No automatic bot; host request rejected; their seat continues waiting |
| QH-S15 | Owner resync/reclaim while bot acts; human-only reconnect; requester leaves/blocks before boundary | Owner may read/queue but not move yet; eligible reclaim wins at boundary, old bot then rejected; ineligible/absent requester never activated |
| QH-S16 | Bot activates but only Waits, then human reclaims | Scenario remains Mixed |
| QH-S17 | All human sockets absent briefly | 30-second grace, deadlines continue, authorized recovery |
| QH-S18 | Terminal result during all-human absence | Provisional only; finalize on timely human return or abandon without reward |
| QH-S19 | Last human explicitly leaves | Immediate no-reward closure; no autonomous bot completion |
| QH-S20 | Leave after finalized recap | Existing result/mastery not revoked |
| QH-S21 | Crash after commit persistence, before acknowledgement | Retry finds same accepted commitment; no new move |
| QH-S22 | Crash after round persistence, before broadcast | Same result is republished; no double delivery/congestion |
| QH-S23 | Two resolver workers / duplicate outbox deliveries | One durable game effect and idempotent client application |
| QH-S24 | Database failure / unrecoverable integrity error | Honest recovery or no-penalty abort; never speculative score |
| QH-S25 | Revoked invite with existing valid reconnect | Invite cannot admit a newcomer; original authorized member can reconnect unless separately restricted |
| QH-S26 | No-human grace expiry racing reconnect/finalize | One serialized terminal settlement; no reward plus abandonment contradiction |

### 19.6 Privacy, safety, and commerce cases

| ID | Test | Expected result |
|---|---|---|
| QH-P01 | Compare two humans' REST/WS/resync/error payloads | Public part agrees; only own current private envelope exists |
| QH-P02 | Scan production client JS/assets/source maps/help/replay exports | No queue templates, private deck selector/seed, witness plan, or private runtime cache |
| QH-P03 | Inspect preferred/non-preferred delivery media/events | Identical public presentation; only recap aggregate exposes bonus total |
| QH-P04 | Malicious bot access; vary other jobs/sealed intents while holding its permitted view, seed, and decision time fixed | Private access unavailable; no backdoor solver; proposed move and signal remain identical |
| QH-P05 | Forged/expired/wrong-environment Telegram initData | Authentication rejected; no user created from unsafe fields |
| QH-P06 | Guess room/user/seat IDs or subscribe without membership | Generic denied response, no existence/private detail leak |
| QH-P07 | Block either direction, then join/start/rematch concurrently | Prohibited pairing cannot start; blocker's identity not revealed |
| QH-P08 | Block and leave during play | Requester leaves, block persists, others continue under normal rules |
| QH-P09 | Script/HTML in display name/report | Rendered safely as text; no execution/layout takeover |
| QH-P10 | Log and telemetry capture under error/load | No tokens, raw initData, private fields, invite secrets, or report text |
| QH-P11 | Delete account / retention expiry | Defined live data deletion, board anonymization/removal, backup aging behavior |
| QH-P12 | Share result and invite separately | Share card has only safe aggregates; invite token never appears in recap art |
| QH-C01 | Play/tutorial/safety with no wallet, zero Stars, commerce disabled | Complete free game path; no fake checkout or wallet requirement |
| QH-C02 | Forged client invoice-success callback | No entitlement without verified successful payment |
| QH-C03 | Duplicate verified payment / wrong amount or currency | One entitlement / reject mismatch and alert safely |
| QH-C04 | Verified refund | Only buyer's flags/border revert; scores and other cosmetics unchanged |
| QH-C05 | Cosmetic set equipped across all ship IDs | Same IDs, outlines, hitboxes, legal actions, scoring, and bot behavior |
| QH-C06 | Pending/cancelled/failed/test payment | Correct localized state; no unintended real charge or entitlement |

### 19.7 UX, localization, assets, and accessibility cases

| ID | Test | Expected result |
|---|---|---|
| QH-U01 | 390 px live screen with all nine nodes and four signals on one node | Private card below chart; labels/controls readable; signal stack inspectable |
| QH-U02 | 320 px width / short viewport / 200% text | List/reflow fully playable; no covered Commit/private details or horizontal trap |
| QH-U03 | Keyboard-only and screen-reader node-list scenario | Select, signal/replace, Wait, Commit, recap, report, exit all possible |
| QH-U04 | EN/RU mixed-language room | Identical semantic signals and outcomes; all local copy translated |
| QH-U05 | Sound off, haptics off, reduced motion on | Same actionable information and phase timing |
| QH-U06 | Tap occupied adjacent node / invalid berth / non-adjacent node | Correct selection or explanatory rejection; no move auto-commit |
| QH-U07 | READY signal vs roster readiness vs committed state | Three meanings visually and linguistically distinct |
| QH-U08 | Failed/slow art, font, audio loading | Essential controls remain usable; no invisible labels or fake load percent |
| QH-U09 | Telegram safe-area change, keyboard, expansion/fullscreen failure, Back | Correct insets, preserved state, graceful optional-feature fallback |
| QH-U10 | Background/resume after missed round | Resync first, honest timeout/recovery message, no replayed audio/moves |
| QH-U11 | Preferred bonus wording and loss precedence teaching | Players see both valid alternatives and understand congestion-first |
| QH-U12 | Both failure recaps and success recap in Russian | Correct score/reason; no individual blame; no spending prerequisite |
| QH-U13 | Raster manifest inspection | All required final images present; no SVG substitute, watermark, accidental generated text, or missing provenance |
| QH-U14 | Audio offline render/decode/loop checks | No clipping, seam/click, autoplay surprise, unlicensed sample, or queued old cues |
| QH-U15 | Color contrast/shape/letter checks | Correct measured contrast and non-color identification; no cosmetic obscures identity |
| QH-U16 | Real Telegram Android, iOS, Desktop, Web smoke | Authentication, launch/invite, one scenario, reconnect, Back, audio opt-in, optional feature handling |

Browser automation is not a substitute for native Telegram iOS/Android WebView testing. Minimum manual coverage: one mid-tier Android phone, one smaller iPhone, one desktop Telegram client, Telegram Web, and keyboard/screen-reader coverage on a supported environment. Record actual versions at release rather than inventing version-specific results here.

### 19.8 Release gates

| Gate | Required artifact / exit condition |
|---|---|
| G0 — Specification baseline | This master, decision/conflict register, unavailable shared-platform inputs explicitly acknowledged |
| G1 — Rules truth | Pure rule tests and adversarial conflict fixtures pass; production certificate replay passes 60/60 |
| G2 — Service integrity | Database/clock/idempotence/reconnect/ownership tests pass; no direct private-state disclosure |
| G3 — Playable vertical slice | M01, real two-client room, guided move, complete recap/rematch, Bot labels, node-list path |
| G4 — Content and craft | All ten maps/decks, finalized raster assets/audio, EN/RU catalog, licenses, layout and interaction checks |
| G5 — Device and operations | Real Telegram smoke tests, measured load/p95, deployment/recovery/rollback/support readiness |
| G6 — Human experience | Source six-group gate met; additional count/accessibility/bot observations documented; critical confusion corrected |
| G7 — Conditional commerce | Only if enabled: verified Stars/refund tests, real support, catalog/entitlement integrity, no gameplay benefit |

No unresolved critical security, data-loss, double-effect, rules, or unplayable-accessibility defect may be waived by attractive art. A failed qualitative gate is a product revision signal, not something to hide behind automated pass counts.

## 20. Implementation sequence and agent handoff

### 20.1 Order of work

| Phase | Work | Exit evidence |
|---|---|---|
| 1. Read and reconcile | Read this document and any supplied platform SRS; list material conflicts/deployment-only dependencies | Scope stays bounded; optional features are explicitly flagged |
| 2. Rules/content foundation | Encode graphs/decks, pure resolver, score, terminal order, certificate parser/replay | Rules tests and 60/60 production replays; no client art needed yet |
| 3. Real room foundation | Telegram/session adapters, membership/invites, commands, persistence/outbox, filtered snapshots | Two isolated clients play/reconnect with correct privacy and timing |
| 4. Playable teaching slice | M01, real controls, tutorial, standard bot practice, results/rematch, accessibility list | A complete honest session, not only static screens |
| 5. Art/audio vertical slice | Produce reference assets, validate 390 px composition, synthesize/audio mix, implement motion/settings | One polished map with final-quality identity and no pending-route leak |
| 6. Full content/polish | Ten backplates, all variants/decks, full EN/RU, mastery/boards, all error/safety states | Asset/content inventories complete, responsive/device passes |
| 7. Conditional integration | Stars/entitlements if enabled; host-platform adapters; operational queue/support | Test-environment evidence, optional failures do not block free play |
| 8. Hardening | Security probes, race/fault/load tests, real Telegram checks, accessibility review | G1–G5 complete with actual evidence |
| 9. Human validation and release handoff | Run observed group sessions with operator help where necessary, correct issues, document remaining release dependencies | G6 and conditional G7 complete or explicitly blocked; no false “released” claim |

Do not generate all art before validating the board's decision geometry. Do not implement a store before private-state filtering and the core round loop. Do not turn the task into a platform rewrite or add excluded features because the core looks small.

### 20.2 Required implementation deliverables

- Source code for client/service/rules/content adapters with pinned dependency lockfile and reproducible setup/build/test commands.
- Versioned database migrations and an environment-variable template containing no secrets.
- Public graph/layout catalog and **server-only** authored deck/instantiation/witness artifacts, with content hashes.
- All required optimized raster assets and audio exports, plus source-generation/derivation records and preserved license notices.
- Complete English/Russian locale catalogs and accessible labels; no literal strings scattered through gameplay components.
- Automated rule/content/service/privacy/browser tests, including all preserved SRS acceptance IDs.
- A compact test report stating commands, versions, pass/fail totals, actual screenshots for appearance, interaction evidence for behavior, and what remains manual or blocked. Record a video only if requested or needed for an explicitly agreed walkthrough; never treat successful capture as proof by itself.
- Operational instructions for launch, migration, rollback, restart/recovery, content quarantine, privacy deletion, support, report review, and optional payment/refund handling.
- A finished-build inventory proving no required asset, content variant, error state, or safety path remains a mock.

This master stays the single normative design handoff. Implementation may create normal source/config/test/license artifacts and operational documentation; “one document” does not mean squeezing production code or legal license files into Markdown. Keep any changes to rules or scope in an explicit revision of this master rather than a contradictory side document.

### 20.3 Completion report template

The implementation agent's final report must answer:

1. **What is implemented?** Name the free gameplay, content, bot/recovery, EN/RU/accessibility, assets/audio, and any optional commerce state.
2. **What was verified?** List the actual test commands/results, 60 content cases, security/recovery evidence, device checks, and measured performance with conditions.
3. **Where can it be reviewed?** Provide the authorized build/preview or source-control link and safe current evidence; do not publish private room/user data.
4. **What is not yet verified or externally configured?** Examples: real bot provisioning, production domain, operator support details, native device access, human group recruitment, or Stars activation.
5. **Is it implementation-complete, release-ready, or blocked?** Use the appropriate label. “The game is finished” is not acceptable if required art is placeholder, a browser cannot reconnect, or the group gate was never run.

### 20.4 Ready-to-use instruction for the future implementation agent

> Build Quiet Harbor according to this Master Game Development Specification. Preserve its deterministic simultaneous rules, private-state boundaries, nine-node map variants, exact authored content, and non-financial cooperative scope. Implement a real Telegram Mini App with a server-authoritative room loop, not a static demo. Use the supplied map/deck tables and replay every embedded certificate through your production resolver. Generate and curate the raster art through the available image-generation MCP, and produce the complete procedural or properly licensed audio set. Deliver responsive EN/RU screens, full node-list/keyboard access, labeled bots, reconnection and boundary control transfer, honest team recaps, and optional-only cosmetic commerce. Finish each verification gate with actual evidence. Do not ask for discretionary choices already decided here, but report material conflicts, missing authorization, external production configuration, or human/device verification you cannot honestly complete. Do not expose private authoring data in the public client or claim release readiness before the required gates are met.

## 21. Decision register and honest evidence ledger

### 21.1 Source-preserving additions

| Decision | Why it is specified here | Status |
|---|---|---|
| Wait is not a competing destination intent | Removes ambiguity between contention and stationary occupancy | Normative clarification, consistent with blocked-without-extra-congestion rule |
| Count-specific nine-node map variants | Makes space for dedicated entries and meaningful junctions at every count | New explicit content decision; 30 graphs under ten map families |
| Twenty fixed allowed-pair templates plus private preferred bits | Concrete content without publicly predictable live preference bonuses | New authored content and privacy decision |
| Four jobs per seat for this exact catalog | Two-move minimum delivery cadence proves queue sufficiency | Structurally bounded; revalidate if topology/timing changes |
| One atomic final move/signal commitment and command sequence | Removes packet reordering and partial-commit ambiguity | New protocol detail |
| Fixed 1.5-second resolution presentation; no early finish of planning | Preserves source's 1–2 seconds and shared deadline | Concrete timing choice |
| 4–6 minutes describes whole visit, not guaranteed active play | Source's 8×20-second rounds cannot by themselves last 4–6 minutes | Explicit expectation correction, not a timer change |
| Owner consent for takeover, default-off pre-consent | An “offered” bot must not mean silently impersonating a participant | Safety/control clarification |
| 30-second all-human transport grace and provisional settlement | Supports reconnect without unattended bot rewards | New recovery policy |
| Human-only/Mixed boards by count/map/version, opt-in names | Avoids incomparable scoring and unsolicited identity publication | New comparison/privacy detail |
| Separate labeled human/practice mastery tracks | Preserves human participation threshold while making practice honest | New progression presentation decision |
| Pairwise blocking and explicit block-and-leave | Required safety cannot be inferred from an absent platform SRS | New standalone safety policy |
| Raster-only asset delivery; programmatic chart geometry | Fulfills user's no-SVG art requirement without baking rules into images | User-driven production constraint |
| Complete procedural audio baseline, optional verified CC0 UI pack | Avoids unlicensed or missing sound dependencies | New production decision |
| Standalone adapter fallback; optional Stars/wallet boundaries | Shared platform specification/configuration was not supplied | Dependency containment, not a marketplace implementation |

These additions should be reviewed as product decisions before a production baseline is frozen. They are explicit and implementable; they are not hidden claims that the original SRS already chose them.

### 21.2 What was actually done for this document

| Evidence | Status as of 15 September 2026 |
|---|---|
| Attached Quiet Harbor SRS read | Yes; full supplied file reviewed, including economy, recovery, acceptance tests, and damaged RU sample |
| Shared Platform SRS inspected | No; not supplied |
| Current Telegram Mini App / Stars documentation researched | Yes; authoritative pages consulted for launch/authentication, safe areas, optional capabilities, payment confirmation/refunds/support |
| Kenney source/license and Golos Text license researched | Yes; source/license pages checked; no claim that a particular audio file was auditioned |
| Ten maps / twenty deck families concretely authored | Yes; 30 explicit count graphs and exact queue tables included |
| Feasibility analysis | 60/60 certificates generated and independently replayed in temporary analysis; all six deliveries, zero congestion, 4–7 rounds |
| Preference-profile analysis | 3840 delivered-preference profiles considered; structural movement invariance explained; future profiles not exhaustively enumerated |
| Graph distinctness/reachability | Thirty nine-node variants checked; ten non-isomorphic graphs per count |
| Game application, backend, deployment | Not developed; intentionally outside this documentation task |
| Final art generated or sounds auditioned/mixed | No; complete production briefs/recipes and acceptance gates supplied |
| UI / Telegram / accessibility / load testing | Not performed on a game; no implementation exists in this task |
| Observed human groups and market demand | Not validated; explicit future release gates, not assumed evidence |

Documentation analysis scripts and logs are not the game and are not needed to interpret this handoff. All normative content and all 60 solution traces are embedded here. The future implementation must create its own durable tests against its actual service/resolver, rather than treating this document's analysis as application certification.

### 21.3 External production dependencies, with safe defaults

| Dependency | Safe implementation default | When human/operator input is unavoidable |
|---|---|---|
| Missing shared Platform SRS | Use stated standalone adapter boundaries | Before claiming marketplace integration or shared-suite compliance |
| Bot identity/token and official app URL | Environment configuration; explicit development auth only in isolated non-production mode | Provisioning a real Telegram bot/domain and deploying secrets |
| Production hosting/load budget | Reproducible local/staging service and measured capacity | Selecting/paying for production infrastructure |
| Privacy/support/controller identity and age policy | No invented legal text/contact; implement settings/support/deletion surfaces | Before public collection/commerce launch |
| Stars enablement and final price approval | Disabled real purchases, free play complete | Before enabling the proposed 75-Star product |
| Optional TON association | Absent in standalone game | Only if an approved host-platform capability is supplied |
| Final visual reference from a design AI | Use this coherent art direction now; keep tokens/assets replaceable | If the owner later supplies a replacement visual direction |
| Real-device/human-group access | Automated/browser/content tests plus explicit unverified list | Native Telegram smoke tests and the six-group qualitative gate |

No production dependency authorizes the agent to fabricate people, legal approvals, support availability, actual purchases, performance numbers, or finished artwork.

## 22. Sources and design-only handoff brief

### 22.1 Source register

Sources were consulted on **15 September 2026**. External APIs and source archives may change; the implementation agent must recheck the relevant official page when integrating, pin acquired files/dependencies, and preserve license evidence. These sources support specific technical/licensing/accessibility statements, not game demand or guaranteed commercial success.

| ID | Source | Used for / limitation |
|---|---|---|
| R00 | User-supplied `04_Quiet_Harbor_SRS.md`, v1.0, 8 September 2026 | Primary concept, mechanics, scope, acceptance tests; references to missing shared platform material are not resolved here |
| R01 | [Telegram Mini Apps](https://core.telegram.org/bots/webapps) | Official initData validation, direct links, lifecycle, viewport/safe areas, feature-detected capabilities |
| R02 | [Telegram Stars payments for digital goods](https://core.telegram.org/bots/payments-stars) | XTR requirement, confirmed server payment, test environment, refunds, `/paysupport` |
| R03 | [Telegram Bot API](https://core.telegram.org/bots/api) | Invoice/pre-checkout/successful-payment/refund method contracts; use Bot API, not similarly named MTProto/TDLib methods |
| R04 | [Kenney Interface Sounds](https://kenney.nl/assets/interface-sounds) | Exact optional UI sound-pack acquisition page; individual selections still require audition and provenance |
| R05 | [Kenney support / licensing](https://kenney.nl/support) | Asset-page CC0 statement and optional attribution; keep included license file |
| R05b | [Kenney Interface Sounds on OpenGameArt](https://opengameart.org/content/interface-sounds) | Upstream pack listing, CC0 and 100 OGG files; not permission to assume every OpenGameArt file has the same license |
| R06 | [Golos Text project](https://github.com/googlefonts/golos-text/) and [OFL license](https://github.com/googlefonts/golos-text/blob/main/OFL.txt) | Font origin, variable family, SIL OFL redistribution conditions; preserve copyright/license and validate glyph subset |
| R07 | [MDN autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay) | User-gesture/autoplay restrictions and graceful silent fallback |
| R08 | [MDN Web Audio best practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices) and [AudioContext.resume](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/resume) | File/generated audio choices, resource handling, resuming suspended audio |
| R09 | [Freesound FAQ / licenses](https://freesound.org/help/faq/) | Item-specific license warning; no Freesound item is pre-approved or required here |
| R10 | [W3C WCAG 2.2: Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html) | Timing accommodation and real-time/essential exceptions; no automatic conformance claim |
| R11 | [W3C WCAG 2.2: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | AA minimum versus the game's larger 44 px target |
| R12 | [W3C WCAG 2.2: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) | Text contrast targets; actual implemented combinations require measurement |

No external reference game artwork, commercial soundtrack, named artist style, or unverified asset URL is licensed by inclusion in this document. The source's Hanabi comparison is a limited-information design reference, not an instruction to copy cards, branding, rules text, or art.

### 22.2 Copy-ready brief for a separate design AI

Use this brief when asking another design system to propose the game's appearance. For visual work, this brief plus sections 1 and 8–13 is enough; do not send private queue/certificate tables to an unnecessary third-party design service. The design system is not being asked to change mechanics or build the app.

> **Design a polished mobile-first Telegram Mini App game called Quiet Harbor / Тихая гавань.** It is a calm, cooperative harbor-routing puzzle for 2–4 friends, not a city builder, crypto dashboard, transport economy, or idle game. Players each control one small delivery boat on a nine-node directed chart. Everyone sees the boats and three receiving berths; each player alone sees a card with two permitted berths and one small preference bonus. Each round has 20 seconds, one selected move or Wait, one public NEED/YIELD/READY signal, and a separate Commit action. All ships move simultaneously after the deadline. Six deliveries wins unless congestion reaches five; at most eight rounds.
>
> **Emotion:** quiet attention, warm everyday life, the relief of making room for one another. Painted dusk-blue water, cream navigation lines, soft timber/paper, small lanterns, chunky clear boats with permanent A/B/C/D identity letters. Original gouache/cut-paper illustration, nearly top-down shallow perspective, generous negative space, subtle texture. Warm and premium without childish clutter, photorealistic ports, neon gradients, aggressive countdowns, casino effects, or gratuitous glassmorphism.
>
> **Core 390 px portrait screen:** compact header; readable round/delivery/congestion/timer rail; nine-node chart with visible direction arrows; private job card **below** the chart; clear signal selector and selected-route summary; large sticky Commit button above the Telegram safe area. Never overlay the private card on nodes. Never draw other players' hidden planned routes or translucent reservations. Occupied adjacent nodes may be legal; signals are advisory, not reserved routes. READY is not Commit. Use real interface typography for all labels and numbers, not generated text embedded into illustration.
>
> **Accessibility:** 44 px controls, stable letters and shapes as well as colors, a fully playable node-list version, visible keyboard focus, larger-text reflow, sound optional, reduced motion. Three signal silhouettes must be unmistakable: NEED triangular pennant, YIELD open ring, READY diamond. Use a Latin/Cyrillic-capable font such as Golos Text and show at least one Russian screen with expanded text.
>
> **Please deliver:** a small mood/style board; color/type/spacing tokens; high-fidelity 390×844 home, private lobby, active planning, committed state, post-resolution congestion, success recap, failure recap, bot/reconnect state, and settings screens; a compact 320 px node-list layout; one wider desktop layout; and a reusable component/asset sheet. The 390×844 frame is a reference, not proof of actual safe-area/device compatibility. Include default, pressed, focused, disabled, loading, and error states for interactive components. Keep graph/letters/controls separate from generated raster scenery. Supply raster image-production directions, not SVG game illustrations.
>
> **Boundaries:** no public matchmaking, chat composer, energy, paid moves, loot boxes, individual blame ranking, forced wallet, token balances, or advertisements. Bots must visibly say Bot. Commerce, if shown at all, is one optional 75-Star cosmetic flag set outside active play. Recaps name affected nodes and shared totals, never the “worst” player. The design may reinterpret visual composition, but must preserve the game's information boundaries, timing, rules, and accessible interaction model.

### 22.3 The quality bar in one sentence

**Quiet Harbor is complete when a new group can understand what is theirs to know, make a small meaningful request, watch the harbor resolve fairly, recover from an interruption, and want another shift—without the art, technology, or economy getting in the way.**

---

**End of Master Game Development Specification — QH-MGDS-1.0.**
