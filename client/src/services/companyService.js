import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/companies`,
});

// Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getCompanies = async () => {
  const response = await API.get("/");
  return response.data;
};

export const createCompany = async (company) => {
  const response = await API.post("/", company);
  return response.data;
};

export const updateCompany = async (id, company) => {
  const response = await API.put(`/${id}`, company);
  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};