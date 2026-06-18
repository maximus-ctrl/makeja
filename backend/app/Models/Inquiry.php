<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Inquiry extends Model { protected $fillable=['listing_id','user_id','name','phone','message','status']; }
