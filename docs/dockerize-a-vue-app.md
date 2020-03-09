# Dockerize a vue app

- Author: Kim Jihyeong(KJHRicky@gmail.com)
- Written in Mar 9, 2020

## Overview

This document gives a guide how to dockerize a vue app by adding some comments from [Vue.js - Dockerize Vue.js App](https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html)

## Steps

```docker
FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]
```

## Tips

### Execute docker without root permission

```bash
sudo usermod -aG docker $USER
```

## Troubleshoot

### Error: Cannot download "https://github.com/sass/node-sass/releases/download/v4.13.1/linux-*.node"

- node-sass@4.13.1 problem
- See: [TROUBLESHOOTING - 404 downloading bindingnode file](https://github.com/sass/node-sass/blob/master/TROUBLESHOOTING.md#404-downloading-bindingnode-file)

#### if Proxy Error:

- type:

```bash
export HTTP_PROXY=http://inspired-by.me:80
pm config set proxy http://inspired-by.me:8080
```
