"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSound } from "./SoundContext";
import { profile } from "@/data/content";

/** How long the splash holds before the exit wipe starts. */
const DURATION = 6000;
/** The counter finishes a beat early so 100% is readable before we leave. */
const COUNT_DURATION = 5200;

const PHASES = [
  "initialising runtime",
  "loading assets",
  "compiling motion",
  "mounting sections",
  "ready",
];

/**
 * Control points for the loading counter, as [progress 0-1, percent 0-100].
 *
 * Deliberately uneven: real loading stalls, and a counter that sprints then
 * hesitates reads as alive where a linear ramp reads as a timer.
 */
const CURVE: [number, number][] = [
  [0, 0],
  [0.12, 26],
  [0.26, 33],
  [0.42, 61],
  [0.54, 67],
  [0.72, 89],
  [0.86, 94],
  [1, 100],
];

function progressAt(t: number) {
  for (let i = 1; i < CURVE.length; i++) {
    const [t1, v1] = CURVE[i];
    if (t <= t1) {
      const [t0, v0] = CURVE[i - 1];
      const local = (t - t0) / (t1 - t0);
      const eased = local * local * (3 - 2 * local); // smoothstep
      return v0 + (v1 - v0) * eased;
    }
  }
  return 100;
}

const RING_R = 94;
const RING_C = 2 * Math.PI * RING_R;

export default function Splash() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const { play } = useSound();
  const played = useRef(false);

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

    if (!played.current) {
      played.current = true;
      play();
    }

    const start = performance.now();
    let raf = 0;

    // Both loops read the same wall clock, so whichever one the browser is
    // willing to run produces the same number. rAF gives a smooth 60fps count
    // in a focused tab; the interval keeps it advancing when rAF is suspended
    // (background tab, reduced power mode), where rAF alone would freeze at 0.
    const update = () => {
      const t = Math.min((performance.now() - start) / COUNT_DURATION, 1);
      setCount(Math.round(progressAt(t)));
      return t;
    };

    function tick() {
      if (update() < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    const poll = setInterval(update, 200);

    const timer = setTimeout(() => {
      setCount(100);
      setDone(true);
    }, DURATION);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(poll);
      clearTimeout(timer);
    };
  }, [play]);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  const phase =
    PHASES[Math.min(Math.floor((count / 100) * PHASES.length), PHASES.length - 1)];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[90] overflow-hidden"
          aria-label="Loading"
          role="status"
        >
          {/* Exit wipe: two halves retract to reveal the page underneath. */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-bg"
            exit={{ y: "-101%" }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-bg"
            exit={{ y: "101%" }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Everything else fades before the panels move. */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeIn" }}
          >
            {/* drifting glow */}
            <motion.div
              className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-accent/10 blur-[110px]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.9, 0.55, 0.9], scale: [0.6, 1.1, 1] }}
              transition={{ duration: 5, ease: "easeInOut" }}
            />

            {/* grid, drawn in then held */}
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-fg) 1px, transparent 1px), linear-gradient(90deg, var(--color-fg) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 0.07, scale: 1 }}
              transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* HUD corners */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="pointer-events-none absolute inset-0 hidden p-8 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-dim sm:block"
            >
              <span className="absolute left-8 top-8">KTL — Portfolio</span>
              <span className="absolute right-8 top-8">v1.0</span>
              <span className="absolute bottom-8 left-8">{profile.location}</span>
              <span className="absolute bottom-8 right-8">2026</span>
            </motion.div>

            {/* ring + monogram */}
            <div className="relative flex h-[260px] w-[260px] items-center justify-center sm:h-[320px] sm:w-[320px]">
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 h-full w-full -rotate-90"
                aria-hidden
              >
                {/* dashed idle ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r={RING_R}
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="0.6"
                  strokeDasharray="3 9"
                  style={{ transformOrigin: "center" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                />
                {/* progress arc */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r={RING_R}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  animate={{ strokeDashoffset: RING_C * (1 - count / 100) }}
                  transition={{ ease: "linear", duration: 0.12 }}
                  initial={{ strokeDashoffset: RING_C }}
                />
              </svg>

              {/* expanding pulse rings */}
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="pointer-events-none absolute rounded-full border border-accent/20"
                  initial={{ width: 90, height: 90, opacity: 0 }}
                  animate={{ width: [90, 340], height: [90, 340], opacity: [0.55, 0] }}
                  transition={{
                    duration: 3,
                    delay: i * 1,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* monogram, per-letter mask reveal + shimmer */}
              <div className="relative flex items-end gap-1 overflow-hidden px-2 py-1">
                {"KTL".split("").map((letter, i) => (
                  <motion.span
                    key={letter}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.25 + i * 0.14,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-display text-6xl font-medium leading-none tracking-tight text-fg sm:text-7xl"
                  >
                    {letter}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 280 }}
                  className="mb-1.5 ml-1 h-2.5 w-2.5 rounded-full bg-accent sm:h-3 sm:w-3"
                />

                {/* light sweep across the monogram */}
                <motion.span
                  className="pointer-events-none absolute inset-y-0 w-16 -skew-x-12 bg-gradient-to-r from-transparent via-fg/25 to-transparent"
                  initial={{ x: "-160%" }}
                  animate={{ x: ["-160%", "460%"] }}
                  transition={{
                    duration: 1.6,
                    delay: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {/* progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-8 w-60 sm:w-80"
            >
              <div className="relative h-px w-full bg-border">
                <motion.div
                  className="h-full w-full origin-left bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: count / 100 }}
                  transition={{ ease: "linear", duration: 0.12 }}
                />
                {/* glow head riding the bar */}
                <motion.span
                  className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_3px_var(--color-accent)]"
                  animate={{ left: `${count}%` }}
                  transition={{ ease: "linear", duration: 0.12 }}
                />
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <div className="h-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phase}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="block font-mono text-[10px] uppercase tracking-[0.28em] text-fg-dim"
                    >
                      {phase}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="font-display text-sm tabular-nums text-accent">
                  {count}%
                </span>
              </div>
            </motion.div>

            {/* signature */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-16 text-[10px] uppercase tracking-[0.3em] text-fg-dim sm:bottom-20"
            >
              {profile.name}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
