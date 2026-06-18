<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class PropertyCategory extends Model { protected $fillable=['name','slug','description','is_active']; protected $casts=['is_active'=>'boolean']; public function types(){return $this->hasMany(PropertyType::class,'category_id');} }
