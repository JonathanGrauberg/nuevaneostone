import { wp } from "@/lib/img";
import type { TerminacionInput } from "@/lib/schemas";

/**
 * CATÁLOGO ÚNICO DE TERMINACIONES
 *
 * Cada color existe UNA sola vez acá. Las colecciones lo muestran solas según
 * su material y línea (cocina / placard), así que:
 *
 * - Agregar un color  → sumar una línea. Aparece en todas las colecciones que usan ese material.
 * - Ocultarlo         → activo: false (no hace falta borrarlo).
 * - Marcarlo "NEW"    → nuevo: true  (opcional nuevoHasta: "2026-12-31" para que se apague solo).
 * - Solo cocina / solo placard → lineas: ["cocina"] o ["placard"].
 */
const ambas = ["cocina", "placard"] as const;

export const terminaciones: TerminacionInput[] = [
  // ─── MELAMINAS ─────────────────────────────────────────────
  { id: "blanco", nombre: "Blanco", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/blanco-mate-p4-1024x1024.jpg") },
  { id: "everest", nombre: "Everest", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/everest-1024x1024.jpg") },
  { id: "gris-perla", nombre: "Gris Perla", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/gris-perla-5.1-1024x1024.jpg") },
  { id: "gris-macadam", nombre: "Gris Macadam", material: "melamina", lineas: [...ambas], imagen: wp("2025/07/gris-macadam.png") },
  { id: "grafito", nombre: "Grafito", material: "melamina", lineas: [...ambas], imagen: wp("2025/07/gris-grafito-1024x1024.png") },
  { id: "negro", nombre: "Negro", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/negro-4.5-1024x1024.jpg") },
  { id: "gris-caliza", nombre: "Gris Caliza", material: "melamina", lineas: ["cocina"], imagen: wp("2025/07/Griscaliza_1080x1080-1-1017x1024.png") },
  { id: "gris-tapir", nombre: "Gris Tapir", material: "melamina", lineas: ["cocina"], imagen: wp("2025/07/Gristapir_1200x1200-1-1024x1024.jpg") },
  { id: "sahara", nombre: "Sahara", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/mel-sahara-1200wx1200h-1024x1024.jpg") },
  { id: "tribal", nombre: "Tribal", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/mel-tribal-1200wx1200h-1024x1024.jpg") },
  { id: "rosa-antiguo", nombre: "Rosa Antiguo", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/rosa-antiguo-5.3-1024x1024.jpg") },
  { id: "terracota", nombre: "Terracota", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/terracota-4.1-1024x1024.jpg") },
  { id: "tuareg", nombre: "Tuareg", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/mel-tuareg-1200wx1200h-1024x1024.jpg") },
  { id: "safari", nombre: "Safari", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/safari-3.4-1024x1024.jpg") },
  { id: "jade", nombre: "Jade", material: "melamina", lineas: ["cocina"], imagen: wp("2025/07/Jade_1200x1200-1-1024x1024.jpg") },
  { id: "camelia", nombre: "Camelia", material: "melamina", lineas: ["cocina"], imagen: wp("2025/07/CAMELLIA_1200x1200-1-1024x1024.jpg") },
  { id: "scotch", nombre: "Scotch", material: "melamina", lineas: ["cocina"], imagen: wp("2025/07/SCOTCH_1200x1200-2-1024x1024.jpg") },
  { id: "nogal-terracota", nombre: "Nogal Terracota", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/nogal-terracota-3.3-1024x1024.jpg") },
  { id: "merlot", nombre: "Merlot", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/merlot-1024x1024.jpg") },
  { id: "venezia", nombre: "Venezia", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/venezia-4.4-1024x1024.jpg") },
  { id: "caju", nombre: "Caju", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/mel-caju-1200wx1200h-1024x1024.jpg") },
  { id: "olmo-finlandes", nombre: "Olmo Finlandés", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/mel-olmo-finlandes-1200wx1200h-1024x1024.jpg") },
  { id: "roble-trufa", nombre: "Roble Trufa", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/roble-davos-marron-trufa-6.2-1024x1024.jpg") },
  { id: "petiribi", nombre: "Petiribí", material: "melamina", lineas: [...ambas], imagen: wp("2025/10/PETIRIBI.png") },
  { id: "lino-blanco", nombre: "Lino Blanco", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/lino-blanco-3.2-1024x1024.jpg") },
  { id: "seda-giorno", nombre: "Seda Giorno", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/seda-giorno-5.5-1024x1024.jpeg") },
  { id: "seda-notte", nombre: "Seda Notte", material: "melamina", lineas: [...ambas], imagen: wp("2025/05/seda-notte-6.1-1024x1024.jpeg") },
  { id: "negro-veta", nombre: "Negro Veta", material: "melamina", lineas: [...ambas], imagen: wp("2025/10/negro-veta-1024x1012.png") },
  // Solo placards (según el sitio actual)
  { id: "amaranto", nombre: "Amaranto", material: "melamina", lineas: ["placard"], imagen: wp("2025/05/amaranto-3.1-1024x1024.jpg") },
  { id: "capuccino", nombre: "Capuccino", material: "melamina", lineas: ["placard"], imagen: wp("2025/05/capuccino-3.5-1024x1024.jpg") },
  { id: "guayabira-americana", nombre: "Guayabira Americana", material: "melamina", lineas: ["placard"], imagen: wp("2025/05/guayabira-americana-4.3-1024x1024.jpg") },
  { id: "lino-terra", nombre: "Lino Terra", material: "melamina", lineas: ["placard"], imagen: wp("2025/05/lino-terra-5.4-1024x1024.jpeg") },

  // ─── TERMOLAMINADO 3D (cocinas) ────────────────────────────
  { id: "termo-grafito", nombre: "Grafito", material: "termolaminado-3d", lineas: ["cocina"], imagen: wp("2025/05/mel-grafito-1200wx1200h-1-p1-1024x1024.jpg") },
  { id: "termo-negro-mate", nombre: "Negro Mate", material: "termolaminado-3d", lineas: ["cocina"], imagen: wp("2025/05/nero-mate-p2-1024x1024.jpg") },
  { id: "termo-blanco-mate", nombre: "Blanco Mate", material: "termolaminado-3d", lineas: ["cocina"], imagen: wp("2025/05/blanco-mate-p.3-1024x1024.jpg") },
  // TODO: en el sitio actual este "Blanco" usa la misma foto que la melamina Blanco. Confirmar imagen.
  { id: "termo-blanco", nombre: "Blanco", material: "termolaminado-3d", lineas: ["cocina"], imagen: wp("2025/05/blanco-mate-p4-1024x1024.jpg") },
  { id: "termo-macadamia", nombre: "Macadamia", material: "termolaminado-3d", lineas: ["cocina"], nuevo: true, imagen: wp("2025/11/Macadamia.png") },
  { id: "termo-highland-green", nombre: "Highland Green", material: "termolaminado-3d", lineas: ["cocina"], nuevo: true, imagen: wp("2025/11/Highland-Green.png") },
  { id: "termo-reed-green", nombre: "Reed Green", material: "termolaminado-3d", lineas: ["cocina"], nuevo: true, imagen: wp("2025/11/Reed-Green.png") },
  { id: "termo-cajun", nombre: "Cajun", material: "termolaminado-3d", lineas: ["cocina"], nuevo: true, imagen: wp("2025/11/Cajun.png") },
  { id: "termo-tuscan-red", nombre: "Tuscan Red", material: "termolaminado-3d", lineas: ["cocina"], nuevo: true, imagen: wp("2025/11/Tuscan-Red.png") },
  { id: "termo-noce-sorrento", nombre: "Noce Sorrento", material: "termolaminado-3d", lineas: ["cocina"], nuevo: true, imagen: wp("2025/11/Noce-Sorrento-Natural.png") },

  // ─── POLÍMEROS (placards) ──────────────────────────────────
  // TODO: confirmar si "Polímeros" es el mismo material que Termolaminado 3D (usan las mismas fotos).
  { id: "poli-grafito", nombre: "Grafito", material: "polimero", lineas: ["placard"], imagen: wp("2025/05/mel-grafito-1200wx1200h-1-p1-1024x1024.jpg") },
  { id: "poli-negro-mate", nombre: "Negro Mate", material: "polimero", lineas: ["placard"], imagen: wp("2025/05/nero-mate-p2-1024x1024.jpg") },
  { id: "poli-blanco-mate", nombre: "Blanco Mate", material: "polimero", lineas: ["placard"], imagen: wp("2025/05/blanco-mate-p.3-1024x1024.jpg") },
  { id: "poli-blanco", nombre: "Blanco", material: "polimero", lineas: ["placard"], imagen: wp("2025/05/blanco-mate-p4-1024x1024.jpg") },
];

export const nombreMaterial: Record<TerminacionInput["material"], string> = {
  melamina: "Melaminas",
  "termolaminado-3d": "Termolaminado 3D",
  polimero: "Polímeros",
};
