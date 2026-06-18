<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FeatureFlagController;
use App\Http\Controllers\Api\HealthCheckController;
use App\Http\Controllers\Api\MpesaController;
use App\Http\Controllers\Api\ProviderDashboardController;
use App\Http\Controllers\Api\ProviderPropertyController;
use App\Http\Controllers\Api\ProviderUnitController;
use App\Http\Controllers\Api\PublicListingController;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthCheckController::class);
Route::get('/features', [FeatureFlagController::class, 'index']);

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
});

Route::get('/listings', [PublicListingController::class, 'index']);
Route::get('/listings/{listing}', [PublicListingController::class, 'show']);
Route::post('/listings/community', [PublicListingController::class, 'communityStore'])->middleware('feature:community_listings');
Route::post('/listings/{listing}/report', [PublicListingController::class, 'report']);

Route::middleware(['auth:sanctum','role:provider,admin,super_admin'])->prefix('provider')->group(function () {
    Route::get('/dashboard', ProviderDashboardController::class);
    Route::apiResource('/properties', ProviderPropertyController::class);
    Route::get('/units', [ProviderUnitController::class, 'index']);
    Route::post('/properties/{property}/units', [ProviderUnitController::class, 'store'])->middleware('feature:property_management');
    Route::put('/units/{unit}', [ProviderUnitController::class, 'update'])->middleware('feature:property_management');
});

Route::middleware(['auth:sanctum','role:admin,super_admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/listings/pending', [AdminController::class, 'pendingListings']);
    Route::post('/listings/{listing}/approve', [AdminController::class, 'approve']);
    Route::post('/listings/{listing}/reject', [AdminController::class, 'reject']);
});

Route::middleware(['auth:sanctum','feature:mpesa_stk'])->post('/payments/mpesa/stk-push', [MpesaController::class, 'stkPush']);
Route::middleware('auth:sanctum')->get('/payments/{payment}', [MpesaController::class, 'show']);
Route::post('/mpesa/callback', [MpesaController::class, 'callback']);
