# Makeja Property Discovery & Management System

Makeja is a Kenyan-first but globally adaptable property discovery and property management platform. It supports:

- Clients/users searching for homes, short stays, commercial spaces, and land.
- Providers/owners/sellers adding properties, units, contacts, availability, and management data.
- Admin approval, moderation, reports, feature switches, and M-Pesa STK Push payments.

This repository is packaged as a monorepo:

```txt
makeja_system/
├── backend/   Laravel API
├── frontend/  Bun + Vite + React + TypeScript + Bootstrap
├── mobile/    Capacitor mobile wrapper notes/placeholders
├── supabase/  Supabase SQL helpers, storage, and RLS starter policies
├── docs/      Manuals and implementation notes
└── scripts/   Setup helper scripts
```

## What is included

### Backend

- Laravel API structure.
- Auth using Laravel Sanctum tokens.
- Roles: `client`, `provider`, `admin`, `super_admin`.
- Client listing search endpoints.
- Provider property/unit/listing endpoints.
- Admin approval/moderation endpoints.
- Listing trust flow:
  - `community_added`
  - `owner_claimed`
  - `admin_approved`
  - `makeja_managed`
- Feature flags via `.env` and `/api/features`.
- M-Pesa STK Push service structure.
- M-Pesa callback handling.
- Migrations and seeders.
- Supabase/Postgres-compatible schema.

### Frontend

- Vite + React + TypeScript.
- Premium Bootstrap/custom CSS UI inspired by the supplied desktop/mobile mockup.
- Responsive public landing, search, listing details, login/register pages.
- Google Maps-ready map component with a polished fallback map when no API key is provided.
- Demo listing images and demo frontend listings so the UI is not empty on first run.
- Mobile bottom navigation and mobile-friendly cards/forms.
- Provider dashboard and property management overview.
- Admin dashboard and approval queue styling.
- M-Pesa STK checkout page.
- Feature switches in `src/config/features.ts`.

### Mobile

- Capacitor-ready frontend config.
- Android/iOS setup notes.

## Important

This is a complete runnable foundation, not a fully audited production SaaS. It gives you the full system structure and working business flow. Before real public launch, complete the production checklist at the bottom of this README.

## Requirements

Install these on your machine:

- PHP 8.2+
- Composer
- PostgreSQL or Supabase Postgres
- Node.js 20+ or Bun 1+
- Git

Optional:

- Android Studio for Capacitor Android builds.
- Xcode for iOS builds on macOS.

## Quick setup

### 1. Unzip

```bash
unzip makeja_system.zip
cd makeja_system
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Backend will run on:

```txt
http://localhost:8000
```

### 3. Frontend setup

Open a second terminal:

```bash
cd frontend
cp .env.example .env
bun install
bun run dev
```

If you do not use Bun:

```bash
npm install
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

## Default seeded admin

```txt
Email: admin@makeja.test
Password: password
```

Change this before deployment.

## Main environment switches

Backend `.env`:

```env
FEATURE_COMMUNITY_LISTINGS=true
FEATURE_OWNER_CLAIMING=true
FEATURE_ADMIN_APPROVAL=true
FEATURE_PROPERTY_MANAGEMENT=true
FEATURE_GOOGLE_MAPS=true
FEATURE_MPESA_STK=true
FEATURE_SUBSCRIPTIONS=false
FEATURE_BLUE_TICK=false
FEATURE_SMS_NOTIFICATIONS=false
FEATURE_EMAIL_NOTIFICATIONS=true
FEATURE_WHATSAPP_CONTACT=true
```

Frontend `.env`:

```env
VITE_ENABLE_MAPS=true
VITE_ENABLE_MPESA_STK=true
VITE_ENABLE_SUBSCRIPTIONS=false
VITE_ENABLE_BLUE_TICK=false
VITE_ENABLE_WHATSAPP=true
```

Rules:

- Backend secrets stay in `backend/.env` only.
- Frontend variables must start with `VITE_`.
- Never put M-Pesa consumer secret, passkey, or Supabase service role key in frontend `.env`.

## M-Pesa STK setup

In `backend/.env`:

```env
MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://your-public-domain.com/api/mpesa/callback
MPESA_TRANSACTION_TYPE=CustomerPayBillOnline
MPESA_ACCOUNT_REFERENCE=MAKEJA
MPESA_TRANSACTION_DESC=Makeja Payment
```

For local callback testing, expose your backend using a tunnel such as ngrok or Cloudflare Tunnel, then use the public URL as `MPESA_CALLBACK_URL`.

## Supabase setup

Makeja uses PostgreSQL-compatible migrations. You can run it against Supabase Postgres by setting:

```env
DB_CONNECTION=pgsql
DB_HOST=your-supabase-db-host
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-db-password
```

