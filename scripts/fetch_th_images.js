import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_PATH = path.join(__dirname, '../data/thailand_seed.json');
const OUT_DIR = path.join(__dirname, '../public/places');
const OUT_DATA = path.join(__dirname, '../data/th_images.json');

async function ensureDir(p) { 
  await fs.mkdir(p, { recursive: true }); 
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function wdSearch(title) {
  const url = new URL('https://www.wikidata.org/w/api.php');
  url.searchParams.set('action','wbsearchentities');
  url.searchParams.set('language','en');
  url.searchParams.set('format','json');
  url.searchParams.set('type','item');
  url.searchParams.set('search', `${title} Thailand`);
  
  try {
    const res = await fetch(url); 
    const j = await res.json();
    return j.search?.[0]?.id || null; // QID
  } catch (error) {
    console.error(`Search failed for "${title}":`, error.message);
    return null;
  }
}

async function wdGetImageFilename(qid) {
  const url = new URL('https://www.wikidata.org/w/api.php');
  url.searchParams.set('action','wbgetentities');
  url.searchParams.set('ids', qid);
  url.searchParams.set('format','json');
  url.searchParams.set('props','claims');
  
  try {
    const res = await fetch(url); 
    const j = await res.json();
    const claims = j.entities?.[qid]?.claims;
    const p18 = claims?.P18?.[0]?.mainsnak?.datavalue?.value;
    return p18 || null; // e.g., "Wat_Phra_Kaew_Bangkok.jpg"
  } catch (error) {
    console.error(`Failed to get image for QID ${qid}:`, error.message);
    return null;
  }
}

async function commonsInfo(filename) {
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.searchParams.set('action','query');
  url.searchParams.set('format','json');
  url.searchParams.set('prop','imageinfo');
  url.searchParams.set('titles', 'File:' + filename);
  url.searchParams.set('iiprop','url|user|extmetadata');
  
  try {
    const res = await fetch(url); 
    const j = await res.json();
    const page = Object.values(j.query.pages)[0];
    const info = page?.imageinfo?.[0];
    if (!info) return null;
    const meta = info.extmetadata || {};
    return {
      url: info.url,
      author: meta.Artist?.value || info.user || '',
      license: meta.LicenseShortName?.value || '',
      credit: meta.Credit?.value || '',
      attribution_html: meta.AttributionRequired?.value === 'true'
        ? (meta.Attribution?.value || '')
        : ''
    };
  } catch (error) {
    console.error(`Failed to get Commons info for ${filename}:`, error.message);
    return null;
  }
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}

async function download(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('download failed ' + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(dest, buf);
    console.log(`Downloaded: ${dest}`);
  } catch (error) {
    console.error(`Download failed for ${url}:`, error.message);
    throw error;
  }
}

async function resolveEntry(name, hint, parentSlug) {
  console.log(`Resolving: ${name} (hint: ${hint})`);
  
  const qid = await wdSearch(hint || name);
  if (!qid) {
    console.log(`  ❌ No QID found for "${name}"`);
    return { name, qid: null, error: 'No QID' };
  }
  
  console.log(`  ✅ Found QID: ${qid}`);
  
  const filename = await wdGetImageFilename(qid);
  if (!filename) {
    console.log(`  ❌ No P18 image for ${qid}`);
    return { name, qid, error: 'No P18 image' };
  }
  
  console.log(`  ✅ Found image: ${filename}`);
  
  const info = await commonsInfo(filename);
  if (!info) {
    console.log(`  ❌ No Commons info for ${filename}`);
    return { name, qid, error: 'No Commons info' };
  }
  
  const baseSlug = parentSlug ? `${parentSlug}-${slugify(name)}` : slugify(name);
  const destPath = path.join(OUT_DIR, `${baseSlug}.jpg`);
  await ensureDir(OUT_DIR);
  await download(info.url, destPath);
  await sleep(200); // be gentle
  
  console.log(`  ✅ Downloaded: ${baseSlug}.jpg`);
  
  return {
    name, 
    qid,
    slug: baseSlug,
    file: `/places/${baseSlug}.jpg`,
    source: 'wikimedia-commons',
    author_html: info.author,
    license: info.license,
    credit_html: info.credit
  };
}

async function main() {
  console.log('🌏 Starting Thailand images fetch...\n');
  
  const SEED = JSON.parse(await fs.readFile(SEED_PATH, 'utf-8'));
  const out = { items: [], generated_at: new Date().toISOString() };
  
  // collections (cities/regions) and their children
  for (const col of SEED.collections) {
    console.log(`\n📍 Processing ${col.name}...`);
    const parent = await resolveEntry(col.name, col.name, null);
    out.items.push({ ...parent, type: col.type });
    
    for (const ch of col.children || []) {
      const child = await resolveEntry(ch.name, ch.search_hint || ch.name, col.slug);
      out.items.push({ ...child, type: ch.type, parent: col.slug });
    }
  }
  
  // activities
  console.log(`\n🎭 Processing activities...`);
  for (const act of SEED.activities) {
    const item = await resolveEntry(act.name, act.search_hint || act.name, null);
    out.items.push({ ...item, type: act.type, group: 'activity' });
  }
  
  await fs.writeFile(OUT_DATA, JSON.stringify(out, null, 2));
  console.log(`\n✅ Saved metadata -> ${OUT_DATA}`);
  console.log(`📊 Total items: ${out.items.length}`);
  console.log(`🖼️  Images downloaded to: ${OUT_DIR}`);
}

main().catch(console.error);
