"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { damp, withPointerEffects } from "@/lib/pointer";

type Props = {
  src: string;
  hoverSrc: string;
  alt: string;
  /** Rendered above the images (name, location, social buttons). */
  children?: React.ReactNode;
};

/** Peak tilt in degrees at the corners of the card. */
const MAX_TILT = 6;
/** How quickly the tilt catches up to the pointer, per frame. */
const TILT_EASE = 0.12;

/**
 * Portrait card that crossfades to a second image on hover.
 *
 * Pointer position drives CSS custom properties inside a single rAF loop
 * rather than React state, so moving the cursor never triggers a re-render.
 * The hover image is only decoded once the pointer arrives, keeping it off the
 * critical path for first paint.
 */
export default function ProfileImageSwitcher({
  src,
  hoverSrc,
  alt,
  children,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    return withPointerEffects(() => {
      let rafId = 0;
      // target values written by pointer events, current values eased toward
      // them in the loop — this is what makes the tilt glide instead of snap.
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let running = false;

      const settle = () => {
        currentX = damp(currentX, targetX, TILT_EASE);
        currentY = damp(currentY, targetY, TILT_EASE);

        root.style.setProperty("--tilt-x", `${currentY * -MAX_TILT}deg`);
        root.style.setProperty("--tilt-y", `${currentX * MAX_TILT}deg`);

        // Stop the loop once we are visually at rest, so an idle card costs
        // nothing. Any new pointer event restarts it.
        const atRest =
          Math.abs(currentX - targetX) < 0.001 &&
          Math.abs(currentY - targetY) < 0.001;

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
        const rect = root.getBoundingClientRect();
        targetX = (event.clientX - rect.left) / rect.width - 0.5;
        targetY = (event.clientY - rect.top) / rect.height - 0.5;
        start();
      };

      const onEnter = () => root.setAttribute("data-hovered", "true");

      const onLeave = () => {
        root.removeAttribute("data-hovered");
        targetX = 0;
        targetY = 0;
        start();
      };

      root.addEventListener("pointerenter", onEnter);
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);

      return () => {
        cancelAnimationFrame(rafId);
        root.removeEventListener("pointerenter", onEnter);
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
        root.removeAttribute("data-hovered");
        root.style.removeProperty("--tilt-x");
        root.style.removeProperty("--tilt-y");
      };
    });
  }, []);

  return (
    <div ref={rootRef} className="portrait-card group/portrait">
      <div className="portrait-card__inner card-sheen relative overflow-hidden rounded-[2rem] border border-border-strong bg-bg-elevated">
        <Image
          src={src}
          alt={alt}
          width={900}
          height={900}
          // Caps at ~384px wide in the layout, so don't let Next serve
          // the 1920px variant for it.
          sizes="(max-width: 1024px) min(24rem, 90vw), 24rem"
          priority
          fetchPriority="high"
          className="portrait-card__img portrait-card__img--base aspect-square w-full object-cover"
        />
        <Image
          src={hoverSrc}
          alt=""
          aria-hidden
          width={900}
          height={900}
          sizes="(max-width: 1024px) min(24rem, 90vw), 24rem"
          // Not part of the initial view: let it load lazily so it never
          // competes with LCP.
          loading="lazy"
          className="portrait-card__img portrait-card__img--hover absolute inset-0 aspect-square w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-elevated via-transparent to-transparent" />

        {children}
      </div>
    </div>
  );
}
