<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class MpesaTransaction extends Model { protected $fillable=['payment_id','phone','amount','merchant_request_id','checkout_request_id','mpesa_receipt_number','result_code','result_desc','status','raw_request','raw_response','callback_payload']; protected $casts=['amount'=>'decimal:2','raw_request'=>'array','raw_response'=>'array','callback_payload'=>'array']; }
