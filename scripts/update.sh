#!/bin/bash

bash scripts/_common.sh
if [ $? -ne 0 ]; then
  exit -1
fi

git pull

# Build the Angular App
echo '- Building Angular App'
cd client
npm install
node_modules/.bin/ng build --prod
cd ..

# Properly restart docker containers
docker-compose down
docker-compose up -d
