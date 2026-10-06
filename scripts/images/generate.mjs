// Server-side AI image generation for the website (run locally / in CI, never in the browser).
//
//   node --env-file=.env scripts/images/generate.mjs              # generate missing images
//   node --env-file=.env scripts/images/generate.mjs --only=hero-pump-room --force
//   node --env-file=.env scripts/images/generate.mjs --escalate=prod-detection --force   # retry on Sunburst
//   node scripts/images/generate.mjs --dry-run                     # show routing decisions only
//   node scripts/images/generate.mjs --optimise-only               # rebuild WebP files from saved originals
//
// The key is read from OPENAI_API_KEY and is never logged, written to disk or bundled.
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { IMAGE_CONFIG, routeModel, routeQuality, routeSize } from './config.mjs';
import { IMAGE_JOBS } from './manifest.mjs';

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v ?? true];
}));
const only = typeof args.only === 'string' ? new Set(args.only.split(',')) : null;
const escalate = typeof args.escalate === 'string' ? new Set(args.escalate.split(',')) : new Set();
const logPath = path.join(IMAGE_CONFIG.sourceDir, 'generation-log.json');

const exists = (p) => access(p).then(() => true, () => false);

async function requestImage({ model, quality, size, prompt }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set. Add it to .env (never commit it).');
  let lastError;
  for (let attempt = 0; attempt <= IMAGE_CONFIG.retries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), IMAGE_CONFIG.requestTimeoutMs);
    try {
      const res = await fetch(IMAGE_CONFIG.endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt, size, quality, n: 1, output_format: IMAGE_CONFIG.outputFormat }),
        signal: controller.signal,
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = body?.error?.message || res.statusText;
        // Client errors (bad model name, policy) are not retried.
        if (res.status < 500 && res.status !== 429) throw Object.assign(new Error(`${res.status}: ${message}`), { fatal: true });
        throw new Error(`${res.status}: ${message}`);
      }
      const b64 = body?.data?.[0]?.b64_json;
      if (!b64) throw new Error('Response contained no image data.');
      return Buffer.from(b64, 'base64');
    } catch (error) {
      lastError = error;
      if (error.fatal) break;
      await new Promise((r) => setTimeout(r, 4000 * (attempt + 1)));
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}

async function optimise(id, sourceFile) {
  const { large, small } = IMAGE_CONFIG.optimise;
  const out = (suffix) => path.join(IMAGE_CONFIG.publicDir, `${id}${suffix}.webp`);
  await sharp(sourceFile).resize({ width: large.width, withoutEnlargement: true }).webp({ quality: large.quality, effort: 6 }).toFile(out(''));
  await sharp(sourceFile).resize({ width: small.width, withoutEnlargement: true }).webp({ quality: small.quality, effort: 6 }).toFile(out('-small'));
}

async function main() {
  await mkdir(IMAGE_CONFIG.sourceDir, { recursive: true });
  await mkdir(IMAGE_CONFIG.publicDir, { recursive: true });
  const log = (await exists(logPath)) ? JSON.parse(await readFile(logPath, 'utf8')) : {};
  const jobs = IMAGE_JOBS.filter((j) => !only || only.has(j.id));
  const failures = [];

  for (const job of jobs) {
    const routed = routeModel({ ...job, escalate: escalate.has(job.id) });
    const quality = routeQuality(job);
    const size = routeSize(job);
    const sourceFile = path.join(IMAGE_CONFIG.sourceDir, `${job.id}.png`);
    const summary = `${job.id.padEnd(24)} ${routed.tier.padEnd(9)} ${quality.padEnd(7)} ${size}`;

    if (args['dry-run']) { console.log(summary); continue; }
    if (args['optimise-only']) {
      if (await exists(sourceFile)) { await optimise(job.id, sourceFile); console.log(`optimised  ${job.id}`); }
      continue;
    }
    if (!args.force && (await exists(sourceFile))) { console.log(`skip       ${job.id} (exists)`); continue; }

    console.log(`generate   ${summary}`);
    try {
      const png = await requestImage({ model: routed.model, quality, size, prompt: job.prompt });
      await writeFile(sourceFile, png);
      await optimise(job.id, sourceFile);
      log[job.id] = { model: routed.model, tier: routed.tier, quality, size, placement: job.use, alt: job.alt, prompt: job.prompt, generatedAt: new Date().toISOString() };
      await writeFile(logPath, JSON.stringify(log, null, 2));
      console.log(`done       ${job.id}`);
    } catch (error) {
      failures.push(job.id);
      console.error(`FAILED     ${job.id}: ${error.message}`);
    }
  }
  if (failures.length) { console.error(`\n${failures.length} job(s) failed: ${failures.join(', ')}`); process.exitCode = 1; }
}

main();
