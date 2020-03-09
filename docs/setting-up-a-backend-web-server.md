# Setting up a backend web server

- Author: Kim Jihyeong(KJHRicky@gmail.com)
- Written in Dec 5, 2019
- Modified in Mar 9, 2020

## Overview

This documents provides a way how to make a backend web server using `mongoDB`, `mongoose`, `apollo`, `docker-compose`, and `graphQL`.

## Steps

1. set up apollo-server & GraphiQL
1. run mongoDB
1. run apollo server with mongoose

### Set up postgreSQL

```bash
docker pull postgres
docker run -d -p 5432:5432 --name pgsql -e POSTGRES_PASSWORD=mysecretpassword postgres
docker volume create pgdata
docker run -d -p 5432:5432 --name pgsql -it --rm -v pgdata:/var/lib/postgresql/data postgres
docker exec -it pgsql bash
root@<container-id>:/# psql -U postgres
psql (10.3 (Debian 10.3-1.pgdg90+1))
Type "help" for help.
postgres=# CREATE DATABASE mytestdb;
CREATE DATABASE
postgres=#\q
```

### Alternative:

````bash
npm i -g prisma


### Set up apollo-server & GraphiQL

```bash
mkdir server
cd server
touch index.js
npm init -y
npm install apollo-server graphql mongoose dotenv --save
node .
````

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

## Developing steps

### First trial

#### Framework

- Mongoose

  - DB: mongo
  - Error: circular reference
  - tried `populate()`

```json
{
  0: ObjectId,
  1: ObjectId
}
```

```json
[
  0: {
  key: ''
},
  1: {
  key: ''
}]
```

- e.g.) when deleting one of Comments, cause error deleting comment in Post

- Prisma

  - DB: postgre
  - schema: `datamodel.prisma`
  -

Prisma.model({

})
