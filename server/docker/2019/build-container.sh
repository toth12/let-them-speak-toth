#!/bin/bash

echo ' * Starting container with present data'

# run the server with already present data

docker run --rm -it -v "$(pwd)":/lts-app \
      -e LTS_AUTH_CODE=${LTS_AUTH_CODE} \
      --name letthemspeak \
      -p 7022:22 \
      -p 7082:7082 \
      -p 8080:8080 \
      -p 27017:27017 \
  letthemspeak /bin/sh -c \
  "rm -rf BlackLab && mv /blacklab/BlackLab . && \
  pip install -r requirements.txt && \
      npm install --no-optional && \
      npm run build
  rm -rf /etc/ssh/ssh_host_rsa_key /etc/ssh/ssh_host_dsa_key && \
      ssh-keygen -A && \
      mkdir -p /var/run/sshd && \
      /usr/sbin/sshd -e $@ & \
  mongod & \
  /usr/local/tomcat/bin/catalina.sh start & \
  npm run build-db
    gunicorn -b 0.0.0.0:7082 \
      --workers 1 \
      --threads 8 \
      --timeout 30 \
      --keep-alive 2 \
      --access-logfile - \
      --log-level=DEBUG server.app:app"

if [ $? -ne 0 ]; then
    echo ' ! Something went wrong. Have you run build-image.sh yet?'
fi