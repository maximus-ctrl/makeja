<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class PropertyClaim extends Model { protected $fillable=['property_id','provider_id','status','claim_note','reviewed_by','reviewed_at']; protected $casts=['reviewed_at'=>'datetime']; }
