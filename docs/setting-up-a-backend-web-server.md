# Setting up a backend web server

- Author: Kim Jihyeong(KJHRicky@gmail.com)
- Written in Dec 5, 2019

## Overview

This documents provides a way how to make a backend web server using `mongoDB`, `mongoose`, `apollo`, `docker-compose`, and `graphQL`.

## Steps

1. set up apollo-server & GraphiQL
1. run mongoDB
1. run apollo server with mongoose

### Setup prisma

- need to install prisma globally

```bash
npm install -g prisma
```

- make `.env` file and put information:

```bash
PRISMA_MANAGEMENT_API_SECRET=my-secret
PRISMA_PORT=4466
PRISMA_VERSION=1.34
POSTGRES_VERSION=11.4
POSTGRES_USER=prisma
POSTGRES_PASSWORD=prisma
POSTGRES_PORT=5432
```

- docker-compose up

```bash
docker-compose up -d
```

```text
Creating network "docker-prisma_default" with the default driver
Creating volume "docker-prisma_postgres" with default driver
Pulling prisma (prismagraphql/prisma:1.34)...
Status: Downloaded newer image for postgres:11.4
Creating docker-prisma_postgres_1 ... done
Creating docker-prisma_prisma_1   ... done
```

### Set up apollo-server & GraphiQL

```bash
mkdir server
cd server
touch index.js
npm init -y
npm install apollo-server graphql mongoose dotenv --save
node .
```

### Run `mongoDB`

#### create docker instance using docker-compose

- `docker-compose.yml`

```yml
version: "3"
services:
  database:
    image: "mongo:latest"
    container_name: "mongodb-server-container"
    environment:
      - TZ=Asia/Seoul
      - MONGO_INITDB_DATABASE=<mongodb_name>
      - MONGO_INITDB_ROOT_USERNAME=<root_id>
      - MONGO_INITDB_ROOT_PASSWORD=<root_password>
    volumes:
      - ./init-mongo.js:/docker-entrypoint-initdb.d/init-mongo-js:ro
      - /<localhost-path-to-save-db-data>/data:/data/db
    ports:
      - "27017-27019:27017-27019"
```

- `init-mongo.js`

```js
db.createUser({
  user: "<root_id>",
  pwd: "<root_password>",
  roles: [
    {
      role: "readWrite",
      db: "<mongodb_name>"
    }
  ]
});
```

#### [alternatives] install mongoDB without `docker-compose`

> See: [Getting Started With MongoDB As A Docker Container Deployment](https://www.thepolyglotdeveloper.com/2019/01/getting-started-mongodb-docker-container-deployment/)

```bash
docker pull mongo
docker run -p 27017-27019:27017-27019 --name mongodb-server -v '/<localhost-path-to-save-db-data>/data:/data/db' -d mongo
```

#### run mongoDB docker instance

```bash
# to run in background, -d is added
docker-compose up -d
```

#### close mongoDB container

```bash
docker ps -a
docker kill <process_id>
```

#### access mongoDB instance bash

```bash
docker exec -it mongodb-server bash
```

## Tips

### Launch an SSH tunnel

> See [ask ubuntu - access webpage through ssh](https://askubuntu.com/questions/414930/access-webpage-through-ssh)

- To initiate your SSH tunnel, simply open terminal and connect to your remote server via SSH with the following flags:

```bash
ssh -D 8080 -C -N username@example.com
```

- Browse the Web with Your SSH Tunnel (Chrome)

- Now, let’s start browsing the web using our new SSH tunnel.

  - Open Google Chrome
  - Select the wrench icon on the top right
  - Select ‘Settings’
  - Select ‘Show advanced settings…’
  - Select ‘Change proxy settings…’
  - Select ‘SOCKS Proxy’
  - Enter ’127.0.0.1′
  - Enter port ’8080′
  - Save changes by selecting ‘OK’
  - Search Google for ‘my ip’ and take a look at what your IP address is now.

- This will launch our SSH tunnel on port 8080 and route all traffic (securely) through the server at example.com.

- Exiting the SSH Tunnel

- To exit the SSH tunnel, simply disable the SOCKS proxy within your browser.

## Troubleshoots

### [postgre] FATAL: password authentication failed for user

> See [[postgres in Docker] FATAL: password authentication failed for user 오류 해결](https://movefast.tistory.com/106)
