import { wp } from "@/lib/img";
import type { ColeccionInput } from "@/lib/schemas";

/**
 * COLECCIONES
 *
 * El orden de este array es el orden en el sitio. Las terminaciones NO se listan
 * acá: salen solas del catálogo (data/terminaciones.ts) según `materiales` y `linea`.
 * Para ocultar un color puntual en una colección: excluir: ["id-del-color"].
 *
 * hero    → imagen horizontal grande de fondo (estilo póster)
 * portada → imagen para la tarjeta selectora
 * logo    → ancho/alto reales del archivo (para no deformarlo). Ideal: SVG o PNG de 1000px+
 */
export const colecciones: ColeccionInput[] = [
  {
    slug: "urban",
    logo: { src: wp("2025/05/urbanneo.png"), ancho: 139, alto: 21 },
    nombre: "Urban",
    linea: "cocina",
    materiales: ["melamina", "termolaminado-3d"],
    bajada: "Equilibrio",
    descripcion:
      "Urban es equilibrio. Su estilo logra la armonía perfecta entre las texturas y formas cromáticas de la modernidad. Es de líneas simples, concretas y ordenadas.",
    parrafos: [
      "Por la ausencia de tiradores permite una valorización de los materiales y de las combinaciones proyectuales.",
      "Esta composición le da a los ambientes un aire ligero y relajado.",
    ],
    hero: wp("2025/05/Linea-Urban-Camara-1-1-2048x1436.jpg"),
    portada: wp("2025/05/Linea-Urban-Camara-3_bis-1.jpg"),
    renders: [
      { src: wp("2025/05/Linea-Urban-Camara-1-1-2048x1436.jpg"), alt: "Cocina Urban, vista general" },
      { src: wp("2025/05/Linea-Urban-Camara-3_bis-1.jpg"), alt: "Cocina Urban, detalle" },
      { src: wp("2025/05/Linea-Urban-Camra-2_bis-1.jpg"), alt: "Cocina Urban, isla" },
    ],
  },
  {
    slug: "london",
    logo: { src: wp("2025/05/londonneo.png"), ancho: 141, alto: 23 },
    nombre: "London",
    linea: "cocina",
    materiales: ["termolaminado-3d"],
    bajada: "Carácter británico",
    descripcion:
      "Reinterpretando a los espacios británicos, London adquiere el carácter anglosajón. Su talante pop retro en contraste con algunos elementos vintage le da su personalidad y originalidad.",
    parrafos: ["London llena de expresión, modernismo y vida propia a los espacios, volviéndolos acogedores."],
    hero: wp("2025/05/Cocina-London_Camara_1-2048x1318.jpg"),
    portada: wp("2025/05/Cocina-London_Camara_3.jpg"),
    renders: [
      { src: wp("2025/05/Cocina-London-Camara-2-2048x1733.jpg"), alt: "Cocina London, vista general" },
      { src: wp("2025/05/Cocina-London_Camara_3.jpg"), alt: "Cocina London, detalle" },
      { src: wp("2025/05/Cocina-London_Camara_1-2048x1318.jpg"), alt: "Cocina London, vista frontal" },
    ],
  },
  {
    slug: "ciro",
    logo: { src: wp("2025/05/cironeo.png"), ancho: 146, alto: 46 },
    nombre: "Ciro",
    linea: "cocina",
    materiales: ["melamina", "termolaminado-3d"],
    bajada: "Fuerza, orden y libertad",
    descripcion:
      "Con una personalidad avasallante y original, pero despojado de excesos, Ciro se concentra en lo esencial.",
    parrafos: [
      "Basado en el minimalismo, su diseño proyecta formas básicas y armónicas, y se distingue por sus elementos gráciles, sus colores puros, sus formas simétricas, sus texturas serenas y el uso casi literal de los materiales que combina.",
      "Fuerza, orden y libertad son los conceptos que caracterizan la línea, aportándole a los ambientes el valor de la espacialidad y la comodidad.",
    ],
    hero: wp("2025/05/Camara-Principal-2048x1096.jpg"),
    portada: wp("2025/05/Detalle-Marca.jpg"),
    renders: [
      { src: wp("2025/05/Camara-Lateral-2048x1333.jpg"), alt: "Cocina Ciro, vista lateral" },
      { src: wp("2025/05/Detalle-Marca.jpg"), alt: "Cocina Ciro, detalle" },
      { src: wp("2025/05/Camara-Principal-2048x1096.jpg"), alt: "Cocina Ciro, vista principal" },
    ],
  },
  {
    slug: "pura",
    logo: { src: wp("2025/05/puraproduc-1.png"), ancho: 178, alto: 27 },
    nombre: "Pura",
    linea: "cocina",
    materiales: ["melamina", "termolaminado-3d"],
    bajada: "Razón y precisión",
    descripcion:
      "Fundamentada en la razón y la precisión, es de formas sencillas y funcionales, pero con un lenguaje innovador.",
    parrafos: [
      "Esta línea renuncia a la ornamentación excesiva y otorga gran importancia al diseño práctico e inteligente.",
      "Pura es rupturista respecto de los conceptos tradicionales del diseño.",
    ],
    hero: wp("2025/05/Linea-Pura-Camara-01-2048x1170.jpg"),
    portada: wp("2025/05/Linea-Pura-Camara-02-1843x2048.jpg"),
    renders: [
      { src: wp("2025/05/Linea-Pura-Camara-01-2048x1170.jpg"), alt: "Cocina Pura, vista general" },
      { src: wp("2025/05/Linea-Pura-Camara-02-1843x2048.jpg"), alt: "Cocina Pura, detalle" },
      { src: wp("2025/05/Linea-Pura-Camara-03-1843x2048.jpg"), alt: "Cocina Pura, vista lateral" },
    ],
  },
  {
    slug: "herencia",
    logo: { src: wp("2025/05/herencianeo.png"), ancho: 165, alto: 32 },
    nombre: "Herencia",
    linea: "cocina",
    materiales: ["termolaminado-3d"],
    bajada: "Clásica y atemporal",
    descripcion:
      "Herencia es una línea elegante que no se priva de nada: sus accesorios vanguardistas y sus criterios modernos de diseño desafían los límites de su atmósfera vintage.",
    parrafos: [
      "Con su carácter clásico y tradicional llena de seguridad los ambientes.",
      "Con su singularidad estética, funcional y tecnológica los hace atemporales.",
    ],
    hero: wp("2025/05/Vista-Principal-2048x1318.jpg"),
    portada: wp("2025/05/Detalle-camara-2-scaled.jpg"),
    renders: [
      { src: wp("2025/05/Detalle-camara-2-scaled.jpg"), alt: "Cocina Herencia, detalle" },
      { src: wp("2025/05/Vista-Principal-2048x1318.jpg"), alt: "Cocina Herencia, vista principal" },
      { src: wp("2025/05/detalle-camara-3-2048x1638.jpg"), alt: "Cocina Herencia, detalle de módulos" },
    ],
  },
  {
    slug: "line",
    logo: { src: wp("2025/05/lineneo.png"), ancho: 112, alto: 42 },
    nombre: "Line",
    linea: "cocina",
    materiales: ["melamina"],
    bajada: "Diseño posmoderno",
    descripcion:
      "Es la expresión del diseño posmoderno. Ecléctica, nos transporta en el tiempo: sus detalles nos llevan al pasado, su simplicidad nos sienta en el presente.",
    parrafos: ["Y el ingenio de sus formas nos traslada al futuro."],
    hero: wp("2025/05/Camara_01-2048x1219.jpg"),
    portada: wp("2025/05/Camara_03_cambio-abrir-scaled.jpg"),
    renders: [
      { src: wp("2025/05/Camara_01-2048x1219.jpg"), alt: "Cocina Line, vista general" },
      { src: wp("2025/05/Camara_03_cambio-abrir-scaled.jpg"), alt: "Cocina Line, detalle de apertura" },
      { src: wp("2025/05/Camara_02-2048x1277.jpg"), alt: "Cocina Line, vista lateral" },
    ],
  },
  {
    slug: "placards",
    // Sin logo: el archivo "placardsneo.png" es solo un ícono de percha, sin el nombre. Se muestra en texto.
    nombre: "Placards y Vestidores",
    linea: "placard",
    materiales: ["melamina", "polimero"],
    bajada: "Orden y bienestar",
    descripcion:
      "Dicen que el placard refleja el estado de la mente. Nuestros diseños están destinados exclusivamente para quienes asocian orden con bienestar.",
    parrafos: [],
    hero: wp("2025/05/placares.jpg"),
    portada: wp("2025/05/placares01.jpg"),
    renders: [
      { src: wp("2025/05/placares01.jpg"), alt: "Placard Neostone" },
      { src: wp("2025/05/vestidor-rincon-colores-humo-vulcano.jpg"), alt: "Vestidor en rincón, colores Humo y Vulcano" },
      { src: wp("2025/05/placares.jpg"), alt: "Placards Neostone" },
    ],
  },
];
