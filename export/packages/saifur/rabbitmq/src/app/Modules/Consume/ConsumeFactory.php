<?php
namespace Saifur\RabbitMQ\app\Modules\Consume;

use Saifur\RabbitMQ\app\Modules\Consume\Consume;

class ConsumeFactory
{
    public static function processConsume($type = 'default')
    {
        if ($type === 'default') {
            return new Consume();
        } else {
            throw new \InvalidArgumentException("Invalid Consume type.");
        }
    }
}
