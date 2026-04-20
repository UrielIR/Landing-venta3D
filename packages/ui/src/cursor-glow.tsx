"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * CursorGlow — foco luminoso amarillo suave que sigue al mouse.
 * Usa requestAnimationFrame para suavizado sin jank.
 * Se desactiva automáticamente en touch devices.
 * Solo se muestra sobre el fondo, no sobre contenido interactivo.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);
  const isOverContentRef = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.12);
    posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.12);

    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // Verifica si el elemento bajo el cursor es contenido interactivo o texto
  const isOverContent = useCallback((e: MouseEvent): boolean => {
    const target = e.target as HTMLElement;
    if (!target) return false;

    // Elementos donde NO debe aparecer el glow
    const contentSelectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a',
      'button', 'input', 'textarea', 'select', 'label',
      '[role="button"]', '[role="link"]',
      'article', 'section', 'header', 'footer', 'nav',
      '.cursor-glow-hide', // clase utilitaria para ocultar manualmente
    ];

    // Verifica si el target o algún ancestro es contenido
    const isContent = contentSelectors.some(selector => 
      target.matches(selector) || target.closest(selector)
    );

    return isContent;
  }, []);

  useEffect(() => {
    // No cursor glow on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Verificar si estamos sobre contenido
      const overContent = isOverContent(e);
      
      if (overContent !== isOverContentRef.current) {
        isOverContentRef.current = overContent;
        if (glowRef.current) {
          glowRef.current.style.opacity = overContent ? "0" : "1";
        }
      }

      if (!visibleRef.current && !overContent && glowRef.current) {
        visibleRef.current = true;
        glowRef.current.style.opacity = "1";
        // Initialize position to prevent jump from origin
        posRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleLeave = () => {
      if (glowRef.current) {
        visibleRef.current = false;
        glowRef.current.style.opacity = "0";
      }
    };

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, isOverContent]);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "400px",
        height: "400px",
        marginLeft: "-200px",
        marginTop: "-200px",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        willChange: "transform",
        transition: "opacity 0.4s ease",
        background:
          "radial-gradient(circle, var(--color-highlight) 0%, rgba(245,230,66,0.08) 30%, transparent 70%)",
        mixBlendMode: "soft-light",
        filter: "blur(2px)",
      }}
    />
  );
}
