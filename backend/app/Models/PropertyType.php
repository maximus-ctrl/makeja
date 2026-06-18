<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class PropertyType extends Model { protected $fillable=['property_category_id','name','slug','description','is_active']; protected $casts=['is_active'=>'boolean']; public function category(){return $this->belongsTo(PropertyCategory::class,'property_category_id');} }
