#!/bin/bash

echo "--- Cleaning up port 3001 ---"
# macOS compatible port killer
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

echo "--- Rebuilding services ---"
docker-compose build --no-cache frontend backend

echo "--- Shutting down old containers ---"
docker-compose down -v --remove-orphans

echo "--- Starting Database ---"
docker-compose up -d db

echo "--- Waiting for Database to be ready ---"
# Loop until pg_isready returns 0
until docker-compose exec db pg_isready -U eitimoto_user -d eitimoto_db; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "--- Enabling Vector Extension ---"
docker-compose exec db psql -U eitimoto_user -d eitimoto_db -c "CREATE EXTENSION IF NOT EXISTS vector;"

echo "--- Starting remaining services ---"
docker-compose up -d

echo "--- Tailing Backend Logs ---"
docker-compose logs -f backend