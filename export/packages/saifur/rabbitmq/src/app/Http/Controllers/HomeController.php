<?php

namespace Saifur\RabbitMQ\app\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Saifur\RabbitMQ\app\Traits\ApiResponser;

class HomeController extends Controller
{
    use ApiResponser;


    public function home(Request $request)
    {
        return view('rabbitmq::home');
    }

}
