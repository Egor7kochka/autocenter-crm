import { View, Text } from "react-native";

interface Props {
  title: string;
  value: number;
}

export default function StatCard({
  title,
  value,
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
      <Text>{title}</Text>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        {value}
      </Text>
    </View>
  );
}