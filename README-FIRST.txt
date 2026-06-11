A1 Sanskriti WEBSITE (aa1 repo) — COMPLETE update
=================================================
Contains EVERYTHING: live stock sync with the POS + colour variants.

STEPS
1. Extract this ZIP over the aa1 repo folder (overwrite all).
2. In the repo:
   git add -A
   git commit -m "Stock sync + colour variants"
   git push origin main
3. Vercel (aa1 project) -> Settings -> Environment Variables must have
   (values in .env.example):
     VITE_SUPABASE_URL
     VITE_SUPABASE_ANON_KEY
   Then Deployments -> Redeploy if it doesn't auto-deploy.

WHAT YOU GET
- Products + stock load LIVE from the POS database (same stock as the shop).
- Checkout records the order and lowers the shared stock.
- One card per saree style; "N colours" badge + dots when a style has colours.
- Product page colour swatches: pick a colour -> image/price/stock switch,
  cart gets that exact colour. Out-of-stock colours disabled.
- Admin page now points to the POS (catalog is managed there).

NOTE: Colour swatches appear only for styles that HAVE colours. Add them in
POS -> Inventory (Style Name + Colour, one entry per colour).
