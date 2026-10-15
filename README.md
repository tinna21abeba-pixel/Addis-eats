# Addis Eats

Authentic Ethiopian food ordering, kitchen management, and real-time courier tracking platform built with Next.js 16, React 19, and Server Components.

---

## Live Deployment

- Production URL: [https://addis-eats.vercel.app](https://addis-eats.vercel.app)
- GitHub Repository: [https://github.com/tinna21abeba-pixel/Addis-eats](https://github.com/tinna21abeba-pixel/Addis-eats)

---

## What It Is

Addis Eats is a production-grade restaurant platform for authentic Ethiopian cuisine in Addis Ababa. It covers the complete customer and operational workflow:
- Menu Explorer: Public, indexable catalog with debounced search, category filtering, and dish detail pages.
- Cart & Checkout: In-memory client cart draft with double-submit protection, input validation, and server actions.
- Real-Time Delivery Tracking: Leaflet OpenStreetMap rendered client-side without SSR with explicit height reservation, live courier tracking streamed over Server-Sent Events, and delivery information displayed as accessible text beside the map.
- Operations Analytics Dashboard: Server-aggregated revenue by neighbourhood bar chart, orders over time velocity chart, accessible order table paged and sorted from URL parameters, and demonstrable Loading, Empty, and Error states.
- Data Export: RFC 4180 compliant CSV export of order history that safely preserves commas, quotation marks, and multiline notes.
- Accessible Design: Fully operable by keyboard alone with visible focus rings, touch targets of at least 44 pixels, and no interactive divs.

---

## Setup from a Fresh Clone

1. Clone the repository:
```bash
git clone https://github.com/tinna21abeba-pixel/Addis-eats.git
cd addis-eats
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file in the root directory:
```env
SESSION_SECRET=c8e1a7b9d4f2e6a0c5b3d7f1e9a2b4c6e8f0a3b5c7d9e1f2a4b6c8e0d2f4a6b8
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Build for production:
```bash
npm run build
npm start
```

---

## Environment Variables

| Variable | Required | Description |
| :--- | :--- | :--- |
| `SESSION_SECRET` | Yes | 64-character hex key used to sign session cookies with HMAC-SHA256. Set separately for Preview and Production in Vercel project settings. |
| `NEXT_PUBLIC_APP_URL` | Optional | Base URL for metadata and OpenGraph images. Defaults to `http://localhost:3000` in local development. |

---

## Documentation

The codebase includes the four required architectural documents:
- `AUTH.md`: Route protection layers, session verification, and refusal proof for the three security attacks.
- `DATA.md`: Data fetching strategy, server vs. client boundaries, caching, and refresh rules.
- `PERF.md`: Performance budget, before/after metrics, and optimization causes.
- `FUTURE.md`: MoSCoW triage summary and deferred feature roadmap.

---

## Pre-Flight & Build Output

```text
Route (app)                     Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ƒ /api/orders/[id]/stream
├ ƒ /api/orders/export
├ ○ /cart
├ ƒ /checkout
├ ○ /contact
├ ƒ /dashboard
├ ○ /home
├ ƒ /kitchen
├ ○ /menu                               1h      1y
├   /menu/[id]
├ ○ /opengraph-image
├ ƒ /orders
├ ƒ /orders/[id]/track
├ ○ /orders/mine
├ ○ /robots.txt
├ ƒ /signin
├ ○ /sitemap.xml
└ ƒ /tracking

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```
