/**
 * Club de Profesionales Neostone — BORRADOR (a definir con Neostone).
 * La página existe en /club-profesionales pero NO está publicada: no figura en el menú,
 * ni en el sitemap, y le pide a Google que no la indexe. Para lanzarla:
 *   1. publicado: true (saca el aviso de borrador y permite indexarla)
 *   2. sumar { href: "/club-profesionales", label: "Club" } al menú en data/site.ts
 *   3. sumarla al sitemap (app/sitemap.ts)
 */
export const club = {
  publicado: false,
  titulo: ["Club de", "*Profesionales* *Neostone.*"],
  bajada:
    "Un espacio para arquitectos, diseñadores de interiores y desarrolladores que proyectan con Neostone: acompañamiento técnico, herramientas y beneficios para cada obra.",
  // Beneficios tentativos: reemplazar por los definitivos
  beneficios: [
    { titulo: "Atención prioritaria", texto: "Un referente técnico-comercial dedicado para tus proyectos y presupuestos." },
    { titulo: "Experiencia VR para tus clientes", texto: "Presentá tus diseños en realidad virtual, en escala real, en cualquiera de nuestros showrooms." },
    { titulo: "Material técnico", texto: "Carta de colores, fichas técnicas y bloques de cada colección para integrar a tus planos." },
    { titulo: "Beneficios comerciales", texto: "Condiciones especiales por proyecto y por volumen de obra." },
  ],
  pasos: ["Completás tus datos profesionales.", "Te contactamos para conocer tu estudio.", "Empezás a proyectar con beneficios."],
  contactoTexto: "Hola, soy profesional y quiero sumarme al Club de Profesionales Neostone.",
};
