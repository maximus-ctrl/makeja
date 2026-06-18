<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Listing extends Model { protected $fillable=['property_id','unit_id','created_by','title','description','listing_intent','price','deposit','currency','status','trust_status','available_from','expires_at','contact_name','contact_phone','contact_whatsapp','views_count','is_featured']; protected $casts=['price'=>'decimal:2','deposit'=>'decimal:2','available_from'=>'date','expires_at'=>'datetime','is_featured'=>'boolean']; public function property(){return $this->belongsTo(Property::class);} public function unit(){return $this->belongsTo(Unit::class);} public function images(){return $this->hasMany(ListingImage::class);} public function creator(){return $this->belongsTo(User::class,'created_by');} }
