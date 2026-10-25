import type { Metadata } from "next";
import TiendaPageContent from "@/components/specific/tienda/TiendaPageContent";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Lleva el bate puesto. Camiseta y gorra del Movimiento del Bate con envíos a toda Colombia.",
};

export default function TiendaPage() {
  return <TiendaPageContent />;
}
