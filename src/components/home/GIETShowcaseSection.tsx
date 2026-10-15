import React from "react";
import Image from "next/image";
import { 
  GraduationCap, 
  Award, 
  ExternalLink, 
  ArrowRight,
  MapPin,
  Building2,
  Cpu,
  Sprout
} from "lucide-react";
import { Container } from "../common/Container";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export function GIETShowcaseSection() {
  const achievements = [
    {
      title: "Academic & Research Excellence",
      desc: "Recognized as a premier state private university for academic rigor, governance, and advanced research infrastructure.",
      icon: Award,
    },
    {
      title: "School of Engineering & Technology",
      desc: "Flagship faculty driving research-led education in computer science, robotics, biotechnology, and agri-tech.",
      icon: Cpu,
    },
    {
      title: "Technology Business Incubator (TBI)",
      desc: "Active incubation pipeline accelerating grassroots rural innovations, youth makers, and tribal enterprises.",
      icon: Building2,
    },
    {
      title: "Sustainable Dandakaranya Valley Campus",
      desc: "65+ acre scenic residential university campus equipped with state-of-the-art auditoriums, labs, and green energy.",
      icon: Sprout,
    },
  ];

  return (
    <section 
      aria-label="Host Institution Showcase: GIET University"
      className="py-20 sm:py-28 bg-[#f7f4ec] border-b border-[#e6dfd1] relative overflow-hidden"
    >
      {/* Subtle architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#143e30_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" 
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Campus Showcase with Official Architecture Asset */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#dfd6c4] shadow-2xl bg-[#081a14] group">
              {/* Official School of Engineering Building Photograph from https://www.giet.edu/schools/school-of-engineering/ */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/giet-school-of-engineering.jpg"
                  alt="School of Engineering and Technology Building, GIET University Campus, Gunupur"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={false}
                />
                
                {/* Dark gradient overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081a14] via-transparent to-black/30" />
                
                {/* Top Badge: Verified Campus Asset */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-full bg-[#081a14]/90 backdrop-blur-md border border-[#256f57]/60 text-xs font-semibold text-[#fcfbf8] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d6b25e]" />
                    <span>Host Academic Campus</span>
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#081a14]/90 backdrop-blur-md border border-[#256f57]/50 text-left">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#d6b25e] block">
                    Central Academic & Convention Complex
                  </span>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#fcfbf8] mt-0.5">
                    School of Engineering and Technology
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#c8d1cd] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#c25e38]" />
                    <span>GIET University, Gunupur, Rayagada, Odisha</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Logo Lockup Well with pristine unclipped presentation */}
            <div className="p-6 rounded-2xl bg-white border border-[#dfd6c4] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 sm:w-24 sm:h-20 rounded-2xl bg-white p-2 sm:p-2.5 flex items-center justify-center border border-[#dfd6c4] shadow-2xs shrink-0">
                  <Image
                    src="/logos/giet-logo.png"
                    alt="GIET University Official Crest (Gunupur, Odisha)"
                    width={84}
                    height={70}
                    className="max-h-14 sm:max-h-16 max-w-[72px] sm:max-w-[84px] w-auto h-auto object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-[#103327]">
                    GIET University, Gunupur
                  </h4>
                  <p className="text-xs text-[#c25e38] font-bold uppercase tracking-wider mt-0.5">
                    Premier Research Institution • State Private University
                  </p>
                  <p className="text-[11px] text-[#7e8d87] mt-1">
                    Rayagada District, Odisha, India
                  </p>
                </div>
              </div>

              <a
                href="https://www.giet.edu/schools/school-of-engineering/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#f7f4ec] hover:bg-[#ede7db] border border-[#dfd6c4] text-xs font-bold text-[#143e30] hover:text-[#c25e38] transition-colors shrink-0 shadow-2xs"
              >
                <span>Visit School Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Institutional Narrative & Academic Prestige */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="forest" size="md">
                Official Host Institution
              </Badge>
              <Badge variant="gold" size="md">
                28+ Years of Excellence
              </Badge>
            </div>

            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#103327] tracking-tight leading-[1.15]">
              A Crucible of Engineering & Grassroots Innovation
            </h2>

            <p className="text-base sm:text-lg text-[#4a5752] leading-relaxed">
              GIET University stands as one of Eastern India&apos;s foremost state private universities. Situated in the historic Dandakaranya heartland, its <strong>School of Engineering and Technology</strong> provides the visionary academic leadership, cutting-edge incubation infrastructure, and convention hospitality that makes ISF Startup Jathara 2026 possible.
            </p>

            {/* Key Accomplishments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {achievements.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={idx}
                    className="p-4.5 rounded-2xl bg-white border border-[#e6dfd1] hover:border-[#143e30]/40 transition-all shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#f7f4ec] flex items-center justify-center text-[#143e30] mb-3">
                      <IconComponent className="w-4.5 h-4.5 text-[#c25e38]" />
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#103327]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#4a5752] mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                href="/venue"
                variant="forest"
                size="md"
                className="font-bold shadow-md w-full sm:w-auto justify-center"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                <span>Explore Campus & Venue Logistics</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                href="https://www.giet.edu/schools/school-of-engineering/"
                external
                variant="outline"
                size="md"
                className="border-[#143e30] text-[#143e30] hover:bg-[#143e30] hover:text-[#fcfbf8] w-full sm:w-auto justify-center"
              >
                <span>GIET School of Engineering</span>
                <ExternalLink className="w-3.5 h-3.5 ml-2" />
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
