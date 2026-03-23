import { Controller, type Control } from "react-hook-form";
import { useWizard } from "../Context/PatientContext"
import { MaxLength } from "../enum/MaxLength";

interface Props {
  control: Control<any>;
  prefix: string;  
}

export default function PatientNotes({ control, prefix }: Props) {
  const { step } = useWizard();
  const isActive = step === 2;

  if (!isActive) return null;

  return (
    <>
      <h3>Patient Notes</h3>

      <label htmlFor="patientNotes">Notes :</label>

      <Controller
        name={`${prefix}.patientNotes`}   
        control={control}
        render={({ field, fieldState }) => {
          const charCount = field.value?.length || 0;

          return (
            <>
              <div className="field">
                <textarea
                  id="patientNotes"
                  rows={6}
                  maxLength={MaxLength.patientNotes}
                  style={{ width: "100%", padding: "8px" }}
                  placeholder="Enter notes here..."
                  {...field}
                />
              </div>

              <p style={{ fontSize: "12px", color: "gray" }}>
                {charCount} / 500 characters
              </p>

              {fieldState.error && (
                <p style={{ color: "red" }}>
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </>
  );
}