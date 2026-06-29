#!/usr/bin/env node
// MODE MODE — seed / refresh the Supabase `projects` table from content/*.json
//
// Each content/<slug>.json becomes one row: { slug, code, name, data:<the json> }.
// Idempotent upsert on `slug`, so re-running just refreshes. This is the bridge
// FROM data-in-repo TO Supabase; once authoring moves into the Supabase table UI,
// the table becomes the source of truth and this is only for the initial load.
//
// Usage:
//   npm i @supabase/supabase-js
//   SUPABASE_URL=https://xxxx.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
//   node docs/supabase/seed_projects.mjs
//
//   # dry run — read + shape the rows, print a summary, write nothing:
//   node docs/supabase/seed_projects.mjs --dry

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DRY = process.argv.includes('--dry');
const contentDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'content');

const rows = readdirSync(contentDir)
  .filter(f => f.endsWith('.json'))
  .map(f => {
    const data = JSON.parse(readFileSync(join(contentDir, f), 'utf8'));
    return {
      slug: data.slug || f.replace(/\.json$/, ''),
      code: data.code ?? null,
      name: data.name ?? null,
      data,
    };
  })
  .sort((a, b) => (a.code || '').localeCompare(b.code || ''));

const summarize = r => {
  const nodes = Array.isArray(r.data.nodes) ? r.data.nodes.length : 0;
  const withContent = (r.data.nodes || []).filter(
    n => n.content && Array.isArray(n.content.blocks) && n.content.blocks.length
  ).length;
  return `${r.code}  ${String(r.name).padEnd(18)} ${nodes} nodes / ${withContent} with content`;
};

console.log(`Found ${rows.length} project documents in content/:`);
for (const r of rows) console.log('  ' + summarize(r));

if (DRY) {
  console.log('\n[--dry] read + shaped OK. No write performed.');
  process.exit(0);
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('\nSet SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or pass --dry).');
  process.exit(1);
}

const { createClient } = await import('@supabase/supabase-js');
const sb = createClient(url, key, { auth: { persistSession: false } });
const { error } = await sb.from('projects').upsert(rows, { onConflict: 'slug' });
if (error) { console.error('\nUpsert failed:', error.message); process.exit(1); }
console.log(`\nUpserted ${rows.length} rows into public.projects.`);
