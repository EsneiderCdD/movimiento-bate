import type { Metadata } from "next";
import NosotrosPageContent from "@/components/specific/nosotros/NosotrosPageContent";
import { buildOpenGraph, buildTwitter } from "@/lib/site";

const description =
  "Conoce la causa del Movimiento del Bate: el diagnóstico de la ciudad, el símbolo del bate y nuestros principios. La legítima defensa es un derecho.";

export const metadata: Metadata = {
  title: "Nosotros",
  description,
  openGraph: buildOpenGraph("Nosotros", description, "/nosotros"),
  twitter: buildTwitter("Nosotros", description),
};

export default function NosotrosPage() {
  return <NosotrosPageContent />;
}