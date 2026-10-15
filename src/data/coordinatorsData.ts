export interface StudentCoordinator {
  id: string;
  name: string;
  role: string;
  initials: string;
  avatarColor: "forest" | "terracotta" | "gold" | "emerald";
  affiliation: string;
}

export const STUDENT_COORDINATORS: StudentCoordinator[] = [
  {
    id: "binayak-kumar-tripathy",
    name: "Binayak Kumar Tripathy",
    role: "Student Coordinator",
    initials: "BKT",
    avatarColor: "forest",
    affiliation: "GIET University Organising Team",
  },
  {
    id: "alok-kumar-padhi",
    name: "Alok Kumar Padhi",
    role: "Student Coordinator",
    initials: "AKP",
    avatarColor: "terracotta",
    affiliation: "GIET University Organising Team",
  },
  {
    id: "anshuman-nayak",
    name: "Anshuman Nayak",
    role: "Student Coordinator",
    initials: "AN",
    avatarColor: "gold",
    affiliation: "GIET University Organising Team",
  },
  {
    id: "subrat-jena",
    name: "Subrat Jena",
    role: "Student Coordinator",
    initials: "SJ",
    avatarColor: "emerald",
    affiliation: "GIET University Organising Team",
  },
];
