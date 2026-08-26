"use client";

import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/data/content";
import { GithubIcon } from "./icons";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        // One constant-keyed motion child that owns the exit animation.
        // AnimatePresence can only unmount a motion child, and keying by
        // project id makes every open a swap whose exit never settles.
        <motion.div
          key="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 z-[75] flex items-start justify-center overflow-y-auto p-4 py-10 sm:p-8 sm:py-14"
        >
          <div
            onClick={onClose}
            className="fixed inset-0 bg-bg/85 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            className="card-sheen relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-border-strong bg-bg-elevated"
          >
            <button
              onClick={onClose}
              data-cursor-hover
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/70 text-fg-muted backdrop-blur-md transition-colors hover:border-border-strong hover:text-fg"
            >
              <X className="h-4 w-4" />
            </button>

            {/* hero */}
            <div className="relative aspect-16/9 w-full overflow-hidden border-b border-border bg-bg">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
                className="object-cover object-top"
              />
              {/* Strong scrim: these hero images are busy and light in places,
                  so the title needs its own contrast floor, not a wash. */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-bg-elevated/85 to-bg-elevated/25" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{
                      color: project.accent,
                      background: `${project.accent}1a`,
                      boxShadow: `inset 0 0 0 1px ${project.accent}40`,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="font-mono text-[11px] tracking-widest text-fg-muted">
                    {project.year} · {project.language}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-fg sm:text-6xl">
                  {project.title}
                </h2>
                <p
                  className="mt-2 font-display text-lg sm:text-xl"
                  style={{ color: project.accent }}
                >
                  {project.subtitle}
                </p>
              </div>
            </div>

            {/* body */}
            <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-xs uppercase tracking-[0.28em] text-fg-dim">
                  Overview
                </p>
                <p className="mt-4 text-balance text-lg leading-relaxed text-fg-muted">
                  {project.overview}
                </p>

                <p className="mt-12 text-xs uppercase tracking-[0.28em] text-fg-dim">
                  What it does
                </p>
                <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.45 }}
                      className="bg-bg-elevated p-5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: project.accent }}
                        />
                        <h4 className="font-display text-sm font-medium text-fg">
                          {feature.title}
                        </h4>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                        {feature.detail}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-5">
                <div className="lg:sticky lg:top-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-fg-dim">
                    Built with
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border px-3 py-1.5 text-xs text-fg-muted transition-colors"
                        style={{ borderColor: `${project.accent}26` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 rounded-2xl border border-border bg-bg/50 p-6">
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {project.description}
                    </p>

                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        className="group mt-6 flex items-center justify-between gap-3 rounded-full px-5 py-3.5 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
                        style={{
                          background: project.accent,
                          color: "#08090a",
                        }}
                      >
                        <span className="flex items-center gap-2.5">
                          <GithubIcon className="h-4 w-4" />
                          View on GitHub
                        </span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
