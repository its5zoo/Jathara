import type { Metadata } from "next";
import Link from "next/link";
import { 
  Sparkles, 
  Activity, 
  Wheat, 
  Cpu, 
  Shield, 
  Users, 
  Building2, 
  Zap, 
  Coins, 
  Leaf, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  Compass, 
  Layers 
} from "lucide-react";
import { STARTUP_VERTICALS } from "@/data/eventData";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "Startups & Junicorn Initiative",
  description: "Explore the Junicorn grassroots movement, startup exhibition arena, and thematic verticals at ISF Startup Jathara 2026 @ Dandakaranya, GIET University, Gunupur.",
};

export default function StartupsPage() {
  const iconMap: Record<string, React.ElementType> = {
    Wheat,
    Cpu,
    Activity,
    Shield,
    Users,
    Building2,
    Zap,
    Coins,
    Sparkles,
    Leaf,
    Globe2,
  };

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0d281e] via-[#103327] to-[#081a14] text-[#fcfbf8] py-16 sm:py-24 border-b border-[#1b5341]/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#256f57]/20 rounded-full blur-3xl pointer-events-none" />
        <Container size="default" className="relative z-10 text-center">
          <Badge variant="gold" size="md" className="mb-4">
            Startup & Junicorn Pavilion
          </Badge>

          <h1 className="font-serif font-black text-3.5xl sm:text-5xl md:text-6xl text-[#fcfbf8] tracking-tight leading-tight">
            Nurturing Rural & Tribal Innovators
          </h1>

          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#c8d1cd] max-w-2xl mx-auto leading-relaxed">
            The platform where collegiate makers, grassroots problem solvers, and early-stage enterprises connect with national venture capital and industry mentors.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/register?category=startup-founder" variant="gold" size="lg" className="font-bold">
              <span>Founder Registration Gateway</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button href="/programme" variant="outline" size="lg" className="text-[#fcfbf8] border-[#dfd6c4]/40 hover:bg-[#143e30]">
              <span>Check Pitch Day Timing</span>
            </Button>
          </div>
        </Container>
      </section>

      {/* Junicorn Initiative Spotlight */}
      <section className="py-20 bg-[#fcfbf8] border-b border-[#e6dfd1]">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="terracotta" size="sm">
                Grassroots Youth Focus
              </Badge>

              <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#103327] tracking-tight leading-snug">
                The Junicorn Initiative: From Classroom to Enterprise
              </h2>

              <p className="text-base text-[#4a5752] leading-relaxed">
                The <strong>Junicorn Initiative</strong> is a nationwide movement pioneered by ISF to cultivate &apos;Junior Unicorns&apos; — young student innovators, school inventors, and rural youth who demonstrate ingenuity in solving everyday challenges in their local communities.
              </p>

              <p className="text-base text-[#4a5752] leading-relaxed">
                At Dandakaranya, Junicorn places particular emphasis on indigenous and tribal youth from districts across Odisha and neighboring states, providing them the formal stage, presentation coaching, and industry linkages normally confined to metropolitan premier institutes.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#256f57] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#333e3a]">
                    <strong>Curated Pitch Stage:</strong> On Day 1 (Friday 18 Dec, 2:30–3:30 PM), selected Tribal & Rural Junicorn teams will pitch before a panel of angels and sector leaders.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#256f57] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#333e3a]">
                    <strong>Incubation Bridge:</strong> Top projects receive incubation facilitation and advisory support in association with IncubateX and GIET University Incubation Center.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#f7f4ec] rounded-3xl p-8 border border-[#dfd6c4] space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-[#143e30] text-[#d6b25e] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>

                <h3 className="font-serif font-bold text-xl text-[#103327]">
                  What Junicorn Teams Receive
                </h3>

                <ul className="space-y-3 text-xs sm:text-sm text-[#333e3a]">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c25e38]" />
                    <span>Free exhibition demo kiosk in the Exhibition Arena</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c25e38]" />
                    <span>One-on-one pairing with industry domain mentors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c25e38]" />
                    <span>Participation in Day 2 Dandakaranya Forest Trekking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c25e38]" />
                    <span>Summit certification and innovation recognition awards</span>
                  </li>
                </ul>

                <div className="pt-2 border-t border-[#dfd6c4]">
                  <Button href="/register?category=junicorn-youth" variant="primary" size="sm" className="w-full justify-center">
                    Register as Student / Junicorn Maker
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The 8 Official Summit Tracks */}
      <section className="py-20 bg-[#f7f4ec] border-b border-[#e6dfd1]">
        <Container size="wide">
          <SectionHeading
            eyebrow="Official Summit Tracks"
            title="Thematic Sectors for Showcases & Roundtables"
            subtitle="Startups with active prototypes, MVPs, or operational traction in these eight official domains are invited to exhibit."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STARTUP_VERTICALS.map((vertical) => {
              const IconComponent = iconMap[vertical.iconName] || Sparkles;

              return (
                <div
                  key={vertical.id}
                  className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#e6dfd1] hover:border-[#143e30]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#f7f4ec] border border-[#dfd6c4] flex items-center justify-center text-[#143e30] mb-4">
                      <IconComponent className="w-6 h-6 text-[#c25e38]" />
                    </div>

                    <h3 className="font-serif font-bold text-xl text-[#103327]">
                      {vertical.title}
                    </h3>

                    <p className="text-xs font-semibold text-[#8c671b] uppercase tracking-wider mt-1">
                      {vertical.subtitle}
                    </p>

                    <p className="text-sm text-[#4a5752] mt-3.5 leading-relaxed">
                      {vertical.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-[#ede7db] space-y-2">
                      <span className="text-xs font-bold text-[#161e1b] uppercase tracking-wider block">
                        Sub-domain Focus:
                      </span>
                      <ul className="space-y-1 text-xs text-[#333e3a]">
                        {vertical.focusAreas.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#256f57]" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#ede7db]">
                    <div className="text-[11px] text-[#7e8d87] mb-3">
                      <strong>Audience:</strong> {vertical.targetParticipants}
                    </div>
                    <Link
                      href="/register?category=startup-founder"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#143e30] hover:text-[#c25e38] transition-colors"
                    >
                      <span>Express Founder Interest</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Exhibition Showcase Concept */}
      <section className="py-20 bg-[#fcfbf8] border-b border-[#e6dfd1]">
        <Container size="default">
          <SectionHeading
            eyebrow="Exhibition Floor"
            title="The Startup Showcase Arena"
            subtitle="An energetic, purpose-built exhibition arena inside the GIET campus where founders present physical prototypes, software demonstrations, and native produce."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#222b27]">
            <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e6dfd1]">
              <div className="w-10 h-10 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-3">
                <Layers className="w-5 h-5 text-[#143e30]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Dedicated Demo Kiosks
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5752] mt-2 leading-relaxed">
                Standardized modular display kiosks equipped with power, connectivity, and branding displays for hands-on product interaction.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e6dfd1]">
              <div className="w-10 h-10 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-3">
                <Users className="w-5 h-5 text-[#c25e38]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Investor Walkthroughs
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5752] mt-2 leading-relaxed">
                Structured exhibition walkthroughs for venture partners, angel networks, and GCC strategy executives during Araku coffee breaks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e6dfd1]">
              <div className="w-10 h-10 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-3">
                <Compass className="w-5 h-5 text-[#be9740]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Tribal Craft & Agro Pavilion
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5752] mt-2 leading-relaxed">
                A showcase pavilion dedicated to organic tribal farm goods, minor millets processing, natural textiles, and indigenous value chains.
              </p>
            </div>
          </div>

          {/* Transparent Policy Notice */}
          <div className="mt-10 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Official Application Notice:</strong> Formal selection criteria, booth dimension options, and evaluation panels will be announced when the registration portal opens. The event does not guarantee specific funding amounts; funding discussions occur directly between founders and participating investors.
            </div>
          </div>
        </Container>
      </section>

      {/* Gateway CTA */}
      <section className="py-16 bg-[#081a14] text-[#fcfbf8] text-center">
        <Container size="default">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl">
            Are You Building for Grassroots India?
          </h2>
          <p className="mt-2 text-sm text-[#c8d1cd] max-w-xl mx-auto">
            Review participation categories and prepare your startup presentation for ISF Startup Jathara 2026.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button href="/register" variant="gold" size="md">
              Browse Registration Categories
            </Button>
            <Button href="/programme" variant="outline" size="md" className="text-[#fcfbf8] border-[#dfd6c4]/40 hover:bg-[#143e30]">
              View Pitch Schedule
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
