import LatestReadings from "./LatestReadings";
import PatientsList from "./PatientsList";
import StateCards from "./StatsCards";
import Alerts from "./Alerts";

 export default function App(){
  return (
    <div>
      <h1>Aplicatie eHealth</h1>
      <PatientsList />
      <hr />

      <LatestReadings />
      <hr />

      <StateCards />
      <hr />
      
      <Alerts />
    </div>
  );
 }