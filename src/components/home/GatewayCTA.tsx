import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "../common/Container";
import { Button } from "../common/Button";

export function GatewayCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0d281e] via-[#103327] to-[#081a14] text-[#fcfbf8] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c25e38]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#256f57]/20 rounded-full blur-3xl pointer-events-none" />

      <Container size="default" className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b5341] border border-[#256f57]/60 text-xs text-[#d6b25e] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gateway to Startup Jathara @ Dandakaranya</span>
        </div>

        <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#fcfbf8] tracking-tight max-w-3xl mx-auto leading-tight">
          Be Part of India&apos;s Historic Grassroots Innovation Gathering
        </h2>

        <p className="mt-5 text-base sm:text-lg text-[#c8d1cd] max-w-2xl mx-auto leading-relaxed">
          Whether you are building a breakthrough rural startup, seeking early-stage venture dealflow, or mentoring next-generation founders, explore participation pathways for December 2026.
        </p>

        {/* Official Registration Live Status */}
        <div className="mt-8 max-w-xl mx-auto p-4 rounded-2xl bg-[#081a14]/80 border border-[#256f57]/50 text-xs sm:text-sm text-[#dfd6c4] flex items-center justify-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span>
            <strong>Official Registration Open:</strong> Delegate and founder applications are now active across all categories and 8 sector tracks.
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="/register"
            variant="gold"
            size="lg"
            className="font-bold text-sm sm:text-base shadow-lg"
          >
            <span>Register for Summit</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <Button
            href="/programme"
            variant="outline"
            size="lg"
            className="text-[#fcfbf8] border-[#dfd6c4]/40 hover:bg-[#143e30] hover:border-[#dfd6c4] text-sm sm:text-base"
          >
            <span>Inspect 3-Day Draft Programme</span>
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#7e8d87]">
          <span>• 18–20 December 2026</span>
          <span>• GIET University, Gunupur</span>
          <span>• ISF • GIET • IncubateX</span>
        </div>
      </Container>
    </section>
  );
}
