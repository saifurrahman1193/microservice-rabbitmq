<?php

namespace Saifur\RabbitMQ\app\Console\Commands;

use Illuminate\Console\Command;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;


class ConsumeRabbitMQMessages extends Command
{
    protected $signature = 'rabbitmq:consume';
    protected $description = 'Consume messages from RabbitMQ queue';

    public function handle()
    {
        $rabbitmqHost = env('RABBITMQ_HOST');
        $rabbitmqPort = env('RABBITMQ_PORT');
        $rabbitmqUser = env('RABBITMQ_USER');
        $rabbitmqPassword = env('RABBITMQ_PASSWORD');
        $queueName = env('RABBITMQ_QUEUE_NAME');

        $connection = new AMQPStreamConnection($rabbitmqHost, $rabbitmqPort, $rabbitmqUser, $rabbitmqPassword);
        $channel = $connection->channel();

        $channel->queue_declare($queueName, false, true, false, false);

        echo "Waiting for messages. To exit, press CTRL+C\n";

        $callback = function (AMQPMessage $message) use ($channel) {
            $body = $message->getBody();
            // Process the message (add your custom processing logic here)
            echo "Received: " . $body . PHP_EOL;
            $channel->basic_ack($message->delivery_info['delivery_tag']);
        };

        $channel->basic_qos(null, 1, null);
        $channel->basic_consume($queueName, '', false, false, false, false, $callback);

        while (count($channel->callbacks)) {
            $channel->wait();
        }

        $channel->close();
        $connection->close();
    }
}
