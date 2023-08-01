<?php
namespace Saifur\RabbitMQ\app\Modules\Publish;

use Saifur\RabbitMQ\app\Modules\Publish\Publish;

class PublishFactory
{
    public static function processPublish($type = 'default')
    {
        if ($type === 'default') {
            return new Publish();
        } else {
            throw new \InvalidArgumentException("Invalid Publish type.");
        }
    }
}
