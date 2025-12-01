#!/bin/bash

echo "Running frontend..."
cd frontend && ./run_frontend.sh &
echo "Running backend..."
cd eitimoto-backend && ./run_backend.sh &

