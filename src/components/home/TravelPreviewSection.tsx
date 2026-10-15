import React from "react";
import { MapPin, Plane, Train, ArrowRight } from "lucide-react";
import { TRAVEL_HUBS, EVENT_METADATA } from "@/data/eventData";
import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";

export function TravelPreviewSection() {
  const primaryHubs = TRAVEL_HUBS.slice(0, 3);

  return (
    <section className="py-20 bg-[#f7f4ec] border-b border-[#e6dfd1]">
      <Container size="wide">
        {/* Balanced Responsive Hero Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-block mb-3.5">
            <Badge variant="terracotta" size="md" className="font-medium tracking-wide">
              Gunupur, Odisha
            </Badge>
          </div>

          <h2 className="text-2.5xl sm:text-3.5xl md:text-4xl lg:text-[2.65rem] font-serif font-bold text-[#103327] tracking-tight leading-[1.2] max-w-4xl">
            Venue Location &amp; Transit Gateways
          </h2>

          <div className="mt-4 sm:mt-5 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            <p className="text-base sm:text-lg text-[#4a5752] leading-relaxed max-w-2xl font-normal">
              GIET University is situated in the scenic town of Gunupur, Rayagada district. Well-connected by key regional railway junctions and Visakhapatnam International Airport.
            </p>

            <div className="shrink-0 w-full sm:w-auto">
              <Button href="/venue" variant="primary" size="md" className="w-full sm:w-auto justify-center">
                <span>Complete Travel Guide</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Campus Overview Banner */}
        <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#e6dfd1] shadow-xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <MapPin className="w-5 h-5 text-[#c25e38] shrink-0" />
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#103327]">
                  {EVENT_METADATA.venueName}
                </h3>
                <Badge variant="forest" size="sm">
                  Host Campus
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-[#4a5752] max-w-2xl leading-relaxed">
                Premier state private university. Features modern multi-tier auditoriums, exhibition halls, innovation incubation laboratories, and executive guest facilities in Southern Odisha.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f7f4ec] border border-[#ede7db] flex-shrink-0 text-xs text-[#333e3a] space-y-1">
              <div><strong>District:</strong> Rayagada, Odisha</div>
              <div><strong>State Highway:</strong> NH-326 connectivity</div>
              <div><strong>Reception Desk:</strong> University Convention Center</div>
            </div>
          </div>
        </div>

        {/* Primary Hubs Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {primaryHubs.map((hub) => {
            const isAirport = hub.type === "airport";
            return (
              <div
                key={hub.id}
                className="bg-[#ffffff] rounded-2xl p-6 border border-[#e6dfd1] hover:border-[#143e30]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-[#f7f4ec] text-[#143e30] border border-[#dfd6c4]">
                      {isAirport ? (
                        <Plane className="w-4 h-4 text-[#c25e38]" />
                      ) : (
                        <Train className="w-4 h-4 text-[#143e30]" />
                      )}
                    </span>
                    <Badge variant="ivory" size="sm">
                      {hub.code}
                    </Badge>
                  </div>

                  <h4 className="font-serif font-bold text-lg text-[#103327]">
                    {hub.name}
                  </h4>

                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#8c671b]">
                    <span>{hub.distanceKm}</span>
                    <span>•</span>
                    <span>{hub.approxTravelTime}</span>
                  </div>

                  <p className="mt-3 text-xs text-[#4a5752] leading-relaxed">
                    {hub.connectivityDescription}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#ede7db] text-[11px] text-[#7e8d87]">
                  <strong>Target Transit:</strong> {hub.recommendedFor}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
