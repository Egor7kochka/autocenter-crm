import { useEffect, useState } from "react";
import { getClients } from "../services/clientService";
import { Client } from "../types/client";

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  return {
    clients,
    loading,
    refresh: loadClients,
  };
};