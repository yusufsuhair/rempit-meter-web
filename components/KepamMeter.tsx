"use client";

import { useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { ANGRY_AT } from "@/lib/quiz";

const R = 80;
const CX = 100;
const CY = 100;
const ARC = Math.PI * R;
const ARC_PATH = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

export default function KepamMeter({ score, className = "" }: { score: number; className?: string }) {
  // Two instances live in the DOM (phone hero row, desktop column); the gradient id must be unique.
  const gradId = useId();
  const reduced = useReducedMotion();
  const spring = useSpring(0, { stiffness: 80, damping: 14, mass: 0.8 });
  const [v, setV] = useState(0);
  useMotionValueEvent(spring, "change", setV);
  useEffect(() => {
    // Reduced motion: land on the value instead of swinging to it.
    if (reduced) spring.jump(score);
    else spring.set(score);
  }, [score, spring, reduced]);

  const label = score > ANGRY_AT ? "MAXIMUM REMPIT" : score > ANGRY_AT / 2 ? "getting rempit…" : "rempit level";

  return (
    <div
      className={`@container ${className}`}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={score}
      aria-valuetext={`${score}%, ${label}`}
      aria-label="Rempit score"
    >
      <svg viewBox="0 0 200 108" className="w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" style={{ stopColor: "var(--color-gauge-low)" }} />
            <stop offset="50%" style={{ stopColor: "var(--color-gauge-mid)" }} />
            <stop offset="100%" style={{ stopColor: "var(--color-gauge-high)" }} />
          </linearGradient>
        </defs>
        <path d={ARC_PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="14" strokeLinecap="round" />
        <path
          d={ARC_PATH}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={ARC}
          strokeDashoffset={ARC * (1 - v / 100)}
        />
        <g transform={`rotate(${-90 + v * 1.8} ${CX} ${CY})`}>
          <line x1={CX} y1={CY} x2={CX} y2={CY - R + 18} stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx={CX} cy={CY} r="6" fill="white" />
        </g>
      </svg>
      <div className="-mt-2 flex flex-col items-center leading-none">
        <span className="font-display text-3xl tabular-nums @min-[220px]:text-5xl">{Math.round(v)}%</span>
        <span
          className={`mt-1 text-xs uppercase tracking-[0.18em] @min-[220px]:tracking-[0.25em] ${score > ANGRY_AT ? "text-hot motion-safe:animate-pulse" : "text-white/60"}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
