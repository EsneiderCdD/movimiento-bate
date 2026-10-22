import type { Metadata } from "next";
import VoluntariadoContent from "@/components/specific/voluntariado/VoluntariadoContent";

export const metadata: Metadata = {
  title: "RED Bateadores — Escuela de líderes",
  description:
    "RED Bateadores conecta, forma y acompaña a una nueva generación de líderes de Antioquia. Una escuela para prepararte y participar en la vida pública de tu municipio.",
};

export default function VoluntariadoPage() {
  return <VoluntariadoContent />;
}
