"use client";

import { motion } from "motion/react";
import { Fragment } from "react";
import { easeLux } from "./Reveal";

type Props = {
  /** Cada string es una línea. Las palabras entre *asteriscos* van en peso medio. */
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
  /** "view" = anima al entrar en pantalla; "mount" = al cargar (heroes). */
  trigger?: "view" | "mount";
  as?: "h1" | "h2" | "p";
};

/** Título que aparece palabra por palabra, cada una subiendo dentro de una máscara. */
export function WordReveal({ lines, className, delay = 0, stagger = 0.06, trigger = "view", as = "h2" }: Props) {
  const Tag = motion[as];
  let i = 0;
  const animate = { y: "0%" };
  return (
    <Tag
      className={className}
      initial="hidden"
      {...(trigger === "mount" ? { animate: "shown" } : { whileInView: "shown", viewport: { once: true, margin: "-10% 0px" } })}
      aria-label={lines.join(" ").replaceAll("*", "")}
    >
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split(" ").map((word, wi) => {
            const strong = word.startsWith("*") && word.endsWith("*");
            const idx = i++;
            return (
              <span key={wi} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
                <motion.span
                  className={`inline-block ${strong ? "font-normal" : ""}`}
                  variants={{ hidden: { y: "105%" }, shown: animate }}
                  transition={{ duration: 1, ease: easeLux, delay: delay + idx * stagger }}
                >
                  {word.replaceAll("*", "")}&nbsp;
                </motion.span>
              </span>
            );
          })}
        </Fragment>
      ))}
    </Tag>
  );
}
