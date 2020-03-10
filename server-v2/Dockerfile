FROM node:8

ENV DOCKERIZE_VERSION v0.2.0
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \  
# && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

USER root
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt update && apt install -y \
    libpq-dev \
    netcat
RUN npm install
# RUN npm install --save \
#     express \
#     graphql \
#     express-graphql \
#     sequelize \
#     graphql-sequelize \
#     sequelize-graphql-schema \
#     pg

COPY . .

RUN ["ls", "-a"]
RUN chmod +x "docker-entrypoint.sh"
RUN ["ls", "-la", "."]
RUN ["pwd"]

VOLUME /usr/src/app

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
# ENTRYPOINT "./docker-entrypoint.sh"

EXPOSE 8080
EXPOSE 3000
