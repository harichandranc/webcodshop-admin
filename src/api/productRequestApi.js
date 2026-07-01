import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProductRequests = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/api/product-requests`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteProductRequest = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/api/product-requests/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};