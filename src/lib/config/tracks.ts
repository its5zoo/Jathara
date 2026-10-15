/**
 * Canonical Eight-Track System Configuration
 * ISF Startup Jathara 2026 — Startup Jathara @ Dandakaranya
 * 
 * Authoritative single source of truth for the eight official summit tracks.
 * Used across frontend cards, registration forms, API schemas, Firestore queries,
 * admin analytics, and CSV exports.
 */

export interface SummitTrack {
  id: number;
  slug: TrackSlug;
  title: OfficialTrackName;
  description: string;
  subtitle: string;
  focusAreas: string[];
  targetParticipants: string;
  iconName: string;
  accentBg: string;
  accentBorder: string;
  iconBg: string;
  tagVariant: "forest" | "terracotta" | "gold" | "ivory";
  scheduleHint: string;
}

export type TrackSlug =
  | "agritech-food-safety"
  | "ai-quantum-technology"
  | "life-sciences-health-care"
  | "defence-aerospace-deep-tech"
  | "women-empowerment-social-inclusion"
  | "infrastructure"
  | "clean-energy-water-safety"
  | "fintech-edutech-tribaltech";

export type OfficialTrackName =
  | "Agritech & Food Safety"
  | "AI & Quantum Technology"
  | "Life Sciences & Health Care"
  | "Defence/Aerospace & Deep Tech"
  | "Women Empowerment & Social Inclusion"
  | "Infrastructure"
  | "Clean Energy & Water Safety"
  | "Fintech/Edutech/Tribaltech";

