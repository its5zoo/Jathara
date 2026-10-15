import type { Metadata } from "next";
import { SuperAdminDashboard } from "@/components/admin/SuperAdminDashboard";

export const metadata: Metadata = {
  title: "Super Admin Dashboard | ISF Startup Jathara 2026",
  description: "Centralized Super Admin console for ISF Startup Jathara 2026 registration management, logistics, and summit analytics.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <SuperAdminDashboard />;
}
