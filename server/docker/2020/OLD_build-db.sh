#!/usr/bin/env bash

echo ' * Building the database'

docker run --rm -it -v "$(pwd)":/lts-app\
      -e LTS_AUTH_CODE=${LTS_AUTH_CODE} \
      --name letthemspeak-app \
      -p 7022:22 \
      -p 7082:7082 \
      -p 8080:8080 \
      -p 27017:27017 \
  letthemspeak-app /bin/sh -c \
  "mongod & \
  /usr/local/tomcat/bin/catalina.sh start & \
  npm run build-db"