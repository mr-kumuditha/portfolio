"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { profile, projects } from "@/data/content";
import MagneticButton from "./MagneticButton";
import CursorGlow from "./CursorGlow";
import { GithubIcon, LinkedinIcon } from "./icons";

const lines = [
  ["I", "BUILD"],
  ["SOFTWARE", "THAT"],
  ["ACTUALLY", "SHIPS."],
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // running word count per line, so the stagger continues across line breaks
  const lineOffsets = lines.reduce<number[]>((acc, line, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + lines[i - 1].length);
    return acc;
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between px-6 pt-32 pb-10 sm:px-10"
    >
      <CursorGlow />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center"
      >
        {/* status row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.25em] text-fg-muted"
        >
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.status}
          </span>
          <span className="hidden sm:block">{profile.location}</span>
        </motion.div>

        {/* headline */}
        <h1 className="mt-10 font-display text-[13.5vw] font-medium leading-[0.88] tracking-tight text-fg sm:text-[9vw] lg:text-[7vw]">
          {lines.map((line, li) => (
            <span key={li} className="block overflow-hidden py-[0.04em]">
              {line.map((word, wi) => {
                const delay = 0.2 + (lineOffsets[li] + wi) * 0.07;
                return (
                  <motion.span
                    key={word}
                    initial={{ y: "108%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1,
                      delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`mr-[0.26em] inline-block ${
                      word === "ACTUALLY" ? "text-accent" : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* sub row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7 }}
          className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <p className="max-w-lg text-balance text-lg leading-relaxed text-fg-muted lg:col-span-6">
            {profile.tagline} HND Software Engineering student at NIBM, shipping
            Flutter, Next.js, Spring Boot and native macOS work.
          </p>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-6 lg:justify-end">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              aria-label="GitHub"
              className="flex h-12 w-12 items-center justify-center neon-hover rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              aria-label="LinkedIn"
              className="flex h-12 w-12 items-center justify-center neon-hover rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>

            <MagneticButton
              as="a"
              href="#work"
              className="group flex items-center gap-3 rounded-full bg-fg px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-bg transition-colors duration-300 hover:bg-accent"
            >
              View My Work
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      {/* ticker footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25, duration: 0.7 }}
        className="relative z-10 mx-auto mt-14 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[11px] uppercase tracking-[0.24em] text-fg-dim"
      >
        <span>{projects.length} featured projects</span>
        <span className="hidden sm:block">17 public repositories</span>
        <span>Flutter · Next.js · Spring Boot · Swift</span>
      </motion.div>
    </section>
  );
}
