<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RabbitMQ\ConsumerController;
use App\Http\Controllers\RabbitMQ\PublisherController;


Route::group(['prefix' => 'saifur/rabbitmq'],function (){
    Route::group(['prefix' => 'publish'],function (){
        Route::post('/send-message-default', [PublisherController::class, 'sendMessageDefault']);
        Route::post('/send-message-direct', [PublisherController::class, 'sendMessageDirect']);
        Route::post('/send-message-fanout', [PublisherController::class, 'sendMessageFanout']);
        Route::post('/send-message-topic', [PublisherController::class, 'sendMessageTopic']);
        Route::post('/send-message-headers', [PublisherController::class, 'sendMessageHeaders']);

    });

    Route::group(['prefix' => 'consume'],function (){
        Route::post('/consume-message-default', [ConsumerController::class, 'consumeMessageDefault']);
        Route::post('/consume-message-direct', [ConsumerController::class, 'consumeMessageDirect']);
        Route::post('/consume-message-fanout', [ConsumerController::class, 'consumeMessageFanout']);
        Route::post('/consume-message-topic', [ConsumerController::class, 'consumeMessageTopic']);
        Route::post('/consume-message-headers', [ConsumerController::class, 'sendMessageHeaders']);
    });
});


Route::post('/send-message-to-a-number', [MessageController::class, 'sendMessageToANumber']);



