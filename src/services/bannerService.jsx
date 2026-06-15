import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

export const getBanners =
  async () => {
    const response =
      await axios.get(
        `${API_URL}/api/banners`
      );

    return response.data;
  };

export const createBanner =
  async (bannerData) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.post(
        `${API_URL}/api/banners`,
        bannerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const updateBanner =
  async (
    id,
    bannerData
  ) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(
        `${API_URL}/api/banners/${id}`,
        bannerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const deleteBanner =
  async (id) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.delete(
        `${API_URL}/api/banners/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };