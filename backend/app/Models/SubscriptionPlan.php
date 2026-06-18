<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class SubscriptionPlan extends Model { protected $fillable=['name','slug','price','billing_cycle','unit_limit','features','is_active']; protected $casts=['features'=>'array','is_active'=>'boolean','price'=>'decimal:2']; }
