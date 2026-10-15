import type { Metadata } from "next";
import Link from "next/link";
import { 
  Mic2, 
  ArrowRight, 
  Mail, 
  AlertCircle 
} from "lucide-react";
import { INITIAL_SPEAKERS } from "@/data/eventData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";

export const metadata: Metadata = {
  title: "Speakers & Dignitaries",
  description: "Official roster, plenary keynotes, and track chairs for ISF Startup Jathara 2026 @ Dandakaranya, GIET University, Gunupur.",
};

export default function SpeakersPage() {
  return (
    <div className="w-full">
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-[#0d281e] via-[#103327] to-[#081a14] text-[#fcfbf8] py-16 sm:py-24 border-b border-[#1b5341]/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#256f57]/20 rounded-full blur-3xl pointer-events-none" />
        <Container size="default" className="relative z-10 text-center">
          <Badge variant="gold" size="md" className="mb-4">
            Summit Leadership & Panels
          </Badge>

          <h1 className="font-serif font-black text-3.5xl sm:text-5xl md:text-6xl text-[#fcfbf8] tracking-tight leading-tight">
            Speakers, Mentors & Dignitaries
          </h1>

          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#c8d1cd] max-w-2xl mx-auto leading-relaxed">
            Leading voices across government, venture capital, agriculture, healthcare, and higher education convening in Dandakaranya.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 text-xs text-amber-200/90 bg-amber-950/40 border border-amber-800/50 px-3.5 py-1.5 rounded-lg">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Editorial Transparency:</strong> The official confirmed dignitary roster is currently in steering committee review and will be released in scheduled editions.
            </span>
          </div>
        </Container>
      </section>

      {/* Main Speakers Section */}
      <section className="py-20 bg-[#fcfbf8] border-b border-[#e6dfd1]">
        <Container size="default">
          <SectionHeading
            eyebrow="Speaker Lineup"
            title="Official Speaker & Dignitary Announcements"
            subtitle="In accordance with our strict data integrity policy, only verified and confirmed speakers will appear on this official roster."
          />

          {/* Polished Empty State / Advisory Notice */}
          <EmptyState
            icon="clock"
            badgeText="Roster In Formalization"
            title="Official Speaker Lineup is Being Finalized"
            description="The steering committee of the International Startup Foundation and GIET University is currently finalizing invitations and confirmations for plenary keynotes, ministerial guests, and sector roundtable chairs."
            note="To maintain authentic and verified information, speaker profiles will be populated progressively upon formal confirmation. No placeholder personas are used."
            actionLabel="Inquire About Speaking / Mentoring"
            actionHref="/contact"
            className="mb-16"
          />

          {/* Sector Panel Chairs Outline */}
          <div className="mt-12">
            <h3 className="font-serif font-bold text-2xl text-[#103327] text-center mb-8">
              Roundtable Tracks & Panel Formats
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INITIAL_SPEAKERS.map((spk) => (
                <div
                  key={spk.id}
                  className="bg-[#ffffff] rounded-3xl p-6 sm:p-7 border border-[#e6dfd1] hover:border-[#143e30]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="terracotta" size="sm">
                        {spk.track}
                      </Badge>
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        {spk.statusLabel}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-lg sm:text-xl text-[#103327]">
                      {spk.name}
                    </h4>

                    <div className="text-xs font-semibold text-[#8c671b] uppercase tracking-wider mt-1">
                      {spk.designation}
                    </div>

                    <p className="text-xs sm:text-sm text-[#4a5752] mt-3 leading-relaxed">
                      {spk.bio}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#ede7db] flex items-center justify-between text-xs text-[#7e8d87]">
                    <span>Host Track: {spk.track}</span>
                    <Link
                      href="/programme"
                      className="text-[#143e30] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Session</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Speaker Nominations & Applications */}
      <section className="py-20 bg-[#f7f4ec] border-b border-[#e6dfd1]">
        <Container size="default">
          <div className="bg-[#ffffff] rounded-3xl p-8 sm:p-12 border border-[#e6dfd1] shadow-xs max-w-4xl mx-auto text-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#f7f4ec] border border-[#dfd6c4] flex items-center justify-center text-[#143e30] mx-auto">
              <Mic2 className="w-6 h-6 text-[#c25e38]" />
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#103327]">
              Recommend a Speaker or Apply to Mentor
            </h3>

            <p className="text-sm sm:text-base text-[#4a5752] max-w-2xl mx-auto leading-relaxed">
              Are you an experienced founder, agronomist, public health expert, angel investor, or academic researcher passionate about grassroots youth entrepreneurship? We welcome nominations for our sector roundtables.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" size="md">
                <Mail className="w-4 h-4 mr-2" />
                <span>Submit Speaker Nomination</span>
              </Button>
              <Button href="/register?category=speaker-mentor" variant="outline" size="md">
                <span>Mentor Category Details</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
