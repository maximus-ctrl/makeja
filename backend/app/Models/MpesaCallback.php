<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class MpesaCallback extends Model { protected $fillable=['checkout_request_id','merchant_request_id','payload','processed_at']; protected $casts=['payload'=>'array','processed_at'=>'datetime']; }
