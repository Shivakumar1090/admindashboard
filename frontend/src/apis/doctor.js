const BASE_URL = process.env.REACT_APP_DOMAIN;

const GET_DOCTORS = `${BASE_URL}/api/doctor/`;
const CREATE_DOCTOR = `${BASE_URL}/api/docauth/signup`;
const EDIT_DOCTOR = `${BASE_URL}/api/doctor/`;
const DELETE_DOCTOR = `${BASE_URL}/api/doctor/delete/`

export { GET_DOCTORS, CREATE_DOCTOR, EDIT_DOCTOR, DELETE_DOCTOR };