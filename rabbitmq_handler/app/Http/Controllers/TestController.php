<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class TestController extends Controller {
    use ApiResponser;

    public function sendMessageMulti($times_of_hit = 1, Request $request) {
        $url = '/api/saifur/rabbitmq/publish/send-message-default';
        $data = [
            'exchangeType' => 'default',
            'RABBITMQ_QUEUE_NAME' => 'export_default_queue',
            'message' => 'This is test message'
        ];

        for ($i = 0; $i < $times_of_hit; $i++) {
            $ch = curl_init($url);

            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Timeout in seconds
            curl_setopt($ch, CURLOPT_VERBOSE, true); // Enable verbose output for debugging
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL verification (if using HTTPS)

            Log::info('Sending data: ' . json_encode($data)); // Log the data being sent in the request

            $response = curl_exec($ch);

            // dd($ch, $response);


            if (curl_errno($ch)) {
                Log::error("Request $i failed: " . curl_error($ch));
            } else {
                Log::info("API request $i completed with response: $response");
            }

            curl_close($ch);

            usleep(10000); // Pause for 10 milliseconds
        }

        return response()->json(['message' => 'Sent ' . $times_of_hit . ' API requests.']);
    }

    public function sendMessageMulti($times_of_hit = 1, Request $request) {
        $url = url('api/saifur/rabbitmq/publish/send-message-default'); // Internal API URL

        $data = [
            'exchangeType' => 'default',
            'RABBITMQ_QUEUE_NAME' => 'export_default_queue',
            'message' => 'This is test message'
        ];

        for ($i = 0; $i < $times_of_hit; $i++) {
            $response = Http::post($url, $data);

            if ($response->successful()) {
                Log::info("API request $i completed with response: " . $response->body());
            } else {
                Log::error("Request $i failed: " . $response->body());
            }

            usleep(10000); // Pause for 10 milliseconds
        }

        return response()->json(['message' => 'Sent ' . $times_of_hit . ' API requests.']);
    }


}
