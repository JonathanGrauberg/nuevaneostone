// Helpers de rutas de imagen. Las imágenes que venían del WordPress anterior
// están migradas a /public/media (mismas carpetas que tenían allá).

/** Imagen de la biblioteca de medios migrada, ej. wp("2025/05/merlot.jpg") */
export const wp = (ruta: string) => "/media/" + ruta;

/** Imagen de showrooms migrada (frentes y staff), ej. asset("frente-rosario.jpg") */
export const asset = (archivo: string) => "/media/showrooms/" + archivo;
