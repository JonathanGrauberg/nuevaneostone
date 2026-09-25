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
const galeria = (carpeta: string, archivos: string[]) => archivos.map((a) => wp(`${carpeta}/${a}.png`));

export const showrooms: ShowroomInput[] = [
  {
    slug: "crespo",
    ciudad: "Crespo",
    provincia: "Entre Ríos",
    nombre: "Neostone",
    razonSocial: "Neostone S.A.",
    casaCentral: true,
    estado: "activo",
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
      { nombre: "Alesio", rol: "Ventas", foto: asset("alesio-cc.png") },
      { nombre: "Juan Cruz", rol: "Ventas", foto: asset("juancruz.png") },
      { nombre: "Virginia", rol: "Ventas", foto: asset("virginia2.png") },
      { nombre: "Florencia", rol: "Ventas", foto: asset("Florencia-cc.png") },
    ],
    frente: asset("frente-crespo.png"),
    // ⚠ En el sitio actual Gualeguaychú muestra esta misma galería. Confirmar.
    galeria: galeria("2025/08", ["1-6", "2-6", "3-6", "4-7", "5-6", "6-4", "7-1"]),
  },
  {
    slug: "gualeguaychu",
    ciudad: "Gualeguaychú",
    provincia: "Entre Ríos",
    nombre: "Chalupas",
    estado: "activo",
    direccion: "Chalup 19",
    geo: { lat: -33.0094, lng: -58.5172 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/rgXcGJz3HULgB7RP7",
    telefonos: [{ texto: "+54 9 3446 21-5575", numero: "+5493446215575" }],
    whatsapp: "5493446215575",
    email: "chalupasoffice@gmail.com",
    horarios: [
      { dias: "lun-vie", tramos: ["9:00-13:00", "15:00-19:00"] },
      { dias: "sab", tramos: ["10:00-13:00"] },
    ],
    staff: [{ nombre: "Noelia y Camila", rol: "Ventas", foto: asset("noeycami.png") }],
    frente: asset("frente-gchu.png"),
    // ⚠ Misma galería que Crespo en el sitio actual. Confirmar.
    galeria: galeria("2025/08", ["1-6", "2-6", "3-6", "4-7", "5-6", "6-4", "7-1"]),
  },
  {
    slug: "bahia-blanca",
    ciudad: "Bahía Blanca",
    provincia: "Buenos Aires",
    // TODO: el listado actual dice "Habitare – Dawse Ingeniería SRL". Confirmar nombre.
    nombre: "Neostone Bahía Blanca",
    estado: "activo",
    direccion: "Dorrego 532, Local 6",
    geo: { lat: -38.7196, lng: -62.2724 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/bWh7Ud9MBZUZcLUr5",
    telefonos: [{ texto: "291 551-1001", numero: "+542915511001" }],
    email: "pedidosbahiablanca@gmail.com",
    horarios: [
      { dias: "lun-vie", tramos: ["8:00-18:00"] },
      { dias: "sab", tramos: ["9:00-13:00"] },
    ],
    staff: [
      { nombre: "Gabriel Marcolini", rol: "Titular", foto: asset("gabriel-marco.png") },
      { nombre: "Melisa Culla", rol: "Titular", foto: asset("melisa-culla.png") },
      { nombre: "Facundo André", rol: "Ventas y Administración", foto: asset("facundo-andre.png") },
      { nombre: "Natividad Sierra", rol: "Ventas", foto: asset("nati-sierra.png") },
      { nombre: "Micaela Fernández Valle", rol: "Ventas", foto: asset("mica-fer.png") },
    ],
    // ⚠ Galería compartida con Mar del Plata, Córdoba, Villa María y San Juan. Confirmar.
    galeria: galeria("2026/02", ["1", "2", "3", "4", "5"]),
  },
  {
    slug: "general-villegas",
    ciudad: "General Villegas",
    provincia: "Buenos Aires",
    nombre: "Doo Diseños",
    estado: "activo",
    direccion: "Lavalle 1005",
    geo: { lat: -35.0322, lng: -63.0125 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/Fb5S6zwfGJ9XgZpe8",
    telefonos: [{ texto: "3388 50-1777", numero: "+543388501777" }],
    email: "doo.contacto@gmail.com",
    horarios: [{ dias: "lun-vie", tramos: ["8:30-12:30", "16:00-20:00"] }],
    staff: [
      { nombre: "Dorella", rol: "Titular", foto: asset("dorella.png") },
      { nombre: "María Noé", rol: "Diseño y Ventas", foto: asset("maria-noe.png") },
    ],
    frente: asset("frente-gvillegas.png"),
    galeria: galeria("2026/08", ["1", "2", "3", "4"]),
  },
  {
    slug: "junin",
    ciudad: "Junín",
    provincia: "Buenos Aires",
    nombre: "Mármoles López",
    razonSocial: "Mármoles López S.R.L.",
    estado: "activo",
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
      { nombre: "Matías", rol: "Ventas", foto: asset("matias.png") },
      { nombre: "Rodrigo y Pablo", rol: "Ventas", foto: asset("rodrigoypablo.png") },
    ],
    // En el sitio actual Junín y Pergamino tienen los frentes invertidos; acá ya están corregidos.
    frente: asset("lopez.png"),
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
      { nombre: "Flavio", rol: "Socio Gerente", foto: asset("Flavio-mdp.png") },
      { nombre: "Damián", rol: "Socio Gerente", foto: asset("Damian-mdp.png") },
      { nombre: "Laura", rol: "Ventas", foto: asset("Laura-mdp.png") },
      { nombre: "Candela", rol: "Ventas", foto: asset("Candela-mdp.png") },
      { nombre: "Lara", rol: "Ventas", foto: asset("Lara-mdp.png") },
    ],
    frente: asset("frente-mardel.png"),
    // ⚠ Galería compartida. Confirmar.
    galeria: galeria("2026/02", ["1", "2", "3", "4", "5"]),
  },
  {
    slug: "pergamino",
    ciudad: "Pergamino",
    provincia: "Buenos Aires",
    nombre: "Mármoles Turco",
    razonSocial: "Mármoles Turco S.R.L.",
    estado: "activo",
    direccion: "Castelli 1901",
    geo: { lat: -33.8895, lng: -60.5736 }, // aprox.
    mapsUrl: "https://share.google/69gUD81HNLyXFgUsv",
    telefonos: [{ texto: "02477 42-6219", numero: "+542477426219" }],
    email: "marmolesturco@hotmail.com.ar",
    horarios: [
      { dias: "lun-vie", tramos: ["8:00-16:00"] },
      { dias: "sab", tramos: ["9:00-13:00"] },
    ],
    staff: [
      { nombre: "Agustina", rol: "Ventas", foto: asset("agus-per.png") },
      { nombre: "Mariana", rol: "Ventas", foto: asset("mariana-per.png") },
    ],
    frente: asset("turco.png"),
    // ⚠ Galería compartida con Junín y Comodoro. Confirmar.
    galeria: galeria("2025/08", ["6", "5", "4", "3", "2", "1"]),
  },
  {
    slug: "tres-arroyos",
    ciudad: "Tres Arroyos",
    provincia: "Buenos Aires",
    nombre: "Neostone Tres Arroyos",
    estado: "activo",
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
      { nombre: "Leonel B.", rol: "Equipo Comercial", foto: asset("leonel-b.png") },
      { nombre: "Adriel S.", rol: "Equipo Comercial", foto: asset("adriel-s.png") },
      { nombre: "Agustín S.", rol: "Equipo Comercial", foto: asset("agustin-s.png") },
    ],
    frente: asset("frente-tresarroyos2.png"),
    galeria: galeria("2026/04", ["1", "2", "3", "4", "5"]),
  },
  {
    slug: "trelew",
    ciudad: "Trelew",
    provincia: "Chubut",
    nombre: "Patagonia Interior",
    razonSocial: "Amoblasur S.A.",
    estado: "activo",
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
      { nombre: "Alberto", rol: "Ventas", foto: asset("antoniot.png") },
      { nombre: "Carolina", rol: "Ventas", foto: asset("carolinat.png") },
    ],
    frente: asset("frente-trelew.png"),
    galeria: galeria("2025/08", ["1-4", "2-4", "3-4", "4-5", "5-4", "6-3", "7"]),
  },
  {
    slug: "comodoro-rivadavia",
    ciudad: "Comodoro Rivadavia",
    provincia: "Chubut",
    nombre: "Mottesi Materiales",
    razonSocial: "Mottesi Materiales S.A.",
    estado: "activo",
    direccion: "Av. Sargento Cabral 320",
    geo: { lat: -45.8702, lng: -67.5039 },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Sgto.+Cabral+320,+Comodoro+Rivadavia",
    telefonos: [{ texto: "0297 447-9100", numero: "+542974479100" }],
    // TODO: el link de WhatsApp actual está mal armado (wa.me/+54902974479100). Pedir el número correcto.
    horarios: [
      { dias: "lun-vie", tramos: ["9:00-18:00"] },
      { dias: "sab", tramos: ["9:00-13:00"] },
    ],
    staff: [{ nombre: "Micaela", rol: "Ventas", foto: asset("julieta-mosseti.jpeg") }],
    frente: asset("frente-comodoro.png"),
    // ⚠ Galería compartida con Junín y Pergamino. Confirmar.
    galeria: galeria("2025/08", ["6", "5", "4", "3", "2", "1"]),
  },
  {
    slug: "cordoba",
    ciudad: "Córdoba",
    provincia: "Córdoba",
    nombre: "Emmat",
    estado: "activo",
    direccion: "Hiper Construcción, Av. Rodríguez del Busto, local 600",
    geo: { lat: -31.3647, lng: -64.2305 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/z2TQ9KAwTRidWhAm8",
    telefonos: [{ texto: "0351 476-2510", numero: "+543514762510" }],
    email: "cordoba@neostone.com.ar",
    horarios: [{ dias: "lun-dom", tramos: ["9:00-21:00"] }],
    staff: [
      { nombre: "Matías C.", rol: "Titular", foto: asset("matias-c.png") },
      { nombre: "Ileana E.", rol: "Ventas", foto: asset("ileana-e.png") },
      { nombre: "Paulina D.", rol: "Ventas", foto: asset("paulina-d.png") },
      { nombre: "Ignacio S.", rol: "Ventas", foto: asset("ignacio-s.png") },
    ],
    frente: asset("frente-cordoba-full.png"),
    // ⚠ Galería compartida. Confirmar.
    galeria: galeria("2026/02", ["1", "2", "3", "4", "5"]),
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
      { nombre: "Luisina Mattia", rol: "Propietaria y Arquitecta", foto: asset("luisina-m.png") },
      { nombre: "Andrés Franco", rol: "Propietario y Administración", foto: asset("andres-f.png") },
      { nombre: "Franco", rol: "Ventas", foto: asset("franco-vm.png") },
    ],
    // ⚠ Galería compartida. Confirmar.
    galeria: galeria("2026/02", ["1", "2", "3", "4", "5"]),
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
      { nombre: "Leonardo", rol: "Titular", foto: asset("leonardos.png") },
      { nombre: "Florencia", rol: "Ventas", foto: asset("florencias.png") },
      { nombre: "Leandro", rol: "Ventas", foto: asset("leandros.png") },
    ],
    frente: asset("frente-salta.png"),
    galeria: galeria("2025/08", ["5-5", "4-6", "3-5", "2-5", "1-5"]),
  },
  {
    slug: "san-juan",
    ciudad: "San Juan",
    provincia: "San Juan",
    nombre: "Neostone San Juan",
    estado: "activo",
    // TODO: el texto dice "Av. 122 N° 1210" y el mapa apunta a Av. J. I. de la Roza Oeste 806. Confirmar.
    direccion: "Espacio San Juan Shopping, local 115",
    geo: { lat: -31.5375, lng: -68.5364 }, // aprox.
    mapsUrl: "https://maps.app.goo.gl/6YFmNvE8K69ipvw38",
    telefonos: [{ texto: "264 602-0462", numero: "+542646020462" }],
    email: "neostonesanjuan@neostone.com.ar",
    horarios: [{ dias: "lun-dom", tramos: ["10:00-22:00"] }],
    staff: [
      { nombre: "Paula", rol: "Titular", foto: asset("paula-sj.png") },
      { nombre: "Amanda", rol: "Ventas", foto: asset("amanda-sj.png") },
      { nombre: "Víctor", rol: "Ventas", foto: asset("victor-sj.png") },
    ],
    // ⚠ Galería compartida. Confirmar.
    galeria: galeria("2026/02", ["1", "2", "3", "4", "5"]),
  },
  {
    slug: "san-luis",
    ciudad: "San Luis",
    provincia: "San Luis",
    nombre: "Coraza",
    razonSocial: "Sidermet San Luis S.A.",
    estado: "activo",
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
    frente: asset("frente-sanluis.png"),
    galeria: galeria("2025/08", ["1-1", "2-1", "3-1", "4-1", "5-1", "6-1"]),
  },
  {
    slug: "rosario",
    ciudad: "Rosario",
    provincia: "Santa Fe",
    nombre: "Accesaniga",
    razonSocial: "Accesaniga S.A.",
    estado: "activo",
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
      { nombre: "Adrián Cirimele", rol: "Gerente General", foto: asset("cirimele.png") },
      { nombre: "Romina", rol: "Diseño y Ventas", foto: asset("galante.png") },
      { nombre: "María Eugenia", rol: "Ventas", foto: asset("mariaeuge.png") },
    ],
    frente: asset("frente-rosario.png"),
    galeria: galeria("2025/08", ["1-2", "2-2", "3-2", "5-2", "6-2", "4-3"]),
  },
  {
    slug: "bariloche",
    ciudad: "Bariloche",
    provincia: "Río Negro",
    nombre: "Veta Diseño & Arq",
    razonSocial: "Alcober Emmanuel",
    estado: "activo",
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
      { nombre: "Emmanuel Alcober", rol: "Socio Gerente", foto: asset("emanuelB.png") },
      { nombre: "Valentina Turco", rol: "Socia Gerente", foto: asset("valentinaB.png") },
      { nombre: "Paula López", rol: "Ventas", foto: asset("paulaB.png") },
    ],
    frente: asset("barilocheportada2.png"),
    galeria: galeria("2026/07", ["1", "2", "3", "4"]),
  },
];
