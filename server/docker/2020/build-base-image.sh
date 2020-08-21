#!/usr/bin/env bash

echo "* Creating docker image: 'letthemspeak-base'";
mkdir empty

# build the container 
docker build \
    --no-cache \
    --tag letthemspeak-base:latest \
    --file lts-0-base.Dockerfile \
    empty

rmdir empty