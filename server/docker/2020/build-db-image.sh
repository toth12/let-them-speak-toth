#!/usr/bin/env bash

echo "* Creating docker image: 'letthemspeak-db'";

# create an empty build context -<<EOF wasn't working
mkdir empty

# build the container 
docker build \
    --no-cache \
    --tag letthemspeak-db:latest \
    --file lts-2-db.Dockerfile\
    empty

rmdir empty