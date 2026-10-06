// Builds logo variants from the client's original artwork (unchanged proportions & colours).
//  - logo.webp            : original on white (light surfaces)
//  - logo-reversed.webp   : transparent background, black wordmark reversed to white (dark surfaces)
//  - logo-mark.png        : favicon/loader crop of the vortex "o"
const sharp = require('sharp');
const SRC = 'client-materials/artwork/ignisvortex-website-logo.png';
(async () => {
  const { data, info } = await sharp(SRC).trim({ threshold: 18 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    if (sat > 0.35 && r > g + 40) {            // brand red: keep colour, alpha from distance to white
      const a = Math.min(255, Math.round((255 - Math.min(g, b)) * 1.15));
      out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = a;
    } else {                                    // greyscale ink: reverse to white, alpha = darkness
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      out[i] = 255; out[i + 1] = 255; out[i + 2] = 255; out[i + 3] = Math.max(0, Math.min(255, Math.round((255 - lum) * 1.25)));
    }
  }
  const raw = { raw: { width: info.width, height: info.height, channels: 4 } };
  await sharp(out, raw).resize({ width: 640 }).webp({ quality: 92, alphaQuality: 100 }).toFile('public/assets/logo-reversed.webp');
  await sharp(SRC).trim({ threshold: 18 }).resize({ width: 640 }).flatten({ background: '#ffffff' }).webp({ quality: 92 }).toFile('public/assets/logo.webp');
  const meta = await sharp('public/assets/logo.webp').metadata();
  console.log('logo', meta.width, meta.height, info.width, info.height);
  // preview on dark
  await sharp({ create: { width: 700, height: 260, channels: 3, background: '#0e1316' } })
    .composite([{ input: 'public/assets/logo-reversed.webp', left: 30, top: 30 }]).png().toFile('output/logo-reversed-preview.png');
})();
