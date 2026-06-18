<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ClientProfile extends Model { protected $fillable=['user_id','preferred_location','preferred_budget','language']; public function user(){return $this->belongsTo(User::class);} }
