/*const alerts = [
  { id: 1, patient: "Ion Popescu", message: "Temperatură ridicată (38.9 °C)", time: "20:30" },
  { id: 2, patient: "Maria Ionescu", message: "Puls scăzut (45 bpm)", time: "19:50" },
];
*/


import { useEffect, useState } from "react";
export default function Alerts({ patientId = null, refreshKey = 0, title = "Alerte pacienti" }) {

    const [alerts,setAlerts]=useState([]);

    useEffect(() =>{
        const url = "http://127.0.0.1:8000/alerts" + (patientId ? `?patient_id=${patientId}` : "");

        fetch(url)
        .then(res=>res.json())
        .then(data=>setAlerts(data))
        .catch(err=>console.log("Eroare: " ,err));
    },[patientId, refreshKey]);

   
    const exportTxt=() =>{
        const content=alerts.map(a=> `${a.patient}: ${a.message} la ora ${a.time}`).join("\n");

        const blob =new Blob([content], { type: "text/plain;charset=utf-8"});

        const url=URL.createObjectURL(blob);
        const a=document.createElement("a");
        a.href=url;
        a.download = patientId ? `alerte_pacient_${patientId}.txt` : "alerte_pacienti.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <section>
            <h2> {title}</h2>

            <ul>
                {alerts.map(a=>(
                <li key={a.id}>
                    <strong>{a.patient}</strong> - {a.message} ({a.time?.replace("T", " ").slice(0, 16)})
                </li>
            ))}
            </ul>
            <button onClick={exportTxt}>Exporta in .txt</button>
        </section>
    )
}