import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
  getIdToken,
} from "firebase/auth";
import { auth, isFirebaseClientConfigured } from "./client";

/**
 * Super Admin Login using Firebase Authentication
 */
export async function signInSuperAdmin(email: string, password: string): Promise<User> {
  if (!isFirebaseClientConfigured || !auth) {
    throw new Error(
      "Firebase client is not configured. Please ensure NEXT_PUBLIC_FIREBASE_* environment variables are set."
    );
  }

  const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return userCredential.user;
}

/**
 * Super Admin Sign Out
 */
export async function signOutSuperAdmin(): Promise<void> {
  if (!auth) return;
  await signOut(auth);
}

/**
 * Send password reset email for Super Admin recovery
 */
export async function sendAdminPasswordReset(email: string): Promise<void> {
  if (!isFirebaseClientConfigured || !auth) {
    throw new Error(
      "Firebase client is not configured. Please ensure NEXT_PUBLIC_FIREBASE_* environment variables are set."
    );
  }

  await sendPasswordResetEmail(auth, email.trim());
}

/**
 * Get current Firebase Auth ID token for API requests
 */
export async function getCurrentAdminIdToken(forceRefresh = false): Promise<string | null> {
  if (!auth || !auth.currentUser) return null;
  return getIdToken(auth.currentUser, forceRefresh);
}

/**
 * Subscribe to Super Admin auth state changes
 */
export function subscribeToAuthState(callback: (user: User | null) => void): () => void {
  if (!auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
}
