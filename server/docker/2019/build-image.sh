#!/usr/bin/env bash

echo " * Creating a docker image named 'letthemspeak'";

# build the container
docker build --no-cache --tag letthemspeak:latest --file Dockerfile .
