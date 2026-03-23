import {
  Controller,
} from "react-hook-form";
import { useWizard } from "../Context/PatientContext";
import { useNumberOnly } from "../hooks/useNumberOnly";
import { useAlphabetOnly } from "../hooks/validateAlpha";
import { MaxLength } from "../enum/MaxLength";

type Props = {
  control: any;
  prefix: string;
};

export default function FamilyDetailsComponent({ control, prefix }: Props) {
  const { step } = useWizard();
  const isActive = step === 1;

  return (
    <>
      {isActive && <h3>Family Details</h3>}

      {/* Father Name */}
      <label htmlFor="fatherName">Father Name :</label>
      <Controller
        name={`${prefix}.fatherName`}
        control={control}
        render={({ field, fieldState }) => {
          const { handleKeyDown, error } = useAlphabetOnly();
          return(
          <>
            <div className="field">
              <input type="text" id="fatherName" {...field}
                 onKeyDown={handleKeyDown}
              autoComplete="off" />
            </div>
             {error && <p style={{ color: "orange" }}>{error}</p>}
            {fieldState.error && (
              <p style={{ color: "red" }}>
                {fieldState.error.message}
              </p>
            )}
          </>
          )
        }}
      />

      <br /><br />

      {/* Father Phone */}
      <label htmlFor="fatherPhone">Father Phone :</label>
      <Controller
        name={`${prefix}.fatherPhone`}
        control={control}
        render={({ field, fieldState }) => {
          const { handleKeyDown, handlePaste, error } = useNumberOnly();
          return (
            <>
              <div className="field">
                <input id="fatherPhone" {...field}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  maxLength={MaxLength.phonenumber}
                  autoComplete="off" />
              </div>
              {error && <p style={{ color: "orange" }}>{error}</p>}
              {fieldState.error && (
                <p style={{ color: "red" }}>
                  {fieldState.error.message}
                </p>
              )}
            </>
          )
        }}
      />

      <br /><br />

      {/* Mother Name */}
      <label htmlFor="motherName">Mother Name :</label>
      <Controller
        name={`${prefix}.motherName`}
        control={control}
        render={({ field, fieldState }) => {
          const { handleKeyDown, error } = useAlphabetOnly();
          return(
          <>
            <div className="field">
              <input type="text" id="motherName" {...field} 
                 onKeyDown={handleKeyDown}
              autoComplete="off" />
            </div>
             {error && <p style={{ color: "orange" }}>{error}</p>}
            {fieldState.error && (
              <p style={{ color: "red" }}>
                {fieldState.error.message}
              </p>
            )}
          </>
  )
        }}
      />

      <br /><br />

      {/* Mother Phone */}
      <label htmlFor="motherPhone">Mother Phone :</label>
      <Controller
        name={`${prefix}.motherPhone`}
        control={control}
        render={({ field, fieldState }) => {
          const { handleKeyDown, handlePaste, error } = useNumberOnly();

          return (
            <>
              <div className="field">
                <input id="motherPhone" {...field}
                maxLength={MaxLength.phonenumber}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  autoComplete="off" />
              </div>
              {error && <p style={{ color: "orange" }}>{error}</p>}
              {fieldState.error && (
                <p style={{ color: "red" }}>
                  {fieldState.error.message}
                </p>
              )}
            </>
          )
        }}
      />

      <br /><br />

      {/* Spouse Name */}
      <label htmlFor="spouseName">Spouse Name :</label>
      <Controller
        name={`${prefix}.spouseName`}
        control={control}
        render={({ field, fieldState }) => {
          const { handleKeyDown, error } = useAlphabetOnly();
          return(
          <>
            <div className="field">
              <input type="text" id="spouseName" {...field} 
                 onKeyDown={handleKeyDown}
              autoComplete="off" />
            </div>
             {error && <p style={{ color: "orange" }}>{error}</p>}
            {fieldState.error && (
              <p style={{ color: "red" }}>
                {fieldState.error.message}
              </p>
            )}
          </>
          )
        }}
      />

      <br /><br />

      {/* Spouse Phone */}
      <label htmlFor="spousePhone">Spouse Phone :</label>
      <Controller
        name={`${prefix}.spousePhone`}
        control={control}
        render={({ field, fieldState }) => {
          const { handleKeyDown, handlePaste, error } = useNumberOnly();
          return (
            <>
              <div className="field">
                <input id="spousePhone"
                maxLength={MaxLength.phonenumber}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  {...field} autoComplete="off" />
              </div>
              {error && <p style={{ color: "orange" }}>{error}</p>}
              {fieldState.error && (
                <p style={{ color: "red" }}>
                  {fieldState.error.message}
                </p>
              )}
            </>
          )
        }}
      />
    </>
  );
}