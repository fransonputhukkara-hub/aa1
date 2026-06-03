import Reveal from './Reveal';
import ProductCard from './ProductCard';
import type { Product } from '../types';

interface ProductGridProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
  tinted?: boolean;
}

export default function ProductGrid({ id, eyebrow, title, description, products, tinted }: ProductGridProps) {
  return (
    <section id={id} className={`py-16 sm:py-[90px] ${tinted ? 'bg-ivory' : ''}`}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-7">
        <Reveal className="text-center max-w-[620px] mx-auto mb-12 sm:mb-[52px]">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="text-[clamp(2.4rem,5vw,3.6rem)] font-medium leading-[1.05] my-3.5 text-wine-deep">{title}</h2>
          <p className="text-ink-soft text-[15px] leading-relaxed font-light">{description}</p>
        </Reveal>

        <Reveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-[26px]">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
