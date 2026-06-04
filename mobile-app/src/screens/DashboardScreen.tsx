import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { getDashboardStats } from "../services/dashboardService";
import { getLatestOrders } from "../services/orderService";
import { formatStatus } from "../utils/formatStatus";

export default function DashboardScreen() {
  const [stats, setStats] = useState<any>({});
  const [latest, setLatest] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const statsData =
        await getDashboardStats();

      const latestData =
        await getLatestOrders();

      setStats(statsData);
      setLatest(latestData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#EEF3F8",
      }}
      contentContainerStyle={{
        padding: 16,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          backgroundColor: "#5B5FEF",
          padding: 24,
          borderRadius: 28,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          AutoCenter CRM
        </Text>

        <Text
          style={{
            color: "#D9DCFF",
            marginTop: 5,
          }}
        >
          Управление автосервисом
        </Text>

        <TouchableOpacity
          onPress={loadData}
          style={{
            marginTop: 15,
            backgroundColor: "#fff",
            alignSelf: "flex-start",
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "#5B5FEF",
              fontWeight: "bold",
            }}
          >
            Обновить
          </Text>
        </TouchableOpacity>
      </View>

      {/* БОЛЬШАЯ КАРТОЧКА */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 24,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: "#6B7280",
            marginBottom: 8,
          }}
        >
          Всего клиентов
        </Text>

        <Text
          style={{
            fontSize: 42,
            fontWeight: "bold",
          }}
        >
          {stats.totalClients || 0}
        </Text>
      </View>

      {/* ДВЕ КАРТОЧКИ */}
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <MiniCard
          color="#F59E0B"
          title="В работе"
          value={stats.activeOrders || 0}
        />

        <MiniCard
          color="#10B981"
          title="Готово"
          value={stats.completedOrders || 0}
        />
      </View>

      {/* ШИРОКАЯ КАРТОЧКА */}
      <View
        style={{
          backgroundColor: "#111827",
          borderRadius: 24,
          padding: 24,
          marginBottom: 25,
        }}
      >
        <Text
          style={{
            color: "#9CA3AF",
          }}
        >
          Всего заказов
        </Text>

        <Text
          style={{
            color: "#fff",
            fontSize: 38,
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          {stats.totalOrders || 0}
        </Text>
      </View>

      {/* ЗАКАЗЫ */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        Последние заказы
      </Text>

      {latest.map((order) => (
        <View
          key={order.id}
          style={{
            backgroundColor: "#fff",
            borderRadius: 22,
            padding: 18,
            marginBottom: 12,
            borderLeftWidth: 6,
            borderLeftColor:
              order.status === "done"
                ? "#10B981"
                : "#F59E0B",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {order.title}
          </Text>

          <Text
            style={{
              marginTop: 6,
              color: "#6B7280",
            }}
          >
            {order.full_name}
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            {formatStatus(order.status)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

function MiniCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        padding: 20,
        borderRadius: 22,
      }}
    >
      <Text
        style={{
          color: "#fff",
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color: "#fff",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 5,
        }}
      >
        {value}
      </Text>
    </View>
  );
}