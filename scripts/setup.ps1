Set-Location backend
if (!(Test-Path .env)) { Copy-Item .env.example .env }
composer install
php artisan key:generate
php artisan migrate --seed
Set-Location ../frontend
if (!(Test-Path .env)) { Copy-Item .env.example .env }
bun install
