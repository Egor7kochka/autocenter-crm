import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "../screens/DashboardScreen";
import ClientsScreen from "../screens/ClientsScreen";
import OrdersScreen from "../screens/OrdersScreen";
import PartsScreen from "../screens/PartsScreen";
import AddClientScreen from "../screens/AddClientScreen";
import AddOrderScreen from "../screens/AddOrderScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AddPartScreen from "../screens/AddPartScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: any;
            if (route.name === "Dashboard") {
              iconName = "grid-outline";
            } else if (route.name === "Clients") {
              iconName = "people-outline";
            } else if (route.name === "Orders") {
              iconName = "document-text-outline";
            } else if (route.name === "Parts") {
              iconName = "construct-outline";
            } else if (route.name === "AddClient") {
              iconName = "person-add-outline";
            } else if (route.name === "AddOrder") {
              iconName = "add-circle-outline";
            } else if (route.name === "Settings") {
              iconName = "settings-outline";
            } else if (route.name === "AddPart") {
              iconName = "add-sharp";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: "#2563EB",
          tabBarInactiveTintColor: "#9CA3AF",
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: "Главная" }}
        />

        <Tab.Screen
          name="Clients"
          component={ClientsScreen}
          options={{ title: "Клиенты" }}
        />

        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          options={{ title: "Заказы" }}
        />

        <Tab.Screen
          name="Parts"
          component={PartsScreen}
          options={{ title: "Запчасти" }}
        />
        <Tab.Screen
  name="AddPart"
  component={AddPartScreen}
  options={{
    title: "Добавить запчасть",
  }}
/>

        <Tab.Screen
          name="AddClient"
          component={AddClientScreen}
          options={{ title: "Добавить" }}
        />

        <Tab.Screen
          name="AddOrder"
          component={AddOrderScreen}
          options={{ title: "Новый заказ" }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Настройки" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}