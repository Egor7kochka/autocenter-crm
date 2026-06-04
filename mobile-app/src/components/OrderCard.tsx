import { View, Text } from "react-native";
import { Order } from "../types/order";

interface Props {
  order: Order;
}

export default function OrderCard({
  order,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        {order.title}
      </Text>

      <Text>
        Клиент: {order.full_name}
      </Text>

      <Text>
        Статус: {order.status}
      </Text>

      <Text>
        {order.price} €
      </Text>
    </View>
  );
}