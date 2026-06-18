<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Location extends Model { protected $fillable=['country','county','town','estate','landmark','latitude','longitude']; protected $casts=['latitude'=>'decimal:7','longitude'=>'decimal:7']; }
