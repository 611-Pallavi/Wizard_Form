

// import { createContext, useContext, useState, type ReactNode } from "react";
// import { type FormValues } from "../utils/FormTypes";

// type Insurance = {
//   provider: string;
//   policyNumber: string;
// };

// type WizardContextType = {
//   patients: FormValues[];
//   addPatient: (data: FormValues) => void;
//   removePatient: (index: number) => void;

//   insurances: Insurance[];
//   addInsurance: (insurance: Insurance) => void;
//   removeInsurance: (index: number) => void;
// };

// const WizardContext = createContext<WizardContextType | undefined>(undefined);

// export const WizardProvider = ({ children }: { children: ReactNode }) => {
//   const [patients, setPatients] = useState<FormValues[]>([]);
//   const [insurances, setInsurances] = useState<Insurance[]>([]);

//   const addPatient = (data: FormValues) => {
//     setPatients((prev) => [...prev, data]);
//   };

//   const removePatient = (index: number) => {
//     setPatients((prev) => prev.filter((_, i) => i !== index));
//   };

//   const addInsurance = (insurance: Insurance) => {
//     setInsurances((prev) => [...prev, insurance]);
//   };

//   const removeInsurance = (index: number) => {
//     setInsurances((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <WizardContext.Provider
//       value={{
//         patients,
//         addPatient,
//         removePatient,
//         insurances,
//         addInsurance,
//         removeInsurance,
//       }}
//     >
//       {children}
//     </WizardContext.Provider>
//   );
// };

// export const useWizard = () => {
//   const context = useContext(WizardContext);

//   if (!context) {
//     throw new Error("useWizard must be used inside WizardProvider");
//   }

//   return context;
// };

import { createContext, useContext, useState, type ReactNode } from "react";
import { type FormValues } from "../utils/FormTypes";

type Insurance = {
  provider: string;
  policyNumber: string;
};

type WizardContextType = {
  patients: FormValues[];
  addPatient: (data: FormValues) => void;
  removePatient: (index: number) => void;

  // ✅ added
  selectedIndex: number | null;
  setSelectedIndex: (i: number | null) => void;
  updatePatient: (index: number, data: FormValues) => void;

  insurances: Insurance[];
  addInsurance: (insurance: Insurance) => void;
  removeInsurance: (index: number) => void;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useState<FormValues[]>([]);
  const [insurances, setInsurances] = useState<Insurance[]>([]);

  // ✅ added
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const addPatient = (data: FormValues) => {
    setPatients((prev) => [...prev, data]);
  };

  const updatePatient = (index: number, data: FormValues) => {
    setPatients((prev) =>
      prev.map((p, i) => (i === index ? data : p))
    );
  };

  const removePatient = (index: number) => {
    setPatients((prev) => prev.filter((_, i) => i !== index));
  };

  const addInsurance = (insurance: Insurance) => {
    setInsurances((prev) => [...prev, insurance]);
  };

  const removeInsurance = (index: number) => {
    setInsurances((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <WizardContext.Provider
      value={{
        patients,
        addPatient,
        removePatient,

        selectedIndex,
        setSelectedIndex,
        updatePatient,

        insurances,
        addInsurance,
        removeInsurance,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);

  if (!context) {
    throw new Error("useWizard must be used inside WizardProvider");
  }

  return context;
};