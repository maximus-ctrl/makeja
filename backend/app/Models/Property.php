<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Property extends Model { protected $fillable=['provider_id','property_category_id','property_type_id','location_id','title','description','ownership_status','claim_status','address','latitude','longitude','is_active']; protected $casts=['is_active'=>'boolean','latitude'=>'decimal:7','longitude'=>'decimal:7']; public function provider(){return $this->belongsTo(ProviderProfile::class,'provider_id');} public function units(){return $this->hasMany(Unit::class);} public function listings(){return $this->hasMany(Listing::class);} public function location(){return $this->belongsTo(Location::class);} }
