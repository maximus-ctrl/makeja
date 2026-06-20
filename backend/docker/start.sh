#!/usr/bin/env bash
set -e

cd /var/www/html

php artisan config:clear || true
php artisan route:clear || true
php artisan view:clear || true
php artisan migrate --force || true
php artisan db:seed --force || true
php artisan config:cache || true
php artisan route:cache || true

apache2-foreground