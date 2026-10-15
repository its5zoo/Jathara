export interface CloudinarySignedParams {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
  allowedFormats?: string[];
  maxFileSize?: number;
  uploadPreset?: string;
}

export interface CloudinaryAssetMetadata {
  publicId: string;
  secureUrl: string;
  format: string;
  width?: number;
  height?: number;
  bytes?: number;
  resourceType: "image" | "raw" | "video";
  createdAt: string;
  originalFilename?: string;
}

export interface CloudinarySignRequest {
  folder?: string;
  resourceType?: "image" | "raw";
  tags?: string[];
}
