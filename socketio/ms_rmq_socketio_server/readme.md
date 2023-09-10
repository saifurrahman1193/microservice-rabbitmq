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

| Process Name | Version |
| ------------ | ------- |
| Node         | 16.18.1 |
| Express      | 4.18.2  |
| nodemon      | 3.0.1   |
| mongoose      |    |

## Commands 

### Docker
```
sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p
cat /proc/sys/fs/inotify/max_user_watches
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
npm i socket.io
```

```
mongosh
show collections
show dbs
```

## Routes
- http://localhost:803/


## Resources
- https://www.youtube.com/watch?v=sxfnT36v7Uk 
- https://socket.io/
- https://expressjs.com/en/starter/hello-world.html 
- https://medium.com/dev-genius/building-a-simple-real-time-chat-app-with-node-js-and-socket-io-5ec6c4606503
- https://www.youtube.com/watch?v=35sYtKbg_Y4
