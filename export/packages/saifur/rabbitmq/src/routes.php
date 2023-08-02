<?php

use Illuminate\Support\Facades\Route;
use Saifur\RabbitMQ\app\Http\Controllers\HomeController;
use Saifur\RabbitMQ\app\Http\Controllers\PublisherController;


Route::group(['prefix' => 'saifur/rabbitmq'],function (){

    Route::get('/', [HomeController::class, 'home']);
    Route::group(['prefix' => 'publish'],function (){
        Route::post('/send-message-default', [PublisherController::class, 'sendMessageDefault']);
        Route::post('/send-message-direct', [PublisherController::class, 'sendMessageDirect']);
        Route::post('/send-message-fanout', [PublisherController::class, 'sendMessageFanout']);
        Route::post('/send-message-topic', [PublisherController::class, 'sendMessageTopic']);
        Route::post('/send-message-headers', [PublisherController::class, 'sendMessageHeaders']);

    });
});
