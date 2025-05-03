
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

## Pages & Routes

### `/login`

* Simple “login” form (email + password).
* On submit, stores `currentUser` in `localStorage` and redirects to `/`.

### `/` (Home / Product Listing)

* **Header** with:

  * Logo & “Gym**Beam**”
  * Nav‐links: **All**, **Men**, **Women**, **Jewelry** (filters by category)
  * **Login** / user‐initial avatar & logout button
* **Search bar** (filter by title)
* **Filters** modal (sale only, min rating, sort by price)
* **Pagination** (12 products per page)
* **Product cards**:

  * Image, title, truncated description
  * Bubble‐style rating & review count
  * Old & sale price if applicable
  * Random “Promo Badge” (persisted in `localStorage`)
* **Guard**: clicking a card while not logged in shows a toast:

  > “To see product details please Log In”
* **Detail modal**: clicking a card when logged in opens a client-side overlay (you can close it) with full info.

### `/products/[id]` (Product Detail Page)

* Server‐fetched via App Router (fallback to 404 if not found)
* Reads the same enriched array from `localStorage` so sale badges & promo badges remain consistent
* Big two‐column layout:

  * Left: image gallery
  * Right: title, category, bubble rating, reviews count, description
  * Crossed-out original price, discount badge (`-20%`), current price
  * **Go to Store** → pushes back to `/`
* **Shipping & Benefits** strip (Fast Delivery, Free Samples, Free Shipping)
* **Accordions** for extra sections: Product Information, Details, Usage, Ingredients, Reviews

### `/user-profile`

* Pre-populates email from `currentUser`
* Editable fields: **Username**, **Phone**, **Promo Code** (inline pencil/edit controls)
* “Done” saves to `localStorage` under `profile_<email>` and navigates back home

---

## Key Components & Hooks

* **`useProductState`**

  * Loads or enriches the product list once (sale & badges) → stores in `localStorage`
  * Exposes filter state, selected product, and category filter
* **`Header`** & **`Footer`**

  * App-wide navigation and footer links
* **`SearchBar`**, **`Pagination`**, **`Toast`**

  * Utility components for filtering, paging, and notifications
* **`ProductList`** & **`ProductDetails`**

  * Core presentation components with full responsive, accessible layout

---

## Data Flow

1. On first load, fetch top 20 from FakeStoreAPI.
2. Enrich in JS:

   * 30% chance of 20% sale → `oldPrice` + discounted `price`.
   * 70% chance of a random promo badge (if rating ≥ 3).
3. Persist enriched array as JSON in `localStorage` → ensures badges/prices never change on re‐filters or refresh.
4. All product list/detail reads come from that local copy (not refetching).




