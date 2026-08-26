import { marqueeTech } from "@/data/content";
import TechIcon from "./TechIcon";

export default function Marquee() {
  const doubled = [...marqueeTech, ...marqueeTech];

  return (
    <div className="marquee-host relative border-y border-border py-7">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12">
          {doubled.map((tech, i) => (
            <span
              key={`${tech.name}-${i}`}
              className="flex shrink-0 items-center gap-3 whitespace-nowrap"
            >
              <TechIcon
                name={tech.icon}
                className="h-6 w-6"
                style={{ color: tech.color }}
              />
              <span className="font-display text-xl text-fg-muted sm:text-2xl">
                {tech.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
