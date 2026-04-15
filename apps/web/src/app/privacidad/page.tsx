"use client";

import { Header, Footer } from "@repo/ui";

export default function PrivacidadPage() {
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
          Política de Privacidad
        </h1>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>1. Introducción</h2>
            <p>
              En Te lo imprimo, respetamos tu privacidad y nos comprometemos a proteger los datos personales que compartes con nosotros. Esta política describe cómo manejamos tu información en nuestro estudio de diseño.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>2. Datos que recolectamos</h2>
            <p>
              Solo recolectamos la información necesaria para procesar tus pedidos de impresión 3D: nombre, correo electrónico, y los archivos de diseño que subes para cotización.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>3. Uso de la información</h2>
            <p>
              Utilizamos tus datos exclusivamente para enviarte cotizaciones, confirmar pedidos y coordinar la entrega de tus piezas físicas. No vendemos ni compartimos tus datos con terceros para fines publicitarios.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>4. Seguridad</h2>
            <p>
              Implementamos medidas de seguridad para proteger tus archivos y datos de contacto. Los archivos 3D subidos se eliminan de nuestros servidores temporales una vez completado el proyecto, a menos que solicites lo contrario.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
