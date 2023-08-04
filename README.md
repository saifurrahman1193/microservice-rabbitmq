# MS-RMQ-RabbitMQ
## Design pattern
1. Factory Design pattern

## Browser 
http://localhost:5673/
http://localhost:15673/#/

# MS-RMQ-Export
#### Browser: 
- browser: 
  - RabbitMQ: http://localhost:15673
  - Export: http://localhost:801/saifur/rabbitmq
  - Import: http://localhost:802/saifur/rabbitmq

# All Run
```
cd rabbitmq
sudo docker-compose down
sudo docker-compose build && docker-compose up -d
cd..
cd export
sudo docker-compose down
sudo docker-compose build && docker-compose up -d
cd..
cd import
sudo docker-compose down
sudo docker-compose build && docker-compose up -d
cd..
```

# Network : External Network
```
docker network create ms_rmq_network

docker exec -it ms-rmq-container sh
docker exec -it ms-rmq-export-container sh
```

## Access container to container
```
docker exec ms-rmq-container ping ms-rmq-export-container
docker exec ms-rmq-container ping ms-rmq-export-db-container

docker exec ms-rmq-export-container ping ms-rmq-container 
docker exec ms-rmq-export-container telnet ms-rmq-container 5673
docker exec ms-rmq-export-container ping ms-rmq-export-db-container 

docker exec ms-rmq-export-db-container ping ms-rmq-container
docker exec ms-rmq-export-db-container ping ms-rmq-export-container
```

## Documentation
- https://www.rabbitmq.com/tutorials/tutorial-one-php.html