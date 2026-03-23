import { useEffect, useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import type { FormValues } from "../../utils/FormTypes";
import BasicDetails from "../../globalModules/BasicDetails";
import AddressComponent from "../../globalModules/AddressComponent";
import ContactDetails from "../../globalModules/ContactDetails";
import WizardForms from "../../globalModules/WizardForms";
import { EmptyData } from "../../utils/EmptyData";
import { useRef } from "react";
import "@/Styles/InsuranceForm/InsuranceFormComponent.css"
import RelationshipToInsured from "../../globalModules/RelationshipToInsured";
import { Tooltip } from "react-tooltip";

const TAB_NAMES = [
  "Primary",
  "Secondary",
  "Tertiary",
  "Quaternary",
  "Quinary",
  "Senary",
  "Septenary",
  "Octonary",
  "Nonary",
  "Denary"
];

export default function InsuranceComponentSection() {
  const { control, formState: { errors }, watch, setValue, getValues } = useFormContext<FormValues>();
  const initialized = useRef(false);
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "insurances"
  });

  const [activeTab, setActiveTab] = useState(0);

  const handleAddInsurance = () => {
    if (fields.length >= 10) return;

    append(EmptyData);
    setActiveTab(fields.length);
  };

  const handleRemoveCurrent = () => {
    remove(activeTab);

    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleRemoveAll = () => {
    replace([]);
    setActiveTab(0);
  };

  const currentPrefix = `insurances.${activeTab}`;
  const relationship = watch(`${currentPrefix}.relationshipToInsured` as any);

  useEffect(() => {

    const patient = getValues("patient");

    if (relationship === "self") {

      if (!getValues(`${currentPrefix}.firstName` as any)) {

        if (!patient) return;

        setValue(`${currentPrefix}.firstName` as any, patient.firstName);
        setValue(`${currentPrefix}.middleName` as any, patient.middleName);
        setValue(`${currentPrefix}.lastName` as any, patient.lastName);
        setValue(`${currentPrefix}.dob` as any, patient.dob);
        setValue(`${currentPrefix}.sex` as any, patient.sex);
        setValue(`${currentPrefix}.ssn` as any, patient.ssn);
        setValue(`${currentPrefix}.address1` as any, patient.address1);
        setValue(`${currentPrefix}.address2` as any, patient.address2);
        setValue(`${currentPrefix}.city` as any, patient.city);
        setValue(`${currentPrefix}.state` as any, patient.state);
        setValue(`${currentPrefix}.zipcode` as any, patient.zipcode);
        setValue(`${currentPrefix}.phone` as any, patient.phone);
        setValue(`${currentPrefix}.email` as any, patient.email);
      }
    }


  }, [relationship, activeTab]);



  const existingInsurances = getValues("insurances");
  useEffect(() => {
    if (initialized.current) return;

    // EDIT MODE → already has insurance → do NOT append
    if (existingInsurances && existingInsurances.length > 0) {
      setActiveTab(0);
      initialized.current = true;
      return;
    }

    // ADD MODE → no insurance → append empty
    if (fields.length === 0) {
      append(EmptyData);
      setActiveTab(0);
    }

    initialized.current = true;

  }, [fields.length, append]);

  return (
    <div className="insurance-container">

      {/* Top Action Buttons */}
      <div className="insurance-actions">

        <button
          type="button"
          className="add-btn"
          onClick={handleAddInsurance}
          disabled={fields.length >= 10}
        >
          Add Insurance
        </button>

        {fields.length > 0 && (
          <button
            type="button"
            className="remove-btn"
            onClick={handleRemoveCurrent}
          >
            Remove Insurance
          </button>
        )}

        {fields.length > 0 && (
          <button
            type="button"
            className="remove-all-btn"
            onClick={handleRemoveAll}
          >
            Remove All
          </button>
        )}

      </div>

      {/* Tabs */}
      <div className="insurance-tabs">

        {fields.map((_, index) => (
          <div
            key={index}
            className={`tab-btn ${activeTab === index ? "active-tab" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {TAB_NAMES[index]}

            {errors?.insurances?.[index] && (
              <span className="tab-error"
                data-tooltip-content={"please fill required fields"}
              >!</span>
            )}

            {/* Remove icon */}
            <span
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                remove(index);

                if (activeTab >= index && activeTab > 0) {
                  setActiveTab(activeTab - 1);
                }
              }}
            >
              ✕
            </span>

          </div>
        ))}

      </div>

      {/* Insurance Form */}
      {fields.length > 0 && (
        <div className="insurance-form">

          <RelationshipToInsured control={control} prefix={currentPrefix} />

          <BasicDetails control={control} prefix={currentPrefix} />

          <AddressComponent
            control={control}
            errors={errors}
            prefix={currentPrefix}
          />

          <ContactDetails control={control} prefix={currentPrefix} />

          <WizardForms control={control} prefix={currentPrefix} />

        </div>
      )}

      <Tooltip anchorSelect=".tab-error" place="bottom" />

    </div>
  );
}