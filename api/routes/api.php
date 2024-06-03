<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TaskController;

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',

], function ($router) {
    Route::post('auth/register', [RegisterController::class, 'register']);
    Route::post('auth/login', 'AuthController@login');
    Route::post('auth/logout', 'AuthController@logout');
    //Route::post('refresh', 'AuthController@refresh');


    Route::post('me', 'AuthController@me');
    Route::apiResource('/tasks', TaskController::class);
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


