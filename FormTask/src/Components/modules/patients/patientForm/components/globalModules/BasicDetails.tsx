import { Controller, useFormContext } from "react-hook-form";
import { useAlphabetOnly } from "../hooks/validateAlpha";
import { useSSNInput } from "../hooks/useSSNInput";
import FormLabel from "../utils/FormLabel";
import { MaxLength } from "../enum/MaxLength";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { checkSSNExists } from "../utils/checkSSN";

type Props = {
  control: any;
  prefix: string;
  selectedIndex?: number | null;
};

export default function BasicDetails({ control, prefix, selectedIndex}: Props) {
   const { setError, clearErrors } = useFormContext();
  return (
    <>
        <FormLabel
        htmlFor="firstName"
        label="First Name"
        required
      />

      <Controller
        name={`${prefix}.firstName`}
        control={control}
        render={({ field, fieldState }) => {
          const { handleKeyDown, error } = useAlphabetOnly();

          return (
            <>
              <div className="field">
                <input
                  {...field}
                  placeholder="Enter First Name"
                  autoComplete="new-password"
                  maxLength={MaxLength.maxLength}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>

              {error && <p style={{ color: "orange" }}>{error}</p>}

              {fieldState.error && (
                <p style={{ color: "red" }}>{fieldState.error.message}</p>
              )}
            </>
          );
        }}
      />

      <br />
      <br />

      <label htmlFor="Mname">Middle Name :</label>

      <Controller
        name={`${prefix}.middleName`}
        control={control}
        render={({ field, fieldState }) => {
          const { handleKeyDown, error } = useAlphabetOnly();

          return (
            <>
              <div className="field">
                <input
                  {...field}
                  placeholder="Enter Middle Name"
                  id="Mname"
                maxLength={MaxLength.maxLength}
                  onKeyDown={handleKeyDown}
                  autoComplete="new-password"
                />
              </div>

              {error && <p style={{ color: "orange" }}>{error}</p>}

              {fieldState.error && (
                <p style={{ color: "red" }}>{fieldState.error.message}</p>
              )}
            </>
          );
        }}
      />

      <br />
      <br />

        <FormLabel
        htmlFor="lastName"
        label="Last Name"
        required
      />

      <Controller
        name={`${prefix}.lastName`}
        control={control}
        render={({ field, fieldState }) => {
          const { handleKeyDown, error } = useAlphabetOnly();

          return (
            <>
              <div className="field">
                <input
                  {...field}
                  placeholder="Enter Last Name"
                  id="Lname"
                  maxLength={MaxLength.maxLength}
                  onKeyDown={handleKeyDown}
                  autoComplete="new-password"
                />
              </div>

              {error && <p style={{ color: "orange" }}>{error}</p>}

              {fieldState.error && (
                <p style={{ color: "red" }}>{fieldState.error.message}</p>
              )}
            </>
          );
        }}
      />

      <br />
      <br />

        <FormLabel
        htmlFor="dob"
        label="Dob"
        required
      />

    <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Controller
    name={`${prefix}.dob`}
    control={control}
    render={({ field, fieldState }) => (
      <div className="field">
        <DatePicker
         
          value={field.value ? dayjs(field.value) : null}
          onChange={(newValue) => {
            field.onChange(newValue ? newValue.toISOString() : "");
          }}
          maxDate={dayjs()} // today max
          slotProps={{
            textField: {
              error: !!fieldState.error,
              helperText: fieldState.error?.message,
              fullWidth: true,
            },
          }}
        />
      </div>
    )}
  />
</LocalizationProvider>

      <br />
      <br />

        <FormLabel
        htmlFor="ssn"
        label="SSN"
        required
      />

      {/* <Controller
        name={`${prefix}.ssn`}
        control={control}
        render={({ field, fieldState }) => {
          const { handleKeyDown, handlePaste, error } = useSSNInput();

          return (
            <>
              <div className="field">
                <input
                  {...field}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  placeholder="123456789"
                  onChange={(e) => {
                    const cleanedValue = e.target.value.replace(/[^0-9-]/g, "");
                    field.onChange(cleanedValue);
                  }}
                />
              </div>

              {error && <p style={{ color: "orange" }}>{error}</p>}

              {fieldState.error && (
                <p style={{ color: "red" }}>{fieldState.error.message}</p>
              )}
            </>
          );
        }}
      /> */}

     

<Controller
  name={`${prefix}.ssn`}
  control={control}
  render={({ field, fieldState }) => {
    const { handleKeyDown, handlePaste, error } = useSSNInput();

    const handleBlur = async () => {
      console.log("checking", field.value);
      if (!field.value) return;

      const exists = await checkSSNExists(
  field.value,
  selectedIndex ?? undefined
);

      if (exists) {
        setError(`${prefix}.ssn`, {
          type: "manual",
          message: "SSN already registered",
        });
      } else {
        clearErrors(`${prefix}.ssn`);
      }
    };

    return (
      <>
        <div className="field">
          <input
          autoComplete="new-password"
            {...field}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder="123456789"
            onBlur={handleBlur}
            onChange={(e) => {
              const cleanedValue =
                e.target.value.replace(/[^0-9-]/g, "");
              field.onChange(cleanedValue);
            }}
          />
        </div>

        {error && <p style={{ color: "orange" }}>{error}</p>}

        {fieldState.error && (
          <p className="error" style={{ color: "red" }}>
            {fieldState.error.message}
          </p>
        )}
      </>
    );
  }}
/>

      <br />
      <br />

        <FormLabel
        htmlFor="sex"
        label="Sex"
        required
      />

      <Controller
        name={`${prefix}.sex`}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className="field">
              <select {...field}>
                <option value="" disabled>
                  select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            {fieldState.error && (
              <p style={{ color: "red" }} className="error">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </>
  );
};