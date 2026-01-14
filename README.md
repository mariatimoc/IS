# Aplicatie eHealth – Monitorizare pacienti

Aplicatie web pentru monitorizarea valorilor vitale ale pacientilor.

## Functionalitati
1. Vizualizare lista pacienti
2. Selectare pacient
3. Trimitere masuratori pentru pacientul selectat
4. Vizualizare valori vitale pentru pacientul selectat
5. Vizualizare statistici
6. Vizualizare alerte

## Tehnologii
- Frontend: React (Vite)
- Backend: FastAPI (Python)
- Baza de date: MySQL

## Cerinte
- Node.js (recomandat: 18+)
- Python 3.10+
- MySQL Server

## Rulare (local)

### 1) Baza de date
1. Creeaza o baza de date (ex: `ehealth_db`)
2. Ruleaza scriptul SQL pentru tabele (ex: `create_tables.sql`)
3. Verifica datele de conectare din backend (host/user/parola/db)

### 2) Backend (FastAPI)
```bash
pip install fastapi uvicorn mysql-connector-python
uvicorn main:app --reload
```

Backend porneste de obicei la: http://127.0.0.1:8000

### 3) Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

Frontend porneste de obicei la: http://localhost:5173

## API (exemple)
- `GET /patients` – lista pacientilor
- `GET /patients/{id}/latest-reading` – ultima masuratoare a pacientului
- `GET /patients/{id}/stats` – statistici (min/max/medie)
- `GET /alerts` – lista alertelor (toti pacientii)
- `POST /readings` – inregistrare masuratoare (poate genera alerte)
