"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Compass, 
  Coffee, 
  TreePine, 
  TrendingUp, 
  Layers, 
  GraduationCap 
} from "lucide-react";
import { EVENT_METADATA } from "@/data/eventData";
import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { InstitutionalLogos } from "../common/InstitutionalLogos";

export function HeroSection() {
  // Smooth mouse-reactive tilt coordinates (subtle, non-disruptive)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 6, y: y * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  return (
    <section 
      aria-label="Summit Introduction and Official Identity"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#05140f] text-[#fcfbf8] pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 overflow-hidden border-b border-[#1b5341]/60"
    >
      {/* Layer 1: Cinematic Dandakaranya Forest Landscape with Atmospheric Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/dandakaranya-canopy.jpg"
          alt="Dandakaranya and Eastern Ghats Mist Forest Landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 select-none scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Editorial atmospheric gradient scrim for strong text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05140f]/95 via-[#081a14]/85 to-[#05140f] backdrop-blur-[1px]" />
        
        {/* Soft atmospheric sunbeam & lighting accents */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] sm:w-[1000px] h-[520px] bg-[#d6b25e]/15 rounded-full blur-[140px]" 
          aria-hidden="true" 
        />
        <div 
          className="absolute top-1/3 -right-24 w-80 sm:w-[480px] h-80 sm:h-[480px] bg-[#256f57]/20 rounded-full blur-[120px]" 
          aria-hidden="true" 
        />
      </div>

      {/* Layer 2: Delicate Topographic Contour Vector Graphic */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07] z-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M-100,200 Q200,100 600,220 T1500,150 M-100,350 Q300,250 800,380 T1500,300 M-100,500 Q400,420 900,520 T1500,480 M-100,680 Q500,580 1100,700 T1500,650"
          fill="none"
          stroke="#d6b25e"
          strokeWidth="1.2"
        />
        <path
          d="M-50,280 Q250,180 700,300 T1550,230 M-50,430 Q350,330 850,450 T1550,400 M-50,600 Q450,520 1000,620 T1550,580"
          fill="none"
          stroke="#256f57"
          strokeWidth="1"
          strokeDasharray="6 8"
        />
      </svg>

      {/* Layer 3: Interactive Foreground Content */}
      <Container size="wide" className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Eyebrow Pill: Academic Host GIET University & Organizer ISF */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#081a14]/90 border border-[#256f57]/70 text-xs sm:text-sm text-[#dfd6c4] mb-6 shadow-md backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#d6b25e] animate-pulse" aria-hidden="true" />
            <span className="font-semibold text-[#fcfbf8]">Organized by International Startup Foundation</span>
            <span className="text-[#7e8d87] hidden sm:inline">•</span>
            <span className="text-[#d6b25e] font-bold flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#d6b25e]" />
              <span>Hosted at GIET University, Gunupur</span>
            </span>
          </div>

          {/* Philosophy Moniker */}
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#d6b25e] font-bold mb-3">
            The Future Grows from the Roots
          </p>

          {/* Signature Event Title */}
          <h1 className="font-serif font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] text-[#fcfbf8] drop-shadow-sm">
            ISF STARTUP JATHARA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d6b25e] via-[#f7e3af] to-[#c2983d]">
              2026
            </span>
          </h1>

          {/* Location & Cultural Identity Subtitle */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xl sm:text-2xl md:text-3xl font-serif text-[#ede7db] italic">
            <span>Startup Jathara @ Dandakaranya</span>
          </div>

          {/* Strategic Mission Description */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#c8d1cd] leading-relaxed max-w-3xl mx-auto font-normal">
            Catalyzing grassroots innovation, tribal youth entrepreneurship, and rural enterprises from India&apos;s heartlands. Convened at the scenic campus of <strong className="text-[#fcfbf8]">GIET University, Gunupur</strong>, connecting emerging founders with global venture capital, GCC heads, and accredited academic mentors.
          </p>

          {/* Unified Event Metadata Strip */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-2xl bg-[#081a14]/90 border border-[#256f57]/80 shadow-lg backdrop-blur-md">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm text-[#fcfbf8]">
              <Calendar className="w-4 h-4 text-[#d6b25e] shrink-0" />
              <span className="font-bold">{EVENT_METADATA.dates}</span>
              <span className="text-xs text-[#c8d1cd] hidden md:inline">(Pre-Summit: 17 Dec)</span>
            </div>

            <div className="hidden sm:inline w-px h-5 bg-[#1b5341]" aria-hidden="true" />

            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm text-[#fcfbf8]">
              <MapPin className="w-4 h-4 text-[#c25e38] shrink-0" />
              <span className="font-bold">GIET University Campus</span>
              <span className="text-xs text-[#c8d1cd] hidden md:inline">Gunupur, Odisha</span>
            </div>

            <div className="hidden sm:inline w-px h-5 bg-[#1b5341]" aria-hidden="true" />

            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm text-[#fcfbf8]">
              <Coffee className="w-4 h-4 text-[#d6b25e] shrink-0" />
              <span className="font-bold">Araku Coffee Tastings</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/programme"
              variant="gold"
              size="lg"
              className="font-bold shadow-xl text-sm sm:text-base transition-transform active:scale-95 w-full sm:w-auto justify-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span>Explore Draft Programme</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              href="/register"
              variant="terracotta"
              size="lg"
              className="font-bold shadow-xl text-sm sm:text-base transition-transform active:scale-95 w-full sm:w-auto justify-center"
            >
              <span>Registration Gateway</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              href="/venue"
              variant="outline"
              size="lg"
              className="text-[#fcfbf8] border-[#dfd6c4]/40 hover:bg-[#143e30] hover:border-[#dfd6c4] text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Compass className="w-4 h-4 mr-2 text-[#d6b25e]" />
              <span>GIET Campus & Travel Guide</span>
            </Button>
          </div>

          {/* Draft Notice */}
          <div className="mt-7 inline-flex items-center gap-2 text-xs text-amber-200/90 bg-amber-950/60 border border-amber-800/60 px-4 py-2 rounded-xl backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            <span>
              <strong>Brochure Planning:</strong> Program timings and session tracks remain tentative per organizer draft expectations.
            </span>
          </div>

          {/* Advanced 3D Perspective Summit Showcase Console with Mouse-Reactive Parallax */}
          <div className="mt-14 hidden md:block max-w-4xl mx-auto [perspective:1200px]">
            <div 
              style={{
                transform: `rotateX(${-mouseOffset.y}deg) rotateY(${mouseOffset.x}deg)`,
                transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              className="relative rounded-3xl bg-gradient-to-br from-[#103327]/95 via-[#0d281e]/98 to-[#081a14] border border-[#256f57]/80 p-7 shadow-[0_20px_50px_rgba(5,20,15,0.8)] backdrop-blur-md"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-[#1b5341]/60 pb-4 mb-5 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-[#c25e38]" />
                  <div className="w-3 h-3 rounded-full bg-[#d6b25e]" />
                  <div className="w-3 h-3 rounded-full bg-[#256f57]" />
                  <span className="text-xs uppercase tracking-wider text-[#dfd6c4] font-bold ml-2">
                    Summit Pillars & Dandakaranya Experience
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-[#143e30] border border-[#256f57] text-[#d6b25e] px-2.5 py-0.5 rounded-full font-mono font-bold">
                    GIET UNIVERSITY HOST
                  </span>
                  <span className="text-xs text-[#dfd6c4] font-mono">18–20 DEC 2026</span>
                </div>
              </div>

              {/* 4 Interactive Telemetry Panels */}
              <div className="grid grid-cols-4 gap-4 text-left">
                
                {/* 1. Host Academic Campus */}
                <div className="p-4 rounded-2xl bg-[#081a14]/85 border border-[#1b5341]/70 hover:border-[#d6b25e]/60 transition-colors">
                  <GraduationCap className="w-5 h-5 text-[#d6b25e] mb-2" />
                  <span className="text-[11px] font-bold text-[#dfd6c4] block">GIET University</span>
                  <p className="text-[11px] text-[#95a59f] mt-1 leading-snug">
                    School of Engg & Tech, Gunupur Campus
                  </p>
                </div>

                {/* 2. Junicorn Pitches */}
                <div className="p-4 rounded-2xl bg-[#081a14]/85 border border-[#1b5341]/70 hover:border-[#d6b25e]/60 transition-colors">
                  <TrendingUp className="w-5 h-5 text-[#c25e38] mb-2" />
                  <span className="text-[11px] font-bold text-[#dfd6c4] block">Junicorn Pitches</span>
                  <p className="text-[11px] text-[#95a59f] mt-1 leading-snug">
                    Tribal & student youth startup showcase
                  </p>
                </div>

                {/* 3. 8 Sector Tracks */}
                <div className="p-4 rounded-2xl bg-[#081a14]/85 border border-[#1b5341]/70 hover:border-[#d6b25e]/60 transition-colors">
                  <Layers className="w-5 h-5 text-[#256f57] mb-2" />
                  <span className="text-[11px] font-bold text-[#dfd6c4] block">8 Sector Tracks</span>
                  <p className="text-[11px] text-[#95a59f] mt-1 leading-snug">
                    AI, Agritech, Defence, Energy & Inclusion
                  </p>
                </div>

                {/* 4. Forest Immersion */}
                <div className="p-4 rounded-2xl bg-[#081a14]/85 border border-[#1b5341]/70 hover:border-[#d6b25e]/60 transition-colors">
                  <TreePine className="w-5 h-5 text-[#256f57] mb-2" />
                  <span className="text-[11px] font-bold text-[#dfd6c4] block">Forest Immersion</span>
                  <p className="text-[11px] text-[#95a59f] mt-1 leading-snug">
                    Day 2 guided Dandakaranya eco-trek expedition
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Institutional Trust Strip with Unclipped Crests */}
          <div className="mt-14 pt-8 border-t border-[#1b5341]/60">
            <InstitutionalLogos variant="hero-strip" />
          </div>

        </div>
      </Container>
    </section>
  );
}
