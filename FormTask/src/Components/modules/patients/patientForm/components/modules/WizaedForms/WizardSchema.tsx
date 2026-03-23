import * as yup from "yup";
import { personSchema } from "../../Validation/BaseSchema";

export const wizardSchema = yup.object({
  patient: personSchema,
  insurances: yup.array().of(personSchema).default([])
});