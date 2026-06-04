import { useEffect, useState } from 'react';
import { supabase, type DbProduct } from './supabase';
import type { Product } from '../types';

// Convert DB row → app Product shape
export function toProduct(p: DbProduct): Product {
  return {
    id: p.id,
    name: p.name,
    type: p.type,
    price: p.price,
    mrp: p.mrp,
    isNew: p.is_new,
    image: p.image_url,
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .order('id', { ascending: true })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setProducts((data || []).map(toProduct));
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}
