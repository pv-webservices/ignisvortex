// Central configuration for AI image generation.
// Change models, quality tiers or sizes here — the generator and manifest read from this file only.
// The API key is NEVER stored here: it is read from process.env.OPENAI_API_KEY at run time (server-side / build-time only).

export const IMAGE_CONFIG = {
  endpoint: process.env.OPENAI_IMAGE_ENDPOINT || 'https://api.openai.com/v1/images/generations',
  models: {
    // Default: fast, cost-efficient model for routine and supporting imagery.
    flare: process.env.OPENAI_IMAGE_MODEL_FLARE || 'gpt-image-2.5-flare',
    // Premium: hero, complex photoreal scenes, multi-subject or detail-sensitive assets.
    sunburst: process.env.OPENAI_IMAGE_MODEL_SUNBURST || 'gpt-image-2.5-sunburst',
  },
  quality: {
    default: process.env.OPENAI_IMAGE_QUALITY_DEFAULT || 'medium',
    premium: process.env.OPENAI_IMAGE_QUALITY_PREMIUM || 'high',
  },
  sizes: {
    square: '1024x1024',
    landscape: '1536x1024',
    portrait: '1024x1536',
  },
  outputFormat: 'png',
  // Optimisation targets for the published WebP derivatives.
  optimise: {
    large: { width: 1600, quality: 80 },
    small: { width: 720, quality: 76 },
  },
  sourceDir: 'client-materials/generated',   // full-resolution originals (not published)
  publicDir: 'public/assets/gen',            // optimised WebP files used by the website
  requestTimeoutMs: 240_000,
  retries: 2,
};

/**
 * Model routing. Sunburst only when the job genuinely needs it; otherwise Flare.
 * A job can force escalation with `escalate: true` (e.g. Flare already produced insufficient quality).
 */
const PREMIUM_TRAITS = new Set([
  'hero', 'premium-banner', 'complex-composition', 'multi-subject', 'photoreal-people',
  'detail-sensitive', 'reference-image', 'industrial-machinery', 'architecture', 'complex-lighting',
]);

export function routeModel(job) {
  const traits = job.traits || [];
  const premiumHits = traits.filter((t) => PREMIUM_TRAITS.has(t));
  // Hero/banner, escalations, or 2+ premium traits justify the premium model.
  const premium = job.escalate || traits.includes('hero') || traits.includes('premium-banner') || premiumHits.length >= 2;
  return premium ? { tier: 'sunburst', model: IMAGE_CONFIG.models.sunburst } : { tier: 'flare', model: IMAGE_CONFIG.models.flare };
}

/** Quality routing: high for prominent / key client-facing assets, medium for supporting imagery. */
export function routeQuality(job) {
  const high = ['hero', 'key', 'feature'].includes(job.prominence);
  return high ? IMAGE_CONFIG.quality.premium : IMAGE_CONFIG.quality.default;
}

/** Orientation routing from intended placement. */
export function routeSize(job) {
  const byPlacement = { banner: 'landscape', hero: 'landscape', background: 'landscape', card: 'landscape', product: 'square', tile: 'square', feature: 'portrait' };
  const orientation = job.orientation || byPlacement[job.placement] || 'square';
  return IMAGE_CONFIG.sizes[orientation];
}
