<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\Payments\Mpesa\MpesaCallbackService;
use App\Services\Payments\Mpesa\MpesaStkPushService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MpesaController extends Controller
{
    public function stkPush(Request $request, MpesaStkPushService $stk)
    {
        $data = $request->validate([
            'phone'=>['required','string','max:30'],
            'amount'=>['required','numeric','min:1'],
            'description'=>['nullable','string','max:180'],
            'payable_type'=>['nullable','string'],
            'payable_id'=>['nullable','integer'],
        ]);
        $payment = Payment::create([
            'user_id'=>$request->user()?->id,
            'amount'=>$data['amount'], 'currency'=>'KES', 'method'=>'mpesa_stk', 'status'=>'pending',
            'reference'=>'MKJ-'.Str::upper(Str::random(8)),
            'description'=>$data['description'] ?? config('mpesa.transaction_desc'),
            'payable_type'=>$data['payable_type'] ?? null, 'payable_id'=>$data['payable_id'] ?? null,
        ]);
        $transaction = $stk->initiate($payment, $data['phone']);
        return response()->json(['payment'=>$payment->fresh(), 'transaction'=>$transaction], 201);
    }

    public function callback(Request $request, MpesaCallbackService $service)
    {
        $transaction = $service->handle($request->all());
        return response()->json(['ResultCode'=>0,'ResultDesc'=>'Accepted','transaction_id'=>$transaction?->id]);
    }

    public function show(Payment $payment){ return response()->json(['payment'=>$payment->load('mpesaTransaction')]); }
}
