/**
 * FORMULARIOS (presupuesto, distribuidores, post venta y desarrollos)
 *
 * Mismos campos que tenían los formularios de la web anterior. Al enviar se abre
 * WhatsApp de casa central (site.whatsapp) con los datos ya escritos.
 */
export type Campo = {
  id: string;
  etiqueta: string;
  tipo?: "text" | "email" | "tel" | "textarea" | "select";
  /** Opciones del desplegable (tipo "select") */
  opciones?: string[];
  requerido?: boolean;
  /** Ocupa las dos columnas en desktop */
  ancho?: boolean;
};

export type Formulario = {
  eyebrow: string;
  titulo: [string, string];
  bajada: string;
  /** Primera línea del mensaje de WhatsApp */
  saludo: string;
  campos: Campo[];
};

const contacto: Campo[] = [
  { id: "nombre", etiqueta: "Nombre y apellido", requerido: true },
  { id: "localidad", etiqueta: "Localidad", requerido: true },
  { id: "provincia", etiqueta: "Provincia", requerido: true },
  { id: "telefono", etiqueta: "Teléfono", tipo: "tel", requerido: true },
  { id: "email", etiqueta: "Email", tipo: "email", requerido: true },
];

export const formularios = {
  presupuesto: {
    eyebrow: "Solicitar presupuesto",
    titulo: ["Empecemos", "*tu* *proyecto.*"],
    bajada: "Dejanos tus datos y un asesor te contacta para avanzar con tu cocina, placard o vestidor.",
    saludo: "Hola Neostone, quiero solicitar un presupuesto.",
    campos: [...contacto, { id: "comentario", etiqueta: "Contanos tu proyecto", tipo: "textarea", ancho: true }],
  },
  distribuidores: {
    eyebrow: "Quiero ser distribuidor",
    titulo: ["Sumate a la", "*red* *Neostone.*"],
    bajada: "Contanos sobre tu empresa y nos comunicamos para conocerte.",
    saludo: "Hola Neostone, quiero ser distribuidor.",
    campos: [
      { id: "nombre", etiqueta: "Nombre y apellido", requerido: true },
      { id: "razonSocial", etiqueta: "Razón social", requerido: true },
      { id: "cuit", etiqueta: "CUIT", requerido: true },
      { id: "actividad", etiqueta: "Actividad principal que desarrolla", requerido: true },
      ...contacto.slice(1),
      { id: "comentario", etiqueta: "Comentario", tipo: "textarea", ancho: true },
    ],
  },
  postventa: {
    eyebrow: "Servicio post venta",
    titulo: ["Estamos para", "*acompañarte.*"],
    bajada: "Si necesitás un ajuste o tenés una consulta sobre tu amoblamiento, escribinos.",
    saludo: "Hola Neostone, necesito el servicio post venta.",
    campos: [...contacto, { id: "comentario", etiqueta: "Comentarios", tipo: "textarea", ancho: true }],
  },
  desarrollos: {
    eyebrow: "05 · Consulta",
    titulo: ["Contanos tu *próximo*", "*proyecto.*"],
    bajada: "Un asesor de proyectos se pone en contacto con vos. Si tenés planos, mandalos en la misma conversación de WhatsApp.",
    saludo: "Hola Neostone, quiero consultar por un desarrollo.",
    campos: [
      { id: "nombre", etiqueta: "Nombre y apellido", requerido: true },
      { id: "empresa", etiqueta: "Empresa" },
      { id: "rol", etiqueta: "Rol", tipo: "select", requerido: true, opciones: ["Desarrollador", "Constructora", "Estudio de arquitectura", "Inversor", "Otro"] },
      { id: "ciudad", etiqueta: "Ciudad del proyecto", requerido: true },
      { id: "telefono", etiqueta: "WhatsApp", tipo: "tel", requerido: true },
      { id: "email", etiqueta: "Email", tipo: "email", requerido: true },
      { id: "unidades", etiqueta: "Cantidad de unidades", tipo: "select", opciones: ["Hasta 10", "11 a 30", "31 a 80", "Más de 80"] },
      { id: "etapa", etiqueta: "Etapa de la obra", tipo: "select", opciones: ["Anteproyecto", "Proyecto aprobado", "En construcción", "En terminaciones"] },
    ],
  },
} satisfies Record<string, Formulario>;

export const consentimiento =
  "Quedo sujeto a la legislación vigente sobre políticas de privacidad y uso de datos (Ley Nacional N° 25.326/2000 y Ley 27.483/2018) y doy mi consentimiento para que NEOSTONE me contacte a través de los medios que proporciono y me envíe información.";
