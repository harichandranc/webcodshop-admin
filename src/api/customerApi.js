import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCustomers =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API_URL}/api/customers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };