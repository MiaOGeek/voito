/**
 * Centralized site constants — single source of truth for domain, URL, email.
 * Change NEXT_PUBLIC_SITE_URL in .env to update everywhere.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://voito.info";

export const SITE_DOMAIN = SITE_URL.replace(/^https?:\/\//, "");

export const CONTACT_EMAIL = `contact@${SITE_DOMAIN}`;
