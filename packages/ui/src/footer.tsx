"use client";

import * as React from "react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      position: "relative",
      padding: "var(--space-24) var(--space-8) var(--space-12)", 
      borderTop: "1.5px solid var(--color-border-subtle)",
      background: "var(--color-bg-base)",
      marginTop: "auto",
      overflow: "hidden"
    }}>
      {/* Decorative Large Background Logo */}
      <div style={{
        position: "absolute",
        bottom: "-10%",
        right: "-5%",
        fontSize: "clamp(150px, 25vw, 400px)",
        fontWeight: "var(--weight-black)",
        color: "var(--color-text-primary)",
        opacity: 0.03,
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        letterSpacing: "-0.05em",
        zIndex: 0
      }}>
        Te lo imprimo
      </div>

      <div style={{ 
        position: "relative",
        zIndex: 1,
        maxWidth: "var(--container-xl)", 
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "var(--space-16)",
        marginBottom: "var(--space-24)"
      }}>
        {/* Branding */}
        <div style={{ gridColumn: "span 2" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "var(--space-1)", marginBottom: "var(--space-6)" }}>
            <span style={{ 
              fontFamily: "var(--font-sans)", 
              fontSize: "var(--text-xl)", 
              fontWeight: "var(--weight-black)", 
              color: "var(--color-text-primary)" 
            }}>Te lo</span>
            <span style={{ 
              fontFamily: "var(--font-sans)", 
              fontSize: "var(--text-xl)", 
              fontWeight: "var(--weight-black)", 
              color: "var(--color-accent)" 
            }}>imprimo</span>
          </Link>
          <p style={{ 
            color: "var(--color-text-secondary)", 
            lineHeight: "var(--leading-relaxed)",
            fontSize: "var(--text-md)",
            maxWidth: "35ch"
          }}>
            Fusionamos el diseño algorítmico con la manufactura aditiva para crear objetos que desafían lo convencional.
          </p>
        </div>

        {/* Explorar */}
        <div>
          <h4 style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-widest)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-8)" }}>Explorar</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <li><Link href="/tienda" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Tienda</Link></li>
            <li><Link href="/#como-trabajamos" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Cómo trabajamos</Link></li>
            <li><Link href="/contacto" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Contacto</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-widest)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-8)" }}>Legal</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <li><Link href="/privacidad" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Privacidad</Link></li>
            <li><Link href="/cookies" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Cookies</Link></li>
            <li><Link href="/terminos" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Términos</Link></li>
            <li><Link href="/accesibilidad" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Accesibilidad</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-widest)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-8)" }}>Seguir</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <li><a href="https://linkedin.com/company/ir3d-cl" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>LinkedIn</a></li>
            <li><a href="https://instagram.com/ir3d.cl" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Instagram</a></li>
            <li><a href="https://youtube.com/@ir3d.cl" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>YouTube</a></li>
          </ul>
        </div>
      </div>

      {/* Credits */}
      <div style={{ 
        position: "relative",
        zIndex: 1,
        maxWidth: "var(--container-xl)", 
        margin: "0 auto", 
        paddingTop: "var(--space-8)", 
        borderTop: "1px solid var(--color-border-subtle)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "var(--space-4)"
      }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "var(--space-2)",
          alignItems: "center",
          textAlign: "center",
          width: "100%"
        }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "var(--tracking-wide)" }}>
            © {currentYear} Te Lo Imprimo
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-disabled)", textTransform: "uppercase" }}>
            Desarrollado por <strong>Integra Cloud</strong>
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-disabled)", textTransform: "uppercase", letterSpacing: "var(--tracking-tight)", marginTop: "var(--space-2)" }}>
            Santiago, Chile
          </span>
        </div>
      </div>
    </footer>
  );
}

