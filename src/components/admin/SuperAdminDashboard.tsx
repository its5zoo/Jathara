"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  EyeOff,
  Trash2,
  Calendar,
  Plane,
  X,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  Lock,
  LogOut,
  RefreshCw,
  CheckCircle2,
  ShieldAlert,
  LayoutDashboard,
  BarChart3,
  Menu,
  ArrowLeft,
} from "lucide-react";
import { 
  RegistrationRecord, 
  RegistrationCategorySlug,
  PREFERRED_TRACKS,
  DashboardMetrics
} from "@/lib/types/registration";
import { resolveTrack } from "@/lib/config/tracks";
import { 
  registrationService, 
  csvExportService 
} from "@/lib/services/registrationService";
import { REGISTRATION_CATEGORIES } from "@/data/eventData";
import { signInSuperAdmin, signOutSuperAdmin, sendAdminPasswordReset, subscribeToAuthState } from "@/lib/firebase/auth";
import { safeFetch } from "@/lib/api/safeResponse";
import { Container } from "../common/Container";
import { Button } from "../common/Button";

// Helper to mask sensitive contact coordinates
function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "***@***.***";
  const [user, domain] = email.split("@");
  if (user.length <= 2) return `${user[0]}***@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

function maskPhone(phone: string): string {
  if (!phone || phone.length < 6) return "+91 ***** *****";
  const trimmed = phone.trim();
  return `${trimmed.slice(0, 4)} **** ${trimmed.slice(-3)}`;
}

export function SuperAdminDashboard() {
  // Super Admin Navigation state
  const [adminMobileMenuOpen, setAdminMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<"overview" | "analytics" | "registrations">("overview");

  // Authentication state
  const [authStatus, setAuthStatus] = useState<"checking" | "authenticated" | "unauthenticated">("checking");
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [loginEmailInput, setLoginEmailInput] = useState<string>("");
  const [loginPasswordInput, setLoginPasswordInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [resetSentFeedback, setResetSentFeedback] = useState<boolean>(false);

  // Registrations & Database state
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [serverMetrics, setServerMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [databaseError, setDatabaseError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [pickupFilter, setPickupFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");

  // Privacy / Masking state
  const [showMaskedContacts, setShowMaskedContacts] = useState<boolean>(true);

  // Modal states
  const [selectedRecord, setSelectedRecord] = useState<RegistrationRecord | null>(null);
  const [recordToDelete, setRecordToDelete] = useState<RegistrationRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Admin note editing state inside details modal
  const [activeNoteText, setActiveNoteText] = useState<string>("");
  const [noteSavedFeedback, setNoteSavedFeedback] = useState<boolean>(false);
  const [isSavingNotes, setIsSavingNotes] = useState<boolean>(false);

  // Toast / notification banner state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Lock scroll when mobile drawer is open
  useEffect(() => {
    if (adminMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [adminMobileMenuOpen]);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && adminMobileMenuOpen) {
        setAdminMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [adminMobileMenuOpen]);

  // Scroll to section with offset compensation for sticky admin header
  const scrollToSection = (id: string, sectionKey: "overview" | "analytics" | "registrations") => {
    setActiveSection(sectionKey);
    setAdminMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Load registrations from backend API
  const loadRegistrations = useCallback(async () => {
    setIsLoading(true);
    setDatabaseError(null);
    try {
      const result = await safeFetch<{
        registrations?: RegistrationRecord[];
        metrics?: DashboardMetrics;
      }>("/api/admin/registrations", {
        headers: { "Content-Type": "application/json" },
      });

      if (!result.ok || !result.data) {
        if (result.status === 401 || result.status === 403) {
          setAuthStatus("unauthenticated");
          return;
        }
        throw new Error(result.errorMessage || "Failed to load registrations.");
      }

      setRegistrations(result.data.registrations || []);
      if (result.data.metrics) {
        setServerMetrics(result.data.metrics);
      }
    } catch (err: unknown) {
      console.error("[loadRegistrations error]:", err);
      const msg = err instanceof Error ? err.message : "Database connection issue.";
      setDatabaseError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check existing session on mount
  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const sessionResult = await safeFetch<{
          authenticated?: boolean;
          user?: { email?: string };
        }>("/api/admin/auth/session");

        if (sessionResult.ok && sessionResult.data?.authenticated && isMounted) {
          setAuthStatus("authenticated");
          setAdminEmail(sessionResult.data.user?.email || "");
          loadRegistrations();
          return;
        }
      } catch (err) {
        console.warn("Session check returned error:", err);
      }

      if (isMounted) {
        setAuthStatus("unauthenticated");
      }
    }

    checkSession();

    // Listen to Firebase client auth state if configured
    const unsubscribe = subscribeToAuthState(async (user) => {
      if (user && user.email) {
        try {
          const idToken = await user.getIdToken();
          const sessionRes = await fetch("/api/admin/auth/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          });
          if (sessionRes.ok && isMounted) {
            setAuthStatus("authenticated");
            setAdminEmail(user.email);
            loadRegistrations();
          }
        } catch (e) {
          console.warn("Firebase client auth sync warning:", e);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [loadRegistrations]);

  // Handle Login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setResetSentFeedback(false);

    if (!loginEmailInput.trim() || !loginPasswordInput) {
      setLoginError("Please enter both email and password.");
      return;
    }

    setIsLoggingIn(true);
    try {
      const user = await signInSuperAdmin(loginEmailInput, loginPasswordInput);
      const idToken = await user.getIdToken();

      const sessionResult = await safeFetch<{
        success?: boolean;
        error?: string;
      }>("/api/admin/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!sessionResult.ok || !sessionResult.data?.success) {
        await signOutSuperAdmin().catch(() => {});
        throw new Error(sessionResult.errorMessage || "Administrative authorization failed.");
      }

      setAuthStatus("authenticated");
      setAdminEmail(user.email || loginEmailInput);
      setLoginEmailInput("");
      setLoginPasswordInput("");
      loadRegistrations();
      triggerToast("Welcome, Super Admin. Connected to live Cloud Firestore.");
    } catch (err: unknown) {
      console.error("Super Admin login error:", err);
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setLoginError(msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/session", { method: "DELETE" });
      await signOutSuperAdmin();
    } catch (e) {
      console.warn("Logout error:", e);
    } finally {
      setAuthStatus("unauthenticated");
      setAdminEmail("");
      setRegistrations([]);
      triggerToast("You have been signed out from the Super Admin console.");
    }
  };

  // Handle Password Reset
  const handlePasswordReset = async () => {
    if (!loginEmailInput.trim()) {
      setLoginError("Please enter your Super Admin email address above to receive a reset link.");
      return;
    }

    try {
      await sendAdminPasswordReset(loginEmailInput);
      setResetSentFeedback(true);
      setLoginError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send reset email.";
      setLoginError(msg);
    }
  };

  // Metrics calculation from authoritative dataset
  const metrics = useMemo(() => {
    if (serverMetrics) {
      return serverMetrics;
    }
    return registrationService.calculateMetrics(registrations);
  }, [serverMetrics, registrations]);

  // Filtered & Sorted records
  const filteredRecords = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return registrations
      .filter((r) => {
        // Search across fields
        if (q) {
          const matchName = r.fullName.toLowerCase().includes(q);
          const matchEmail = r.email.toLowerCase().includes(q);
          const matchPhone = r.phone.toLowerCase().includes(q);
          const matchOrg = r.organization.toLowerCase().includes(q);
          const matchRef = r.referenceId.toLowerCase().includes(q);
          const matchTeam = r.teamName?.toLowerCase().includes(q) || false;
          const matchProj = r.projectName?.toLowerCase().includes(q) || false;
          const matchTrack = r.preferredTrack?.toLowerCase().includes(q) || false;

          if (!matchName && !matchEmail && !matchPhone && !matchOrg && !matchRef && !matchTeam && !matchProj && !matchTrack) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== "all" && r.categorySlug !== selectedCategory) {
          return false;
        }

        // Preferred track filter
        if (selectedTrack !== "all") {
          const canonicalSelected = resolveTrack(selectedTrack);
          const canonicalRecord = resolveTrack(r.preferredTrack);
          const isMatch =
            r.preferredTrack === selectedTrack ||
            (canonicalSelected && canonicalRecord && canonicalSelected.slug === canonicalRecord.slug) ||
            (canonicalSelected && r.preferredTrack === canonicalSelected.title);
          if (!isMatch) {
            return false;
          }
        }

        // Pickup filter
        if (pickupFilter === "pickup-requested" && !r.travel?.pickupRequired) {
          return false;
        }
        if (pickupFilter === "self-arranged" && r.travel?.pickupRequired) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === "oldest") {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === "name") {
          return a.fullName.localeCompare(b.fullName);
        }
        return 0;
      });
  }, [registrations, searchQuery, selectedCategory, selectedTrack, pickupFilter, sortBy]);

  // Handler for Deletion via Server Route
  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;
    const refId = recordToDelete.referenceId;
    setIsDeleting(true);

    try {
      const res = await safeFetch<{ success?: boolean; error?: string }>(
        `/api/admin/registrations/${recordToDelete.id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error(res.errorMessage || "Failed to delete registration record.");
      }

      setRegistrations((prev) => prev.filter((r) => r.id !== recordToDelete.id));
      if (selectedRecord?.id === recordToDelete.id) {
        setSelectedRecord(null);
      }
      setRecordToDelete(null);
      triggerToast(`Registration ${refId} permanently deleted from Cloud Firestore.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Deletion failed.";
      alert(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handler for Saving Notes via Server Route
  const handleSaveNotes = async () => {
    if (!selectedRecord) return;
    setIsSavingNotes(true);

    try {
      const res = await safeFetch<{
        success?: boolean;
        registration?: RegistrationRecord;
        error?: string;
      }>(`/api/admin/registrations/${selectedRecord.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: activeNoteText }),
      });

      if (!res.ok || !res.data?.registration) {
        throw new Error(res.errorMessage || "Failed to update notes.");
      }

      setSelectedRecord(res.data.registration);
      setRegistrations((prev) =>
        prev.map((r) => (r.id === selectedRecord.id ? res.data!.registration! : r))
      );
      setNoteSavedFeedback(true);
      setTimeout(() => setNoteSavedFeedback(false), 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Note save failed.";
      alert(msg);
    } finally {
      setIsSavingNotes(false);
    }
  };

  // When opening details modal, initialize note text
  const openDetailsModal = (record: RegistrationRecord) => {
    setSelectedRecord(record);
    setActiveNoteText(record.adminNotes || "");
  };

  // ========================================================
  // RENDER: CHECKING AUTH STATE
  // ========================================================
  if (authStatus === "checking") {
    return (
      <div className="w-full bg-[#071711] min-h-screen text-[#fcfbf8] flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto animate-pulse">
            <Lock className="w-6 h-6 text-[#be9740]" />
          </div>
          <h2 className="font-serif font-bold text-lg text-[#fcfbf8]">
            Verifying Super Admin Session
          </h2>
          <p className="text-xs text-[#a0b0aa]">
            Connecting to ISF Startup Jathara security services...
          </p>
        </div>
      </div>
    );
  }

  // ========================================================
  // RENDER: SUPER ADMIN LOGIN GATE (UNAUTHENTICATED)
  // ========================================================
  if (authStatus === "unauthenticated") {
    return (
      <div className="w-full bg-[#071711] min-h-screen text-[#fcfbf8] flex flex-col justify-between py-12 px-4 sm:px-6">
        <div className="max-w-md w-full mx-auto my-auto space-y-8">
          {/* Header Brand Lockup */}
          <div className="text-center space-y-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be9740] rounded-xl hover:opacity-90 transition-opacity"
              aria-label="Return to Public Website"
            >
              <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md">
                <Image
                  src="/logos/isf-logo.webp"
                  alt="ISF Insignia"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md">
                <Image
                  src="/logos/giet-logo.png"
                  alt="GIET University Crest"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
            </Link>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#be9740]/15 border border-[#be9740]/30 text-[#be9740] text-xs font-bold uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Super Admin Portal</span>
              </div>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#fcfbf8]">
                ISF Startup Jathara 2026
              </h1>
              <p className="text-xs text-[#a0b0aa] mt-1">
                Centralized Registration Management &amp; Cloud Database Console
              </p>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-[#ffffff] text-[#161e1b] rounded-3xl p-6 sm:p-8 border border-[#ede7db] shadow-2xl space-y-6">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#103327]">
                Super Admin Authentication
              </h2>
              <p className="text-xs text-[#4a5752] mt-0.5">
                Sign in with authorized Firebase credentials to access live registration data.
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>{loginError}</div>
              </div>
            )}

            {/* Reset Sent Feedback */}
            {resetSentFeedback && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  A password reset email has been dispatched. Please check your inbox and follow instructions.
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#103327] mb-1">
                  Super Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmailInput}
                  onChange={(e) => setLoginEmailInput(e.target.value)}
                  placeholder="admin@isfjathara.org"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cec0] bg-[#faf8f4] text-xs text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#103327]">
                    Master Password
                  </label>
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    className="text-[11px] text-[#b24e2b] hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={loginPasswordInput}
                  onChange={(e) => setLoginPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cec0] bg-[#faf8f4] text-xs text-[#161e1b] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center text-xs font-bold py-3"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying Authorization...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Sign In to Super Admin Console</span>
                  </span>
                )}
              </Button>
            </form>

            {/* Security note */}
            <div className="pt-4 border-t border-[#ede7db] text-[11px] text-[#7e8d87] space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Single Super Admin Access Level • Authoritative Shared DB</span>
              </div>
              <p>
                Public visitor access is strictly restricted. All administrative operations, CSV exports, notes, and deletions are permanently logged for summit compliance.
              </p>
            </div>
          </div>

          {/* Return link */}
          <div className="text-center">
            <Link
              href="/"
              className="text-xs text-[#a0b0aa] hover:text-[#fcfbf8] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>← Return to Public Summit Website</span>
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-[#556961] mt-8">
          ISF Startup Jathara @ Dandakaranya 2026 • 18–20 December 2026 • GIET University, Gunupur, Odisha
        </div>
      </div>
    );
  }

  // ========================================================
  // RENDER: AUTHENTICATED SUPER ADMIN DASHBOARD
  // ========================================================
  return (
    <div className="w-full bg-[#fcfbf8] min-h-screen text-[#161e1b] pb-24">
      {/* Super Admin Top Header */}
      <header className="bg-[#071711] text-[#fcfbf8] border-b border-[#1b5341] py-3 sm:py-3.5 sticky top-0 z-30 shadow-lg backdrop-blur-md bg-[#071711]/95">
        <Container size="wide" className="flex items-center justify-between gap-4">
          {/* Brand & Console Identification */}
          <Link
            href="/admin"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be9740] rounded-xl group hover:opacity-95 transition-opacity"
            aria-label="Super Admin Console Overview"
          >
            {/* Dual brand well */}
            <div className="flex items-center gap-1.5 bg-white/10 p-1 sm:p-1.5 rounded-xl border border-white/15 shrink-0 group-hover:scale-102 transition-transform">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                <Image
                  src="/logos/isf-logo.webp"
                  alt="ISF Insignia"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                <Image
                  src="/logos/giet-logo.png"
                  alt="GIET University Crest"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="shrink-0">
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-black text-sm sm:text-base md:text-lg text-[#fcfbf8] tracking-tight whitespace-nowrap group-hover:text-[#be9740] transition-colors">
                  ISF Startup Jathara
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#be9740] bg-[#be9740]/15 px-2 py-0.5 rounded border border-[#be9740]/30 hidden xs:inline-block whitespace-nowrap">
                  Super Admin
                </span>
              </div>
              <p className="text-[11px] text-[#a0b0aa] whitespace-nowrap hidden 2xl:block">
                Centralized Registration Management &amp; Analytics Console
              </p>
            </div>
          </Link>

          {/* Desktop Section Navigation Tabs (xl+) */}
          <nav
            aria-label="Super Admin Sections"
            className="hidden xl:flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 shrink-0"
          >
            <button
              type="button"
              onClick={() => scrollToSection("overview", "overview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSection === "overview"
                  ? "bg-[#1b5341] text-[#fcfbf8] shadow-xs"
                  : "text-[#c8d1cd] hover:text-[#fcfbf8] hover:bg-white/5"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#be9740]" />
              <span>Overview</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("analytics", "analytics")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSection === "analytics"
                  ? "bg-[#1b5341] text-[#fcfbf8] shadow-xs"
                  : "text-[#c8d1cd] hover:text-[#fcfbf8] hover:bg-white/5"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#be9740]" />
              <span>Track Analytics</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("registrations", "registrations")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSection === "registrations"
                  ? "bg-[#1b5341] text-[#fcfbf8] shadow-xs"
                  : "text-[#c8d1cd] hover:text-[#fcfbf8] hover:bg-white/5"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#be9740]" />
              <span>Registrations</span>
            </button>
          </nav>

          {/* Desktop Right Controls (xl+) */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={loadRegistrations}
              disabled={isLoading}
              className="text-xs text-[#c8d1cd] hover:text-[#fcfbf8] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
              title="Refresh live data from Cloud Firestore"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#be9740] ${isLoading ? "animate-spin" : ""}`} />
              <span>{isLoading ? "Syncing..." : "Sync Live Data"}</span>
            </button>

            <Link href="/register" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="text-xs text-[#fcfbf8] border-white/20 hover:bg-white/10 py-1.5 px-2.5">
                <span>Public Form</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </Link>

            <Link href="/">
              <Button variant="secondary" size="sm" className="text-xs py-1.5 px-2.5">
                <ArrowLeft className="w-3 h-3 mr-1" />
                <span>Summit Home</span>
              </Button>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-rose-300 hover:text-white flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-rose-400/30 hover:bg-rose-900/30 transition-colors"
              title="Sign out of Super Admin"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Mobile & Tablet Right Controls (< xl) */}
          <div className="flex xl:hidden items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={loadRegistrations}
              disabled={isLoading}
              className="p-2 rounded-lg border border-white/20 text-[#be9740] hover:bg-white/10 transition-colors"
              title="Sync Live Data"
              aria-label="Sync Live Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <button
              type="button"
              onClick={() => setAdminMobileMenuOpen(!adminMobileMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/20 bg-white/5 text-[#fcfbf8] text-xs font-semibold hover:bg-white/10 transition-colors"
              aria-expanded={adminMobileMenuOpen}
              aria-controls="admin-mobile-navigation"
              aria-label="Toggle Super Admin Navigation Menu"
            >
              {adminMobileMenuOpen ? (
                <X className="w-4 h-4 text-[#be9740]" />
              ) : (
                <Menu className="w-4 h-4 text-[#be9740]" />
              )}
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </Container>
      </header>

      {/* Super Admin Mobile & Tablet Navigation Drawer */}
      {adminMobileMenuOpen && (
        <div
          id="admin-mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Super Admin Navigation Drawer"
          className="fixed inset-0 z-50 xl:hidden flex justify-end animate-fade-in"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setAdminMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-[#071711] text-[#fcfbf8] h-full shadow-2xl border-l border-[#1b5341] flex flex-col justify-between z-10 overflow-y-auto">
            {/* Top section */}
            <div>
              <div className="p-5 border-b border-[#1b5341] flex items-center justify-between">
                <Link
                  href="/admin"
                  onClick={() => setAdminMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be9740] rounded-lg"
                  aria-label="Super Admin Console Overview"
                >
                  <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center">
                    <Image
                      src="/logos/isf-logo.webp"
                      alt="ISF Insignia"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-sm text-[#fcfbf8]">
                      Admin Console
                    </h2>
                    <span className="text-[10px] text-[#be9740] font-bold uppercase tracking-wider">
                      Startup Jathara 2026
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setAdminMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg border border-white/20 text-[#a0b0aa] hover:text-white hover:bg-white/10"
                  aria-label="Close Admin Navigation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Admin Session Badge */}
              <div className="p-4 mx-4 my-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Super Admin Session Active</span>
                </div>
                <div className="text-xs text-[#a0b0aa] font-mono truncate">
                  {adminEmail || "Authorized Administrator"}
                </div>
              </div>

              {/* Navigation Sections */}
              <div className="px-4 py-2 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7e8d87] px-3 block mb-2">
                  Console Sections
                </span>

                <button
                  type="button"
                  onClick={() => scrollToSection("overview", "overview")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    activeSection === "overview"
                      ? "bg-[#1b5341] text-white font-semibold"
                      : "text-[#c8d1cd] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-[#be9740]" />
                  <span>Executive Overview &amp; KPIs</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("analytics", "analytics")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    activeSection === "analytics"
                      ? "bg-[#1b5341] text-white font-semibold"
                      : "text-[#c8d1cd] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-[#be9740]" />
                  <span>Summit Track Analytics</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("registrations", "registrations")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    activeSection === "registrations"
                      ? "bg-[#1b5341] text-white font-semibold"
                      : "text-[#c8d1cd] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Users className="w-4 h-4 text-[#be9740]" />
                  <span>Registrations Directory &amp; Records</span>
                </button>
              </div>

              {/* Quick Actions & Portals */}
              <div className="px-4 py-3 space-y-2 border-t border-[#1b5341]/60 mt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7e8d87] px-3 block mb-1">
                  Actions &amp; Portals
                </span>

                <button
                  type="button"
                  onClick={() => {
                    loadRegistrations();
                    setAdminMobileMenuOpen(false);
                  }}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-[#c8d1cd] hover:bg-white/5 hover:text-white border border-white/10"
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw className={`w-3.5 h-3.5 text-[#be9740] ${isLoading ? "animate-spin" : ""}`} />
                    <span>{isLoading ? "Syncing Database..." : "Sync Live Data"}</span>
                  </span>
                </button>

                <Link
                  href="/register"
                  onClick={() => setAdminMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-[#c8d1cd] hover:bg-white/5 hover:text-white border border-white/10"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-[#be9740]" />
                    <span>Open Public Registration Form</span>
                  </span>
                </Link>

                <Link
                  href="/"
                  onClick={() => setAdminMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-[#c8d1cd] hover:bg-white/5 hover:text-white border border-white/10"
                >
                  <span className="flex items-center gap-2">
                    <ArrowLeft className="w-3.5 h-3.5 text-[#be9740]" />
                    <span>Return to Public Summit Site</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Sign Out Action */}
            <div className="p-4 border-t border-[#1b5341] space-y-3">
              <button
                type="button"
                onClick={() => {
                  setAdminMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 hover:bg-rose-900/60 hover:text-white text-xs font-bold transition-colors"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Sign Out of Super Admin</span>
              </button>

              <p className="text-[10px] text-center text-[#556961]">
                ISF Startup Jathara @ Dandakaranya 2026
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cloud Firestore Backend Status Banner */}
      <section className="bg-emerald-950/90 border-b border-emerald-800 text-emerald-200 py-2.5 px-4 text-xs">
        <Container size="wide" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span>
              <strong>Cloud Firestore Database Connected:</strong> Authoritative shared registrations database. All metrics are calculated live from real attendee submissions.
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-300/80 uppercase tracking-wider whitespace-nowrap">
            Super Admin: {adminEmail || "Authorized"}
          </span>
        </Container>
      </section>

      {/* Database Error Banner if Firestore is not yet configured */}
      {databaseError && (
        <section className="bg-amber-950/90 border-b border-amber-800 text-amber-200 py-3 px-4 text-xs">
          <Container size="wide" className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                <strong>Database Notice:</strong> {databaseError}
              </span>
            </div>
            <button
              type="button"
              onClick={loadRegistrations}
              className="text-xs underline font-semibold text-amber-300 hover:text-amber-100"
            >
              Retry Connection
            </button>
          </Container>
        </section>
      )}

      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#103327] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400/40 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#be9740]" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Admin Console Container */}
      <main className="py-8 sm:py-10">
        <Container size="wide" className="space-y-8">
          {/* ========================================================
              DASHBOARD OVERVIEW & SUMMARY METRICS
             ======================================================== */}
          <div id="overview" className="scroll-mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Total Registrations */}
            <div className="bg-white rounded-3xl p-6 border border-[#e6dfd1] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7e8d87] block mb-1">
                  Total Registrations
                </span>
                <div className="font-serif font-black text-3xl sm:text-4xl text-[#103327]">
                  {metrics.totalRegistrations}
                </div>
                <p className="text-xs text-[#4a5752] mt-1">
                  Confirmed delegates &amp; teams across all 8 official tracks
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#ede7db] flex items-center justify-between text-xs text-[#7e8d87]">
                <span>Status:</span>
                <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  All 100% Free
                </span>
              </div>
            </div>

            {/* Individual vs Team Ratio */}
            <div className="bg-white rounded-3xl p-6 border border-[#e6dfd1] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7e8d87] block mb-1">
                  Delegation Structure
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-[#103327]">
                    {metrics.teamCount} Teams
                  </span>
                  <span className="text-xs text-[#7e8d87]">/ {metrics.individualCount} Solo</span>
                </div>
                <p className="text-xs text-[#4a5752] mt-1">
                  <strong>{metrics.totalTeamMembers}</strong> total member attendees recorded
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#ede7db] flex items-center justify-between text-xs text-[#7e8d87]">
                <span>Max Team Limit:</span>
                <span className="font-semibold text-[#161e1b]">5 Members</span>
              </div>
            </div>

            {/* Travel & Shuttle Pickup Requests */}
            <div className="bg-white rounded-3xl p-6 border border-[#e6dfd1] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7e8d87] block mb-1">
                  Logistics &amp; Pickup Requests
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-[#b24e2b]">
                    {metrics.pickupRequestsCount}
                  </span>
                  <span className="text-xs text-[#7e8d87]">
                    ({metrics.pickupRequestsPercentage}% of registrations)
                  </span>
                </div>
                <p className="text-xs text-[#4a5752] mt-1">
                  Requested station/airport shuttle from VTZ/RGDA/GNPR
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#ede7db] flex items-center justify-between text-xs text-[#7e8d87]">
                <span>Flight / Train:</span>
                <span className="font-semibold text-[#161e1b]">
                  {metrics.arrivalModesBreakdown.Flight} Flights | {metrics.arrivalModesBreakdown.Train} Trains
                </span>
              </div>
            </div>

            {/* Welcome Dinner Attendance */}
            <div className="bg-white rounded-3xl p-6 border border-[#e6dfd1] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7e8d87] block mb-1">
                  17 Dec Welcome Dinner
                </span>
                <div className="font-serif font-bold text-2xl sm:text-3xl text-[#be9740]">
                  {metrics.attendanceDaysCount.welcomeDinnerDec17} Attendees
                </div>
                <p className="text-xs text-[#4a5752] mt-1">
                  Delegates arriving early for the 17 Dec evening reception
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#ede7db] flex items-center justify-between text-xs text-[#7e8d87]">
                <span>Day 1–3 Peak:</span>
                <span className="font-semibold text-[#161e1b]">
                  {Math.max(
                    metrics.attendanceDaysCount.day1Dec18,
                    metrics.attendanceDaysCount.day2Dec19,
                    metrics.attendanceDaysCount.day3Dec20
                  )} Daily Passes
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================
              ANALYTICS & SUMMIT VERTICAL DISTRIBUTION
             ======================================================== */}
          <section id="analytics" className="scroll-mt-28 space-y-8">
            {/* Category-wise Breakdown Strip */}
            <div className="bg-white rounded-3xl p-6 border border-[#e6dfd1] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#103327]">
                  Category-wise Registration Distribution
                </h3>
                <span className="text-xs text-[#7e8d87]">
                  Active Intake Across 6 Summit Tracks
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {REGISTRATION_CATEGORIES.map((cat) => {
                  const count = metrics.categoryBreakdown[cat.slug as RegistrationCategorySlug] || 0;
                  const pct = metrics.totalRegistrations > 0
                    ? Math.round((count / metrics.totalRegistrations) * 100)
                    : 0;

                  return (
                    <div
                      key={cat.id}
                      className="p-3 rounded-2xl bg-[#faf8f4] border border-[#ede7db] space-y-1"
                    >
                      <div className="text-[11px] font-semibold text-[#8c671b] truncate" title={cat.title}>
                        {cat.title}
                      </div>
                      <div className="font-serif font-black text-xl text-[#103327]">
                        {count}
                      </div>
                      <div className="text-[10px] text-[#7e8d87]">
                        {pct}% of summit
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preferred Summit Track Distribution Section */}
            <div className="bg-white rounded-3xl p-6 border border-[#e6dfd1] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#103327] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1b5341]" />
                    <span>Preferred Summit Track Distribution</span>
                  </h3>
                  <p className="text-xs text-[#7e8d87] mt-0.5">
                    Applicant track preferences across the 8 official summit tracks
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#16503c] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 self-start sm:self-auto">
                  Total Track Preferences: {metrics.totalRegistrations}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3.5">
                {PREFERRED_TRACKS.map((track) => {
                  const count = metrics.preferredTrackBreakdown[track] || 0;
                  const pct = metrics.totalRegistrations > 0
                    ? Math.round((count / metrics.totalRegistrations) * 100)
                    : 0;

                  return (
                    <div
                      key={track}
                      className="p-4 rounded-2xl bg-[#faf8f4] border border-[#ede7db] hover:border-emerald-300 transition-all flex flex-col justify-between space-y-2 group"
                    >
                      <div>
                        <div className="text-xs font-semibold text-[#103327] group-hover:text-[#1b5341] transition-colors line-clamp-1" title={track}>
                          {track}
                        </div>
                        <div className="text-[11px] text-[#7e8d87] mt-0.5">
                          Official Track
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#ede7db]/60 flex items-baseline justify-between">
                        <div className="font-serif font-black text-2xl text-[#103327]">
                          {count}
                        </div>
                        <div className="text-xs font-medium text-[#16503c]">
                          {pct}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {metrics.unassignedTrackCount > 0 && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-center justify-between">
                  <span>
                    <strong>Legacy / Unassigned records:</strong> {metrics.unassignedTrackCount} registration(s) created prior to track preference requirement.
                  </span>
                  <span className="text-[11px] text-amber-800 font-mono">
                    Displaying &apos;Not provided&apos;
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* ========================================================
              REGISTRATIONS DIRECTORY & RECORDS
             ======================================================== */}
          <section id="registrations" className="scroll-mt-28 space-y-8">
            {/* CONTROLS, SEARCH, FILTERS & EXPORT TOOLBAR */}
            <div className="bg-white rounded-3xl p-6 border border-[#e6dfd1] shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative w-full lg:w-96">
                <Search className="w-4 h-4 text-[#7e8d87] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, email, phone, org, ref ID, team..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e6dfd1] text-xs sm:text-sm text-[#161e1b] bg-[#fcfbf8] focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7e8d87] hover:text-[#161e1b]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filters & Export Actions */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
                {/* Category selector */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#e6dfd1] text-xs text-[#161e1b] bg-white focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                >
                  <option value="all">All Categories ({metrics.totalRegistrations})</option>
                  {REGISTRATION_CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>

                {/* Preferred Track selector */}
                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#e6dfd1] text-xs text-[#161e1b] bg-white focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                >
                  <option value="all">All Preferred Tracks</option>
                  {PREFERRED_TRACKS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                {/* Pickup Filter */}
                <select
                  value={pickupFilter}
                  onChange={(e) => setPickupFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#e6dfd1] text-xs text-[#161e1b] bg-white focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                >
                  <option value="all">All Logistics</option>
                  <option value="pickup-requested">Pickup Requested ({metrics.pickupRequestsCount})</option>
                  <option value="self-arranged">Self-Arranged</option>
                </select>

                {/* Sort Order */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "name")}
                  className="px-3 py-2 rounded-xl border border-[#e6dfd1] text-xs text-[#161e1b] bg-white focus:ring-2 focus:ring-[#143e30] focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Applicant Name (A-Z)</option>
                </select>

                {/* Contact Masking Toggle */}
                <button
                  type="button"
                  onClick={() => setShowMaskedContacts((prev) => !prev)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#e6dfd1] text-xs font-semibold text-[#4a5752] hover:bg-[#faf8f4] transition-colors"
                  title="Toggle masking of phone and email"
                >
                  {showMaskedContacts ? (
                    <>
                      <Eye className="w-3.5 h-3.5 text-[#143e30]" />
                      <span>Reveal Contacts</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-[#b24e2b]" />
                      <span>Mask Contacts</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Export Toolbar Button Row */}
            <div className="pt-3 border-t border-[#ede7db] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs text-[#7e8d87]">
                Showing <strong>{filteredRecords.length}</strong> of <strong>{registrations.length}</strong> registrations
                {(searchQuery || selectedCategory !== "all" || selectedTrack !== "all" || pickupFilter !== "all") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedTrack("all");
                      setPickupFilter("all");
                    }}
                    className="text-[#b24e2b] ml-2 font-semibold hover:underline"
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Functional CSV Export Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#103327] mr-1 hidden sm:inline">
                  Exports:
                </span>

                <button
                  type="button"
                  onClick={() => csvExportService.exportRegistrations(filteredRecords)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#e6dfd1] text-[11px] font-semibold text-[#161e1b] hover:bg-[#f7f4ec] transition-colors"
                  title="Export full registrations data to CSV"
                >
                  <Download className="w-3 h-3 text-[#143e30]" />
                  <span>Filtered CSV ({filteredRecords.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => csvExportService.exportTravelAndPickupList(filteredRecords)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#e6dfd1] text-[11px] font-semibold text-[#161e1b] hover:bg-[#f7f4ec] transition-colors"
                  title="Export arrival & pickup schedule"
                >
                  <Plane className="w-3 h-3 text-[#b24e2b]" />
                  <span>Travel &amp; Pickup</span>
                </button>

                <button
                  type="button"
                  onClick={() => csvExportService.exportTeamMemberList(filteredRecords)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#e6dfd1] text-[11px] font-semibold text-[#161e1b] hover:bg-[#f7f4ec] transition-colors"
                  title="Export team members and group roster"
                >
                  <Users className="w-3 h-3 text-[#be9740]" />
                  <span>Team Members</span>
                </button>

                <button
                  type="button"
                  onClick={() => csvExportService.exportCategorySummary(registrations)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#e6dfd1] text-[11px] font-semibold text-[#161e1b] hover:bg-[#f7f4ec] transition-colors"
                  title="Export aggregate category metrics"
                >
                  <Filter className="w-3 h-3 text-[#143e30]" />
                  <span>Category Summary</span>
                </button>

                <button
                  type="button"
                  onClick={() => csvExportService.exportPreferredTrackSummary(registrations)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#e6dfd1] text-[11px] font-semibold text-[#161e1b] hover:bg-[#f7f4ec] transition-colors"
                  title="Export preferred tracks distribution summary"
                >
                  <Download className="w-3 h-3 text-[#16503c]" />
                  <span>Track Summary</span>
                </button>

                <button
                  type="button"
                  onClick={() => csvExportService.exportAccommodationTemplate(filteredRecords)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#e6dfd1] text-[11px] font-semibold text-[#161e1b] hover:bg-[#f7f4ec] transition-colors"
                  title="Export future accommodation administrative planning roster"
                >
                  <Calendar className="w-3 h-3 text-[#7e8d87]" />
                  <span>Accommodation Template</span>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================
              REGISTRATIONS MANAGEMENT TABLE
             ======================================================== */}
          <div className="bg-white rounded-3xl border border-[#e6dfd1] shadow-xs overflow-hidden">
            {isLoading ? (
              <div className="py-20 text-center text-xs text-[#7e8d87]">
                Loading registrations...
              </div>
            ) : registrations.length === 0 ? (
              <div className="py-20 text-center space-y-3 px-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 mx-auto flex items-center justify-center text-emerald-800">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#103327]">
                  No Registrations in Database Yet
                </h3>
                <p className="text-xs sm:text-sm text-[#7e8d87] max-w-md mx-auto leading-relaxed">
                  The Cloud Firestore registrations collection is connected and listening. As participants submit applications through the public summit registration portal, they will populate here in real time.
                </p>
                <div className="pt-2">
                  <Link href="/register">
                    <Button variant="primary" size="sm" className="text-xs">
                      Submit a Test Registration
                    </Button>
                  </Link>
                </div>
              </div>
            ) : filteredRecords.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="text-sm text-[#4a5752] font-medium">
                  No registrations match your current search or filter criteria.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedTrack("all");
                    setPickupFilter("all");
                  }}
                  className="text-xs text-[#b24e2b] font-semibold underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                {/* Mobile Card Layout (< md viewports) */}
                <div className="block md:hidden divide-y divide-[#ede7db]">
                  {filteredRecords.map((r) => (
                    <div key={r.id} className="p-4 sm:p-5 space-y-3 hover:bg-[#faf8f4] transition-colors">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono font-bold text-xs text-[#103327] bg-[#ede7db] px-2 py-0.5 rounded">
                          {r.referenceId}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {r.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-base text-[#103327]">
                          {r.fullName}
                        </h4>
                        <p className="text-xs text-[#7e8d87] mt-0.5">
                          {r.designation} • {r.organization}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f7f4ec] text-[#8c671b] border border-[#ede7db]">
                          {r.categoryTitle}
                        </span>
                        {r.preferredTrack && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
                            {r.preferredTrack}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[#4a5752] space-y-0.5 font-mono">
                        <div className="truncate">{showMaskedContacts ? maskEmail(r.email) : r.email}</div>
                        <div>{showMaskedContacts ? maskPhone(r.phone) : r.phone}</div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#ede7db]">
                        <span className="text-[11px] text-[#7e8d87]">
                          {new Date(r.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openDetailsModal(r)}
                            className="px-3 py-1.5 rounded-lg bg-[#f7f4ec] hover:bg-[#ede7db] text-[#143e30] font-semibold text-xs flex items-center gap-1 border border-[#dfd6c4]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setRecordToDelete(r)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop & Tablet Table Layout (>= md viewports) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#faf8f4] border-b border-[#ede7db] text-[#7e8d87] font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">Reference ID</th>
                      <th className="py-3.5 px-4">Applicant / Rep</th>
                      <th className="py-3.5 px-4">Registration Category</th>
                      <th className="py-3.5 px-4">Preferred Track</th>
                      <th className="py-3.5 px-4">Organization</th>
                      <th className="py-3.5 px-4">Contact Coordinates</th>
                      <th className="py-3.5 px-4">Project / Team</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ede7db]">
                    {filteredRecords.map((r) => (
                      <tr
                        key={r.id}
                        className="hover:bg-[#fcfbf8] transition-colors group"
                      >
                        {/* Reference ID */}
                        <td className="py-3.5 px-4 font-mono font-bold text-[#103327] whitespace-nowrap">
                          {r.referenceId}
                        </td>

                        {/* Applicant Name */}
                        <td className="py-3.5 px-4 font-semibold text-[#161e1b] whitespace-nowrap">
                          <div>{r.fullName}</div>
                          <div className="text-[11px] text-[#7e8d87] font-normal font-sans">
                            {r.designation}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#faf8f4] border border-[#ede7db] text-[#161e1b]">
                            {r.categoryTitle}
                          </span>
                        </td>

                        {/* Preferred Track */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200">
                            {r.preferredTrack || "Not provided"}
                          </span>
                        </td>

                        {/* Organization */}
                        <td className="py-3.5 px-4 text-[#4a5752] max-w-[160px] truncate" title={r.organization}>
                          {r.organization}
                        </td>

                        {/* Contact (masked toggle) */}
                        <td className="py-3.5 px-4 font-mono text-[11px] whitespace-nowrap text-[#4a5752]">
                          <div>{showMaskedContacts ? maskEmail(r.email) : r.email}</div>
                          <div className="text-[10px] text-[#7e8d87]">
                            {showMaskedContacts ? maskPhone(r.phone) : r.phone}
                          </div>
                        </td>

                        {/* Project / Team */}
                        <td className="py-3.5 px-4 text-[#4a5752] max-w-[160px]">
                          {r.teamName ? (
                            <div>
                              <strong className="text-[#103327] block text-[11px] truncate" title={r.teamName}>
                                {r.teamName}
                              </strong>
                              <span className="text-[10px] text-[#7e8d87]">
                                ({r.teamMembers ? r.teamMembers.length + 1 : 1} members)
                              </span>
                            </div>
                          ) : r.projectName ? (
                            <div className="truncate text-[11px]" title={r.projectName}>
                              {r.projectName}
                            </div>
                          ) : (
                            <span className="text-[#a0b0aa]">—</span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-[#7e8d87] whitespace-nowrap text-[11px]">
                          {new Date(r.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        {/* Status: Strictly "Registered" */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {r.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openDetailsModal(r)}
                              className="p-1.5 rounded-lg text-[#143e30] hover:bg-[#ede7db] transition-colors"
                              title="View complete registration details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setRecordToDelete(r)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Permanently delete registration"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
            </div>
          </section>
        </Container>
      </main>

      {/* ========================================================
          REGISTRATION DETAILS MODAL (7 SECTIONS + INTERNAL NOTES)
         ======================================================== */}
      {selectedRecord && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
        >
          <div className="bg-[#fcfbf8] rounded-3xl max-w-3xl w-full p-4 sm:p-6 md:p-8 border border-[#e6dfd1] shadow-2xl relative max-h-[92vh] overflow-y-auto space-y-6 text-left">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#ede7db] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-sm text-[#103327] bg-[#ede7db] px-2 py-0.5 rounded">
                    {selectedRecord.referenceId}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Status: {selectedRecord.status}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#103327]">
                  {selectedRecord.fullName}
                </h3>
                <p className="text-xs text-[#7e8d87]">
                  {selectedRecord.designation} at {selectedRecord.organization}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="p-2 rounded-xl text-[#7e8d87] hover:bg-[#ede7db] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preferred Summit Track Banner Card */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#16503c] block">
                  Preferred Summit Track (Applicant Preference)
                </span>
                <div className="font-serif font-bold text-lg text-[#103327] mt-0.5">
                  {selectedRecord.preferredTrack || "Not provided"}
                </div>
                <p className="text-[11px] text-[#4a5752] mt-0.5">
                  Thematic vertical preference indicated by applicant. Final cohort placement confirmed by summit track chairs.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-emerald-200 text-emerald-900 shadow-xs">
                  {selectedRecord.preferredTrack ? "Track Selected" : "Legacy Record"}
                </span>
              </div>
            </div>

            {/* 1. Applicant Identity & Contact Coordinates */}
            <div className="p-4 rounded-2xl bg-white border border-[#ede7db] space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#103327] border-b border-[#ede7db] pb-1.5">
                1. Identity &amp; Contact Coordinates
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#7e8d87] block">Registration Category:</span>
                  <span className="font-semibold text-[#103327]">{selectedRecord.categoryTitle}</span>
                </div>
                <div>
                  <span className="text-[#7e8d87] block">Full Name:</span>
                  <strong>{selectedRecord.fullName}</strong>
                </div>
                <div>
                  <span className="text-[#7e8d87] block">Email:</span>
                  <span className="font-mono">{showMaskedContacts ? maskEmail(selectedRecord.email) : selectedRecord.email}</span>
                </div>
                <div>
                  <span className="text-[#7e8d87] block">Phone:</span>
                  <span className="font-mono">{showMaskedContacts ? maskPhone(selectedRecord.phone) : selectedRecord.phone}</span>
                </div>
                <div>
                  <span className="text-[#7e8d87] block">Location:</span>
                  <span>{selectedRecord.city}, {selectedRecord.state}, {selectedRecord.country}</span>
                </div>
                {selectedRecord.linkedInUrl && (
                  <div>
                    <span className="text-[#7e8d87] block">LinkedIn:</span>
                    <a
                      href={selectedRecord.linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#143e30] underline inline-flex items-center gap-1"
                    >
                      {selectedRecord.linkedInUrl} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                {selectedRecord.alternatePhone && (
                  <div>
                    <span className="text-[#7e8d87] block">Alternate Phone:</span>
                    <span className="font-mono">{showMaskedContacts ? maskPhone(selectedRecord.alternatePhone) : selectedRecord.alternatePhone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Startup / Project Information (if applicable) */}
            {(selectedRecord.projectName || selectedRecord.projectDescription) && (
              <div className="p-4 rounded-2xl bg-white border border-[#ede7db] space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#103327] border-b border-[#ede7db] pb-1.5">
                  2. Innovation &amp; Startup Information
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[#7e8d87] block">Project / Startup Name:</span>
                    <strong className="text-sm">{selectedRecord.projectName}</strong>
                  </div>
                  {selectedRecord.developmentStage && (
                    <div>
                      <span className="text-[#7e8d87] block">Development Stage:</span>
                      <span className="text-[#8c671b] font-semibold">{selectedRecord.developmentStage}</span>
                    </div>
                  )}
                  {selectedRecord.projectDescription && (
                    <div>
                      <span className="text-[#7e8d87] block">Description:</span>
                      <p className="text-[#4a5752] leading-relaxed">{selectedRecord.projectDescription}</p>
                    </div>
                  )}
                  {selectedRecord.problemStatement && (
                    <div>
                      <span className="text-[#7e8d87] block">Problem Statement:</span>
                      <p className="text-[#4a5752] leading-relaxed">{selectedRecord.problemStatement}</p>
                    </div>
                  )}
                  {selectedRecord.proposedSolution && (
                    <div>
                      <span className="text-[#7e8d87] block">Proposed Solution:</span>
                      <p className="text-[#4a5752] leading-relaxed">{selectedRecord.proposedSolution}</p>
                    </div>
                  )}
                  {selectedRecord.pitchDeckUrl && (
                    <div>
                      <span className="text-[#7e8d87] block">Pitch Deck / Material URL:</span>
                      <a
                        href={selectedRecord.pitchDeckUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#143e30] underline inline-flex items-center gap-1 font-mono"
                      >
                        {selectedRecord.pitchDeckUrl} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. Team or Group Details (if applicable) */}
            {((selectedRecord.teamMembers && selectedRecord.teamMembers.length > 0) ||
              (selectedRecord.groupAttendees && selectedRecord.groupAttendees.length > 0)) && (
              <div className="p-4 rounded-2xl bg-white border border-[#ede7db] space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#103327] border-b border-[#ede7db] pb-1.5">
                  3. Team Composition / Group Attendees
                </h4>
                <div className="space-y-2 text-xs">
                  {selectedRecord.teamName && (
                    <div>
                      <span className="text-[#7e8d87] block">Team Name:</span>
                      <strong>{selectedRecord.teamName}</strong>
                    </div>
                  )}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[#7e8d87] block font-semibold">Registered Members:</span>
                    <div className="p-2 rounded-lg bg-[#faf8f4] border border-[#ede7db] flex items-center justify-between">
                      <div>
                        <strong>{selectedRecord.fullName}</strong> (Leader / Representative)
                      </div>
                      <span className="font-mono text-[#7e8d87]">{selectedRecord.email}</span>
                    </div>

                    {selectedRecord.teamMembers?.map((m) => (
                      <div
                        key={m.id}
                        className="p-2 rounded-lg bg-[#faf8f4] border border-[#ede7db] flex items-center justify-between"
                      >
                        <div>
                          <strong>{m.name}</strong> ({m.role})
                        </div>
                        <span className="font-mono text-[#7e8d87]">{m.email}</span>
                      </div>
                    ))}

                    {selectedRecord.groupAttendees?.map((g) => (
                      <div
                        key={g.id}
                        className="p-2 rounded-lg bg-[#faf8f4] border border-[#ede7db] flex items-center justify-between"
                      >
                        <div>
                          <strong>{g.name}</strong> (Group Attendee)
                        </div>
                        <span className="font-mono text-[#7e8d87]">{g.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Arrival / Departure & Transport Details */}
            <div className="p-4 rounded-2xl bg-white border border-[#ede7db] space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#103327] border-b border-[#ede7db] pb-1.5">
                4. Arrival &amp; Departure Logistics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#7e8d87] block">Arrival Mode:</span>
                  <strong>{selectedRecord.travel.arrivalMode}</strong>
                </div>
                <div>
                  <span className="text-[#7e8d87] block">Departure Mode:</span>
                  <strong>{selectedRecord.travel.departureMode}</strong>
                </div>
                <div>
                  <span className="text-[#7e8d87] block">Arrival Hub / Station:</span>
                  <span>{selectedRecord.travel.arrivalStationOrAirport || "Not Specified"}</span>
                </div>
                <div>
                  <span className="text-[#7e8d87] block">Departure Hub / Station:</span>
                  <span>{selectedRecord.travel.departureStationOrAirport || "Not Specified"}</span>
                </div>
                <div>
                  <span className="text-[#7e8d87] block">Arrival Date &amp; Time:</span>
                  <span>{selectedRecord.travel.arrivalDateTime || "Not Specified"}</span>
                </div>
                <div>
                  <span className="text-[#7e8d87] block">Departure Date &amp; Time:</span>
                  <span>{selectedRecord.travel.departureDateTime || "Not Specified"}</span>
                </div>
                {selectedRecord.travel.flightOrTrainNumber && (
                  <div className="sm:col-span-2">
                    <span className="text-[#7e8d87] block">Flight / Train Number:</span>
                    <span className="font-mono">{selectedRecord.travel.flightOrTrainNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 5. Pickup Request Details */}
            <div className="p-4 rounded-2xl bg-white border border-[#ede7db] space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#103327] border-b border-[#ede7db] pb-1.5">
                5. Airport / Station Pickup Request
              </h4>
              <div className="text-xs pt-1">
                <span className="text-[#7e8d87] block">Request Status:</span>
                <span className="font-bold text-[#103327] text-sm">
                  {selectedRecord.travel.pickupRequired
                    ? "YES — Shuttle Transit Requested"
                    : "NO — Self-Arranged"}
                </span>
                <p className="text-[11px] text-[#7e8d87] mt-1">
                  Note: Pickup requests are recorded for transport scheduling. Final dispatch timings are confirmed prior to event week based on flight and train batching.
                </p>
              </div>
            </div>

            {/* 6. Selected Event Days & Welcome Dinner Attendance */}
            <div className="p-4 rounded-2xl bg-white border border-[#ede7db] space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#103327] border-b border-[#ede7db] pb-1.5">
                6. Summit Days &amp; Welcome Dinner Attendance
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {selectedRecord.travel.attendanceDays.welcomeDinnerDec17 && (
                  <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
                    17 Dec: Welcome Dinner
                  </span>
                )}
                {selectedRecord.travel.attendanceDays.day1Dec18 && (
                  <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold">
                    18 Dec: Day 1 (Inaugural)
                  </span>
                )}
                {selectedRecord.travel.attendanceDays.day2Dec19 && (
                  <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold">
                    19 Dec: Day 2 (Pitches &amp; Gala)
                  </span>
                )}
                {selectedRecord.travel.attendanceDays.day3Dec20 && (
                  <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold">
                    20 Dec: Day 3 (Junicorn &amp; Eco-Trek)
                  </span>
                )}
              </div>
            </div>

            {/* 7. Registration Reference, Timestamp & Status */}
            <div className="p-4 rounded-2xl bg-white border border-[#ede7db] space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#103327] border-b border-[#ede7db] pb-1.5">
                7. Audit Reference &amp; Submission Metadata
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[#7e8d87] block">Reference ID:</span>
                  <strong className="font-mono text-[#103327]">{selectedRecord.referenceId}</strong>
                </div>
                <div>
                  <span className="text-[#7e8d87] block">Submission Timestamp:</span>
                  <span>{new Date(selectedRecord.createdAt).toLocaleString("en-IN")}</span>
                </div>
                <div>
                  <span className="text-[#7e8d87] block">Operational Status:</span>
                  <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {selectedRecord.status}
                  </span>
                </div>
              </div>
            </div>

            {/* PRIVATE ADMIN INTERNAL NOTES */}
            <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#dfd6c4] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-sm text-[#103327]">
                  Internal Administrative Notes (Private)
                </h4>
                <span className="text-[10px] text-[#8c671b] uppercase font-bold tracking-wider">
                  Admin Eyes Only
                </span>
              </div>
              <p className="text-[11px] text-[#7e8d87]">
                These notes are saved locally for organizing review. They are strictly private and never exposed to public pages, applicants, or CSV exports.
              </p>
              <textarea
                rows={3}
                value={activeNoteText}
                onChange={(e) => setActiveNoteText(e.target.value)}
                placeholder="Add private review remarks, dietary alerts, jury nominations, or campus accommodation notes..."
                className="w-full p-3 rounded-xl border border-[#e6dfd1] text-xs text-[#161e1b] bg-white focus:ring-2 focus:ring-[#143e30] focus:outline-none"
              />
              <div className="flex items-center justify-between">
                {noteSavedFeedback ? (
                  <span className="text-xs text-emerald-700 font-bold">
                    ✓ Notes updated successfully!
                  </span>
                ) : (
                  <span />
                )}
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                >
                  {isSavingNotes ? "Saving Notes..." : "Save Internal Notes"}
                </Button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#ede7db]">
              <button
                type="button"
                onClick={() => setRecordToDelete(selectedRecord)}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Record</span>
              </button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRecord(null)}
              >
                Close Details
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PERMANENT REGISTRATION DELETION DIALOG
         ======================================================== */}
      {recordToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
        >
          <div className="bg-[#ffffff] rounded-3xl max-w-md w-full p-5 sm:p-8 border border-rose-200 shadow-2xl relative text-left space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-xl text-[#103327]">
                Permanently Delete Registration?
              </h3>
              <p className="text-xs text-[#4a5752] mt-1.5 leading-relaxed">
                You are about to permanently delete registration record{" "}
                <strong className="font-mono text-rose-800">{recordToDelete.referenceId}</strong> for{" "}
                <strong>{recordToDelete.fullName}</strong> ({recordToDelete.organization}).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900">
              <strong>Warning:</strong> This action cannot be undone. The registration and associated team/travel records will be removed entirely from the database. Dashboard metrics will update immediately.
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ede7db]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRecordToDelete(null)}
              >
                Cancel
              </Button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:opacity-50 text-white font-bold text-xs tracking-wide transition-colors shadow-sm"
              >
                {isDeleting ? "Deleting..." : "Permanently Delete Registration"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
