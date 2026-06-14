import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  const response = await axios.get(
    `${API_URL}/api/products`
  );

  return response.data;
};

export const createProduct = async (
  productData
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/api/products`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateProduct = async (
  productId,
  productData
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/api/products/${productId}`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteProduct = async (
  productId
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/api/products/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const uploadImage = async (
  file
) => {
  const token =
    localStorage.getItem("token");

  const formData = new FormData();

  formData.append("image", file);

  const response = await axios.post(
    `${API_URL}/api/upload/image`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const uploadDownloadFile =
  async (file) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await axios.post(
        `${API_URL}/api/upload/download`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };