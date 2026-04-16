"use client";

import { Header, MagneticButton } from "@repo/ui";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "@/lib/emailjs-config";

function GraciasContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const emailSent = useRef(false);

  useEffect(() => {
    setMounted(true);

    // Lógica de envío de correos
    const handleEmails = async () => {
      if (emailSent.current) return;
      
      const lastOrderStr = localStorage.getItem("tli-last-order");
      if (!lastOrderStr) return;

      try {
        const order = JSON.parse(lastOrderStr);
        const status = searchParams.get('status') || 'approved';

        // Solo enviar si es aprobado (o demo)
        if (status === 'approved' || searchParams.get('demo') === 'true') {
          emailSent.current = true;
          
          const formatCLP = (price: number) => {
            return new Intl.NumberFormat("es-CL", {
              style: "currency",
              currency: "CLP",
              maximumFractionDigits: 0,
            }).format(price);
          };

          const itemsList = order.items.map((item: any) => 
            `- ${item.name} (x${item.quantity}): ${formatCLP(item.price * item.quantity)}`
          ).join('\n');

          const templateParams = {
            order_id: order.orderId,
            customer_name: order.customer.nombre,
            customer_email: order.customer.email,
            customer_phone: order.customer.telefono,
            address: order.customer.direccion,
            comuna: order.customer.comuna,
            total: formatCLP(order.totals.total),
            items_html: itemsList,
          };

          // Validar que las llaves no sean los placeholders
          if (EMAILJS_CONFIG.PUBLIC_KEY.startsWith("YOUR_")) {
            console.warn("⚠️ EmailJS: Llaves no configuradas. Los correos no se enviarán.");
            return;
          }

          // Inicializar EmailJS
          emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

          // 1. Enviar al Cliente
          await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID_CLIENT,
            templateParams
          );

          // 2. Enviar al Dueño
          await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID_OWNER,
            templateParams
          );

          console.log("✅ Correos enviados exitosamente.");
          // Limpiar para no reenviar
          localStorage.removeItem("tli-last-order");
        }
      } catch (err) {
        console.error("❌ Error enviando correos:", err);
      }
    };

    handleEmails();
  }, [searchParams]);

  const isDemo = searchParams.get('demo') === 'true';
  const status = searchParams.get('status') || 'approved';

  if (!mounted) return null;

  return (
    <main style={{ flex: 1, display: "grid", placeItems: "center", padding: "var(--space-8)", marginTop: "100px" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{ textAlign: "center", maxWidth: "600px", padding: "var(--space-12)", background: "var(--color-surface-1)", borderRadius: "var(--radius-3xl)", border: "1px solid var(--color-border-subtle)", boxShadow: "var(--shadow-xl)" }}
      >
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{ width: "80px", height: "80px", background: status === 'pending' ? 'var(--color-text-secondary)' : "var(--color-accent)", color: "var(--color-text-inverse)", borderRadius: "50%", display: "grid", placeItems: "center", margin: "0 auto var(--space-8)" }}
        >
          {status === 'pending' ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          )}
        </motion.div>
        
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-4xl)", marginBottom: "var(--space-4)" }}>
          {status === 'pending' ? 'Pago Pendiente' : '¡Gracias por tu compra!'}
        </h1>
        
        <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-md)", lineHeight: "var(--leading-relaxed)", marginBottom: "var(--space-8)", maxWidth: "45ch", marginInline: "auto" }}>
          {status === 'pending' 
            ? 'Estamos esperando la confirmación de tu pago. Te notificaremos por correo electrónico en cuanto se procese el pedido.'
            : 'Hemos recibido tu orden correctamente. Comenzaremos el proceso de impresión 3D a la brevedad y te enviaremos actualizaciones a tu correo electrónico.'}
        </p>
        
        {isDemo && (
          <div style={{ background: "color-mix(in srgb, var(--color-accent) 15%, transparent)", color: "var(--color-accent)", padding: "var(--space-3)", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)", marginBottom: "var(--space-8)" }}>
            <b>Modo Demo:</b> Simulación de pago de MercadoPago completada sin tokens reales.
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
          <Link href="/tienda" style={{ textDecoration: "none" }}>
            <MagneticButton variant="primary">Continuar Comprando</MagneticButton>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

export default function GraciasPage() {
  return (
    <div style={{ minHeight: "100dvh", background: "var(--color-bg-base)", color: "var(--color-text-primary)", display: "flex", flexDirection: "column" }}>
      <Header />
      <Suspense fallback={
        <div style={{ flex: 1, display: "grid", placeItems: "center" }}>
          <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-secondary)" }}>Cargando confirmación...</p>
        </div>
      }>
        <GraciasContent />
      </Suspense>
    </div>
  );
}
