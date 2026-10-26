import type { Metadata } from "next";
import HomeContent from "@/components/specific/HomeContent";
import { buildCanonical, buildOpenGraph, buildTwitter } from "@/lib/site";

const description =
  "Movimiento ciudadano por la defensa del orden, la libertad y el bienestar. Conoce la causa, fórmate en la Escuela de Líderes y lleva el bate puesto.";

export const metadata: Metadata = {
  description,
  alternates: { canonical: buildCanonical("/") },
  openGraph: buildOpenGraph("Movimiento del Bate", description, "/"),
  twitter: buildTwitter("Movimiento del Bate", description),
};

export default function Home() {
  return <HomeContent />;
}
