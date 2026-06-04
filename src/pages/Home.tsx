import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Categories from '../components/Categories';
import ProductGrid from '../components/ProductGrid';
import StorySplit from '../components/StorySplit';
import Values from '../components/Values';
import Testimonial from '../components/Testimonial';
import Newsletter from '../components/Newsletter';
import { products } from '../data/products';

export default function Home() {
  const { hash } = useLocation();

  // support /#story and /#cats deep links from the header
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [hash]);

  const cotton = products.filter((p) => p.type === 'Kalyani Cotton');
  const silk = products.filter((p) => p.type === 'Soft Silk');

  return (
    <>
      <Hero />
      <Marquee />
      <Categories />

      <ProductGrid
        eyebrow="Most adored"
        title="The Kalyani cotton collection"
        description="Pure handwoven Kalyani cotton sarees — each with a blouse piece, free fall & pico on request."
        products={cotton.slice(0, 8)}
        tinted
        ctaHref="/shop?type=cotton"
        ctaLabel="View all Kalyani cotton"
      />

      <StorySplit />

      <ProductGrid
        eyebrow="Pure soft silk"
        title="The soft silk edit"
        description="Lustrous soft silk sarees with intricate zari butta and rich pallus — for weddings and the grandest occasions."
        products={silk.slice(0, 8)}
        ctaHref="/shop?type=silk"
        ctaLabel="View all soft silk"
      />

      <Values />
      <Testimonial />
      <Newsletter />
    </>
  );
}
