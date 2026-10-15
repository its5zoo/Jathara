"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { 
  MapPin, 
  Calendar,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { REGISTRATION_CATEGORIES } from "@/data/eventData";
import { RegistrationCategory } from "@/lib/types";
import { RegistrationCategorySlug, RegistrationRecord } from "@/lib/types/registration";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Badge } from "../common/Badge";
import { CategoryCardSelector } from "./CategoryCardSelector";
import { RegistrationForm } from "./RegistrationForm";
import { RegistrationSuccessView } from "./RegistrationSuccessView";

export function RegistrationGatewayClient() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category");

  // Selected Category for registration
  const [selectedCategory, setSelectedCategory] = useState<RegistrationCategory | null>(() => {
    if (initialCategoryParam) {
      return (
        REGISTRATION_CATEGORIES.find((c) => c.slug === initialCategoryParam) || null
      );
    }
    return null;
  });

  // Submitted record state
  const [completedRegistration, setCompletedRegistration] = useState<RegistrationRecord | null>(null);

  const handleSelectCategory = (cat: RegistrationCategory) => {
    setSelectedCategory(cat);
    // Smooth scroll down to form
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const target = document.getElementById("registration-form-section");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    }
  };

  const handleCancelForm = () => {
    setSelectedCategory(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSuccess = (record: RegistrationRecord) => {
    setCompletedRegistration(record);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setCompletedRegistration(null);
    setSelectedCategory(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-[#0d281e] via-[#103327] to-[#081a14] text-[#fcfbf8] py-16 sm:py-24 border-b border-[#1b5341]/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#256f57]/20 rounded-full blur-3xl pointer-events-none" />
        <Container size="default" className="relative z-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <Badge variant="gold" size="md">
              Registration Portal
            </Badge>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40">
              100% Free Delegate Entry
            </span>
          </div>

          <h1 className="font-serif font-black text-3.5xl sm:text-5xl md:text-6xl text-[#fcfbf8] tracking-tight leading-tight">
            ISF Startup Jathara 2026 Registration
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-[#c8d1cd] max-w-2xl mx-auto leading-relaxed">
            Startup Jathara @ Dandakaranya welcomes startup founders, student makers, venture capitalists, corporate delegates, and domain mentors to GIET University, Gunupur, Odisha.
          </p>

          {/* Summit Facts Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#fcfbf8]/90">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              <Calendar className="w-4 h-4 text-[#be9740]" />
              <span>18–20 December 2026 (Welcome Dinner 17 Dec)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              <MapPin className="w-4 h-4 text-[#b24e2b]" />
              <span>GIET University, Gunupur, Odisha</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>No Registration Fees</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <div className="bg-[#fcfbf8] min-h-[600px] border-b border-[#e6dfd1]">
        {/* If registration succeeded, show success confirmation */}
        {completedRegistration ? (
          <section className="py-16">
            <RegistrationSuccessView
              registration={completedRegistration}
              onReset={handleReset}
            />
          </section>
        ) : selectedCategory ? (
          /* If a category is selected, render the dedicated registration form */
          <section id="registration-form-section" className="py-12 sm:py-16">
            <RegistrationForm
              categorySlug={selectedCategory.slug as RegistrationCategorySlug}
              initialTrack={searchParams.get("track") || undefined}
              onCancel={handleCancelForm}
              onSuccess={handleSuccess}
            />
          </section>
        ) : (
          /* Default: Category Grid Selector */
          <section className="py-16 sm:py-20">
            <Container size="wide">
              <SectionHeading
                eyebrow="Participant Tracks"
                title="Choose Your Delegation Profile"
                subtitle="Select your participation track below to complete your registration. Individual, team, and corporate delegation intakes are open and free of charge."
              />

              <div className="mt-8">
                <CategoryCardSelector
                  selectedCategorySlug={null}
                  onSelectCategory={handleSelectCategory}
                />
              </div>

              {/* Informative footer card */}
              <div className="mt-16 max-w-3xl mx-auto p-6 rounded-2xl bg-[#f7f4ec] border border-[#ede7db] text-xs sm:text-sm text-[#4a5752] space-y-2">
                <div className="font-bold text-[#103327] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#be9740]" />
                  <span>Important Summit Registration Guidelines</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>All registrations are 100% free:</strong> There are no application fees or ticket charges.</li>
                  <li><strong>Team limits:</strong> Startup and Junicorn team registrations accept up to 5 members (including the team leader).</li>
                  <li><strong>Travel & Accommodation:</strong> Travel details can remain undecided if your itinerary is pending. Campus accommodation will be coordinated directly by the organizing team following registration review.</li>
                  <li><strong>Instant Reference:</strong> Each submission generates a unique, human-readable registration reference ID for event desk verification.</li>
                </ul>
              </div>
            </Container>
          </section>
        )}
      </div>
    </div>
  );
}
