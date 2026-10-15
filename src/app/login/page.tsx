import type { Metadata } from "next";
import { LoginPageClient } from "@/components/auth/LoginPageClient";

export const metadata: Metadata = {
  title: "Account Sign In | ISF Startup Jathara 2026",
  description: "Secure event management platform access for ISF Startup Jathara 2026.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginPageClient />;
}
