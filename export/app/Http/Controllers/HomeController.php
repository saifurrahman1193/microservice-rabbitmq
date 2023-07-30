<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class HomeController extends Controller
{
    public function sendRabbitMQMessage(Request $request)
    {
        // Replace these variables with your RabbitMQ connection details
        $rabbitmqHost = env('RABBITMQ_HOST', 'localhost');
        $rabbitmqPort = env('RABBITMQ_PORT', 5672);
        $rabbitmqVhost = env('RABBITMQ_VHOST', '/');
        $rabbitmqLogin = env('RABBITMQ_LOGIN', 'guest');
        $rabbitmqPassword = env('RABBITMQ_PASSWORD', 'guest');
        $queueName = 'rabbitmq_queue';


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

        return 'Succeed!';
    }
}
