import type { Metadata } from "next";
import { Suspense } from "react";
import { RegistrationGatewayClient } from "@/components/registration/RegistrationGatewayClient";

export const metadata: Metadata = {
  title: "Registration Gateway & Categories",
  description: "Select your participation category for ISF Startup Jathara 2026 @ Dandakaranya. Tracks for Startup Founders, Junicorn Youth, Investors, Corporate Delegates, and Mentors.",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-24 text-center text-[#7e8d87]">Loading Registration Gateway...</div>}>
      <RegistrationGatewayClient />
    </Suspense>
  );
}
