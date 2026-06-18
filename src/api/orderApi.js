import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

export const getOrders =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API_URL}/api/orders`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const downloadInvoice =
  async (orderId) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API_URL}/api/orders/${orderId}/invoice`,
        {
          responseType:
            "blob",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const url =
      window.URL.createObjectURL(
        new Blob([
          response.data,
        ])
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      `invoice-${orderId}.pdf`;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();
  };