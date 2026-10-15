import React from "react";
import Image from "next/image";
import { 
  Sparkles, 
  Quote, 
  Sprout, 
  Compass, 
  CheckCircle2 
} from "lucide-react";
import { Container } from "../common/Container";
import { Badge } from "../common/Badge";

export function FounderTributeSection() {
  return (
    <section 
      aria-label="Honouring Dr. J. A. Chowdary — Founder & Chairman, ISF"
      className="py-20 sm:py-28 lg:py-32 bg-[#faf7f0] border-b border-[#e6dfd1] relative overflow-hidden"
    >
      {/* Subtle Botanical & Upward Growth Decorative Background Accents */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#dfd6c4]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-radial from-[#103327]/5 to-transparent rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" 
        aria-hidden="true" 
      />

      {/* Subtle Milestone Timeline Stem (Decorative Left Axis on Desktop) */}
      <div 
        className="hidden xl:block absolute top-12 bottom-12 left-1/2 -translate-x-[640px] w-px bg-gradient-to-b from-transparent via-[#dfd6c4] to-transparent pointer-events-none" 
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        {/* Section Milestone Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 px-2">
          <div className="inline-flex items-center gap-2 mb-3.5 sm:mb-4">
            <span className="w-5 sm:w-6 h-px bg-[#c25e38]" />
            <Badge 
              variant="terracotta" 
              size="md" 
              className="font-bold tracking-widest uppercase text-[10px] sm:text-xs px-3 sm:px-3.5 py-1"
            >
              A VISION THAT INSPIRES
            </Badge>
            <span className="w-5 sm:w-6 h-px bg-[#c25e38]" />
          </div>

          <h2 className="text-2.5xl sm:text-4xl md:text-4.5xl lg:text-5xl font-serif font-bold text-[#103327] tracking-tight leading-[1.18]">
            Honouring the Vision Behind ISF
          </h2>

          <div className="flex items-center justify-center gap-3 mt-3.5 sm:mt-4 text-[#c25e38]">
            <span className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#c25e38]/40" />
            <Sparkles className="w-4 h-4 text-[#c25e38]" />
            <span className="h-px w-10 sm:w-12 bg-gradient-to-l from-transparent to-[#c25e38]/40" />
          </div>
        </div>

        {/* Milestone Editorial Card / Layout */}
        <div className="max-w-6xl mx-auto bg-[#fcfbf8] rounded-2xl sm:rounded-3xl border border-[#dfd6c4] shadow-sm overflow-hidden p-5 sm:p-10 lg:p-14 relative">
          
          {/* Subtle Corner Botanical Flourishes */}
          <div className="absolute top-4 right-4 text-[#dfd6c4]/70 pointer-events-none hidden sm:block">
            <Sprout className="w-8 h-8 rotate-45" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Visual Anchor: Archival Portrait Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] group">
                
                {/* Decorative Offset Backdrop Frame */}
                <div 
                  className="absolute -inset-2.5 sm:-inset-3 bg-gradient-to-tr from-[#103327]/10 via-[#c25e38]/15 to-[#dfd6c4]/40 rounded-3xl -rotate-1 group-hover:rotate-0 transition-transform duration-500 pointer-events-none" 
                  aria-hidden="true" 
                />

                {/* Primary Portrait Card */}
                <div className="relative bg-[#f7f4ec] p-3 sm:p-3.5 rounded-2xl border border-[#dfd6c4] shadow-md overflow-hidden">
                  <div className="relative aspect-[4/4.6] w-full rounded-xl overflow-hidden bg-[#103327]/90">
                    <Image
                      src="/images/leadership/dr-ja-chowdary.png"
                      alt="Dr. J. A. Chowdary, Founder & Chairman of the International Startup Foundation (ISF)"
                      fill
                      sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 420px"
                      priority={false}
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-103"
                    />

                    {/* Gradient vignette for lighting depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a2119]/70 via-transparent to-transparent pointer-events-none" />

                    {/* Milestone Insignia Tag */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 text-[11px] font-medium bg-[#103327]/85 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 shadow-xs">
                      <span className="flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-[#e5a882]" />
                        <span>ISF Leadership</span>
                      </span>
                      <span className="text-[#e5a882] font-semibold text-[10px] uppercase tracking-wider">
                        Ecosystem Catalyst
                      </span>
                    </div>
                  </div>

                  {/* Nameplate Cartouche */}
                  <div className="mt-4 pt-3.5 border-t border-[#dfd6c4]/80 text-center px-2">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#103327] tracking-tight">
                      Dr. J. A. Chowdary
                    </h3>
                    <p className="text-xs sm:text-[13px] font-bold text-[#c25e38] uppercase tracking-wider mt-1 leading-snug">
                      Founder &amp; Chairman, International Startup Foundation
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Editorial Tribute Narrative & Prominent Pull Quote */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              
              {/* Commemorative Marker / Monogram Lead */}
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#7e8d87] pb-1 border-b border-[#ede7db]">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#103327] text-[#fcfbf8] font-serif text-xs font-bold shadow-2xs">
                  ISF
                </span>
                <span>Editorial Tribute • Dandakaranya Summit 2026</span>
              </div>

              {/* Tribute Copy Paragraphs */}
              <div className="space-y-4 sm:space-y-5 text-[#4a5752] text-sm sm:text-base leading-relaxed">
                <p className="font-serif text-base sm:text-lg text-[#163a2e] leading-relaxed italic">
                  “Every thriving innovation ecosystem begins with a vision—and grows when that vision inspires others to build, collaborate, and create opportunities.
                </p>

                <p>
                  Dr. J. A. Chowdary has devoted significant chapters of his professional journey to technology, entrepreneurship, and strengthening the startup ecosystem. Through his work across India&apos;s technology industry and his leadership at the International Startup Foundation, he represents a commitment to connecting ideas with opportunity and empowering the next generation of innovators.
                </p>

                <p>
                  As we gather for ISF Startup Jathara 2026, we extend our heartfelt gratitude and deep respect to the vision that brings entrepreneurs, mentors, investors, and emerging innovators together. May this gathering carry that spirit forward—turning ambition into action and local ideas into meaningful impact.”
                </p>
              </div>

              {/* Prominent Pull Quote Treatment */}
              <div className="relative mt-6 sm:mt-8 p-6 sm:p-7 rounded-2xl bg-[#f5f0e4] border-l-4 border-[#c25e38] border-t border-r border-b border-[#dfd6c4] shadow-xs">
                <Quote 
                  className="absolute top-3.5 right-4 w-8 h-8 text-[#c25e38]/20 pointer-events-none" 
                  aria-hidden="true" 
                />

                <blockquote className="relative z-10">
                  <p className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-[#103327] italic leading-snug">
                    “Honouring the vision. Celebrating the journey. Inspiring the innovators who come next.”
                  </p>
                  
                  <footer className="mt-3.5 pt-3 border-t border-[#dfd6c4]/60 flex items-center justify-between flex-wrap gap-2 text-xs text-[#697a73]">
                    <span className="font-semibold text-[#103327]">
                      ISF Startup Jathara 2026 Milestone Tribute
                    </span>
                    <span className="flex items-center gap-1.5 text-[#c25e38] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Gratitude &amp; Respect</span>
                    </span>
                  </footer>
                </blockquote>
              </div>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
