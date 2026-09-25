"use client";

import { motion, type HTMLMotionProps } from "motion/react";

export const easeLux = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Fade + subida suave al entrar en pantalla. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: easeLux, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Revela una imagen de abajo hacia arriba con clip-path. */
export function ImageReveal({ delay = 0, children, ...rest }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.3, ease: easeLux, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
