import "server-only";
import { del, list, put } from "@vercel/blob";
import { promoSchema, type Promo } from "./promoSchema";

/**
 * Popup de promoción del inicio. Se carga desde /admin y se guarda en Vercel Blob
 * (imágenes, video y este JSON de configuración), así no hace falta tocar código.
 */
const PREFIJO = "promo/config";
export const hayAlmacenamiento = () => !!process.env.BLOB_READ_WRITE_TOKEN;

/** La promo guardada (activa o no), o null si todavía no se cargó ninguna. */
export async function leerPromo(): Promise<Promo | null> {
  if (!hayAlmacenamiento()) return null;
  try {
    const { blobs } = await list({ prefix: PREFIJO });
    const ultima = blobs.sort((a, b) => +b.uploadedAt - +a.uploadedAt)[0];
    if (!ultima) return null;
    const res = await fetch(ultima.url, { cache: "no-store" });
    return promoSchema.parse(await res.json());
  } catch {
    return null;
  }
}

/**
 * Guarda la configuración nueva y borra lo que quedó sin usar (configs viejas y
 * archivos reemplazados), para no acumular espacio en el almacenamiento.
 */
export async function escribirPromo(promo: Promo) {
  const anterior = await leerPromo();
  const { blobs } = await list({ prefix: PREFIJO });
  // Cada guardado es un archivo nuevo (con sufijo al azar): evita servir una versión vieja desde la caché
  await put(`${PREFIJO}.json`, JSON.stringify(promo), { access: "public", addRandomSuffix: true, contentType: "application/json" });
  const enUso = new Set([promo.imagen, promo.video, promo.videoCelular]);
  const sobrantes = [
    ...blobs.map((b) => b.url),
    ...[anterior?.imagen, anterior?.video, anterior?.videoCelular].filter((u): u is string => !!u && !enUso.has(u)),
  ];
  if (sobrantes.length) await del(sobrantes);
}
