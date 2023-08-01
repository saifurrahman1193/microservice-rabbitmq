<?php


return [
    /*
    |--------------------------------------------------------------------------
    | Routing
    |--------------------------------------------------------------------------
     */

    'use_package_routes'       => true,   // true | false  (Enable/Disable package routing)

    /*
    |--------------------------------------------------------------------------
    | Exception Handling
    |--------------------------------------------------------------------------
     */
    'exception_response' =>  'api-response',  // api-response | only-errors  (api-response= returns api response , only-errors = returns eroors as an array)

    /*
    |--------------------------------------------------------------------------
    | Upload
    |--------------------------------------------------------------------------
     */
    'disk' =>  'public'  // public | storage (public = upload to public directory, storage = upload to storage directory)

];
