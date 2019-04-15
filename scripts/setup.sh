#!/bin/bash

# Get node version
# NODE_MAJOR_VERSION=$(node -v | cut -b 2,3)
# if [ $NODE_MAJOR_VERSION != 10 ]; then
#   echo -e '\e[33mNode version 10 is higly recomended!\e[0m'
#   sleep 2
# else
#   echo -e '✔ \e[32mNode version OK\e[0m'
# fi

# Get NPM version
NPM_VERSION=$(npm -v | cut -b 1)
if [ $NPM_VERSION != 6 ]; then
  echo -e '\e[33mNPM version 6 or higher is higly recomended!\e[0m'
  sleep 2
else
  echo -e '\e[32m✔ NPM version OK\e[0m'
fi

# Make sure ng (Angular CLI is installed globaly)
NG=$(basename $(which ng))
if [[ $NG != "ng" ]]; then
  echo -e '\e[31m✘ Angular CLI not installed. Install with "npm install -g @angular/cli"\e[0m'
  exit -1
else
  echo -e '\e[32m✔ Angular CLI Installed\e[0m'
fi

# Make sure we have enough memory available for npm install (ugh)
MEMFREE=$(cat /proc/meminfo | grep MemFree | awk '{print $2}')
SWPFREE=$(cat /proc/meminfo | grep SwapFree | awk '{print $2}')
if [ $(($MEMFREE + $SWPFREE)) -lt 1000000 ]; then
  echo -e '\e[31m✘ Not enough memory available!\e[0m'
  exit -1
else
  echo -e '\e[32m✔ Enough memory\e[0m'
fi

# Build the Angular App
echo '- Building Angular App'
cd client
npm install
ng build --prod
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

# Execute setup scripts
docker exec $(docker ps | grep ${DIR}_postgres | rev | cut -d ' ' -f 1 | rev) "/bin/bash" "/scripts/install.sh"

# Restart the containers
docker-compose down
docker-compose up -d

PORT=$(cat .env | grep NODE_PORT | cut -b 11-15)
echo "Done. Running on port $PORT"
