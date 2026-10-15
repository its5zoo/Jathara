"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Calendar, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/data/eventData";
import { cn } from "@/lib/utils";
import { MobileNavigation } from "./MobileNavigation";
import { Container } from "../common/Container";

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 border-b",
        isScrolled
          ? "bg-[#fcfbf8]/95 backdrop-blur-md border-[#e6dfd1] shadow-[0_2px_12px_rgba(13,40,30,0.05)] py-2 sm:py-2.5"
          : "bg-[#fcfbf8] border-[#ede7db] py-2.5 sm:py-3.5"
      )}
    >
      <Container size="wide" className="px-3 min-[380px]:px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4 min-w-0">
          
          {/* ZONE 1 (LEFT): Authentic Event Identity & Host Attribution */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              className="group flex items-center gap-2 min-[400px]:gap-2.5 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143e30] rounded-xl shrink-0"
              aria-label="ISF Startup Jathara 2026 Homepage"
            >
              {/* Official ISF Mark Container */}
              <div className="w-8 h-8 min-[380px]:w-9 min-[380px]:h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-2xs border border-[#e6dfd1] transition-transform duration-200 group-hover:scale-105 shrink-0">
                <Image
                  src="/logos/isf-logo.webp"
                  alt="International Startup Foundation (ISF) Logo"
                  width={36}
                  height={36}
                  className="max-h-6 max-w-6 min-[380px]:max-h-7 min-[380px]:max-w-7 sm:max-h-8 sm:max-w-8 w-auto h-auto object-contain"
                  priority
                />
              </div>

              {/* Event Typography Lockup — Guaranteed never to shrink or truncate abruptly */}
              <div className="flex flex-col text-left shrink-0">
                <span className="font-serif font-black text-xs min-[400px]:text-sm sm:text-base lg:text-[17px] text-[#0d281e] tracking-tight leading-tight group-hover:text-[#1b5341] transition-colors whitespace-nowrap">
                  ISF STARTUP JATHARA
                </span>
                <span className="text-[9px] min-[400px]:text-[10px] sm:text-[11px] font-bold text-[#c25e38] tracking-wider uppercase mt-0.5 flex items-center gap-1 sm:gap-1.5 leading-none whitespace-nowrap">
                  <span>Dandakaranya 2026</span>
                  <span className="text-[#8c671b] font-medium normal-case hidden 2xl:inline shrink-0">
                    • 18–20 Dec
                  </span>
                </span>
              </div>
            </Link>

            {/* GIET University Host Attribution — Displayed strictly on 2xl: (1536px+) where there is abundant space */}
            <a
              href="https://www.giet.edu/schools/school-of-engineering/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GIET University School of Engineering Website"
              className="hidden 2xl:flex items-center gap-2 pl-3.5 border-l border-[#e6dfd1] shrink-0 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143e30] rounded-lg p-0.5"
            >
              <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center border border-[#e6dfd1] shadow-2xs shrink-0">
                <Image
                  src="/logos/giet-logo.png"
                  alt="GIET University Crest"
                  width={28}
                  height={28}
                  className="max-h-6 max-w-6 w-auto h-auto object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase tracking-wider text-[#8c671b] font-bold leading-none">
                  Host Campus
                </span>
                <span className="text-[11px] font-bold text-[#103327] leading-tight mt-0.5 whitespace-nowrap">
                  GIET University
                </span>
              </div>
            </a>
          </div>

          {/* ZONE 2 (CENTER): Primary Desktop Navigation — Hidden below xl (1280px) to prevent squeezing */}
          <nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-center justify-center gap-1 2xl:gap-1.5 shrink-0"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-2 2xl:px-2.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-semibold transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143e30]",
                    isActive
                      ? "text-[#103327] font-bold bg-[#143e30]/8 shadow-2xs after:absolute after:bottom-0 after:left-2 after:right-2 2xl:after:left-2.5 2xl:after:right-2.5 after:h-0.5 after:bg-[#143e30] after:rounded-full"
                      : "text-[#333e3a] hover:text-[#103327] hover:bg-[#ede7db]/50"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="inline-flex items-center gap-1 2xl:gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span
                        className={cn(
                          "text-[8.5px] 2xl:text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold leading-none",
                          isActive
                            ? "bg-[#143e30] text-[#fcfbf8]"
                            : "bg-amber-100 text-amber-900 border border-amber-300/80"
                        )}
                      >
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* ZONE 3 (RIGHT): Action Zone & Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Draft Schedule Indicator (Displayed on 2xl screens only to avoid competing for space) */}
            <Link
              href="/programme"
              className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50/90 hover:bg-amber-100 text-amber-900 border border-amber-200/90 transition-colors shadow-2xs shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-800" />
              <span>Draft Schedule</span>
            </Link>

            {/* Primary Registration Call to Action */}
            <Link
              href="/register"
              className="group inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#c25e38] text-[#fcfbf8] hover:bg-[#a64e2d] shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-95 shrink-0 min-h-[36px] sm:min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e38]"
              aria-label="Register for ISF Startup Jathara 2026"
            >
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform duration-200 group-hover:translate-x-0.5 hidden min-[400px]:inline" />
            </Link>

            {/* Mobile / Tablet Navigation Trigger */}
            <MobileNavigation />
          </div>

        </div>
      </Container>
    </header>
  );
}
