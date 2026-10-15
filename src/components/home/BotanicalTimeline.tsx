import React from "react";
import { 
  Sprout, 
  MapPin, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

interface MilestoneStage {
  stageNumber: string;
  phaseTitle: string;
  phaseTheme: string;
  dates: string;
  venue: string;
  botanicalConcept: "Roots & Soil" | "Stem & Infrastructure" | "First Leaves" | "Forest Canopy" | "Seeds & Future";
  description: string;
  highlights: string[];
  statusLabel: string;
}

export function BotanicalTimeline() {
  const stages: MilestoneStage[] = [
    {
      stageNumber: "01",
      phaseTitle: "Roots in Dandakaranya Soil",
      phaseTheme: "Heritage, Indigenous Bio-Assets & Academic Grounding",
      dates: "Summit Foundation",
      venue: "Gunupur & Eastern Ghats Heartlands",
      botanicalConcept: "Roots & Soil",
      description: "Grounding the summit in Dandakaranya's historic soil — drawing strength from centuries of indigenous knowledge, medicinal biodiversity, tribal self-help collectives, and GIET University's 28-year engineering foundation.",
      highlights: [
        "Centuries of indigenous botanical & sustainable seed preservation",
        "GIET University School of Engineering & Technology academic base",
        "Incubation mandate focused on overlooked rural youth"
      ],
      statusLabel: "Foundational Ethos",
    },
    {
      stageNumber: "02",
      phaseTitle: "Convergence & Pre-Summit Welcome",
      phaseTheme: "Delegation Reception, Executive Briefing & Welcome Dinner",
      dates: "Thursday, 17 December 2026 (Evening)",
      venue: "Executive Dining Pavilion, GIET Campus",
      botanicalConcept: "Stem & Infrastructure",
      description: "Delegates, keynote speakers, corporate GCC leaders, and angel syndicates arrive via Visakhapatnam, Berhampur, and Rayagada corridors for an informal opening dinner and steering briefing.",
      highlights: [
        "Executive dinner welcoming national and international delegates",
        "Distribution of delegate briefing dossier and transit kits",
        "Orientation for Day 1 inaugural functions and pitching stages"
      ],
      statusLabel: "Announced Brochure Milestone",
    },
    {
      stageNumber: "03",
      phaseTitle: "Day 1: Innovation Assemblies & Junicorn Pitches",
      phaseTheme: "Sector Roundtables, Araku Tastings & Angel Pitching",
      dates: "Friday, 18 December 2026",
      venue: "Main Auditorium & Sector Halls, GIET Campus",
      botanicalConcept: "First Leaves",
      description: "Summit grand inauguration followed by Healthcare & Agri-Food roundtables, signature Araku Valley coffee tastings, selected Tribal & Rural Junicorn pitches, and the closed-door Global Investors & GCC Connect session.",
      highlights: [
        "8:00 AM – 11:00 AM: Inauguration Function & Recognition Awards",
        "11:30 AM – 2:00 PM: Healthcare & Agri-Food Sector Roundtables",
        "2:30 PM – 3:30 PM: Selected Tribal & Rural Junicorn Pitches",
        "4:00 PM – 5:00 PM: Global Investors & GCC Connect Roundtable"
      ],
      statusLabel: "Brochure Draft Schedule",
    },
    {
      stageNumber: "04",
      phaseTitle: "Day 2: The Dandakaranya Forest Immersion",
      phaseTheme: "Guided Nature Expedition & Informal Venture Bonding",
      dates: "Saturday, 19 December 2026",
      venue: "Dandakaranya Forest Trails (Departing GIET Campus)",
      botanicalConcept: "Forest Canopy",
      description: "A full-day guided outdoor expedition taking founders, investors, and mentors into the living canopy of Dandakaranya. Designed to break formal conference hierarchies and forge genuine partnerships in nature.",
      highlights: [
        "6:30 AM departure on curated nature trails with certified eco-guides",
        "Field discussions on non-timber forest produce & eco-tourism",
        "Araku coffee field breaks & informal peer investment circles"
      ],
      statusLabel: "Outdoor Expedition",
    },
    {
      stageNumber: "05",
      phaseTitle: "Day 3: Policy Synthesis & Sustainable Scale",
      phaseTheme: "Grassroots Ecosystem Synthesis & Coordinated Departures",
      dates: "Sunday, 20 December 2026",
      venue: "Main Auditorium, GIET Campus",
      botanicalConcept: "Seeds & Future",
      description: "Synthesis policy roundtable formulating sustainable incubation frameworks for rural India, distribution of participation acknowledgments, and coordinated departures towards airport and railway hubs.",
      highlights: [
        "9:00 AM – 11:00 AM: Rural & Tribal Startup Ecosystem Policy Roundtable",
        "11:30 AM – 12:00 PM: Concluding Remarks & Coordinated Departures",
        "Post-summit incubation facilitation with GIET TBI & IncubateX"
      ],
      statusLabel: "Concluding Milestone",
    },
  ];

  return (
    <section 
      aria-label="Growth and Impact Timeline"
      className="py-20 sm:py-28 bg-[#fcfbf8] border-b border-[#e6dfd1] relative overflow-hidden"
    >
      <Container size="wide">
        <SectionHeading
          eyebrow="The Future Grows From The Roots"
          title="Summit Milestones & Impact Pathway"
          subtitle="A botanical progression illustrating how grassroots knowledge in Dandakaranya grows through academic incubation into national venture capital access."
        />

        {/* Botanical Timeline Structure: Balanced, Scannable Progression */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          
          {/* Central organic vine spine */}
          <div 
            className="absolute left-6 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#256f57] via-[#d6b25e] to-[#143e30] opacity-40" 
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-10">
            {stages.map((stage) => {
              return (
                <div 
                  key={stage.stageNumber}
                  className="relative flex items-start gap-4 sm:gap-6 pl-2"
                >
                  {/* Organic Node Marker */}
                  <div className="relative z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-[#0d281e] border-2 border-[#d6b25e] shadow-md flex items-center justify-center text-[#d6b25e] font-serif font-black text-xs sm:text-sm shrink-0">
                    {stage.stageNumber}
                  </div>

                  {/* Comprehensive Milestone Card */}
                  <div className="flex-1 bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#e6dfd1] hover:border-[#143e30]/50 hover:shadow-xl transition-all duration-300 shadow-xs">
                    
                    {/* Header Row: Botanical Concept + Date + Venue */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-[#ede7db]">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="terracotta" size="sm">
                          {stage.botanicalConcept}
                        </Badge>
                        <span className="text-xs uppercase font-mono tracking-wider text-[#8c671b] font-bold">
                          {stage.dates}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#7e8d87]">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#c25e38] shrink-0" />
                          <span className="font-medium text-[#4a5752]">{stage.venue}</span>
                        </div>
                        <span className="text-[10px] uppercase font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {stage.statusLabel}
                        </span>
                      </div>
                    </div>

                    {/* Stage Title & Theme */}
                    <div className="mt-4">
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#103327]">
                        {stage.phaseTitle}
                      </h3>
                      <p className="text-xs font-semibold text-[#8c671b] uppercase tracking-wider mt-0.5">
                        {stage.phaseTheme}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-[#4a5752] mt-3 leading-relaxed">
                      {stage.description}
                    </p>

                    {/* Milestones Bullet List */}
                    <div className="mt-5 pt-4 border-t border-[#ede7db]">
                      <span className="text-[11px] font-bold text-[#161e1b] uppercase tracking-wider block mb-2">
                        Key Program Tracks & Milestones:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {stage.highlights.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#333e3a] p-2 rounded-xl bg-[#fcfbf8] border border-[#ede7db]/70">
                            <Sprout className="w-3.5 h-3.5 text-[#256f57] shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Botanical Footer Note */}
        <div className="mt-16 p-6 rounded-2xl bg-[#f7f4ec] border border-[#dfd6c4] max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#256f57] shrink-0" />
            <p className="text-xs sm:text-sm text-[#4a5752]">
              <strong>Data Authenticity Guarantee:</strong> Milestones represent announced brochure schedules. Timings and room allocations remain tentative until formal organizer release.
            </p>
          </div>
          <Button href="/programme" variant="primary" size="sm" className="shrink-0 font-bold w-full sm:w-auto justify-center">
            <span>Explore 3-Day Timetable</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

      </Container>
    </section>
  );
}
