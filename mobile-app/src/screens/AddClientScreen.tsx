import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import { createClient } from "../services/clientService";

export default function AddClientScreen() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");

  const handleSubmit = async () => {
    try {
      await createClient({
        full_name: fullName,
        phone,
        email,
        car_brand: carBrand,
        car_model: carModel,
      });

      Alert.alert(
        "Успех",
        "Клиент успешно добавлен"
      );

      setFullName("");
      setPhone("");
      setEmail("");
      setCarBrand("");
      setCarModel("");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Ошибка",
        "Не удалось создать клиента"
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
          Новый клиент
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 5,
          }}
        >
          Добавление клиента в базу
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
          }}
        >
          <TextInput
            placeholder="ФИО клиента"
            value={fullName}
            onChangeText={setFullName}
            style={input}
          />

          <TextInput
            placeholder="Телефон"
            value={phone}
            onChangeText={setPhone}
            style={input}
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={input}
          />

          <TextInput
            placeholder="Марка автомобиля"
            value={carBrand}
            onChangeText={setCarBrand}
            style={input}
          />

          <TextInput
            placeholder="Модель автомобиля"
            value={carModel}
            onChangeText={setCarModel}
            style={input}
          />

          <TouchableOpacity
            onPress={handleSubmit}
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
              Сохранить клиента
            </Text>
          </TouchableOpacity>
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