import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// ------------------- STUDENT -------------------
export const getStudents = () => axios.get(`${API_URL}/students`);
export const getStudentById = (id) => axios.get(`${API_URL}/students/${id}`);
export const createStudent = (data) => axios.post(`${API_URL}/students`, data);
export const updateStudent = (id, data) => axios.put(`${API_URL}/students/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API_URL}/students/${id}`);
export const loginStudent = (email, password) =>
  axios.post(`${API_URL}/login`, { email, password });
export const getStudentServices = (studentId) =>
  axios.get(`${API_URL}/students/${studentId}/services`);
export const getStudentApplications = (studentId) =>
  axios.get(`${API_URL}/students/${studentId}/applications`);

// ------------------- EMPLOYER -------------------
export const createEmployer = (data) =>
  axios.post(`${API_URL}/employers`, data);
export const loginEmployer = (email, password) =>
  axios.post(`${API_URL}/employer-login`, { email, password });
export const getEmployerById = (id) => axios.get(`${API_URL}/employers/${id}`);
export const getEmployerJobs = (id) => axios.get(`${API_URL}/employers/${id}/jobs`);
export const getEmployerApplications = (id) =>
  axios.get(`${API_URL}/employers/${id}/applications`);
export const updateEmployerProfile = (id, data) =>
  axios.put(`${API_URL}/employers/${id}`, data);
export const deleteEmployer = (id) =>
  axios.delete(`${API_URL}/employers/${id}`);

// ------------------- JOBS -------------------
export const getJobs = () => axios.get(`${API_URL}/jobs`);
export const getJobById = (id) => axios.get(`${API_URL}/jobs/${id}`);
export const createJob = (data) => axios.post(`${API_URL}/jobs`, data);
export const updateJob = (id, data) => axios.put(`${API_URL}/jobs/${id}`, data);
export const deleteJob = (id) => axios.delete(`${API_URL}/jobs/${id}`);

// ------------------- APPLICATIONS -------------------
export const createApplication = (data) => axios.post(`${API_URL}/applications`, data);
export const updateApplication = (id, data) => axios.put(`${API_URL}/applications/${id}`, data);
export const deleteApplication = (id) => axios.delete(`${API_URL}/applications/${id}`);
export const getApplications = () => axios.get(`${API_URL}/applications`);
export const getApplicationById = (id) => axios.get(`${API_URL}/applications/${id}`);
// ------------------- REQUESTS -------------------
export const createRequest = (data) => axios.post(`${API_URL}/requests`, data);
export const updateRequest = (id, data) => axios.put(`${API_URL}/requests/${id}`, data);
export const deleteRequest = (id) => axios.delete(`${API_URL}/requests/${id}`);
export const getRequests = () => axios.get(`${API_URL}/requests`);
