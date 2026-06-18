<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ProviderProfile extends Model { protected $fillable=['user_id','provider_type','business_name','national_id','kra_pin','contact_phone','whatsapp_phone','verification_status','is_makeja_managed']; protected $casts=['is_makeja_managed'=>'boolean']; public function user(){return $this->belongsTo(User::class);} public function properties(){return $this->hasMany(Property::class,'provider_id');} }
