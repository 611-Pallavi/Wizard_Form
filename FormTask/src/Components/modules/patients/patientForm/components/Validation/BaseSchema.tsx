import * as yup from "yup";


export const personSchema = yup.object({
  firstName: yup.string()
    .required("name is required")
    .matches(/^[A-Za-z\s]+$/, {
      message: "Only letters are allowed",
    })
    .min(3, "minimum 3 characters")
    .max(100, "maximum length is 100")
    .trim(),

  middleName: yup.string().optional().max(100).trim(),

  lastName: yup.string()
    .required("last name is required")
    .max(100)
    .trim(),

  dob: yup
    .string()
    .required("Date of birth is required")
    .test("notInFuture", "DOB cannot be future", (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0,0,0,0);
      return selectedDate <= today;
    }),

  ssn: yup
    .string()
    .required("SSN number is required")
    .matches(
      /^(\d{9}|\d{3}-\d{3}-\d{3})$/,
      "SSN must be 9 digits (123456789) or formatted as 123-456-789"
    ),

 

  sex: yup.string().required("select your sex"),

address1: yup.string().trim(),
address2: yup.string().trim().optional(),
state: yup.string().trim(),
country:yup.string().trim(),
city: yup.string().trim(),

zipcode: yup
  .string()
  .trim()

  // Address group validation
  .test(
    "address-validation",
    "Complete all required address fields",
    function (value) {
      const { address1, address2, city,country, state } = this.parent;

      const isAddress1Filled = !!address1;
      const isAddress2Filled = !!address2;
      const isCityFilled = !!city;
      const isStateFilled = !!state;
      const iscountryFilled = !!country
      const isZipFilled = !!value;

      const anyFilled =
        isAddress1Filled ||
        iscountryFilled ||
        isAddress2Filled ||
        isCityFilled ||
        isStateFilled ||
        isZipFilled;

      // nothing filled
      if (!anyFilled) return true;

      // address2 alone should trigger error
      if (
        isAddress2Filled &&
        !isAddress1Filled &&
        !iscountryFilled &&
        !isCityFilled &&
        !isStateFilled &&
        !isZipFilled
      ) {
        return false;
      }

      // required fields
      if (!isAddress1Filled || !isCityFilled || !isStateFilled || !isZipFilled) {
        return false;
      }

      return true;
    }
  )

  // Zipcode format validation
  .test(
    "zipcode-format",
    "Zipcode must be 5 digits",
    function (value) {
      if (!value) return true; // handled in address validation
      return /^\d{5}$/.test(value);
    }
  ),

  phone: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),

personalContact: yup
  .string()
  .transform((value) => (value === "" ? undefined : value))
  .matches(/^[0-9]{10}$/, "Personal contact must be 10 digits")
  .notRequired(),


  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address")
    .trim(),

  languagePreferred: yup.string(),

  patientStatus: yup.string(),

  fatherName: yup.string().trim(),

  fatherPhone: yup
    .string()
    .notRequired()
    .test("len","Must be 10 digits",(val)=>!val||/^[0-9]{10}$/.test(val)),

  motherName: yup.string().trim(),

  motherPhone: yup
    .string()
    .notRequired()
    .test("len","Must be 10 digits",(val)=>!val||/^[0-9]{10}$/.test(val)),

  spouseName: yup.string().trim().optional(),

  spousePhone: yup
    .string()
    .notRequired()
    .test("len","Must be 10 digits",(val)=>!val||/^[0-9]{10}$/.test(val)),

  patientNotes: yup.string().trim().optional().max(500),
});