## Websocket

## Contents

- [Websocket](#websocket)
- [Contents](#contents)
- [Tools](#tools)
  - [Built With](#built-with)
- [Commands](#commands)
  - [Docker](#docker)
- [Routes](#routes)
- [Resources](#resources)

## Tools

### Built With

| Serial | Process Name | Version |
| ------ | ------------ | ------- |
| 1      | Node         | 16.18.1 |
| 1      | Express      | 4.18.2  |

## Commands 

### Docker
```
sudo docker-compose down
sudo docker-compose build && docker-compose up -d
```

```
------------inside the container-------
npm init -y
touch .gitignore
------------outside the container-------
sudo chmod -R 777 *
sudo chmod 777 .gitignore
------------inside the container-------
npm install express
npm i dotenv
------------outside the container-------
touch .env
touch .env.example
sudo chmod 777 .env  .env.example
------------inside the container-------
npm i nodemon
```

## Routes
- http://localhost:803/


## Resources
- https://www.youtube.com/watch?v=sxfnT36v7Uk 
- https://socket.io/
- https://expressjs.com/en/starter/hello-world.html 
- 
