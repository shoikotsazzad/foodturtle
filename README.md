# Food Turtle 🐢

**The only delivery app that never disappoints, because we never deliver.**

Food Turtle is a satirical food-delivery web app, built pixel-for-pixel in the style of a real delivery app (Foodpanda), with one twist: no order ever actually arrives. You browse restaurants, add items to your cart, pay through a fully-simulated checkout (cash on delivery, mobile wallet, or card), and watch a live 2-minute order-tracking screen count down to your door, only for the reveal to admit the food was never coming, and turn that into the joke.

It's a real, working Next.js app end to end, everything except the food is functional.

## What's in it

- **Delivery** — browse restaurants by cuisine, ratings, and delivery fee, with filters and search
- **Pickup** — same restaurants, walk-time/distance framing instead of delivery
- **Turtlemart** — a full grocery storefront with categories, offers, and a product catalog
- **Shops** — a directory of local shops (pharmacy, pet stores, florists, etc.), each with its own product list
- **Cart & checkout** — items can come from multiple restaurants/shops/Turtlemart at once; checkout groups them by vendor, with cash-on-delivery, wallet, and card payment flows (all simulated, nothing is actually charged)
- **Order tracking & reveal** — a real-time countdown with delivery steps, then the payoff
- **Accounts** — login/signup, profile, favourites, vouchers, order history, a fake subscription tier (Turtle Pro)
- **Admin dashboard** (`/admin`) — real Firestore-backed analytics (visitors, live-now, signups, fake orders/revenue) alongside catalog management for restaurants, menu items, Turtlemart products, shops, banners, and vouchers
- **Bilingual** — full English and Bengali translations throughout, switchable in the navbar

## Tech stack

- [Next.js](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS
- Firebase (Firestore) for restaurant/menu/voucher data and live analytics, with a graceful fallback to local seed data when Firebase isn't configured

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Firebase (optional but recommended)

The app works out of the box with local seed data if you skip this. To connect a real Firebase project:

1. Copy `.env.example` to `.env.local` and fill in your Firebase web app config.
2. Paste `firestore.rules` (repo root) into **Firebase Console → Firestore Database → Rules → Publish**. This isn't deployed automatically; it's what unlocks real visitor/order tracking on the admin dashboard. Until it's published, the site works fine and the dashboard just shows local-only placeholder numbers.

### Admin panel

Visit `/admin`. It's gated by a demo login (see `app/admin/login/page.tsx` for the credentials), not real authentication, so don't rely on it for anything sensitive.

## Project structure

- `app/` — routes (App Router)
- `components/` — shared UI, organized by area (`layout/`, `home/`, `shared/`, `admin/`)
- `context/` — cart, user, and language state
- `lib/` — data access (Firebase-backed hooks with seed-data fallback), seed data, analytics
- `locales/` — `en.json` / `bn.json` translation files
