import { useEffect, useState } from 'react';
import { supabase, type DbProduct } from './supabase';
import type { Product, SareeType } from '../types';

// Convert POS inventory row → app Product shape
export function toProduct(p: DbProduct): Product {
  return {
    id: p.id,
    name: p.name,
    type: (p.category as SareeType) ?? 'Kalyani Cotton',
    price: Number(p.selling_rate),
    mrp: p.mrp == null ? null : Number(p.mrp),
    isNew: p.is_new,
    image: p.image_url ?? '',
    stock: Number(p.in_stock),
  };
}

/**
 * Live products from the shared POS inventory (get_online_products RPC).
 * Stock is the same number the physical store sells from, so the website
 * and store can never drift apart.
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .rpc('get_online_products')
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setProducts(((data as DbProduct[]) || []).map(toProduct).filter((p) => p.stock > 0));
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}
