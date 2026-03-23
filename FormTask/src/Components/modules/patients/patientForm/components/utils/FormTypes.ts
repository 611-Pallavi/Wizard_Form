import * as yup from "yup";
import { wizardSchema } from "../modules/WizaedForms/WizardSchema";

export type FormValues = yup.InferType<typeof wizardSchema>;