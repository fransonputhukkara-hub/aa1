import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/format';

const FALLBACKS = ['silk', 's2', 's3', 's4'];

export default function CartDrawer() {
  const { items, isOpen, subtotal, closeCart, changeQty, remove, toast } = useCart();

  return (
    <>
      {/* scrim */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-wine-deep/50 backdrop-blur-[3px] z-[90] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-[420px] max-w-[90vw] bg-cream z-[95] flex flex-col shadow-[-20px_0_60px_rgba(40,9,17,0.25)] transition-transform duration-[400ms] ease-[cubic-bezier(.3,.8,.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-7 py-6 border-b border-wine/10">
          <h3 className="text-[24px] font-medium text-wine-deep">Your Bag</h3>
          <button onClick={closeCart} className="text-ink hover:text-wine transition-colors" aria-label="Close">
            <X size={22} strokeWidth={1.6} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7">
          {items.length === 0 ? (
            <div className="text-center py-20 text-ink-soft">
              <ShoppingBag size={40} strokeWidth={1.2} className="mx-auto text-gold" />
              <p className="text-sm mt-2.5 font-light">
                Your bag is empty.
                <br />
                Find a weave worth keeping.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 py-5 border-b border-wine/10">
                <div className={`w-[74px] h-24 rounded-sm overflow-hidden shrink-0 ${FALLBACKS[(item.id - 1) % 4]}`}>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-[9px] tracking-[0.2em] uppercase text-gold">{item.type}</div>
                  <h4 className="text-[18px] font-medium mt-0.5 mb-1.5">{item.name}</h4>
                  <div className="text-sm text-ink-soft">{formatINR(item.price)}</div>
                  <div className="inline-flex items-center border border-wine/10 rounded-sm mt-2">
                    <button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 text-wine text-[15px]">
                      −
                    </button>
                    <span className="w-[30px] text-center text-[13px]">{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 text-wine text-[15px]">
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => remove(item.id)}
                  className="text-ink-soft hover:text-wine text-[11px] self-start transition-colors"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-7 py-6 border-t border-wine/10 bg-ivory">
            <div className="flex justify-between items-baseline mb-5">
              <span className="text-xs tracking-[0.18em] uppercase text-ink-soft">Subtotal</span>
              <b className="font-serif text-[32px] text-wine-deep font-semibold">{formatINR(subtotal)}</b>
            </div>
            <button onClick={() => alert('Proceeding to secure checkout…')} className="btn btn-gold w-full text-center">
              Checkout
            </button>
          </div>
        )}
      </aside>

      {/* toast */}
      <div
        className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-wine-deep text-gold-soft px-6 py-3.5 rounded-sm text-xs tracking-[0.12em] z-[120] shadow-[0_14px_40px_rgba(40,9,17,0.4)] transition-transform duration-[400ms] ${
          toast ? 'translate-y-0' : 'translate-y-[120px]'
        }`}
      >
        {toast}
      </div>
    </>
  );
}
