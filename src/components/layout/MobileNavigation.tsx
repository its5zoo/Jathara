"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ExternalLink, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { MOBILE_NAV_GROUPS } from "@/data/eventData";
import { cn } from "@/lib/utils";
import { Badge } from "../common/Badge";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close drawer automatically when route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="xl:hidden">
      {/* Mobile Menu Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-1.5 min-[380px]:p-2 sm:p-2.5 rounded-xl border border-[#dfd6c4] bg-[#f7f4ec] text-[#143e30] hover:bg-[#ede7db] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143e30] shadow-2xs flex items-center justify-center gap-1.5 shrink-0 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] touch-manipulation"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
          Menu
        </span>
      </button>

      {/* Accessible Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-[#081a14]/65 z-50 backdrop-blur-xs transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Full-Height Slide-Over Drawer */}
      <div
        id="mobile-navigation-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Summit Navigation Menu"
        aria-hidden={!isOpen}
        className={cn(
          "fixed top-0 right-0 bottom-0 w-[88%] sm:w-[380px] md:w-[420px] max-w-full bg-[#fcfbf8] border-l border-[#e6dfd1] z-50 shadow-2xl flex flex-col justify-between transform transition-all duration-300 ease-in-out",
          isOpen
            ? "translate-x-0 opacity-100 visible pointer-events-auto"
            : "translate-x-full opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Drawer Header with Dual Brand Marks */}
        <div className="p-3.5 min-[380px]:p-4 sm:p-5 border-b border-[#e6dfd1] bg-[#f7f4ec] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* ISF Organizer Logo */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white p-1 flex items-center justify-center border border-[#dfd6c4] shadow-2xs shrink-0">
              <Image
                src="/logos/isf-logo.webp"
                alt="ISF Logo"
                width={32}
                height={32}
                className="max-h-6 max-w-6 sm:max-h-7 sm:max-w-7 w-auto h-auto object-contain"
              />
            </div>

            {/* GIET University Host Crest */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white p-1 flex items-center justify-center border border-[#dfd6c4] shadow-2xs shrink-0">
              <Image
                src="/logos/giet-logo.png"
                alt="GIET University Crest"
                width={32}
                height={32}
                className="max-h-6 max-w-6 sm:max-h-7 sm:max-w-7 w-auto h-auto object-contain"
              />
            </div>

            <div className="min-w-0">
              <div className="font-serif font-black text-[#103327] text-xs min-[380px]:text-sm leading-tight truncate">
                ISF Startup Jathara
              </div>
              <div className="text-[10px] min-[380px]:text-[11px] text-[#c25e38] font-bold tracking-tight">
                Dandakaranya 2026
              </div>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 sm:p-2.5 rounded-xl text-[#333e3a] hover:bg-[#ede7db] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143e30] min-w-[38px] min-h-[38px] flex items-center justify-center shrink-0 touch-manipulation"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area with Categorized Groups */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-6">
          
          {/* Quick Summit Status Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900">
                18–20 December 2026 • Gunupur, Odisha
              </p>
              <p className="text-[11px] text-amber-800/90 mt-0.5">
                Hosted at GIET University Campus. Draft schedule announced.
              </p>
            </div>
          </div>

          {/* Categorized Link Groups */}
          {MOBILE_NAV_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#8c671b] px-3">
                {group.groupTitle}
              </h3>

              <div className="space-y-1">
                {group.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "group flex items-center justify-between p-3 rounded-xl transition-all text-left",
                        isActive
                          ? "bg-[#143e30] text-[#fcfbf8] shadow-xs"
                          : "text-[#222b27] hover:bg-[#ede7db]/60 hover:text-[#103327]"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className={cn("text-sm font-bold leading-snug", isActive ? "text-[#fcfbf8]" : "text-[#103327]")}>
                            {link.label}
                          </span>
                          {link.badge && (
                            <Badge
                              variant={isActive ? "gold" : "terracotta"}
                              size="sm"
                              className="text-[10px] py-0 px-1.5"
                            >
                              {link.badge}
                            </Badge>
                          )}
                        </div>
                        <p className={cn("text-[11px] mt-0.5 line-clamp-1", isActive ? "text-[#dfd6c4]" : "text-[#7e8d87]")}>
                          {link.description}
                        </p>
                      </div>

                      <ArrowRight
                        className={cn(
                          "w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5",
                          isActive ? "text-[#fcfbf8]" : "text-[#7e8d87]"
                        )}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

        </div>

        {/* Drawer Footer with Actions & Host Credibility */}
        <div className="p-4 sm:p-5 border-t border-[#e6dfd1] bg-[#f7f4ec] space-y-3 shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <Link
            href="/register"
            onClick={() => setIsOpen(false)}
            className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold bg-[#c25e38] text-[#fcfbf8] hover:bg-[#a64e2d] shadow-xs hover:shadow-sm active:scale-98 transition-all"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Registration Gateway</span>
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="p-2.5 rounded-xl bg-white border border-[#dfd6c4] flex items-center justify-between text-xs text-[#4a5752]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#256f57]" />
              <span className="font-semibold text-[#103327]">
                GIET University • Host Campus
              </span>
            </div>
            <a
              href="https://www.giet.edu/schools/school-of-engineering/"
              target="_blank"
              rel="noreferrer"
              className="text-[#256f57] font-bold hover:underline flex items-center gap-1"
            >
              <span>Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