export const OFFICIAL_TRACKS: readonly SummitTrack[] = [
  {
    id: 1,
    slug: "agritech-food-safety",
    title: "Agritech & Food Safety",
    description:
      "Precision farming, smart irrigation, cold-chain logistics, crop protection, post-harvest processing, and farm-to-fork food safety verification.",
    subtitle: "Precision Farming, Cold Chain & Farm-to-Fork Verification",
    focusAreas: [
      "Precision farming & smallholder smart irrigation",
      "Cold-chain logistics & post-harvest processing",
      "Biological crop protection & organic yield tech",
      "Farm-to-fork quality testing & traceability",
    ],
    targetParticipants: "Agritech founders, food processing innovators, FPO leaders, testing labs",
    iconName: "Wheat",
    accentBg: "from-[#c25e38]/10 to-transparent",
    accentBorder: "border-[#c25e38]/40",
    iconBg: "bg-[#c25e38] text-white",
    tagVariant: "terracotta",
    scheduleHint: "Day 1 • Sector Roundtable B",
  },
  {
    id: 2,
    slug: "ai-quantum-technology",
    title: "AI & Quantum Technology",
    description:
      "Next-generation artificial intelligence, machine learning models, quantum computing, algorithmic systems, and cognitive deep tech.",
    subtitle: "Generative AI, Quantum Computing & Algorithmic Systems",
    focusAreas: [
      "Next-generation AI & foundational domain models",
      "Quantum computing algorithms & simulation tech",
      "Cognitive automation & edge intelligence",
      "High-performance deep tech infrastructure",
    ],
    targetParticipants: "AI researchers, quantum engineers, deep-tech architects, computational startups",
    iconName: "Cpu",
    accentBg: "from-[#143e30]/10 to-transparent",
    accentBorder: "border-[#143e30]/40",
    iconBg: "bg-[#143e30] text-[#fcfbf8]",
    tagVariant: "forest",
    scheduleHint: "Day 2 • Cognitive Deep Tech Expo",
  },
  {
    id: 3,
    slug: "life-sciences-health-care",
    title: "Life Sciences & Health Care",
    description:
      "Affordable healthcare diagnostics, biotechnology, telemedicine, point-of-care medical devices, and accessible rural healthcare.",
    subtitle: "Point-of-Care Diagnostics, Bio-Tech & Rural Clinical Access",
    focusAreas: [
      "Affordable point-of-care diagnostic devices",
      "Biotechnology & standardized herbal medicine",
      "Telemedicine platforms for underserved districts",
      "Affordable assistive medical tech & prosthetics",
    ],
    targetParticipants: "Bio-innovators, medical device engineers, public health pioneers, clinical startups",
    iconName: "Activity",
    accentBg: "from-[#0d281e]/10 to-transparent",
    accentBorder: "border-[#1b5341]/40",
    iconBg: "bg-[#0d281e] text-[#d6b25e]",
    tagVariant: "forest",
    scheduleHint: "Day 1 • Sector Roundtable A",
  },
  {
    id: 4,
    slug: "defence-aerospace-deep-tech",
    title: "Defence/Aerospace & Deep Tech",
    description:
      "Unmanned aerial systems (UAVs/drones), satellite systems, geospatial intelligence, cybersecurity, robotics, and strategic national technologies.",
    subtitle: "UAV Systems, Satellite Tech, Robotics & Strategic Defence",
    focusAreas: [
      "Unmanned aerial systems (UAVs) & autonomous drones",
      "Satellite tech & geospatial remote sensing",
      "Strategic national cybersecurity & cryptography",
      "Autonomous industrial robotics & sensor suites",
    ],
    targetParticipants: "Aerospace engineers, drone manufacturers, cybersecurity researchers, robotics founders",
    iconName: "Shield",
    accentBg: "from-[#103327]/10 to-transparent",
    accentBorder: "border-[#256f57]/40",
    iconBg: "bg-[#103327] text-white",
    tagVariant: "forest",
    scheduleHint: "Day 2 • Strategic Tech Forum",
  },
  {
    id: 5,
    slug: "women-empowerment-social-inclusion",
    title: "Women Empowerment & Social Inclusion",
    description:
      "Women-led rural enterprises, digital enablement for self-help groups (SHGs), assistive technology, and inclusive community livelihood platforms.",
    subtitle: "SHG Digitization, Livelihood Platforms & Inclusive Tech",
    focusAreas: [
      "Women-led rural enterprise acceleration",
      "Digital market enablement for SHG federations",
      "Assistive technology for persons with disabilities",
      "Community livelihood & indigenous artisan networks",
    ],
    targetParticipants: "Women entrepreneurs, social enterprise leaders, SHG mentors, inclusion advocates",
    iconName: "Users",
    accentBg: "from-[#be9740]/15 to-transparent",
    accentBorder: "border-[#be9740]/50",
    iconBg: "bg-[#8c671b] text-white",
    tagVariant: "gold",
    scheduleHint: "Day 1 • Inclusion Stage",
  },
  {
    id: 6,
    slug: "infrastructure",
    title: "Infrastructure",
    description:
      "Smart rural and urban infrastructure, green construction materials, resilient supply-chain hubs, clean mobility, and sustainable civil utilities.",
    subtitle: "Smart Utilities, Green Construction & Resilient Supply Hubs",
    focusAreas: [
      "Smart rural & semi-urban utility infrastructure",
      "Green construction materials & carbon-neutral cement",
      "Resilient logistics hubs & freight connectivity",
      "Clean electric mobility & transit networks",
    ],
    targetParticipants: "Civil tech innovators, logistics founders, green building specialists, transit startups",
    iconName: "Building2",
    accentBg: "from-[#256f57]/10 to-transparent",
    accentBorder: "border-[#256f57]/35",
    iconBg: "bg-[#164032] text-[#fcfbf8]",
    tagVariant: "forest",
    scheduleHint: "Day 2 • Civil & Mobility Hub",
  },
  {
    id: 7,
    slug: "clean-energy-water-safety",
    title: "Clean Energy & Water Safety",
    description:
      "Decentralized solar, bio-energy, clean grid storage, wastewater recycling, advanced water purification, and safe drinking water technology.",
    subtitle: "Decentralized Solar, Storage, Water Purification & Recycling",
    focusAreas: [
      "Decentralized solar mini-grids & biomass energy",
      "Next-generation battery storage & micro-grids",
      "Advanced water purification & arsenic removal",
      "Wastewater recycling & watershed conservation",
    ],
    targetParticipants: "Clean energy founders, water tech specialists, environmental engineers, sustainability leaders",
    iconName: "Zap",
    accentBg: "from-[#8c671b]/10 to-transparent",
    accentBorder: "border-[#8c671b]/40",
    iconBg: "bg-[#8c671b] text-[#fcfbf8]",
    tagVariant: "gold",
    scheduleHint: "Day 2 • Clean Tech Showcase",
  },
  {
    id: 8,
    slug: "fintech-edutech-tribaltech",
    title: "Fintech/Edutech/Tribaltech",
    description:
      "Micro-finance and rural banking, vernacular edtech platforms, vocational skilling, and indigenous tribal welfare technology.",
    subtitle: "Rural Banking, Vernacular Learning & Indigenous Welfare Tech",
    focusAreas: [
      "Micro-finance, credit access & rural digital banking",
      "Vernacular learning platforms & digital classrooms",
      "Vocational skill training & apprenticeship networks",
      "Indigenous tribal welfare & cultural heritage tech",
    ],
    targetParticipants: "Fintech builders, edtech founders, tribal development fellows, grassroots changemakers",
    iconName: "Coins",
    accentBg: "from-[#c25e38]/10 to-transparent",
    accentBorder: "border-[#c25e38]/35",
    iconBg: "bg-[#a64e2d] text-white",
    tagVariant: "terracotta",
    scheduleHint: "Day 1 • Grassroots Pitch Arena",
  },
] as const;

