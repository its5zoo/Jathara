import { v2 as cloudinary } from "cloudinary";
import { CloudinarySignedParams } from "../types/cloudinary";

const ALLOWED_FOLDERS = [
  "isf2026/speakers",
  "isf2026/partners",
  "isf2026/startups",
  "isf2026/gallery",
  "isf2026/admin",
];

const ALLOWED_FORMATS = ["jpg", "jpeg", "png", "webp", "pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

function isPlaceholderOrEmpty(val: string): boolean {
  if (!val) return true;
  const lower = val.toLowerCase();
  return lower.includes("your_") || lower.includes("_here") || lower.includes("your-cloud-name");
}

/**
 * Validates Cloudinary environment variables
 */
export function getCloudinaryServerConfig(): {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  isConfigured: boolean;
  missingKeys: string[];
} {
  const cloudName = (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || "").trim();
  const apiKey = (process.env.CLOUDINARY_API_KEY || "").trim();
  const apiSecret = (process.env.CLOUDINARY_API_SECRET || "").trim();

  const missingKeys: string[] = [];
  if (isPlaceholderOrEmpty(cloudName)) missingKeys.push("CLOUDINARY_CLOUD_NAME (or NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)");
  if (isPlaceholderOrEmpty(apiKey)) missingKeys.push("CLOUDINARY_API_KEY");
  if (isPlaceholderOrEmpty(apiSecret)) missingKeys.push("CLOUDINARY_API_SECRET");

  const isConfigured = missingKeys.length === 0;

  if (isConfigured) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
    isConfigured,
    missingKeys,
  };
}

/**
 * Generates signed parameters for authorized client uploads directly to Cloudinary.
 * Keeps CLOUDINARY_API_SECRET strictly server-side.
 */
export function generateSignedUploadParams(options: {
  folder?: string;
  resourceType?: "image" | "raw";
}): CloudinarySignedParams {
  const { cloudName, apiKey, apiSecret, isConfigured, missingKeys } = getCloudinaryServerConfig();

  if (!isConfigured) {
    throw new Error(
      `Cloudinary is not configured on the server. Missing: ${missingKeys.join(", ")}`
    );
  }

  if (options.folder && !ALLOWED_FOLDERS.includes(options.folder)) {
    throw new Error(
      `Unauthorized upload folder: "${options.folder}". Allowed folders: ${ALLOWED_FOLDERS.join(", ")}`
    );
  }

  const folder = options.folder || "isf2026/admin";
  const timestamp = Math.round(Date.now() / 1000);
  const uploadPreset = (process.env.CLOUDINARY_UPLOAD_PRESET || "").trim();

  const allowedFormatsString = ALLOWED_FORMATS.join(",");

  const paramsToSign: Record<string, string | number> = {
    allowed_formats: allowedFormatsString,
    folder,
    timestamp,
  };

  if (uploadPreset && !isPlaceholderOrEmpty(uploadPreset)) {
    paramsToSign.upload_preset = uploadPreset;
  }

  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

  return {
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder,
    allowedFormats: ALLOWED_FORMATS,
    maxFileSize: MAX_FILE_SIZE,
    uploadPreset: uploadPreset && !isPlaceholderOrEmpty(uploadPreset) ? uploadPreset : undefined,
  };
}
