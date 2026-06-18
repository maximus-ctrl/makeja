# Installation

See the root README for quick setup.

Backend:

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Frontend:

```bash
cd frontend
cp .env.example .env
bun install
bun run dev
```
