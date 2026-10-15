"use client";

import React, { useState } from "react";
import { 
  Clock, 
  MapPin, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight 
} from "lucide-react";
import { PROGRAMME_DAYS } from "@/data/eventData";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { cn } from "@/lib/utils";

export function ProgrammePreview() {
  const [selectedDayId, setSelectedDayId] = useState(PROGRAMME_DAYS[0].id);

  const activeDay = PROGRAMME_DAYS.find((d) => d.id === selectedDayId) || PROGRAMME_DAYS[0];

  return (
    <section className="py-20 bg-[#f7f4ec] border-b border-[#e6dfd1]">
      <Container size="wide">
        <SectionHeading
          eyebrow="Schedule Snapshot"
          title="Three Days of Immersive Engagement"
          subtitle="Explore the announced programme outline. Please note that session schedules are based on the draft brochure and remain tentative."
          action={
            <Button href="/programme" variant="primary" size="md">
              <span>View Full Schedule</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          }
        />

        {/* Tentative Status Banner */}
        <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 max-w-4xl mx-auto">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold">Tentative Programme Notice:</span> The sessions and timings below reflect the draft brochure. Official timings and confirmed speaker panels will be formalized in phased releases.
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {PROGRAMME_DAYS.map((day) => {
            const isSelected = day.id === selectedDayId;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setSelectedDayId(day.id)}
                className={cn(
                  "flex items-center gap-3 px-5 py-3 rounded-2xl border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143e30]",
                  isSelected
                    ? "bg-[#143e30] text-[#fcfbf8] border-[#143e30] shadow-md scale-102"
                    : "bg-[#ffffff] text-[#222b27] border-[#dfd6c4] hover:bg-[#ede7db]/50"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
                    isSelected ? "bg-[#d6b25e] text-[#081a14]" : "bg-[#f7f4ec] text-[#143e30]"
                  )}
                >
                  D{day.dayNumber}
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-80">
                    {day.dayName}
                  </div>
                  <div className="text-sm font-serif font-bold">
                    {day.dateFormatted}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Day Content */}
        <div className="bg-[#ffffff] border border-[#e6dfd1] rounded-3xl p-6 sm:p-10 shadow-sm max-w-5xl mx-auto">
          <div className="border-b border-[#ede7db] pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="terracotta" size="sm">
                  Day {activeDay.dayNumber} Focus
                </Badge>
                <Badge variant="draft" size="sm">
                  {activeDay.status}
                </Badge>
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#103327]">
                {activeDay.theme}
              </h3>
            </div>

            <div className="text-xs text-[#7e8d87] max-w-xs">
              {activeDay.statusNote}
            </div>
          </div>

          {/* Session List Snapshot */}
          <div className="space-y-4">
            {activeDay.sessions.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#fcfbf8] border border-[#ede7db] hover:border-[#143e30]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 flex-1">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-[#f7f4ec] border border-[#dfd6c4] text-[#143e30] shrink-0 text-center sm:min-w-[110px] w-full sm:w-auto">
                    <Clock className="w-3.5 h-3.5 mx-auto mb-1 text-[#c25e38]" />
                    <span className="text-xs font-semibold block leading-tight text-[#161e1b]">
                      {session.timeSlot}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-[#8c671b] uppercase tracking-wider">
                        {session.track}
                      </span>
                      {session.isTentative && (
                        <span className="text-[10px] bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded border border-amber-200">
                          Tentative
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#103327]">
                      {session.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4a5752] mt-1 line-clamp-2">
                      {session.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-[#ede7db]">
                  <span className="inline-flex items-center gap-1 text-xs text-[#7e8d87]">
                    <MapPin className="w-3 h-3 text-[#c25e38]" />
                    {session.location.split(",")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {activeDay.sessions.length > 5 && (
            <div className="mt-8 text-center pt-4 border-t border-[#ede7db]">
              <p className="text-xs text-[#7e8d87] mb-3">
                Showing 5 of {activeDay.sessions.length} scheduled sessions for {activeDay.dayName}.
              </p>
              <Button href="/programme" variant="secondary" size="sm" className="w-full sm:w-auto justify-center">
                <span>View All Day {activeDay.dayNumber} Sessions</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
