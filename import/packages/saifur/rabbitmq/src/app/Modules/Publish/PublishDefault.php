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

// ----------------------------------------------------------------
// Step 1: Create a new connection
// Step 2: Create a new channel
// Step 3: Create a new queue if not already created
// Step 4: Create a new message with the content
// Step 5: Call the channel to publish the message to the queue basic_publish($message, $exchangeName, $routingKey)
// Step 6: Close the channel (which effectively ends the communication with the AMQP broker for that channel)
// Step 7: Close the connection (close the connection with the AMQP broker)
// ----------------------------------------------------------------
