<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ViewingRequest extends Model { protected $fillable=['listing_id','user_id','preferred_date','preferred_time','message','status']; protected $casts=['preferred_date'=>'date']; }
