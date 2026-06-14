import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async () => {
  const response = await axios.get(
    `${API_URL}/api/categories`
  );

  return response.data;
};

export const createCategory = async (
  categoryData
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/api/categories`,
    categoryData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateCategory = async (
  id,
  categoryData
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/api/categories/${id}`,
    categoryData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteCategory = async (
  id
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/api/categories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};