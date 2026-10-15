import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact & Secretariat Desk",
  description: "Contact the ISF Startup Jathara 2026 secretariat and GIET University Gunupur campus coordination offices for institutional delegations, partnerships, and logistics.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
