"use client";

import { useRef, useState } from "react";
import { animate, motion } from "motion/react";

export default function StatCounter({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  function start() {
    if (started.current) return;
    started.current = true;

    animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
      // Guarantee the final number lands even if frames were throttled.
      onComplete: () => setDisplay(value),
    });
  }

  return (
    <motion.span
      onViewportEnter={start}
      viewport={{ once: true, margin: "-40px" }}
    >
      {display}
      {suffix}
    </motion.span>
  );
}
