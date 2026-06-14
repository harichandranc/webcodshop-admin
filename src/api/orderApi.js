import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrders = async () => {
  const token =
    localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/api/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateOrderStatus =
  async (orderId, status) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response = await axios.put(
      `${API_URL}/api/orders/${orderId}/status`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };