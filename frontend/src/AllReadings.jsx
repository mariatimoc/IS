import { useEffect, useState } from "react";

export default function AllReadings({ patientId, refreshKey }) {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!patientId) {
      setReadings([]);
      return;
    }

    setLoading(true);
    fetch(`http://127.0.0.1:8000/patients/${patientId}/readings`)
      .then((res) => res.json())
      .then((data) => setReadings(data))
      .catch((err) => console.log("Eroare all readings: ", err))
      .finally(() => setLoading(false));
  }, [patientId, refreshKey]);

  if (!patientId) return <p>Selecteaza un pacient ca sa vezi toate masuratorile.</p>;
  if (loading && readings.length === 0) return <p>Se incarca masuratorile...</p>;
  if (!loading && readings.length === 0) return <p>Nu exista masuratori pentru acest pacient.</p>;

  return (
    <section>
      <h2>Toate valorile vitale masurate</h2>
      <table style= { { width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>Temperatura (°C)</th>
            <th style={th}>Puls (bpm)</th>
            <th style={th}>Data</th>
          </tr>
        </thead>
        <tbody>
          {readings.map((r) => (
            <tr key={r.id}>
              <td style={td}>{r.temperature}</td>
              <td style={td}>{r.heart_rate}</td>
              <td style={td}>{r.timestamp?.replace("T", " ").slice(0, 16)}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

const th = { textAlign: "left", padding: "8px", borderBottom: "1px solid rgba(0,0,0,0.15)" };
const td = { padding: "8px", borderBottom: "1px solid rgba(0,0,0,0.08)" };
