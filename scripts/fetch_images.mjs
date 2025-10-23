// node scripts/fetch_images.mjs
import fs from 'node:fs/promises';
import path from 'node:path';

const SEED = JSON.parse(await fs.readFile('data/th_seed.json', 'utf-8'));
const OUT_DIR = 'public/places';
const META_PATH = 'data/th_images.json';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const headers = { 'User-Agent': 'ThailandApp/1.0 (local build)' };

async function wdSearch(q) {
  const url = new URL('https://www.wikidata.org/w/api.php');
  url.searchParams.set('action','wbsearchentities');
  url.searchParams.set('language','en');
  url.searchParams.set('format','json');
  url.searchParams.set('type','item');
  url.searchParams.set('search', q);
  const r = await fetch(url, { headers }); const j = await r.json();
  return j.search?.[0]?.id || null; // QID
}

async function wdP18(qid) {
  const url = new URL('https://www.wikidata.org/w/api.php');
  url.searchParams.set('action','wbgetentities');
  url.searchParams.set('ids', qid);
  url.searchParams.set('format','json');
  url.searchParams.set('props','claims');
  const r = await fetch(url, { headers }); const j = await r.json();
  return j.entities?.[qid]?.claims?.P18?.[0]?.mainsnak?.datavalue?.value || null;
}

async function commonsInfo(filename) {
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.searchParams.set('action','query');
  url.searchParams.set('format','json');
  url.searchParams.set('prop','imageinfo');
  url.searchParams.set('titles','File:'+filename);
  url.searchParams.set('iiprop','url|extmetadata|user');
  url.searchParams.set('iiurlwidth','2000'); // decent size
  const r = await fetch(url, { headers }); const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  const ii = page?.imageinfo?.[0];
  if (!ii) return null;
  const m = ii.extmetadata || {};
  return {
    url: ii.thumburl || ii.url,
    author_html: m.Artist?.value || ii.user || '',
    license: m.LicenseShortName?.value || '',
    credit_html: m.Credit?.value || ''
  };
}

async function download(url, dest) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error('download failed '+res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

await fs.mkdir(OUT_DIR, { recursive: true });
const out = [];

for (const it of SEED.items) {
  const label = it.name;
  try {
    const qid = it.qid || await wdSearch(it.hint);
    if (!qid) { out.push({ ...it, error: 'no_qid' }); continue; }

    const file = await wdP18(qid);
    if (!file) { out.push({ ...it, qid, error: 'no_p18' }); continue; }

    const info = await commonsInfo(file);
    if (!info) { out.push({ ...it, qid, file, error: 'no_commons_info' }); continue; }

    const dest = path.join(OUT_DIR, `${it.slug}.jpg`);
    try { await fs.access(dest); } catch { await download(info.url, dest); }

    out.push({
      ...it,
      qid, fileTitle: file,
      local: `/places/${it.slug}.jpg`,
      source: 'Wikimedia Commons',
      author_html: info.author_html,
      license: info.license,
      credit_html: info.credit_html
    });

    await sleep(200); // polite
    console.log('OK', label);
  } catch (e) {
    out.push({ ...it, error: e.message });
    console.log('FAIL', label, e.message);
  }
}

await fs.writeFile(META_PATH, JSON.stringify({ items: out }, null, 2));
console.log('Wrote', META_PATH);
