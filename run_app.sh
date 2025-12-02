# add installation of docker in case of its abscence


# docker compose up if it exists

set -e

if [ "$EUID" -ne 0 ]; then
  echo "❌ Error: This script must be run as root. Try 'sudo ./setup_docker.sh'"
  exit 1
fi

echo "Checking Docker installation status..."

if command -v docker &> /dev/null; then
    echo "Docker is already installed."
else
    echo "Docker not found. Installing Docker now..."

    apt-get update

    apt-get install -y \
        ca-certificates \
        curl \
        gnupg

    install -m 0755 -d /etc/apt/keyrings

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg --yes
    chmod a+r /etc/apt/keyrings/docker.gpg

    echo \
      "deb [arch=\"$(dpkg --print-architecture)\" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      tee /etc/apt/sources.list.d/docker.list > /dev/null

    apt-get update

    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    echo "✅ Docker installed successfully."
fi

echo "Ensuring Docker service is running..."
systemctl enable docker
systemctl start docker

echo "Pulling PostgreSQL image..."
docker pull postgres

if [ -f "docker-compose.yml" ] || [ -f "docker-compose.yaml" ] || [ -f "compose.yml" ] || [ -f "compose.yaml" ]; then
    echo "🚀 Found compose file. Starting services..."

    docker-compose up --build

    if [ $? -eq 0 ]; then
        echo "✅ Containers started successfully!"
    else
        echo "❌ Failed to start containers."
        exit 1
    fi
else
    echo "⚠️  No 'docker-compose.yml' or 'compose.yaml' found in the current directory."
    echo "   Docker is installed and running, but no containers were started."
fi
