import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface DbProduct {
  id: number;
  name: string;
  type: 'Kalyani Cotton' | 'Soft Silk';
  price: number;
  mrp: number | null;
  is_new: boolean;
  image_url: string;
  in_stock: boolean;
  created_at: string;
}
