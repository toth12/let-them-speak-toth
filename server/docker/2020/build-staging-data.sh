#!/usr/bin/env bash

echo "* Creating docker image: 'letthemspeak-staging-data'";

# build the container 
docker build \
    --no-cache \
    --tag letthemspeak-staging-data:latest \
    --file lts-1-staging-data.Dockerfile\
    .
