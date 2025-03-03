<?php

namespace App\Http\Controllers\RabbitMQ;

use Illuminate\Http\Request;
use PhpAmqpLib\Message\AMQPMessage;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponser;
use App\Modules\RabbitMQConnection;
use App\Modules\Publish\PublishFactory;
use Illuminate\Support\Facades\Log;

class ConsumerController extends Controller
{
    use ApiResponser;


    public function consumeMessageDefault(Request $request)
    {
        $messages = [];

        $params = ['RABBITMQ_QUEUE_NAME' => 'export_default_queue','CONTENT' =>  $request->all()];
        $rabbitmqConnection = new RabbitMQConnection($params); // Create a new RabbitMQ connection
        $connection = $rabbitmqConnection->getConnection(); // Get the connection object

        $channel = $connection->channel();
        $queue = $request->RABBITMQ_QUEUE_NAME ?? 'export_default_queue';

        $channel->queue_declare($queue, false, true, false, false);


        $callback = function (AMQPMessage $message) use (&$messages) {
            // Handle the received message here
            $payload = $message->getBody();
            Log::debug("consume message". $payload);
            // You can process the message payload here as needed
            // For example, you can decode JSON data or convert it to an array
            // dd($message->getBody());
            $data = json_decode($payload, true);
            $messages[] = $data;
            // dd($data,$payload, $messages);

            // Acknowledge the message to remove it from the queue
            $message->delivery_info['channel']->basic_ack($message->delivery_info['delivery_tag']);
        };
        // This will continuously consume messages until the consumer is manually stopped
        $channel->basic_consume($queue, '', false, false, false, false, $callback);

        // Keep the consumer running and wait for messages
        while ($channel->is_consuming()) {
            $channel->wait();
        }

        $channel->close();
        $connection->close();


        return $this->set_response($messages, 200, 'success', ['success']);
    }

    public function consumeMessageDirect(Request $request)
    {
        $publish = PublishFactory::processPublish('direct', []);  // direct publish
        $publish->publishMessage(['RABBITMQ_QUEUE_NAME' => 'export_default_queue','CONTENT' =>  $request->all()]);

        return 'Succeed!';
    }

    public function consumeMessageFanout(Request $request)
    {
        $publish = PublishFactory::processPublish('fanout', []);  // fanout publish
        $publish->publishMessage(['RABBITMQ_QUEUE_NAME' => 'export_default_queue','CONTENT' =>  $request->all()]);

        return 'Succeed!';
    }

    public function consumeMessageTopic(Request $request)
    {
        $publish = PublishFactory::processPublish('topic', []);  // topic publish
        $publish->publishMessage(['RABBITMQ_QUEUE_NAME' => 'export_default_queue','CONTENT' =>  $request->all()]);

        return 'Succeed!';
    }

    public function consumeMessageHeaders(Request $request)
    {
        $publish = PublishFactory::processPublish('headers', []);  // headers publish
        $publish->publishMessage(['RABBITMQ_QUEUE_NAME' => 'export_default_queue','CONTENT' =>  $request->all()]);

        return 'Succeed!';
    }

}
