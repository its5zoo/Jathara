import { initializeApp, getApps, getApp, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getFirebaseAdminConfig } from "./config";

let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminDb: Firestore | null = null;

function ensureAdminInitialized(): { app: App | null; auth: Auth | null; db: Firestore | null } {
  if (adminApp && adminAuth && adminDb) {
    return { app: adminApp, auth: adminAuth, db: adminDb };
  }

  const { config, isConfigured, missingKeys } = getFirebaseAdminConfig();

  if (isConfigured && config) {
    try {
      if (getApps().length > 0) {
        adminApp = getApp();
      } else {
        adminApp = initializeApp({
          credential: cert({
            projectId: config.projectId,
            clientEmail: config.clientEmail,
            privateKey: config.privateKey,
          }),
        });
      }
      adminAuth = getAuth(adminApp);
      adminDb = getFirestore(adminApp);
      try {
        adminDb.settings({ ignoreUndefinedProperties: true });
      } catch {
        // Ignore if settings already initialized
      }
    } catch (error) {
      console.error("Failed to initialize Firebase Admin SDK:", error);
      adminApp = null;
      adminAuth = null;
      adminDb = null;
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[Firebase Admin] Configuration incomplete. Missing variables:",
      missingKeys.join(", ")
    );
  }

  return { app: adminApp, auth: adminAuth, db: adminDb };
}

// Initial boot initialization
ensureAdminInitialized();

export function getAdminAuth(): Auth | null {
  if (!adminAuth) {
    ensureAdminInitialized();
  }
  return adminAuth;
}

export function getAdminDb(): Firestore | null {
  if (!adminDb) {
    ensureAdminInitialized();
  }
  return adminDb;
}

/**
 * Verifies a Firebase ID token and ensures the caller matches the configured Super Admin.
 */
export async function verifySuperAdmin(idToken: string): Promise<{
  authorized: boolean;
  uid?: string;
  email?: string;
  error?: string;
  status: number;
}> {
  const auth = getAdminAuth();
  if (!auth) {
    return {
      authorized: false,
      error: "Firebase Admin is not configured on the server. Please check environment variables.",
      status: 503,
    };
  }

  const superAdminEmail = (process.env.SUPER_ADMIN_EMAIL || "").trim().toLowerCase();
  if (!superAdminEmail || superAdminEmail.includes("your_") || superAdminEmail.includes("_here")) {
    return {
      authorized: false,
      error: "SUPER_ADMIN_EMAIL is not configured on the server. Access failed closed.",
      status: 503,
    };
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const userEmail = (decodedToken.email || "").trim().toLowerCase();

    if (!userEmail) {
      return {
        authorized: false,
        error: "Authenticated user does not have a verified email address.",
        status: 401,
      };
    }

    if (userEmail !== superAdminEmail) {
      return {
        authorized: false,
        error: "Forbidden: This account is not authorized as the Super Admin.",
        status: 403,
      };
    }

    return {
      authorized: true,
      uid: decodedToken.uid,
      email: userEmail,
      status: 200,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid or expired session token";
    return {
      authorized: false,
      error: message,
      status: 401,
    };
  }
}

/**
 * Creates an authorized Firebase session cookie for an authenticated Super Admin.
 * Default session lifetime is 5 days (432,000,000 ms).
 */
export async function createAdminSessionCookie(
  idToken: string,
  expiresInMs: number = 5 * 24 * 60 * 60 * 1000
): Promise<{
  authorized: boolean;
  sessionCookie?: string;
  email?: string;
  uid?: string;
  error?: string;
  status: number;
}> {
  const verified = await verifySuperAdmin(idToken);
  if (!verified.authorized || !verified.email) {
    return {
      authorized: false,
      error: verified.error || "Super Admin authorization check failed.",
      status: verified.status || 401,
    };
  }

  const auth = getAdminAuth();
  if (!auth) {
    return {
      authorized: false,
      error: "Firebase Admin is not configured on the server. Please check environment variables.",
      status: 503,
    };
  }

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: expiresInMs });
    return {
      authorized: true,
      sessionCookie,
      email: verified.email,
      uid: verified.uid,
      status: 200,
    };
  } catch (err: unknown) {
    console.error("[createAdminSessionCookie error]:", err);
    return {
      authorized: false,
      error: "Failed to mint session cookie.",
      status: 500,
    };
  }
}

/**
 * Verifies a Firebase Admin session cookie with revocation checking enabled.
 */
export async function verifyAdminSessionCookie(
  sessionCookie: string,
  checkRevoked: boolean = true
): Promise<{
  authorized: boolean;
  email?: string;
  uid?: string;
  error?: string;
  status: number;
}> {
  const auth = getAdminAuth();
  if (!auth) {
    return {
      authorized: false,
      error: "Firebase Admin is not configured on the server. Please check environment variables.",
      status: 503,
    };
  }

  const superAdminEmail = (process.env.SUPER_ADMIN_EMAIL || "").trim().toLowerCase();
  if (!superAdminEmail || superAdminEmail.includes("your_") || superAdminEmail.includes("_here")) {
    return {
      authorized: false,
      error: "SUPER_ADMIN_EMAIL is not configured on the server. Access failed closed.",
      status: 503,
    };
  }

  try {
    const decodedCookie = await auth.verifySessionCookie(sessionCookie, checkRevoked);
    const userEmail = (decodedCookie.email || "").trim().toLowerCase();

    if (!userEmail) {
      return {
        authorized: false,
        error: "Authenticated session does not contain an email address.",
        status: 401,
      };
    }

    if (userEmail !== superAdminEmail) {
      return {
        authorized: false,
        error: "Forbidden: This session is not authorized as the Super Admin.",
        status: 403,
      };
    }

    return {
      authorized: true,
      uid: decodedCookie.uid,
      email: userEmail,
      status: 200,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid or expired session cookie.";
    return {
      authorized: false,
      error: message,
      status: 401,
    };
  }
}

/**
 * Flexible verifier that attempts session cookie verification first,
 * then falls back to ID token verification for direct API bearer tokens.
 */
export async function verifyAdminTokenOrCookie(
  token: string
): Promise<{
  authorized: boolean;
  email?: string;
  uid?: string;
  error?: string;
  status: number;
}> {
  // 1. Try session cookie first
  const cookieResult = await verifyAdminSessionCookie(token, true);
  if (cookieResult.authorized) {
    return cookieResult;
  }

  // 2. Fall back to ID token verification
  return await verifySuperAdmin(token);
}

export { adminApp, adminAuth, adminDb, ensureAdminInitialized };
