
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

#### JWT

##### JWT Secret Key Generation
```
command line in docker terminal/shell
node
require('crypto').randomBytes(64).toString('hex')

will get key somthing like this :
24998df2a534b39834eb578f759aade74bccb1239d20c95c93f979d89d565e360edbd5700470b806836b5bf92554a4df976da61692d4023ac4c48689d4e6e3d7
```
##### SSO : Single Sign-On (SSO)
- All servers (not client) should have a same key 


##### jwt : description

- token expire measured in seconds
- if a user is already generated token.
  - In that case we won't create another token but we will get that valid token for that user with (email address and password)
  - the main purpose here is handle multiple device functionality and avoid multiple access token
- token validity
  - jwt self validation
  - in access_token table status=1 && expires_at>now() && in user table status=1
- Auth middleware
  - check if user is authorized
- check permission middleware
  - pass a permission as a parameter and check if the user has that permission.
- changepassword
  - new password and confirm password must match
  - old password and new password must be different



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