

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PatientForm from "../patientForms/PatienFormComponent";
import InsuranceComponentSection from "../InsuranceForm/InsuranceFormComonent";
import { type FormValues } from "../../utils/FormTypes";
import { wizardSchema } from "./WizardSchema";
import { defaultPerson } from "../../utils/defaultData";
import { Tooltip } from "react-tooltip";
import type { FormType } from "../../utils/FormType";
import { useWizard } from "../../Context/WizardContext";
import "@/Styles/Wizard/Wizard.css";

import { getPatientByIdApi } from "@/Components/modules/patients/patientForm/components/utils/patientApi";

import {
  addPatientApi,
  updatePatientApi,
} from "@/Components/modules/patients/patientForm/components/utils/patientApi";
import { checkSSNExists } from "../../utils/checkSSN";

export default function Wizard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState<FormType>("patient");

  const [showInsuranceForm, setShowInsuranceForm] =
    useState(false);

  const [apiDefaultValues, setApiDefaultValues] =
    useState<any>(null);

  const {
    addPatient,
    updatePatient,
    patients,
    selectedIndex,
    setSelectedIndex,
  } = useWizard();

  // default values (keep same)
  const defaultValues =
    selectedIndex !== null
      ? patients[selectedIndex]
      : {
        patient: defaultPerson,
        insurances: [],
      };

  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(wizardSchema),
    defaultValues,
  });

  const {
    formState: { errors, isSubmitted, isDirty },

  } = methods;

  const hasPatientError =
    isSubmitted && !!errors.patient;

  const hasInsuranceError =
    isSubmitted && !!errors.insurances;

  const handleCancel = () => {
    setSelectedIndex(null);
    navigate("/");
  };

  const handleReset = () => {
    if(confirm("Are you sure to reset the page"))
    methods.reset(defaultValues);
  };



  const onSubmit = async (data: FormValues) => {

    if(confirm("Are you sure you want to submit"))
    {
    console.log(data);

    const ssn = data.patient.ssn;

    const exists = await checkSSNExists(
      ssn,
      selectedIndex ?? undefined
    );

    if (exists) {
      methods.setError("patient.ssn", {
        type: "manual",
        message: "SSN already registered",
      });

      return; //  stop submit
    }

    console.log(data);

    try {
      if (selectedIndex !== null) {
        // context update
        updatePatient(selectedIndex, data);

        // json update
        await updatePatientApi(
          selectedIndex,
          data
        );

        setSelectedIndex(null);
      } else {
        // context add
        addPatient(data);

        // json add
        await addPatientApi(data);
      }
    } catch (err) {
      console.log("API error", err);
    }

    methods.reset({
      patient: defaultPerson,
      insurances: [],
    });

    setActiveTab("patient");

    setShowInsuranceForm(false);

    setTimeout(() => {
      methods.setFocus("patient.firstName");

      const el = document.querySelector(
        'input[name="patient.firstName"]'
      );

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 200);
  }
  };

  // ---------------- LOAD API DATA ----------------

  useEffect(() => {
    if (selectedIndex !== null) {
      loadPatient(selectedIndex);
    }
  }, [selectedIndex]);

  const loadPatient = async (id: number) => {
    const data = await getPatientByIdApi(id);
    setApiDefaultValues(data);
  };

  useEffect(() => {
    if (apiDefaultValues) {
      methods.reset(apiDefaultValues);
    }
  }, [apiDefaultValues]);

  // ---------------- UI ----------------

  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      const fieldError = document.querySelector(".error");

      if (fieldError) {
        fieldError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }

      const tabError = document.querySelector(".tab-error");

      if (tabError) {
        tabError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [errors, isSubmitted]);

  return (
    <FormProvider {...methods}>
      <div>
        {/* NAVBAR */}
        <div className="wizard-navbar">
          <div className="wizard-tabs">
            <button
              type="button"
              onClick={() =>
                setActiveTab("patient")
              }
              className={
                activeTab === "patient"
                  ? "active-tab"
                  : ""
              }
            >
              Patient
              {hasPatientError && (
                <span
                  className="tab-error"
                  data-tooltip-content="Please fill the required fields"
                >
                  !
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("insurance")
              }
              className={
                activeTab === "insurance"
                  ? "active-tab"
                  : ""
              }
            >
              Insurance
              {hasInsuranceError && (
                <span
                  className="tab-error"
                  data-tooltip-content="Please fill the required fields"
                >
                  !
                </span>
              )}
            </button>
          </div>

          <div className="wizard-actions">
            <button
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>

            <button
              type="button"
              onClick={handleCancel}
            >
              X
            </button>
          </div>
        </div>

        <Tooltip
          anchorSelect=".tab-error"
          place="bottom"
          style={{
            backgroundColor: "red",
            color: "white",
          }}
        />

        {/* FORM */}

        <form
          autoComplete="off"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <input
            type="text"
            name="hidden"
            autoComplete="username"
            style={{ display: "none" }}
          />

          <input
            type="password"
            name="hidden-password"
            autoComplete="new-password"
            style={{ display: "none" }}
          />
          {activeTab === "patient" && (
            <PatientForm selectedIndex={selectedIndex} />
          )}

          {activeTab === "insurance" && (
            <div>
              {!showInsuranceForm ? (
                <button
                  type="button"
                  onClick={() =>
                    setShowInsuranceForm(true)
                  }
                >
                  Add Insurance
                </button>
              ) : (
                <InsuranceComponentSection />
              )}
            </div>
          )}

          <div className="wizard-submit">
            <button
              type="submit"
              disabled={!isDirty}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}