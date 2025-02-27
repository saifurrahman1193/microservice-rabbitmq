#### Command: docker 
```
sudo docker network create local_central_rabbitmq_network

sudo docker-compose down
sudo docker-compose build && docker-compose up -d
```

#### Command: docker  : Services
```
docker-compose exec ms-rmq-container sh
```

#### Browser: 
- browser: 
  - http://localhost:5672
  - http://localhost:15672
    - Username: guest
    - Password: guest


## Documentation
- https://www.rabbitmq.com/tutorials/tutorial-one-php.html