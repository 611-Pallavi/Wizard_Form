import * as yup from "yup";
import { personSchema } from "./BaseSchema";

export const insuranceSchema = yup.object({
  insurances: yup.array().of(personSchema).default([])
});

export type InsuranceFormValues = yup.InferType<typeof insuranceSchema>;