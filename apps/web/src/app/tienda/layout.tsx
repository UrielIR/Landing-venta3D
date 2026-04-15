import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda — Te lo imprimo",
  description: "Explora nuestra colección de objetos diseñados matemáticamente y fabricados con impresión 3D.",
  openGraph: {
    title: "Tienda de Diseño 3D — Te lo imprimo",
    description: "Objetos únicos, iluminación y decoración fabricados bajo demanda.",
  },
};

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
