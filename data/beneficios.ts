import { asset, wp } from "@/lib/img";

export const beneficiosIntro =
  "Trabajamos con seriedad y honestidad, respetando al cliente, las normas, los acuerdos y el entorno. Nuestros procesos, controlados por programas de gestión y tecnología de punta, garantizan eficiencia, agilidad y eficacia.";

/**
 * Beneficios: el orden del array es el orden en la página.
 * destacado → frase corta que aparece grande sobre la imagen cuando el beneficio está activo.
 */
export const beneficios: { titulo: string; destacado: string; imagen: string; texto: string[] }[] = [
  {
    titulo: "Entrega en tiempo y forma",
    destacado: "Nuestro principal activo.",
    imagen: "/images/home/frente-planta-crespo.jpg",
    texto: [
      "Sabemos lo importante que es cumplir. Por eso garantizamos plazos de entrega confiables y la calidad total de nuestros productos.",
    ],
  },
  {
    titulo: "Atención personalizada",
    destacado: "Calidad y calidez en cada proyecto.",
    imagen: asset("frente-rosario.png"),
    texto: [
      "Cada proyecto es único, por eso lo acompañamos en cada etapa con atención personalizada, calidad y calidez. Contamos con profesionales de mobiliario de cocina altamente calificados.",
      "Tenemos puntos de venta en todo el país donde podés ver materiales y diseños exclusivos, haciendo de tu proyecto una experiencia única desde el inicio.",
    ],
  },
  {
    titulo: "Garantía de 5 años",
    destacado: "Respaldo escrito, 5 años.",
    imagen: wp("2025/05/Detalle-Marca.jpg"),
    texto: [
      "Respaldamos nuestra experiencia con una garantía real. Somos fabricantes de todos nuestros amoblamientos y supervisamos cada proceso de producción bajo normas de calidad estrictas.",
      "Utilizamos materiales y herrajes de primera línea. Con Neostone no sólo obtenés muebles: obtenés confianza, calidad, innovación y un respaldo escrito de 5 años.",
    ],
  },
  {
    titulo: "Virtual Experience",
    destacado: "Tu cocina, en escala real.",
    imagen: wp("2025/05/Cocina-London-Camara-2-2048x1733.jpg"),
    texto: [
      "Con nuestra tecnología exclusiva podés anticipar tu amoblamiento: visualizar en escala real el diseño de tu cocina, vestidor o espacio.",
      "Interactuás con el mobiliario: abrís cajones, observás texturas, colores y acabados, y movés objetos para comprobar la funcionalidad y el diseño.",
    ],
  },
  {
    titulo: "Todo en un mismo lugar",
    destacado: "Marmolería premium propia.",
    imagen: wp("2025/05/Linea-Urban-Camara-1-1-2048x1436.jpg"),
    texto: [
      "Contamos con una Marmolería Premium con maquinaria de última generación de corte, pulido y vaciados, permitiendo acabados y terminaciones de excelencia.",
      "Conseguís todo en un mismo lugar, optimizando tiempos de entrega y evitando malentendidos con otros proveedores.",
    ],
  },
  {
    titulo: "Sustentabilidad",
    destacado: "Compromiso con el entorno.",
    imagen: wp("2025/05/Camara_01-2048x1219.jpg"),
    texto: [
      "Polvillo 0: un sistema de aspiración industrial captura y elimina el polvo generado en los procesos de corte y lijado.",
      "Tratamiento de agua: decantación, filtrado y recirculación del agua utilizada en el corte y pulido de mármoles y granitos.",
      "Reciclado de termolaminado 3D: transformamos residuos plásticos en ladrillos para casas ecológicas.",
    ],
  },
];
