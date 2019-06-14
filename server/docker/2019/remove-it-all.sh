#!/usr/bin/env bash

# Remove all traces of system!!

docker container stop letthemspeak
docker container prune --force
docker image rm letthemspeak
docker image prune --force