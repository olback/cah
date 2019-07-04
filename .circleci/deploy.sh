#!/bin/bash

# Update client
cd /var/www/cah.ninja
tar -xvzf .circleci/*.tar.gz client/dist/
# rm .circleci/*.tar.gz

# Update server
scripts/update.sh
