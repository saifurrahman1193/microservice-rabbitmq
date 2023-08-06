<?php
namespace Saifur\RabbitMQ\app\Modules\Consume;
use PhpAmqpLib\Message\AMQPMessage;
use Saifur\RabbitMQ\app\Modules\RabbitMQConnection;
use Saifur\RabbitMQ\app\Modules\Consume\ConsumeInterface;

// Concrete implementation of a Car
class ConsumeDefault implements ConsumeInterface
{
    protected $connection;
    protected $channel;
    protected $messages = [];

    public function __construct($params=[])
    {
        $rabbitmqConnection = new RabbitMQConnection($params); // Create a new RabbitMQ connection
        $this->connection = $rabbitmqConnection->getConnection(); // Get the connection object
    }

    public function consumeMessage($params=[])
    {
        $queueName = $params['RABBITMQ_QUEUE_NAME'] ?? env('RABBITMQ_QUEUE_NAME', 'rabbitmq_queue');

        // Create a channel
        $this->channel = $this->connection->channel(); // Create a channel

        // Declare a queue to ensure it exists
        $channel = $this->channel->queue_declare($queueName, false, true, false, false);

        echo "Waiting for messages. To exit, press CTRL+C\n";


        $callback = function (AMQPMessage $message) {
            // Handle the received message here
            $payload = $message->getBody();
            dd($payload,$message->getBody(), json_decode($payload, true));
            $this->messages[] = json_decode($payload, true);
        };
        dd($params, $this->messages);


        $this->channel->basic_qos(null, 1, null);
        $this->channel->basic_consume($queueName, '', false, false, false, false, $callback);


        while (count($this->channel->callbacks)) {
            $this->channel->wait();
        }
    }

    public function consumeMessageWithResponse($params=[])
    {
        $this->consumeMessage($params);
    }

    public function __destruct()
    {
        $this->channel->close();
        $this->connection->close();
    }
}
