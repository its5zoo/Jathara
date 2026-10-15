import React from "react";
import Link from "next/link";
import { Compass, ArrowRight, Home, Sparkles, Calendar, MapPin, HelpCircle } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export default function NotFound() {
  const quickLinks = [
    { label: "Programme Schedule", href: "/programme", icon: Calendar, desc: "Explore the 3-day timetable" },
    { label: "The 8 Sector Tracks", href: "/startups", icon: Sparkles, desc: "Showcases & pitch arenas" },
    { label: "Venue & Campus", href: "/venue", icon: MapPin, desc: "GIET University Gunupur" },
    { label: "Frequently Asked Questions", href: "/faq", icon: HelpCircle, desc: "Travel, stay & registration" },
  ];

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-center py-16 sm:py-24 bg-[#fcfbf8]">
      <Container size="default" className="text-center">
        {/* 404 Status Pill */}
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="terracotta" size="md" className="font-mono tracking-widest text-xs px-3 py-1">
            404 • PAGE NOT FOUND
          </Badge>
        </div>

        {/* Central Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#f7f4ec] border border-[#dfd6c4] flex items-center justify-center text-[#143e30] mx-auto mb-6 shadow-sm">
          <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-[#c25e38] stroke-[1.5]" />
        </div>

        {/* Heading */}
        <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#103327] tracking-tight leading-tight max-w-2xl mx-auto">
          Summit Document or Page Not Found
        </h1>

        {/* Explanation */}
        <p className="mt-4 text-sm sm:text-base text-[#4a5752] max-w-xl mx-auto leading-relaxed">
          The page you requested does not exist or has been relocated within the ISF Startup Jathara 2026 portal. Please check the URL or use the navigation shortcuts below.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <Button href="/" variant="primary" size="md" className="font-bold shadow-sm">
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Homepage</span>
          </Button>

          <Button href="/register" variant="terracotta" size="md" className="font-bold shadow-sm">
            <span>Summit Registration Gateway</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Helpful Quick Navigation Cards */}
        <div className="mt-14 max-w-3xl mx-auto pt-10 border-t border-[#e6dfd1]">
          <p className="text-xs uppercase tracking-wider text-[#8c671b] font-bold mb-6 text-center">
            Suggested Summit Destinations
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
            {quickLinks.map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-[#e6dfd1] hover:border-[#143e30]/40 hover:shadow-xs transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#f7f4ec] border border-[#dfd6c4] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5 text-[#143e30]" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-serif font-bold text-sm text-[#103327] block group-hover:text-[#c25e38] transition-colors truncate">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-[#7e8d87] block truncate">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7e8d87] group-hover:text-[#103327] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
