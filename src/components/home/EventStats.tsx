import React from "react";
import { Container } from "../common/Container";
import { Layers, Users, Compass, Award } from "lucide-react";

export function EventStats() {
  const stats = [
    {
      icon: Layers,
      value: "3 Days",
      label: "Intensive Program",
      description: "Brochure draft schedule spanning 18–20 Dec 2026 with welcome dinner on 17 Dec.",
    },
    {
      icon: Users,
      value: "8 Tracks",
      label: "Official Sector Tracks",
      description: "Agritech, AI/Quantum, Healthcare, Defence, Women Empowerment, Infrastructure, Clean Energy & Fintech.",
    },
    {
      icon: Award,
      value: "Junicorn",
      label: "Grassroots Drive",
      description: "Dedicated platform nurturing student and tribal youth enterprises solving local problems.",
    },
    {
      icon: Compass,
      value: "Dandakaranya",
      label: "Eco-Immersion",
      description: "Historic forest valley trek offering informal networking for founders and investors.",
    },
  ];

  return (
    <section className="bg-[#f7f4ec] py-12 border-b border-[#e6dfd1]">
      <Container size="wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="bg-[#ffffff] rounded-2xl p-6 border border-[#ede7db] shadow-xs hover:border-[#143e30]/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#f7f4ec] border border-[#dfd6c4] flex items-center justify-center text-[#143e30] mb-4">
                  <IconComponent className="w-5 h-5 text-[#c25e38]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-black text-[#103327]">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#8c671b] mt-1">
                  {stat.label}
                </div>
                <p className="mt-2 text-xs sm:text-sm text-[#4a5752] leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
