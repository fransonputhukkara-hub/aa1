export type SareeType = 'Kalyani Cotton' | 'Soft Silk';

export interface Product {
  id: number;
  name: string;
  type: SareeType;
  price: number;
  mrp: number | null;
  isNew: boolean;
  image: string;
}

export interface CartItem extends Product {
  qty: number;
}
