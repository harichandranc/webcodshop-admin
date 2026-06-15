import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

export const getSettings =
  async () => {
    const response =
      await axios.get(
        `${API_URL}/api/settings`
      );

    return response.data;
  };

export const updateSettings =
  async (settingsData) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(
        `${API_URL}/api/settings`,
        settingsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };