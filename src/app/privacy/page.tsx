import type { Metadata } from "next";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { EVENT_METADATA } from "@/data/eventData";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "Draft Privacy Policy",
  description: "Review-ready draft privacy policy for ISF Startup Jathara 2026. Explicitly subject to final legal formalization.",
};

export default function PrivacyPage() {
  return (
    <div className="w-full py-16 bg-[#fcfbf8]">
      <Container size="narrow">
        <div className="mb-8">
          <Badge variant="draft" size="md" className="mb-3">
            Draft Policy — Under Review
          </Badge>

          <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#103327] tracking-tight">
            Draft Privacy Policy
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#7e8d87]">
            Last Updated for Review: October 2026 • Prepared for ISF Startup Jathara 2026
          </p>
        </div>

        {/* Disclaimer Notice */}
        <div className="p-4.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed mb-8 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Legal Notice & Disclaimer:</strong> This document is a review-ready draft prepared for the event platform. It does not constitute final legal compliance or an executed contract until formalized by the legal counsels of the International Startup Foundation and GIET University.
          </div>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-[#333e3a] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#103327]">
              1. Overview & Scope
            </h2>
            <p>
              This draft policy outlines the principles governing the intended collection, usage, and protection of information gathered from participants, delegates, applicants, and visitors of the <strong>ISF Startup Jathara 2026</strong> summit taking place at GIET University, Gunupur, Odisha.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#103327]">
              2. Information Collected
            </h2>
            <p>
              Upon activation of the formal registration and ticketing portals, the platform will collect information necessary for event administration, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#4a5752]">
              <li>Contact coordinates: Full Name, Institutional Affiliation, Official Email, Phone Number.</li>
              <li>Participant Profile: Founder credentials, venture summary, student proof, or accredited investor status.</li>
              <li>Logistics Requirements: Arrival dates, transit hub selections, and campus accommodation preferences.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#103327]">
              3. Intended Usage of Information
            </h2>
            <p>
              Participant information will be processed solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#4a5752]">
              <li>Issue official delegate accreditation, admission badges, and summit access passes.</li>
              <li>Coordinate campus security clearance and transit hub airport/railway shuttles.</li>
              <li>Facilitate relevant investor-founder matching for pitching sessions and roundtables.</li>
              <li>Provide essential notifications regarding schedule updates and safety advisories for the Dandakaranya forest trek.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#103327]">
              4. Data Retention & Third Parties
            </h2>
            <p>
              Information will not be sold, rented, or distributed to commercial advertising brokers. Shared data will be strictly limited to verified institutional partners (ISF, GIET University, IncubateX) and essential hospitality contractors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#103327]">
              5. Contact & Privacy Inquiries
            </h2>
            <p>
              For legal inquiries or clarifications on data handling, please contact the secretariat at:
            </p>
            <div className="p-4 rounded-xl bg-[#f7f4ec] border border-[#ede7db] text-xs">
              <strong>ISF Secretariat Privacy Desk:</strong>{" "}
              <a
                href={`mailto:${EVENT_METADATA.contactEmail}`}
                className="text-[#143e30] font-semibold underline hover:text-[#c25e38] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#143e30]"
              >
                {EVENT_METADATA.contactEmail}
              </a>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-[#ede7db] flex justify-between items-center text-xs">
          <Button href="/terms" variant="outline" size="sm">
            <span>Review Draft Terms of Attendance</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>

          <Button href="/" variant="primary" size="sm">
            <span>Back to Home</span>
          </Button>
        </div>
      </Container>
    </div>
  );
}
