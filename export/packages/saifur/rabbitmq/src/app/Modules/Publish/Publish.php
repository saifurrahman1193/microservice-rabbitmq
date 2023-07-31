<?php
namespace Saifur\RabbitMQ\app\Modules\Publish;
use Saifur\RabbitMQ\app\Modules\RabbitMQ;
use PhpAmqpLib\Message\AMQPMessage;
use PhpAmqpLib\Connection\AMQPStreamConnection;

// Concrete implementation of a Car
class Publish implements RabbitMQ
{
    public function publishMessage($params=[])
    {
        // Replace these variables with your RabbitMQ connection details
        $rabbitmqHost = $params['RABBITMQ_HOST'] ?? env('RABBITMQ_HOST', 'localhost');
        $rabbitmqPort = $params['RABBITMQ_PORT'] ?? env('RABBITMQ_PORT', 5672);
        $rabbitmqVhost = $params['RABBITMQ_VHOST'] ?? env('RABBITMQ_VHOST', '/');
        $rabbitmqLogin = $params['RABBITMQ_LOGIN'] ?? env('RABBITMQ_LOGIN', 'guest');
        $rabbitmqPassword = $params['RABBITMQ_PASSWORD'] ?? env('RABBITMQ_PASSWORD', 'guest');
        $queueName = $params['QUEUE_NAME'] ?? 'rabbitmq_queue';


        // Create a connection to RabbitMQ
        $connection = new AMQPStreamConnection($rabbitmqHost, $rabbitmqPort, $rabbitmqLogin, $rabbitmqPassword);
        // Create a channel
        $channel = $connection->channel();

        // Declare a queue to ensure it exists
        $channel->queue_declare($queueName, false, true, false, false);

        // Create the message content
        $messageContent = 'Hello, RabbitMQ!';

        // Create the AMQPMessage
        $message = new AMQPMessage($messageContent);

        // Publish the message to the queue
        $channel->basic_publish($message, '', $queueName);

        // Close the channel and the connection
        $channel->close();
        $connection->close();
    }
}
