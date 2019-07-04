#!/bin/bash

# Update client
cd /var/www/cah.ninja
tar -xvzf .circleci/cah-dist.tar.gz client/dist/
rm .circleci/*.tar.gz

# Update server
scripts/update.sh
