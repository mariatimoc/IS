from fastapi import FastAPI
from database import get_connection
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = [ "http://localhost:5173", "http://127.0.0.1:5173",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/patients")
def get_patients():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT id, name, age, code, salon FROM patients")
    results = cursor.fetchall()

    cursor.close()
    connection.close()

    return results

@app.get("/patients/{patient_id}/readings")
def get_readings(patient_id: int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT id, patient_id, heart_rate, temperature, timestamp" \
    "               FROM readings" \
    "               WHERE patient_id = %s" \
    "               ORDER BY timestamp ASC", (patient_id,),
    )
                
    results = cursor.fetchall()
    cursor.close()
    connection.close()

    return results

@app.get("/patients/{patient_id}/latest-reading")
def get_latest_reading(patient_id: int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT id, patient_id, heart_rate, temperature, timestamp" \
    "               FROM readings" \
    "               WHERE patient_id = %s" \
    "               ORDER BY timestamp DESC" \
    "               LIMIT 1", (patient_id,),
    )
                
    result = cursor.fetchone()
    cursor.close()
    connection.close()

    return result

@app.post("/readings")
def add_reading(data: dict):
    connection = get_connection()
    cursor = connection.cursor()

    patient_id = data["patient_id"]
    heart_rate = data["heart_rate"]
    temperature = data["temperature"]

    cursor.execute("INSERT INTO readings (patient_id, heart_rate, temperature) VALUES (%s, %s, %s)", (patient_id, heart_rate, temperature),)
    
    msg = None
    if heart_rate < 50:
        msg = "Puls prea mic"
    elif heart_rate > 100:
        msg = "Puls prea mare"

    if msg is not None:
        cursor.execute("INSERT INTO alerts (patient_id, message) VALUES (%s, %s)", (patient_id, msg),)

    if temperature < 35:
        msg = "Temperatura prea mica"
    elif temperature > 38:
        msg = "Temperatura prea mare"

    if msg is not None:
        cursor.execute("INSERT INTO alerts (patient_id, message) VALUES (%s, %s)", (patient_id, msg),)
    
    connection.commit()
    cursor.close()
    connection.close()

    return "Reading added successfully"

@app.get("/patients/{patient_id}/stats")
def get_stats(patient_id: int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT MIN(temperature) AS min_temp, MAX(temperature) AS max_temp, AVG(temperature) AS avg_temp \
                    FROM readings \
                    WHERE patient_id = %s", (patient_id,),
    )

    stats = cursor.fetchone()
    cursor.close()
    connection.close()

    return stats

@app.get("/alerts")
def get_alerts():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT alerts.id, patients.name AS patient, alerts.message, alerts.timestamp AS time \
                    FROM alerts \
                    JOIN patients ON alerts.patient_id = patients.id \
                    ORDER BY alerts.timestamp DESC"
    )

    results = cursor.fetchall()
    cursor.close()
    connection.close()

    return results
