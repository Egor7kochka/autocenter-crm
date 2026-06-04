import { View, Text } from "react-native";
import { Part } from "../types/part";

interface Props {
  part: Part;
}

export default function PartCard({
  part,
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
        {part.name}
      </Text>

      <Text>
        Количество: {part.quantity}
      </Text>

      <Text>
        Цена: {part.price} €
      </Text>

      <Text>
        Поставщик: {part.supplier}
      </Text>
    </View>
  );
}