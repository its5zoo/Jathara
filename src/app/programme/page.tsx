import type { Metadata } from "next";
import { ProgrammeClient } from "@/components/programme/ProgrammeClient";

export const metadata: Metadata = {
  title: "Event Programme & 3-Day Schedule",
  description: "Official 3-day schedule for ISF Startup Jathara 2026 (18–20 December 2026, GIET University, Gunupur). Draft brochure sessions including Healthcare, Agri-Food, Junicorn Pitches, and Dandakaranya Forest Trek.",
};

export default function ProgrammePage() {
  return <ProgrammeClient />;
}
