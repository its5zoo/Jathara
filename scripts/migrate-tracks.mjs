/**
 * ISF Startup Jathara 2026 — Idempotent Track Migration Script
 * Migrates existing Firebase registrations from legacy tracks to the canonical 8-track system.
 * 
 * Usage:
 *   node scripts/migrate-tracks.mjs             # DRY-RUN MODE (Safe, does not mutate DB)
 *   node scripts/migrate-tracks.mjs --apply     # LIVE APPLY (Requires confirmation)
 */

import fs from 'node:fs';
import path from 'node:path';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// 1. Read environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[match[1]] = value.replace(/\\n/g, '\n');
  }
}

const projectId = env.FIREBASE_PROJECT_ID || env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = env.FIREBASE_CLIENT_EMAIL;
let privateKey = env.FIREBASE_PRIVATE_KEY;
if (privateKey && ((privateKey.startsWith('"') && privateKey.endsWith('"')) || (privateKey.startsWith("'") && privateKey.endsWith("'")))) {
  privateKey = privateKey.slice(1, -1);
}
if (privateKey) {
  privateKey = privateKey.replace(/\\n/g, '\n');
}

if (!projectId || !clientEmail || !privateKey) {
  console.error("Missing Firebase Admin credentials in .env.local");
  process.exit(1);
}

const app = initializeApp({
  credential: cert({
    projectId,
    clientEmail,
    privateKey,
  })
}, 'track-migration-runner');

const db = getFirestore(app);

// 2. Canonical tracks reference
const CANONICAL_TRACKS = {
  'agritech-food-safety': 'Agritech & Food Safety',
  'ai-quantum-technology': 'AI & Quantum Technology',
  'life-sciences-health-care': 'Life Sciences & Health Care',
  'defence-aerospace-deep-tech': 'Defence/Aerospace & Deep Tech',
  'women-empowerment-social-inclusion': 'Women Empowerment & Social Inclusion',
  'infrastructure': 'Infrastructure',
  'clean-energy-water-safety': 'Clean Energy & Water Safety',
  'fintech-edutech-tribaltech': 'Fintech/Edutech/Tribaltech',
};

const CANONICAL_TITLES = new Set(Object.values(CANONICAL_TRACKS));

// 3. Approved legacy mapping rules
const MAPPING_RULES = {
  'Agri-Tech & Food Systems': {
    targetSlug: 'agritech-food-safety',
    targetTitle: 'Agritech & Food Safety',
    classification: 'exact',
    rationale: 'Direct semantic and sectoral continuation of the summit agriculture and food systems vertical.'
  },
  'Healthcare & Lifesciences': {
    targetSlug: 'life-sciences-health-care',
    targetTitle: 'Life Sciences & Health Care',
    classification: 'exact',
    rationale: 'Direct semantic continuation of the healthcare and lifesciences track.'
  },
  'Junicorn & Grassroots Youth': {
    targetSlug: 'fintech-edutech-tribaltech',
    targetTitle: 'Fintech/Edutech/Tribaltech',
    classification: 'ambiguous',
    rationale: 'Student and grassroots tech initiatives often touch tribal tech or education. Requires administrative confirmation.'
  },
  'Sustainable Enterprise & Circularity': {
    targetSlug: 'clean-energy-water-safety',
    targetTitle: 'Clean Energy & Water Safety',
    classification: 'ambiguous',
    rationale: 'Spans both clean energy/water and green infrastructure. Requires administrative confirmation.'
  },
  'Global Investors & GCC Connect': {
    targetSlug: 'fintech-edutech-tribaltech',
    targetTitle: 'Fintech/Edutech/Tribaltech',
    classification: 'unsupported',
    rationale: 'Legacy institutional attendee category now separated from sectoral innovation tracks.'
  }
};

async function run() {
  const isApply = process.argv.includes('--apply');
  console.log('='.repeat(70));
  console.log(`ISF STARTUP JATHARA 2026 — TRACK MIGRATION TOOL`);
  console.log(`MODE: ${isApply ? '*** LIVE APPLY ***' : 'DRY RUN (Read-Only Simulation)'}`);
  console.log('='.repeat(70));

  const snapshot = await db.collection('registrations').get();
  console.log(`Total registration documents scanned: ${snapshot.size}`);

  const report = {
    totalScanned: snapshot.size,
    alreadyCanonical: 0,
    exactMigrationProposed: 0,
    ambiguousFlagged: 0,
    unassignedOrMissing: 0,
    actions: []
  };

  const backupData = [];

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const currentTrack = data.preferredTrack;

    backupData.push({
      id: doc.id,
      referenceId: data.referenceId,
      preferredTrack: currentTrack,
      preferredTrackSlug: data.preferredTrackSlug,
      legacyTrackOriginalValue: data.legacyTrackOriginalValue
    });

    if (!currentTrack) {
      report.unassignedOrMissing++;
      continue;
    }

    if (CANONICAL_TITLES.has(currentTrack)) {
      report.alreadyCanonical++;
      continue;
    }

    const mapping = MAPPING_RULES[currentTrack];
    if (!mapping) {
      report.ambiguousFlagged++;
      report.actions.push({
        id: doc.id,
        ref: data.referenceId,
        currentTrack,
        action: 'FLAG_UNKNOWN',
        proposedTrack: null,
        status: 'UNKNOWN'
      });
      continue;
    }

    if (mapping.classification === 'exact') {
      report.exactMigrationProposed++;
      report.actions.push({
        id: doc.id,
        ref: data.referenceId,
        currentTrack,
        proposedTrack: mapping.targetTitle,
        proposedSlug: mapping.targetSlug,
        action: isApply ? 'APPLY_MIGRATION' : 'PROPOSE_MIGRATION',
        classification: 'exact',
        rationale: mapping.rationale
      });

      if (isApply) {
        await doc.ref.update({
          preferredTrack: mapping.targetTitle,
          preferredTrackSlug: mapping.targetSlug,
          legacyTrackOriginalValue: currentTrack,
          updatedAt: new Date().toISOString(),
          trackMigratedAt: new Date().toISOString()
        });
      }
    } else {
      report.ambiguousFlagged++;
      report.actions.push({
        id: doc.id,
        ref: data.referenceId,
        currentTrack,
        proposedTrack: mapping.targetTitle,
        action: 'FLAG_FOR_APPROVAL',
        classification: mapping.classification,
        rationale: mapping.rationale
      });
    }
  }

  console.log('\n--- MIGRATION SUMMARY REPORT ---');
  console.log(`Total scanned:               ${report.totalScanned}`);
  console.log(`Already canonical:           ${report.alreadyCanonical}`);
  console.log(`Exact matches proposed:      ${report.exactMigrationProposed}`);
  console.log(`Ambiguous/Flagged:           ${report.ambiguousFlagged}`);
  console.log(`Unassigned/Missing track:    ${report.unassignedOrMissing}`);
  console.log('\n--- DETAILED ACTION ITEMS ---');
  console.log(JSON.stringify(report.actions, null, 2));

  if (!isApply) {
    console.log('\n[DRY RUN COMPLETE] Zero database mutations performed.');
    console.log('To apply exact migrations, execute with --apply flag following user consent.');
  } else {
    console.log('\n[LIVE APPLY COMPLETE] Successfully migrated records.');
  }
}

run().catch(err => {
  console.error("Migration error:", err);
  process.exit(1);
});
