"use client";

import { MotionConfig } from "framer-motion";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import KepamMeter from "@/components/KepamMeter";
import NowPlayingBar from "@/components/NowPlayingBar";
import Quiz from "@/components/Quiz";
import { ANGRY_AT, QUESTIONS, scoreFor, type Answer } from "@/lib/quiz";

const KepamistScene = dynamic(() => import("@/components/KepamistScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center px-2 text-center text-sm uppercase tracking-widest text-white/70">
      Memanggil Si Rempit…
    </div>
  ),
});

const cta =
  "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/90 active:scale-95";

const MOOD = {
  calm: "radial-gradient(1200px 800px at 20% 10%, var(--color-mood-a) 0%, transparent 60%), radial-gradient(900px 700px at 90% 90%, var(--color-mood-b) 0%, transparent 60%), var(--color-ink)",
  angry:
    "radial-gradient(1200px 800px at 20% 10%, var(--color-hot-a) 0%, transparent 60%), radial-gradient(900px 700px at 90% 90%, var(--color-hot-b) 0%, transparent 60%), var(--color-ink)",
};

export default function Home() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const score = scoreFor(answers);
  // Below lg the test screen gets its own compact mascot; mounted only there so desktop keeps one WebGL context.
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(max-width: 63.99rem)");
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative text-white">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{ background: MOOD.calm }}
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-1000"
          style={{ background: MOOD.angry, opacity: score > ANGRY_AT ? 1 : 0 }}
        />
        {/* Phone: hero copy, big mascot, CTA, then the test with a compact mascot beside the gauge.
            Desktop: the left column scrolls from hero copy to the test while one mascot pane stays put on the right. */}
        <div className="mx-auto flex max-w-7xl flex-col lg:grid lg:grid-cols-2">
          <div className="contents lg:block">
            {/* Screen 1: wordmark, tagline, one action. */}
            <section
              className="order-1 flex flex-col items-center gap-3 px-4 pt-8 text-center sm:px-8 lg:min-h-[calc(100svh-var(--bar-h))] lg:items-start lg:justify-center lg:gap-5 lg:py-16 lg:text-left"
              aria-label="RempitMeter"
            >
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
                Rempit<span className="text-accent">Meter</span>
              </h1>
              <p className="max-w-md text-lg text-white/70 sm:text-xl lg:text-2xl">
                Meter untuk nilai tahap kerempitan awak.
              </p>
              <div className="mt-2 hidden flex-col items-start gap-3 lg:flex">
                <a href="#test" className={cta}>
                  Mula ujian
                  <ArrowDown className="h-4 w-4" aria-hidden />
                </a>
                <p className="text-sm text-white/60">
                  {QUESTIONS.length} soalan. Satu diagnosis rasmi.
                </p>
              </div>
            </section>

            {/* Screen 2: the meter and the questionnaire. */}
            <section
              id="test"
              className="order-4 flex min-h-[calc(100svh-var(--bar-h))] scroll-mt-2 flex-col justify-center gap-4 px-4 py-10 sm:gap-6 sm:px-8"
              aria-label="Ujian"
            >
              <div className="flex items-center gap-3 lg:block">
                {phone && (
                  <div
                    className="h-56 min-w-0 flex-1 overflow-hidden sm:h-72"
                    aria-hidden
                  >
                    <KepamistScene score={score} />
                  </div>
                )}
                <KepamMeter
                  score={score}
                  className="w-[46%] max-w-[220px] shrink-0 sm:max-w-[260px] lg:mx-auto lg:w-full"
                />
              </div>
              <Quiz
                questions={QUESTIONS}
                answers={answers}
                score={score}
                onAnswer={(q, o) =>
                  setAnswers((a) => {
                    const next = [...a];
                    next[q] = o;
                    return next;
                  })
                }
                onReset={() => setAnswers([])}
              />
            </section>
          </div>

          {/* The mascot. Phone: fills the hero between the copy and the CTA. Desktop: sticky for both screens. */}
          <div
            className="order-2 h-[calc(100svh-var(--bar-h)-14.25rem)] min-h-80 overflow-hidden lg:sticky lg:top-0 lg:h-[calc(100svh-var(--bar-h))]"
            aria-label="Model 3D Si Rempit"
          >
            <KepamistScene score={score} />
          </div>

          <div className="order-3 flex flex-col items-center gap-2 px-4 pt-3 pb-6 lg:hidden">
            <a href="#test" className={cta}>
              Mula ujian
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
            <p className="text-xs text-white/60">
              {QUESTIONS.length} soalan. Satu diagnosis rasmi.
            </p>
          </div>
        </div>
      </main>
      <NowPlayingBar angry={score > ANGRY_AT} />
    </MotionConfig>
  );
}
