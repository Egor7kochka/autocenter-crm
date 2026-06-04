import { View, Text } from "react-native";

interface Props {
  text: string;
}

export default function EmptyState({
  text,
}: Props) {
  return (
    <View
      style={{
        marginTop: 50,
        alignItems: "center",
      }}
    >
      <Text>{text}</Text>
    </View>
  );
}