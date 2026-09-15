# Museum of Almost

A quiet 3D causal-repair puzzle game. Explore 24 miniature exhibits across Light, Air and Water; change one cause and see whether the whole world agrees.

## Run

Use Node.js 22.12+ (or a supported newer release).

```sh
npm ci
npm run dev
```

Vite serves the game on port 5173. The repository-owned Hoplite setup/run scripts use the same commands. No secrets, database, external art service or account is needed for this standalone edition.

```sh
npm test
npm run build
npm run preview
```

`dist/` is a static deployment artifact. Deep links use hashes, for example `/#/exhibit/W06`, so no application-specific server rewrite is required.

## Content

All 24 authored exhibits ship in `src/data/exhibits.json`. To regenerate from the owner-supplied master document:

```sh
python3 scripts/extract-content.py /path/to/Museum_of_Almost_Master_Game_Development_Specification.md
npm test
```

Tests exhaust 112 source configurations, 56 legal proposals and 27 accepted repairs, including both alternatives in L04, A05 and W06.

## Saved data and scope

Progress, settings and staged proposals are stored only in this browser under `museum-of-almost.save`. No payment is required; there are no advertisements, lives, countdowns or paid hints. Clearing local data clears the visitor card.

This is a playable **browser edition**, not a production Telegram release. See [implementation status and release gaps](docs/IMPLEMENTATION.md) for exact coverage, verification and remaining backend/platform/asset acceptance work.

## Browser verification

WebGL2 is required for 3D. The complete HTML object list remains playable without it. `agent-browser.json` enables software WebGL for GPU-less development browsers; it does not change the player's browser. On a workstation with working GPU acceleration that configuration is unnecessary.

3D models and CSS icons are authored in this repository. Lora and Nunito Sans are distributed through Fontsource under the SIL Open Font License; their license files are included in the dependency packages.
