import type { Pilar } from "@/components/beneficios/IconoPilar";

export const beneficiosIntro =
  "Trabajamos con seriedad y honestidad, respetando al cliente, las normas, los acuerdos y el entorno. Nuestros procesos, controlados por programas de gestión y tecnología de punta, garantizan eficiencia, agilidad y eficacia.";

/**
 * Beneficios: el orden del array es el orden en la página.
 * icono → ícono animado del pilar (components/beneficios/IconoPilar.tsx).
 */
export type Beneficio = { titulo: string; icono: Pilar; texto: string[] };

export const beneficios: Beneficio[] = [
  {
    titulo: "Entrega en tiempo y forma",
    icono: "entrega",
    texto: [
      "Uno de nuestros pilares fundamentales, cumplir con los tiempos prometidos, desde el diseño hasta su colocación en obra certificada. Garantizamos plazos de entrega confiables y la calidad total de nuestros productos.",
    ],
  },
  {
    titulo: "Atención personalizada",
    icono: "atencion",
    texto: [
      "Cada proyecto es único, por eso lo acompañamos en cada etapa con atención personalizada, calidad y calidez. Contamos con profesionales de mobiliario de cocina altamente calificados.",
      "Tenemos puntos de venta en todo el país donde podés ver materiales y diseños exclusivos, haciendo de tu proyecto una experiencia única desde el inicio.",
    ],
  },
  {
    titulo: "Garantía de 5 años",
    icono: "garantia",
    texto: [
      "Respaldamos nuestra experiencia con una garantía real. Somos fabricantes de todos nuestros amoblamientos y supervisamos cada proceso de producción bajo normas de calidad estrictas.",
      "Utilizamos materiales y herrajes de primera línea. Con Neostone no sólo obtenés muebles: obtenés confianza, calidad, innovación y un respaldo escrito de 5 años.",
    ],
  },
  {
    titulo: "Virtual Experience",
    icono: "virtual",
    texto: [
      "Con nuestra tecnología exclusiva podés anticipar tu amoblamiento: visualizar en escala real el diseño de tu cocina, vestidor o espacio.",
      "Interactuás con el mobiliario: abrís cajones, observás texturas, colores y acabados, y movés objetos para comprobar la funcionalidad y el diseño.",
    ],
  },
  {
    titulo: "Todo en un mismo lugar",
    icono: "integral",
    texto: [
      "Desde el primer boceto hasta la última mesada, hablás siempre con las mismas personas. Diseñamos tus muebles y fabricamos tus mesadas en nuestra planta, con corte y pulido de última generación, para que todo combine a la perfección y llegue a tiempo.",
    ],
  },
  {
    titulo: "Sustentabilidad",
    icono: "sustentabilidad",
    texto: [
      "Polvillo 0: un sistema de aspiración industrial captura y elimina el polvo generado en los procesos de corte y lijado.",
      "Tratamiento de agua: decantación, filtrado y recirculación del agua utilizada en el corte y pulido de mármoles y granitos.",
      "Reciclado de termolaminado 3D: transformamos residuos plásticos en ladrillos para casas ecológicas.",
    ],
  },
];
