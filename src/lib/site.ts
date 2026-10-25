import type { Metadata } from "next";

// TODO: En producción, define SITE_URL en Vercel (ej. "https://tudominio.com").
// Mientras se trabaja en local se usa un dominio de ejemplo.
export const SITE_URL = process.env.SITE_URL ?? "https://tudominio.com";

export const SITE_NAME = "Movimiento del Bate";

export const OG_IMAGE_URL = `${SITE_URL}/logo-principal.png`;

export function buildOpenGraph(
  title: string,
  description: string,
  path: string,
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: SITE_NAME,
    title,
    description,
    url: `${SITE_URL}${path}`,
    images: [{ url: OG_IMAGE_URL, alt: SITE_NAME }],
  };
}

export function buildTwitter(
  title: string,
  description: string,
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE_URL],
  };
}
