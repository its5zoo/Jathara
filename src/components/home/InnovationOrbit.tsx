"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  GraduationCap, 
  Rocket, 
  Building2, 
  Users, 
  TrendingUp, 
  Globe2, 
  Cpu, 
  HeartHandshake,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { cn } from "@/lib/utils";

interface OrbitNode {
  id: string;
  label: string;
  category: "host" | "convener" | "participant" | "vertical";
  role: string;
  description: string;
  metric: string;
  href: string;
  icon: React.ElementType;
  positionAngle: number; // in degrees for desktop SVG ring placement
  ring: "inner" | "mid" | "outer";
}

export function InnovationOrbit() {
  const nodes: OrbitNode[] = [
    {
      id: "giet",
      label: "GIET University",
      category: "host",
      role: "Host Institution & School of Engineering",
      description: "State private university campus in Gunupur providing academic leadership, TBI incubation, and world-class convention infrastructure.",
      metric: "65+ Acre Campus • Gunupur",
      href: "/venue",
      icon: GraduationCap,
      positionAngle: 45,
      ring: "inner",
    },
    {
      id: "isf",
      label: "ISF Network",
      category: "convener",
      role: "Global Event Organizer",
      description: "International Startup Foundation catalyzing cross-border market linkages, angel syndicates, and grassroots entrepreneurship across tier-2 and rural hubs.",
      metric: "Global Venture Network",
      href: "/about",
      icon: Rocket,
      positionAngle: 165,
      ring: "inner",
    },
    {
      id: "incubatex",
      label: "IncubateX",
      category: "convener",
      role: "Associated Innovation Foundation",
      description: "Venture incubation foundation delivering design sprints, mentorship curriculums, and pitch preparation for emerging regional enterprises.",
      metric: "Incubation Accelerator",
      href: "/partners",
      icon: Building2,
      positionAngle: 285,
      ring: "inner",
    },
    {
      id: "founders",
      label: "Grassroots Founders",
      category: "participant",
      role: "Rural & Tribal Enterprises",
      description: "Pioneering entrepreneurs solving authentic ground-level problems in agro-processing, bio-assets, rural telemedicine, and artisanal supply chains.",
      metric: "50+ Pitch Finalists",
      href: "/startups",
      icon: Users,
      positionAngle: 15,
      ring: "mid",
    },
    {
      id: "investors",
      label: "Angel & VC Funds",
      category: "participant",
      role: "Capital Syndicates & Angels",
      description: "Discerning venture capital leaders and family offices seeking uncrowded, high-impact regional dealflow with genuine unit economics.",
      metric: "Closed-door Roundtables",
      href: "/investors",
      icon: TrendingUp,
      positionAngle: 105,
      ring: "mid",
    },
    {
      id: "gcc",
      label: "GCC Strategic Leads",
      category: "participant",
      role: "Global Capability Centers",
      description: "Multinational innovation heads exploring rural tech deployments, CSR incubation partnerships, and sustainable procurement corridors.",
      metric: "Cross-Border Market Access",
      href: "/investors",
      icon: Globe2,
      positionAngle: 195,
      ring: "mid",
    },
    {
      id: "junicorn",
      label: "Junicorn Makers",
      category: "participant",
      role: "Student & Youth Innovators",
      description: "School and collegiate inventors nurtured through ISF's nationwide Junicorn drive to turn classroom prototypes into viable startups.",
      metric: "Student Maker Batch",
      href: "/startups",
      icon: Cpu,
      positionAngle: 255,
      ring: "mid",
    },
    {
      id: "mentors",
      label: "Domain Mentors",
      category: "participant",
      role: "Sector Scientists & Track Chairs",
      description: "Specialists in agronomy, public health, engineering, and policy guiding founders throughout the 3-day summit sessions and forest trek.",
      metric: "8 Sector Tracks",
      href: "/programme",
      icon: HeartHandshake,
      positionAngle: 330,
      ring: "mid",
    },
  ];

  const [activeNodeId, setActiveNodeId] = useState<string>("giet");
  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  return (
    <section 
      aria-label="Innovation Ecosystem Orbit"
      className="py-20 sm:py-28 bg-[#081a14] text-[#fcfbf8] border-b border-[#1b5341]/60 relative overflow-hidden"
    >
      {/* Background radial atmosphere */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#143e30]/30 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-10 right-10 w-80 h-80 bg-[#c25e38]/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <Container size="wide" className="relative z-10">
        <SectionHeading
          eyebrow="Interactive Constellation"
          title="The Innovation Ecosystem Orbit"
          subtitle="Explore the interconnected network of academic leadership, venture builders, grassroots founders, and global capital converging at GIET University."
          theme="dark"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-12">
          
          {/* Left / Center Area: Visual SVG Orbit System (Desktop & Tablet) */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center p-4">
              
              {/* SVG Orbit Track Rings with enhanced luminous contrast */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox="0 0 500 500" 
                aria-hidden="true"
              >
                {/* Center glow */}
                <circle cx="250" cy="250" r="55" fill="#143e30" fillOpacity="0.5" />
                
                {/* Inner Orbit Path */}
                <circle 
                  cx="250" 
                  cy="250" 
                  r="115" 
                  fill="none" 
                  stroke="#256f57" 
                  strokeWidth="1.5" 
                  strokeDasharray="5 7" 
                  className="opacity-80"
                />
                
                {/* Mid Orbit Path */}
                <circle 
                  cx="250" 
                  cy="250" 
                  r="195" 
                  fill="none" 
                  stroke="#d6b25e" 
                  strokeWidth="1.2" 
                  strokeDasharray="4 8" 
                  className="opacity-70"
                />

                {/* Visible connecting orbital filaments */}
                <line x1="250" y1="250" x2="330" y2="170" stroke="#d6b25e" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="3 3" />
                <line x1="250" y1="250" x2="140" y2="280" stroke="#256f57" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="3 3" />
                <line x1="250" y1="250" x2="250" y2="60" stroke="#c25e38" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="3 3" />
              </svg>

              {/* Central Nucleus Event Emblem */}
              <div className="relative z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#103327] via-[#0d281e] to-[#081a14] border-2 border-[#d6b25e] shadow-[0_0_30px_rgba(214,178,94,0.25)] flex flex-col items-center justify-center text-center p-2.5 transition-transform hover:scale-105 select-none">
                <Sparkles className="w-5 h-5 text-[#d6b25e] mb-1" />
                <span className="font-serif font-black text-[11px] sm:text-xs text-[#fcfbf8] leading-tight uppercase">
                  Startup Jathara
                </span>
                <span className="text-[9px] text-[#dfd6c4] font-mono mt-0.5">
                  @ Dandakaranya
                </span>
              </div>

              {/* Orbital Nodes Placed Geometrically */}
              {nodes.map((node) => {
                const isSelected = node.id === activeNodeId;
                const IconComp = node.icon;
                
                // Radii for inner vs mid
                const radius = node.ring === "inner" ? 115 : 195;
                const angleRad = (node.positionAngle * Math.PI) / 180;
                
                // Center is 250, 250 in a 500x500 box
                const xPercent = 50 + (radius / 250) * 50 * Math.cos(angleRad);
                const yPercent = 50 + (radius / 250) * 50 * Math.sin(angleRad);

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveNodeId(node.id)}
                    style={{
                      left: `${xPercent}%`,
                      top: `${yPercent}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className={cn(
                      "absolute z-30 group flex flex-col items-center cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b25e]",
                      isSelected ? "scale-115 z-40" : "hover:scale-105 opacity-90 hover:opacity-100"
                    )}
                    aria-label={`Inspect ${node.label} (${node.role})`}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-md",
                        isSelected
                          ? "bg-[#d6b25e] text-[#081a14] border-2 border-white shadow-[0_0_20px_rgba(214,178,94,0.6)]"
                          : node.category === "host"
                          ? "bg-[#143e30] text-[#d6b25e] border border-[#256f57]"
                          : "bg-[#103327] text-[#fcfbf8] border border-[#1b5341] group-hover:border-[#dfd6c4]"
                      )}
                    >
                      <IconComp className="w-5 h-5 shrink-0" />
                    </div>

                    <span 
                      className={cn(
                        "hidden sm:block text-[10px] font-semibold tracking-tight whitespace-nowrap mt-1.5 px-2 py-0.5 rounded-md backdrop-blur-md transition-colors",
                        isSelected
                          ? "bg-[#d6b25e] text-[#081a14] font-bold"
                          : "bg-[#081a14]/80 text-[#dfd6c4] border border-[#1b5341]/60"
                      )}
                    >
                      {node.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Area: Interactive Intelligence Detail Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#103327]/90 rounded-3xl p-7 sm:p-9 border border-[#256f57]/60 shadow-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300">
              
              {/* Subtle top light bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d6b25e] via-[#c25e38] to-[#256f57]" />

              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge
                  variant={
                    activeNode.category === "host"
                      ? "gold"
                      : activeNode.category === "convener"
                      ? "forest"
                      : "terracotta"
                  }
                  size="sm"
                >
                  {activeNode.role}
                </Badge>

                <span className="text-[11px] font-mono text-[#d6b25e] font-semibold">
                  {activeNode.metric}
                </span>
              </div>

              <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#fcfbf8] tracking-tight">
                {activeNode.label}
              </h3>

              <p className="text-sm sm:text-base text-[#c8d1cd] mt-4 leading-relaxed font-normal">
                {activeNode.description}
              </p>

              {/* Special GIET University Badge & Accolade */}
              {activeNode.id === "giet" && (
                <div className="mt-5 p-3.5 rounded-xl bg-[#081a14]/70 border border-[#256f57]/50 text-xs text-[#dfd6c4] flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#d6b25e] shrink-0" />
                  <span>
                    <strong>Academic Host:</strong> School of Engineering & Technology, GIET University, Gunupur, Odisha.
                  </span>
                </div>
              )}

              {/* Node Navigation Tabs on Mobile/Tablet */}
              <div className="mt-6 pt-5 border-t border-[#1b5341] space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#dfd6c4]/80 font-semibold block">
                  Select Ecosystem Node:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {nodes.map((node) => (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNodeId(node.id)}
                      className={cn(
                        "text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer",
                        node.id === activeNodeId
                          ? "bg-[#d6b25e] text-[#081a14] border-[#d6b25e] font-bold"
                          : "bg-[#081a14]/60 text-[#dfd6c4] border-[#1b5341] hover:border-[#dfd6c4]"
                      )}
                    >
                      {node.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Link to Relevant Route */}
              <div className="mt-7 pt-4 border-t border-[#1b5341]">
                <Button 
                  href={activeNode.href}
                  variant="gold"
                  size="sm"
                  className="w-full justify-between font-bold"
                >
                  <span>Explore {activeNode.label} Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
