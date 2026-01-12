#!/bin/bash

if ! command -v mvn &> /dev/null; then
	echo "Maven is not installed (sudo privileges required to install maven)"
	sudo apt-get install -y maven
	echo "Maven installed successfully"
fi

if ! command -v docker &> /dev/null; then
	echo "Docker is not installed (sudo privileges required to install docker)"
	sudo apt-get install -y docker.io

	systemctl start docker
	systemctl enable docker

	echo "Docker installed successfully"
fi

docker-compose up -d 
mvn spring-boot:run
