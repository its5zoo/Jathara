export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: "super_admin";
  lastLoginAt?: string;
}

export interface AdminSession {
  authenticated: boolean;
  user: AdminUser | null;
  expiresAt?: number;
}

export interface AdminAuditLog {
  id?: string;
  action: "LOGIN" | "LOGOUT" | "UPDATE_NOTES" | "DELETE_REGISTRATION" | "EXPORT_CSV" | "MEDIA_UPLOAD_SIGN";
  adminEmail: string;
  targetId?: string;
  details?: Record<string, unknown>;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
