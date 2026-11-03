/**
 * DESARROLLOS (landing para constructoras y desarrolladores)
 *
 * Textos de la maqueta "Neostone Desarrollos · Landing" (nov 2026).
 * Las fotos están en /public/media/desarrollos. El orden de `proyectos.lista` es el
 * orden del mosaico; los primeros `visibles` se ven sin tocar "Ver todos".
 */
const img = (archivo: string) => "/media/desarrollos/" + archivo;

export const desarrollos = {
  hero: {
    eyebrow: "Neostone Desarrollos",
    titulo: ["La cocina", "también *vende*", "*la* *unidad.*"],
    bajada: "Fabricamos e instalamos cocinas, placards y mesadas para edificios y desarrollos en todo el país, desde nuestra planta industrial en Entre Ríos directo al pie del edificio.",
    imagenes: [img("proyecto-08.webp"), img("proyecto-06.webp"), img("proyecto-03.webp")],
  },
  cifras: [
    { valor: "+20 *años*", detalle: "Fabricando" },
    { valor: "Planta *propia*", detalle: "Industrial, en Entre Ríos" },
    { valor: "Todo el *país*", detalle: "Proyectos en distintas provincias" },
  ],
  proyectos: {
    titulo: ["Proyectos que *ya*", "*equipamos.*"],
    bajada: "Torres, complejos y barrios donde cada cocina salió de nuestra planta.",
    /** Cuántos se ven antes de "Ver todos" */
    visibles: 12,
    lista: [
      img("proyecto-01.webp"),
      img("proyecto-02.webp"),
      img("proyecto-03.webp"),
      img("proyecto-04.webp"),
      img("proyecto-05.webp"),
      img("proyecto-06.webp"),
      img("proyecto-07.webp"),
      img("proyecto-08.webp"),
      img("proyecto-09.webp"),
      img("proyecto-10.webp"),
      img("proyecto-11.webp"),
      img("proyecto-12.webp"),
      img("proyecto-13.webp"),
      img("proyecto-14.webp"),
      img("proyecto-15.webp"),
      img("proyecto-16.webp"),
      img("proyecto-17.webp"),
    ],
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
  consulta: { imagen: img("proyecto-04.webp") },
  cierre: ["Cada proyecto es único. *Cada*", "*espacio,* *irrepetible.*"],
};
