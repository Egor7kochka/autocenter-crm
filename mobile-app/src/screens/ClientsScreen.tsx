import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {
  getClients,
  deleteClient,
} from "../services/clientService";

import { Client } from "../types/client";

export default function ClientsScreen() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadClients();
    setRefreshing(false);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Удаление клиента",
      "Вы уверены?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteClient(id);

              setClients((prev) =>
                prev.filter(
                  (client) => client.id !== id
                )
              );
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const filteredClients = clients.filter((client) =>
    `${client.full_name}
     ${client.phone}
     ${client.car_brand}
     ${client.car_model}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F3F6FB",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F3F6FB",
      }}
    >
      <View
        style={{
          backgroundColor: "#1E3A8A",
          paddingTop: 60,
          paddingHorizontal: 20,
          paddingBottom: 25,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Клиенты
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 5,
          }}
        >
          Всего клиентов: {clients.length}
        </Text>

        <TouchableOpacity
          onPress={loadClients}
          style={{
            marginTop: 15,
            backgroundColor: "#fff",
            alignSelf: "flex-start",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#1E3A8A",
              fontWeight: "bold",
            }}
          >
            Обновить
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          padding: 20,
          flex: 1,
        }}
      >
        <TextInput
          placeholder="Поиск клиента..."
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: "#fff",
            padding: 15,
            borderRadius: 15,
            marginBottom: 20,
            fontSize: 16,
          }}
        />

        <FlatList
          data={filteredClients}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item) =>
            item.id.toString()
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#fff",
                padding: 18,
                borderRadius: 20,
                marginBottom: 15,
                elevation: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {item.full_name}
              </Text>

              <Text
                style={{
                  marginTop: 8,
                  color: "#475569",
                }}
              >
                📞 {item.phone}
              </Text>

              <Text
                style={{
                  color: "#475569",
                }}
              >
                🚗 {item.car_brand} {item.car_model}
              </Text>

              {item.email ? (
                <Text
                  style={{
                    color: "#475569",
                  }}
                >
                  ✉️ {item.email}
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={() =>
                  handleDelete(item.id)
                }
                style={{
                  marginTop: 15,
                  backgroundColor: "#EF4444",
                  padding: 12,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Удалить клиента
                </Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View
              style={{
                alignItems: "center",
                marginTop: 40,
              }}
            >
              <Text>
                Клиенты не найдены
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}