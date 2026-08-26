"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "@/data/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { GithubIcon, LinkedinIcon } from "./icons";

const links = [
  { label: "GitHub", href: profile.github, Icon: GithubIcon },
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedinIcon },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section id="contact" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading num="05" eyebrow="Get In Touch" title="Let's Connect" />

        <Reveal>
          <p className="max-w-3xl text-balance font-display text-3xl font-medium leading-[1.15] text-fg sm:text-5xl lg:text-6xl">
            Have an internship opportunity or an interesting project?{" "}
            <span className="text-fg-dim">I&apos;d love to hear from you.</span>
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14 flex flex-wrap items-center gap-4">
          <MagneticButton
            as="a"
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-bg transition-transform duration-300"
          >
            Send a Message
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <button
            onClick={copyEmail}
            data-cursor-hover
            className="flex items-center gap-3 rounded-full border border-border px-7 py-4 text-sm text-fg-muted transition-colors duration-300 hover:border-accent hover:text-fg"
          >
            {profile.email}
            {copied ? (
              <Check className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </Reveal>

        <Reveal delay={0.25} className="mt-20 border-t border-border pt-10">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {links.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="group flex items-center justify-between gap-4 bg-bg-elevated p-7 transition-colors duration-300 hover:bg-bg"
              >
                <span className="flex items-center gap-4">
                  <Icon className="h-5 w-5 text-fg-muted transition-colors duration-300 group-hover:text-accent" />
                  <span className="font-display text-lg text-fg">{label}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-fg-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
