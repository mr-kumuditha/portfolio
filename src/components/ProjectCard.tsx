"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/content";
import { damp, withPointerEffects } from "@/lib/pointer";
import { GithubIcon, GlobeIcon } from "./icons";

/** Peak tilt in degrees at the edges of the card. */
const MAX_TILT = 5;
/** How quickly the tilt catches up to the pointer, per frame. */
const TILT_EASE = 0.15;

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    return withPointerEffects(() => {
      let rafId = 0;
      // Eased rather than applied instantly: an unclamped jump straight to
      // the pointer's transform would shift the card's rendered geometry
      // out from under the cursor on the same event that positions it,
      // which can turn a click into a miss on "Read full case study"
      // sitting just above this button in stacking order.
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let running = false;

      const settle = () => {
        currentX = damp(currentX, targetX, TILT_EASE);
        currentY = damp(currentY, targetY, TILT_EASE);
        card.style.transform = `perspective(1200px) rotateX(${currentY * -MAX_TILT}deg) rotateY(${currentX * MAX_TILT}deg)`;

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
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        targetX = x * 2 - 1;
        targetY = y * 2 - 1;
        if (glowRef.current) {
          glowRef.current.style.background = `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, ${project.accent}1f, transparent 62%)`;
        }
        start();
      };

      const onLeave = () => {
        targetX = 0;
        targetY = 0;
        start();
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);

      return () => {
        cancelAnimationFrame(rafId);
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
        card.style.transform = "";
      };
    });
  }, [project.accent]);

  return (
    // Plain div, not <article> — ARIA forbids remapping a sectioning
    // element's role to "button". The click target itself is a real
    // <button> below, an overlay sibling of the "Read full case study"
    // link rather than its ancestor: a role="button" wrapper around a
    // real <a> is a nested-interactive violation (screen readers can't
    // reach the inner link), and it's two genuinely different actions
    // anyway — this card opens a quick-look modal, the link navigates
    // to the dedicated case-study page.
    <div
      ref={ref}
      className="card-sheen group relative overflow-hidden rounded-3xl border border-border bg-bg-elevated/80 transition-[border-color,transform] duration-300 hover:border-border-strong"
    >
      <span
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* preview */}
      <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-bg">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
        {/* The banners carry their own headline art, so the overlaid badge and
            year need a scrim of their own to stay readable. */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg/80 to-transparent" />

        <div className="absolute left-5 top-5 flex items-center gap-2.5">
          <span
            className="rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md"
            style={{
              color: project.accent,
              background: `${project.accent}1a`,
              boxShadow: `inset 0 0 0 1px ${project.accent}40`,
            }}
          >
            {project.category}
          </span>
        </div>

        <span className="absolute right-5 top-5 font-mono text-[11px] tracking-widest text-fg-muted">
          {project.year}
        </span>
      </div>

      {/* body */}
      <div className="relative p-7 sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[11px] tracking-widest text-fg-dim">
              {project.index}
            </p>
            <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-fg sm:text-3xl">
              {project.title}
            </h3>
            <p
              className="mt-1 text-sm font-medium"
              style={{ color: project.accent }}
            >
              {project.subtitle}
            </p>
          </div>

          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            style={{ color: project.accent }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-fg-muted">
          {project.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 text-[11px] text-fg-dim"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-fg-dim">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Link
            href={`/projects/${project.id}`}
            className="relative z-20 flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-fg-dim transition-colors duration-300 hover:text-fg-muted"
          >
            Read full case study
            <span
              className="h-px w-6 transition-all duration-400 group-hover:w-10"
              style={{ background: project.accent }}
            />
          </Link>

          <div className="relative z-20 flex items-center gap-2">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source on GitHub`}
                title="View source on GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-fg-muted transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <GithubIcon className="h-3.5 w-3.5" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                title="Open the live site"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-fg-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                style={{ borderColor: `${project.accent}55`, color: project.accent }}
              >
                <GlobeIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* The click target. Sits above the visuals but below the case-study
          link (z-20) so that link stays independently reachable and
          clickable instead of being trapped inside this overlay.

          A real <a>, not a <button>: hydration of this page lands a couple of
          seconds after the cards are painted, and a button's onClick does
          nothing until it does — clicks in that window were silently dropped.
          As a link it navigates to the same case study without JS, and once
          hydrated the handler below intercepts it and opens the modal
          instead. Modifier-clicks fall through so open-in-new-tab still
          works. */}
      <a
        href={`/projects/${project.id}`}
        onClick={(event) => {
          if (
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return;
          }
          event.preventDefault();
          onOpen();
        }}
        aria-label={`View details for ${project.title}`}
        className="absolute inset-0 z-10 cursor-pointer rounded-3xl"
      />
    </div>
  );
}
