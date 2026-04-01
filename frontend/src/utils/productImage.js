import { PRODUCT_IMAGE_BY_SKU, PRODUCT_IMAGE_BY_ID } from './productImageUrls';

/**
 * Resolves a display URL for product images.
 * - Absolute http(s) URLs from the API are used as-is (e.g. hosted uploads).
 * - Seed paths like `/images/products/...` map to curated, product-specific photos
 *   (see productImageUrls.js), not random placeholders.
 */
export const PLACEHOLDER_SVG =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">' +
      '<rect fill="#e8eef4" width="400" height="400"/>' +
      '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="15">No image</text>' +
      '</svg>'
  );

/** When SKU/id are not in the curated map (new DB rows), use category-appropriate stock art */
const CATEGORY_IMAGE_BY_ID = {
  1:
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&h=800&q=85',
  2:
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&h=800&q=85',
  3:
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&h=800&q=85',
  4:
    'https://images.unsplash.com/photo-1524592094714-0f0654df2032?auto=format&fit=crop&w=800&h=800&q=85',
  5:
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&h=800&q=85',
  6:
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&h=800&q=85',
};

/** Last resort: match words in product name to a relevant Unsplash image */
const NAME_KEYWORD_IMAGE = {
  classic: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&h=800&q=85',
  shirt: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&h=800&q=85',
  cotton: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&h=800&q=85',
  denim: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&h=800&q=85',
  jean: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&h=800&q=85',
  hoodie: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&h=800&q=85',
  dress: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&h=800&q=85',
  earbud: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&h=800&q=85',
  power: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&h=800&q=85',
  webcam: 'https://images.unsplash.com/photo-1587825140708-dfaf36ae4b04?auto=format&fit=crop&w=800&h=800&q=85',
  keyboard: 'https://images.unsplash.com/photo-1587829741301-dfce9807398a?auto=format&fit=crop&w=800&h=800&q=85',
  fitness: 'https://images.unsplash.com/photo-1575311373-354091eadd16?auto=format&fit=crop&w=800&h=800&q=85',
  dock: 'https://images.unsplash.com/photo-1625948515291-69613e3f2b61?auto=format&fit=crop&w=800&h=800&q=85',
  running: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&h=800&q=85',
  boot: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&h=800&q=85',
  sneaker: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&h=800&q=85',
  sandal: 'https://images.unsplash.com/photo-1603487747321-0f943b571627?auto=format&fit=crop&w=800&h=800&q=85',
  sandals: 'https://images.unsplash.com/photo-1603487747321-0f943b571627?auto=format&fit=crop&w=800&h=800&q=85',
  orthopedic: 'https://images.unsplash.com/photo-1603487747321-0f943b571627?auto=format&fit=crop&w=800&h=800&q=85',
  comfort: 'https://images.unsplash.com/photo-1603487747321-0f943b571627?auto=format&fit=crop&w=800&h=800&q=85',
  slipper: 'https://images.unsplash.com/photo-1603487747321-0f943b571627?auto=format&fit=crop&w=800&h=800&q=85',
  loafer: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&h=800&q=85',
  footwear: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&h=800&q=85',
  ultrabook: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&h=800&q=85',
  laptop: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&h=800&q=85',
  monitor: 'https://images.unsplash.com/photo-1587825140708-dfaf36ae4b04?auto=format&fit=crop&w=800&h=800&q=85',
  mouse: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&h=800&q=85',
  speaker: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e2?auto=format&fit=crop&w=800&h=800&q=85',
  headphone: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&h=800&q=85',
  jacket: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&h=800&q=85',
  blazer: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&h=800&q=85',
  basketball: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&h=800&q=85',
  watch: 'https://images.unsplash.com/photo-1524592094714-0f0654df2032?auto=format&fit=crop&w=800&h=800&q=85',
  wallet: 'https://images.unsplash.com/photo-1627123422854-54171e387166?auto=format&fit=crop&w=800&h=800&q=85',
  sunglass: 'https://images.unsplash.com/photo-1572635196233-15c0428dce29?auto=format&fit=crop&w=800&h=800&q=85',
  backpack: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&h=800&q=85',
  necklace: 'https://images.unsplash.com/photo-1515562141207-7e88ddb14c4b?auto=format&fit=crop&w=800&h=800&q=85',
  cook: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&h=800&q=85',
  pillow: 'https://images.unsplash.com/photo-1584100936591-c59d0a4e3e5e?auto=format&fit=crop&w=800&h=800&q=85',
  vacuum: 'https://images.unsplash.com/photo-1558317374-067fb8d3ccb3?auto=format&fit=crop&w=800&h=800&q=85',
  board: 'https://images.unsplash.com/photo-1604909052743-94e838986260?auto=format&fit=crop&w=800&h=800&q=85',
  diffuser: 'https://images.unsplash.com/photo-1608571423902-eed4a2ed0600?auto=format&fit=crop&w=800&h=800&q=85',
  book: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&h=800&q=85',
  algorithm: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&h=800&q=85',
  habit: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&h=800&q=85',
  gatsby: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&h=800&q=85',
  sapien: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&h=800&q=85',
  code: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&h=800&q=85',
};

