import type { Metadata } from "next";

// Dominio oficial de producción. Se puede sobrescribir con la variable SITE_URL en Vercel.
export const SITE_URL =
  process.env.SITE_URL ?? "https://www.movimientodelbate.com";

export const SITE_NAME = "Movimiento del Bate";

export const SITE_DESCRIPTION =
  "Movimiento ciudadano por la defensa del orden, la libertad y el bienestar. Conoce la causa, fórmate en la Escuela de Líderes y lleva el bate puesto.";

export const INSTAGRAM_URL = "https://www.instagram.com/davidtoledoosp";

export const LOGO_URL = `${SITE_URL}/logo-principal.png`;

export function buildCanonical(path: string) {
  return `${SITE_URL}${path}`;
}

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
    images: [{ url: LOGO_URL, alt: SITE_NAME }],
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
    images: [LOGO_URL],
  };
}

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: LOGO_URL,
        description: SITE_DESCRIPTION,
        sameAs: [INSTAGRAM_URL],
      },
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
      },
    ],
  };
}
