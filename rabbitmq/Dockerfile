# Use the official RabbitMQ image from Docker Hub
FROM rabbitmq:3.12.2-management

RUN apt-get update && apt-get install -y iputils-ping

# Expose the RabbitMQ default port and management plugin port
EXPOSE 5673 15673
