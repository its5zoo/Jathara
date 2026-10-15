"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Building2, 
  User, 
  Plane, 
  ShieldCheck, 
  ExternalLink,
  Users
} from "lucide-react";
import { 
  RegistrationCategorySlug, 
  RegistrationFormData, 
  RegistrationRecord, 
  TeamMember, 
  GroupAttendee,
  PreferredTrack 
} from "@/lib/types/registration";
import { resolveTrack } from "@/lib/config/tracks";
import { REGISTRATION_CATEGORIES, STARTUP_VERTICALS } from "@/data/eventData";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { cn } from "@/lib/utils";

interface RegistrationFormProps {
  categorySlug: RegistrationCategorySlug;
  initialTrack?: string;
  onCancel: () => void;
  onSuccess: (record: RegistrationRecord) => void;
}

const INITIAL_FORM_DATA: RegistrationFormData = {
  categorySlug: "startup-founder",
  preferredTrack: "",
  fullName: "",
  email: "",
  phone: "+91 ",
  city: "",
  state: "",
  country: "India",
  organization: "",
  designation: "",
  linkedInUrl: "",
  alternatePhone: "",

  // Startup / Student
  registrationType: "individual",
  teamName: "",
  teamMembers: [],
  projectName: "",
  projectDescription: "",
  problemStatement: "",
  proposedSolution: "",
  developmentStage: "Working Prototype",
  projectWebsiteUrl: "",
  institutionName: "",
  pitchDeckUrl: "",

  // Investor
  fundName: "",
  investorAreasOfInterest: "",
  investorParticipationExpectations: "",

  // Corporate
  corporateAreasOfInterest: "",
  corporateReasonForAttending: "",
  corporatePreferredRoundtables: "",

  // Mentor
  mentorExpertise: "",
  mentorAreasOfInterest: "",
  mentorReasonForAttending: "",
  mentorshipOrJuryInterest: false,
  mentorPreferredRoundtables: "",

  // Observer
  observerReasonForAttending: "",
  observerAreasOfInterest: "",
  observerExpectations: "",
  isGroupRegistration: false,
  groupAttendees: [],

  // Travel & Attendance
  arrivalMode: "Not Decided",
  departureMode: "Not Decided",
  arrivalStationOrAirport: "",
  departureStationOrAirport: "",
  arrivalDateTime: "",
  departureDateTime: "",
  flightOrTrainNumber: "",
  pickupRequired: false,
  welcomeDinnerDec17: true,
  day1Dec18: true,
  day2Dec19: true,
  day3Dec20: true,
};

