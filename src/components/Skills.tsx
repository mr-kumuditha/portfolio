"use client";

import { motion } from "motion/react";
import { techGroups } from "@/data/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import TechIcon from "./TechIcon";
import Marquee from "./Marquee";

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          num="02"
          eyebrow="Tech Stack"
          title="Tools of the Trade"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {techGroups.map((group, gi) => (
            <Reveal
              key={group.title}
              delay={gi * 0.08}
              className="card-sheen glass rounded-3xl border border-border p-7 sm:p-9"
            >
              <div className="mb-7 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-medium text-fg">
                  {group.title}
                </h3>
                <p className="text-right text-xs uppercase tracking-[0.2em] text-fg-dim">
                  {group.caption}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {group.tech.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.45,
                      delay: gi * 0.05 + i * 0.035,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -4 }}
                    data-cursor-hover
                    className="group relative flex flex-col items-center gap-2.5 rounded-2xl border border-border/60 bg-bg/40 px-3 py-5 text-center transition-colors duration-300"
                    style={
                      {
                        "--tech": tech.color,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(120px circle at 50% 0%, ${tech.color}22, transparent 70%)`,
                        boxShadow: `inset 0 0 0 1px ${tech.color}44`,
                      }}
                    />
                    <TechIcon
                      name={tech.icon}
                      className="relative h-7 w-7 shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: tech.color }}
                    />
                    <span className="relative text-[11px] font-medium leading-tight text-fg-muted transition-colors duration-300 group-hover:text-fg">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.15} className="mt-20">
        <Marquee />
      </Reveal>
    </section>
  );
}
