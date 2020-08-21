#!/usr/bin/env

docker container prune -f 

rm -rf "prod-data"

docker run \
    -v "$(pwd)/server/inputs":/lts-app/server/inputs \
    -v "$(pwd)/prod-data/folia":/lts-app/folia-prod \
    -v "$(pwd)/prod-data/mongo":/data/db \
    -v "$(pwd)/prod-data/sys":/lts-app/prod-data/sys \
    -v "$(pwd)/server/docker/2020":/lts-app/docker-2020 \
    -e LTS_AUTH_CODE=${LTS_AUTH_CODE} \
    --name letthemspeak-app \
    letthemspeak-app /bin/sh -c "/bin/sh docker-2020/docker-build-db.sh"