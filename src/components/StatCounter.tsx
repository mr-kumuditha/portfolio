"use client";

import { useEffect, useRef, useState } from "react";

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
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const startedAt = performance.now();
      let frame = 0;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / (duration * 1000));
        // Ease-out cubic retains the original quick, polished finish.
        setDisplay(Math.round(value * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
      return () => cancelAnimationFrame(frame);
    }, { rootMargin: "0px 0px -40px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, [duration, value]);

  return (
    <span ref={elementRef}>
      {display}
      {suffix}
    </span>
  );
}
