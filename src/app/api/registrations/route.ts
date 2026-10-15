import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createRegistrationDocument } from "@/lib/firebase/firestore";


import {
  OFFICIAL_TRACK_NAMES,
  OFFICIAL_TRACK_SLUGS,
  resolveTrack,
} from "@/lib/config/tracks";
import { PreferredTrack } from "@/lib/types/registration";

// Zod validation schema for registration submissions
const RegistrationSchema = z.object({
  categorySlug: z.enum([
    "startup-founder",
    "junicorn-youth",
    "investor-fund",
    "corporate-delegate",
    "speaker-mentor",
    "general-attendee",
  ]),
  preferredTrack: z
    .string()
    .trim()
    .refine(
      (val) => {
        if (!val) return true;
        const canonical = resolveTrack(val);
        return (
          canonical !== undefined &&
          (OFFICIAL_TRACK_NAMES.includes(val as (typeof OFFICIAL_TRACK_NAMES)[number]) ||
            OFFICIAL_TRACK_SLUGS.includes(val as (typeof OFFICIAL_TRACK_SLUGS)[number]))
        );
      },
      {
        message:
          "Invalid preferred track. Please choose one of the eight official summit tracks.",
      }
    )
    .optional()
    .default(""),
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please provide a valid email address").max(120),
  phone: z.string().trim().min(7, "Phone number must be at least 7 characters").max(25),
  city: z.string().trim().min(2, "City is required").max(100),
  state: z.string().trim().min(2, "State is required").max(100),
  country: z.string().trim().min(2, "Country is required").max(100),
  organization: z.string().trim().min(2, "Organization is required").max(150),
  designation: z.string().trim().min(2, "Designation is required").max(150),
  linkedInUrl: z.string().trim().max(300).optional().default(""),
  alternatePhone: z.string().trim().max(25).optional().default(""),

  registrationType: z.enum(["individual", "team"]).optional().default("individual"),
  teamName: z.string().trim().max(100).optional().default(""),
  teamMembers: z.array(
    z.object({
      id: z.string(),
      name: z.string().trim().min(1),
      email: z.string().trim().email(),
      role: z.string().trim(),
    })
  ).optional().default([]),
  projectName: z.string().trim().max(150).optional().default(""),
  projectDescription: z.string().trim().max(2000).optional().default(""),
  problemStatement: z.string().trim().max(2000).optional().default(""),
  proposedSolution: z.string().trim().max(2000).optional().default(""),
  developmentStage: z.string().trim().max(100).optional().default(""),
  projectWebsiteUrl: z.string().trim().max(300).optional().default(""),
  institutionName: z.string().trim().max(150).optional().default(""),
  pitchDeckUrl: z.string().trim().max(500).optional().default(""),

  fundName: z.string().trim().max(150).optional().default(""),
  investorAreasOfInterest: z.string().trim().max(500).optional().default(""),
  investorParticipationExpectations: z.string().trim().max(1000).optional().default(""),

  corporateAreasOfInterest: z.string().trim().max(500).optional().default(""),
  corporateReasonForAttending: z.string().trim().max(1000).optional().default(""),
  corporatePreferredRoundtables: z.string().trim().max(500).optional().default(""),

  mentorExpertise: z.string().trim().max(500).optional().default(""),
  mentorAreasOfInterest: z.string().trim().max(500).optional().default(""),
  mentorReasonForAttending: z.string().trim().max(1000).optional().default(""),
  mentorshipOrJuryInterest: z.boolean().optional().default(false),
  mentorPreferredRoundtables: z.string().trim().max(500).optional().default(""),

  observerReasonForAttending: z.string().trim().max(1000).optional().default(""),
  observerAreasOfInterest: z.string().trim().max(500).optional().default(""),
  observerExpectations: z.string().trim().max(1000).optional().default(""),
  isGroupRegistration: z.boolean().optional().default(false),
  groupAttendees: z.array(
    z.object({
      id: z.string(),
      name: z.string().trim().min(1),
      email: z.string().trim().email(),
    })
  ).optional().default([]),

  arrivalMode: z.enum(["Flight", "Train", "Road", "Other", "Not Decided"]).optional().default("Not Decided"),
  departureMode: z.enum(["Flight", "Train", "Road", "Other", "Not Decided"]).optional().default("Not Decided"),
  arrivalStationOrAirport: z.string().trim().max(100).optional().default(""),
  departureStationOrAirport: z.string().trim().max(100).optional().default(""),
  arrivalDateTime: z.string().trim().max(100).optional().default(""),
  departureDateTime: z.string().trim().max(100).optional().default(""),
  flightOrTrainNumber: z.string().trim().max(50).optional().default(""),
  pickupRequired: z.boolean().optional().default(false),
  welcomeDinnerDec17: z.boolean().optional().default(false),
  day1Dec18: z.boolean().optional().default(false),
  day2Dec19: z.boolean().optional().default(false),
  day3Dec20: z.boolean().optional().default(false),
});