export const OFFICIAL_TRACK_SLUGS: readonly TrackSlug[] = OFFICIAL_TRACKS.map(
  (t) => t.slug
);

export const OFFICIAL_TRACK_NAMES: readonly OfficialTrackName[] = OFFICIAL_TRACKS.map(
  (t) => t.title
);

// Map legacy track values from old 5-track system to canonical tracks
export const LEGACY_TRACK_MAPPINGS: Record<
  string,
  {
    targetSlug: TrackSlug;
    targetTitle: OfficialTrackName;
    classification: "exact" | "ambiguous" | "unsupported";
    note: string;
  }
> = {
  "Agri-Tech & Food Systems": {
    targetSlug: "agritech-food-safety",
    targetTitle: "Agritech & Food Safety",
    classification: "exact",
    note: "Direct deterministic match to Track 1 (Agritech & Food Safety).",
  },
  "Healthcare & Lifesciences": {
    targetSlug: "life-sciences-health-care",
    targetTitle: "Life Sciences & Health Care",
    classification: "exact",
    note: "Direct deterministic match to Track 3 (Life Sciences & Health Care).",
  },
  "Junicorn & Grassroots Youth": {
    targetSlug: "fintech-edutech-tribaltech",
    targetTitle: "Fintech/Edutech/Tribaltech",
    classification: "ambiguous",
    note: "Legacy student/youth track. Most projects map to Track 8 or Track 5.",
  },
  "Sustainable Enterprise & Circularity": {
    targetSlug: "clean-energy-water-safety",
    targetTitle: "Clean Energy & Water Safety",
    classification: "ambiguous",
    note: "Legacy environmental track. Projects map to Track 7 (Clean Energy) or Track 6 (Infrastructure).",
  },
  "Global Investors & GCC Connect": {
    targetSlug: "fintech-edutech-tribaltech",
    targetTitle: "Fintech/Edutech/Tribaltech",
    classification: "unsupported",
    note: "Legacy institutional track now represented through delegate categories rather than sector tracks.",
  },
};

/**
 * Resolves a track by its slug
 */
export function getTrackBySlug(slug: string): SummitTrack | undefined {
  return OFFICIAL_TRACKS.find((t) => t.slug === slug);
}

/**
 * Resolves a track by its exact official title
 */
export function getTrackByName(title: string): SummitTrack | undefined {
  return OFFICIAL_TRACKS.find((t) => t.title.toLowerCase() === title.toLowerCase());
}

/**
 * Resolves an arbitrary string (slug, title, or legacy value) to a canonical SummitTrack
 */
export function resolveTrack(value: string | undefined | null): SummitTrack | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();

  // 1. Direct slug match
  const bySlug = OFFICIAL_TRACKS.find((t) => t.slug === trimmed.toLowerCase());
  if (bySlug) return bySlug;

  // 2. Direct title match
  const byTitle = OFFICIAL_TRACKS.find(
    (t) => t.title.toLowerCase() === trimmed.toLowerCase()
  );
  if (byTitle) return byTitle;

  // 3. Legacy mapping
  const legacy = LEGACY_TRACK_MAPPINGS[trimmed];
  if (legacy) {
    return getTrackBySlug(legacy.targetSlug);
  }

  return undefined;
}

/**
 * Checks if a string is a valid official track slug
 */
export function isValidTrackSlug(slug: string): slug is TrackSlug {
  return OFFICIAL_TRACK_SLUGS.includes(slug as TrackSlug);
}

/**
 * Checks if a string is a valid official track display name
 */
export function isValidTrackName(title: string): title is OfficialTrackName {
  return OFFICIAL_TRACK_NAMES.includes(title as OfficialTrackName);
}

/**
 * Canonical allowlist of all accepted values for new registrations (both slugs and official titles)
 */
export const ALLOWED_NEW_TRACK_VALUES: readonly string[] = [
  ...OFFICIAL_TRACK_SLUGS,
  ...OFFICIAL_TRACK_NAMES,
];
