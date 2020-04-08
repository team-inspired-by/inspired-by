FROM node:12

USER root
RUN mkdir -p /usr/src/app

VOLUME /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN apt update && apt install -y \
    libpq-dev \
    netcat
# RUN apt install -y libpq-dev netcat
# RUN npm install --global @babel/cli
RUN npm install

# RUN ["ls", "-a"]
RUN chmod +x "docker-entrypoint.sh"
# RUN ["ls", "-la", "/usr/src/app/"]
# RUN ["pwd"]
# RUN cat package.json

# TODO: Change ["sh","*.sh"] to sh *.sh 
ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
# ENTRYPOINT "./docker-entrypoint.sh"

# EXPOSE 8080
EXPOSE 3000
