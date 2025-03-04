#   - This script is used to update the Home Assistant Docker containers
#   - It will pull the latest images, check if the image ID has changed, and restart the container if needed
#   - It will also cleanup unused resources after the update    

# Original Repo: https://github.com/CCOSTAN/Home-AssistantConfig
# Follow me on https://www.vcloudinfo.com/click-here

#!/bin/bash

# Update system packages
sudo apt-get update && sudo apt-get upgrade -y

# Pull the latest images
docker-compose pull

# Get list of services from docker-compose.yml
EXISTING_SERVICES=$(docker-compose config --services)

# Get list of running service containers
RUNNING_CONTAINERS=$(docker-compose ps --services)

# Loop through each running service and check if its image has changed
for service in $RUNNING_CONTAINERS; do
    if echo "$EXISTING_SERVICES" | grep -qw "$service"; then
        # Get the current running image ID (remove sha256: prefix)
        CURRENT_IMAGE_ID=$(docker inspect --format='{{.Image}}' "$service" 2>/dev/null | sed 's/^sha256://')

        # Get the latest image ID from docker-compose
        LATEST_IMAGE_ID=$(docker-compose images -q "$service" 2>/dev/null)

        # If the image ID is different, restart the container
        if [ "$CURRENT_IMAGE_ID" != "$LATEST_IMAGE_ID" ] && [ -n "$LATEST_IMAGE_ID" ]; then
            echo "Updating container: $service"
            docker-compose stop "$service"
            docker-compose rm -f "$service"
            docker-compose up -d "$service"
        else
            echo "No update needed for: $service"
        fi
    else
        echo "Skipping non-existent service: $service"
    fi
done

# Cleanup unused resources
docker container prune -f
docker image prune -f
docker volume prune -f
