#!/usr/bin/env bash
set -e
cd backend
cp -n .env.example .env || true
composer install
php artisan key:generate
php artisan migrate --seed
cd ../frontend
cp -n .env.example .env || true
bun install
