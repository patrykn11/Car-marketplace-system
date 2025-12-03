# 🚗 Eitimoto - Platforma ogłoszeń motoryzacyjnych

> **PAP2025Z-Z02** - Projekt zespołowy

## 👥 Zespół

| Imię i nazwisko |
|-----------------|
| Adrian Werel |
| Julian Jarosz |
| Paweł Kozikowski |
| Patryk Nisgorski |

---

## 🚀 Szybki start

### Wymagania
- **Docker & Docker Compose** - to wszystko!

> Nie potrzebujesz instalować Javy, Node.js ani PostgreSQL - wszystko działa w kontenerach.

### Uruchomienie

Klonowanie repozytorium 

```bash
git clone https://gitlab-stud.elka.pw.edu.pl/jjarosz/pap2025z-z02.git
```

#### 🐧 Linux (Ubuntu/Debian)

```bash
sudo ./run_app.sh
```

> ⚠️ Skrypt wymaga `sudo`  
> 💡 Jeśli nie masz Dockera, skrypt zainstaluje go automatycznie.

#### 🍎 macOS / 🪟 Windows / Inne systemy

Skrypt `run_app.sh` **nie zadziała** .Użyj Docker Compose bezpośrednio:

```bash
docker-compose up --build
```

> Wymaga wcześniejszej instalacji [Docker Desktop](https://www.docker.com/products/docker-desktop/).

---

Po uruchomieniu poczekaj 1-2 minuty na start wszystkich serwisów.

---

## 🌐 Dostęp do aplikacji

| Serwis | URL |
|--------|-----|
| Frontend | http://localhost:8000 |
| Backend API | http://localhost:3333/api |
| PostgreSQL | localhost:3000 |

---