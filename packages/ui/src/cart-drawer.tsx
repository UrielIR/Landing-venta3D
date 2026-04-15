"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./contexts/cart-context";
import Image from "next/image";
import { MagneticButton } from "./magnetic-button";
import Link from "next/link";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, subtotal, shipping, total } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const formatCLP = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div style={{ position: "fixed", zIndex: 1000, inset: 0 }}>
          {/* Backdrop con desvanecido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "color-mix(in srgb, var(--color-bg-base) 60%, transparent)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: "400px",
              background: "var(--color-bg-base)",
              borderLeft: "1px solid var(--color-border-subtle)",
              boxShadow: "var(--shadow-2xl)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header del Carrito */}
            <div style={{
              padding: "var(--space-6)",
              borderBottom: "1px solid var(--color-border-subtle)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                color: "var(--color-text-primary)",
                margin: 0
              }}>
                Tu Carrito
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-primary)",
                  padding: "var(--space-1)"
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Contenido (Items) */}
            <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-6)" }}>
              {items.length === 0 ? (
                <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "var(--space-4)" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-text-tertiary)" }}>
                    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-lg)" }}>
                    Tu carrito está vacío.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                  <AnimatePresence mode="popLayout">
                    {items.map(item => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key={item.id}
                        style={{
                          display: "flex",
                          gap: "var(--space-4)",
                          alignItems: "center"
                        }}
                      >
                        <div style={{ position: "relative", width: "80px", height: "80px", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--color-surface-2)" }}>
                          <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: "var(--text-md)", fontWeight: "var(--weight-semibold)", color: "var(--color-text-primary)", marginBottom: "var(--space-1)" }}>
                            {item.name}
                          </h3>
                          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-primary)", fontWeight: "var(--weight-bold)", marginBottom: "var(--space-2)" }}>
                            {formatCLP(item.price)}
                          </p>
                          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", background: "var(--color-surface-1)", borderRadius: "var(--radius-full)", padding: "var(--space-1) var(--space-3)", border: "1px solid var(--color-border-subtle)" }}>
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--color-text-primary)", fontSize: "16px", padding: "0 4px" }}>-</button>
                              <span style={{ fontSize: "var(--text-xs)", minWidth: "20px", textAlign: "center", color: "var(--color-text-primary)" }}>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--color-text-primary)", fontSize: "16px", padding: "0 4px" }}>+</button>
                            </div>
                            <button onClick={() => removeItem(item.id)} style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", textDecoration: "underline", cursor: "pointer", background: "transparent", border: "none" }}>
                              Remover
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer / Resumen */}
            {items.length > 0 && (
              <div style={{
                padding: "var(--space-6)",
                borderTop: "1px solid var(--color-border-subtle)",
                background: "var(--color-surface-1)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)", color: "var(--color-text-secondary)", fontSize: "var(--text-sm)" }}>
                  <span>Subtotal</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-primary)" }}>{formatCLP(subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-4)", color: "var(--color-text-secondary)", fontSize: "var(--text-sm)" }}>
                  <span>Envío Fijo</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-primary)" }}>{formatCLP(shipping)}</span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-6)", color: "var(--color-text-primary)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)" }}>
                  <span>Total</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>{formatCLP(total)}</span>
                </div>

                <Link href="/checkout" style={{ textDecoration: "none" }} onClick={() => setIsCartOpen(false)}>
                  <MagneticButton variant="primary" size="lg" style={{ width: "100%" }}>
                    Checkout
                  </MagneticButton>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
