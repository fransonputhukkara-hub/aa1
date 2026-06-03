import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/format';
import type { Product } from '../types';

const FALLBACKS = ['silk', 's2', 's3', 's4'];

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const fb = FALLBACKS[index % FALLBACKS.length];

  return (
    <div className="group cursor-pointer">
      <div className={`relative aspect-[3/4] rounded overflow-hidden mb-3.5 ${fb}`}>
        {product.isNew && (
          <span className="absolute top-3 left-3 z-[3] bg-white text-wine-deep text-[9px] tracking-[0.18em] uppercase px-2.5 py-[5px] rounded-sm font-semibold">
            New
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            add(product);
          }}
          className="absolute left-3 right-3 bottom-3 z-[3] bg-cream/95 text-wine-deep font-sans text-[11px] tracking-[0.18em] uppercase py-3 rounded-sm font-semibold opacity-0 translate-y-2.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:!bg-wine hover:!text-white"
        >
          Add to bag
        </button>
      </div>
      <div className="text-[10px] tracking-[0.22em] uppercase text-gold mb-1 font-medium">{product.type}</div>
      <h3 className="text-[20px] font-medium leading-tight">{product.name}</h3>
      <div className="flex items-center gap-2.5 mt-1.5">
        <span className="text-[15px] font-medium text-ink">{formatINR(product.price)}</span>
        {product.mrp && (
          <span className="text-[12.5px] text-ink-soft line-through">{formatINR(product.mrp)}</span>
        )}
      </div>
    </div>
  );
}
