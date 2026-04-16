import { createClient } from '@supabase/supabase-js';

// Reemplazar estas variables con tus llaves reales de entorno de Supabase -> https://supabase.com/dashboard/
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

// Inicializar y exportar el cliente global
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
