import { NextRequest } from "next/server";
import { verifyAdminTokenOrCookie, verifyAdminSessionCookie } from "./admin";

export interface AuthCheckResult {
  authorized: boolean;
  email?: string;
  uid?: string;
  error?: string;
  status: number;
}

/**
 * Validates request origin against server host to prevent cross-site request forgery (CSRF)
 * on state-changing administrative operations.
 */
export function validateCsrfOrigin(req: NextRequest): boolean {
  const method = req.method.toUpperCase();
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    return true;
  }

  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const origin = req.headers.get("origin");

  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost.toLowerCase() !== host.toLowerCase()) {
        return false;
      }
    } catch {
      return false;
    }
  }

  const referer = req.headers.get("referer");
  if (!origin && referer && host) {
    try {
      const refererHost = new URL(referer).host;
      if (refererHost.toLowerCase() !== host.toLowerCase()) {
        return false;
      }
    } catch {
      return false;
    }
  }

  // Reject cookie-authenticated state-changing browser requests lacking Origin and Referer
  const hasCookieAuth = req.cookies.has("isf_admin_token");
  if (hasCookieAuth && !origin && !referer) {
    return false;
  }

  return true;
}

/**
 * Validates that an incoming NextRequest originates from an authorized Super Admin.
 * Checks both Authorization header Bearer token and the isf_admin_token HTTP-only session cookie.
 * Enforces CSRF origin verification on state-changing requests.
 */
export async function authenticateAdminRequest(req: NextRequest): Promise<AuthCheckResult> {
  // 1. Enforce CSRF origin validation on mutating requests
  if (!validateCsrfOrigin(req)) {
    return {
      authorized: false,
      error: "Forbidden: Cross-site request origin mismatch rejected by CSRF protection.",
      status: 403,
    };
  }

  let token: string | null = null;
  let isCookieToken = false;

  // 2. Check Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  }

  // 3. Fall back to secure HTTP-only session cookie
  if (!token) {
    const cookieToken = req.cookies.get("isf_admin_token")?.value;
    if (cookieToken) {
      token = cookieToken.trim();
      isCookieToken = true;
    }
  }

  if (!token) {
    return {
      authorized: false,
      error: "Authentication required. Please sign in as Super Admin.",
      status: 401,
    };
  }

  // 4. Verify token (Session cookie preferred for cookie tokens, fallback to bearer token verifier)
  const result = isCookieToken
    ? await verifyAdminSessionCookie(token, true)
    : await verifyAdminTokenOrCookie(token);

  if (!result.authorized) {
    return {
      authorized: false,
      error: result.error || "Access denied: Unauthorized.",
      status: result.status || (result.error?.includes("Forbidden") ? 403 : 401),
    };
  }

  return {
    authorized: true,
    email: result.email,
    uid: result.uid,
    status: 200,
  };
}
