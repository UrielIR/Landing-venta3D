"use client";

import { useState, useEffect } from "react";
import { Header, HoverScale, useCart, Footer } from "@repo/ui";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Mock Data
const PRODUCTS = [
  {
    id: "p1",
    name: "Lámpara Nube",
    image: "/images/lamp.png",
    material: "PLA Translúcido",
    description: "Luminaria ambiental con textura mate y difusión suave. Impresa en una sola pieza.",
    price: 35000,
    category: "Iluminación",
  },
  {
    id: "p2",
    name: "Florero Geométrico",
    image: "/images/vase.png",
    material: "PLA Reciclado",
    description: "Diseño minimalista con caras facetadas. Perfecto para exhibición de hierbas secas.",
    price: 18000,
    category: "Decoración",
  },
  {
    id: "p3",
    name: "Organizador Hexa",
    image: "/images/organizer.png",
    material: "PETG Mate",
    description: "Sistema de escritorio con celdas hexagonales. Combina estética y función.",
    price: 22000,
    category: "Oficina",
  },
  {
    id: "p4",
    name: "Lámpara Nube Mini",
    image: "/images/lamp.png",
    material: "PLA Translúcido",
    description: "Versión compacta perfecta para mesas de noche o estanterías.",
    price: 25000,
    category: "Iluminación",
  },
  {
    id: "p5",
    name: "Maceta Bauhaus",
    image: "/images/vase.png",
    material: "PLA Reciclado",
    description: "Formas puras y brutalistas. Incluye drenaje interno.",
    price: 15000,
    category: "Decoración",
  },
  {
    id: "p6",
    name: "Soporte Minimal",
    image: "/images/organizer.png",
    material: "PETG Mate",
    description: "Base elegante para tablets y smartphones. Estabilidad asegurada.",
    price: 12000,
    category: "Oficina",
  },
];

const CATEGORIES = ["Todos", "Decoración", "Iluminación", "Oficina"];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { addItem } = useCart();

  const selectedProduct = PRODUCTS.find(p => p.id === selectedId);

  useEffect(() => {
    setMounted(true);
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedId]);

  const filteredProducts = PRODUCTS.filter((product) =>
    activeCategory === "Todos" ? true : product.category === activeCategory
  );

  const formatCLP = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(price);
  };



  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-base)", color: "var(--color-text-primary)", fontFamily: "var(--font-sans)" }}>
      <Header />

      <main style={{ padding: "140px 20px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "60px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", marginBottom: "16px" }}>Tienda</h1>
          <p style={{ fontSize: "1.2rem", color: "var(--color-text-secondary)", maxWidth: "600px" }}>
            Explora nuestra colección de objetos bajo demanda. Diseñados matemáticamente y fabricados con polímeros sostenibles.
          </p>
        </div>

        {/* Filtros */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "50px", flexWrap: "wrap" }}>
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-label={`Filtrar por ${category}`}
                aria-pressed={isActive}
                whileHover={{ y: -4, borderColor: "var(--color-accent)" }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: "8px 24px",
                  borderRadius: "20px",
                  border: isActive ? "1.5px solid var(--color-accent)" : "1.5px solid var(--color-border-subtle)",
                  background: isActive ? "var(--color-accent)" : "transparent",
                  color: isActive ? "white" : "var(--color-text-secondary)",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {category}
              </motion.button>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{ background: "var(--color-surface-1)", borderRadius: "20px", border: "1px solid var(--color-border-subtle)", overflow: "hidden", cursor: "pointer" }}
              onClick={() => setSelectedId(product.id)}
            >
                <div style={{ aspectRatio: "1/1", background: "var(--color-surface-2)", position: "relative" }}>
                  <Image 
                    src={product.image} 
                    alt={`Imagen de producto: ${product.name}`} 
                    fill 
                    style={{ objectFit: "cover" }}
                    priority={PRODUCTS.indexOf(product) < 3}
                  />
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <h3 style={{ fontSize: "1.2rem" }}>{product.name}</h3>
                    <span style={{ fontWeight: "bold" }}>{formatCLP(product.price)}</span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-tertiary)", textTransform: "uppercase", marginBottom: "15px" }}>{product.material}</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addItem(product); }}
                    aria-label={`Añadir ${product.name} al carrito`}
                    style={{ width: "100%", background: "var(--color-text-primary)", color: "var(--color-bg-base)", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
                  >
                    Añadir al carrito
                  </button>
                </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedProduct && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, display: "grid", placeItems: "center", padding: "20px" }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={{ position: "relative", background: "var(--color-bg-base)", width: "100%", maxWidth: "900px", borderRadius: "24px", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ aspectRatio: "1/1", position: "relative" }}>
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{selectedProduct.name}</h2>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: "30px" }}>{selectedProduct.description}</p>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "30px" }}>{formatCLP(selectedProduct.price)}</div>
                <button onClick={() => addItem(selectedProduct)} aria-label={`Añadir ${selectedProduct.name} al carrito`} style={{ background: "var(--color-accent)", color: "white", border: "none", padding: "15px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>Añadir al carrito</button>
                <button onClick={() => setSelectedId(null)} aria-label="Cerrar modal" style={{ position: "absolute", top: "20px", right: "20px", background: "transparent", border: "none", color: "var(--color-text-primary)", cursor: "pointer", fontSize: "1.5rem" }}>✕</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
