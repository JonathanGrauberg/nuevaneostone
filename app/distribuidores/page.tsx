import type { Metadata } from "next";
import { PaginaFormulario } from "@/components/forms/PaginaFormulario";
import { formularios } from "@/data/formularios";

export const metadata: Metadata = {
  title: "Quiero ser distribuidor",
  description: "Sumate a la red de showrooms Neostone en todo el país.",
};

export default function DistribuidoresPage() {
  return <PaginaFormulario datos={formularios.distribuidores} />;
}
