<?php
namespace App\Services\Payments\Mpesa;

class MpesaPhoneFormatter
{
    public function format(string $phone): string
    {
        $digits = preg_replace('/\D+/', '', $phone) ?? '';
        if (str_starts_with($digits, '0')) {
            return '254'.substr($digits, 1);
        }
        if (str_starts_with($digits, '7') || str_starts_with($digits, '1')) {
            return '254'.$digits;
        }
        return $digits;
    }
}
