<?php

namespace Saifur\RabbitMQ;

use Illuminate\Support\ServiceProvider;
use Saifur\RabbitMQ\app\Facades\Helpers\SRMQCommonHelper;

class SaifurRabbitMQServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Facades Registration
        $this->app->bind('srmqcommonhelper', function () {  return new SRMQCommonHelper();   });
    }

    public function boot()
    {
        $this->publishes([__DIR__ . '/config/srmq.php' => config_path('srmq.php') ], 'config');

        // Routes loading based on configuration

        if (config('srmq.use_package_routes'))
        {
            $this->loadRoutesFrom(__DIR__.'/routes.php');  // routes of this package
        }
        $this->loadViewsFrom(__DIR__.'/resources/views', 'rabbitmq');  // views directory
        $this->publishes([__DIR__.'/public' => public_path('vendor/saifur/rabbitmq'), ], 'public'); // public filesystem

        require_once __DIR__.'/app/Libraries/Helpers.php';  // Common helper functions
    }

}

