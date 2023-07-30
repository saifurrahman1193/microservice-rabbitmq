<?php

use Illuminate\Support\Facades\Route;
use Saifur\RabbitMQ\app\Http\Controllers\HomeController;


Route::group(['prefix' => 'saifur/rabbitmq'],function (){

    Route::get('/', [HomeController::class, 'home']);
    Route::group(['prefix' => 'publish'],function (){

    });
});
