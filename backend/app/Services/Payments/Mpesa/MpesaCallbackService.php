<?php
namespace App\Services\Payments\Mpesa;

use App\Models\MpesaCallback;
use App\Models\MpesaTransaction;
use Illuminate\Support\Arr;

class MpesaCallbackService
{
    public function handle(array $payload): ?MpesaTransaction
    {
        $stk = Arr::get($payload, 'Body.stkCallback', []);
        $checkout = $stk['CheckoutRequestID'] ?? null;
        $merchant = $stk['MerchantRequestID'] ?? null;
        $resultCode = (string) ($stk['ResultCode'] ?? '');
        $items = collect(Arr::get($stk, 'CallbackMetadata.Item', []))->keyBy('Name');

        MpesaCallback::create([
            'checkout_request_id' => $checkout,
            'merchant_request_id' => $merchant,
            'payload' => $payload,
            'processed_at' => now(),
        ]);

        $transaction = MpesaTransaction::where('checkout_request_id', $checkout)->first();
        if (!$transaction) return null;

        $receipt = data_get($items, 'MpesaReceiptNumber.Value');
        $transaction->update([
            'result_code' => $resultCode,
            'result_desc' => $stk['ResultDesc'] ?? null,
            'mpesa_receipt_number' => $receipt,
            'status' => $resultCode === '0' ? 'paid' : 'failed',
            'callback_payload' => $payload,
        ]);

        $transaction->payment?->update([
            'status' => $resultCode === '0' ? 'paid' : 'failed',
            'paid_at' => $resultCode === '0' ? now() : null,
        ]);

        return $transaction->fresh();
    }
}
