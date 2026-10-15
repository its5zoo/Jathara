import { NextRequest, NextResponse } from "next/server";
import { authenticateAdminRequest } from "@/lib/firebase/serverAuth";
import {
  updateRegistrationNotesInDb,
  deleteRegistrationFromDb,
  recordAdminAuditLog,
  getRegistrationByIdFromDb,
} from "@/lib/firebase/firestore";


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authCheck = await authenticateAdminRequest(req);
    if (!authCheck.authorized || !authCheck.email) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing registration ID." }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    const adminNotes = typeof body?.adminNotes === "string" ? body.adminNotes : "";

    const updated = await updateRegistrationNotesInDb(id, adminNotes);
    if (!updated) {
      return NextResponse.json({ error: "Registration record not found." }, { status: 404 });
    }

    await recordAdminAuditLog({
      action: "UPDATE_NOTES",
      adminEmail: authCheck.email,
      targetId: id,
      details: { referenceId: updated.referenceId },
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      registration: updated,
    });
  } catch (error: unknown) {
    console.error("[PATCH /api/admin/registrations/[id] error]:", error);
    return NextResponse.json(
      { error: "Failed to update registration notes." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authCheck = await authenticateAdminRequest(req);
    if (!authCheck.authorized || !authCheck.email) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing registration ID." }, { status: 400 });
    }

    // Look up record first for audit trail
    const existing = await getRegistrationByIdFromDb(id);

    const deleted = await deleteRegistrationFromDb(id);
    if (!deleted) {
      return NextResponse.json({ error: "Registration record not found or already deleted." }, { status: 404 });
    }

    await recordAdminAuditLog({
      action: "DELETE_REGISTRATION",
      adminEmail: authCheck.email,
      targetId: id,
      details: existing ? { referenceId: existing.referenceId, delegateName: existing.fullName } : undefined,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Registration deleted successfully.",
    });
  } catch (error: unknown) {
    console.error("[DELETE /api/admin/registrations/[id] error]:", error);
    return NextResponse.json(
      { error: "Failed to delete registration record." },
      { status: 500 }
    );
  }
}
