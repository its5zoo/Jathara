import React from "react";
import Link from "next/link";
import { 
  Wheat, 
  Cpu, 
  Activity, 
  Shield, 
  Users, 
  Building2, 
  Zap, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from "lucide-react";
import { OFFICIAL_TRACKS, SummitTrack } from "@/lib/config/tracks";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { cn } from "@/lib/utils";

// Icon resolution helper for official tracks
const trackIconMap: Record<string, React.ElementType> = {
  Wheat,
  Cpu,
  Activity,
  Shield,
  Users,
  Building2,
  Zap,
  Coins,
};

export function VerticalsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#fcfbf8] border-b border-[#e6dfd1]">
      <Container size="wide">
        <SectionHeading
          eyebrow="Official Summit Verticals"
          title="Choose Your Arena of Impact"
          subtitle="Eight distinctive sectoral tracks designed around Dandakaranya's indigenous strengths and high-growth national markets."
        />

        {/* Canonical Eight-Track Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {OFFICIAL_TRACKS.map((track: SummitTrack) => {
            const IconComp = trackIconMap[track.iconName] || Sparkles;

            return (
              <div
                key={track.slug}
                className={cn(
                  "bg-[#ffffff] rounded-3xl p-6 sm:p-7 border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden",
                  track.accentBorder
                )}
              >
                {/* Subtle thematic ambient wash */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity",
                    track.accentBg
                  )}
                />

                <div className="relative z-10">
                  {/* Top Bar: Icon & Track Index Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105",
                        track.iconBg
                      )}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div className="text-right">
                      <Badge variant={track.tagVariant} size="sm">
                        Track 0{track.id}
                      </Badge>
                      <span className="text-[10px] font-mono text-[#7e8d87] block mt-1 flex items-center justify-end gap-1">
                        <Calendar className="w-3 h-3 text-[#c25e38]" />
                        <span>{track.scheduleHint}</span>
                      </span>
                    </div>
                  </div>

                  {/* Official Track Heading */}
                  <h3 className="font-serif font-bold text-xl text-[#103327] group-hover:text-[#143e30] transition-colors leading-snug">
                    {track.title}
                  </h3>

                  {/* Domain Subtitle */}
                  <p className="text-[11px] font-semibold text-[#8c671b] uppercase tracking-wider mt-1 line-clamp-1">
                    {track.subtitle}
                  </p>

                  {/* Canonical Official Description */}
                  <p className="text-xs sm:text-sm text-[#4a5752] mt-3 leading-relaxed">
                    {track.description}
                  </p>

                  {/* Sub-Themes / Focus Areas */}
                  <div className="mt-5 pt-4 border-t border-[#ede7db]">
                    <span className="text-[11px] font-bold text-[#161e1b] uppercase tracking-wider block mb-2">
                      Core Value Chains:
                    </span>
                    <div className="space-y-1.5">
                      {track.focusAreas.slice(0, 3).map((area, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-[#333e3a]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#256f57] shrink-0 mt-0.5" />
                          <span className="leading-snug text-[11px]">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Section: Target Audience & Registration Link */}
                <div className="relative z-10 mt-6 pt-4 border-t border-[#ede7db] flex flex-col gap-2">
                  <span className="text-[10px] text-[#7e8d87] leading-snug">
                    <strong className="text-[#4a5752]">Audience:</strong> {track.targetParticipants}
                  </span>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold text-[#8c671b]">
                      Verified Sector
                    </span>
                    <Link
                      href={`/register?category=startup-founder&track=${track.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#103327] hover:text-[#c25e38] transition-colors"
                    >
                      <span>Apply in Track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA */}
        <div className="mt-14 text-center">
          <Button href="/startups" variant="secondary" size="md" className="font-bold shadow-xs w-full sm:w-auto justify-center">
            <span>Explore Complete Startup & Junicorn Guidelines</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
