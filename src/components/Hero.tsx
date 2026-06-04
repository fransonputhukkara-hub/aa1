import { useEffect, useState, useCallback } from 'react';

const SLIDES = [
  {
    src: '/hero/hero-1.jpg.jpeg',
    alt: 'Handwoven soft silk saree — temple elegance',
    position: 'object-[center_20%]',
  },
  {
    src: '/hero/hero-2.jpg.jpeg',
    alt: 'Bridal Kanjivaram silk saree with gold zari border',
    position: 'object-[center_15%]',
  },
  {
    src: '/hero/hero-3.jpg.jpeg',
    alt: 'Editorial — Kalyani cotton and soft silk collection',
    position: 'object-center',
  },
];

const INTERVAL = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((index: number) => {
    if (index === current) return;
    setPrev(current);
    setFading(true);
    setCurrent(index);
    setTimeout(() => {
      setPrev(null);
      setFading(false);
    }, 900);
  }, [current]);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-wine-deep">
      {/* Previous slide — fades out */}
      {prev !== null && (
        <div className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out opacity-0">
          <img
            src={SLIDES[prev].src}
            alt={SLIDES[prev].alt}
            className={`w-full h-full object-cover ${SLIDES[prev].position}`}
          />
        </div>
      )}

      {/* Current slide — fades in */}
      <div
        className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out ${fading ? 'opacity-0' : 'opacity-100'}`}
        style={{ transitionDelay: fading ? '0ms' : '0ms' }}
      >
        <img
          src={SLIDES[current].src}
          alt={SLIDES[current].alt}
          className={`w-full h-full object-cover ${SLIDES[current].position}`}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(40,9,17,.55)_0%,rgba(78,19,32,.25)_42%,rgba(40,9,17,.1)_100%)]" />
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" />

      {/* Text content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-7 w-full text-white">
        <div className="max-w-[640px] animate-fadeUp opacity-0">
          <div className="eyebrow !text-gold-soft">Kalyani Cotton &amp; Soft Silk</div>
          <h1 className="text-[clamp(3.2rem,8vw,6.2rem)] leading-[0.96] font-medium -tracking-[0.01em] mt-[18px] mb-1.5">
            Everyday grace,
            <br />
            <em className="italic text-gold-soft">woven</em> by hand.
          </h1>
          <p className="text-base leading-relaxed text-white/85 max-w-[440px] mt-5 mb-9 font-light">
            Handwoven Kalyani cotton and lustrous soft silks — contrast korvai borders, traditional zari pallus, and
            that unmistakable handloom feel.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#shop" className="btn btn-gold">
              Shop the collection
            </a>
            <a href="#story" className="btn btn-ghost">
              Our story
            </a>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2 bg-gold-soft'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Heritage badge */}
      <div className="absolute right-[5%] bottom-[8%] z-10 text-right text-white/65 text-[11px] tracking-[0.3em] uppercase hidden sm:block">
        Handloom heritage since
        <b className="block font-serif text-[46px] text-gold-soft font-medium tracking-normal">1974</b>
      </div>
    </section>
  );
}
