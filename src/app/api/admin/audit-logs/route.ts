import { NextRequest, NextResponse } from "next/server";
import { authenticateAdminRequest } from "@/lib/firebase/serverAuth";
import { getAdminAuditLogs } from "@/lib/firebase/firestore";


export async function GET(req: NextRequest) {
  try {
    const authCheck = await authenticateAdminRequest(req);
    if (!authCheck.authorized) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 50;

    const logs = await getAdminAuditLogs(limit);

    return NextResponse.json({
      success: true,
      logs,
    });
  } catch (error: unknown) {
    if ((error as { digest?: string })?.digest === "NEXT_PRERENDER_INTERRUPTED") {
      throw error;
    }
    console.error("[GET /api/admin/audit-logs error]:", error);
    return NextResponse.json(
      { error: "Failed to retrieve administrative audit logs." },
      { status: 500 }
    );
  }
}
