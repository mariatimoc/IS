import {useState} from "react";

export default function AddVitalsForm({patientId,onAdded}) {
    const [temperature, setTemperature] = useState("");
    const [heartRate, setHeartRate] = useState("");
    const [status, setStatus] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        if (!patientId) return;

        setStatus("Se trimite...");

        try {
            const response = await fetch("http://127.0.0.1:8000/readings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    patient_id: patientId,
                    heart_rate: Number(heartRate),
                    temperature: Number(temperature),
                }),
            });

            if (!response.ok) throw new Error("Eroare la POST /readings");

            setStatus("Salvat");
            setTemperature("");
            setHeartRate("");
            onAdded?.();
        } catch (err) {
            console.log(err);
            setStatus("Eroare la salvare");
        }
    };

    return (
        <section>
            <h2>Adauga masuratoare</h2>
            {!patientId ? (<p>Selecteaza un pacient mai intai</p>
            ) : (
                <form onSubmit={submit} style={{display: "grid", gap: 8, maxWidth: 300}}>
                    <label>Temperatura (°C): <input type="number" step="0.1" value={temperature}
                                                    onChange={(e) => setTemperature(e.target.value)} required/> </label>
                    <label>Puls (bpm) : <input type="number" value={heartRate}
                                               onChange={(e) => setHeartRate(e.target.value)} required/> </label>
                    <button type="submit">Trimite</button>
                    {status && <span> {status} </span>}
                </form>
            )}
        </section>
    );
}