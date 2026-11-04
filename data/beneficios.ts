import type { Pilar } from "@/components/beneficios/IconoPilar";

/**
 * Beneficios: el orden del array es el orden en la página.
 * icono → ícono animado del pilar (components/beneficios/IconoPilar.tsx).
 */
export type Beneficio = { titulo: string; icono: Pilar; texto: string[] };

export const beneficios: Beneficio[] = [
  {
    titulo: "Atención personalizada",
    icono: "atencion",
    texto: [
      "Cada proyecto es único, por eso lo acompañamos en cada etapa con atención personalizada, calidad y calidez. Contamos con profesionales de mobiliario de cocina altamente calificados.",
      "Tenemos puntos de venta en todo el país donde podés ver materiales y diseños exclusivos, haciendo de tu proyecto una experiencia única desde el inicio.",
    ],
  },
  {
    titulo: "Entrega en tiempo y forma",
    icono: "entrega",
    texto: [
      "Uno de nuestros pilares fundamentales, cumplir con los tiempos prometidos, desde el diseño hasta su colocación en obra certificada. Garantizamos plazos de entrega confiables y la calidad total de nuestros productos.",
    ],
  },
  {
    titulo: "Garantía de 5 años",
    icono: "garantia",
    texto: [
      "Respaldamos nuestra experiencia con una garantía real. Somos fabricantes de todos nuestros amoblamientos y supervisamos cada proceso de producción bajo normas de calidad estrictas.",
      "Utilizamos materiales y herrajes de primera línea. Con Neostone no sólo obtenés muebles: obtenés confianza, calidad, innovación y un respaldo escrito de 5 años.",
      "Los amoblamientos producidos bajo normas de calidad garantizan que el mobiliario residencial o comercial ha sido sometido a rigurosos controles de seguridad, durabilidad, estabilidad y sostenibilidad medioambiental.",
    ],
  },
  {
    titulo: "Virtual Experience",
    icono: "virtual",
    texto: [
      "Primera empresa en tener realidad virtual exclusiva en los muebles. Con nuestra tecnología podés anticipar tu amoblamiento: visualizar en escala real el diseño de tu cocina, vestidor o espacio.",
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
];
