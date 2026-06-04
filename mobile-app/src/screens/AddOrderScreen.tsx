import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";

import { getClients } from "../services/clientService";
import { createOrder } from "../services/orderService";

export default function AddOrderScreen() {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] =
    useState<any>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    if (!selectedClient) {
      Alert.alert(
        "Ошибка",
        "Выберите клиента"
      );
      return;
    }

    try {
      await createOrder({
        client_id: selectedClient.id,
        title,
        description,
        price: Number(price),
      });

      Alert.alert(
        "Успех",
        "Заказ успешно создан"
      );

      setTitle("");
      setDescription("");
      setPrice("");
      setSelectedClient(null);
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Ошибка",
        "Не удалось создать заказ"
      );
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F3F6FB",
      }}
    >
      {/* HEADER */}

      <View
        style={{
          backgroundColor: "#1E3A8A",
          paddingTop: 60,
          paddingBottom: 25,
          paddingHorizontal: 20,
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
          Новый заказ
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 5,
          }}
        >
          Создание ремонта для клиента
        </Text>
      </View>

      <View
        style={{
          padding: 20,
        }}
      >
        {/* SELECTED CLIENT */}

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 18,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#64748B",
              marginBottom: 6,
            }}
          >
            Выбранный клиент
          </Text>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {selectedClient
              ? selectedClient.full_name
              : "Не выбран"}
          </Text>

          {selectedClient && (
            <>
              <Text
                style={{
                  marginTop: 4,
                  color: "#64748B",
                }}
              >
                {selectedClient.phone}
              </Text>

              <Text
                style={{
                  color: "#64748B",
                }}
              >
                {selectedClient.car_brand}{" "}
                {selectedClient.car_model}
              </Text>
            </>
          )}
        </View>

        {/* CLIENTS */}

        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Клиенты
        </Text>

        <FlatList
          data={clients}
          scrollEnabled={false}
          keyExtractor={(item) =>
            item.id.toString()
          }
          renderItem={({ item }) => {
            const active =
              selectedClient?.id === item.id;

            return (
              <TouchableOpacity
                onPress={() =>
                  setSelectedClient(item)
                }
                style={{
                  backgroundColor: active
                    ? "#1E3A8A"
                    : "#fff",

                  borderRadius: 15,
                  padding: 14,
                  marginBottom: 10,

                  borderWidth: active
                    ? 2
                    : 1,

                  borderColor: active
                    ? "#1E40AF"
                    : "#E2E8F0",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: active
                      ? "#fff"
                      : "#111827",
                  }}
                >
                  {item.full_name}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    color: active
                      ? "#DBEAFE"
                      : "#64748B",
                  }}
                >
                  {item.phone}
                </Text>

                <Text
                  style={{
                    color: active
                      ? "#DBEAFE"
                      : "#64748B",
                  }}
                >
                  {item.car_brand}{" "}
                  {item.car_model}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* FORM */}

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
            marginTop: 10,
          }}
        >
          <TextInput
            placeholder="Название ремонта"
            value={title}
            onChangeText={setTitle}
            style={input}
          />

          <TextInput
            placeholder="Описание работ"
            value={description}
            onChangeText={setDescription}
            multiline
            style={{
              ...input,
              height: 100,
              textAlignVertical: "top",
            }}
          />

          <TextInput
            placeholder="Стоимость (€)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={input}
          />

          <TouchableOpacity
            onPress={handleCreate}
            style={{
              backgroundColor: "#1E3A8A",
              padding: 15,
              borderRadius: 12,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Создать заказ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const input = {
  backgroundColor: "#F8FAFC",
  borderWidth: 1,
  borderColor: "#E2E8F0",
  borderRadius: 12,
  padding: 14,
  marginBottom: 12,
};