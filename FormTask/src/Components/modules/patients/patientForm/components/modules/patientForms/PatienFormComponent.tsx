import { useFormContext } from "react-hook-form";
import type { FormValues } from "../../utils/FormTypes";
import "@/Styles/PatientForm/PatientFormComponent.css"
import BasicDetails from "../../globalModules/BasicDetails";
import AddressComponent from "../../globalModules/AddressComponent";
import ContactDetails from "../../globalModules/ContactDetails";
import WizardForms from "../../globalModules/WizardForms";

type Props = {
  selectedIndex: number | null;
};
export default function PatientFormComponent({
  selectedIndex,
}: Props) {

  const {
    control,
    formState: { errors }
  } = useFormContext<FormValues>();

  const prefix = "patient";

  return (
    <div className="form-container">

      <div className="form-section">
        <BasicDetails control={control} prefix={prefix} selectedIndex={selectedIndex} />
      </div>

      <div className="form-section">
        <AddressComponent control={control} errors={errors} prefix={prefix} />
      </div>

      <div className="form-section">
        <ContactDetails control={control} prefix={prefix} />
      </div>

      <div className="form-section">
        <WizardForms control={control} prefix={prefix} />
      </div>

    </div>
  );
}