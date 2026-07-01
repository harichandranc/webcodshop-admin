import api from "./api";

export const getProductRequests = async () => {
    const response = await api.get("/product-requests");
    return response.data;
};

export const deleteProductRequest = async (id) => {
    const response = await api.delete(`/product-requests/${id}`);
    return response.data;
};