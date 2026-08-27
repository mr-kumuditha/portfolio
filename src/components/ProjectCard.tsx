"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/content";

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    card.style.transform = `perspective(1200px) rotateX(${5 - y * 10}deg) rotateY(${-5 + x * 10}deg)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, ${project.accent}1f, transparent 62%)`;
    }
  }

  function handleLeave() {
    if (ref.current) ref.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      data-cursor-hover
      className="card-sheen group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-bg-elevated/80 transition-[border-color,transform] duration-300 hover:border-border-strong"
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

        <Link
          href={`/projects/${project.id}`}
          onClick={(event) => event.stopPropagation()}
          className="relative z-20 mt-6 flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-fg-dim transition-colors duration-300 hover:text-fg-muted"
        >
          Read full case study
          <span
            className="h-px w-6 transition-all duration-400 group-hover:w-10"
            style={{ background: project.accent }}
          />
        </Link>
      </div>
    </article>
  );
}
