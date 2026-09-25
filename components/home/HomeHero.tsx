"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { WordReveal } from "@/components/motion/WordReveal";
import { easeLux } from "@/components/motion/Reveal";

const DURACION = 6500;

export function HomeHero({ slides }: { slides: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), DURACION);
    return () => clearTimeout(t);
  }, [i, slides.length]);

  return (
    <section className="relative h-svh min-h-[640px] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: easeLux }}
        >
          <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 9, ease: "linear" }}>
            <Image src={slides[i]} alt="" fill priority={i === 0} sizes="100vw" quality={90} className="object-cover" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 75%, transparent) 30%, color-mix(in srgb, var(--bg) 35%, transparent) 65%, color-mix(in srgb, var(--bg) 60%, transparent) 100%)" }} />

      <div className="container-x relative flex h-full flex-col justify-end pb-16 md:pb-20">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeLux, delay: 0.1 }}
        >
          Amoblamientos · Crespo, Entre Ríos
        </motion.p>
        <WordReveal
          as="h1"
          trigger="mount"
          delay={0.25}
          stagger={0.09}
          lines={["Tu espacio.", "*Tu* *mundo.*"]}
          className="font-display text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.98] font-extralight tracking-[-0.01em]"
        />
        <motion.div
          className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeLux, delay: 0.8 }}
        >
          <div className="flex flex-wrap gap-8">
            <Link href="/colecciones" className="link-line">
              Ver colecciones →
            </Link>
            <Link href="/showrooms" className="eyebrow transition-colors hover:text-fg">
              Encontrá tu showroom
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {slides.map((_, n) => (
              <button key={n} onClick={() => setI(n)} aria-label={`Imagen ${n + 1}`} className="group relative h-6 w-10">
                <span className="absolute top-1/2 left-0 h-px w-full bg-line-strong" />
                {n === i && (
                  <motion.span
                    className="absolute top-1/2 left-0 h-px bg-fg"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: DURACION / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
            <span className="eyebrow ml-2 tabular-nums">
              {String(i + 1).padStart(2, "0")} — {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
