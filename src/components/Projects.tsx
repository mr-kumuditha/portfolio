"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { projects, type Project } from "@/data/content";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

// The modal is only needed after someone opens a project. Keeping it out of
// the landing-page bundle shortens the first interaction and paint path.
const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false });

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="deferred-section deferred-projects relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            num="03"
            eyebrow="Selected Work"
            title="Things I've Built"
          />
          <Reveal delay={0.1} className="mb-14 sm:mb-20">
            <p className="text-xs uppercase tracking-[0.22em] text-fg-dim">
              {projects.length} projects · click any card for the full story
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} onOpen={() => setActive(project)} />
            </Reveal>
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
