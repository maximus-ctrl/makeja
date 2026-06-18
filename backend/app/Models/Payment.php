<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Payment extends Model { protected $fillable=['user_id','provider_id','payable_type','payable_id','amount','currency','method','status','reference','description','paid_at']; protected $casts=['amount'=>'decimal:2','paid_at'=>'datetime']; public function mpesaTransaction(){return $this->hasOne(MpesaTransaction::class);} }
