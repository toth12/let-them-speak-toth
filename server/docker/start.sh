#!/bin/bash

echo ' * Starting container'

# Run the server with already present data
docker run -d -p 7082:7082 \
  -p 8080:8080 \
  -p 27017:27017 \
  letthemspeak /bin/sh -c \
  "mongod & \
  /usr/local/tomcat/bin/catalina.sh start & \
  gunicorn -b 0.0.0.0:7082 \
  --workers 1 \
  --threads 8 \
  --timeout 30 \
  --keep-alive 2 \
  --access-logfile - \
  --log-level=DEBUG server.app:app"

echo ' * The container is running on http://localhost:7082'
