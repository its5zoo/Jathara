"use client";

import React, { useState, useMemo } from "react";
import { Search, HelpCircle, Mail } from "lucide-react";
import { FAQ_ITEMS } from "@/data/eventData";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { cn } from "@/lib/utils";

export function FAQPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "General",
    "Programme",
    "Startups & Junicorn",
    "Investors & Delegates",
    "Travel & Stay",
    "Registration",
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-[#0d281e] via-[#103327] to-[#081a14] text-[#fcfbf8] py-16 sm:py-24 border-b border-[#1b5341]/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#256f57]/20 rounded-full blur-3xl pointer-events-none" />
        <Container size="default" className="relative z-10 text-center">
          <Badge variant="gold" size="md" className="mb-4">
            Knowledge Repository
          </Badge>

          <h1 className="font-serif font-black text-3.5xl sm:text-5xl md:text-6xl text-[#fcfbf8] tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>

          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#c8d1cd] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about the Dandakaranya summit schedule, participation, transit hubs, and registration.
          </p>
        </Container>
      </section>

      {/* Main FAQ Area */}
      <section className="py-20 bg-[#fcfbf8]">
        <Container size="default">
          {/* Search & Filter Controls */}
          <div className="mb-10 space-y-4">
            <div className="relative max-w-xl mx-auto">
              <Search className="w-4 h-4 text-[#7e8d87] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search across all questions and answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#ffffff] border border-[#e6dfd1] rounded-2xl text-sm sm:text-base text-[#161e1b] focus:outline-none focus:ring-2 focus:ring-[#143e30] shadow-xs"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border",
                    selectedCategory === cat
                      ? "bg-[#143e30] text-[#fcfbf8] border-[#143e30]"
                      : "bg-[#ffffff] text-[#4a5752] border-[#e6dfd1] hover:bg-[#ede7db]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion Results */}
          <div className="max-w-3xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="bg-[#ffffff] rounded-2xl p-10 text-center border border-[#e6dfd1]">
                <HelpCircle className="w-10 h-10 text-[#7e8d87] mx-auto mb-3" />
                <h3 className="font-serif font-bold text-lg text-[#103327]">
                  No matching questions found
                </h3>
                <p className="text-xs sm:text-sm text-[#4a5752] mt-1 mb-4">
                  Please try a different search phrase or category filter.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                >
                  Reset FAQ Filter
                </Button>
              </div>
            ) : (
              <FAQAccordion items={filteredFaqs} allowMultiple />
            )}

            {/* Assistance Card */}
            <div className="mt-14 p-8 rounded-3xl bg-[#f7f4ec] border border-[#ede7db] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#103327]">
                  Still have questions?
                </h3>
                <p className="text-xs sm:text-sm text-[#4a5752] mt-1">
                  Contact the International Startup Foundation Secretariat directly.
                </p>
              </div>

              <Button href="/contact" variant="primary" size="md" className="flex-shrink-0">
                <Mail className="w-4 h-4 mr-2" />
                <span>Contact Desk</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
