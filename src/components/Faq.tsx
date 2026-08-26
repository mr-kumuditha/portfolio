import { profile } from "@/data/content";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    question: "Who is Kumuditha Tharinda Liyanage?",
    answer:
      "Kumuditha Tharinda Liyanage is an HND Software Engineering student at NIBM in Sri Lanka and a full-stack developer building mobile, web, desktop and cloud software.",
  },
  {
    question: "What has Kumuditha Tharinda Liyanage built?",
    answer:
      "His selected work includes Navora, a Sri Lanka travel application; Fixora, a device repair management app; MacPulse, a macOS monitoring utility; and several full-stack web and IoT systems.",
  },
  {
    question: "What technologies does he use?",
    answer:
      "He works with Flutter, Kotlin, React, Next.js, Java Spring Boot, Firebase, Supabase, Swift, Python and ESP32-based IoT tooling, selecting technologies to fit each project.",
  },
  {
    question: "Is Kumuditha available for software engineering internships?",
    answer:
      `Yes. ${profile.firstName} is open to software engineering internships and can be contacted at ${profile.email}.`,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Faq() {
  return (
    <section id="faq" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          num="04"
          eyebrow="Quick Answers"
          title="About Kumuditha"
        />
        <p className="max-w-3xl text-lg leading-relaxed text-fg-muted">
          Kumuditha Tharinda Liyanage is a software engineering student and
          full-stack developer in Sri Lanka. These answers summarise his
          background, work and current availability.
        </p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question} className="bg-bg-elevated p-6 sm:p-8">
              <h3 className="font-display text-xl font-medium text-fg">
                {faq.question}
              </h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
