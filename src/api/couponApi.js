import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCoupons = async () => {
  const token =
    localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/api/coupons`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createCoupon = async (
  couponData
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/api/coupons`,
    couponData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateCoupon = async (
  couponId,
  couponData
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/api/coupons/${couponId}`,
    couponData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteCoupon = async (
  couponId
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/api/coupons/${couponId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};