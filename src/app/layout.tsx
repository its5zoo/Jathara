import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { PublicHeaderWrapper, PublicFooterWrapper } from "@/components/layout/ConditionalPublicLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://isf-startup-jathara-2026.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ISF Startup Jathara 2026 | Startup Jathara @ Dandakaranya",
    template: "%s | ISF Startup Jathara 2026",
  },
  description:
    "Official website for ISF Startup Jathara 2026 (18–20 December 2026, GIET University, Gunupur, Odisha). Connecting grassroots, rural, and tribal youth innovators with global investors, GCC leaders, and mentors.",
  keywords: [
    "ISF Startup Jathara 2026",
    "Startup Jathara Dandakaranya",
    "International Startup Foundation",
    "GIET University Gunupur",
    "IncubateX",
    "Tribal Entrepreneurship",
    "Rural Innovation",
    "Junicorn",
    "Odisha Startups",
    "Global Investors GCC Connect",
  ],
  authors: [{ name: "International Startup Foundation" }, { name: "GIET University" }],
  openGraph: {
    title: "ISF Startup Jathara 2026 | Startup Jathara @ Dandakaranya",
    description:
      "18–20 December 2026 at GIET University, Gunupur. Grassroots innovation, tribal youth entrepreneurship, Araku coffee networking, and global investor roundtables.",
    siteName: "ISF Startup Jathara 2026",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ISF Startup Jathara 2026",
    description: "Startup Jathara @ Dandakaranya | 18–20 December 2026 at GIET University, Gunupur, Odisha",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${libreBaskerville.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fcfbf8] text-[#161e1b] selection:bg-[#c25e38]/20 selection:text-[#a74e2d]">
        {/* Skip to Main Content Link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#143e30] focus:text-[#fcfbf8] focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#d6b25e]"
        >
          Skip to main content
        </a>

        {/* Public Global Header & Announcement (Suppressed on /admin) */}
        <PublicHeaderWrapper />

        {/* Main Content Landmark */}
        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>

        {/* Public Global Footer (Suppressed on /admin) */}
        <PublicFooterWrapper />
      </body>
    </html>
  );
}
