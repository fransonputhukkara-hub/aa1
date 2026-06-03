import Reveal from './Reveal';

interface Tile {
  span: string;
  fallback: string;
  image: string;
  href: string;
  label: string;
  title: string;
}

const TILES: Tile[] = [
  { span: 'sm:row-span-2 sm:aspect-auto', fallback: 'silk', image: '/sarees/cotton-03.jpg', href: '#shop', label: 'Contrast borders', title: 'Korvai Classics' },
  { span: '', fallback: 's2', image: '/sarees/silk-02.jpg', href: '#silk', label: 'Lustrous weaves', title: 'Soft Silk Edit' },
  { span: '', fallback: 's3', image: '/sarees/cotton-15.jpg', href: '#shop', label: 'Soft & subtle', title: 'Daily Drapes' },
];

export default function Categories() {
  return (
    <section id="cats" className="py-16 sm:py-[90px]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-7">
        <Reveal className="text-center max-w-[620px] mx-auto mb-12 sm:mb-[52px]">
          <div className="eyebrow">Browse the edit</div>
          <h2 className="text-[clamp(2.4rem,5vw,3.6rem)] font-medium leading-[1.05] my-3.5 text-wine-deep">
            Collections of distinction
          </h2>
          <p className="text-ink-soft text-[15px] leading-relaxed font-light">
            Handpicked weaves for festive mornings, temple visits, office days and everything in between.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 sm:grid-cols-3 gap-[18px]">
          {TILES.map((t) => (
            <a
              key={t.title}
              href={t.href}
              className={`group relative rounded overflow-hidden aspect-[3/4] cursor-pointer ${t.span}`}
            >
              <div className={`absolute inset-0 ${t.fallback}`}>
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(40,9,17,.85),transparent_55%)]" />
              <div className="absolute left-6 bottom-5 z-[2] text-white">
                <span className="text-[11px] tracking-[0.25em] uppercase text-gold-soft block">{t.label}</span>
                <h3 className="text-[25px] font-medium leading-none mt-1.5">{t.title}</h3>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
