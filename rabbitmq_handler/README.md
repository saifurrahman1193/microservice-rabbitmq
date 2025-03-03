#### Command: docker 
```
docker network create ms_rmq_network

sudo docker-compose down
sudo docker-compose build && docker-compose up -d
```

#### Command: docker  : Services
```
docker-compose exec export sh
```

## Access container to container
```
docker exec ms-rmq-export-container php artisan list
docker exec ms-rmq-export-container php artisan rabbitmq:consume
```

#### Browser: 
- browser: 
  - http://localhost:801
  - http://localhost:801/saifur/rabbitmq

#### Workbench:
```
host: 127.0.0.1 (System/LocalHost port)
port: 33063 (System/LocalHost PC Port)
username: root
pass: root
``` 

## Installation
```
composer require php-amqplib/php-amqplib

```


### Cache Clear
```
    php artisan cache:clear
    php artisan route:cache
    php artisan config:cache
    php artisan view:clear
    php artisan optimize
    php artisan config:clear
    php artisan route:clear
    php artisan optimize:clear

    rm -f storage/framework/sessions/*

    composer dump-autoload
```

### Run supervisor or schedule command in container
```
php artisan schedule:run
```

## Documentation
- https://www.rabbitmq.com/tutorials/tutorial-one-php.html
