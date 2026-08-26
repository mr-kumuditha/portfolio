import Reveal from "./Reveal";

export default function SectionHeading({
  num,
  title,
  eyebrow,
}: {
  num: string;
  title: string;
  eyebrow: string;
}) {
  return (
    <Reveal className="mb-14 flex items-end gap-4 sm:mb-20">
      <span className="font-display text-sm text-accent">{num} /</span>
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-fg-muted">
          {eyebrow}
        </p>
        <h2 className="font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
