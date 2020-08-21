#!/usr/bin/env sh

docker container prune -f

docker run --rm -it \
-v "$(pwd)/prod-data/s3":/lts-app/prod-data/s3 \
-e LTS_AUTH_CODE=${LTS_AUTH_CODE} \
--name letthemspeak-app \
-p 7082:7082 \
letthemspeak-app /bin/sh -c "/bin/sh /lts-app/server/docker/2020/docker-local-bootstrap.sh"

# docker run --rm -it \
# -v "$(pwd)/prod-data/s3":/lts-app/prod-data/s3 \
# -v "$(pwd)/server/docker/2020":/lts-app/docker-2020 \
# -e LTS_AUTH_CODE=${LTS_AUTH_CODE} \
# --name letthemspeak-app \
# -p 7082:7082 \
# letthemspeak-app /bin/sh -c "/bin/sh docker-2020/docker-local-bootstrap.sh"