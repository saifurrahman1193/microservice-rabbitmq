<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Modules\Consume\ConsumeFactory;


class ConsumeRabbitMQMessages extends Command
{
    protected $signature = 'rabbitmq:consume';
    protected $description = 'Consume messages from RabbitMQ queue';

    public function handle()
    {
        $consume = ConsumeFactory::processConsume('default',[]);
        $consume->consumeMessage(['RABBITMQ_QUEUE_NAME' => $request->RABBITMQ_QUEUE_NAME ?? 'export_default_queue']);
    }
}
