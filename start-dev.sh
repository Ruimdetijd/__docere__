#!/usr/bin/env bash

# npm run build
docker-compose -p nineveh -f docker-compose-dev.yml up --build
