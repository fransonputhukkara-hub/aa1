import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import StorySplit from './components/StorySplit';
import Values from './components/Values';
import Testimonial from './components/Testimonial';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { products } from './data/products';

export default function App() {
  const cotton = products.filter((p) => p.type === 'Kalyani Cotton');
  const silk = products.filter((p) => p.type === 'Soft Silk');

  return (
    <>
      {/* announcement bar */}
      <div className="bg-wine-deep text-gold-soft text-[11px] tracking-[0.28em] uppercase text-center py-2.5">
        Free shipping across India · Handwoven sarees · Cash on delivery available
      </div>

      <Header />

      <main>
        <Hero />
        <Marquee />
        <Categories />

        <ProductGrid
          id="shop"
          eyebrow="Most adored"
          title="The Kalyani cotton collection"
          description="Pure handwoven Kalyani cotton sarees — each with a blouse piece, free fall & pico on request."
          products={cotton}
          tinted
        />

        <StorySplit />

        <ProductGrid
          id="silk"
          eyebrow="Pure soft silk"
          title="The soft silk edit"
          description="Lustrous soft silk sarees with intricate zari butta and rich pallus — for weddings and the grandest occasions."
          products={silk}
        />

        <Values />
        <Testimonial />
        <Newsletter />
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