function isValidIp(ip: string): boolean {
  // IPv4 format validation
  const ipv4 = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  if (ipv4.test(ip)) return true;
  // IPv6 format validation
  const ipv6 = /^(?:[a-fA-F0-9]{1,4}:){1,7}[a-fA-F0-9]{1,4}$|^::1$/;
  return ipv6.test(ip);
}

function getTrustedClientIp(req: NextRequest): string {
  // 1. Vercel trusted edge IP (unspoofable on Vercel infrastructure)
  const vercelIp = req.headers.get("x-vercel-ip")?.trim();
  if (vercelIp && isValidIp(vercelIp)) return vercelIp;

  // 2. Cloudflare trusted header
  const cfConnectingIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfConnectingIp && isValidIp(cfConnectingIp)) return cfConnectingIp;

  // 3. Standard proxy real-ip
  const xRealIp = req.headers.get("x-real-ip")?.trim();
  if (xRealIp && isValidIp(xRealIp)) return xRealIp;

  // 4. Forwarded chain: extract the client IP (first entry) and sanitize
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const parts = xForwardedFor.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0 && isValidIp(parts[0])) {
      return parts[0];
    }
  }

  return "127.0.0.1";
}

// In-memory sliding window rate limiter fallback
const ipRateLimit = new Map<string, { count: number; resetAt: number }>();

async function checkRateLimit(ip: string): Promise<boolean> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  // If Upstash Redis is configured, execute distributed rate limiting across serverless instances
  if (upstashUrl && upstashToken && !upstashUrl.includes("your_") && !upstashUrl.includes("_here")) {
    try {
      const key = `ratelimit:registration:${ip}`;
      const resp = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, 60],
        ]),
      });
      if (resp.ok) {
        const data = await resp.json();
        const count = data[0]?.result || 1;
        return count <= 10;
      }
    } catch (err) {
      console.warn("[RateLimit] Distributed Upstash check failed, falling back to local window:", err);
    }
  }

  // Local in-memory sliding window
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 10; // max 10 registrations per minute per IP

  const record = ipRateLimit.get(ip);
  if (!record || now > record.resetAt) {
    ipRateLimit.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getTrustedClientIp(req);
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json(
        { error: "Too many submission attempts. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 100 * 1024) {
      return NextResponse.json(
        { error: "Payload exceeds allowable size limit (max 100KB)." },
        { status: 413 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    const parseResult = RegistrationSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Validation failed.";
      return NextResponse.json(
        { error: firstError, details: parseResult.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const rawTrack = parseResult.data.preferredTrack;
    const canonical = rawTrack ? resolveTrack(rawTrack) : undefined;
    const normalizedTrack: PreferredTrack | "" = canonical ? canonical.title : "";

    const record = await createRegistrationDocument({
      ...parseResult.data,
      preferredTrack: normalizedTrack,
    });

    return NextResponse.json(
      {
        success: true,
        ...record,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unexpected server error occurred.";
    console.error("[API /api/registrations error]:", error);

    return NextResponse.json(
      {
        error: message.includes("Cloud Firestore is not initialized")
          ? "Database service is temporarily unavailable. Please verify backend environment configuration."
          : "We encountered an issue recording your registration. Please try again.",
      },
      { status: 500 }
    );
  }
}
