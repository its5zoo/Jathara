import type { Metadata } from "next";
import { FAQPageClient } from "@/components/faq/FAQPageClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Official FAQ for ISF Startup Jathara 2026. Detailed answers regarding startup pitching, delegate registration, travel to GIET Gunupur, accommodation, and the 3-day schedule.",
};

export default function FAQPage() {
  return <FAQPageClient />;
}
