#!/usr/bin/env bash

# restart the app by restarting gunicorn in a running container

docker exec letthemspeak kill -HUP 1