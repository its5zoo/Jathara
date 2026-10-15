import { NextRequest, NextResponse } from "next/server";
import { authenticateAdminRequest } from "@/lib/firebase/serverAuth";
import { generateSignedUploadParams } from "@/lib/cloudinary/server";
import { recordAdminAuditLog } from "@/lib/firebase/firestore";


export async function POST(req: NextRequest) {
  try {
    const authCheck = await authenticateAdminRequest(req);
    if (!authCheck.authorized || !authCheck.email) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const body = await req.json().catch(() => ({}));
    const folder = typeof body?.folder === "string" ? body.folder : undefined;
    const resourceType = body?.resourceType === "raw" ? "raw" : "image";

    const signedParams = generateSignedUploadParams({ folder, resourceType });

    await recordAdminAuditLog({
      action: "MEDIA_UPLOAD_SIGN",
      adminEmail: authCheck.email,
      details: { folder: signedParams.folder, resourceType },
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      data: signedParams,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to sign media upload.";
    console.error("[POST /api/media/sign-upload error]:", error);

    if (message.includes("Unauthorized upload folder")) {
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: message.includes("Cloudinary is not configured")
          ? "Cloudinary media service is not configured on the server. Please check Cloudinary environment variables."
          : "An error occurred while generating media upload authorization.",
      },
      { status: 500 }
    );
  }
}
