"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Calendar,
  Building2,
  Mail,
} from "lucide-react";
import {
  signInSuperAdmin,
  sendAdminPasswordReset,
  signOutSuperAdmin,
} from "@/lib/firebase/auth";
import { safeFetch } from "@/lib/api/safeResponse";

export function LoginPageClient() {
  const router = useRouter();

  // Redirect to dashboard if an active session cookie is already present
  useEffect(() => {
    let isMounted = true;
    async function checkExistingSession() {
      try {
        const sessionResult = await safeFetch<{ authenticated?: boolean }>("/api/admin/auth/session");
        if (sessionResult.ok && sessionResult.data?.authenticated && isMounted) {
          router.replace("/admin");
        }
      } catch {
        // Keep login form active
      }
    }
    checkExistingSession();
    return () => {
      isMounted = false;
    };
  }, [router]);

  // Sign In Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot Password State
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetSubmitting, setIsResetSubmitting] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);
  const [resetErrorMessage, setResetErrorMessage] = useState<string | null>(null);

  // Email format validation helper
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  // Handle Login Submission
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address format.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Authenticate with Firebase Authentication
      const user = await signInSuperAdmin(trimmedEmail, password);
      const idToken = await user.getIdToken();

      // 2. Establish server-side HTTP-only session via existing API
      const sessionResult = await safeFetch<{
        success?: boolean;
        error?: string;
        user?: { email: string; uid: string; role: string };
      }>("/api/admin/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!sessionResult.ok || !sessionResult.data?.success) {
        // If not authorized for the console, sign out from client auth
        await signOutSuperAdmin().catch(() => {});
        throw new Error(
          sessionResult.errorMessage ||
            "Access denied. Your account is not authorized for the event management platform."
        );
      }

      // 3. Navigate to the authorized management console
      router.push("/admin");
    } catch (err: unknown) {
      console.error("[Sign In Error]:", err);

      let friendlyMessage = "Authentication failed. Please verify your credentials.";

      if (err instanceof Error) {
        const msg = err.message;
        const lower = msg.toLowerCase();
        if (
          lower.includes("auth/invalid-credential") ||
          lower.includes("auth/user-not-found") ||
          lower.includes("auth/wrong-password")
        ) {
          friendlyMessage = "Invalid email address or password. Please verify your credentials and try again.";
        } else if (lower.includes("auth/too-many-requests")) {
          friendlyMessage = "Too many failed attempts. For security, please wait a moment and try again.";
        } else if (lower.includes("auth/user-disabled")) {
          friendlyMessage = "This account has been deactivated. Please contact the summit administration.";
        } else if (
          lower.includes("auth/network-request-failed") ||
          lower.includes("failed to fetch") ||
          lower.includes("network error")
        ) {
          friendlyMessage = "Network error. Please check your internet connection and try again.";
        } else if (
          lower.includes("unexpected end of json") ||
          lower.includes("failed to execute 'json'") ||
          lower.includes("json parse")
        ) {
          friendlyMessage = "Authentication service returned an unexpected response. Please verify backend environment configuration.";
        } else {
          friendlyMessage = msg;
        }
      }

      setErrorMessage(friendlyMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Forgot Password Submission
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetErrorMessage(null);
    setResetSuccessMessage(null);

    const trimmedEmail = resetEmail.trim();
    if (!trimmedEmail) {
      setResetErrorMessage("Please enter your registered email address.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setResetErrorMessage("Please enter a valid email address format.");
      return;
    }

    setIsResetSubmitting(true);

    try {
      await sendAdminPasswordReset(trimmedEmail);
      setResetSuccessMessage(
        "A password recovery link has been dispatched to your email address. Please follow the instructions in the email."
      );
    } catch (err: unknown) {
      console.error("[Password Reset Error]:", err);
      let friendlyMessage = "Unable to dispatch password reset link. Please verify the email address.";
      if (err instanceof Error && err.message.includes("auth/too-many-requests")) {
        friendlyMessage = "Too many reset requests. Please wait a few minutes before trying again.";
      }
      setResetErrorMessage(friendlyMessage);
    } finally {
      setIsResetSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#fcfbf8] text-[#161e1b] selection:bg-[#be9740]/30 selection:text-[#071711]">
      
      {/* ========================================================
          LEFT SECTION: INSTITUTIONAL IDENTITY & CAMPUS PHOTOGRAPHY
         ======================================================== */}
      <section className="lg:w-[52%] xl:w-[56%] relative flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 text-[#fcfbf8] overflow-hidden bg-[#071711] min-h-[420px] lg:min-h-screen">
        {/* Authentic Host University Photograph Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/giet-school-of-engineering.jpg"
            alt="GIET University School of Engineering Campus, Gunupur, Odisha"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Deep Forest Green Overlay to maintain pristine text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071711] via-[#071711]/85 to-[#071711]/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071711]/95 via-[#071711]/80 to-transparent" />
        </div>

        {/* Foreground Content Container */}
        <div className="relative z-10 flex flex-col justify-between h-full space-y-10 lg:space-y-12">
          
          {/* Top Bar: Brand Insignias & Summit Return Link */}
          <div className="flex items-center justify-between gap-4">
            {/* Dual Brand Crests in Crisp White Rounded Wells */}
            <div className="flex items-center gap-2.5 sm:gap-3 bg-white/10 p-1.5 sm:p-2 rounded-2xl border border-white/20 backdrop-blur-md shadow-lg">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-xs">
                <Image
                  src="/logos/isf-logo.webp"
                  alt="International Startup Foundation (ISF) Logo"
                  width={32}
                  height={32}
                  className="max-h-7 max-w-7 w-auto h-auto object-contain"
                />
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-xs">
                <Image
                  src="/logos/giet-logo.png"
                  alt="GIET University Crest"
                  width={32}
                  height={32}
                  className="max-h-7 max-w-7 w-auto h-auto object-contain"
                />
              </div>
            </div>

            {/* Back to Public Summit Website Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#d6b25e] hover:text-[#fcfbf8] font-semibold bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-md transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Summit</span>
            </Link>
          </div>

          {/* Focal Institutional Identity & Event Messaging */}
          <div className="max-w-xl space-y-5 my-auto py-6 sm:py-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#be9740]/20 border border-[#be9740]/40 text-[#d6b25e] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#be9740] animate-pulse" />
              <span>ISF STARTUP JATHARA 2026</span>
            </div>

            <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#fcfbf8] tracking-tight leading-tight">
              ISF Startup Jathara 2026
            </h1>

            <p className="text-sm sm:text-base text-[#c8d1cd] leading-relaxed font-normal">
              An integrated platform for coordinating registrations, programmes, participants, and event operations.
            </p>

            {/* Institutional Platform Capabilities (Neutral, non-role-specific) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md space-y-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d6b25e]" />
                <h2 className="font-serif font-bold text-xs text-[#fcfbf8]">Unified Registry</h2>
                <p className="text-[11px] text-[#a0b0aa] leading-snug">
                  Delegates, founders, and summit delegations across 8 official tracks.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md space-y-1.5">
                <Calendar className="w-4 h-4 text-[#d6b25e]" />
                <h2 className="font-serif font-bold text-xs text-[#fcfbf8]">Programme Flow</h2>
                <p className="text-[11px] text-[#a0b0aa] leading-snug">
                  Session agendas, cohort pitching schedules, and logistical timelines.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md space-y-1.5">
                <Building2 className="w-4 h-4 text-[#d6b25e]" />
                <h2 className="font-serif font-bold text-xs text-[#fcfbf8]">Academic Host</h2>
                <p className="text-[11px] text-[#a0b0aa] leading-snug">
                  Hosted at the scenic campus of GIET University, Gunupur, Odisha.
                </p>
              </div>
            </div>
          </div>

          {/* Institutional Credibility Footer Line */}
          <div className="pt-4 border-t border-white/15 text-xs text-[#a0b0aa]">
            <p>
              International Startup Foundation (ISF) • Host Campus: GIET University, Gunupur, Odisha
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================
          RIGHT SECTION: ENTERPRISE LOGIN FORM PANEL
         ======================================================== */}
      <section className="lg:w-[48%] xl:w-[44%] flex flex-col justify-center px-6 sm:px-12 lg:px-14 xl:px-16 py-12 sm:py-16 bg-[#fcfbf8]">
        <div className="w-full max-w-md mx-auto space-y-8">

          {/* Panel Header */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#be9740] block">
              ISF STARTUP JATHARA 2026
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#103327] tracking-tight">
              {isResetMode ? "Reset Password" : "Welcome Back"}
            </h2>
            <p className="text-xs sm:text-sm text-[#4a5752] leading-relaxed">
              {isResetMode
                ? "Enter your account email to receive a secure password recovery link."
                : "Access your account to continue to the event management platform."}
            </p>
          </div>

          {/* ========================================================
              LOGIN FORM (DEFAULT VIEW)
             ======================================================== */}
          {!isResetMode ? (
            <div className="space-y-6">
              
              {/* Error Alert Message */}
              {errorMessage && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5 animate-fade-in"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed font-medium">{errorMessage}</div>
                </div>
              )}

              {/* Form Section Heading */}
              <div className="pt-2 border-t border-[#ede7db]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7e8d87] block mb-4">
                  User Credentials
                </span>

                <form onSubmit={handleSignIn} className="space-y-4" noValidate>
                  {/* Field 1: Email Address */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="login-email"
                      className="block text-xs font-semibold text-[#103327]"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="login-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        aria-invalid={errorMessage ? "true" : "false"}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#dfd6c4] bg-white text-xs sm:text-sm text-[#161e1b] placeholder:text-[#a0b0aa] focus:outline-none focus:ring-2 focus:ring-[#143e30] focus:border-transparent transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Field 2: Password */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="login-password"
                        className="block text-xs font-semibold text-[#103327]"
                      >
                        Password
                      </label>
                      
                      {/* Secondary Action: Forgot Password */}
                      <button
                        type="button"
                        onClick={() => {
                          setResetEmail(email);
                          setErrorMessage(null);
                          setIsResetMode(true);
                        }}
                        disabled={isSubmitting}
                        className="text-xs font-medium text-[#c25e38] hover:text-[#a64e2d] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e38] rounded"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                        aria-invalid={errorMessage ? "true" : "false"}
                        className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-[#dfd6c4] bg-white text-xs sm:text-sm text-[#161e1b] placeholder:text-[#a0b0aa] focus:outline-none focus:ring-2 focus:ring-[#143e30] focus:border-transparent transition-all disabled:opacity-50"
                      />
                      
                      {/* Show/Hide Password Toggle */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        disabled={isSubmitting}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7e8d87] hover:text-[#103327] p-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143e30]"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Primary Action Button: Sign In */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide bg-[#103327] text-[#fcfbf8] hover:bg-[#164032] active:bg-[#0c281e] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-sm shadow-[#103327]/10 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#103327] focus-visible:ring-offset-2"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#be9740]" />
                          <span>Verifying Credentials...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Security & Access Protection Notice */}
              <div className="pt-4 border-t border-[#ede7db] text-[11px] text-[#7e8d87] space-y-2">
                <div className="flex items-center gap-1.5 text-[#103327] font-semibold">
                  <Lock className="w-3.5 h-3.5 text-[#be9740]" />
                  <span>Encrypted Platform Access</span>
                </div>
                <p className="leading-relaxed text-[#556961]">
                  Authorized personnel access only. Sessions are cryptographically verified and audited for event operations compliance.
                </p>
              </div>

            </div>
          ) : (
            
            /* ========================================================
                FORGOT PASSWORD VIEW
               ======================================================== */
            <div className="space-y-6 animate-fade-in">
              {resetSuccessMessage ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Recovery Link Dispatched</span>
                  </div>
                  <p className="leading-relaxed">{resetSuccessMessage}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(false);
                      setResetSuccessMessage(null);
                    }}
                    className="text-xs font-bold text-emerald-800 underline underline-offset-2"
                  >
                    ← Return to Sign In
                  </button>
                </div>
              ) : (
                <>
                  {resetErrorMessage && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>{resetErrorMessage}</div>
                    </div>
                  )}

                  <form onSubmit={handleResetPassword} className="space-y-4" noValidate>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="reset-email"
                        className="block text-xs font-semibold text-[#103327]"
                      >
                        Registered Account Email
                      </label>
                      <div className="relative">
                        <input
                          id="reset-email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="Enter your registered email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          disabled={isResetSubmitting}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#dfd6c4] bg-white text-xs sm:text-sm text-[#161e1b] placeholder:text-[#a0b0aa] focus:outline-none focus:ring-2 focus:ring-[#143e30] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        disabled={isResetSubmitting}
                        className="w-full sm:flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#103327] text-white hover:bg-[#164032] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isResetSubmitting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Sending Link...</span>
                          </>
                        ) : (
                          <>
                            <Mail className="w-3.5 h-3.5" />
                            <span>Send Recovery Link</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsResetMode(false);
                          setResetErrorMessage(null);
                        }}
                        disabled={isResetSubmitting}
                        className="w-full sm:w-auto py-2.5 px-4 rounded-xl font-medium text-xs text-[#7e8d87] hover:text-[#103327] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
