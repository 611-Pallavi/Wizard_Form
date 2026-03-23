import { createContext, useContext, useState,type ReactNode } from "react";

interface WizardContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
}

const PatientContext = createContext<WizardContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export function PatientProvider({ children }: ProviderProps) {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <PatientContext.Provider value={{ step, setStep, nextStep, prevStep }}>
      {children}
    </PatientContext.Provider>
  );
}

export const useWizard = () => {
  const context = useContext(PatientContext);

  if (!context) {
    throw new Error("useWizard must be used inside PatientProvider");
  }

  return context;
};