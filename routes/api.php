<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowingController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function(){
    Route::controller(AuthController::class)->prefix('auth')->group(function(){
        Route::post('/register', 'register');
        Route::post('/login', 'login');
        Route::post('/logout', 'logout')->middleware('auth:sanctum');
    });

    Route::controller(PostController::class)->group(function(){
        Route::post('/posts', 'store')->middleware('auth:sanctum');
        Route::get('/posts', 'index')->middleware('auth:sanctum');
        Route::delete('/posts/{id}', 'destroy')->middleware('auth:sanctum');
    });

    Route::controller(FollowingController::class)->group(function(){
        Route::post('/users/{username}/follow', 'follow')->middleware('auth:sanctum');
        Route::delete('/users/{username}/unfollow', 'unfollow')->middleware('auth:sanctum');
        Route::get('/following', 'getAllFollowing')->middleware('auth:sanctum');
        Route::put('/users/{username}/accept', 'acceptFollower')->middleware('auth:sanctum');
        Route::get('/users/{username}/followers', 'getAllFollower')->middleware('auth:sanctum');
    });
});