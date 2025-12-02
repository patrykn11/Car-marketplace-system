#!/bin/bash

echo "Running frontend..."
cd frontend && sudo sh ./run_frontend.sh &
echo "Running backend..."
cd eitimoto-backend && sh sudo ./run_backend.sh &

