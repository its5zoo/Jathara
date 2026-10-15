"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * Renders the global Announcement Banner and Public SiteHeader only on public pages.
 * Suppresses them on administrative console routes (/admin) and dedicated login (/login).
 */
export function PublicHeaderWrapper() {
  const pathname = usePathname();
  const isExcluded = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  if (isExcluded) {
    return null;
  }

  return (
    <>
      <AnnouncementBanner />
      <SiteHeader />
    </>
  );
}

/**
 * Renders the public SiteFooter only on public pages.
 * Suppresses it on administrative console routes (/admin) and dedicated login (/login).
 */
export function PublicFooterWrapper() {
  const pathname = usePathname();
  const isExcluded = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  if (isExcluded) {
    return null;
  }

  return <SiteFooter />;
}
