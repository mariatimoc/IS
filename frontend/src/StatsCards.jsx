import {useEffect,useState} from "react";

export default function StatsCards({ patientId, refreshKey }){


const[stats,setStats]=useState(null);

    useEffect(() =>{
        if (!patientId) return;

        fetch(`http://127.0.0.1:8000/patients/${patientId}/stats`)
        .then(res=>res.json())
        .then(data=>setStats(data))
        .catch(err=>console.log("Eroare: " ,err));
    },[patientId, refreshKey]);

    if(stats==null){
        return <p> Se incarca statisticile</p>;
    }

    const noData =
        stats.min_temp == null &&
        stats.max_temp == null &&
        stats.avg_temp == null &&
        stats.min_rate == null &&
        stats.max_rate == null &&
        stats.avg_rate == null;

    if(noData) {
        return (
            <section>
                <h2>Statistici</h2>
                    <p>Nu exista masuratori pentru acest pacient.</p>
            </section>
        );
    }

    return(
        <section>
            <h2>Statistici </h2>

            <ul>
                <li><strong>Temperatura minima:</strong> {stats.min_temp} C</li>
                <li><strong>Temperatura maxima:</strong> {stats.max_temp} C</li>
                <li><strong>Temperatura medie:</strong> {stats.avg_temp.toFixed(2)} C </li>
                <li><strong>Puls minim:</strong> {stats.min_rate} bpm </li>
                <li><strong>Puls maxim:</strong> {stats.max_rate} bpm </li>
                <li><strong>Puls mediu:</strong> {stats.avg_rate.toFixed(2)} bpm </li>
            </ul>
        </section>
    )
}