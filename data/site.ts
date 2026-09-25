// Datos generales de la empresa. Se usan en header, footer, botón de WhatsApp y SEO.
export const site = {
  nombre: "Neostone Amoblamientos",
  lema: "Tu espacio, tu mundo.",
  url: "https://neostone.com.ar",
  descripcion:
    "Diseñamos y fabricamos amoblamientos de cocina, placards, vestidores, mesadas y baños en Crespo, Entre Ríos. Más de 20 años de trayectoria y 5 años de garantía.",
  direccion: "Santiago Eichhorn 419, Parque Industrial, Crespo, Entre Ríos",
  telefonos: [
    { texto: "+54 9 343 4950095", numero: "+5493434950095" },
    { texto: "+54 9 343 4950948", numero: "+5493434950948" },
  ],
  // TODO: el sitio actual usa 5493434549879 en el botón flotante y 5493434575484 en el contenido. Confirmar cuál queda.
  whatsapp: "5493434549879",
  email: "info@neostone.com.ar",
  redes: {
    instagram: "https://www.instagram.com/neostone.sa/",
    facebook: "https://www.facebook.com/neostoneSA",
  },
  trabajaConNosotros:
    "https://docs.google.com/forms/d/15wN5cLyZwTpKrrtcS0mXtiZWsPUyFEqKDDFz1pynnB4/viewform",
  cifras: { anios: 20, garantia: 5 },
} as const;

export const nav = [
  { href: "/colecciones", label: "Colecciones" },
  { href: "/experiencia-vr", label: "Experiencia VR" },
  { href: "/showrooms", label: "Showrooms" },
  { href: "/beneficios", label: "Beneficios" },
] as const;
