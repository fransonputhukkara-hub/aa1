const COLUMNS = [
  {
    heading: 'Shop',
    links: ['Kalyani Cotton', 'Soft Silk', 'Collections', 'Blouse Pieces', 'Gift Cards'],
  },
  {
    heading: 'Help',
    links: ['Track Order', 'Shipping & Returns', 'Fall & Pico', 'Saree Care', 'Contact Us'],
  },
  {
    heading: 'Reach Us',
    links: ['WhatsApp Orders', 'Store Locator', '+91 98765 43210', 'hello@sanskritisilks.in'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 pt-[72px] pb-[30px]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-9 lg:gap-10">
        <div>
          <div className="font-serif text-[26px] font-semibold text-white mb-3.5 leading-none">
            Sanskriti
            <span className="block font-sans text-[9px] tracking-[0.5em] text-gold uppercase mt-[3px] font-medium">
              Silks · Est. 1974
            </span>
          </div>
          <p className="text-[13.5px] leading-[1.8] text-white/55 max-w-[300px] font-light">
            Handwoven Kalyani cotton & soft silk sarees, crafted with the patience of generations. Worn for the
            moments you'll never forget.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4 className="font-sans text-[11px] tracking-[0.22em] uppercase text-gold-soft mb-5 font-medium">
              {col.heading}
            </h4>
            {col.links.map((l) => (
              <a
                key={l}
                href="#"
                className="block text-[13.5px] mb-[11px] text-white/60 transition-all hover:text-gold-soft hover:pl-1 font-light"
              >
                {l}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-7 mt-[50px] pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-center text-[11.5px] tracking-[0.1em] text-white/45 font-light">
        <span>© 2026 Sanskriti Silks. Woven with devotion.</span>
        <span>Privacy · Terms · Authenticity Guarantee</span>
      </div>
    </footer>
  );
}
