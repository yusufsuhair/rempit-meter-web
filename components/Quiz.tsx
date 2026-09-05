"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { diagnose, SKIP, type Answer, type Question } from "@/lib/quiz";

type Props = {
  questions: Question[];
  answers: Answer[];
  score: number;
  onAnswer: (question: number, option: Answer) => void;
  onReset: () => void;
};

const glass = "rounded-3xl border border-white/15 bg-white/10 shadow-2xl shadow-black/30 backdrop-blur-xl";
function shuffledIndices(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const primary = "rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/90 active:scale-95";

export default function Quiz({ questions, answers, score, onAnswer, onReset }: Props) {
  const [step, setStep] = useState(0);
  const done = step >= questions.length;
  const q = questions[step];
  // Only move focus once the visitor has started; never steal it on page load.
  const touched = useRef(false);
  // Each question's options are shown in a random order, but scoring always uses the option's
  // real index/weight. The server (and the first client render, to match it) shows the fixed
  // original order; an effect reshuffles once the client has mounted, so SSR/hydration output is
  // deterministic and the randomization only ever happens post-hydration.
  const [orders, setOrders] = useState(() => questions.map((qq) => qq.options.map((_, i) => i)));
  useEffect(() => {
    // Intentional post-hydration randomization, not derived state: SSR/first-render must stay
    // deterministic to avoid a hydration mismatch, so the shuffle can only happen here, once,
    // after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(questions.map((qq) => shuffledIndices(qq.options.length)));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- run once on mount only
  // q is undefined once the quiz is done (step has run past the last question); order is unused then.
  const order = orders[step] ?? q?.options.map((_, i) => i) ?? [];
  const focusHeading = (el: HTMLHeadingElement | null) => {
    if (touched.current) el?.focus({ preventScroll: true });
  };

  function pick(option: Answer) {
    touched.current = true;
    onAnswer(step, option);
    setStep((s) => s + 1);
  }

  function reset() {
    onReset();
    setStep(0);
    setOrders(questions.map((qq) => shuffledIndices(qq.options.length)));
  }

  return (
    <div className={`${glass} p-4 sm:p-8`}>
      <AnimatePresence mode="wait">
        {done ? (
          <Results key="results" score={score} onReset={reset} headingRef={focusHeading} />
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 sm:mb-4">
              <span aria-live="polite">
                Soalan {step + 1} / {questions.length}
              </span>
              <span className="-my-2 ml-auto flex">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      touched.current = true;
                      setStep((s) => s - 1);
                    }}
                    className="min-h-11 rounded-full px-3 hover:bg-white/10 hover:text-white"
                  >
                    ← Undur
                  </button>
                )}
                <button type="button" onClick={() => pick(SKIP)} className="min-h-11 rounded-full px-3 hover:bg-white/10 hover:text-white">
                  Langkau →
                </button>
              </span>
            </div>
            <h2 ref={focusHeading} tabIndex={-1} className="mb-4 text-2xl font-semibold leading-snug sm:mb-6 sm:text-3xl">
              {q.prompt}
            </h2>
            <ul className="grid gap-2.5 sm:gap-3">
              {order.map((i) => {
                const o = q.options[i];
                const chosen = answers[step] === i;
                return (
                  <li key={o.label}>
                    <button
                      type="button"
                      onClick={() => pick(i)}
                      aria-pressed={chosen}
                      className={`w-full rounded-2xl border px-4 py-3.5 text-left text-base transition active:scale-[0.98] sm:px-5 sm:py-4 sm:text-lg ${
                        chosen
                          ? "border-accent/70 bg-accent/25"
                          : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/15"
                      }`}
                    >
                      {o.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Results({
  score,
  onReset,
  headingRef,
}: {
  score: number;
  onReset: () => void;
  headingRef: (el: HTMLHeadingElement | null) => void;
}) {
  const d = diagnose(score);
  const text = `Saya dapat ${score}% dalam RempitMeter ${d.emoji} Diagnosis: ${d.title}. Berapa rempit awak?`;
  const url = typeof window === "undefined" ? "" : window.location.href;
  const shareX = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  // Threads has no url param; the link rides in the text and unfurls into the OG card.
  const shareThreads = `https://www.threads.com/intent/post?text=${encodeURIComponent(`${text} ${url}`)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <div className="text-6xl" aria-hidden>
        {d.emoji}
      </div>
      <p className="mt-4 text-xs uppercase tracking-widest text-white/60">Diagnosis rasmi</p>
      <h2 ref={headingRef} tabIndex={-1} className="font-display mt-1 text-3xl sm:text-4xl">
        {d.title}
      </h2>
      <p className="mx-auto mt-4 max-w-md text-white/80">{d.blurb}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a href={shareX} target="_blank" rel="noopener noreferrer" className={primary}>
          Kongsi ke X
        </a>
        <a href={shareThreads} target="_blank" rel="noopener noreferrer" className={primary}>
          Kongsi ke Threads
        </a>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10 active:scale-95"
        >
          Cuba lagi
        </button>
      </div>
    </motion.div>
  );
}