export function RegistrationForm({
  categorySlug,
  initialTrack,
  onCancel,
  onSuccess,
}: RegistrationFormProps) {
  const categoryConfig = REGISTRATION_CATEGORIES.find((c) => c.slug === categorySlug);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<RegistrationFormData>(() => {
    const resolved = initialTrack ? resolveTrack(initialTrack)?.title : "";
    return {
      ...INITIAL_FORM_DATA,
      categorySlug,
      preferredTrack: (resolved as PreferredTrack) || "",
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Field change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear field-level error on change
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Team Member management (Max 5 total members including leader = up to 4 additional members)
  const addTeamMember = () => {
    if (formData.teamMembers.length >= 4) {
      setErrors((prev) => ({
        ...prev,
        teamMembers: "Maximum team size is 5 members (including the team leader).",
      }));
      return;
    }

    const newMember: TeamMember = {
      id: `tm-${Date.now()}-${Math.random()}`,
      name: "",
      email: "",
      role: "",
    };

    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, newMember],
    }));
  };

  const removeTeamMember = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m.id !== id),
    }));
  };

  const handleMemberChange = (id: string, field: keyof TeamMember, value: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    }));
  };

  // Group Attendee management (up to 4 additional attendees = 5 total including representative)
  const addGroupAttendee = () => {
    if (formData.groupAttendees.length >= 4) {
      setErrors((prev) => ({
        ...prev,
        groupAttendees: "Maximum group size is 5 attendees (including the representative).",
      }));
      return;
    }

    const newAttendee: GroupAttendee = {
      id: `grp-${Date.now()}-${Math.random()}`,
      name: "",
      email: "",
    };

    setFormData((prev) => ({
      ...prev,
      groupAttendees: [...prev.groupAttendees, newAttendee],
    }));
  };

  const removeGroupAttendee = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      groupAttendees: prev.groupAttendees.filter((g) => g.id !== id),
    }));
  };

  const handleGroupAttendeeChange = (id: string, field: keyof GroupAttendee, value: string) => {
    setFormData((prev) => ({
      ...prev,
      groupAttendees: prev.groupAttendees.map((g) =>
        g.id === id ? { ...g, [field]: value } : g
      ),
    }));
  };

  // Validation routines per step
  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) errs.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = "Mobile number with country code is required (e.g., +91 98765 43210).";
    }

    if (!formData.city.trim()) errs.city = "City is required.";
    if (!formData.state.trim()) errs.state = "State is required.";
    if (!formData.country.trim()) errs.country = "Country is required.";
    if (!formData.organization.trim()) errs.organization = "Organization or Institution name is required.";
    if (!formData.designation.trim()) errs.designation = "Designation or Role is required.";

    if (formData.linkedInUrl && !/^https?:\/\/.+/i.test(formData.linkedInUrl.trim())) {
      errs.linkedInUrl = "Profile URL must start with http:// or https://";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};

    // Validate Preferred Track across all categories
    if (!formData.preferredTrack) {
      errs.preferredTrack = "Preferred track selection is required. Please choose one of the eight official summit tracks.";
    }

    if (categorySlug === "startup-founder" || categorySlug === "junicorn-youth") {
      if (formData.registrationType === "team") {
        if (!formData.teamName.trim()) {
          errs.teamName = "Team name is required for team registrations.";
        }
        formData.teamMembers.forEach((member, idx) => {
          if (!member.name.trim()) {
            errs[`member_${idx}_name`] = `Member ${idx + 2} name is required.`;
          }
          if (!member.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email.trim())) {
            errs[`member_${idx}_email`] = `Valid email required for Member ${idx + 2}.`;
          }
          if (!member.role.trim()) {
            errs[`member_${idx}_role`] = `Role required for Member ${idx + 2}.`;
          }
        });
      }

      if (!formData.projectName.trim()) errs.projectName = "Project or startup name is required.";
      if (!formData.projectDescription.trim()) errs.projectDescription = "Project summary is required.";
      if (!formData.problemStatement.trim()) errs.problemStatement = "Problem statement is required.";
      if (!formData.proposedSolution.trim()) errs.proposedSolution = "Proposed innovation/solution is required.";
      if (!formData.developmentStage) errs.developmentStage = "Development stage selection is required.";
    } else if (categorySlug === "investor-fund") {
      if (!formData.investorAreasOfInterest.trim()) {
        errs.investorAreasOfInterest = "Please specify your target investment sectors or areas of interest.";
      }
      if (!formData.investorParticipationExpectations.trim()) {
        errs.investorParticipationExpectations = "Please specify your expectations from the summit.";
      }
    } else if (categorySlug === "corporate-delegate") {
      if (!formData.corporateAreasOfInterest.trim()) {
        errs.corporateAreasOfInterest = "Areas of interest or sector focus is required.";
      }
      if (!formData.corporateReasonForAttending.trim()) {
        errs.corporateReasonForAttending = "Reason for attending the summit is required.";
      }
    } else if (categorySlug === "speaker-mentor") {
      if (!formData.mentorExpertise.trim()) {
        errs.mentorExpertise = "Domain expertise description is required.";
      }
      if (!formData.mentorReasonForAttending.trim()) {
        errs.mentorReasonForAttending = "Reason for attending the summit is required.";
      }
    } else if (categorySlug === "general-attendee") {
      if (!formData.observerReasonForAttending.trim()) {
        errs.observerReasonForAttending = "Reason for attending is required.";
      }
      if (formData.isGroupRegistration) {
        formData.groupAttendees.forEach((att, idx) => {
          if (!att.name.trim()) errs[`group_${idx}_name`] = `Attendee ${idx + 2} name is required.`;
          if (!att.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(att.email.trim())) {
            errs[`group_${idx}_email`] = `Valid email required for Attendee ${idx + 2}.`;
          }
        });
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = (): boolean => {
    const errs: Record<string, string> = {};

    const hasAnyDay =
      formData.welcomeDinnerDec17 ||
      formData.day1Dec18 ||
      formData.day2Dec19 ||
      formData.day3Dec20;

    if (!hasAnyDay) {
      errs.attendanceDays = "Please select at least one summit day you plan to attend.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) setCurrentStep(4);
    }
    // Scroll back to top of form smoothly
    if (typeof window !== "undefined") {
      const formEl = document.getElementById("registration-form-container");
      if (formEl) formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      if (typeof window !== "undefined") {
        const formEl = document.getElementById("registration-form-container");
        if (formEl) formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      onCancel();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      setSubmitError("Please resolve all validation errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || `Registration failed (HTTP ${response.status})`);
      }

      onSuccess(result as RegistrationRecord);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "An error occurred during submission. Please check your network and try again.";
      setSubmitError(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="registration-form-container"
      className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6"
    >
      <div className="bg-[#ffffff] rounded-3xl border border-[#e6dfd1] p-6 sm:p-10 shadow-xl text-left space-y-8">
        {/* Form Header with Category Lockup */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ede7db] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="terracotta" size="sm">
                Track Application
              </Badge>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                100% Free
              </span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#103327]">
              {categoryConfig?.title || "Summit Registration"}
            </h2>
            <p className="text-xs sm:text-sm text-[#4a5752] mt-1">
              {categoryConfig?.targetAudience}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-[#7e8d87] hover:text-[#103327] font-semibold flex items-center gap-1 self-start sm:self-center px-3 py-1.5 rounded-lg border border-[#ede7db] hover:bg-[#f7f4ec] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Track</span>
          </button>
        </div>

        {/* Stepper Progress Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#7e8d87]">
            <span className={currentStep === 1 ? "text-[#103327]" : ""}>1. Identity</span>
            <span className={currentStep === 2 ? "text-[#103327]" : ""}>2. Track Profile</span>
            <span className={currentStep === 3 ? "text-[#103327]" : ""}>3. Travel & Days</span>
            <span className={currentStep === 4 ? "text-[#103327]" : ""}>4. Review & Submit</span>
          </div>

          <div className="w-full bg-[#ede7db] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#1b5341] h-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ========================================================
              STEP 1: COMMON IDENTITY INFORMATION
             ======================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-[#ede7db] pb-3">
                <h3 className="font-serif font-bold text-xl text-[#103327] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#be9740]" />
                  <span>Applicant Identity & Contact Coordinates</span>
                </h3>
                <p className="text-xs text-[#4a5752] mt-1">
                  Provide primary contact and institutional affiliation information.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Aarav Deshmukh"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="delegate@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Mobile Number (with country code) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Organization or Institution <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Company, University, or Foundation"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                  {errors.organization && (
                    <p className="text-xs text-rose-600 mt-1">{errors.organization}</p>
                  )}
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Designation or Role <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Founder, Student, Director, Partner"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                  {errors.designation && (
                    <p className="text-xs text-rose-600 mt-1">{errors.designation}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    City <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Gunupur / Bhubaneswar"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                  {errors.city && (
                    <p className="text-xs text-rose-600 mt-1">{errors.city}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    State <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g. Odisha"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                  {errors.state && (
                    <p className="text-xs text-rose-600 mt-1">{errors.state}</p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Country <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="India"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                  {errors.country && (
                    <p className="text-xs text-rose-600 mt-1">{errors.country}</p>
                  )}
                </div>

                {/* LinkedIn or Professional Profile (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    LinkedIn / Professional URL <span className="text-[#7e8d87] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    name="linkedInUrl"
                    value={formData.linkedInUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                  {errors.linkedInUrl && (
                    <p className="text-xs text-rose-600 mt-1">{errors.linkedInUrl}</p>
                  )}
                </div>

                {/* Alternate Contact Number (Optional) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Alternate Contact Number <span className="text-[#7e8d87] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleChange}
                    placeholder="Optional secondary contact"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              STEP 2: CATEGORY SPECIFIC DETAILS
             ======================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Category-specific banner */}
              <div className="border-b border-[#ede7db] pb-3">
                <h3 className="font-serif font-bold text-xl text-[#103327] flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#be9740]" />
                  <span>{categoryConfig?.title}: Track Details</span>
                </h3>
                <p className="text-xs text-[#4a5752] mt-1">
                  Complete specialized questions tailored to your participation track.
                </p>
              </div>

              {/* REQUIRED FIELD: PREFERRED TRACK SELECTION */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#ffffff] border border-[#e6dfd1] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ede7db] pb-3">
                  <div>
                    <label className="block font-serif font-bold text-lg text-[#103327]">
                      Preferred Track <span className="text-rose-600">*</span>
                    </label>
                    <p className="text-xs text-[#4a5752] mt-0.5">
                      Select your primary sector track of interest from the eight official summit tracks.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#be9740] bg-[#faf8f4] px-2.5 py-1 rounded-md border border-[#ede7db] self-start sm:self-center">
                    Required Selection
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
                  {STARTUP_VERTICALS.map((vertical) => {
                    const isSelected = formData.preferredTrack === vertical.title;
                    return (
                      <label
                        key={vertical.id}
                        className={cn(
                          "flex flex-col justify-between p-4 rounded-2xl border cursor-pointer transition-all relative text-left",
                          isSelected
                            ? "border-[#143e30] bg-[#fafdfb] ring-2 ring-[#143e30]/30 shadow-xs"
                            : "border-[#e6dfd1] bg-[#fcfbf8] hover:border-[#143e30]/40 hover:bg-white"
                        )}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c671b]">
                              Summit Track
                            </span>
                            <input
                              type="radio"
                              name="preferredTrack"
                              value={vertical.title}
                              checked={isSelected}
                              onChange={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  preferredTrack: vertical.title as PreferredTrack,
                                }));
                                if (errors.preferredTrack) {
                                  setErrors((prev) => {
                                    const copy = { ...prev };
                                    delete copy.preferredTrack;
                                    return copy;
                                  });
                                }
                              }}
                              className="text-[#143e30] focus:ring-[#143e30] w-4 h-4 cursor-pointer"
                            />
                          </div>

                          <h4 className="font-serif font-bold text-sm sm:text-base text-[#103327] leading-snug">
                            {vertical.title}
                          </h4>

                          <p className="text-[11px] font-semibold text-[#5a6a64] mt-0.5 line-clamp-1">
                            {vertical.subtitle}
                          </p>

                          <p className="text-xs text-[#4a5752] mt-2 leading-relaxed">
                            {vertical.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-[#ede7db] text-[10px] text-[#7e8d87] flex items-center justify-between">
                          <span className={isSelected ? "text-[#103327] font-bold" : ""}>
                            {isSelected ? "✓ Track Selected" : "Click to select"}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {errors.preferredTrack && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.preferredTrack}</span>
                  </p>
                )}

                <div className="p-3 rounded-xl bg-[#faf8f4] border border-[#ede7db] text-[11px] text-[#7e8d87] leading-relaxed">
                  <strong>Notice:</strong> Selecting a preferred track indicates interest for session scheduling, roundtable allocations, and pitch stages. Track preference does not imply confirmed allocation or acceptance into specialized tracks.
                </div>
              </div>

              {/* TRACK 1 & 2: STARTUP FOUNDERS & JUNICORN YOUTH */}
              {(categorySlug === "startup-founder" || categorySlug === "junicorn-youth") && (
                <div className="space-y-6">
                  {/* Registration Type: Individual vs Team */}
                  <div className="p-4 rounded-2xl bg-[#f7f4ec] border border-[#ede7db] space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#103327]">
                      Registration Mode
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 text-xs sm:text-sm text-[#161e1b] cursor-pointer">
                        <input
                          type="radio"
                          name="registrationType"
                          value="individual"
                          checked={formData.registrationType === "individual"}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              registrationType: "individual",
                            }))
                          }
                          className="text-[#143e30] focus:ring-[#143e30]"
                        />
                        <span className="font-semibold">Individual Founder / Innovator</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs sm:text-sm text-[#161e1b] cursor-pointer">
                        <input
                          type="radio"
                          name="registrationType"
                          value="team"
                          checked={formData.registrationType === "team"}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              registrationType: "team",
                            }))
                          }
                          className="text-[#143e30] focus:ring-[#143e30]"
                        />
                        <span className="font-semibold">Team Registration (Up to 5 members total)</span>
                      </label>
                    </div>
                  </div>

                  {/* Team details section if Team selected */}
                  {formData.registrationType === "team" && (
                    <div className="p-5 rounded-2xl border border-[#e6dfd1] bg-[#ffffff] space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#103327] flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#be9740]" />
                            <span>Team Composition</span>
                          </h4>
                          <p className="text-xs text-[#7e8d87]">
                            Team Leader: <strong>{formData.fullName || "Primary Applicant"}</strong> (Member 1). Max 4 additional members.
                          </p>
                        </div>

                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#ede7db] text-[#161e1b]">
                          {formData.teamMembers.length + 1} / 5 Members
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#161e1b] mb-1">
                          Team Name <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="teamName"
                          value={formData.teamName}
                          onChange={handleChange}
                          placeholder="e.g. Team VanaTrace / MilletMakers"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                        />
                        {errors.teamName && (
                          <p className="text-xs text-rose-600 mt-1">{errors.teamName}</p>
                        )}
                      </div>

                      {/* Dynamic additional team members */}
                      <div className="space-y-3 pt-2">
                        {formData.teamMembers.map((member, idx) => (
                          <div
                            key={member.id}
                            className="p-4 rounded-xl border border-[#ede7db] bg-[#faf8f4] space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#103327]">
                                Member #{idx + 2}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeTeamMember(member.id)}
                                className="text-rose-600 hover:text-rose-800 text-xs flex items-center gap-1 font-semibold"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <input
                                  type="text"
                                  placeholder="Full Name *"
                                  value={member.name}
                                  onChange={(e) =>
                                    handleMemberChange(member.id, "name", e.target.value)
                                  }
                                  className="w-full px-3 py-2 rounded-lg border border-[#e6dfd1] text-xs text-[#161e1b] bg-white"
                                />
                                {errors[`member_${idx}_name`] && (
                                  <p className="text-[11px] text-rose-600 mt-0.5">
                                    {errors[`member_${idx}_name`]}
                                  </p>
                                )}
                              </div>

                              <div>
                                <input
                                  type="email"
                                  placeholder="Email Address *"
                                  value={member.email}
                                  onChange={(e) =>
                                    handleMemberChange(member.id, "email", e.target.value)
                                  }
                                  className="w-full px-3 py-2 rounded-lg border border-[#e6dfd1] text-xs text-[#161e1b] bg-white"
                                />
                                {errors[`member_${idx}_email`] && (
                                  <p className="text-[11px] text-rose-600 mt-0.5">
                                    {errors[`member_${idx}_email`]}
                                  </p>
                                )}
                              </div>

                              <div>
                                <input
                                  type="text"
                                  placeholder="Role / Expertise *"
                                  value={member.role}
                                  onChange={(e) =>
                                    handleMemberChange(member.id, "role", e.target.value)
                                  }
                                  className="w-full px-3 py-2 rounded-lg border border-[#e6dfd1] text-xs text-[#161e1b] bg-white"
                                />
                                {errors[`member_${idx}_role`] && (
                                  <p className="text-[11px] text-rose-600 mt-0.5">
                                    {errors[`member_${idx}_role`]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {formData.teamMembers.length < 4 && (
                          <button
                            type="button"
                            onClick={addTeamMember}
                            className="w-full py-2.5 rounded-xl border-2 border-dashed border-[#dfd6c4] hover:border-[#143e30] text-xs font-semibold text-[#143e30] flex items-center justify-center gap-1.5 transition-colors bg-[#fdfcfa]"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Team Member ({4 - formData.teamMembers.length} slots remaining)</span>
                          </button>
                        )}

                        {errors.teamMembers && (
                          <p className="text-xs text-rose-600">{errors.teamMembers}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Project / Startup details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#161e1b] mb-1">
                        Startup / Project Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        placeholder="e.g. VanaTrace Technologies"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                      />
                      {errors.projectName && (
                        <p className="text-xs text-rose-600 mt-1">{errors.projectName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#161e1b] mb-1">
                        Brief Project Description <span className="text-rose-600">*</span>
                      </label>
                      <textarea
                        rows={2}
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleChange}
                        placeholder="Concise overview of your innovation, technology, or business model..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                      />
                      {errors.projectDescription && (
                        <p className="text-xs text-rose-600 mt-1">{errors.projectDescription}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#161e1b] mb-1">
                          Problem Being Solved <span className="text-rose-600">*</span>
                        </label>
                        <textarea
                          rows={2}
                          name="problemStatement"
                          value={formData.problemStatement}
                          onChange={handleChange}
                          placeholder="What specific rural or grassroots bottleneck are you tackling?"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                        />
                        {errors.problemStatement && (
                          <p className="text-xs text-rose-600 mt-1">{errors.problemStatement}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#161e1b] mb-1">
                          Proposed Solution / Innovation <span className="text-rose-600">*</span>
                        </label>
                        <textarea
                          rows={2}
                          name="proposedSolution"
                          value={formData.proposedSolution}
                          onChange={handleChange}
                          placeholder="How does your technology or solution solve this problem?"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                        />
                        {errors.proposedSolution && (
                          <p className="text-xs text-rose-600 mt-1">{errors.proposedSolution}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#161e1b] mb-1">
                          Current Development Stage <span className="text-rose-600">*</span>
                        </label>
                        <select
                          name="developmentStage"
                          value={formData.developmentStage}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] bg-white focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                        >
                          <option value="Conceptual Idea">Conceptual Idea</option>
                          <option value="Lab Prototype">Lab Prototype</option>
                          <option value="Working Prototype / Pilot Stage">Working Prototype / Pilot Stage</option>
                          <option value="Early Traction / Paying Customers">Early Traction / Paying Customers</option>
                          <option value="Commercial Scaling">Commercial Scaling</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#161e1b] mb-1">
                          Website or Demo URL <span className="text-[#7e8d87] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="url"
                          name="projectWebsiteUrl"
                          value={formData.projectWebsiteUrl}
                          onChange={handleChange}
                          placeholder="https://myproject.org"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#161e1b] mb-1">
                          College / School / Incubator Details <span className="text-[#7e8d87] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          name="institutionName"
                          value={formData.institutionName}
                          onChange={handleChange}
                          placeholder="e.g. GIET University Gunupur"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#161e1b] mb-1">
                          Pitch Deck Drive Link / URL <span className="text-[#7e8d87] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="url"
                          name="pitchDeckUrl"
                          value={formData.pitchDeckUrl}
                          onChange={handleChange}
                          placeholder="https://drive.google.com/..."
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TRACK 3: INVESTORS & VCS */}
              {categorySlug === "investor-fund" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#161e1b] mb-1">
                      Fund, Syndicate, or Investment Entity Name
                    </label>
                    <input
                      type="text"
                      name="fundName"
                      value={formData.fundName}
                      onChange={handleChange}
                      placeholder="e.g. Bharat Seed Fund / Angel Network"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#161e1b] mb-1">
                      Primary Areas of Investment Interest <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={2}
                      name="investorAreasOfInterest"
                      value={formData.investorAreasOfInterest}
                      onChange={handleChange}
                      placeholder="e.g. Agritech, Rural FinTech, Forest Bioeconomy, Clean Energy, Healthcare"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                    />
                    {errors.investorAreasOfInterest && (
                      <p className="text-xs text-rose-600 mt-1">{errors.investorAreasOfInterest}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#161e1b] mb-1">
                      Summit Participation Expectations <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={2}
                      name="investorParticipationExpectations"
                      value={formData.investorParticipationExpectations}
                      onChange={handleChange}
                      placeholder="e.g. Deal discovery, roundtable networking with policy leaders, mentor pairing"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                    />
                    {errors.investorParticipationExpectations && (
                      <p className="text-xs text-rose-600 mt-1">{errors.investorParticipationExpectations}</p>
                    )}
                  </div>
                </div>
              )}

              {/* TRACK 4: CORPORATE & GCC DELEGATES */}
              {categorySlug === "corporate-delegate" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#161e1b] mb-1">
                      Industry / Sector Focus & Areas of Interest <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={2}
                      name="corporateAreasOfInterest"
                      value={formData.corporateAreasOfInterest}
                      onChange={handleChange}
                      placeholder="e.g. Healthcare Delivery, Tele-Diagnostics, Agri-Supply Chains, GCC Open Innovation"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                    />
                    {errors.corporateAreasOfInterest && (
                      <p className="text-xs text-rose-600 mt-1">{errors.corporateAreasOfInterest}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#161e1b] mb-1">
                      Reason for Attending <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={2}
                      name="corporateReasonForAttending"
                      value={formData.corporateReasonForAttending}
                      onChange={handleChange}
                      placeholder="What is your organization seeking to achieve or explore at the summit?"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                    />
                    {errors.corporateReasonForAttending && (
                      <p className="text-xs text-rose-600 mt-1">{errors.corporateReasonForAttending}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#161e1b] mb-1">
                      Preferred Roundtables or Tracks <span className="text-[#7e8d87] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="corporatePreferredRoundtables"
                      value={formData.corporatePreferredRoundtables}
                      onChange={handleChange}
                      placeholder="e.g. Global Investors & GCC Connect, Agri-Bioeconomy Roundtable"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TRACK 5: MENTORS, ACADEMICIANS & SECTOR EXPERTS */}
              {categorySlug === "speaker-mentor" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#161e1b] mb-1">
                      Domain Expertise & Specialization <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={2}
                      name="mentorExpertise"
                      value={formData.mentorExpertise}
                      onChange={handleChange}
                      placeholder="e.g. Bio-Energy Systems, Grassroots IP & Patents, Agronomy, Tribal Micro-Enterprises"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                    />
                    {errors.mentorExpertise && (
                      <p className="text-xs text-rose-600 mt-1">{errors.mentorExpertise}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#161e1b] mb-1">
                      Reason for Attending / Contribution <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={2}
                      name="mentorReasonForAttending"
                      value={formData.mentorReasonForAttending}
                      onChange={handleChange}
                      placeholder="How would you like to contribute to the grassroots innovator cohort?"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                    />
                    {errors.mentorReasonForAttending && (
                      <p className="text-xs text-rose-600 mt-1">{errors.mentorReasonForAttending}</p>
                    )}
                  </div>

                  {/* Mentorship or jury interest checkbox with explicit disclaimer */}
                  <div className="p-4 rounded-2xl bg-[#f7f4ec] border border-[#ede7db] space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="mentorshipOrJuryInterest"
                        checked={formData.mentorshipOrJuryInterest}
                        onChange={handleChange}
                        className="mt-0.5 text-[#143e30] focus:ring-[#143e30] rounded"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#103327] block">
                          Interest in evaluating pitches as a Jury Member or Mentor Clinic Specialist
                        </span>
                        <span className="text-[11px] text-[#7e8d87] block mt-1 leading-relaxed">
                          <strong>Notice:</strong> Indicating interest does not imply a confirmed appointment. The ISF Steering Committee will review profiles and confirm jury allocations according to track schedules.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* TRACK 6: ECOSYSTEM OBSERVERS & CULTURAL GUESTS */}
              {categorySlug === "general-attendee" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#161e1b] mb-1">
                      Reason for Attending <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={2}
                      name="observerReasonForAttending"
                      value={formData.observerReasonForAttending}
                      onChange={handleChange}
                      placeholder="e.g. Attending keynote sessions, exploring grassroots exhibition, cultural immersion"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                    />
                    {errors.observerReasonForAttending && (
                      <p className="text-xs text-rose-600 mt-1">{errors.observerReasonForAttending}</p>
                    )}
                  </div>

                  {/* Group Registration Mode */}
                  <div className="p-4 rounded-2xl bg-[#f7f4ec] border border-[#ede7db] space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isGroupRegistration"
                        checked={formData.isGroupRegistration}
                        onChange={handleChange}
                        className="text-[#143e30] focus:ring-[#143e30] rounded"
                      />
                      <span className="text-xs sm:text-sm font-bold text-[#103327]">
                        Register as a Group Delegation (Up to 5 attendees including representative)
                      </span>
                    </label>

                    {formData.isGroupRegistration && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between text-xs text-[#7e8d87]">
                          <span>Representative: <strong>{formData.fullName || "Primary Applicant"}</strong></span>
                          <span>{formData.groupAttendees.length + 1} / 5 Attendees</span>
                        </div>

                        {formData.groupAttendees.map((att, idx) => (
                          <div
                            key={att.id}
                            className="p-3.5 rounded-xl border border-[#ede7db] bg-white grid grid-cols-1 sm:grid-cols-2 gap-3 relative"
                          >
                            <input
                              type="text"
                              placeholder={`Attendee ${idx + 2} Full Name *`}
                              value={att.name}
                              onChange={(e) =>
                                handleGroupAttendeeChange(att.id, "name", e.target.value)
                              }
                              className="px-3 py-2 rounded-lg border border-[#e6dfd1] text-xs text-[#161e1b]"
                            />
                            <div className="flex gap-2">
                              <input
                                type="email"
                                placeholder={`Attendee ${idx + 2} Email *`}
                                value={att.email}
                                onChange={(e) =>
                                  handleGroupAttendeeChange(att.id, "email", e.target.value)
                                }
                                className="flex-1 px-3 py-2 rounded-lg border border-[#e6dfd1] text-xs text-[#161e1b]"
                              />
                              <button
                                type="button"
                                onClick={() => removeGroupAttendee(att.id)}
                                className="text-rose-600 hover:text-rose-800 p-2"
                                title="Remove attendee"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {formData.groupAttendees.length < 4 && (
                          <button
                            type="button"
                            onClick={addGroupAttendee}
                            className="w-full py-2 rounded-xl border-2 border-dashed border-[#dfd6c4] hover:border-[#143e30] text-xs font-semibold text-[#143e30] flex items-center justify-center gap-1.5 transition-colors bg-[#fdfcfa]"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Group Attendee ({4 - formData.groupAttendees.length} remaining)</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              STEP 3: TRAVEL AND ATTENDANCE
             ======================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-[#ede7db] pb-3">
                <h3 className="font-serif font-bold text-xl text-[#103327] flex items-center gap-2">
                  <Plane className="w-5 h-5 text-[#be9740]" />
                  <span>Travel Logistics & Summit Attendance</span>
                </h3>
                <p className="text-xs text-[#4a5752] mt-1">
                  Share tentative transit plans and select the summit days you plan to participate in.
                </p>
              </div>

              {/* Informative Guidance Banner */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <strong>Logistical Note:</strong>
                <p>
                  Travel details may remain &quot;Not Decided&quot; if you have not booked tickets yet. Free summit passes apply to all registered attendees. Campus and hotel accommodations are managed separately by the organizing desk and are not allocated in this form.
                </p>
              </div>

              {/* Attendance Selection */}
              <div className="p-5 rounded-2xl border border-[#e6dfd1] bg-[#faf8f4] space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#103327]">
                  Select Summit Days You Will Attend <span className="text-rose-600">*</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#ede7db] bg-white cursor-pointer hover:border-[#143e30]/40">
                    <input
                      type="checkbox"
                      name="welcomeDinnerDec17"
                      checked={formData.welcomeDinnerDec17}
                      onChange={handleChange}
                      className="text-[#143e30] focus:ring-[#143e30] rounded"
                    />
                    <div>
                      <span className="font-bold text-[#103327] block">17 Dec 2026: Welcome Dinner</span>
                      <span className="text-[11px] text-[#7e8d87]">Evening reception for arriving delegates</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#ede7db] bg-white cursor-pointer hover:border-[#143e30]/40">
                    <input
                      type="checkbox"
                      name="day1Dec18"
                      checked={formData.day1Dec18}
                      onChange={handleChange}
                      className="text-[#143e30] focus:ring-[#143e30] rounded"
                    />
                    <div>
                      <span className="font-bold text-[#103327] block">18 Dec 2026: Summit Day 1</span>
                      <span className="text-[11px] text-[#7e8d87]">Inaugural assembly, keynote, healthcare & agri tracks</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#ede7db] bg-white cursor-pointer hover:border-[#143e30]/40">
                    <input
                      type="checkbox"
                      name="day2Dec19"
                      checked={formData.day2Dec19}
                      onChange={handleChange}
                      className="text-[#143e30] focus:ring-[#143e30] rounded"
                    />
                    <div>
                      <span className="font-bold text-[#103327] block">19 Dec 2026: Summit Day 2</span>
                      <span className="text-[11px] text-[#7e8d87]">Investor roundtables, founder pitches & cultural gala</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#ede7db] bg-white cursor-pointer hover:border-[#143e30]/40">
                    <input
                      type="checkbox"
                      name="day3Dec20"
                      checked={formData.day3Dec20}
                      onChange={handleChange}
                      className="text-[#143e30] focus:ring-[#143e30] rounded"
                    />
                    <div>
                      <span className="font-bold text-[#103327] block">20 Dec 2026: Summit Day 3</span>
                      <span className="text-[11px] text-[#7e8d87]">Junicorn finale, Dandakaranya eco-trek & valedictory</span>
                    </div>
                  </label>
                </div>
                {errors.attendanceDays && (
                  <p className="text-xs text-rose-600 mt-1">{errors.attendanceDays}</p>
                )}
              </div>

              {/* Transit Modes & Stations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Arrival Mode
                  </label>
                  <select
                    name="arrivalMode"
                    value={formData.arrivalMode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] bg-white focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  >
                    <option value="Not Decided">Not Decided</option>
                    <option value="Flight">Flight</option>
                    <option value="Train">Train</option>
                    <option value="Road">Road / Self-Driven</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Departure Mode
                  </label>
                  <select
                    name="departureMode"
                    value={formData.departureMode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] bg-white focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  >
                    <option value="Not Decided">Not Decided</option>
                    <option value="Flight">Flight</option>
                    <option value="Train">Train</option>
                    <option value="Road">Road / Self-Driven</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Arrival Airport or Railway Station <span className="text-[#7e8d87] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="arrivalStationOrAirport"
                    value={formData.arrivalStationOrAirport}
                    onChange={handleChange}
                    placeholder="e.g. Visakhapatnam (VTZ) or Rayagada (RGDA)"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Departure Airport or Railway Station <span className="text-[#7e8d87] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="departureStationOrAirport"
                    value={formData.departureStationOrAirport}
                    onChange={handleChange}
                    placeholder="e.g. Visakhapatnam (VTZ) or Rayagada (RGDA)"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Tentative Arrival Date & Time <span className="text-[#7e8d87] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="arrivalDateTime"
                    value={formData.arrivalDateTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Tentative Departure Date & Time <span className="text-[#7e8d87] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="departureDateTime"
                    value={formData.departureDateTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#161e1b] mb-1">
                    Flight or Train Number <span className="text-[#7e8d87] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="flightOrTrainNumber"
                    value={formData.flightOrTrainNumber}
                    onChange={handleChange}
                    placeholder="e.g. 6E-512 or Train 20836"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                  />
                </div>
              </div>

              {/* Pickup Request Option & Disclaimer */}
              <div className="p-4 rounded-2xl bg-[#f7f4ec] border border-[#ede7db] space-y-2">
                <label className="block text-xs font-bold text-[#103327]">
                  Airport / Railway Station Shuttle Pickup Request
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="pickupRequired"
                      checked={formData.pickupRequired === true}
                      onChange={() => setFormData((p) => ({ ...p, pickupRequired: true }))}
                      className="text-[#143e30] focus:ring-[#143e30]"
                    />
                    <span>Yes, I request shuttle pickup from the transit hub</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="pickupRequired"
                      checked={formData.pickupRequired === false}
                      onChange={() => setFormData((p) => ({ ...p, pickupRequired: false }))}
                      className="text-[#143e30] focus:ring-[#143e30]"
                    />
                    <span>No / Self-Arranged Travel</span>
                  </label>
                </div>
                <p className="text-[11px] text-[#7e8d87] leading-relaxed pt-1">
                  <strong>Notice:</strong> Indicating a pickup request does not constitute a guaranteed transport reservation. The organizing committee will review scheduled arrivals and coordinate shared university shuttles from Rayagada and Visakhapatnam based on batch logistics.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              STEP 4: REVIEW & SUBMIT
             ======================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-[#ede7db] pb-3">
                <h3 className="font-serif font-bold text-xl text-[#103327] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#be9740]" />
                  <span>Review Your Registration Details</span>
                </h3>
                <p className="text-xs text-[#4a5752] mt-1">
                  Verify your information before final submission. All entries are preserved.
                </p>
              </div>

              {/* Identity summary card */}
              <div className="p-5 rounded-2xl border border-[#ede7db] bg-[#faf8f4] space-y-3">
                <div className="flex items-center justify-between border-b border-[#ede7db] pb-2">
                  <h4 className="font-serif font-bold text-sm text-[#103327]">
                    1. Primary Delegate Information
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-[#b24e2b] hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-[#7e8d87] block">Full Name:</span>
                    <strong className="text-[#161e1b]">{formData.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-[#7e8d87] block">Email:</span>
                    <span className="text-[#161e1b] font-mono">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-[#7e8d87] block">Phone:</span>
                    <span className="text-[#161e1b] font-mono">{formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-[#7e8d87] block">Designation & Org:</span>
                    <span className="text-[#161e1b]">{formData.designation}, {formData.organization}</span>
                  </div>
                  <div>
                    <span className="text-[#7e8d87] block">Location:</span>
                    <span className="text-[#161e1b]">{formData.city}, {formData.state}, {formData.country}</span>
                  </div>
                  {formData.linkedInUrl && (
                    <div>
                      <span className="text-[#7e8d87] block">LinkedIn:</span>
                      <a
                        href={formData.linkedInUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1b5341] underline inline-flex items-center gap-1"
                      >
                        Profile Link <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Track Details summary card */}
              <div className="p-5 rounded-2xl border border-[#ede7db] bg-[#faf8f4] space-y-3">
                <div className="flex items-center justify-between border-b border-[#ede7db] pb-2">
                  <h4 className="font-serif font-bold text-sm text-[#103327]">
                    2. Track Specific Profile ({categoryConfig?.title})
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-[#b24e2b] hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  {/* Preferred Summit Track */}
                  <div className="p-3 bg-emerald-50/80 border border-emerald-200/90 rounded-xl">
                    <span className="text-[11px] font-semibold text-[#16503c] uppercase tracking-wider block">
                      Preferred Event Track
                    </span>
                    <strong className="text-sm font-serif text-[#103327] block mt-0.5">
                      {formData.preferredTrack || "Not Selected"}
                    </strong>
                    <span className="text-[11px] text-[#4a5752] mt-0.5 block">
                      Track preference only — final cohort allocation will be confirmed by summit chairs prior to event day.
                    </span>
                  </div>

                  {formData.teamName && (
                    <div>
                      <span className="text-[#7e8d87] block">Team Name:</span>
                      <strong className="text-[#161e1b]">{formData.teamName}</strong>
                      <span className="text-xs text-[#4a5752] ml-2">
                        ({formData.teamMembers.length + 1} members total)
                      </span>
                    </div>
                  )}

                  {formData.projectName && (
                    <div>
                      <span className="text-[#7e8d87] block">Project / Startup:</span>
                      <strong className="text-[#161e1b]">{formData.projectName}</strong>
                    </div>
                  )}

                  {formData.projectDescription && (
                    <div>
                      <span className="text-[#7e8d87] block">Project Description:</span>
                      <p className="text-[#161e1b] line-clamp-2">{formData.projectDescription}</p>
                    </div>
                  )}

                  {formData.investorAreasOfInterest && (
                    <div>
                      <span className="text-[#7e8d87] block">Investment Focus:</span>
                      <p className="text-[#161e1b]">{formData.investorAreasOfInterest}</p>
                    </div>
                  )}

                  {formData.corporateAreasOfInterest && (
                    <div>
                      <span className="text-[#7e8d87] block">Corporate Focus:</span>
                      <p className="text-[#161e1b]">{formData.corporateAreasOfInterest}</p>
                    </div>
                  )}

                  {formData.mentorExpertise && (
                    <div>
                      <span className="text-[#7e8d87] block">Expertise:</span>
                      <p className="text-[#161e1b]">{formData.mentorExpertise}</p>
                    </div>
                  )}

                  {formData.observerReasonForAttending && (
                    <div>
                      <span className="text-[#7e8d87] block">Reason for Attending:</span>
                      <p className="text-[#161e1b]">{formData.observerReasonForAttending}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Travel & Attendance summary */}
              <div className="p-5 rounded-2xl border border-[#ede7db] bg-[#faf8f4] space-y-3">
                <div className="flex items-center justify-between border-b border-[#ede7db] pb-2">
                  <h4 className="font-serif font-bold text-sm text-[#103327]">
                    3. Travel & Attendance Selection
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs text-[#b24e2b] hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-[#7e8d87] block">Arrival Mode:</span>
                    <span className="text-[#161e1b]">{formData.arrivalMode}</span>
                  </div>
                  <div>
                    <span className="text-[#7e8d87] block">Departure Mode:</span>
                    <span className="text-[#161e1b]">{formData.departureMode}</span>
                  </div>
                  <div>
                    <span className="text-[#7e8d87] block">Transit Hub (Station/Airport):</span>
                    <span className="text-[#161e1b]">
                      {formData.arrivalStationOrAirport || "Not Specified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#7e8d87] block">Pickup Shuttle:</span>
                    <span className="text-[#161e1b] font-semibold">
                      {formData.pickupRequired ? "Yes, Requested" : "No / Self Arranged"}
                    </span>
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}
            </div>
          )}

          {/* Form Navigation Controls */}
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#ede7db]">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleBack}
              disabled={isSubmitting}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{currentStep === 1 ? "Cancel" : "Back"}</span>
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNext}
                className="gap-2 font-bold"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="terracotta"
                size="md"
                disabled={isSubmitting}
                className="gap-2 font-bold px-8 shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Registration...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Confirm & Submit Registration</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
