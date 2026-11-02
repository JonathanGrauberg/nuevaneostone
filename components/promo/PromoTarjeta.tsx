import Image from "next/image";
import { Inter_Tight } from "next/font/google";
import type { Promo } from "@/lib/promoSchema";
import { wp } from "@/lib/img";
import { MedioPago } from "./MediosPago";

const inter = Inter_Tight({ subsets: ["latin"], weight: ["400", "500"] });

export type PromoContenido = Omit<Promo, "id" | "activa" | "videoCelular">;

/**
 * Tarjeta del popup (maqueta de la promo): foto a la izquierda y panel blanco con los
 * textos a la derecha; en celular, la foto arriba. Usa container queries, así se arma
 * igual en el popup real y en la vista previa angosta del panel /admin.
 */
export function PromoTarjeta({ promo, onCerrar, onVideo }: { promo: PromoContenido; onCerrar: () => void; onVideo?: () => void }) {
  return (
    <div className={`${inter.className} @container w-full`}>
      <div className="flex flex-col bg-white text-[#1a1a1a] @3xl:flex-row">
        {/* Foto */}
        <div className="relative aspect-[3/2] shrink-0 bg-neutral-300 @3xl:aspect-auto @3xl:w-[48%]">
          {promo.imagen && (
            // eslint-disable-next-line @next/next/no-img-element -- imagen subida desde /admin (Vercel Blob)
            <img src={promo.imagen} alt="" className="absolute inset-0 h-full w-full object-cover" />
          )}
          {promo.epigrafe && (
            <p className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/50 to-transparent px-9 pt-16 pb-9 text-[11px] tracking-[0.3em] text-white uppercase @3xl:block">
              {promo.epigrafe}
            </p>
          )}
          {/* Cerrar en celular: cuadrado blanco sobre la foto */}
          <button type="button" onClick={onCerrar} aria-label="Cerrar" className="absolute top-0 right-0 grid size-14 place-items-center bg-white text-xl @3xl:hidden">
            ✕
          </button>
        </div>

        {/* Textos */}
        <div className="flex flex-1 flex-col px-6 py-8 @3xl:px-14 @3xl:py-14">
          <div className="hidden items-center justify-between @3xl:flex">
            <span className="relative block h-[26px] w-[132px]">
              <Image src={wp("2025/05/Logo-grande-horizontal-blanco.png")} alt="Neostone Amoblamientos" fill sizes="132px" className="object-contain object-left invert" />
            </span>
            <button type="button" onClick={onCerrar} className="flex items-center gap-3 text-[11px] tracking-[0.3em] text-neutral-600 uppercase transition-colors hover:text-black">
              Cerrar <span className="text-base">✕</span>
            </button>
          </div>

          {promo.eyebrow && <p className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase @3xl:mt-16 @3xl:text-[11px] @3xl:tracking-[0.3em]">{promo.eyebrow}</p>}
          <h2 className="mt-5 text-[31px] leading-[1.05] font-medium tracking-[-0.03em] whitespace-pre-line @3xl:text-[44px]">{promo.titulo}</h2>
          <hr className="mt-7 border-[#1a1a1a]" />
          <p className="mt-7 text-[16px] leading-[1.75] whitespace-pre-line text-neutral-600">{promo.texto}</p>

          <div className="mt-9 flex flex-col gap-3 @3xl:flex-row">
            <button
              type="button"
              onClick={onCerrar}
              className="flex items-center justify-center gap-3 bg-[#2b2b2b] px-7 py-4 text-[13px] tracking-[0.25em] text-white uppercase transition-colors hover:bg-black"
            >
              {promo.boton} <span aria-hidden>→</span>
            </button>
            {onVideo && (
              <button
                type="button"
                onClick={onVideo}
                className="flex items-center justify-center gap-3 border border-[#1a1a1a] px-7 py-4 text-[13px] tracking-[0.25em] uppercase transition-colors hover:bg-black hover:text-white"
              >
                <span aria-hidden className="text-[10px]">▶</span> {promo.botonVideo}
              </button>
            )}
          </div>

          {promo.medios.length > 0 && (
            <div className="mt-9 flex items-center gap-6 border-t border-neutral-200 pt-6 @3xl:mt-12 @3xl:pt-7">
              <span className="hidden text-[11px] tracking-[0.3em] text-neutral-500 uppercase @3xl:inline">Pagás con</span>
              <div className="flex flex-1 items-center justify-between gap-5 @3xl:flex-none @3xl:justify-start">
                {promo.medios.map((m) => (
                  <MedioPago key={m} medio={m} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