Optional Supabase storage values:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET=makeja-listings
```

Run SQL helpers in `supabase/migrations` only after reviewing them for your Supabase project.

## API overview

Auth:

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

Public listings:

```txt
GET /api/listings
GET /api/listings/{listing}
POST /api/listings/community
POST /api/listings/{listing}/report
```

Provider:

```txt
GET    /api/provider/dashboard
GET    /api/provider/properties
POST   /api/provider/properties
GET    /api/provider/properties/{property}
PUT    /api/provider/properties/{property}
DELETE /api/provider/properties/{property}
POST   /api/provider/properties/{property}/units
GET    /api/provider/units
PUT    /api/provider/units/{unit}
```

Admin:

```txt
GET  /api/admin/dashboard
GET  /api/admin/listings/pending
POST /api/admin/listings/{listing}/approve
POST /api/admin/listings/{listing}/reject
```

M-Pesa:

```txt
POST /api/payments/mpesa/stk-push
POST /api/mpesa/callback
GET  /api/payments/{payment}
```

## User flow

### Client

1. Opens Makeja.
2. Searches by location, category, price, and availability.
3. Opens listing.
4. Calls/WhatsApps provider or requests viewing.
5. Saves or reports listing.

### Provider/owner/seller

1. Registers provider account.
2. Adds property.
3. Adds units.
4. Adds listing data, price, location, images.
5. Listing waits for approval if approval switch is on.
6. Provider can later use property management and M-Pesa STK billing modules.

### Admin

1. Reviews pending listings.
2. Approves/rejects listings.
3. Reviews reports.
4. Manages providers, categories, payments, and flags.


## Frontend UI upgrade included in this package

This package has been upgraded to look much closer to the requested Makeja mockup:

- Improved CSS styling with a premium green/white Makeja brand system.
- Responsive desktop and phone layouts.
- Lucide icons across navigation, listing cards, dashboards, M-Pesa, and forms.
- Local demo listing images in `frontend/public/assets/demo/`.
- Demo listing fallback in `frontend/src/data/demoListings.ts` so the UI still looks populated before backend data exists.
- Google Maps-ready component in `frontend/src/components/maps/MakejaMap.tsx`.
- Mobile bottom navigation in `frontend/src/components/mobile/MobileBottomNav.tsx`.
- Polished provider dashboard, admin dashboard, approval queue, listing details, auth, and M-Pesa checkout screens.
- Demo database seeder `DemoListingSeeder.php` added for backend seeded listings.

To activate real Google Maps, set this in `frontend/.env`:

```env
VITE_ENABLE_MAPS=true
VITE_GOOGLE_MAPS_API_KEY=your_public_browser_key
```

If the key is empty, Makeja shows the styled fallback map instead of breaking.

## What is left before production launch

This package gives you the complete working foundation. Before going live, complete these items:

1. **Run full Laravel install and test all migrations** on your actual Supabase/Postgres database.
2. **Configure real M-Pesa Daraja credentials** and verify callback security with your production domain.
3. **Add real Google Maps API key** to activate live map pins. The frontend now has a Google Maps-ready component with a polished fallback if the key is empty.
4. **Add image upload implementation** to Supabase Storage or Laravel disk, including file size limits and image compression.
5. **Harden admin security** with 2FA, stronger password rules, audit review, and rate limiting.
6. **Implement full subscription billing rules** if you decide blue tick / Makeja Managed should be paid.
7. **Add tenant rent automation** if using property management for real rent tracking.
8. **Add legal pages**: Terms, Privacy Policy, Refund Policy, Listing Policy, Data Protection Policy.
9. **Verify Kenya-specific compliance** for user data, payments, and property advertising.
10. **Add production monitoring**: logs, queues, failed job alerts, payment callback alerts.
11. **Run mobile build** through Capacitor after frontend UI is stable.
12. **Replace demo seed data/images** and change seeded admin/provider passwords.

## Suggested build order from this zip

1. Run backend and migrations.
2. Run frontend.
3. Confirm login/register.
4. Confirm provider can add properties/units.
5. Confirm public listing search.
6. Confirm admin approval.
7. Configure M-Pesa sandbox and test STK.
8. Add map provider.
9. Add image upload.
10. Deploy staging.

## Troubleshooting

### CORS error

Check `FRONTEND_URL` in backend `.env` and `VITE_API_BASE_URL` in frontend `.env`.

### Laravel `.env` changes not applying

Run:

```bash
php artisan config:clear
php artisan cache:clear
```

### M-Pesa callback not received

Use a public HTTPS callback URL. Localhost will not receive Safaricom callbacks directly.

### Frontend cannot access API

Confirm backend is running:

```txt
http://localhost:8000/api/health
```

Confirm frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```
