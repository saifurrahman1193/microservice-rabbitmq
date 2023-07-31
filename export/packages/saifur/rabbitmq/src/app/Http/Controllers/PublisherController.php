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


    public function sendMessage(Request $request)
    {
        $publish = PublishFactory::processPublish('default');
        $publish->publishMessage();

        return 'Succeed!';
    }

}
