import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import { profile, projects } from "@/data/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `https://${profile.domain}/#person`,
      name: profile.name,
      url: `https://${profile.domain}`,
      image: `https://${profile.domain}${profile.photo}`,
      jobTitle: "Software Engineering Student and Full-Stack Developer",
      description:
        "Kumuditha Tharinda Liyanage is a software engineering student in Sri Lanka who builds practical mobile, web, desktop and cloud software.",
      email: `mailto:${profile.email}`,
      sameAs: [profile.github, profile.linkedin],
      knowsAbout: [
        "Full-stack development",
        "Flutter",
        "Next.js",
        "Android development",
        "Java Spring Boot",
        "Firebase",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `https://${profile.domain}/#website`,
      name: `${profile.name} Portfolio`,
      url: `https://${profile.domain}`,
      inLanguage: "en",
      author: { "@id": `https://${profile.domain}/#person` },
      mainEntity: { "@id": `https://${profile.domain}/#person` },
    },
    {
      "@type": "ItemList",
      name: "Selected software projects by Kumuditha Tharinda Liyanage",
      itemListElement: projects.map((project, position) => ({
        "@type": "ListItem",
        position: position + 1,
        url: `https://${profile.domain}/projects/${project.id}`,
        name: project.title,
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Faq />
      <Approach />
      <Contact />
    </>
  );
}
