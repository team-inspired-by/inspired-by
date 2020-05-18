# Setting up a backend server v2

- Written in Mar 10, 2020
- author: KJHRicky (kjhricky@gmail.com)

## Overview

Due to incompatibility of Prisma to arm-aarch architecture, we had to reconstruct backend server with node.js and sequelize

## TODOS

- set a Bearer expired date

## Start from modeling sequelize

- create working directory

```bash
mkdir ./server-v2
cd ./server-v2
npm init
```

- When npm init runs, put basic information of the package
- install npm packages

```bash
npm install express graphql express-graphql sequelize graphql-sequelize sequelize-graphql-schema pg sequelize-cli dotenv uuid --save
```

- Then, `package.json` should be in working directory now.

## Install Sequelize CLI and generate models

```bash
./node_modules/.bin/sequelize init
```

> Reason to execute sequelize by `./node_modules/.bin/sequelize ..`:
> Because sequelize-cli is installed in local project folder, we can't execute it by `sequelize`. To run by `sequelize` command, install it globally

### Define models and migration

#### Add `User` model

```bash
./node_modules/.bin/sequelize model:generate --name User --attributes userId:string,name:string,engName:string
```

#### Migrate

- We will run server on docker container, so **SKIP THIS STEP**

```bash
./node_modules/.bin/sequelize db:migrate
```

#### Seed data

- We can add initial data to User table using Seed in Sequelize CLI

```bash
./node_modules/.bin/sequelize seed:generate --name userData
```

- modify data in seeders/\*-userData.js such as:

```javascript
"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let date = new Date().toISOString();
    return queryInterface.bulkInsert("Users", [
      {
        userId: "administrator",
        name: "admin",
        engName: "admin",
        createdAt: date,
        updatedAt: date,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
```

- to apply this seed, put db:seed:all, but **SKIP THIS** to run in a docker container

```bash
./node_modules/.bin/sequelize db:seed:all
```

### Set up `config.js`

- In order to control all the private data to `.env`, rename `config.json` to `config.js` and modify to:

```javascript
require("dotenv").config();
const env = process.env;

module.exports = {
  development: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: "postgres",
  },
};
```

- write your own information to `.env`:

```env
DB_HOST=host.docker.internal
DB_USERNAME=your-own-key
DB_PASSWORD=your-own-key
DB_NAME=your-own-key
```

## Building sequalized docker image

- enable permission for docker:

```bash
sudo groupadd docker
sudo usermod -aG docker ${USER}
su -s ${USER}
```

- in `Dockerfile`:

```dockerfile
FROM node:8

USER root
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt update && apt install -y \
    libpq-dev \
    netcat
RUN npm install

COPY . .
RUN chmod +x "docker-entrypoint.sh"
VOLUME /usr/src/app

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]

EXPOSE 8080
EXPOSE 3000
```

> `ENTRYPOINT` using [''] format unrecommended, should find out a better way to code `ENTRYPOINT`

- in `docker-entrypoint.sh`:

```bash
echo "Waiting for postgres..."
while ! nc -z postgres-114 5432; do
    sleep 0.1
done
./node_modules/.bin/sequelize db:migrate
./node_modules/.bin/sequelize db:seed:all
echo "Server started"
node index.js
```

    - `netcat` is used to wait postgres server until loaded, and db migration is executed.

- in `docker-compose.yml`:

```yml
version: "3"
networks:
  app-tier:
    driver: bridge
services:
  backend:
    networks:
      - app-tier
    restart: always
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
      - "8080:8080"
    links:
      - postgres-114
    depends_on:
      - postgres-114
    volumes:
      - ./:/usr/src/app
      - /usr/src/app/node_modules
  postgres-114:
    networks:
      - app-tier
    image: postgres:11.4
    restart: always
    environment:
      POSTGRES_USER: sequelize_test
      POSTGRES_PASSWORD: sequelize_test
      POSTGRES_DB: sequelize_test
    ports:
      - "5432:5432"
    container_name: postgres-114
```

- docker-compose up:

```bash
docker-compose up -d --build
```

## Tips

### Using an environment variable for local sequalize config (json)

> See: (https://stackoverflow.com/questions/38757728/using-an-enviroment-variable-for-local-sequelize-configuration)

### Query Examples

```graphql
# mutation {
#   postEdit(Post:{
#     title: "0.054059139156701574"
#     ownerId: "4dda4e75-105d-43f7-a8ab-cad4a362f0d5"
#   }) {
#     title
#     ownerId
#   }
# }
query {
  postGet {
    title
    originalContents
    contents
    createdAt
    ownerId
    owner {
      id
      createdAt
      email
    }
  }
  userGet {
    id
    createdAt
    email
    writtenPostId
    Posts {
      title
      createdAt
    }
  }
}
```

### `@babel/polyfill`, `@babel/plugin-transform-runtime`, and `regenerator-runtime`

> See (https://programmingsummaries.tistory.com/401)
> See (https://babeljs.io/docs/en/babel-plugin-transform-runtime)

- I installed both due to core-js 3 issue

### hasOne vs belongsTo

- I'll write soon

### order in `/migration` is important

- I'll write soon

### hasMany should follow with belongsTo

> See:(https://stackoverflow.com/questions/38082938/sequelize-hasmany-join-association)
