"use client";

import { useEffect, useRef } from "react";
import { damp, withPointerEffects } from "@/lib/pointer";

/** How quickly the glow chases the pointer, per frame. Lower drifts more. */
const GLOW_EASE = 0.08;

/**
 * Soft radial glow that trails the pointer across its parent section.
 *
 * Renders as a single absolutely-positioned layer whose gradient centre is two
 * CSS custom properties. The pointer handler only records coordinates; a rAF
 * loop eases toward them and writes the properties, so there is no React state
 * and no re-render while the cursor moves.
 *
 * The parent must establish a stacking/positioning context (`relative`).
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    return withPointerEffects(() => {
      let rafId = 0;
      let targetX = 50;
      let targetY = 30;
      let currentX = 50;
      let currentY = 30;
      let running = false;

      const settle = () => {
        currentX = damp(currentX, targetX, GLOW_EASE);
        currentY = damp(currentY, targetY, GLOW_EASE);

        el.style.setProperty("--glow-x", `${currentX}%`);
        el.style.setProperty("--glow-y", `${currentY}%`);

        const atRest =
          Math.abs(currentX - targetX) < 0.05 &&
          Math.abs(currentY - targetY) < 0.05;

        // Idle pointer costs nothing; the next move restarts the loop.
        if (atRest) {
          running = false;
          return;
        }
        rafId = requestAnimationFrame(settle);
      };

      const start = () => {
        if (running) return;
        running = true;
        rafId = requestAnimationFrame(settle);
      };

      const onMove = (event: PointerEvent) => {
        const rect = parent.getBoundingClientRect();
        targetX = ((event.clientX - rect.left) / rect.width) * 100;
        targetY = ((event.clientY - rect.top) / rect.height) * 100;
        start();
      };

      const onEnter = () => el.setAttribute("data-active", "true");
      const onLeave = () => el.removeAttribute("data-active");

      parent.addEventListener("pointerenter", onEnter);
      parent.addEventListener("pointermove", onMove);
      parent.addEventListener("pointerleave", onLeave);

      return () => {
        cancelAnimationFrame(rafId);
        parent.removeEventListener("pointerenter", onEnter);
        parent.removeEventListener("pointermove", onMove);
        parent.removeEventListener("pointerleave", onLeave);
        el.removeAttribute("data-active");
      };
    });
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden />;
}
