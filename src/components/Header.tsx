import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NAV = [
  { label: 'Shop All', to: '/shop' },
  { label: 'Kalyani Cotton', to: '/shop?type=cotton' },
  { label: 'Soft Silk', to: '/shop?type=silk' },
  { label: 'Our Story', to: '/#story' },
];

export default function Header() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[60] bg-cream/85 backdrop-blur-md border-b border-wine/10 transition-shadow ${
        scrolled ? 'shadow-[0_4px_30px_rgba(106,27,45,0.08)]' : ''
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-7 h-[80px] flex items-center justify-between">
        <button className="md:hidden text-ink hover:text-wine" aria-label="Menu">
          <Menu size={22} strokeWidth={1.6} />
        </button>

        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="A1 Sanskriti Silks"
            className="h-[62px] w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex gap-8 text-[12.5px] tracking-[0.14em] uppercase">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="relative py-1 text-ink-soft transition-colors hover:text-wine after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-wine after:transition-all hover:after:w-full"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button className="text-ink hover:text-wine transition-colors" aria-label="Search">
            <Search size={19} strokeWidth={1.6} />
          </button>
          <button className="hidden sm:block text-ink hover:text-wine transition-colors" aria-label="Account">
            <User size={19} strokeWidth={1.6} />
          </button>
          <button onClick={openCart} className="relative text-ink hover:text-wine transition-colors" aria-label="Cart">
            <ShoppingBag size={20} strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-wine text-white font-sans text-[9px] font-semibold min-w-[16px] h-4 rounded-full grid place-items-center px-1">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
