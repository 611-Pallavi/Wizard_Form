import { Controller } from "react-hook-form";
import { useWizard } from "../Context/PatientContext";

type Props = {
  control: any;
  prefix: string;
};

export default function OtherDetails({ control, prefix }: Props) {
  const { step } = useWizard();

  const isActive = step === 1;

  return (
    <>
      {isActive && <h3>Other Details</h3>}

      <br /><br />

      <label htmlFor="languagePreferred">Language Prefered :</label>
      <Controller
        name={`${prefix}.languagePreferred`}
        control={control}
        render={({ field }) => (
          <>
            <select {...field} id="languagePreferred">
              <option value="" disabled> select</option>
              <option value="English">English</option>
              <option value="Chines">Chines</option>
              <option value="Korean">Korean</option>
              <option value="spanish">spanish</option>
            </select>
          </>
        )}
      />

      <label htmlFor="PatientStatus">Patient Status :</label>

      <Controller
        name={`${prefix}.PatientStatus`}
        control={control}
        render={({ field }) => (
          <>
            <select {...field} id="PatientStatus">
              <option value="" disabled> select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </>
        )}
      />
    </>
  );
}