#### Command: docker
```
sudo docker network create local_central_kafka_network

sudo docker-compose down
sudo docker-compose build && docker-compose up -d
```

#### Command: docker  : Services
```
docker-compose exec kafka bash
```

#### Browser:
- Kafka UI: http://localhost:91
- Kafka broker: localhost:9092
- Zookeeper: localhost:2181

## Documentation
- https://kafka.apache.org/documentation/
- https://docs.confluent.io/platform/current/get-started/index.html