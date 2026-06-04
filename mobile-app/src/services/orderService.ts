import { api } from "./api";

export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const createOrder = async (
  data: any
) => {
  const response = await api.post(
    "/orders",
    data
  );

  return response.data;
};
export const updateOrderStatus = async (
  id: number,
  status: string
) => {
  const response = await api.patch(
    `/orders/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};
export const getLatestOrders = async () => {
  const res = await api.get("/orders/latest");
  return res.data;
};
export const deleteOrder = async (
  id: number
) => {
  const response = await api.delete(
    `/orders/${id}`
  );

  return response.data;
};