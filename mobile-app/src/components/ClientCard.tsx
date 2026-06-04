import { View, Text } from "react-native";
import { Client } from "../types/client";

interface Props {
  client: Client;
}

export default function ClientCard({
  client,
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
          fontSize: 18,
        }}
      >
        {client.full_name}
      </Text>

      <Text>{client.phone}</Text>

      <Text>
        {client.car_brand} {client.car_model}
      </Text>

      <Text>{client.email}</Text>
    </View>
  );
}