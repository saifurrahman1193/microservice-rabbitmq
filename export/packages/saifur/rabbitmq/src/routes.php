<?php

use Illuminate\Support\Facades\Route;
use Saifur\RabbitMQ\app\Http\Controllers\LocalDirectoryController;


Route::group(['prefix' => 'saifur/file-manager'],function (){
    // Route::group(['prefix' => 'upload'],function (){
    //     Route::post('file-upload', [UploadController::class, 'fileUpload']);
    // });
    Route::group(['prefix' => 'directory/local'],function (){
        Route::post('get-files', [LocalDirectoryController::class, 'getFiles']);
        Route::post('get-files-recursively', [LocalDirectoryController::class, 'getFilesRecursively']);
        Route::post('get-files-recursively-with-details', [LocalDirectoryController::class, 'getFilesRecursivelyWithDetails']);
        Route::post('get-files-with-details', [LocalDirectoryController::class, 'getFilesWithDetails']);
        Route::post('create-directory', [LocalDirectoryController::class, 'createDirectory']);
        Route::post('delete-directory', [LocalDirectoryController::class, 'deleteDirectory']);
        Route::post('rename-directory', [LocalDirectoryController::class, 'renameDirectory']);
        Route::post('copy-directory', [LocalDirectoryController::class, 'copyDirectory']);
        Route::post('move-directory', [LocalDirectoryController::class, 'moveDirectory']);
        Route::post('search-files-folders', [LocalDirectoryController::class, 'searchFilesFolders']);
    });
});
