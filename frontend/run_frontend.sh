#!/bin/bash

if ! command -v npm &> /dev/null; then
      	echo "NPM not installed (sudo privileges required)"
      	sudo apt-get install -y nodejs npm
	echo "NPM installed successfully"
fi

npm run dev

EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ] && [ $EXIT_CODE -ne 130 ]; then
	echo ""
	echo "Error while running frontend"
	echo "Initiating dependency reinstall"

	rm -rf node_modules package-lock.json

	echo "Reinstalling..."
	npm install

	echo "Trying to rerun frontend..."
	npm run dev
fi
