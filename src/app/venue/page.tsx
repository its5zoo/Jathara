import type { Metadata } from "next";
import { VenueTravelClient } from "@/components/travel/VenueTravelClient";

export const metadata: Metadata = {
  title: "Venue & Travel Guide | GIET University, Gunupur",
  description: "Complete verified travel guide to GIET University, Gunupur, Odisha for ISF Startup Jathara 2026. Nearby airports (Visakhapatnam VTZ), railway stations (Rayagada, Palasa, Gunupur), highways, and campus accommodation.",
};

export default function VenuePage() {
  return <VenueTravelClient />;
}
