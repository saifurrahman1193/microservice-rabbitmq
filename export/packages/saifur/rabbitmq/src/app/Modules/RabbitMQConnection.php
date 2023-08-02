<?php
namespace Saifur\RabbitMQ\app\Modules;

use PhpAmqpLib\Connection\AMQPStreamConnection;

class RabbitMQConnection {
    private $connection;

    public function __construct($params = []) {
        $rabbitmqHost = $params['RABBITMQ_HOST'] ?? env('RABBITMQ_HOST', 'localhost');
        $rabbitmqPort = $params['RABBITMQ_PORT'] ?? env('RABBITMQ_PORT', 5672);
        $rabbitmqVhost = $params['RABBITMQ_VHOST'] ?? env('RABBITMQ_VHOST', '/');
        $rabbitmqLogin = $params['RABBITMQ_LOGIN'] ?? env('RABBITMQ_LOGIN', 'guest');
        $rabbitmqPassword = $params['RABBITMQ_PASSWORD'] ?? env('RABBITMQ_PASSWORD', 'guest');

        $this->connection = new AMQPStreamConnection($rabbitmqHost, $rabbitmqPort, $rabbitmqLogin, $rabbitmqPassword);
    }

    public function getConnection() {
        return $this->connection;
    }
}

