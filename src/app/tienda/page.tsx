import type { Metadata } from "next";
import TiendaPageContent from "@/components/specific/tienda/TiendaPageContent";
import { buildOpenGraph, buildTwitter } from "@/lib/site";

const description =
  "Lleva el bate puesto. Camiseta y gorra del Movimiento del Bate con envíos a toda Colombia.";

export const metadata: Metadata = {
  title: "Tienda",
  description,
  openGraph: buildOpenGraph("Tienda", description, "/tienda"),
  twitter: buildTwitter("Tienda", description),
};

export default function TiendaPage() {
  return <TiendaPageContent />;
}
