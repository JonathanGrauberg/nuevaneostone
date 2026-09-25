import type { Showroom } from "./schemas";

type Horario = Showroom["horarios"][number];

const etiquetaDias: Record<Horario["dias"], string> = {
  "lun-vie": "Lunes a viernes",
  "lun-sab": "Lunes a sábado",
  "lun-dom": "Todos los días",
  sab: "Sábados",
  dom: "Domingos",
};

// 0 = domingo … 6 = sábado
const diasIncluidos: Record<Horario["dias"], number[]> = {
  "lun-vie": [1, 2, 3, 4, 5],
  "lun-sab": [1, 2, 3, 4, 5, 6],
  "lun-dom": [0, 1, 2, 3, 4, 5, 6],
  sab: [6],
  dom: [0],
};

export function formatearHorario(h: Horario) {
  return { dias: etiquetaDias[h.dias], horas: h.tramos.map((t) => t.replace("-", " – ")).join(" y ") };
}

const aMinutos = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** ¿Está abierto ahora? Se calcula en hora de Argentina. */
export function estaAbierto(horarios: Horario[], ahora = new Date()) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(ahora);
  const get = (t: string) => partes.find((p) => p.type === t)?.value ?? "";
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const min = Number(get("hour")) * 60 + Number(get("minute"));
  return horarios.some(
    (h) =>
      diasIncluidos[h.dias].includes(dia) &&
      h.tramos.some((t) => {
        const [desde, hasta] = t.split("-");
        return min >= aMinutos(desde) && min < aMinutos(hasta);
      }),
  );
}
