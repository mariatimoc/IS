import {useState} from "react";

import LatestReadings from "./LatestReadings";
import PatientsList from "./PatientsList";
import StateCards from "./StatsCards";
import Alerts from "./Alerts";
import AddVitalsForm from "./AddVitalsForm";



 export default function App(){
     const [selectedPatientId, setSelectedPatientId] = useState(null);
     const [refreshKey, setRefreshKey] = useState(0);
  return (
    <div>
      <h1>Aplicatie eHealth</h1>

      <PatientsList
      selectedPatientId={selectedPatientId}
      onSelectPatient={(id) => setSelectedPatientId(id)}
      />

      <hr />
        <AddVitalsForm
            patientId={selectedPatientId}
            onAdded={() => setRefreshKey((refreshKey => refreshKey + 1))}
        />

      <LatestReadings patientId={selectedPatientId} refreshKey={refreshKey} />
      <hr />

      <StateCards patientId = {selectedPatientId} refreshKey={refreshKey} />
      <hr />
      
      <Alerts patientId = {selectedPatientId} refreshKey={refreshKey}/>
    </div>
  );
 }