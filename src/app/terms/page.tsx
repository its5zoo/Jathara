import type { Metadata } from "next";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { EVENT_METADATA } from "@/data/eventData";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "Draft Terms of Attendance",
  description: "Review-ready draft terms of attendance for ISF Startup Jathara 2026. Explicitly subject to final legal formalization.",
};

export default function TermsPage() {
  return (
    <div className="w-full py-16 bg-[#fcfbf8]">
      <Container size="narrow">
        <div className="mb-8">
          <Badge variant="draft" size="md" className="mb-3">
            Draft Terms — Under Review
          </Badge>

          <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#103327] tracking-tight">
            Draft Terms of Attendance & Participation
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#7e8d87]">
            Last Updated for Review: October 2026 • Prepared for ISF Startup Jathara 2026
          </p>
        </div>

        {/* Disclaimer Notice */}
        <div className="p-4.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed mb-8 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Legal Notice & Disclaimer:</strong> This document is a draft terms guideline for review. It does not establish binding contractual liability until formally approved and signed off by event leadership.
          </div>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-[#333e3a] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#103327]">
              1. Event Accreditation & Admission
            </h2>
            <p>
              Admission to ISF Startup Jathara 2026 (18–20 December 2026 at GIET University Campus, Gunupur, Odisha) is subject to valid accreditation in one of the approved categories. The organizers reserve the right to verify credentials at registration check-in.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#103327]">
              2. Tentative Nature of the Programme
            </h2>
            <p>
              As explicitly stated in official materials, the summit schedule, speaker participation, and panel timings represent a tentative draft. The organizers reserve the right to adjust room allocations, timings, and session moderators due to unavoidable logistical considerations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#103327]">
              3. Dandakaranya Forest Trek Participation
            </h2>
            <p>
              Participation in the Saturday, 19 December 2026 Forest Trekking Expedition is voluntary. Participants must acknowledge that outdoor trails involve natural uneven terrain and must comply with all guide briefings and safety protocols provided by certified expedition coordinators.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#103327]">
              4. Pitching & Intellectual Property
            </h2>
            <p>
              Startup presentations made on the public pitch floor or during exhibition sessions are non-confidential unless conducted within private closed-door investor breakouts. Founders remain the sole owners of their underlying inventions and patents.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#103327]">
              5. Photography & Media
            </h2>
            <p>
              By attending, delegates acknowledge that photography and video recording will occur across public areas of the campus for summit documentation, media dispatches, and archival purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#103327]">
              6. Governance & Enquiries
            </h2>
            <p>
              For questions regarding summit terms, please contact:
            </p>
            <div className="p-4 rounded-xl bg-[#f7f4ec] border border-[#ede7db] text-xs">
              <strong>ISF Secretariat Helpdesk:</strong>{" "}
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
          <Button href="/privacy" variant="outline" size="sm">
            <span>Review Draft Privacy Policy</span>
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
