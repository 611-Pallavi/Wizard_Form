import { PatientProvider, useWizard } from "../Context/PatientContext";
import OtherDetails from "./OtherDetails";
import FamilyDetailsComponent from "./FamilyDetails";
import PatientNotes from "./PatientNotes";
import "@/Styles/Wizard/WizardForm.css"

  
interface Props {
  control: any;
  prefix: string;
}

function WizardInner({ control, prefix }: Props) {

  const { step, setStep } = useWizard();

  return (
    <div className="wizard-container">

      {/* <div className="wizard-tabs">

<button
  type="button"
  className={`wizard-tab ${step === 0 ? "active-tab" : ""}`}
  onClick={() => setStep(0)}
>
  Other Details
</button>

<button
  type="button"
  className={`wizard-tab ${step === 1 ? "active-tab" : ""}`}
  onClick={() => setStep(1)}
>
  Family Details
</button>

<button
  type="button"
  className={`wizard-tab ${step === 2 ? "active-tab" : ""}`}
  onClick={() => setStep(2)}
>
  Patient Notes
</button>

      </div> */}

      <div className="inner-wizard-tabs">

<button
  type="button"
  className={`inner-wizard-tab ${step === 0 ? "inner-active-tab" : ""}`}
  onClick={() => setStep(0)}
>
  Other Details
</button>

<button
  type="button"
  className={`inner-wizard-tab ${step === 1 ? "inner-active-tab" : ""}`}
  onClick={() => setStep(1)}
>
  Family Details
</button>

<button
  type="button"
  className={`inner-wizard-tab ${step === 2 ? "inner-active-tab" : ""}`}
  onClick={() => setStep(2)}
>
  Patient Notes
</button>

</div>

      <div className="wizard-content">
        {step === 0 && <OtherDetails control={control} prefix={prefix} />}
        {step === 1 && <FamilyDetailsComponent control={control} prefix={prefix} />}
        {step === 2 && <PatientNotes control={control} prefix={prefix} />}
      </div>

    </div>
  );
}

export default function WizardForms({ control, prefix }: Props) {
  return (
    <PatientProvider>
      <WizardInner control={control} prefix={prefix} />
    </PatientProvider>
  );
}