# T-Goda — Hotel Booking Demo

> KU Competition · Web 2026 submission

A polished, animated hotel-booking front-end built with **Next.js 14 + TypeScript + Tailwind + GSAP**. No backend — all flows (auth, booking, wishlist, filters) are mocked client-side with `localStorage` so the judge can try every interaction immediately.

---

## Run it in 3 commands

Requires **Node.js 18.17+** (or 20+).

```bash
git clone https://github.com/TheKaito2/T-Goda.git
cd T-Goda
npm install
npm run dev
```

Open http://localhost:3000 — that's it.

> If port 3000 is busy, Next.js will pick the next free port and print the URL.

### Other scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Run the production build (after `build`) |
| `npm run lint` | ESLint |

---

## What to try (5-minute judging flow)

### 1. Home `/`
- Hero text splits and animates in character-by-character
- Scroll: trending cards, value props, promo banner all fade in
- "**40% Off**" counts up on the promo banner
- Submit the **newsletter** with a real-looking email → confetti + toast
- Click any **trending card** → search results

### 2. Auth (top right)
- Click **Create Account** → modal opens with GSAP
- Fill fake details → toast "Welcome aboard"
- Nav swaps to a user menu (avatar + Sign out)
- Reload — still signed in (persisted in `localStorage`)

### 3. Search results `/search`
- Drag the **price slider** → list filters live
- Toggle **star rating / facilities / neighborhood** checkboxes
- Change the **Sort** dropdown (price / rating / reviews)
- Pagination: 8 hotels per page
- **Flash Deals** countdown ticks every second; click **Claim** → discount code copied to clipboard
- Click anywhere on a hotel card (image / title / amenities) → opens the room page
- Click the **♥ heart** on any card → wishlist toggle, persists across reloads

### 4. Room detail `/room?id=lumina-beach`
- Gallery: click any photo → **lightbox** (use ← → arrow keys)
- **Save** (heart) and **Share** buttons in the header — Share has Copy Link + real social-share URLs
- **See all 45 amenities** → modal with full grouped list
- **Read all 1,248 reviews** → modal with filterable review list
- **Select** any room → booking-confirmed modal with a unique `TGD-XXXX` code (saved to localStorage)
- Scroll past the room table — a **sticky Book Now bar** slides in
- **View on Map** → opens Google Maps in a new tab

### 5. Other pages
Footer links go to real `/about`, `/careers`, `/privacy`, `/terms`, `/support`, `/mobile-app` pages. Nav tabs (Flights, Bundles, Activities) also route to real pages with animated hero placeholders.

---

## Demo behaviors are intentionally mocked

There is no backend. Every "save" lives in `localStorage`:

| Key | What's stored |
|---|---|
| `tgoda.user` | The signed-in user |
| `tgoda.wishlist` | Hotel IDs you've hearted |
| `tgoda.bookings` | Last 25 booking confirmations |
| `tgoda.newsletter` | Subscribed email |

To reset everything: open DevTools → Application → Local Storage → Clear, or run `localStorage.clear()` in the console.

---

## Tech stack

- **Next.js 14.2** App Router · React 18 · TypeScript strict
- **Tailwind CSS 3.4** with custom design tokens
- **GSAP 3.12** + `@gsap/react` for entrance animations, parallax, magnetic hover, count-up, character split, sticky-bar reveal, lightbox, modal transitions
- **No external UI library** — every component is hand-built
- **No backend, no API keys, no env vars required**

---

## Project layout

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── search/page.tsx     # Search results
│   ├── room/page.tsx       # Hotel detail
│   └── (about|careers|privacy|terms|support|mobile-app|flights|bundles|activities)/
├── components/
│   ├── home/               # Hero, ValueProps, Trending, PromoBanner, Newsletter
│   ├── search/             # SearchHero, FilterSidebar, HotelCard, Pagination, FlashDeals, SearchResults
│   ├── room/               # Gallery, DetailHeader, RoomTable, GuestReviews, modals
│   ├── auth/               # AuthModal
│   ├── booking/            # BookingConfirmedModal
│   ├── share/              # ShareModal
│   ├── motion/             # Reveal, RevealStagger, Parallax (reusable GSAP wrappers)
│   ├── providers/          # Auth + Wishlist + Toast contexts
│   └── ui/                 # Modal, Dropdown, HeartButton, Toaster, IconStatic
├── lib/
│   ├── gsap.ts             # Single GSAP + ScrollTrigger registration
│   ├── animations.ts       # Shared timelines (splitChars, magnetic, numberCount)
│   ├── auth.tsx            # Auth context + localStorage persistence
│   ├── wishlist.tsx        # Wishlist context
│   ├── toast.tsx           # Toast system
│   ├── mock-hotels.ts      # 20 hotel records used by /search and /room
│   └── icons.generated.tsx # Auto-generated SVG component map
└── scripts/
    └── generate-icons.mjs  # Re-run if you add SVGs to public/icons/
```

### Reduced motion

Every GSAP animation respects `prefers-reduced-motion: reduce`. To verify: enable Reduce Motion in your OS settings, reload, and entrance animations skip to their end state.

---

## Troubleshooting

- **`npm install` fails on Windows** — make sure you're on Node 18.17+ (`node -v`).
- **Port 3000 busy** — Next will print a different port; use that.
- **Animations not firing** — hard-refresh (Ctrl/Cmd + Shift + R) so the bundle reloads.
- **Old session persisting** — run `localStorage.clear()` in the browser console.

---

Built for judging. Have fun!
