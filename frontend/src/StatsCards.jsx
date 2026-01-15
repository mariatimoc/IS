import {useEffect,useState} from "react";

export default function StateCards(){


const[stats,setStats]=useState(null);

    useEffect(() =>{
        fetch("http://127.0.0.1:8000/patients/1/stats")
        .then(res=>res.json())
        .then(data=>setStats(data))
        .catch(err=>console.log("Eroare: " ,err));
    },[]);

    if(stats==null){
        return <p> Se incarca statisticile</p>;
    }
    


    return(
        <section>
            <h2>Statistici </h2>

            <ul>
                <li><strong>Temperatura minima:</strong> {stats.min_temp} C</li>
                <li>Temperatura maxima: {stats.max_temp} C</li>
                <li><strong>Temperatura medie:</strong> {stats.avg_temp.toFixed(2)} C </li>
            </ul>
        </section>
    )
}