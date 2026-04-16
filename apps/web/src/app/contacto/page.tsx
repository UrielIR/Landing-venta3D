"use client";

import { useState, useRef } from "react";
import { Header, Footer } from "@repo/ui";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "@/lib/emailjs-config";

type FileType = "image" | "3d" | null;

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<FileType>(null);
  const [uploading, setUploading] = useState(false);
  const [sent, setSent] = useState(false);

  // 3D Calculator State
  const [material, setMaterial] = useState("PLA");
  const [resolution, setResolution] = useState("Media");
  const [height, setHeight] = useState(10);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const ext = selectedFile.name.split(".").pop()?.toLowerCase();
      if (["png", "jpg", "jpeg"].includes(ext || "")) {
        setFileType("image");
      } else if (["stl", "obj", "3mf"].includes(ext || "")) {
        setFileType("3d");
      } else {
        setFileType(null);
      }
    }
  };

  const calculateEstimate = () => {
    const PRECIO_BASE = 9990;
    const FACTOR_ESCALA = 120;
    const EXPONENTE_VOLUMEN = 2.1;

    // Multiplicadores
    const resMults: Record<string, number> = { "Baja": 1.0, "Media": 1.3, "Alta": 1.7 };
    const matMults: Record<string, number> = { "PLA": 1.0, "PETG": 1.15, "Resina": 1.4 };

    const alturaEfectiva = Math.max(height, 5);
    const costoTamaño = FACTOR_ESCALA * Math.pow(alturaEfectiva, EXPONENTE_VOLUMEN);
    
    const subtotal = (PRECIO_BASE + costoTamaño) * (resMults[resolution] || 1) * (matMults[material] || 1);
    
    // Redondeo a la centena superior
    const precioFinal = Math.ceil(subtotal / 100) * 100;

    return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(precioFinal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    let imageUrl = "No adjunta";
    if (file && fileType === "image") {
      const imgFormData = new FormData();
      imgFormData.append("image", file);
      try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${EMAILJS_CONFIG.IMGBB_API_KEY}`, {
          method: "POST",
          body: imgFormData,
        });
        const data = await res.json();
        imageUrl = data.data.url;
      } catch (err) { console.error(err); }
    }
    try {
      const weight = Math.round(Math.pow(Math.max(height, 5), 1.8) * 0.8); // Estimación técnica de peso
      const templateParams = {
        from_name: formData.nombre,
        from_email: formData.email,
        message: formData.mensaje,
        file_link: imageUrl,
        file_name: file ? file.name : "N/A",
        calculator_data: fileType === "3d" ? `Material: ${material}, Res: ${resolution}, Peso: ~${weight}g, Est: ${calculateEstimate()}` : "N/A",
      };
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID_CONTACT, templateParams, EMAILJS_CONFIG.PUBLIC_KEY);
      setSent(true);
    } catch (err) { console.error(err); } finally { setUploading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-base)", color: "var(--color-text-primary)", padding: "120px 20px 80px" }}>
      <Header />
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px" }}>
        
        {/* Lado Izquierdo */}
        <div>
          <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Contáctanos</h1>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <input required placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} style={rawInputStyles} />
            <input required placeholder="Email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={rawInputStyles} />
            <textarea placeholder="Mensaje" rows={5} value={formData.mensaje} onChange={e => setFormData({...formData, mensaje: e.target.value})} style={rawInputStyles} />
            
            <div onClick={() => fileInputRef.current?.click()} style={{ border: "2px dashed #333", padding: "20px", textAlign: "center", cursor: "pointer" }}>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept=".png,.jpg,.jpeg,.stl,.obj,.3mf" />
              {file ? file.name : "Subir archivo (3D o Imagen)"}
            </div>

            <button type="submit" disabled={uploading} style={{ background: "var(--color-accent)", color: "white", border: "none", padding: "15px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
              {uploading ? "Enviando..." : "Enviar Mensaje"}
            </button>
            {sent && <p style={{ color: "var(--color-accent)", fontWeight: "bold" }}>Mensaje enviado con éxito.</p>}
          </form>
        </div>

        {/* Lado Derecho */}
        <div style={{ background: "var(--color-surface-1)", padding: "40px", borderRadius: "20px", border: "1px solid var(--color-border-subtle)" }}>
          {fileType === "3d" ? (
            <div>
              <h3>Calculadora 3D</h3>
              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <p>Material</p>
                  <select value={material} onChange={e => setMaterial(e.target.value)} style={rawInputStyles}>
                    <option>PLA</option>
                    <option>PETG</option>
                    <option>Resina</option>
                  </select>
                </div>
                <div>
                  <p>Resolución</p>
                  <select value={resolution} onChange={e => setResolution(e.target.value)} style={rawInputStyles}>
                    <option>Baja</option>
                    <option>Media</option>
                    <option>Alta</option>
                  </select>
                </div>
                <div>
                  <p>Altura (cm): {height}</p>
                  <input type="range" min="1" max="50" value={height} onChange={e => setHeight(parseInt(e.target.value))} style={{ width: "100%" }} />
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Total Estimado: {calculateEstimate()}</div>
              </div>
            </div>
          ) : (
            <div>
              <h3>Información</h3>
              <p style={{ color: "#888", marginTop: "20px" }}>Sube un archivo 3D para activar la calculadora automática.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const rawInputStyles = {
  width: "100%",
  padding: "12px",
  background: "var(--color-surface-2)",
  border: "1px solid var(--color-border-subtle)",
  color: "var(--color-text-primary)",
  borderRadius: "8px",
  outline: "none",
  fontFamily: "var(--font-sans)"
};
