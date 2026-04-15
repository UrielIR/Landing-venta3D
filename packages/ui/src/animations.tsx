"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

/* ────────────────────────────────────────────────────────────
   RevealOnScroll — revela hijos al entrar en viewport
   ──────────────────────────────────────────────────────────── */
interface RevealOnScrollProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  /** Viewport offset trigger (0–1). Default 0.15 */
  viewportMargin?: number;
  className?: string;
  style?: React.CSSProperties;
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  viewportMargin = 0.15,
  className,
  style,
}: RevealOnScrollProps) {
  const offset = directionMap[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial={false} // Desactivamos el estado inicial oculto para evitar pantallas negras
      whileInView="visible"
      viewport={{ once: true, amount: viewportMargin }}
      className={className}
      style={{ ...style, opacity: 1 }} // Forzamos visibilidad base
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────
   StaggerChildren — staggers child animations sequentially
   ──────────────────────────────────────────────────────────── */
interface StaggerChildrenProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggerChildren({
  children,
  stagger = 0.08,
  className,
  style,
}: StaggerChildrenProps) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
      style={{ ...style, opacity: 1 }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item} style={{ opacity: 1 }}>{child}</motion.div>
      ))}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────
   TextReveal — revela texto carácter por carácter
   ──────────────────────────────────────────────────────────── */
interface TextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  style,
  delay = 0,
  as: Tag = "span",
}: TextRevealProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariant: Variants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em", opacity: 1, ...style }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={wordVariant} style={{ opacity: 1 }}>
          <Tag style={{ display: "inline", margin: 0, padding: 0, font: "inherit", color: "inherit", letterSpacing: "inherit" }}>
            {word}
          </Tag>
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ────────────────────────────────────────────────────────────
   HoverScale — sutil scale al hacer hover
   ──────────────────────────────────────────────────────────── */
interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function HoverScale({
  children,
  scale = 1.03,
  className,
  style,
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
