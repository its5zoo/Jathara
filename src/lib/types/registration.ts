export type RegistrationCategorySlug =
  | "startup-founder"
  | "junicorn-youth"
  | "investor-fund"
  | "corporate-delegate"
  | "speaker-mentor"
  | "general-attendee";

import {
  OfficialTrackName,
  OFFICIAL_TRACK_NAMES,
  TrackSlug,
} from "@/lib/config/tracks";

export type PreferredTrack = OfficialTrackName;

export const PREFERRED_TRACKS: PreferredTrack[] = [
  ...OFFICIAL_TRACK_NAMES,
];


export type RegistrationType = "individual" | "team";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface GroupAttendee {
  id: string;
  name: string;
  email: string;
}

export type TravelMode = "Flight" | "Train" | "Road" | "Other" | "Not Decided";

export interface AttendanceDays {
  welcomeDinnerDec17: boolean;
  day1Dec18: boolean;
  day2Dec19: boolean;
  day3Dec20: boolean;
}

export interface TravelDetails {
  arrivalMode: TravelMode;
  departureMode: TravelMode;
  arrivalStationOrAirport?: string;
  departureStationOrAirport?: string;
  arrivalDateTime?: string;
  departureDateTime?: string;
  flightOrTrainNumber?: string;
  pickupRequired: boolean;
  attendanceDays: AttendanceDays;
}

export interface RegistrationRecord {
  id: string;
  referenceId: string;
  createdAt: string;
  status: "Registered";

  // Category
  categorySlug: RegistrationCategorySlug;
  categoryTitle: string;

  // Preferred Track Selection
  preferredTrack?: PreferredTrack | string;
  preferredTrackSlug?: TrackSlug;
  legacyTrackOriginalValue?: string;

  // Common identity
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  organization: string;
  designation: string;
  linkedInUrl?: string;
  alternatePhone?: string;

  // Startup Founders & Student Innovators
  registrationType?: RegistrationType;
  teamName?: string;
  teamMembers?: TeamMember[];
  projectName?: string;
  projectDescription?: string;
  problemStatement?: string;
  proposedSolution?: string;
  developmentStage?: string;
  projectWebsiteUrl?: string;
  institutionName?: string;
  pitchDeckUrl?: string;

  // Investors
  fundName?: string;
  investorAreasOfInterest?: string;
  investorParticipationExpectations?: string;

  // Corporate Delegates
  corporateAreasOfInterest?: string;
  corporateReasonForAttending?: string;
  corporatePreferredRoundtables?: string;

  // Mentors & Experts
  mentorExpertise?: string;
  mentorAreasOfInterest?: string;
  mentorReasonForAttending?: string;
  mentorshipOrJuryInterest?: boolean;
  mentorPreferredRoundtables?: string;

  // Ecosystem Observers & Cultural Guests
  observerReasonForAttending?: string;
  observerAreasOfInterest?: string;
  observerExpectations?: string;
  groupAttendees?: GroupAttendee[];

  // Travel & Attendance
  travel: TravelDetails;

  // Internal Admin Notes (never exposed publicly)
  adminNotes?: string;
}

export interface RegistrationFormData {
  // Category
  categorySlug: RegistrationCategorySlug;

  // Preferred Track Selection
  preferredTrack: PreferredTrack | "";

  // Common Identity
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  organization: string;
  designation: string;
  linkedInUrl: string;
  alternatePhone: string;

  // Startup / Student
  registrationType: RegistrationType;
  teamName: string;
  teamMembers: TeamMember[];
  projectName: string;
  projectDescription: string;
  problemStatement: string;
  proposedSolution: string;
  developmentStage: string;
  projectWebsiteUrl: string;
  institutionName: string;
  pitchDeckUrl: string;

  // Investor
  fundName: string;
  investorAreasOfInterest: string;
  investorParticipationExpectations: string;

  // Corporate
  corporateAreasOfInterest: string;
  corporateReasonForAttending: string;
  corporatePreferredRoundtables: string;

  // Mentor
  mentorExpertise: string;
  mentorAreasOfInterest: string;
  mentorReasonForAttending: string;
  mentorshipOrJuryInterest: boolean;
  mentorPreferredRoundtables: string;

  // Observer
  observerReasonForAttending: string;
  observerAreasOfInterest: string;
  observerExpectations: string;
  isGroupRegistration: boolean;
  groupAttendees: GroupAttendee[];

  // Travel & Attendance
  arrivalMode: TravelMode;
  departureMode: TravelMode;
  arrivalStationOrAirport: string;
  departureStationOrAirport: string;
  arrivalDateTime: string;
  departureDateTime: string;
  flightOrTrainNumber: string;
  pickupRequired: boolean;
  welcomeDinnerDec17: boolean;
  day1Dec18: boolean;
  day2Dec19: boolean;
  day3Dec20: boolean;
}

export interface DashboardMetrics {
  totalRegistrations: number;
  categoryBreakdown: Record<RegistrationCategorySlug, number>;
  preferredTrackBreakdown: Record<PreferredTrack, number>;
  unassignedTrackCount: number;
  individualCount: number;
  teamCount: number;
  totalTeamMembers: number;
  pickupRequestsCount: number;
  pickupRequestsPercentage: number;
  arrivalModesBreakdown: Record<TravelMode, number>;
  attendanceDaysCount: {
    welcomeDinnerDec17: number;
    day1Dec18: number;
    day2Dec19: number;
    day3Dec20: number;
  };
}

export interface CreateRegistrationResponse {
  success: boolean;
  referenceId: string;
  id: string;
  categoryTitle: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export interface GetRegistrationsQuery {
  category?: string;
  track?: string;
  pickup?: string;
  search?: string;
  sortBy?: "newest" | "oldest" | "name";
  limit?: number;
  offset?: number;
}

export interface GetRegistrationsResponse {
  registrations: RegistrationRecord[];
  total: number;
  filteredTotal?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  metrics: DashboardMetrics;
}
