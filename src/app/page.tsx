import type { Metadata } from "next";
import HomeContent from "@/components/specific/HomeContent";

export const metadata: Metadata = {
  description:
    "Movimiento ciudadano por la defensa del orden, la libertad y el bienestar. Conoce la causa, fórmate en la Escuela de Líderes y lleva el bate puesto.",
};

export default function Home() {
  return <HomeContent />;
}
