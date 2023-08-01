<?php
namespace Saifur\RabbitMQ\app\Modules\Consume;
use Saifur\RabbitMQ\app\Modules\Consume\ConsumeInterface;
use PhpAmqpLib\Message\AMQPMessage;
use PhpAmqpLib\Connection\AMQPStreamConnection;

// Concrete implementation of a Car
class Consume implements ConsumeInterface
{
    public function consumeMessage($params=[])
    {
        // Replace these variables with your RabbitMQ connection details
        $rabbitmqHost = $params['RABBITMQ_HOST'] ?? env('RABBITMQ_HOST', 'localhost');
        $rabbitmqPort = $params['RABBITMQ_PORT'] ?? env('RABBITMQ_PORT', 5672);
        $rabbitmqVhost = $params['RABBITMQ_VHOST'] ?? env('RABBITMQ_VHOST', '/');
        $rabbitmqLogin = $params['RABBITMQ_LOGIN'] ?? env('RABBITMQ_LOGIN', 'guest');
        $rabbitmqPassword = $params['RABBITMQ_PASSWORD'] ?? env('RABBITMQ_PASSWORD', 'guest');
        $queueName = $params['RABBITMQ_QUEUE_NAME'] ?? env('RABBITMQ_QUEUE_NAME', 'rabbitmq_queue');

        // Create a connection to RabbitMQ
        $connection = new AMQPStreamConnection($rabbitmqHost, $rabbitmqPort, $rabbitmqLogin, $rabbitmqPassword);

        // Create a channel
        $channel = $connection->channel();

        // Declare a queue to ensure it exists
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

        // Close the channel and the connection
        $channel->close();
        $connection->close();
    }
}
