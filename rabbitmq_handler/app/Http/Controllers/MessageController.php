<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class MessageController extends Controller {
    use ApiResponser;

    public function sendMessageToANumber( Request $request ) {
        $url = 'http://localhost:8000/api/saifur/rabbitmq/publish/send-message-default';
        // Use full URL

        $data = [
            'exchangeType' => 'default',
            'RABBITMQ_QUEUE_NAME' => 'SINGLE_SMS',
            'message' => 'This is test message'
        ];

        $ch = curl_init( $url );

        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt( $ch, CURLOPT_POST, true );
        curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode( $data ) );
        curl_setopt( $ch, CURLOPT_HTTPHEADER, [ 'Content-Type: application/json' ] );
        curl_setopt( $ch, CURLOPT_TIMEOUT, 30 );
        curl_setopt( $ch, CURLOPT_VERBOSE, true );
        curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );

        Log::info( 'Sending data: ' . json_encode( $data ) );

        $response = curl_exec( $ch );

        if ( curl_errno( $ch ) ) {
            Log::error( 'Request failed: ' . curl_error( $ch ) );
            return response()->json( [ 'message' => 'Failed to send message.' ], 500 );
        } else {
            Log::info( "API request completed with response: $response" );
            return response()->json( [ 'message' => 'Message sent successfully.' ] );
        }

        curl_close( $ch );
        return response()->json( [ 'message' => 'Sent API requests.' ] );
    }

}
