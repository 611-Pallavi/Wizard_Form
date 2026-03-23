import { Controller } from "react-hook-form";

import { useNumberOnly } from "../hooks/useNumberOnly";
import FormLabel from "../utils/FormLabel";
import { MaxLength } from "../enum/MaxLength";

type Props = {
  control: any;
  prefix: string;
};

export default function ContactDetails({ control, prefix }: Props) {
  return (
    <>
      <h3>Contact Details</h3>

      <br /><br />
        <FormLabel
        htmlFor="pnum"
        label="Phone Number"
        required
      />
      <Controller
        name={`${prefix}.phone`}
        control={control}
        render={({ field, fieldState }) => {
          const { handleKeyDown, handlePaste, error } = useNumberOnly();
          return (
            <>
              <div className="field">
                <input
                  id="pnum"
                  autoComplete="new-password"
                  placeholder="9876543211"
                  {...field}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  maxLength={MaxLength.phonenumber}
                  
                />
              </div>

              {error && <p style={{ color: "orange" }}>{error}</p>}

              {fieldState.error && (
                <p style={{ color: "red" }} className="error">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )
        }}
      />

      <br /><br />
      <FormLabel
        htmlFor="email"
        label="Email"
        required
      />
      <Controller
        name={`${prefix}.email`}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className="field">
              <input
                type="email"
                autoComplete="new-password"
                id="Email"
                placeholder="Email"
                {...field}
               
              />
            </div>

            {fieldState.error && (
              <p style={{ color: "red" }} className="error">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />

      <br /><br />
      <label htmlFor="personalContact">Personal Contact :</label>
      <Controller
        name={`${prefix}.personalContact`}
        control={control}
        render={({ field, fieldState }) => {
          const { handleKeyDown, handlePaste, error } = useNumberOnly();
          return (
            <>
              <div className="field">
                <input
                  id="personalContact"
                  autoComplete="new-password"
                  placeholder="Personal Contact"
                  {...field}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                 maxLength={MaxLength.phonenumber}
                  
                />
              </div>

              {error && <p style={{ color: "orange" }}>{error}</p>}

              {fieldState.error && (
                <p style={{ color: "red" }} className="error">
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