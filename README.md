# Eitimoto - Platforma ogłoszeń motoryzacyjnych

> **PAP2025Z-Z02** - Projekt zespołowy

## Zespół

| Imię i nazwisko |
|-----------------|
| Adrian Werel |
| Julian Jarosz |
| Paweł Kozikowski |
| Patryk Nisgorski |

---

## Szybki start

### Wymagania
- **Docker & Docker Compose** 

### Uruchomienie

Klonowanie repozytorium 

```bash
git clone https://gitlab-stud.elka.pw.edu.pl/jjarosz/pap2025z-z02.git
```

#### Linux (Ubuntu/Debian)

```bash
./run_app.sh
```

#### macOS / Windows / Inne systemy

Skrypt `run_app.sh` **działa** . W alternatywie można użyć poniższego skrytpu:

```bash
docker-compose up --build
```

> Wymaga wcześniejszej instalacji [Docker Desktop](https://www.docker.com/products/docker-desktop/).

---

Po uruchomieniu należy poczekać 3-4 minuty na start wszystkich serwisów.

---

## Dostęp do aplikacji

| Serwis | URL |
|--------|-----|
| Frontend | http://localhost:8000 |
| Backend API | http://localhost:3333/api |
| PostgreSQL | localhost:3001 |

---
