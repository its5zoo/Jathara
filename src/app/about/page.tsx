import type { Metadata } from "next";
import Image from "next/image";
import { 
  Target, 
  Users, 
  TreePine, 
  CheckCircle2, 
  Coffee,
  Building2,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  ExternalLink,
  Calendar,
  Compass
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { 
  GIET_LEADERSHIP_PROFILES, 
  GIET_VERIFIED_MILESTONES, 
  GIET_VERIFIED_STATS,
  GIET_ACADEMIC_SCHOOLS,
  GIET_INNOVATION_ECOSYSTEM
} from "@/data/leadershipData";

export const metadata: Metadata = {
  title: "About GIET University | ISF Startup Jathara 2026",
  description: "Learn about GIET University's 28-year legacy of learning, research and innovation in Gunupur, Odisha, and its role as the official host institution for ISF Startup Jathara 2026 @ Dandakaranya.",
};

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* ========================================================
          1. EDITORIAL HEADER & EVENT THESIS
         ======================================================== */}
      <section className="bg-gradient-to-b from-[#0d281e] via-[#103327] to-[#081a14] text-[#fcfbf8] py-16 sm:py-24 border-b border-[#1b5341]/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#256f57]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#be9740]/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="default" className="relative z-10 text-center">
          <Badge variant="gold" size="md" className="mb-4">
            About The Summit &amp; Host Institution
          </Badge>

          <h1 className="font-serif font-black text-3.5xl sm:text-5xl md:text-6xl text-[#fcfbf8] tracking-tight leading-tight">
            Igniting Grassroots Potential in Dandakaranya
          </h1>

          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#c8d1cd] max-w-2xl mx-auto leading-relaxed">
            ISF Startup Jathara 2026 is an intentional enterprise movement designed to decentralize India&apos;s startup economy, bringing global capital and institutional mentorship to the rural and tribal communities of South Odisha.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#dfd6c4]">
            <span className="p-2.5 rounded-xl bg-[#081a14]/60 border border-[#256f57]/40 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#be9740]" />
              <span><strong>Dates:</strong> 18–20 December 2026 (Welcome Dinner: 17 Dec)</span>
            </span>
            <span className="p-2.5 rounded-xl bg-[#081a14]/60 border border-[#256f57]/40 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#be9740]" />
              <span><strong>Host Campus:</strong> GIET University, Gunupur, Odisha</span>
            </span>
            <span className="p-2.5 rounded-xl bg-[#081a14]/60 border border-[#256f57]/40 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#be9740]" />
              <span><strong>Convener:</strong> International Startup Foundation</span>
            </span>
          </div>
        </Container>
      </section>

      {/* ========================================================
          2. THE CORE THESIS & WHAT JATHARA SIGNIFIES
         ======================================================== */}
      <section className="py-20 bg-[#fcfbf8] border-b border-[#e6dfd1]">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="terracotta" size="sm">
                The Core Thesis
              </Badge>

              <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#103327] tracking-tight leading-snug">
                Why Startup Jathara is Different From Conventional Summits
              </h2>

              <p className="text-base text-[#4a5752] leading-relaxed">
                Most entrepreneurship summits occur within glass-walled metropolitan auditoriums, far removed from where raw materials originate, where tribal traditions preserve bio-diverse knowledge, and where grassroots challenges demand inventive engineering.
              </p>

              <p className="text-base text-[#4a5752] leading-relaxed">
                <strong>Startup Jathara @ Dandakaranya</strong> inverts this dynamic. By bringing leading investors, venture capitalists, corporate Global Capability Center (GCC) heads, and technology luminaries directly to GIET University in Gunupur, the summit grounds national dialogue in rural realities.
              </p>

              <div className="p-5 rounded-2xl bg-[#f7f4ec] border border-[#ede7db] space-y-3">
                <h3 className="font-serif font-bold text-lg text-[#103327] flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#c25e38]" />
                  What &apos;Jathara&apos; Signifies
                </h3>
                <p className="text-sm text-[#4a5752] leading-relaxed">
                  In regional tradition, a <em>Jathara</em> is a vibrant collective pilgrimage and festival of celebration, solidarity, and trade. Startup Jathara adopts this cultural ethos — transforming venture capital and startup pitching into a communal celebration of ingenuity, indigenous knowledge, and resilience.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#ffffff] rounded-3xl p-8 border border-[#e6dfd1] shadow-md space-y-6">
                <h3 className="font-serif font-bold text-xl text-[#103327] border-b border-[#ede7db] pb-3">
                  Summit Guiding Objectives
                </h3>

                <ul className="space-y-4 text-sm text-[#333e3a]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#256f57] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Grassroots Scouting:</strong> Uncover breakthrough ideas developed by rural youth, women self-help collectives, and student innovators.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#256f57] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Venture Capital Access:</strong> Facilitate meaningful pitch opportunities before accredited angel syndicates and venture fund partners.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#256f57] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Cross-Border Linkages:</strong> Partner with GCCs and international foundation networks to support rural scale-ups.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#256f57] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Ecological Consciousness:</strong> Integrate sustainable forest practices, non-timber forest produce value chains, and eco-materials.
                    </span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Button href="/programme" variant="primary" size="sm" className="w-full justify-center">
                    Review 3-Day Draft Timetable
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          3. MANDATORY SECTION: A LEGACY OF LEARNING, RESEARCH & INNOVATION
             (GIET UNIVERSITY INSTITUTIONAL PROFILE)
         ======================================================== */}
      <section id="giet-legacy" className="py-20 sm:py-24 bg-[#ffffff] border-b border-[#e6dfd1]">
        <Container size="default">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <Badge variant="forest" size="md">
              Host Institution Legacy
            </Badge>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#103327] tracking-tight">
              A Legacy of Learning, Research &amp; Innovation
            </h2>
            <p className="text-base text-[#4a5752] leading-relaxed">
              Founded in 1997 in Gunupur, Odisha, GIET University has grown from a pioneering technical college into a prestigious state private university, fostering international research, multi-disciplinary excellence, and grassroots rural empowerment.
            </p>
          </div>

          {/* Institutional Overview & Founding Story Card */}
          <div className="bg-[#faf8f4] rounded-3xl p-8 sm:p-12 border border-[#ede7db] shadow-xs space-y-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8c671b]">
                  Institutional Founding &amp; Evolution
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#103327]">
                  From Technical Pioneer to Premier State Private University
                </h3>
                <p className="text-sm sm:text-base text-[#333e3a] leading-relaxed">
                  GIET University, Gunupur (formerly known as the <strong>Gandhi Institute of Engineering and Technology</strong>) was established by the <strong>Vidya Bharati Educational Trust</strong> in Gunupur, Rayagada district, Odisha, India in 1997. Approved by the All India Council for Technical Education (AICTE) since its inception, the Trust was established with the steadfast motto of providing high-quality technical education in a disciplined, progressive environment with international benchmarks.
                </p>
                <p className="text-sm sm:text-base text-[#333e3a] leading-relaxed">
                  In 2018, recognizing more than two decades of sustained academic excellence, the institution was conferred full State Private University status through the passage of the <strong>GIET University Act, 2018</strong> by the Odisha Legislative Assembly, with formal approval and incorporation under Section 2(f) of the UGC Act, 1956 in 2019.
                </p>
                <p className="text-sm sm:text-base text-[#333e3a] leading-relaxed">
                  Situated amidst the lush foothills of the Eastern Ghats with the scenic Bansadhara River flowing alongside, the university&apos;s 113.03-acre eco-friendly campus stands as a peaceful center of high-tech scholarship, bringing world-class laboratory infrastructure, industrial research, and community-centered incubation to the heartlands of Eastern India.
                </p>
              </div>

              <div className="lg:col-span-4 bg-[#ffffff] p-6 rounded-2xl border border-[#ede7db] space-y-4 shadow-xs">
                <div className="flex items-center gap-3 border-b border-[#ede7db] pb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#081a14] p-1.5 flex items-center justify-center shrink-0">
                    <Image
                      src="/logos/giet-logo.png"
                      alt="GIET Crest"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <strong className="block font-serif text-base text-[#103327]">
                      GIET University
                    </strong>
                    <span className="text-xs text-[#7e8d87]">Gunupur, Rayagada, Odisha</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-[#4a5752]">
                  <div>
                    <span className="text-[#7e8d87] block font-medium">Founding Body:</span>
                    <strong className="text-[#103327]">Vidya Bharati Educational Trust (1997)</strong>
                  </div>
                  <div>
                    <span className="text-[#7e8d87] block font-medium">University Charter:</span>
                    <strong className="text-[#103327]">GIET University Act, 2018 (Odisha)</strong>
                  </div>
                  <div>
                    <span className="text-[#7e8d87] block font-medium">Statutory Recognitions:</span>
                    <span>UGC Act 1956 (Sec 2f) • AICTE • NAAC • NBA • DSIR (SIRO) • ICAR</span>
                  </div>
                  <div>
                    <span className="text-[#7e8d87] block font-medium">Campus Scale:</span>
                    <span>113.03 Acres • 4,000+ Students • 300+ Faculty</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ede7db]">
                  <a
                    href="https://www.giet.edu/about-giet/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#1b5341] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Official GIET Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Verified Statistics Bar */}
            <div className="pt-6 border-t border-[#ede7db]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {GIET_VERIFIED_STATS.map((stat, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#ffffff] border border-[#ede7db] text-center space-y-0.5">
                    <div className="font-serif font-black text-2xl text-[#103327]">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-bold text-[#8c671b] leading-tight">
                      {stat.label}
                    </div>
                    <div className="text-[10px] text-[#7e8d87] truncate" title={stat.subtext}>
                      {stat.subtext}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chronological Milestone Timeline */}
          <div className="space-y-8 mb-16">
            <div className="border-b border-[#ede7db] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#c25e38] block">
                  Verified Historical Chronology
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#103327]">
                  Key Institutional Milestones
                </h3>
              </div>
              <span className="text-xs text-[#7e8d87] italic">
                Sourced from published university records &amp; government gazettes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GIET_VERIFIED_MILESTONES.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#faf8f4] border border-[#ede7db] hover:border-[#be9740] transition-colors space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-black text-2xl text-[#103327]">
                        {item.year}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
                        Milestone
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#103327] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#4a5752] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#ede7db]/60 text-[10px] text-[#7e8d87] font-mono">
                    Record: {item.verifiedSource}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic & Research Ecosystem Across Disciplines */}
          <div className="space-y-8 mb-16">
            <div className="border-b border-[#ede7db] pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#256f57] block">
                Comprehensive Pedagogy
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#103327]">
                Academic Schools &amp; Research Ecosystem
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5752] mt-1">
                A multi-disciplinary spectrum spanning engineering, agricultural research, life sciences, healthcare, and business administration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GIET_ACADEMIC_SCHOOLS.map((school, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#faf8f4] border border-[#ede7db] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-[#dfd6c4] text-[#8c671b]">
                      {school.badge}
                    </span>
                    <GraduationCap className="w-4 h-4 text-[#be9740]" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#103327]">
                    {school.name}
                  </h4>
                  <p className="text-xs text-[#4a5752] leading-relaxed">
                    {school.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Innovation, Incubation & Entrepreneurship Facilities */}
          <div className="space-y-8 mb-16">
            <div className="border-b border-[#ede7db] pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8c671b] block">
                Incubation Infrastructure
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#103327]">
                Innovation, Incubation &amp; Technology Transfer
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5752] mt-1">
                Officially documented innovation centers connecting student innovators and community entrepreneurs with national funding and testbeds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GIET_INNOVATION_ECOSYSTEM.map((center, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl bg-[#ffffff] border border-[#ede7db] shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="ivory" size="sm">
                      {center.tag}
                    </Badge>
                    <Lightbulb className="w-5 h-5 text-[#c25e38]" />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-[#103327]">
                    {center.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4a5752] leading-relaxed">
                    {center.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Responsibility & Tribal Community Commitment */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#071711] text-[#fcfbf8] border border-[#1b5341] space-y-4 mb-16">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gold" size="sm">Official Mission Mandate</Badge>
              <span className="text-xs text-[#a0b0aa] font-mono">Social Responsibility &amp; Regional Inclusion</span>
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#fcfbf8]">
              Empowering the Meritorious Youth of Dandakaranya
            </h3>
            <blockquote className="text-base sm:text-lg text-[#dfd6c4] font-serif italic border-l-2 border-[#be9740] pl-4 my-2">
              &ldquo;To support and uplift the meritorious students of this Tribal Area to represent as an Ambassador in all forums as a part of our social responsibility.&rdquo;
            </blockquote>
            <p className="text-xs sm:text-sm text-[#c8d1cd] leading-relaxed">
              Situated in Rayagada district — one of the most culturally vibrant yet economically underserved tribal corridors of Eastern India — GIET University has made regional inclusion its central purpose. The university provides dedicated fee waivers, scholarship endowments, vocational training, and primary education initiatives (through the Gandhi Public School) to ensure talented students from indigenous communities become confident leaders, scientists, and entrepreneurs.
            </p>
          </div>

          {/* Leadership Preview Section (5 Verified Leaders) */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ede7db] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8c671b] block">
                  Institutional Governance
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#103327]">
                  GIET University Leadership Council
                </h3>
                <p className="text-xs sm:text-sm text-[#4a5752] mt-1">
                  Meet the visionaries, academic officers, and executive leaders guiding the institution.
                </p>
              </div>

              <a
                href="https://www.giet.edu/leadership/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#103327] bg-[#f7f4ec] hover:bg-[#ede7db] border border-[#dfd6c4] px-4 py-2.5 rounded-xl transition-colors shrink-0"
              >
                <span>Official GIET Leadership Directory</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#be9740]" />
              </a>
            </div>

            {/* 5 Leaders Preview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {GIET_LEADERSHIP_PROFILES.map((leader) => (
                <div
                  key={leader.id}
                  className="bg-[#faf8f4] p-5 rounded-2xl border border-[#ede7db] transition-all flex flex-col justify-between group shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-white border border-[#ede7db]">
                      <Image
                        src={leader.imageSrc}
                        alt={`Portrait of ${leader.name}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 20vw"
                        className="object-cover object-top transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c671b] block">
                        {leader.position}
                      </span>
                      <strong className="font-serif text-sm text-[#103327] block leading-tight mt-0.5">
                        {leader.name}
                      </strong>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] text-[#5c6e64] line-clamp-3 leading-relaxed">
                    {leader.summaryBio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          4. THE DANDAKARANYA CONTEXT
         ======================================================== */}
      <section className="py-20 bg-[#f7f4ec] border-b border-[#e6dfd1]">
        <Container size="default">
          <SectionHeading
            eyebrow="Regional Identity"
            title="The Dandakaranya Heritage"
            subtitle="Deep historical roots, extraordinary bio-diversity, and an untapped economic frontier in South Odisha."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#ffffff] rounded-2xl p-6 border border-[#e6dfd1] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-4">
                <TreePine className="w-5 h-5 text-[#256f57]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Ecological Heartland
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#4a5752] leading-relaxed">
                Spanning parts of Odisha, Andhra Pradesh, Chhattisgarh, and Telangana, Dandakaranya is celebrated for its dense Eastern Ghats flora, medicinal herbs, and water catchments.
              </p>
            </div>

            <div className="bg-[#ffffff] rounded-2xl p-6 border border-[#e6dfd1] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-4">
                <Users className="w-5 h-5 text-[#c25e38]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Indigenous Innovation
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#4a5752] leading-relaxed">
                Indigenous communities possess centuries of sophisticated botanical knowledge, seed preservation practices, natural dyeing arts, and cooperative social structures.
              </p>
            </div>

            <div className="bg-[#ffffff] rounded-2xl p-6 border border-[#e6dfd1] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-4">
                <Coffee className="w-5 h-5 text-[#be9740]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#103327]">
                Signature Agro-Produce
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#4a5752] leading-relaxed">
                From Araku Valley organic coffee to Koraput indigenous millets and organic turmeric, the region is ripe for high-value agricultural branding and direct consumer market channels.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          5. INSTITUTIONAL COALITION: ISF, GIET & INCUBATEX
         ======================================================== */}
      <section className="py-20 bg-[#fcfbf8] border-b border-[#e6dfd1]">
        <Container size="default">
          <SectionHeading
            eyebrow="The Coalition"
            title="Convened by Trusted Institutions"
            subtitle="Combining international startup foundation networks with premier higher education and grassroots incubation leadership."
          />

          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#ffffff] border border-[#e6dfd1] shadow-xs flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-2xl bg-[#f7f4ec] border border-[#dfd6c4] p-2 flex items-center justify-center shrink-0">
                <Image
                  src="/logos/isf-logo.webp"
                  alt="International Startup Foundation (ISF) Official Logo"
                  width={56}
                  height={56}
                  className="max-h-12 max-w-12 object-contain"
                />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#103327]">
                    International Startup Foundation (ISF)
                  </h3>
                  <Badge variant="forest" size="sm">Organizer</Badge>
                </div>
                <p className="text-xs sm:text-sm text-[#4a5752] leading-relaxed">
                  ISF is a global non-profit enterprise movement that builds vibrant startup ecosystems across tier-2, tier-3, and rural regions. ISF brings international investor delegations, structured mentorship curriculums, and national recognition to the event.
                </p>
                <a
                  href="https://www.isfnetwork.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#256f57] font-semibold hover:underline inline-flex items-center gap-1 pt-1"
                >
                  Visit Official ISF Network Website →
                </a>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#ffffff] border border-[#e6dfd1] shadow-xs flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-2xl bg-[#f7f4ec] border border-[#dfd6c4] p-2 flex items-center justify-center shrink-0">
                <Image
                  src="/logos/giet-logo.png"
                  alt="GIET University Official Logo"
                  width={56}
                  height={56}
                  className="max-h-12 max-w-12 object-contain"
                />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#103327]">
                    GIET University, Gunupur
                  </h3>
                  <Badge variant="ivory" size="sm">Host Institution</Badge>
                  <span className="text-[11px] font-semibold text-[#8c671b] bg-[#f7f4ec] px-2 py-0.5 rounded border border-[#dfd6c4]">
                    State Private University (Act of 2018) • UGC 2(f)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4a5752] leading-relaxed">
                  Established in Gunupur, Rayagada, Odisha with over 28 years of academic distinction, GIET University is a pioneer in engineering research, agricultural sciences, biotechnology, and rural innovation. Its 113.03-acre green residential campus provides premier laboratory infrastructure, active incubation facilities through its Technology Business Incubator (TBI), ACICGIETU, and BIRAC E-YUVA Centre for Startup Jathara 2026.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <a
                    href="https://www.giet.edu/leadership/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#256f57] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    GIET University Leadership Directory →
                  </a>
                  <a
                    href="https://www.giet.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#7e8d87] hover:text-[#103327] hover:underline inline-flex items-center gap-1"
                  >
                    GIET University Main Portal →
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#ffffff] border border-[#e6dfd1] shadow-xs flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-2xl bg-[#f7f4ec] border border-[#dfd6c4] p-2 flex items-center justify-center shrink-0">
                <Image
                  src="/logos/incubatex-logo.png"
                  alt="IncubateX Innovation Foundation Official Logo"
                  width={56}
                  height={56}
                  className="max-h-12 max-w-12 object-contain"
                />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#103327]">
                    IncubateX Innovation Foundation
                  </h3>
                  <Badge variant="terracotta" size="sm">Associated Foundation</Badge>
                </div>
                <p className="text-xs sm:text-sm text-[#4a5752] leading-relaxed">
                  IncubateX specializes in incubation frameworks, design thinking bootcamps, and early-stage acceleration. IncubateX ensures participating startups receive structured pre-event pitch preparation and post-event investment tracking.
                </p>
                <a
                  href="https://www.incubationx.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#256f57] font-semibold hover:underline inline-flex items-center gap-1 pt-1"
                >
                  Visit Official IncubateX Website →
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          6. CTA BOTTOM BANNER
         ======================================================== */}
      <section className="py-16 bg-[#081a14] text-[#fcfbf8] text-center">
        <Container size="default">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl">
            Explore the Announced Programme and Pathways
          </h2>
          <p className="mt-3 text-sm text-[#c8d1cd] max-w-xl mx-auto">
            Inspect the tentative three-day timetable or register your interest across founder, investor, and delegate categories.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/programme" variant="outline" size="md" className="border-white/20 text-white hover:bg-white/10">
              View Draft Schedule
            </Button>
            <Button href="/register" variant="terracotta" size="md">
              Registration Gateway
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
