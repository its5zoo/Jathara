import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  AlertTriangle,
  Users 
} from "lucide-react";
import { EVENT_METADATA } from "@/data/eventData";
import { STUDENT_COORDINATORS } from "@/data/coordinatorsData";
import { Container } from "../common/Container";
import { InstitutionalLogos } from "../common/InstitutionalLogos";
import { CopyrightYear } from "./CopyrightYear";

export function SiteFooter() {
  return (
    <footer className="bg-[#081a14] text-[#dfd6c4] border-t border-[#1b5341]/50 relative overflow-hidden">
      {/* Decorative background aura */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-[#143e30]/30 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#c25e38]/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Main Footer Content */}
      <div className="relative pt-16 pb-12">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Column 1: Identity & Ecosystem (2 cols on lg) */}
            <div className="lg:col-span-2 space-y-4">
              <Link
                href="/"
                className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b25e] rounded-xl w-fit"
                aria-label="ISF Startup Jathara 2026 Homepage"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#dfd6c4] flex items-center justify-center p-1 shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/logos/isf-logo.webp"
                    alt="International Startup Foundation (ISF) Logo"
                    width={32}
                    height={32}
                    className="max-h-8 max-w-8 w-auto h-auto object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-black text-xl text-[#fcfbf8] tracking-tight group-hover:text-[#d6b25e] transition-colors">
                    ISF STARTUP JATHARA 2026
                  </h3>
                  <p className="text-xs text-[#d6b25e] font-semibold tracking-wide uppercase">
                    Startup Jathara @ Dandakaranya
                  </p>
                </div>
              </Link>

              <p className="text-sm text-[#c8d1cd] leading-relaxed max-w-md">
                An international innovation summit bringing together grassroots innovators, tribal and rural youth, angel investors, venture funds, GCC leaders, and sector mentors in the historic Dandakaranya landscape.
              </p>

              <div className="pt-2 space-y-2 text-xs text-[#ede7db]">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#d6b25e] flex-shrink-0 mt-0.5" />
                  <span><strong>18–20 December 2026</strong> (Welcome Dinner: 17 Dec evening)</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#c25e38] flex-shrink-0 mt-0.5" />
                  <span>GIET University Campus, Gunupur, Rayagada District, Odisha, India</span>
                </div>
              </div>

              {/* Official Institutional Pillars */}
              <div className="pt-4 border-t border-[#1b5341]/60">
                <p className="text-xs uppercase tracking-wider text-[#d6b25e] font-semibold mb-3">
                  Organizing Ecosystem & Host Institution
                </p>
                <InstitutionalLogos variant="footer-lockup" />
              </div>
            </div>

            {/* Column 2: Event Navigation */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#d6b25e] font-semibold mb-4">
                Explore Summit
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/about" className="hover:text-[#fcfbf8] transition-colors">
                    About the Event
                  </Link>
                </li>
                <li>
                  <Link href="/about#institutional-legacy" className="hover:text-[#fcfbf8] transition-colors">
                    GIET University Legacy
                  </Link>
                </li>
                <li>
                  <Link href="/programme" className="hover:text-[#fcfbf8] transition-colors flex items-center gap-1.5">
                    <span>3-Day Schedule</span>
                    <span className="text-[10px] bg-amber-900/60 text-amber-300 px-1.5 py-0.5 rounded border border-amber-700/50">Draft</span>
                  </Link>
                </li>
                <li>
                  <Link href="/startups" className="hover:text-[#fcfbf8] transition-colors">
                    Startups & Junicorn
                  </Link>
                </li>
                <li>
                  <Link href="/investors" className="hover:text-[#fcfbf8] transition-colors">
                    Investors & Delegates
                  </Link>
                </li>
                <li>
                  <Link href="/venue" className="hover:text-[#fcfbf8] transition-colors">
                    Venue & Travel Hubs
                  </Link>
                </li>
                <li>
                  <Link href="/speakers" className="hover:text-[#fcfbf8] transition-colors">
                    Speakers & Dignitaries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Participation & Gateway */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#d6b25e] font-semibold mb-4">
                Participation
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/register" className="hover:text-[#fcfbf8] transition-colors flex items-center gap-1.5">
                    <span>Registration Gateway</span>
                    <span className="text-[10px] bg-emerald-800/80 text-emerald-200 px-1.5 py-0.5 rounded border border-emerald-500/40">Free</span>
                  </Link>
                </li>
                <li>
                  <Link href="/register?category=startup-founder" className="hover:text-[#fcfbf8] transition-colors">
                    Founder Pitch Entry
                  </Link>
                </li>
                <li>
                  <Link href="/register?category=investor-fund" className="hover:text-[#fcfbf8] transition-colors">
                    Investor Delegation
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="hover:text-[#fcfbf8] transition-colors">
                    Partners & Sponsors
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-[#fcfbf8] transition-colors">
                    Summit FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#fcfbf8] transition-colors">
                    Contact & Helplines
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Secretariat & Contact */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#d6b25e] font-semibold mb-4">
                Helpline & Helpdesk
              </h4>
              <div className="space-y-3 text-sm text-[#c8d1cd]">
                <p>
                  For institutional delegations, speaker confirmations, and travel coordination:
                </p>
                <div className="space-y-2 text-xs pt-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#d6b25e] shrink-0" />
                    <a
                      href={`mailto:${EVENT_METADATA.contactEmail}`}
                      className="text-[#fcfbf8] hover:text-[#d6b25e] transition-colors focus-visible:outline-none focus-visible:underline"
                      aria-label={`Email secretariat at ${EVENT_METADATA.contactEmail}`}
                    >
                      {EVENT_METADATA.contactEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#c25e38] shrink-0" />
                    <a
                      href={`tel:${EVENT_METADATA.helplinePhone.replace(/\s+/g, "")}`}
                      className="text-[#c8d1cd] hover:text-[#fcfbf8] transition-colors focus-visible:outline-none focus-visible:underline"
                      aria-label={`Call campus helpline at ${EVENT_METADATA.helplinePhone}`}
                    >
                      {EVENT_METADATA.helplinePhone}
                    </a>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="p-3 rounded-lg bg-[#103327]/80 border border-[#256f57]/40 text-[11px] leading-relaxed">
                    <div className="font-semibold text-[#fcfbf8] flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      Notice on Program Status
                    </div>
                    The published 18–20 Dec 2026 brochure programme is explicitly a draft schedule subject to ongoing refinements.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Coordinators (Compact Institutional Band) */}
          <div className="mt-12 pt-8 border-t border-[#1b5341]/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#c25e38]" />
                <h4 className="text-xs uppercase tracking-wider text-[#d6b25e] font-bold">
                  Student Coordinators
                </h4>
              </div>
              <span className="text-[11px] text-[#8c9c94] font-medium">
                GIET University Organising Team
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {STUDENT_COORDINATORS.map((coordinator) => (
                <div
                  key={coordinator.id}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#103327]/60 border border-[#1b5341]/60 text-xs text-[#fcfbf8] hover:border-[#be9740]/50 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d6b25e] shrink-0" />
                  <span className="font-semibold text-[#fcfbf8] tracking-tight">
                    {coordinator.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal, Copyright and Disclaimer Bar */}
          <div className="mt-8 pt-6 border-t border-[#1b5341]/40 flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-4 text-xs text-[#7e8d87]">
            <p>
              © <CopyrightYear /> {EVENT_METADATA.name}. Organized by International Startup Foundation (ISF) in collaboration with GIET University &amp; IncubateX.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
              <Link href="/privacy" className="hover:text-[#ede7db] transition-colors">
                Draft Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-[#ede7db] transition-colors">
                Draft Terms of Attendance
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-[#ede7db] transition-colors">
                Media Enquiries
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
