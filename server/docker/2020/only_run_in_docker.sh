
# Exit if any command fails
set -e 

# Only run in Docker
# This method is described here:
#   https://tuhrig.de/how-to-know-you-are-inside-a-docker-container/
# and originated here:
#   http://stackoverflow.com/questions/23513045
running_in_docker() {
  awk -F/ '$2 == "docker"' /proc/self/cgroup | read
}

if running_in_docker; then
    echo "Running in Docker!"
else
    echo "Not running in Docker, byee!"
    exit 1
fi

echo "Proceeding with script"