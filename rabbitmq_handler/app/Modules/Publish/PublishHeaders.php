<?php
namespace App\Modules\Publish;
use PhpAmqpLib\Message\AMQPMessage;
use App\Modules\RabbitMQConnection;
use App\Modules\Publish\PublishInterface;

class PublishHeaders implements PublishInterface
{
    protected $connection;

    public function __construct($params=[])
    {
        $rabbitmqConnection = new RabbitMQConnection($params); // Create a new RabbitMQ connection
        $this->connection = $rabbitmqConnection->getConnection(); // Get the connection object
    }

    public function publishMessage ($params=[])
    {
        $queueName = $params['RABBITMQ_QUEUE_NAME'] ?? env('RABBITMQ_QUEUE_NAME', 'rabbitmq_queue');
        $content = $params['CONTENT'] ?? null;
        $content = json_encode($content);

        $channel = $this->connection->channel(); // Create a channel
        $channel->queue_declare($queueName, false, true, false, false); // Declare a queue to ensure it exists
        $messageContent = $content; // Create the message content
        $message = new AMQPMessage($messageContent); // Create the AMQPMessage
        $channel->basic_publish($message, '', $queueName); // Publish the message to the queue
        $channel->close(); // Close the channel and the connection
        $this->connection->close();
    }
}
