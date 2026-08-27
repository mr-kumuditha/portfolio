"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * Constellation field: slow-drifting nodes that link to nearby neighbours and
 * lean toward the cursor. Sits behind everything, ignores pointer events.
 */
function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Touch devices get no constellation at all: the O(n²) link pass is the
    // most expensive thing on the page and there is no cursor to react to it.
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse || window.innerWidth < 768) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999 };
    const LINK_DIST = 126;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
    const PULL_DIST = 190;

    function resize() {
      if (!canvas || !ctx) return;
      // Cap at 1.5x: the field is soft focus, so full retina density buys
      // nothing visible and costs 2x the fill rate.
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // The background sits behind an opaque vignette, so 36 nodes are
      // visually indistinguishable from the old 72-node field while cutting
      // the pairwise link work by roughly 75% on a large desktop display.
      const density = Math.min(Math.round((width * height) / 42000), 36);
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.5,
      }));
    }

    function onPointerMove(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }
    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    let raf = 0;
    let previousFrame = 0;
    const FRAME_INTERVAL = 1000 / 24;
    function frame(now: number) {
      if (!ctx) return;
      // This is ambience, not an interaction. Capping the draw work at 24fps
      // preserves the slow-drift effect and leaves the main thread available
      // for page hydration, scrolling and input.
      if (now - previousFrame < FRAME_INTERVAL) {
        raf = requestAnimationFrame(frame);
        return;
      }
      previousFrame = now;
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < PULL_DIST && dist > 0.5) {
          const force = (1 - dist / PULL_DIST) * 0.35;
          n.x += (dx / dist) * force;
          n.y += (dy / dist) * force;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(198, 255, 94, 0.36)";
        ctx.fill();
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          // Compare squared distances and only pay for sqrt on actual links.
          if (distSq > LINK_DIST_SQ) continue;
          const alpha = (1 - Math.sqrt(distSq) / LINK_DIST) * 0.16;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(198, 255, 94, ${alpha})`;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(frame);
    }

    function onVisibility() {
      cancelAnimationFrame(raf);
      // Don't burn frames animating a canvas nobody is looking at.
      if (!document.hidden) {
        previousFrame = 0;
        raf = requestAnimationFrame(frame);
      }
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

export default function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* base wash */}
      <div className="absolute inset-0 bg-bg" />

      {/* drifting aurora mesh */}
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />

      {/* perspective floor grid */}
      <div className="absolute inset-x-0 bottom-0 h-[55vh] [perspective:520px]">
        <div className="grid-floor absolute inset-0 origin-bottom [transform:rotateX(72deg)]" />
      </div>

      {/* fine overlay grid */}
      <div className="grid-overlay absolute inset-0" />

      <ConstellationCanvas />

      {/* vignette keeps text legible over everything above */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(8,9,10,0.82)_100%)]" />
    </div>
  );
}
