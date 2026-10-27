import type { NextConfig } from "next";

// URLs del sitio WordPress anterior → rutas nuevas (301, conserva SEO).
const redirecciones: [string, string][] = [
  ["/coleccion-pura", "/colecciones/pura"],
  ["/coleccion-line", "/colecciones/line"],
  ["/coleccion-urban", "/colecciones/urban"],
  ["/coleccion-ciro", "/colecciones/ciro"],
  ["/coleccion-london", "/colecciones/london"],
  ["/coleccion-herencia", "/colecciones/herencia"],
  ["/placards-y-vestidores-2", "/colecciones/placards"],
  ["/cocinas", "/colecciones"],
  ["/productos", "/colecciones"],
  ["/inicio", "/"],
  // Beneficios pasó a ser una sección del home
  ["/beneficios-neostone", "/#beneficios"],
  ["/beneficios", "/#beneficios"],
  ["/solicitar-presupuesto", "/presupuesto"],
  ["/quiero-ser-distribuidor", "/distribuidores"],
  ["/servicio-post-venta", "/postventa"],
  ["/contacto", "/presupuesto"],
  ["/showroomsdemo", "/showrooms"],
  ["/casa-neostone", "/showrooms/crespo"],
  ["/showroom-archive/casa-central", "/showrooms/crespo"],
  ["/trelew-2", "/showrooms/trelew"],
  ["/villa-maria-cordoba", "/showrooms/villa-maria"],
  ...[
    "bahia-blanca", "general-villegas", "junin", "mar-del-plata", "pergamino",
    "tres-arroyos", "trelew", "comodoro-rivadavia", "cordoba", "crespo",
    "gualeguaychu", "salta", "san-juan", "san-luis", "rosario", "bariloche",
  ].map((s): [string, string] => [`/${s}`, `/showrooms/${s}`]),
];

const nextConfig: NextConfig = {
  images: {
    // Temporal: las imágenes se sirven desde el WordPress actual hasta migrarlas a /public.
    remotePatterns: [new URL("https://neostone.com.ar/wp-content/**")],
    qualities: [75, 90],
  },
  async redirects() {
    return redirecciones.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
