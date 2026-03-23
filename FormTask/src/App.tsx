import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WizardProvider } from "./Components/modules/patients/patientForm/components/Context/WizardContext";
import DataTable from "./Components/modules/patients/patientTable/DataTable";
import MainForm from "./Components/modules/patients/MainForm";


function App() {
  return (
    <WizardProvider>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<DataTable />} />
          <Route path="/form" element={<MainForm />} />
        </Routes>

      </BrowserRouter>

    </WizardProvider>
  );
}

export default App;