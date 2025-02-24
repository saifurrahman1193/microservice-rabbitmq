<?php

namespace Saifur\RabbitMQ\app\Exceptions;

class DuplicateFileNameException extends \Exception
{
    public function __construct($params=[])
    {
        if (isset($params['message']))
        {
            $this->message = $params['message'];
        }
        else
        {
            $this->message = 'Duplicate file name.';
        }
    }
}
