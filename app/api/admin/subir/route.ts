import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { estaLogueado } from "@/lib/admin";

/**
 * Subidas del panel /admin: el navegador sube el archivo directo a Vercel Blob
 * (sin pasar por acá, así un video no choca con el límite de tamaño de Vercel).
 * Esta ruta solo firma el permiso, y únicamente con la sesión de admin abierta.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const respuesta = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await estaLogueado())) throw new Error("Sesión vencida: volvé a entrar al panel.");
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4"],
          maximumSizeInBytes: 100 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return Response.json(respuesta);
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 400 });
  }
}
