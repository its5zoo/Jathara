import { createHash } from "node:crypto";
import { adminDb, getAdminDb } from "./admin";
import {
  RegistrationRecord,
  RegistrationFormData,
  RegistrationCategorySlug,
  GetRegistrationsQuery,
  DashboardMetrics,
} from "../types/registration";
import { AdminAuditLog } from "../types/admin";
import { registrationService, generateReferenceId } from "../services/registrationService";
import { resolveTrack } from "../config/tracks";

const REGISTRATIONS_COLLECTION = "registrations";
const AUDIT_LOGS_COLLECTION = "adminAuditLogs";
const EMAIL_CLAIMS_COLLECTION = "registrationEmailClaims";

function getDb() {
  return getAdminDb() || adminDb;
}

function getCategoryTitle(slug: RegistrationCategorySlug): string {
  switch (slug) {
    case "startup-founder":
      return "Startup Founders & Innovators";
    case "junicorn-youth":
      return "Student Innovators & Tribal Youth (Junicorn)";
    case "investor-fund":
      return "Investors, VCs & Angel Networks";
    case "corporate-delegate":
      return "Corporate, GCC & Industry Delegates";
    case "speaker-mentor":
      return "Mentors, Academicians & Sector Experts";
    case "general-attendee":
      return "Ecosystem Observers & Cultural Guests";
    default:
      return "Participant";
  }
}

/**
 * Creates a new registration document in Cloud Firestore.
 * Normalizes input, assigns a non-guessable reference ID, and sets status to "Registered".
 */
