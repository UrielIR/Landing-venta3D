import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { supabase } from './supabase';

const app = express();
const port = process.env.PORT || 3001;

// CORS y JSON middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Placeholder (Mock DB)
const orders: any[] = [];

// Configuración de MercadoPago
// Reemplazar "YOUR_ACCESS_TOKEN" con el token real de prueba o producción
const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });

app.get('/', (req, res) => {
  res.send('API TeLoImprimo is running.');
});

// Endpoint 1: Crear y guardar la orden localmente y registrar cliente
app.post('/create-order', async (req, res) => {
  try {
    const { orderId, customer, items, totals } = req.body;
    
    if (!orderId || !customer || !items) {
      return res.status(400).json({ error: 'Faltan datos obligatorios para crear la orden' });
    }

    // 1. Inserción Pasiva en Supabase (Se ignora error intencionalmente en mock si las llaves no existen)
    if (!supabase.supabaseUrl.includes('YOUR_SUPABASE')) {
      const { error: dbError } = await supabase
        .from('clientes')
        .upsert({
          nombre: customer.nombre,
          email: customer.email,
          telefono: customer.telefono,
          fecha_compra: new Date().toISOString()
        }, { onConflict: 'email' });
        
      if (dbError) {
        console.error('Supabase UPSERT Error:', dbError);
      } else {
        console.log(`✅ Cliente ${customer.email} registrado/actualizado pasivamente.`);
      }
    } else {
      console.warn("⚠️ Omitiendo Supabase: Llaves no configuradas.");
    }

    // 2. Guardar orden en Backend (Mock transicional)
    const newOrder = {
      orderId,
      customer,
      items,
      totals,
      status: 'pending_payment',
      createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);

    // En un caso real se inserta a una base de datos de órdenes
    return res.status(200).json({ success: true, orderId: newOrder.orderId });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno guardando la orden' });
  }
});

// Endpoint 2: Crear la Preferencia de MercadoPago
app.post('/create-preference', async (req, res) => {
  try {
    const { items, totals, orderId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Mapeamos los items de nuestro formato al formato de MP
    const mpItems = items.map((item: any) => ({
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: 'CLP',
      description: item.category || 'Objeto Impreso en 3D'
    }));

    // Agregamos el costo de envío como un item adicional
    if (totals && totals.shipping > 0) {
      mpItems.push({
        id: 'SHIPPING',
        title: 'Costo de Envío Fijo',
        quantity: 1,
        unit_price: totals.shipping,
        currency_id: 'CLP',
      });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: mpItems,
        external_reference: orderId, // Para rastrear post-pago
        back_urls: {
          success: 'http://localhost:3000/gracias',
          failure: 'http://localhost:3000/checkout?error=failure',
          pending: 'http://localhost:3000/gracias?status=pending',
        },
        auto_return: 'approved',
      }
    });

    // Enviar el init_point devuelto por la API de MercadoPago
    return res.status(200).json({ init_point: result.init_point });

  } catch (error) {
    console.error('Error generando preferencia de MP:', error);
    // Para entornos dev donde YOUR_ACCESS_TOKEN es invalido y fallará al consultar la API, 
    // hacemos fallback visual para no romper el flujo de la demo.
    return res.status(200).json({ 
      init_point: 'http://localhost:3000/gracias?demo=true',
      mocked: true,
      errorMsg: 'AccessToken invalido (demo run)'
    });
  }
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
