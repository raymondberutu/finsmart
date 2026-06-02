<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UMKMController;
use App\Http\Controllers\ScoringController;

/*
|--------------------------------------------------------------------------
| API Routes - FinSmart
|--------------------------------------------------------------------------
*/

// ========================
// PUBLIC ROUTES
// ========================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ========================
// PROTECTED ROUTES
// ========================
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth & User Profile
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // General Dashboard (Accessible by all logged-in roles)
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/transaksi', [DashboardController::class, 'transaksi']);
    
    // ========================
    // ADMIN & PEMERINTAH ROUTES
    // ========================
    Route::middleware('role:admin,pemerintah')->prefix('admin')->group(function () {
        
        // UMKM Management (CRUD)
        Route::apiResource('umkm', UMKMController::class);
        
        // Credit Scoring Management
        Route::get('/scoring', [ScoringController::class, 'index']);
        Route::get('/scoring/{id}', [ScoringController::class, 'show']);
        Route::post('/scoring/generate/{umkm_id}', [ScoringController::class, 'generate']);
        Route::put('/scoring/{id}', [ScoringController::class, 'update']);
        Route::delete('/scoring/{id}', [ScoringController::class, 'destroy']);
        
        // Peta Sebaran UMKM
        Route::get('/peta-sebaran', [DashboardController::class, 'petaSebaran']);
    });
    
    // ========================
    // BANK ROUTES
    // ========================
    Route::middleware('role:bank')->prefix('bank')->group(function () {
        Route::get('/umkm', [UMKMController::class, 'index']);
        Route::get('/scoring', [ScoringController::class, 'index']);
    });
});