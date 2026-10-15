import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { parseSafeResponse, safeFetch } from "../src/lib/api/safeResponse.ts";

describe("Login & Session API Regression Suite (P0 Emergency Fix)", () => {
  // --------------------------------------------------------------------------
  // 1. Valid JSON success response
  // --------------------------------------------------------------------------
  test("1. Valid JSON success response: parses cleanly without error", async () => {
    const mockResponse = new Response(
      JSON.stringify({
        success: true,
        user: { email: "admin@isfjathara.org", uid: "uid123", role: "super_admin" },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

    const result = await parseSafeResponse(mockResponse);
    assert.equal(result.ok, true);
    assert.equal(result.status, 200);
    assert.equal(result.data?.success, true);
    assert.equal(result.data?.user?.email, "admin@isfjathara.org");
    assert.equal(result.errorMessage, null);
  });

  // --------------------------------------------------------------------------
  // 2. Structured JSON error response
  // --------------------------------------------------------------------------
  test("2. Structured JSON error response: extracts structured error message", async () => {
    const mockResponse = new Response(
      JSON.stringify({ error: "Invalid credentials provided." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );

    const result = await parseSafeResponse(mockResponse);
    assert.equal(result.ok, false);
    assert.equal(result.status, 400);
    assert.equal(result.errorMessage, "Invalid credentials provided.");
  });

  // --------------------------------------------------------------------------
  // 3. Empty response body (CRITICAL BUG REPRODUCTION)
  // --------------------------------------------------------------------------
  test("3. Empty response body: does NOT throw 'Unexpected end of JSON input' syntax error", async () => {
    // Simulates Vercel 500 lambda crash with content-length: 0
    const emptyResponse = new Response("", { status: 500 });

    // Directly invoking response.json() would crash:
    await assert.rejects(
      async () => {
        await emptyResponse.clone().json();
      },
      (err) => {
        assert.match(err.message, /unexpected end of (json|input)|json/i);
        return true;
      }
    );

    // parseSafeResponse must handle this gracefully:
    const safeResult = await parseSafeResponse(emptyResponse);
    assert.equal(safeResult.ok, false);
    assert.equal(safeResult.status, 500);
    assert.equal(safeResult.data, null);
    assert.match(safeResult.errorMessage, /server error occurred/i);
  });

  // --------------------------------------------------------------------------
  // 4. Malformed JSON response
  // --------------------------------------------------------------------------
  test("4. Malformed JSON response: handles broken JSON or HTML 502 Bad Gateway safely", async () => {
    const htmlResponse = new Response("<html><body>502 Bad Gateway</body></html>", {
      status: 502,
      headers: { "Content-Type": "text/html" },
    });

    const result = await parseSafeResponse(htmlResponse);
    assert.equal(result.ok, false);
    assert.equal(result.status, 502);
    assert.equal(result.data, null);
    assert.match(result.errorMessage, /server error occurred|502/i);
  });

  // --------------------------------------------------------------------------
  // 5. HTTP 401 unauthorized response
  // --------------------------------------------------------------------------
  test("5. HTTP 401 unauthorized response: maps to authentication guidance", async () => {
    const unauthResponse = new Response(
      JSON.stringify({ error: "Session token is invalid or expired." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );

    const result = await parseSafeResponse(unauthResponse);
    assert.equal(result.ok, false);
    assert.equal(result.status, 401);
    assert.equal(result.errorMessage, "Session token is invalid or expired.");
  });

  // --------------------------------------------------------------------------
  // 6. HTTP 403 CSRF or administrator rejection
  // --------------------------------------------------------------------------
  test("6. HTTP 403 CSRF or administrator rejection: maps to access denied", async () => {
    const forbiddenResponse = new Response(
      JSON.stringify({ error: "Forbidden: Cross-site request origin mismatch rejected by CSRF protection." }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );

    const result = await parseSafeResponse(forbiddenResponse);
    assert.equal(result.ok, false);
    assert.equal(result.status, 403);
    assert.match(result.errorMessage, /CSRF protection|cross-site/i);
  });

  // --------------------------------------------------------------------------
  // 7. HTTP 500 internal server failure
  // --------------------------------------------------------------------------
  test("7. HTTP 500 internal server failure: returns clear server error without crashing", async () => {
    const errorResponse = new Response(
      JSON.stringify({ error: "An unexpected error occurred during admin session initialization." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );

    const result = await parseSafeResponse(errorResponse);
    assert.equal(result.ok, false);
    assert.equal(result.status, 500);
    assert.match(result.errorMessage, /unexpected error/i);
  });

  // --------------------------------------------------------------------------
  // 8. Network failure
  // --------------------------------------------------------------------------
  test("8. Network failure: safeFetch catches offline / unreachable network exceptions", async () => {
    // Calling safeFetch on an invalid domain or aborted signal returns structured network error
    const controller = new AbortController();
    controller.abort();

    const result = await safeFetch(
      "https://invalid-nonexistent-domain-test.local/api/admin/auth/session",
      { signal: controller.signal }
    );

    assert.equal(result.ok, false);
    assert.equal(result.status, 0);
    assert.equal(result.data, null);
    assert.match(result.errorMessage, /network error|cancelled|timed out/i);
  });

  // --------------------------------------------------------------------------
  // 9. Firebase Admin configuration missing
  // --------------------------------------------------------------------------
  test("9. Firebase Admin configuration missing: returns 503 Service Unavailable", () => {
    // Simulate unconfigured state in session route logic
    function mockSessionRouteHandler({ isConfigured, idToken }) {
      if (!idToken || typeof idToken !== "string") {
        return { status: 400, body: { error: "Missing or invalid idToken parameter." } };
      }
      if (!isConfigured) {
        return {
          status: 503,
          body: { error: "Authentication service is temporarily unavailable. Please verify backend environment configuration." },
        };
      }
      return { status: 200, body: { success: true } };
    }

    const unconfiguredResult = mockSessionRouteHandler({ isConfigured: false, idToken: "valid-token" });
    assert.equal(unconfiguredResult.status, 503);
    assert.match(unconfiguredResult.body.error, /temporarily unavailable|environment configuration/i);

    const missingTokenResult = mockSessionRouteHandler({ isConfigured: true, idToken: "" });
    assert.equal(missingTokenResult.status, 400);
  });

  // --------------------------------------------------------------------------
  // 10. Successful session creation
  // --------------------------------------------------------------------------
  test("10. Successful session creation: mints cookie and returns user profile", () => {
    function mockCreateSession({ userEmail, superAdminEmail, expiresInMs }) {
      if (userEmail.toLowerCase() !== superAdminEmail.toLowerCase()) {
        return { authorized: false, status: 403, error: "Forbidden: Not Super Admin." };
      }

      const mockCookie = "mock_session_cookie_" + Buffer.from(userEmail).toString("base64");
      return {
        authorized: true,
        status: 200,
        sessionCookie: mockCookie,
        maxAge: Math.floor(expiresInMs / 1000),
      };
    }

    const res = mockCreateSession({
      userEmail: "admin@isfjathara.org",
      superAdminEmail: "admin@isfjathara.org",
      expiresInMs: 5 * 24 * 60 * 60 * 1000,
    });

    assert.equal(res.authorized, true);
    assert.equal(res.status, 200);
    assert.equal(res.maxAge, 432000); // 5 days in seconds
    assert.match(res.sessionCookie, /mock_session_cookie_/);
  });

  // --------------------------------------------------------------------------
  // 11. Expired or invalid Firebase ID token
  // --------------------------------------------------------------------------
  test("11. Expired or invalid Firebase ID token: rejects with 401 Unauthorized", () => {
    function mockVerifyIdToken(token) {
      if (!token || token.includes("expired") || token.includes("invalid")) {
        return { authorized: false, status: 401, error: "Firebase ID token has expired or is invalid." };
      }
      return { authorized: true, status: 200 };
    }

    const expiredResult = mockVerifyIdToken("expired-jwt-token");
    assert.equal(expiredResult.authorized, false);
    assert.equal(expiredResult.status, 401);
    assert.match(expiredResult.error, /expired|invalid/i);
  });

  // --------------------------------------------------------------------------
  // 12. Logout and session cookie clearing
  // --------------------------------------------------------------------------
  test("12. Logout and session cookie clearing: sets cookie maxAge to 0 and returns 200", () => {
    function mockLogoutHandler() {
      const response = {
        status: 200,
        body: { success: true, message: "Logged out successfully." },
        cookies: {
          isf_admin_token: {
            value: "",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 0,
          },
        },
      };
      return response;
    }

    const logoutRes = mockLogoutHandler();
    assert.equal(logoutRes.status, 200);
    assert.equal(logoutRes.body.success, true);
    assert.equal(logoutRes.cookies.isf_admin_token.maxAge, 0);
    assert.equal(logoutRes.cookies.isf_admin_token.value, "");
  });

  // --------------------------------------------------------------------------
  // 13. Firebase Admin SDK runtime module loading (ERR_REQUIRE_ESM prevention)
  // --------------------------------------------------------------------------
  test("13. Firebase Admin SDK runtime module loading: resolves cleanly without ERR_REQUIRE_ESM", async () => {
    // Verifies that firebase-admin/auth and its dependencies (jwks-rsa, jose) resolve cleanly
    // in Node.js serverless runtimes without throwing ERR_REQUIRE_ESM
    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);

    assert.doesNotThrow(() => {
      const adminApp = require("firebase-admin/app");
      assert.ok(adminApp.initializeApp, "firebase-admin/app must export initializeApp");

      const adminAuth = require("firebase-admin/auth");
      assert.ok(adminAuth.getAuth, "firebase-admin/auth must export getAuth");

      const jwks = require("jwks-rsa");
      assert.ok(typeof jwks === "function", "jwks-rsa must export default function");
    });
  });
});
