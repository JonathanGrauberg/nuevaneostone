import type { Metadata } from "next";
import { CollectionsExplorer } from "@/components/colecciones/CollectionsExplorer";
import { getColecciones } from "@/lib/content";

export const metadata: Metadata = {
  title: "Colecciones",
  description:
    "Cocinas Pura, Line, Urban, Ciro, London y Herencia, placards y vestidores. Conocé cada colección Neostone y todas sus terminaciones.",
};

export default function ColeccionesPage() {
  const colecciones = getColecciones();
  return <CollectionsExplorer colecciones={colecciones} inicial={colecciones[0].slug} />;
}
