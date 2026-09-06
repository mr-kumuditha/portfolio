# tharinda.dev — Personal Portfolio

My personal portfolio site: a single-page, animation-heavy showcase of who I am, the
projects I have built, and how to reach me.

**Live:** [tharinda.dev](https://tharinda.dev)

> _Add a screenshot of the site at `docs/preview.png`, then uncomment the line below._

<!-- ![Portfolio preview](docs/preview.png) -->


---

## Features

- **Hero, About, Approach, Projects, Skills, FAQ, and Contact** sections on one scrollable page
- **Project detail pages** at `/projects/[slug]`, generated from a single content file
- **Motion throughout** — scroll reveals, a marquee, animated stat counters, and a magnetic call-to-action button, built with [Motion](https://motion.dev)
- **Smooth scrolling** via [Lenis](https://lenis.darkroom.engineering/), plus a scroll-progress indicator
- **Custom cursor** with a glow effect, an animated background, and an intro splash screen
- **Optional sound** — a toggle with accompanying audio, off by default
- **Light/dark aware** styling and a profile-image switcher
- **SEO built in** — `sitemap.ts`, `robots.ts`, Open Graph metadata, and an `llms.txt`
- **Data-driven** — name, links, skills, and every project live in [`src/data/content.ts`](src/data/content.ts); no component edits needed to update content

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) · React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Motion · Lenis |
| Icons | lucide-react · react-icons |
| Images | `sharp` (via `npm run optimize:images`) |
| Tooling | ESLint 9 (`eslint-config-next`) |
| Hosting | Vercel |

## Getting Started

**Prerequisites:** Node.js 20.9+ and npm.

```bash
git clone https://github.com/mr-kumuditha/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables are required to run the site locally.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run optimize:images` | Re-compress images in `public/` with `sharp` |

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # single-page composition of all sections
│   ├── layout.tsx          # metadata, fonts, providers
│   ├── projects/[slug]/    # per-project detail pages
│   ├── sitemap.ts          # generated from content.ts
│   └── robots.ts
├── components/             # Hero, About, Projects, Skills, Contact, cursor, motion, ...
├── data/
│   └── content.ts          # profile, links, skills, and project list — edit here
└── lib/
public/                     # images, audio, icons
scripts/optimize-images.mjs # image optimization helper
```

## Editing Content

Update [`src/data/content.ts`](src/data/content.ts) to change:

- profile name, role, email, GitHub, LinkedIn, and domain
- the skills list
- the projects array — each entry drives both a card on the home page and its `/projects/<id>` page

## Deployment

Deployed on [Vercel](https://vercel.com). Every push to `main` triggers a production
deploy; pull requests get preview URLs. Build command `next build`, output handled by
the Vercel Next.js runtime.

## License

Code and content © Kumuditha Tharinda Liyanage. Please ask before reusing the design
or copy.
