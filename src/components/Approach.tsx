import { process } from "@/data/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Approach() {
  return (
    <section id="approach" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading num="04" eyebrow="How I Work" title="My Approach" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal
              key={step.index}
              delay={i * 0.08}
              className="glass card-sheen group relative overflow-hidden rounded-3xl border border-border p-7 transition-colors duration-500 hover:border-border-strong"
            >
              <span className="pointer-events-none absolute -right-6 -top-8 font-display text-[7rem] font-medium leading-none text-fg/[0.035] transition-colors duration-500 group-hover:text-accent/[0.08]">
                {step.index}
              </span>

              <div className="relative">
                <span className="inline-block rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-accent">
                  {step.tag}
                </span>
                <h3 className="mt-6 font-display text-xl font-medium text-fg">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
