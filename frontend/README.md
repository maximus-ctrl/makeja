# Makeja Frontend

Vite + React + TypeScript + Bootstrap frontend for Makeja.

## Run

```bash
cp .env.example .env
bun install
bun run dev
```

Or with npm:

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:5173
```

## UI upgrade included

The frontend has been upgraded to match the Makeja desktop/phone mockup direction:

- Premium Makeja green/white visual system.
- Responsive desktop and mobile layouts.
- Mobile bottom navigation.
- Local demo listing SVG images in `public/assets/demo/`.
- Demo listing fallback data in `src/data/demoListings.ts`.
- Google Maps-ready map component in `src/components/maps/MakejaMap.tsx`.
- Polished landing, search, listing details, provider dashboard, admin dashboard, approval queue, auth, and M-Pesa checkout pages.

## Google Maps

Set this in `.env`:

```env
VITE_ENABLE_MAPS=true
VITE_GOOGLE_MAPS_API_KEY=your_public_browser_key
```

If the key is empty, the system shows a styled fallback map so the UI still looks good during development.

## Important

Do not place private secrets in frontend `.env`. Anything starting with `VITE_` is exposed in the browser.
