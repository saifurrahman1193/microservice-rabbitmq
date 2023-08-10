## Nodejs R&D (Api, Bot)

## Contents

- [Nodejs R&D (Api, Bot)](#nodejs-rd-api-bot)
- [Contents](#contents)
- [Tools](#tools)
  - [Built With](#built-with)
- [Imeplementation](#imeplementation)
  - [Modules](#modules)
    - [Login](#login)
    - [jwt](#jwt)
    - [Node Schedule](#node-schedule)
    - [Telegram Bot](#telegram-bot)
  - [Permissions](#permissions)
- [Deployment](#deployment)
  - [Public domains](#public-domains)
  - [For local Development](#for-local-development)
    - [To run locally](#to-run-locally)
      - [Production](#production)
- [Challenges](#challenges)
- [Resources](#resources)

## Tools

### Built With

| Serial | Process Name          | Version |
| ------ | --------------------- | ------- |
| 1      | Node                  | 14      |
| 2      | express               |         |
| 3      | express handlebars    |         |
| 4      | nodemailer            |         |
| 5      | jwt                   |         |
| 6      | node-telegram-bot-api | 0.57.0  |

## Imeplementation

This projects has been divided into several modules to make the development of the projectis much more easier.  Such are -

### Modules

<!-- https://www.compart.com/en/unicode/search?q=control#characters -->
<!-- https://unicode-table.com/en/#basic-latin -->
<!-- https://emojiterra.com/ -->
<!-- https://home.unicode.org/ -->
| Modules              |
| -------------------- |
| Login                |
| 🛂 **Access Control** |
| User                 |
| Role                 |
| Permissions          |
| Jwt                  |
| Node Schedule        |
| Telegram Bot         |

#### Login

**Token Accept Ways**

1. Header Authorization Bearer
   1. Authorization = Bearer token
2. Query params
   - **URL**
       - www.abc.com/api/v1/user?access_token=token
       - here,  access_token will be set to header automatically,
         - Authorization = Bearer access_token
         - 
**Auth Process**
| Serial | Process Name    | Middeware                 | Status |
| ------ | --------------- | ------------------------- | ------ |
| 1      | jwt install     |                           | done   |
| 2      | register        |                           | done   |
| 3      | login           |                           | done   |
| 4      | me              | AuthMiddleware            | done   |
| 5      | AuthMiddlware   |                           | done   |
| 6      | logout          | AuthMiddleware            | done   |
| 7      | checkpermission | checkPermissionMiddleware | done   |
| 8      | changepassword  | AuthMiddleware            |        |
|        |                 |                           |        |

#### jwt

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

#### Node Schedule

- <https://www.npmjs.com/package/node-schedule>

#### Telegram Bot
**scopes**
* DB process if execution time more than 30 seconds sends alert to telegram channel.
  * done
* Uptime robot


- <https://github.com/hosein2398/node-telegram-bot-api-tutorial#First+message>
- <https://core.telegram.org/bots/api>

### Permissions

| Permissions       | Module     | Purpose |
| ----------------- | ---------- | ------- |
| permission list   | permission |         |
| permission data   | permission |         |
| permission create | permission |         |
| permission update | permission |         |
| role list         | role       |         |
| role data         | role       |         |
| role create       | role       |         |
| role update       | role       |         |
| user list         | user       |         |
| user data         | user       |         |
| user create       | user       |         |
| user update       | user       |         |

## Deployment

### Public domains

### For local Development

```
npm init -y 
npm install express mysql  --save
npm i -D nodemon

in package.json
 "scripts": {
    "dev": "npx nodemon server/server.js -w server"
  },

npm run dev
```

#### To run locally

```
cp .\.env.example .env
npm install
npm start
```

##### Production
```
sudo npm i -g pm2
pm2 start app.js
pm2 save
pm2 startup systemd
pm2 status

system will restart
  sudo reboot

```

```
sudo npm i pm2 -g
pm2 start app (or whatever your file name)

# Other pm2 commands
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)

# To make sure app starts when reboot
pm2 startup ubuntu
```


**Setup ufw firewall**
```
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
```

**nginx**
```
systemctl reload nginx
```

**nginx suggestion proxy**
```
server {
        listen 80;
        root /var/www/html/vr/nodeapi;
        server_name "vrnodeapi.localhost";
        index index.html index.php;

        # log
        access_log /var/www/html/vr/vr_nodeapi_access_log.log;

        location / {
            proxy_pass http://0.0.0.0:5000;
            try_files $uri $uri/ $uri.html $uri.php =404;
        }
    }
```

## Challenges

- log
  - done
- csv generate
  - done
- CSV upload
- email
  - nodemailer done
  - html template
  - add atttachement
  - queue
- enum
  *
- schedule
  - done
- queue
  - csv
  - email

## Resources

- <https://dev.to/tienbku/node-js-crud-operation-with-mysql-example-1gme>
- <https://www.bezkoder.com/node-js-rest-api-express-mysql/>
- <https://ecotrust-canada.github.io/markdown-toc/>
