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
                return new PublishDirect($params);
            case 'fanout':
                return new PublishFanout($params);
            case 'topic':
                return new PublishTopic($params);
            case 'headers':
                return new PublishHeaders($params);
            default:
                throw new \InvalidArgumentException("Invalid product type: {$type}");
        }
    }
}
