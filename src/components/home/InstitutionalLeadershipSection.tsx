import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "../common/Container";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { GIET_LEADERSHIP_PROFILES } from "@/data/leadershipData";

export function InstitutionalLeadershipSection() {
  return (
    <section className="py-20 bg-[#f7f4ec] border-b border-[#e6dfd1]">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-3xl">
            <div className="inline-block mb-3.5">
              <Badge variant="gold" size="md" className="font-medium tracking-wide">
                Host University Governance
              </Badge>
            </div>
            <h2 className="text-2.5xl sm:text-3.5xl md:text-4xl font-serif font-bold text-[#103327] tracking-tight leading-tight">
              Institutional Leadership
            </h2>
            <p className="mt-3 text-[#5c6e64] text-base sm:text-lg leading-relaxed">
              Meet the leadership guiding GIET University&apos;s academic vision, institutional development, and commitment to education and innovation.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              href="/about"
              variant="outline"
              size="sm"
              className="w-full sm:w-auto font-semibold border-[#d6cfbe] hover:bg-[#ede7db]"
            >
              <span>University Legacy & Accreditations</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

        {/* Responsive Grid for 5 Leaders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {GIET_LEADERSHIP_PROFILES.map((leader) => (
            <div
              key={leader.id}
              className="group bg-[#fcfbf8] rounded-2xl border border-[#e6dfd1] overflow-hidden shadow-2xs hover:shadow-md hover:border-[#be9740]/60 transition-all duration-300 flex flex-col"
            >
              {/* Leader Portrait */}
              <div className="relative aspect-[4/4.5] w-full bg-[#103327] overflow-hidden">
                <Image
                  src={leader.imageSrc}
                  alt={`Official portrait of ${leader.name}, ${leader.position} of GIET University`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2119]/80 via-transparent to-transparent pointer-events-none" />

                {/* Role Pill Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fcfbf8]/95 backdrop-blur-xs text-[#103327] text-[11px] font-bold uppercase tracking-wider shadow-2xs">
                    <ShieldCheck className="w-3 h-3 text-[#c25e38]" />
                    {leader.position}
                  </span>
                </div>
              </div>

              {/* Leader Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#103327] group-hover:text-[#1b5341] transition-colors leading-snug">
                    {leader.name}
                  </h3>
                  <p className="mt-2.5 text-xs text-[#5c6e64] leading-relaxed line-clamp-4">
                    {leader.summaryBio}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#ede7db]">
                  <span className="text-[10px] uppercase tracking-wider text-[#8c671b] font-bold">
                    GIET University, Gunupur
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
