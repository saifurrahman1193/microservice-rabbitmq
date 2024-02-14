
## Contents
- [Contents](#contents)
- [All Terms](#all-terms)
  - [Client Side Events](#client-side-events)
    - [Events](#events)
        - [single-chat/receive-message](#single-chatreceive-message)
      - [Default Events](#default-events)
        - [connect](#connect)
        - [disconnect](#disconnect)
      - [Custom Events](#custom-events)
        - [joined-room](#joined-room)
  - [Server Side Events](#server-side-events)
    - [Events](#events-1)
      - [Default Events](#default-events-1)
        - [connect](#connect-1)
        - [disconnect](#disconnect-1)
      - [Custom Events](#custom-events-1)
        - [join-room](#join-room)
        - [join-rooms](#join-rooms)
        - [leave-room](#leave-room)
        - [joined-room](#joined-room-1)
        - [left-room](#left-room)
        - [single-chat/send-message](#single-chatsend-message)
- [Project Setup](#project-setup)
  - [package.json](#packagejson)
  - [Commands](#commands)
    - [Docker](#docker)
        - [Docker Network](#docker-network)
  - [Run](#run)
  - [Database](#database)
- [Documentation](#documentation)
  - [GIT](#git)



## All Terms
### Client Side Events
#### Events
###### single-chat/receive-message
##### Default Events
###### connect
###### disconnect
##### Custom Events


### Server Side Events
#### Events
##### Default Events
###### connect
###### disconnect
##### Custom Events
###### room/join-room
- done
###### room/join-rooms
- done
###### room/leave-room
- wip
###### room/user-connected
###### room/user-disconnected
- 
###### single-chat/send-message


## Project Setup
```
npm install typescript
npx tsc --init
tsc --version
npm i express typescript nodemon ts-node @types/express @types/node
```
### package.json
```
  "type": "module",
```

### Commands 

#### Docker
```
sudo docker-compose down
sudo docker-compose build && docker-compose up -d
```

###### Docker Network 
```
docker network create ms_rmq_network
```

### Run 
```
npm run dev
```


### Database
```
use socket_server

```


## Documentation
- https://www.youtube.com/watch?v=H91aqUHn8sE 
- https://www.youtube.com/watch?v=b8ZUb_Okxro
- https://github.com/mamun-swe/api.auth.asazaoa.com
- https://medium.com/@ipenywis/node-js-socket-io-namespaces-rooms-and-connections-02-14e84dbdba46


### GIT
```
feat: New feature for the user.
fix: Bug fix.
style: Code Style Changes.
refactor: Code Refactoring.
build: Build System Changes.
ci: Continuous Integration Changes.
perf: Performance Improvements.
revert: Revert a Previous Commit.
docs: Documentation changes.
test: Adding or modifying tests.
chore: Routine tasks, maintenance, or housekeeping.