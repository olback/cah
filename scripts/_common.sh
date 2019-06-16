#!/bin/bash

EXIT_WITH_ERROR=0

# Get node version
NODE_MAJOR_VERSION=$(node -v | cut -b 2,3)
if [ $NODE_MAJOR_VERSION -lt 10 ]; then
  echo -e '\e[31m✘ Node version 10 is required!\e[0m'
  EXIT_WITH_ERROR=1 # Exit with error
else
  echo -e '\e[32m✔ Node version OK\e[0m'
fi

# Get NPM version
NPM_VERSION=$(npm -v | cut -b 1)
if [ $NPM_VERSION -lt 6 ]; then
  echo -e '\e[33m- NPM version 6 or higher is higly recomended!\e[0m'
else
  echo -e '\e[32m✔ NPM version OK\e[0m'
fi

# Make sure we have enough memory available for npm install (ugh)
MEMFREE=$(cat /proc/meminfo | grep MemFree | awk '{print $2}')
SWPFREE=$(cat /proc/meminfo | grep SwapFree | awk '{print $2}')
if [ $(($MEMFREE + $SWPFREE)) -lt 1000000 ]; then
  echo -e '\e[31m✘ Not enough memory available!\e[0m'
  EXIT_WITH_ERROR=1 # Exit with error
else
  echo -e '\e[32m✔ Enough memory\e[0m'
fi

if [ $EXIT_WITH_ERROR -ne 0 ]; then
  exit -1
fi
