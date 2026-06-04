import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
  return (
    <>
      <div className="bg-wine-deep text-gold-soft text-[11px] tracking-[0.28em] uppercase text-center py-2.5">
        Free shipping across India · Handwoven sarees · Cash on delivery available
      </div>

      <Header />
      <ScrollToTop />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </>
  );
}
