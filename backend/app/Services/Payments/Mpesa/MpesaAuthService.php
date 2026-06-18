<?php
namespace App\Services\Payments\Mpesa;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class MpesaAuthService
{
    public function token(): string
    {
        return Cache::remember('mpesa_access_token', now()->addMinutes(50), function () {
            $key = config('mpesa.consumer_key');
            $secret = config('mpesa.consumer_secret');
            $url = config('mpesa.base_url').'/oauth/v1/generate?grant_type=client_credentials';

            $response = Http::withBasicAuth($key, $secret)->get($url);
            if (!$response->successful()) {
                throw new \RuntimeException('Unable to obtain M-Pesa token: '.$response->body());
            }
            return $response->json('access_token');
        });
    }
}
