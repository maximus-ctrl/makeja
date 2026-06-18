<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class MaintenanceRequest extends Model { protected $fillable=['property_id','unit_id','provider_id','title','category','description','priority','status','cost_estimate','resolved_at']; protected $casts=['cost_estimate'=>'decimal:2','resolved_at'=>'datetime']; }
