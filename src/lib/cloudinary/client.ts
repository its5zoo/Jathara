import { CloudinarySignedParams, CloudinaryAssetMetadata } from "../types/cloudinary";

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "limit" | "fit" | "scale" | "thumb";
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | number;
  format?: "auto" | "webp" | "png" | "jpg";
}

/**
 * Builds an optimized Cloudinary delivery URL with automatic format and quality transforms.
 * If the input is already a full URL or a local static path, returns it with safe handling.
 */
export function getOptimizedCloudinaryUrl(
  publicIdOrUrl: string,
  options: ImageOptimizationOptions = {}
): string {
  if (!publicIdOrUrl) return "/images/placeholder.svg";

  // If already an absolute URL or local path that isn't Cloudinary, return as is
  if (publicIdOrUrl.startsWith("http") && !publicIdOrUrl.includes("res.cloudinary.com")) {
    return publicIdOrUrl;
  }
  if (publicIdOrUrl.startsWith("/") && !publicIdOrUrl.startsWith("/v1_1/")) {
    return publicIdOrUrl;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
  if (!cloudName) {
    return publicIdOrUrl;
  }

  const {
    width,
    height,
    crop = "limit",
    quality = "auto",
    format = "auto",
  } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`);

  const transformString = transforms.join(",");

  // Extract clean publicId if a full cloudinary URL was passed
  const cleanId = publicIdOrUrl.includes("/upload/")
    ? publicIdOrUrl.split("/upload/")[1].replace(/^v\d+\//, "")
    : publicIdOrUrl;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${cleanId}`;
}

/**
 * Uploads a file directly to Cloudinary using signed parameters from the server.
 */
export async function uploadWithSignedParams(
  file: File,
  signedParams: CloudinarySignedParams,
  resourceType: "image" | "raw" = "image"
): Promise<CloudinaryAssetMetadata> {
  const maxBytes = signedParams.maxFileSize || 10 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`File size (${Math.round(file.size / (1024 * 1024))}MB) exceeds maximum allowable 10MB limit.`);
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  const allowed = signedParams.allowedFormats || ["jpg", "jpeg", "png", "webp", "pdf"];
  if (ext && !allowed.includes(ext)) {
    throw new Error(`File extension .${ext} is not allowed. Permitted formats: ${allowed.join(", ")}`);
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signedParams.apiKey);
  formData.append("timestamp", String(signedParams.timestamp));
  formData.append("signature", signedParams.signature);
  formData.append("folder", signedParams.folder);
  if (signedParams.allowedFormats && signedParams.allowedFormats.length > 0) {
    formData.append("allowed_formats", signedParams.allowedFormats.join(","));
  }
  if (signedParams.uploadPreset) {
    formData.append("upload_preset", signedParams.uploadPreset);
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${signedParams.cloudName}/${resourceType}/upload`;

  const res = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message || `Upload failed with HTTP status ${res.status}`
    );
  }

  const data = await res.json().catch(() => null);
  if (!data || !data.secure_url) {
    throw new Error("Invalid or empty response received from media storage service.");
  }

  return {
    publicId: data.public_id,
    secureUrl: data.secure_url,
    format: data.format || file.name.split(".").pop() || "unknown",
    width: data.width,
    height: data.height,
    bytes: data.bytes,
    resourceType,
    createdAt: data.created_at || new Date().toISOString(),
    originalFilename: data.original_filename || file.name,
  };
}
