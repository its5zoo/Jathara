import React from "react";
import { Compass, TreePine, Coffee, ShieldAlert, Mountain, ArrowRight } from "lucide-react";
import { Container } from "../common/Container";
import { Button } from "../common/Button";

export function DandakaranyaSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0d281e] to-[#081a14] text-[#fcfbf8] border-b border-[#1b5341]/60 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#256f57]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c25e38]/15 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b5341] border border-[#256f57]/50 text-xs text-[#d6b25e]">
              <TreePine className="w-3.5 h-3.5" />
              <span>Day 2 Signature Experience • 19 December 2026</span>
            </div>

            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              The Dandakaranya Forest Trekking Expedition
            </h2>

            <p className="text-base sm:text-lg text-[#c8d1cd] leading-relaxed">
              Step beyond conventional convention halls into the ancient, forested landscapes of Dandakaranya. Designed as an informal peer bonding journey, Day 2 invites startup founders, angel investors, and mentors to traverse native trails, observe indigenous forestry, and discuss enterprise possibilities in nature.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#103327]/80 border border-[#256f57]/40">
                <div className="w-9 h-9 rounded-lg bg-[#081a14] flex items-center justify-center text-[#d6b25e] mb-3">
                  <Coffee className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#fcfbf8]">
                  Araku Organic Coffee
                </h4>
                <p className="text-xs text-[#c8d1cd] mt-1 leading-relaxed">
                  Experience artisanal coffee produced by indigenous tribal cooperatives across the adjacent Eastern Ghats valleys.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#103327]/80 border border-[#256f57]/40">
                <div className="w-9 h-9 rounded-lg bg-[#081a14] flex items-center justify-center text-[#c25e38] mb-3">
                  <Mountain className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#fcfbf8]">
                  Forest-Level Dialogue
                </h4>
                <p className="text-xs text-[#c8d1cd] mt-1 leading-relaxed">
                  Break formal hierarchies through unhurried walks that spark genuine mentorship and investment syndicates.
                </p>
              </div>
            </div>

            {/* Official Disclaimer from Brochure */}
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200/90 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Brochure Status:</strong> The Saturday 19 December Forest Trek is an announced summit feature. Detailed trail routes, safety clearance prerequisites, and transport splits are pending final release by the organizing committee.
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Button href="/programme" variant="gold" size="md">
                <span>View Full 3-Day Schedule</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button href="/venue" variant="outline" size="md" className="text-[#fcfbf8] border-[#dfd6c4]/40 hover:bg-[#143e30]">
                <span>Regional Geography & Venue</span>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#103327] rounded-3xl p-8 border border-[#256f57]/50 shadow-2xl relative">
              <h3 className="font-serif font-bold text-xl text-[#fcfbf8] mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#d6b25e]" />
                Trek Advisory & Readiness
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#dfd6c4]">
                <div className="border-b border-[#1b5341] pb-3">
                  <strong className="text-[#fcfbf8] block mb-0.5">Date & Time:</strong>
                  <span>Saturday, 19 December 2026 • Departing early morning from GIET Campus</span>
                </div>

                <div className="border-b border-[#1b5341] pb-3">
                  <strong className="text-[#fcfbf8] block mb-0.5">Eligibility:</strong>
                  <span>Registered summit delegates who complete fitness clearance upon arrival</span>
                </div>

                <div className="border-b border-[#1b5341] pb-3">
                  <strong className="text-[#fcfbf8] block mb-0.5">Guides & Safety:</strong>
                  <span>Organized in coordination with certified regional eco-guides and university sports department</span>
                </div>

                <div>
                  <strong className="text-[#fcfbf8] block mb-0.5">Gear Recommendation:</strong>
                  <span>Sturdy walking footwear, hydration packs, and light windbreakers</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1b5341] text-center">
                <span className="text-xs text-[#be9740] font-medium">
                  Trek briefings will be provided during Day 1 registration.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
