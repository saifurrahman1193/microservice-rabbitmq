<?php
namespace Saifur\RabbitMQ\app\Modules\Publish;

use Saifur\RabbitMQ\app\Modules\Publish\Publish;

class PublishFactory
{
    public static function processPublish($type = 'default', $params=[]) {
        switch ($type) {
            case 'default':
                return new PublishDefault($params);
            case 'direct':
                return new PublishDefault($params);
            case 'fanout':
                return new PublishDefault($params);
            case 'topic':
                return new PublishDefault($params);
            case 'headers':
                return new PublishDefault($params);
            default:
                throw new \InvalidArgumentException("Invalid product type: {$type}");
        }
    }
}
