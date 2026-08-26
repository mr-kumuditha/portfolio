export const profile = {
  name: "Kumuditha Tharinda Liyanage",
  firstName: "Kumuditha",
  role: "Software Engineering Student",
  tagline:
    "Building practical, production-ready software across mobile, web, desktop and cloud.",
  location: "Colombo, Sri Lanka",
  email: "dev@tharinda.dev",
  github: "https://github.com/mr-kumuditha",
  githubUser: "mr-kumuditha",
  linkedin: "https://www.linkedin.com/in/kumudithaliyanage",
  domain: "tharinda.dev",
  status: "Open to Internships",
  photo: "/profile.webp",
};

export const about = {
  paragraphs: [
    "I'm an HND Software Engineering student at the National Institute of Business Management (NIBM), Sri Lanka, seeking a software engineering internship to gain industry experience and contribute to real software projects.",
    "I build across the whole stack — Flutter and native Android apps, React and Next.js web platforms, Java Spring Boot backends, Swift macOS utilities, Python desktop tools and ESP32 IoT systems.",
    "My HND final project, Navora, is a cross-platform AI travel application built with Flutter and integrated with Firebase AI Logic, Gemini, OSRM routing, Overpass and Google Maps.",
  ],
};

export const stats = [
  { value: 17, suffix: "", label: "Public Repositories" },
  { value: 8, suffix: "", label: "Featured Projects" },
  { value: 6, suffix: "", label: "Languages Shipped" },
  { value: 25, suffix: "+", label: "Technologies Used" },
];

/* ---------- tech stack ---------- */

export type Tech = {
  name: string;
  /** react-icons/si export name */
  icon: string;
  /** official brand colour */
  color: string;
};

