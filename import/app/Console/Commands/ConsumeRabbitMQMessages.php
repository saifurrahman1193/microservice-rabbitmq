<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpAmqpLib\Message\AMQPMessage;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use Saifur\RabbitMQ\app\Modules\Consume\ConsumeFactory;


class ConsumeRabbitMQMessages extends Command
{
    protected $signature = 'rabbitmq:consume';
    protected $description = 'Consume messages from RabbitMQ queue';

    public function handle()
    {
        $consume = ConsumeFactory::processConsume('default');
        $consume->consumeMessage();
    }
}
