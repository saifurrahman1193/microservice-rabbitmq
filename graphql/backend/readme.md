## GraphQL

## Contents

- [GraphQL](#graphql)
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
| GraphQL      | 4.18.2  |
| TypeScript   | 3.0.1   |
| mongoose     |         |

## Commands 

### Docker
```
sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p
cat /proc/sys/fs/inotify/max_user_watches
sudo docker-compose down
sudo docker-compose build && docker-compose up -d

```

- https://www.apollographql.com/docs/apollo-server/getting-started 

```
------------inside the container-------  
npm init --yes && npm pkg set type="module"
mkdir src
touch src/index.ts
npm install --save-dev typescript @types/node
touch tsconfig.json
touch .gitignore
------------outside the container-------
sudo chmod -R 777 *
sudo chmod 777 .gitignore
------------outside the container-------
touch .env
touch .env.example
sudo chmod 777 .env  .env.example
------------inside the container-------

## Routes
- http://localhost:805/


## Resources
- https://www.youtube.com/watch?v=sxfnT36v7Uk 
- https://socket.io/
- https://expressjs.com/en/starter/hello-world.html 
- https://medium.com/dev-genius/building-a-simple-real-time-chat-app-with-node-js-and-socket-io-5ec6c4606503
- https://www.youtube.com/watch?v=35sYtKbg_Y4
