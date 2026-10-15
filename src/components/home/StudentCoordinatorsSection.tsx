import React from "react";
import { Users, GraduationCap } from "lucide-react";
import { Container } from "../common/Container";
import { Badge } from "../common/Badge";
import { STUDENT_COORDINATORS, StudentCoordinator } from "@/data/coordinatorsData";
import { cn } from "@/lib/utils";

const AVATAR_STYLES: Record<StudentCoordinator["avatarColor"], { bg: string; text: string; border: string }> = {
  forest: {
    bg: "bg-gradient-to-br from-[#103327] to-[#071912]",
    text: "text-[#d6b25e]",
    border: "border-[#be9740]/40",
  },
  terracotta: {
    bg: "bg-gradient-to-br from-[#c25e38] to-[#994324]",
    text: "text-[#fcfbf8]",
    border: "border-[#e6a890]/40",
  },
  gold: {
    bg: "bg-gradient-to-br from-[#be9740] to-[#8c671b]",
    text: "text-[#0d281e]",
    border: "border-[#be9740]/50",
  },
  emerald: {
    bg: "bg-gradient-to-br from-[#1b5341] to-[#0f3427]",
    text: "text-[#e8f2ee]",
    border: "border-[#388e6f]/40",
  },
};

export function StudentCoordinatorsSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#fbf9f4] border-b border-[#e6dfd1]">
      <Container size="wide">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-block mb-3.5">
            <Badge variant="forest" size="md" className="font-medium tracking-wide">
              Youth Leadership & Coordination
            </Badge>
          </div>
          <h2 className="text-2.5xl sm:text-3.5xl md:text-4xl font-serif font-bold text-[#103327] tracking-tight leading-tight">
            Student Coordinators
          </h2>
          <p className="mt-3 text-[#5c6e64] text-base sm:text-lg leading-relaxed">
            Meet the student coordinators supporting the organization and execution of ISF Startup Jathara 2026.
          </p>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {STUDENT_COORDINATORS.map((coordinator) => {
            const style = AVATAR_STYLES[coordinator.avatarColor];
            return (
              <div
                key={coordinator.id}
                className="group relative bg-[#fcfbf8] rounded-2xl border border-[#e6dfd1] p-6 shadow-2xs hover:shadow-md hover:border-[#be9740]/60 transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Initials Badge Avatar */}
                <div className="relative mb-4">
                  <div
                    className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center font-serif font-bold text-xl shadow-xs border transition-transform duration-300 group-hover:scale-105",
                      style.bg,
                      style.text,
                      style.border
                    )}
                    aria-label={`Initials for ${coordinator.name}`}
                  >
                    <span>{coordinator.initials}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#fcfbf8] border border-[#e6dfd1] flex items-center justify-center text-[#103327] shadow-2xs">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Coordinator Name */}
                <h3 className="font-serif font-bold text-lg text-[#103327] group-hover:text-[#1b5341] transition-colors leading-snug">
                  {coordinator.name}
                </h3>

                {/* Role Pill */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#103327]/6 border border-[#103327]/12 text-[11px] font-bold text-[#103327] uppercase tracking-wider">
                  <Users className="w-3 h-3 text-[#c25e38]" />
                  <span>{coordinator.role}</span>
                </div>

                {/* Affiliation */}
                <p className="mt-3 text-xs text-[#73837b] leading-relaxed">
                  {coordinator.affiliation}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
