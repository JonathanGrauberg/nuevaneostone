"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/data/site";
import { wp } from "@/lib/img";
import { easeLux } from "@/components/motion/Reveal";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  // ¿Lo que está debajo del navbar es una sección siempre oscura (.force-dark)?
  // En modo claro, el navbar transparente pasa a letras claras para no perderse.
  const [sobreOscuro, setSobreOscuro] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const detectar = () => {
      const debajo = document.elementsFromPoint(window.innerWidth / 2, 40).find((el) => !el.closest("header"));
      setSobreOscuro(!!debajo?.closest(".force-dark"));
    };
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 300 && y > last);
      last = y;
      detectar();
    };
    onScroll();
    // Al cambiar de página el contenido nuevo tarda un instante en pintarse
    const t = window.setTimeout(detectar, 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", detectar);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", detectar);
    };
  }, [pathname]);

  // Cerrar el menú mobile al navegar (ajuste de estado durante el render, sin efecto).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-700 ease-lux ${
          hidden && !open ? "-translate-y-full" : ""
        } ${scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : `border-b border-transparent ${sobreOscuro ? "on-dark" : ""}`}`}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <Link href="/" aria-label="Neostone, inicio" className="relative block h-[30px] w-[137px]">
            <Image
              src={wp("2025/05/Logo-grande-horizontal-blanco.png")}
              alt="Neostone Amoblamientos"
              fill
              sizes="137px"
              priority
              className="logo object-contain object-left"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative font-display text-[11px] tracking-[0.22em] whitespace-nowrap uppercase transition-colors ${
                    active ? "text-fg" : "text-fg-soft hover:text-fg"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-accent transition-all duration-500 ease-lux ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <ThemeToggle className="text-fg-soft hover:text-fg" />
            <Link href="/presupuesto" className="btn-outline !py-3">
              Presupuesto
            </Link>
          </nav>

          <button
            className="flex h-10 w-10 flex-col items-end justify-center gap-[7px] lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <span className={`h-px bg-fg transition-all duration-500 ease-lux ${open ? "w-6 translate-y-[4px] rotate-45" : "w-6"}`} />
            <span className={`h-px bg-fg transition-all duration-500 ease-lux ${open ? "w-6 -translate-y-[4px] -rotate-45" : "w-4"}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-bg px-6 pb-12 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: easeLux }}
          >
            <nav className="flex flex-col">
              {[...nav, { href: "/presupuesto", label: "Presupuesto" }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: easeLux, delay: 0.2 + i * 0.06 }}
                  className="border-t border-line"
                >
                  <Link href={item.href} className="flex items-baseline justify-between py-5 font-display text-3xl font-extralight">
                    {item.label}
                    <span className="eyebrow">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
              <span className="eyebrow">Tema</span>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
