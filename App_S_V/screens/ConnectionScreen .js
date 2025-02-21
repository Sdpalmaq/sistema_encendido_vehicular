import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

const ConnectionScreen = ({ navigation, route }) => {
  const { id_esp32 } = route.params.vehiculo;
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfigureWiFi = async () => {
    if (!ssid || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post(`/wifi/configure/${id_esp32}`, {
        ssid,
        password,
      });

      if (response.status === 200) {
        Alert.alert("Éxito", "La configuración se envió correctamente a la placa.");
      } else {
        Alert.alert("Error", response.data.message || "Error al configurar.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.response?.data?.message || "Problema al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoteInstructions = () => {
    navigation.navigate("RemoteInstructions", { id_esp32 });
  };

  const handleLocalInstructions = () => {
    navigation.navigate("LocalInstructions");
  };

  return (
    <View style={styles.container}>
      <Ionicons name="wifi-outline" size={80} color="#007bff" />
      <Text style={styles.title}>Gestión de Conexión</Text>
      <Text style={styles.subtitle}>Configura la red Wi-Fi para la placa ESP32</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="globe-outline" size={20} color="#007bff" />
        <TextInput
          style={styles.input}
          placeholder="Nombre de la red (SSID)"
          value={ssid}
          onChangeText={setSsid}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#007bff" />
        <TextInput
          style={styles.input}
          placeholder="Contraseña de la red"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleConfigureWiFi}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator color="#fff" /> : 
        <>
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Configurar</Text>
        </>}
      </TouchableOpacity>

      <View style={styles.instructionsContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleRemoteInstructions}>
          <Ionicons name="cloud-outline" size={20} color="#007bff" />
          <Text style={styles.secondaryButtonText}>Modo Remoto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleLocalInstructions}>
          <Ionicons name="phone-portrait-outline" size={20} color="#007bff" />
          <Text style={styles.secondaryButtonText}>Modo Local</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F0F2F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#a1a1a1",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  instructionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007bff",
  },
  secondaryButtonText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default ConnectionScreen;
