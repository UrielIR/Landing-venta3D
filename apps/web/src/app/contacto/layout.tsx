import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto — Te lo imprimo",
  description: "¿Tienes un proyecto en mente? Contáctanos para cotizar tus diseños 3D personalizados.",
  openGraph: {
    title: "Contacto y Cotizaciones 3D — Te lo imprimo",
    description: "Sube tus archivos STL, OBJ o 3MF y obtén una cotización al instante.",
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
