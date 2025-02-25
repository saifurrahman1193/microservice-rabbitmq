<?php
namespace App\Modules\Consume;
use Illuminate\Support\Facades\Log;
use PhpAmqpLib\Message\AMQPMessage;
use App\Modules\RabbitMQConnection;
use App\Modules\Consume\ConsumeInterface;

// Concrete implementation of a Car
class ConsumeDefault implements ConsumeInterface
{
    protected $connection;
    protected $channel;

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


        $callback = function (AMQPMessage $message)  use (&$messages) {
            // Handle the received message here
            $payload = $message->getBody();
            $data = json_decode($payload, true);
            Log::info('Rabbitmq\'s consumed message : ', $data);

            $message->delivery_info['channel']->basic_ack($message->delivery_info['delivery_tag']);
        };


        $this->channel->basic_qos(null, 1, null);
        $this->channel->basic_consume($queueName, '', false, false, false, false, $callback);

        while (count($this->channel->callbacks)) {
            $this->channel->wait();
        }
    }


    public function __destruct()
    {
        $this->channel->close();
        $this->connection->close();
    }
}
