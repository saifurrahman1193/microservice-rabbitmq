<?php
namespace Saifur\RabbitMQ\app\Modules\Publish;
use PhpAmqpLib\Message\AMQPMessage;
use Saifur\RabbitMQ\app\Modules\RabbitMQConnection;
use Saifur\RabbitMQ\app\Modules\Publish\PublishInterface;

class PublishDefault implements PublishInterface
{
    protected $connection;
    protected $channel;

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

        $this->channel = $this->connection->channel(); // Create a channel
        $this->channel->queue_declare($queueName, false, true, false, false); // Declare a queue to ensure it exists
        $messageContent = $content; // Create the message content
        $message = new AMQPMessage($messageContent); // Create the AMQPMessage
        $this->channel->basic_publish($message, '', $queueName); // Publish the message to the queue
    }

    public function __destruct()
    {
        $this->channel->close();
        $this->connection->close();
    }
}