export const techGroups: { title: string; caption: string; tech: Tech[] }[] = [
  {
    title: "Languages",
    caption: "What I write every day",
    tech: [
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
      { name: "Java", icon: "SiOpenjdk", color: "#F89820" },
      { name: "Python", icon: "SiPython", color: "#3776AB" },
      { name: "Dart", icon: "SiDart", color: "#0175C2" },
      { name: "Kotlin", icon: "SiKotlin", color: "#7F52FF" },
      { name: "Swift", icon: "SiSwift", color: "#F05138" },
      { name: "C++", icon: "SiCplusplus", color: "#00599C" },
    ],
  },
  {
    title: "Frontend & Mobile",
    caption: "Interfaces people actually use",
    tech: [
      { name: "Flutter", icon: "SiFlutter", color: "#02569B" },
      { name: "React", icon: "SiReact", color: "#61DAFB" },
      { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
      { name: "Jetpack Compose", icon: "SiJetpackcompose", color: "#4285F4" },
      { name: "Android", icon: "SiAndroid", color: "#3DDC84" },
      { name: "HTML5", icon: "SiHtml5", color: "#E34F26" },
      { name: "CSS", icon: "SiCss", color: "#663399" },
    ],
  },
  {
    title: "Backend & APIs",
    caption: "Services, data and integrations",
    tech: [
      { name: "Node.js", icon: "SiNodedotjs", color: "#5FA04E" },
      { name: "Spring Boot", icon: "SiSpringboot", color: "#6DB33F" },
      { name: ".NET Core", icon: "SiDotnet", color: "#512BD4" },
      { name: "Express", icon: "SiExpress", color: "#FFFFFF" },
      { name: "MySQL", icon: "SiMysql", color: "#4479A1" },
      { name: "SQLite", icon: "SiSqlite", color: "#003B57" },
    ],
  },
  {
    title: "Cloud & Tooling",
    caption: "Ship it, run it, watch it",
    tech: [
      { name: "Firebase", icon: "SiFirebase", color: "#FFCA28" },
      { name: "Supabase", icon: "SiSupabase", color: "#3FCF8E" },
      { name: "Google Cloud", icon: "SiGooglecloud", color: "#4285F4" },
      { name: "Vercel", icon: "SiVercel", color: "#FFFFFF" },
      { name: "Cloudflare", icon: "SiCloudflare", color: "#F38020" },
      { name: "Gemini", icon: "SiGooglegemini", color: "#8E75B2" },
      { name: "Git", icon: "SiGit", color: "#F05032" },
      { name: "Arduino", icon: "SiArduino", color: "#00979D" },
    ],
  },
];

export const marqueeTech: Tech[] = [
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
  { name: "Flutter", icon: "SiFlutter", color: "#02569B" },
  { name: "React", icon: "SiReact", color: "#61DAFB" },
  { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF" },
  { name: "Kotlin", icon: "SiKotlin", color: "#7F52FF" },
  { name: "Swift", icon: "SiSwift", color: "#F05138" },
  { name: "Spring Boot", icon: "SiSpringboot", color: "#6DB33F" },
  { name: "Firebase", icon: "SiFirebase", color: "#FFCA28" },
  { name: "Supabase", icon: "SiSupabase", color: "#3FCF8E" },
  { name: "Python", icon: "SiPython", color: "#3776AB" },
  { name: "Java", icon: "SiOpenjdk", color: "#F89820" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
];

/* ---------- projects ---------- */

export type Project = {
  id: string;
  index: string;
  category: string;
  year: string;
  title: string;
  subtitle: string;
  /** one-line hook shown on the card */
  tagline: string;
  description: string;
  /** long-form copy shown in the detail view */
  overview: string;
  features: { title: string; detail: string }[];
  stack: string[];
  accent: string;
  image: string;
  repo?: string;
  language: string;
};

export const projects: Project[] = [
  {
    id: "navora",
    index: "01",
    category: "HND Final Project",
    year: "2026",
    title: "Navora",
    subtitle: "Intelligent Travel Guide to Sri Lanka",
    tagline: "AI-planned journeys with real routing and live place data.",
    description:
      "A cross-platform AI travel application that builds route-based trip plans from real routing and place data, powered by Gemini through Firebase AI Logic.",
    overview:
      "Navora is my HND final project: a Flutter travel companion built specifically for people exploring Sri Lanka. It combines Gemini through Firebase AI Logic for itinerary generation with OSRM for real road routing and Overpass for point-of-interest discovery, so every suggested trip maps to actual roads and actual places — not generic AI guesses. On top of the planner sit social features, encrypted chat, offline caching and blockchain-verified reviews.",
    features: [
      {
        title: "AI Trip Planner",
        detail:
          "Personalised multi-day itineraries generated in seconds through Gemini and Firebase AI Logic.",
      },
      {
        title: "Real Routing",
        detail:
          "OSRM-backed road routing with accurate distance and duration for every leg of the journey.",
      },
      {
        title: "Smart Discovery",
        detail:
          "Overpass and Google Places surface hidden gems near the route instead of only tourist headlines.",
      },
      {
        title: "Interactive Guide",
        detail:
          "Step-by-step in-trip guidance with maps, AR-style navigation and offline caching for weak signal areas.",
      },
      {
        title: "Social & Trust",
        detail:
          "Encrypted chat, trip sharing and blockchain-verified reviews so ratings can't be quietly rewritten.",
      },
    ],
    stack: [
      "Flutter",
      "Dart",
      "Firebase AI Logic",
      "Gemini",
      "Google Maps",
      "OSRM",
      "Overpass",
      "Supabase",
    ],
    accent: "#2DD4BF",
    image: "/projects/navora.webp",
    repo: "https://github.com/mr-kumuditha/Navora",
    language: "Dart",
  },
  {
    id: "fixora",
    index: "02",
    category: "Campus Project",
    year: "2025",
    title: "Fixora",
    subtitle: "Device Repair & Service Management",
    tagline: "Smart repair. Simple life. One app for every fix.",
    description:
      "A role-based Android platform connecting customers, technicians, branch managers and administrators around device repair jobs.",
    overview:
      "Fixora is a mobile platform that connects users with trusted repair service providers. Customers browse services, book appointments, pay securely and leave reviews; technicians manage their job queue; branch managers handle inventory and staffing. The whole thing is built native for Android with offline-ready data handling so the app stays usable in a workshop with bad reception.",
    features: [
      {
        title: "Service Discovery",
        detail:
          "Search and filter repair services across home appliances, electronics, plumbing and electrical.",
      },
      {
        title: "Easy Booking",
        detail:
          "Appointment booking in seconds with live status tracking from pending through confirmed to completed.",
      },
      {
        title: "Secure Payments",
        detail:
          "Integrated PayHere gateway with digital receipts customers can download and share.",
      },
      {
        title: "Role-Based Access",
        detail:
          "Separate flows for customers, technicians, branch managers and administrators in one codebase.",
      },
      {
        title: "Offline Ready",
        detail:
          "SQLite-backed local cache keeps bookings and job data readable when the network drops.",
      },
    ],
    stack: [
      "Kotlin",
      "Java",
      "Android SDK",
      "Jetpack Compose",
      "Firebase",
      "Supabase",
      "SQLite",
      "Retrofit",
      "PayHere",
    ],
    accent: "#4ADE80",
    image: "/projects/fixora.webp",
    repo: "https://github.com/mr-kumuditha/fixora-mobile-app",
    language: "Kotlin",
  },
  {
    id: "macpulse",
    index: "03",
    category: "Desktop Application",
    year: "2026",
    title: "MacPulse",
    subtitle: "Real-time System Monitoring for macOS",
    tagline: "Monitor. Analyze. Optimize. All in real-time.",
    description:
      "A native macOS menu bar application that keeps an eye on your Mac's vital system stats — CPU, memory, disk, network and battery — live.",
    overview:
      "MacPulse is a beautiful and powerful macOS menu bar application that keeps an eye on your Mac's vital system stats in real-time. Key metrics sit one click away in the menu bar, while a full dashboard breaks CPU, memory pressure, disk, network throughput and battery into interactive charts with a live top-processes table. Written 100% in Swift and SwiftUI with Combine driving the live data pipeline — and every reading stays on your Mac.",
    features: [
      {
        title: "Real-time System Stats",
        detail:
          "Live CPU, memory, disk, network and battery usage, refreshed continuously.",
      },
      {
        title: "Menu Bar Integration",
        detail:
          "Key stats at a glance from the macOS menu bar — always accessible, never in the way.",
      },
      {
        title: "Detailed Insights",
        detail:
          "Interactive charts for CPU history, memory pressure and network throughput, plus a live top-processes table.",
      },
      {
        title: "Lightweight & Secure",
        detail:
          "Built with performance in mind, using SMAppService for a proper launch-at-login story.",
      },
      {
        title: "Privacy First",
        detail:
          "All data stays on your Mac. Nothing is uploaded, tracked or phoned home.",
      },
    ],
    stack: [
      "Swift",
      "SwiftUI",
      "Combine",
      "Swift Charts",
      "SMAppService",
      "CoreML",
      "macOS",
    ],
    accent: "#60A5FA",
    image: "/projects/macpulse.webp",
    repo: "https://github.com/mr-kumuditha/MacPulse",
    language: "Swift",
  },
  {
    id: "ever-after-wedding",
    index: "04",
    category: "Full Stack Web Application",
    year: "2026",
    title: "Ever After Wedding",
    subtitle: "Wedding Management System",
    tagline: "Beautiful. Organized. Unforgettable.",
    description:
      "A complete wedding management platform handling packages, customer inquiries, bookings, payments and analytics.",
    overview:
      "Ever After Wedding is a comprehensive management system built for wedding planners who need everything in one place. It handles package creation and pricing, inbound customer inquiries and follow-ups, the full booking calendar, payment and balance tracking, and a reporting dashboard that turns all of it into numbers a planner can act on. Built on Java Spring Boot with Thymeleaf server-rendered views and MySQL.",
    features: [
      {
        title: "Package Management",
        detail:
          "Create and price tiered wedding packages — Essential, Premium and Luxury — and edit them without a redeploy.",
      },
      {
        title: "Customer Inquiries",
        detail:
          "Capture inbound inquiries and track follow-ups so no potential client goes cold.",
      },
      {
        title: "Booking Management",
        detail:
          "Manage bookings, schedules and event details with confirmed and pending status tracking.",
      },
      {
        title: "Payment Tracking",
        detail:
          "Track payments, outstanding balances and full transaction history per contract.",
      },
      {
        title: "Reports & Analytics",
        detail:
          "Revenue, booking volume and client insight dashboards built from live data.",
      },
      {
        title: "Secure & Reliable",
        detail:
          "Role-based access control and secure data management across every planner account.",
      },
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Thymeleaf",
      "MySQL",
      "Bootstrap",
      "TypeScript",
    ],
    accent: "#E5B567",
    image: "/projects/ever-after-wedding.webp",
    repo: "https://github.com/mr-kumuditha/ever-after-wedding",
    language: "TypeScript",
  },
  {
    id: "devpilot-studio",
    index: "05",
    category: "Developer Tool · Claude Code Plugin",
    year: "2026",
    title: "DevPilot Studio",
    subtitle: "Claude Code Marketplace Plugin",
    tagline: "Real-time status bar, usage analytics and rate-limit monitoring.",
    description:
      "A desktop utility and CLI engine giving complete visibility into Claude Code AI sessions — context, cost and rate limits, live in the terminal.",
    overview:
      "DevPilot Studio (DPS) is a professional CLI engine and Claude Code marketplace plugin. It renders a live status bar inside the terminal showing context window capacity, 5-hour and 7-day rate-limit windows, session cost in USD and token velocity — then logs all of it locally for a 7-day history view. Pure POSIX bash with zero runtime dependencies, works on macOS, Linux and Windows via WSL, and never phones home.",
    features: [
      {
        title: "Real-Time Status Bar",
        detail:
          "Live context usage, rate-limit windows and session cost rendered directly in the terminal prompt.",
      },
      {
        title: "Usage Analytics",
        detail:
          "Track tokens in and out, dollars spent and requests made across every session.",
      },
      {
        title: "Token Velocity Alerts",
        detail:
          "Get warned when you're burning tokens fast enough to hit a rate limit before you hit it.",
      },
      {
        title: "7-Day History",
        detail:
          "Local history logging with a cost trend chart rendered straight in the CLI.",
      },
      {
        title: "Zero Runtime Dependencies",
        detail:
          "Pure POSIX bash using only standard tools — bash, jq and coreutils. Portable everywhere.",
      },
      {
        title: "Offline Privacy",
        detail:
          "All data stays local. No telemetry, no external calls, ever.",
      },
    ],
    stack: [
      "POSIX Bash",
      "jq",
      "Node.js",
      "GitHub Actions",
      "ShellCheck",
      "Claude Code Plugin API",
    ],
    accent: "#A78BFA",
    image: "/projects/devpilot-studio.webp",
    repo: "https://github.com/mr-kumuditha/devpilot-studio",
    language: "Shell",
  },
  {
    id: "sinhala-subtitle",
    index: "06",
    category: "Desktop Application",
    year: "2025",
    title: "Sinhala Subtitle Converter",
    subtitle: "Convert. Translate. Enjoy.",
    tagline: "SRT subtitles into Sinhala — fast, offline, timestamp-safe.",
    description:
      "A Python desktop application that translates SRT subtitles into Sinhala and embeds them into video, with batch processing and preserved timestamps.",
    overview:
      "An AI-powered SRT subtitle converter and translator built for Sinhala content. It translates subtitle files line by line while preserving every timestamp exactly, batches requests to keep API usage low, previews original and translated text side by side, and can burn the finished subtitles into the video permanently through an embedded FFmpeg. Files never leave the machine.",
    features: [
      {
        title: "Smart Translation",
        detail:
          "Google Translator API with batched requests for accurate results and low API cost.",
      },
      {
        title: "Timestamp Preservation",
        detail:
          "Every SRT cue keeps its exact original timing through the whole translation pass.",
      },
      {
        title: "Video Embedding",
        detail:
          "Burn translated subtitles into video permanently using bundled FFmpeg.",
      },
      {
        title: "Full Customisation",
        detail:
          "Adjust subtitle font, size, colour and on-screen position before rendering.",
      },
      {
        title: "Privacy First",
        detail:
          "Runs offline for everything except translation — your video files never leave your device.",
      },
    ],
    stack: [
      "Python 3.8+",
      "Tkinter",
      "FFmpeg",
      "Google Translator API",
      "Pillow",
      "TypeScript",
    ],
    accent: "#C084FC",
    image: "/projects/sinhala-subtitle.webp",
    repo: "https://github.com/mr-kumuditha/Sinhala-Subtitle-Converter",
    language: "TypeScript",
  },
  {
    id: "eventhub",
    index: "07",
    category: "Full Stack Web Application",
    year: "2025",
    title: "EventHub",
    subtitle: "Event Management & Ticket Booking",
    tagline: "Discover events. Book memories.",
    description:
      "A hybrid full-stack event platform where organisers create and manage events and users browse and book tickets.",
    overview:
      "EventHub is a hybrid full-stack platform pairing a Java Spring Boot backend with a React and TypeScript frontend over a REST API. Organisers create events with pricing tiers and imagery; users browse featured events, pick VIP, General or Early Bird tickets, and check out with real-time availability. Clean separation between frontend and backend keeps the whole thing maintainable and scalable.",
    features: [
      {
        title: "Event Management",
        detail:
          "Create, update and manage events with detailed descriptions, imagery and category tagging.",
      },
      {
        title: "Ticket Booking",
        detail:
          "Multi-tier ticket selection with real-time availability and a secure checkout flow.",
      },
      {
        title: "Full-Stack Architecture",
        detail:
          "Scalable Java Spring Boot backend paired with a React and Vite frontend.",
      },
      {
        title: "REST API Integration",
        detail:
          "Well-structured REST endpoints power every interaction between frontend and backend.",
      },
      {
        title: "Clean Modern UI",
        detail:
          "Sleek, responsive interface that works the same on desktop and mobile.",
      },
    ],
    stack: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "Vite",
      "Maven",
      "Axios",
    ],
    accent: "#818CF8",
    image: "/projects/eventhub.webp",
    repo: "https://github.com/mr-kumuditha/EAD2",
    language: "TypeScript",
  },
  {
    id: "iot-safety",
    index: "08",
    category: "IoT · Group Project",
    year: "2025",
    title: "IoT Safety Monitoring System",
    subtitle: "Real-time Monitoring. Smarter Safety.",
    tagline: "A smart safety helmet for underground miners.",
    description:
      "An ESP-based safety system tracking hazardous gas, temperature, humidity and fire in real time, with instant multi-channel alerts.",
    overview:
      "A smart safety helmet concept built for underground miners. Multiple sensors feed continuous readings for hazardous gas levels, temperature, humidity and flame detection into Blynk Cloud, where a web dashboard lets supervisors watch zones live and a mobile dashboard puts the same data in a hand. When any reading crosses a safety threshold the system fires alerts through Blynk and email immediately.",
    features: [
      {
        title: "Multi-Parameter Sensing",
        detail:
          "MQ-2 gas, DHT22 temperature and humidity, and a dedicated flame sensor for fire detection.",
      },
      {
        title: "Instant Notifications",
        detail:
          "Threshold breaches trigger alerts across Blynk and email within seconds.",
      },
      {
        title: "Cloud Integration",
        detail:
          "ESP8266 pushes readings to Blynk Cloud for real-time monitoring and historical storage.",
      },
      {
        title: "Mobile & Web Dashboards",
        detail:
          "Supervisors track live data, history graphs and zone-level alerts from anywhere.",
      },
      {
        title: "Built for Continuous Duty",
        detail:
          "Low power, affordable hardware designed to run reliably underground around the clock.",
      },
    ],
    stack: [
      "ESP8266",
      "Arduino IDE",
      "Blynk IoT",
      "C++",
      "TypeScript",
      "MQ-2 Sensor",
      "DHT22",
      "Firebase",
    ],
    accent: "#22D3EE",
    image: "/projects/iot-safety.webp",
    repo: "https://github.com/mr-kumuditha/IoT-Safety-Monitoring-System",
    language: "TypeScript",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.id === slug);
}

export const process = [
  {
    index: "01",
    title: "Mobile Development",
    tag: "Flutter · Kotlin",
    description:
      "Cross-platform Flutter apps and native Android with Jetpack Compose, built offline-first.",
  },
  {
    index: "02",
    title: "Full-Stack Web",
    tag: "React · Spring Boot",
    description:
      "React and Next.js frontends over Java Spring Boot and Node.js REST APIs.",
  },
  {
    index: "03",
    title: "Cloud & Data",
    tag: "Firebase · Supabase",
    description:
      "Firebase, Supabase, Google Cloud and SQL schemas designed to survive real traffic.",
  },
  {
    index: "04",
    title: "AI & Systems",
    tag: "Gemini · Swift · IoT",
    description:
      "Practical AI features, native macOS tooling and ESP32 hardware talking to the cloud.",
  },
];

export const education = {
  degree: "Higher National Diploma in Software Engineering (HND)",
  institution: "National Institute of Business Management (NIBM), Sri Lanka",
  status: "Currently Following",
};
