#!/usr/bin/env sh

# Fetch data from s3
s3 sync s3://fortunoff-secrets/lts/inputs/ server/inputs/

# Fetch the correct version of Tomcat

