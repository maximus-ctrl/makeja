<?php
use Illuminate\Support\Facades\Route;
Route::get('/', fn () => response()->json(['app'=>'Makeja API','status'=>'running']));
