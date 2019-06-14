#!/bin/bash

echo ' * Starting container'

# Run gunicorn in existing container
docker stop letthemspeak;

docker start letthemspeak;

docker exec -it letthemspeak /bin/sh -c\
    "mongod & \
    /usr/local/tomcat/bin/catalina.sh start & \
    gunicorn -b 0.0.0.0:7082 \
    --workers 1 \
    --threads 8 \
    --timeout 30 \
    --keep-alive 2 \
    --access-logfile - \
    --log-level=DEBUG server.app:app";

echo ' * The container is running on http://localhost:7082'
