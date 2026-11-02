import type { Metadata } from "next";
import { PaginaFormulario } from "@/components/forms/PaginaFormulario";
import { formularios } from "@/data/formularios";

export const metadata: Metadata = {
  title: "Servicio post venta",
  description: "Consultas y ajustes sobre tu amoblamiento Neostone.",
};

export default function PostventaPage() {
  return <PaginaFormulario datos={formularios.postventa} />;
}
