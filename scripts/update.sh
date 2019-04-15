#!/bin/bash

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

git pull

# Build the Angular App
echo '- Building Angular App'
cd client
npm install
ng build --prod
cd ..

docker-compose down
docker-compose up -d
