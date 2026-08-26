"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import MagneticButton from "./MagneticButton";
import SoundToggle from "./SoundToggle";

const sections = [
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "work", label: "Work", num: "03" },
  { id: "approach", label: "Approach", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

export default function Nav() {
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile menu, and close it if the viewport grows
  // past the breakpoint while it's open (rotating a tablet, for instance).
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => setOpen(false);
    mq.addEventListener("change", close);

    return () => {
      document.body.style.overflow = "";
      mq.removeEventListener("change", close);
    };
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-bg/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
          <a
            href="#top"
            data-cursor-hover
            className="font-display text-sm font-medium tracking-widest text-fg"
          >
            KTL<span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-cursor-hover
                className={`group relative text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                  active === s.id ? "text-accent" : "text-fg-muted hover:text-fg"
                }`}
              >
                <span className="mr-1.5 text-[10px] opacity-60">{s.num}</span>
                {s.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                    active === s.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <SoundToggle />

            <MagneticButton
              as="a"
              href="#contact"
              className="hidden rounded-full border border-border px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent md:inline-block"
            >
              Let&apos;s Talk
            </MagneticButton>

            <button
              onClick={() => setOpen((o) => !o)}
              data-cursor-hover
              className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              className="h-px w-6 bg-fg"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="h-px w-6 bg-fg"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              className="h-px w-6 bg-fg"
            />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {sections.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="font-display text-4xl font-medium text-fg"
                >
                  <span className="mr-3 text-base text-accent">{s.num}</span>
                  {s.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
