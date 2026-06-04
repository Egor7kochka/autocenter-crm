import { api } from "./api";

export const getParts = async () => {
  const response = await api.get("/parts");
  return response.data;
};

export const createPart = async (
  data: any
) => {
  const response = await api.post(
    "/parts",
    data
  );

  return response.data;
};
export const deletePart = async (
  id: number
) => {
  const response = await api.delete(
    `/parts/${id}`
  );

  return response.data;
};