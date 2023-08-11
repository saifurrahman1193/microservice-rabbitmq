<?php

namespace Saifur\RabbitMQ\app\Facades\Helpers;

use Illuminate\Support\Facades\Facade;

class SRMQCommonFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'srmqcommonhelper';
    }
}
