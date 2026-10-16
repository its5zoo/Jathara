"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Car,
  ShieldCheck,
} from "lucide-react";
import { GUNUPUR_HOTELS } from "@/data/hotelsData";

export function GunupurHotelsSection() {
  const [selectedHotelId, setSelectedHotelId] = useState<string>("jagannath-palace");
  const [photoIndices, setPhotoIndices] = useState<Record<string, number>>({
    "jagannath-palace": 0,
    "sai-surya": 0,
    "sree-satya": 0,
    "vijay-in": 0,
  });
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [hasManuallySelected, setHasManuallySelected] = useState<boolean>(false);

  // 3-second auto cycle timer — permanently stops if user manually clicks any hotel or gallery item
  useEffect(() => {
    if (isPaused || hasManuallySelected) return;

    const timer = setInterval(() => {
      setSelectedHotelId((currentId) => {
        const currentIndex = GUNUPUR_HOTELS.findIndex((h) => h.id === currentId);
        const nextIndex = (currentIndex + 1) % GUNUPUR_HOTELS.length;
        const nextHotel = GUNUPUR_HOTELS[nextIndex];
        return nextHotel.id;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, hasManuallySelected]);

  const handleHotelSelect = (hotelId: string) => {
    setHasManuallySelected(true);
    setSelectedHotelId(hotelId);
  };

  const prevPhoto = (hotelId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setHasManuallySelected(true);
    setPhotoIndices((p) => ({
      ...p,
      [hotelId]: ((p[hotelId] || 0) - 1 + total) % total,
    }));
  };

  const nextPhoto = (hotelId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setHasManuallySelected(true);
    setPhotoIndices((p) => ({
      ...p,
      [hotelId]: ((p[hotelId] || 0) + 1) % total,
    }));
  };

  return (
    <div className="mt-14 pt-12 border-t border-[#dfd6c4]/70">

      {/* ── SECTION HEADER (CENTERED) ── */}
      <div className="text-center max-w-2xl mx-auto mb-7">
        <h3 className="font-serif font-black text-[1.75rem] sm:text-[2.2rem] text-[#0f2e22] tracking-tight leading-tight">
          Verified Partner Hotels &amp; Stays
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#4a5752] leading-relaxed">
          Curated, verified accommodations within 7–9 minutes of the GIET University summit arena.
        </p>
      </div>

      {/* ── 2-ROW INTERACTIVE MASTER CONTAINER (PAUSES ON HOVER) ── */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="space-y-3 relative"
      >
        {/* ════════════════════════════════════════════════════════════════
            ROW 1: 4 HOTEL SELECTOR TABS (ACROSS THE TOP)
            Fully responsive: 1-col on small phones, 2-col on tablets/larger phones, 4-col on laptops & desktops
        ════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3.5 relative z-20">
          {GUNUPUR_HOTELS.map((h) => {
            const active = h.id === selectedHotelId;

            return (
              <button
                key={h.id}
                type="button"
                onClick={() => handleHotelSelect(h.id)}
                className={`relative text-left p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 ease-out flex items-center gap-3 cursor-pointer group select-none ${
                  active
                    ? "bg-white border-[#143e30] ring-2 ring-[#143e30]/15 shadow-[0_8px_24px_-4px_rgba(20,62,48,0.14)] -translate-y-0.5"
                    : "bg-[#f8f5f0] hover:bg-white border-[#e6dfd1] hover:border-[#143e30]/35 hover:shadow-xs hover:-translate-y-0.5"
                }`}
              >
                {/* DOWNWARD ARROW INDICATOR (Only on desktop/laptop single row) */}
                {active && (
                  <div className="hidden lg:block absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-t-[9px] border-t-[#143e30] z-30 drop-shadow-xs" />
                )}

                {/* Circle photo */}
                <div
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border-2 transition-all duration-300 ${
                    active
                      ? "border-[#143e30] ring-2 ring-[#143e30]/20 shadow-xs scale-105"
                      : "border-[#d8cebe] group-hover:border-[#143e30]/40 group-hover:scale-102"
                  }`}
                >
                  <Image
                    src={encodeURI(h.frontPhoto)}
                    alt={h.name}
                    fill
                    unoptimized
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                {/* Clean Professional Typography */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5">
                    <p
                      className={`font-serif font-black text-xs sm:text-[13px] lg:text-[13.5px] tracking-tight truncate leading-tight transition-colors duration-200 ${
                        active ? "text-[#143e30]" : "text-[#1c2e26] group-hover:text-[#143e30]"
                      }`}
                      title={h.name}
                    >
                      {h.name}
                    </p>
                    <div className="flex items-center gap-0.5 text-[#b48a30] font-bold text-[10.5px] sm:text-xs shrink-0 bg-[#fbf5e6] px-1.5 py-0.5 rounded border border-[#d6b25e]/30">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span>{h.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-2 text-[10.5px] sm:text-[11px] text-[#6d7e77]">
                    <span className="truncate">{h.shortAddress}</span>
                    <span
                      className={`shrink-0 font-medium transition-colors duration-200 ${
                        active ? "text-[#143e30] font-bold" : "text-[#879790]"
                      }`}
                    >
                      {h.driveTime}
                    </span>
                  </div>
                </div>

                {/* Subtle Progress Bar for Active Hotel (only before manual interaction) */}
                {active && !isPaused && !hasManuallySelected && (
                  <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#143e30]/10 rounded-full overflow-hidden">
                    <div
                      key={selectedHotelId}
                      className="h-full bg-[#143e30] rounded-full animate-hotel-progress"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            ROW 2: ACTIVE HOTEL SHOWCASE BOX (PHOTO LEFT + INFO RIGHT)
            Rendered in a stacked layout with pure GPU crossfade transitions:
            Zero lag, zero layout shift, zero white flicker!
        ════════════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#e2dacf] shadow-[0_16px_50px_-12px_rgba(20,62,48,0.12),0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden ring-1 ring-black/5 relative z-10">
          <div className="grid grid-cols-1 grid-rows-1">
            {GUNUPUR_HOTELS.map((hotel) => {
              const isHotelActive = hotel.id === selectedHotelId;
              const photoIdx = photoIndices[hotel.id] || 0;
              const photo = hotel.photos[photoIdx] || hotel.photos[0];
              const total = hotel.photos.length;

              return (
                <div
                  key={hotel.id}
                  className={`col-start-1 row-start-1 w-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isHotelActive
                      ? "opacity-100 translate-y-0 scale-100 z-10 pointer-events-auto visible"
                      : "opacity-0 translate-y-1 scale-[0.99] z-0 pointer-events-none invisible"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-stretch">

                    {/* ──────────────────────────────────────────
                        LEFT: Photo Gallery (with arrows & strip)
                    ────────────────────────────────────────── */}
                    <div className="lg:w-[50%] shrink-0 flex flex-col bg-[#0a140f] border-b lg:border-b-0 lg:border-r border-[#1e3328]/60">
                      {/* Main photo stage — full explicit height on all devices */}
                      <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[380px] lg:h-[480px] group overflow-hidden bg-[#070f0b]">
                        
                        {/* Ambient color-matched background on the sides (blur fill with crossfade) */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                          {hotel.photos.map((p, idx) => (
                            <div
                              key={`bg-${p.url}`}
                              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                                idx === photoIdx ? "opacity-45" : "opacity-0"
                              }`}
                            >
                              <Image
                                src={encodeURI(p.url)}
                                alt=""
                                fill
                                unoptimized
                                className="object-cover blur-2xl scale-125 brightness-75"
                              />
                            </div>
                          ))}
                          <div className="absolute inset-0 bg-[#070f0b]/55 backdrop-blur-xs" />
                        </div>

                        {/* Main Full-Size Photos — occupies 100% of stage */}
                        {hotel.photos.map((p, idx) => (
                          <div
                            key={p.url}
                            className={`absolute inset-0 p-2 sm:p-3.5 flex items-center justify-center transition-all duration-500 ease-out z-1 ${
                              idx === photoIdx
                                ? "opacity-100 scale-100 pointer-events-auto"
                                : "opacity-0 scale-[0.985] pointer-events-none"
                            }`}
                          >
                            <div className="relative w-full h-full">
                              <Image
                                src={encodeURI(p.url)}
                                alt={`${hotel.name} – ${p.label}`}
                                fill
                                priority={isHotelActive && idx === 0}
                                unoptimized
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                                className="object-contain select-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
                              />
                            </div>
                          </div>
                        ))}

                        {/* Top & bottom subtle vignette for controls & caption legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070f0b]/90 via-transparent to-black/30 pointer-events-none z-2" />

                        {/* Arrow navigation — visible on mobile touch, hover on desktop */}
                        {total > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => prevPhoto(hotel.id, total, e)}
                              aria-label="Previous photo"
                              className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/25 text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                            >
                              <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => nextPhoto(hotel.id, total, e)}
                              aria-label="Next photo"
                              className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/25 text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                            >
                              <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                            </button>
                          </>
                        )}

                        {/* Photo counter badge */}
                        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-10 pointer-events-none">
                          <span className="text-[10px] sm:text-[11px] font-mono text-white/95 bg-black/70 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shrink-0 border border-white/20 shadow-sm">
                            {photoIdx + 1} / {total}
                          </span>
                        </div>
                      </div>

                      {/* Photo Filmstrip with Clear Lining & Lighting */}
                      <div className="flex items-center gap-2 sm:gap-2.5 px-3 py-2.5 sm:px-3.5 sm:py-3 bg-[#0c1711] border-t border-white/20 overflow-x-auto scrollbar-thin">
                        {hotel.photos.map((p, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setHasManuallySelected(true);
                              setPhotoIndices((prev) => ({ ...prev, [hotel.id]: i }));
                            }}
                            aria-label={p.label}
                            className={`relative w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                              i === photoIdx
                                ? "border-[#d6b25e] ring-2 ring-[#d6b25e]/60 brightness-100 scale-105 shadow-[0_0_12px_rgba(214,178,94,0.4)] z-10"
                                : "border-white/30 brightness-90 hover:brightness-100 hover:border-white/70 hover:scale-102"
                            }`}
                          >
                            <Image
                              src={encodeURI(p.url)}
                              alt={p.label}
                              fill
                              unoptimized
                              sizes="68px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ──────────────────────────────────────────
                        RIGHT: Hotel Details & Booking CTA
                    ────────────────────────────────────────── */}
                    <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 lg:p-7 min-w-0 bg-white">
                      <div className="flex flex-col gap-3 sm:gap-3.5">

                        {/* Rating & Verified header */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-[#143e30]/8 border border-[#143e30]/15 text-[#143e30] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                            GIET Verified Partner
                          </span>
                          <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-[#fbf5e6] border border-[#d6b25e]/35 text-[#9e792c] text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{hotel.rating.toFixed(1)}</span>
                            <span className="text-[10.5px] sm:text-[11px] text-[#8e9f99] font-normal">({hotel.reviewsCount})</span>
                          </div>
                        </div>

                        {/* Hotel Name & Address */}
                        <div>
                          <h4 className="font-serif font-black text-xl sm:text-2xl text-[#0f2e22] tracking-tight leading-snug">
                            {hotel.name}
                          </h4>
                          <div className="flex items-start gap-1.5 mt-1 sm:mt-1.5 text-xs sm:text-[13px] text-[#5e6e68] leading-relaxed">
                            <MapPin className="w-3.5 h-3.5 text-[#c25e38] shrink-0 mt-[2px]" />
                            <span className="break-words">{hotel.address}</span>
                          </div>
                        </div>

                        {/* Triple Stat Bar */}
                        <div className="grid grid-cols-3 divide-x divide-[#e8e1d3] rounded-xl border border-[#e8e1d3] bg-[#faf7f2] py-2 sm:py-2.5 text-center shadow-xs">
                          {hotel.stats.map((s, i) => (
                            <div key={i} className="px-1.5 sm:px-2">
                              <span className="block text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#8c9c96] font-bold mb-0.5">
                                {s.label}
                              </span>
                              <span className="block text-xs sm:text-sm font-black text-[#0f2e22] leading-tight break-words">
                                {s.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Amenity & Room Option Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {hotel.tags.map((tag, i) => {
                            const isAc = tag.includes("AC Rooms Only") || tag.includes("AC Rooms Available");
                            const isNonAc = tag.includes("Non-AC");

                            return (
                              <span
                                key={i}
                                className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold transition-all duration-200 ${
                                  isAc
                                    ? "bg-[#143e30]/10 text-[#143e30] border border-[#143e30]/25 font-bold"
                                    : isNonAc
                                    ? "bg-[#64748b]/10 text-[#334155] border border-[#64748b]/20"
                                    : "bg-[#f0ebe1] text-[#293831] border border-[#ddd4c0]"
                                }`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>

                        {/* Shuttle strip */}
                        <div className="flex items-center gap-2 sm:gap-2.5 px-3 py-2 rounded-xl bg-[#edf5f1] border border-[#256f57]/20 text-xs sm:text-[12.5px] text-[#143e30] font-semibold leading-normal">
                          <Car className="w-4 h-4 text-[#256f57] shrink-0" />
                          <span>GIET Summit Shuttle &nbsp;·&nbsp; {hotel.driveTime} from summit arena</span>
                        </div>
                      </div>

                      {/* Call to Book CTA block */}
                      <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-[#e8e1d3] space-y-2.5">
                        <a
                          href={`tel:${hotel.primaryPhone.replace(/[^0-9+]/g, "")}`}
                          className="w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-full bg-gradient-to-r from-[#143e30] via-[#103327] to-[#0a2018] hover:from-[#1b5341] hover:to-[#143e30] text-[#faf8f2] text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-[0_4px_14px_rgba(20,62,48,0.25)] hover:shadow-[0_8px_22px_rgba(20,62,48,0.35)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 sm:gap-2.5 group/cta cursor-pointer text-center"
                        >
                          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d6b25e] transition-transform duration-300 group-hover/cta:rotate-12 shrink-0" />
                          <span>Call to Book: {hotel.primaryPhone}</span>
                        </a>
                        <div className="flex flex-wrap items-center justify-between gap-1 text-[10.5px] sm:text-[11px] text-[#7e8d87] px-1">
                          <span className="flex items-center gap-1 text-[#256f57] font-semibold">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            GIET Verified Partner
                          </span>
                          {hotel.allPhones.length > 1 && (
                            <a
                              href={`tel:${hotel.allPhones[1].replace(/[^0-9+]/g, "")}`}
                              className="font-mono hover:text-[#143e30] hover:underline transition-colors font-medium"
                            >
                              Alt: {hotel.allPhones[1]}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
