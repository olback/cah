#!/bin/bash

for filename in /scripts/sql/*.psql; do
    psql -U $POSTGRES_USER -d $POSTGRES_USER -a -f $filename
done

for filename in /scripts/data/*.psql; do
    psql -U $POSTGRES_USER -d $POSTGRES_USER -a -f $filename
done
