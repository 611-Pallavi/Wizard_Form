import * as yup from "yup";
import { personSchema } from "./BaseSchema";

export const patientSchema = personSchema;

export type PatientFormValues = yup.InferType<typeof personSchema>;