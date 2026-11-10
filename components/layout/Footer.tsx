import Link from "next/link";
import { nav, site } from "@/data/site";

const contacto = [
  { href: "/presupuesto", label: "Solicitar presupuesto" },
  { href: "/distribuidores", label: "Quiero ser distribuidor" },
  { href: "/postventa", label: "Servicio post venta" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="container-x grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl font-extralight leading-tight md:text-4xl">
            Tu espacio.
            <br />
            <span className="font-normal">Tu mundo.</span>
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{site.descripcion}</p>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow mb-5">Sitio</p>
          <ul className="space-y-3 text-sm">
            {nav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-fg-soft transition-colors hover:text-fg">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow mb-5">Contacto</p>
          <ul className="space-y-3 text-sm">
            {contacto.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-fg-soft transition-colors hover:text-fg">
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.trabajaConNosotros} target="_blank" rel="noopener" className="text-fg-soft transition-colors hover:text-fg">
                Trabajá con nosotros ↗
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow mb-5">Casa central</p>
          <address className="space-y-3 text-sm not-italic text-fg-soft">
            <p>{site.direccion}</p>
            {site.telefonos.map((t) => (
              <p key={t.numero}>
                <a href={`tel:${t.numero}`} className="transition-colors hover:text-fg">
                  {t.texto}
                </a>
              </p>
            ))}
            <p>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-fg">
                {site.email}
              </a>
            </p>
          </address>
          <div className="mt-6 flex gap-6">
            <a href={site.redes.instagram} target="_blank" rel="noopener" className="link-line">
              Instagram
            </a>
            <a href={site.redes.facebook} target="_blank" rel="noopener" className="link-line">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-line py-6 text-xs text-muted md:flex-row">
        <p>© {new Date().getFullYear()} Neostone S.A. · Crespo, Entre Ríos</p>
        <p>5 años de garantía en todos nuestros amoblamientos</p>
      </div>
      <div className="container-x -mt-4 pb-6">
        <a
          href="https://webistudio.net"
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center gap-1.5 text-[11px] text-muted/70 transition-colors hover:text-fg-soft"
        >
          Desarrollado por
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/webi-blanco.png" alt="Webi" width={38} height={12} className="webi-oscuro h-3 w-auto opacity-60 transition-opacity group-hover:opacity-100" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/webi-negro.png" alt="Webi" width={38} height={12} className="webi-claro hidden h-3 w-auto opacity-60 transition-opacity group-hover:opacity-100" />
        </a>
      </div>
    </footer>
  );
}
