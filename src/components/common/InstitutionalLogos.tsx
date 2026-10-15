import React from "react";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { PARTNERS_ORGANIZATIONS } from "@/data/eventData";
import { cn } from "@/lib/utils";

interface InstitutionalLogosProps {
  variant?: "hero-strip" | "cards" | "footer-lockup" | "inline";
  className?: string;
}

export function InstitutionalLogos({
  variant = "hero-strip",
  className,
}: InstitutionalLogosProps) {
  if (variant === "hero-strip") {
    return (
      <div className={cn("w-full max-w-4xl mx-auto", className)}>
        <p className="text-center text-[11px] sm:text-xs uppercase tracking-widest text-[#dfd6c4]/80 font-semibold mb-4">
          Convened Under The Aegis Of
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
          {PARTNERS_ORGANIZATIONS.map((org) => (
            <a
              key={org.id}
              href={org.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3.5 p-3 rounded-2xl bg-[#081a14]/90 border border-[#1b5341] hover:border-[#d6b25e]/70 hover:bg-[#103327] transition-all duration-200 shadow-md backdrop-blur-sm"
              aria-label={`Visit official portal of ${org.name}`}
            >
              {/* Logo Well with crisp contrast & unclipped aspect ratio */}
              <div className="w-16 h-14 sm:w-20 sm:h-16 rounded-xl bg-white p-1.5 sm:p-2 flex items-center justify-center shrink-0 shadow-xs border border-white/60 group-hover:scale-105 transition-transform">
                {org.logoUrl ? (
                  <Image
                    src={org.logoUrl}
                    alt={org.logoAlt || `${org.name} Official Logo`}
                    width={70}
                    height={56}
                    className="max-h-11 sm:max-h-12 max-w-[60px] sm:max-w-[70px] w-auto h-auto object-contain"
                  />
                ) : (
                  <span className="font-serif font-black text-xs text-[#081a14]">
                    {org.abbreviation}
                  </span>
                )}
              </div>

              {/* Text Meta */}
              <div className="min-w-0 flex-1 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#d6b25e] block truncate">
                    {org.role}
                  </span>
                  {org.id === "org-giet" && (
                    <span className="text-[9px] font-bold bg-[#256f57] text-[#fcfbf8] px-1.5 py-0.2 rounded uppercase">
                      Gunupur
                    </span>
                  )}
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-[#fcfbf8] leading-tight block truncate group-hover:text-[#f7f4ec]">
                  {org.name}
                </span>
                <span className="text-[11px] text-[#c8d1cd] flex items-center gap-1 mt-0.5">
                  <span className="truncate">
                    {org.id === "org-giet" ? "School of Engineering & Tech" : org.website.replace("https://www.", "").replace("https://", "").replace(/\/$/, "")}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-[#d6b25e] shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "footer-lockup") {
    return (
      <div className={cn("flex flex-wrap items-center gap-4", className)}>
        {PARTNERS_ORGANIZATIONS.map((org) => (
          <a
            key={org.id}
            href={org.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-[#d6b25e]/50 transition-all"
            aria-label={`${org.role}: ${org.name}`}
          >
            <div className="w-13 h-11 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-white/40">
              {org.logoUrl && (
                <Image
                  src={org.logoUrl}
                  alt={org.logoAlt || org.name}
                  width={48}
                  height={38}
                  className="max-h-9 max-w-11 w-auto h-auto object-contain"
                />
              )}
            </div>
            <div className="text-left">
              <span className="text-[9px] uppercase tracking-wider text-[#d6b25e] font-semibold block">
                {org.role}
              </span>
              <span className="text-xs font-semibold text-[#fcfbf8] block leading-tight">
                {org.abbreviation}
              </span>
            </div>
          </a>
        ))}
      </div>
    );
  }

  // Fallback inline display
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {PARTNERS_ORGANIZATIONS.map((org) => (
        <a
          key={org.id}
          href={org.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f7f4ec] border border-[#ede7db] hover:border-[#143e30] transition-colors"
        >
          {org.logoUrl && (
            <div className="w-5 h-5 flex items-center justify-center">
              <Image
                src={org.logoUrl}
                alt={org.logoAlt || org.name}
                width={20}
                height={20}
                className="max-h-5 max-w-5 object-contain"
              />
            </div>
          )}
          <span className="text-xs font-semibold text-[#143e30]">{org.name}</span>
          <ExternalLink className="w-3 h-3 text-[#7e8d87]" />
        </a>
      ))}
    </div>
  );
}
