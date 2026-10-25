import type { Metadata } from "next";
import NosotrosPageContent from "@/components/specific/nosotros/NosotrosPageContent";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce la causa del Movimiento del Bate: el diagnóstico de la ciudad, el símbolo del bate y nuestros principios. La legítima defensa es un derecho.",
};

export default function NosotrosPage() {
  return <NosotrosPageContent />;
}