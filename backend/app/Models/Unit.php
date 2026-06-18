<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Unit extends Model { protected $fillable=['property_id','unit_name','unit_type','bedrooms','bathrooms','floor','size_label','rent_amount','sale_amount','deposit_amount','status','notes']; protected $casts=['rent_amount'=>'decimal:2','sale_amount'=>'decimal:2','deposit_amount'=>'decimal:2']; public function property(){return $this->belongsTo(Property::class);} public function listings(){return $this->hasMany(Listing::class);} }
