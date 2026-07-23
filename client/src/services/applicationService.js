import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/applications`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const applyToCompany = async (companyId) =>
  (await API.post(`/apply/${companyId}`)).data;

export const withdrawApplication = async (companyId) =>
  (await API.delete(`/withdraw/${companyId}`)).data;

export const getMyApplications = async () =>
  (await API.get("/my")).data;

export const getCompanyApplicants = async (companyId) =>
  (await API.get(`/company/${companyId}`)).data;

export const updateApplicationStatus = async (id, status) =>
  (await API.patch(`/${id}`, { status })).data;