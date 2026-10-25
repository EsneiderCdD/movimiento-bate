import type { Metadata } from "next";
import VoluntariadoContent from "@/components/specific/voluntariado/VoluntariadoContent";

export const metadata: Metadata = {
  title: "Escuela de Líderes",
  description:
    "Escuela de Líderes: conecta, forma y acompaña a una nueva generación de líderes de Antioquia. Inscríbete y prepárate para participar en la vida pública de tu municipio.",
};

export default function VoluntariadoPage() {
  return <VoluntariadoContent />;
}
