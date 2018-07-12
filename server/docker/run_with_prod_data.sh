#!/bin/bash

echo ' * Starting container with production data'

# run the server with already present data
docker run -d \
  -p 7022:22 \
  -p 7082:7082 \
  -p 8080:8080 \
  -p 27017:27017 \
  letthemspeak /bin/sh -c \
  "rm -rf /etc/ssh/ssh_host_rsa_key /etc/ssh/ssh_host_dsa_key && \
  ssh-keygen -A && \
  mkdir -p /var/run/sshd && \
  /usr/sbin/sshd -e $@ & \
  mongod & \
  /usr/local/tomcat/bin/catalina.sh start & \
  npm run fetch-prod-data && npm run build-db & \
  gunicorn -b 0.0.0.0:7082 \
  --workers 1 \
  --threads 8 \
  --timeout 30 \
  --keep-alive 2 \
  --access-logfile - \
  --log-level=DEBUG server.app:app"

echo ' * Building the database. Please visit http://localhost:7082'
