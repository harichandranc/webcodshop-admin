import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getProductRequests = async () => {
  const response = await API.get("/product-requests");
  return response.data;
};

export const deleteProductRequest = async (id) => {
  const response = await API.delete(`/product-requests/${id}`);
  return response.data;
};