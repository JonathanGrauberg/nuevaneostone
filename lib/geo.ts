export type LatLng = { lat: number; lng: number };

/** Distancia en km entre dos puntos (fórmula de haversine). */
export function distanciaKm(a: LatLng, b: LatLng) {
  const R = 6371;
  const rad = (x: number) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** 0.43 → "450 m" · 3.4 → "3,4 km" · 186.2 → "186 km" · 1204 → "1.204 km" */
export function formatDistancia(km: number) {
  if (km < 1) return `${Math.max(50, Math.round((km * 1000) / 50) * 50)} m`;
  if (km < 10) return `${km.toLocaleString("es-AR", { maximumFractionDigits: 1 })} km`;
  return `${Math.round(km).toLocaleString("es-AR")} km`;
}

/** "Gualeguaychú" → "gualeguaychu" para buscar sin importar tildes ni mayúsculas. */
export const normalizar = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
