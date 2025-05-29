
# GymBeam Store

An e-commerce demo built with Next.js App Router, showcasing product listing, detail pages, authentication guard, and persistent “enrichment” (promo badges & sale prices) via `localStorage`.

---

## Tech Stack

* **Next.js 13** (App Router & Server Components)
* **React 18** with Hooks
* **TypeScript**
* **Tailwind CSS** for styling
* **Heroicons** for SVG icons
* **FakeStoreAPI** as product backend
* **localStorage** for persisting enriched product data
* **Vercel** deployment

---

## Getting Started

1. **Clone & install**

   ```bash
   git clone https://github.com/opoiasnik/GymBeamStore
   npm install
   ```

2. **Run locally**

   ```bash
   npm run dev
   ```

   Navigate to `http://localhost:3000`.

3. **Build & deploy**
   Push to GitHub and connect your repo on Vercel. It will auto–build with `next build` and serve your App Router deployment.


---

## Data Flow

1. On first load, fetch top 20 from FakeStoreAPI.
2. Enrich in JS:

   * 30% chance of 20% sale → `oldPrice` + discounted `price`.
   * 70% chance of a random promo badge (if rating ≥ 3).
3. Persist enriched array as JSON in `localStorage` → ensures badges/prices never change on re‐filters or refresh.
4. All product list/detail reads come from that local copy (not refetching).




