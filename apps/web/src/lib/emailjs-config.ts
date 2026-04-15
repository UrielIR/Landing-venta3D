/**
 * Configuración de EmailJS para Te lo imprimo
 * 
 * Reemplaza los valores con los obtenidos en tu panel de EmailJS:
 * https://dashboard.emailjs.com/
 */

export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
  
  // Template para el Cliente (Confirmación)
  TEMPLATE_ID_CLIENT: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CLIENT || "", 
  
  // Template para el Dueño (Notificación de Orden)
  TEMPLATE_ID_OWNER: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_OWNER || "",
  
  // Template para Formulario de Contacto
  TEMPLATE_ID_CONTACT: "YOUR_TEMPLATE_CONTACT",

  // API Key de ImgBB para subir archivos
  IMGBB_API_KEY: "YOUR_IMGBB_API_KEY"
};

/**
 * Variables disponibles en las plantillas:
 * 
 * {{order_id}}       - ID de la orden (ej: TLI-123456)
 * {{customer_name}}   - Nombre completo del cliente
 * {{customer_email}}  - Correo electrónico del cliente
 * {{customer_phone}}  - Teléfono de contacto
 * {{address}}        - Dirección de envío completa
 * {{comuna}}         - Comuna de envío
 * {{total}}          - Monto total de la compra (ej: $35.000)
 * {{items_html}}     - Lista de productos comprados
 */
