#!/bin/bash

set -e

scripts/angular.sh

cd server
npm install
npm run ts:compile
cd ..

docker build -t olback/cah .