export async function createRegistrationDocument(
  formData: RegistrationFormData
): Promise<RegistrationRecord> {
  const categoryTitle = getCategoryTitle(formData.categorySlug);
  const now = new Date().toISOString();

  const canonicalTrack = resolveTrack(formData.preferredTrack);
  const preferredTrack = canonicalTrack
    ? canonicalTrack.title
    : (formData.preferredTrack || undefined);
  const preferredTrackSlug = canonicalTrack ? canonicalTrack.slug : undefined;

  const record: Omit<RegistrationRecord, "id" | "referenceId"> = {
    createdAt: now,
    status: "Registered",
    categorySlug: formData.categorySlug,
    categoryTitle,
    preferredTrack,
    preferredTrackSlug,

    fullName: formData.fullName.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim(),
    city: formData.city.trim(),
    state: formData.state.trim(),
    country: formData.country.trim(),
    organization: formData.organization.trim(),
    designation: formData.designation.trim(),
    linkedInUrl: formData.linkedInUrl?.trim() || undefined,
    alternatePhone: formData.alternatePhone?.trim() || undefined,

    registrationType: formData.registrationType || "individual",
    teamName: formData.teamName?.trim() || undefined,
    teamMembers: formData.teamMembers && formData.teamMembers.length > 0 ? formData.teamMembers : undefined,
    projectName: formData.projectName?.trim() || undefined,
    projectDescription: formData.projectDescription?.trim() || undefined,
    problemStatement: formData.problemStatement?.trim() || undefined,
    proposedSolution: formData.proposedSolution?.trim() || undefined,
    developmentStage: formData.developmentStage || undefined,
    projectWebsiteUrl: formData.projectWebsiteUrl?.trim() || undefined,
    institutionName: formData.institutionName?.trim() || undefined,
    pitchDeckUrl: formData.pitchDeckUrl?.trim() || undefined,

    fundName: formData.fundName?.trim() || undefined,
    investorAreasOfInterest: formData.investorAreasOfInterest?.trim() || undefined,
    investorParticipationExpectations: formData.investorParticipationExpectations?.trim() || undefined,

    corporateAreasOfInterest: formData.corporateAreasOfInterest?.trim() || undefined,
    corporateReasonForAttending: formData.corporateReasonForAttending?.trim() || undefined,
    corporatePreferredRoundtables: formData.corporatePreferredRoundtables?.trim() || undefined,

    mentorExpertise: formData.mentorExpertise?.trim() || undefined,
    mentorAreasOfInterest: formData.mentorAreasOfInterest?.trim() || undefined,
    mentorReasonForAttending: formData.mentorReasonForAttending?.trim() || undefined,
    mentorshipOrJuryInterest: formData.mentorshipOrJuryInterest ?? undefined,
    mentorPreferredRoundtables: formData.mentorPreferredRoundtables?.trim() || undefined,

    observerReasonForAttending: formData.observerReasonForAttending?.trim() || undefined,
    observerAreasOfInterest: formData.observerAreasOfInterest?.trim() || undefined,
    observerExpectations: formData.observerExpectations?.trim() || undefined,
    groupAttendees: formData.groupAttendees && formData.groupAttendees.length > 0 ? formData.groupAttendees : undefined,

    travel: {
      arrivalMode: formData.arrivalMode || "Not Decided",
      departureMode: formData.departureMode || "Not Decided",
      arrivalStationOrAirport: formData.arrivalStationOrAirport?.trim() || undefined,
      departureStationOrAirport: formData.departureStationOrAirport?.trim() || undefined,
      arrivalDateTime: formData.arrivalDateTime || undefined,
      departureDateTime: formData.departureDateTime || undefined,
      flightOrTrainNumber: formData.flightOrTrainNumber?.trim() || undefined,
      pickupRequired: Boolean(formData.pickupRequired),
      attendanceDays: {
        welcomeDinnerDec17: Boolean(formData.welcomeDinnerDec17),
        day1Dec18: Boolean(formData.day1Dec18),
        day2Dec19: Boolean(formData.day2Dec19),
        day3Dec20: Boolean(formData.day3Dec20),
      },
    },
  };

  const db = getDb();
  if (!db) {
    throw new Error(
      "Cloud Firestore is not initialized on the server. Please verify Firebase Admin environment credentials."
    );
  }

  // Concurrency-safe duplicate prevention using deterministic email claim document
  const normalizedEmail = formData.email.trim().toLowerCase();
  const emailHash = createHash("sha256").update(normalizedEmail).digest("hex");
  const claimRef = db.collection(EMAIL_CLAIMS_COLLECTION).doc(emailHash);

  // Run atomic Firestore transaction for concurrency protection
  const finalRecord = await db.runTransaction(async (transaction) => {
    // 1. Check existing email claim within transaction
    const claimDoc = await transaction.get(claimRef);
    if (claimDoc.exists) {
      const claimData = claimDoc.data();
      const claimTime = claimData?.createdAt ? new Date(claimData.createdAt).getTime() : 0;
      const diffMs = Date.now() - claimTime;

      // 5-minute duplicate safeguard window
      if (diffMs < 5 * 60 * 1000 && claimData?.referenceId) {
        const existingRegRef = db.collection(REGISTRATIONS_COLLECTION).doc(claimData.referenceId);
        const existingRegSnap = await transaction.get(existingRegRef);
        if (existingRegSnap.exists) {
          return {
            ...(existingRegSnap.data() as RegistrationRecord),
            id: existingRegSnap.id,
          };
        }
      }
    }

    // 2. Generate unique reference ID
    const referenceId = generateReferenceId(formData.categorySlug);
    const docRef = db.collection(REGISTRATIONS_COLLECTION).doc(referenceId);

    const recordToSave: RegistrationRecord = {
      ...record,
      id: referenceId,
      referenceId,
    };

    // 3. Atomically write registration document and email claim document
    transaction.set(claimRef, {
      referenceId,
      createdAt: now,
      categorySlug: formData.categorySlug,
    });

    transaction.set(docRef, removeUndefinedFields(recordToSave));

    return recordToSave;
  });

  return finalRecord;
}

function removeUndefinedFields<T>(obj: T): T {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj) || obj instanceof Date) {
    return obj;
  }
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (value === undefined) continue;
    if (value !== null && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date)) {
      cleaned[key] = removeUndefinedFields(value);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned as T;
}

/**
 * Computes authoritative summit metrics across the entire registrations collection
 * using a lightweight projected read that transfers only aggregation-critical fields.
 */
