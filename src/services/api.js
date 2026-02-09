import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const usersAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/users`),
  getById: (id) => axios.get(`${API_BASE_URL}/users/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/users`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/users/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/users/${id}`)
};

export const companiesAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/companies`),
  getById: (id) => axios.get(`${API_BASE_URL}/companies/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/companies`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/companies/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/companies/${id}`)
};