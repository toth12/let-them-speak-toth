#!/usr/bin/env bash

echo "* Creating docker image: 'letthemspeak-app'";

# build the container 
docker build \
    --tag letthemspeak-app:latest \
    --file lts-1-app.Dockerfile \
    .