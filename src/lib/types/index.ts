export type SessionTrack = 
  | "all"
  | "Inaugural & Awards"
  | "Healthcare & Lifesciences"
  | "Agri & Food"
  | "Junicorn & Grassroots"
  | "Global Investors & GCC"
  | "Policy & Ecosystem"
  | "Eco-Trek & Cultural"
  | "Networking & Dining";

export type SessionType = 
  | "keynote"
  | "roundtable"
  | "pitch"
  | "ceremony"
  | "networking"
  | "outdoor"
  | "cultural";

export interface Session {
  id: string;
  timeSlot: string;
  startTime: string;
  endTime: string;
  title: string;
  track: SessionTrack;
  sessionType: SessionType;
  description: string;
  location: string;
  isTentative: boolean;
  speakerIds?: string[];
  capacityNote?: string;
}

export interface ProgrammeDay {
  id: string;
  dayNumber: number;
  dayName: string;
  dateFormatted: string;
  theme: string;
  status: "Draft" | "Confirmed" | "Tentative";
  statusNote: string;
  sessions: Session[];
}

export interface Speaker {
  id: string;
  name: string;
  designation: string;
  organization: string;
  track: SessionTrack;
  bio: string;
  isKeynote?: boolean;
  isConfirmed: boolean;
  photoUrl?: string;
  linkedInUrl?: string;
  statusLabel?: string;
}

export type OrganizationRole = 
  | "Organizer" 
  | "Host Institution" 
  | "Associated Innovation Foundation" 
  | "Ecosystem Partner";

export interface PartnerOrganization {
  id: string;
  name: string;
  abbreviation: string;
  role: OrganizationRole;
  website: string;
  description: string;
  highlights: string[];
  location: string;
  isPrimary: boolean;
  logoUrl?: string;
  logoAlt?: string;
  schoolName?: string;
  campusImageUrl?: string;
  accreditation?: string;
}

export interface StartupVertical {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  focusAreas: string[];
  iconName: string;
  targetParticipants: string;
}

export type TransitHubType = "airport" | "railway" | "road";

export interface TravelHub {
  id: string;
  name: string;
  code: string;
  type: TransitHubType;
  distanceKm: string;
  approxTravelTime: string;
  locationDetails: string;
  connectivityDescription: string;
  recommendedFor: string;
  verifiedStatus: string;
  routeSummary?: string;
  publicTransport?: string;
  mapDirectionsUrl?: string;
  operationalStatus?: string;
}

export interface RegistrationCategory {
  id: string;
  slug: string;
  title: string;
  targetAudience: string;
  shortDescription: string;
  highlights: string[];
  recommendedBadge?: string;
  statusText: string;
  actionAvailable: boolean;
}

export interface FAQItem {
  id: string;
  category: "General" | "Programme" | "Startups & Junicorn" | "Investors & Delegates" | "Travel & Stay" | "Registration";
  question: string;
  answer: string;
}

export interface EventMetadata {
  name: string;
  subTitle: string;
  edition: string;
  identity: string;
  dates: string;
  datesISO: {
    start: string;
    end: string;
  };
  venueName: string;
  venueCampus: string;
  venueCity: string;
  venueDistrict: string;
  venueState: string;
  venueCountry: string;
  organizer: string;
  hostInstitution: string;
  associatedInnovation: string;
  officialDraftDisclaimer: string;
  contactEmail: string;
  helplinePhone: string;
}

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

export * from "./registration";
export * from "./admin";
export * from "./cloudinary";
