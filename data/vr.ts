/**
 * Página Experiencia VR. Textos y medios editables.
 * Los videos están en /public/vr (comprimidos para web, sin audio salvo la presentación).
 */
export const vr = {
  sello: "Primera y única en el rubro en el país",
  titulo: ["Viví tu cocina", "*antes* *de* *tenerla.*"],
  bajada:
    "Con lentes de realidad virtual recorrés tu proyecto en escala real: abrís cajones, mirás texturas y confirmás cada detalle antes de que lo fabriquemos.",
  portal: { video: "/vr/portal-recorrido.mp4", poster: "/vr/portal-recorrido.jpg" },
  persona: "/vr/persona-vr.webp",

  presentacion: {
    video: "/vr/presentacion.mp4",
    poster: "/vr/presentacion.jpg",
    titulo: ["Te lo contamos", "*en* *un* *minuto.*"],
    puntos: [
      "Escala real: ves tu cocina del tamaño que va a tener.",
      "Interacción: abrís, cerrás y recorrés cada rincón.",
      "Decisión segura: confirmás todo antes de fabricar.",
    ],
  },

  equipo: [
    { imagen: "/vr/equipo-visor.jpg", titulo: "Visor de realidad virtual" },
    { imagen: "/vr/equipo-lentes.jpg", titulo: "Lentes de alta definición" },
    { imagen: "/vr/equipo-control.jpg", titulo: "Controles de movimiento" },
  ],
};
