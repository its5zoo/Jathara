import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { InnovationOrbit } from "@/components/home/InnovationOrbit";
import { EventStats } from "@/components/home/EventStats";
import { MissionSection } from "@/components/home/MissionSection";
import { VerticalsSection } from "@/components/home/VerticalsSection";
import { ProgrammePreview } from "@/components/home/ProgrammePreview";
import { GIETShowcaseSection } from "@/components/home/GIETShowcaseSection";
import { BotanicalTimeline } from "@/components/home/BotanicalTimeline";
import { FounderTributeSection } from "@/components/home/FounderTributeSection";
import { InstitutionalLeadershipSection } from "@/components/home/InstitutionalLeadershipSection";
import { DandakaranyaSection } from "@/components/home/DandakaranyaSection";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { TravelPreviewSection } from "@/components/home/TravelPreviewSection";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { GatewayCTA } from "@/components/home/GatewayCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Event Overview & Key Telemetry */}
      <InnovationOrbit />
      <EventStats />
      <MissionSection />

      {/* 3. Summit Tracks */}
      <VerticalsSection />

      {/* 4. Programme Preview */}
      <ProgrammePreview />

      {/* 5. GIET University Showcase & Legacy */}
      <GIETShowcaseSection />
      <BotanicalTimeline />

      {/* 6. ISF Founder & Chairman Milestone Tribute */}
      <FounderTributeSection />

      {/* 7. Institutional Leadership */}
      <InstitutionalLeadershipSection />

      {/* 7. Dandakaranya Ethos & Organizing Ecosystem */}
      <DandakaranyaSection />
      <EcosystemSection />

      {/* 8. Venue & Regional Travel Corridors */}
      <TravelPreviewSection />

      {/* 9. Frequently Asked Questions */}
      <HomeFAQ />

      {/* 10. Registration Gateway Call to Action */}
      <GatewayCTA />
    </div>
  );
}
