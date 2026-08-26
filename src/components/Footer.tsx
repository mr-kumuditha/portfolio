import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-8 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-fg-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with Next.js &amp; Motion</p>
      </div>
    </footer>
  );
}
