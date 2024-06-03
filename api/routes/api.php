<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\TaskUserMiddleware;

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',

], function ($router) {
    Route::post('auth/register', [RegisterController::class, 'register']);
    Route::post('auth/login', 'AuthController@login');
    Route::post('auth/logout', 'AuthController@logout');
    Route::post('me', 'AuthController@me');

    Route::group([
        "middleware" => "auth"
    ], function ($router) {
        Route::get('/tasks/{id}', [TaskController::class, 'get'])->middleware(TaskUserMiddleware::class);
        Route::get('/tasks', [TaskController::class, 'index']);
        Route::post('/tasks', [TaskController::class, 'store']);
        Route::put('/tasks/{id}/conclude', [TaskController::class, 'conclude'])->middleware(TaskUserMiddleware::class);
        Route::put('/tasks/{id}', [TaskController::class, 'update'])->middleware(TaskUserMiddleware::class);
        Route::delete('/tasks/{id}', [TaskController::class, 'destroy'])->middleware(TaskUserMiddleware::class);
    });
});


