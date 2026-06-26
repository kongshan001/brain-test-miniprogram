#!/usr/bin/env node
/**
 * Import 150 questions into CloudBase `questions` collection.
 *
 * Usage:
 *   node scripts/import_questions.mjs
 *
 * Prerequisites:
 *   1. Install @cloudbase/node-sdk: npm install @cloudbase/node-sdk
 *   2. Set CLOUDBASE_ENV_ID env var or replace below
 *   3. CloudBase API key configured (via cloudbase login or env vars)
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cloudbase from '@cloudbase/node-sdk';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

// ─── Config ─────────────────────────────────────────────────────
const ENV_ID = process.env.CLOUDBASE_ENV_ID || '{{CLOUDBASE_ENV_ID}}';

if (ENV_ID === '{{CLOUDBASE_ENV_ID}}') {
  console.error('ERROR: Set CLOUDBASE_ENV_ID environment variable');
  console.error('  export CLOUDBASE_ENV_ID=your-env-id');
  process.exit(1);
}

// ─── Init CloudBase ─────────────────────────────────────────────
const app = cloudbase.init({ env: ENV_ID });
const db = app.database();

// ─── Load questions ─────────────────────────────────────────────
const questionsPath = join(PROJECT_ROOT, 'data', 'questions.json');
const questions = JSON.parse(readFileSync(questionsPath, 'utf-8'));

console.log(`Loaded ${questions.length} questions from data/questions.json`);

// ─── Import ─────────────────────────────────────────────────────
async function importQuestions() {
  const collection = db.collection('questions');
  let imported = 0;
  let errors = 0;

  // Batch import in groups of 20 (CloudBase limit)
  const BATCH_SIZE = 20;

  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batch = questions.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (q) => {
      try {
        // Remove _id to let CloudBase auto-generate
        const { _id, ...data } = q;
        await collection.add(data);
        imported++;
      } catch (err) {
        errors++;
        console.error(`  Failed to import question ${q._id}: ${err.message}`);
      }
    });
    await Promise.all(promises);
    console.log(`  Progress: ${Math.min(i + BATCH_SIZE, questions.length)}/${questions.length}`);
  }

  console.log(`\nImport complete: ${imported} succeeded, ${errors} failed`);
}

importQuestions().catch((err) => {
  console.error('Import failed:', err.message);
  process.exit(1);
});
