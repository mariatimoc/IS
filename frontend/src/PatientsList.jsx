//const patients=[{id:1,name:"ion",salon: "101"}];
import {useEffect,useState} from "react";


export default function PatientsList(){

    const [patients,setPatients]=useState([]); //useState e folosit pt datele care se schimba
    
    //useEffect se executa automata cand se incarca pagina,ia pacientii din backend
    useEffect(() =>{
        fetch("http://127.0.0.1:8000/patients") //cere lista pacienti
        .then(res => res.json()) //converteste in format json
        .then(data=> setPatients(data)) 
        .catch(err=>console.log("Eroare:",err));


    },[]); //[] inseamna sa se repete o singura data cand pag se incarca 

    return (
        <section>
            <h2>Lista Pacientilor</h2>
            
            <ul> {/*urmeaza o lista*/}
            {
                patients.map((p) =>(
                    <li key={p.id}>
                        {p.name} -Salon {p.salon}
                    </li>
                ))
            }
        </ul>
    </section>
    );
}