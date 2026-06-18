<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class RentLedger extends Model { protected $fillable=['tenant_id','unit_id','period_month','amount_due','amount_paid','due_date','paid_at','status']; protected $casts=['amount_due'=>'decimal:2','amount_paid'=>'decimal:2','due_date'=>'date','paid_at'=>'datetime']; }
