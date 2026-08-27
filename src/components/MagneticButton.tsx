"use client";

import { useEffect, useRef } from "react";
import { damp, withPointerEffects } from "@/lib/pointer";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

/** How quickly the element catches up to the pointer, per frame. */
const EASE = 0.16;

/**
 * Pulls its child slightly toward the pointer, easing back on leave.
 *
 * Uses a plain rAF loop writing a single transform instead of a motion spring:
 * the movement is one property on one element, so a physics library earns
 * nothing here and the loop can stop entirely once the element is at rest.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as: Tag = "div",
  ...tagProps
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Lets the rAF loop read the latest strength without re-subscribing.
  const strengthRef = useRef(strength);

  useEffect(() => {
    strengthRef.current = strength;
  }, [strength]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return withPointerEffects(() => {
      let rafId = 0;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let running = false;

      const settle = () => {
        currentX = damp(currentX, targetX, EASE);
        currentY = damp(currentY, targetY, EASE);

        const atRest =
          Math.abs(currentX - targetX) < 0.01 &&
          Math.abs(currentY - targetY) < 0.01;

        if (atRest) {
          currentX = targetX;
          currentY = targetY;
          running = false;
        }

        el.style.transform =
          currentX === 0 && currentY === 0
            ? ""
            : `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

        if (!atRest) rafId = requestAnimationFrame(settle);
      };

      const start = () => {
        if (running) return;
        running = true;
        rafId = requestAnimationFrame(settle);
      };

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        targetX =
          (event.clientX - rect.left - rect.width / 2) * strengthRef.current;
        targetY =
          (event.clientY - rect.top - rect.height / 2) * strengthRef.current;
        start();
      };

      const onLeave = () => {
        targetX = 0;
        targetY = 0;
        start();
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        cancelAnimationFrame(rafId);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        el.style.transform = "";
      };
    });
  }, []);

  return (
    <div ref={ref} className="magnetic inline-block" data-cursor-hover>
      <Tag className={`inline-block ${className}`} {...tagProps}>
        {children}
      </Tag>
    </div>
  );
}
