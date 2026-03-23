export const addressValidation = (prefix: string) => ({
  [`${prefix}.country`]: {
    required: "Country is required",
  },

  [`${prefix}.state`]: {
    required: "State is required",
  },

  [`${prefix}.zipcode`]: {
    minLength: {
      value: 5,
      message: "Invalid zipcode",
    },
  },
});