"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSound } from "./SoundContext";

const DURATION = 2200;

const PHASES = [
  "initialising",
  "loading projects",
  "compiling shaders",
  "ready",
];

export default function Splash() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const { play } = useSound();

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const deepLink = window.location.hash.length > 1;

    if (reduced || deepLink) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client capability check, not a render loop
      setDone(true);
      return;
    }

    play();

    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const t = Math.min((now - start) / DURATION, 1);
      // ease-out so the number sprints then settles, instead of crawling
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    // requestAnimationFrame is throttled in background tabs, so guarantee the
    // splash always clears on a plain timer too.
    const timer = setTimeout(() => {
      setCount(100);
      setDone(true);
    }, DURATION + 320);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [play]);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  const phase = PHASES[Math.min(Math.floor(count / 26), PHASES.length - 1)];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* pulse rings */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute rounded-full border border-accent/25"
                initial={{ width: 80, height: 80, opacity: 0 }}
                animate={{
                  width: [80, 620],
                  height: [80, 620],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2.4,
                  delay: i * 0.7,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* monogram */}
          <div className="relative flex items-center gap-1">
            {"KTL".split("").map((letter, i) => (
              <motion.span
                key={letter}
                initial={{ y: 40, opacity: 0, filter: "blur(12px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-6xl font-medium tracking-tight text-fg sm:text-8xl"
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.55, type: "spring", stiffness: 300 }}
              className="mb-2 ml-1 h-2.5 w-2.5 self-end rounded-full bg-accent sm:mb-3 sm:h-3.5 sm:w-3.5"
            />
          </div>

          {/* progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative mt-10 w-56 sm:w-80"
          >
            <div className="h-px w-full bg-border">
              <motion.div
                className="h-full w-full origin-left bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-fg-dim">
                {phase}
              </span>
              <span className="font-display text-sm tabular-nums text-accent">
                {count}%
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="absolute bottom-10 text-[10px] uppercase tracking-[0.3em] text-fg-dim"
          >
            Kumuditha Tharinda Liyanage
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
