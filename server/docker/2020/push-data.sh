#!/usr/bin/env sh

#
# example usage specifying an aws profile to use:
#   AWS_PROFILE=s3-user bash push-data.sh
#

WORKDIR="$(pwd)"

# zip data if it's not zipped
mkdir -p prod-data/s3
if [ -f "prod-data/s3/mongo.zip" ]; then
    echo "mongo already zipped"
else
    echo "zipping mongo files"
    cd prod-data &&
        zip -qr s3/mongo.zip mongo/
    cd "$WORKDIR"
fi

if [ -f "prod-data/s3/lts.zip" ]; then
    echo "blacklab db already zipped";
else
    echo "zipping lts blacklab db"
    cd prod-data/folia &&
        zip -qr "$WORKDIR/prod-data/s3/lts.zip" lts/ 
    cd "$WORKDIR"
fi

echo Copying sys files
cp -r prod-data/sys prod-data/s3

# Display file sizes
ls -lah prod-data/s3

# Push production data to s3
echo "pushing data to s3"
#aws s3 sync prod-data/s3 s3://fortunoff-secrets/let-them-speak/prod-data --profile $AWS_PROFILE --dryrun