import {useEffect,useState} from "react";

export default function StateCards(){


const[stats,setStats]=useState(null);

    useEffect(() =>{
        fetch("http://127.0.0.1:8000/stats/1")
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
                <li><strong>Temperatura minima:</strong> {min} C</li>
                <li>Temperatura maxima: {max} C</li>
                <li><strong>Temperatura medie:</strong> {average} C </li>
            </ul>
        </section>
    )
}