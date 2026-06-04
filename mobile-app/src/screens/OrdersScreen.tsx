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
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../services/orderService";

import { formatStatus } from "../utils/formatStatus";

const statuses = [
  {
    key: "in_progress",
    label: "В работе",
    color: "#3B82F6",
  },
  {
    key: "waiting_parts",
    label: "Ожидание",
    color: "#F59E0B",
  },
  {
    key: "done",
    label: "Готово",
    color: "#10B981",
  },
];

export default function OrdersScreen() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [expandedId, setExpandedId] =
    useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Удаление заказа",
      "Удалить этот заказ?",
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
              await deleteOrder(id);
              await loadOrders();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const changeStatus = async (
    id: number,
    status: string
  ) => {
    try {
      await updateOrderStatus(id, status);
      await loadOrders();
    } catch (error) {
      console.log(error);
    }
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
          Заказы
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 5,
          }}
        >
          Всего заказов: {orders.length}
        </Text>

        <TouchableOpacity
          onPress={loadOrders}
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
        contentContainerStyle={{
          padding: 20,
        }}
        data={orders}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => {
          const expanded =
            expandedId === item.id;

          return (
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
                🔧 {item.title}
              </Text>

              <Text
                style={{
                  marginTop: 8,
                  color: "#475569",
                }}
              >
                👤 {item.full_name}
              </Text>

              <Text
                style={{
                  marginTop: 5,
                  color: "#475569",
                }}
              >
                💶 {item.price} €
              </Text>

              <View
                style={{
                  marginTop: 10,
                  alignSelf: "flex-start",
                  backgroundColor: "#EEF2FF",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    color: "#4338CA",
                  }}
                >
                  {formatStatus(item.status)}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  setExpandedId(
                    expanded
                      ? null
                      : item.id
                  )
                }
                style={{
                  marginTop: 12,
                }}
              >
                <Text
                  style={{
                    color: "#2563EB",
                    fontWeight: "bold",
                  }}
                >
                  {expanded
                    ? "Скрыть детали"
                    : "Показать детали"}
                </Text>
              </TouchableOpacity>

              {expanded && (
                <View
                  style={{
                    marginTop: 12,
                    padding: 12,
                    backgroundColor: "#F8FAFC",
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginBottom: 6,
                    }}
                  >
                    Описание:
                  </Text>

                  <Text>
                    {item.description ||
                      "Описание отсутствует"}
                  </Text>

                  <Text
                    style={{
                      marginTop: 10,
                      color: "#64748B",
                    }}
                  >
                    ID заказа: {item.id}
                  </Text>
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 15,
                }}
              >
                {statuses.map((status) => {
                  const active =
                    item.status === status.key;

                  return (
                    <TouchableOpacity
                      key={status.key}
                      onPress={() =>
                        changeStatus(
                          item.id,
                          status.key
                        )
                      }
                      style={{
                        marginRight: 8,
                        marginBottom: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 20,
                        borderWidth: active
                          ? 2
                          : 1,
                        borderColor: status.color,
                        backgroundColor: active
                          ? `${status.color}20`
                          : "#fff",
                      }}
                    >
                      <Text
                        style={{
                          color: status.color,
                          fontWeight: "bold",
                        }}
                      >
                        {status.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
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
                  Удалить заказ
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Text>
              Заказов пока нет
            </Text>
          </View>
        }
      />
    </View>
  );
}