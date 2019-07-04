#!/bin/bash

git pull

# Properly restart docker containers
docker-compose down
docker-compose up -d
