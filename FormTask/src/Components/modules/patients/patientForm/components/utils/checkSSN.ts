import axios from "axios";

export const checkSSNExists = async (
  ssn: string,
  currentId?: number
) => {

  const res = await axios.get(
    "http://localhost:4000/patients"
  );
  // get all patients

  const data = res.data;
  // axios data is inside res.data

  return data.some((u: any) => {

    // ignore same record while editing
    if (
      currentId !== undefined &&
      u.id === currentId
    ) {
      return false;
    }

    return u.patient?.ssn === ssn;
  });

};