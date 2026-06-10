import { ExternalLink } from 'lucide-react';

/**
 * Products & stock are managed in the POS Business Suite, which shares
 * this website's inventory database — edits there appear here instantly.
 */
export default function Admin() {
  return (
    <div className="max-w-[640px] mx-auto px-5 py-32 text-center">
      <h1 className="font-serif text-4xl text-wine-deep mb-4">Catalog moved</h1>
      <p className="text-ink-soft text-[15px] leading-[1.8] mb-8">
        Products, prices and stock are now managed in the
        <strong> A1 Sanskriti Business Suite</strong> (Inventory page). Both the
        physical store and this website sell from the same live stock, so any
        change there updates here instantly.
      </p>
      <a
        href="https://a1a-saas.vercel.app/inventory"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 bg-wine-deep text-white text-[11px] tracking-[0.2em] uppercase font-semibold py-3.5 px-8 rounded-sm hover:bg-wine transition-colors"
      >
        Open Business Suite <ExternalLink size={14} />
      </a>
    </div>
  );
}
