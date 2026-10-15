/**
 * Safe Firebase Configuration Validator and Reader
 * ISF Startup Jathara 2026
 * 
 * Inspects environment variables for client and server-side Firebase SDKs.
 * Reports missing variable keys without exposing any secret values.
 */

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface FirebaseAdminConfig {
  projectId: string;
  clientEmail: string;
  privateKey: string;
  superAdminEmail: string;
}

function isPlaceholderOrEmpty(val: string): boolean {
  if (!val) return true;
  const lower = val.toLowerCase();
  return (
    lower.includes("your_") ||
    lower.includes("_here") ||
    lower.includes("placeholder") ||
    lower.includes("your-project-id")
  );
}

function isValidPrivateKey(val: string): boolean {
  if (isPlaceholderOrEmpty(val)) return false;
  return val.includes("BEGIN PRIVATE KEY") && val.includes("END PRIVATE KEY");
}

/**
 * Returns Firebase client configuration read from public environment variables.
 */
export function getFirebaseClientConfig(): {
  config: FirebaseClientConfig | null;
  missingKeys: string[];
  isConfigured: boolean;
} {
  const apiKey = (process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "").trim();
  const authDomain = (process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "").trim();
  const projectId = (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "").trim();
  const storageBucket = (process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "").trim();
  const messagingSenderId = (process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "").trim();
  const appId = (process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "").trim();

  const missingKeys: string[] = [];
  if (isPlaceholderOrEmpty(apiKey)) missingKeys.push("NEXT_PUBLIC_FIREBASE_API_KEY");
  if (isPlaceholderOrEmpty(authDomain)) missingKeys.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  if (isPlaceholderOrEmpty(projectId)) missingKeys.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  if (isPlaceholderOrEmpty(storageBucket)) missingKeys.push("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  if (isPlaceholderOrEmpty(messagingSenderId)) missingKeys.push("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
  if (isPlaceholderOrEmpty(appId)) missingKeys.push("NEXT_PUBLIC_FIREBASE_APP_ID");

  const isConfigured = missingKeys.length === 0;

  if (!isConfigured) {
    return { config: null, missingKeys, isConfigured: false };
  }

  return {
    config: {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
    },
    missingKeys: [],
    isConfigured: true,
  };
}

/**
 * Returns Firebase Admin configuration read from server-side environment variables.
 * Safe to call ONLY in Node.js server environments.
 */
export function getFirebaseAdminConfig(): {
  config: FirebaseAdminConfig | null;
  missingKeys: string[];
  isConfigured: boolean;
} {
  let projectId = (process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "").trim();
  let clientEmail = (process.env.FIREBASE_CLIENT_EMAIL || "").trim();
  const superAdminEmail = (process.env.SUPER_ADMIN_EMAIL || "").trim();
  let privateKey = (process.env.FIREBASE_PRIVATE_KEY || "").trim();

  // Fallback: If individual variables are missing, check if a full service account JSON was provided
  const serviceAccountJson = (process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || "").trim();
  if (serviceAccountJson && (!projectId || !clientEmail || !privateKey)) {
    try {
      const parsed = JSON.parse(serviceAccountJson);
      if (parsed.project_id && !projectId) projectId = String(parsed.project_id).trim();
      if (parsed.client_email && !clientEmail) clientEmail = String(parsed.client_email).trim();
      if (parsed.private_key && !privateKey) privateKey = String(parsed.private_key).trim();
    } catch {
      // Ignore JSON parse error and continue with standard validation
    }
  }

  // Remove surrounding quotes and escape artifacts
  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1);
  }
  // Strip Windows carriage returns
  privateKey = privateKey.replace(/\r/g, "");
  // Normalize escaped newlines
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  const missingKeys: string[] = [];
  if (isPlaceholderOrEmpty(projectId)) missingKeys.push("FIREBASE_PROJECT_ID");
  if (isPlaceholderOrEmpty(clientEmail)) missingKeys.push("FIREBASE_CLIENT_EMAIL");
  if (!isValidPrivateKey(privateKey)) missingKeys.push("FIREBASE_PRIVATE_KEY");

  const isConfigured = missingKeys.length === 0;

  if (!isConfigured) {
    return { config: null, missingKeys, isConfigured: false };
  }

  return {
    config: {
      projectId,
      clientEmail,
      privateKey,
      superAdminEmail: isPlaceholderOrEmpty(superAdminEmail) ? "" : superAdminEmail,
    },
    missingKeys: [],
    isConfigured: true,
  };
}
