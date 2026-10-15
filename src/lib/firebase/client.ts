import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getFirebaseClientConfig } from "./config";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

const { config, isConfigured, missingKeys } = getFirebaseClientConfig();

if (isConfigured && config) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(config);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error("Failed to initialize Firebase client SDK:", error);
  }
} else if (typeof window !== "undefined") {
  // Client runtime notice for missing configuration
  console.warn(
    "[Firebase Client] Incomplete configuration. Missing environment variables:",
    missingKeys.join(", ")
  );
}

export { app, auth, db, isConfigured as isFirebaseClientConfigured, missingKeys as clientMissingKeys };
