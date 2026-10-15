import React from "react";
import Link from "next/link";
import { Calendar, MapPin, AlertCircle, ArrowRight } from "lucide-react";
import { EVENT_METADATA } from "@/data/eventData";

export function AnnouncementBanner() {
  return (
    <aside
      aria-label="Event Notice and Dates"
      className="bg-[#081a14] border-b border-[#1b5341]/40 text-[#dfd6c4] text-xs sm:text-sm py-2 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#fcfbf8]">
            <span className="w-2 h-2 rounded-full bg-[#be9740] animate-pulse" aria-hidden="true" />
            {EVENT_METADATA.name}
          </span>
          <span className="hidden sm:inline text-[#7e8d87]">•</span>
          <span className="inline-flex items-center gap-1 text-[#fcfbf8]">
            <Calendar className="w-3.5 h-3.5 text-[#d6b25e]" aria-hidden="true" />
            {EVENT_METADATA.dates}
          </span>
          <span className="hidden sm:inline text-[#7e8d87]">•</span>
          <span className="inline-flex items-center gap-1 text-[#ede7db]">
            <MapPin className="w-3.5 h-3.5 text-[#c25e38]" aria-hidden="true" />
            GIET University, Gunupur, Odisha
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-amber-300 font-medium bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded text-[11px] sm:text-xs">
            <AlertCircle className="w-3 h-3" aria-hidden="true" />
            Tentative Programme
          </span>
          <Link
            href="/programme"
            className="inline-flex items-center gap-1 text-xs text-[#d6b25e] hover:text-[#fcfbf8] font-medium underline underline-offset-2 transition-colors"
          >
            <span>View Draft Schedule</span>
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
