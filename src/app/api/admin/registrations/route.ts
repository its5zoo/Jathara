import { NextRequest, NextResponse } from "next/server";
import { authenticateAdminRequest } from "@/lib/firebase/serverAuth";
import { getRegistrationsFromDb } from "@/lib/firebase/firestore";
import { GetRegistrationsQuery } from "@/lib/types/registration";


export async function GET(req: NextRequest) {
  try {
    const authCheck = await authenticateAdminRequest(req);
    if (!authCheck.authorized) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const { searchParams } = new URL(req.url);
    const query: GetRegistrationsQuery = {
      category: searchParams.get("category") || undefined,
      track: searchParams.get("track") || undefined,
      pickup: searchParams.get("pickup") || undefined,
      search: searchParams.get("search") || undefined,
      sortBy: (searchParams.get("sortBy") as "newest" | "oldest" | "name") || "newest",
      limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 500,
      offset: searchParams.get("offset") ? parseInt(searchParams.get("offset")!, 10) : undefined,
    };

    const data = await getRegistrationsFromDb(query);

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error: unknown) {
    if ((error as { digest?: string })?.digest === "NEXT_PRERENDER_INTERRUPTED") {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Failed to load registrations.";
    console.error("[GET /api/admin/registrations error]:", error);

    return NextResponse.json(
      {
        error: message.includes("Cloud Firestore is not initialized")
          ? "Cloud Firestore is not configured on the server. Please ensure Firebase Admin credentials are set in environment variables."
          : "An error occurred while fetching registrations from the database.",
      },
      { status: 500 }
    );
  }
}
