<?php

namespace Saifur\RabbitMQ\app\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Saifur\RabbitMQ\app\Traits\ApiResponser;
use Saifur\RabbitMQ\app\Modules\Publish\Publish;
use Saifur\RabbitMQ\app\Modules\Publish\PublishFactory;

class PublisherController extends Controller
{
    use ApiResponser;


    public function sendMessageDefault(Request $request)
    {
        $publish = PublishFactory::processPublish('default', ['RABBITMQ_QUEUE_NAME' => 'export_default_queue']);  // default publish
        $publish->publishMessage(['CONTENT' => $request->all()]);

        return 'Succeed!';
    }

    public function sendMessageDirect(Request $request)
    {
        $publish = PublishFactory::processPublish('direct');  // direct publish
        $publish->publishMessage(['CONTENT' => $request->all()]);

        return 'Succeed!';
    }

    public function sendMessageFanout(Request $request)
    {
        $publish = PublishFactory::processPublish('fanout');  // fanout publish
        $publish->publishMessage(['CONTENT' => $request->all()]);

        return 'Succeed!';
    }

    public function sendMessageTopic(Request $request)
    {
        $publish = PublishFactory::processPublish('topic');  // topic publish
        $publish->publishMessage(['CONTENT' => $request->all()]);

        return 'Succeed!';
    }

    public function sendMessageHeaders(Request $request)
    {
        $publish = PublishFactory::processPublish('headers');  // headers publish
        $publish->publishMessage(['CONTENT' => $request->all()]);

        return 'Succeed!';
    }

}
