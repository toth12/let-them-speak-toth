# get the id of the let-them-speak container
get_container_id() {
  CONTAINER_ID=$(eval "docker ps | grep letthemspeak | awk '{print \$1}' ")
  # check if the CONTAINER_ID value is empty
  if [ -z "$CONTAINER_ID" ]
  then
    echo ' ! Please start the container then re-run this command.'
  else
    :
  fi
}

get_container_id
