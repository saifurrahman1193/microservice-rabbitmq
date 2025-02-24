<?php

namespace Saifur\RabbitMQ\app\Exceptions;


class FileFailedToUploadException extends \Exception
{
    public function __construct($params=[])
    {
        if (isset($params['message']))
        {
            $this->message = $params['message'];
        }
        else
        {
            $this->message = 'File failed to upload.';
        }
    }
}
