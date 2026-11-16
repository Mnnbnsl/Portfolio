/**
 * Single source of truth for the canonical origin and shared metadata.
 * Set NEXT_PUBLIC_SITE_URL (or SITE_URL) in the deployment environment when
 * the production domain changes; every canonical, sitemap, and social tag
 * follows automatically.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  'https://mnnbnsl.vercel.app'
).replace(/\/+$/, '');

export const SITE_NAME = 'Manan Bansal';
export const SITE_TITLE = 'Manan Bansal — AI & Backend Developer';
export const SITE_DESCRIPTION =
  'Manan Bansal is a software engineer building AI agents, backend systems, and the infrastructure behind them.';
export const SITE_LOCALE = 'en_US';
export const TWITTER_CREATOR = '@mugiwara_mnn';

export const SITE_OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — AI & Backend Developer`,
} as const;

/** Resolve a root-relative path against the canonical origin. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, `${SITE_URL}/`).toString();
}
