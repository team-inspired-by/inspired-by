# Setting up a backend web server

- Author: Kim Jihyeong(KJHRicky@gmail.com)
- Written in Dec 5, 2019

## Overview

This documents provides a way how to make a backend web server using `mongoDB`, `mongoose`, `apollo`, `docker-compose`, and `graphQL`.

## Steps

1. set up apollo-server & GraphiQL
1. run mongoDB
1. run apollo server with mongoose

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
