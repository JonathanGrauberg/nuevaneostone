import { leerPromo } from "@/lib/promo";

// La lee el popup del inicio. Cacheada 1 minuto en la CDN: un cambio en /admin tarda hasta eso en verse.
export const dynamic = "force-dynamic";

export async function GET() {
  const promo = await leerPromo();
  return Response.json(promo?.activa ? promo : null, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
