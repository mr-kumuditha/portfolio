import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { getProjectBySlug, profile, projects } from "@/data/content";
import { GithubIcon } from "@/components/icons";

type Props = {
  params: Promise<{ slug: string }>;
};

function projectDescription(project: (typeof projects)[number]) {
  return `${project.title} is a ${project.category.toLowerCase()} built with ${project.stack
    .slice(0, 3)
    .join(", ")} by Kumuditha Tharinda Liyanage.`;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  const description = projectDescription(project);
  const pathname = `/projects/${project.id}`;

  return {
    title: `${project.title} Case Study | Kumuditha Tharinda`,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      title: `${project.title} Case Study`,
      description,
      url: pathname,
      type: "article",
      images: [{ url: project.image, width: 1600, height: 1066 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} Case Study`,
      description,
      images: [project.image],
    },
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const projectUrl = `https://${profile.domain}/projects/${project.id}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "CreativeWork"],
    "@id": `${projectUrl}#project`,
    name: project.title,
    description: project.description,
    url: projectUrl,
    image: `https://${profile.domain}${project.image}`,
    applicationCategory: project.category,
    dateCreated: project.year,
    author: {
      "@type": "Person",
      "@id": `https://${profile.domain}/#person`,
      name: profile.name,
      url: `https://${profile.domain}`,
    },
    ...(project.repo ? { codeRepository: project.repo } : {}),
    keywords: project.stack.join(", "),
  };

  return (
    <article className="relative px-6 pb-28 pt-32 sm:px-10 sm:pb-36 sm:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to selected work
        </Link>

        <header className="mt-12 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-5 font-display text-5xl font-medium tracking-tight text-fg sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-4 font-display text-xl sm:text-2xl" style={{ color: project.accent }}>
            {project.subtitle}
          </p>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-fg-muted">
            {project.description}
          </p>
        </header>

        <div className="relative mt-14 aspect-16/9 overflow-hidden rounded-3xl border border-border bg-bg">
          <Image
            src={project.image}
            alt={`${project.title} project interface preview`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-cover object-top"
          />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <section aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="font-display text-3xl font-medium text-fg sm:text-4xl">
                Project overview
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-fg-muted">
                {project.overview}
              </p>
            </section>

            <section className="mt-14" aria-labelledby="features-heading">
              <h2 id="features-heading" className="font-display text-3xl font-medium text-fg sm:text-4xl">
                What it does
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <article key={feature.title} className="rounded-2xl border border-border bg-bg-elevated p-6">
                    <h3 className="font-display text-lg font-medium text-fg">
                      {feature.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-fg-muted">{feature.detail}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-bg-elevated p-6 lg:sticky lg:top-28">
              <h2 className="text-xs uppercase tracking-[0.25em] text-fg-dim">Built with</h2>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>
                {project.stack.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-fg-muted"
                    style={{ borderColor: `${project.accent}33` }}
                  >
                    {technology}
                  </li>
                ))}
              </ul>
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-between rounded-full px-5 py-3.5 text-sm font-medium"
                  style={{ background: project.accent, color: "#08090a" }}
                >
                  <span className="flex items-center gap-2"><GithubIcon className="h-4 w-4" /> View source on GitHub</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
