<?php
namespace Saifur\RabbitMQ\app\Modules\Publish;

use Saifur\RabbitMQ\app\Modules\Publish\Publish;

class PublishFactory
{
    public static function processPublish($type = 'default')
    {
        if ($type === 'default') {
            return new Publish();
        }
        else if ($type === 'direct') {
            return new Publish();
        }
        else if ($type === 'fanout') {
            return new Publish();
        }
        else if ($type === 'topic') {
            return new Publish();
        }
        else if ($type === 'headers') {
            return new Publish();
        }
        else {
            throw new \InvalidArgumentException("Invalid Publish type.");
        }
    }
}
