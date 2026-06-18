<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class FeatureFlagController extends Controller
{
    public function index(){ return response()->json(['features'=>config('features')]); }
}
