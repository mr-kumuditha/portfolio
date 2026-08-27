"use client";

import * as m from "motion/react-m";
import { about, profile, stats, education } from "@/data/content";
import SectionHeading from "./SectionHeading";
import StatCounter from "./StatCounter";
import Reveal from "./Reveal";
import ProfileImageSwitcher from "./ProfileImageSwitcher";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function About() {
  return (
    <section id="about" className="deferred-section relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading num="01" eyebrow="About Me" title="Who I Am" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* portrait */}
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:mx-0">
              <m.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 rounded-[2.5rem] opacity-40 blur-2xl"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, var(--accent), transparent 55%)",
                }}
              />

              <ProfileImageSwitcher
                src={profile.photo}
                hoverSrc={profile.photoAlt}
                alt={profile.name}
              >
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="font-display text-lg font-medium text-fg">
                      {profile.firstName}
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] text-fg-muted">
                      {profile.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      aria-label="GitHub"
                      className="flex h-9 w-9 items-center justify-center neon-hover rounded-full border border-border bg-bg/60 text-fg-muted backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      aria-label="LinkedIn"
                      className="flex h-9 w-9 items-center justify-center neon-hover rounded-full border border-border bg-bg/60 text-fg-muted backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </ProfileImageSwitcher>
            </div>
          </Reveal>

          {/* copy */}
          <div className="lg:col-span-7">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 + i * 0.08}>
                <p
                  className={`mb-6 text-balance leading-relaxed ${
                    i === 0
                      ? "text-xl text-fg sm:text-2xl"
                      : "text-lg text-fg-muted sm:text-xl"
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.3} className="mt-10 grid grid-cols-2 gap-6 sm:gap-8">
              {stats.map((s) => (
                <div key={s.label} className="border-t border-border pt-4">
                  <p className="font-display text-4xl font-medium text-fg sm:text-5xl">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-fg-dim">
                    {s.label}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.38} className="mt-12">
              <div className="glass card-sheen rounded-2xl border border-border p-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-accent">
                  {education.status}
                </p>
                <h3 className="mt-2 font-display text-lg font-medium text-fg">
                  {education.degree}
                </h3>
                <p className="mt-1 text-sm text-fg-muted">
                  {education.institution}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
