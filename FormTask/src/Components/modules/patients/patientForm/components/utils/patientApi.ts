import axios from "axios";

const API = "http://localhost:4000/patients";
// base URL for all patient APIs


// GET all patients
export const getPatientsApi = () =>
  axios.get(API);
// send GET request to API
// returns all patients


// ADD new patient
export const addPatientApi = (data: any) =>
  axios.post(API, data);
// POST request
// data = patient form data


// UPDATE patient by id
export const updatePatientApi = (
  id: number,
  data: any
) =>
  axios.put(`${API}/${id}`, data);
// PUT request
// update patient with id


// DELETE patient by id
export const deletePatientApi = (id: number) =>
  axios.delete(`${API}/${id}`);
// DELETE request
// remove patient

// GET patient by id
export const getPatientByIdApi = async (
  id: number
) => {
  const res = await axios.get(
    `${API}/${id}`
  );
  // get one patient

  return res.data;
};