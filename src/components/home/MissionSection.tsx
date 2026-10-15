import React from "react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Sparkles, Lightbulb, CheckCircle2 } from "lucide-react";
import { Button } from "../common/Button";

export function MissionSection() {
  return (
    <section className="py-20 bg-[#fcfbf8] border-b border-[#e6dfd1]">
      <Container size="default">
        <SectionHeading
          eyebrow="Mission & Regional Vision"
          title="Bridging Grassroots Ingenuity to Global Capital"
          subtitle="ISF Startup Jathara @ Dandakaranya redefines where innovation happens, bringing investors and institutional mentors to the vibrant tribal and rural landscapes of South Odisha."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Narrative Column */}
          <div className="space-y-6 text-[#222b27]">
            <div className="p-6 rounded-2xl bg-[#f7f4ec] border border-[#ede7db]">
              <h3 className="font-serif font-bold text-xl text-[#103327] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c25e38]" />
                The Dandakaranya Imperative
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#4a5752] leading-relaxed">
                Dandakaranya is a legendary, bio-diverse forest expanse rich in natural resources, indigenous knowledge, and resilient communities. By hosting the summit at GIET University in Gunupur, ISF and its partners establish a direct physical gateway between grassroots problem-solvers and the formal startup economy.
              </p>
            </div>

            <div className="space-y-3.5">
              <h4 className="font-serif font-bold text-lg text-[#103327]">
                Key Strategic Focus Areas
              </h4>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#256f57] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#333e3a]">
                  <strong>Tribal & Rural Youth Empowerment:</strong> Identifying student makers and community inventors to seed sustainable local businesses rather than forcing urban migration.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#256f57] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#333e3a]">
                  <strong>Value Addition to Native Produce:</strong> Transforming forest treasures — from Araku organic coffee and minor millets to ethno-medicinal flora — into standardized consumer products.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#256f57] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#333e3a]">
                  <strong>GCC & Global Capital Influx:</strong> Engaging Global Capability Centers, corporate innovation leaders, and venture funds to sponsor incubation, pilot projects, and seed investments.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Button href="/about" variant="primary" size="md">
                Learn More About The Mission
              </Button>
              <Button href="/startups" variant="outline" size="md">
                Explore Junicorn Initiative
              </Button>
            </div>
          </div>

          {/* Institutional Pillars Card */}
          <div className="bg-gradient-to-br from-[#103327] to-[#081a14] rounded-3xl p-8 text-[#fcfbf8] border border-[#256f57]/40 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c25e38]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b5341] border border-[#256f57]/50 text-xs text-[#d6b25e] font-medium">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Distinctive Summit Model</span>
              </div>

              <h3 className="font-serif font-black text-2xl sm:text-3xl leading-snug">
                Where Traditional Wisdom Meets Frontier Enterprise
              </h3>

              <p className="text-sm text-[#c8d1cd] leading-relaxed">
                Rather than confining founders within metropolitan conference centers, ISF Startup Jathara creates an authentic community environment. Founders converse with investors over indigenous Araku coffee breaks and trek together through native forest trails.
              </p>

              <div className="p-4 rounded-xl bg-[#081a14]/60 border border-[#256f57]/30 space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#dfd6c4]">
                  <span>Host Campus Infrastructure:</span>
                  <span className="font-bold text-[#fcfbf8]">GIET University, Gunupur</span>
                </div>
                <div className="flex justify-between items-center text-[#dfd6c4]">
                  <span>Incubation Partnership:</span>
                  <span className="font-bold text-[#fcfbf8]">IncubateX Innovation Foundation</span>
                </div>
                <div className="flex justify-between items-center text-[#dfd6c4]">
                  <span>National Movement:</span>
                  <span className="font-bold text-[#fcfbf8]">International Startup Foundation</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  href="/register?category=startup-founder"
                  variant="gold"
                  size="md"
                  className="w-full justify-center font-bold"
                >
                  Join as Founder or Delegate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
