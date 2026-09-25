// Helpers de rutas de imagen. Hoy apuntan al WordPress actual; al migrar las
// imágenes a /public solo se cambian estas dos funciones.
const WP = "https://neostone.com.ar/wp-content/uploads/";
const ASSETS = "https://neostone.com.ar/wp-content/plugins/neostone-showrooms/assets/";

/** Imagen de la biblioteca de medios de WordPress, ej. wp("2025/05/merlot.jpg") */
export const wp = (ruta: string) => WP + ruta;

/** Imagen del plugin de showrooms (frentes y staff), ej. asset("frente-rosario.png") */
export const asset = (archivo: string) => ASSETS + archivo;
