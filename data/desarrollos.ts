/**
 * DESARROLLOS (landing para constructoras y desarrolladores)
 *
 * Textos y fotos de la maqueta "Neostone Desarrollos · Landing" (versión del 4 nov 2026).
 * Las fotos están en /public/media/desarrollos.
 */
const img = (archivo: string) => "/media/desarrollos/" + archivo;

export const desarrollos = {
  hero: {
    eyebrow: "Neostone Desarrollos",
    // Variantes de la maqueta: "Equipamos / edificios enteros." · "Presentes / donde se construye."
    titulo: ["Escala industrial.", "*Diseño* *en* *cada*", "*unidad.*"],
    bajada: "Fabricamos e instalamos cocinas, placards y mesadas para edificios y desarrollos en todo el país, desde nuestra planta industrial en Entre Ríos directo al pie del edificio.",
    imagenes: [img("proyecto-08.webp"), img("proyecto-01.webp"), img("proyecto-03.webp")],
  },
  cifras: [
    { valor: "20 *años*", detalle: "De experiencia en el rubro" },
    { valor: "Planta *industrial*", detalle: "Con tecnología italiana de punta" },
    { valor: "Atención *nacional*", detalle: "En todo el país" },
  ],
  proyectos: {
    titulo: ["Algunos de *nuestros*", "*proyectos.*"],
    bajada: "Torres, edificios y complejos residenciales equipados desde nuestra planta.",
    /** El orden arma el mosaico: alta, ancha, alta / panorámica / dos medias */
    fotos: [img("proyecto-04.webp"), img("proyecto-02.webp"), img("proyecto-06.webp"), img("proyecto-12.webp"), img("proyecto-05.webp"), img("proyecto-07.webp")],
  },
  resolvemos: [
    { icono: "reloj", titulo: "Producción al ritmo de tu obra.", texto: "Fabricación planificada según tu cronograma." },
    { icono: "capas", titulo: "Mismo estándar de calidad garantizado por unidad.", texto: "Fabricación a medida y a escala en nuestra planta." },
    { icono: "persona", titulo: "Un solo interlocutor.", texto: "Amoblamientos, mesadas y accesorios, con un responsable de proyecto de principio a fin. También contamos con marmolería propia." },
    { icono: "etapas", titulo: "Instalación por etapas.", texto: "Equipos propios, coordinados con la constructora." },
  ] as const,
  procedimiento: [
    { titulo: "Planos", texto: "Analizamos planos y tipologías con tu equipo técnico." },
    { titulo: "Propuesta", texto: "Diseño y presupuesto por tipología." },
    { titulo: "Relevamiento", texto: "Medición en obra de cada unidad." },
    { titulo: "Visualización", texto: "Render de cada tipología para aprobar antes de fabricar." },
    { titulo: "Fabricación", texto: "A medida y a escala, según el avance de la obra." },
    { titulo: "Entrega e instalación", texto: "Al pie del edificio, por etapas y con equipos propios." },
    { titulo: "Certificación de calidad", texto: "Control final de cada unidad instalada." },
  ],
  consulta: { imagen: img("proyecto-09.webp") },
  cierre: ["Cada proyecto es único. *Cada*", "*espacio,* *irrepetible.*"],
};
