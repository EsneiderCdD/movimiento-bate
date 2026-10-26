import type { Metadata } from "next";
import VoluntariadoContent from "@/components/specific/voluntariado/VoluntariadoContent";
import { buildCanonical, buildOpenGraph, buildTwitter } from "@/lib/site";

const description =
  "Escuela de Líderes: conecta, forma y acompaña a una nueva generación de líderes de Antioquia. Inscríbete y prepárate para participar en la vida pública de tu municipio.";

export const metadata: Metadata = {
  title: "Escuela de Líderes",
  description,
  alternates: { canonical: buildCanonical("/bateadores") },
  openGraph: buildOpenGraph("Escuela de Líderes", description, "/bateadores"),
  twitter: buildTwitter("Escuela de Líderes", description),
};

export default function VoluntariadoPage() {
  return <VoluntariadoContent />;
}
