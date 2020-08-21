#!/usr/bin/env sh

# Script to run when the docker container starts up 
# in an EBS Docker context

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

# Copy files in from s3
# This requires the following env vars set in EBS to enable s3 authentication
#   https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html
#   AWS_ACCESS_KEY_ID
#   AWS_SECRET_ACCESS_KEY
echo Copying files from s3
    aws s3 sync s3://fortunoff-secrets/let-them-speak/prod-data prod-data/s3 

# The rest is the same as the local deploy
/bin/sh /lts-app/server/docker/2020/docker-local-bootstrap.sh