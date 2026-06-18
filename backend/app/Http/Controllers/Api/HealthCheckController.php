<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class HealthCheckController extends Controller
{
    public function __invoke(){ return response()->json(['status'=>'ok','app'=>'Makeja','time'=>now()]); }
}
