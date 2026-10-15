"use client";

import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { REGISTRATION_CATEGORIES } from "@/data/eventData";
import { RegistrationCategorySlug } from "@/lib/types/registration";
import { RegistrationCategory } from "@/lib/types";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { cn } from "@/lib/utils";

interface CategoryCardSelectorProps {
  selectedCategorySlug: RegistrationCategorySlug | null;
  onSelectCategory: (category: RegistrationCategory) => void;
}

export function CategoryCardSelector({
  selectedCategorySlug,
  onSelectCategory,
}: CategoryCardSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {REGISTRATION_CATEGORIES.map((cat) => {
        const isSelected = selectedCategorySlug === cat.slug;

        return (
          <div
            key={cat.id}
            id={`category-${cat.slug}`}
            className={cn(
              "bg-[#ffffff] rounded-3xl p-6 sm:p-8 border transition-all flex flex-col justify-between shadow-xs relative group",
              isSelected
                ? "border-[#143e30] ring-2 ring-[#143e30]/30 shadow-md bg-[#fafdfb]"
                : "border-[#e6dfd1] hover:border-[#143e30]/40 hover:shadow-sm"
            )}
          >
            <div>
              {/* Badges strip */}
              <div className="flex items-center justify-between mb-4">
                {cat.recommendedBadge ? (
                  <Badge variant="terracotta" size="sm">
                    {cat.recommendedBadge}
                  </Badge>
                ) : (
                  <Badge variant="ivory" size="sm">
                    Open Track
                  </Badge>
                )}

                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Free Registration
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#103327] group-hover:text-[#1b5341] transition-colors">
                {cat.title}
              </h3>

              <div className="text-xs font-semibold text-[#8c671b] uppercase tracking-wider mt-1">
                {cat.targetAudience}
              </div>

              <p className="text-sm text-[#4a5752] mt-3.5 leading-relaxed">
                {cat.shortDescription}
              </p>

              <div className="mt-5 pt-4 border-t border-[#ede7db] space-y-2">
                <span className="text-xs font-bold text-[#161e1b] uppercase tracking-wider block">
                  Track Entitlements:
                </span>
                <ul className="space-y-1.5 text-xs text-[#333e3a]">
                  {cat.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#256f57] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#ede7db] space-y-3">
              <div className="p-2.5 rounded-xl bg-[#f7f4ec] text-[11px] text-[#4a5752]">
                <span className="font-semibold block text-[#103327]">Participation Status:</span>
                {cat.statusText}
              </div>

              <Button
                type="button"
                variant={isSelected ? "primary" : "outline"}
                size="sm"
                className="w-full justify-between font-semibold"
                onClick={() => onSelectCategory(cat)}
              >
                <span>{isSelected ? "Currently Selected" : "Register in this Track"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
