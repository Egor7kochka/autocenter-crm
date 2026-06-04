import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextStyle,
} from "react-native";

import { getDashboardStats } from "../services/dashboardService";
import { API_URL } from "../constants/config";

export default function SettingsScreen() {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data =
        await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const testConnection = async () => {
    try {
      await getDashboardStats();

      Alert.alert(
        "Соединение",
        "Сервер доступен"
      );
    } catch {
      Alert.alert(
        "Ошибка",
        "Нет соединения с сервером"
      );
    }
  };
  const row: TextStyle = {
  fontWeight: "bold",
  marginBottom: 5,
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
          Настройки
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 5,
          }}
        >
          Информация о системе
        </Text>
      </View>

      <View
        style={{
          padding: 20,
        }}
      >
        {/* СТАТИСТИКА */}

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            📊 Статистика
          </Text>

          <Text style={row}>
            👥 Клиентов:{" "}
            {stats.totalClients || 0}
          </Text>

          <Text style={row}>
            📋 Заказов:{" "}
            {stats.totalOrders || 0}
          </Text>

          <Text style={row}>
            🔧 В работе:{" "}
            {stats.activeOrders || 0}
          </Text>

          <Text style={row}>
            ✅ Завершено:{" "}
            {stats.completedOrders || 0}
          </Text>
        </View>

        {/* СЕРВЕР */}

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            🌐 Сервер
          </Text>

          <Text style={row}>
            API:
          </Text>

          <Text
            style={{
              color: "#64748B",
              marginBottom: 10,
            }}
          >
            {API_URL}
          </Text>

          <Text style={row}>
            База данных:
          </Text>

          <Text
            style={{
              color: "#64748B",
            }}
          >
            PostgreSQL + Neon
          </Text>

          <TouchableOpacity
            onPress={testConnection}
            style={{
              marginTop: 15,
              backgroundColor: "#10B981",
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
              Проверить соединение
            </Text>
          </TouchableOpacity>
        </View>

        {/* ПРИЛОЖЕНИЕ */}

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            📱 Приложение
          </Text>

          <Text style={row}>
            Название:
          </Text>

          <Text
            style={{
              color: "#64748B",
              marginBottom: 10,
            }}
          >
            AutoCenter CRM
          </Text>

          <Text style={row}>
            Версия:
          </Text>

          <Text
            style={{
              color: "#64748B",
              marginBottom: 10,
            }}
          >
            v1.0
          </Text>

          <Text style={row}>
            Технологии:
          </Text>

          <Text
            style={{
              color: "#64748B",
            }}
          >
            React Native + Expo
          </Text>

          <Text
            style={{
              color: "#64748B",
            }}
          >
            Node.js + Express
          </Text>

          <Text
            style={{
              color: "#64748B",
            }}
          >
            PostgreSQL
          </Text>
        </View>

        {/* О ПРОЕКТЕ */}

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            🎓 О проекте
          </Text>

          <Text
            style={{
              color: "#64748B",
              lineHeight: 22,
            }}
          >
            CRM-система для
            автосервиса, разработанная
            в рамках дипломного
            проекта.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const row = {
  fontWeight: "bold",
  marginBottom: 5,
};