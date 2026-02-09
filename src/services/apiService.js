import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Create the api instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});



api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);



export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  },
};

export const usersAPI = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  create: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
  update: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export const companiesAPI = {
  getAll: async () => {
    const response = await api.get('/companies');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  },
  create: async (companyData) => {
    const response = await api.post('/companies/create', companyData);
    return response.data;
  },
  update: async (id, companyData) => {
    const response = await api.put(`/companies/update/${id}`, companyData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/companies/${id}`);
    return response.data;
  },
};

export const taxReturnsAPI = {
  getAll: async () => {
    const response = await api.get('/tax-returns');
    return response.data;
  },
  getByCompany: async (companyId) => {
    const response = await api.get(`/tax-returns/company/${companyId}`);
    return response.data;
  },
};

export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
  getActivity: async () => {
    const response = await api.get('/dashboard/activity');
    return response.data;
  },
  getRevenue: async () => {
    const response = await api.get('/dashboard/revenue');
    return response.data;
  },
};

export default api;