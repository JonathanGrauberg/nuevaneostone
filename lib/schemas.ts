import { z } from "zod";

const slug = z.string().regex(/^[a-z0-9-]+$/, "solo minúsculas, números y guiones");
const imagen = z.string().min(1);

export const materiales = ["melamina", "termolaminado-3d", "polimero"] as const;
export const lineas = ["cocina", "placard"] as const;

export const terminacionSchema = z.object({
  id: slug,
  nombre: z.string().min(1),
  material: z.enum(materiales),
  imagen,
  /** En qué líneas de producto se ofrece. */
  lineas: z.array(z.enum(lineas)).min(1),
  nuevo: z.boolean().optional(),
  /** El badge "NEW" se apaga solo después de esta fecha (AAAA-MM-DD). */
  nuevoHasta: z.iso.date().optional(),
  /** false = oculta en todo el sitio sin borrarla. */
  activo: z.boolean().default(true),
});

export const coleccionSchema = z.object({
  slug,
  nombre: z.string().min(1),
  linea: z.enum(lineas),
  /** Materiales que ofrece: las terminaciones se calculan solas desde el catálogo. */
  materiales: z.array(z.enum(materiales)).min(1),
  /** Excepciones puntuales al catálogo. */
  excluir: z.array(slug).optional(),
  bajada: z.string().min(1),
  descripcion: z.string().min(1),
  parrafos: z.array(z.string()),
  /** Logo de la colección (PNG/SVG blanco). ancho/alto = tamaño real del archivo en px. */
  logo: z.object({ src: imagen, ancho: z.number(), alto: z.number() }).optional(),
  hero: imagen,
  portada: imagen,
  renders: z.array(z.object({ src: imagen, alt: z.string() })),
  activo: z.boolean().default(true),
});

export const provincias = [
  "Buenos Aires", "Catamarca", "Chubut", "Córdoba", "Entre Ríos", "Neuquén",
  "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe",
] as const;

export const dias = ["lun-vie", "lun-sab", "lun-dom", "sab", "dom"] as const;

export const showroomSchema = z.object({
  slug,
  ciudad: z.string().min(1),
  provincia: z.enum(provincias),
  nombre: z.string().min(1),
  razonSocial: z.string().optional(),
  casaCentral: z.boolean().optional(),
  estado: z.enum(["activo", "proximamente", "cerrado"]),
  /** Opcional mientras no se tenga: la página muestra "Dirección a confirmar". */
  direccion: z.string().min(1).optional(),
  geo: z.object({ lat: z.number(), lng: z.number() }),
  /** Opcional: si falta, "Cómo llegar" busca la dirección (o la ciudad) en Google Maps. */
  mapsUrl: z.url().optional(),
  telefonos: z.array(z.object({ texto: z.string(), numero: z.string().regex(/^\+\d{10,13}$/) })),
  whatsapp: z.string().regex(/^\d{12,13}$/).optional(),
  email: z.email().optional(),
  horarios: z.array(
    z.object({
      dias: z.enum(dias),
      /** Tramos "HH:MM-HH:MM", ej. ["9:00-13:00", "16:00-20:00"] */
      tramos: z.array(z.string().regex(/^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/)).min(1),
    }),
  ),
  staff: z.array(z.object({ nombre: z.string(), rol: z.string(), foto: imagen.optional() })),
  /** Sin frente ni galería se muestran placeholders de "Imagen próximamente". */
  frente: imagen.optional(),
  galeria: z.array(imagen),
});

export type Material = (typeof materiales)[number];
export type Linea = (typeof lineas)[number];
export type Provincia = (typeof provincias)[number];
export type Terminacion = z.infer<typeof terminacionSchema>;
export type TerminacionInput = z.input<typeof terminacionSchema>;
export type Coleccion = z.infer<typeof coleccionSchema>;
export type ColeccionInput = z.input<typeof coleccionSchema>;
export type Showroom = z.infer<typeof showroomSchema>;
export type ShowroomInput = z.input<typeof showroomSchema>;
