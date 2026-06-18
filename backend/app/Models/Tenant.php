<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Tenant extends Model { protected $fillable=['unit_id','provider_id','name','phone','email','start_date','end_date','monthly_rent','status']; protected $casts=['start_date'=>'date','end_date'=>'date','monthly_rent'=>'decimal:2']; }
