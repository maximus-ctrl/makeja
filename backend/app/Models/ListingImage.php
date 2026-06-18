<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ListingImage extends Model { protected $fillable=['listing_id','url','disk','path','caption','sort_order','is_cover']; protected $casts=['is_cover'=>'boolean']; }
