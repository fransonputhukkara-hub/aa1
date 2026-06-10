import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/** Row returned by the POS database's get_online_products() function. */
export interface DbProduct {
  id: string;
  name: string;
  category: string | null;
  in_stock: number;
  selling_rate: number;
  mrp: number | null;
  is_new: boolean;
  image_url: string | null;
}
