import "server-only";
import { z } from "zod";
import { colecciones as coleccionesData } from "@/data/colecciones";
import { showrooms as showroomsData } from "@/data/showrooms";
import { nombreMaterial, terminaciones as terminacionesData } from "@/data/terminaciones";
import { distanciaKm } from "./geo";
import {
  coleccionSchema,
  showroomSchema,
  terminacionSchema,
  type Coleccion,
  type Material,
  type Showroom,
  type Terminacion,
} from "./schemas";

/**
 * Valida los archivos de /data. Si hay un error (campo faltante, id repetido,
 * color inexistente…) el build falla indicando archivo, posición y campo,
 * así nunca se publica un sitio roto.
 */
function validar<T>(archivo: string, schema: z.ZodType<T>, items: unknown[], clave: (i: T) => string): T[] {
  const errores: string[] = [];
  const vistos = new Set<string>();
  const out: T[] = [];
  items.forEach((raw, idx) => {
    const r = schema.safeParse(raw);
    const ref = (raw as { slug?: string; id?: string }).slug ?? (raw as { id?: string }).id ?? `#${idx}`;
    if (!r.success) {
      for (const issue of r.error.issues) errores.push(`  • ${ref} → ${issue.path.join(".") || "(raíz)"}: ${issue.message}`);
      return;
    }
    const k = clave(r.data);
    if (vistos.has(k)) errores.push(`  • "${k}" está repetido`);
    vistos.add(k);
    out.push(r.data);
  });
  if (errores.length) throw new Error(`\n\n✖ Error en data/${archivo}:\n${errores.join("\n")}\n`);
  return out;
}

const todasLasTerminaciones = validar("terminaciones.ts", terminacionSchema, terminacionesData, (t) => t.id);
const todasLasColecciones = validar("colecciones.ts", coleccionSchema, coleccionesData, (c) => c.slug);
const todosLosShowrooms = validar("showrooms.ts", showroomSchema, showroomsData, (s) => s.slug);

// Integridad: los "excluir" deben apuntar a colores que existan.
const idsTerminaciones = new Set(todasLasTerminaciones.map((t) => t.id));
for (const c of todasLasColecciones) {
  for (const id of c.excluir ?? []) {
    if (!idsTerminaciones.has(id)) {
      throw new Error(`\n\n✖ data/colecciones.ts → "${c.slug}" excluye "${id}", que no existe en data/terminaciones.ts\n`);
    }
  }
}

// ─── Terminaciones ────────────────────────────────────────────

export type TerminacionVista = Terminacion & { esNueva: boolean };
export type GrupoTerminaciones = { material: Material; nombre: string; items: TerminacionVista[] };

const hoy = () => new Date().toISOString().slice(0, 10);

function esNueva(t: Terminacion) {
  return !!t.nuevo && (!t.nuevoHasta || t.nuevoHasta >= hoy());
}

export function terminacionesDe(c: Coleccion): GrupoTerminaciones[] {
  const excluir = new Set(c.excluir ?? []);
  return c.materiales
    .map((material) => ({
      material,
      nombre: nombreMaterial[material],
      items: todasLasTerminaciones
        .filter((t) => t.activo && t.material === material && t.lineas.includes(c.linea) && !excluir.has(t.id))
        .map((t) => ({ ...t, esNueva: esNueva(t) })),
    }))
    .filter((g) => g.items.length > 0);
}

// ─── Colecciones ──────────────────────────────────────────────

export type ColeccionVista = Coleccion & { grupos: GrupoTerminaciones[] };

export function getColecciones(): ColeccionVista[] {
  return todasLasColecciones.filter((c) => c.activo).map((c) => ({ ...c, grupos: terminacionesDe(c) }));
}

export function getColeccion(slug: string) {
  return getColecciones().find((c) => c.slug === slug);
}

// ─── Showrooms ────────────────────────────────────────────────

/** Showrooms visibles (activos y próximamente), casa central primero. */
export function getShowrooms(): Showroom[] {
  return todosLosShowrooms
    .filter((s) => s.estado !== "cerrado")
    .sort((a, b) => Number(!!b.casaCentral) - Number(!!a.casaCentral));
}

/** Todos los slugs, incluidos los cerrados (para redirigir sus URLs). */
export function getShowroomSlugs() {
  return todosLosShowrooms.map((s) => s.slug);
}

export function getShowroom(slug: string) {
  return todosLosShowrooms.find((s) => s.slug === slug);
}

/** Datos mínimos para listados y buscador (lo que viaja al navegador). */
export type ShowroomResumen = Pick<Showroom, "slug" | "ciudad" | "provincia" | "nombre" | "geo" | "estado" | "casaCentral"> & {
  imagen?: string;
};

export function getShowroomsResumen(): ShowroomResumen[] {
  return getShowrooms().map((s) => ({
    slug: s.slug,
    ciudad: s.ciudad,
    provincia: s.provincia,
    nombre: s.nombre,
    geo: s.geo,
    estado: s.estado,
    casaCentral: s.casaCentral,
    imagen: s.frente ?? s.galeria[0],
  }));
}

export function showroomsCercanos(s: Showroom, n = 3) {
  return getShowrooms()
    .filter((o) => o.slug !== s.slug)
    .map((o) => ({ showroom: o, km: Math.round(distanciaKm(s.geo, o.geo)) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, n);
}
