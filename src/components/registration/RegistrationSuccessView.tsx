"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy, CheckCircle2, Calendar, MapPin, ArrowRight, Printer, RefreshCw } from "lucide-react";
import { RegistrationRecord } from "@/lib/types/registration";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";

interface RegistrationSuccessViewProps {
  registration: RegistrationRecord;
  onReset: () => void;
}

export function RegistrationSuccessView({ registration, onReset }: RegistrationSuccessViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(registration.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-[#ffffff] rounded-3xl border border-[#e6dfd1] p-6 sm:p-10 shadow-xl space-y-8 text-left">
        {/* Success Icon & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ede7db] pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Status: {registration.status}
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#103327] mt-1.5">
                Registration Confirmed
              </h2>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-[11px] text-[#7e8d87] block font-mono">
              Timestamp
            </span>
            <span className="text-xs font-semibold text-[#161e1b]">
              {new Date(registration.createdAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
        </div>

        {/* Mandatory Exact Confirmation Paragraph */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#f7f4ec] border border-[#dfd6c4] text-[#161e1b] text-sm sm:text-base leading-relaxed">
          <p className="font-medium text-[#103327]">
            Thank you for registering for ISF Startup Jathara 2026 — Startup Jathara @ Dandakaranya. Your registration has been received successfully. Our team will review your details and contact you regarding the next steps. Please save your registration reference for future communication.
          </p>
        </div>

        {/* Prominent Reference ID Box with Copy Action */}
        <div className="bg-gradient-to-br from-[#0d281e] to-[#103327] rounded-2xl p-6 sm:p-8 text-[#fcfbf8] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#be9740] font-bold block mb-1">
              Official Registration Reference
            </span>
            <div className="font-mono font-black text-2xl sm:text-3xl md:text-4xl text-[#fcfbf8] tracking-wider">
              {registration.referenceId}
            </div>
            <p className="text-xs text-[#c8d1cd] mt-1.5">
              Quote this reference ID for helpdesk inquiries, airport transit, and badge collection.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-[#fcfbf8] text-xs font-bold tracking-wide border border-white/20 transition-all shrink-0 w-full sm:w-auto"
            aria-label="Copy reference ID"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#be9740]" />
                <span>Copy Reference</span>
              </>
            )}
          </button>
        </div>

        {/* Registration Summary Card */}
        <div className="rounded-2xl border border-[#e6dfd1] p-5 sm:p-6 space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#103327] border-b border-[#ede7db] pb-3">
            Summary of Submitted Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-[#7e8d87] block font-medium">Participant Name:</span>
              <strong className="text-[#103327]">{registration.fullName}</strong>
            </div>

            <div>
              <span className="text-[#7e8d87] block font-medium">Registration Category:</span>
              <Badge variant="terracotta" size="sm" className="mt-0.5">
                {registration.categoryTitle}
              </Badge>
            </div>

            <div>
              <span className="text-[#7e8d87] block font-medium">Preferred Track:</span>
              <span className="inline-flex items-center mt-0.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200">
                {registration.preferredTrack || "Not provided"}
              </span>
            </div>

            <div>
              <span className="text-[#7e8d87] block font-medium">Organization / Affiliation:</span>
              <span className="text-[#161e1b] font-medium">{registration.organization}</span>
            </div>

            <div>
              <span className="text-[#7e8d87] block font-medium">Designation / Role:</span>
              <span className="text-[#161e1b] font-medium">{registration.designation}</span>
            </div>

            <div>
              <span className="text-[#7e8d87] block font-medium">Email Address:</span>
              <span className="text-[#161e1b] font-mono">{registration.email}</span>
            </div>

            <div>
              <span className="text-[#7e8d87] block font-medium">Contact Phone:</span>
              <span className="text-[#161e1b] font-mono">{registration.phone}</span>
            </div>

            {registration.teamName && (
              <div className="sm:col-span-2 p-3 rounded-xl bg-[#f7f4ec] border border-[#ede7db]">
                <span className="text-[#7e8d87] block text-xs">Team Registration:</span>
                <strong className="text-[#103327] text-sm">{registration.teamName}</strong>
                {registration.teamMembers && registration.teamMembers.length > 0 && (
                  <span className="text-xs text-[#4a5752] ml-2">
                    ({registration.teamMembers.length + 1} members total including leader)
                  </span>
                )}
              </div>
            )}

            {registration.projectName && (
              <div className="sm:col-span-2 p-3 rounded-xl bg-[#f7f4ec] border border-[#ede7db]">
                <span className="text-[#7e8d87] block text-xs">Innovation / Startup:</span>
                <strong className="text-[#103327] text-sm">{registration.projectName}</strong>
                {registration.developmentStage && (
                  <span className="text-xs text-[#8c671b] block mt-0.5">
                    Stage: {registration.developmentStage}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Travel & Attendance Summary */}
          <div className="pt-4 border-t border-[#ede7db] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-[#7e8d87] block font-medium">Arrival Mode:</span>
              <span className="text-[#161e1b]">
                {registration.travel.arrivalMode}{" "}
                {registration.travel.arrivalStationOrAirport
                  ? `(${registration.travel.arrivalStationOrAirport})`
                  : ""}
              </span>
            </div>

            <div>
              <span className="text-[#7e8d87] block font-medium">Pickup Request:</span>
              <span className="text-[#161e1b] font-semibold">
                {registration.travel.pickupRequired
                  ? "Yes (Recorded for Logistics Planning)"
                  : "No / Self Arranged"}
              </span>
            </div>

            <div className="sm:col-span-2">
              <span className="text-[#7e8d87] block font-medium mb-1">Attending Summit Dates:</span>
              <div className="flex flex-wrap gap-1.5">
                {registration.travel.attendanceDays.welcomeDinnerDec17 && (
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-medium">
                    17 Dec (Welcome Dinner)
                  </span>
                )}
                {registration.travel.attendanceDays.day1Dec18 && (
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-medium">
                    18 Dec (Day 1)
                  </span>
                )}
                {registration.travel.attendanceDays.day2Dec19 && (
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-medium">
                    19 Dec (Day 2)
                  </span>
                )}
                {registration.travel.attendanceDays.day3Dec20 && (
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-medium">
                    20 Dec (Day 3)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Summit Venue Quick Reminder */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#faf8f4] border border-[#ede7db] text-xs text-[#4a5752]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#be9740] flex-shrink-0" />
            <span>18–20 December 2026 (Welcome Dinner 17 Dec)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#b24e2b] flex-shrink-0" />
            <span>GIET University, Gunupur, Odisha</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#ede7db]">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#dfd6c4] bg-[#fcfbf8] hover:bg-[#ede7db] text-xs font-semibold text-[#161e1b] transition-colors w-full sm:w-auto"
          >
            <Printer className="w-4 h-4 text-[#4a5752]" />
            <span>Print Registration Slip</span>
          </button>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#dfd6c4] bg-[#fcfbf8] hover:bg-[#ede7db] text-xs font-semibold text-[#161e1b] transition-colors w-full sm:w-auto"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#4a5752]" />
              <span>Register Another Delegate</span>
            </button>

            <Link href="/programme" className="w-full sm:w-auto">
              <Button variant="primary" size="sm" className="gap-1.5 w-full justify-center">
                <span>Explore Programme</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
