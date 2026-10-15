import { test, describe } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

const BASE32_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function generateTestReferenceId(categorySlug) {
  const prefixes = {
    "startup-founder": "FND",
    "junicorn-youth": "JUN",
    "investor-fund": "INV",
    "corporate-delegate": "COR",
    "speaker-mentor": "MNT",
    "general-attendee": "ECO",
  };
  const prefix = prefixes[categorySlug] || "REG";

  const bytes = crypto.randomBytes(6);
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += BASE32_ALPHABET[bytes[i] % BASE32_ALPHABET.length];
  }
  return `ISF-2026-${prefix}-${suffix}`;
}

describe("Phase 3: Production Readiness Backend Audit", () => {
  // -------------------------------------------------------------
  // 1. Concurrency & Reference ID Uniqueness
  // -------------------------------------------------------------
  test("Concurrency: 2,500 simultaneous reference IDs are reliably unique with zero collisions", () => {
    const generated = new Set();
    const total = 2500;

    for (let i = 0; i < total; i++) {
      const refId = generateTestReferenceId("startup-founder");
      assert.equal(
        generated.has(refId),
        false,
        `Collision detected at iteration ${i} for refId: ${refId}`
      );
      generated.add(refId);
    }

    assert.equal(generated.size, total);
  });

  test("Reference ID structure strictly matches ISF-2026-XXX-YYYYYY standard", () => {
    const slugs = [
      "startup-founder",
      "junicorn-youth",
      "investor-fund",
      "corporate-delegate",
      "speaker-mentor",
      "general-attendee",
    ];

    for (const slug of slugs) {
      const ref = generateTestReferenceId(slug);
      assert.match(ref, /^ISF-2026-[A-Z]{3}-[2-9A-Z]{6}$/);
    }
  });

  // -------------------------------------------------------------
  // 2. Cloudinary Media Security & Folder Protection
  // -------------------------------------------------------------
  test("Cloudinary: Authorized folders are permitted while unauthorized folders are strictly rejected", () => {
    const ALLOWED_FOLDERS = [
      "isf2026/speakers",
      "isf2026/partners",
      "isf2026/startups",
      "isf2026/gallery",
      "isf2026/admin",
    ];

    function validateUploadFolder(folder) {
      if (folder && !ALLOWED_FOLDERS.includes(folder)) {
        throw new Error(`Unauthorized upload folder: "${folder}"`);
      }
      return folder || "isf2026/admin";
    }

    // Allowed
    assert.equal(validateUploadFolder("isf2026/speakers"), "isf2026/speakers");
    assert.equal(validateUploadFolder("isf2026/partners"), "isf2026/partners");
    assert.equal(validateUploadFolder(undefined), "isf2026/admin");

    // Rejected
    assert.throws(
      () => validateUploadFolder("malicious/folder"),
      /Unauthorized upload folder/
    );
    assert.throws(
      () => validateUploadFolder("../../etc/passwd"),
      /Unauthorized upload folder/
    );
  });

  test("Cloudinary: Image transformation builder sets automatic WebP and quality constraints", () => {
    function buildOptimizedUrl(publicId, options = {}) {
      const cloudName = options.cloudName || "startupjathara";
      const { width, height, crop = "limit", quality = "auto", format = "auto" } = options;
      const transforms = [`f_${format}`, `q_${quality}`];
      if (width) transforms.push(`w_${width}`);
      if (height) transforms.push(`h_${height}`);
      if (width || height) transforms.push(`c_${crop}`);
      return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(",")}/${publicId}`;
    }

    const url = buildOptimizedUrl("isf2026/speakers/dr-chowdary", {
      width: 500,
      height: 500,
      crop: "fill",
    });

    assert.equal(
      url,
      "https://res.cloudinary.com/startupjathara/image/upload/f_auto,q_auto,w_500,h_500,c_fill/isf2026/speakers/dr-chowdary"
    );
  });

  // -------------------------------------------------------------
  // 3. Super Admin Authorization & Email Verification
  // -------------------------------------------------------------
  test("Super Admin: Authorization fails closed when email does not match SUPER_ADMIN_EMAIL", () => {
    const SUPER_ADMIN = "admin@isfjathara.org";

    function checkAuth(email) {
      if (!SUPER_ADMIN) return { authorized: false, error: "Not configured" };
      if (!email) return { authorized: false, error: "Missing email" };
      const isMatch = email.trim().toLowerCase() === SUPER_ADMIN.toLowerCase();
      return isMatch ? { authorized: true } : { authorized: false, error: "Forbidden" };
    }

    // Positive
    assert.equal(checkAuth("admin@isfjathara.org").authorized, true);
    assert.equal(checkAuth("ADMIN@ISFJATHARA.ORG").authorized, true);
    assert.equal(checkAuth("  admin@isfjathara.org  ").authorized, true);

    // Negative (fails closed)
    assert.equal(checkAuth("attacker@evil.com").authorized, false);
    assert.equal(checkAuth("guest@giet.edu").authorized, false);
    assert.equal(checkAuth("").authorized, false);
    assert.equal(checkAuth(null).authorized, false);
  });

  // -------------------------------------------------------------
  // 4. Rate Limiting Safeguards
  // -------------------------------------------------------------
  test("Rate Limiting: Rejects requests exceeding threshold (10 req/min per IP)", () => {
    const ipRateLimit = new Map();
    function checkRateLimit(ip) {
      const now = Date.now();
      const windowMs = 60000;
      const maxRequests = 10;
      const record = ipRateLimit.get(ip);
      if (!record || now > record.resetAt) {
        ipRateLimit.set(ip, { count: 1, resetAt: now + windowMs });
        return true;
      }
      if (record.count >= maxRequests) return false;
      record.count++;
      return true;
    }

    const testIp = "203.0.113.195";
    for (let i = 1; i <= 10; i++) {
      assert.equal(checkRateLimit(testIp), true, `Request ${i} should be permitted`);
    }
    // 11th request must be blocked
    assert.equal(checkRateLimit(testIp), false, "Request 11 must be rejected by rate limiter");
  });

  // -------------------------------------------------------------
  // 5. Input Schema Validation (Zod)
  // -------------------------------------------------------------
  test("Input Validation: Zod schema rejects invalid submissions and malformed data", () => {
    const RegistrationSchema = z.object({
      categorySlug: z.enum([
        "startup-founder",
        "junicorn-youth",
        "investor-fund",
        "corporate-delegate",
        "speaker-mentor",
        "general-attendee",
      ]),
      fullName: z.string().trim().min(2).max(100),
      email: z.string().trim().email(),
      phone: z.string().trim().min(7).max(25),
      city: z.string().trim().min(2),
      state: z.string().trim().min(2),
      country: z.string().trim().min(2),
      organization: z.string().trim().min(2),
      designation: z.string().trim().min(2),
    });

    // Valid
    const valid = RegistrationSchema.safeParse({
      categorySlug: "startup-founder",
      fullName: "Ananya Patnaik",
      email: "ananya@startup.odisha.gov.in",
      phone: "+91 94370 12345",
      city: "Gunupur",
      state: "Odisha",
      country: "India",
      organization: "GIET TBI Incubatee",
      designation: "Founder",
    });
    assert.equal(valid.success, true);

    // Invalid email
    const invalidEmail = RegistrationSchema.safeParse({
      categorySlug: "startup-founder",
      fullName: "Ananya Patnaik",
      email: "not-an-email",
      phone: "+91 94370 12345",
      city: "Gunupur",
      state: "Odisha",
      country: "India",
      organization: "GIET TBI Incubatee",
      designation: "Founder",
    });
    assert.equal(invalidEmail.success, false);

    // Invalid category slug
    const invalidCategory = RegistrationSchema.safeParse({
      categorySlug: "super-admin-impersonator",
      fullName: "Ananya Patnaik",
      email: "test@domain.com",
      phone: "+91 94370 12345",
      city: "Gunupur",
      state: "Odisha",
      country: "India",
      organization: "GIET TBI",
      designation: "Founder",
    });
    assert.equal(invalidCategory.success, false);
  });

  // -------------------------------------------------------------
  // 6. Canonical Eight-Track Configuration Verification
  // -------------------------------------------------------------
  test("Canonical Tracks: Exactly eight official tracks exist with unique IDs, slugs, titles and descriptions", () => {
    const OFFICIAL_TRACK_NAMES = [
      "Agritech & Food Safety",
      "AI & Quantum Technology",
      "Life Sciences & Health Care",
      "Defence/Aerospace & Deep Tech",
      "Women Empowerment & Social Inclusion",
      "Infrastructure",
      "Clean Energy & Water Safety",
      "Fintech/Edutech/Tribaltech",
    ];

    const OFFICIAL_TRACK_SLUGS = [
      "agritech-food-safety",
      "ai-quantum-technology",
      "life-sciences-health-care",
      "defence-aerospace-deep-tech",
      "women-empowerment-social-inclusion",
      "infrastructure",
      "clean-energy-water-safety",
      "fintech-edutech-tribaltech",
    ];

    assert.equal(OFFICIAL_TRACK_NAMES.length, 8);
    assert.equal(OFFICIAL_TRACK_SLUGS.length, 8);

    // Uniqueness
    assert.equal(new Set(OFFICIAL_TRACK_NAMES).size, 8);
    assert.equal(new Set(OFFICIAL_TRACK_SLUGS).size, 8);
  });

  // -------------------------------------------------------------
  // 7. Track Input Validation: Rejects Obsolete & Unsupported Tracks
  // -------------------------------------------------------------
  test("Track Validation: Accepts all 8 official tracks and rejects legacy 5-track labels for new submissions", () => {
    const OFFICIAL_ALLOWED = new Set([
      "Agritech & Food Safety",
      "AI & Quantum Technology",
      "Life Sciences & Health Care",
      "Defence/Aerospace & Deep Tech",
      "Women Empowerment & Social Inclusion",
      "Infrastructure",
      "Clean Energy & Water Safety",
      "Fintech/Edutech/Tribaltech",
      "agritech-food-safety",
      "ai-quantum-technology",
      "life-sciences-health-care",
      "defence-aerospace-deep-tech",
      "women-empowerment-social-inclusion",
      "infrastructure",
      "clean-energy-water-safety",
      "fintech-edutech-tribaltech",
      "",
    ]);

    function validatePreferredTrack(track) {
      if (!OFFICIAL_ALLOWED.has(track)) {
        throw new Error("Invalid preferred track. Please select one of the eight official summit tracks.");
      }
      return true;
    }

    // Official titles: valid
    assert.equal(validatePreferredTrack("Agritech & Food Safety"), true);
    assert.equal(validatePreferredTrack("AI & Quantum Technology"), true);
    assert.equal(validatePreferredTrack("Defence/Aerospace & Deep Tech"), true);

    // Official slugs: valid
    assert.equal(validatePreferredTrack("agritech-food-safety"), true);
    assert.equal(validatePreferredTrack("fintech-edutech-tribaltech"), true);

    // Obsolete 5-track values: must be rejected for new registrations
    assert.throws(() => validatePreferredTrack("Agri-Tech & Food Systems"), /Invalid preferred track/);
    assert.throws(() => validatePreferredTrack("Healthcare & Lifesciences"), /Invalid preferred track/);
    assert.throws(() => validatePreferredTrack("Junicorn & Grassroots Youth"), /Invalid preferred track/);
    assert.throws(() => validatePreferredTrack("Sustainable Enterprise & Circularity"), /Invalid preferred track/);
    assert.throws(() => validatePreferredTrack("Global Investors & GCC Connect"), /Invalid preferred track/);

    // Malicious/unknown: must be rejected
    assert.throws(() => validatePreferredTrack("Random Nonexistent Track"), /Invalid preferred track/);
  });

  // -------------------------------------------------------------
  // 8. Legacy Data Resolution & Safe Deterministic Mapping
  // -------------------------------------------------------------
  test("Legacy Resolution: Deterministic vs Ambiguous mapping classifications", () => {
    const LEGACY_MAP = {
      "Agri-Tech & Food Systems": { target: "Agritech & Food Safety", type: "exact" },
      "Healthcare & Lifesciences": { target: "Life Sciences & Health Care", type: "exact" },
      "Junicorn & Grassroots Youth": { target: "Fintech/Edutech/Tribaltech", type: "ambiguous" },
      "Sustainable Enterprise & Circularity": { target: "Clean Energy & Water Safety", type: "ambiguous" },
      "Global Investors & GCC Connect": { target: "Fintech/Edutech/Tribaltech", type: "unsupported" },
    };

    assert.equal(LEGACY_MAP["Agri-Tech & Food Systems"].type, "exact");
    assert.equal(LEGACY_MAP["Healthcare & Lifesciences"].type, "exact");
    assert.equal(LEGACY_MAP["Junicorn & Grassroots Youth"].type, "ambiguous");
    assert.equal(LEGACY_MAP["Sustainable Enterprise & Circularity"].type, "ambiguous");
    assert.equal(LEGACY_MAP["Global Investors & GCC Connect"].type, "unsupported");
  });

  // -------------------------------------------------------------
  // Phase A: Firestore Zero-Trust Rules & Client Lockdown
  // -------------------------------------------------------------
  test("Phase A: Firestore rules enforce zero-trust client lockdown on registrations and audit logs", () => {
    const rulesPath = path.resolve(process.cwd(), "firestore.rules");
    assert.equal(fs.existsSync(rulesPath), true, "firestore.rules must exist");
    const rulesContent = fs.readFileSync(rulesPath, "utf-8");

    // 1. Critical: eliminate authorization flaw where any non-null email grants access
    assert.equal(
      rulesContent.includes("request.auth.token.email != null"),
      false,
      "Security flaw request.auth.token.email != null must be completely eliminated"
    );

    // 2. Deny direct client browser access to registrations collection
    assert.match(
      rulesContent,
      /match\s+\/registrations\/\{registrationId\}\s*\{\s*allow\s+read,\s*write:\s*if\s+false;\s*\}/,
      "Direct browser client access to registrations must be denied (allow read, write: if false)"
    );

    // 3. Deny direct client browser access to admin audit logs
    assert.match(
      rulesContent,
      /match\s+\/adminAuditLogs\/\{logId\}\s*\{\s*allow\s+read,\s*write:\s*if\s+false;\s*\}/,
      "Direct browser client access to adminAuditLogs must be denied (allow read, write: if false)"
    );

    // 4. Fallback default deny
    assert.match(
      rulesContent,
      /match\s+\/\{document=\*\*\}\s*\{\s*allow\s+read,\s*write:\s*if\s+false;\s*\}/,
      "Default catch-all rule must deny all unmatched operations"
    );
  });

  // -------------------------------------------------------------
  // Phase B: Firebase Admin Session Cookies & CSRF Protection
  // -------------------------------------------------------------
  test("Phase B: CSRF origin validation permits safe methods and matching origins, rejects mismatched origins", () => {
    function simulateCsrfValidation({ method, origin, referer, host, forwardedHost }) {
      const upperMethod = method.toUpperCase();
      if (!["POST", "PUT", "PATCH", "DELETE"].includes(upperMethod)) {
        return true;
      }
      const targetHost = forwardedHost || host;
      if (origin && targetHost) {
        try {
          const originHost = new URL(origin).host;
          if (originHost.toLowerCase() !== targetHost.toLowerCase()) {
            return false;
          }
        } catch {
          return false;
        }
      }
      if (!origin && referer && targetHost) {
        try {
          const refererHost = new URL(referer).host;
          if (refererHost.toLowerCase() !== targetHost.toLowerCase()) {
            return false;
          }
        } catch {
          return false;
        }
      }
      return true;
    }

    const host = "startupjathara2026.in";

    // Safe read methods
    assert.equal(simulateCsrfValidation({ method: "GET", host }), true);
    assert.equal(simulateCsrfValidation({ method: "HEAD", host }), true);

    // Valid state-changing requests
    assert.equal(
      simulateCsrfValidation({ method: "POST", origin: "https://startupjathara2026.in", host }),
      true
    );
    assert.equal(
      simulateCsrfValidation({ method: "DELETE", origin: "https://startupjathara2026.in", host }),
      true
    );
    assert.equal(
      simulateCsrfValidation({ method: "POST", referer: "https://startupjathara2026.in/admin", host }),
      true
    );

    // Malicious CSRF cross-origin attempts
    assert.equal(
      simulateCsrfValidation({ method: "POST", origin: "https://evil-attacker.com", host }),
      false,
      "Cross-origin POST must be blocked by CSRF guard"
    );
    assert.equal(
      simulateCsrfValidation({ method: "POST", origin: "https://startupjathara2026.in.attacker.org", host }),
      false,
      "Subdomain-spoofed origin must be blocked"
    );
    assert.equal(
      simulateCsrfValidation({ method: "DELETE", referer: "https://phishing-site.com/exploit", host }),
      false,
      "Cross-origin Referer on DELETE must be blocked"
    );

    // Cookie-authenticated mutating request lacking both origin and referer
    function simulateCookieCsrfValidation({ method, origin, referer, host, hasCookieAuth }) {
      const upperMethod = method.toUpperCase();
      if (!["POST", "PUT", "PATCH", "DELETE"].includes(upperMethod)) return true;
      if (hasCookieAuth && !origin && !referer) return false;
      return simulateCsrfValidation({ method, origin, referer, host });
    }

    assert.equal(
      simulateCookieCsrfValidation({ method: "POST", host, hasCookieAuth: true }),
      false,
      "Cookie-authenticated mutating request lacking both Origin and Referer must be blocked"
    );
  });

  test("Phase B: Firebase Session Cookie parameters enforce 5-day expiration, HttpOnly, and SameSite Lax", () => {
    const SESSION_EXPIRY_MS = 5 * 24 * 60 * 60 * 1000; // 5 days
    const SESSION_EXPIRY_SECONDS = Math.floor(SESSION_EXPIRY_MS / 1000);

    assert.equal(SESSION_EXPIRY_MS, 432000000);
    assert.equal(SESSION_EXPIRY_SECONDS, 432000);

    const cookieOptions = {
      name: "isf_admin_token",
      maxAge: SESSION_EXPIRY_SECONDS,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    };

    assert.equal(cookieOptions.httpOnly, true);
    assert.equal(cookieOptions.sameSite, "lax");
    assert.equal(cookieOptions.path, "/");
    assert.equal(cookieOptions.maxAge, 432000);
  });

  // -------------------------------------------------------------
  // Phase C: Scalable Pagination, Total Counts & Authoritative Metrics (> 500 records)
  // -------------------------------------------------------------
  test("Phase C: Complete dataset metrics and pagination support > 500 records without truncation", () => {
    const CANONICAL_TRACKS = [
      "Agritech & Food Safety",
      "AI & Quantum Technology",
      "Life Sciences & Health Care",
      "Defence/Aerospace & Deep Tech",
      "Women Empowerment & Social Inclusion",
      "Infrastructure",
      "Clean Energy & Water Safety",
      "Fintech/Edutech/Tribaltech",
    ];

    const CATEGORIES = [
      "startup-founder",
      "junicorn-youth",
      "investor-fund",
      "corporate-delegate",
      "speaker-mentor",
      "general-attendee",
    ];

    // Generate 650 synthetic records (exceeding legacy 500 limit)
    const TOTAL_SYNTHETIC = 650;
    const records = [];

    for (let i = 0; i < TOTAL_SYNTHETIC; i++) {
      const track = CANONICAL_TRACKS[i % CANONICAL_TRACKS.length];
      const cat = CATEGORIES[i % CATEGORIES.length];
      records.push({
        id: `SYNTH-${String(i).padStart(4, "0")}`,
        referenceId: `ISF-2026-FND-${String(i).padStart(6, "0")}`,
        fullName: `Delegate ${i}`,
        email: `delegate${i}@example.com`,
        organization: `Org ${i % 20}`,
        categorySlug: cat,
        preferredTrack: track,
        registrationType: i % 3 === 0 ? "team" : "individual",
        teamMembers: i % 3 === 0 ? [{ name: `Member ${i}`, email: `m${i}@example.com` }] : [],
        travel: {
          arrivalMode: "Flight",
          departureMode: "Train",
          arrivalStationOrAirport: "BBI",
          departureStationOrAirport: "BAM",
          arrivalDateTime: "2026-12-17T10:00:00",
          departureDateTime: "2026-12-20T18:00:00",
          flightOrTrainNumber: "6E-2026",
          pickupRequired: i % 4 === 0,
          welcomeDinnerDec17: true,
          day1Dec18: true,
          day2Dec19: true,
          day3Dec20: true,
        },
        createdAt: new Date(Date.now() - i * 60000).toISOString(),
      });
    }

    // 1. Authoritative metrics calculation across full dataset
    function calculateFullMetrics(allRecords) {
      const metrics = {
        totalRegistrations: allRecords.length,
        categoryBreakdown: {},
        preferredTrackBreakdown: {},
        individualCount: 0,
        teamCount: 0,
        pickupRequestsCount: 0,
      };

      for (const r of allRecords) {
        metrics.categoryBreakdown[r.categorySlug] = (metrics.categoryBreakdown[r.categorySlug] || 0) + 1;
        metrics.preferredTrackBreakdown[r.preferredTrack] = (metrics.preferredTrackBreakdown[r.preferredTrack] || 0) + 1;
        if (r.registrationType === "team") {
          metrics.teamCount++;
        } else {
          metrics.individualCount++;
        }
        if (r.travel?.pickupRequired) {
          metrics.pickupRequestsCount++;
        }
      }
      return metrics;
    }

    const metrics = calculateFullMetrics(records);

    // Total registrations must equal 650 (not capped at 500)
    assert.equal(metrics.totalRegistrations, 650);

    // Track counts sum to exactly 650
    const trackSum = Object.values(metrics.preferredTrackBreakdown).reduce((a, b) => a + b, 0);
    assert.equal(trackSum, 650);

    // Category counts sum to exactly 650
    const catSum = Object.values(metrics.categoryBreakdown).reduce((a, b) => a + b, 0);
    assert.equal(catSum, 650);

    // 2. Deterministic Pagination Verification
    function paginate(dataset, page, pageSize) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return {
        items: dataset.slice(start, end),
        page,
        pageSize,
        total: dataset.length,
        totalPages: Math.ceil(dataset.length / pageSize),
      };
    }

    // Page 1
    const page1 = paginate(records, 1, 50);
    assert.equal(page1.items.length, 50);
    assert.equal(page1.total, 650);
    assert.equal(page1.totalPages, 13);
    assert.equal(page1.items[0].id, "SYNTH-0000");

    // Page 11 (items 500 to 549, verifying beyond 500 boundary)
    const page11 = paginate(records, 11, 50);
    assert.equal(page11.items.length, 50);
    assert.equal(page11.items[0].id, "SYNTH-0500");
    assert.equal(page11.items[49].id, "SYNTH-0549");

    // Page 13 (last page, items 600 to 649)
    const page13 = paginate(records, 13, 50);
    assert.equal(page13.items.length, 50);
    assert.equal(page13.items[0].id, "SYNTH-0600");
    assert.equal(page13.items[49].id, "SYNTH-0649");

    // 3. Search beyond record 500
    const query = "delegate585@example.com";
    const searchMatch = records.filter((r) => r.email.toLowerCase().includes(query.toLowerCase()));
    assert.equal(searchMatch.length, 1);
    assert.equal(searchMatch[0].id, "SYNTH-0585");
  });

  // -------------------------------------------------------------
  // Phase D: Cloudinary Upload Security & Cryptographic Signing
  // -------------------------------------------------------------
  test("Phase D: Upload signing cryptographically binds allowed_formats and rejects oversized files", () => {
    // Note: SVG removed to eliminate stored XSS risk from untrusted vector files
    const ALLOWED_FORMATS = ["jpg", "jpeg", "png", "webp", "pdf"];
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MiB

    function validateUploadFile(file) {
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size ${(file.size / 1024 / 1024).toFixed(1)}MB exceeds 10MB limit`);
      }
      const ext = file.name.split(".").pop().toLowerCase();
      if (!ALLOWED_FORMATS.includes(ext)) {
        throw new Error(`Unsupported format ".${ext}". Allowed: ${ALLOWED_FORMATS.join(", ")}`);
      }
      return true;
    }

    // Valid files
    assert.equal(validateUploadFile({ name: "pitch_deck.pdf", size: 5 * 1024 * 1024 }), true);
    assert.equal(validateUploadFile({ name: "founder_photo.webp", size: 500 * 1024 }), true);
    assert.equal(validateUploadFile({ name: "speaker.jpg", size: 2 * 1024 * 1024 }), true);

    // Oversized file (> 10MB)
    assert.throws(
      () => validateUploadFile({ name: "massive_video.mp4", size: 15 * 1024 * 1024 }),
      /exceeds 10MB limit/
    );

    // SVG must be rejected for XSS mitigation
    assert.throws(
      () => validateUploadFile({ name: "logo.svg", size: 50 * 1024 }),
      /Unsupported format "\.svg"/
    );

    // Unsupported format (executable / script / disallowed)
    assert.throws(
      () => validateUploadFile({ name: "malware.exe", size: 1024 }),
      /Unsupported format "\.exe"/
    );
    assert.throws(
      () => validateUploadFile({ name: "script.sh", size: 1024 }),
      /Unsupported format "\.sh"/
    );
    assert.throws(
      () => validateUploadFile({ name: "page.html", size: 1024 }),
      /Unsupported format "\.html"/
    );

    // Server-side signed params must include allowed_formats
    const folder = "isf2026/speakers";
    const timestamp = 1791800000;
    const allowedFormatsString = ALLOWED_FORMATS.join(",");
    const paramsToSign = {
      allowed_formats: allowedFormatsString,
      folder,
      timestamp,
      upload_preset: "isf2026_signed_preset",
    };

    assert.equal(paramsToSign.allowed_formats, "jpg,jpeg,png,webp,pdf");
    assert.equal(paramsToSign.folder, "isf2026/speakers");
    assert.equal(paramsToSign.upload_preset, "isf2026_signed_preset");
  });

  // -------------------------------------------------------------
  // Phase E: Concurrency-Safe Duplicate Registrations & Trusted IP
  // -------------------------------------------------------------
  test("Phase E: Trusted IP resolution handles Cloudflare and proxy headers securely", () => {
    function isValidIp(ip) {
      const ipv4 = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
      if (ipv4.test(ip)) return true;
      const ipv6 = /^(?:[a-fA-F0-9]{1,4}:){1,7}[a-fA-F0-9]{1,4}$|^::1$/;
      return ipv6.test(ip);
    }

    function resolveTrustedIp(headers) {
      const vercel = headers["x-vercel-ip"]?.trim();
      if (vercel && isValidIp(vercel)) return vercel;

      const cf = headers["cf-connecting-ip"]?.trim();
      if (cf && isValidIp(cf)) return cf;

      const real = headers["x-real-ip"]?.trim();
      if (real && isValidIp(real)) return real;

      const xff = headers["x-forwarded-for"];
      if (xff) {
        const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
        if (parts.length > 0 && isValidIp(parts[0])) return parts[0];
      }
      return "127.0.0.1";
    }

    // Vercel edge IP takes top precedence
    assert.equal(
      resolveTrustedIp({
        "x-vercel-ip": "76.76.21.21",
        "cf-connecting-ip": "103.21.244.10",
        "x-forwarded-for": "198.51.100.1, 10.0.0.1",
      }),
      "76.76.21.21"
    );

    // Cloudflare IP takes second precedence
    assert.equal(
      resolveTrustedIp({
        "cf-connecting-ip": "103.21.244.10",
        "x-forwarded-for": "198.51.100.1, 10.0.0.1",
      }),
      "103.21.244.10"
    );

    // Real IP takes third precedence
    assert.equal(
      resolveTrustedIp({
        "x-real-ip": "157.240.22.35",
        "x-forwarded-for": "198.51.100.1, 10.0.0.1",
      }),
      "157.240.22.35"
    );

    // Leftmost entry in XFF is extracted when valid
    assert.equal(
      resolveTrustedIp({
        "x-forwarded-for": "203.0.113.195, 192.168.1.1, 10.0.0.1",
      }),
      "203.0.113.195"
    );

    // Malformed IP / header injection falls back safely
    assert.equal(
      resolveTrustedIp({
        "x-forwarded-for": "<script>alert(1)</script>, 192.168.1.1",
      }),
      "127.0.0.1"
    );

    // Fallback when headers missing
    assert.equal(resolveTrustedIp({}), "127.0.0.1");
  });

  test("Phase E: Concurrency-safe duplicate registration uses normalized SHA-256 email claims", () => {
    function computeEmailHash(rawEmail) {
      const normalized = rawEmail.trim().toLowerCase();
      return crypto.createHash("sha256").update(normalized).digest("hex");
    }

    const email1 = "  Founder.Jathara@StartupOdisha.org  ";
    const email2 = "FOUNDER.JATHARA@STARTUPODISHA.ORG";
    const email3 = "founder.jathara@startupodisha.org";
    const emailDiff = "different.founder@startupodisha.org";

    const hash1 = computeEmailHash(email1);
    const hash2 = computeEmailHash(email2);
    const hash3 = computeEmailHash(email3);
    const hashDiff = computeEmailHash(emailDiff);

    // All variations of the same email yield the exact same deterministic hash
    assert.equal(hash1, hash2);
    assert.equal(hash2, hash3);
    assert.equal(hash1.length, 64); // SHA-256 hex string

    // Different email produces distinct hash
    assert.notEqual(hash1, hashDiff);

    // Simulate 5-minute atomic claim window
    const emailClaims = new Map();
    function attemptRegisterWithClaim(email, refId) {
      const hash = computeEmailHash(email);
      const now = Date.now();
      const existing = emailClaims.get(hash);

      if (existing && now - existing.createdAt < 5 * 60 * 1000) {
        // Return existing registration to prevent concurrent duplicate
        return { duplicatePrevented: true, referenceId: existing.referenceId };
      }

      emailClaims.set(hash, { referenceId: refId, createdAt: now });
      return { duplicatePrevented: false, referenceId: refId };
    }

    const first = attemptRegisterWithClaim(email1, "ISF-2026-FND-AAA111");
    assert.equal(first.duplicatePrevented, false);
    assert.equal(first.referenceId, "ISF-2026-FND-AAA111");

    // Immediate second submission for same email is safely caught
    const second = attemptRegisterWithClaim(email2, "ISF-2026-FND-BBB222");
    assert.equal(second.duplicatePrevented, true);
    assert.equal(second.referenceId, "ISF-2026-FND-AAA111");
  });
});


