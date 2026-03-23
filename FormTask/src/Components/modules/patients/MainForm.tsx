
import Wizard from "./patientForm/components/modules/WizaedForms/Wizard";
import "@/Styles/GlobalModules/Global.css"
import "@/Styles/MainForm.css"


export default function MainForm(){
    return(
    
      <div className="app-container">
        <div className="app-card">

          <div className="app-header">
            <div>
            <h1>Patient Registration</h1>
            <p>Create a new patient profile</p>
            </div>

          </div>

          <Wizard />
        </div>
      </div>
   
    )
}