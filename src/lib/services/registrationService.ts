import {
  RegistrationRecord,
  RegistrationFormData,
  RegistrationCategorySlug,
  PreferredTrack,
  PREFERRED_TRACKS,
  DashboardMetrics,
} from "../types/registration";
import { resolveTrack } from "@/lib/config/tracks";
import { SEED_REGISTRATIONS } from "./mockRegistrationData";

const STORAGE_KEY = "isf_2026_registrations_mock";

function getCategoryPrefix(slug: RegistrationCategorySlug): string {
  switch (slug) {
    case "startup-founder":
      return "FND";
    case "junicorn-youth":
      return "JUN";
    case "investor-fund":
      return "INV";
    case "corporate-delegate":
      return "COR";
    case "speaker-mentor":
      return "MNT";
    case "general-attendee":
      return "ECO";
    default:
      return "REG";
  }
}

const BASE32_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function generateReferenceId(slug: RegistrationCategorySlug): string {
  const prefix = getCategoryPrefix(slug);
  let suffix = "";

  if (typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(6);
    globalThis.crypto.getRandomValues(bytes);
    for (let i = 0; i < 6; i++) {
      suffix += BASE32_ALPHABET[bytes[i] % BASE32_ALPHABET.length];
    }
  } else {
    for (let i = 0; i < 6; i++) {
      suffix += BASE32_ALPHABET[Math.floor(Math.random() * BASE32_ALPHABET.length)];
    }
  }

  return `ISF-2026-${prefix}-${suffix}`;
}

function getCategoryTitle(slug: RegistrationCategorySlug): string {
  switch (slug) {
    case "startup-founder":
      return "Startup Founders & Innovators";
    case "junicorn-youth":
      return "Student Innovators & Tribal Youth (Junicorn)";
    case "investor-fund":
      return "Investors, VCs & Angel Networks";
    case "corporate-delegate":
      return "Corporate, GCC & Industry Delegates";
    case "speaker-mentor":
      return "Mentors, Academicians & Sector Experts";
    case "general-attendee":
      return "Ecosystem Observers & Cultural Guests";
    default:
      return "Participant";
  }
}

// In-memory fallback if localStorage is unavailable
let memoryStore: RegistrationRecord[] | null = null;

