# ISF STARTUP JATHARA 2026 — FUTURE MOBILE CLIENT INTEGRATION ARCHITECTURE

## 1. Overview
The upcoming mobile application (iOS & Android) will serve delegates, speakers, investors, and attendees on the ground during the summit (18–20 December 2026). It will share data models, backend rules, and API endpoints with the web platform while maintaining native mobile performance.

---

## 2. Decoupling Rules
To ensure straightforward code sharing:
1. **Domain Types Reuse**: The TypeScript models in `src/lib/types/index.ts` are pure data contracts with zero Next.js or React DOM dependencies. They can be bundled into a shared private package (e.g. `@isf/common-types`) or cloned into a Flutter / React Native / Kotlin Multiplatform codebase.
2. **Backend Agnostic**: The mobile app will communicate directly with Firebase Authentication, Cloud Firestore, and Cloud Functions using native client SDKs or REST APIs.
3. **No Web View Wrappers**: Core features (QR badge presentation, live timetable notifications, room maps) must be native components rather than responsive web views to ensure reliability in low-connectivity forest environments.

---

## 3. Key Mobile Use Cases
1. **Offline Badge & Pass**: Offline-cached QR code for fast entry at GIET University gates and exhibition pavilions.
2. **Push Notifications**: Real-time alerts for roundtable room openings, Araku coffee breakouts, and forest trek muster calls.
3. **Attendee Matchmaking**: Secure in-app peer chat between verified investors and shortlisted founders.
4. **Interactive Campus & Trek Navigator**: GPS and offline trail guidance for Day 2 Dandakaranya Forest Trek.
