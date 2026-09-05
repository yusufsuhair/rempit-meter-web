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

## The model

`public/rempit.glb` is a web-optimised copy of the source `rempit.glb`
(75 MB → 1.64 MB, Draco-compressed, 1K WebP textures). The source file is git-ignored.
There is no separate angry variant — "Maximum Rempit" mode reuses the same model and drives
the red lights, the shake, and the spilled matcha (`public/matcha.glb`) instead of swapping
the character. To regenerate the model after editing the source:

```bash
npx @gltf-transform/cli optimize rempit.glb public/rempit.glb \
  --compress draco --texture-compress webp --texture-size 1024 \
  --simplify-ratio 0.1 --simplify-error 0.001
```

The Draco decoder is served from `public/draco/` (copied from `three/examples/jsm/libs/draco/gltf/`).
