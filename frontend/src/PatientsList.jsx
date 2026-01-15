import {useEffect,useState} from "react";


export default function PatientsList({selectedPatientId,onSelectPatient}){

    const [patients,setPatients]=useState([]); //useState e folosit pt datele care se schimba
    const [loading,setLoading]=useState(true);
    
    //useEffect se executa automata cand se incarca pagina,ia pacientii din backend
    useEffect(() =>{
        setLoading(true);
        fetch("http://127.0.0.1:8000/patients")
        .then(res => res.json())
        .then(data=> setPatients(data))
        .catch(err=>console.log("Eroare pacienti:",err))
        .finally(()=>setLoading(false));


    },[]); //[] inseamna sa se repete o singura data cand pag se incarca 

    return (
        <section>
            <h2>Lista Pacientilor</h2>

            {loading ? (
                <p>Se incarca...</p>
            ):(
             <ul>
                 {patients.map((p) => (
                     <li
                        key={p.id}
                        onClick={() => onSelectPatient(p.id)}
                        style={{
                            cursor: "pointer",
                            fontWeight: p.id === selectedPatientId ? "bold" : "normal",
                            textDecoration: p.id === selectedPatientId ? "underline" : "none",
                            marginBottom: 6,
                        }}
                     >{p.name} (Varsta: {p.age}) -{p.code} -{p.salon}
                     </li>
                 ))}
             </ul>
            )}

            {selectedPatientId ==null && (
                <p style={{opacity :0.7}}> Selecteaza un pacient din lista</p>
            )}
        </section>
    );
}