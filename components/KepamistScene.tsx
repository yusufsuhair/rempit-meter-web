"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Clone, ContactShadows, Float, useGLTF } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Box3, Color, Group, MathUtils, type AmbientLight } from "three";
import { ANGRY_AT } from "@/lib/quiz";

// One mascot model for both states; angry mode is lights/shake/spilled matcha only (no character swap).
const MODEL_URL = "/rempit.glb";
const ANGRY_URL = "/rempit.glb";
const MATCHA_URL = "/matcha.glb";
const DRACO_PATH = "/draco/";
useGLTF.preload(MODEL_URL, DRACO_PATH);
useGLTF.preload(ANGRY_URL, DRACO_PATH);
useGLTF.preload(MATCHA_URL, DRACO_PATH);

function cssColor(name: string, fallback: string) {
  return new Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback);
}

function Kepamist({ score, still }: { score: number; still: boolean }) {
  const calm = useGLTF(MODEL_URL, DRACO_PATH).scene;
  const angry = useGLTF(ANGRY_URL, DRACO_PATH).scene;
  const matcha = useGLTF(MATCHA_URL, DRACO_PATH).scene;
  const isAngry = score > ANGRY_AT;
  const scene = isAngry ? angry : calm;
  const group = useRef<Group>(null);
  const gl = useThree((s) => s.gl);
  // Portrait canvases (phone hero, desktop pane) get a bigger mascot: nothing overlays the canvas any more,
  // so the model is centred and fills most of the height. Score adds up to +0.1 on top.
  const aspect = useThree((s) => s.viewport.aspect);
  const base = aspect < 0.75 ? 1.4 : aspect < 0.8 ? 1.3 : aspect < 0.9 ? 1.12 : 1;
  // Half the model's height (the Clone is centred at the origin), used to keep the shadow under the feet.
  const half = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    return (box.max.y - box.min.y) / 2;
  }, [scene]);
  const feetY = -half * (base + (score / 100) * 0.1) - 0.02;
  // Drag-to-rotate state: horizontal pointer drags spin the model; the fling decays back into auto-spin.
  const drag = useRef({ active: false, lastX: 0, fling: 0 });

  useEffect(() => {
    const el = gl.domElement;
    const d = drag.current;
    const down = (e: PointerEvent) => {
      d.active = true;
      d.lastX = e.clientX;
      d.fling = 0;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!d.active || !group.current) return;
      const dx = e.clientX - d.lastX;
      d.lastX = e.clientX;
      group.current.rotation.y += dx * 0.012;
      d.fling = dx * 0.012 * 60; // rad/s, assuming ~60 events per second
    };
    const up = () => {
      d.active = false;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame((state, dt) => {
    if (!group.current) return;
    const d = drag.current;
    // Angry jitters: start shaking at the threshold and build up to 100% (off under reduced motion).
    const t = state.clock.elapsedTime;
    const amp = still || !isAngry ? 0 : 0.02 + ((score - ANGRY_AT) / (100 - ANGRY_AT)) * 0.04;
    group.current.position.set(Math.sin(t * 41) * amp, Math.sin(t * 53) * amp, 0);
    group.current.rotation.z = Math.sin(t * 47) * amp * 1.5;
    if (!d.active) {
      // Idle turntable that spins up to a frantic blur at 100%, plus any leftover fling.
      // Reduced motion: no idle spin; dragging still works and the fling still settles.
      const speed = still ? 0 : 0.25 + (score / 100) ** 2 * 3;
      group.current.rotation.y += (speed + d.fling) * dt;
      d.fling *= Math.exp(-3 * dt);
    }
    const targetScale = base + (score / 100) * 0.1;
    const s = MathUtils.damp(group.current.scale.x, targetScale, 3, dt);
    group.current.scale.setScalar(s);
  });

  return (
    <>
      <Float speed={still ? 0 : 1.5} rotationIntensity={0.25} floatIntensity={0.6}>
        <group ref={group}>
          <Center>
            {/* Clone shares geometry and materials, so the hero and the test screen can each show the mascot. */}
            <Clone key={score > ANGRY_AT ? "angry" : "calm"} object={scene} />
          </Center>
        </group>
      </Float>
      {/* Maximum Rempit: the matcha hits the floor. The model is ~0.7 tall and centred, so lift it by half its height. */}
      {isAngry && (
        <Clone
          object={matcha}
          scale={0.3 * base}
          position={[0.45 * base, feetY + 0.355 * 0.3 * base, 0.6]}
          rotation-y={2.4}
        />
      )}
      {/* Baked once the model is in; the blob does not need to follow the float. */}
      <ContactShadows frames={1} position={[0, feetY, 0]} opacity={0.5} scale={5} blur={2.4} far={2} />
    </>
  );
}

function StudioLights({ score }: { score: number }) {
  const ambient = useRef<AmbientLight>(null);
  const [calm, hot] = useMemo(() => [cssColor("--color-scene-calm", "#cfd8ff"), cssColor("--color-hot", "#ff2d2d")], []);

  useFrame((_, dt) => {
    if (!ambient.current) return;
    // "Maximum Rempit": ambient goes blood red past ANGRY_AT.
    ambient.current.color.lerp(score > ANGRY_AT ? hot : calm, 1 - Math.exp(-4 * dt));
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={score > ANGRY_AT ? 1.6 : 0.7} color={calm} />
      <directionalLight position={[3, 5, 4]} intensity={2.8} />
      <directionalLight position={[-4, 2, -2]} intensity={0.9} color="#8ec5ff" />
      <pointLight position={[0, 1.5, -3]} intensity={score > ANGRY_AT ? 40 : 12} color="#ff4d6d" />
    </>
  );
}

export default function KepamistScene({ score }: { score: number }) {
  const still = useReducedMotion() ?? false;
  const wrap = useRef<HTMLDivElement>(null);
  // Stop the render loop while the hero is scrolled out of view (mobile).
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0, 4.5], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        className="touch-pan-y cursor-grab active:cursor-grabbing"
      >
        <StudioLights score={score} />
        <Suspense fallback={null}>
          <Kepamist score={score} still={still} />
        </Suspense>
      </Canvas>
    </div>
  );
}
