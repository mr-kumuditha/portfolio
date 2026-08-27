import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { SoundProvider } from "@/components/SoundContext";
import { profile } from "@/data/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description:
    "Kumuditha Tharinda Liyanage is a software engineering student and full-stack developer in Sri Lanka building mobile, web, desktop and cloud software.",
  metadataBase: new URL(`https://${profile.domain}`),
  alternates: {
    canonical: "/",
  },
  applicationName: "Kumuditha Tharinda Liyanage Portfolio",
  authors: [{ name: profile.name, url: `https://${profile.domain}` }],
  creator: profile.name,
  keywords: [
    "Kumuditha Tharinda Liyanage",
    "software engineering student",
    "full stack developer Sri Lanka",
    "Flutter developer Sri Lanka",
    "Next.js developer Sri Lanka",
  ],
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description:
      "Software engineering student and full-stack developer in Sri Lanka building practical mobile, web, desktop and cloud software.",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    type: "website",
    images: [{ url: profile.photo, width: 900, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description:
      "Software engineering student and full-stack developer in Sri Lanka building practical software.",
    images: [profile.photo],
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <SoundProvider>
          <MotionProvider>
            <AnimatedBackground />
            <div className="grain" />
            <ScrollProgress />
            <Nav />
            {/* `relative` only, no z-index: a z-index here would make main a
                stacking context and trap the project modal beneath the nav. */}
            <main className="relative flex-1">{children}</main>
            <Footer />
          </MotionProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
