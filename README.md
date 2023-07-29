# MS-RMQ-RabbitMQ
## Browser 
http://localhost:5673/
http://localhost:15673/#/

# MS-RMQ-Export
#### Browser: 
- browser: http://localhost:801

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