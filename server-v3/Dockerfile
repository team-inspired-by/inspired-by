FROM node:12

USER root
RUN mkdir -p /usr/src/app

VOLUME /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN apt update && apt install -y \
    libpq-dev \
    netcat
RUN npm install

# RUN ["ls", "-a"]
RUN chmod +x "docker-entrypoint.sh"
# RUN ["ls", "-la", "."]
# RUN ["pwd"]
# RUN cat package.json


ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
# ENTRYPOINT "./docker-entrypoint.sh"

EXPOSE 8080
EXPOSE 3000
