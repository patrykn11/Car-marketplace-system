# PAP2025Z-Z02

## Skład zespołu:

1) Adrian Werel
2) Julian Jarosz
3) Paweł Kozikowski
4) Patryk Nisgorski

---

## Instrukcja uruchomienia projektu

### Wymagania:
- **Java 17+**
- **Maven**
- **Node.js & npm**
- **Docker & Docker Compose**
- **PostgreSQL** (przez Docker)

---

### 1. Uruchomienie bazy danych (PostgreSQL)

W folderze `eitimoto-backend`:

```bash
cd eitimoto-backend
docker-compose up -d
```

To uruchomi PostgreSQL w kontenerze Docker na porcie **3000**.

---

### 2. Uruchomienie backendu (Spring Boot)

W folderze `eitimoto-backend`:

```bash
cd eitimoto-backend
./mvnw spring-boot:run
```

Lub użyj skryptu:

```bash
./run_backend.sh
```

Backend uruchomi się na: **http://localhost:3333**

---

### 3. Uruchomienie frontendu (React + Vite)

W folderze `frontend`:

```bash
cd frontend
npm install
npm run dev
```

Lub użyj skryptu:

```bash
./run_frontend.sh
```

Frontend uruchomi się na: **http://localhost:5173**

---

### 4. Dostęp do aplikacji

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3333/api
- **PostgreSQL:** localhost:3000

---

### Szybkie uruchomienie (z głównego folderu)

Możesz też użyć głównego skryptu:

```bash
sudo sh ./run_app.sh
```