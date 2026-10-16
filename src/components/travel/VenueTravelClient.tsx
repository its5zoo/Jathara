"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Plane, 
  Train, 
  Car, 
  ShieldCheck, 
  Building, 
  Bed, 
  Info,
  ExternalLink,
  GraduationCap,
  MapPin,
  Clock,
  Navigation,
  Route,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { TRAVEL_HUBS } from "@/data/eventData";
import { TransitHubType } from "@/lib/types";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { cn } from "@/lib/utils";
import { GunupurHotelsSection } from "./GunupurHotelsSection";

export function VenueTravelClient() {
  const [selectedType, setSelectedType] = useState<TransitHubType | "all">("all");
  const [activeHubId, setActiveHubId] = useState<string>(TRAVEL_HUBS[0].id);
  const [expandedHubs, setExpandedHubs] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedHubs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredHubs = TRAVEL_HUBS.filter(
    (hub) => selectedType === "all" || hub.type === selectedType
  );

  return (
    <div className="w-full">
      {/* Editorial Header with GIET University Campus Aerial Background */}
      <section className="relative text-white py-14 sm:py-20 md:py-24 border-b border-[#1b5341]/60 overflow-hidden bg-[#061811]">
        {/* Background Image: gietu-campus-aerial.jpg */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gietu-campus-aerial.jpg"
            alt="GIET University Campus Aerial View, Gunupur, Odisha"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-[center_42%] select-none brightness-95"
          />
          {/* Balanced translucent overlay so the aerial campus is clearly visible while text stays sharp */}
          <div className="absolute inset-0 bg-black/40 sm:bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061811]/90 via-[#061811]/30 to-[#061811]/60" />
        </div>

        {/* Ambient atmospheric glow accents */}
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#256f57]/20 rounded-full blur-3xl pointer-events-none z-1" />

        {/* Foreground Content with original compact proportions in pure white */}
        <Container size="default" className="relative z-10 text-center px-4 sm:px-6">
          <Badge variant="gold" size="md" className="mb-3 sm:mb-4 backdrop-blur-md bg-[#be9740]/25 border border-[#be9740]/50 text-[#f7e3af] shadow-xs text-xs sm:text-sm">
            Destination &amp; Transit Guide
          </Badge>

          <h1 className="font-serif font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] max-w-4xl mx-auto">
            GIET University, Gunupur, Odisha
          </h1>

          <p className="mt-3 sm:mt-5 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Planning your journey to the historic Dandakaranya landscape. Verified transit gateways, airport connections, railway corridors, and campus hospitality.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs md:text-sm text-white">
            <span className="p-1.5 px-2.5 sm:p-2 sm:px-3 rounded-lg bg-[#081a14]/85 border border-white/20 backdrop-blur-md shadow-xs">
              <strong className="text-[#d6b25e]">Campus:</strong> Goboriguda, Gunupur
            </span>
            <span className="p-1.5 px-2.5 sm:p-2 sm:px-3 rounded-lg bg-[#081a14]/85 border border-white/20 backdrop-blur-md shadow-xs">
              <strong className="text-[#d6b25e]">District:</strong> Rayagada, Odisha 765022
            </span>
            <span className="p-1.5 px-2.5 sm:p-2 sm:px-3 rounded-lg bg-[#081a14]/85 border border-white/20 backdrop-blur-md shadow-xs">
              <strong className="text-[#d6b25e]">Highway:</strong> NH-326
            </span>
          </div>
        </Container>
      </section>

      {/* Campus Infrastructure Overview & Official Architecture Feature */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#fcfbf8] border-b border-[#e6dfd1]">
        <Container size="default">
          <SectionHeading
            eyebrow="Host Campus & Convention Arena"
            title="GIET University: Innovation in the Dandakaranya Valley"
            subtitle="Gandhi Institute of Engineering and Technology University (GIET University) is a state private university offering world-class research laboratories and residential hospitality amidst scenic hills."
          />

          {/* Official Campus Building Photograph Feature */}
          <div className="mb-10 sm:mb-12 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#dfd6c4] shadow-xl bg-[#081a14] group">
            <div className="relative min-h-[340px] sm:min-h-0 sm:aspect-[16/9] md:aspect-[21/9] w-full flex flex-col justify-end">
              <Image
                src="/images/giet-school-of-engineering.jpg"
                alt="School of Engineering and Technology, GIET University Campus, Gunupur, Odisha"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081a14] via-[#081a14]/50 to-transparent pointer-events-none" />
              
              <div className="relative z-10 m-3 sm:m-6 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#081a14]/90 backdrop-blur-md border border-[#256f57]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-14 sm:h-12 rounded-xl bg-white p-1 sm:p-1.5 flex items-center justify-center shrink-0 border border-white/60 shadow-2xs">
                    <Image
                      src="/logos/giet-logo.png"
                      alt="GIET University Official Crest"
                      width={48}
                      height={38}
                      className="max-h-7 sm:max-h-9 max-w-9 sm:max-w-11 w-auto h-auto object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-0.5">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#d6b25e] bg-[#143e30] px-1.5 sm:px-2 py-0.5 rounded">
                        Central Summit Venue
                      </span>
                      <span className="text-[9.5px] sm:text-[10px] font-semibold text-[#c8d1cd]">
                        State Private University
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-lg md:text-xl text-[#fcfbf8] leading-snug whitespace-normal break-words">
                      School of Engineering and Technology Building
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#c8d1cd] mt-0.5 leading-relaxed">
                      Main Auditorium, Exhibition Arena &amp; Sector Roundtable Rooms, Gunupur, Rayagada, Odisha
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.giet.edu/schools/school-of-engineering/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-white text-xs font-bold text-[#143e30] hover:bg-[#ede7db] transition-colors shrink-0 shadow-xs w-full sm:w-auto"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#c25e38]" />
                  <span>Official School Portal</span>
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e6dfd1] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-3">
                <Building className="w-5 h-5 text-[#c25e38]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Convention & Auditoriums
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5752] mt-2 leading-relaxed">
                State-of-the-art central auditorium, conference halls, and seminar spaces equipped with audio-visual broadcasting capabilities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e6dfd1] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-3">
                <Bed className="w-5 h-5 text-[#256f57]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Residential Hostels & Suites
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5752] mt-2 leading-relaxed">
                Dedicated university executive guest house suites, faculty residences, and secured student hostel blocks accommodating visiting delegates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e6dfd1] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-3">
                <ShieldCheck className="w-5 h-5 text-[#be9740]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Incubation & Lab Facilities
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5752] mt-2 leading-relaxed">
                Active Technology Business Incubator (TBI) with advanced prototyping, biotechnology facilities, and agricultural testbeds.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Verified Travel Gateways & Hub Selector */}
      <section className="py-20 bg-[#f7f4ec] border-b border-[#e6dfd1]">
        <Container size="wide">
          <SectionHeading
            eyebrow="Transit Planning"
            title="Verified Regional Travel Gateways"
            subtitle="Carefully reviewed distance and transit connectivity options to help you choose the best arrival corridor."
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              type="button"
              onClick={() => setSelectedType("all")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer border",
                selectedType === "all"
                  ? "bg-[#143e30] text-[#fcfbf8] border-[#143e30]"
                  : "bg-[#ffffff] text-[#333e3a] border-[#dfd6c4] hover:bg-[#ede7db]"
              )}
            >
              All Gateways ({TRAVEL_HUBS.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("airport")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer border flex items-center gap-1.5",
                selectedType === "airport"
                  ? "bg-[#143e30] text-[#fcfbf8] border-[#143e30]"
                  : "bg-[#ffffff] text-[#333e3a] border-[#dfd6c4] hover:bg-[#ede7db]"
              )}
            >
              <Plane className="w-3.5 h-3.5" />
              Airports
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("railway")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer border flex items-center gap-1.5",
                selectedType === "railway"
                  ? "bg-[#143e30] text-[#fcfbf8] border-[#143e30]"
                  : "bg-[#ffffff] text-[#333e3a] border-[#dfd6c4] hover:bg-[#ede7db]"
              )}
            >
              <Train className="w-3.5 h-3.5" />
              Railways
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("road")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer border flex items-center gap-1.5",
                selectedType === "road"
                  ? "bg-[#143e30] text-[#fcfbf8] border-[#143e30]"
                  : "bg-[#ffffff] text-[#333e3a] border-[#dfd6c4] hover:bg-[#ede7db]"
              )}
            >
              <Car className="w-3.5 h-3.5" />
              Road Highways
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredHubs.map((hub) => {
              const isAirport = hub.type === "airport";
              const isRail = hub.type === "railway";
              const isSelected = hub.id === activeHubId;

              return (
                <div
                  key={hub.id}
                  onClick={() => setActiveHubId(hub.id)}
                  className={cn(
                    "bg-[#ffffff] rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer flex flex-col justify-between",
                    isSelected
                      ? "border-[#143e30] shadow-md ring-2 ring-[#143e30]/20"
                      : "border-[#e6dfd1] hover:border-[#143e30]/30 shadow-xs"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-[#f7f4ec] text-[#143e30] border border-[#dfd6c4]">
                        {isAirport ? (
                          <Plane className="w-5 h-5 text-[#c25e38]" />
                        ) : isRail ? (
                          <Train className="w-5 h-5 text-[#143e30]" />
                        ) : (
                          <Car className="w-5 h-5 text-[#256f57]" />
                        )}
                      </div>

                      <Badge variant="ivory" size="sm">
                        {hub.code}
                      </Badge>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-[#103327]">
                      {hub.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-xs font-bold text-[#8c671b]">
                      <span>{hub.distanceKm}</span>
                      <span>•</span>
                      <span>{hub.approxTravelTime}</span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-[#4a5752] leading-relaxed">
                      {hub.connectivityDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#ede7db] text-[11px] text-[#7e8d87]">
                    <strong>Target:</strong> {hub.recommendedFor}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Travel Help Desk Callout */}
          <div className="bg-[#ffffff] rounded-3xl p-8 border border-[#e6dfd1] shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#256f57] uppercase tracking-wider">
                <Info className="w-4 h-4" />
                <span>Concierge Transit Support</span>
              </div>
              <h4 className="font-serif font-bold text-xl text-[#103327]">
                GIET Transport & Reception Coordination
              </h4>
              <p className="text-xs sm:text-sm text-[#4a5752] max-w-xl">
                For groups, institutional delegations, and registered speakers, designated campus shuttles will operate on schedule between Rayagada Railway Station, Palasa, and Visakhapatnam Airport.
              </p>
            </div>

            <Button href="/contact" variant="primary" size="md" className="shrink-0 w-full md:w-auto justify-center">
              <span>Contact Travel Desk</span>
            </Button>
          </div>
        </Container>
      </section>

      {/* Accommodation & Local Guidance */}
      <section className="py-20 bg-[#fcfbf8] border-b border-[#e6dfd1]">
        <Container size="wide">
          <SectionHeading
            eyebrow="Hospitality"
            title="Accommodation & Stay Information"
            subtitle="Campus and regional stay arrangements for registered attendees."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#222b27]">
            <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e6dfd1] space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                University On-Campus Hospitality
              </h3>
              <p className="text-sm text-[#4a5752] leading-relaxed">
                GIET University maintains modern residential facilities including guest house suites for dignitaries, air-conditioned executive quarters for corporate delegates, and student hostels for Junicorn participants.
              </p>
              <div className="text-xs text-[#7e8d87]">
                <em>Allocation is handled during registration confirmation based on participant category.</em>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e6dfd1] space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Gunupur & Rayagada Hotels
              </h3>
              <p className="text-sm text-[#4a5752] leading-relaxed">
                A selection of verified local hotels and guest residences are located within Gunupur town and the nearby district center of Rayagada (~75 km). Shuttle loops will be maintained between designated partner hotels and the campus.
              </p>
              <div className="text-xs text-[#7e8d87]">
                <em>Hotel contact lists and preferential summit tariff codes will be published prior to event.</em>
              </div>
            </div>
          </div>

          {/* Gunupur Verified Hotels & Lodging Gallery */}
          <GunupurHotelsSection />
        </Container>
      </section>

      {/* Action Footer */}
      <section className="py-16 bg-[#081a14] text-[#fcfbf8] text-center">
        <Container size="default">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl">
            Start Planning Your Journey
          </h2>
          <p className="mt-2 text-sm text-[#c8d1cd] max-w-xl mx-auto">
            Review the 3-day tentative programme or register your category for December 2026.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/programme" variant="gold" size="md" className="w-full sm:w-auto justify-center">
              View 3-Day Programme
            </Button>
            <Button href="/register" variant="terracotta" size="md" className="w-full sm:w-auto justify-center">
              Registration Gateway
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
