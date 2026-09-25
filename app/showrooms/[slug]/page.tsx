import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { StaffCard } from "@/components/cards/StaffCard";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { DistanceFromYou } from "@/components/showrooms/DistanceFromYou";
import { OpenNow } from "@/components/showrooms/OpenNow";
import { site } from "@/data/site";
import { getShowroom, getShowroomSlugs, showroomsCercanos } from "@/lib/content";
import { formatearHorario } from "@/lib/horarios";

export const dynamicParams = false;

export function generateStaticParams() {
  // Incluye los "cerrado" para que su URL vieja redirija en vez de dar 404.
  return getShowroomSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/showrooms/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getShowroom(slug);
  if (!s) return {};
  const descripcion = `Showroom Neostone en ${s.ciudad}, ${s.provincia}. ${s.direccion}. Cocinas, placards y vestidores con 5 años de garantía.`;
  return {
    title: `Showroom ${s.ciudad}`,
    description: descripcion,
    alternates: { canonical: `/showrooms/${s.slug}` },
    openGraph: { title: `Neostone ${s.ciudad}`, description: descripcion, images: s.frente ? [s.frente] : s.galeria.slice(0, 1) },
  };
}

export default async function ShowroomPage({ params }: PageProps<"/showrooms/[slug]">) {
  const { slug } = await params;
  const s = getShowroom(slug);
  if (!s) notFound();
  if (s.estado === "cerrado") permanentRedirect("/showrooms");

  const portada = s.frente ?? s.galeria[0];
  const cercanos = showroomsCercanos(s);
  const whatsapp = s.whatsapp ?? (s.casaCentral ? site.whatsapp : undefined);
  const mapa = `https://maps.google.com/maps?q=${encodeURIComponent(`${s.direccion}, ${s.ciudad}, ${s.provincia}`)}&z=15&output=embed`;

  // SEO local: ficha de negocio para Google.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: `Neostone ${s.ciudad} · ${s.nombre}`,
    address: { "@type": "PostalAddress", streetAddress: s.direccion, addressLocality: s.ciudad, addressRegion: s.provincia, addressCountry: "AR" },
    geo: { "@type": "GeoCoordinates", latitude: s.geo.lat, longitude: s.geo.lng },
    telephone: s.telefonos[0]?.numero,
    email: s.email,
    image: portada,
    url: `${site.url}/showrooms/${s.slug}`,
    brand: { "@type": "Brand", name: "Neostone" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[78svh] min-h-[560px] overflow-hidden">
        {portada && <Image src={portada} alt={`Frente del showroom de ${s.ciudad}`} fill priority sizes="100vw" quality={90} className="scale-105 object-cover" />}
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, var(--bg) 0%, transparent 60%)" }} />
        <div className="absolute inset-x-0 top-0 h-48" style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--bg) 85%, transparent), transparent)" }} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--bg) 85%, transparent) 0%, transparent 70%)" }}
        />
        <div className="container-x relative flex h-full flex-col justify-between pt-28 pb-14">
          <p className="eyebrow">
            <Link href="/showrooms" className="transition-colors hover:text-fg">
              ← Showrooms
            </Link>{" "}
            / {s.provincia}
          </p>
          <div>
            <div className="mb-5">
              {s.estado === "proximamente" ? <span className="eyebrow !text-accent">Próximamente</span> : <OpenNow horarios={s.horarios} />}
            </div>
            <WordReveal as="h1" trigger="mount" lines={[s.ciudad]} className="font-display text-6xl leading-none font-extralight md:text-8xl" />
            <Reveal delay={0.3}>
              <p className="mt-5 font-display text-[12px] tracking-[0.28em] text-fg-soft uppercase">
                {s.razonSocial ?? s.nombre}
                {s.casaCentral ? " — Casa central y fábrica" : " — Showroom oficial"}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── DATOS + MAPA ─────────────────────────────────── */}
      <section className="container-x grid gap-12 py-20 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <dl className="text-[15px]">
            {[
              ["Dirección", <span key="d">{s.direccion}<br />{s.ciudad}, {s.provincia}</span>],
              [
                "Teléfono",
                <span key="t" className="flex flex-col gap-1">
                  {s.telefonos.map((t) => (
                    <a key={t.numero + t.texto} href={`tel:${t.numero}`} className="transition-colors hover:text-accent">
                      {t.texto}
                    </a>
                  ))}
                </span>,
              ],
              [
                "Horario",
                <span key="h" className="flex flex-col gap-1">
                  {s.horarios.map((h) => {
                    const f = formatearHorario(h);
                    return (
                      <span key={h.dias}>
                        {f.dias} <span className="text-muted">·</span> {f.horas}
                      </span>
                    );
                  })}
                </span>,
              ],
              ...(s.email
                ? [["Email", <a key="e" href={`mailto:${s.email}`} className="break-all transition-colors hover:text-accent">{s.email}</a>] as const]
                : []),
            ].map(([dt, dd]) => (
              <div key={dt as string} className="grid grid-cols-[110px_1fr] gap-4 border-t border-line py-4 last:border-b">
                <dt className="eyebrow pt-0.5">{dt}</dt>
                <dd className="text-fg-soft">{dd}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-2">
            <a href={s.mapsUrl} target="_blank" rel="noopener" className="btn-outline">
              Cómo llegar ↗
            </a>
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener" className="btn-outline">
                WhatsApp
              </a>
            )}
            <Link href={`/presupuesto?showroom=${s.slug}`} className="btn-outline !border-accent">
              Pedir presupuesto
            </Link>
          </div>
        </Reveal>
        <ImageReveal className="relative min-h-[360px] overflow-hidden bg-surface md:col-span-7">
          <iframe
            src={mapa}
            title={`Mapa del showroom de ${s.ciudad}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-dark absolute inset-0 h-full w-full border-0"
          />
        </ImageReveal>
      </section>

      {/* ─── EQUIPO ───────────────────────────────────────── */}
      {s.staff.length > 0 && (
        <section className="container-x pb-20">
          <div className="mb-8 flex items-baseline justify-between border-b border-line pb-4">
            <h2 className="eyebrow">Equipo</h2>
            <span className="eyebrow">{s.staff.length} {s.staff.length === 1 ? "persona" : "personas"}</span>
          </div>
          <div className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5">
            {s.staff.map((p, i) => (
              <Reveal key={p.nombre} delay={i * 0.06}>
                <StaffCard {...p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ─── GALERÍA ──────────────────────────────────────── */}
      {s.galeria.length > 0 && (
        <section className="container-x pb-24">
          <div className="mb-8 border-b border-line pb-4">
            <h2 className="eyebrow">El showroom</h2>
          </div>
          <div className="grid auto-rows-[180px] grid-cols-2 gap-px md:auto-rows-[240px] md:grid-cols-4">
            {s.galeria.map((src, i) => (
              <ImageReveal
                key={src + i}
                delay={(i % 4) * 0.08}
                className={`group relative overflow-hidden bg-surface ${i === 0 ? "col-span-2 row-span-2" : ""} ${i === 3 ? "md:col-span-2" : ""}`}
              >
                <Image
                  src={src}
                  alt={`Showroom ${s.ciudad}, foto ${i + 1}`}
                  fill
                  sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-105"
                />
              </ImageReveal>
            ))}
          </div>
        </section>
      )}

      {/* ─── CERCANOS ─────────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="container-x flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-10">
            <DistanceFromYou geo={s.geo} />
            <p className="eyebrow">Otros showrooms cerca</p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {cercanos.map(({ showroom: o, km }) => (
              <Link key={o.slug} href={`/showrooms/${o.slug}`} className="group font-display text-sm tracking-[0.16em] uppercase">
                <span className="transition-colors group-hover:text-accent">{o.ciudad}</span> <span className="text-muted">{km} km</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
