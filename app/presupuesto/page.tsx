import type { Metadata } from "next";
import { PaginaFormulario } from "@/components/forms/PaginaFormulario";
import { formularios } from "@/data/formularios";
import { getColeccion, getShowroom } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solicitar presupuesto",
  description: "Pedí tu presupuesto de cocina, placard o vestidor Neostone. Te contacta un asesor.",
};

// ?showroom=<slug> o ?coleccion=<slug>: se agrega al mensaje desde dónde llegó la consulta.
export default async function PresupuestoPage({ searchParams }: PageProps<"/presupuesto">) {
  const { showroom, coleccion } = await searchParams;
  const s = typeof showroom === "string" ? getShowroom(showroom) : undefined;
  const c = typeof coleccion === "string" ? getColeccion(coleccion) : undefined;
  const extra = [s && `Showroom: ${s.ciudad}`, c && `Colección: ${c.nombre}`].filter((x): x is string => !!x);
  return <PaginaFormulario datos={formularios.presupuesto} extra={extra} />;
}
