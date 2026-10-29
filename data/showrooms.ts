import { asset, wp } from "@/lib/img";
import type { ShowroomInput } from "@/lib/schemas";

/**
 * SHOWROOMS
 *
 * - Agregar uno: copiar un bloque, cambiar los datos. Aparece solo en el listado,
 *   el buscador, el sitemap y en /showrooms/<slug>.
 * - Sacar uno: estado: "cerrado" → deja de listarse y su URL redirige a /showrooms.
 * - "proximamente": se lista con esa etiqueta.
 * - horarios: dias = "lun-vie" | "lun-sab" | "lun-dom" | "sab" | "dom"; tramos "HH:MM-HH:MM".
 * - geo: coordenadas para "showroom más cercano". Las marcadas "aprox." son el centro de la ciudad.
 */
const galeria = (carpeta: string, archivos: string[]) => archivos.map((a) => wp(`${carpeta}/${a}.jpg`));

export const showrooms: ShowroomInput[] = [
  {
    slug: "crespo",
    ciudad: "Crespo",
    provincia: "Entre Ríos",
    nombre: "Neostone",
    razonSocial: "Neostone S.A.",
    casaCentral: true,
    estado: "activo",
    whatsapp: "5493434575484",
    direccion: "Santiago Eichhorn 419, Parque Industrial",
    geo: { lat: -32.0286, lng: -60.3069 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/kQH978p7oGPogM2S7",
    telefonos: [
      { texto: "+54 9 343 4950095", numero: "+5493434950095" },
      { texto: "+54 9 343 4950948", numero: "+5493434950948" },
    ],
    email: "info@neostone.com.ar",
    horarios: [
      { dias: "lun-vie", tramos: ["8:00-18:00"] },
      { dias: "sab", tramos: ["8:30-12:30"] },
    ],
    staff: [
      { nombre: "Alesio", rol: "Ventas", foto: asset("alesio-cc.jpg") },
      { nombre: "Juan Cruz", rol: "Ventas", foto: asset("juancruz.jpg") },
      { nombre: "Virginia", rol: "Ventas", foto: asset("virginia2.jpg") },
      { nombre: "Florencia", rol: "Ventas", foto: asset("Florencia-cc.jpg") },
    ],
    frente: asset("frente-crespo.jpg"),
    // ⚠ En el sitio actual Gualeguaychú muestra esta misma galería. Confirmar.
    galeria: galeria("2025/08", ["1-6", "2-6", "3-6", "4-7", "5-6", "6-4", "7-1"]),
  },
  {
    slug: "gualeguaychu",
    ciudad: "Gualeguaychú",
    provincia: "Entre Ríos",
    nombre: "Chalupas",
    estado: "activo",
    direccion: "Chalupa 19",
    geo: { lat: -33.0094, lng: -58.5172 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/rgXcGJz3HULgB7RP7",
    telefonos: [{ texto: "+54 9 3446 21-5575", numero: "+5493446215575" }],
    whatsapp: "5493446215575",
    email: "chalupasoffice@gmail.com",
    horarios: [
      { dias: "lun-vie", tramos: ["9:00-13:00", "15:00-19:00"] },
      { dias: "sab", tramos: ["10:00-13:00"] },
    ],
    staff: [{ nombre: "Noelia y Camila", rol: "Ventas", foto: asset("noeycami.jpg") }],
    frente: asset("frente-gchu.jpg"),
    // ⚠ Misma galería que Crespo en el sitio actual. Confirmar.
    galeria: galeria("2025/08", ["1-6", "2-6", "3-6", "4-7", "5-6", "6-4", "7-1"]),
  },
  {
    slug: "bahia-blanca",
    ciudad: "Bahía Blanca",
    provincia: "Buenos Aires",
    nombre: "Habitare",
    estado: "activo",
    mapsUrl: "https://maps.app.goo.gl/bWh7Ud9MBZUZcLUr5",
    direccion: "Dorrego 532",
    geo: { lat: -38.7196, lng: -62.2724 }, // aprox.
    telefonos: [],
    email: "bahiablanca@neostone.com.ar",
    horarios: [
      { dias: "lun-vie", tramos: ["8:00-12:00", "15:30-19:30"] },
      { dias: "sab", tramos: ["8:30-12:30"] },
    ],
    staff: [
      { nombre: "Gabriel Marcolini", rol: "Titular", foto: asset("gabriel-marco.jpg") },
      { nombre: "Melisa Culla", rol: "Titular", foto: asset("melisa-culla.jpg") },
      { nombre: "Facundo André", rol: "Ventas y Administración", foto: asset("facundo-andre.jpg") },
      { nombre: "Natividad Sierra", rol: "Ventas", foto: asset("nati-sierra.jpg") },
      { nombre: "Micaela Fernández Valle", rol: "Ventas", foto: asset("mica-fer.jpg") },
    ],
    // Sin fotos todavía (el sitio anterior mostraba un cartel de "Próximamente"). Cargar las reales acá.
    frente: "/images/showrooms/frentes/bahia-blanca.jpg",
    galeria: [],
  },
  {
    slug: "general-villegas",
    ciudad: "General Villegas",
    provincia: "Buenos Aires",
    nombre: "Doo Diseños",
    estado: "activo",
    whatsapp: "5493388415192",
    direccion: "Lavalle 1005",
    geo: { lat: -35.0322, lng: -63.0125 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/Fb5S6zwfGJ9XgZpe8",
    telefonos: [{ texto: "3388 50-1777", numero: "+543388501777" }],
    email: "doo.contacto@gmail.com",
    horarios: [{ dias: "lun-vie", tramos: ["8:30-12:30", "16:00-20:00"] }],
    staff: [
      { nombre: "Dorella", rol: "Titular", foto: asset("dorella.jpg") },
      { nombre: "María Noé", rol: "Diseño y Ventas", foto: asset("maria-noe.jpg") },
    ],
    frente: asset("frente-gvillegas.jpg"),
    galeria: galeria("2026/08", ["1", "2", "3", "4"]),
  },
  {
    slug: "junin",
    ciudad: "Junín",
    provincia: "Buenos Aires",
    nombre: "Mármoles López",
    razonSocial: "Mármoles López S.R.L.",
    estado: "activo",
    whatsapp: "5492364606480",
    direccion: "Alberdi 1661",
    geo: { lat: -34.5856, lng: -60.9589 }, // aprox.
    mapsUrl: "https://share.google/Nud51JYrJASMs5Tuc",
    telefonos: [{ texto: "02364 42-4464", numero: "+542364424464" }],
    email: "r.marmoleslopez@outlook.com",
    horarios: [
      { dias: "lun-vie", tramos: ["8:00-12:30", "13:30-17:00"] },
      { dias: "sab", tramos: ["8:00-12:00"] },
    ],
    staff: [
      { nombre: "Matías", rol: "Ventas", foto: asset("matias.jpg") },
      { nombre: "Rodrigo y Pablo", rol: "Ventas", foto: asset("rodrigoypablo.jpg") },
    ],
    // En el sitio actual Junín y Pergamino tienen los frentes invertidos; acá ya están corregidos.
    frente: asset("lopez.jpg"),
    // ⚠ Galería compartida con Pergamino y Comodoro. Confirmar.
    galeria: galeria("2025/08", ["6", "5", "4", "3", "2", "1"]),
  },
  {
    slug: "mar-del-plata",
    ciudad: "Mar del Plata",
    provincia: "Buenos Aires",
    nombre: "DOMUS+",
    estado: "activo",
    direccion: "Av. Independencia 2865",
    geo: { lat: -38.0055, lng: -57.5426 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/go9aEmdhVrDJY2fC9",
    telefonos: [{ texto: "223 581-6335", numero: "+542235816335" }],
    email: "info@domusmas.com.ar",
    horarios: [
      { dias: "lun-vie", tramos: ["9:00-18:00"] },
      { dias: "sab", tramos: ["9:30-13:00"] },
    ],
    staff: [
      { nombre: "Flavio", rol: "Socio Gerente", foto: asset("Flavio-mdp.jpg") },
      { nombre: "Damián", rol: "Socio Gerente", foto: asset("Damian-mdp.jpg") },
      { nombre: "Laura", rol: "Ventas", foto: asset("Laura-mdp.jpg") },
      { nombre: "Candela", rol: "Ventas", foto: asset("Candela-mdp.jpg") },
      { nombre: "Lara", rol: "Ventas", foto: asset("Lara-mdp.jpg") },
    ],
    frente: "/images/showrooms/frentes/mar-del-plata.jpg",
    // Sin fotos todavía (el sitio anterior mostraba un cartel de "Próximamente"). Cargar las reales acá.
    galeria: [],
  },
  {
    slug: "pergamino",
    ciudad: "Pergamino",
    provincia: "Buenos Aires",
    nombre: "Mármoles Turco",
    razonSocial: "Mármoles Turco S.R.L.",
    estado: "activo",
    whatsapp: "5492477613671",
    direccion: "Florencio Sánchez esq. Castelli",
    geo: { lat: -33.8895, lng: -60.5736 }, // aprox.
    mapsUrl: "https://share.google/69gUD81HNLyXFgUsv",
    telefonos: [{ texto: "02477 42-6219", numero: "+542477426219" }],
    email: "marmolesturco@hotmail.com.ar",
    horarios: [
      { dias: "lun-vie", tramos: ["8:00-16:00"] },
      { dias: "sab", tramos: ["9:00-13:00"] },
    ],
    staff: [
      { nombre: "Agustina", rol: "Ventas", foto: asset("agus-per.jpg") },
      { nombre: "Mariana", rol: "Ventas", foto: asset("mariana-per.jpg") },
    ],
    frente: asset("turco.jpg"),
    // ⚠ Galería compartida con Junín y Comodoro. Confirmar.
    galeria: galeria("2025/08", ["6", "5", "4", "3", "2", "1"]),
  },
  {
    slug: "tres-arroyos",
    ciudad: "Tres Arroyos",
    provincia: "Buenos Aires",
    nombre: "Neostone Tres Arroyos",
    estado: "activo",
    whatsapp: "5492983415252",
    direccion: "25 de Mayo 365",
    geo: { lat: -38.3775, lng: -60.2758 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/RVkZFjyEUzLUffNQ8",
    telefonos: [{ texto: "2983 41-5252", numero: "+542983415252" }],
    email: "sbspronoiasa@gmail.com",
    horarios: [
      { dias: "lun-vie", tramos: ["9:00-13:00", "16:00-19:00"] },
      { dias: "sab", tramos: ["8:30-12:30"] },
    ],
    staff: [
      { nombre: "Leonel B.", rol: "Equipo Comercial", foto: asset("leonel-b.jpg") },
      { nombre: "Adriel S.", rol: "Equipo Comercial", foto: asset("adriel-s.jpg") },
      { nombre: "Agustín S.", rol: "Equipo Comercial", foto: asset("agustin-s.jpg") },
    ],
    frente: "/images/showrooms/frentes/tres-arroyos.jpg",
    galeria: galeria("2026/04", ["1", "2", "3", "4", "5"]),
  },
  {
    slug: "trelew",
    ciudad: "Trelew",
    provincia: "Chubut",
    nombre: "Patagonia Interior",
    razonSocial: "Amoblasur S.A.",
    estado: "activo",
    whatsapp: "5492804671050",
    direccion: "Don Bosco 77",
    geo: { lat: -43.2489, lng: -65.3051 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/EFkCbZiPPE2LpWrYA",
    telefonos: [{ texto: "280 467-1050", numero: "+542804671050" }],
    email: "agustinamici@hotmail.com",
    horarios: [
      { dias: "lun-vie", tramos: ["9:00-13:00", "15:00-19:00"] },
      { dias: "sab", tramos: ["9:00-13:00"] },
    ],
    staff: [
      // TODO: la foto se llama "antoniot.png". Confirmar si es Alberto o Antonio.
      { nombre: "Alberto", rol: "Ventas", foto: asset("antoniot.jpg") },
      { nombre: "Carolina", rol: "Ventas", foto: asset("carolinat.jpg") },
    ],
    frente: asset("frente-trelew.jpg"),
    frenteEncuadre: "8% 50%", // el cartel NEOSTONE está a la izquierda
    // La foto "1-4" cortaba el cartel ("OSTONE"): la primera de la galería es el frente completo.
    galeria: [asset("frente-trelew.jpg"), ...galeria("2025/08", ["2-4", "3-4", "4-5", "5-4", "6-3", "7"])],
  },
  {
    slug: "comodoro-rivadavia",
    ciudad: "Comodoro Rivadavia",
    provincia: "Chubut",
    nombre: "Mottesi Materiales",
    razonSocial: "Mottesi Materiales S.A.",
    estado: "activo",
    email: "amoblamientos@mottesimateriales.com.ar",
    whatsapp: "5492975372488",
    direccion: "Av. Sargento Cabral 320",
    geo: { lat: -45.8702, lng: -67.5039 },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Sgto.+Cabral+320,+Comodoro+Rivadavia",
    telefonos: [{ texto: "(297) 447-9100 / 447-9133", numero: "+542974479100" }],
    horarios: [
      { dias: "lun-vie", tramos: ["9:00-18:00"] },
      { dias: "sab", tramos: ["9:00-13:00"] },
    ],
    staff: [{ nombre: "Micaela", rol: "Ventas", foto: asset("julieta-mosseti.jpg") }],
    frente: asset("frente-comodoro.jpg"),
    // ⚠ Galería compartida con Junín y Pergamino. Confirmar.
    galeria: galeria("2025/08", ["6", "5", "4", "3", "2", "1"]),
  },
  {
    slug: "cordoba",
    ciudad: "Córdoba",
    provincia: "Córdoba",
    nombre: "Emmat",
    estado: "activo",
    whatsapp: "5493517668866",
    direccion: "Hiper Construcción, Av. Rodríguez del Busto, local 600",
    geo: { lat: -31.3647, lng: -64.2305 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/z2TQ9KAwTRidWhAm8",
    telefonos: [{ texto: "0351 476-2510", numero: "+543514762510" }],
    email: "cordoba@neostone.com.ar",
    horarios: [{ dias: "lun-dom", tramos: ["9:00-21:00"] }],
    staff: [
      { nombre: "Matías C.", rol: "Titular", foto: asset("matias-c.jpg") },
      { nombre: "Ileana E.", rol: "Ventas", foto: asset("ileana-e.jpg") },
      { nombre: "Paulina D.", rol: "Ventas", foto: asset("paulina-d.jpg") },
      { nombre: "Ignacio S.", rol: "Ventas", foto: asset("ignacio-s.jpg") },
    ],
    frente: "/images/showrooms/frentes/cordoba.jpg",
    // Sin fotos todavía (el sitio anterior mostraba un cartel de "Próximamente"). Cargar las reales acá.
    galeria: [],
  },
  {
    slug: "villa-maria",
    ciudad: "Villa María",
    provincia: "Córdoba",
    nombre: "Neostone Villa María",
    estado: "activo",
    direccion: "Rivadavia 235",
    geo: { lat: -32.4075, lng: -63.2403 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/KNBGcN6qFCgxDRn88",
    telefonos: [
      { texto: "353 424-0676", numero: "+543534240676" },
      { texto: "353 562-0896", numero: "+543535620896" },
    ],
    email: "neostonevillamaria@gmail.com",
    horarios: [
      { dias: "lun-vie", tramos: ["9:00-19:00"] },
      { dias: "sab", tramos: ["9:00-13:00"] },
    ],
    staff: [
      { nombre: "Luisina Mattia", rol: "Propietaria y Arquitecta", foto: asset("luisina-m.jpg") },
      { nombre: "Andrés Franco", rol: "Propietario y Administración", foto: asset("andres-f.jpg") },
      { nombre: "Franco", rol: "Ventas", foto: asset("franco-vm.jpg") },
    ],
    frente: "/images/showrooms/frentes/villa-maria.jpg",
    // Sin fotos del interior todavía. Cargar las reales acá.
    galeria: [],
  },
  {
    slug: "salta",
    ciudad: "Salta",
    provincia: "Salta",
    nombre: "Disegno Di Noi",
    razonSocial: "Disegno Di Noi S.R.L.",
    estado: "activo",
    direccion: "Av. Belgrano 2019",
    geo: { lat: -24.7859, lng: -65.4232 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/hWJdYq2gcivwqCL77",
    telefonos: [{ texto: "+54 9 387 212-0409", numero: "+5493872120409" }],
    whatsapp: "5493872120409",
    email: "leotorralvo@disegnosrl.com",
    horarios: [
      { dias: "lun-vie", tramos: ["9:00-18:00"] },
      { dias: "sab", tramos: ["9:00-13:00"] },
    ],
    staff: [
      { nombre: "Leonardo", rol: "Titular", foto: asset("leonardos.jpg") },
      { nombre: "Florencia", rol: "Ventas", foto: asset("florencias.jpg") },
      { nombre: "Leandro", rol: "Ventas", foto: asset("leandros.jpg") },
    ],
    frente: asset("frente-salta.jpg"),
    galeria: galeria("2025/08", ["5-5", "4-6", "3-5", "2-5", "1-5"]),
  },
  {
    slug: "san-juan",
    ciudad: "San Juan",
    provincia: "San Juan",
    nombre: "Neostone San Juan",
    // Showroom nuevo: dirección, fotos y equipo a confirmar. Mientras tanto se atiende desde casa central.
    estado: "proximamente",
    geo: { lat: -31.5375, lng: -68.5364 }, // aprox.
    telefonos: [],
    horarios: [],
    staff: [],
    galeria: [],
  },
  {
    slug: "san-luis",
    ciudad: "San Luis",
    provincia: "San Luis",
    nombre: "Coraza",
    razonSocial: "Sidermet San Luis S.A.",
    estado: "activo",
    whatsapp: "5492664029631",
    direccion: "ZAC, Ruta 3 Km 1",
    geo: { lat: -33.3017, lng: -66.3378 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/pW24m5Hjna9pnDt56",
    telefonos: [{ texto: "0266 402-9631", numero: "+542664029631" }],
    email: "ventasneostone@corazahierros.com.ar",
    horarios: [
      { dias: "lun-vie", tramos: ["9:00-18:00"] },
      { dias: "sab", tramos: ["9:00-13:00"] },
    ],
    staff: [],
    frente: asset("frente-sanluis.jpg"),
    galeria: galeria("2025/08", ["1-1", "2-1", "3-1", "4-1", "5-1", "6-1"]),
  },
  {
    slug: "rosario",
    ciudad: "Rosario",
    provincia: "Santa Fe",
    nombre: "Accesaniga",
    razonSocial: "Accesaniga S.A.",
    estado: "activo",
    whatsapp: "5493413240912",
    direccion: "Paraguay 1356",
    geo: { lat: -32.9442, lng: -60.6505 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/wYwsVMtrLq1zhRVc6",
    telefonos: [{ texto: "(341) 429-8300 int. 1119 / 1214", numero: "+543414298300" }],
    email: "amoblamientos@accesaniga.com.ar",
    horarios: [
      { dias: "lun-vie", tramos: ["8:30-17:30"] },
      { dias: "sab", tramos: ["8:30-12:30"] },
    ],
    staff: [
      { nombre: "Adrián Cirimele", rol: "Gerente General", foto: asset("cirimele.jpg") },
      { nombre: "Romina", rol: "Diseño y Ventas", foto: asset("galante.jpg") },
      { nombre: "María Eugenia", rol: "Ventas", foto: asset("mariaeuge.jpg") },
    ],
    frente: asset("frente-rosario.jpg"),
    galeria: galeria("2025/08", ["1-2", "2-2", "3-2", "5-2", "6-2", "4-3"]),
  },
  {
    slug: "bariloche",
    ciudad: "Bariloche",
    provincia: "Río Negro",
    nombre: "Veta Diseño & Arq",
    razonSocial: "Alcober Emmanuel",
    estado: "activo",
    whatsapp: "5493513923998",
    direccion: "Elflein 976",
    geo: { lat: -41.1335, lng: -71.3103 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/tnCDzTYxBqPNyiat9",
    telefonos: [{ texto: "2944 89-3669", numero: "+542944893669" }],
    email: "bariloche@neostone.com.ar",
    horarios: [
      { dias: "lun-vie", tramos: ["10:00-17:00"] },
      { dias: "sab", tramos: ["10:00-13:00"] },
    ],
    staff: [
      { nombre: "Emmanuel Alcober", rol: "Socio Gerente", foto: asset("emanuelB.jpg") },
      { nombre: "Valentina Turco", rol: "Socia Gerente", foto: asset("valentinaB.jpg") },
      { nombre: "Paula López", rol: "Ventas", foto: asset("paulaB.jpg") },
    ],
    frente: asset("barilocheportada2.jpg"),
    galeria: galeria("2026/07", ["1", "2", "3", "4"]),
  },

  // ─── PLAZAS NUEVAS (oct 2026) ─────────────────────────────────────────
  // TODO: completar nombre del local, dirección, teléfonos, email, horarios,
  // staff y fotos (frente + galería). Mientras falten, la página muestra
  // "Imagen próximamente" y "Datos del local próximamente".
  {
    slug: "zarate",
    ciudad: "Zárate",
    provincia: "Buenos Aires",
    nombre: "Kujnia",
    estado: "activo",
    email: "kujnia.ventas@gmail.com",
    direccion: "Gral. Lavalle 1108",
    geo: { lat: -34.0981, lng: -59.0286 }, // aprox.
    telefonos: [{ texto: "3487 64-0240", numero: "+543487640240" }],
    horarios: [{ dias: "lun-vie", tramos: ["8:00-19:00"] }],
    staff: [],
    galeria: [],
  },
  {
    slug: "san-nicolas",
    ciudad: "San Nicolás",
    provincia: "Buenos Aires",
    nombre: "Cúbica",
    estado: "activo",
    email: "cubica.sn@gmail.com",
    direccion: "Savio 77",
    geo: { lat: -33.3342, lng: -60.2253 }, // aprox.
    telefonos: [{ texto: "3364 56-1477", numero: "+543364561477" }],
    horarios: [
      { dias: "lun-vie", tramos: ["8:00-19:00"] },
      { dias: "sab", tramos: ["9:00-13:00"] },
    ],
    staff: [],
    galeria: [],
  },
  {
    slug: "catamarca",
    ciudad: "Catamarca",
    provincia: "Catamarca",
    nombre: "Neostone Catamarca",
    estado: "activo",
    email: "neostonecatamarca@gmail.com",
    direccion: "Diego de Rojas 340, San Fernando del Valle de Catamarca",
    geo: { lat: -28.4696, lng: -65.7852 }, // aprox.
    telefonos: [{ texto: "3834 65-0828", numero: "+543834650828" }],
    horarios: [
      { dias: "lun-vie", tramos: ["9:00-17:00"] },
      { dias: "sab", tramos: ["9:00-13:00"] },
    ],
    staff: [],
    frente: "/images/showrooms/frentes/catamarca.jpg",
    galeria: [],
  },
  {
    slug: "rio-gallegos",
    ciudad: "Río Gallegos",
    provincia: "Santa Cruz",
    nombre: "Toscana",
    estado: "activo",
    email: "toscanaamoblamientos.rg@gmail.com",
    direccion: "Orkeke 345",
    geo: { lat: -51.623, lng: -69.2168 }, // aprox.
    telefonos: [{ texto: "2966 62-2378", numero: "+542966622378" }],
    horarios: [
      { dias: "lun-vie", tramos: ["10:00-12:00", "15:00-19:00"] },
      { dias: "sab", tramos: ["10:00-13:00"] },
    ],
    staff: [],
    galeria: [],
  },
  {
    slug: "villa-la-angostura",
    ciudad: "Villa La Angostura",
    provincia: "Neuquén",
    nombre: "Veta Diseño & Arquitectura",
    estado: "activo",
    direccion: "Osa Mayor 1080",
    geo: { lat: -40.7616, lng: -71.646 }, // aprox.
    telefonos: [],
    horarios: [],
    staff: [],
    galeria: [],
  },
  {
    slug: "neuquen",
    ciudad: "Neuquén",
    provincia: "Neuquén",
    nombre: "Neostone Neuquén",
    estado: "proximamente",
    email: "neostonenqn@gmail.com",
    geo: { lat: -38.9516, lng: -68.0591 }, // aprox.
    telefonos: [],
    horarios: [],
    staff: [],
    galeria: [],
  },
];
