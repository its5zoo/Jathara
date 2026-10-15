import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionCookie, getAdminAuth } from "@/lib/firebase/admin";
import { authenticateAdminRequest, validateCsrfOrigin } from "@/lib/firebase/serverAuth";
import { recordAdminAuditLog } from "@/lib/firebase/firestore";

const SESSION_LIFETIME_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

export async function POST(req: NextRequest) {
  try {
    // 1. Enforce CSRF origin validation
    if (!validateCsrfOrigin(req)) {
      return NextResponse.json(
        { error: "Forbidden: Cross-site request origin mismatch rejected by CSRF protection." },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => null);
    const idToken = body?.idToken;

    if (!idToken || typeof idToken !== "string" || idToken.trim().length === 0) {
      return NextResponse.json({ error: "Missing or invalid idToken parameter." }, { status: 400 });
    }

    // 2. Validate ID token and mint official Firebase session cookie
    const sessionResult = await createAdminSessionCookie(idToken.trim(), SESSION_LIFETIME_MS);
    if (!sessionResult.authorized || !sessionResult.sessionCookie || !sessionResult.email) {
      const status = sessionResult.status || (sessionResult.error?.includes("Forbidden") ? 403 : 401);
      return NextResponse.json(
        { error: sessionResult.error || "Authorization failed." },
        { status }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: {
        email: sessionResult.email,
        uid: sessionResult.uid,
        role: "super_admin",
      },
    });

    // 3. Set secure HTTP-only session cookie matching Firebase session expiration
    response.cookies.set("isf_admin_token", sessionResult.sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(SESSION_LIFETIME_MS / 1000), // 5 days in seconds
    });

    // 4. Record login audit log (swallows any internal database logging exceptions safely)
    await recordAdminAuditLog({
      action: "LOGIN",
      adminEmail: sessionResult.email,
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") || undefined,
    }).catch((err) => {
      console.warn("Audit log creation notice:", err);
    });

    return response;
  } catch (error: unknown) {
    console.error("[Session Login Error]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during admin session initialization." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const authCheck = await authenticateAdminRequest(req);

    if (!authCheck.authorized) {
      return NextResponse.json(
        { authenticated: false, error: authCheck.error },
        { status: authCheck.status }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        email: authCheck.email,
        uid: authCheck.uid,
        role: "super_admin",
      },
    });
  } catch (error: unknown) {
    console.error("[Session Check Error]:", error);
    return NextResponse.json(
      { authenticated: false, error: "An unexpected error occurred during session verification." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // 1. Enforce CSRF origin validation
    if (!validateCsrfOrigin(req)) {
      return NextResponse.json(
        { error: "Forbidden: Cross-site request origin mismatch rejected by CSRF protection." },
        { status: 403 }
      );
    }

    const authCheck = await authenticateAdminRequest(req);

    if (authCheck.authorized && authCheck.email) {
      const auth = getAdminAuth();
      if (authCheck.uid && auth) {
        try {
          await auth.revokeRefreshTokens(authCheck.uid);
        } catch (e) {
          console.warn("Revoke refresh tokens notice:", e);
        }
      }

      await recordAdminAuditLog({
        action: "LOGOUT",
        adminEmail: authCheck.email,
        timestamp: new Date().toISOString(),
      }).catch((e) => {
        console.warn("Audit log notice:", e);
      });
    }

    const response = NextResponse.json({ success: true, message: "Logged out successfully." });

    response.cookies.set("isf_admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error: unknown) {
    console.error("[Session Logout Error]:", error);
    const response = NextResponse.json(
      { error: "An unexpected error occurred during logout." },
      { status: 500 }
    );
    response.cookies.set("isf_admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return response;
  }
}
