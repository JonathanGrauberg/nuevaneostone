/**
 * DESARROLLOS (landing para constructoras y desarrolladores)
 *
 * Textos de la maqueta "Neostone Desarrollos · Landing" (nov 2026).
 * Las fotos están en /public/media/desarrollos. En `proyectos`, forma "alto" ocupa
 * dos filas y "ancho" dos columnas: el orden del array arma el mosaico.
 */
const img = (archivo: string) => "/media/desarrollos/" + archivo;

export const desarrollos = {
  hero: {
    eyebrow: "Neostone Desarrollos",
    titulo: ["La cocina", "también *vende*", "*la* *unidad.*"],
    bajada: "Fabricamos e instalamos cocinas, placards y mesadas para edificios y desarrollos en todo el país, desde nuestra planta industrial en Entre Ríos.",
    imagenes: [img("hero-1.webp"), img("hero-2.webp"), img("hero-3.webp")],
  },
  cifras: [
    { valor: "+20 *años*", detalle: "Fabricando" },
    { valor: "Planta *propia*", detalle: "Industrial, en Entre Ríos" },
    { valor: "Todo el *país*", detalle: "Proyectos en distintas provincias" },
  ],
  proyectos: {
    titulo: ["Proyectos que *ya*", "*equipamos.*"],
    bajada: "Torres, complejos y barrios donde cada cocina salió de nuestra planta.",
    fotos: [
      { imagen: img("proyecto-1.webp"), forma: "alto" },
      { imagen: img("proyecto-2.webp"), forma: "ancho" },
      { imagen: img("proyecto-4.webp"), forma: "alto" },
      { imagen: img("proyecto-3.webp"), forma: "ancho" },
      { imagen: img("proyecto-5.webp"), forma: "ancho" },
      { imagen: img("proyecto-7.webp"), forma: "alto" },
      { imagen: img("proyecto-8.webp"), forma: "alto" },
      { imagen: img("proyecto-6.webp"), forma: "ancho" },
      { imagen: img("proyecto-9.webp"), forma: "ancho" },
      { imagen: img("proyecto-10.webp"), forma: "ancho" },
    ] as { imagen: string; forma: "alto" | "ancho" }[],
  },
  unidad: {
    titulo: ["El mismo estándar", "en la unidad 1 *y* *en*", "*la* *100.*"],
    bajada: "Cocinas, placards y vestidores fabricados en serie, con el diseño y las terminaciones que tu proyecto necesita.",
    imagenes: [img("cocina-1.webp"), img("cocina-2.webp")],
  },
  resolvemos: {
    titulo: ["Lo que una obra necesita", "*de* *su* *proveedor.*"],
    imagen: img("planta.webp"),
    puntos: [
      { titulo: "Producción al ritmo de tu obra.", texto: "Fabricación planificada según tu cronograma." },
      { titulo: "El mismo estándar en cada unidad.", texto: "Fabricación en serie en planta propia." },
      { titulo: "Un solo interlocutor.", texto: "Amoblamientos, mesadas y accesorios, con un responsable de proyecto de principio a fin." },
      { titulo: "Instalación por etapas.", texto: "Equipo propio, coordinado con la constructora." },
    ],
  },
  proceso: {
    titulo: ["Del plano *a* *la* *entrega.*"],
    pasos: [
      { titulo: "Relevamiento", texto: "Analizamos planos y tipologías con tu equipo técnico." },
      { titulo: "Propuesta", texto: "Diseño y presupuesto por tipología." },
      { titulo: "Visualización", texto: "Render de cada tipología para aprobar antes de fabricar." },
      { titulo: "Fabricación", texto: "Programada según el avance de la obra." },
      { titulo: "Instalación", texto: "Por etapas, con equipo propio." },
      { titulo: "Entrega", texto: "Coordinada con la constructora, unidad por unidad." },
    ],
  },
  consulta: { imagen: img("edificio.webp") },
  cierre: ["Cada proyecto es único. *Cada*", "*espacio,* *irrepetible.*"],
};
