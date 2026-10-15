"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
}

export function FAQAccordion({
  items,
  defaultOpenId,
  allowMultiple = false,
}: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="space-y-3.5" role="region" aria-label="Frequently Asked Questions">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `faq-trigger-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border transition-all duration-200 overflow-hidden",
              isOpen
                ? "bg-[#ffffff] border-[#143e30]/40 shadow-sm"
                : "bg-[#fcfbf8] border-[#e6dfd1] hover:border-[#dfd6c4]"
            )}
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full py-4.5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143e30] rounded-2xl"
            >
              <span className="font-serif font-bold text-base sm:text-lg text-[#103327] pr-2">
                {item.question}
              </span>

              <span
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200",
                  isOpen
                    ? "bg-[#143e30] text-[#fcfbf8] rotate-180"
                    : "bg-[#f7f4ec] text-[#4a5752]"
                )}
                aria-hidden="true"
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-[#4a5752] leading-relaxed border-t border-[#f7f4ec]"
              >
                <p>{item.answer}</p>
                <div className="mt-3 text-[11px] text-[#7e8d87] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c25e38]" />
                  <span>Category: {item.category}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
