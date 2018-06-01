#!/bin/bash

# load helper functions
source $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/helpers.sh

# drop a shell in that container
if [ -z "$CONTAINER_ID" ]
then
  echo ' ! The container is not running'
else
  docker stop $CONTAINER_ID

  # inform the user what's going on
  echo ' * Stopping container id' $CONTAINER_ID
fi
