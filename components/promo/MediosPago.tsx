import type { medios } from "@/lib/promoSchema";

export type Medio = (typeof medios)[number];

export const nombresMedios: Record<Medio, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  naranja: "Naranja X",
  banco: "Transferencia bancaria",
};

/** Ícono chico de cada medio de pago (dibujos simples, sin depender de archivos) */
export function MedioPago({ medio }: { medio: Medio }) {
  const comun = { role: "img", "aria-label": nombresMedios[medio], className: "h-6 w-auto" } as const;
  switch (medio) {
    case "visa":
      return (
        <svg viewBox="0 0 40 24" {...comun}>
          <rect width="40" height="24" rx="3" fill="#f3f3f6" />
          <text x="20" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontStyle="italic" fontWeight="800" fill="#1a1f71">
            VISA
          </text>
        </svg>
      );
    case "mastercard":
      return (
        <svg viewBox="0 0 40 24" {...comun}>
          <rect width="40" height="24" rx="3" fill="#f6f6f6" />
          <circle cx="16" cy="12" r="7" fill="#eb001b" />
          <circle cx="24" cy="12" r="7" fill="#f79e1b" />
          <path d="M20 6.3a7 7 0 0 1 0 11.4 7 7 0 0 1 0-11.4Z" fill="#ff5f00" />
        </svg>
      );
    case "naranja":
      return (
        <svg viewBox="0 0 24 24" {...comun}>
          <defs>
            <linearGradient id="naranja-x" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#fe5000" />
              <stop offset="1" stopColor="#e4002b" />
            </linearGradient>
          </defs>
          <path d="M4 21 9 3h3.6l3.6 11.2L19 3h1.6L16 21h-3.2L9.6 10.6 7.2 21Z" fill="url(#naranja-x)" />
        </svg>
      );
    case "banco":
      return (
        <svg viewBox="0 0 24 24" {...comun}>
          <circle cx="12" cy="12" r="12" fill="#13839a" />
          <path d="M12 5 5.5 8.5v1.3h13V8.5Zm-5 6v5h1.6v-5Zm3.2 0v5h1.6v-5Zm3.2 0v5H15v-5Zm3.2 0v5h1.6v-5ZM5.5 17.2v1.5h13v-1.5Z" fill="#fff" />
        </svg>
      );
  }
}
