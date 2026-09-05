# RempitMeter

A meter to evaluate your rempit-ism. Sixteen questions, one 3D mascot, one diagnosis.

Cloned from [KepamMeter](https://github.com/yusufsuhair/kepam-meter-web)'s stack and mechanics,
with a fresh rempit-themed question bank and its own mascot/song.

Next.js 16 · React 19 · Tailwind v4 · React Three Fiber · drei · framer-motion · lucide-react

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # scoring + diagnosis checks (node --test)
npm run build
```

## Structure

- `lib/quiz.ts` — questions, option weights, `scoreFor()`, `diagnose()`
- `components/KepamistScene.tsx` — R3F canvas, Float, studio lights, drag-to-rotate, score-driven spin / scale / red light
- `components/KepamMeter.tsx` — SVG speedometer gauge with a spring needle
- `components/Quiz.tsx` — question cards, results, Share to X
- `components/NowPlayingBar.tsx` — fixed bottom music player for `public/telah-tiba.mp3`. Autoplays with sound where the browser allows it; otherwise autoplays muted and unmutes on the first tap/click/key
- `app/page.tsx` — layout and shared score state

## The models

Three GLBs, all Draco-compressed with 1K WebP textures; source files are git-ignored:

- `public/rempit.glb` — the calm mascot (75 MB source → 1.64 MB).
- `public/superman.glb` — swapped in at "Maximum Rempit" (score above `ANGRY_AT`), alongside
  red lights, the shake, and the spilled matcha (96 MB source → 1.74 MB).
- `public/matcha.glb` — the spilled drink prop shown in Maximum Rempit mode.

To regenerate a model after editing its source, e.g. for `rempit.glb`:

```bash
npx @gltf-transform/cli optimize rempit.glb public/rempit.glb \
  --compress draco --texture-compress webp --texture-size 1024 \
  --simplify-ratio 0.1 --simplify-error 0.001
```

The Draco decoder is served from `public/draco/` (copied from `three/examples/jsm/libs/draco/gltf/`).
