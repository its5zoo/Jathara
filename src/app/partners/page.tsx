import type { Metadata } from "next";
import Image from "next/image";
import { 
  ExternalLink, 
  Handshake, 
  Check, 
  Mail,
  ShieldCheck,
  GraduationCap,
  Rocket,
  ArrowRight
} from "lucide-react";
import { PARTNERS_ORGANIZATIONS } from "@/data/eventData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "Institutional Organizers & Partners",
  description: "Official institutional leadership and ecosystem coalition for ISF Startup Jathara 2026. Featuring International Startup Foundation, GIET University, and IncubateX.",
};

export default function PartnersPage() {
  return (
    <div className="w-full">
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-[#081a14] via-[#0d281e] to-[#081a14] text-[#fcfbf8] py-16 sm:py-24 border-b border-[#1b5341]/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#256f57]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c25e38]/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="default" className="relative z-10 text-center">
          <Badge variant="gold" size="md" className="mb-4">
            Institutional Leadership & Conveners
          </Badge>

          <h1 className="font-serif font-black text-3.5xl sm:text-5xl md:text-6xl text-[#fcfbf8] tracking-tight leading-tight">
            Organizers & Partner Coalition
          </h1>

          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#c8d1cd] max-w-2xl mx-auto leading-relaxed">
            Convened through the shared vision of global enterprise foundations, an accredited academic university campus, and grassroots acceleration platforms.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 p-2.5 rounded-xl bg-[#081a14]/80 border border-[#256f57]/50 text-xs sm:text-sm text-[#dfd6c4]">
            <ShieldCheck className="w-4 h-4 text-[#d6b25e]" />
            <span>
              <strong>Accredited Triad:</strong> ISF (Organizer) • GIET University (Host) • IncubateX (Associated Foundation)
            </span>
          </div>
        </Container>
      </section>

      {/* Primary Organizing Triad */}
      <section className="py-20 sm:py-24 bg-[#fcfbf8] border-b border-[#e6dfd1]">
        <Container size="default">
          <SectionHeading
            eyebrow="The Organizing Core"
            title="Convening Institutions & Verified Mandates"
            subtitle="Accurate institutional roles representing the event organizer, host academic campus, and associated innovation accelerator."
          />

          <div className="space-y-8">
            {PARTNERS_ORGANIZATIONS.map((org) => (
              <div
                key={org.id}
                className="bg-[#ffffff] rounded-3xl p-7 sm:p-10 border border-[#e6dfd1] shadow-xs hover:border-[#143e30]/40 hover:shadow-lg transition-all flex flex-col md:flex-row gap-8 items-start justify-between"
              >
                <div className="flex-1 space-y-4">
                  {/* Role & Location Badge */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      variant={org.role === "Organizer" ? "forest" : org.role === "Host Institution" ? "terracotta" : "gold"}
                      size="sm"
                    >
                      {org.role}
                    </Badge>
                    <span className="text-xs font-semibold text-[#8c671b] uppercase tracking-wider">
                      {org.abbreviation} • {org.location}
                    </span>
                  </div>

                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#103327]">
                    {org.name}
                  </h2>

                  <p className="text-sm sm:text-base text-[#4a5752] leading-relaxed">
                    {org.description}
                  </p>

                  <div className="pt-2 space-y-2">
                    <strong className="text-xs font-bold uppercase tracking-wider text-[#161e1b] block">
                      Core Responsibilities & Strategic Mandate:
                    </strong>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#333e3a]">
                      {org.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#256f57] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Official Logo Well & Outbound Card */}
                <div className="shrink-0 p-6 rounded-2xl bg-[#f7f4ec] border border-[#ede7db] w-full md:w-80 space-y-4 text-center">
                  <div className="h-24 w-full rounded-xl bg-white p-2.5 flex items-center justify-center border border-[#dfd6c4] shadow-2xs">
                    {org.logoUrl ? (
                      <Image
                        src={org.logoUrl}
                        alt={org.logoAlt || `${org.name} Official Logo`}
                        width={200}
                        height={70}
                        className="max-h-16 max-w-[200px] w-auto h-auto object-contain"
                      />
                    ) : (
                      <span className="font-serif font-black text-xl text-[#0d281e]">
                        {org.abbreviation}
                      </span>
                    )}
                  </div>

                  {org.campusImageUrl && (
                    <div className="rounded-xl overflow-hidden border border-[#dfd6c4] shadow-2xs relative aspect-video">
                      <Image
                        src={org.campusImageUrl}
                        alt="GIET University School of Engineering and Technology Campus"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-[11px] font-bold text-white tracking-wide drop-shadow-sm">
                          School of Engineering & Tech Campus
                        </span>
                      </div>
                    </div>
                  )}

                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#ffffff] border border-[#dfd6c4] text-xs font-bold text-[#143e30] hover:text-[#c25e38] hover:border-[#143e30] flex items-center justify-between shadow-2xs transition-colors"
                  >
                    <span>Visit {org.schoolName ? "School of Engineering" : org.abbreviation} Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="text-[11px] text-[#7e8d87] pt-2 border-t border-[#ede7db] leading-snug">
                    {org.accreditation || "Verified organizational reference per official summit materials."}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Prospective Partners & Ecosystem Enablers */}
      <section className="py-20 bg-[#f7f4ec] border-b border-[#e6dfd1]">
        <Container size="default">
          <SectionHeading
            eyebrow="Ecosystem Collaboration"
            title="Partner With Startup Jathara 2026"
            subtitle="We invite venture funds, industry consortiums, philanthropic foundations, and government departments to partner with us."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#ffffff] rounded-2xl p-6 sm:p-7 border border-[#e6dfd1] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-4">
                <Handshake className="w-5 h-5 text-[#c25e38]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Track & Roundtable Sponsors
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5752] mt-2 leading-relaxed">
                Lead specific roundtables in Healthcare & Lifesciences, Agri-Food, or GCC Connect with executive branding and curated whitepaper authorship.
              </p>
            </div>

            <div className="bg-[#ffffff] rounded-2xl p-6 sm:p-7 border border-[#e6dfd1] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-4">
                <GraduationCap className="w-5 h-5 text-[#256f57]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Academic & Research Partners
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5752] mt-2 leading-relaxed">
                Connect university incubation networks and polytechnics to sponsor student maker batches for the Junicorn Innovation track.
              </p>
            </div>

            <div className="bg-[#ffffff] rounded-2xl p-6 sm:p-7 border border-[#e6dfd1] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-4">
                <Rocket className="w-5 h-5 text-[#be9740]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Seed Capital & Angel Networks
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5752] mt-2 leading-relaxed">
                Angel syndicates, micro-VCs, and corporate venture arms seeking primary access to uncrowded, high-impact regional dealflow.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-[#ffffff] border border-[#e6dfd1] text-center max-w-xl mx-auto space-y-4 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-[#103327]">
              Request Partnership Proposal
            </h3>
            <p className="text-xs sm:text-sm text-[#4a5752] leading-relaxed">
              Formal sponsor brochures, roundtable lead frameworks, and bilateral collaboration agreements can be requested through our secretariat desk.
            </p>
            <Button href="/contact" variant="forest" size="md">
              <Mail className="w-4 h-4 mr-2" />
              <span>Contact Partnership Secretariat</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
