import React from "react";
import Image from "next/image";
import { ExternalLink, Check, ArrowRight } from "lucide-react";
import { PARTNERS_ORGANIZATIONS } from "@/data/eventData";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export function EcosystemSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#fcfbf8] border-b border-[#e6dfd1] relative">
      <Container size="wide">
        <SectionHeading
          eyebrow="Institutional Conveners & Host"
          title="The Organizing Ecosystem"
          subtitle="A high-trust collaboration between global startup network builders, a premier state private university, and regional innovation catalysts."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PARTNERS_ORGANIZATIONS.map((org) => {
            return (
              <div
                key={org.id}
                className="bg-[#ffffff] rounded-3xl p-7 sm:p-8 border border-[#e6dfd1] hover:border-[#143e30]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Role Badge + Official Site Link */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <Badge 
                      variant={org.role === "Organizer" ? "forest" : org.role === "Host Institution" ? "terracotta" : "ivory"} 
                      size="sm"
                    >
                      {org.role}
                    </Badge>
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#256f57] hover:text-[#0d281e] inline-flex items-center gap-1 font-semibold transition-colors"
                      aria-label={`Visit official website of ${org.name}`}
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Official Logo Display Well */}
                  <div className="h-20 w-full rounded-2xl bg-[#f7f4ec]/80 border border-[#dfd6c4]/60 p-3 flex items-center justify-center mb-6 group-hover:bg-[#f2eee3] transition-colors">
                    {org.logoUrl ? (
                      <Image
                        src={org.logoUrl}
                        alt={org.logoAlt || `${org.name} Official Brand Mark`}
                        width={180}
                        height={60}
                        className="max-h-14 max-w-[170px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span className="font-serif font-black text-xl text-[#0d281e]">
                        {org.abbreviation}
                      </span>
                    )}
                  </div>

                  {/* Organization Title & Metadata */}
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#103327] tracking-tight">
                    {org.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#8c671b] uppercase tracking-wider mt-1">
                    {org.abbreviation} • {org.location}
                  </p>

                  <p className="text-sm text-[#4a5752] mt-4 leading-relaxed font-normal">
                    {org.description}
                  </p>

                  {/* Highlight Checklist */}
                  <div className="mt-6 pt-5 border-t border-[#ede7db] space-y-2.5">
                    <span className="text-[11px] font-bold text-[#161e1b] uppercase tracking-wider block">
                      Institutional Capabilities:
                    </span>
                    <ul className="space-y-2 text-xs text-[#333e3a]">
                      {org.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                          <Check className="w-3.5 h-3.5 text-[#256f57] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-4 border-t border-[#ede7db]">
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#143e30] hover:text-[#c25e38] transition-colors"
                  >
                    <span>Visit {org.abbreviation} Online</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partnership Callout */}
        <div className="mt-14 bg-[#f7f4ec] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#dfd6c4] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[11px] font-bold text-[#c25e38] uppercase tracking-wider">
              Collaborative Opportunities
            </span>
            <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#103327]">
              Join as an Ecosystem Partner, Angel Network, or CSR Patron
            </h4>
            <p className="text-xs sm:text-sm text-[#4a5752] max-w-2xl leading-relaxed">
              We welcome angel syndicates, venture funds, corporate innovation arms, and state development agencies committed to rural empowerment and tribal entrepreneurship.
            </p>
          </div>

          <Button href="/partners" variant="forest" size="md" className="shrink-0 shadow-md">
            <span>Explore Partner Program</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
