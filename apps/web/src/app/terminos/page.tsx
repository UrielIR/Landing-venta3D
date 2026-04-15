"use client";

import { Header, Footer } from "@repo/ui";

export default function TerminosPage() {
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
          Términos de Uso
        </h1>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>1. Aceptación</h2>
            <p>
              Al acceder y utilizar los servicios de Te lo imprimo, aceptas estar sujeto a estos términos y condiciones. Si no estás de acuerdo con alguna parte, no deberías utilizar nuestro sitio.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>2. Servicios de Impresión</h2>
            <p>
              Ofrecemos servicios de diseño y fabricación bajo demanda. El resultado final depende de la calidad de los archivos 3D proporcionados por el cliente. Nos reservamos el derecho de rechazar archivos que no sean técnicamente viables.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>3. Propiedad Intelectual</h2>
            <p>
              El cliente garantiza que posee los derechos sobre cualquier archivo subido para impresión. Te lo imprimo no reclama propiedad sobre tus diseños, pero requiere permiso para fabricarlos según tu orden.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>4. Pagos y Devoluciones</h2>
            <p>
              Debido a la naturaleza personalizada de los productos de impresión 3D, no se aceptan devoluciones a menos que el producto presente defectos de fabricación evidentes o daños durante el transporte.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