function imageFromProductName(name) {
  if (!name || typeof name !== 'string') return null;
  const normalized = name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const sortedKeys = Object.keys(NAME_KEYWORD_IMAGE).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (normalized.includes(key)) return NAME_KEYWORD_IMAGE[key];
  }
  const words = normalized.split(/\s+/).filter((w) => w.length > 1);
  for (const w of words) {
    if (NAME_KEYWORD_IMAGE[w]) return NAME_KEYWORD_IMAGE[w];
    for (const key of sortedKeys) {
      if (w.includes(key) || key.includes(w)) return NAME_KEYWORD_IMAGE[key];
    }
  }
  return null;
}

function firstImageSource(p, entity) {
  if (Array.isArray(p?.images) && p.images.length) return p.images[0];
  if (p?.image_url) return p.image_url;
  if (p?.image) return p.image;
  if (Array.isArray(entity?.images) && entity.images.length) return entity.images[0];
  if (entity?.image_url) return entity.image_url;
  if (entity?.image) return entity.image;
  return null;
}

function curatedForProduct(p, entity) {
  const sku = p?.sku ?? entity?.sku;
  if (sku && PRODUCT_IMAGE_BY_SKU[sku]) {
    return PRODUCT_IMAGE_BY_SKU[sku];
  }

  const nested = Boolean(entity?.product && typeof entity.product === 'object');
  const productNumericId = nested
    ? (p?.id ?? p?._id)
    : (p?.product_id ?? entity?.product_id ?? entity?.productId ?? p?.id ?? p?._id);

  const pid = Number(productNumericId);
  if (!Number.isNaN(pid) && PRODUCT_IMAGE_BY_ID[pid]) {
    return PRODUCT_IMAGE_BY_ID[pid];
  }

  const catNum = Number(p?.category_id ?? entity?.category_id);
  if (!Number.isNaN(catNum) && CATEGORY_IMAGE_BY_ID[catNum]) {
    return CATEGORY_IMAGE_BY_ID[catNum];
  }
  return imageFromProductName(p?.name) || imageFromProductName(entity?.name);
}

export function getProductImageUrl(entity) {
  if (!entity) return PLACEHOLDER_SVG;

  const p = entity.product && typeof entity.product === 'object' ? entity.product : entity;
  const raw = firstImageSource(p, entity);

  // Prefer SKU / id / category / name-matched Unsplash URLs first. Seed DB often stores
  // `/images/products/...` but the frontend has no public folder — those 404 and show "No image".
  const curated = curatedForProduct(p, entity);
  if (curated) return curated;

  if (raw != null && String(raw).trim() !== '') {
    const s = String(raw).trim();
    if (/^https?:\/\//i.test(s)) return s;
  }

  return PLACEHOLDER_SVG;
}
