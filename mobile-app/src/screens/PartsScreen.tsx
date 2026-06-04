import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  getParts,
  deletePart,
} from "../services/partService";

export default function PartsScreen() {
  const [parts, setParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    try {
      const data = await getParts();
      setParts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadParts();
    setRefreshing(false);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Удаление",
      "Удалить запчасть?",
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
              await deletePart(id);
              await loadParts();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const getStockColor = (
    quantity: number
  ) => {
    if (quantity <= 3) {
      return "#EF4444";
    }

    if (quantity <= 10) {
      return "#F59E0B";
    }

    return "#10B981";
  };

  const getStockText = (
    quantity: number
  ) => {
    if (quantity <= 3) {
      return "Заканчивается";
    }

    if (quantity <= 10) {
      return "Средний запас";
    }

    return "В наличии";
  };

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
          Запчасти
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 5,
          }}
        >
          Всего позиций: {parts.length}
        </Text>

        <TouchableOpacity
          onPress={loadParts}
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

      <FlatList
        data={parts}
        keyExtractor={(item) =>
          item.id.toString()
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{
          padding: 20,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 18,
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
              🔩 {item.name}
            </Text>

            <Text
              style={{
                marginTop: 10,
                color: "#475569",
              }}
            >
              💶 Цена: {item.price} €
            </Text>

            <Text
              style={{
                marginTop: 5,
                color: "#475569",
              }}
            >
              🚚 Поставщик: {item.supplier}
            </Text>

            <Text
              style={{
                marginTop: 5,
                color: "#475569",
              }}
            >
              📦 Количество: {item.quantity}
            </Text>

            <View
              style={{
                alignSelf: "flex-start",
                marginTop: 12,
                backgroundColor:
                  getStockColor(
                    item.quantity
                  ) + "20",
                borderWidth: 1,
                borderColor:
                  getStockColor(
                    item.quantity
                  ),
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: getStockColor(
                    item.quantity
                  ),
                  fontWeight: "bold",
                }}
              >
                {getStockText(
                  item.quantity
                )}
              </Text>
            </View>

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
                Удалить
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              marginTop: 50,
              alignItems: "center",
            }}
          >
            <Text>
              Запчастей пока нет
            </Text>
          </View>
        }
      />
    </View>
  );
}