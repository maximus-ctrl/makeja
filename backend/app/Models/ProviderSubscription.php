<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ProviderSubscription extends Model { protected $fillable=['provider_id','subscription_plan_id','status','starts_at','ends_at','last_payment_id']; protected $casts=['starts_at'=>'datetime','ends_at'=>'datetime']; }
