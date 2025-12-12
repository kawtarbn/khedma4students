import axios from "axios";

const API_URL = "http://localhost:8000/api";

// ------------------- STUDENT -------------------
export const getStudents = () => axios.get(`${API_URL}/students`);
export const getStudentById = (id) => axios.get(`${API_URL}/students/${id}`);
export const createStudent = (data) => axios.post(`${API_URL}/students`, data);
export const updateStudent = (id, data) => axios.put(`${API_URL}/students/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API_URL}/students/${id}`);

// Student login
export const loginStudent = (email, password) =>
  axios.post(`${API_URL}/login`, { email, password });

// Student services
export const getStudentServices = (studentId) =>
  axios.get(`${API_URL}/students/${studentId}/services`);

// FIXED: Added missing function
export const getStudentApplications = (studentId) =>
  axios.get(`${API_URL}/students/${studentId}/applications`);

// ------------------- EMPLOYER -------------------

// Create new employer
export const createEmployer = (data) =>
  axios.post(`${API_URL}/employers`, data);

// Employer login
export const loginEmployer = (email, password) =>
  axios.post(`${API_URL}/employer-login`, { email, password });

// Get employer by ID
export const getEmployerById = (id) => axios.get(`${API_URL}/employers/${id}`);

// Get employer jobs
export const getEmployerJobs = (id) => axios.get(`${API_URL}/employers/${id}/jobs`);

// Get employer applications
export const getEmployerApplications = (id) =>
  axios.get(`${API_URL}/employers/${id}/applications`);

// Update employer profile
export const updateEmployerProfile = (id, data) =>
  axios.put(`${API_URL}/employers/${id}`, data);

// Delete employer (optional)
export const deleteEmployer = (id) =>
  axios.delete(`${API_URL}/employers/${id}`);