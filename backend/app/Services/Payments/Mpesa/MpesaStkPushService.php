<?php
namespace App\Services\Payments\Mpesa;

use App\Models\MpesaTransaction;
use App\Models\Payment;
use Illuminate\Support\Facades\Http;

class MpesaStkPushService
{
    public function __construct(private MpesaAuthService $auth, private MpesaPhoneFormatter $phoneFormatter) {}

    public function initiate(Payment $payment, string $phone): MpesaTransaction
    {
        if (!config('features.mpesa_stk')) {
            throw new \RuntimeException('M-Pesa STK feature is disabled.');
        }

        $timestamp = now()->format('YmdHis');
        $shortcode = config('mpesa.shortcode');
        $password = base64_encode($shortcode.config('mpesa.passkey').$timestamp);
        $formattedPhone = $this->phoneFormatter->format($phone);

        $payload = [
            'BusinessShortCode' => $shortcode,
            'Password' => $password,
            'Timestamp' => $timestamp,
            'TransactionType' => config('mpesa.transaction_type'),
            'Amount' => (int) ceil((float) $payment->amount),
            'PartyA' => $formattedPhone,
            'PartyB' => $shortcode,
            'PhoneNumber' => $formattedPhone,
            'CallBackURL' => config('mpesa.callback_url'),
            'AccountReference' => $payment->reference ?: config('mpesa.account_reference'),
            'TransactionDesc' => $payment->description ?: config('mpesa.transaction_desc'),
        ];

        $response = Http::withToken($this->auth->token())
            ->post(config('mpesa.base_url').'/mpesa/stkpush/v1/processrequest', $payload);

        $json = $response->json() ?? [];

        return MpesaTransaction::create([
            'payment_id' => $payment->id,
            'phone' => $formattedPhone,
            'amount' => $payment->amount,
            'merchant_request_id' => $json['MerchantRequestID'] ?? null,
            'checkout_request_id' => $json['CheckoutRequestID'] ?? null,
            'status' => $response->successful() ? 'processing' : 'failed',
            'raw_request' => $payload,
            'raw_response' => $json,
        ]);
    }
}
