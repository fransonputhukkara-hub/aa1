export type SareeType = 'Kalyani Cotton' | 'Soft Silk';

export interface Product {
  id: string; // inventory uuid in the shared POS database
  name: string;
  type: SareeType;
  price: number;
  mrp: number | null;
  isNew: boolean;
  image: string;
  stock: number; // live quantity, shared with the in-store POS
}

export interface CartItem extends Product {
  qty: number;
}
