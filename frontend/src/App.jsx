import {useState} from "react";

import LatestReadings from "./LatestReadings";
import PatientsList from "./PatientsList";
import StatsCards from "./StatsCards";
import Alerts from "./Alerts";
import AddVitalsForm from "./AddVitalsForm";
import Buttons from "./Buttons";
import AllReadings from "./AllReadings";




 export default function App(){
     const [selectedPatientId, setSelectedPatientId] = useState(null);
     const [refreshKey, setRefreshKey] = useState(0);

     const [openAdd, setOpenAdd] = useState(false);
     const [openLatest, setOpenLatest] = useState(false);
     const [openAll, setOpenAll] = useState(false);
     const [openAlertsAll, setOpenAlertsAll] = useState(false);
     const [openAlertsPatient, setOpenAlertsPatient] = useState(false);
     const [openStats, setOpenStats] = useState(false);



     const actionBtnStyle = (disabled) => ({
      minWidth: 230,
      height: 44,
      padding: "0 16px",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.15)",
      background: disabled ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.9)",
      color: "white",
      fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: disabled ? "none" : "0 8px 20px rgba(0,0,0,0.25)",
      transition: "transform 120ms ease, background 120ms ease",
    });

  return (
    <div>
      <h1>Aplicatie eHealth</h1>

      <PatientsList
      selectedPatientId={selectedPatientId}
      onSelectPatient={(id) => setSelectedPatientId(id)}
      />

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          <button
            onClick={() => setOpenAdd(true)}
            disabled={!selectedPatientId}
            style={actionBtnStyle(!selectedPatientId)}
          >Adauga masuratoare
          </button>

          <button
          onClick={() => setOpenLatest(true)}
          disabled={!selectedPatientId}
          style={actionBtnStyle(!selectedPatientId)}
        >
          Ultimele valori masurate
        </button>


          <button
          onClick={() => setOpenAll(true)}
          disabled={!selectedPatientId}
          style={actionBtnStyle(!selectedPatientId)}
        >
          Istoric masuratori
        </button>


        <button
          onClick={() => setOpenAlertsAll(true)}
          style={actionBtnStyle(false)}
        >
          Alerte pacienti
        </button>


        <button
          onClick={() => setOpenAlertsPatient(true)}
          disabled={!selectedPatientId}
          style={actionBtnStyle(!selectedPatientId)}
        >
          Alerte pacient selectat
        </button>

        <button
          onClick={() => setOpenStats(true)}
          disabled={!selectedPatientId}
          style={actionBtnStyle(!selectedPatientId)}
        >
          Statistici pacient selectat
        </button>



      </div>


      <hr/>

        <Buttons title=""
            open={openAdd}
            onClose={() => setOpenAdd(false)}
        >
        <AddVitalsForm
            patientId={selectedPatientId}
            onAdded={() => {setRefreshKey((refreshKey) => refreshKey + 1);
            setOpenAdd(false);
            }}
        />
        </Buttons>

        <Buttons title=""
            open={openLatest}
            onClose={() => setOpenLatest(false)}
        >
            <LatestReadings patientId={selectedPatientId} refreshKey={refreshKey} />
        </Buttons>

        <Buttons title=""
        open={openAll}
        onClose={() => setOpenAll(false)}
        >
          <AllReadings patientId ={selectedPatientId} refreshKey={refreshKey} />
        </Buttons>


        <Buttons title=""
        open={openAlertsAll}
        onClose={() => setOpenAlertsAll(false)}
        >
          <Alerts refreshKey={refreshKey} />
        </Buttons>

        <Buttons title=""
        open={openAlertsPatient}
        onClose={() => setOpenAlertsPatient(false)}
        >
          <Alerts 
            patientId={selectedPatientId}
            refreshKey={refreshKey}
            title={`Alerte pacient ${selectedPatientId}`} />
        </Buttons>

        <Buttons title=""
        open={openStats}
        onClose={() => setOpenStats(false)}
        >
          <StatsCards patientId={selectedPatientId} refreshKey={refreshKey} />
        </Buttons>


      <hr />
      

    </div>
  );
 }