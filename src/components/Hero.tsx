const HERO_IMAGE = '/sarees/silk-01.jpg';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-wine-deep">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Featured handwoven saree"
          className="w-full h-full object-cover object-[center_30%] opacity-90"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(40,9,17,.95)_0%,rgba(78,19,32,.7)_42%,rgba(40,9,17,.55)_100%)]" />
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" />

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

      <div className="absolute right-[5%] bottom-[8%] z-10 text-right text-white/65 text-[11px] tracking-[0.3em] uppercase hidden sm:block">
        Handloom heritage since
        <b className="block font-serif text-[46px] text-gold-soft font-medium tracking-normal">1974</b>
      </div>
    </section>
  );
}