export const registrationService = {
  getAllRegistrations(): RegistrationRecord[] {
    if (typeof window === "undefined") {
      return [...SEED_REGISTRATIONS];
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REGISTRATIONS));
        memoryStore = [...SEED_REGISTRATIONS];
        return memoryStore;
      }
      const parsed: RegistrationRecord[] = JSON.parse(stored);
      // Sort newest first
      return parsed.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch {
      if (!memoryStore) {
        memoryStore = [...SEED_REGISTRATIONS];
      }
      return memoryStore;
    }
  },

  getRegistrationById(idOrRef: string): RegistrationRecord | undefined {
    const all = this.getAllRegistrations();
    return all.find((r) => r.id === idOrRef || r.referenceId === idOrRef);
  },

  createRegistration(formData: RegistrationFormData): RegistrationRecord {
    const all = this.getAllRegistrations();

    const newId = `reg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const referenceId = generateReferenceId(formData.categorySlug);
    const categoryTitle = getCategoryTitle(formData.categorySlug);

    const record: RegistrationRecord = {
      id: newId,
      referenceId,
      createdAt: new Date().toISOString(),
      status: "Registered", // strictly "Registered" per specifications

      categorySlug: formData.categorySlug,
      categoryTitle,

      // Preferred Track selection
      preferredTrack: (formData.preferredTrack as PreferredTrack) || undefined,

      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      country: formData.country.trim(),
      organization: formData.organization.trim(),
      designation: formData.designation.trim(),
      linkedInUrl: formData.linkedInUrl?.trim() || undefined,
      alternatePhone: formData.alternatePhone?.trim() || undefined,

      // Startup / Junicorn
      registrationType:
        formData.categorySlug === "startup-founder" || formData.categorySlug === "junicorn-youth"
          ? formData.registrationType
          : undefined,
      teamName: formData.teamName?.trim() || undefined,
      teamMembers:
        formData.registrationType === "team" && formData.teamMembers?.length
          ? formData.teamMembers.filter((m) => m.name.trim() && m.email.trim())
          : undefined,
      projectName: formData.projectName?.trim() || undefined,
      projectDescription: formData.projectDescription?.trim() || undefined,
      problemStatement: formData.problemStatement?.trim() || undefined,
      proposedSolution: formData.proposedSolution?.trim() || undefined,
      developmentStage: formData.developmentStage || undefined,
      projectWebsiteUrl: formData.projectWebsiteUrl?.trim() || undefined,
      institutionName: formData.institutionName?.trim() || undefined,
      pitchDeckUrl: formData.pitchDeckUrl?.trim() || undefined,

      // Investor
      fundName: formData.fundName?.trim() || undefined,
      investorAreasOfInterest: formData.investorAreasOfInterest?.trim() || undefined,
      investorParticipationExpectations: formData.investorParticipationExpectations?.trim() || undefined,

      // Corporate
      corporateAreasOfInterest: formData.corporateAreasOfInterest?.trim() || undefined,
      corporateReasonForAttending: formData.corporateReasonForAttending?.trim() || undefined,
      corporatePreferredRoundtables: formData.corporatePreferredRoundtables?.trim() || undefined,

      // Mentor
      mentorExpertise: formData.mentorExpertise?.trim() || undefined,
      mentorAreasOfInterest: formData.mentorAreasOfInterest?.trim() || undefined,
      mentorReasonForAttending: formData.mentorReasonForAttending?.trim() || undefined,
      mentorshipOrJuryInterest: formData.mentorshipOrJuryInterest || false,
      mentorPreferredRoundtables: formData.mentorPreferredRoundtables?.trim() || undefined,

      // Observer
      observerReasonForAttending: formData.observerReasonForAttending?.trim() || undefined,
      observerAreasOfInterest: formData.observerAreasOfInterest?.trim() || undefined,
      observerExpectations: formData.observerExpectations?.trim() || undefined,
      groupAttendees:
        formData.isGroupRegistration && formData.groupAttendees?.length
          ? formData.groupAttendees.filter((g) => g.name.trim() && g.email.trim())
          : undefined,

      // Travel & Attendance
      travel: {
        arrivalMode: formData.arrivalMode,
        departureMode: formData.departureMode,
        arrivalStationOrAirport: formData.arrivalStationOrAirport?.trim() || undefined,
        departureStationOrAirport: formData.departureStationOrAirport?.trim() || undefined,
        arrivalDateTime: formData.arrivalDateTime || undefined,
        departureDateTime: formData.departureDateTime || undefined,
        flightOrTrainNumber: formData.flightOrTrainNumber?.trim() || undefined,
        pickupRequired: Boolean(formData.pickupRequired),
        attendanceDays: {
          welcomeDinnerDec17: Boolean(formData.welcomeDinnerDec17),
          day1Dec18: Boolean(formData.day1Dec18),
          day2Dec19: Boolean(formData.day2Dec19),
          day3Dec20: Boolean(formData.day3Dec20),
        },
      },
    };

    const updated = [record, ...all];

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error("Local storage write error:", err);
      }
    }
    memoryStore = updated;
    return record;
  },

  deleteRegistration(id: string): boolean {
    const all = this.getAllRegistrations();
    const updated = all.filter((r) => r.id !== id && r.referenceId !== id);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error("Local storage error:", err);
      }
    }
    memoryStore = updated;
    return true;
  },

  updateAdminNotes(id: string, notes: string): RegistrationRecord | null {
    const all = this.getAllRegistrations();
    const index = all.findIndex((r) => r.id === id || r.referenceId === id);
    if (index === -1) return null;

    all[index] = {
      ...all[index],
      adminNotes: notes.trim(),
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      } catch (err) {
        console.error("Local storage error:", err);
      }
    }
    memoryStore = all;
    return all[index];
  },

  resetToSeedData(): RegistrationRecord[] {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REGISTRATIONS));
      } catch (err) {
        console.error("Local storage reset error:", err);
      }
    }
    memoryStore = [...SEED_REGISTRATIONS];
    return memoryStore;
  },

  calculateMetrics(records: RegistrationRecord[]): DashboardMetrics {
    const categoryBreakdown: Record<RegistrationCategorySlug, number> = {
      "startup-founder": 0,
      "junicorn-youth": 0,
      "investor-fund": 0,
      "corporate-delegate": 0,
      "speaker-mentor": 0,
      "general-attendee": 0,
    };

    const preferredTrackBreakdown = PREFERRED_TRACKS.reduce((acc, track) => {
      acc[track] = 0;
      return acc;
    }, {} as Record<PreferredTrack, number>);
    let unassignedTrackCount = 0;

    const arrivalModesBreakdown: Record<RegistrationRecord["travel"]["arrivalMode"], number> = {
      Flight: 0,
      Train: 0,
      Road: 0,
      Other: 0,
      "Not Decided": 0,
    };

    const attendanceDaysCount = {
      welcomeDinnerDec17: 0,
      day1Dec18: 0,
      day2Dec19: 0,
      day3Dec20: 0,
    };

    let individualCount = 0;
    let teamCount = 0;
    let totalTeamMembers = 0;
    let pickupRequestsCount = 0;

    for (const r of records) {
      if (categoryBreakdown[r.categorySlug] !== undefined) {
        categoryBreakdown[r.categorySlug]++;
      }

      if (r.preferredTrack) {
        const canonical = resolveTrack(r.preferredTrack);
        if (canonical && preferredTrackBreakdown[canonical.title] !== undefined) {
          preferredTrackBreakdown[canonical.title]++;
        } else {
          unassignedTrackCount++;
        }
      } else {
        unassignedTrackCount++;
      }

      if (r.registrationType === "team") {
        teamCount++;
        // Team leader counts as 1, plus additional team members
        totalTeamMembers += 1 + (r.teamMembers?.length || 0);
      } else {
        individualCount++;
        if (r.groupAttendees && r.groupAttendees.length > 0) {
          totalTeamMembers += r.groupAttendees.length;
        }
      }

      if (r.travel?.pickupRequired) {
        pickupRequestsCount++;
      }

      const mode = r.travel?.arrivalMode || "Not Decided";
      if (arrivalModesBreakdown[mode] !== undefined) {
        arrivalModesBreakdown[mode]++;
      }

      if (r.travel?.attendanceDays?.welcomeDinnerDec17) attendanceDaysCount.welcomeDinnerDec17++;
      if (r.travel?.attendanceDays?.day1Dec18) attendanceDaysCount.day1Dec18++;
      if (r.travel?.attendanceDays?.day2Dec19) attendanceDaysCount.day2Dec19++;
      if (r.travel?.attendanceDays?.day3Dec20) attendanceDaysCount.day3Dec20++;
    }

    const totalRegistrations = records.length;
    const pickupRequestsPercentage = totalRegistrations > 0
      ? Math.round((pickupRequestsCount / totalRegistrations) * 100)
      : 0;

    return {
      totalRegistrations,
      categoryBreakdown,
      preferredTrackBreakdown,
      unassignedTrackCount,
      individualCount,
      teamCount,
      totalTeamMembers,
      pickupRequestsCount,
      pickupRequestsPercentage,
      arrivalModesBreakdown,
      attendanceDaysCount,
    };
  },
};

// ==========================================
// CSV EXPORT UTILITIES
// ==========================================

function escapeCsv(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  // If contains quotes, commas, newlines, wrap in quotes and escape internal quotes
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

function triggerDownload(content: string, filename: string) {
  const blob = new Blob(["\uFEFF" + content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const csvExportService = {
  // 1. Comprehensive Registrations CSV
  exportRegistrations(records: RegistrationRecord[]) {
    const headers = [
      "Reference ID",
      "Registration Date",
      "Status",
      "Category",
      "Preferred Track",
      "Full Name",
      "Email",
      "Phone",
      "Organization",
      "Designation",
      "City",
      "State",
      "Country",
      "LinkedIn Profile",
      "Registration Type",
      "Team / Group Name",
      "Team Members Count",
      "Startup / Project Name",
      "Development Stage",
      "Pitch Deck URL",
      "Arrival Mode",
      "Departure Mode",
      "Arrival Station/Airport",
      "Pickup Required",
      "Dec 17 Welcome Dinner",
      "Dec 18 Day 1",
      "Dec 19 Day 2",
      "Dec 20 Day 3",
    ];

    const rows = records.map((r) => [
      escapeCsv(r.referenceId),
      escapeCsv(new Date(r.createdAt).toLocaleString("en-IN")),
      escapeCsv(r.status),
      escapeCsv(r.categoryTitle),
      escapeCsv(r.preferredTrack || "Not provided"),
      escapeCsv(r.fullName),
      escapeCsv(r.email),
      escapeCsv(r.phone),
      escapeCsv(r.organization),
      escapeCsv(r.designation),
      escapeCsv(r.city),
      escapeCsv(r.state),
      escapeCsv(r.country),
      escapeCsv(r.linkedInUrl || ""),
      escapeCsv(r.registrationType || "individual"),
      escapeCsv(r.teamName || ""),
      escapeCsv(r.teamMembers?.length || r.groupAttendees?.length || 0),
      escapeCsv(r.projectName || ""),
      escapeCsv(r.developmentStage || ""),
      escapeCsv(r.pitchDeckUrl || ""),
      escapeCsv(r.travel?.arrivalMode || "Not Decided"),
      escapeCsv(r.travel?.departureMode || "Not Decided"),
      escapeCsv(r.travel?.arrivalStationOrAirport || ""),
      escapeCsv(r.travel?.pickupRequired ? "Yes" : "No"),
      escapeCsv(r.travel?.attendanceDays?.welcomeDinnerDec17 ? "Attending" : "No"),
      escapeCsv(r.travel?.attendanceDays?.day1Dec18 ? "Attending" : "No"),
      escapeCsv(r.travel?.attendanceDays?.day2Dec19 ? "Attending" : "No"),
      escapeCsv(r.travel?.attendanceDays?.day3Dec20 ? "Attending" : "No"),
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
    triggerDownload(csvContent, "isf-2026-registrations.csv");
  },

  // 2. Travel and Pickup List
  exportTravelAndPickupList(records: RegistrationRecord[]) {
    const headers = [
      "Reference ID",
      "Delegate Name",
      "Category",
      "Phone",
      "Email",
      "Organization",
      "Pickup Required",
      "Arrival Mode",
      "Arrival Hub / Station",
      "Arrival Date & Time",
      "Flight / Train No",
      "Departure Mode",
      "Departure Hub / Station",
      "Departure Date & Time",
      "Dec 17 Welcome Dinner",
    ];

    const rows = records.map((r) => [
      escapeCsv(r.referenceId),
      escapeCsv(r.fullName),
      escapeCsv(r.categoryTitle),
      escapeCsv(r.phone),
      escapeCsv(r.email),
      escapeCsv(r.organization),
      escapeCsv(r.travel?.pickupRequired ? "YES (Pickup Requested)" : "No"),
      escapeCsv(r.travel?.arrivalMode || "Not Decided"),
      escapeCsv(r.travel?.arrivalStationOrAirport || "Not Specified"),
      escapeCsv(r.travel?.arrivalDateTime || "Not Specified"),
      escapeCsv(r.travel?.flightOrTrainNumber || ""),
      escapeCsv(r.travel?.departureMode || "Not Decided"),
      escapeCsv(r.travel?.departureStationOrAirport || "Not Specified"),
      escapeCsv(r.travel?.departureDateTime || "Not Specified"),
      escapeCsv(r.travel?.attendanceDays?.welcomeDinnerDec17 ? "Yes" : "No"),
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
    triggerDownload(csvContent, "isf-2026-travel-pickup-list.csv");
  },

  // 3. Team Member List
  exportTeamMemberList(records: RegistrationRecord[]) {
    const headers = [
      "Team / Project Reference",
      "Team Name",
      "Project Name",
      "Category",
      "Leader Name",
      "Leader Email",
      "Leader Phone",
      "Member Name",
      "Member Role",
      "Member Email",
    ];

    const rows: string[][] = [];

    records.forEach((r) => {
      if (r.registrationType === "team" && r.teamMembers && r.teamMembers.length > 0) {
        // First add leader row
        rows.push([
          escapeCsv(r.referenceId),
          escapeCsv(r.teamName || "Unnamed Team"),
          escapeCsv(r.projectName || ""),
          escapeCsv(r.categoryTitle),
          escapeCsv(r.fullName),
          escapeCsv(r.email),
          escapeCsv(r.phone),
          escapeCsv(`${r.fullName} (Leader)`),
          escapeCsv(r.designation || "Team Lead"),
          escapeCsv(r.email),
        ]);

        // Then add each team member
        r.teamMembers.forEach((member) => {
          rows.push([
            escapeCsv(r.referenceId),
            escapeCsv(r.teamName || "Unnamed Team"),
            escapeCsv(r.projectName || ""),
            escapeCsv(r.categoryTitle),
            escapeCsv(r.fullName),
            escapeCsv(r.email),
            escapeCsv(r.phone),
            escapeCsv(member.name),
            escapeCsv(member.role),
            escapeCsv(member.email),
          ]);
        });
      } else if (r.groupAttendees && r.groupAttendees.length > 0) {
        // Group registrations
        rows.push([
          escapeCsv(r.referenceId),
          escapeCsv(`Group: ${r.fullName}`),
          escapeCsv("Cultural / Ecosystem Observer Group"),
          escapeCsv(r.categoryTitle),
          escapeCsv(r.fullName),
          escapeCsv(r.email),
          escapeCsv(r.phone),
          escapeCsv(`${r.fullName} (Representative)`),
          escapeCsv(r.designation || "Representative"),
          escapeCsv(r.email),
        ]);

        r.groupAttendees.forEach((attendee) => {
          rows.push([
            escapeCsv(r.referenceId),
            escapeCsv(`Group: ${r.fullName}`),
            escapeCsv("Cultural / Ecosystem Observer Group"),
            escapeCsv(r.categoryTitle),
            escapeCsv(r.fullName),
            escapeCsv(r.email),
            escapeCsv(r.phone),
            escapeCsv(attendee.name),
            escapeCsv("Attendee"),
            escapeCsv(attendee.email),
          ]);
        });
      }
    });

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
    triggerDownload(csvContent, "isf-2026-team-members.csv");
  },

  // 4. Category-wise Summary
  exportCategorySummary(records: RegistrationRecord[]) {
    const metrics = registrationService.calculateMetrics(records);

    const headers = [
      "Category Code",
      "Category Title",
      "Total Registrations",
      "Share of Total (%)",
    ];

    const categoryRows = [
      [
        escapeCsv("startup-founder"),
        escapeCsv("Startup Founders & Innovators"),
        escapeCsv(metrics.categoryBreakdown["startup-founder"]),
        escapeCsv(
          metrics.totalRegistrations > 0
            ? `${Math.round((metrics.categoryBreakdown["startup-founder"] / metrics.totalRegistrations) * 100)}%`
            : "0%"
        ),
      ],
      [
        escapeCsv("junicorn-youth"),
        escapeCsv("Student Innovators & Tribal Youth (Junicorn)"),
        escapeCsv(metrics.categoryBreakdown["junicorn-youth"]),
        escapeCsv(
          metrics.totalRegistrations > 0
            ? `${Math.round((metrics.categoryBreakdown["junicorn-youth"] / metrics.totalRegistrations) * 100)}%`
            : "0%"
        ),
      ],
      [
        escapeCsv("investor-fund"),
        escapeCsv("Investors, VCs & Angel Networks"),
        escapeCsv(metrics.categoryBreakdown["investor-fund"]),
        escapeCsv(
          metrics.totalRegistrations > 0
            ? `${Math.round((metrics.categoryBreakdown["investor-fund"] / metrics.totalRegistrations) * 100)}%`
            : "0%"
        ),
      ],
      [
        escapeCsv("corporate-delegate"),
        escapeCsv("Corporate, GCC & Industry Delegates"),
        escapeCsv(metrics.categoryBreakdown["corporate-delegate"]),
        escapeCsv(
          metrics.totalRegistrations > 0
            ? `${Math.round((metrics.categoryBreakdown["corporate-delegate"] / metrics.totalRegistrations) * 100)}%`
            : "0%"
        ),
      ],
      [
        escapeCsv("speaker-mentor"),
        escapeCsv("Mentors, Academicians & Sector Experts"),
        escapeCsv(metrics.categoryBreakdown["speaker-mentor"]),
        escapeCsv(
          metrics.totalRegistrations > 0
            ? `${Math.round((metrics.categoryBreakdown["speaker-mentor"] / metrics.totalRegistrations) * 100)}%`
            : "0%"
        ),
      ],
      [
        escapeCsv("general-attendee"),
        escapeCsv("Ecosystem Observers & Cultural Guests"),
        escapeCsv(metrics.categoryBreakdown["general-attendee"]),
        escapeCsv(
          metrics.totalRegistrations > 0
            ? `${Math.round((metrics.categoryBreakdown["general-attendee"] / metrics.totalRegistrations) * 100)}%`
            : "0%"
        ),
      ],
      [
        escapeCsv("TOTAL"),
        escapeCsv("All Categories Combined"),
        escapeCsv(metrics.totalRegistrations),
        escapeCsv("100%"),
      ],
    ];

    const csvContent = [headers.join(","), ...categoryRows.map((row) => row.join(","))].join("\r\n");
    triggerDownload(csvContent, "isf-2026-category-summary.csv");
  },

  // 5. Preferred Track Summary CSV
  exportPreferredTrackSummary(records: RegistrationRecord[]) {
    const metrics = registrationService.calculateMetrics(records);

    const headers = [
      "Track Name",
      "Total Registrations",
      "Share of Total (%)",
    ];

    const trackRows = PREFERRED_TRACKS.map((track) => {
      const count = metrics.preferredTrackBreakdown[track] || 0;
      const pct = metrics.totalRegistrations > 0
        ? `${Math.round((count / metrics.totalRegistrations) * 100)}%`
        : "0%";
      return [escapeCsv(track), escapeCsv(count), escapeCsv(pct)];
    });

    if (metrics.unassignedTrackCount > 0) {
      const pct = metrics.totalRegistrations > 0
        ? `${Math.round((metrics.unassignedTrackCount / metrics.totalRegistrations) * 100)}%`
        : "0%";
      trackRows.push([escapeCsv("Not provided (Legacy Records)"), escapeCsv(metrics.unassignedTrackCount), escapeCsv(pct)]);
    }

    trackRows.push([
      escapeCsv("TOTAL"),
      escapeCsv(metrics.totalRegistrations),
      escapeCsv("100%"),
    ]);

    const csvContent = [headers.join(","), ...trackRows.map((row) => row.join(","))].join("\r\n");
    triggerDownload(csvContent, "isf-2026-preferred-tracks-summary.csv");
  },

  // 6. Accommodation Planning Template (for later administrative allocation)
  exportAccommodationTemplate(records: RegistrationRecord[]) {
    const headers = [
      "Reference ID",
      "Delegate Name",
      "Category",
      "Organization",
      "City & State",
      "Arrival Date",
      "Departure Date",
      "Days Attending (17-20 Dec)",
      "Assigned Campus Facility / Hotel (Admin Planning)",
      "Room Allocation (Admin Planning)",
      "Check-In Status (Admin Planning)",
      "Special Dietary / Mobility Notes",
    ];

    const rows = records.map((r) => {
      const days = [];
      if (r.travel?.attendanceDays?.welcomeDinnerDec17) days.push("Dec 17");
      if (r.travel?.attendanceDays?.day1Dec18) days.push("Dec 18");
      if (r.travel?.attendanceDays?.day2Dec19) days.push("Dec 19");
      if (r.travel?.attendanceDays?.day3Dec20) days.push("Dec 20");

      return [
        escapeCsv(r.referenceId),
        escapeCsv(r.fullName),
        escapeCsv(r.categoryTitle),
        escapeCsv(r.organization),
        escapeCsv(`${r.city}, ${r.state}`),
        escapeCsv(r.travel?.arrivalDateTime ? r.travel.arrivalDateTime.split("T")[0] : "TBD"),
        escapeCsv(r.travel?.departureDateTime ? r.travel.departureDateTime.split("T")[0] : "TBD"),
        escapeCsv(days.join(" | ") || "Not Specified"),
        escapeCsv(""), // Blank placeholder for admin allocation
        escapeCsv(""), // Blank placeholder for room
        escapeCsv("Pending Allocation"),
        escapeCsv(""),
      ];
    });

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
    triggerDownload(csvContent, "isf-2026-accommodation-planning-template.csv");
  },
};
