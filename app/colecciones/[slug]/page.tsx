import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionsExplorer } from "@/components/colecciones/CollectionsExplorer";
import { getColeccion, getColecciones } from "@/lib/content";

// Misma pantalla que /colecciones, con la colección preseleccionada: cada una
// tiene URL propia, título y descripción para posicionar en buscadores.
export const dynamicParams = false;

export function generateStaticParams() {
  return getColecciones().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/colecciones/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getColeccion(slug);
  if (!c) return {};
  const titulo = c.linea === "cocina" ? `Cocina ${c.nombre}` : c.nombre;
  return {
    title: titulo,
    description: c.descripcion,
    alternates: { canonical: `/colecciones/${c.slug}` },
    openGraph: { title: `${titulo} · Neostone`, description: c.descripcion, images: [c.hero] },
  };
}

export default async function ColeccionPage({ params }: PageProps<"/colecciones/[slug]">) {
  const { slug } = await params;
  if (!getColeccion(slug)) notFound();
  return <CollectionsExplorer colecciones={getColecciones()} inicial={slug} />;
}
