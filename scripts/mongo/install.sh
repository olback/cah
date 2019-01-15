#!/bin/bash
set -e

mongo <<EOF
use admin
db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD');
use $MONGO_INITDB_ROOT_USERNAME
db.createUser({
  user:  '$MONGO_INITDB_ROOT_USERNAME',
  pwd: '$MONGO_INITDB_ROOT_PASSWORD',
  roles: [{
    role: 'dbOwner',
    db: '$MONGO_INITDB_ROOT_USERNAME'
  }]
})
EOF
