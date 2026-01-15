/*const latestReading = {
  name: "Ion Popescu",
  temperature: 37.8,
  heartRate: 92,
  timestamp: "2025-11-19 20:30"
};
*/

import {useEffect,useState} from "react";

export default function LatestReadings({ patientId, refreshKey }){

    const[latest,setLatest]=useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    if (!patientId) {
      setLatest(null);
      return;
    }
    setLoading(true);
        fetch(`http://127.0.0.1:8000/patients/${patientId}/latest-reading`)
        .then(res=>res.json())
        .then(data=>setLatest(data))
        .catch(err=>console.log("Eroare last reading: " ,err))
         .finally(() => setLoading(false));
    },[patientId, refreshKey]);

    if (!patientId) return <p>Selecteaza un pacient ca sa vezi ultima masuratoare.</p>;
    if (loading && latest == null) return <p>Se incarca ultimele valori...</p>;
    if (latest == null) return <p>Nu exista masuratori pentru acest pacient.</p>;
    

    return(
        <section>
            <h2>Ultimele valori vitale masurate</h2>

            <ul>
                <li>Temperatura: {latest.temperature} C</li>
                <li>Puls: {latest.heart_rate} bpm</li>
                <li>Ora ultimei masuratori: {latest.timestamp} </li>
            </ul>
        </section>
    );
}
    