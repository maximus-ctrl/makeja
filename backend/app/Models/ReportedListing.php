<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ReportedListing extends Model { protected $fillable=['listing_id','user_id','reason','details','status','resolved_by','resolved_at']; protected $casts=['resolved_at'=>'datetime']; }
