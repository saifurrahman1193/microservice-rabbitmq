<?php
namespace App\Modules\Consume;

use App\Modules\Consume\ConsumeDefault;

class ConsumeFactory
{
    public static function processConsume($type = 'default', $params=[])
    {
        switch ($type) {
            case 'default':
                return new ConsumeDefault($params);
            // case 'direct':
            //     return new ConsumeDirect($params);
            // case 'fanout':
            //     return new ConsumeFanout($params);
            // case 'topic':
            //     return new ConsumeTopic($params);
            // case 'headers':
            //     return new ConsumeHeaders($params);
            default:
                throw new \InvalidArgumentException("Invalid exchange type: {$type}");
        }
    }
}
