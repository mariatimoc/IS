/*const latestReading = {
  name: "Ion Popescu",
  temperature: 37.8,
  heartRate: 92,
  timestamp: "2025-11-19 20:30"
};
*/

import {useEffect,useState} from "react";

export default function LatestReadings(){

    const[latest,setLatest]=useState(null);

    useEffect(() =>{
        fetch("http://127.0.0.1:8000/patients/1/latest-reading")
        .then(res=>res.json())
        .then(data=>setLatest(data))
        .catch(err=>console.log("Eroare: " ,err));
    },[]);

    if(latest==null){
        return <p> Se incarca utlimele valori</p>;
    }
    

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
    