#!/bin/bash

# load helper functions
source $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/helpers.sh

if [ -z "$CONTAINER_ID" ]
then
  # inform the user we can't ssh
  echo ' * Could not ssh because container is not running'
else
  # inform the user what's going on
  echo ' * Creating a shell in' $CONTAINER_ID

  # drop a shell in that container
  docker exec -it $CONTAINER_ID /bin/sh
fi
