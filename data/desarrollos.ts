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
    imagenes: [img("24-cantena-concordia.webp"), img("10-sabik-rosario.webp"), img("26-portal-norte-concordia.webp")],
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
      { nombre: "Torre Julia", lugar: "Santa Fe", imagen: img("12-torre-julia-santa-fe.webp") },
      { nombre: "Fundar", lugar: "Rosario", imagen: img("11-fundar-rosario.webp") },
      { nombre: "Torre A", lugar: "Tucumán", imagen: img("03-torre-a-tucuman.webp") },
      { nombre: "Complejo IPLyC", lugar: "Misiones", imagen: img("07-complejo-iplyc-misiones.webp") },
      { nombre: "Olimpo", lugar: "Santa Fe", imagen: img("13-olimpo-santa-fe.webp") },
      { nombre: "Haus", lugar: "San Luis", imagen: img("06-haus-san-luis.webp") },
      { nombre: "NIC Lerma", lugar: "CABA", imagen: img("16-nic-lerma-caba.webp") },
      { nombre: "Monte Hermoso", lugar: "Buenos Aires", imagen: img("05-monte-hermoso-buenos-aires.webp") },
      { nombre: "Guay 1 y 3", lugar: "Concepción del Uruguay", imagen: img("23-guay-1-3-concepcion-del-uruguay.webp") },
      { nombre: "Sabik", lugar: "Rosario", imagen: img("10-sabik-rosario.webp") },
      { nombre: "Creu", lugar: "CABA", imagen: img("20-creu-caba.webp") },
      { nombre: "Chaquies", lugar: "Cafayate", imagen: img("01-chaquies-cafayate.webp") },
      { nombre: "Madero Vistas", lugar: "Salta", imagen: img("02-madero-vistas-salta.webp") },
      { nombre: "Aquarella IX", lugar: "Santa Fe", imagen: img("04-aquarella-ix-santa-fe.webp") },
      { nombre: "Terrace", lugar: "Santa Fe", imagen: img("08-terrace-santa-fe.webp") },
      { nombre: "San Jerónimo 3425", lugar: "Santa Fe", imagen: img("09-san-jeronimo-3425-santa-fe.webp") },
      { nombre: "Pueblo Buena Vista", lugar: "San Fernando", imagen: img("14-pueblo-buena-vista-san-fernando.webp") },
      { nombre: "NIC Devoto", lugar: "CABA", imagen: img("15-nic-devoto-caba.webp") },
      { nombre: "Camargo", lugar: "CABA", imagen: img("17-camargo-caba.webp") },
      { nombre: "Mosconi", lugar: "CABA", imagen: img("18-mosconi-caba.webp") },
      { nombre: "Zapata 564", lugar: "CABA", imagen: img("19-zapata-564-caba.webp") },
      { nombre: "Live Santiago", lugar: "Paraná", imagen: img("21-live-santiago-parana.webp") },
      { nombre: "Victoria 114", lugar: "Paraná", imagen: img("22-victoria-114-parana.webp") },
      { nombre: "Cantena", lugar: "Concordia", imagen: img("24-cantena-concordia.webp") },
      { nombre: "Victoria", lugar: "Gualeguaychú", imagen: img("25-victoria-gualeguaychu.webp") },
      { nombre: "Portal Norte", lugar: "Concordia", imagen: img("26-portal-norte-concordia.webp") },
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
  consulta: { imagen: img("09-san-jeronimo-3425-santa-fe.webp") },
  cierre: ["Cada proyecto es único. *Cada*", "*espacio,* *irrepetible.*"],
};
