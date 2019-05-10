#!/bin/bash

bash scripts/_common.sh
if [ $? -ne 0 ]; then
  exit -1
fi

# Build the Angular App
echo '- Building Angular App'
cd client
npm install
node_modules/.bin/ng build --prod
cd ..

# Create .env
cp -n .env.sample .env

# Generate random passwords and tokens
for i in `seq 1 2`; do
  R=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
  sed -i -e "0,/__PLACEHOLDER__/{s/__PLACEHOLDER__/$R/}" .env
done

# Start docker containers
docker-compose up -d

# Wait 30 seconds to make sure the containers are up and running
sleep 30

# Get the folder name, docker uses it as a prefix
DIR=$(basename $PWD)
NAME=${DIR//./}

# Execute setup scripts
docker exec $(docker ps | grep ${NAME}_postgres | rev | cut -d ' ' -f 1 | rev) "/bin/bash" "/scripts/install.sh"

# Restart the containers
docker-compose down
docker-compose up -d

PORT=$(cat .env | grep NODE_PORT | cut -b 11-15)
echo "Done. Running on port $PORT"
