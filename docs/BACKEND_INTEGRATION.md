# ISF STARTUP JATHARA 2026 — FUTURE BACKEND INTEGRATION ARCHITECTURE

## 1. Overview
The current phase implements a strictly presentation-pure, typed frontend. This document specifies the precise integration interfaces for the upcoming Phase 2 backend using:
- **Authentication**: Firebase Authentication (Email/Password, Phone OTP, Google OAuth)
- **Database**: Cloud Firestore (NoSQL Document Store)
- **Media & File Storage**: Cloudinary (Pitch deck PDFs, Founder portraits, Exhibition asset photos)
- **Cloud Functions / Trusted Server Operations**: Node.js microservices for ticket generation, QR validation, and transactional notifications.

---

## 2. Proposed Cloud Firestore Schema

### Collection: `users/{userId}`
Represents authenticated profiles across all roles:
```typescript
interface UserDocument {
  uid: string;
  email: string;
  phoneNumber?: string;
  displayName: string;
  role: "founder" | "investor" | "corporate_delegate" | "speaker_mentor" | "student_maker" | "admin" | "volunteer";
  organizationName?: string;
  designation?: string;
  bio?: string;
  avatarUrl?: string; // Cloudinary URL
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}
```

### Collection: `registrations/{registrationId}`
Represents official ticket / delegation requests:
```typescript
interface RegistrationDocument {
  id: string;
  userId: string;
  categorySlug: "startup-founder" | "junicorn-youth" | "investor-fund" | "corporate-delegate" | "speaker-mentor" | "general-attendee";
  status: "pending_review" | "approved" | "confirmed" | "rejected" | "waitlisted";
  paymentStatus?: "free_grant" | "paid" | "waived";
  ticketCode: string; // Unique cryptographic barcode string
  qrCodeUrl: string; // Generated Cloudinary secure asset
  travelHubSelection?: string; // 'hub-vtz' | 'hub-rgda' | etc.
  accommodationRequested: boolean;
  accommodationAllocated?: string;
  submittedAt: FirebaseFirestore.Timestamp;
  approvedAt?: FirebaseFirestore.Timestamp;
}
```

### Collection: `startups/{startupId}`
Represents startup profiles applying for exhibition or pitching:
```typescript
interface StartupDocument {
  id: string;
  founderUserId: string;
  startupName: string;
  verticalId: "vert-health" | "vert-agri" | "vert-junicorn" | "vert-sustainable" | "vert-gcc";
  stage: "idea_prototype" | "mvp" | "early_traction" | "scaling";
  isTribalOrRural: boolean;
  stateOrDistrict: string;
  pitchDeckPdfUrl: string; // Cloudinary signed asset
  logoUrl?: string; // Cloudinary image
  isJunicornTrack: boolean;
  evaluationScore?: number;
  pitchShortlisted: boolean;
  allocatedKioskNumber?: string;
  createdAt: FirebaseFirestore.Timestamp;
}
```

---

## 3. Cloudinary Integration Architecture
To prevent unauthenticated public writes, Cloudinary asset uploads will occur via signed upload presets:
1. Client requests a signed signature from a secure serverless endpoint (`/api/uploads/sign`).
2. Client uploads directly to Cloudinary using the secure signature.
3. Server receives a webhook confirmation or document update linking the secure asset URL.
4. Auto-optimization pipeline applies standard transformations: `f_auto,q_auto,w_800` for speaker images, and raw asset protection for pitch deck PDFs.

---

## 4. Role-Based Access Control (RBAC) Matrix
- **Admins**: Full read/write across all collections, approvals, and allocation desks.
- **Founders**: Read public content; create/update their own startup profile and registration document.
- **Investors**: Read approved startup deal dossiers and executive summaries; access closed-door roundtables.
- **Volunteers / Check-in Staff**: Read/update `registration.checkInStatus` via QR code scanner app.
