"use client";

import { Header, Footer } from "@repo/ui";

export default function CookiesPage() {
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
          Política de Cookies
        </h1>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web para mejorar tu experiencia de usuario.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>2. ¿Cómo las usamos?</h2>
            <p>
              En Te lo imprimo utilizamos cookies técnicas y de sesión para mantener el estado de tu carrito de compras y recordar tu preferencia de tema (claro u oscuro).
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>3. Cookies de terceros</h2>
            <p>
              Podemos utilizar servicios como EmailJS para la gestión de formularios o MercadoPago para transacciones, los cuales pueden instalar sus propias cookies para garantizar la seguridad y el funcionamiento del proceso de pago.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "var(--text-xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-4)" }}>4. Control de cookies</h2>
            <p>
              Puedes configurar tu navegador para rechazar todas las cookies o para indicar cuándo se envía una. Sin embargo, si no aceptas cookies, es posible que no puedas utilizar algunas funciones de nuestra tienda.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
