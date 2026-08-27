"use client";

import * as m from "motion/react-m";
import { useSound } from "./SoundContext";

const BARS = [0.35, 0.75, 0.5, 0.9, 0.45];

export default function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <button
      onClick={toggle}
      data-cursor-hover
      aria-pressed={enabled}
      aria-label={enabled ? "Mute background music" : "Play background music"}
      title={enabled ? "Mute" : "Play music"}
      className="flex h-9 items-center gap-[3px] rounded-full border border-border px-3.5 transition-colors duration-300 hover:border-accent"
    >
      {BARS.map((height, i) => (
        <m.span
          key={i}
          className="w-[2px] rounded-full bg-accent"
          animate={
            enabled
              ? { height: [4, 14 * height + 4, 4] }
              : { height: 4, opacity: 0.45 }
          }
          transition={
            enabled
              ? {
                  duration: 0.7 + i * 0.12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0.25 }
          }
        />
      ))}
    </button>
  );
}
