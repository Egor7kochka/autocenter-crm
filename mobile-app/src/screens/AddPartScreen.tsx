import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import { createPart } from "../services/partService";

export default function AddPartScreen() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");

  const handleSave = async () => {
    try {
      await createPart({
        name,
        quantity: Number(quantity),
        price: Number(price),
        supplier,
      });

      Alert.alert(
        "Успех",
        "Запчасть успешно добавлена"
      );

      setName("");
      setQuantity("");
      setPrice("");
      setSupplier("");
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Ошибка",
        "Не удалось добавить запчасть"
      );
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F3F6FB",
      }}
    >
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
          Новая запчасть
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 5,
          }}
        >
          Добавление товара на склад
        </Text>
      </View>

      <View
        style={{
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
            elevation: 3,
          }}
        >
          <TextInput
            placeholder="Название запчасти"
            value={name}
            onChangeText={setName}
            style={input}
          />

          <TextInput
            placeholder="Количество"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={input}
          />

          <TextInput
            placeholder="Цена (€)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={input}
          />

          <TextInput
            placeholder="Поставщик"
            value={supplier}
            onChangeText={setSupplier}
            style={input}
          />

          <TouchableOpacity
            onPress={handleSave}
            style={{
              backgroundColor: "#1E3A8A",
              padding: 15,
              borderRadius: 12,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Добавить запчасть
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 20,
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 15,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            📦 Подсказка
          </Text>

          <Text
            style={{
              color: "#64748B",
              lineHeight: 22,
            }}
          >
            Указывайте актуальное количество деталей на складе,
            чтобы быстро отслеживать остатки в разделе
            «Запчасти».
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const input = {
  backgroundColor: "#F8FAFC",
  borderWidth: 1,
  borderColor: "#E2E8F0",
  borderRadius: 12,
  padding: 14,
  marginBottom: 12,
};