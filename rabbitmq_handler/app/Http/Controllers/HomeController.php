<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponser;

class HomeController extends Controller
{
    use ApiResponser;


    public function home(Request $request)
    {
        return view('rabbitmq::home');
    }

}
