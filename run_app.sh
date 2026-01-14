#!/bin/bash
set -e
OS="$(uname -s)"
docker-compose down -v
if [ "$OS" = "Linux" ]; then
    docker-compose build --no-cache frontend
    docker-compose build --no-cache backend
    docker-compose up -d
    sleep 5
    docker-compose exec db psql -U eitimoto_user -d eitimoto_db -c "CREATE EXTENSION IF NOT EXISTS vector;"
    docker-compose restart backend
elif [ "$OS" = "Darwin" ]; then
    docker-compose up -d
else
    docker-compose up -d
fi
