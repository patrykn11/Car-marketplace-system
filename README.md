# Eitimoto Car Marketplace

Eitimoto is a full-stack car marketplace application. It provides user authentication, car advertisement management, catalog browsing, favorites, comments, user profiles, chat, friend requests, statistics, and AI-assisted car searching.

## Tech Stack

- **Frontend:** React 19, Vite, React Router, Axios, Tailwind CSS, Vitest
- **Backend:** Java 21, Spring Boot 3.3, Spring Security, Spring Data JPA, WebSocket/STOMP
- **Database:** PostgreSQL 16 with pgvector
- **AI integration:** Spring AI with OpenAI embeddings
- **Infrastructure:** Docker, Docker Compose, Nginx

## Project Structure

```text
.
├── docker-compose.yml          # Full application stack
├── eitimoto-backend/           # Spring Boot REST API
│   ├── src/main/java/...       # Controllers, services, entities, repositories
│   ├── src/main/resources/     # Application config, schema and seed SQL
│   └── pom.xml                 # Maven project configuration
└── frontend/                   # React frontend
    ├── src/                    # Pages, components, contexts and API client
    ├── package.json            # NPM scripts and dependencies
    └── nginx.conf              # Production container config
```

## Prerequisites

- Docker and Docker Compose
- Java 21
- Maven or the included Maven wrapper
- Node.js and npm

Docker is the easiest way to run the complete system.

## Running with Docker Compose

From the repository root:

```bash
docker compose up --build
```

The services will be available at:

- Frontend: `http://localhost:8000`
- Backend API: `http://localhost:3333`
- PostgreSQL: `localhost:3001`

To stop the stack:

```bash
docker compose down
```
