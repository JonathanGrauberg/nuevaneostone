import { z } from "zod";

/** Medios de pago que se pueden mostrar al pie del popup */
export const medios = ["visa", "mastercard", "naranja", "banco"] as const;

/**
 * Popup de promoción del inicio (maqueta fija, textos e imagen editables desde /admin).
 * Los textos tienen valor por defecto: así una promo guardada antes de sumar un campo sigue valiendo.
 */
export const promoSchema = z.object({
  /** Cambia en cada guardado: el popup vuelve a mostrarse a quien ya vio la promo anterior */
  id: z.string(),
  activa: z.boolean(),
  imagen: z.url(),
  /** Texto chico sobre la foto (solo en escritorio) */
  epigrafe: z.string().default(""),
  eyebrow: z.string().default(""),
  titulo: z.string().default(""),
  texto: z.string().default(""),
  boton: z.string().default("Recorrer el sitio"),
  botonVideo: z.string().default("Ver video"),
  video: z.url().optional(),
  videoCelular: z.url().optional(),
  medios: z.array(z.enum(medios)).default([...medios]),
});
export type Promo = z.infer<typeof promoSchema>;

/** Textos de arranque para una promo nueva (los de la maqueta de noviembre) */
export const promoEjemplo: Omit<Promo, "id" | "imagen"> = {
  activa: true,
  epigrafe: "Colección Ciro · Fabricada en Crespo, Entre Ríos",
  eyebrow: "Noviembre · Condiciones especiales",
  titulo: "Queremos que tengas una cocina Neostone.",
  texto: "En noviembre tenemos amplias condiciones y formas de pago a tu medida. Acercate o pedí asesoramiento en cualquiera de nuestros distribuidores oficiales.",
  boton: "Recorrer el sitio",
  botonVideo: "Ver video",
  medios: [...medios],
};
