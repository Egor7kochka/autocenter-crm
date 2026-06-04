import { api } from "./api";
import { Client, CreateClientDto } from "../types/client";

export const getClients = async (): Promise<Client[]> => {
  const response = await api.get("/clients");
  return response.data;
};

export const createClient = async (
  data: CreateClientDto
) => {
  const response = await api.post(
    "/clients",
    data
  );

  return response.data;
};
export const deleteClient = async (
  id: number
) => {
  const response = await api.delete(
    `/clients/${id}`
  );

  return response.data;
};