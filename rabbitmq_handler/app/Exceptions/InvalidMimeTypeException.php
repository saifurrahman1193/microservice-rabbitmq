<?php

namespace App\Exceptions;

class InvalidMimeTypeException extends \Exception
{
    public function __construct($params=[])
    {
        if (isset($params['message']))
        {
            $this->message = $params['message'];
        }
        else
        {
            $this->message = 'Invalid File Type';
        }
    }
}
