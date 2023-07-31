<?php

use Illuminate\Support\Facades\Route;
use Saifur\RabbitMQ\app\Http\Controllers\HomeController;
use Saifur\RabbitMQ\app\Http\Controllers\PublisherController;


Route::group(['prefix' => 'saifur/rabbitmq'],function (){

    Route::get('/', [HomeController::class, 'home']);
    Route::group(['prefix' => 'publish'],function (){
        Route::post('/send-message', [PublisherController::class, 'sendMessage']);

    });
});
