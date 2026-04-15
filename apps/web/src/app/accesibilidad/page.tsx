"use client";

import { Header, Footer } from "@repo/ui";

export default function AccesibilidadPage() {
  return (
    <div style={{ background: "var(--color-bg-base)", color: "var(--color-text-primary)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      
      <main style={{ 
        maxWidth: "800px", 
        margin: "0 auto", 
        padding: "160px 40px 100px",
        flex: 1
      }}>
        <h1 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))", 
          marginBottom: "var(--space-12)",
          lineHeight: "var(--leading-tight)"
        }}>
          Declaración de Accesibilidad
        </h1>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>Nuestro compromiso</h2>
            <p>
              En Te lo imprimo, creemos que el diseño debe ser accesible para todos. Nos esforzamos por garantizar que nuestro sitio web sea utilizable por el mayor número posible de personas, independientemente de su capacidad o tecnología.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>Estándares aplicados</h2>
            <p>
              Estamos trabajando para cumplir con las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1 en su nivel AA. Esto incluye asegurar contrastes de color adecuados, navegación por teclado y compatibilidad con lectores de pantalla.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>Herramientas de apoyo</h2>
            <p>
              Nuestro sitio incluye un selector de modo claro/oscuro para facilitar la lectura según las necesidades visuales de cada usuario y utiliza fuentes legibles con espaciado optimizado.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>Feedback</h2>
            <p>
              Si encuentras alguna barrera de accesibilidad mientras utilizas nuestro sitio, por favor contáctanos. Valoramos tus comentarios para seguir mejorando nuestra plataforma digital.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