export async function calculateAuthoritativeMetricsFromDb(): Promise<DashboardMetrics> {
  const db = getDb();
  if (!db) {
    return registrationService.calculateMetrics([]);
  }

  try {
    const projectionSnap = await db
      .collection(REGISTRATIONS_COLLECTION)
      .select(
        "categorySlug",
        "preferredTrack",
        "registrationType",
        "teamMembers",
        "groupAttendees",
        "travel"
      )
      .get();

    const minimalRecords = projectionSnap.docs.map((doc) => doc.data() as RegistrationRecord);
    return registrationService.calculateMetrics(minimalRecords);
  } catch (err) {
    console.warn("[Firestore] Authoritative metrics projection failed, fallback:", err);
    return registrationService.calculateMetrics([]);
  }
}

/**
 * Retrieves registrations with database-backed aggregation count, bounded querying, filters, and authoritative live metrics.
 */
export async function getRegistrationsFromDb(query: GetRegistrationsQuery = {}): Promise<{
  registrations: RegistrationRecord[];
  total: number;
  filteredTotal: number;
  page: number;
  pageSize: number;
  totalPages: number;
  metrics: DashboardMetrics;
}> {
  const db = getDb();
  if (!db) {
    throw new Error("Cloud Firestore is not initialized on the server.");
  }

  let dbQuery = db.collection(REGISTRATIONS_COLLECTION).orderBy("createdAt", "desc");

  if (query.category && query.category !== "all") {
    dbQuery = dbQuery.where("categorySlug", "==", query.category);
  }

  let trackTitleToQuery: string | undefined = undefined;
  if (query.track && query.track !== "all") {
    const canonicalTrack = resolveTrack(query.track);
    trackTitleToQuery = canonicalTrack ? canonicalTrack.title : query.track;
    dbQuery = dbQuery.where("preferredTrack", "==", trackTitleToQuery);
  }

  // Bounded limit and pagination for query scalability
  const limit = Math.min(query.limit || 500, 1000);
  const offset = query.offset && query.offset > 0 ? query.offset : 0;
  if (offset > 0) {
    dbQuery = dbQuery.offset(offset);
  }

  let snapshot: FirebaseFirestore.QuerySnapshot;
  let usedFallback = false;

  try {
    snapshot = await dbQuery.limit(limit).get();
  } catch (err: unknown) {
    const isIndexMissing =
      (err as { code?: number })?.code === 9 ||
      (err instanceof Error &&
        (err.message.includes("requires an index") ||
          err.message.includes("FAILED_PRECONDITION")));

    if (isIndexMissing) {
      console.warn(
        "[Firestore] Composite index missing or building. Falling back to in-memory filtering to maintain uninterrupted service."
      );
      usedFallback = true;
      let fallbackQuery = db
        .collection(REGISTRATIONS_COLLECTION)
        .orderBy("createdAt", "desc");
      if (offset > 0) {
        fallbackQuery = fallbackQuery.offset(offset);
      }
      snapshot = await fallbackQuery.limit(limit).get();
    } else {
      throw err;
    }
  }

  // 1. Authoritative Total Collection Count via Firestore Server-Side Aggregation
  let totalCollectionCount = snapshot.size;
  try {
    const countSnap = await db.collection(REGISTRATIONS_COLLECTION).count().get();
    totalCollectionCount = countSnap.data().count;
  } catch (countErr) {
    console.warn("[Firestore] Aggregation count query fallback to snapshot size:", countErr);
  }

  const allRecords: RegistrationRecord[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as RegistrationRecord;
  });

  // Apply filtering (always safe, and handles fallback if composite index was pending)
  let filtered = allRecords;

  if (usedFallback) {
    if (query.category && query.category !== "all") {
      filtered = filtered.filter((r) => r.categorySlug === query.category);
    }
    if (trackTitleToQuery) {
      filtered = filtered.filter((r) => {
        const canonical = resolveTrack(r.preferredTrack);
        return (
          r.preferredTrack === trackTitleToQuery ||
          r.preferredTrack === query.track ||
          (canonical && canonical.title === trackTitleToQuery) ||
          r.preferredTrackSlug === query.track
        );
      });
    }
  }

  // Apply search filtering (including direct referenceId lookup optimization)
  if (query.search) {
    const q = query.search.toLowerCase().trim();
    filtered = filtered.filter((r) => {
      return (
        r.fullName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.organization.toLowerCase().includes(q) ||
        r.referenceId.toLowerCase().includes(q) ||
        (r.teamName && r.teamName.toLowerCase().includes(q)) ||
        (r.projectName && r.projectName.toLowerCase().includes(q))
      );
    });
  }

  if (query.pickup === "pickup-requested") {
    filtered = filtered.filter((r) => r.travel?.pickupRequired);
  } else if (query.pickup === "self-arranged") {
    filtered = filtered.filter((r) => !r.travel?.pickupRequired);
  }

  // Sort records according to requested sort option
  if (query.sortBy === "oldest") {
    filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else if (query.sortBy === "name") {
    filtered.sort((a, b) => a.fullName.localeCompare(b.fullName));
  } else {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // 2. Authoritative Dataset Metrics (calculated across all documents, not only the current page)
  const metrics = await calculateAuthoritativeMetricsFromDb();

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.max(1, Math.ceil(totalCollectionCount / limit));

  return {
    registrations: filtered,
    total: totalCollectionCount,
    filteredTotal: filtered.length,
    page: currentPage,
    pageSize: limit,
    totalPages,
    metrics,
  };
}

/**
 * Retrieves a single registration by Firestore Document ID or Reference ID
 */
export async function getRegistrationByIdFromDb(idOrRef: string): Promise<RegistrationRecord | null> {
  const db = getDb();
  if (!db) {
    throw new Error("Cloud Firestore is not initialized on the server.");
  }

  // Try direct ID lookup
  const docSnap = await db.collection(REGISTRATIONS_COLLECTION).doc(idOrRef).get();
  if (docSnap.exists) {
    return { id: docSnap.id, ...(docSnap.data() as Omit<RegistrationRecord, "id">) };
  }

  // Try Reference ID lookup
  const refQuery = await db
    .collection(REGISTRATIONS_COLLECTION)
    .where("referenceId", "==", idOrRef)
    .limit(1)
    .get();

  if (!refQuery.empty) {
    const refDoc = refQuery.docs[0];
    return { id: refDoc.id, ...(refDoc.data() as Omit<RegistrationRecord, "id">) };
  }

  return null;
}

/**
 * Updates internal admin notes for a registration
 */
export async function updateRegistrationNotesInDb(
  id: string,
  adminNotes: string
): Promise<RegistrationRecord | null> {
  const db = getDb();
  if (!db) {
    throw new Error("Cloud Firestore is not initialized on the server.");
  }

  const docRef = db.collection(REGISTRATIONS_COLLECTION).doc(id);
  const snap = await docRef.get();
  if (!snap.exists) {
    return null;
  }

  await docRef.update({
    adminNotes,
    updatedAt: new Date().toISOString(),
  });

  const updatedSnap = await docRef.get();
  return { id: updatedSnap.id, ...(updatedSnap.data() as Omit<RegistrationRecord, "id">) };
}

/**
 * Deletes a registration document permanently from Cloud Firestore
 */
export async function deleteRegistrationFromDb(id: string): Promise<boolean> {
  const db = getDb();
  if (!db) {
    throw new Error("Cloud Firestore is not initialized on the server.");
  }

  const docRef = db.collection(REGISTRATIONS_COLLECTION).doc(id);
  const snap = await docRef.get();
  if (!snap.exists) {
    return false;
  }

  await docRef.delete();
  return true;
}

/**
 * Records an administrative activity log in Cloud Firestore
 */
export async function recordAdminAuditLog(log: Omit<AdminAuditLog, "id">): Promise<void> {
  const db = getDb();
  if (!db) return;

  try {
    await db.collection(AUDIT_LOGS_COLLECTION).add({
      ...log,
      timestamp: log.timestamp || new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to record admin audit log:", err);
  }
}

/**
 * Retrieves recent administrative audit logs
 */
export async function getAdminAuditLogs(limitCount = 50): Promise<AdminAuditLog[]> {
  const db = getDb();
  if (!db) return [];

  try {
    const snap = await db
      .collection(AUDIT_LOGS_COLLECTION)
      .orderBy("timestamp", "desc")
      .limit(limitCount)
      .get();

    return snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<AdminAuditLog, "id">),
    }));
  } catch (err) {
    console.error("Failed to fetch admin audit logs:", err);
    return [];
  }
}
