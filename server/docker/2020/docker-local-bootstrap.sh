#!/usr/bin/env sh

set -e

# Only run in Docker
running_in_docker() {
  awk -F/ '$2 == "docker"' /proc/self/cgroup | read
}

if running_in_docker; then
    echo "Running in Docker!"
else
    echo "Not running in Docker, byee!"
    exit 1
fi

echo Changing to s3 dir
    cd prod-data/s3

echo Copying war file
    ls sys
    cp sys/blacklab-server-1.7.3.war /usr/local/tomcat/webapps/

echo Copying blacklab config
    cp sys/blacklab-server.json /usr/local/tomcat/webapps/blacklab-server.json

echo Unzipping Folia data
    unzip -q lts.zip        && \
    echo Finished unzipping Folia data
echo Moving Folia data
    rm -rf /lts-app/lts && mv lts /lts-app/lts

echo Unzipping Mongo data
    unzip -q mongo.zip   && \
    echo Finished unzipping Mongo data
echo Moving Mongo data
    rm -rf /data/db && mv mongo /data/db

echo Starting Mongodb
    mongod & sleep 3

echo Starting Tomcat
    /usr/local/tomcat/bin/catalina.sh start

cd /lts-app
echo Starting LTS app
    gunicorn -b 0.0.0.0:7082 \
    --workers 1 \
    --threads 8 \
    --timeout 30 \
    --keep-alive 2 \
    --access-logfile - \
    --log-level=DEBUG server.app:app