#!/bin/bash

pg_dump -U $POSTGRES_USER $POSTGRES_USER >> "/export/${POSTGRES_USER}.psql"
