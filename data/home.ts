import { wp } from "@/lib/img";

// Imágenes del hero del home (rotan con fundido). Poner la más fuerte primero.
export const heroSlides = [
  wp("2025/08/1-scaled.jpg"),
  wp("2025/08/ar-scaled.jpg"),
  wp("2025/08/2.jpg"),
  wp("2025/08/4-scaled.jpg"),
];

export const nosotros = {
  // Foto del frente de la planta (Crespo). Provisoria (upscale) hasta tener la definitiva.
  imagen: "/images/home/frente-planta-crespo.jpg",
  titulo: ["Tu hogar es el reflejo de tu mundo.", "Lo fabricamos con ese cuidado."],
  texto: [
    "Somos una empresa entrerriana, ubicada en el Parque Industrial de Crespo, con más de 20 años de trayectoria. Diseñamos y fabricamos amoblamientos de cocina, placards, vestidores, mesadas y baños.",
    "Equipamiento y tecnología italiana de última generación, procesos eficientes y un servicio integral que acompaña cada proyecto desde la etapa inicial hasta su colocación en obra.",
  ],
};
